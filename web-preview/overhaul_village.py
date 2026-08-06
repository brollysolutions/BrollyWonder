import io

with io.open('src/main.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('function NurseryHub({ onBack, onOpenGame }) {')
end_idx = text.find('const ALPHABET_SOUNDS = {')

if start_idx == -1 or end_idx == -1:
    print("Could not find NurseryHub boundaries!")
    exit(1)

new_hub = """function NurseryHub({ onBack, onOpenGame }) {
  const LOCATIONS = [
    { id: 'alphabet-game', name: 'Alphabet School', emoji: '🏫', top: '15%', left: '25%', color: '#FF9800', bg: 'linear-gradient(135deg, #FFB74D, #F57C00)' },
    { id: 'animal-farm', name: 'Red Barn', emoji: '🛖', top: '28%', left: '75%', color: '#E53935', bg: 'linear-gradient(135deg, #EF5350, #C62828)' },
    { id: 'fruit-market', name: 'Apple Orchard', emoji: '🌳', top: '42%', left: '20%', color: '#43A047', bg: 'linear-gradient(135deg, #66BB6A, #2E7D32)' },
    { id: 'memory-match', name: 'Memory Tree', emoji: '🌲', top: '55%', left: '75%', color: '#8E24AA', bg: 'linear-gradient(135deg, #AB47BC, #6A1B9A)' },
    { id: 'cauldron', name: 'Wizard Tent', emoji: '⛺', top: '70%', left: '25%', color: '#00897B', bg: 'linear-gradient(135deg, #26A69A, #00695C)' },
    { id: 'cloud-hopper', name: 'Cloud Stairs', emoji: '🪜', top: '85%', left: '70%', color: '#1E88E5', bg: 'linear-gradient(135deg, #42A5F5, #1565C0)' },
    { id: 'starlight', name: 'Observatory', emoji: '🔭', top: '95%', left: '35%', color: '#3949AB', bg: 'linear-gradient(135deg, #5C6BC0, #283593)' }
  ];

  // Generates floating fireflies
  const fireflies = React.useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2
    }));
  }, []);

  return (
    <div id="nursery-hub" className="screen active" style={{ 
      background: 'linear-gradient(180deg, #64B5F6 0%, #81C784 15%, #2E7D32 50%, #1B5E20 100%)', 
      padding: 0, 
      display: 'block',
      overflowX: 'hidden'
    }}>
      {/* Header */}
      <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, left: 0, right: 0, zIndex: 100, background: 'linear-gradient(180deg, rgba(100, 181, 246, 0.95) 0%, rgba(129, 199, 132, 0.8) 60%, transparent 100%)' }}>
        <button className="clickable" onClick={onBack} style={{ background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: '16px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1B5E20', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }} type="button">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF', margin: 0, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))', background: 'linear-gradient(90deg, #FFF, #E3F2FD)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Rainbow Village</h1>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%' }}>
        <div style={{ position: 'relative', height: '1600px', width: '100%', overflow: 'hidden' }}>
          
          {/* Fireflies */}
          {fireflies.map(f => (
            <div key={f.id} style={{
              position: 'absolute', top: f.top, left: f.left, width: `${f.size}px`, height: `${f.size}px`,
              background: '#FFF9C4', borderRadius: '50%', boxShadow: '0 0 12px 4px rgba(255,245,157,0.8)',
              animation: `float-slow ${f.duration}s ease-in-out ${f.delay}s infinite alternate`, zIndex: 1
            }} />
          ))}

          {/* Clouds */}
          <div style={{ position: 'absolute', top: '2%', left: '-20%', fontSize: '80px', opacity: 0.6, animation: 'cloud-move 40s linear infinite', zIndex: 2, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))' }}>☁️</div>
          <div style={{ position: 'absolute', top: '8%', left: '100%', fontSize: '100px', opacity: 0.4, animation: 'cloud-move-reverse 50s linear infinite', zIndex: 2, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))' }}>☁️</div>

          {/* Magical Glowing Path */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3, filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.4))' }} preserveAspectRatio="none" viewBox="0 0 100 1000">
             {/* Glow Layer */}
             <path d="M 30,0 C 30,100 80,150 80,250 C 80,350 30,400 30,500 C 30,600 80,650 80,750 C 80,850 40,900 40,1000" fill="none" stroke="rgba(255,213,79,0.4)" strokeWidth="20" strokeLinecap="round" style={{ filter: 'blur(8px)' }} />
             {/* Base Yellow Brick */}
             <path d="M 30,0 C 30,100 80,150 80,250 C 80,350 30,400 30,500 C 30,600 80,650 80,750 C 80,850 40,900 40,1000" fill="none" stroke="#FFD54F" strokeWidth="14" strokeLinecap="round" />
             {/* Inner Highlight */}
             <path d="M 30,0 C 30,100 80,150 80,250 C 80,350 30,400 30,500 C 30,600 80,650 80,750 C 80,850 40,900 40,1000" fill="none" stroke="#FFF9C4" strokeWidth="6" strokeLinecap="round" strokeDasharray="8 12" />
          </svg>

          {/* Scenery Trees with shadows and sway */}
          {[
            { t: '8%', l: '75%', s: '60px' },
            { t: '12%', l: '8%', s: '80px' },
            { t: '25%', l: '85%', s: '55px' },
            { t: '38%', l: '12%', s: '90px' },
            { t: '52%', l: '82%', s: '65px' },
            { t: '68%', l: '15%', s: '75px' },
            { t: '82%', l: '78%', s: '70px' }
          ].map((tree, i) => (
             <div key={i} style={{ 
               position: 'absolute', top: tree.t, left: tree.l, fontSize: tree.s, 
               filter: 'drop-shadow(0 12px 16px rgba(0,0,0,0.4))', 
               animation: `sway-wobble ${3 + (i%3)}s ease-in-out infinite alternate`,
               zIndex: 4
             }}>🌲</div>
          ))}

          {/* Location Nodes */}
          {LOCATIONS.map((loc, index) => (
            <button
              key={loc.id}
              className="clickable village-location"
              onClick={() => onOpenGame(loc.id)}
              style={{
                position: 'absolute', top: loc.top, left: loc.left, transform: 'translate(-50%, -50%)',
                background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center',
                cursor: 'pointer', zIndex: 10, outline: 'none', padding: 0
              }}
              type="button"
            >
              {/* Premium Glossy Bubble */}
              <div style={{ 
                position: 'relative', width: '110px', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: loc.bg, borderRadius: '50%',
                boxShadow: `0 20px 40px ${loc.color}66, inset 0 8px 16px rgba(255,255,255,0.6), inset 0 -8px 16px rgba(0,0,0,0.3)`,
                border: '4px solid #FFF',
                animation: `float-slow ${2.5 + (index % 2)}s ease-in-out infinite alternate`
              }}>
                <div style={{ fontSize: '70px', filter: 'drop-shadow(0 12px 16px rgba(0,0,0,0.4))' }}>
                  {loc.emoji}
                </div>
                {/* Glossy Top Highlight */}
                <div style={{ position: 'absolute', top: '5%', left: '15%', width: '40%', height: '20%', background: 'rgba(255,255,255,0.4)', borderRadius: '50%', transform: 'rotate(-25deg)', filter: 'blur(2px)' }} />
              </div>
              
              {/* Vibrant Ribbon Label */}
              <div style={{ 
                marginTop: '16px', background: '#FFFFFF', padding: '8px 24px', borderRadius: '16px', 
                fontSize: '16px', fontWeight: 900, color: loc.color,
                boxShadow: '0 12px 24px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,1)',
                border: `3px solid ${loc.color}`,
                whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.05em'
              }}>
                {loc.name}
              </div>
            </button>
          ))}
          
          {/* Keyframes injected directly for the clouds if missing */}
          <style>
            {`
              @keyframes cloud-move {
                0% { transform: translateX(0); }
                100% { transform: translateX(150vw); }
              }
              @keyframes cloud-move-reverse {
                0% { transform: translateX(0); }
                100% { transform: translateX(-150vw); }
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
}

"""

new_text = text[:start_idx] + new_hub + text[end_idx:]

with io.open('src/main.jsx', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Rainbow Village design overhauled!")
