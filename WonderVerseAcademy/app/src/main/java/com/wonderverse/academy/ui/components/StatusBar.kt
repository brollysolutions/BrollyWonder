package com.wonderverse.academy.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.wonderverse.academy.data.PlayerState
import com.wonderverse.academy.ui.theme.*

@Composable
fun TopStatusBar() {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(CrystalPurple, RoundedCornerShape(bottomStart = 20.dp, bottomEnd = 20.dp))
            .padding(horizontal = 16.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        StatPill(emoji = "🪙", value = PlayerState.coins.value.toString(), bg = CoinGold)
        StatPill(emoji = "⭐", value = PlayerState.stars.value.toString(), bg = StarYellow)
        StatPill(emoji = "🔥", value = "${PlayerState.streakDays.value}d", bg = StreakOrange)
        StatPill(emoji = "🏅", value = "Lv.${PlayerState.level.value}", bg = SunGold)
    }
}

@Composable
private fun StatPill(emoji: String, value: String, bg: androidx.compose.ui.graphics.Color) {
    Row(
        modifier = Modifier
            .background(bg, RoundedCornerShape(50))
            .padding(horizontal = 10.dp, vertical = 6.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(text = emoji, fontSize = MaterialTheme.typography.bodyMedium.fontSize)
        Spacer(Modifier.width(4.dp))
        Text(text = value, fontWeight = FontWeight.Bold, color = InkText, fontSize = MaterialTheme.typography.bodyMedium.fontSize)
    }
}
