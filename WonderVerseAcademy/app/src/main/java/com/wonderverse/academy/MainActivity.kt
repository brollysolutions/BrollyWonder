package com.wonderverse.academy

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.wonderverse.academy.nav.WonderNavHost
import com.wonderverse.academy.ui.theme.WonderVerseTheme

import androidx.lifecycle.lifecycleScope
import com.wonderverse.academy.data.ApiClient
import com.wonderverse.academy.data.LearningLog
import com.wonderverse.academy.data.PlayerState
import kotlinx.coroutines.launch

import com.wonderverse.academy.ads.AdManager

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        AdManager.initialize(this)

        // SharedPreferences is the single source of truth for player state.
        // Restore it synchronously before anything can read PlayerState, then
        // roll the streak so the persisted value is the one being incremented.
        PlayerState.loadFromPreferences(this)
        LearningLog.applyStreak(this)

        lifecycleScope.launch {
            ApiClient.fetchPlayerState(applicationContext)
        }

        enableEdgeToEdge()
        setContent {
            WonderVerseTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    WonderNavHost()
                }
            }
        }
    }
}
