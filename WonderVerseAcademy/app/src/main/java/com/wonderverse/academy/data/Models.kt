package com.wonderverse.academy.data

import android.content.Context
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.graphics.Color
import com.wonderverse.academy.ui.theme.*

data class Kingdom(
    val id: String,
    val name: String,
    val subject: String,
    val color: Color,
    val emoji: String,
    val progress: Int,      // 0-100
    val locked: Boolean = false
)

data class QuizQuestion(
    val question: String,
    val options: List<String>,
    val correctIndex: Int,
    val pronunciation: String? = null
)

data class Badge(
    val name: String,
    val emoji: String,
    val earned: Boolean
)

data class WordForestChapter(
    val title: String,
    val icon: String,
    val summary: String,
    val status: String,
    val difficulty: String,
    val questions: List<QuizQuestion>
)

/** Shared app state with SharedPreferences persistence for offline support. */
object PlayerState {
    val name = mutableStateOf("Explorer")
    val avatarEmoji = mutableStateOf("🧑‍🚀")
    val coins = mutableStateOf(120)
    val xp = mutableStateOf(340)
    val xpToNextLevel = mutableStateOf(500)
    val level = mutableStateOf(4)
    val streakDays = mutableStateOf(6)
    val stars = mutableStateOf(18)

    val petName = mutableStateOf("Glimmer")
    val petHappiness = mutableStateOf(70)
    val petHunger = mutableStateOf(55)
    val petEmoji = mutableStateOf("🐉")

    val isProfileSet = mutableStateOf(false)

    /** ISO day the daily mystery box was last claimed; empty means never. */
    val lastMysteryBoxDay = mutableStateOf("")

    /**
     * When this state was last written locally. Used to decide whether a
     * remote payload is fresher than what's on the device — without it, a
     * stale server response silently rolls back offline progress.
     */
    val updatedAt = mutableStateOf(0L)

    fun loadFromPreferences(context: Context) {
        val prefs = context.getSharedPreferences("wonder_verse_prefs", Context.MODE_PRIVATE)
        isProfileSet.value = prefs.getBoolean("is_profile_set", false)
        name.value = prefs.getString("player_name", "Explorer") ?: "Explorer"
        avatarEmoji.value = prefs.getString("avatar_emoji", "🧑‍🚀") ?: "🧑‍🚀"
        coins.value = prefs.getInt("coins", 120)
        xp.value = prefs.getInt("xp", 340)
        xpToNextLevel.value = prefs.getInt("xp_next", 500)
        level.value = prefs.getInt("level", 4)
        streakDays.value = prefs.getInt("streak", 6)
        stars.value = prefs.getInt("stars", 18)
        petName.value = prefs.getString("pet_name", "Glimmer") ?: "Glimmer"
        petHappiness.value = prefs.getInt("pet_happiness", 70)
        petHunger.value = prefs.getInt("pet_hunger", 55)
        petEmoji.value = prefs.getString("pet_emoji", "🐉") ?: "🐉"
        lastMysteryBoxDay.value = prefs.getString("mystery_box_day", "") ?: ""
        updatedAt.value = prefs.getLong("updated_at", 0L)
        // Saves that predate telemetry simply load an empty log — no history is invented.
        LearningLog.fromJson(prefs.getString("learning_log", null))
    }

    /**
     * @param touch stamp [updatedAt] with the current time. Pass false when
     *   persisting state that came *from* the server, so its own timestamp
     *   survives and the next fetch compares against the right value.
     */
    fun saveToPreferences(context: Context, touch: Boolean = true) {
        if (touch) updatedAt.value = System.currentTimeMillis()
        val prefs = context.getSharedPreferences("wonder_verse_prefs", Context.MODE_PRIVATE)
        prefs.edit()
            .putBoolean("is_profile_set", isProfileSet.value)
            .putString("player_name", name.value)
            .putString("avatar_emoji", avatarEmoji.value)
            .putInt("coins", coins.value)
            .putInt("xp", xp.value)
            .putInt("xp_next", xpToNextLevel.value)
            .putInt("level", level.value)
            .putInt("streak", streakDays.value)
            .putInt("stars", stars.value)
            .putString("pet_name", petName.value)
            .putInt("pet_happiness", petHappiness.value)
            .putInt("pet_hunger", petHunger.value)
            .putString("pet_emoji", petEmoji.value)
            .putString("mystery_box_day", lastMysteryBoxDay.value)
            .putLong("updated_at", updatedAt.value)
            .putString("learning_log", LearningLog.toJson())
            .apply()
    }

