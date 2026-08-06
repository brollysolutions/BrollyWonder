package com.wonderverse.academy.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.wonderverse.academy.data.Badge
import com.wonderverse.academy.data.PlayerState
import com.wonderverse.academy.data.demoBadges
import com.wonderverse.academy.ui.theme.CreamBg
import com.wonderverse.academy.ui.theme.InkText
import com.wonderverse.academy.ui.theme.StreakOrange
import com.wonderverse.academy.ui.theme.SunGold

@Composable
fun RewardsScreen(onBack: () -> Unit) {
    var boxOpened by remember { mutableStateOf(false) }

    Column(modifier = Modifier.fillMaxSize().background(CreamBg)) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = InkText)
            }
            Text("Rewards & Badges", style = MaterialTheme.typography.titleLarge, color = InkText)
        }

        // Streak row
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
                .background(StreakOrange.copy(alpha = 0.12f), RoundedCornerShape(16.dp))
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Column {
                Text("🔥 ${PlayerState.streakDays.value}-Day Streak", fontWeight = FontWeight.Bold, color = InkText)
                Text("Keep learning daily to grow it!", color = InkText.copy(alpha = 0.6f), fontSize = 12.sp)
            }
        }

        Spacer(Modifier.height(16.dp))

        // Mystery box
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
                .background(Color.White, RoundedCornerShape(18.dp))
                .clickable(enabled = !boxOpened) { boxOpened = true }
                .padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(if (boxOpened) "🎁✨" else "📦", fontSize = 40.sp)
            Spacer(Modifier.height(6.dp))
            Text(
                if (boxOpened) "You found 15 coins and a Star Cape costume!" else "Daily Mystery Box — tap to open!",
                fontWeight = FontWeight.SemiBold,
                color = InkText,
                fontSize = 13.sp
            )
        }

        Spacer(Modifier.height(16.dp))

        Text(
            "Badges",
            style = MaterialTheme.typography.titleMedium,
            color = InkText,
            modifier = Modifier.padding(horizontal = 20.dp)
        )

        LazyVerticalGrid(
            columns = GridCells.Fixed(3),
            contentPadding = PaddingValues(20.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(demoBadges) { badge -> BadgeTile(badge) }
        }
    }
}

@Composable
private fun BadgeTile(badge: Badge) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .aspectRatio(1f)
            .background(if (badge.earned) SunGold.copy(alpha = 0.25f) else Color.White, RoundedCornerShape(16.dp))
            .alpha(if (badge.earned) 1f else 0.5f)
            .padding(10.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(badge.emoji, fontSize = 30.sp)
        Spacer(Modifier.height(4.dp))
        Text(badge.name, fontSize = 10.sp, fontWeight = FontWeight.SemiBold, color = InkText, textAlign = androidx.compose.ui.text.style.TextAlign.Center)
    }
}
