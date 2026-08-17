package com.wonderverse.academy.ui.screens

import android.speech.tts.TextToSpeech
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.wonderverse.academy.data.HEARTBEAT_SECONDS
import com.wonderverse.academy.data.JourneyState
import com.wonderverse.academy.data.LearningLog
import com.wonderverse.academy.data.PlayerState
import com.wonderverse.academy.data.journeyForKingdom
import kotlinx.coroutines.delay
import com.wonderverse.academy.ui.components.XpBar
import com.wonderverse.academy.ui.theme.CreamBg
import com.wonderverse.academy.ui.theme.InkText
import com.wonderverse.academy.ui.theme.WordForestGreen
import java.util.Locale

@Composable
fun LessonScreen(onBack: () -> Unit, onFinish: () -> Unit) {
    val tts = rememberPronunciationTts()
    val context = LocalContext.current

    // Time-on-task heartbeat: only ticks while this screen is composed, so
    // reported minutes reflect actual learning, not an app left open.
    LaunchedEffect(Unit) {
        while (true) {
            delay(HEARTBEAT_SECONDS * 1000L)
            LearningLog.addTimeOnTask(context, "Quests")
        }
    }

    var questionIndex by remember { mutableIntStateOf(0) }
    var selectedOption by remember { mutableStateOf<Int?>(null) }
    var showResult by remember { mutableStateOf(false) }
    var correctCount by remember { mutableIntStateOf(0) }
    var showRewardPopup by remember { mutableStateOf(false) }
    var showLossPopup by remember { mutableStateOf(false) }

    val kingdom = journeyForKingdom(JourneyState.selectedKingdomId.value)
    val sectionIndex = JourneyState.selectedSectionIndex.value.coerceIn(0, kingdom.sections.lastIndex)
    val section = kingdom.sections[sectionIndex]
    val card = section.card
    val question = card.questions.getOrNull(questionIndex)
    val pronunciationText = card.pronunciation?.let(::spokenText)

    Box(modifier = Modifier.fillMaxSize()) {
        Column(modifier = Modifier.fillMaxSize().background(CreamBg)) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        brush = Brush.verticalGradient(
                            listOf(Color(0xFF2A7D3A), WordForestGreen)
                        )
                    )
                    .padding(horizontal = 12.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(onClick = onBack) {
                    Icon(
                        Icons.AutoMirrored.Filled.ArrowBack,
                        contentDescription = "Back",
                        tint = Color.White
                    )
                }
                Column(modifier = Modifier.weight(1f)) {
                    Text(kingdom.kingdomTitle(), style = MaterialTheme.typography.titleLarge, color = Color.White)
                    Spacer(Modifier.height(2.dp))
                    Text(
                        section.label + " • " + card.title,
                        color = Color.White.copy(alpha = 0.96f),
                        fontWeight = FontWeight.Bold,
                        fontSize = 17.sp
                    )
                }
                PronunciationButton(
                    pronunciation = pronunciationText,
                    onSpeak = { text ->
                        if (text != null) tts?.speak(spokenText(text))
                    }
                )
            }

            Column(modifier = Modifier.fillMaxSize().padding(20.dp)) {
                Text(
                    section.hint,
                    color = InkText.copy(alpha = 0.70f),
                    fontSize = 12.sp,
                    lineHeight = 16.sp
                )
                Spacer(Modifier.height(12.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    LessonChip(section.label)
                    LessonChip("${questionIndex + 1}/${card.questions.size}")
                    LessonChip("⭐ $correctCount")
                }
                Spacer(Modifier.height(10.dp))
                XpBar(progressFraction = questionIndex / card.questions.size.toFloat())
                Spacer(Modifier.height(18.dp))

                if (question != null) {
                    Text(
                        text = card.title,
                        color = WordForestGreen,
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp
                    )
                    Spacer(Modifier.height(4.dp))
                    Text(question.question, style = MaterialTheme.typography.titleMedium, color = InkText)
                    Spacer(Modifier.height(10.dp))

                    if (!pronunciationText.isNullOrBlank()) {
                        Surface(
                            color = WordForestGreen.copy(alpha = 0.12f),
                            shape = RoundedCornerShape(16.dp)
                        ) {
                            Text(
                                text = pronunciationText,
                                color = InkText,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.SemiBold,
                                modifier = Modifier.padding(horizontal = 12.dp, vertical = 10.dp)
                            )
                        }
                        Spacer(Modifier.height(14.dp))
                    }

                    question.options.forEachIndexed { index, option ->
                        val isSelected = selectedOption == index
                        val isCorrect = index == question.correctIndex
                        val bg = when {
                            !showResult && isSelected -> WordForestGreen.copy(alpha = 0.20f)
                            showResult && isCorrect -> WordForestGreen.copy(alpha = 0.32f)
                            showResult && isSelected && !isCorrect -> Color(0xFFFFCDD2)
                            else -> Color.White
                        }
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(bottom = 10.dp)
                                .background(bg, RoundedCornerShape(16.dp))
                                .clickable(enabled = !showResult) {
                                    selectedOption = index
                                    tts?.speak(spokenText(option))
                                }
                                .padding(14.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(option, color = InkText, fontSize = 15.sp)
                        }
                    }

                    Spacer(Modifier.weight(1f))

                    Button(
                        onClick = {
                            if (!showResult) {
                                showResult = true
                                if (selectedOption == question.correctIndex) correctCount++
                            } else {
                                if (questionIndex < card.questions.size - 1) {
                                    questionIndex++
                                    selectedOption = null
                                    showResult = false
                                } else {
                                    LearningLog.recordActivity(
                                        context = context,
                                        type = "quest",
                                        kingdomId = kingdom.kingdomId,
                                        skill = section.label,
                                        correct = correctCount,
                                        total = card.questions.size
                                    )
                                    val isWin = correctCount >= Math.ceil(card.questions.size / 2.0).toInt()
                                    if (isWin) {
                                        val coinsEarned = 20 + correctCount * 5
                                        val xpEarned = 30 + correctCount * 10
                                        PlayerState.addRewards(
                                            coinsEarned = coinsEarned,
                                            xpEarned = xpEarned,
                                            starsEarned = correctCount,
                                            context = context
                                        )
                                        showRewardPopup = true
                                    } else {
                                        showLossPopup = true
                                    }
                                }
                            }
                        },
                        enabled = selectedOption != null,
                        modifier = Modifier.fillMaxWidth().height(54.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = WordForestGreen),
                        shape = RoundedCornerShape(16.dp)
                    ) {
                        Text(
                            when {
                                !showResult -> "Check Answer"
                                questionIndex < card.questions.size - 1 -> "Next Question"
                                else -> "Finish Quest"
                            },
                            fontWeight = FontWeight.Bold,
                            fontSize = 15.sp
                        )
                    }
                }
            }
        }

        AnimatedVisibility(visible = showRewardPopup, enter = fadeIn(), exit = fadeOut()) {
            RewardPopup(
                title = card.title,
                correctCount = correctCount,
                total = card.questions.size,
                onContinue = onFinish
            )
        }

        AnimatedVisibility(visible = showLossPopup, enter = fadeIn(), exit = fadeOut()) {
            LossPopup(
                title = card.title,
                correctCount = correctCount,
                total = card.questions.size,
                onRetry = {
                    questionIndex = 0
                    selectedOption = null
                    showResult = false
                    correctCount = 0
                    showLossPopup = false
                },
                onExit = onFinish
            )
        }
    }
}

