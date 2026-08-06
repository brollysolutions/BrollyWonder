import io
import re

with io.open('src/main.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('function PetScreen({ player, onBack, onFeed, onPlay }) {')
end_idx = text.find('function RewardsScreen({ player, onBack }) {')

if start_idx == -1 or end_idx == -1:
    print("Could not find PetScreen boundaries!")
    exit(1)

new_pet_screen = """function PetScreen({ player, onBack, onFeed, onPlay }) {
  const activeHat = player.equipped?.hat ? SHOP_ITEMS.hats.find(h => h.id === player.equipped.hat) : null;

  return (
    <div id="pet" className="screen active" style={{ 
      position: 'relative', overflow: 'hidden', padding: 0, 
      background: 'linear-gradient(-45deg, #FF9A9E, #FECFEF, #A1C4FD, #C2E9FB)',
      backgroundSize: '400% 400%',
      animation: 'gradientBG 15s ease infinite'
    }}>
      
      {/* Background Soft Orbs for Fluid Effect */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: 'rgba(255, 255, 255, 0.4)', borderRadius: '50%', filter: 'blur(60px)', animation: 'float-slow 8s ease-in-out infinite alternate', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '400px', height: '400px', background: 'rgba(161, 196, 253, 0.6)', borderRadius: '50%', filter: 'blur(80px)', animation: 'float-slow 12s ease-in-out infinite alternate-reverse', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '40%', left: '20%', width: '250px', height: '250px', background: 'rgba(254, 207, 239, 0.5)', borderRadius: '50%', filter: 'blur(70px)', animation: 'pulse 10s ease-in-out infinite alternate', zIndex: 0 }} />

      {/* Foreground Content */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%', padding: '24px 20px' }}>
        
        {/* Minimalist Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.6)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#111', boxShadow: '0 8px 16px rgba(0,0,0,0.05)', transition: 'transform 0.15s ease' }} type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          
          <div style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.6)', borderRadius: '999px', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#333', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Companion</span>
          </div>
          <div style={{ width: '48px' }} /> {/* Empty block for flex spacing */}
        </div>

        {/* Center Pet in Massive Glass Sphere */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ 
            width: '320px', height: '320px', borderRadius: '50%', 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 100%)', 
            backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
            border: '2px solid rgba(255,255,255,0.7)', 
            boxShadow: '0 32px 64px rgba(0,0,0,0.1), inset 0 8px 16px rgba(255,255,255,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', animation: 'float-slow 4s ease-in-out infinite alternate'
          }}>
            {/* Sphere Gloss Highlight */}
            <div style={{ position: 'absolute', top: '4%', left: '15%', width: '70%', height: '30%', background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)', borderRadius: '50%', filter: 'blur(2px)', pointerEvents: 'none' }} />
            
            {/* Soft Shadow inside sphere under pet */}
            <div style={{ position: 'absolute', bottom: '15%', width: '120px', height: '20px', background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, transparent 70%)', zIndex: 0 }} />

            <div style={{ position: 'relative', fontSize: '140px', zIndex: 1, filter: 'drop-shadow(0 16px 24px rgba(0,0,0,0.2))' }}>
              {player.petEmoji}
              {activeHat && (
                <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', fontSize: '70px', zIndex: 11, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>
                  {activeHat.emoji}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Minimalist Floating Dashboard */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '16px' }}>
          
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#222', textAlign: 'center', margin: '0 0 10px 0', letterSpacing: '-0.03em' }}>{player.petName}</h2>
          
          {/* Stats Glass Panel */}
          <div style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.7)', padding: '24px', boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Happiness</span>
                  <span style={{ fontSize: '15px', fontWeight: 900, color: '#FF4081' }}>{player.petHappiness}%</span>
                </div>
                <div style={{ height: '12px', borderRadius: '999px', background: 'rgba(0,0,0,0.05)', overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
                  <div style={{ width: `${player.petHappiness}%`, height: '100%', background: 'linear-gradient(90deg, #FF80AB, #FF4081)', borderRadius: '999px', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                </div>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Fullness</span>
                  <span style={{ fontSize: '15px', fontWeight: 900, color: '#00B0FF' }}>{player.petHunger}%</span>
                </div>
                <div style={{ height: '12px', borderRadius: '999px', background: 'rgba(0,0,0,0.05)', overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
                  <div style={{ width: `${player.petHunger}%`, height: '100%', background: 'linear-gradient(90deg, #81D4FA, #00B0FF)', borderRadius: '999px', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Elegant Buttons */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <button className="clickable" onClick={onFeed} style={{ 
              flex: 1, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', 
              borderRadius: '999px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', 
              cursor: 'pointer', boxShadow: '0 12px 24px rgba(0,0,0,0.08)', color: '#FF4081' 
            }} type="button">
              <span style={{ fontSize: '24px' }}>🍎</span>
              <span style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feed</span>
            </button>
            <button className="clickable" onClick={onPlay} style={{ 
              flex: 1, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', 
              borderRadius: '999px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', 
              cursor: 'pointer', boxShadow: '0 12px 24px rgba(0,0,0,0.08)', color: '#00B0FF'
            }} type="button">
              <span style={{ fontSize: '24px' }}>🎾</span>
              <span style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Play</span>
            </button>
          </div>

        </div>
      </div>
      
      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
}
"""

new_text = text[:start_idx] + new_pet_screen + text[end_idx:]

with io.open('src/main.jsx', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("PetScreen overhauled with Apple Glass style successfully!")
