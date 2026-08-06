import io
import re

with io.open('src/main.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('function MapScreen({ player, kingdoms, onOpenKingdom, onOpenPet, onOpenRewards, onOpenShop, onOpenNursery, onOpenProfile }) {')
end_idx = text.find('function KingdomDetailScreen(')

if start_idx == -1 or end_idx == -1:
    print("Could not find MapScreen boundaries!")
    exit(1)

new_map_screen = """function MapScreen({ player, kingdoms, onOpenKingdom, onOpenPet, onOpenRewards, onOpenShop, onOpenNursery, onOpenProfile }) {
  // Generate some floating background orbs for the mesh effect
  const orbs = React.useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${200 + Math.random() * 200}px`,
      color: ['rgba(255, 154, 158, 0.4)', 'rgba(254, 207, 239, 0.4)', 'rgba(161, 196, 253, 0.4)', 'rgba(194, 233, 251, 0.4)'][i],
      duration: 15 + Math.random() * 10,
      delay: Math.random() * -20
    }));
  }, []);

  return (
    <div id="map" className="screen active" style={{ 
      background: '#F0F4F8', // Fallback
      backgroundImage: 'linear-gradient(135deg, #FDFBFB 0%, #EBEDEE 100%)',
      padding: 0, display: 'block', overflowX: 'hidden', position: 'relative' 
    }}>
      {/* Animated Mesh Gradient Background Orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {orbs.map(orb => (
          <div key={orb.id} style={{
            position: 'absolute', top: orb.top, left: orb.left, width: orb.size, height: orb.size,
            background: orb.color, borderRadius: '50%', filter: 'blur(80px)',
            animation: `float-slow ${orb.duration}s ease-in-out ${orb.delay}s infinite alternate`
          }} />
        ))}
      </div>

      <div className="map-clouds" style={{ zIndex: 1, opacity: 0.7 }}>
        <div className="map-cloud" style={{ top: '15%', animationDuration: '45s', animationDelay: '0s' }}>☁️</div>
        <div className="map-cloud" style={{ top: '45%', animationDuration: '60s', animationDelay: '-20s', fontSize: '120px' }}>☁️</div>
        <div className="map-cloud" style={{ top: '75%', animationDuration: '35s', animationDelay: '-10s', fontSize: '70px' }}>☁️</div>
      </div>
      
      {/* Premium Glassmorphic Top Navigation Bar */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        padding: '24px 16px', borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px', 
        boxShadow: '0 12px 32px rgba(31,38,135,0.1), inset 0 -2px 0 rgba(255,255,255,0.4)', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.6)', borderLeft: '1px solid rgba(255, 255, 255, 0.3)', borderRight: '1px solid rgba(255, 255, 255, 0.3)',
        display: 'flex', gap: '8px', justifyContent: 'center', zIndex: 10, position: 'sticky', top: 0, left: 0, right: 0 
      }}>
        {/* Coins Pill */}
        <div style={{ background: 'linear-gradient(135deg, #FFD54F 0%, #FF9800 100%)', padding: '6px 12px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 8px 16px rgba(255,152,0,0.3), inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.2)', border: '2px solid rgba(255,255,255,0.8)' }}>
          <span style={{ fontSize: '18px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>🪙</span>
          <span style={{ fontSize: '15px', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{player.coins}</span>
        </div>
        {/* Stars Pill */}
        <div style={{ background: 'linear-gradient(135deg, #FFF176 0%, #FBC02D 100%)', padding: '6px 12px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 8px 16px rgba(251,192,45,0.3), inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.2)', border: '2px solid rgba(255,255,255,0.8)' }}>
          <span style={{ fontSize: '18px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>⭐</span>
          <span style={{ fontSize: '15px', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{player.stars}</span>
        </div>
        {/* Streak Pill */}
        <div style={{ background: 'linear-gradient(135deg, #FF8A65 0%, #E64A19 100%)', padding: '6px 12px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 8px 16px rgba(230,74,25,0.3), inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.2)', border: '2px solid rgba(255,255,255,0.8)' }}>
          <span style={{ fontSize: '18px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>🔥</span>
          <span style={{ fontSize: '15px', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{player.streakDays}d</span>
        </div>
      </div>

      <div style={{ paddingBottom: '40px', position: 'relative', zIndex: 2 }}>
        {/* Personalized Greeting / Profile Button */}
        <button onClick={onOpenProfile} style={{ padding: '32px 20px 24px', display: 'flex', alignItems: 'center', gap: '16px', background: 'transparent', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }} type="button">
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #FFD54F, #FF9E5E)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', 
            boxShadow: '0 12px 24px rgba(255,158,94,0.4), inset 0 4px 8px rgba(255,255,255,0.5)', 
            border: '4px solid #fff', flexShrink: 0, position: 'relative' 
          }}>
            <span style={{ filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.2))' }}>{player.avatarEmoji}</span>
            <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', background: '#FFFFFF', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', border: '2px solid #EEEEEE' }}>
              <span style={{ fontSize: '14px' }}>✏️</span>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: 900, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1, background: 'linear-gradient(90deg, #2E2140 0%, #4B336B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
              Welcome back,<br/><span style={{ background: 'linear-gradient(90deg, #1E88E5 0%, #42A5F5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{player.name}</span>!
            </h2>
          </div>
        </button>

        {/* Action Pods (Tactile 3D Squircles) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '0 20px 32px' }}>
          {[
            { id: 'pet', label: 'My Pet', emoji: '🐶', bg: 'linear-gradient(135deg, #4FC3F7, #0288D1)', color: '#0288D1', action: onOpenPet },
            { id: 'rewards', label: 'Rewards', emoji: '🏅', bg: 'linear-gradient(135deg, #FFD54F, #F57C00)', color: '#F57C00', action: onOpenRewards },
            { id: 'shop', label: 'Shop', emoji: '🛍️', bg: 'linear-gradient(135deg, #FF8A80, #D50000)', color: '#D50000', action: onOpenShop },
            { id: 'nursery', label: 'Nursery', emoji: '👶', bg: 'linear-gradient(135deg, #CE93D8, #8E24AA)', color: '#8E24AA', action: onOpenNursery }
          ].map(pod => (
            <button key={pod.id} onClick={pod.action} className="clickable" style={{ 
              background: pod.bg, border: '3px solid rgba(255,255,255,0.9)', borderRadius: '32px', padding: '24px 8px', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', 
              boxShadow: `0 16px 32px ${pod.color}40, inset 0 8px 16px rgba(255,255,255,0.6), inset 0 -8px 16px rgba(0,0,0,0.15)`, 
              cursor: 'pointer', position: 'relative', overflow: 'hidden' 
            }} type="button">
              {/* Glossy Top Highlight */}
              <div style={{ position: 'absolute', top: '2%', left: '10%', width: '80%', height: '30%', background: 'rgba(255,255,255,0.4)', borderRadius: '32px', filter: 'blur(2px)' }} />
              <span style={{ fontSize: '36px', filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.3))', position: 'relative', zIndex: 2 }}>{pod.emoji}</span>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: '14px', textShadow: '0 2px 4px rgba(0,0,0,0.3)', position: 'relative', zIndex: 2 }}>{pod.label}</span>
            </button>
          ))}
        </div>

        {/* Kingdom Cards (3D Pop-out Premium) */}
        <div style={{ padding: '0 20px 32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#2E2140', margin: 0, paddingLeft: '4px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))' }}>Curriculum Map</h3>
          
          {kingdoms.map((kingdom) => {
            const stars = kingdom.progress >= 90 ? 3 : kingdom.progress >= 50 ? 2 : kingdom.progress > 0 ? 1 : 0;
            const visuals = getKingdomVisuals(kingdom);
            
            return (
              <button key={kingdom.id} className={!kingdom.locked ? "clickable" : ""} style={{
                background: visuals.bg,
                border: kingdom.locked ? '3px dashed rgba(46,33,64,0.2)' : '4px solid rgba(255,255,255,0.9)',
                borderRadius: '36px',
                padding: '28px 24px',
                position: 'relative',
                cursor: kingdom.locked ? 'not-allowed' : 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                boxShadow: kingdom.locked ? 'none' : `0 24px 48px ${visuals.shadow.split('rgba')[1] ? 'rgba' + visuals.shadow.split('rgba')[1].split(',')[0] + ',0.4)' : 'rgba(0,0,0,0.2)'}, inset 0 12px 24px rgba(255,255,255,0.4), inset 0 -12px 24px rgba(0,0,0,0.2)`,
                overflow: 'visible',
                textAlign: 'left',
                marginTop: '20px' 
              }} onClick={() => !kingdom.locked && onOpenKingdom(kingdom.id)} type="button">
                
                {/* Glossy Top Highlight for Card */}
                {!kingdom.locked && (
                   <div style={{ position: 'absolute', top: '2%', left: '2%', width: '96%', height: '30%', background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)', borderRadius: '32px', pointerEvents: 'none', zIndex: 3 }} />
                )}

                {/* Decoration Container */}
                {!kingdom.locked && visuals.decorations && visuals.decorations.length > 0 && (
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '32px', overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
                    {visuals.decorations.map((decor, index) => (
                      <span key={index} className={decor.className} style={{ position: 'absolute', top: decor.top, left: decor.left, fontSize: decor.fontSize, opacity: 0.5, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
                        {decor.emoji}
                      </span>
                    ))}
                  </div>
                )}

                {/* Huge Pop-Out Emoji - Hover Animation */}
                <div style={{ position: 'absolute', top: '-40px', right: '16px', fontSize: '90px', filter: kingdom.locked ? 'grayscale(100%) opacity(0.5)' : 'drop-shadow(0 20px 24px rgba(0,0,0,0.4))', animation: !kingdom.locked ? 'float-slow 3s ease-in-out infinite alternate' : 'none', zIndex: 5 }}>
                  {visuals.emoji}
                </div>

                {/* Content Wrapper */}
                <div style={{ position: 'relative', zIndex: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ color: kingdom.locked ? '#8A91A8' : '#FFFFFF', fontWeight: 900, fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px', textShadow: kingdom.locked ? 'none' : '0 2px 4px rgba(0,0,0,0.2)', background: kingdom.locked ? 'transparent' : 'rgba(0,0,0,0.15)', padding: '4px 12px', borderRadius: '999px' }}>
                    {kingdom.subject}
                  </div>
                  
                  <div style={{ color: kingdom.locked ? '#2E2140' : '#FFFFFF', fontSize: '32px', fontWeight: 900, lineHeight: 1.1, marginBottom: '32px', maxWidth: '65%', textShadow: kingdom.locked ? 'none' : '0 4px 8px rgba(0,0,0,0.3)' }}>
                    {kingdom.name}
                  </div>

                  <div style={{ width: '100%', background: kingdom.locked ? '#E2E5F0' : 'rgba(0,0,0,0.2)', height: '12px', borderRadius: '999px', overflow: 'hidden', position: 'relative', boxShadow: kingdom.locked ? 'inset 0 2px 4px rgba(0,0,0,0.05)' : 'inset 0 4px 8px rgba(0,0,0,0.3)' }}>
                    <div style={{ width: `${kingdom.progress}%`, height: '100%', background: kingdom.locked ? '#A0A5BA' : 'linear-gradient(90deg, #FFFFFF, #E3F2FD)', borderRadius: '999px', boxShadow: kingdom.locked ? 'none' : '0 0 10px rgba(255,255,255,0.8)' }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '16px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: kingdom.locked ? '#8A91A8' : '#FFFFFF', textShadow: kingdom.locked ? 'none' : '0 2px 4px rgba(0,0,0,0.2)' }}>
                      {kingdom.locked ? 'Locked' : `${kingdom.progress}% restored • ${kingdom.currentStage}`}
                    </span>
                    {!kingdom.locked && (
                      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '6px 12px', borderRadius: '999px', display: 'flex', gap: '6px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}>
                        {[...Array(3)].map((_, i) => (
                          <span key={i} style={{ fontSize: '16px', opacity: i < stars ? 1 : 0.3, filter: i < stars ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none' }}>⭐</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
"""

new_text = text[:start_idx] + new_map_screen + text[end_idx:]

with io.open('src/main.jsx', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("MapScreen overhauled successfully!")
