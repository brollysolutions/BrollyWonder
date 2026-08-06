package com.wonderverse.academy.data

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.*
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "wonder_player_preferences")

object DataStoreManager {
    private val IS_PROFILE_SET_KEY = booleanPreferencesKey("is_profile_set")
    private val NAME_KEY = stringPreferencesKey("player_name")
    private val AVATAR_KEY = stringPreferencesKey("avatar_emoji")
    private val COINS_KEY = intPreferencesKey("coins")
    private val XP_KEY = intPreferencesKey("xp")
    private val XP_NEXT_KEY = intPreferencesKey("xp_next")
    private val LEVEL_KEY = intPreferencesKey("level")
    private val STREAK_KEY = intPreferencesKey("streak")
    private val STARS_KEY = intPreferencesKey("stars")
    private val PET_NAME_KEY = stringPreferencesKey("pet_name")
    private val PET_HAPPINESS_KEY = intPreferencesKey("pet_happiness")
    private val PET_HUNGER_KEY = intPreferencesKey("pet_hunger")
    private val PET_EMOJI_KEY = stringPreferencesKey("pet_emoji")

    suspend fun savePlayerState(context: Context) {
        context.dataStore.edit { prefs ->
            prefs[IS_PROFILE_SET_KEY] = PlayerState.isProfileSet.value
            prefs[NAME_KEY] = PlayerState.name.value
            prefs[AVATAR_KEY] = PlayerState.avatarEmoji.value
            prefs[COINS_KEY] = PlayerState.coins.value
            prefs[XP_KEY] = PlayerState.xp.value
            prefs[XP_NEXT_KEY] = PlayerState.xpToNextLevel.value
            prefs[LEVEL_KEY] = PlayerState.level.value
            prefs[STREAK_KEY] = PlayerState.streakDays.value
            prefs[STARS_KEY] = PlayerState.stars.value
            prefs[PET_NAME_KEY] = PlayerState.petName.value
            prefs[PET_HAPPINESS_KEY] = PlayerState.petHappiness.value
            prefs[PET_HUNGER_KEY] = PlayerState.petHunger.value
            prefs[PET_EMOJI_KEY] = PlayerState.petEmoji.value
        }
    }

    fun getPlayerState(context: Context): Flow<Boolean> = context.dataStore.data.map { prefs ->
        PlayerState.isProfileSet.value = prefs[IS_PROFILE_SET_KEY] ?: false
        PlayerState.name.value = prefs[NAME_KEY] ?: "Explorer"
        PlayerState.avatarEmoji.value = prefs[AVATAR_KEY] ?: "🧑‍🚀"
        PlayerState.coins.value = prefs[COINS_KEY] ?: 120
        PlayerState.xp.value = prefs[XP_KEY] ?: 340
        PlayerState.xpToNextLevel.value = prefs[XP_NEXT_KEY] ?: 500
        PlayerState.level.value = prefs[LEVEL_KEY] ?: 4
        PlayerState.streakDays.value = prefs[STREAK_KEY] ?: 6
        PlayerState.stars.value = prefs[STARS_KEY] ?: 18
        PlayerState.petName.value = prefs[PET_NAME_KEY] ?: "Glimmer"
        PlayerState.petHappiness.value = prefs[PET_HAPPINESS_KEY] ?: 70
        PlayerState.petHunger.value = prefs[PET_HUNGER_KEY] ?: 55
        PlayerState.petEmoji.value = prefs[PET_EMOJI_KEY] ?: "🐉"
        true
    }
}
