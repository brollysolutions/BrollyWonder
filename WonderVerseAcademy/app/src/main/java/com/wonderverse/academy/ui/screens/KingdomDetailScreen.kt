package com.wonderverse.academy.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.wonderverse.academy.data.JourneyState
import com.wonderverse.academy.data.demoKingdoms
import com.wonderverse.academy.data.journeyForKingdom
import com.wonderverse.academy.ui.theme.CreamBg
import com.wonderverse.academy.ui.theme.InkText

@Composable
fun KingdomDetailScreen(onBack: () -> Unit, onStartLesson: () -> Unit) {
    val kingdomId = JourneyState.selectedKingdomId.value
    val kingdom = demoKingdoms.firstOrNull { it.id == kingdomId } ?: demoKingdoms.first()
    val journey = journeyForKingdom(kingdom.id)

    Column(modifier = Modifier.fillMaxSize().background(Color(0xFFF5F7FB))) {
        // Top Header Row with Back Button and Star Count
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp, vertical = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onBack) {
                Text("←", fontSize = 24.sp, color = InkText, fontWeight = FontWeight.Bold)
            }
            Surface(
                color = Color.White,
                shape = RoundedCornerShape(20.dp),
                shadowElevation = 2.dp
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 14.dp, vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("⭐", fontSize = 14.sp)
                    Spacer(Modifier.width(6.dp))
                    Text("0", fontWeight = FontWeight.ExtraBold, color = InkText, fontSize = 15.sp)
                }
            }
        }

        // Teacher/Helper Banner
        Surface(
            color = Color(0xFFFFB300),
            shape = RoundedCornerShape(18.dp),
            shadowElevation = 4.dp,
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 14.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "Teacher",
                    fontWeight = FontWeight.ExtraBold,
                    color = Color.White,
                    fontSize = 16.sp
                )
            }
        }

        Spacer(Modifier.height(14.dp))

        // Vertical Lessons List
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp),
            contentPadding = PaddingValues(bottom = 32.dp)
        ) {
            itemsIndexed(journey.sections) { index, section ->
                val isUnlocked = index < 2
                val subtitle = when {
                    index == 0 -> "26 sounds"
                    index == 1 -> "8 words"
                    else -> "Premium"
                }
                val arrowColor = if (index == 1) Color(0xFF8A6BFF) else Color(0xFF4ECAD8)

                Surface(
                    color = Color.White,
                    shape = RoundedCornerShape(24.dp),
                    shadowElevation = 2.dp,
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable(enabled = isUnlocked) {
                            JourneyState.selectSection(index)
                            onStartLesson()
                        }
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 20.dp, vertical = 16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        // Left rounded icon container
                        LessonIcon(index = index, isUnlocked = isUnlocked)

                        // Title & Subtitle
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = section.card.title,
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Bold,
                                color = InkText
                            )
                            Spacer(Modifier.height(3.dp))
                            Text(
                                text = subtitle,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.SemiBold,
                                color = if (isUnlocked) {
                                    if (index == 0) Color(0xFF1B85B8) else Color(0xFF8A6BFF)
                                } else {
                                    Color(0xFFA0A5BA)
                                }
                            )
                        }

                        // Right icon
                        if (isUnlocked) {
                            Text(
                                text = "›",
                                fontSize = 24.sp,
                                fontWeight = FontWeight.Bold,
                                color = arrowColor
                            )
                        } else {
                            Box(
                                modifier = Modifier
                                    .size(32.dp)
                                    .background(Color(0xFFFFF9C4), RoundedCornerShape(50)),
                                contentAlignment = Alignment.Center
                            ) {
                                Text("🔒", fontSize = 14.sp)
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun LessonIcon(index: Int, isUnlocked: Boolean) {
    val bgColor = if (isUnlocked) {
        if (index == 0) Color(0xFF4ECAD8).copy(alpha = 0.15f) else Color(0xFF8A6BFF).copy(alpha = 0.15f)
    } else {
        Color(0xFFF5F6FA)
    }

    Box(
        modifier = Modifier
            .padding(end = 16.dp)
            .size(52.dp)
            .background(bgColor, RoundedCornerShape(16.dp)),
        contentAlignment = Alignment.Center
    ) {
        if (index == 0) {
            Text("abc", color = Color(0xFF1B85B8), fontWeight = FontWeight.ExtraBold, fontSize = 18.sp)
        } else if (index == 1) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Row {
                    Text("a", color = Color(0xFF5F27CD), fontWeight = FontWeight.ExtraBold, fontSize = 10.sp)
                    Spacer(Modifier.width(2.dp))
                    Text("b", color = Color(0xFF5F27CD), fontWeight = FontWeight.ExtraBold, fontSize = 10.sp)
                }
                Row {
                    Text("c", color = Color(0xFF5F27CD), fontWeight = FontWeight.ExtraBold, fontSize = 10.sp)
                    Spacer(Modifier.width(2.dp))
                    Text("d", color = Color(0xFF5F27CD), fontWeight = FontWeight.ExtraBold, fontSize = 10.sp)
                }
            }
        } else {
            val emoji = when (index) {
                2 -> "🏠"
                3 -> "❌"
                4 -> "🧩"
                5 -> "🔚"
                6 -> "🗣️"
                7 -> "🌊"
                8 -> "🅰️"
                9 -> "🚗"
                else -> "🌈"
            }
            Text(emoji, fontSize = 24.sp)
        }
    }
}