    fun addRewards(coinsEarned: Int, xpEarned: Int, starsEarned: Int, context: Context? = null) {
        coins.value += coinsEarned
        stars.value += starsEarned
        var newXp = xp.value + xpEarned
        while (newXp >= xpToNextLevel.value) {
            newXp -= xpToNextLevel.value
            level.value += 1
            xpToNextLevel.value += 100
        }
        xp.value = newXp
        context?.let { saveToPreferences(it) }
    }

    fun feedPet(context: Context? = null) {
        petHunger.value = (petHunger.value + 25).coerceAtMost(100)
        petHappiness.value = (petHappiness.value + 5).coerceAtMost(100)
        context?.let { saveToPreferences(it) }
    }

    fun playWithPet(context: Context? = null) {
        petHappiness.value = (petHappiness.value + 20).coerceAtMost(100)
        petHunger.value = (petHunger.value - 8).coerceAtLeast(0)
        context?.let { saveToPreferences(it) }
    }
}

object WordForestState {
    val selectedChapterIndex = mutableStateOf(0)
    val selectedLessonLabel = mutableStateOf<String?>(null)

    fun selectChapter(index: Int, lessonLabel: String? = null) {
        selectedChapterIndex.value = index.coerceIn(0, wordForestChapters.lastIndex)
        selectedLessonLabel.value = lessonLabel
    }

    fun currentChapter(): WordForestChapter = wordForestChapters[selectedChapterIndex.value]
}

val demoKingdoms = listOf(
    Kingdom("word_forest", "Word Forest", "English", WordForestGreen, "🌳", progress = 65, locked = false),
    Kingdom("math_castle", "Math Castle", "Mathematics", MathCastleBlue, "🏰", progress = 40, locked = false),
    Kingdom("space_science", "Space Science", "Science", SpaceSciencePurple, "🚀", progress = 20, locked = false),
    Kingdom("ocean_kingdom", "Ocean Kingdom", "EVS", OceanKingdomTeal, "🌊", progress = 35, locked = false),
    Kingdom("history_kingdom", "Dino Valley", "Prehistory", HistoryKingdomAmber, "🦖", progress = 15, locked = false),
    Kingdom("creative_village", "Creative Village", "Art & Music", CreativeVillagePink, "🎨", progress = 10, locked = false)
)

val wordForestQuiz = listOf(
    QuizQuestion(
        question = "Which word means the same as 'Happy'?",
        options = listOf("Sad", "Joyful", "Angry", "Tired"),
        correctIndex = 1
    ),
    QuizQuestion(
        question = "Find the correctly spelled word:",
        options = listOf("Elefant", "Elephant", "Eliphant", "Elephent"),
        correctIndex = 1
    ),
    QuizQuestion(
        question = "Which is a naming word (noun)?",
        options = listOf("Run", "Blue", "Tiger", "Quickly"),
        correctIndex = 2
    )
)

val demoBadges = listOf(
    Badge("First Steps", "👣", earned = true),
    Badge("Word Wizard", "📖", earned = true),
    Badge("7-Day Streak", "🔥", earned = false),
    Badge("Math Whiz", "➗", earned = false),
    Badge("Star Collector", "⭐", earned = true),
    Badge("Pet Lover", "💖", earned = true)
)

val wordForestChapters = listOf(
    WordForestChapter(
        title = "Forest Awakening",
        icon = "🌱",
        summary = "Meet the letters hidden in the trees and build strong sound patterns.",
        status = "Completed",
        difficulty = "Starter",
        questions = listOf(
            QuizQuestion("Which sound starts Apple?", listOf("/a/", "/b/", "/m/", "/t/"), 0, "A"),
            QuizQuestion("Which letter makes the /m/ sound?", listOf("N", "P", "M", "S"), 2, "M"),
            QuizQuestion("Find the letter that starts Cat.", listOf("K", "S", "D", "C"), 3, "C")
        )
    ),
    WordForestChapter(
        title = "Rhyming River",
        icon = "💧",
        summary = "Listen for matching endings and float through sound families.",
        status = "Completed",
        difficulty = "Guided",
        questions = listOf(
            QuizQuestion("Which word is in the -at family?", listOf("Dog", "Bat", "Run", "Hop"), 1, "Bat"),
            QuizQuestion("Which word rhymes with Bug?", listOf("Rug", "Pig", "Sun", "Bed"), 0, "Rug"),
            QuizQuestion("Which word does NOT belong in -ig?", listOf("Pig", "Dig", "Dog", "Big"), 2, "Dog")
        )
    ),
    WordForestChapter(
        title = "Blend Bridge",
        icon = "🌉",
        summary = "Cross the bridge with beginning blends and digraph clues.",
        status = "Ready",
        difficulty = "Quest",
        questions = listOf(
            QuizQuestion("What two letters start Frog?", listOf("Fl", "Fr", "Tr", "Pr"), 1, "Fr"),
            QuizQuestion("Which word starts with the sl blend?", listOf("Sun", "Star", "Slip", "Stop"), 2, "Slip"),
            QuizQuestion("Which word has the sh sound?", listOf("Ship", "Ring", "Duck", "Tree"), 0, "Ship")
        )
    ),
    WordForestChapter(
        title = "Night Owl Boss",
        icon = "🦉",
        summary = "Finish the forest trail and face the final language guardian.",
        status = "Boss",
        difficulty = "Boss",
        questions = listOf(
            QuizQuestion("What sound does c make in City?", listOf("/k/", "/s/", "/ch/", "/sh/"), 1, "C"),
            QuizQuestion("What sound does g make in Giraffe?", listOf("/g/", "/j/", "/h/", "/f/"), 1, "G"),
            QuizQuestion("What sound does y make in Fly?", listOf("/ee/", "/i/", "/y/", "/ay/"), 1, "Y")
        )
    )
)

