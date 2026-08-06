import io

with io.open('src/main.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('function PetScreen({ player, onBack, onFeed, onPlay }) {')
end_idx = text.find('function RewardsScreen({ player, onBack }) {')

if start_idx == -1 or end_idx == -1:
    print("Could not find PetScreen boundaries!")
    exit(1)

new_pet_screen = """function PetScreen({ player, onBack, onFeed, onPlay }) {
  const activeHabitat = player.equipped?.habitat ? SHOP_ITEMS.habitats.find(h => h.id === player.equipped.habitat) : null;
  // Deep, rich default sky if no habitat is equipped
  const bgStyle = activeHabitat ? activeHabitat.bg : 'linear-gradient(180deg, #4FC3F7 0%, #E1F5FE 60%, #81C784 60%, #388E3C 100%)';
  const activeHat = player.equipped?.hat ? SHOP_ITEMS.hats.find(h => h.id === player.equipped.hat) : null;

  // Generate magical floating particles for the pet environment
  const sparkles = React.useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 60 + 20}%`,
      size: `${Math.random() * 6 + 2}px`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2
    }));
  }, []);

  return (
    <div id="pet" className="screen active" style={{ position: 'relative', overflow: 'hidden', padding: 0, background: '#4FC3F7' }}>
      
      {/* Immersive Habitat Background with Sunbeam Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: bgStyle, zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.6) 0%, transparent 60%)', zIndex: 0 }} />
      
      {/* Magical Sparkles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1, pointerEvents: 'none' }}>
        {sparkles.map(s => (
          <div key={s.id} style={{
            position: 'absolute', top: s.top, left: s.left, width: s.size, height: s.size,
            background: '#FFF9C4', borderRadius: '50%', filter: 'drop-shadow(0 0 8px #FFD54F)',
            animation: `float-slow ${s.duration}s ease-in-out ${s.delay}s infinite alternate`
          }} />
        ))}
      </div>

      {/* Sky Elements with better depth */}
      <div style={{ position: 'absolute', top: '5%', left: '5%', fontSize: '90px', opacity: 0.8, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))', animation: 'float-slow 6s ease-in-out infinite alternate' }}>☁️</div>
      <div style={{ position: 'absolute', top: '15%', right: '-10%', fontSize: '70px', opacity: 0.6, filter: 'blur(2px) drop-shadow(0 8px 16px rgba(0,0,0,0.1))', animation: 'float-slow 8s ease-in-out 1s infinite alternate' }}>☁️</div>
      <div style={{ position: 'absolute', top: '2%', right: '20%', fontSize: '100px', filter: 'drop-shadow(0 0 40px rgba(255,213,79,1))', animation: 'pulse 4s infinite alternate' }}>☀️</div>

      {/* 3D Layered Grass Hills */}
      <div style={{ position: 'absolute', bottom: '40%', left: '-30%', width: '160%', height: '30%', background: 'linear-gradient(180deg, #A5D6A7, #81C784)', borderRadius: '50% 50% 0 0', zIndex: 1, boxShadow: 'inset 0 10px 20px rgba(255,255,255,0.3)' }} />
      <div style={{ position: 'absolute', bottom: '30%', right: '-20%', width: '140%', height: '35%', background: 'linear-gradient(180deg, #81C784, #66BB6A)', borderRadius: '50% 50% 0 0', zIndex: 2, boxShadow: 'inset 0 10px 20px rgba(255,255,255,0.3)' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '-10%', width: '120%', height: '40%', background: 'linear-gradient(180deg, #66BB6A, #4CAF50)', borderRadius: '50% 50% 0 0', zIndex: 3, boxShadow: '0 -10px 30px rgba(0,0,0,0.15), inset 0 12px 24px rgba(255,255,255,0.2)' }} />

      {/* Foreground Content */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* Premium Glass Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '24px 20px', gap: '16px', background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)' }}>
          <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', border: '2px solid rgba(255,255,255,0.9)', borderRadius: '16px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1A5C82', boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }} type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          <span style={{ fontSize: '30px', fontWeight: 900, color: '#FFFFFF', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))', letterSpacing: '-0.02em' }}>{player.petName}</span>
        </div>

        {/* Pet Character (Ultra Premium 3D Feel) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '20px' }}>
          
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Glowing Drop Shadow beneath pet */}
            <div style={{ position: 'absolute', bottom: '-20px', width: '140px', height: '40px', background: 'radial-gradient(ellipse at center, rgba(0,60,0,0.4) 0%, transparent 70%)', zIndex: 0, animation: 'pulse 2s infinite alternate' }} />
            
            <div style={{ position: 'relative', fontSize: '180px', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.35))', animation: 'bounce-idle 2.5s infinite alternate ease-in-out', transformOrigin: 'center bottom', zIndex: 1 }}>
              {player.petEmoji}
              {activeHat && (
                <div style={{ position: 'absolute', top: '-45px', left: '50%', transform: 'translateX(-50%)', fontSize: '90px', zIndex: 11, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}>
                  {activeHat.emoji}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ultra Premium Frosted Glass Dashboard */}
        <div style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', borderTopLeftRadius: '48px', borderTopRightRadius: '48px', padding: '36px 28px', boxShadow: '0 -20px 40px rgba(0,0,0,0.15), inset 0 4px 8px rgba(255,255,255,0.9)', borderTop: '4px solid rgba(255,255,255,1)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(138,107,255,0.15)', padding: '8px 24px', borderRadius: '999px', fontSize: '14px', fontWeight: 900, color: '#6A1B9A', textTransform: 'uppercase', letterSpacing: '0.2em', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5)' }}>
              Level 1 Companion
            </div>
          </div>

          {/* Glowing Neon Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#2E2140', textShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>💖 Happiness</span>
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#FF5252', textShadow: '0 2px 4px rgba(255,82,82,0.3)' }}>{player.petHappiness}%</span>
              </div>
              <div style={{ height: '24px', borderRadius: '999px', background: 'rgba(255,92,92,0.2)', padding: '4px', boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.15)' }}>
                <div style={{ width: `${player.petHappiness}%`, height: '100%', background: 'linear-gradient(90deg, #FF8A80, #FF1744)', borderRadius: '999px', boxShadow: '0 0 16px rgba(255,23,68,0.6), inset 0 -4px 8px rgba(0,0,0,0.2), inset 0 4px 8px rgba(255,255,255,0.4)', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#2E2140', textShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>🍎 Fullness</span>
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#00B0FF', textShadow: '0 2px 4px rgba(0,176,255,0.3)' }}>{player.petHunger}%</span>
              </div>
              <div style={{ height: '24px', borderRadius: '999px', background: 'rgba(79,195,247,0.2)', padding: '4px', boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.15)' }}>
                <div style={{ width: `${player.petHunger}%`, height: '100%', background: 'linear-gradient(90deg, #81D4FA, #00B0FF)', borderRadius: '999px', boxShadow: '0 0 16px rgba(0,176,255,0.6), inset 0 -4px 8px rgba(0,0,0,0.2), inset 0 4px 8px rgba(255,255,255,0.4)', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              </div>
            </div>
          </div>

          {/* Interactive 3D Squircle Actions */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
            <button className="clickable" onClick={onFeed} style={{ 
              flex: 1, background: 'linear-gradient(135deg, #FF8A80, #FF5252)', border: '4px solid rgba(255,255,255,0.9)', borderRadius: '32px', padding: '20px 8px', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', 
              boxShadow: '0 20px 40px rgba(255,82,82,0.4), inset 0 8px 16px rgba(255,255,255,0.6), inset 0 -8px 16px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden' 
            }} type="button">
              <div style={{ position: 'absolute', top: '2%', left: '10%', width: '80%', height: '30%', background: 'rgba(255,255,255,0.4)', borderRadius: '32px', filter: 'blur(2px)' }} />
              <span style={{ fontSize: '44px', filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.3))', position: 'relative', zIndex: 2 }}>🍎</span>
              <span style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.3)', position: 'relative', zIndex: 2 }}>Feed</span>
            </button>
            <button className="clickable" onClick={onPlay} style={{ 
              flex: 1, background: 'linear-gradient(135deg, #81D4FA, #00B0FF)', border: '4px solid rgba(255,255,255,0.9)', borderRadius: '32px', padding: '20px 8px', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', 
              boxShadow: '0 20px 40px rgba(0,176,255,0.4), inset 0 8px 16px rgba(255,255,255,0.6), inset 0 -8px 16px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden' 
            }} type="button">
              <div style={{ position: 'absolute', top: '2%', left: '10%', width: '80%', height: '30%', background: 'rgba(255,255,255,0.4)', borderRadius: '32px', filter: 'blur(2px)' }} />
              <span style={{ fontSize: '44px', filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.3))', position: 'relative', zIndex: 2 }}>🎾</span>
              <span style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.3)', position: 'relative', zIndex: 2 }}>Play</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
"""

new_text = text[:start_idx] + new_pet_screen + text[end_idx:]

with io.open('src/main.jsx', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("PetScreen overhauled successfully!")
