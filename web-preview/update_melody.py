import io

with io.open('src/main.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the state initialization to include songIndex
old_init = """    status: 'intro', score: 0, level: 1, notes: [], lastSpawn: 0, speed: 0.35"""
new_init = """    status: 'intro', score: 0, level: 1, notes: [], lastSpawn: 0, speed: 0.35, songIndex: 0"""

text = text.replace(old_init, new_init)

old_init2 = """    gameState.current = { status: 'playing', score: 0, level: 1, notes: [], lastSpawn: Date.now(), speed: 0.35 };"""
new_init2 = """    gameState.current = { status: 'playing', score: 0, level: 1, notes: [], lastSpawn: Date.now(), speed: 0.35, songIndex: 0 };"""

text = text.replace(old_init2, new_init2)

old_init3 = """      ...gameState.current, status: 'playing', score: 0, level: gameState.current.level + 1, notes: [], lastSpawn: Date.now()"""
new_init3 = """      ...gameState.current, status: 'playing', score: 0, level: gameState.current.level + 1, notes: [], lastSpawn: Date.now(), songIndex: 0"""

text = text.replace(old_init3, new_init3)

old_play_sound = """  const playNoteSound = (lane) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const freqs = [261.63, 329.63, 392.00, 523.25];
      osc.frequency.value = freqs[lane];
      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  };"""

new_play_sound = """  const playNoteSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Twinkle Twinkle Little Star melody
      const song = [
        261.63, 261.63, 392.00, 392.00, 440.00, 440.00, 392.00,
        349.23, 349.23, 329.63, 329.63, 293.66, 293.66, 261.63
      ];
      
      const state = gameState.current;
      const freq = song[state.songIndex % song.length];
      state.songIndex += 1;

      osc.frequency.value = freq;
      osc.type = 'sine'; // or 'triangle' for a softer tone
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  };"""

text = text.replace(old_play_sound, new_play_sound)

old_tap_lane = """      playNoteSound(lane);"""
new_tap_lane = """      playNoteSound();"""

text = text.replace(old_tap_lane, new_tap_lane)

with io.open('src/main.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated MelodyMaker to play a real song!")