@Composable
private fun PronunciationButton(pronunciation: String?, onSpeak: (String?) -> Unit) {
    val enabled = !pronunciation.isNullOrBlank()
    Surface(
        color = Color.White.copy(alpha = if (enabled) 0.18f else 0.08f),
        shape = RoundedCornerShape(999.dp),
        enabled = enabled,
        onClick = { onSpeak(pronunciation) }
    ) {
        Text(
            text = if (enabled) "Speak" else "—",
            color = Color.White,
            fontSize = 12.sp,
            fontWeight = FontWeight.SemiBold,
            modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp)
        )
    }
}

@Composable
private fun LessonChip(text: String) {
    Surface(color = Color.White.copy(alpha = 0.18f), shape = RoundedCornerShape(999.dp)) {
        Text(
            text = text,
            color = Color.White,
            fontSize = 12.sp,
            fontWeight = FontWeight.SemiBold,
            modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
        )
    }
}

import android.app.Activity
import com.wonderverse.academy.ads.AdManager

@Composable
private fun RewardPopup(title: String, correctCount: Int, total: Int, onContinue: () -> Unit) {
    val context = LocalContext.current

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black.copy(alpha = 0.55f)),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .padding(32.dp)
                .background(Color.White, RoundedCornerShape(24.dp))
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text("🎉", fontSize = 48.sp)
            Spacer(Modifier.height(8.dp))
            Text("${title} Cleared!", style = MaterialTheme.typography.titleLarge, color = InkText)
            Spacer(Modifier.height(4.dp))
            Text("Level Complete • You got $correctCount / $total correct", color = InkText.copy(alpha = 0.7f))
            Spacer(Modifier.height(16.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                RewardChip(emoji = "🪙", label = "+${20 + correctCount * 5}")
                RewardChip(emoji = "✨", label = "+${30 + correctCount * 10} XP")
                RewardChip(emoji = "⭐", label = "+$correctCount")
            }
            Spacer(Modifier.height(24.dp))
            Button(
                onClick = {
                    val activity = context as? Activity
                    if (activity != null) {
                        AdManager.showInterstitialAd(activity) {
                            onContinue()
                        }
                    } else {
                        onContinue()
                    }
                },
                colors = ButtonDefaults.buttonColors(containerColor = WordForestGreen),
                shape = RoundedCornerShape(14.dp),
                modifier = Modifier.fillMaxWidth().height(48.dp)
            ) {
                Text("Continue (Watch Ad)", fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
private fun LossPopup(title: String, correctCount: Int, total: Int, onRetry: () -> Unit, onExit: () -> Unit) {
    val context = LocalContext.current

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black.copy(alpha = 0.65f)),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .padding(32.dp)
                .background(Color.White, RoundedCornerShape(24.dp))
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text("💔", fontSize = 48.sp)
            Spacer(Modifier.height(8.dp))
            Text("${title} Failed", style = MaterialTheme.typography.titleLarge, color = Color(0xFFD32F2F))
            Spacer(Modifier.height(4.dp))
            Text("You got $correctCount / $total correct. Keep practicing!", color = InkText.copy(alpha = 0.7f))
            Spacer(Modifier.height(24.dp))
            Button(
                onClick = {
                    val activity = context as? Activity
                    if (activity != null) {
                        AdManager.showInterstitialAd(activity) {
                            onRetry()
                        }
                    } else {
                        onRetry()
                    }
                },
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFD32F2F)),
                shape = RoundedCornerShape(14.dp),
                modifier = Modifier.fillMaxWidth().height(48.dp)
            ) {
                Text("Try Again (Watch Ad)", fontWeight = FontWeight.Bold, color = Color.White)
            }
            Spacer(Modifier.height(8.dp))
            TextButton(
                onClick = {
                    val activity = context as? Activity
                    if (activity != null) {
                        AdManager.showInterstitialAd(activity) {
                            onExit()
                        }
                    } else {
                        onExit()
                    }
                }
            ) {
                Text("Exit Level", color = InkText.copy(alpha = 0.6f))
            }
        }
    }
}

