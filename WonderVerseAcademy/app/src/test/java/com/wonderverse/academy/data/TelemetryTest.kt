package com.wonderverse.academy.data

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.LocalDate

/**
 * Verifies the telemetry contract the Parent Dashboard reports against —
 * especially the JSON round-trip, since a persistence bug would silently
 * lose every measurement a parent is shown.
 */
class TelemetryTest {

    @Before
    fun reset() {
        LearningLog.fromJson(null)
        PlayerState.streakDays.value = 1
    }

    @Test
    fun `skill mastery aggregates cumulatively across attempts`() {
        LearningLog.recordActivity(null, "quest", "word_forest", "Digraphs", correct = 4, total = 6)
        LearningLog.recordActivity(null, "quest", "word_forest", "Digraphs", correct = 6, total = 6)

        val stat = LearningLog.skills["Digraphs"]!!
        assertEquals(2, stat.attempts)
        assertEquals(10, stat.correct)
        assertEquals(12, stat.questions)
        assertEquals(83, stat.percent)   // cumulative, not most-recent
    }

    @Test
    fun `unscored activity records completion without polluting mastery`() {
        LearningLog.recordActivity(null, "game", "math_castle", "Math Defender")

        val entry = LearningLog.history.first()
        assertNull(entry.correct)
        assertNull(entry.total)
        assertNull(entry.percent)
        assertTrue(!entry.isScored)
        assertNull("an unscored game must not create a mastery figure", LearningLog.skills["Math Defender"])
    }

    @Test
    fun `history is newest-first and capped`() {
        repeat(HISTORY_LIMIT + 20) { index ->
            LearningLog.recordActivity(null, "quest", "word_forest", "Stage $index", correct = 1, total = 1)
        }
        assertEquals(HISTORY_LIMIT, LearningLog.history.size)
        assertEquals("Stage ${HISTORY_LIMIT + 19}", LearningLog.history.first().skill)
    }

    @Test
    fun `time on task accumulates per day and per activity`() {
        LearningLog.addTimeOnTask(null, "Quests")
        LearningLog.addTimeOnTask(null, "Quests")
        LearningLog.addTimeOnTask(null, "Nursery games")

        assertEquals(HEARTBEAT_SECONDS * 2, LearningLog.timeByActivity["Quests"])
        assertEquals(HEARTBEAT_SECONDS, LearningLog.timeByActivity["Nursery games"])
        assertEquals(HEARTBEAT_SECONDS * 3, LearningLog.timeByDay[dayKey()])
    }

    @Test
    fun `streak starts at one rather than a fabricated default`() {
        PlayerState.streakDays.value = 6          // the old hardcoded value
        LearningLog.applyStreak(null)
        assertEquals(1, PlayerState.streakDays.value)
    }

    @Test
    fun `streak increments on consecutive days and resets after a gap`() {
        val yesterday = dayKey(LocalDate.now().minusDays(1))
        LearningLog.fromJson("""{"lastActiveDate":"$yesterday","history":[],"skills":{},"timeByDay":{},"timeByActivity":{}}""")
        PlayerState.streakDays.value = 4
        LearningLog.applyStreak(null)
        assertEquals(5, PlayerState.streakDays.value)

        val threeDaysAgo = dayKey(LocalDate.now().minusDays(3))
        LearningLog.fromJson("""{"lastActiveDate":"$threeDaysAgo","history":[],"skills":{},"timeByDay":{},"timeByActivity":{}}""")
        PlayerState.streakDays.value = 9
        LearningLog.applyStreak(null)
        assertEquals(1, PlayerState.streakDays.value)
    }

    @Test
    fun `applying the streak twice in one day does not double count`() {
        LearningLog.applyStreak(null)
        val afterFirst = PlayerState.streakDays.value
        LearningLog.applyStreak(null)
        assertEquals(afterFirst, PlayerState.streakDays.value)
    }

    @Test
    fun `json round-trip preserves every measurement`() {
        LearningLog.recordActivity(null, "quest", "word_forest", "Word Families", correct = 5, total = 7)
        LearningLog.recordActivity(null, "game", "math_castle", "Math Defender")
        LearningLog.addTimeOnTask(null, "Quests")
        LearningLog.applyStreak(null)

        val serialized = LearningLog.toJson()
        LearningLog.fromJson(serialized)

        assertEquals(2, LearningLog.history.size)
        assertEquals(5, LearningLog.skills["Word Families"]!!.correct)
        assertEquals(7, LearningLog.skills["Word Families"]!!.questions)
        assertEquals(71, LearningLog.skills["Word Families"]!!.percent)
        assertEquals(HEARTBEAT_SECONDS, LearningLog.timeByDay[dayKey()])
        assertEquals(HEARTBEAT_SECONDS, LearningLog.timeByActivity["Quests"])
        assertEquals(dayKey(), LearningLog.lastActiveDate)
        assertNotNull(LearningLog.history.first { it.skill == "Word Families" })
    }

    @Test
    fun `json round-trip keeps unscored entries null rather than zero`() {
        LearningLog.recordActivity(null, "game", "math_castle", "Math Defender")
        LearningLog.fromJson(LearningLog.toJson())

        val entry = LearningLog.history.first()
        assertNull("a completed game must not deserialize as 0 correct", entry.correct)
        assertNull(entry.total)
    }

    @Test
    fun `an entry with a total but no correct count is unscored rather than crashing`() {
        // A partially written or hand-edited log can carry `total` without
        // `correct`; reading `percent` on it used to throw inside the dashboard.
        LearningLog.fromJson(
            """{"lastActiveDate":null,"skills":{},"timeByDay":{},"timeByActivity":{},
               "history":[{"ts":1,"day":"${dayKey()}","type":"quest",
               "kingdomId":"word_forest","skill":"Digraphs","correct":null,"total":6}]}"""
        )

        val entry = LearningLog.history.first()
        assertTrue(!entry.isScored)
        assertNull(entry.percent)
    }

    @Test
    fun `malformed or absent stored data loads empty instead of crashing`() {
        LearningLog.recordActivity(null, "quest", "word_forest", "Digraphs", correct = 1, total = 1)

        LearningLog.fromJson("this is not json {{{")
        assertTrue(LearningLog.history.isEmpty())
        assertTrue(LearningLog.skills.isEmpty())
        assertTrue(!LearningLog.hasData)

        LearningLog.fromJson(null)
        assertTrue(LearningLog.history.isEmpty())
    }

    @Test
    fun `recentDays returns seven days oldest first ending today`() {
        val days = LearningLog.recentDays(7)
        assertEquals(7, days.size)
        assertEquals(LocalDate.now(), days.last().first)
        assertEquals(LocalDate.now().minusDays(6), days.first().first)
    }

    @Test
    fun `formatMinutes renders short and long durations`() {
        assertEquals("1m", formatMinutes(45))
        assertEquals("25m", formatMinutes(1500))
        assertEquals("1h 15m", formatMinutes(4500))
    }
}
