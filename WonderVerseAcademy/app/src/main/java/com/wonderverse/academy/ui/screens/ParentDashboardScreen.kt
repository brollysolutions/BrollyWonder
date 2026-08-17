package com.wonderverse.academy.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.wonderverse.academy.data.ActivityEntry
import com.wonderverse.academy.data.LearningLog
import com.wonderverse.academy.data.PlayerState
import com.wonderverse.academy.data.dayKey
import com.wonderverse.academy.data.demoKingdoms
import com.wonderverse.academy.data.formatMinutes
import com.wonderverse.academy.data.journeyForKingdom
import java.time.format.DateTimeFormatter
import java.time.format.TextStyle
import java.util.Locale
import kotlin.math.roundToInt
import kotlin.random.Random

/* ==================================================================
 * PARENT DASHBOARD
 * Deliberately not the child-facing visual language. The child brand is
 * wondrous; the parent brand is calm, specific and evidence-led.
 * Reports only measured data — never estimates progress.
 * ================================================================== */

private val ParentBg = Color(0xFFF7F8FB)
private val ParentInk = Color(0xFF2E2140)
private val ParentMuted = Color(0xFF6B7280)
private val ParentFaint = Color(0xFFA3A8B8)
private val ParentLine = Color(0x142E2140)
private val ParentAccent = Color(0xFF6C4AB6)

private val MasteredGreen = Color(0xFF2E9E5B)
private val PractisingAmber = Color(0xFFC98A1B)
private val NeedsWorkRed = Color(0xFFD2544B)

private fun bandColor(percent: Int): Color = when {
    percent >= 85 -> MasteredGreen
    percent >= 60 -> PractisingAmber
    else -> NeedsWorkRed
}

@Composable
fun ParentDashboardScreen(onBack: () -> Unit) {
    var unlocked by rememberSaveable { mutableStateOf(false) }
    if (unlocked) ParentReport(onBack = onBack) else ParentGate(onUnlock = { unlocked = true }, onBack = onBack)
}

