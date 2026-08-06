import io
import sys

with io.open('src/main.jsx', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Find the start of DeepSeaDiverGame
start_idx = text.find('function DeepSeaDiverGame({ player, onBack, onComplete }) {')

if start_idx == -1:
    print("Could not find DeepSeaDiverGame")
    sys.exit(1)

good_text = """function DeepSeaDiverGame({ player, onBack, onComplete }) {
  const gameState = React.useRef({
    status: 'intro', // intro, playing, gameover, victory
    score: 0,
    y: 50,
    velocity: 0,
    obstacles: [],
    lastSpawn: 0,
    gravity: 0.04,
    swimForce: -1.2
  });
  
  const [renderTick, setRenderTick] = React.useState(0);
  const requestRef = React.useRef();

  const updateGame = () => {
    if (gameState.current.status !== 'playing') {
      requestRef.current = requestAnimationFrame(updateGame);
      return;
    }
    
    const now = Date.now();
    const state = gameState.current;

    state.velocity += state.gravity;
    state.velocity = Math.min(state.velocity, 2.0);
    state.y += state.velocity;

    if (state.y > 95 || state.y < 0) {
       state.status = 'gameover';
    }

    if (now - state.lastSpawn > 2000 - Math.min(state.score * 50, 800)) {
      const gapSize = Math.max(15, 35 - (state.score * 1.5));
      const gapTop = 20 + Math.random() * (100 - 40 - gapSize);
      state.obstacles.push({
        id: now,
        x: 100,
        gapTop,
        gapSize,
        passed: false
      });
      state.lastSpawn = now;
    }

    state.obstacles.forEach(obs => {
      obs.x -= 0.6 + (state.score * 0.02);
      
      if (obs.x < 25 && obs.x > 10) {
         if (state.y < obs.gapTop || state.y > obs.gapTop + (obs.gapSize || 30)) {
            state.status = 'gameover';
         }
      }

      if (obs.x < 10 && !obs.passed) {
         obs.passed = true;
         state.score += 1;
      }
    });

    state.obstacles = state.obstacles.filter(obs => obs.x > -20);

    setRenderTick(t => t + 1);
    requestRef.current = requestAnimationFrame(updateGame);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handlePointerDown = (e) => {
    if (gameState.current.status !== 'playing') return;
    e.preventDefault();
    gameState.current.velocity = gameState.current.swimForce;
  };

  const startGame = () => {
    gameState.current = {
      status: 'playing',
      score: 0,
      y: 50,
      velocity: 0,
      obstacles: [],
      lastSpawn: Date.now(),
      gravity: 0.04,
      swimForce: -1.2
    };
    setRenderTick(t => t + 1);
  };

  const state = gameState.current;

  return (
    <div 
      className="screen active" 
      onPointerDown={handlePointerDown}
      style={{ background: 'linear-gradient(180deg, #0277BD 0%, #01579B 100%)', color: '#fff', padding: 0, display: 'flex', flexDirection: 'column', position: 'absolute', overflow: 'hidden', width: '100%', height: '100%', userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'none' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', zIndex: 10 }}>
        <button onClick={(e) => { e.stopPropagation(); onBack(); }} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
      </div>

      {state.status === 'intro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '80px', marginBottom: '24px', animation: 'bounce-idle 2s infinite' }}>🤿</div>
          <h1 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '16px', color: '#81D4FA' }}>Deep Sea Diver</h1>
          <p style={{ fontSize: '18px', color: '#E1F5FE', marginBottom: '24px' }}>Tap anywhere to swim up and navigate through the coral gaps!</p>
          <button onClick={(e) => { e.stopPropagation(); startGame(); }} style={{ background: 'linear-gradient(135deg, #29B6F6, #0277BD)', border: 'none', borderRadius: '32px', padding: '20px 48px', fontSize: '22px', fontWeight: 900, color: '#fff', cursor: 'pointer', boxShadow: '0 12px 32px rgba(2,119,189,0.4)', zIndex: 20 }} type="button">
            Dive In
          </button>
        </div>
      )}

      {state.status === 'playing' && (
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', pointerEvents: 'none' }}>
          
          <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.4)', padding: '8px 24px', borderRadius: '24px', fontSize: '20px', fontWeight: 900, color: '#81D4FA', border: '1px solid rgba(129,212,250,0.3)', boxShadow: '0 0 12px rgba(0,0,0,0.2)', zIndex: 10 }}>
            Passed: {state.score}
          </div>

          {state.obstacles.map(obs => (
            <React.Fragment key={obs.id}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: `${obs.x}%`,
                width: '15%',
                height: `${obs.gapTop}%`,
                background: 'linear-gradient(90deg, #FF7043, #D84315)',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                boxShadow: '-4px 0 10px rgba(0,0,0,0.2)',
                border: '2px solid #BF360C',
                borderTop: 'none',
                zIndex: 4
              }} />
              <div style={{
                position: 'absolute',
                top: `${obs.gapTop + (obs.gapSize || 30)}%`,
                left: `${obs.x}%`,
                width: '15%',
                height: `${100 - (obs.gapTop + (obs.gapSize || 30))}%`,
                background: 'linear-gradient(90deg, #FF7043, #D84315)',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                boxShadow: '-4px 0 10px rgba(0,0,0,0.2)',
                border: '2px solid #BF360C',
                borderBottom: 'none',
                zIndex: 4
              }} />
            </React.Fragment>
          ))}

          <div style={{ 
            position: 'absolute', 
            top: `${state.y}%`, 
            left: '20%', 
            transform: `translate(-50%, -50%) rotate(${state.velocity * 15}deg)`, 
            fontSize: '50px', 
            zIndex: 6, 
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))'
          }}>
            🐡
          </div>
        </div>
      )}

      {state.status === 'gameover' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>💫</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#FF5252', marginBottom: '12px' }}>Ouch!</h2>
          <p style={{ fontSize: '20px', color: '#E1F5FE', marginBottom: '40px' }}>You navigated {state.score} coral gaps.</p>
          <button onClick={(e) => { e.stopPropagation(); startGame(); }} style={{ background: 'linear-gradient(135deg, #29B6F6, #0277BD)', border: 'none', borderRadius: '32px', padding: '20px 48px', fontSize: '20px', fontWeight: 900, color: '#fff', cursor: 'pointer', marginBottom: '16px', zIndex: 20 }} type="button">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

function DinoJumperGame({ player, onBack, onComplete }) {
  const gameState = React.useRef({
    status: 'intro',
    score: 0,
    level: 1,
    y: 0,
    velocity: 0,
    obstacles: [],
    lastSpawn: Date.now(),
    gravity: -0.6,
    jumpForce: 8.0
  });
  
  const [renderTick, setRenderTick] = React.useState(0);
  const requestRef = React.useRef();

  const updateGame = () => {
    if (gameState.current.status !== 'playing') {
      requestRef.current = requestAnimationFrame(updateGame);
      return;
    }
    
    const now = Date.now();
    const state = gameState.current;

    state.velocity += state.gravity;
    state.y += state.velocity;
    if (state.y <= 0) {
       state.y = 0;
       state.velocity = 0;
    }

    if (now - state.lastSpawn > 1100 - Math.min((state.level - 1) * 200 + (state.score * 10), 700)) {
      if (Math.random() > 0.3) {
        state.obstacles.push({
          id: now,
          x: 100,
          type: Math.random() > 0.5 ? 'cactus' : 'rock',
          passed: false
        });
        
        if (state.level > 1 && Math.random() > 0.7) {
           state.obstacles.push({
             id: now + 1,
             x: 108,
             type: Math.random() > 0.5 ? 'cactus' : 'rock',
             passed: false
           });
        }
        
        state.lastSpawn = now;
      }
    }

    state.obstacles.forEach(obs => {
      obs.x -= 1.6 + ((state.level - 1) * 0.5) + (state.score * 0.02);
      
      if (obs.x < 25 && obs.x > 10) {
         if (state.y < 20) {
            state.status = 'gameover';
         }
      }

      if (obs.x < 10 && !obs.passed) {
         obs.passed = true;
         state.score += 1;
         if (state.score >= 15) {
             state.status = 'levelup';
         }
      }
    });

    state.obstacles = state.obstacles.filter(obs => obs.x > -20);
    setRenderTick(t => t + 1);
    requestRef.current = requestAnimationFrame(updateGame);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handlePointerDown = (e) => {
    if (gameState.current.status !== 'playing') return;
    e.preventDefault();
    if (gameState.current.y === 0) {
       gameState.current.velocity = gameState.current.jumpForce;
    }
  };

  const startGame = () => {
    gameState.current = {
      status: 'playing',
      score: 0,
      level: 1,
      y: 0,
      velocity: 0,
      obstacles: [],
      lastSpawn: Date.now(),
      gravity: -0.6,
      jumpForce: 8.0
    };
    setRenderTick(t => t + 1);
  };
  
  const startNextLevel = () => {
    gameState.current = {
      ...gameState.current,
      status: 'playing',
      score: 0,
      level: gameState.current.level + 1,
      y: 0,
      velocity: 0,
      obstacles: [],
      lastSpawn: Date.now()
    };
    setRenderTick(t => t + 1);
  };

  const state = gameState.current;

  return (
    <div 
      className="screen active" 
      onPointerDown={handlePointerDown}
      style={{ background: 'linear-gradient(180deg, #FFB74D 0%, #F57C00 100%)', color: '#fff', padding: 0, display: 'flex', flexDirection: 'column', position: 'absolute', overflow: 'hidden', width: '100%', height: '100%', userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'none' }}
    >
      <div style={{ position: 'absolute', top: '10%', left: '10%', fontSize: '40px', opacity: 0.2 }}>☁️</div>
      <div style={{ position: 'absolute', top: '15%', right: '20%', fontSize: '60px', opacity: 0.1 }}>☁️</div>
      <div style={{ position: 'absolute', top: '50%', right: '5%', fontSize: '100px', opacity: 0.1 }}>🌋</div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '20%', background: '#5D4037', borderTop: '4px solid #3E2723' }}>
        <div style={{ position: 'absolute', top: '10px', left: '20%', width: '10px', height: '4px', background: '#3E2723', borderRadius: '2px' }} />
        <div style={{ position: 'absolute', top: '25px', left: '60%', width: '15px', height: '4px', background: '#3E2723', borderRadius: '2px' }} />
        <div style={{ position: 'absolute', top: '15px', left: '85%', width: '8px', height: '4px', background: '#3E2723', borderRadius: '2px' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', zIndex: 10 }}>
        <button onClick={(e) => { e.stopPropagation(); onBack(); }} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
      </div>

      {state.status === 'intro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '80px', marginBottom: '24px', animation: 'bounce-idle 1s infinite' }}><span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>🦖</span></div>
          <h1 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '16px', color: '#FFE082' }}>Dino Jumper</h1>
          <p style={{ fontSize: '18px', color: '#FFF8E1', marginBottom: '24px' }}>Tap the screen to jump over the obstacles and run as far as you can!</p>
          <button onClick={(e) => { e.stopPropagation(); startGame(); }} style={{ background: 'linear-gradient(135deg, #795548, #3E2723)', border: 'none', borderRadius: '32px', padding: '20px 48px', fontSize: '22px', fontWeight: 900, color: '#fff', cursor: 'pointer', boxShadow: '0 12px 32px rgba(62,39,35,0.4)', zIndex: 20 }} type="button">
            Start Running
          </button>
        </div>
      )}

      {state.status === 'playing' && (
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', pointerEvents: 'none' }}>
          
          <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.4)', padding: '8px 24px', borderRadius: '24px', fontSize: '20px', fontWeight: 900, color: '#FFE082', border: '1px solid rgba(255,224,130,0.3)', boxShadow: '0 0 12px rgba(0,0,0,0.2)', zIndex: 10 }}>
            Score: {state.score}
          </div>

          {state.obstacles.map(obs => (
            <div key={obs.id} style={{
              position: 'absolute',
              bottom: '20%',
              left: `${obs.x}%`,
              fontSize: '50px',
              transform: 'translate(-50%, 15px)',
              zIndex: 4,
              filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.3))'
            }}>
              {obs.type === 'cactus' ? '🌵' : '🪨'}
            </div>
          ))}

          <div style={{ 
            position: 'absolute', 
            bottom: `calc(20% + ${state.y}%)`, 
            left: '20%', 
            transform: `translate(-50%, 15px) scaleX(-1)`, 
            fontSize: '60px', 
            zIndex: 6, 
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))'
          }}>
            🦖
          </div>
        </div>
      )}

      {state.status === 'gameover' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>💫</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#FF5252', marginBottom: '12px' }}>Ouch!</h2>
          <p style={{ fontSize: '20px', color: '#FFF8E1', marginBottom: '40px' }}>You reached Level {state.level}!</p>
          <button onClick={(e) => { e.stopPropagation(); startGame(); }} style={{ background: 'linear-gradient(135deg, #795548, #3E2723)', border: 'none', borderRadius: '32px', padding: '20px 48px', fontSize: '20px', fontWeight: 900, color: '#fff', cursor: 'pointer', marginBottom: '16px', zIndex: 20 }} type="button">
            Try Again
          </button>
        </div>
      )}
      
      {state.status === 'levelup' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🌟</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#FFD54F', marginBottom: '12px' }}>Level {state.level} Complete!</h2>
          <p style={{ fontSize: '20px', color: '#FFF8E1', marginBottom: '40px' }}>Get ready for Level {state.level + 1}...</p>
          <button onClick={(e) => { e.stopPropagation(); startNextLevel(); }} style={{ background: 'linear-gradient(135deg, #FFB74D, #F57C00)', border: 'none', borderRadius: '32px', padding: '20px 48px', fontSize: '20px', fontWeight: 900, color: '#fff', cursor: 'pointer', marginBottom: '16px', zIndex: 20 }} type="button">
            Next Level
          </button>
        </div>
      )}
    </div>
  );
}

function MelodyMakerGame({ player, onBack, onComplete }) {
  const gameState = React.useRef({
    status: 'intro',
    score: 0,
    notes: [],
    lastSpawn: 0,
    speed: 0.35
  });
  
  const [renderTick, setRenderTick] = React.useState(0);
  const requestRef = React.useRef();
  
  const playNoteSound = (lane) => {
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
  };

  const updateGame = () => {
    if (gameState.current.status !== 'playing') {
      requestRef.current = requestAnimationFrame(updateGame);
      return;
    }
    
    const now = Date.now();
    const state = gameState.current;

    if (now - state.lastSpawn > 1000 - Math.min(state.score * 30, 700)) {
      state.notes.push({
        id: now,
        lane: Math.floor(Math.random() * 4),
        y: -10,
        hit: false
      });
      state.lastSpawn = now;
    }

    let missed = false;
    state.notes.forEach(note => {
      note.y += state.speed + (state.score * 0.05);
      if (note.y > 95 && !note.hit) {
        missed = true;
      }
    });
    
    if (missed) {
      state.status = 'gameover';
    }

    setRenderTick(t => t + 1);
    requestRef.current = requestAnimationFrame(updateGame);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const startGame = () => {
    gameState.current = {
      status: 'playing',
      score: 0,
      notes: [],
      lastSpawn: Date.now(),
      speed: 0.35
    };
    setRenderTick(t => t + 1);
  };
  
  const tapLane = (lane) => {
    if (gameState.current.status !== 'playing') return;
    const state = gameState.current;
    const hitNoteIndex = state.notes.findIndex(n => n.lane === lane && n.y > 70 && n.y < 95 && !n.hit);
    if (hitNoteIndex !== -1) {
      state.notes[hitNoteIndex].hit = true;
      state.score += 1;
      playNoteSound(lane);
      state.notes.splice(hitNoteIndex, 1);
      setRenderTick(t => t + 1);
    }
  };

  const state = gameState.current;
  const laneColors = ['#FF5252', '#FFD740', '#69F0AE', '#448AFF'];

  return (
    <div 
      className="screen active" 
      style={{ background: 'linear-gradient(180deg, #1E122A 0%, #0F0816 100%)', color: '#fff', padding: 0, display: 'flex', flexDirection: 'column', position: 'absolute', overflow: 'hidden', width: '100%', height: '100%', userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'none' }}
    >
      <div style={{ position: 'absolute', top: '15%', left: '5%', fontSize: '40px', opacity: 0.1 }}>🎵</div>
      <div style={{ position: 'absolute', top: '35%', right: '5%', fontSize: '60px', opacity: 0.1 }}>🎶</div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', zIndex: 10 }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
      </div>

      {state.status === 'intro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '80px', marginBottom: '24px', animation: 'bounce-idle 1s infinite' }}>🎹</div>
          <h1 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '16px', color: '#FF6EB4' }}>Melody Maker</h1>
          <p style={{ fontSize: '18px', color: '#FFF8E1', marginBottom: '24px' }}>Tap the keys when the falling notes reach the bottom line!</p>
          <button onClick={startGame} style={{ background: 'linear-gradient(135deg, #FF6EB4, #E0559B)', border: 'none', borderRadius: '32px', padding: '20px 48px', fontSize: '22px', fontWeight: 900, color: '#fff', cursor: 'pointer', boxShadow: '0 12px 32px rgba(224,85,155,0.4)', zIndex: 20 }} type="button">
            Play Music
          </button>
        </div>
      )}

      {state.status === 'playing' && (
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.4)', padding: '8px 24px', borderRadius: '24px', fontSize: '20px', fontWeight: 900, color: '#FF6EB4', border: '1px solid rgba(255,110,180,0.3)', boxShadow: '0 0 12px rgba(0,0,0,0.2)', zIndex: 10 }}>
            Score: {state.score}
          </div>

          <div style={{ position: 'absolute', top: '80%', left: '5%', width: '90%', height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px', boxShadow: '0 0 10px rgba(255,255,255,0.5)' }} />

          <div style={{ position: 'absolute', top: 0, left: '5%', width: '90%', height: '100%', display: 'flex', justifyContent: 'space-around' }}>
            {[0, 1, 2, 3].map(lane => (
              <div key={lane} style={{ width: '22%', height: '100%', borderLeft: '1px dashed rgba(255,255,255,0.1)', borderRight: '1px dashed rgba(255,255,255,0.1)', position: 'relative' }}>
                {state.notes.filter(n => n.lane === lane).map(note => (
                  <div 
                    key={note.id} 
                    style={{
                      position: 'absolute',
                      top: `${note.y}%`,
                      left: '50%',
                      width: '40px',
                      height: '40px',
                      background: laneColors[lane],
                      borderRadius: '8px',
                      transform: 'translateX(-50%)',
                      boxShadow: `0 4px 12px ${laneColors[lane]}80`,
                      zIndex: 5
                  }}>
                  </div>
                ))}
                
                <button 
                  onPointerDown={(e) => { e.preventDefault(); tapLane(lane); }}
                  style={{
                    position: 'absolute',
                    bottom: '5%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: `linear-gradient(180deg, ${laneColors[lane]}dd, ${laneColors[lane]})`,
                    border: '2px solid rgba(255,255,255,0.5)',
                    boxShadow: `0 8px 16px ${laneColors[lane]}60, inset 0 2px 4px rgba(255,255,255,0.5)`,
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {state.status === 'gameover' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🎶</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#FF5252', marginBottom: '12px' }}>Song Over!</h2>
          <p style={{ fontSize: '20px', color: '#FFF8E1', marginBottom: '40px' }}>You hit {state.score} notes.</p>
          <button onClick={startGame} style={{ background: 'linear-gradient(135deg, #FF6EB4, #E0559B)', border: 'none', borderRadius: '32px', padding: '20px 48px', fontSize: '20px', fontWeight: 900, color: '#fff', cursor: 'pointer', marginBottom: '16px', zIndex: 20 }} type="button">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
"""

new_text = text[:start_idx] + good_text
with io.open('src/main.jsx', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Rebuilt main.jsx")
