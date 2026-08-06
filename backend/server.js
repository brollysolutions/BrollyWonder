const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Default player state
const DEFAULT_PLAYER = {
  name: 'Explorer',
  avatarEmoji: '🧑‍🚀',
  coins: 120,
  xp: 340,
  xpToNextLevel: 500,
  level: 4,
  streakDays: 6,
  stars: 18,
  petName: 'Glimmer',
  petHappiness: 70,
  petHunger: 55,
  petEmoji: '🐉',
  inventory: [],
  equipped: { hat: null, habitat: 'default' },
  kingdomProgress: {
    word_forest: 65,
    math_castle: 40,
    space_science: 20,
    ocean_kingdom: 0,
    history_kingdom: 0,
    creative_village: 0
  },
  completedChapters: []
};

// Helper to read DB
const readDb = () => {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ player: DEFAULT_PLAYER }), 'utf8');
  }
  const data = fs.readFileSync(DB_FILE, 'utf8');
  try {
    const parsed = JSON.parse(data);
    return parsed.player ? parsed : { player: DEFAULT_PLAYER };
  } catch (e) {
    return { player: DEFAULT_PLAYER };
  }
};

// Helper to write DB
const writeDb = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
};

// GET /api/player - Fetch the player profile
app.get('/api/player', (req, res) => {
  const db = readDb();
  res.json({ player: db.player || DEFAULT_PLAYER });
});

// POST /api/player - Update the player profile
app.post('/api/player', (req, res) => {
  const { player } = req.body;
  if (!player) {
    return res.status(400).json({ error: 'Player data is required' });
  }
  const db = readDb();
  db.player = { ...DEFAULT_PLAYER, ...db.player, ...player };
  writeDb(db);
  res.json({ success: true, player: db.player });
});

// POST /api/player/reset - Reset player profile to default
app.post('/api/player/reset', (req, res) => {
  const db = { player: DEFAULT_PLAYER };
  writeDb(db);
  res.json({ success: true, player: DEFAULT_PLAYER });
});

app.listen(PORT, () => {
  console.log(`🚀 WonderVerse Academy Backend running at http://localhost:${PORT}`);
});
