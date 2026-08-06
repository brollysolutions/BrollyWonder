package com.wonderverse.academy.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.wonderverse.academy.data.Kingdom
import com.wonderverse.academy.data.PlayerState
import com.wonderverse.academy.data.demoKingdoms
import com.wonderverse.academy.ui.components.TopStatusBar
import com.wonderverse.academy.ui.theme.CreamBg
import com.wonderverse.academy.ui.theme.InkText

@Composable
fun KingdomMapScreen(
    onOpenKingdom: (String) -> Unit,
    onOpenPet: () -> Unit,
    onOpenRewards: () -> Unit
) {
    Column(modifier = Modifier.fillMaxSize().background(CreamBg)) {
        TopStatusBar()

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp, vertical = 14.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text("Hi ${PlayerState.avatarEmoji.value} ${PlayerState.name.value}!", style = MaterialTheme.typography.titleLarge, color = InkText)
                Text("Which kingdom will you explore today?", color = InkText.copy(alpha = 0.6f), fontSize = 13.sp)
            }
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            QuickAction(emoji = "🐉", label = "My Pet", modifier = Modifier.weight(1f), onClick = onOpenPet)
            QuickAction(emoji = "🏅", label = "Rewards", modifier = Modifier.weight(1f), onClick = onOpenRewards)
        }

        Spacer(Modifier.height(8.dp))

        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            contentPadding = PaddingValues(20.dp),
            horizontalArrangement = Arrangement.spacedBy(14.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            items(demoKingdoms) { kingdom ->
                KingdomCard(kingdom = kingdom, onClick = { if (!kingdom.locked) onOpenKingdom(kingdom.id) })
            }
        }
    }
}

@Composable
private fun QuickAction(emoji: String, label: String, modifier: Modifier = Modifier, onClick: () -> Unit) {
    Row(
        modifier = modifier
            .background(Color.White, RoundedCornerShape(14.dp))
            .clickable { onClick() }
            .padding(vertical = 12.dp, horizontal = 12.dp),
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(emoji, fontSize = 20.sp)
        Spacer(Modifier.width(8.dp))
        Text(label, fontWeight = FontWeight.SemiBold, color = InkText, fontSize = 13.sp)
    }
}

@Composable
private fun KingdomCard(kingdom: Kingdom, onClick: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .aspectRatio(0.95f)
            .background(kingdom.color, RoundedCornerShape(20.dp))
            .clickable(enabled = !kingdom.locked) { onClick() }
            .alpha(if (kingdom.locked) 0.55f else 1f)
            .padding(14.dp),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Text(kingdom.emoji, fontSize = 34.sp)
        Column {
            Text(kingdom.name, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 15.sp)
            Text(kingdom.subject, color = Color.White.copy(alpha = 0.85f), fontSize = 11.sp)
            Spacer(Modifier.height(6.dp))
            if (kingdom.locked) {
                Text("🔒 Locked", color = Color.White, fontSize = 11.sp, fontWeight = FontWeight.SemiBold)
            } else {
                LinearProgressIndicator(
                    progress = { kingdom.progress / 100f },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(6.dp)
                        .clip(RoundedCornerShape(50)),
                    color = Color.White,
                    trackColor = Color.White.copy(alpha = 0.3f)
                )
                Spacer(Modifier.height(2.dp))
                Text("${kingdom.progress}% restored", color = Color.White, fontSize = 10.sp)
            }
        }
    }
}
