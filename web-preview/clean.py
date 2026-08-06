import re

with open('src/main.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix the specific corrupted block:
bad_block = """  const gameState = useRef({Ref({">
            Try Again
          </button>
        </div>
      )}
      
      {state.status === 'levelup' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>??</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#FFD54F', marginBottom: '12px' }}>Level {state.level} Complete!</h2>
          <p style={{ fontSize: '20px', color: '#FFF8E1', marginBottom: '40px' }}>Get ready for Level {state.level + 1}...</p>
          <button onClick={(e) => { e.stopPropagation(); startNextLevel(); }} style={{ background: 'linear-gradient(135deg, #FFB74D, #F57C00)', border: 'none', borderRadius: '32px', padding: '20px 48px', fontSize: '20px', fontWeight: 900, color: '#fff', cursor: 'pointer', marginBottom: '16px', zIndex: 20 }} type="button">
            Next Level
          </button>
        </div>
      )} {
  const gameState = useRef({"""

good_block = "  const gameState = useRef({"

if bad_block in text:
    new_text = text.replace(bad_block, good_block)
    with open('src/main.jsx', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Fixed corrupted block!")
else:
    print("Could not find bad_block")