/** A speed bump, not security: keeps a 5-year-old out of their own report. */
@Composable
private fun ParentGate(onUnlock: () -> Unit, onBack: () -> Unit) {
    val first = rememberSaveable { Random.nextInt(3, 9) }
    val second = rememberSaveable { Random.nextInt(4, 10) }
    var answer by rememberSaveable { mutableStateOf("") }
    var showError by rememberSaveable { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(ParentBg)
            .padding(20.dp)
    ) {
        BackButton(onBack)
        Column(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.Center
        ) {
            Text("🔒", fontSize = 40.sp)
            Spacer(Modifier.height(12.dp))
            Text("Parents only", fontSize = 24.sp, fontWeight = FontWeight.Black, color = ParentInk)
            Spacer(Modifier.height(6.dp))
            Text(
                "Answer to see your child's progress report.",
                fontSize = 14.sp,
                color = ParentMuted,
                lineHeight = 20.sp
            )
            Spacer(Modifier.height(24.dp))

            ParentCard {
                Text(
                    "WHAT IS",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = ParentMuted,
                    letterSpacing = 1.sp
                )
                Spacer(Modifier.height(8.dp))
                Text("$first × $second", fontSize = 34.sp, fontWeight = FontWeight.Black, color = ParentInk)
                Spacer(Modifier.height(16.dp))
                OutlinedTextField(
                    value = answer,
                    onValueChange = { input ->
                        answer = input.filter { it.isDigit() }
                        showError = false
                    },
                    placeholder = { Text("Your answer", color = ParentFaint) },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    singleLine = true,
                    isError = showError,
                    shape = RoundedCornerShape(14.dp),
                    modifier = Modifier.fillMaxWidth()
                )
                if (showError) {
                    Spacer(Modifier.height(6.dp))
                    Text("Not quite — try again.", color = NeedsWorkRed, fontSize = 13.sp, fontWeight = FontWeight.Bold)
                }
                Spacer(Modifier.height(14.dp))
                Button(
                    onClick = {
                        if (answer.toIntOrNull() == first * second) onUnlock()
                        else { showError = true; answer = "" }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(52.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = ParentAccent),
                    shape = RoundedCornerShape(14.dp)
                ) {
                    Text("Open Dashboard", fontWeight = FontWeight.Bold, fontSize = 15.sp)
                }
            }
        }
    }
}

@Composable
private fun ParentReport(onBack: () -> Unit) {
    val history = LearningLog.history
    // Cheap enough to recompute; caching on collection size would go stale when a
    // day's total changes without the map growing.
    val week = LearningLog.recentDays(7)
    val weekKeys = week.map { dayKey(it.first) }.toSet()

    val weekEntries = history.filter { it.day in weekKeys }
    val scored = weekEntries.filter { it.isScored }
    val correctTotal = scored.sumOf { it.correct ?: 0 }
    val askedTotal = scored.sumOf { it.total ?: 0 }
    val weekSeconds = week.sumOf { it.second }
    val activeDays = week.count { (date, seconds) -> seconds > 0 || LearningLog.entriesOn(dayKey(date)) > 0 }

    // The phonics ladder, read straight from the Word Forest curriculum.
    val phonicsStages = remember { journeyForKingdom("word_forest").sections.map { it.label } }
    val startedStages = phonicsStages.count { LearningLog.skills[it]?.percent != null }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(ParentBg)
    ) {
        // Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(ParentBg)
                .padding(horizontal = 20.dp, vertical = 16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            BackButton(onBack)
            Spacer(Modifier.width(14.dp))
            Column {
                Text(
                    "PROGRESS REPORT",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = ParentMuted,
                    letterSpacing = 1.2.sp
                )
                Text(
                    PlayerState.name.value,
                    fontSize = 19.sp,
                    fontWeight = FontWeight.Black,
                    color = ParentInk,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
            }
        }
        Divider(color = ParentLine)

        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 20.dp, vertical = 18.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            if (!LearningLog.hasData) {
                ParentCard {
                    Column(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text("📖", fontSize = 36.sp)
                        Spacer(Modifier.height(10.dp))
                        Text(
                            "No activity recorded yet",
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Black,
                            color = ParentInk
                        )
                        Spacer(Modifier.height(8.dp))
                        Text(
                            "Once ${PlayerState.name.value} finishes their first quest, this page will show " +
                                "time spent, accuracy on every phonics stage, and what to practise next. " +
                                "We only report what we've measured — nothing here is estimated.",
                            fontSize = 14.sp,
                            color = ParentMuted,
                            lineHeight = 21.sp,
                            textAlign = TextAlign.Center
                        )
                    }
                }
            } else {
                // ---- This week ----
                SectionLabel("THIS WEEK")
                Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                    StatTile(formatMinutes(weekSeconds), "Time learning", modifier = Modifier.weight(1f))
                    StatTile(
                        weekEntries.size.toString(),
                        if (weekEntries.size == 1) "Quest finished" else "Quests finished",
                        modifier = Modifier.weight(1f)
                    )
                }
                Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                    StatTile(
                        if (askedTotal > 0) "${(correctTotal * 100f / askedTotal).roundToInt()}%" else "—",
                        "Answers correct",
                        hint = if (askedTotal > 0) "$askedTotal questions" else "No quizzes yet",
                        modifier = Modifier.weight(1f)
                    )
                    StatTile(
                        "$activeDays/7",
                        "Days active",
                        hint = "${PlayerState.streakDays.value}-day streak",
                        modifier = Modifier.weight(1f)
                    )
                }

                // ---- Daily activity ----
                ParentCard {
                    Text("Daily activity", fontSize = 14.sp, fontWeight = FontWeight.Black, color = ParentInk)
                    Text("Minutes of active learning", fontSize = 12.sp, color = ParentMuted)
                    Spacer(Modifier.height(16.dp))
                    val maxSeconds = (week.maxOfOrNull { it.second } ?: 0).coerceAtLeast(1)
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(6.dp),
                        verticalAlignment = Alignment.Bottom
                    ) {
                        week.forEachIndexed { index, (date, seconds) ->
                            val minutes = (seconds / 60f).roundToInt()
                            val barHeight = if (seconds > 0) (seconds * 76f / maxSeconds).coerceAtLeast(6f) else 3f
                            val isToday = index == week.lastIndex
                            Column(
                                modifier = Modifier.weight(1f),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Text(
                                    if (seconds > 0) minutes.toString() else "",
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = ParentAccent
                                )
                                Spacer(Modifier.height(6.dp))
                                Box(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .height(barHeight.dp)
                                        .clip(RoundedCornerShape(6.dp))
                                        .background(
                                            when {
                                                seconds <= 0 -> ParentLine
                                                isToday -> ParentAccent
                                                else -> ParentAccent.copy(alpha = 0.42f)
                                            }
                                        )
                                )
                                Spacer(Modifier.height(6.dp))
                                Text(
                                    date.dayOfWeek.getDisplayName(TextStyle.NARROW, Locale.getDefault()),
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = if (isToday) ParentInk else ParentMuted
                                )
                            }
                        }
                    }
                }

                // ---- Phonics ladder: the core of the report ----
                ParentCard {
                    Text("Reading & phonics", fontSize = 14.sp, fontWeight = FontWeight.Black, color = ParentInk)
                    Text(
                        "${phonicsStages.size}-stage progression · $startedStages started",
                        fontSize = 12.sp,
                        color = ParentMuted
                    )
                    Spacer(Modifier.height(16.dp))
                    phonicsStages.forEachIndexed { index, label ->
                        val percent = LearningLog.skills[label]?.percent
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                "${index + 1}",
                                fontSize = 11.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = ParentMuted,
                                modifier = Modifier.width(18.dp)
                            )
                            Text(
                                label,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold,
                                color = if (percent != null) ParentInk else ParentFaint,
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis,
                                modifier = Modifier.weight(1f)
                            )
                            if (percent != null) {
                                Surface(
                                    color = bandColor(percent).copy(alpha = 0.12f),
                                    shape = RoundedCornerShape(999.dp)
                                ) {
                                    Text(
                                        "$percent%",
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.Black,
                                        color = bandColor(percent),
                                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                                    )
                                }
                            } else {
                                Text("Not started", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = ParentFaint)
                            }
                        }
                        Spacer(Modifier.height(5.dp))
                        Row {
                            Spacer(Modifier.width(18.dp))
                            LinearProgressIndicator(
                                progress = { (percent ?: 0) / 100f },
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(6.dp)
                                    .clip(RoundedCornerShape(999.dp)),
                                color = if (percent != null) bandColor(percent) else Color.Transparent,
                                trackColor = ParentLine
                            )
                        }
                        Spacer(Modifier.height(10.dp))
                    }
                    Divider(color = ParentLine)
                    Spacer(Modifier.height(12.dp))
                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        LegendDot("Mastered", MasteredGreen)
                        LegendDot("Practising", PractisingAmber)
                        LegendDot("Needs work", NeedsWorkRed)
                    }
                }

                // ---- Recommendation ----
                val weakest = phonicsStages
                    .mapNotNull { label -> LearningLog.skills[label]?.percent?.let { label to it } }
                    .filter { it.second < 85 }
                    .minByOrNull { it.second }
                val notStarted = phonicsStages.firstOrNull { LearningLog.skills[it]?.percent == null }
                val recommendation: Pair<String, String>? = when {
                    weakest != null -> weakest.first to "${weakest.second}% correct so far — worth another pass."
                    notStarted != null -> notStarted to
                        "Stage ${phonicsStages.indexOf(notStarted) + 1} of ${phonicsStages.size} — not started yet."
                    else -> null
                }
                recommendation?.let { (title, reason) ->
                    Surface(
                        color = ParentAccent.copy(alpha = 0.06f),
                        shape = RoundedCornerShape(20.dp),
                        border = androidx.compose.foundation.BorderStroke(1.dp, ParentAccent.copy(alpha = 0.18f)),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(18.dp)) {
                            Text(
                                "PRACTISE NEXT",
                                fontSize = 11.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = ParentAccent,
                                letterSpacing = 1.sp
                            )
                            Spacer(Modifier.height(6.dp))
                            Text(title, fontSize = 17.sp, fontWeight = FontWeight.Black, color = ParentInk)
                            Spacer(Modifier.height(4.dp))
                            Text(reason, fontSize = 13.sp, color = ParentMuted, lineHeight = 19.sp)
                        }
                    }
                }

                // ---- Where the time went ----
                val timeEntries = LearningLog.timeByActivity.entries
                    .filter { it.value > 0 }
                    .sortedByDescending { it.value }
                val timeTotal = timeEntries.sumOf { it.value }
                if (timeTotal > 0) {
                    ParentCard {
                        Text("Where the time went", fontSize = 14.sp, fontWeight = FontWeight.Black, color = ParentInk)
                        Spacer(Modifier.height(14.dp))
                        timeEntries.forEach { (label, seconds) ->
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier.padding(bottom = 10.dp)
                            ) {
                                Text(
                                    label,
                                    fontSize = 13.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = ParentInk,
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis,
                                    modifier = Modifier.width(110.dp)
                                )
                                LinearProgressIndicator(
                                    progress = { seconds.toFloat() / timeTotal },
                                    modifier = Modifier
                                        .weight(1f)
                                        .height(8.dp)
                                        .clip(RoundedCornerShape(999.dp)),
                                    color = ParentAccent,
                                    trackColor = ParentLine
                                )
                                Spacer(Modifier.width(10.dp))
                                Text(
                                    formatMinutes(seconds),
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = ParentMuted,
                                    textAlign = TextAlign.End,
                                    modifier = Modifier.width(46.dp)
                                )
                            }
                        }
                    }
                }

                // ---- By kingdom ----
                val kingdomRows = history
                    .filter { it.kingdomId != null }
                    .groupBy { it.kingdomId!! }
                    .map { (id, entries) ->
                        val scoredEntries = entries.filter { it.isScored }
                        Triple(
                            id,
                            entries.size,
                            if (scoredEntries.isNotEmpty()) {
                                (scoredEntries.sumOf { it.correct ?: 0 } * 100f /
                                    scoredEntries.sumOf { it.total ?: 0 }).roundToInt()
                            } else null
                        )
                    }
                    .sortedByDescending { it.second }
                if (kingdomRows.isNotEmpty()) {
                    ParentCard {
                        Text("By kingdom", fontSize = 14.sp, fontWeight = FontWeight.Black, color = ParentInk)
                        Spacer(Modifier.height(14.dp))
                        kingdomRows.forEach { (id, sessions, percent) ->
                            val kingdom = demoKingdoms.firstOrNull { it.id == id }
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier.padding(bottom = 12.dp)
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(10.dp)
                                        .clip(RoundedCornerShape(3.dp))
                                        .background(kingdom?.color ?: ParentAccent)
                                )
                                Spacer(Modifier.width(10.dp))
                                Text(
                                    kingdom?.name ?: id,
                                    fontSize = 13.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = ParentInk,
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis,
                                    modifier = Modifier.weight(1f)
                                )
                                Text(
                                    buildString {
                                        append("$sessions ")
                                        append(if (sessions == 1) "session" else "sessions")
                                        if (percent != null) append(" · $percent%")
                                    },
                                    fontSize = 12.sp,
                                    color = ParentMuted
                                )
                            }
                        }
                    }
                }

                // ---- Recent sessions ----
                if (history.isNotEmpty()) {
                    ParentCard {
                        Text("Recent sessions", fontSize = 14.sp, fontWeight = FontWeight.Black, color = ParentInk)
                        Spacer(Modifier.height(10.dp))
                        history.take(8).forEachIndexed { index, entry ->
                            if (index > 0) Divider(color = ParentLine)
                            RecentSessionRow(entry)
                        }
                    }
                }
            }

            Text(
                "All progress data stays on this device. Accuracy is measured across every question " +
                    "answered, not just the most recent attempt.",
                fontSize = 11.sp,
                color = ParentFaint,
                lineHeight = 17.sp,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(horizontal = 12.dp)
            )
            Spacer(Modifier.height(24.dp))
        }
    }
}

