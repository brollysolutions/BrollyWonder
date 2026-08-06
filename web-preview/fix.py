with open('src/main.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

start_str = 'zInde      {state.status === \'gameover\''
end_str = 'function DeepSeaDiverGame({ player, onBack, onComplete }) {'

start_idx = text.find(start_str)
end_idx = text.find(end_str)

if start_idx == -1 or end_idx == -1:
    print('Could not find start or end str')
else:
    good_text = '''zIndex: 5,
                pointerEvents: 'none'
              }}
            />
          ))}

          {state.asteroids.map(a => (
            <div 
              key={a.id} 
              style={{
                position: 'absolute',
                top: `${a.y}%`,
                left: `${a.x}%`,
                fontSize: '50px',
                transform: 'translate(-50%, -50%)',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
                zIndex: 5,
                pointerEvents: 'none'
              }}
            >
              {a.emoji}
            </div>
          ))}

          <div style={{ 
            position: 'absolute', 
            bottom: '20px', 
            left: `${state.rocketX}%`, 
            transform: 'translateX(-50%)', 
            fontSize: '70px', 
            zIndex: 6, 
            filter: 'drop-shadow(0 10px 20px rgba(0,176,255,0.5))', 
            pointerEvents: 'none'
          }}>
            🚀
          </div>
        </div>
      )}

      {state.status === 'gameover' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>💥</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#FF5C5C', marginBottom: '12px' }}>Ship Damaged!</h2>
          <p style={{ fontSize: '20px', color: '#C1C5D6', marginBottom: '40px' }}>You blasted {state.score} asteroids.</p>
          <button onClick={startGame} style={{ background: 'linear-gradient(135deg, #FF5C5C, #D32F2F)', border: 'none', borderRadius: '32px', padding: '20px 48px', fontSize: '20px', fontWeight: 900, color: '#fff', cursor: 'pointer', marginBottom: '16px' }} type="button">
            Try Again
          </button>
        </div>
      )}

      {state.status === 'victory' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '100px', marginBottom: '20px', animation: 'bounce-idle 1s infinite' }}>🛡️</div>
          <h2 style={{ fontSize: '40px', fontWeight: 900, color: '#FFD54F', marginBottom: '16px' }}>Sector Clear!</h2>
          <p style={{ fontSize: '20px', color: '#fff', marginBottom: '40px' }}>You protected the ship!</p>
          <button onClick={() => onComplete(100, 50, 1)} style={{ background: 'linear-gradient(135deg, #FFD54F, #FF9E5E)', border: 'none', borderRadius: '32px', padding: '20px 48px', fontSize: '22px', fontWeight: 900, color: '#fff', cursor: 'pointer', boxShadow: '0 12px 32px rgba(255,158,94,0.5)' }} type="button">
            Claim Rewards
          </button>
        </div>
      )}
    </div>
  );
}

function DeepSeaDiverGame({ player, onBack, onComplete }) {'''

    new_text = text[:start_idx] + good_text + text[end_idx + len(end_str):]
    with open('src/main.jsx', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print('Fixed successfully')
