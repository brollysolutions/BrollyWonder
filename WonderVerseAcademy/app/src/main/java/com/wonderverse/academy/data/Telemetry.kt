package com.wonderverse.academy.data

import android.content.Context
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateMapOf
import org.json.JSONArray
import org.json.JSONObject
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.time.temporal.ChronoUnit

/**
 * Learning telemetry — the data layer behind the Parent Dashboard.
 *
 * Mirrors the web prototype's contract exactly so both platforms report the
 * same numbers: cumulative per-skill accuracy, sampled time on task, and real
 * consecutive-day streaks. Everything is local-only and rides the existing
 * SharedPreferences persistence.
 */

const val HISTORY_LIMIT = 60          // keep the log small enough to persist cheaply
const val HEARTBEAT_SECONDS = 15      // time-on-task sampling interval

data class ActivityEntry(
    val timestamp: Long,
    val day: String,
    val type: String,                 // "quest" | "game"
    val kingdomId: String?,
    val skill: String?,
    val correct: Int?,                // null when accuracy isn't measured
    val total: Int?
) {
    // Both halves must be present: a stored entry with a total but no `correct`
    // (hand-edited or partially written) would otherwise NPE inside `percent`.
    val isScored: Boolean get() = correct != null && total != null && total > 0
    val percent: Int? get() = if (isScored) Math.round(correct!! * 100f / total!!) else null
}

data class SkillStat(
    val attempts: Int = 0,
    val correct: Int = 0,
    val questions: Int = 0,
    val lastSeen: Long = 0L,
    val kingdomId: String? = null
) {
    val percent: Int? get() = if (questions > 0) Math.round(correct * 100f / questions) else null
}

fun dayKey(date: LocalDate = LocalDate.now()): String = date.toString()   // ISO yyyy-MM-dd

fun daysBetween(fromKey: String, toKey: String): Long =
    ChronoUnit.DAYS.between(LocalDate.parse(fromKey), LocalDate.parse(toKey))

fun formatMinutes(seconds: Int): String {
    val mins = Math.round(seconds / 60f)
    return if (mins < 60) "${mins}m" else "${mins / 60}h ${mins % 60}m"
}

object LearningLog {
    /** Newest first, capped at [HISTORY_LIMIT]. */
    val history = mutableStateListOf<ActivityEntry>()
    val skills = mutableStateMapOf<String, SkillStat>()
    val timeByDay = mutableStateMapOf<String, Int>()
    val timeByActivity = mutableStateMapOf<String, Int>()

    var lastActiveDate: String? = null
        private set

    val hasData: Boolean get() = history.isNotEmpty() || timeByDay.values.any { it > 0 }

    /** Record one finished quest. Pass correct/total only when actually measured. */
    fun recordActivity(
        context: Context?,
        type: String,
        kingdomId: String?,
        skill: String?,
        correct: Int? = null,
        total: Int? = null
    ) {
        val entry = ActivityEntry(
            timestamp = System.currentTimeMillis(),
            day = dayKey(),
            type = type,
            kingdomId = kingdomId,
            skill = skill,
            correct = correct,
            total = total
        )
        history.add(0, entry)
        while (history.size > HISTORY_LIMIT) history.removeAt(history.lastIndex)

        // Unscored activities never contribute to mastery — a completed game
        // must not read as 0% correct.
        if (skill != null && entry.isScored) {
            val prev = skills[skill] ?: SkillStat(kingdomId = kingdomId)
            skills[skill] = prev.copy(
                attempts = prev.attempts + 1,
                correct = prev.correct + correct!!,
                questions = prev.questions + total!!,
                lastSeen = entry.timestamp,
                kingdomId = kingdomId ?: prev.kingdomId
            )
        }
        context?.let { persist(it) }
    }

    fun addTimeOnTask(context: Context?, label: String, seconds: Int = HEARTBEAT_SECONDS) {
        val today = dayKey()
        timeByDay[today] = (timeByDay[today] ?: 0) + seconds
        timeByActivity[label] = (timeByActivity[label] ?: 0) + seconds
        context?.let { persist(it) }
    }

    /**
     * Roll the daily streak. Consecutive calendar days only — this replaces the
     * hardcoded default, so an untouched install reports 1, not 6.
     */
    fun applyStreak(context: Context?) {
        val today = dayKey()
        if (lastActiveDate == today) return
        val previous = lastActiveDate
        PlayerState.streakDays.value = when {
            previous == null -> 1
            daysBetween(previous, today) == 1L -> PlayerState.streakDays.value + 1
            daysBetween(previous, today) == 0L -> PlayerState.streakDays.value.coerceAtLeast(1)
            else -> 1
        }
        lastActiveDate = today
        context?.let { persist(it) }
    }

