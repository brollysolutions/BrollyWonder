package com.wonderverse.academy.data

import androidx.compose.runtime.mutableStateOf

data class JourneyCard(
    val title: String,
    val subtitle: String,
    val emoji: String,
    val questions: List<QuizQuestion>,
    val pronunciation: String? = null
)

data class JourneySection(
    val label: String,
    val hint: String,
    val card: JourneyCard
)

data class WorldJourney(
    val kingdomId: String,
    val sections: List<JourneySection>
)

object JourneyState {
    val selectedKingdomId = mutableStateOf("word_forest")
    val selectedSectionIndex = mutableStateOf(0)

    fun selectKingdom(kingdomId: String) {
        selectedKingdomId.value = kingdomId
        selectedSectionIndex.value = 0
    }

    fun selectSection(index: Int) {
        selectedSectionIndex.value = index.coerceIn(0, journeyForCurrentKingdom().sections.lastIndex)
    }

    fun currentJourney(): WorldJourney = journeyForKingdom(selectedKingdomId.value)

    fun journeyForCurrentKingdom(): WorldJourney = currentJourney()

    fun currentSection(): JourneySection {
        val journey = currentJourney()
        return journey.sections.getOrNull(selectedSectionIndex.value) ?: journey.sections.first()
    }
}

private fun q(
    question: String,
    options: List<String>,
    correctIndex: Int,
    pronunciation: String? = null
) = QuizQuestion(question = question, options = options, correctIndex = correctIndex, pronunciation = pronunciation)

