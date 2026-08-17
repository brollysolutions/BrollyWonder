package com.wonderverse.academy.ui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.wonderverse.academy.ui.theme.XpBarGreen

@Composable
fun XpBar(progressFraction: Float, modifier: Modifier = Modifier) {
    val animated by animateFloatAsState(targetValue = progressFraction.coerceIn(0f, 1f), animationSpec = tween(600), label = "xp")
    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(14.dp)
            .clip(RoundedCornerShape(50))
            .background(androidx.compose.ui.graphics.Color(0xFFE0DCEF))
    ) {
        Box(
            modifier = Modifier
                .fillMaxHeight()
                .fillMaxWidth(animated)
                .clip(RoundedCornerShape(50))
                .background(XpBarGreen)
                .align(Alignment.CenterStart)
        )
    }
}
