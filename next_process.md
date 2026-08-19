# Next Process

Follow-up plan after the code review and fix pass. Nothing below is committed yet — all changes described in "What was already done" are sitting in the working tree.

## Status at time of writing

| Check | Result |
|---|---|
| Android compiles | ✅ (after the import fix below) |
| Unit tests | ✅ 17/17 (`TelemetryTest` 13, `PlayerStateTest` 4) |
| `:app:assembleDebug` | ✅ `app-debug.apk`, ~23.9 MB |
| `vite build` (web-preview) | ✅ clean |
| Run on a real device | ❌ **never done** |
| CI | ❌ does not exist |

Build command used:

```
gradle -p WonderVerseAcademy :app:testDebugUnitTest :app:assembleDebug --no-daemon --console=plain
```

There is no `gradlew` wrapper in this project; Gradle 8.9 from `~/.gradle/wrapper/dists/gradle-8.9-bin/.../bin/gradle.bat` was used. AGP is 8.5.0.

---

## What was already done

### Build break (was blocking everything)

`LessonScreen.kt` had two `import` statements at lines 286-287, in the middle of the file after `LessonChip`'s closing brace. Kotlin only allows imports in the header, so `main` did not compile at all. Introduced by `7de5563 feat: add admob ads integration`.

Every commit since then, including the merge to `main`, was unbuildable — which means the AdMob integration has never run on a device.

### Progress wipe (critical)

The app had two persistence layers and only wrote to one. `DataStoreManager.savePlayerState` was never called from anywhere, yet `getPlayerState` was collected on every launch and *assigned into* `PlayerState` inside a `Flow.map`, so all 12 `?:` defaults fired and overwrote the real values loaded from SharedPreferences moments earlier. The `delay(1800)` in `SplashScreen` guaranteed the race resolved the wrong way essentially every time, so `isProfileSet` read `false` and the child was sent back through onboarding.

Worse: `LearningLog.persist()` calls `PlayerState.saveToPreferences()`, which writes *every* field. So the clobbered defaults were written back to disk on each launch — the bug destroyed the saved file, not just the in-memory copy.

Fixed by deleting the DataStore layer entirely (`DataStoreManager.kt` removed, `datastore-preferences` dependency dropped) and making SharedPreferences the single source of truth. `MainActivity` now loads synchronously, then rolls the streak directly.

No migration is needed: DataStore was never written, so there is no second store to reconcile. Progress already lost on existing installs cannot be recovered.

### Six further fixes

- **`RewardsScreen`** — rewarded-ad coins now go through `addRewards(..., context)` so they persist; the no-Activity branch shows an error instead of granting 50 free coins for a failure.
- **`RewardsScreen`** — mystery box derives from persisted `lastMysteryBoxDay` instead of `remember`, so it survives navigation and relaunch and re-arms daily as advertised; it now grants the reward it claims. "Star Cape costume" was removed from the copy — there is no costume system to grant it from. If one exists elsewhere, that line needs wiring rather than rewording.
- **`ApiClient` / `Models`** — added `PlayerState.updatedAt`; remote state is only adopted when strictly newer, and is persisted with `touch = false` so the server's timestamp survives into the next comparison.
- **`Telemetry.kt`** — `isScored` now checks `correct != null` too, closing a latent NPE in `percent` that would have crashed the parent dashboard.
- **`main.jsx` (Math Defender)** — `selectedEnemyId` moved to a ref and dropped from the spawn effect's deps; depending on it restarted the interval on every kill, so the horde spawner could never reach its delay for an active player.
- **`main.jsx` (Asteroid Blaster)** — triple-shot countdown keyed on a derived `tripleShotActive` boolean instead of the timer value, so the interval is created once per activation rather than rebuilt every tick.

---

## 1. Commit what is in the working tree

11 modified files, currently on `main`. Branch rather than committing to `main` directly. Split into two commits, because they are different kinds of change:

1. `fix: move stray mid-file imports in LessonScreen` — the build fix alone, so it is cherry-pickable and the "main was broken" moment stays legible in history.
2. `fix: make player progress persist` — DataStore removal, the six behaviour fixes, and the new tests.

## 2. Run it on a device — this is the real gate

Every fix so far is verified only by the compiler and unit tests. The things most likely to still be wrong are exactly what neither can see: whether progress survives a cold start, whether the ad callbacks fire, whether the banners render.

Current machine state: `adb` exists at `C:/Users/lokes/AppData/Local/Android/Sdk/platform-tools/adb.exe`, no device is connected, and the `emulator` package is **not** installed (only `build-tools`, `cmdline-tools`, `platforms`, `platform-tools`).

Two ways in:

- **Physical phone** (fastest) — enable USB debugging, plug in, then
  `adb install -r WonderVerseAcademy/app/build/outputs/apk/debug/app-debug.apk`
- **Emulator** — install first: `sdkmanager "emulator" "system-images;android-34;google_apis;x86_64"`, then create an AVD. Larger download.

### Manual QA pass, in this order

1. Fresh install → set name/avatar → **force-quit → relaunch**. Should land on the map with the name intact. This is the headline bug; if it fails, stop — nothing else matters.
2. Complete a lesson, note coins/XP → relaunch → numbers held.
3. Rewards screen → open mystery box → relaunch → still claimed, coins persisted. Rolling the device date forward a day should re-arm it.
4. Watch a rewarded ad → relaunch → coins held.
5. Parent dashboard → streak and time-on-task look sane, not the old fabricated 6-day default.
6. Confirm the two `AdBanner()` placements and three `showInterstitialAd` call sites actually appear — none have ever run.

## 3. Add CI

There is no `.github/workflows`. This is the root cause of the whole episode: a non-compiling commit reached `main` through a PR merge with nothing checking it. A single job running `:app:testDebugUnitTest :app:assembleDebug` on pull requests would have caught it in minutes. Roughly 20 lines.

## 4. Backend must send `updatedAt`

The merge policy fails closed: if the server does not emit `updatedAt`, `optLong("updatedAt", 0L)` returns `0` and remote state is **never** adopted, so sync is effectively off until the backend sends it.

Note there is no server in this repo at all — the web preview points at `http://localhost:3000/api/player` and Android at `http://10.0.2.2:3000/api/player`, and neither exists here. Decide whether sync is in scope for this release, or whether both clients should drop the fetch (which would also remove a failed request on every web-preview load).

## 5. Close the test gap

There is still no test for the actual save → reload round-trip, which is exactly where the critical bug lived. `saveToPreferences` needs a real `Context`, and this module has no Robolectric or instrumentation setup — every existing test passes `null` for context specifically to avoid it.

Add Robolectric (or an `androidTest` source set) and write the one test that would have caught this: earn coins → reload → assert they survive.

This bug class has now been patched field-by-field three times in this file — the `streakDays` special-case, the `learning_log` guard, and the `streak starts at one` test — without anyone tracing it to the root. A round-trip test is what stops a fourth.

---

## Known remaining items, not addressed

- `ParentDashboardScreen.kt:197,369,521` — `Divider` is deprecated, renamed `HorizontalDivider`. Cosmetic build warnings.
- `LessonScreen.kt:433` — unnecessary safe call on a non-null `TextToSpeech`.
- `web-preview` bundle is 528 kB (129 kB gzipped), over the 500 kB Vite warning threshold. Not urgent for a preview.

---

## Recommended order

Do **1** now, then **2** before anything else. Steps 3-5 are all worth doing, but none of them tell you whether the app actually works — only a device does.