val journeyWorlds = listOf(
    WorldJourney(
        kingdomId = "word_forest",
        sections = listOf(
            JourneySection(
                label = "Single Letters",
                hint = "Tap the sound to hear the letter.",
                card = JourneyCard(
                    title = "Single Letters",
                    subtitle = "Learn single letter sounds (A to Z).",
                    emoji = "🌱",
                    pronunciation = "A",
                    questions = listOf(
                        q("Which sound starts Apple?", listOf("/a/", "/b/", "/m/", "/t/"), 0, "A"),
                        q("Which letter makes the /m/ sound?", listOf("N", "P", "M", "S"), 2, "M"),
                        q("Find the letter that starts Cat.", listOf("K", "S", "D", "C"), 3, "C")
                    )
                )
            ),
            JourneySection(
                label = "Two-Letter Sounds",
                hint = "Combine letters to make simple sounds.",
                card = JourneyCard(
                    title = "Two-Letter Sounds",
                    subtitle = "Practice simple VC (Vowel-Consonant) blends.",
                    emoji = "🍀",
                    pronunciation = "an",
                    questions = listOf(
                        q("Read this sound: a + n", listOf("at", "an", "am", "ad"), 1, "an"),
                        q("Which sound matches 'in'?", listOf("/in/", "/on/", "/up/", "/it/"), 0, "in"),
                        q("Combine /o/ and /x/.", listOf("ox", "op", "ot", "od"), 0, "ox")
                    )
                )
            ),
            JourneySection(
                label = "Word Families",
                hint = "Words that sound the same at the end.",
                card = JourneyCard(
                    title = "Word Families",
                    subtitle = "Explore -at, -ig, and -ug rhyming words.",
                    emoji = "🦊",
                    questions = listOf(
                        q("Which word is in the -at family?", listOf("Dog", "Bat", "Run", "Hop"), 1, "Bat"),
                        q("Which word rhymes with Bug?", listOf("Rug", "Pig", "Sun", "Bed"), 0, "Rug"),
                        q("Which word does NOT belong in -ig?", listOf("Pig", "Dig", "Dog", "Big"), 2, "Dog")
                    )
                )
            ),
            JourneySection(
                label = "Words ending in \"x\"",
                hint = "The /ks/ sound of x at the end of words.",
                card = JourneyCard(
                    title = "Words ending in 'x'",
                    subtitle = "Listen to the /ks/ sound in box and fox.",
                    emoji = "📦",
                    pronunciation = "Fox",
                    questions = listOf(
                        q("Which animal has 'x' at the end?", listOf("Lion", "Fox", "Bear", "Frog"), 1, "Fox"),
                        q("What is this shape called?", listOf("Box", "Cup", "Toy", "Bag"), 0, "Box"),
                        q("Which number ends with the /ks/ sound?", listOf("Ten", "Five", "Six", "Two"), 2, "Six")
                    )
                )
            ),
            JourneySection(
                label = "Beginning Blends",
                hint = "Two consonants together at the start.",
                card = JourneyCard(
                    title = "Beginning Blends",
                    subtitle = "Master beginning blends like bl-, cl-, and fl-.",
                    emoji = "🌿",
                    pronunciation = "Fr",
                    questions = listOf(
                        q("What two letters start Frog?", listOf("Fl", "Fr", "Tr", "Pr"), 1, "Fr"),
                        q("Which word starts with the sl- blend?", listOf("Sun", "Star", "Slip", "Stop"), 2, "Slip"),
                        q("Find the blend that starts Blue.", listOf("Bl", "Cl", "Pl", "Gl"), 0, "Bl")
                    )
                )
            ),
            JourneySection(
                label = "End Blends",
                hint = "Consonant blends at the end of words.",
                card = JourneyCard(
                    title = "End Blends",
                    subtitle = "Master ending blends like -nd, -st, and -mp.",
                    emoji = "🌳",
                    questions = listOf(
                        q("Which word ends with -nd?", listOf("Hand", "Hat", "Hen", "Hop"), 0, "Hand"),
                        q("Which sound ends Nest?", listOf("-nt", "-st", "-mp", "-ld"), 1, "st"),
                        q("Find the word ending in -mp.", listOf("Lamp", "Leap", "Last", "Land"), 0, "Lamp")
                    )
                )
            ),
            JourneySection(
                label = "Digraphs",
                hint = "Two letters, one single sound.",
                card = JourneyCard(
                    title = "Digraphs",
                    subtitle = "Learn ch, sh, th, and wh sounds.",
                    emoji = "🍃",
                    pronunciation = "Ship",
                    questions = listOf(
                        q("Which word starts with the sh sound?", listOf("Ship", "Ring", "Duck", "Tree"), 0, "Ship"),
                        q("What sound starts Chair?", listOf("Sh", "Ch", "Th", "Wh"), 1, "Ch"),
                        q("Which word ends with the th sound?", listOf("Bath", "Bag", "Bat", "Bed"), 0, "Bath")
                    )
                )
            ),
            JourneySection(
                label = "Diphthongs",
                hint = "Gliding vowel sounds in words.",
                card = JourneyCard(
                    title = "Diphthongs",
                    subtitle = "Explore ou, ow, oi, and oy sounds.",
                    emoji = "🥥",
                    pronunciation = "Coin",
                    questions = listOf(
                        q("Which word has the 'oi' sound?", listOf("Coin", "Cone", "Can", "Cold"), 0, "Coin"),
                        q("Find the word with the 'ow' sound?", listOf("Cow", "Cat", "Cup", "Car"), 0, "Cow"),
                        q("Which word has the 'oy' sound?", listOf("Boy", "Boat", "Bed", "Bag"), 0, "Boy")
                    )
                )
            ),
            JourneySection(
                label = "Short & Long Vowels",
                hint = "The difference between short and long vowel sounds.",
                card = JourneyCard(
                    title = "Short & Long Vowels",
                    subtitle = "Hear the vowel change from tap to tape.",
                    emoji = "🔑",
                    questions = listOf(
                        q("Which word has a long /a/ sound?", listOf("Cat", "Hat", "Cake", "Map"), 2, "Cake"),
                        q("Which word has a short /i/ sound?", listOf("Kite", "Pig", "Ice", "Pie"), 1, "Pig"),
                        q("What makes the vowel long in 'Hope'?", listOf("Silent e at the end", "The letter H", "The letter p", "Nothing"), 0, "Silent e")
                    )
                )
            ),
            JourneySection(
                label = "R-Controlled Vowels",
                hint = "When letter r bossily changes the vowel sound.",
                card = JourneyCard(
                    title = "R-Controlled Vowels",
                    subtitle = "Learn ar, er, ir, or, and ur sounds.",
                    emoji = "🦉",
                    questions = listOf(
                        q("Which word has the /ar/ sound like in Star?", listOf("Car", "Cat", "Cup", "Cap"), 0, "Car"),
                        q("Chirp has which vowel sound?", listOf("ar", "ir", "or", "oo"), 1, "ir"),
                        q("Which word has the /or/ sound?", listOf("Fork", "Fox", "Fat", "Fit"), 0, "Fork")
                    )
                )
            ),
            JourneySection(
                label = "Alternate Sounds",
                hint = "When letters make unexpected or soft/hard sounds.",
                card = JourneyCard(
                    title = "Alternate Sounds",
                    subtitle = "Explore soft c and soft g.",
                    emoji = "🌈",
                    questions = listOf(
                        q("What sound does c make in City?", listOf("/k/", "/s/", "/ch/", "/sh/"), 1, "C"),
                        q("What sound does g make in Giraffe?", listOf("/g/", "/j/", "/h/", "/f/"), 1, "G"),
                        q("What sound does y make in Fly?", listOf("/ee/", "/i/", "/y/", "/ay/"), 1, "Y")
                    )
                )
            )
        )
    ),
    WorldJourney(
        kingdomId = "math_castle",
        sections = listOf(
            JourneySection(
                label = "Castle",
                hint = "Numbers and operations in the royal hall.",
                card = JourneyCard(
                    title = "Royal Numbers",
                    subtitle = "Count the towers and guard the gates.",
                    emoji = "🏰",
                    questions = listOf(
                        q("What number comes after 9?", listOf("8", "11", "10", "12"), 2),
                        q("Which number is the biggest?", listOf("15", "9", "22", "18"), 2),
                        q("What is the number for twenty-five?", listOf("52", "25", "205", "250"), 1)
                    )
                )
            ),
            JourneySection(
                label = "Workshop",
                hint = "Build with treasure, bridges, and gems.",
                card = JourneyCard(
                    title = "Builder Workshop",
                    subtitle = "Solve the castle tools and gem puzzles.",
                    emoji = "🛠️",
                    questions = listOf(
                        q("What is 5 + 3?", listOf("7", "8", "9", "6"), 1),
                        q("What is 10 - 4?", listOf("5", "7", "6", "8"), 2),
                        q("What is 3 x 4?", listOf("10", "11", "12", "13"), 2)
                    )
                )
            ),
            JourneySection(
                label = "Royal Trial",
                hint = "A final castle challenge with rewards.",
                card = JourneyCard(
                    title = "Royal Trial",
                    subtitle = "Prove your number magic to the castle crown.",
                    emoji = "👑",
                    questions = listOf(
                        q("What is 12 divided by 3?", listOf("3", "4", "5", "6"), 1),
                        q("What is 20 - 9?", listOf("10", "11", "12", "9"), 1),
                        q("What is 6 + 6?", listOf("11", "10", "12", "13"), 2)
                    )
                )
            )
        )
    ),
    WorldJourney(
        kingdomId = "space_science",
        sections = listOf(
            JourneySection(
                label = "Mission",
                hint = "Launch into the planets and the Sun.",
                card = JourneyCard(
                    title = "Launch Mission",
                    subtitle = "Prepare the ship and choose the correct orbit.",
                    emoji = "🚀",
                    questions = listOf(
                        q("Which planet is closest to the Sun?", listOf("Earth", "Mars", "Mercury", "Venus"), 2),
                        q("How many planets are in our solar system?", listOf("7", "8", "9", "10"), 1),
                        q("What is at the centre of our solar system?", listOf("Earth", "Moon", "Mars", "Sun"), 3)
                    )
                )
            ),
            JourneySection(
                label = "Galaxy",
                hint = "Explore stars, planets, and tools.",
                card = JourneyCard(
                    title = "Galaxy Lab",
                    subtitle = "Sort the space clues before the stars fade.",
                    emoji = "🌌",
                    questions = listOf(
                        q("What tool helps us see distant stars?", listOf("Telescope", "Spoon", "Bucket", "Clock"), 0),
                        q("Which planet is known for its rings?", listOf("Mercury", "Earth", "Saturn", "Mars"), 2),
                        q("What is a star in our sky called?", listOf("Sun", "Stone", "Rock", "Cloud"), 0)
                    )
                )
            ),
            JourneySection(
                label = "AI Core",
                hint = "Final challenge in the space control room.",
                card = JourneyCard(
                    title = "AI Core",
                    subtitle = "Wake the core and finish the mission.",
                    emoji = "🤖",
                    questions = listOf(
                        q("What force keeps planets in orbit?", listOf("Wind", "Gravity", "Rain", "Sound"), 1),
                        q("Which object orbits Earth?", listOf("Moon", "Sun", "Mars", "Comet"), 0),
                        q("What do rockets need to launch?", listOf("Fuel", "Ice", "Leaves", "Sand"), 0)
                    )
                )
            )
        )
    ),
    WorldJourney(
        kingdomId = "ocean_kingdom",
        sections = listOf(
            JourneySection(
                label = "Voyage",
                hint = "Sail through the ocean and name the seas.",
                card = JourneyCard(
                    title = "Captain Voyage",
                    subtitle = "Chart the water path across the world.",
                    emoji = "⛵",
                    questions = listOf(
                        q("Which is the largest ocean?", listOf("Atlantic", "Indian", "Arctic", "Pacific"), 3),
                        q("How many oceans are on Earth?", listOf("3", "4", "5", "6"), 2),
                        q("What covers most of Earth's surface?", listOf("Land", "Ice", "Water", "Sand"), 2)
                    )
                )
            ),
            JourneySection(
                label = "Reef",
                hint = "Meet sea animals and water-cycle clues.",
                card = JourneyCard(
                    title = "Reef Workshop",
                    subtitle = "Match reef life with the right clue.",
                    emoji = "🐠",
                    questions = listOf(
                        q("Which animal is NOT a fish?", listOf("Salmon", "Tuna", "Whale", "Cod"), 2),
                        q("How do fish breathe?", listOf("Lungs", "Gills", "Skin", "Nose"), 1),
                        q("What is a group of fish called?", listOf("Pack", "Herd", "School", "Flock"), 2)
                    )
                )
            ),
            JourneySection(
                label = "Sea Guardian",
                hint = "Face the final ocean guardian.",
                card = JourneyCard(
                    title = "Sea Guardian",
                    subtitle = "Finish the tide quest and calm the waves.",
                    emoji = "🐙",
                    questions = listOf(
                        q("What is the first step of the water cycle?", listOf("Precipitation", "Evaporation", "Condensation", "Collection"), 1),
                        q("What happens when clouds get heavy?", listOf("Evaporation", "Condensation", "Precipitation", "Absorption"), 2),
                        q("Water vapour turning into clouds is called?", listOf("Evaporation", "Condensation", "Precipitation", "Runoff"), 1)
                    )
                )
            )
        )
    ),
    WorldJourney(
        kingdomId = "history_kingdom",
        sections = listOf(
            JourneySection(
                label = "Fossils",
                hint = "Discover the clues buried in history.",
                card = JourneyCard(
                    title = "Time Dig",
                    subtitle = "Uncover the places and people of the past.",
                    emoji = "🪨",
                    questions = listOf(
                        q("Who is called the Father of the Nation of India?", listOf("Nehru", "Ambedkar", "Gandhi", "Bose"), 2),
                        q("What is the national animal of India?", listOf("Elephant", "Lion", "Tiger", "Peacock"), 2),
                        q("When did India gain independence?", listOf("1945", "1947", "1950", "1952"), 1)
                    )
                )
            ),
            JourneySection(
                label = "Expedition",
                hint = "Travel across maps, culture, and landmarks.",
                card = JourneyCard(
                    title = "History Expedition",
                    subtitle = "Follow the route through countries and maps.",
                    emoji = "🧭",
                    questions = listOf(
                        q("Which is the largest continent?", listOf("Africa", "Europe", "Asia", "Australia"), 2),
                        q("What does a compass show?", listOf("Distance", "Direction", "Height", "Speed"), 1),
                        q("Which direction does the sun rise?", listOf("West", "South", "East", "North"), 2)
                    )
                )
            ),
            JourneySection(
                label = "Alpha Dino",
                hint = "The final guardian of the valley of time.",
                card = JourneyCard(
                    title = "Alpha Dino",
                    subtitle = "Face the final challenge of the old world.",
                    emoji = "🦖",
                    questions = listOf(
                        q("What is the national language of India?", listOf("English", "Tamil", "Hindi", "Bengali"), 2),
                        q("What is the national bird of India?", listOf("Eagle", "Pigeon", "Peacock", "Parrot"), 2),
                        q("Republic Day of India is on?", listOf("15 August", "26 January", "2 October", "14 November"), 1)
                    )
                )
            )
        )
    ),
    WorldJourney(
        kingdomId = "creative_village",
        sections = listOf(
            JourneySection(
                label = "Canvas",
                hint = "Start with drawing and colour clues.",
                card = JourneyCard(
                    title = "Drawing Canvas",
                    subtitle = "Pick the right tools and colours.",
                    emoji = "🎨",
                    questions = listOf(
                        q("What are the three primary colours?", listOf("Red Green Blue", "Red Yellow Blue", "Orange Green Purple", "Pink Brown Grey"), 1),
                        q("What do you use to sketch lightly?", listOf("Brush", "Pencil", "Marker", "Crayon"), 1),
                        q("What is the outline of a drawing called?", listOf("Shading", "Texture", "Contour", "Hue"), 2)
                    )
                )
            ),
            JourneySection(
                label = "Studio",
                hint = "Build music, dance, and craft skills.",
                card = JourneyCard(
                    title = "Creative Studio",
                    subtitle = "Arrange the sound and movement clues.",
                    emoji = "🎵",
                    questions = listOf(
                        q("How many notes are in a musical scale?", listOf("5", "6", "7", "8"), 2),
                        q("Which instrument has keys?", listOf("Guitar", "Drum", "Piano", "Violin"), 2),
                        q("What is origami?", listOf("Paper painting", "Paper folding", "Paper tearing", "Paper printing"), 1)
                    )
                )
            ),
            JourneySection(
                label = "Spark",
                hint = "The final celebration of creativity.",
                card = JourneyCard(
                    title = "Spark Trial",
                    subtitle = "Use imagination to finish the village quest.",
                    emoji = "🌈",
                    questions = listOf(
                        q("What does creativity mean?", listOf("Copying others", "Following rules only", "Making new and original ideas", "Reading books"), 2),
                        q("Which activity uses imagination most?", listOf("Memorising tables", "Inventing a story", "Copying a drawing", "Reading instructions"), 1),
                        q("What inspires artists?", listOf("Only other art", "Nature feelings and ideas", "Only rules", "Only money"), 1)
                    )
                )
            )
        )
    )
)

fun journeyForKingdom(kingdomId: String): WorldJourney = journeyWorlds.firstOrNull { it.kingdomId == kingdomId } ?: journeyWorlds.first()