@Composable
private fun RecentSessionRow(entry: ActivityEntry) {
    val kingdom = demoKingdoms.firstOrNull { it.id == entry.kingdomId }
    val formatter = remember { DateTimeFormatter.ofPattern("d MMM", Locale.getDefault()) }
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 10.dp)
    ) {
        Column(modifier = Modifier.weight(1f)) {
            Text(
                entry.skill ?: kingdom?.name ?: "Activity",
                fontSize = 13.sp,
                fontWeight = FontWeight.ExtraBold,
                color = ParentInk,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
            Spacer(Modifier.height(2.dp))
            Text(
                "${kingdom?.name ?: "—"} · ${LearningLog.localDateOf(entry.timestamp).format(formatter)}",
                fontSize = 11.sp,
                color = ParentMuted
            )
        }
        val percent = entry.percent
        if (percent != null) {
            Text(
                "${entry.correct}/${entry.total}",
                fontSize = 12.sp,
                fontWeight = FontWeight.Black,
                color = bandColor(percent)
            )
        } else {
            // Games that don't score per question report completion, not a fake 0%.
            Text("Completed", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = ParentMuted)
        }
    }
}

@Composable
private fun ParentCard(content: @Composable ColumnScope.() -> Unit) {
    Surface(
        color = Color.White,
        shape = RoundedCornerShape(20.dp),
        border = androidx.compose.foundation.BorderStroke(1.dp, ParentLine),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(18.dp), content = content)
    }
}

