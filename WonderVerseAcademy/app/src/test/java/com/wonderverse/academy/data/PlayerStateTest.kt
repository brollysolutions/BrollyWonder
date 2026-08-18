package com.wonderverse.academy.data

import org.junit.Assert.assertEquals
import org.junit.Before
import org.junit.Test

/**
 * Covers the reward/level arithmetic that drives every visible number in the
 * app. Persistence itself needs a Context and so is exercised on-device, but
 * the maths below is pure and was previously untested.
 */
class PlayerStateTest {

    @Before
    fun reset() {
        PlayerState.coins.value = 0
        PlayerState.stars.value = 0
        PlayerState.xp.value = 0
        PlayerState.xpToNextLevel.value = 100
        PlayerState.level.value = 1
    }

    @Test
    fun `rewards accumulate without levelling when under the threshold`() {
        PlayerState.addRewards(coinsEarned = 20, xpEarned = 40, starsEarned = 2)

        assertEquals(20, PlayerState.coins.value)
        assertEquals(2, PlayerState.stars.value)
        assertEquals(40, PlayerState.xp.value)
        assertEquals(1, PlayerState.level.value)
        assertEquals(100, PlayerState.xpToNextLevel.value)
    }

    @Test
    fun `crossing the threshold levels up and carries the remainder`() {
        PlayerState.addRewards(coinsEarned = 0, xpEarned = 130, starsEarned = 0)

        assertEquals(2, PlayerState.level.value)
        assertEquals("remainder carries into the new level", 30, PlayerState.xp.value)
        assertEquals("each level costs more than the last", 200, PlayerState.xpToNextLevel.value)
    }

    @Test
    fun `a single large award can span several levels`() {
        // 100 -> level 2 (threshold 200), 200 -> level 3 (threshold 300), 50 left over.
        PlayerState.addRewards(coinsEarned = 0, xpEarned = 350, starsEarned = 0)

        assertEquals(3, PlayerState.level.value)
        assertEquals(50, PlayerState.xp.value)
        assertEquals(300, PlayerState.xpToNextLevel.value)
    }

    @Test
    fun `awarding zero xp is a no-op for level and progress`() {
        PlayerState.addRewards(coinsEarned = 15, xpEarned = 0, starsEarned = 1)

        assertEquals(15, PlayerState.coins.value)
        assertEquals(1, PlayerState.stars.value)
        assertEquals(0, PlayerState.xp.value)
        assertEquals(1, PlayerState.level.value)
    }
}
