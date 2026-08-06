package com.wonderverse.academy.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.wonderverse.academy.data.PlayerState
import com.wonderverse.academy.ui.theme.CoralPink
import com.wonderverse.academy.ui.theme.CreamBg
import com.wonderverse.academy.ui.theme.InkText
import com.wonderverse.academy.ui.theme.SkyBlue

@Composable
fun PetScreen(onBack: () -> Unit) {
    Column(modifier = Modifier.fillMaxSize().background(CreamBg)) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = InkText)
            }
            Text("My Pet", style = MaterialTheme.typography.titleLarge, color = InkText)
        }

        Column(
            modifier = Modifier.fillMaxWidth().padding(horizontal = 24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Box(
                modifier = Modifier
                    .size(160.dp)
                    .background(SkyBlue.copy(alpha = 0.2f), RoundedCornerShape(50)),
                contentAlignment = Alignment.Center
            ) {
                Text(PlayerState.petEmoji.value, fontSize = 84.sp)
            }
            Spacer(Modifier.height(12.dp))
            Text(PlayerState.petName.value, style = MaterialTheme.typography.titleLarge, color = InkText, fontWeight = FontWeight.Bold)
            Text("Loyal companion since Level 1", color = InkText.copy(alpha = 0.6f), fontSize = 12.sp)

            Spacer(Modifier.height(28.dp))

            StatRow(label = "Happiness 💖", value = PlayerState.petHappiness.value, color = CoralPink)
            Spacer(Modifier.height(14.dp))
            StatRow(label = "Hunger 🍎", value = PlayerState.petHunger.value, color = SkyBlue)

            Spacer(Modifier.height(32.dp))

            Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                PetActionButton(emoji = "🍎", label = "Feed", onClick = { PlayerState.feedPet() })
                PetActionButton(emoji = "🎾", label = "Play", onClick = { PlayerState.playWithPet() })
            }

            Spacer(Modifier.height(24.dp))
            Text(
                "Unlockable costumes and a home garden are coming in Phase 1 as your pet levels up!",
                color = InkText.copy(alpha = 0.55f),
                fontSize = 12.sp,
                textAlign = androidx.compose.ui.text.style.TextAlign.Center
            )
        }
    }
}

@Composable
private fun StatRow(label: String, value: Int, color: Color) {
    Column(modifier = Modifier.fillMaxWidth()) {
        Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
            Text(label, color = InkText, fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
            Text("$value%", color = InkText.copy(alpha = 0.7f), fontSize = 13.sp)
        }
        Spacer(Modifier.height(6.dp))
        LinearProgressIndicator(
            progress = { value / 100f },
            modifier = Modifier.fillMaxWidth().height(10.dp).clip(RoundedCornerShape(50)),
            color = color,
            trackColor = color.copy(alpha = 0.15f)
        )
    }
}

@Composable
private fun PetActionButton(emoji: String, label: String, onClick: () -> Unit) {
    Column(
        modifier = Modifier
            .background(Color.White, RoundedCornerShape(18.dp))
            .clickable { onClick() }
            .padding(vertical = 16.dp, horizontal = 28.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(emoji, fontSize = 28.sp)
        Spacer(Modifier.height(4.dp))
        Text(label, fontWeight = FontWeight.SemiBold, color = InkText, fontSize = 13.sp)
    }
}
