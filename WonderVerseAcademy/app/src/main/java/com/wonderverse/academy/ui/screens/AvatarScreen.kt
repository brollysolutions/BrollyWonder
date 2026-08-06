package com.wonderverse.academy.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.platform.LocalContext
import com.wonderverse.academy.data.PlayerState
import com.wonderverse.academy.ui.theme.CreamBg
import com.wonderverse.academy.ui.theme.CrystalPurple
import com.wonderverse.academy.ui.theme.InkText

private val avatarOptions = listOf("🧑‍🚀", "🧚", "🦸", "🧙", "🐯", "🦊", "🐼", "🦄", "🐸", "🐧", "🦁", "🐨")

@Composable
fun AvatarScreen(onDone: () -> Unit, onBack: (() -> Unit)? = null) {
    val context = LocalContext.current
    var nameInput by remember { mutableStateOf(PlayerState.name.value) }
    var selectedEmoji by remember { mutableStateOf(PlayerState.avatarEmoji.value.ifEmpty { avatarOptions.first() }) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(CreamBg)
            .padding(24.dp)
    ) {
        if (onBack != null) {
            IconButton(onClick = onBack) {
                Text("←", fontSize = 24.sp, color = InkText)
            }
        }
        Text("Create Your Explorer", style = MaterialTheme.typography.headlineMedium, color = InkText)
        Spacer(Modifier.height(4.dp))
        Text("Choose an avatar and name to begin your quest", color = InkText.copy(alpha = 0.7f))
        Spacer(Modifier.height(24.dp))

        Box(
            modifier = Modifier
                .align(Alignment.CenterHorizontally)
                .size(96.dp)
                .background(CrystalPurple.copy(alpha = 0.15f), RoundedCornerShape(50)),
            contentAlignment = Alignment.Center
        ) {
            Text(selectedEmoji, fontSize = 48.sp)
        }

        Spacer(Modifier.height(24.dp))

        LazyVerticalGrid(
            columns = GridCells.Fixed(4),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            modifier = Modifier.height(180.dp)
        ) {
            items(avatarOptions) { emoji ->
                val selected = emoji == selectedEmoji
                Box(
                    modifier = Modifier
                        .size(64.dp)
                        .background(
                            if (selected) CrystalPurple else Color.White,
                            RoundedCornerShape(16.dp)
                        )
                        .clickable { selectedEmoji = emoji },
                    contentAlignment = Alignment.Center
                ) {
                    Text(emoji, fontSize = 28.sp)
                }
            }
        }

        Spacer(Modifier.height(24.dp))

        OutlinedTextField(
            value = nameInput,
            onValueChange = { nameInput = it },
            label = { Text("Explorer name") },
            singleLine = true,
            keyboardOptions = KeyboardOptions.Default,
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(Modifier.weight(1f))

        Button(
            onClick = {
                PlayerState.avatarEmoji.value = selectedEmoji
                PlayerState.name.value = nameInput.ifBlank { "Explorer" }
                PlayerState.isProfileSet.value = true
                PlayerState.saveToPreferences(context)
                onDone()
            },
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp),
            colors = ButtonDefaults.buttonColors(containerColor = CrystalPurple),
            shape = RoundedCornerShape(16.dp)
        ) {
            Text("START ADVENTURE!", fontWeight = FontWeight.Bold, fontSize = 16.sp)
        }
    }
}