@Composable
private fun StatTile(value: String, label: String, hint: String? = null, modifier: Modifier = Modifier) {
    Surface(
        color = Color.White,
        shape = RoundedCornerShape(20.dp),
        border = androidx.compose.foundation.BorderStroke(1.dp, ParentLine),
        modifier = modifier
    ) {
        Column(modifier = Modifier.padding(horizontal = 16.dp, vertical = 14.dp)) {
            Text(value, fontSize = 24.sp, fontWeight = FontWeight.Black, color = ParentInk)
            Spacer(Modifier.height(4.dp))
            Text(label, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = ParentMuted)
            if (hint != null) {
                Spacer(Modifier.height(2.dp))
                Text(hint, fontSize = 11.sp, color = ParentFaint)
            }
        }
    }
}

@Composable
private fun SectionLabel(text: String) {
    Text(
        text,
        fontSize = 11.sp,
        fontWeight = FontWeight.ExtraBold,
        color = ParentMuted,
        letterSpacing = 1.2.sp
    )
}

@Composable
private fun LegendDot(label: String, color: Color) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Box(
            modifier = Modifier
                .size(8.dp)
                .clip(RoundedCornerShape(50))
                .background(color)
        )
        Spacer(Modifier.width(5.dp))
        Text(label, fontSize = 11.sp, fontWeight = FontWeight.Bold, color = ParentMuted)
    }
}

@Composable
private fun BackButton(onBack: () -> Unit) {
    Surface(
        color = Color.White,
        shape = RoundedCornerShape(14.dp),
        border = androidx.compose.foundation.BorderStroke(1.dp, ParentLine),
        onClick = onBack
    ) {
        Box(modifier = Modifier.size(42.dp), contentAlignment = Alignment.Center) {
            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = ParentInk)
        }
    }
}