val mathCastleChapters = listOf(
    WordForestChapter(
        title = "Royal Numbers",
        icon = "🔢",
        summary = "Count the towers and guard the gates.",
        status = "Completed",
        difficulty = "Starter",
        questions = listOf(
            QuizQuestion("What number comes after 19?", listOf("18", "21", "20", "29"), 2),
            QuizQuestion("Which number is the biggest?", listOf("45", "92", "22", "88"), 1),
            QuizQuestion("Count by tens: 10, 20, 30, __?", listOf("40", "35", "50", "100"), 0)
        )
    ),
    WordForestChapter(
        title = "Addition Workshop",
        icon = "➕",
        summary = "Combine treasures to find the total.",
        status = "Ready",
        difficulty = "Guided",
        questions = listOf(
            QuizQuestion("What is 5 + 4?", listOf("7", "8", "9", "10"), 2),
            QuizQuestion("If you have 10 apples and get 5 more, how many?", listOf("15", "12", "10", "20"), 0),
            QuizQuestion("What is 12 + 8?", listOf("18", "20", "22", "19"), 1)
        )
    )
)

val spaceScienceChapters = listOf(
    WordForestChapter(
        title = "Solar System",
        icon = "🪐",
        summary = "Orbit the planets and learn their names.",
        status = "Ready",
        difficulty = "Quest",
        questions = listOf(
            QuizQuestion("Which planet is closest to the Sun?", listOf("Earth", "Mars", "Mercury", "Venus"), 2),
            QuizQuestion("Which is the largest planet?", listOf("Earth", "Jupiter", "Saturn", "Mars"), 1),
            QuizQuestion("Which planet is known as the Red Planet?", listOf("Venus", "Mars", "Jupiter", "Uranus"), 1)
        )
    )
)

val oceanKingdomChapters = listOf(
    WordForestChapter(
        title = "Marine Life",
        icon = "🐬",
        summary = "Meet the creatures of the deep ocean.",
        status = "Ready",
        difficulty = "Starter",
        questions = listOf(
            QuizQuestion("Which animal is NOT a fish?", listOf("Salmon", "Tuna", "Whale", "Cod"), 2),
            QuizQuestion("How do fish breathe underwater?", listOf("Lungs", "Gills", "Skin", "Nose"), 1),
            QuizQuestion("Which sea creature has 8 arms?", listOf("Starfish", "Crab", "Octopus", "Seahorse"), 2)
        )
    )
)

val dinoValleyChapters = listOf(
    WordForestChapter(
        title = "Ancient Earth",
        icon = "🌋",
        summary = "Travel back in time to the age of dinosaurs.",
        status = "Ready",
        difficulty = "Starter",
        questions = listOf(
            QuizQuestion("What is a fossil?", listOf("A new rock", "Remains of ancient life", "A type of food", "A shiny gem"), 1),
            QuizQuestion("Which dinosaur had a very long neck?", listOf("T-Rex", "Triceratops", "Brachiosaurus", "Velociraptor"), 2),
            QuizQuestion("What do herbivores eat?", listOf("Only Meat", "Only Plants", "Everything", "Rocks"), 1)
        )
    )
)

val creativeVillageChapters = listOf(
    WordForestChapter(
        title = "Canvas & Color",
        icon = "🎨",
        summary = "Master primary colors and sketching basics.",
        status = "Ready",
        difficulty = "Starter",
        questions = listOf(
            QuizQuestion("What are the three primary colours?", listOf("Red Green Blue", "Red Yellow Blue", "Orange Green Purple", "Pink Brown Grey"), 1),
            QuizQuestion("Which color is made by mixing Red and Blue?", listOf("Purple", "Green", "Orange", "Brown"), 0),
            QuizQuestion("Which instrument has black and white keys?", listOf("Guitar", "Drum", "Piano", "Violin"), 2)
        )
    )
)

