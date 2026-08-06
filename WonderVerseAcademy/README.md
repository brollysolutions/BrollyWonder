# WonderVerse Academy — Android Prototype

A gamified, adventure-based educational app for **Nursery to 1st Grade** children, featuring interactive phonics lessons, mini-games, and a premium Glassmorphism UI.

## ✨ What's Included

### 🌐 Web Preview (Fully Functional Prototype)

- **Splash Screen** — Animated "Crystal of Knowledge" intro with pulsing effects
- **Avatar Creation** — Pick an emoji avatar + explorer name
- **Kingdom Map** — 6 learning kingdoms displayed as an interactive journey path with zig-zag nodes, progress stars, and glow effects
  - 🌳 Word Forest (English / Phonics)
  - 🏰 Math Castle (Mathematics)
  - 🚀 Space Science (Science)
  - 🌊 Ocean Kingdom (EVS)
  - 📜 History Kingdom (Social Studies)
  - 🎨 Creative Village (Art & Music)
- **Kingdom Detail** — Quest-style lesson cards with locked/completed/in-progress states and boss battle entry
- **Lesson / Quiz Flow** — 3-question interactive quizzes with instant feedback and animated reward popups (coins, XP, stars)
- **Virtual Pet** — Egg hatching mechanic tied to learning progress
- **Treasure Vault** — Collectible items and coin tracking

### 🎮 Nursery Mini-Games

- **🎈 Alphabet Balloon Pop** — Colorful balloons float up with letters; tap to pop and hear the letter pronounced with a word (e.g., "A for Apple"). Includes pop sound effects via Web Audio API.
- **🐾 Animal Hide-and-Seek** — Animals peek out from bushes; tap them to hear their sounds
- **🍎 Fruit Catch** — Drag a basket to catch falling fruits with collision detection

### 📚 Phonics Curriculum (Nursery to 1st Grade)

11 structured phonics lessons with interactive quizzes:

1. Single Letters
2. Two-Letter Sounds
3. Word Families
4. Words ending in "x"
5. Beginning Blends
6. End Blends
7. Digraphs
8. Diphthongs
9. Short & Long Vowels
10. R-Controlled Vowels
11. Alternate Sounds

### 📱 Android App (Jetpack Compose Scaffold)

- Splash, Avatar, Kingdom Map, Kingdom Detail, Lesson, Pet, and Rewards screens
- All data mocked in-memory (`data/Models.kt`) — no backend, no network calls
- State (coins, XP, level, pet stats) held in a `PlayerState` singleton

## 🚀 Run It

### Web Preview (Recommended for Testing)

```bash
cd web-preview
python -m http.server 8765
```
Then open [http://localhost:8765](http://localhost:8765) in your browser.

> **Tip:** For development without caching issues, use the custom server:
> ```bash
> python server.py
> ```

### Android App

1. Open the `WonderVerseAcademy/` folder in **Android Studio** (Koala/2024.1+ recommended).
2. Let Gradle sync — it pulls Compose BOM 2024.06, Navigation Compose, Material3.
3. Run on an emulator or device with **minSdk 26 (Android 8.0)+**.

> If Gradle sync flags a version mismatch (AGP/Kotlin/Compose compiler), bump versions in
> `build.gradle.kts` / `app/build.gradle.kts` to match your Android Studio installation.

## 📁 Project Structure

```
WonderVerseAcademy-AndroidPrototype/
├── web-preview/                    # Fully functional web prototype
│   ├── index.html                  # Main HTML with all screen layouts
│   ├── style.css                   # Glassmorphism UI + animations
│   ├── app_v3.js                   # Game logic, curriculum, quiz engine
│   └── server.py                   # Cache-free dev server
│
└── WonderVerseAcademy/             # Android Jetpack Compose app
    └── app/src/main/java/com/wonderverse/academy/
        ├── MainActivity.kt
        ├── data/Models.kt          # Kingdom, QuizQuestion, Badge models + PlayerState
        ├── nav/WonderNavHost.kt    # Navigation graph
        ├── ui/theme/               # Color.kt, Type.kt, Theme.kt
        ├── ui/components/          # StatusBar.kt, XpBar.kt
        └── ui/screens/
            ├── SplashScreen.kt
            ├── AvatarScreen.kt
            ├── KingdomMapScreen.kt
            ├── KingdomDetailScreen.kt
            ├── LessonScreen.kt
            ├── PetScreen.kt
            └── RewardsScreen.kt
```

## 🎨 Design System

- **UI Style:** Premium Glassmorphism with gradient backgrounds, frosted glass cards, and glow effects
- **Typography:** Outfit (Google Fonts) — weights 400/600/700/800
- **Color Palette:** Deep purple (#6C4AB6), warm cream (#FFF8EC), vibrant accent colors per kingdom
- **Animations:** CSS keyframes + Web Animations API for balloon physics, micro-interactions on all buttons
- **Mobile-First:** Constrained to 390×820px phone frame for consistent cross-device rendering

## 🛣️ Roadmap

- [ ] LocalStorage persistence for coins, XP, and lesson progress
- [ ] Complete all 6 kingdoms with full quiz content
- [ ] Add AI Tutor (LLM) integration for adaptive learning
- [ ] TTS/STT for read-aloud lessons and voice answers
- [ ] Parent Dashboard and Teacher Dashboard
- [ ] Migrate web prototype to native Android (Kotlin/Jetpack Compose)
- [ ] Backend integration (FastAPI/PostgreSQL)