@Composable
private fun RewardChip(emoji: String, label: String) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(emoji, fontSize = 22.sp)
        Text(label, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = InkText)
    }
}

private fun spokenText(text: String): String {
    val clean = text
        .trim()
        .removeSurrounding("/")
        .replace(Regex("\\s+"), " ")

    return if (clean.length == 1) clean.uppercase(Locale.US) else clean
}

private fun TextToSpeech.speak(text: String) {
    speak(text, TextToSpeech.QUEUE_FLUSH, null, "journey-pronunciation")
}

@Composable
private fun rememberPronunciationTts(): TextToSpeech? {
    val context = LocalContext.current
    val tts = remember(context) {
        var engine: TextToSpeech? = null
        engine = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                engine?.language = Locale.US
            }
        }
        engine
    }

    DisposableEffect(tts) {
        onDispose {
            tts?.shutdown()
        }
    }

    return tts
}

private fun com.wonderverse.academy.data.WorldJourney.kingdomTitle(): String {
    return when (kingdomId) {
        "word_forest" -> "🌳 Word Forest"
        "math_castle" -> "🏰 Math Castle"
        "space_science" -> "🚀 Space Academy"
        "ocean_kingdom" -> "🌊 Ocean Kingdom"
        "history_kingdom" -> "🦖 Dino Valley"
        "creative_village" -> "🎨 Creative Village"
        else -> "World Journey"
    }
}
