package com.wonderverse.academy.data

import android.content.Context
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

object ApiClient {
    // 10.0.2.2 is standard Android Emulator localhost loopback to host dev machine port 3000
    private const val BASE_URL = "http://10.0.2.2:3000/api/player"

    /**
     * Pull remote state, but only adopt it when it is genuinely newer than the
     * local save. The device is authoritative otherwise: a child who played
     * offline must not lose that progress to a stale server record.
     */
    suspend fun fetchPlayerState(context: Context): Boolean = withContext(Dispatchers.IO) {
        try {
            val url = URL(BASE_URL)
            val conn = url.openConnection() as HttpURLConnection
            conn.requestMethod = "GET"
            conn.connectTimeout = 3000
            conn.readTimeout = 3000

            if (conn.responseCode == 200) {
                val jsonStr = conn.inputStream.bufferedReader().use { it.readText() }
                val root = JSONObject(jsonStr)
                val p = root.optJSONObject("player")
                if (p != null) {
                    val remoteUpdatedAt = p.optLong("updatedAt", 0L)
                    if (remoteUpdatedAt <= PlayerState.updatedAt.value) {
                        // Local save is same-age or newer — keep the device's version.
                        return@withContext false
                    }
                    withContext(Dispatchers.Main) {
                        PlayerState.name.value = p.optString("name", PlayerState.name.value)
                        PlayerState.avatarEmoji.value = p.optString("avatarEmoji", PlayerState.avatarEmoji.value)
                        PlayerState.coins.value = p.optInt("coins", PlayerState.coins.value)
                        PlayerState.xp.value = p.optInt("xp", PlayerState.xp.value)
                        PlayerState.xpToNextLevel.value = p.optInt("xpToNextLevel", PlayerState.xpToNextLevel.value)
                        PlayerState.level.value = p.optInt("level", PlayerState.level.value)
                        PlayerState.streakDays.value = p.optInt("streakDays", PlayerState.streakDays.value)
                        PlayerState.stars.value = p.optInt("stars", PlayerState.stars.value)
                        PlayerState.petName.value = p.optString("petName", PlayerState.petName.value)
                        PlayerState.petHappiness.value = p.optInt("petHappiness", PlayerState.petHappiness.value)
                        PlayerState.petHunger.value = p.optInt("petHunger", PlayerState.petHunger.value)
                        PlayerState.petEmoji.value = p.optString("petEmoji", PlayerState.petEmoji.value)
                        // Carry the server's timestamp rather than stamping "now",
                        // so the next fetch compares against the right generation.
                        PlayerState.updatedAt.value = remoteUpdatedAt
                        PlayerState.saveToPreferences(context, touch = false)
                    }
                    return@withContext true
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return@withContext false
    }

    suspend fun syncPlayerState(): Boolean = withContext(Dispatchers.IO) {
        try {
            val url = URL(BASE_URL)
            val conn = url.openConnection() as HttpURLConnection
            conn.requestMethod = "POST"
            conn.setRequestProperty("Content-Type", "application/json")
            conn.doOutput = true
            conn.connectTimeout = 3000
            conn.readTimeout = 3000

            val playerObj = JSONObject().apply {
                put("name", PlayerState.name.value)
                put("avatarEmoji", PlayerState.avatarEmoji.value)
                put("coins", PlayerState.coins.value)
                put("xp", PlayerState.xp.value)
                put("xpToNextLevel", PlayerState.xpToNextLevel.value)
                put("level", PlayerState.level.value)
                put("streakDays", PlayerState.streakDays.value)
                put("stars", PlayerState.stars.value)
                put("petName", PlayerState.petName.value)
                put("petHappiness", PlayerState.petHappiness.value)
                put("petHunger", PlayerState.petHunger.value)
                put("petEmoji", PlayerState.petEmoji.value)
                put("updatedAt", PlayerState.updatedAt.value)
            }
            val bodyObj = JSONObject().put("player", playerObj)

            conn.outputStream.use { os ->
                os.write(bodyObj.toString().toByteArray())
            }

            return@withContext conn.responseCode == 200
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return@withContext false
    }
}