    /** Last [days] calendar days, oldest first. */
    fun recentDays(days: Int = 7): List<Pair<LocalDate, Int>> {
        val today = LocalDate.now()
        return (days - 1 downTo 0).map { offset ->
            val date = today.minusDays(offset.toLong())
            date to (timeByDay[dayKey(date)] ?: 0)
        }
    }

    fun entriesOn(day: String): Int = history.count { it.day == day }

    fun localDateOf(timestamp: Long): LocalDate =
        Instant.ofEpochMilli(timestamp).atZone(ZoneId.systemDefault()).toLocalDate()

    // ---------------- persistence ----------------

    fun toJson(): String {
        val root = JSONObject()
        root.put("lastActiveDate", lastActiveDate ?: JSONObject.NULL)

        val historyArray = JSONArray()
        history.forEach { entry ->
            historyArray.put(
                JSONObject().apply {
                    put("ts", entry.timestamp)
                    put("day", entry.day)
                    put("type", entry.type)
                    put("kingdomId", entry.kingdomId ?: JSONObject.NULL)
                    put("skill", entry.skill ?: JSONObject.NULL)
                    put("correct", entry.correct ?: JSONObject.NULL)
                    put("total", entry.total ?: JSONObject.NULL)
                }
            )
        }
        root.put("history", historyArray)

        val skillsObject = JSONObject()
        skills.forEach { (name, stat) ->
            skillsObject.put(
                name,
                JSONObject().apply {
                    put("attempts", stat.attempts)
                    put("correct", stat.correct)
                    put("questions", stat.questions)
                    put("lastSeen", stat.lastSeen)
                    put("kingdomId", stat.kingdomId ?: JSONObject.NULL)
                }
            )
        }
        root.put("skills", skillsObject)
        root.put("timeByDay", JSONObject(timeByDay.toMap()))
        root.put("timeByActivity", JSONObject(timeByActivity.toMap()))
        return root.toString()
    }

    /** Tolerant of absent or malformed data — a corrupt log must not block launch. */
    fun fromJson(raw: String?) {
        history.clear(); skills.clear(); timeByDay.clear(); timeByActivity.clear()
        lastActiveDate = null
        if (raw.isNullOrBlank()) return

        try {
            val root = JSONObject(raw)
            lastActiveDate = if (root.isNull("lastActiveDate")) null else root.optString("lastActiveDate").ifBlank { null }

            root.optJSONArray("history")?.let { array ->
                for (i in 0 until array.length()) {
                    val item = array.optJSONObject(i) ?: continue
                    history.add(
                        ActivityEntry(
                            timestamp = item.optLong("ts"),
                            day = item.optString("day"),
                            type = item.optString("type", "quest"),
                            kingdomId = if (item.isNull("kingdomId")) null else item.optString("kingdomId"),
                            skill = if (item.isNull("skill")) null else item.optString("skill"),
                            correct = if (item.isNull("correct")) null else item.optInt("correct"),
                            total = if (item.isNull("total")) null else item.optInt("total")
                        )
                    )
                }
            }

            root.optJSONObject("skills")?.let { object_ ->
                object_.keys().forEach { key ->
                    val stat = object_.optJSONObject(key) ?: return@forEach
                    skills[key] = SkillStat(
                        attempts = stat.optInt("attempts"),
                        correct = stat.optInt("correct"),
                        questions = stat.optInt("questions"),
                        lastSeen = stat.optLong("lastSeen"),
                        kingdomId = if (stat.isNull("kingdomId")) null else stat.optString("kingdomId")
                    )
                }
            }

            root.optJSONObject("timeByDay")?.let { object_ ->
                object_.keys().forEach { key -> timeByDay[key] = object_.optInt(key) }
            }
            root.optJSONObject("timeByActivity")?.let { object_ ->
                object_.keys().forEach { key -> timeByActivity[key] = object_.optInt(key) }
            }
        } catch (error: Exception) {
            history.clear(); skills.clear(); timeByDay.clear(); timeByActivity.clear()
            lastActiveDate = null
        }
    }

    private fun persist(context: Context) {
        PlayerState.saveToPreferences(context)
    }
}
