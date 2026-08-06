import io

with io.open('src/main.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('function MelodyMakerGame({ player, onBack, onComplete }) {')
end_idx = text.find('ReactDOM.createRoot(document.getElementById(\'root\')).render(<App />);')

magic_tiles_game = """function MelodyMakerGame({ player, onBack, onComplete }) {
  const gameState = React.useRef({
    status: 'intro', score: 0, level: 1, notes: [], lastSpawn: 0, speed: 0.8, songIndex: 0
  });
  
  const [renderTick, setRenderTick] = React.useState(0);
  const requestRef = React.useRef();
  
  const playNoteSound = () => {
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
      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  };

  const updateGame = () => {
    if (gameState.current.status !== 'playing') {
      requestRef.current = requestAnimationFrame(updateGame);
      return;
    }
    
    const now = Date.now();
    const state = gameState.current;

    // Faster spawn rate for Magic Tiles feel
    const spawnRate = 600 - Math.min((state.level - 1)*80 + state.score * 5, 400);
    
    if (now - state.lastSpawn > spawnRate) {
      // Magic tiles typically don't have overlapping horizontal notes, just one note per row
      // We will spawn exactly one tile
      state.notes.push({ id: now, lane: Math.floor(Math.random() * 4), y: -20, hit: false });
      state.lastSpawn = now;
    }

    let missed = false;
    state.notes.forEach(note => {
      // Speed increases as level and score go up
      note.y += state.speed + ((state.level - 1) * 0.15) + (state.score * 0.015);
      
      // If note reaches the very bottom (past the screen) and wasn't hit, GAME OVER
      if (note.y > 100 && !note.hit) { 
          missed = true; 
      }
    });
    
    if (missed) { 
        state.status = 'gameover'; 
    }

    // Clean up hit notes that have moved completely off screen
    state.notes = state.notes.filter(n => !(n.hit && n.y > 110));

    setRenderTick(t => t + 1);
    requestRef.current = requestAnimationFrame(updateGame);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);

  const startGame = () => {
    gameState.current = { status: 'playing', score: 0, level: 1, notes: [], lastSpawn: Date.now(), speed: 0.8, songIndex: 0 };
    setRenderTick(t => t + 1);
  };
  
  const startNextLevel = () => {
    gameState.current = {
      ...gameState.current, status: 'playing', score: 0, level: gameState.current.level + 1, notes: [], lastSpawn: Date.now(), songIndex: 0
    };
    setRenderTick(t => t + 1);
  };
  
  const tapLane = (lane) => {
    if (gameState.current.status !== 'playing') return;
    const state = gameState.current;
    
    // Find the lowest unhit note in the tapped lane
    const unhitNotesInLane = state.notes.filter(n => n.lane === lane && !n.hit);
    
    if (unhitNotesInLane.length > 0) {
      // Sort to get the lowest one (highest y value)
      unhitNotesInLane.sort((a, b) => b.y - a.y);
      const lowestNote = unhitNotesInLane[0];
      
      // In Magic Tiles, you can tap the tile anywhere on the screen, but it's usually at the bottom
      lowestNote.hit = true;
      state.score += 1;
      playNoteSound();
      
      // We don't remove it immediately, we let it turn translucent/glow to show it was hit
      
      if (state.score >= 30) {
         state.status = 'levelup';
      }
      setRenderTick(t => t + 1);
    } else {
      // Tapped an empty lane! In Magic Tiles, this is an instant Game Over.
      state.status = 'gameover';
      setRenderTick(t => t + 1);
    }
  };

  const state = gameState.current;

  return (
    <div className="screen active" style={{ background: '#111', color: '#fff', padding: 0, display: 'flex', flexDirection: 'column', position: 'absolute', overflow: 'hidden', width: '100%', height: '100%', userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'none' }}>
      
      {/* Back button */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 30 }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
      </div>

      {state.status === 'intro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '80px', marginBottom: '24px', animation: 'bounce-idle 1s infinite' }}>🎹</div>
          <h1 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '16px', color: '#69F0AE' }}>Magic Melody</h1>
          <p style={{ fontSize: '18px', color: '#ccc', marginBottom: '24px' }}>Tap the falling black tiles to play the music. Don't tap the empty lanes, and don't miss any tiles!</p>
          <button onClick={startGame} style={{ background: 'linear-gradient(135deg, #69F0AE, #00C853)', border: 'none', borderRadius: '32px', padding: '20px 48px', fontSize: '22px', fontWeight: 900, color: '#000', cursor: 'pointer', boxShadow: '0 12px 32px rgba(0,200,83,0.4)', zIndex: 20 }} type="button">
            Play Song
          </button>
        </div>
      )}

      {state.status === 'playing' && (
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          
          <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.6)', padding: '8px 24px', borderRadius: '24px', fontSize: '24px', fontWeight: 900, color: '#fff', border: '1px solid rgba(255,255,255,0.2)', zIndex: 20 }}>
            {state.score} / 30
          </div>

          {/* 4 Lanes Background */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around', background: '#fff' }}>
            {[0, 1, 2, 3].map(lane => (
              <div 
                key={lane} 
                onPointerDown={(e) => { e.preventDefault(); tapLane(lane); }}
                style={{ 
                  width: '25%', 
                  height: '100%', 
                  borderRight: lane < 3 ? '1px solid #ddd' : 'none',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                {/* Render notes for this lane */}
                {state.notes.filter(n => n.lane === lane).map(note => (
                  <div 
                    key={note.id} 
                    style={{
                      position: 'absolute',
                      top: `${note.y}%`,
                      left: '0',
                      width: '100%',
                      height: '22%', // Tall rectangular tile like Magic Tiles
                      background: note.hit ? 'rgba(105, 240, 174, 0.4)' : '#111',
                      borderBottom: note.hit ? 'none' : '4px solid #000',
                      boxShadow: note.hit ? '0 0 20px #69F0AE' : 'inset 0 2px 4px rgba(255,255,255,0.1)',
                      zIndex: 5,
                      transition: 'background 0.1s, box-shadow 0.1s'
                  }}>
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Bottom gradient fade for aesthetics */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '15%', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', pointerEvents: 'none', zIndex: 10 }} />
        </div>
      )}

      {state.status === 'gameover' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 30, background: 'rgba(0,0,0,0.8)' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🎶</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#FF5252', marginBottom: '12px' }}>Song Interrupted!</h2>
          <p style={{ fontSize: '20px', color: '#ccc', marginBottom: '40px' }}>You played {state.score} notes perfectly.</p>
          <button onClick={startGame} style={{ background: 'linear-gradient(135deg, #FF6EB4, #E0559B)', border: 'none', borderRadius: '32px', padding: '20px 48px', fontSize: '20px', fontWeight: 900, color: '#fff', cursor: 'pointer', marginBottom: '16px' }} type="button">
            Restart Song
          </button>
        </div>
      )}

      {state.status === 'levelup' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 30, background: 'rgba(0,0,0,0.9)' }}>
          <div style={{ fontSize: '100px', marginBottom: '20px', animation: 'bounce-idle 1s infinite' }}>🎵</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#69F0AE', marginBottom: '12px' }}>Level {state.level} Cleared!</h2>
          <p style={{ fontSize: '20px', color: '#ccc', marginBottom: '40px' }}>Ready for a faster tempo?</p>
          <button onClick={startNextLevel} style={{ background: 'linear-gradient(135deg, #69F0AE, #00C853)', border: 'none', borderRadius: '32px', padding: '20px 48px', fontSize: '20px', fontWeight: 900, color: '#000', cursor: 'pointer', marginBottom: '16px' }} type="button">
            Next Track
          </button>
        </div>
      )}
    </div>
  );
}
"""

new_text = text[:start_idx] + magic_tiles_game + '\n\n' + text[end_idx:]

with io.open('src/main.jsx', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Updated MelodyMaker to look and feel exactly like Magic Tiles!")
