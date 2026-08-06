package com.wonderverse.academy.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val WonderColorScheme = lightColorScheme(
    primary = CrystalPurple,
    onPrimary = Color.White,
    secondary = SunGold,
    onSecondary = InkText,
    background = CreamBg,
    surface = Color.White,
    onSurface = InkText,
    onBackground = InkText
)

@Composable
fun WonderVerseTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = WonderColorScheme,
        typography = WonderTypography,
        content = content
    )
}
