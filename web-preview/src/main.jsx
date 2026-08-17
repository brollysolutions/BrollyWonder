import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../style.css';


const EMOJIS = ['🐵', '🐶', '🐱', '🐰', '🐯', '🦊', '🐼', '🦄', '🐸', '🐧', '🦁', '🐻'];

const WORD_FOREST_PUZZLES = {
  "Which sound starts Apple?": { word: "APPLE", missing: [0], representation: "🍎" },
  "Which letter makes the /m/ sound?": { word: "MANGO", missing: [0], representation: "🥭" },
  "Find the letter that starts Cat.": { word: "CAT", missing: [0], representation: "🐱" },
  "Which sound starts Ball?": { word: "BALL", missing: [0], representation: "⚽" },
  "Which sound starts Dog?": { word: "DOG", missing: [0], representation: "🐶" },
  "Which letter starts Elephant?": { word: "ELEPHANT", missing: [0], representation: "🐘" },
  "Which sound starts Fish?": { word: "FISH", missing: [0], representation: "🐟" },
  "Which letter starts Giraffe?": { word: "GIRAFFE", missing: [0], representation: "🦒" },
  "Which sound starts Horse?": { word: "HORSE", missing: [0], representation: "🐴" },
  "Which letter starts Igloo?": { word: "IGLOO", missing: [0], representation: "🛖" },
  "Which sound starts Jelly?": { word: "JELLY", missing: [0], representation: "🍮" },
  "Which letter starts Kite?": { word: "KITE", missing: [0], representation: "🪁" },
  "Which sound starts Lion?": { word: "LION", missing: [0], representation: "🦁" },
  "Which sound starts Nest?": { word: "NEST", missing: [0], representation: "🪹" },
  "Which letter starts Octopus?": { word: "OCTOPUS", missing: [0], representation: "🐙" },
  "Which sound starts Penguin?": { word: "PENGUIN", missing: [0], representation: "🐧" },
  "Which letter starts Queen?": { word: "QUEEN", missing: [0], representation: "👑" },
  "Which sound starts Rabbit?": { word: "RABBIT", missing: [0], representation: "🐰" },
  "Which letter starts Star?": { word: "STAR", missing: [0], representation: "⭐" },
  "Which sound starts Turtle?": { word: "TURTLE", missing: [0], representation: "🐢" },
  "Which letter starts Umbrella?": { word: "UMBRELLA", missing: [0], representation: "☂️" },
  "Which sound starts Van?": { word: "VAN", missing: [0], representation: "🚐" },
  "Which letter starts Whale?": { word: "WHALE", missing: [0], representation: "🐋" },
  "Which sound ends Box?": { word: "BOX", missing: [2], representation: "📦" },
  "Which letter starts Yo-yo?": { word: "YOYO", missing: [0], representation: "🪀" },
  "Which sound starts Zebra?": { word: "ZEBRA", missing: [0], representation: "🦓" },

  // Two-Letter Sounds
  "Read this sound: a + n": { word: "AN", missing: [1], representation: "➕" },
  "Which sound matches 'in'?": { word: "IN", missing: [0, 1], representation: "📥" },
  "Combine /o/ and /x/.": { word: "OX", missing: [1], representation: "🐂" },
  "Combine /a/ and /m/.": { word: "AM", missing: [1], representation: "🌅" },
  "Read this sound: a + t": { word: "AT", missing: [1], representation: "📍" },
  "Which sound matches 'it'?": { word: "IT", missing: [0], representation: "🎯" },
  "Combine /u/ and /p/.": { word: "UP", missing: [0, 1], representation: "⬆️" },
  "Read this sound: o + n": { word: "ON", missing: [1], representation: "🔛" },

  // Word Families
  "Which word is in the -at family?": { word: "BAT", missing: [0], representation: "🦇" },
  "Which word rhymes with Bug?": { word: "RUG", missing: [0], representation: "🧶" },
  "Which word does NOT belong in -ig?": { word: "DOG", missing: [0, 1, 2], representation: "🐕" },
  "Which word is in the -an family?": { word: "FAN", missing: [0], representation: "🪭" },
  "Which word rhymes with Hop?": { word: "MOP", missing: [0], representation: "🧹" },
  "Which word is in the -ug family?": { word: "JUG", missing: [0], representation: "🏺" },
  "Which word rhymes with Cat?": { word: "HAT", missing: [0], representation: "🎩" },

  // Words ending in x
  "Which animal has 'x' at the end?": { word: "FOX", missing: [2], representation: "🦊" },
  "What is this shape called?": { word: "BOX", missing: [2], representation: "📦" },
  "Which number ends with the /ks/ sound?": { word: "SIX", missing: [2], representation: "6️⃣" },
  "What candle material ends in 'x'?": { word: "WAX", missing: [2], representation: "🕯️" },
  "Which word ends with the /ks/ sound?": { word: "MIX", missing: [2], representation: "🥣" },
  "What muscle action ends in 'x'?": { word: "FLEX", missing: [3], representation: "🦾" },

  // Beginning Blends
  "What two letters start Frog?": { word: "FROG", missing: [0, 1], representation: "🐸" },
  "Which word starts with the sl- blend?": { word: "SLIP", missing: [0, 1], representation: "🍌" },
  "Find the blend that starts Blue.": { word: "BLUE", missing: [0, 1], representation: "🔵" },
  "Which word starts with the tr- blend?": { word: "TREE", missing: [0, 1], representation: "🌳" },
  "Which word starts with the dr- blend?": { word: "DRUM", missing: [0, 1], representation: "🥁" },
  "Find the blend that starts Stop.": { word: "STOP", missing: [0, 1], representation: "🛑" },

  // End Blends
  "Which word ends with -nd?": { word: "HAND", missing: [2, 3], representation: "✋" },
  "Which sound ends Nest?": { word: "NEST", missing: [2, 3], representation: "🪹" },
  "Find the word ending in -mp.": { word: "LAMP", missing: [2, 3], representation: "💡" },
  "Which word ends with -sk?": { word: "DESK", missing: [2, 3], representation: "🪑" },
  "Find the word ending in -lt.": { word: "BELT", missing: [2, 3], representation: "🥋" },
  "Which word ends with -ft?": { word: "GIFT", missing: [2, 3], representation: "🎁" },

  // Digraphs
  "Which word starts with the sh sound?": { word: "SHIP", missing: [0, 1], representation: "🚢" },
  "What sound starts Chair?": { word: "CHAIR", missing: [0, 1], representation: "🪑" },
  "Which word ends with the th sound?": { word: "BATH", missing: [2, 3], representation: "🛁" },
  "Which word starts with the wh sound?": { word: "WHALE", missing: [0, 1], representation: "🐋" },
  "Find the word ending in -ck.": { word: "DUCK", missing: [2, 3], representation: "🦆" },
  "Which word ends with the sh sound?": { word: "FISH", missing: [2, 3], representation: "🐟" },

  // Diphthongs
  "Which word has the 'oi' sound?": { word: "COIN", missing: [1, 2], representation: "🪙" },
  "Find the word with the 'ow' sound.": { word: "COW", missing: [1, 2], representation: "🐮" },
  "Which word has the 'oy' sound?": { word: "BOY", missing: [1, 2], representation: "👦" },
  "Which word has the 'ou' sound?": { word: "CLOUD", missing: [2, 3], representation: "☁️" },
  "Find the word with the 'oy' sound for a plaything.": { word: "TOY", missing: [1, 2], representation: "🧸" },
  "Which bird has the 'ow' sound?": { word: "OWL", missing: [0, 1], representation: "🦉" },

  // Short & Long Vowels
  "Which word has a long /a/ sound?": { word: "CAKE", missing: [1, 3], representation: "🍰" },
  "Which word has a short /i/ sound?": { word: "PIG", missing: [1], representation: "🐷" },
  "What makes the vowel long in 'Hope'?": { word: "HOPE", missing: [3], representation: "🔑" },
  "Which word has a long /i/ sound?": { word: "KITE", missing: [1, 3], representation: "🪁" },
  "Which word has a short /u/ sound?": { word: "SUN", missing: [1], representation: "☀️" },
  "Which word has a long /o/ sound?": { word: "BOAT", missing: [1, 2], representation: "⛵" },

  // R-Controlled Vowels
  "Which word has the /ar/ sound like in Star?": { word: "CAR", missing: [1, 2], representation: "🚗" },
  "Chirp has which vowel sound?": { word: "CHIRP", missing: [2, 3], representation: "🐦" },
  "Which word has the /or/ sound?": { word: "FORK", missing: [1, 2], representation: "🍴" },
  "Find the bird word with r-controlled /ir/.": { word: "BIRD", missing: [1, 2], representation: "🦜" },
  "Which food has the /or/ sound?": { word: "CORN", missing: [1, 2], representation: "🌽" },

  // Alternate Sounds
  "What sound does c make in City?": { word: "CITY", missing: [0], representation: "🏙️" },
  "What sound does g make in Giraffe?": { word: "GIRAFFE", missing: [0], representation: "🦒" },
  "What sound does y make in Fly?": { word: "FLY", missing: [2], representation: "🪰" },
  "What sound does c make in Ice?": { word: "ICE", missing: [1], representation: "🧊" },
  "What sound does g make in Gem?": { word: "GEM", missing: [0], representation: "💎" },
  "What sound does y make in Sky?": { word: "SKY", missing: [2], representation: "🌌" }
};
const BADGES = [
  { name: 'First Steps', emoji: '👣', earned: true },
  { name: 'Word Wizard', emoji: '📖', earned: true },
  { name: 'Math Whiz', emoji: '➗', earned: false },
  { name: 'Space Explorer', emoji: '🚀', earned: false },
  { name: 'Ocean Diver', emoji: '🌊', earned: false },
  { name: 'Dino Master', emoji: '🦕', earned: false },
  { name: 'Creative Soul', emoji: '🎨', earned: false },
  { name: '7-Day Streak', emoji: '🔥', earned: false },
  { name: 'Star Collector', emoji: '⭐', earned: true },
  { name: 'Pet Lover', emoji: '💖', earned: true },
  { name: 'Treasure Hunter', emoji: '💎', earned: false },
  { name: 'Perfect Score', emoji: '🎯', earned: false },
];
const ANIMALS = [
  { emoji: '🐮', name: 'cow', sound: 'Moo' },
  { emoji: '🐷', name: 'pig', sound: 'Oink' },
  { emoji: '🐑', name: 'sheep', sound: 'Baa' },
  { emoji: '🐴', name: 'horse', sound: 'Neigh' },
  { emoji: '🐔', name: 'chicken', sound: 'Cluck' },
  { emoji: '🦆', name: 'duck', sound: 'Quack' },
];

const SHOP_ITEMS = {
  hats: [
    { id: 'hat_bow', name: 'Cute Bow', emoji: '🎀', price: 50 },
    { id: 'hat_tophat', name: 'Top Hat', emoji: '🎩', price: 100 },
    { id: 'hat_shades', name: 'Cool Shades', emoji: '🕶️', price: 150 },
    { id: 'hat_crown', name: 'Royal Crown', emoji: '👑', price: 300 },
    { id: 'hat_wizard', name: 'Wizard Hat', emoji: '🧙', price: 250 },
    { id: 'hat_dj', name: 'DJ Headphones', emoji: '🎧', price: 200 },
    { id: 'hat_grad', name: 'Scholar Cap', emoji: '🎓', price: 400 },
    { id: 'hat_viking', name: 'Viking Horns', emoji: '🪖', price: 350 },
  ],
  habitats: [
    { id: 'hab_lava', name: 'Lava Cave', emoji: '🌋', price: 300, bg: 'linear-gradient(180deg, #3A0C00 0%, #FF3D00 100%)' },
    { id: 'hab_space', name: 'Space Station', emoji: '🌌', price: 500, bg: 'linear-gradient(180deg, #0B0B2A 0%, #4B0082 100%)' },
    { id: 'hab_candy', name: 'Candy Land', emoji: '🍭', price: 600, bg: 'linear-gradient(180deg, #FFB6C1 0%, #FF69B4 100%)' },
    { id: 'hab_castle', name: 'Magic Castle', emoji: '🏰', price: 800, bg: 'linear-gradient(180deg, #1A237E 0%, #3F51B5 100%)' },
    { id: 'hab_island', name: 'Tropical Isle', emoji: '🏝️', price: 450, bg: 'linear-gradient(180deg, #006064 0%, #00ACC1 100%)' },
  ],
  potions: [
    { id: 'pot_xp', name: 'XP Surge Potion', emoji: '⚡', price: 100, effect: '+50 XP' },
    { id: 'pot_elixir', name: 'Rainbow Elixir', emoji: '🧪', price: 150, effect: '+100 Stars' },
    { id: 'pot_feast', name: 'Mega Feast', emoji: '🍎', price: 80, effect: 'Full Pet Health' },
  ]
};

const q = (question, options, correctIndex, pronunciation = null) => ({ question, options, correctIndex, pronunciation });
const section = (label, hint, title, subtitle, emoji, questions) => ({ label, hint, title, subtitle, emoji, questions });

const KINGDOMS = [
  {
    id: 'word', name: 'Word Forest', subject: 'English', color: '#3FA34D', emoji: '🌳', progress: 65, locked: false,
    sections: [
      section('Single Letters', 'Tap the sound to hear the letter.', 'Single Letters', 'Master all 26 letter sounds from A to Z.', '🌱', [
        q('Which sound starts Apple?', ['/a/', '/b/', '/m/', '/t/'], 0, 'A'),
        q('Which sound starts Ball?', ['/b/', '/d/', '/p/', '/g/'], 0, 'B'),
        q('Find the letter that starts Cat.', ['K', 'S', 'D', 'C'], 3, 'C'),
        q('Which sound starts Dog?', ['/d/', '/b/', '/t/', '/g/'], 0, 'D'),
        q('Which letter starts Elephant?', ['E', 'I', 'A', 'U'], 0, 'E'),
        q('Which sound starts Fish?', ['/f/', '/v/', '/s/', '/p/'], 0, 'F'),
        q('Which letter starts Giraffe?', ['G', 'J', 'C', 'K'], 0, 'G'),
        q('Which sound starts Horse?', ['/h/', '/f/', '/r/', '/w/'], 0, 'H'),
        q('Which letter starts Igloo?', ['I', 'E', 'A', 'O'], 0, 'I'),
        q('Which sound starts Jelly?', ['/j/', '/g/', '/y/', '/z/'], 0, 'J'),
        q('Which letter starts Kite?', ['K', 'C', 'Q', 'G'], 0, 'K'),
        q('Which sound starts Lion?', ['/l/', '/r/', '/m/', '/n/'], 0, 'L'),
        q('Which letter makes the /m/ sound?', ['N', 'P', 'M', 'S'], 2, 'M'),
        q('Which sound starts Nest?', ['/n/', '/m/', '/l/', '/r/'], 0, 'N'),
        q('Which letter starts Octopus?', ['O', 'U', 'A', 'E'], 0, 'O'),
        q('Which sound starts Penguin?', ['/p/', '/b/', '/d/', '/t/'], 0, 'P'),
        q('Which letter starts Queen?', ['Q', 'K', 'C', 'G'], 0, 'Q'),
        q('Which sound starts Rabbit?', ['/r/', '/l/', '/w/', '/y/'], 0, 'R'),
        q('Which letter starts Star?', ['S', 'Z', 'C', 'X'], 0, 'S'),
        q('Which sound starts Turtle?', ['/t/', '/d/', '/p/', '/k/'], 0, 'T'),
        q('Which letter starts Umbrella?', ['U', 'O', 'A', 'E'], 0, 'U'),
        q('Which sound starts Van?', ['/v/', '/f/', '/w/', '/b/'], 0, 'V'),
        q('Which letter starts Whale?', ['W', 'V', 'U', 'Y'], 0, 'W'),
        q('Which sound ends Box?', ['/x/', '/s/', '/z/', '/k/'], 0, 'X'),
        q('Which letter starts Yo-yo?', ['Y', 'I', 'J', 'W'], 0, 'Y'),
        q('Which sound starts Zebra?', ['/z/', '/s/', '/x/', '/j/'], 0, 'Z')
      ]),
      section('Two-Letter Sounds', 'Combine letters to make simple sounds.', 'Two-Letter Sounds', 'Practice simple VC (Vowel-Consonant) blends.', '🍀', [
        q('Read this sound: a + n', ['at', 'an', 'am', 'ad'], 1, 'an'),
        q('Which sound matches \'in\'?', ['/in/', '/on/', '/up/', '/it/'], 0, 'in'),
        q('Combine /o/ and /x/.', ['ox', 'op', 'ot', 'od'], 0, 'ox'),
        q('Combine /a/ and /m/.', ['am', 'an', 'at', 'ap'], 0, 'am'),
        q('Read this sound: a + t', ['at', 'am', 'an', 'as'], 0, 'at'),
        q('Which sound matches \'it\'?', ['/it/', '/in/', '/is/', '/if/'], 0, 'it'),
        q('Combine /u/ and /p/.', ['up', 'us', 'un', 'ut'], 0, 'up'),
        q('Read this sound: o + n', ['on', 'ox', 'op', 'or'], 0, 'on'),
      ]),
      section('Word Families', 'Words that sound the same at the end.', 'Word Families', 'Explore -at, -ig, and -ug rhyming words.', '🦊', [
        q('Which word is in the -at family?', ['Dog', 'Bat', 'Run', 'Hop'], 1, 'Bat'),
        q('Which word rhymes with Bug?', ['Rug', 'Pig', 'Sun', 'Bed'], 0, 'Rug'),
        q('Which word does NOT belong in -ig?', ['Pig', 'Dig', 'Dog', 'Big'], 2, 'Dog'),
        q('Which word is in the -an family?', ['Fan', 'Fox', 'Fin', 'Fog'], 0, 'Fan'),
        q('Which word rhymes with Hop?', ['Mop', 'Map', 'Mud', 'Man'], 0, 'Mop'),
        q('Which word is in the -ug family?', ['Jug', 'Jam', 'Jet', 'Job'], 0, 'Jug'),
        q('Which word rhymes with Cat?', ['Hat', 'Hen', 'Hop', 'Hut'], 0, 'Hat'),
      ]),
      section('Words ending in "x"', 'The /ks/ sound of x at the end of words.', 'Words ending in "x"', 'Listen to the /ks/ sound in box and fox.', '📦', [
        q('Which animal has \'x\' at the end?', ['Lion', 'Fox', 'Bear', 'Frog'], 1, 'Fox'),
        q('What is this shape called?', ['Box', 'Cup', 'Toy', 'Bag'], 0, 'Box'),
        q('Which number ends with the /ks/ sound?', ['Ten', 'Five', 'Six', 'Two'], 2, 'Six'),
        q('What candle material ends in \'x\'?', ['Wax', 'Wet', 'Win', 'Web'], 0, 'Wax'),
        q('Which word ends with the /ks/ sound?', ['Mix', 'Mud', 'Map', 'Men'], 0, 'Mix'),
        q('What muscle action ends in \'x\'?', ['Flex', 'Fly', 'Far', 'Fit'], 0, 'Flex'),
      ]),
      section('Beginning Blends', 'Two consonants together at the start.', 'Beginning Blends', 'Master beginning blends like bl-, cl-, and fl-.', '🌿', [
        q('What two letters start Frog?', ['Fl', 'Fr', 'Tr', 'Pr'], 1, 'Fr'),
        q('Which word starts with the sl- blend?', ['Sun', 'Star', 'Slip', 'Stop'], 2, 'Slip'),
        q('Find the blend that starts Blue.', ['Bl', 'Cl', 'Pl', 'Gl'], 0, 'Bl'),
        q('Which word starts with the tr- blend?', ['Tree', 'Top', 'Tap', 'Ten'], 0, 'Tree'),
        q('Which word starts with the dr- blend?', ['Drum', 'Dog', 'Dig', 'Dot'], 0, 'Drum'),
        q('Find the blend that starts Stop.', ['St', 'Sp', 'Sn', 'Sm'], 0, 'St'),
      ]),
      section('End Blends', 'Consonant blends at the end of words.', 'End Blends', 'Master ending blends like -nd, -st, and -mp.', '🌳', [
        q('Which word ends with -nd?', ['Hand', 'Hat', 'Hen', 'Hop'], 0, 'Hand'),
        q('Which sound ends Nest?', ['-nt', '-st', '-mp', '-ld'], 1, 'st'),
        q('Find the word ending in -mp.', ['Lamp', 'Leap', 'Last', 'Land'], 0, 'Lamp'),
        q('Which word ends with -sk?', ['Desk', 'Duck', 'Doll', 'Door'], 0, 'Desk'),
        q('Find the word ending in -lt.', ['Belt', 'Bat', 'Bed', 'Box'], 0, 'Belt'),
        q('Which word ends with -ft?', ['Gift', 'Got', 'Get', 'Gem'], 0, 'Gift'),
      ]),
      section('Digraphs', 'Two letters, one single sound.', 'Digraphs', 'Learn ch, sh, th, and wh sounds.', '🍃', [
        q('Which word starts with the sh sound?', ['Ship', 'Ring', 'Duck', 'Tree'], 0, 'Ship'),
        q('What sound starts Chair?', ['Sh', 'Ch', 'Th', 'Wh'], 1, 'Ch'),
        q('Which word ends with the th sound?', ['Bath', 'Bag', 'Bat', 'Bed'], 0, 'Bath'),
        q('Which word starts with the wh sound?', ['Whale', 'Wind', 'Web', 'Wet'], 0, 'Whale'),
        q('Find the word ending in -ck.', ['Duck', 'Dog', 'Dot', 'Day'], 0, 'Duck'),
        q('Which word ends with the sh sound?', ['Fish', 'Fox', 'Fan', 'Fit'], 0, 'Fish'),
      ]),
      section('Diphthongs', 'Gliding vowel sounds in words.', 'Diphthongs', 'Explore ou, ow, oi, and oy sounds.', '🥥', [
        q('Which word has the \'oi\' sound?', ['Coin', 'Cone', 'Can', 'Cold'], 0, 'Coin'),
        q('Find the word with the \'ow\' sound.', ['Cow', 'Cat', 'Cup', 'Car'], 0, 'Cow'),
        q('Which word has the \'oy\' sound?', ['Boy', 'Boat', 'Bed', 'Bag'], 0, 'Boy'),
        q('Which word has the \'ou\' sound?', ['Cloud', 'Cold', 'Cup', 'Cap'], 0, 'Cloud'),
        q('Find the word with the \'oy\' sound for a plaything.', ['Toy', 'Top', 'Tap', 'Tub'], 0, 'Toy'),
        q('Which bird has the \'ow\' sound?', ['Owl', 'Ostrich', 'Otter', 'Ox'], 0, 'Owl'),
      ]),
      section('Short & Long Vowels', 'The difference between short and long vowel sounds.', 'Short & Long Vowels', 'Hear the vowel change from tap to tape.', '🔑', [
        q('Which word has a long /a/ sound?', ['Cat', 'Hat', 'Cake', 'Map'], 2, 'Cake'),
        q('Which word has a short /i/ sound?', ['Kite', 'Pig', 'Ice', 'Pie'], 1, 'Pig'),
        q('What makes the vowel long in \'Hope\'?', ['Silent e at the end', 'The letter H', 'The letter p', 'Nothing'], 0, 'Silent e'),
        q('Which word has a long /i/ sound?', ['Kite', 'Kid', 'Kit', 'Kin'], 0, 'Kite'),
        q('Which word has a short /u/ sound?', ['Sun', 'Soap', 'Suit', 'Sail'], 0, 'Sun'),
        q('Which word has a long /o/ sound?', ['Boat', 'Bat', 'Bit', 'Bet'], 0, 'Boat'),
      ]),
      section('R-Controlled Vowels', 'When letter r bossily changes the vowel sound.', 'R-Controlled Vowels', 'Learn ar, er, ir, or, and ur sounds.', '🦉', [
        q('Which word has the /ar/ sound like in Star?', ['Car', 'Cat', 'Cup', 'Cap'], 0, 'Car'),
        q('Chirp has which vowel sound?', ['ar', 'ir', 'or', 'oo'], 1, 'ir'),
        q('Which word has the /or/ sound?', ['Fork', 'Fox', 'Fat', 'Fit'], 0, 'Fork'),
        q('Find the bird word with r-controlled /ir/.', ['Bird', 'Bed', 'Bat', 'Box'], 0, 'Bird'),
        q('Which food has the /or/ sound?', ['Corn', 'Can', 'Cup', 'Cap'], 0, 'Corn'),
      ]),
      section('Alternate Sounds', 'When letters make unexpected or soft/hard sounds.', 'Alternate Sounds', 'Explore soft c and soft g.', '🌈', [
        q('What sound does c make in City?', ['/k/', '/s/', '/ch/', '/sh/'], 1, 'C'),
        q('What sound does g make in Giraffe?', ['/g/', '/j/', '/h/', '/f/'], 1, 'G'),
        q('What sound does y make in Fly?', ['/ee/', '/i/', '/y/', '/ay/'], 1, 'Y'),
        q('What sound does c make in Ice?', ['/s/', '/k/', '/ch/', '/f/'], 0, 'C'),
        q('What sound does g make in Gem?', ['/j/', '/g/', '/h/', '/m/'], 0, 'G'),
        q('What sound does y make in Sky?', ['/i/', '/ee/', '/ay/', '/y/'], 0, 'Y'),
      ]),
    ],
  },
  {
    id: 'math', name: 'Math Castle', subject: 'Mathematics', color: '#3B6FE0', emoji: '🏰', progress: 40, locked: false,
    sections: [
      section('Royal Numbers', 'Numbers and counting in the royal hall.', 'Royal Numbers', 'Count the towers and guard the gates.', '🔢', [
        q('What number comes after 19?', ['18', '21', '20', '29'], 2),
        q('Which number is the biggest?', ['45', '92', '22', '88'], 1),
        q('What is the number for seventy-three?', ['37', '73', '703', '370'], 1),
        q('Count by tens: 10, 20, 30, __?', ['40', '35', '50', '100'], 0),
      ]),
      section('Addition Workshop', 'Combine treasures to find the total.', 'Addition Workshop', 'Add the castle jewels together.', '➕', [
        q('What is 5 + 4?', ['7', '8', '9', '10'], 2),
        q('If you have 10 apples and get 5 more, how many?', ['15', '12', '10', '20'], 0),
        q('What is 12 + 8?', ['18', '20', '22', '19'], 1),
        q('Find the missing number: 6 + __ = 10', ['3', '4', '5', '6'], 1),
      ]),
      section('Subtraction Dungeon', 'Take away gems from the chest.', 'Subtraction Dungeon', 'Solve subtraction puzzles to escape.', '➖', [
        q('What is 10 - 4?', ['5', '7', '6', '8'], 2),
        q('You had 8 coins and spent 3. How many are left?', ['4', '5', '6', '3'], 1),
        q('What is 20 - 5?', ['10', '15', '25', '5'], 1),
        q('Find the missing number: 15 - __ = 10', ['10', '4', '6', '5'], 3),
      ]),
      section('Shape Treasury', 'Identify the magical shapes.', 'Shape Treasury', 'Match 2D and 3D shapes.', '🔺', [
        q('Which shape has 3 sides?', ['Square', 'Circle', 'Triangle', 'Rectangle'], 2),
        q('A ball is shaped like a...', ['Cube', 'Sphere', 'Cone', 'Cylinder'], 1),
        q('How many corners does a square have?', ['3', '4', '5', '6'], 1),
        q('Which shape has NO corners?', ['Triangle', 'Square', 'Rectangle', 'Circle'], 3),
      ]),
      section('Time Tower', 'Read the clocks in the tower.', 'Time Tower', 'Learn hours and minutes.', '⏰', [
        q('How many minutes are in an hour?', ['30', '50', '60', '100'], 2),
        q('If the short hand is on 3 and long hand on 12, what time is it?', ['12:00', '3:00', '3:30', '12:15'], 1),
        q('Which is longer?', ['1 minute', '1 second', '1 hour', '1 day'], 3),
      ]),
      section('Pattern Bridges', 'Find what comes next.', 'Pattern Bridges', 'Complete the royal sequences.', '🧩', [
        q('What comes next: Red, Blue, Red, Blue, __', ['Red', 'Blue', 'Green', 'Yellow'], 0),
        q('Find the next number: 2, 4, 6, 8, __', ['9', '10', '11', '12'], 1),
        q('Circle, Square, Triangle, Circle, Square, __', ['Circle', 'Square', 'Triangle', 'Star'], 2),
      ]),
      section('Royal Trial', 'A final math challenge with rewards.', 'Royal Trial', 'Prove your number magic to the castle crown.', '👑', [
        q('What is 3 x 4?', ['10', '11', '12', '13'], 2),
        q('What is 1/2 of 10?', ['2', '4', '5', '6'], 2),
        q('What is 50 + 50?', ['10', '50', '100', '200'], 2),
        q('Which is the even number?', ['3', '5', '7', '8'], 3),
      ]),
    ],
  },
  {
    id: 'space', name: 'Space Science', subject: 'Science', color: '#7B4FE0', emoji: '🚀', progress: 20, locked: false,
    sections: [
      section('Solar System', 'Learn about our planetary neighbors.', 'Solar System', 'Orbit the planets and learn their names.', '🪐', [
        q('Which planet is closest to the Sun?', ['Earth', 'Mars', 'Mercury', 'Venus'], 2),
        q('Which is the largest planet?', ['Earth', 'Jupiter', 'Saturn', 'Mars'], 1),
        q('Which planet is known as the Red Planet?', ['Venus', 'Mars', 'Jupiter', 'Uranus'], 1),
        q('How many planets are in our solar system?', ['7', '8', '9', '10'], 1),
      ]),
      section('Sun and Moon', 'Discover our closest celestial bodies.', 'Sun and Moon', 'Understand day, night, and orbits.', '☀️', [
        q('What is at the centre of our solar system?', ['Earth', 'Moon', 'Mars', 'Sun'], 3),
        q('Which object orbits the Earth?', ['The Sun', 'The Moon', 'Mars', 'Comets'], 1),
        q('What gives Earth light and heat?', ['The Moon', 'The Stars', 'The Sun', 'The Clouds'], 2),
        q('How long does Earth take to orbit the Sun?', ['1 Day', '1 Month', '1 Year', '10 Years'], 2),
      ]),
      section('Star Gazing', 'Look up at the night sky.', 'Star Gazing', 'Explore stars, constellations, and galaxies.', '✨', [
        q('What is the closest star to Earth?', ['The Sun', 'Sirius', 'Polaris', 'Mars'], 0),
        q('What do we call a large group of stars?', ['A Cloud', 'A Galaxy', 'A Planet', 'A Comet'], 1),
        q('What pattern of stars makes a picture?', ['Constellation', 'Solar System', 'Orbit', 'Asteroid'], 0),
        q('What tool helps us see distant stars?', ['Microscope', 'Telescope', 'Binoculars', 'Glasses'], 1),
      ]),
      section('Space Travel', 'Launch into the great unknown.', 'Space Travel', 'Learn about astronauts and rockets.', '🚀', [
        q('What do we call people who travel to space?', ['Pilots', 'Drivers', 'Astronauts', 'Captains'], 2),
        q('What vehicle takes people to space?', ['Airplane', 'Submarine', 'Rocket', 'Train'], 2),
        q('What is the special suit astronauts wear?', ['Swimsuit', 'Spacesuit', 'Snowsuit', 'Tracksuit'], 1),
        q('What force must a rocket overcome to leave Earth?', ['Wind', 'Gravity', 'Magnetism', 'Friction'], 1),
      ]),
      section('Space Rocks', 'Watch out for flying debris!', 'Space Rocks', 'Dodge asteroids, meteors, and comets.', '☄️', [
        q('What is a shooting star actually called?', ['A Meteor', 'A Comet', 'An Asteroid', 'A Planet'], 0),
        q('What is a large rock orbiting the Sun called?', ['Asteroid', 'Moon', 'Star', 'Cloud'], 0),
        q('Which space rock has a tail of gas and dust?', ['Meteor', 'Asteroid', 'Comet', 'Planet'], 2),
        q('Where is the asteroid belt?', ['Near Earth', 'Past Pluto', 'Between Mars and Jupiter', 'Inside the Sun'], 2),
      ]),
      section('Earth Science', 'Look back at our home planet.', 'Earth Science', 'Learn what makes Earth special.', '🌍', [
        q('What covers most of Earth\'s surface?', ['Land', 'Ice', 'Water', 'Sand'], 2),
        q('What do we call the air around Earth?', ['Atmosphere', 'Gravity', 'Space', 'Cloud'], 0),
        q('Why can we breathe on Earth?', ['It has Helium', 'It has Oxygen', 'It has Water', 'It has Rocks'], 1),
        q('What pulls objects down towards Earth?', ['Wind', 'Magnetism', 'Gravity', 'Friction'], 2),
      ]),
      section('AI Core', 'Final challenge in the space control room.', 'AI Core', 'Wake the core and finish the mission.', '🤖', [
        q('Which planet is known for its beautiful rings?', ['Mercury', 'Earth', 'Saturn', 'Mars'], 2),
        q('What is the path a planet takes called?', ['Road', 'Orbit', 'Trail', 'Track'], 1),
        q('What do rockets need to burn to launch?', ['Fuel', 'Ice', 'Leaves', 'Sand'], 0),
        q('Which of these is NOT a planet?', ['Venus', 'Neptune', 'Pluto (Dwarf Planet)', 'Mars'], 2),
      ]),
    ],
  },
  {
    id: 'ocean', name: 'Ocean Kingdom', subject: 'EVS', color: '#19A7A0', emoji: '🌊', progress: 0, locked: false,
    sections: [
      section('The Oceans', 'Sail through the ocean and name the seas.', 'Captain Voyage', 'Chart the water path across the world.', '⛵', [
        q('Which is the largest ocean?', ['Atlantic', 'Indian', 'Arctic', 'Pacific'], 3),
        q('How many oceans are on Earth?', ['3', '4', '5', '6'], 2),
        q("What covers most of Earth\'s surface?", ['Land', 'Ice', 'Water', 'Sand'], 2),
        q('Which ocean is the coldest?', ['Indian', 'Pacific', 'Arctic', 'Atlantic'], 2),
      ]),
      section('Marine Life', 'Meet the animals of the sea.', 'Marine Life', 'Match the sea creatures to their facts.', '🐬', [
        q('Which animal is NOT a fish?', ['Salmon', 'Tuna', 'Whale', 'Cod'], 2),
        q('How do fish breathe underwater?', ['Lungs', 'Gills', 'Skin', 'Nose'], 1),
        q('What is a group of fish called?', ['Pack', 'Herd', 'School', 'Flock'], 2),
        q('Which sea creature has 8 arms?', ['Starfish', 'Crab', 'Octopus', 'Seahorse'], 2),
      ]),
      section('Coral Reefs', 'Explore the underwater cities.', 'Reef Workshop', 'Discover the colourful homes of fish.', '🐠', [
        q('What are coral reefs made of?', ['Rocks', 'Plants', 'Tiny Animals', 'Sand'], 2),
        q('Which fish loves to hide in anemones?', ['Shark', 'Clownfish', 'Tuna', 'Eel'], 1),
        q('Why are coral reefs important?', ['They hold gold', 'They are homes for fish', 'They make waves', 'They stop boats'], 1),
        q('What happens to coral when water gets too hot?', ['It grows faster', 'It turns white (bleaching)', 'It turns black', 'It swims away'], 1),
      ]),
      section('Water Cycle', 'Follow the journey of a water drop.', 'Water Cycle', 'Learn how water moves around Earth.', '🌧️', [
        q('What is it called when the sun heats water into gas?', ['Precipitation', 'Evaporation', 'Condensation', 'Collection'], 1),
        q('What happens when clouds get heavy?', ['Evaporation', 'Condensation', 'Precipitation (Rain)', 'Absorption'], 2),
        q('Water vapour turning into clouds is called?', ['Evaporation', 'Condensation', 'Precipitation', 'Runoff'], 1),
        q('Where does most rain come from?', ['Rivers', 'Lakes', 'Oceans', 'Puddles'], 2),
      ]),
      section('The Deep Sea', 'Dive into the dark depths.', 'Deep Sea', 'Discover creatures that glow in the dark.', '🦑', [
        q('Is there sunlight at the bottom of the ocean?', ['Yes', 'No', 'Sometimes', 'Only in summer'], 1),
        q('Why do some deep sea fish glow?', ['To stay warm', 'To attract food', 'To read books', 'To sleep'], 1),
        q('What is the deepest part of the ocean called?', ['Mariana Trench', 'Grand Canyon', 'Dead Sea', 'Red Sea'], 0),
        q('What makes it hard for humans to visit the deep sea?', ['High Pressure', 'Strong Winds', 'Loud Noise', 'Fast Currents'], 0),
      ]),
      section('Save the Ocean', 'Learn how to protect our seas.', 'Ocean Care', 'Keep the water clean for all marine life.', '♻️', [
        q('What is the biggest danger to sea turtles?', ['Sharks', 'Plastic Bags', 'Seagulls', 'Kelp'], 1),
        q('What should we do with our plastic bottles?', ['Throw in river', 'Bury in sand', 'Recycle them', 'Burn them'], 2),
        q('Why is an oil spill bad?', ['It feeds fish', 'It hurts marine life', 'It makes water warm', 'It smells nice'], 1),
        q('How can you help the ocean?', ['Leave trash on beach', 'Use less plastic', 'Pour soap in drains', 'Catch all fish'], 1),
      ]),
      section('Sea Guardian', 'Face the final ocean guardian.', 'Sea Guardian', 'Finish the tide quest and calm the waves.', '🐋', [
        q('What causes the ocean tides?', ['Wind', 'Boats', 'The Moon', 'Whales'], 2),
        q('Which is the largest animal on Earth?', ['Elephant', 'Blue Whale', 'Great White Shark', 'Giant Squid'], 1),
        q('What tastes salty in the ocean?', ['Sugar', 'Salt (Minerals)', 'Pepper', 'Lemon'], 1),
        q('Are coral reefs plants or animals?', ['Plants', 'Animals', 'Rocks', 'Fungi'], 1),
      ]),
    ],
  },
  {
    id: 'hist', name: 'Dino Valley', subject: 'Prehistory', color: '#C97A2B', emoji: '🦕', progress: 0, locked: false,
    sections: [
      section('Ancient Earth', 'Travel back in time to the beginning.', 'Time Machine', 'Learn what the Earth looked like long ago.', '🌋', [
        q('What was the Earth like before dinosaurs?', ['A giant city', 'Covered in ice or lava', 'A giant mall', 'Exactly like today'], 1),
        q('What is the giant supercontinent called?', ['Pangea', 'Atlantis', 'Eurasia', 'Gondwana'], 0),
        q('What comes out of an erupting volcano?', ['Water', 'Ice', 'Lava (Magma)', 'Sand'], 2),
        q('How do we know about ancient Earth?', ['Books from aliens', 'Studying rocks and fossils', 'Watching movies', 'Guessing'], 1),
      ]),
      section('Fossil Dig', 'Discover the clues buried in the dirt.', 'Bone Hunter', 'Uncover the bones of giants.', '🪨', [
        q('What is a fossil?', ['A new rock', 'Remains of ancient life', 'A type of food', 'A shiny gem'], 1),
        q('What do we call scientists who study fossils?', ['Astronauts', 'Doctors', 'Paleontologists', 'Teachers'], 2),
        q('Where are fossils usually found?', ['In the clouds', 'Inside trees', 'Buried in sedimentary rock', 'In the ocean only'], 2),
        q('Which of these can become a fossil?', ['Water', 'Wind', 'Dinosaur Bones', 'Thoughts'], 2),
      ]),
      section('Gentle Giants', 'Meet the dinosaurs that ate plants.', 'Herbivores', 'Learn about the biggest plant eaters.', '🦕', [
        q('What do herbivores eat?', ['Only Meat', 'Only Plants', 'Everything', 'Rocks'], 1),
        q('Which dinosaur had a very long neck?', ['T-Rex', 'Triceratops', 'Brachiosaurus', 'Velociraptor'], 2),
        q('What did the Triceratops have on its head?', ['A crown', 'Three horns', 'A large hat', 'Feathers'], 1),
        q('Why did long-neck dinosaurs have long necks?', ['To reach high leaves', 'To sing loudly', 'To swim deep', 'To wear scarves'], 0),
      ]),
      section('Fierce Hunters', 'Watch out for sharp teeth!', 'Carnivores', 'Learn about the meat-eating predators.', '🦖', [
        q('What do carnivores eat?', ['Plants', 'Meat (Other animals)', 'Dirt', 'Ice'], 1),
        q('Which dinosaur is the most famous carnivore?', ['T-Rex (Tyrannosaurus)', 'Stegosaurus', 'Brachiosaurus', 'Triceratops'], 0),
        q('What did carnivores use to catch their prey?', ['Fishing rods', 'Nets', 'Sharp teeth and claws', 'Asking nicely'], 2),
        q('Which dinosaur had a giant sail on its back?', ['Spinosaurus', 'T-Rex', 'Velociraptor', 'Pterodactyl'], 0),
      ]),
      section('Sky and Sea', 'Look up and look down!', 'Ancient Beasts', 'Discover creatures of the air and water.', '🦅', [
        q('Are Pterodactyls technically dinosaurs?', ['Yes', 'No, they are flying reptiles', 'They are birds', 'They are fish'], 1),
        q('Which giant reptile swam in the ancient oceans?', ['Megalodon', 'Mosasaurus', 'Dolphin', 'Blue Whale'], 1),
        q('What did flying reptiles eat?', ['Leaves', 'Fish and insects', 'Rocks', 'Clouds'], 1),
        q('Did dinosaurs live in the ocean?', ['Yes', 'No, marine reptiles did', 'Only in pools', 'Only on boats'], 1),
      ]),
      section('The Extinction', 'How did the dinosaur age end?', 'The End', 'Learn about the meteor that changed everything.', '☄️', [
        q('What is believed to have wiped out the dinosaurs?', ['A giant meteor strike', 'They got bored', 'A big flood', 'They flew away'], 0),
        q('What happened to the sky after the meteor hit?', ['It got brighter', 'It turned pink', 'Dust blocked out the sun', 'Nothing'], 2),
        q('Which animals survived the extinction?', ['No animals', 'Only fish', 'Small mammals and birds', 'Only T-Rex'], 2),
        q('What are the only living relatives of dinosaurs?', ['Dogs', 'Lizards', 'Birds', 'Humans'], 2),
      ]),
      section('Dino Master', 'Face the final prehistoric trial.', 'Dino Master', 'Prove you know everything about dinosaurs.', '👑', [
        q('What does the word "Dinosaur" mean?', ['Big Lizard', 'Terrible Lizard', 'Friendly Giant', 'Fast Runner'], 1),
        q('Which dinosaur had plates on its back and a spiked tail?', ['T-Rex', 'Stegosaurus', 'Triceratops', 'Raptor'], 1),
        q('During which era did dinosaurs live?', ['Mesozoic Era', 'Ice Age', 'Modern Era', 'Stone Age'], 0),
        q('Did humans and dinosaurs live at the same time?', ['Yes', 'No, millions of years apart', 'Only in caves', 'They were friends'], 1),
      ]),
    ],
  },
  {
    id: 'art', name: 'Creative Village', subject: 'Art & Music', color: '#E0559B', emoji: '🎨', progress: 0, locked: false,
    sections: [
      section('Canvas', 'Draw bold shapes and bright colors.', 'Drawing', 'Sketch the world with clean lines and color.', '✏️', [
        q('What are the three primary colours?', ['Red Green Blue', 'Red Yellow Blue', 'Orange Green Purple', 'Pink Brown Grey'], 1),
        q('What do you use to sketch lightly?', ['Brush', 'Pencil', 'Marker', 'Crayon'], 1),
        q('What is the outline of a drawing called?', ['Shading', 'Texture', 'Contour', 'Hue'], 2),
        q('Which color is made by mixing Red and Blue?', ['Purple', 'Green', 'Orange', 'Brown'], 0),
        q('What is shading used for in art?', ['Adding shadows and depth', 'Erasing lines', 'Cutting paper', 'Mixing water'], 0),
        q('Which tool is used for painting on canvas?', ['Scissors', 'Paintbrush', 'Ruler', 'Eraser'], 1),
      ]),
      section('Studio', 'Feel the beat and move with rhythm.', 'Music', 'Practice sounds, tempo, and melody.', '🎵', [
        q('How many notes are in a musical scale?', ['5', '6', '7', '8'], 2),
        q('What is the speed of music called?', ['Volume', 'Pitch', 'Tempo', 'Rhythm'], 2),
        q('Which instrument has keys?', ['Guitar', 'Drum', 'Piano', 'Violin'], 2),
        q('What instrument produces sound by hitting cymbals and drums?', ['Drum Kit', 'Flute', 'Violin', 'Trumpet'], 0),
        q('What do we call a high or low sound in music?', ['Tempo', 'Pitch', 'Volume', 'Beat'], 1),
        q('Which instrument do you blow into to play notes?', ['Piano', 'Flute', 'Drums', 'Harp'], 1),
      ]),
      section('Spark', 'Final creativity challenge.', 'Creativity', 'Make something new and original.', '🌈', [
        q('What does creativity mean?', ['Copying others', 'Following rules only', 'Making new and original ideas', 'Reading books'], 2),
        q('Which activity uses imagination most?', ['Memorising tables', 'Inventing a story', 'Copying a drawing', 'Reading instructions'], 1),
        q('What inspires artists?', ['Only other art', 'Nature, feelings and ideas', 'Only rules', 'Only money'], 1),
        q('What is a sculpture?', ['A 3D artwork made by carving or molding', 'A story in a book', 'A song on piano', 'A computer game'], 0),
        q('Which color is warm like fire?', ['Blue', 'Red', 'Green', 'Purple'], 1),
        q('What makes art unique?', ['Personal expression and imagination', 'Using the same template', 'Doing it fast', 'Making no mistakes'], 0),
      ]),
    ],
  },
];

let audioContext = null;
function getAudioContext() {
  if (audioContext) return audioContext;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;
  audioContext = new Ctor();
  return audioContext;
}
function playPopSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(820, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.9, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
}

function playClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
}

function playSuccessSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.setValueAtTime(554, ctx.currentTime + 0.1);
  osc.frequency.setValueAtTime(659, ctx.currentTime + 0.2);
  osc.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
  gain.gain.setValueAtTime(0.15, ctx.currentTime + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.6);
}
function playErrorSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.3);
}

function spokenText(text) {
  const raw = String(text ?? '').trim();
  if (!raw) return '';
  const inner = raw.match(/\/([^/]+)\//);
  let clean = (inner ? inner[1] : raw).trim().replace(/\s+/g, ' ');
  clean = clean.replace(/[.!?,;:]+$/g, '');
  if (clean.length === 1) clean = clean.toUpperCase();
  return clean;
}
function speak(text) {
  if (!window.speechSynthesis) return;
  const clean = spokenText(text);
  if (!clean) return;
  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
function addRewards(player, coinsEarned, xpEarned, starsEarned) {
  const next = { ...player };
  next.coins += coinsEarned;
  next.stars += starsEarned;
  let xp = next.xp + xpEarned;
  let max = next.xpToNextLevel;
  let level = next.level;
  while (xp >= max) {
    xp -= max;
    level += 1;
    max += 100;
  }
  next.xp = xp;
  next.level = level;
  next.xpToNextLevel = max;
  return next;
}

function WebAdBanner({ onWatchRewarded }) {
  const [closed, setClosed] = useState(false);
  const [adIdx, setAdIdx] = useState(0);

  const ads = [
    { title: "🚀 VIP Explorer Pass", sub: "Learn Phonics 3x Faster + Unlock Dragon Pet Skin!", cta: "Get VIP", emoji: "✨", bg: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)", border: "#6366F1" },
    { title: "🎬 Free Rewards Available!", sub: "Watch a short video to earn +50 Bonus Coins instantly!", cta: "Watch Ad", emoji: "🎁", bg: "linear-gradient(135deg, #064E3B 0%, #047857 100%)", border: "#10B981" },
    { title: "🐉 Pet Academy Challenge", sub: "Feed your dragon & earn 100 Stars today!", cta: "Explore", emoji: "🔥", bg: "linear-gradient(135deg, #7C2D12 0%, #C2410C 100%)", border: "#F97316" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAdIdx(prev => (prev + 1) % ads.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  if (closed) {
    return (
      <div style={{ position: 'sticky', bottom: '10px', right: '10px', zIndex: 9999, display: 'flex', justifyContent: 'flex-end', padding: '0 12px 10px' }}>
        <button
          onClick={() => setClosed(false)}
          style={{
            background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
            color: '#FFF',
            border: '2px solid #FFF',
            borderRadius: '999px',
            padding: '6px 14px',
            fontSize: '11px',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(99,102,241,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          type="button"
        >
          <span>📢 Show Ads</span>
        </button>
      </div>
    );
  }

  const currentAd = ads[adIdx];

  return (
    <div style={{
      position: 'relative',
      margin: '8px 12px 16px',
      background: currentAd.bg,
      border: `2px solid ${currentAd.border}`,
      borderRadius: '20px',
      padding: '10px 14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      color: '#FFF',
      transition: 'all 0.5s ease',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '26px',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '16px',
          width: '42px',
          height: '42px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {currentAd.emoji}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              background: '#FFD54F',
              color: '#000',
              fontSize: '9px',
              fontWeight: 900,
              padding: '1px 5px',
              borderRadius: '4px',
              textTransform: 'uppercase'
            }}>Ad • AdMob</span>
            <span style={{ fontSize: '13px', fontWeight: 900, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentAd.title}
            </span>
          </div>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentAd.sub}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px', flexShrink: 0 }}>
        <button
          onClick={() => {
            if (onWatchRewarded) onWatchRewarded();
          }}
          style={{
            background: 'linear-gradient(135deg, #FFD54F, #FF8E53)',
            color: '#000',
            border: 'none',
            borderRadius: '14px',
            padding: '7px 14px',
            fontSize: '12px',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255,213,79,0.4)',
            whiteSpace: 'nowrap'
          }}
          type="button"
        >
          {currentAd.cta}
        </button>
        <button
          onClick={() => setClosed(true)}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.7)',
            border: 'none',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            fontSize: '14px',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          type="button"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function WebRewardedAdModal({ onClose, onRewardClaimed }) {
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isCompleted, setIsCompleted] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setInterval(() => {
        setSecondsLeft(s => s - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsCompleted(true);
      if (typeof playSuccessSound === 'function') playSuccessSound();
    }
  }, [secondsLeft]);

  const handleClaim = () => {
    if (onRewardClaimed) onRewardClaimed(50);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '380px',
        background: 'linear-gradient(180deg, #1E1B4B 0%, #0F172A 100%)',
        border: '3px solid #6366F1',
        borderRadius: '28px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(99,102,241,0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Ad Video Header */}
        <div style={{
          width: '100%',
          padding: '14px 18px',
          background: 'rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ background: '#FFD54F', color: '#000', fontSize: '10px', fontWeight: 900, padding: '2px 6px', borderRadius: '4px' }}>ADMOB AD</span>
            <span style={{ fontSize: '12px', color: '#A5B4FC', fontWeight: 800 }}>Sponsored Reward Video</span>
          </div>

          <button
            onClick={() => setSoundOn(!soundOn)}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: '#FFF', fontSize: '14px', cursor: 'pointer' }}
            type="button"
          >
            {soundOn ? '🔊' : '🔇'}
          </button>
        </div>

        {/* Video Player Screen Simulation */}
        <div style={{
          width: '100%',
          height: '210px',
          background: 'linear-gradient(135deg, #312E81 0%, #4338CA 50%, #1E1B4B 100%)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '8px', animation: isCompleted ? 'bounce-idle 1s infinite' : 'sway-wobble 2s infinite alternate' }}>
            {isCompleted ? '🎉 🪙 ✨' : '🚀 🐉 🏰'}
          </div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#FFF', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            {isCompleted ? 'REWARD UNLOCKED!' : 'WonderVerse Academy VIP Pass'}
          </div>
          <div style={{ fontSize: '12px', color: '#C7D2FE', marginTop: '4px' }}>
            {isCompleted ? 'You earned 50 Bonus Coins & 20 Gems!' : 'Learn Phonics, Math & Science with 3D Adventures!'}
          </div>

          {/* Video Countdown badge overlay */}
          {!isCompleted ? (
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(0,0,0,0.6)',
              borderRadius: '999px',
              padding: '4px 12px',
              fontSize: '11px',
              fontWeight: 900,
              color: '#FFD54F',
              border: '1px solid #FFD54F'
            }}>
              Reward in {secondsLeft}s ⏱️
            </div>
          ) : (
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: '#10B981',
              borderRadius: '999px',
              padding: '4px 12px',
              fontSize: '11px',
              fontWeight: 900,
              color: '#FFF'
            }}>
              ✓ Complete
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)' }}>
          <div style={{
            height: '100%',
            width: `${((5 - secondsLeft) / 5) * 100}%`,
            background: isCompleted ? '#10B981' : 'linear-gradient(90deg, #6366F1, #FFD54F)',
            transition: 'width 1s linear'
          }} />
        </div>

        {/* Modal Action Footer */}
        <div style={{ padding: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          {isCompleted ? (
            <button
              onClick={handleClaim}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: '#FFF',
                border: '2px solid #34D399',
                borderRadius: '20px',
                padding: '14px',
                fontSize: '16px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(16,185,129,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              type="button"
            >
              <span>🪙 CLAIM +50 BONUS COINS!</span>
            </button>
          ) : (
            <button
              disabled
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.4)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '14px',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              type="button"
            >
              <span>Watching Ad... ({secondsLeft}s)</span>
            </button>
          )}

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.5)',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            type="button"
          >
            Close Ad
          </button>
        </div>
      </div>
    </div>
  );
}

function WebInterstitialAdModal({ type = 'finish', onClose, onAction }) {
  const isLoss = type === 'loss';

  const handleFinish = () => {
    if (onAction) onAction();
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.88)',
      backdropFilter: 'blur(14px)',
      zIndex: 999999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '380px',
        background: isLoss
          ? 'linear-gradient(180deg, #3B0764 0%, #18022B 100%)'
          : 'linear-gradient(180deg, #064E3B 0%, #022C22 100%)',
        border: isLoss ? '3px solid #C084FC' : '3px solid #34D399',
        borderRadius: '28px',
        overflow: 'hidden',
        boxShadow: isLoss ? '0 20px 60px rgba(192,132,252,0.4)' : '0 20px 60px rgba(52,211,153,0.4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* Header Badge */}
        <div style={{
          width: '100%',
          padding: '12px 18px',
          background: 'rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              background: isLoss ? '#F43F5E' : '#FFD54F',
              color: isLoss ? '#FFF' : '#000',
              fontSize: '10px',
              fontWeight: 900,
              padding: '2px 6px',
              borderRadius: '4px'
            }}>
              {isLoss ? 'LEVEL FAILED AD' : 'LEVEL COMPLETE AD'}
            </span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>
              AdMob Interstitial
            </span>
          </div>
          <button
            onClick={handleFinish}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              color: '#FFF',
              fontSize: '14px',
              fontWeight: 900,
              cursor: 'pointer'
            }}
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Ad Graphic & Body */}
        <div style={{ padding: '24px 20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '68px', animation: 'bounce-idle 1.2s infinite' }}>
            {isLoss ? '💔 🛡️ ✨' : '🏆 🌟 👑'}
          </div>

          <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#FFF', margin: 0 }}>
            {isLoss ? 'Don\'t Give Up, Explorer!' : 'Level Conquered!'}
          </h3>

          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.4 }}>
            {isLoss
              ? 'Watch this short partner ad to get +1 Extra Heart & revive instantly!'
              : 'Great job! Sponsored by WonderVerse Partner. Collect your bonus loot!'}
          </p>

          {/* Ad banner inside modal */}
          <div style={{
            width: '100%',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '18px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid rgba(255,255,255,0.2)',
            marginTop: '4px'
          }}>
            <span style={{ fontSize: '32px' }}>{isLoss ? '💖' : '🎁'}</span>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 900, color: '#FFD54F' }}>
                {isLoss ? 'Instant Revive Offer' : 'Victory Bonus Box'}
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
                {isLoss ? '+1 Heart + 20 Bonus Coins' : '+50 Coins & +10 XP Bonus'}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '0 20px 20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={handleFinish}
            style={{
              width: '100%',
              background: isLoss
                ? 'linear-gradient(135deg, #A855F7, #7E22CE)'
                : 'linear-gradient(135deg, #10B981, #059669)',
              color: '#FFF',
              border: isLoss ? '2px solid #C084FC' : '2px solid #34D399',
              borderRadius: '20px',
              padding: '14px',
              fontSize: '16px',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            type="button"
          >
            <span>{isLoss ? '💖 REVIVE & TRY AGAIN (+1 Heart)' : '🚀 CONTINUE TO NEXT LEVEL'}</span>
          </button>

          <button
            onClick={handleFinish}
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.6)',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            type="button"
          >
            Skip Ad
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState('splash');
  const [player, setPlayer] = useState(null);
  const [heroName, setHeroName] = useState('');
  const [heroEmoji, setHeroEmoji] = useState(EMOJIS[0]);
  const [activeKingdomId, setActiveKingdomId] = useState('word');
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [showAdModal, setShowAdModal] = useState(false);
  const [interstitialAdState, setInterstitialAdState] = useState(null);

  // Initialize App from Backend API or LocalStorage (offline-first & persistent)
  useEffect(() => {
    async function loadPlayerData() {
      let loadedPlayer = null;
      try {
        const res = await fetch('http://localhost:3000/api/player');
        if (res.ok) {
          const data = await res.json();
          if (data && data.player && data.player.name) {
            loadedPlayer = data.player;
          }
        }
      } catch (err) {
        console.log('Backend API offline, falling back to LocalStorage');
      }

      if (!loadedPlayer) {
        try {
          const saved = localStorage.getItem('wonder_player_data');
          if (saved) {
            loadedPlayer = JSON.parse(saved);
          }
        } catch (e) { }
      }

      let isFirstLaunch = false;
      if (!loadedPlayer) {
        isFirstLaunch = true;
        loadedPlayer = {
          name: 'Wonder Explorer', avatarEmoji: '🧑‍🚀', coins: 150, xp: 40, xpToNextLevel: 100,
          level: 1, streakDays: 3, stars: 12, petName: 'Glimmer',
          petHappiness: 85, petHunger: 90, petEmoji: '🐉',
          inventory: [], equipped: { hat: null, habitat: 'default' },
          hasCompletedOnboarding: false
        };
      } else {
        isFirstLaunch = !loadedPlayer.hasCompletedOnboarding;
      }

      setPlayer(loadedPlayer);
      if (loadedPlayer.name && loadedPlayer.name !== 'Wonder Explorer') {
        setHeroName(loadedPlayer.name);
      }
      if (loadedPlayer.avatarEmoji) {
        setHeroEmoji(loadedPlayer.avatarEmoji);
      }

      setShowSplash(false);
      setScreen(isFirstLaunch ? 'avatar' : 'map');
    }

    loadPlayerData();

    const handleGlobalClick = (e) => {
      const isButton = e.target.closest('button, .clickable');
      if (isButton && typeof playClickSound === 'function') playClickSound();
    };
    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  // Save to LocalStorage and sync to Backend on state change
  useEffect(() => {
    if (player && player.name && !showSplash) {
      try {
        localStorage.setItem('wonder_player_data', JSON.stringify(player));
      } catch (e) { }

      // Debounced background sync to backend
      const timer = setTimeout(() => {
        fetch('http://localhost:3000/api/player', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ player })
        }).catch(() => { });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [player, showSplash]);

  const activeKingdom = useMemo(() => KINGDOMS.find((item) => item.id === activeKingdomId) || KINGDOMS[0], [activeKingdomId]);
  const activeSection = activeKingdom.sections[selectedSectionIndex] || activeKingdom.sections[0];

  const openKingdom = (kingdomId) => {
    setActiveKingdomId(kingdomId);
    setSelectedSectionIndex(0);
    setScreen('kdetail');
  };

  const completeLesson = (coinsEarned, xpEarned, starsEarned) => {
    setPlayer((prev) => addRewards(prev, coinsEarned, xpEarned, starsEarned));
    playSuccessSound();
    setInterstitialAdState({
      type: 'finish',
      onAction: () => setScreen('map')
    });
  };

  const lastLossAdRef = React.useRef(0);
  const triggerLossAd = (onRetry) => {
    const now = Date.now();
    if (now - lastLossAdRef.current > 15000) {
      lastLossAdRef.current = now;
      setInterstitialAdState({
        type: 'loss',
        onAction: () => {
          if (onRetry) onRetry();
        }
      });
    } else {
      if (onRetry) onRetry();
    }
  };

  const earnRewards = (coinsEarned, starsEarned) => {
    setPlayer((prev) => addRewards(prev, coinsEarned, 0, starsEarned));
    if (starsEarned > 0) playSuccessSound();
  };

  const feedPet = () => {
    setPlayer((prev) => ({ ...prev, petHunger: Math.min(prev.petHunger + 25, 100), petHappiness: Math.min(prev.petHappiness + 5, 100) }));
  };

  const playPet = () => {
    setPlayer((prev) => ({ ...prev, petHappiness: Math.min(prev.petHappiness + 20, 100), petHunger: Math.max(prev.petHunger - 8, 0) }));
  };

  const startAdventure = () => {
    const name = heroName.trim() || 'Explorer';
    setPlayer((prev) => ({
      ...prev,
      name,
      avatarEmoji: heroEmoji,
      petEmoji: heroEmoji,
      petName: `${name}'s Companion`,
      hasCompletedOnboarding: true
    }));
    setScreen('map');
  };

  const renderScreen = () => {
    if (showSplash) return <SplashScreen />;
    switch (screen) {
      case 'avatar':
        return <AvatarScreen heroName={heroName} setHeroName={setHeroName} heroEmoji={heroEmoji} setHeroEmoji={setHeroEmoji} onStart={startAdventure} onBack={player?.hasCompletedOnboarding ? () => setScreen('map') : undefined} />;
      case 'map':
        return <MapScreen player={player} kingdoms={KINGDOMS} onOpenKingdom={openKingdom} onOpenPet={() => setScreen('pet')} onOpenRewards={() => setScreen('rewards')} onOpenShop={() => setScreen('shop')} onOpenNursery={() => setScreen('nursery-hub')} onOpenProfile={() => setScreen('avatar')} onWatchRewarded={() => setShowAdModal(true)} />;
      case 'kdetail':
        return <KingdomDetailScreen kingdom={activeKingdom} sectionIndex={selectedSectionIndex} setSectionIndex={setSelectedSectionIndex} onBack={() => setScreen('map')} onStartLesson={(target) => setScreen(typeof target === 'string' ? target : 'lesson')} />;
      case 'lesson':
        return <LessonScreen player={player} kingdom={activeKingdom} section={activeSection} onBack={() => setScreen('kdetail')} onComplete={completeLesson} onLoss={triggerLossAd} />;
      case 'phonics-tree-climber':
        return <PhonicsTreeClimberGame player={player} onBack={() => setScreen('kdetail')} onEarn={earnRewards} onLoss={triggerLossAd} />;
      case 'math-defender':
        return <MathDefenderGame player={player} onBack={() => setScreen('kdetail')} onComplete={completeLesson} onEarn={earnRewards} onLoss={triggerLossAd} />;
      case 'pet':
        return <PetScreen player={player} setPlayer={setPlayer} onBack={() => setScreen('map')} onFeed={feedPet} onPlay={playPet} />;
      case 'rewards':
        return <RewardsScreen player={player} onBack={() => setScreen('map')} onWatchRewarded={() => setShowAdModal(true)} />;
      case 'shop':
        return <ShopScreen player={player} setPlayer={setPlayer} onBack={() => setScreen('map')} />;
      case 'nursery-hub':
        return <NurseryHub onBack={() => setScreen('map')} onOpenGame={setScreen} />;
      case 'alphabet-game':
        return <AlphabetGame onBack={() => setScreen('nursery-hub')} onEarn={earnRewards} onComplete={completeLesson} onLoss={triggerLossAd} />;
      case 'animal-farm':
        return <AnimalFarm onBack={() => setScreen('nursery-hub')} onEarn={earnRewards} onComplete={completeLesson} onLoss={triggerLossAd} />;
      case 'fruit-market':
        return <FruitMarket onBack={() => setScreen('nursery-hub')} onEarn={earnRewards} onComplete={completeLesson} onLoss={triggerLossAd} />;
      case 'memory-match':
        return <MemoryMatch onBack={() => setScreen('nursery-hub')} onEarn={earnRewards} onComplete={completeLesson} onLoss={triggerLossAd} />;
      case 'starlight':
        return <StarlightGame onBack={() => setScreen('nursery-hub')} onEarn={earnRewards} onComplete={completeLesson} onLoss={triggerLossAd} />;
      case 'cauldron':
        return <CauldronGame onBack={() => setScreen('nursery-hub')} onEarn={earnRewards} onComplete={completeLesson} onLoss={triggerLossAd} />;
      case 'cloud-hopper':
        return <CloudHopperGame onBack={() => setScreen('nursery-hub')} onEarn={earnRewards} onComplete={completeLesson} onLoss={triggerLossAd} />;
      case 'rainbow-village':
        return <RainbowVillageGame onBack={() => setScreen('nursery-hub')} onEarn={earnRewards} onComplete={completeLesson} onLoss={triggerLossAd} />;
      case 'wonder-bakery':
        return <WonderBakeryGame onBack={() => setScreen('nursery-hub')} onEarn={earnRewards} onComplete={completeLesson} onLoss={triggerLossAd} />;
      case 'starlight-lesson':
        return <StarlightGame onBack={() => setScreen('kdetail')} onComplete={completeLesson} onLoss={triggerLossAd} />;
      case 'asteroid-blaster':
        return <AsteroidBlasterGame player={player} onComplete={completeLesson} onLoss={triggerLossAd} onBack={() => setScreen('kdetail')} />;
      case 'deep-sea-diver':
        return <DeepSeaDiverGame player={player} onComplete={completeLesson} onLoss={triggerLossAd} onBack={() => setScreen('kdetail')} />;
      case 'word-dino-jumper':
      case 'dino-jumper':
        return <DinoJumperGame player={player} isWordForest={true} onComplete={completeLesson} onLoss={triggerLossAd} onBack={() => setScreen('kdetail')} />;
      case 'dino-jumper-history':
        return <DinoJumperGame player={player} isWordForest={false} onComplete={completeLesson} onLoss={triggerLossAd} onBack={() => setScreen('kdetail')} />;
      case 'melody-maker':
        return <MelodyMakerGame player={player} onComplete={completeLesson} onLoss={triggerLossAd} onBack={() => setScreen('kdetail')} />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="phone">
      {renderScreen()}
      {(screen === 'map' || screen === 'rewards') && (
        <WebAdBanner onWatchRewarded={() => setShowAdModal(true)} />
      )}
      {showAdModal && (
        <WebRewardedAdModal
          onClose={() => setShowAdModal(false)}
          onRewardClaimed={(amount) => earnRewards(amount, 0)}
        />
      )}
      {interstitialAdState && (
        <WebInterstitialAdModal
          type={interstitialAdState.type}
          onClose={() => setInterstitialAdState(null)}
          onAction={() => {
            if (interstitialAdState.onAction) interstitialAdState.onAction();
          }}
        />
      )}
    </div>
  );
}

function SplashScreen() {
  return (
    <div id="splash" className="screen active" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="crystal">✨</div>
      <div className="splash-title">WonderVerse</div>
      <div className="splash-sub">Loading adventures...</div>
    </div>
  );
}

function AvatarScreen({ heroName, setHeroName, heroEmoji, setHeroEmoji, onStart, onBack }) {
  return (
    <div id="avatar" className="screen active" style={{
      background: 'linear-gradient(180deg, #1A1325 0%, #2E2140 50%, #150D21 100%)',
      color: 'white',
      padding: '0',
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }}>

      {/* Decorative background ambient glows */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,213,79,0.18) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(79,195,247,0.15) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />

      {/* Header */}
      <div style={{ padding: '24px 24px 10px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        {onBack && (
          <button onClick={onBack} style={{ position: 'absolute', left: '20px', top: '24px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '16px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', backdropFilter: 'blur(10px)' }} type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
        )}
        <h1 style={{ fontSize: '28px', fontWeight: 900, textShadow: '0 4px 12px rgba(0,0,0,0.5)', margin: 0, letterSpacing: '-0.02em', background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E5F0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Choose Your Hero</h1>
        <p style={{ color: '#A0A5BA', marginTop: '4px', fontSize: '14px', fontWeight: 600 }}>Who will you be today?</p>
      </div>

      {/* Main Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 10, padding: '0 20px 24px' }}>

        {/* Centered Hero Mascot Podium Stage */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: '160px' }}>
          {/* Glowing Aura Ring */}
          <div style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,213,79,0.25) 0%, transparent 70%)',
            animation: 'pulse 2s infinite alternate'
          }} />

          {/* Glass Podium Base */}
          <div style={{ position: 'absolute', bottom: '15%', width: '180px', height: '36px', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '50%', boxShadow: '0 12px 36px rgba(0,0,0,0.5), inset 0 2px 8px rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }} />

          {/* Hero Mascot Emoji */}
          <div style={{ fontSize: '100px', filter: 'drop-shadow(0 16px 28px rgba(0,0,0,0.6))', animation: 'sway-wobble 3s infinite alternate ease-in-out', zIndex: 2, marginBottom: '24px', cursor: 'pointer' }} onClick={() => { try { if (typeof speak === 'function') speak('I am ready for adventure!'); } catch (e) { } }}>
            {heroEmoji}
          </div>
        </div>

        {/* Hero Selector & Name Card */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '32px', padding: '18px 16px', backdropFilter: 'blur(20px)', boxShadow: '0 20px 48px rgba(0,0,0,0.4)', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {EMOJIS.map((emoji) => {
              const isSelected = heroEmoji === emoji;
              return (
                <button
                  key={emoji}
                  onClick={() => {
                    setHeroEmoji(emoji);
                    try { if (typeof speak === 'function') speak(emoji); } catch (e) { }
                  }}
                  style={{
                    background: isSelected ? 'linear-gradient(135deg, #FFD54F, #FF9E5E)' : 'rgba(255,255,255,0.06)',
                    border: isSelected ? '2.5px solid #FFF' : '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '20px',
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 8px 20px rgba(255,158,94,0.4)' : 'none',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    filter: isSelected ? 'none' : 'grayscale(30%) opacity(0.85)',
                    transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                    padding: 0
                  }}
                  type="button"
                >
                  <span style={{ filter: isSelected ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none' }}>{emoji}</span>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: '18px' }}>👤</div>
              <input
                type="text"
                value={heroName}
                onChange={(event) => setHeroName(event.target.value)}
                placeholder="Enter your hero name"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '16px 16px 16px 48px',
                  borderRadius: '18px',
                  border: '2px solid rgba(255,255,255,0.12)',
                  background: 'rgba(0,0,0,0.3)',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 600,
                  outline: 'none',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)'
                }}
              />
            </div>

            <button
              onClick={onStart}
              style={{
                background: 'linear-gradient(180deg, #4FC3F7 0%, #00B0FF 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '18px',
                fontSize: '18px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 12px 28px rgba(0,176,255,0.4), inset 0 2px 4px rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              type="button"
            >
              Start Adventure!
            </button>
          </div>
        </div>
        <div style={{ height: '40px', flexShrink: 0 }}></div>
      </div>
    </div>
  );
}

function getKingdomVisuals(kingdom) {
  const { id, progress, locked, color } = kingdom;
  if (locked) {
    return {
      emoji: '🔒',
      bg: '#E2E5F0',
      shadow: 'none',
      subLabel: 'Locked',
      decorations: []
    };
  }

  // Determine stage based on progress
  let stage = 'sprout'; // sprout, dynamic, mature, magical
  if (progress >= 91) stage = 'magical';
  else if (progress >= 61) stage = 'mature';
  else if (progress >= 31) stage = 'dynamic';

  switch (id) {
    case 'word': // Word Forest
      if (stage === 'sprout') {
        return {
          emoji: '🌱',
          bg: 'linear-gradient(135deg, #2E5C38 0%, #1A3E23 100%)',
          shadow: '0 16px 32px rgba(46,92,56,0.3)',
          subLabel: 'Sprout Phase',
          decorations: []
        };
      } else if (stage === 'dynamic') {
        return {
          emoji: '🌿',
          bg: 'linear-gradient(135deg, #3FA34D 0%, #1C6B2B 100%)',
          shadow: '0 16px 32px rgba(63,163,77,0.35)',
          subLabel: 'Sapling Phase',
          decorations: [
            { emoji: '🍃', className: 'decor-float-slow', top: '15%', left: '40%', fontSize: '16px' }
          ]
        };
      } else if (stage === 'mature') {
        return {
          emoji: '🌳',
          bg: 'linear-gradient(135deg, #3FA34D 0%, #0F4219 100%)',
          shadow: '0 16px 32px rgba(63,163,77,0.4)',
          subLabel: 'Lush Forest',
          decorations: [
            { emoji: '🦋', className: 'decor-float-fast', top: '20%', left: '15%', fontSize: '18px' },
            { emoji: '🍃', className: 'decor-float-slow', top: '25%', left: '45%', fontSize: '16px' }
          ]
        };
      } else { // magical
        return {
          emoji: '✨🌳🌸',
          bg: 'linear-gradient(135deg, #5AB967 0%, #0F4219 60%, #cca11b 100%)',
          shadow: '0 16px 32px rgba(204,161,27,0.45), 0 0 15px rgba(255,255,255,0.2)',
          subLabel: 'Magical Forest',
          decorations: [
            { emoji: '🦋', className: 'decor-float-fast', top: '15%', left: '15%', fontSize: '20px' },
            { emoji: '🌸', className: 'decor-pulse', top: '75%', left: '20%', fontSize: '16px' },
            { emoji: '✨', className: 'decor-float-slow', top: '25%', left: '80%', fontSize: '18px' }
          ]
        };
      }

    case 'math': // Math Castle
      if (stage === 'sprout') {
        return {
          emoji: '🧱',
          bg: 'linear-gradient(135deg, #4A5B70 0%, #293847 100%)',
          shadow: '0 16px 32px rgba(74,91,112,0.3)',
          subLabel: 'Foundation Stage',
          decorations: []
        };
      } else if (stage === 'dynamic') {
        return {
          emoji: '🏰',
          bg: 'linear-gradient(135deg, #3B6FE0 0%, #153E90 100%)',
          shadow: '0 16px 32px rgba(59,111,224,0.35)',
          subLabel: 'Keep Stage',
          decorations: [
            { emoji: '🧱', className: 'decor-float-slow', top: '70%', left: '80%', fontSize: '14px' }
          ]
        };
      } else if (stage === 'mature') {
        return {
          emoji: '🏰👑',
          bg: 'linear-gradient(135deg, #4A7DF0 0%, #102F75 100%)',
          shadow: '0 16px 32px rgba(74,125,240,0.4)',
          subLabel: 'Royal Castle',
          decorations: [
            { emoji: '🪙', className: 'decor-float-fast', top: '20%', left: '15%', fontSize: '18px' },
            { emoji: '🏰', className: 'decor-pulse', top: '75%', left: '80%', fontSize: '14px' }
          ]
        };
      } else { // magical
        return {
          emoji: '🏰✨👑',
          bg: 'linear-gradient(135deg, #3B6FE0 0%, #102F75 60%, #E6C229 100%)',
          shadow: '0 16px 32px rgba(230,194,41,0.45)',
          subLabel: 'Magical Kingdom',
          decorations: [
            { emoji: '💎', className: 'decor-float-fast', top: '15%', left: '15%', fontSize: '18px' },
            { emoji: '🪙', className: 'decor-float-slow', top: '75%', left: '20%', fontSize: '16px' },
            { emoji: '✨', className: 'decor-pulse', top: '25%', left: '80%', fontSize: '20px' }
          ]
        };
      }

    case 'space': // Space Science
      if (stage === 'sprout') {
        return {
          emoji: '🔭',
          bg: 'linear-gradient(135deg, #312652 0%, #17102C 100%)',
          shadow: '0 16px 32px rgba(49,38,82,0.3)',
          subLabel: 'Observer Phase',
          decorations: []
        };
      } else if (stage === 'dynamic') {
        return {
          emoji: '🚀',
          bg: 'linear-gradient(135deg, #7B4FE0 0%, #442294 100%)',
          shadow: '0 16px 32px rgba(123,79,224,0.35)',
          subLabel: 'Launch Phase',
          decorations: [
            { emoji: '⭐', className: 'decor-pulse', top: '20%', left: '75%', fontSize: '12px' }
          ]
        };
      } else if (stage === 'mature') {
        return {
          emoji: '🪐',
          bg: 'linear-gradient(135deg, #7B4FE0 0%, #200D52 100%)',
          shadow: '0 16px 32px rgba(123,79,224,0.4)',
          subLabel: 'Orbit Phase',
          decorations: [
            { emoji: '☄️', className: 'decor-float-fast', top: '15%', left: '15%', fontSize: '18px' },
            { emoji: '⭐', className: 'decor-pulse', top: '75%', left: '80%', fontSize: '14px' }
          ]
        };
      } else { // magical
        return {
          emoji: '🌌🛸✨',
          bg: 'linear-gradient(135deg, #8E5FFF 0%, #170A3D 60%, #00E5FF 100%)',
          shadow: '0 16px 32px rgba(0,229,255,0.45)',
          subLabel: 'Deep Space',
          decorations: [
            { emoji: '🛸', className: 'decor-float-fast', top: '20%', left: '15%', fontSize: '20px' },
            { emoji: '🪐', className: 'decor-float-slow', top: '75%', left: '20%', fontSize: '18px' },
            { emoji: '✨', className: 'decor-pulse', top: '15%', left: '75%', fontSize: '16px' }
          ]
        };
      }

    case 'ocean': // Ocean Kingdom
      if (stage === 'sprout') {
        return {
          emoji: '💧',
          bg: 'linear-gradient(135deg, #184F59 0%, #09252B 100%)',
          shadow: '0 16px 32px rgba(24,79,89,0.3)',
          subLabel: 'Shallows Phase',
          decorations: []
        };
      } else if (stage === 'dynamic') {
        return {
          emoji: '⛵',
          bg: 'linear-gradient(135deg, #19A7A0 0%, #0C615D 100%)',
          shadow: '0 16px 32px rgba(25,167,160,0.35)',
          subLabel: 'Reef Phase',
          decorations: [
            { emoji: '🫧', className: 'decor-pulse', top: '70%', left: '80%', fontSize: '16px' }
          ]
        };
      } else if (stage === 'mature') {
        return {
          emoji: '🐠🐬',
          bg: 'linear-gradient(135deg, #19A7A0 0%, #06403D 100%)',
          shadow: '0 16px 32px rgba(25,167,160,0.4)',
          subLabel: 'Coral Kingdom',
          decorations: [
            { emoji: '🐠', className: 'decor-float-fast', top: '15%', left: '15%', fontSize: '18px' },
            { emoji: '🫧', className: 'decor-pulse', top: '75%', left: '80%', fontSize: '14px' }
          ]
        };
      } else { // magical
        return {
          emoji: '🐋🔱✨',
          bg: 'linear-gradient(135deg, #2ED3CA 0%, #06403C 60%, #00B0FF 100%)',
          shadow: '0 16px 32px rgba(0,176,255,0.45)',
          subLabel: 'Tidal Guardian',
          decorations: [
            { emoji: '🐋', className: 'decor-float-fast', top: '15%', left: '15%', fontSize: '22px' },
            { emoji: '🌊', className: 'decor-float-slow', top: '75%', left: '20%', fontSize: '18px' },
            { emoji: '✨', className: 'decor-pulse', top: '25%', left: '75%', fontSize: '16px' }
          ]
        };
      }

    case 'hist': // Dino Valley
      if (stage === 'sprout') {
        return {
          emoji: '🪨',
          bg: 'linear-gradient(135deg, #5C412B 0%, #332012 100%)',
          shadow: '0 16px 32px rgba(92,65,43,0.3)',
          subLabel: 'Dig-site Phase',
          decorations: []
        };
      } else if (stage === 'dynamic') {
        return {
          emoji: '🐣',
          bg: 'linear-gradient(135deg, #C97A2B 0%, #854E17 100%)',
          shadow: '0 16px 32px rgba(201,122,43,0.35)',
          subLabel: 'Hatchling Phase',
          decorations: [
            { emoji: '🦴', className: 'decor-float-slow', top: '70%', left: '85%', fontSize: '14px' }
          ]
        };
      } else if (stage === 'mature') {
        return {
          emoji: '🦕',
          bg: 'linear-gradient(135deg, #C97A2B 0%, #5E3307 100%)',
          shadow: '0 16px 32px rgba(201,122,43,0.4)',
          subLabel: 'Dino Valley',
          decorations: [
            { emoji: '🌿', className: 'decor-float-fast', top: '15%', left: '15%', fontSize: '18px' },
            { emoji: '🦴', className: 'decor-float-slow', top: '75%', left: '80%', fontSize: '14px' }
          ]
        };
      } else { // magical
        return {
          emoji: '🦖🌋✨',
          bg: 'linear-gradient(135deg, #DE8C3C 0%, #5E3307 60%, #FF3D00 100%)',
          shadow: '0 16px 32px rgba(255,61,0,0.45)',
          subLabel: 'Dino Master',
          decorations: [
            { emoji: '🦖', className: 'decor-float-fast', top: '15%', left: '15%', fontSize: '22px' },
            { emoji: '🌋', className: 'decor-pulse', top: '75%', left: '20%', fontSize: '18px' },
            { emoji: '✨', className: 'decor-float-slow', top: '25%', left: '80%', fontSize: '16px' }
          ]
        };
      }

    case 'art': // Creative Village
      if (stage === 'sprout') {
        return {
          emoji: '✏️',
          bg: 'linear-gradient(135deg, #61334B 0%, #361726 100%)',
          shadow: '0 16px 32px rgba(97,51,75,0.3)',
          subLabel: 'Sketch Phase',
          decorations: []
        };
      } else if (stage === 'dynamic') {
        return {
          emoji: '🎨',
          bg: 'linear-gradient(135deg, #E0559B 0%, #942E61 100%)',
          shadow: '0 16px 32px rgba(224,85,155,0.35)',
          subLabel: 'Canvas Phase',
          decorations: [
            { emoji: '💧', className: 'decor-float-slow', top: '75%', left: '80%', fontSize: '14px' }
          ]
        };
      } else if (stage === 'mature') {
        return {
          emoji: '🎵🎸',
          bg: 'linear-gradient(135deg, #E0559B 0%, #6E1241 100%)',
          shadow: '0 16px 32px rgba(224,85,155,0.4)',
          subLabel: 'Melody Phase',
          decorations: [
            { emoji: '🎵', className: 'decor-float-fast', top: '15%', left: '15%', fontSize: '18px' },
            { emoji: '🎨', className: 'decor-pulse', top: '75%', left: '80%', fontSize: '16px' }
          ]
        };
      } else { // magical
        return {
          emoji: '🌈🎨✨',
          bg: 'linear-gradient(135deg, #FF6EB4 0%, #6E1241 60%, #FF8A00 100%)',
          shadow: '0 16px 32px rgba(255,138,0,0.45)',
          subLabel: 'Masterpiece',
          decorations: [
            { emoji: '🌈', className: 'decor-float-fast', top: '15%', left: '15%', fontSize: '20px' },
            { emoji: '🎵', className: 'decor-float-slow', top: '75%', left: '20%', fontSize: '16px' },
            { emoji: '✨', className: 'decor-pulse', top: '25%', left: '75%', fontSize: '18px' }
          ]
        };
      }

    default:
      return {
        emoji: '🌳',
        bg: `linear-gradient(135deg, ${color}ee, ${color})`,
        shadow: `0 16px 32px ${color}40`,
        subLabel: 'Adventure Stage',
        decorations: []
      };
  }
}

function MapScreen({ player, kingdoms, onOpenKingdom, onOpenPet, onOpenRewards, onOpenShop, onOpenNursery, onOpenProfile, onWatchRewarded }) {
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
      padding: 0, display: 'block', overflowX: 'hidden', overflowY: 'auto', position: 'relative', height: '100%'
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
        padding: '16px 10px', borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px',
        boxShadow: '0 12px 32px rgba(31,38,135,0.1), inset 0 -2px 0 rgba(255,255,255,0.4)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.6)', borderLeft: '1px solid rgba(255, 255, 255, 0.3)', borderRight: '1px solid rgba(255, 255, 255, 0.3)',
        display: 'flex', gap: '6px', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, position: 'sticky', top: 0, left: 0, right: 0
      }}>
        {/* Level Badge */}
        <div style={{ background: 'linear-gradient(135deg, #AB47BC 0%, #7B1FA2 100%)', padding: '6px 10px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 6px 14px rgba(123,31,162,0.3), inset 0 2px 4px rgba(255,255,255,0.6)', border: '1.5px solid rgba(255,255,255,0.8)' }}>
          <span style={{ fontSize: '15px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>🏆</span>
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Lvl {Math.floor((player?.xp || 0) / 100) + 1}</span>
        </div>
        {/* Coins Badge */}
        <div style={{ background: 'linear-gradient(135deg, #FFD54F 0%, #FF9800 100%)', padding: '6px 10px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 6px 14px rgba(255,152,0,0.3), inset 0 2px 4px rgba(255,255,255,0.6)', border: '1.5px solid rgba(255,255,255,0.8)' }}>
          <span style={{ fontSize: '15px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>🪙</span>
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{player?.coins || 0}</span>
        </div>
        {/* Stars Badge */}
        <div style={{ background: 'linear-gradient(135deg, #FFF176 0%, #FBC02D 100%)', padding: '6px 10px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 6px 14px rgba(251,192,45,0.3), inset 0 2px 4px rgba(255,255,255,0.6)', border: '1.5px solid rgba(255,255,255,0.8)' }}>
          <span style={{ fontSize: '15px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>⭐</span>
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{player?.stars || 0}</span>
        </div>
        {/* Streak Badge */}
        <div style={{ background: 'linear-gradient(135deg, #FF8A65 0%, #E64A19 100%)', padding: '6px 10px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 6px 14px rgba(230,74,25,0.3), inset 0 2px 4px rgba(255,255,255,0.6)', border: '1.5px solid rgba(255,255,255,0.8)' }}>
          <span style={{ fontSize: '15px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>🔥</span>
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{player?.streakDays || 1}d</span>
        </div>
        {/* Magic Gems Badge */}
        <div style={{ background: 'linear-gradient(135deg, #4FC3F7 0%, #0288D1 100%)', padding: '6px 10px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 6px 14px rgba(2,136,209,0.3), inset 0 2px 4px rgba(255,255,255,0.6)', border: '1.5px solid rgba(255,255,255,0.8)' }}>
          <span style={{ fontSize: '15px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>💎</span>
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{player?.gems || 100}</span>
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
              Welcome back,<br /><span style={{ background: 'linear-gradient(90deg, #1E88E5 0%, #42A5F5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{player.name}</span>!
            </h2>
          </div>
        </button>

        {/* Action Pods (Tactile 3D Box Cards) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '0 16px 32px' }}>
          {[
            { id: 'pet', label: 'My Pet', emoji: '🐶', bg: 'linear-gradient(135deg, #4FC3F7, #0288D1)', color: '#0288D1', action: onOpenPet },
            { id: 'rewards', label: 'Rewards', emoji: '🎖️', bg: 'linear-gradient(135deg, #FFD54F, #F57C00)', color: '#F57C00', action: onOpenRewards },
            { id: 'shop', label: 'Shop', emoji: '🛍️', bg: 'linear-gradient(135deg, #FF8A80, #D50000)', color: '#D50000', action: onOpenShop },
            { id: 'nursery', label: 'Nursery', emoji: '👶', bg: 'linear-gradient(135deg, #CE93D8, #8E24AA)', color: '#8E24AA', action: onOpenNursery }
          ].map(pod => (
            <button key={pod.id} onClick={pod.action} className="clickable" style={{
              background: pod.bg,
              border: '3px solid rgba(255, 255, 255, 0.95)',
              borderRadius: '24px',
              minHeight: '105px',
              padding: '14px 6px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: `0 12px 24px ${pod.color}40, inset 0 6px 12px rgba(255,255,255,0.6), inset 0 -6px 12px rgba(0,0,0,0.2)`,
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }} type="button">
              {/* Top Glass Lens Highlight */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 100%)',
                borderRadius: '24px 24px 0 0',
                pointerEvents: 'none'
              }} />

              {/* Icon Emoji */}
              <span style={{
                fontSize: '32px',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                position: 'relative',
                zIndex: 2
              }}>
                {pod.emoji}
              </span>

              {/* Text Label */}
              <span style={{
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '13px',
                lineHeight: 1.1,
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                position: 'relative',
                zIndex: 2
              }}>
                {pod.label}
              </span>
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

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '16px', position: 'relative', zIndex: 10 }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: kingdom.locked ? '#8A91A8' : '#FFFFFF', textShadow: kingdom.locked ? 'none' : '0 2px 4px rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}>
                      {kingdom.locked ? 'Locked' : `${kingdom.progress}% Restored • ${visuals.subLabel}`}
                    </span>
                    {!kingdom.locked && (
                      <div style={{ background: 'rgba(0,0,0,0.25)', padding: '5px 10px', borderRadius: '999px', display: 'flex', gap: '4px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)', zIndex: 10, flexShrink: 0 }}>
                        {[...Array(3)].map((_, i) => (
                          <span key={i} style={{ fontSize: '15px', opacity: i < stars ? 1 : 0.3, filter: i < stars ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none' }}>⭐</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* AdMob Banner Ad */}
        <WebAdBanner onWatchRewarded={onWatchRewarded} />
      </div>
    </div>
  );
}

function KingdomDetailScreen({ kingdom, sectionIndex, setSectionIndex, onBack, onStartLesson }) {
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const bgLight = hexToRgba(kingdom.color, 0.12);
  const bgDarker = hexToRgba(kingdom.color, 0.85);

  return (
    <div id="kdetail" className="screen active" style={{ background: '#F4F7FC', padding: '0px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Premium Header with richer gradient */}
      <div style={{
        background: `radial-gradient(circle at top right, ${hexToRgba(kingdom.color, 0.7)} 0%, transparent 60%), linear-gradient(180deg, ${kingdom.color} 0%, ${bgDarker} 100%)`,
        padding: '24px 20px 48px',
        borderBottomLeftRadius: '36px',
        borderBottomRightRadius: '36px',
        position: 'relative',
        boxShadow: `0 16px 40px ${hexToRgba(kingdom.color, 0.25)}`
      }}>
        {/* Top Navbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '16px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', backdropFilter: 'blur(8px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '20px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', fontWeight: 800, color: '#2E2140', fontSize: '15px' }}>
            <span style={{ color: '#FFD54F', fontSize: '18px' }}>⭐</span> 0
          </div>
        </div>

        {/* Kingdom Info */}
        <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
          <div style={{
            fontSize: '56px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
            borderRadius: '24px',
            width: '88px',
            height: '88px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12), inset 0 2px 4px rgba(255,255,255,0.4)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            {kingdom.emoji}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: 'rgba(255,255,255,0.95)', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>{kingdom.subject}</div>
            <div style={{ color: '#fff', fontSize: '30px', fontWeight: 900, lineHeight: 1.1, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{kingdom.name}</div>
          </div>
        </div>
      </div>

      {/* Floating Progress Card */}
      <div style={{ margin: '-28px 20px 20px', background: '#fff', borderRadius: '24px', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 12px 32px rgba(31, 42, 78, 0.08)', position: 'relative', zIndex: 10, border: '1px solid rgba(0,0,0,0.03)' }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#2E2140', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Course Progress</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: kingdom.color, marginTop: '4px' }}>{kingdom.progress}% Restored</div>
        </div>
        <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: bgLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', color: kingdom.color }}>
          📈
        </div>
      </div>

      {/* Minigame Banners */}
      {(kingdom.id === 'word' || kingdom.id === 'word-forest') && (
        <div style={{ padding: '0 20px 24px' }}>
          <button onClick={() => onStartLesson('word-dino-jumper')} style={{ width: '100%', background: 'linear-gradient(135deg, #3FA34D 0%, #1E5B27 100%)', border: 'none', borderRadius: '24px', padding: '20px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0 12px 24px rgba(30,91,39,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ textAlign: 'left', zIndex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.9 }}>Tarzan Arcade</div>
              <div style={{ fontSize: '22px', fontWeight: 900 }}>Trojan</div>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', backdropFilter: 'blur(4px)', zIndex: 1 }}>🧔‍♂️</div>
          </button>
        </div>
      )}
      {kingdom.id === 'math' && (
        <div style={{ padding: '0 20px 24px' }}>
          <button onClick={() => onStartLesson('math-defender')} style={{ width: '100%', background: 'linear-gradient(135deg, #FF6B6B 0%, #E83845 100%)', border: 'none', borderRadius: '24px', padding: '20px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0 12px 24px rgba(232,56,69,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ textAlign: 'left', zIndex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.9 }}>Arcade Challenge</div>
              <div style={{ fontSize: '22px', fontWeight: 900 }}>Math Defender</div>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', backdropFilter: 'blur(4px)', zIndex: 1 }}>🏰</div>
          </button>
        </div>
      )}
      {kingdom.id === 'space' && (
        <div style={{ padding: '0 20px 24px' }}>
          <button onClick={() => onStartLesson('asteroid-blaster')} style={{ width: '100%', background: 'linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)', border: 'none', borderRadius: '24px', padding: '20px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0 12px 24px rgba(126,34,206,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ textAlign: 'left', zIndex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.9 }}>Action Arcade</div>
              <div style={{ fontSize: '22px', fontWeight: 900 }}>Asteroid Blaster</div>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', backdropFilter: 'blur(4px)', zIndex: 1 }}>💥</div>
          </button>
        </div>
      )}
      {kingdom.id === 'ocean' && (
        <div style={{ padding: '0 20px 24px' }}>
          <button onClick={() => onStartLesson('deep-sea-diver')} style={{ width: '100%', background: 'linear-gradient(135deg, #29B6F6 0%, #0277BD 100%)', border: 'none', borderRadius: '24px', padding: '20px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0 12px 24px rgba(2,119,189,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ textAlign: 'left', zIndex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.9 }}>Coral Navigator</div>
              <div style={{ fontSize: '22px', fontWeight: 900 }}>Deep Sea Diver</div>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', backdropFilter: 'blur(4px)', zIndex: 1 }}>🌊</div>
          </button>
        </div>
      )}
      {kingdom.id === 'hist' && (
        <div style={{ padding: '0 20px 24px' }}>
          <button onClick={() => onStartLesson('dino-jumper-history')} style={{ width: '100%', background: 'linear-gradient(135deg, #FFB74D 0%, #F57C00 100%)', border: 'none', borderRadius: '24px', padding: '20px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0 12px 24px rgba(245,124,0,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ textAlign: 'left', zIndex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.9 }}>Prehistoric Arcade</div>
              <div style={{ fontSize: '22px', fontWeight: 900 }}>Dino Jumper</div>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', backdropFilter: 'blur(4px)', zIndex: 1 }}>🦴</div>
          </button>
        </div>
      )}
      {kingdom.id === 'art' && (
        <div style={{ padding: '0 20px 24px' }}>
          <button onClick={() => onStartLesson('melody-maker')} style={{ width: '100%', background: 'linear-gradient(135deg, #FF6EB4 0%, #E0559B 100%)', border: 'none', borderRadius: '24px', padding: '20px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0 12px 24px rgba(224,85,155,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ textAlign: 'left', zIndex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.9 }}>Rhythm Arcade</div>
              <div style={{ fontSize: '22px', fontWeight: 900 }}>Melody Maker</div>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', backdropFilter: 'blur(4px)', zIndex: 1 }}>🎹</div>
          </button>
        </div>
      )}

      {/* Lessons List Header */}
      <div style={{ padding: '0 24px', marginBottom: '14px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#2E2140', margin: 0 }}>Learning Path</h3>
      </div>

      {/* Scrollable list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 20px 40px', overflowY: 'auto', flex: 1, msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="hide-scroll">
        <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
        {kingdom.sections.map((section, index) => {
          const isUnlocked = true;
          const totalQuestions = section.questions.length;
          const subtitle = `${totalQuestions} CHALLENGES`;

          return (
            <div
              key={section.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.02)',
                borderRadius: '24px',
                padding: '16px',
                width: '100%',
                boxShadow: '0 8px 20px rgba(31, 42, 78, 0.04)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0
              }}
              onClick={() => {
                setSectionIndex(index);
                onStartLesson();
              }}
              role="button"
              tabIndex={0}
            >
              {/* Active Indicator Strip */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px', background: kingdom.color }} />

              {/* Icon */}
              <div style={{
                width: '58px',
                height: '58px',
                background: bgLight,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                flexShrink: 0,
                fontSize: '28px',
                color: kingdom.color
              }}>
                {section.emoji}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0, paddingRight: '12px' }}>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#2E2140', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{section.title}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: kingdom.color, marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{subtitle}</div>
              </div>

              {/* Play Right Action Button */}
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: kingdom.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: `0 6px 14px ${hexToRgba(kingdom.color, 0.3)}` }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}><path d="M5 3l14 9-14 9V3z" /></svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BranchBuilderGame({
  player,
  question,
  questionIndex,
  selectedOption,
  showResult,
  handleOptionClick,
  total,
  section
}) {
  if (!question) return null;

  const puzzle = WORD_FOREST_PUZZLES[question?.question];
  const petEmoji = player?.petEmoji || '🦊';

  // Mascot position: stands on left pier (20px), walks across bridge to right pier (240px) when bridge gate closes on correct answer!
  const isCorrect = showResult && selectedOption === question.correctIndex;

  let leftPos = '20px';
  if (isCorrect) {
    leftPos = '240px';
  }

  // Speak pronunciation guide on start
  useEffect(() => {
    if (question && question.pronunciation) {
      speak(question.pronunciation);
    }
  }, [questionIndex]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
      {/* Premium Visual Forest Canvas Stage */}
      <div className="branch-canvas" style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #E8F5E9 0%, #A5D6A7 60%, #81C784 100%)',
        borderRadius: '28px',
        boxShadow: '0 16px 36px rgba(46,125,50,0.25), inset 0 2px 4px rgba(255,255,255,0.6)',
        border: '3px solid rgba(255,255,255,0.9)'
      }}>
        {/* Sunbeam God-Rays Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,220,0.4) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 1
        }} />

        {/* Floating Clouds */}
        <span style={{ position: 'absolute', top: '8%', left: '10%', fontSize: '28px', opacity: 0.4, animation: 'float-slow 20s ease-in-out infinite alternate' }}>☁️</span>
        <span style={{ position: 'absolute', top: '22%', right: '15%', fontSize: '24px', opacity: 0.3, animation: 'float-slow 15s ease-in-out infinite alternate' }}>☁️</span>

        {/* Floating Glowing Fireflies & Falling Leaves */}
        <span style={{ position: 'absolute', top: '15%', left: '35%', fontSize: '16px', opacity: 0.8, filter: 'drop-shadow(0 0 8px #FFD54F)', animation: 'bounce-idle 2s infinite' }}>✨</span>
        <span style={{ position: 'absolute', top: '30%', right: '30%', fontSize: '14px', opacity: 0.7, filter: 'drop-shadow(0 0 8px #81C784)', animation: 'bounce-idle 2.5s infinite' }}>✨</span>
        <span style={{ position: 'absolute', top: '5%', left: '50%', fontSize: '14px', opacity: 0.5, transform: 'rotate(12deg)', animation: 'float-slow 10s infinite' }}>🍃</span>

        {/* Crystal River & Water Ripples below bridge */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '26%',
          background: 'linear-gradient(180deg, #4FC3F7 0%, #0288D1 100%)',
          boxShadow: 'inset 0 4px 12px rgba(255,255,255,0.4)',
          zIndex: 2
        }}>
          {/* Water Surface Sparkles */}
          <span style={{ position: 'absolute', top: '20%', left: '25%', fontSize: '12px', opacity: 0.6 }}>💧</span>
          <span style={{ position: 'absolute', top: '40%', right: '30%', fontSize: '14px', opacity: 0.5 }}>🫧</span>
        </div>

        {/* Gate & Bridge Status Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: isCorrect ? 'linear-gradient(135deg, #4CAF50, #2E7D32)' : 'linear-gradient(135deg, #FF9800, #F57C00)',
          color: '#fff',
          padding: '6px 16px',
          borderRadius: '20px',
          fontWeight: 900,
          fontSize: '13px',
          boxShadow: '0 6px 16px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,0.4)',
          border: '1.5px solid rgba(255,255,255,0.8)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {isCorrect ? '✨ Gate Closed • Bridge Connected! ✨' : '🚪 Bridge Gate Open (Spell to Close)'}
        </div>

        {/* Tree Trunks */}
        <div className="branch-left-tree" style={{ zIndex: 3 }}>
          <div className="branch-left-foliage" />
        </div>
        <div className="branch-right-tree" style={{ zIndex: 3 }}>
          <div className="branch-right-foliage" />
        </div>

        {/* Left Fixed Bridge Pier */}
        <div style={{
          position: 'absolute',
          bottom: '26%',
          left: '55px',
          width: '75px',
          height: '16px',
          background: 'linear-gradient(180deg, #A0522D, #6B3618)',
          border: '2.5px solid #3E1F10',
          borderRadius: '6px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.35)',
          zIndex: 4
        }} />

        {/* Right Fixed Bridge Pier */}
        <div style={{
          position: 'absolute',
          bottom: '26%',
          right: '55px',
          width: '75px',
          height: '16px',
          background: 'linear-gradient(180deg, #A0522D, #6B3618)',
          border: '2.5px solid #3E1F10',
          borderRadius: '6px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.35)',
          zIndex: 4
        }} />

        {/* Middle Breach Gate Drawbridge Section */}
        <div style={{
          position: 'absolute',
          bottom: '26%',
          left: '125px',
          width: '110px',
          height: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5
        }}>
          {/* Left Drawbridge Flap */}
          <div style={{
            width: '55px',
            height: '16px',
            background: 'linear-gradient(180deg, #D2B48C, #A0522D)',
            border: '2px solid #5C2C16',
            borderRadius: '6px',
            transformOrigin: 'left center',
            transform: isCorrect ? 'rotate(0deg)' : 'rotate(-60deg)',
            transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
          }} />

          {/* Right Drawbridge Flap */}
          <div style={{
            width: '55px',
            height: '16px',
            background: 'linear-gradient(180deg, #D2B48C, #A0522D)',
            border: '2px solid #5C2C16',
            borderRadius: '6px',
            transformOrigin: 'right center',
            transform: isCorrect ? 'rotate(0deg)' : 'rotate(60deg)',
            transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
          }} />
        </div>

        {/* Forest Gate Archway Pillars */}
        <div style={{
          position: 'absolute',
          bottom: '26%',
          left: '120px',
          fontSize: '24px',
          zIndex: 6,
          transition: 'all 0.5s ease',
          opacity: isCorrect ? 0.4 : 1,
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
        }}>
          ⛩️
        </div>
        <div style={{
          position: 'absolute',
          bottom: '26%',
          right: '120px',
          fontSize: '24px',
          zIndex: 6,
          transition: 'all 0.5s ease',
          opacity: isCorrect ? 0.4 : 1,
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
        }}>
          ⛩️
        </div>

        {/* Tarzan Hero Character (Word Forest) */}
        <div className="branch-mascot" style={{
          left: leftPos,
          transition: 'left 0.85s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src="/tarzan_hero.png"
            alt="Tarzan Hero"
            style={{
              width: '64px',
              height: '80px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))'
            }}
          />
        </div>

        {/* Target Reward Item with floating victory sparkles */}
        <div className="branch-reward" style={{ zIndex: 8, fontSize: '50px', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.35))' }}>
          {puzzle ? puzzle.representation : '🍎'}
          {isCorrect && (
            <span style={{
              position: 'absolute',
              top: '-25px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '18px',
              fontWeight: 900,
              color: '#FFD54F',
              textShadow: '0 2px 4px rgba(0,0,0,0.6)',
              animation: 'bounce-idle 0.8s infinite'
            }}>
              +20 XP ⭐
            </span>
          )}
        </div>
      </div>

      {/* Target Word Builder Card with Interactive Phonics & Audio Hint */}
      <div className="letter-board-card" style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F1F8E9 100%)',
        border: '3px solid #AED581',
        borderRadius: '24px',
        boxShadow: '0 12px 28px rgba(76,175,80,0.15)',
        padding: '18px 16px',
        margin: '14px 0 0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#33691E', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            🌿 Word Builder Challenge
          </div>
          {/* Audio Pronunciation & Hint Button */}
          {puzzle && (
            <button
              onClick={() => speak(puzzle.word)}
              style={{
                background: 'linear-gradient(135deg, #81C784, #388E3C)',
                color: '#fff',
                border: 'none',
                borderRadius: '16px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(56,142,60,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              type="button"
            >
              🔊 Hear Word
            </button>
          )}
        </div>

        {/* Display Word Tiles */}
        {puzzle ? (
          <div className="word-tile-row" style={{
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
            padding: '6px 0'
          }}>
            {puzzle.word.split('').map((char, idx) => {
              const isMissing = puzzle.missing.includes(idx);
              const showFilled = isCorrect;
              return (
                <div
                  key={idx}
                  className={`word-tile ${isMissing ? (showFilled ? 'filled' : 'empty') : ''}`}
                  onClick={() => speak(char)}
                  style={{
                    flex: '1 1 0px',
                    minWidth: '18px',
                    maxWidth: '40px',
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    background: isMissing ? (showFilled ? 'linear-gradient(135deg, #81C784, #388E3C)' : 'rgba(255,255,255,0.8)') : 'linear-gradient(135deg, #DCE775, #AFB42B)',
                    color: isMissing && showFilled ? '#fff' : '#2E2140',
                    border: isMissing && showFilled ? '2px solid #2E7D32' : '2px solid rgba(0,0,0,0.1)',
                    borderRadius: '12px',
                    fontSize: 'clamp(14px, 4vw, 24px)',
                    fontWeight: 900,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    flexShrink: 1
                  }}
                >
                  {isMissing ? (showFilled ? char : '_') : char}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#2E2140', margin: '8px 0', textAlign: 'center' }}>
            {question.question}
          </div>
        )}

      </div>
    </div>
  );
}

function KingdomActionStage({ kingdom, question, selectedOption, showResult, player }) {
  const isCorrect = showResult && selectedOption === question.correctIndex;
  const isWrong = showResult && selectedOption !== question.correctIndex;

  if (kingdom.id === 'math') {
    return (
      <div style={{
        position: 'relative',
        height: '160px',
        borderRadius: '24px',
        background: 'linear-gradient(180deg, #1E1B4B 0%, #0F172A 100%)',
        border: '3px solid #3B82F6',
        boxShadow: '0 12px 28px rgba(30,58,138,0.3)',
        overflow: 'hidden',
        margin: '0 0 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '12px 16px'
      }}>
        <div style={{
          alignSelf: 'center',
          background: isCorrect ? 'linear-gradient(135deg, #10B981, #059669)' : isWrong ? '#EF4444' : 'rgba(255,255,255,0.15)',
          color: '#FFF',
          padding: '4px 14px',
          borderRadius: '16px',
          fontWeight: 900,
          fontSize: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 10
        }}>
          {isCorrect ? '💥 Magic Bolt Blast! Cannon Defended!' : isWrong ? '❌ Shield Hit! Try Again!' : '🏰 Math Castle Siege • Fire Cannon!'}
        </div>

        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 5 }}>
          <div style={{
            fontSize: '44px',
            filter: isCorrect ? 'drop-shadow(0 0 20px #60A5FA)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
            transform: isCorrect ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.3s'
          }}>
            🛡️
          </div>

          {isCorrect && (
            <div style={{
              position: 'absolute',
              left: '60px',
              right: '60px',
              height: '8px',
              background: 'linear-gradient(90deg, #60A5FA, #FFFFFF, #60A5FA)',
              borderRadius: '999px',
              boxShadow: '0 0 20px #60A5FA'
            }} />
          )}

          <div style={{
            fontSize: '48px',
            filter: isCorrect ? 'brightness(2) drop-shadow(0 0 20px #EF4444)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
            transform: isCorrect ? 'scale(0.8) rotate(20deg)' : 'scale(1)',
            transition: 'transform 0.3s',
            opacity: isCorrect ? 0.3 : 1
          }}>
            {isCorrect ? '💥' : '👾'}
          </div>
        </div>
      </div>
    );
  }

  if (kingdom.id === 'space') {
    return (
      <div style={{
        position: 'relative',
        height: '160px',
        borderRadius: '24px',
        background: 'radial-gradient(circle at 50% 30%, #311B92 0%, #0B001A 100%)',
        border: '3px solid #8B5CF6',
        boxShadow: '0 12px 28px rgba(139,92,246,0.3)',
        overflow: 'hidden',
        margin: '0 0 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '12px 16px'
      }}>
        <div style={{
          alignSelf: 'center',
          background: isCorrect ? 'linear-gradient(135deg, #10B981, #059669)' : isWrong ? '#EF4444' : 'rgba(255,255,255,0.15)',
          color: '#FFF',
          padding: '4px 14px',
          borderRadius: '16px',
          fontWeight: 900,
          fontSize: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 10
        }}>
          {isCorrect ? '⚡ Photon Laser Blast! Asteroid Blasted!' : isWrong ? '❌ Thruster Stall! Re-align!' : '🚀 Space Cockpit • Photon Laser Ready!'}
        </div>

        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 5 }}>
          <div style={{
            fontSize: '48px',
            filter: isCorrect ? 'drop-shadow(0 0 20px #38BDF8)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
            transform: isCorrect ? 'translateX(40px) scale(1.1)' : 'translateX(0)',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            🚀
          </div>

          {isCorrect && (
            <div style={{
              position: 'absolute',
              left: '80px',
              right: '60px',
              height: '6px',
              background: 'linear-gradient(90deg, #38BDF8, #FFF, #C084FC)',
              boxShadow: '0 0 16px #38BDF8'
            }} />
          )}

          <div style={{
            fontSize: '44px',
            filter: isCorrect ? 'drop-shadow(0 0 20px #FFD54F)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
            transform: isCorrect ? 'scale(0.5) rotate(45deg)' : 'scale(1)',
            opacity: isCorrect ? 0.3 : 1,
            transition: 'transform 0.4s'
          }}>
            {isCorrect ? '✨' : '☄️'}
          </div>
        </div>
      </div>
    );
  }

  if (kingdom.id === 'ocean') {
    return (
      <div style={{
        position: 'relative',
        height: '160px',
        borderRadius: '24px',
        background: 'linear-gradient(180deg, #0284C7 0%, #0369A1 60%, #075985 100%)',
        border: '3px solid #38BDF8',
        boxShadow: '0 12px 28px rgba(2,132,199,0.3)',
        overflow: 'hidden',
        margin: '0 0 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '12px 16px'
      }}>
        <div style={{
          alignSelf: 'center',
          background: isCorrect ? 'linear-gradient(135deg, #10B981, #059669)' : isWrong ? '#EF4444' : 'rgba(255,255,255,0.15)',
          color: '#FFF',
          padding: '4px 14px',
          borderRadius: '16px',
          fontWeight: 900,
          fontSize: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 10
        }}>
          {isCorrect ? '🐬 Sonar Beam Active! Pearl Chest Unlocked!' : isWrong ? '❌ Water Resistance! Swim On!' : '🤿 Ocean Submarine • Sonar Radar Active!'}
        </div>

        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 5 }}>
          <div style={{
            fontSize: '44px',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
            transform: isCorrect ? 'translateY(-10px) scale(1.1)' : 'translateY(0)',
            transition: 'transform 0.3s'
          }}>
            🤿
          </div>

          <div style={{ fontSize: '36px', animation: 'bounce-idle 1s infinite' }}>
            {isCorrect ? '🐬' : '🐠'}
          </div>

          <div style={{
            fontSize: '44px',
            filter: isCorrect ? 'drop-shadow(0 0 20px #FFD54F)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }}>
            {isCorrect ? '💎' : '🐚'}
          </div>
        </div>
      </div>
    );
  }

  if (kingdom.id === 'word' || kingdom.id === 'word-forest') {
    return (
      <div style={{
        position: 'relative',
        height: '160px',
        borderRadius: '24px',
        background: 'linear-gradient(180deg, #15803D 0%, #166534 60%, #14532D 100%)',
        border: '3px solid #4ADE80',
        boxShadow: '0 12px 28px rgba(21,128,61,0.3)',
        overflow: 'hidden',
        margin: '0 0 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '12px 16px'
      }}>
        <div style={{
          alignSelf: 'center',
          background: isCorrect ? 'linear-gradient(135deg, #10B981, #059669)' : isWrong ? '#EF4444' : 'rgba(255,255,255,0.15)',
          color: '#FFF',
          padding: '4px 14px',
          borderRadius: '16px',
          fontWeight: 900,
          fontSize: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 10
        }}>
          {isCorrect ? '✨ Heroic Tarzan Leap! Phonics Gate Saved!' : isWrong ? '❌ Path Stumble! Try Again!' : '🧔‍♂️ Tarzan Jungle Forest • Phonics Leap Ready!'}
        </div>

        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 5 }}>
          <div style={{
            transform: isCorrect ? 'translate(80px, -24px) scale(1.15)' : 'translate(0, 0)',
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <img src="/tarzan_hero.png" alt="Tarzan Hero" style={{ width: '56px', height: '70px', objectFit: 'contain', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))' }} />
          </div>

          <div style={{ fontSize: '36px' }}>
            🌴
          </div>

          <div style={{
            fontSize: '44px',
            filter: isCorrect ? 'drop-shadow(0 0 20px #FFD54F)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }}>
            {isCorrect ? '🌟' : '🍎'}
          </div>
        </div>
      </div>
    );
  }

  if (kingdom.id === 'dino') {
    return (
      <div style={{
        position: 'relative',
        height: '160px',
        borderRadius: '24px',
        background: 'linear-gradient(180deg, #15803D 0%, #166534 60%, #14532D 100%)',
        border: '3px solid #4ADE80',
        boxShadow: '0 12px 28px rgba(21,128,61,0.3)',
        overflow: 'hidden',
        margin: '0 0 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '12px 16px'
      }}>
        <div style={{
          alignSelf: 'center',
          background: isCorrect ? 'linear-gradient(135deg, #10B981, #059669)' : isWrong ? '#EF4444' : 'rgba(255,255,255,0.15)',
          color: '#FFF',
          padding: '4px 14px',
          borderRadius: '16px',
          fontWeight: 900,
          fontSize: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 10
        }}>
          {isCorrect ? '🥚 Heroic Dino Leap! Golden Egg Saved!' : isWrong ? '❌ Lava Stumble! Jump Again!' : '🦕 Jurassic Valley • Dino Leap Ready!'}
        </div>

        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 5 }}>
          <div style={{
            fontSize: '48px',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
            transform: isCorrect ? 'translate(80px, -24px) scale(1.15)' : 'translate(0, 0)',
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            🦕
          </div>

          <div style={{ fontSize: '36px' }}>
            🌋
          </div>

          <div style={{
            fontSize: '44px',
            filter: isCorrect ? 'drop-shadow(0 0 20px #FFD54F)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }}>
            {isCorrect ? '🌟' : '🥚'}
          </div>
        </div>
      </div>
    );
  }

  if (kingdom.id === 'art') {
    return (
      <div style={{
        position: 'relative',
        height: '160px',
        borderRadius: '24px',
        background: 'linear-gradient(180deg, #BE185D 0%, #9D174D 60%, #831843 100%)',
        border: '3px solid #F472B6',
        boxShadow: '0 12px 28px rgba(190,24,93,0.3)',
        overflow: 'hidden',
        margin: '0 0 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '12px 16px'
      }}>
        <div style={{
          alignSelf: 'center',
          background: isCorrect ? 'linear-gradient(135deg, #10B981, #059669)' : isWrong ? '#EF4444' : 'rgba(255,255,255,0.15)',
          color: '#FFF',
          padding: '4px 14px',
          borderRadius: '16px',
          fontWeight: 900,
          fontSize: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 10
        }}>
          {isCorrect ? '🎨 Rainbow Brushstroke! Canvas Masterpiece!' : isWrong ? '❌ Paint Splatter! Try Again!' : '🖌️ Creative Easel • Paint Cannon Ready!'}
        </div>

        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 5 }}>
          <div style={{
            fontSize: '48px',
            filter: isCorrect ? 'drop-shadow(0 0 20px #F472B6)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
            transform: isCorrect ? 'scale(1.2) rotate(-15deg)' : 'scale(1)',
            transition: 'transform 0.3s'
          }}>
            🖌️
          </div>

          {isCorrect && (
            <div style={{ fontSize: '40px', animation: 'bounce-idle 0.8s infinite' }}>
              🌈
            </div>
          )}

          <div style={{
            fontSize: '48px',
            filter: isCorrect ? 'drop-shadow(0 0 24px #FFD54F)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }}>
            {isCorrect ? '🖼️' : '🎨'}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function LessonScreen({ player, kingdom, section, onBack, onComplete, onLoss }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    setQuestionIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setCorrectCount(0);
    setStreak(0);
    setShowReward(false);
  }, [section]);

  if (!kingdom || !section || !section.questions || section.questions.length === 0) {
    return (
      <div id="lesson" className="screen active" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F4F7FC', padding: '24px', position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#2E2140' }}>Loading Challenge...</h2>
        <button onClick={onBack} style={{ marginTop: '16px', padding: '14px 28px', borderRadius: '16px', background: '#3FA34D', color: '#fff', border: 'none', fontWeight: 900, cursor: 'pointer' }} type="button">Go Back</button>
      </div>
    );
  }

  const question = section.questions[questionIndex] || section.questions[0];
  const total = section.questions.length;
  const pronunciationText = question?.pronunciation || '';

  const coinsEarned = 20 + correctCount * 5 + streak * 3;
  const xpEarned = 30 + correctCount * 10 + streak * 5;

  const handleOptionClick = (index) => {
    if (showResult) return;
    setSelectedOption(index);
    if (question && question.options && question.options[index]) {
      speak(question.options[index]);
    }
  };

  const handleAction = () => {
    if (!showResult) {
      if (selectedOption === question.correctIndex) {
        setCorrectCount((value) => value + 1);
        setStreak((s) => s + 1);
        playSuccessSound();
      } else {
        setStreak(0);
        playErrorSound();
      }
      setShowResult(true);
      return;
    }
    if (questionIndex < total - 1) {
      setQuestionIndex((value) => value + 1);
      setSelectedOption(null);
      setShowResult(false);
      return;
    }
    setShowReward(true);
  };

  const isWordForest = kingdom.id === 'word';
  const progressPercent = ((questionIndex) / total) * 100;

  const hexToRgba = (hex, alpha) => {
    if (!hex) return `rgba(0,0,0,${alpha})`;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div id="lesson" className="screen active" style={{
      display: 'flex',
      flexDirection: 'column',
      background: isWordForest ? '#F4F7FC' : `linear-gradient(180deg, #F4F7FC 0%, ${hexToRgba(kingdom.color, 0.1)} 100%)`,
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      overflowY: 'auto'
    }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '24px 20px 16px', gap: '16px', zIndex: 1 }}>
        <button onClick={onBack} style={{ background: '#fff', border: 'none', borderRadius: '16px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#2E2140', boxShadow: '0 8px 16px rgba(0,0,0,0.06)' }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: kingdom.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>{kingdom.name}</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#2E2140', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{section.emoji}</span> {section.title}
          </div>
        </div>

        {/* Combo Streak Badge */}
        {streak > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
            color: '#fff',
            borderRadius: '20px',
            padding: '6px 14px',
            fontWeight: 900,
            fontSize: '13px',
            boxShadow: '0 4px 12px rgba(255,107,107,0.4)',
            animation: 'bounce-idle 1s infinite'
          }}>
            🔥 {streak}x Combo
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div style={{ padding: '0 24px', zIndex: 1, marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#8A91A8' }}>Question {questionIndex + 1} of {total}</span>
          <span style={{ fontSize: '14px', fontWeight: 900, color: kingdom.color }}>{Math.round(progressPercent)}%</span>
        </div>
        <div style={{ width: '100%', background: 'rgba(0,0,0,0.05)', height: '12px', borderRadius: '999px', padding: '2px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ width: `${progressPercent}%`, background: kingdom.color, height: '100%', borderRadius: '999px', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: `0 2px 8px ${hexToRgba(kingdom.color, 0.4)}` }}></div>
        </div>
      </div>

      {isWordForest ? (
        <div style={{ zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <BranchBuilderGame
            player={player}
            question={question}
            questionIndex={questionIndex}
            selectedOption={selectedOption}
            showResult={showResult}
            handleOptionClick={handleOptionClick}
            total={total}
            section={section}
          />
          <div className="stone-planks-container">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = question.correctIndex === index;

              let btnClass = 'plank-btn';
              if (!showResult && isSelected) {
                btnClass += ' selected';
              } else if (showResult) {
                if (isCorrect) btnClass += ' correct';
                else if (isSelected) btnClass += ' wrong';
              }

              return (
                <button
                  key={option}
                  className={btnClass}
                  onClick={() => handleOptionClick(index)}
                  type="button"
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{ zIndex: 1, flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column' }}>
          <KingdomActionStage kingdom={kingdom} question={question} selectedOption={selectedOption} showResult={showResult} player={player} />

          {/* Question Card */}
          <div style={{ background: '#fff', borderRadius: '32px', padding: '28px 24px', boxShadow: '0 16px 40px rgba(31,42,78,0.06), 0 2px 10px rgba(31,42,78,0.02)', marginBottom: '20px', border: '1px solid rgba(0,0,0,0.02)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', background: kingdom.color, width: '48px', height: '48px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: `0 8px 16px ${hexToRgba(kingdom.color, 0.3)}`, color: '#fff' }}>
              {section.emoji || '❓'}
            </div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#2E2140', textAlign: 'center', lineHeight: 1.3, marginTop: '12px' }}>{question.question}</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#8A91A8', textAlign: 'center', marginTop: '10px' }}>{section.hint}</div>

            {pronunciationText && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <button
                  onClick={() => speak(pronunciationText)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', background: hexToRgba(kingdom.color, 0.1), color: kingdom.color, border: 'none', borderRadius: '20px', padding: '8px 18px', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}
                  type="button"
                >
                  🔊 Hear Pronunciation
                </button>
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '30px', flex: 1 }}>
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = question.correctIndex === index;

              let bg = '#fff';
              let border = '2px solid transparent';
              let color = '#2E2140';
              let shadow = '0 8px 16px rgba(31,42,78,0.04)';
              let scale = 'scale(1)';
              let icon = null;

              if (!showResult && isSelected) {
                bg = hexToRgba(kingdom.color, 0.1);
                border = `2.5px solid ${kingdom.color}`;
                color = kingdom.color;
                shadow = `0 12px 24px ${hexToRgba(kingdom.color, 0.2)}`;
                scale = 'scale(1.02)';
              } else if (showResult) {
                if (isCorrect) {
                  bg = '#E8F5E9';
                  border = '2.5px solid #4CAF50';
                  color = '#2E7D32';
                  icon = '✅';
                } else if (isSelected) {
                  bg = '#FFEBEE';
                  border = '2.5px solid #EF5350';
                  color = '#C62828';
                  icon = '❌';
                }
              }

              const optionLabel = ['A', 'B', 'C', 'D'][index] || (index + 1);

              return (
                <button
                  key={option}
                  onClick={() => handleOptionClick(index)}
                  style={{
                    background: bg,
                    border: border,
                    borderRadius: '20px',
                    padding: '16px 20px',
                    fontSize: '17px',
                    fontWeight: 800,
                    color: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    boxShadow: shadow,
                    transform: scale,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: showResult && !isCorrect && !isSelected ? 0.5 : 1
                  }}
                  type="button"
                  disabled={showResult}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      background: isSelected ? kingdom.color : 'rgba(0,0,0,0.06)',
                      color: isSelected ? '#FFF' : '#757575',
                      borderRadius: '12px',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 900
                    }}>{optionLabel}</span>
                    <span>{option}</span>
                  </div>
                  {icon && <span style={{ fontSize: '20px' }}>{icon}</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Button */}
      <div style={{ padding: '0 20px 24px', zIndex: 10 }}>
        <button
          disabled={selectedOption === null}
          onClick={handleAction}
          style={{
            width: '100%',
            background: selectedOption === null ? '#E2E5F0' : kingdom.color,
            color: selectedOption === null ? '#A0A5BA' : '#fff',
            border: 'none',
            borderRadius: '24px',
            padding: '20px',
            fontSize: '18px',
            fontWeight: 900,
            cursor: selectedOption === null ? 'not-allowed' : 'pointer',
            boxShadow: selectedOption === null ? 'none' : `0 12px 24px ${hexToRgba(kingdom.color, 0.4)}, inset 0 2px 4px rgba(255,255,255,0.3)`,
            transition: 'all 0.3s',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
          type="button"
        >
          {!showResult ? 'Check Answer' : questionIndex < total - 1 ? 'Next Question' : 'Finish Quest'}
        </button>
      </div>

      {showReward && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,19,37,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '24px' }}>
          <div style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F4F7FC 100%)', borderRadius: '40px', padding: '40px 32px', textAlign: 'center', width: '100%', maxWidth: '400px', boxShadow: '0 32px 64px rgba(0,0,0,0.4)', animation: 'pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            <div style={{ fontSize: '80px', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.2))', animation: 'sway-wobble 3s infinite alternate ease-in-out', marginBottom: '16px' }}>
              {correctCount >= Math.ceil(total / 2) ? '🎉' : '💔'}
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#2E2140', margin: '0 0 8px' }}>
              {correctCount >= Math.ceil(total / 2) ? 'Quest Complete!' : 'Quest Failed!'}
            </h2>
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#8A91A8', margin: '0 0 32px' }}>
              {correctCount >= Math.ceil(total / 2) ? `You conquered ${section.title}!` : `Keep practicing ${section.title}!`}
            </p>

            <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', boxShadow: '0 8px 24px rgba(31,42,78,0.06)', marginBottom: '32px' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#A0A5BA', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Your Score: {correctCount}/{total}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(255,213,79,0.1), rgba(255,213,79,0.2))', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid rgba(255,213,79,0.3)' }}>
                  <span style={{ fontSize: '32px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}>🪙</span>
                  <span style={{ fontSize: '20px', fontWeight: 900, color: '#E6A800', marginTop: '8px' }}>+{coinsEarned}</span>
                </div>
                <div style={{ background: 'linear-gradient(135deg, rgba(138,107,255,0.1), rgba(138,107,255,0.2))', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid rgba(138,107,255,0.3)' }}>
                  <span style={{ fontSize: '32px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}>✨</span>
                  <span style={{ fontSize: '20px', fontWeight: 900, color: '#7B4FE0', marginTop: '8px' }}>+{xpEarned} XP</span>
                </div>
              </div>
            </div>

            {correctCount >= Math.ceil(total / 2) ? (
              <button
                onClick={() => onComplete(coinsEarned, xpEarned, correctCount)}
                style={{ width: '100%', background: kingdom.color, color: '#fff', border: 'none', borderRadius: '24px', padding: '20px', fontSize: '18px', fontWeight: 900, cursor: 'pointer', boxShadow: `0 12px 24px ${hexToRgba(kingdom.color, 0.4)}`, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                type="button"
              >
                Continue Journey
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                <button
                  onClick={() => {
                    if (onLoss) {
                      onLoss(() => {
                        setQuestionIndex(0);
                        setCorrectCount(0);
                        setShowReward(false);
                      });
                    } else {
                      setQuestionIndex(0);
                      setCorrectCount(0);
                      setShowReward(false);
                    }
                  }}
                  style={{ width: '100%', background: 'linear-gradient(135deg, #EC4899, #8B5CF6)', color: '#fff', border: 'none', borderRadius: '24px', padding: '18px', fontSize: '16px', fontWeight: 900, cursor: 'pointer', boxShadow: '0 12px 24px rgba(236,72,153,0.4)', textTransform: 'uppercase' }}
                  type="button"
                >
                  💖 Revive & Retry (+1 Ad)
                </button>
                <button
                  onClick={() => {
                    if (onLoss) {
                      onLoss(() => onComplete(coinsEarned, xpEarned, correctCount));
                    } else {
                      onComplete(coinsEarned, xpEarned, correctCount);
                    }
                  }}
                  style={{ width: '100%', background: 'transparent', color: '#8A91A8', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                  type="button"
                >
                  Return to Kingdom
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const PET_COMPANIONS = [
  { id: 'monkey', name: 'Chico Monkey', emoji: '🐵', habitat: 'cozy', voice: 'Chico the playful monkey!' },
  { id: 'dog', name: 'Barker Pup', emoji: '🐶', habitat: 'cozy', voice: 'Barker the loyal pup!' },
  { id: 'cat', name: 'Whiskers Cat', emoji: '🐱', habitat: 'cozy', voice: 'Whiskers the cozy kitten!' },
  { id: 'bunny', name: 'Fluffy Bunny', emoji: '🐰', habitat: 'garden', voice: 'Fluffy the cloud bunny!' },
  { id: 'tiger', name: 'Stripes Tiger', emoji: '🐯', habitat: 'garden', voice: 'Stripes the brave tiger!' },
  { id: 'fox', name: 'Sparky Fox', emoji: '🦊', habitat: 'garden', voice: 'Sparky the magic fox!' },
  { id: 'panda', name: 'Bamboo Panda', emoji: '🐼', habitat: 'garden', voice: 'Bamboo the happy panda!' },
  { id: 'unicorn', name: 'Celeste Unicorn', emoji: '🦄', habitat: 'astro', voice: 'Celeste the starlight unicorn!' },
  { id: 'frog', name: 'Hopper Frog', emoji: '🐸', habitat: 'garden', voice: 'Hopper the leap frog!' },
  { id: 'penguin', name: 'Pingu Penguin', emoji: '🐧', habitat: 'astro', voice: 'Pingu the chilly penguin!' },
  { id: 'lion', name: 'Simba Lion', emoji: '🦁', habitat: 'cozy', voice: 'Simba the lion king!' },
  { id: 'bear', name: 'Honey Bear', emoji: '🐻', habitat: 'cozy', voice: 'Honey the sweet bear!' },
  { id: 'dragon', name: 'Ignis Dragon', emoji: '🐉', habitat: 'astro', voice: 'Ignis the baby dragon!' }
];

const PET_TREATS = [
  { name: 'Apple', emoji: '🍎', boost: 20 },
  { name: 'Cookie', emoji: '🍪', boost: 25 },
  { name: 'Cupcake', emoji: '🧁', boost: 30 },
  { name: 'Berry', emoji: '🫐', boost: 15 }
];

const PET_TOYS = [
  { name: 'Ball', emoji: '🎾', boost: 20 },
  { name: 'Yoyo', emoji: '🪀', boost: 25 },
  { name: 'Magic Wand', emoji: '🪄', boost: 30 },
  { name: 'Teddy Bear', emoji: '🧸', boost: 35 }
];

function PetScreen({ player, setPlayer, onBack, onFeed, onPlay }) {
  const activeCompanion = useMemo(() => {
    const match = PET_COMPANIONS.find(p => p.emoji === player?.avatarEmoji || p.emoji === player?.petEmoji);
    if (match) return match;
    return { id: 'custom', name: `${player?.name || 'Hero'}'s Companion`, emoji: player?.avatarEmoji || '🐱', habitat: 'cozy', voice: `Hello from your hero companion!` };
  }, [player?.avatarEmoji, player?.petEmoji, player?.name]);

  const [habitat, setHabitat] = useState(activeCompanion?.habitat || 'cozy');
  const [selectedPet, setSelectedPet] = useState(activeCompanion);
  const [petHappiness, setPetHappiness] = useState(player?.petHappiness || 85);
  const [petHunger, setPetHunger] = useState(player?.petHunger || 90);
  const [petEnergy, setPetEnergy] = useState(75);
  const [actionEffect, setActionEffect] = useState(null);
  const [selectedHat, setSelectedHat] = useState(player?.equipped?.hat || 'crown');

  useEffect(() => {
    setSelectedPet(activeCompanion);
    if (activeCompanion?.habitat) setHabitat(activeCompanion.habitat);
  }, [activeCompanion]);

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    if (setPlayer) {
      setPlayer(prev => ({
        ...prev,
        avatarEmoji: pet.emoji,
        petEmoji: pet.emoji,
        petName: pet.name
      }));
    }
    try {
      if (typeof speak === 'function') speak(pet.voice);
    } catch (e) { }
  };

  const activeHatObj = SHOP_ITEMS?.hats?.find(h => h.id === selectedHat) || { emoji: '👑', name: 'Crown' };

  const handleGiveTreat = (treat) => {
    try {
      if (typeof playSuccessSound === 'function') playSuccessSound();
      if (typeof speak === 'function') speak(`Yum! ${selectedPet.name} loved the ${treat.name}!`);
    } catch (e) { }

    setActionEffect('feed');
    setPetHunger(prev => Math.min(100, prev + treat.boost));
    setPetHappiness(prev => Math.min(100, prev + 10));
    setTimeout(() => setActionEffect(null), 1200);
  };

  const handlePlayToy = (toy) => {
    try {
      if (typeof playSuccessSound === 'function') playSuccessSound();
      if (typeof speak === 'function') speak(`Yay! ${selectedPet.name} played with the ${toy.name}!`);
    } catch (e) { }

    setActionEffect('play');
    setPetHappiness(prev => Math.min(100, prev + toy.boost));
    setPetHunger(prev => Math.max(0, prev - 5));
    setTimeout(() => setActionEffect(null), 1200);
  };

  const handlePetSpa = () => {
    try {
      if (typeof playSuccessSound === 'function') playSuccessSound();
      if (typeof speak === 'function') speak(`Refreshing spa time for ${selectedPet.name}!`);
    } catch (e) { }

    setActionEffect('spa');
    setPetEnergy(100);
    setPetHappiness(prev => Math.min(100, prev + 15));
    setTimeout(() => setActionEffect(null), 1200);
  };

  // Background Theme per Habitat
  const getHabitatStyle = () => {
    if (habitat === 'garden') {
      return {
        background: 'linear-gradient(180deg, #A8E6CF 0%, #DCEDC1 40%, #FFD3B6 100%)',
        accent: '#56AB2F',
        name: '🌸 Enchanted Garden'
      };
    }
    if (habitat === 'astro') {
      return {
        background: 'linear-gradient(180deg, #1A103C 0%, #2D1B69 50%, #4A2E80 100%)',
        accent: '#8B5CF6',
        name: '🚀 Cosmic Astro Pod'
      };
    }
    return {
      background: 'linear-gradient(180deg, #FFE0B2 0%, #FFCC80 50%, #FFB74D 100%)',
      accent: '#FF7043',
      name: '🏡 Cozy Living Room'
    };
  };

  const habStyle = getHabitatStyle();

  return (
    <div id="pet-sanctuary" className="screen active" style={{
      position: 'relative',
      overflow: 'hidden',
      padding: 0,
      background: habStyle.background,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      color: habitat === 'astro' ? '#FFF' : '#3E2723'
    }}>
      {/* Floating Ambient Effects */}
      {habitat === 'garden' && (
        <>
          <div style={{ position: 'absolute', top: '10%', left: '8%', fontSize: '40px', opacity: 0.7, animation: 'bounce-idle 2s infinite' }}>🦋</div>
          <div style={{ position: 'absolute', top: '25%', right: '10%', fontSize: '36px', opacity: 0.7, animation: 'float-slow 3s infinite' }}>🌸</div>
        </>
      )}

      {habitat === 'astro' && (
        <>
          <div style={{ position: 'absolute', top: '12%', left: '10%', fontSize: '32px', opacity: 0.6, animation: 'bounce-idle 2.5s infinite' }}>✨</div>
          <div style={{ position: 'absolute', top: '20%', right: '12%', fontSize: '48px', opacity: 0.5, animation: 'float-slow 4s infinite' }}>🪐</div>
        </>
      )}

      {habitat === 'cozy' && (
        <>
          <div style={{ position: 'absolute', top: '14%', left: '10%', fontSize: '44px', opacity: 0.5, animation: 'bounce-idle 2s infinite' }}>🛋️</div>
          <div style={{ position: 'absolute', top: '22%', right: '12%', fontSize: '40px', opacity: 0.5, animation: 'float-slow 2.5s infinite' }}>💖</div>
        </>
      )}

      {/* Header Bar */}
      <div style={{ position: 'relative', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px 8px' }}>
        <button onClick={onBack} style={{ background: '#FFF', border: `2px solid ${habStyle.accent}`, borderRadius: '16px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: habStyle.accent, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: habStyle.accent }}>3D Pet Sanctuary</div>
          <div style={{ fontSize: '18px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🐾</span> {selectedPet.name}
          </div>
        </div>

        <div style={{ background: '#FFF', border: `2px solid ${habStyle.accent}`, borderRadius: '999px', padding: '6px 14px', fontWeight: 900, color: habStyle.accent, fontSize: '13px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          Bond Lvl 5 💖
        </div>
      </div>

      {/* Habitat Selector Tabs */}
      <div style={{ display: 'flex', gap: '8px', padding: '0 16px 8px', justifyContent: 'center', position: 'relative', zIndex: 20 }}>
        {[
          { id: 'cozy', label: '🏡 Living Room' },
          { id: 'garden', label: '🌸 Garden' },
          { id: 'astro', label: '🚀 Astro Pod' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setHabitat(tab.id)}
            style={{
              background: habitat === tab.id ? habStyle.accent : '#FFF',
              border: habitat === tab.id ? '2px solid #FFF' : `1px solid ${habStyle.accent}`,
              borderRadius: '20px',
              padding: '6px 12px',
              color: habitat === tab.id ? '#FFF' : habStyle.accent,
              fontWeight: 900,
              fontSize: '12px',
              cursor: 'pointer'
            }}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pet Sanctuary Sphere & Stage */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10, padding: '10px 16px' }}>

        {/* Main Pet Display Glass Habitat Dome */}
        <div style={{
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 100%)',
          backdropFilter: 'blur(20px)',
          border: '4px solid #FFF',
          boxShadow: '0 20px 48px rgba(0,0,0,0.15), inset 0 8px 16px rgba(255,255,255,0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          animation: 'float-slow 3.5s ease-in-out infinite alternate'
        }}>
          {/* Action Effects Spray */}
          {actionEffect === 'feed' && (
            <div style={{ position: 'absolute', top: '15%', fontSize: '40px', animation: 'bounce-idle 0.5s infinite' }}>
              💖 🍎 💖
            </div>
          )}
          {actionEffect === 'play' && (
            <div style={{ position: 'absolute', top: '15%', fontSize: '40px', animation: 'bounce-idle 0.5s infinite' }}>
              ⭐ 🎾 ⭐
            </div>
          )}
          {actionEffect === 'spa' && (
            <div style={{ position: 'absolute', top: '15%', fontSize: '40px', animation: 'bounce-idle 0.5s infinite' }}>
              🫧 🧼 🫧
            </div>
          )}

          {/* Equipped Hat */}
          {activeHatObj && (
            <div style={{ fontSize: '50px', marginBottom: '-25px', zIndex: 20, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
              {activeHatObj.emoji}
            </div>
          )}

          {/* Pet Emoji Character */}
          <div style={{
            fontSize: '110px',
            zIndex: 10,
            filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.25))',
            transform: actionEffect ? 'scale(1.2) rotate(10deg)' : 'scale(1)',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            cursor: 'pointer'
          }}
            onClick={() => {
              try {
                if (typeof speak === 'function') speak(selectedPet.voice);
              } catch (e) { }
            }}>
            {selectedPet.emoji}
          </div>
        </div>

        {/* Companion Pet Selector Toolbar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px', marginTop: '14px', width: '100%', padding: '2px' }}>
          {PET_COMPANIONS.map(pet => (
            <button
              key={pet.id}
              onClick={() => handleSelectPet(pet)}
              style={{
                background: selectedPet.id === pet.id ? '#FFF' : 'rgba(255,255,255,0.6)',
                border: selectedPet.id === pet.id ? `3px solid ${habStyle.accent}` : '1px solid rgba(0,0,0,0.1)',
                borderRadius: '16px',
                padding: '8px 10px',
                fontSize: '24px',
                cursor: 'pointer',
                boxShadow: selectedPet.id === pet.id ? '0 6px 16px rgba(0,0,0,0.15)' : 'none',
                transform: selectedPet.id === pet.id ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.2s'
              }}
              type="button"
            >
              {pet.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Pet Stats & Interactive Action Deck */}
      <div style={{
        background: '#FFF',
        borderTopLeftRadius: '32px',
        borderTopRightRadius: '32px',
        padding: '20px 20px 24px',
        boxShadow: '0 -12px 32px rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 20
      }}>
        {/* 3 Status Bars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 900, color: '#E65100', marginBottom: '4px' }}>
              <span>FULLNESS</span>
              <span>{petHunger}%</span>
            </div>
            <div style={{ height: '8px', borderRadius: '999px', background: '#FFE0B2', overflow: 'hidden' }}>
              <div style={{ width: `${petHunger}%`, height: '100%', background: 'linear-gradient(90deg, #FFB74D, #F57C00)', borderRadius: '999px' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 900, color: '#C2185B', marginBottom: '4px' }}>
              <span>HAPPY</span>
              <span>{petHappiness}%</span>
            </div>
            <div style={{ height: '8px', borderRadius: '999px', background: '#F8BBD0', overflow: 'hidden' }}>
              <div style={{ width: `${petHappiness}%`, height: '100%', background: 'linear-gradient(90deg, #F06292, #E91E63)', borderRadius: '999px' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 900, color: '#1976D2', marginBottom: '4px' }}>
              <span>ENERGY</span>
              <span>{petEnergy}%</span>
            </div>
            <div style={{ height: '8px', borderRadius: '999px', background: '#BBDEFB', overflow: 'hidden' }}>
              <div style={{ width: `${petEnergy}%`, height: '100%', background: 'linear-gradient(90deg, #64B5F6, #1E88E5)', borderRadius: '999px' }} />
            </div>
          </div>
        </div>

        {/* Treats & Toys Quick Action Bar */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
          {PET_TREATS.map(treat => (
            <button
              key={treat.name}
              onClick={() => handleGiveTreat(treat)}
              style={{
                flex: 1,
                background: '#FFF8E1',
                border: '2px solid #FFD54F',
                borderRadius: '16px',
                padding: '10px 4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
              }}
              type="button"
            >
              <span style={{ fontSize: '24px' }}>{treat.emoji}</span>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#E65100' }}>{treat.name}</span>
            </button>
          ))}

          <button
            onClick={handlePetSpa}
            style={{
              flex: 1,
              background: '#E1F5FE',
              border: '2px solid #4FC3F7',
              borderRadius: '16px',
              padding: '10px 4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
            }}
            type="button"
          >
            <span style={{ fontSize: '24px' }}>🛁</span>
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#0288D1' }}>Pet Spa</span>
          </button>
        </div>
      </div>
    </div>
  );
}
function RewardsScreen({ player, onBack, onWatchRewarded }) {
  const [openedChest, setOpenedChest] = useState(false);
  const [claimedStreak, setClaimedStreak] = useState(false);
  const [chestReward, setChestReward] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [score, setScore] = useState(player?.coins || 0);

  const STREAK_DAYS = [
    { day: 1, reward: '🪙 +20 Coins', claimed: true, emoji: '🪙' },
    { day: 2, reward: '🪙 +30 Coins', claimed: true, emoji: '🪙' },
    { day: 3, reward: '💎 +5 Gems', claimed: claimedStreak, emoji: '💎' },
    { day: 4, reward: '🪙 +50 Coins', claimed: false, emoji: '🪙' },
    { day: 5, reward: '⭐ +100 Stars', claimed: false, emoji: '⭐' },
    { day: 6, reward: '🪙 +80 Coins', claimed: false, emoji: '🪙' },
    { day: 7, reward: '🎁 Royal Chest', claimed: false, emoji: '👑' }
  ];

  const handleOpenChest = () => {
    if (openedChest) return;
    setOpenedChest(true);
    if (typeof playSuccessSound === 'function') playSuccessSound();

    const rewardsList = [
      { name: '50 Gold Coins!', emoji: '🪙 +50', type: 'coins' },
      { name: 'Magic Star Potion!', emoji: '🧪 ⭐', type: 'potion' },
      { name: 'Legendary Diamond!', emoji: '💎 +10', type: 'gems' }
    ];
    const picked = rewardsList[Math.floor(Math.random() * rewardsList.length)];
    setChestReward(picked);
    try {
      if (typeof speak === 'function') speak(`You unlocked ${picked.name}`);
    } catch (e) { }
  };

  const handleClaimStreak = () => {
    if (claimedStreak) return;
    setClaimedStreak(true);
    if (typeof playSuccessSound === 'function') playSuccessSound();
    try {
      if (typeof speak === 'function') speak('Daily Streak Reward Claimed!');
    } catch (e) { }
  };

  return (
    <div id="rewards" className="screen active" style={{
      background: 'linear-gradient(180deg, #1E0A3C 0%, #3B1578 40%, #0F0524 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      height: '100%',
      color: '#FFF',
      overflow: 'hidden'
    }}>
      {/* Top Bar Header */}
      <div style={{ position: 'relative', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px 8px' }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '16px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFF', backdropFilter: 'blur(10px)' }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFD54F' }}>Royal Vault</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🏆</span> Trophies & Loot
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid #FFD54F', borderRadius: '999px', padding: '6px 14px', fontWeight: 900, color: '#FFD54F', fontSize: '14px' }}>
          🪙 {player?.coins || 120}
        </div>
      </div>

      <div style={{ flex: 1, padding: '12px 16px 48px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }} className="hide-scroll">

        {/* Hero Level & XP Progress Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
          borderRadius: '26px',
          padding: '16px 18px',
          border: '1.5px solid rgba(255,255,255,0.2)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          <div style={{
            fontSize: '40px',
            background: 'linear-gradient(135deg, #FFD54F, #FF8A65)',
            borderRadius: '20px',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(255,213,79,0.4)',
            border: '2px solid #FFF',
            flexShrink: 0
          }}>
            🏆
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '15px', fontWeight: 900, color: '#FFD54F' }}>Level {player?.level || 1} Champion</span>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#E1F5FE' }}>{player?.xp || 40}/{player?.xpToNextLevel || 100} XP</span>
            </div>

            <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.15)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ width: `${((player?.xp || 40) / (player?.xpToNextLevel || 100)) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FFD54F, #FF8A65)', borderRadius: '999px' }} />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px', fontSize: '12px', fontWeight: 800 }}>
              <span style={{ color: '#FFD54F' }}>⭐ {player?.stars || 12} Stars</span>
              <span style={{ color: '#FF8A65' }}>🔥 {player?.streakDays || 3}-Day Streak</span>
            </div>
          </div>
        </div>

        {/* Watch Rewarded Video Ad Card */}
        <div style={{
          background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
          borderRadius: '22px',
          padding: '16px',
          border: '2px solid #38BDF8',
          boxShadow: '0 8px 24px rgba(2,132,199,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '32px', background: 'rgba(255,255,255,0.2)', borderRadius: '16px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🎬
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#FFF' }}>Watch Video Ad</div>
              <div style={{ fontSize: '12px', color: '#E0F2FE', fontWeight: 700 }}>Earn +50 Bonus Coins Instantly!</div>
            </div>
          </div>
          <button
            onClick={() => {
              if (onWatchRewarded) onWatchRewarded();
            }}
            style={{
              background: 'linear-gradient(135deg, #FFD54F, #FF8E53)',
              border: 'none',
              borderRadius: '16px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: 900,
              color: '#000',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(255,213,79,0.5)',
              whiteSpace: 'nowrap'
            }}
            type="button"
          >
            Watch 🪙
          </button>
        </div>

        {/* 7-Day Streak Rewards Track */}
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '26px', padding: '16px', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', gap: '8px' }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF8E53' }}>Daily Login Bonus</div>
              <div style={{ fontSize: '15px', fontWeight: 900 }}>🔥 7-Day Streak Track</div>
            </div>
            {!claimedStreak && (
              <button
                onClick={handleClaimStreak}
                style={{
                  background: 'linear-gradient(135deg, #FF7043, #D84315)',
                  border: '1.5px solid #FFF',
                  borderRadius: '14px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 900,
                  color: '#FFF',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(255,112,67,0.4)',
                  whiteSpace: 'nowrap'
                }}
                type="button"
              >
                Claim Day 3 🎁
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {STREAK_DAYS.map(s => (
              <div
                key={s.day}
                style={{
                  background: s.claimed ? 'rgba(76,175,80,0.3)' : s.day === 3 && !claimedStreak ? 'rgba(255,213,79,0.3)' : 'rgba(255,255,255,0.05)',
                  border: s.claimed ? '1.5px solid #4CAF50' : s.day === 3 && !claimedStreak ? '2px solid #FFD54F' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px',
                  padding: '6px 2px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px'
                }}
              >
                <span style={{ fontSize: '9px', fontWeight: 800, opacity: 0.8 }}>D{s.day}</span>
                <span style={{ fontSize: '16px' }}>{s.emoji}</span>
                <span style={{ fontSize: '9px', fontWeight: 900, color: s.claimed ? '#81C784' : '#FFD54F' }}>
                  {s.claimed ? '✓' : 'Wait'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Mystery Chest Opener Card */}
        <div
          onClick={handleOpenChest}
          style={{
            background: openedChest ? 'linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)' : 'linear-gradient(135deg, #7C4DFF 0%, #512DA8 100%)',
            borderRadius: '26px',
            padding: '18px 20px',
            border: '2px solid rgba(255,255,255,0.3)',
            boxShadow: '0 16px 36px rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            minHeight: '94px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ flex: 1, paddingRight: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFD54F', marginBottom: '2px' }}>
              {openedChest ? 'Chest Unlocked!' : 'Mystery Vault'}
            </div>
            <div style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1.2 }}>
              {openedChest ? chestReward?.name : 'Tap to Open Royal Chest'}
            </div>
            <div style={{ fontSize: '11px', opacity: 0.9, marginTop: '4px' }}>
              {openedChest ? 'Earned rare loot bonus!' : 'Contains coins, gems & star power!'}
            </div>
          </div>

          <div style={{
            fontSize: '56px',
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
            transform: openedChest ? 'scale(1.15) rotate(12deg)' : 'scale(1)',
            animation: openedChest ? 'none' : 'bounce-idle 1.5s infinite',
            transition: 'transform 0.4s',
            flexShrink: 0
          }}>
            {openedChest ? chestReward?.emoji || '🎁✨' : '📦'}
          </div>
        </div>

        {/* Badges Grid Showcase */}
        <div style={{ paddingBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ fontSize: '17px', fontWeight: 900 }}>🏅 Achievement Badges</div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFD54F', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '12px' }}>
              {BADGES.filter(b => b.earned).length} / {BADGES.length} Unlocked
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {BADGES.map((badge) => {
              const isSelected = selectedBadge?.name === badge.name;
              return (
                <div
                  key={badge.name}
                  onClick={() => {
                    setSelectedBadge(badge);
                    try {
                      if (typeof speak === 'function') speak(`${badge.name}. ${badge.earned ? 'Unlocked!' : 'Locked'}`);
                    } catch (e) { }
                  }}
                  style={{
                    background: badge.earned ? 'linear-gradient(135deg, rgba(255,215,0,0.25) 0%, rgba(255,160,0,0.15) 100%)' : 'rgba(255,255,255,0.04)',
                    border: isSelected ? '2px solid #FFD54F' : badge.earned ? '1.5px solid #FFD54F' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '22px',
                    padding: '16px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    opacity: badge.earned ? 1 : 0.5,
                    filter: badge.earned ? 'none' : 'grayscale(80%)',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.2s',
                    boxShadow: badge.earned ? '0 8px 20px rgba(255,213,79,0.2)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '38px', filter: badge.earned ? 'drop-shadow(0 6px 12px rgba(255,213,79,0.6))' : 'none', marginBottom: '6px' }}>
                    {badge.emoji}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 900, textAlign: 'center', lineHeight: 1.2, color: badge.earned ? '#FFF' : '#B0BEC5' }}>
                    {badge.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

function ShopScreen({ player, setPlayer, onBack }) {
  const [activeTab, setActiveTab] = useState('hats');
  const [previewItem, setPreviewItem] = useState(null);

  const equippedHatId = player?.equipped?.hat;
  const equippedHatObj = SHOP_ITEMS.hats.find(h => h.id === equippedHatId);
  const activeHatEmoji = previewItem?.category === 'hats' ? previewItem.emoji : equippedHatObj?.emoji;

  const handleBuy = (category, item) => {
    const inventory = player.inventory || [];
    if (player.coins >= item.price && !inventory.includes(item.id)) {
      if (typeof playSuccessSound === 'function') playSuccessSound();
      try {
        if (typeof speak === 'function') speak(`Purchased ${item.name}!`);
      } catch (e) { }

      setPlayer(prev => {
        const next = { ...prev };
        next.coins -= item.price;
        next.inventory = [...(next.inventory || []), item.id];
        next.equipped = { ...(next.equipped || {}) };
        if (category === 'hats') next.equipped.hat = item.id;
        if (category === 'habitats') next.equipped.habitat = item.id;
        return next;
      });
    }
  };

  const handleEquip = (category, item) => {
    if (typeof playClickSound === 'function') playClickSound();
    try {
      if (typeof speak === 'function') speak(`Equipped ${item.name}`);
    } catch (e) { }

    setPlayer(prev => {
      const next = { ...prev };
      next.equipped = { ...(next.equipped || {}) };
      if (category === 'hats') next.equipped.hat = next.equipped.hat === item.id ? null : item.id;
      if (category === 'habitats') next.equipped.habitat = item.id;
      return next;
    });
  };

  return (
    <div id="shop" className="screen active" style={{
      background: 'linear-gradient(180deg, #1A0C2E 0%, #2E1554 40%, #0F051D 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      color: '#fff',
      height: '100%',
      overflow: 'hidden'
    }}>
      {/* Premium Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px 8px', justifyContent: 'space-between', position: 'relative', zIndex: 20 }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '16px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', backdropFilter: 'blur(8px)' }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFD54F' }}>Royal Bazaar</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🛍️</span> Wonder Shop
          </div>
        </div>

        <div style={{ background: 'linear-gradient(180deg, #FFD54F 0%, #FFB300 100%)', padding: '6px 14px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 6px 14px rgba(255,179,0,0.4)', border: '1.5px solid #FFF' }}>
          <span style={{ fontSize: '16px' }}>🪙</span>
          <span style={{ fontSize: '14px', fontWeight: 900, color: '#6A4E00' }}>{player?.coins || 120}</span>
        </div>
      </div>

      {/* 3D Mascot Fitting Mirror Stage */}
      <div style={{ padding: '0 16px 8px', position: 'relative', zIndex: 10 }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
          borderRadius: '24px',
          padding: '12px 16px',
          border: '1.5px solid rgba(255,255,255,0.2)',
          boxShadow: '0 10px 28px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          {/* Pet Mascot Mirror Preview Sphere */}
          <div style={{
            width: '74px',
            height: '74px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
            border: '2px solid #FFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 8px 18px rgba(0,0,0,0.2)',
            flexShrink: 0
          }}>
            {activeHatEmoji && (
              <div style={{ fontSize: '24px', marginBottom: '-14px', zIndex: 10, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                {activeHatEmoji}
              </div>
            )}
            <div style={{ fontSize: '42px', zIndex: 5, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>
              {player?.petEmoji || player?.avatarEmoji || '🦊'}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#FFD54F' }}>
              Fitting Mirror 🪞
            </div>
            <div style={{ fontSize: '15px', fontWeight: 900, color: '#FFF', marginTop: '2px' }}>
              {previewItem ? `Previewing: ${previewItem.name}` : 'Tap items below to try on!'}
            </div>
            <div style={{ fontSize: '11px', color: '#E1F5FE', opacity: 0.8, marginTop: '2px' }}>
              Equip accessories to boost companion style!
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '8px', padding: '0 16px 8px', justifyContent: 'center', position: 'relative', zIndex: 20 }}>
        {[
          { id: 'hats', label: '🧢 Hats & Crown' },
          { id: 'habitats', label: '🏡 Habitats' },
          { id: 'potions', label: '🧪 Potions' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setPreviewItem(null); }}
            style={{
              background: activeTab === tab.id ? 'linear-gradient(135deg, #FF7043, #D84315)' : 'rgba(255,255,255,0.1)',
              border: activeTab === tab.id ? '2px solid #FFF' : '1px solid rgba(255,255,255,0.2)',
              borderRadius: '20px',
              padding: '8px 14px',
              color: '#FFF',
              fontWeight: 900,
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: activeTab === tab.id ? '0 4px 14px rgba(255,112,67,0.4)' : 'none'
            }}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Items */}
      <div style={{ flex: 1, padding: '8px 16px 48px', overflowY: 'auto', position: 'relative', zIndex: 10 }} className="hide-scroll">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', paddingBottom: '32px' }}>
          {(SHOP_ITEMS[activeTab] || []).map(item => {
            const isOwned = player?.inventory?.includes(item.id);
            const isEquipped = player?.equipped?.hat === item.id || player?.equipped?.habitat === item.id;
            const canAfford = (player?.coins || 0) >= item.price;
            const isSelected = previewItem?.id === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setPreviewItem({ ...item, category: activeTab })}
                style={{
                  background: isEquipped ? 'linear-gradient(135deg, rgba(255,213,79,0.25), rgba(255,140,0,0.15))' : 'rgba(255,255,255,0.06)',
                  borderRadius: '22px',
                  padding: '16px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: isSelected ? '0 8px 24px rgba(255,213,79,0.3)' : '0 6px 16px rgba(0,0,0,0.2)',
                  border: isSelected ? '2px solid #FFD54F' : isEquipped ? '1.5px solid #FFD54F' : '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  cursor: 'pointer',
                  transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '52px', marginBottom: '10px', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))' }}>{item.emoji}</div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', textAlign: 'center', lineHeight: 1.2, marginBottom: '12px' }}>{item.name}</div>

                {isOwned ? (
                  <button onClick={(e) => { e.stopPropagation(); handleEquip(activeTab, item); }} style={{ marginTop: 'auto', background: isEquipped ? 'rgba(255,255,255,0.15)' : 'linear-gradient(135deg, #FFD54F, #FF8A65)', color: isEquipped ? '#FFD54F' : '#1A0C2E', border: isEquipped ? '1.5px solid #FFD54F' : 'none', borderRadius: '999px', padding: '8px 16px', fontWeight: 900, width: '100%', cursor: 'pointer', boxShadow: isEquipped ? 'none' : '0 6px 14px rgba(255,213,79,0.4)', textTransform: 'uppercase', fontSize: '12px' }} type="button">
                    {isEquipped ? 'Equipped ✓' : 'Equip 🧢'}
                  </button>
                ) : (
                  <button onClick={(e) => { e.stopPropagation(); handleBuy(activeTab, item); }} disabled={!canAfford} style={{ marginTop: 'auto', background: canAfford ? 'linear-gradient(135deg, #4CAF50, #2E7D32)' : 'rgba(255,255,255,0.1)', color: canAfford ? '#FFF' : '#A0A5BA', border: canAfford ? '1.5px solid #81C784' : 'none', borderRadius: '999px', padding: '8px 16px', fontWeight: 900, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: canAfford ? 'pointer' : 'not-allowed', boxShadow: canAfford ? '0 6px 14px rgba(76,175,80,0.4)' : 'none', textTransform: 'uppercase', fontSize: '12px' }} type="button">
                    <span>🪙</span> {item.price}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NurseryHub({ onBack, onOpenGame }) {
  const LOCATIONS = [
    { id: 'alphabet-game', name: 'Alphabet School', emoji: '🏫', top: '8%', left: '36%', color: '#FF9800', bg: 'linear-gradient(135deg, #FFB74D, #F57C00)' },
    { id: 'animal-farm', name: 'Red Barn', emoji: '🛖', top: '18%', left: '65%', color: '#E53935', bg: 'linear-gradient(135deg, #EF5350, #C62828)' },
    { id: 'fruit-market', name: 'Apple Orchard', emoji: '🌳', top: '29%', left: '36%', color: '#43A047', bg: 'linear-gradient(135deg, #66BB6A, #2E7D32)' },
    { id: 'memory-match', name: 'Memory Tree', emoji: '🌲', top: '40%', left: '65%', color: '#8E24AA', bg: 'linear-gradient(135deg, #AB47BC, #6A1B9A)' },
    { id: 'cauldron', name: 'Wizard Tent', emoji: '⛺', top: '51%', left: '36%', color: '#00897B', bg: 'linear-gradient(135deg, #26A69A, #00695C)' },
    { id: 'cloud-hopper', name: 'Cloud Stairs', emoji: '🪜', top: '62%', left: '65%', color: '#1E88E5', bg: 'linear-gradient(135deg, #42A5F5, #1565C0)' },
    { id: 'starlight', name: 'Observatory', emoji: '🔭', top: '73%', left: '36%', color: '#3949AB', bg: 'linear-gradient(135deg, #5C6BC0, #283593)' },
    { id: 'rainbow-village', name: 'Rainbow Studio', emoji: '🌈', top: '84%', left: '65%', color: '#FF4081', bg: 'linear-gradient(135deg, #FF4081, #7C4DFF)' },
    { id: 'wonder-bakery', name: 'Wonder Bakery', emoji: '🧁', top: '94%', left: '36%', color: '#FF7043', bg: 'linear-gradient(135deg, #FF7043, #D84315)' }
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
        <div style={{ position: 'relative', height: '2000px', width: '100%', overflow: 'hidden' }}>

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
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3, filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.4))' }} preserveAspectRatio="none" viewBox="0 0 100 1200">
            {/* Glow Layer */}
            <path d="M 30,0 C 30,100 80,150 80,250 C 80,350 30,400 30,500 C 30,600 80,650 80,750 C 80,850 30,950 30,1050 C 30,1150 75,1180 75,1200" fill="none" stroke="rgba(255,213,79,0.4)" strokeWidth="20" strokeLinecap="round" style={{ filter: 'blur(8px)' }} />
            {/* Base Yellow Brick */}
            <path d="M 30,0 C 30,100 80,150 80,250 C 80,350 30,400 30,500 C 30,600 80,650 80,750 C 80,850 30,950 30,1050 C 30,1150 75,1180 75,1200" fill="none" stroke="#FFD54F" strokeWidth="14" strokeLinecap="round" />
            {/* Inner Highlight */}
            <path d="M 30,0 C 30,100 80,150 80,250 C 80,350 30,400 30,500 C 30,600 80,650 80,750 C 80,850 30,950 30,1050 C 30,1150 75,1180 75,1200" fill="none" stroke="#FFF9C4" strokeWidth="6" strokeLinecap="round" strokeDasharray="8 12" />
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
              animation: `sway-wobble ${3 + (i % 3)}s ease-in-out infinite alternate`,
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
                marginTop: '12px', background: '#FFFFFF', padding: '6px 14px', borderRadius: '16px',
                fontSize: '13px', fontWeight: 900, color: loc.color,
                boxShadow: '0 8px 18px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,1)',
                border: `3px solid ${loc.color}`,
                whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.04em',
                maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', boxSizing: 'border-box'
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

const ALPHABET_SOUNDS = {
  A: 'ay',
  B: 'bee',
  C: 'see',
  D: 'dee',
  E: 'ee',
  F: 'eff',
  G: 'jee',
  H: 'aitch',
  I: 'eye',
  J: 'jay',
  K: 'kay',
  L: 'el',
  M: 'em',
  N: 'en',
  O: 'oh',
  P: 'pee',
  Q: 'cue',
  R: 'ar',
  S: 'ess',
  T: 'tee',
  U: 'you',
  V: 'vee',
  W: 'double you',
  X: 'ex',
  Y: 'why',
  Z: 'zee',
};
const ALPHABET_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const ALPHABET_COLORS = ['#FF7A7A', '#4ECAD8', '#FFD76A', '#FF9F53', '#6AA9FF', '#8A6BFF'];
const ALPHABET_BALLOON_COUNT = 5;
const ALPHABET_LANES = ['14%', '31%', '48%', '65%', '82%'];
const ALPHABET_OFFSETS = [0, 35, 60, 35, 0];

const pickAlphabetLetter = (exclude = []) => {
  const options = ALPHABET_LETTERS.filter((letter) => !exclude.includes(letter));
  return options[Math.floor(Math.random() * options.length)] || 'A';
};

const shuffle = (items) => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

const createAlphabetRound = (targetLetter, stageHeight = 430, startAtBottom = false) => {
  const letters = [targetLetter];
  while (letters.length < ALPHABET_BALLOON_COUNT) {
    const letter = pickAlphabetLetter(letters);
    if (!letters.includes(letter)) letters.push(letter);
  }
  const shuffledLetters = shuffle(letters);
  const shuffledLanes = ALPHABET_LANES;
  const baseStart = startAtBottom ? stageHeight + 40 : stageHeight * 0.15;

  return shuffledLetters.map((letter, index) => {
    return {
      id: `${Date.now()}-${index}-${Math.random()}`,
      letter,
      color: ALPHABET_COLORS[index % ALPHABET_COLORS.length],
      left: shuffledLanes[index],
      y: baseStart + ALPHABET_OFFSETS[index],
      wavePhase: index * 1.3,
      shake: false,
      isTarget: letter === targetLetter,
    };
  });
};

const initialAlphabetTarget = 'B';

function AlphabetGame({ onBack, onEarn }) {
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  useEffect(() => { scoreRef.current = score; }, [score]);
  const [targetLetter, setTargetLetter] = useState(() => initialAlphabetTarget);
  const [balloons, setBalloons] = useState(() => createAlphabetRound(initialAlphabetTarget, 430, false));
  const [stageHeight, setStageHeight] = useState(430);
  const [particles, setParticles] = useState([]);
  const stageRef = useRef(null);

  useEffect(() => {
    const updateStage = () => {
      setStageHeight(stageRef.current?.clientHeight || 430);
    };
    updateStage();
    window.addEventListener('resize', updateStage);
    return () => window.removeEventListener('resize', updateStage);
  }, []);

  const targetLetterRef = useRef(targetLetter);
  useEffect(() => {
    targetLetterRef.current = targetLetter;
  }, [targetLetter]);

  useEffect(() => {
    const targetSound = ALPHABET_SOUNDS[targetLetter] || targetLetter;
    const timer = window.setTimeout(() => {
      speak(`Pop the letter ${targetLetter}. Say it: ${targetSound}`);
    }, 450);
    return () => window.clearTimeout(timer);
  }, [targetLetter]);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setBalloons((current) => {
        if (!current || current.length === 0) return current;

        const speed = 1.1 + scoreRef.current * 0.04;
        const maxY = Math.max(...current.map((b) => b.y));

        // When the full group wave floats off the top, reset the entire wave together below bottom ground
        if (maxY < -120) {
          const baseStart = stageHeight + 40;
          return current.map((balloon, index) => ({
            ...balloon,
            y: baseStart + ALPHABET_OFFSETS[index],
            isTarget: balloon.letter === targetLetterRef.current,
          }));
        }

        // Move all balloons UPWARDS together as a unified group wave
        return current.map((balloon) => ({
          ...balloon,
          y: balloon.y - speed,
          isTarget: balloon.letter === targetLetterRef.current,
        }));
      });
    }, 16);
    return () => window.clearInterval(tick);
  }, [stageHeight]);

  const targetSound = ALPHABET_SOUNDS[targetLetter] || targetLetter;

  const pop = (balloon) => {
    if (!balloon.isTarget) {
      playErrorSound();
      speak(ALPHABET_SOUNDS[balloon.letter] || balloon.letter);
      setBalloons(current => current.map(b => b.id === balloon.id ? { ...b, shake: true } : b));
      setTimeout(() => {
        setBalloons(current => current.map(b => b.id === balloon.id ? { ...b, shake: false } : b));
      }, 400);
      return;
    }

    playPopSound();
    speak(ALPHABET_SOUNDS[balloon.letter] || balloon.letter);

    // Pop ALL balloons when target is hit
    const allBalloons = [...balloons];

    // Create pop particles for ALL balloons
    const particleCount = 10;
    const newParticles = [];
    const baseId = Date.now();

    allBalloons.forEach((pb, idx) => {
      for (let i = 0; i < particleCount; i++) {
        const angle = (i * 2 * Math.PI) / particleCount + (Math.random() * 0.4 - 0.2);
        const speed = 60 + Math.random() * 50;
        newParticles.push({
          id: `${baseId}-${idx}-${i}`,
          left: pb.left,
          top: pb.y + 40,
          color: pb.color,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed
        });
      }
    });

    setParticles((prev) => [...prev, ...newParticles]);

    // Clean up particles
    window.setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 600);

    setScore((value) => value + 1);
    if (onEarn) onEarn(5, 0);

    const nextTarget = pickAlphabetLetter([balloon.letter]);
    setTargetLetter(nextTarget);
    setBalloons(createAlphabetRound(nextTarget, stageHeight, true));
  };

  return (
    <div id="alphabet-game" className="screen active" style={{
      background: 'linear-gradient(180deg, #4FC3F7 0%, #B3E5FC 60%, #C8E6C9 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      width: '100%'
    }}>

      {/* Decorative Sky Background Elements */}
      <div style={{ position: 'absolute', top: '15%', left: '10%', fontSize: '80px', opacity: 0.6, filter: 'blur(1px)' }}>☁️</div>
      <div style={{ position: 'absolute', top: '25%', right: '5%', fontSize: '120px', opacity: 0.4, filter: 'blur(2px)' }}>☁️</div>
      <div style={{ position: 'absolute', top: '5%', right: '15%', fontSize: '90px', filter: 'drop-shadow(0 0 40px rgba(255,213,79,0.8))' }}>☀️</div>

      {/* Background Hills */}
      <div style={{ position: 'absolute', bottom: '-10%', left: '-20%', width: '150%', height: '40%', background: 'linear-gradient(180deg, #A5D6A7 0%, #81C784 100%)', borderRadius: '50% 50% 0 0', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-15%', right: '-30%', width: '120%', height: '45%', background: 'linear-gradient(180deg, #81C784 0%, #66BB6A 100%)', borderRadius: '50% 50% 0 0', zIndex: 0 }} />

      {/* Top Navbar */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 20px 10px' }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: '16px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#0277BD', backdropFilter: 'blur(10px)', boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }} type="button">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '999px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 8px 16px rgba(0,0,0,0.05)', fontWeight: 900, color: '#2E2140', fontSize: '16px' }}>
          <span style={{ color: '#FFD54F', fontSize: '20px', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))' }}>⭐</span> {score}
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ position: 'relative', zIndex: 2, flex: 1, padding: '10px 20px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Instruction Glass Pill */}
        <div style={{
          background: 'rgba(255,255,255,0.85)',
          borderRadius: '999px',
          padding: '12px 24px',
          boxShadow: '0 16px 32px rgba(2,119,189,0.15), inset 0 2px 4px rgba(255,255,255,0.9)',
          border: '1px solid rgba(255,255,255,1)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0288D1', opacity: 0.9 }}>Sound Quest</div>
            <div style={{ fontSize: '26px', fontWeight: 900, lineHeight: 1.1, color: '#2E2140' }}>Find <span style={{ color: '#FF5252', textShadow: '0 2px 4px rgba(255,82,82,0.2)' }}>{targetLetter}</span></div>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', background: 'linear-gradient(135deg, #7E57C2, #AB47BC)', padding: '8px 20px', borderRadius: '999px', boxShadow: '0 8px 16px rgba(126,87,194,0.3)', textTransform: 'lowercase' }}>
            "{targetSound}"
          </div>
        </div>

        {/* Stage Container */}
        <div ref={stageRef} style={{ flex: 1, position: 'relative', borderRadius: '32px', overflow: 'hidden' }}>

          <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 100, background: 'rgba(255,255,255,0.95)', color: '#0277BD', fontSize: '13px', fontWeight: 800, padding: '8px 20px', borderRadius: '999px', boxShadow: '0 8px 16px rgba(0,0,0,0.08)' }}>
            Pop the matching balloon!
          </div>

          <div style={{ position: 'absolute', inset: 0 }}>
            {balloons.map((balloon) => (
              <div
                key={balloon.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: balloon.left,
                  transform: `translate3d(calc(-50% + ${Math.sin(balloon.wavePhase + balloon.y * 0.02) * 15}px), ${balloon.y}px, 0)`,
                  zIndex: Math.floor(balloon.y)
                }}
              >
                <button
                  type="button"
                  onClick={() => pop(balloon)}
                  aria-label={`Pop letter ${balloon.letter}`}
                  className={balloon.shake ? "balloon-shake" : ""}
                  style={{
                    position: 'relative',
                    width: '88px',
                    height: '106px',
                    borderRadius: '50% 50% 50% 50% / 45% 45% 55% 55%',
                    backgroundColor: 'transparent',
                    background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${balloon.color} 25%, ${balloon.color} 80%, rgba(0,0,0,0.15) 100%)`,
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15), inset -6px -10px 16px rgba(0,0,0,0.12)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    animation: 'sway-wobble 3.5s ease-in-out infinite alternate',
                    transformOrigin: 'center bottom',
                    outline: 'none',
                    padding: 0
                  }}
                >
                  <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: '16px', height: '12px', background: balloon.color, clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0 100%)', zIndex: 1, borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }} />
                  <div style={{ position: 'absolute', bottom: '-58px', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '50px', background: 'rgba(255,255,255,0.5)', zIndex: 0 }} />
                  <div style={{ position: 'absolute', top: '15%', left: '22%', width: '18px', height: '26px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%', transform: 'rotate(-25deg)', filter: 'blur(1px)' }} />
                  <span style={{ fontSize: '44px', fontWeight: 900, color: '#111111', zIndex: 2, transform: 'translateY(-4px)', fontFamily: "'Outfit', sans-serif" }}>
                    {balloon.letter}
                  </span>
                </button>
              </div>
            ))}

            {particles.map((p) => (
              <div
                key={p.id}
                className="pop-particle"
                style={{
                  background: p.color,
                  left: p.left,
                  top: `${p.top}px`,
                  '--dx': `${p.dx}px`,
                  '--dy': `${p.dy}px`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ANIMAL_THEMES = {
  cow: { bg: '#E2F3F5', border: '#45B6FE', soundText: 'Moo' },
  pig: { bg: '#FFE4E1', border: '#FF69B4', soundText: 'Oink' },
  sheep: { bg: '#F5F5F5', border: '#A9A9A9', soundText: 'Baa' },
  horse: { bg: '#F4E3D7', border: '#D2691E', soundText: 'Neigh' },
  chicken: { bg: '#FFFDD0', border: '#FFD700', soundText: 'Cluck' },
  duck: { bg: '#E0F7FA', border: '#00ACC1', soundText: 'Quack' }
};

function AnimalFarm({ onBack, onEarn }) {
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  useEffect(() => { scoreRef.current = score; }, [score]);
  const [targetIndex, setTargetIndex] = useState(0);
  const [revealed, setRevealed] = useState(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setRevealed(null);
  }, [targetIndex]);

  const target = ANIMALS[targetIndex];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      speak(`Find the ${target.name}!`);
    }, 450);
    return () => window.clearTimeout(timer);
  }, [targetIndex]);

  const handlePick = (index) => {
    if (revealed === index) return;
    const animal = ANIMALS[index];
    setRevealed(index);

    if (index === targetIndex) {
      if (typeof playSuccessSound === 'function') playSuccessSound();
      speak(`${animal.sound}! You found the ${animal.name}!`);
      setScore((value) => value + 1);
      if (onEarn) onEarn(10, 1);

      const newP = Array.from({ length: 10 }).map((_, i) => ({
        id: Date.now() + i,
        emoji: ['⭐', '🌾', '✨', '🎈'][i % 4],
        x: (index % 2 === 0 ? 25 : 75) + (Math.random() * 20 - 10),
        y: 35 + Math.floor(index / 2) * 20,
      }));
      setParticles(newP);
      setTimeout(() => setParticles([]), 1500);

      window.setTimeout(() => setTargetIndex((value) => (value + 1) % ANIMALS.length), 2000);
    } else {
      if (typeof playErrorSound === 'function') playErrorSound();
      speak(`${animal.sound}! That is the ${animal.name}. Try again!`);
      window.setTimeout(() => setRevealed(null), 1600);
    }
  };

  return (
    <div id="animal-farm" className="screen active" style={{
      background: 'linear-gradient(180deg, #4FC3F7 0%, #B3E5FC 35%, #81C784 35%, #4CAF50 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      touchAction: 'none'
    }}>
      {/* Sky Background Elements */}
      <div style={{ position: 'absolute', top: '4%', left: '8%', fontSize: '50px', opacity: 0.7 }}>☁️</div>
      <div style={{ position: 'absolute', top: '8%', right: '12%', fontSize: '60px', filter: 'drop-shadow(0 0 20px rgba(255,235,59,0.9))' }}>☀️</div>

      {/* Top Red Barn Roof Banner */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        background: 'linear-gradient(180deg, #D32F2F 0%, #B71C1C 100%)',
        padding: '16px 20px 14px',
        borderBottom: '6px solid #8D6E63',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#FFFFFF' }} />

        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.25)',
          border: '2px solid rgba(255,255,255,0.5)',
          borderRadius: '16px',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#FFF',
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
        }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFD54F' }}>Sunny Pastures</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🏡</span> Red Barn Farm
          </div>
        </div>

        <div style={{
          background: 'rgba(0,0,0,0.3)',
          border: '1.5px solid rgba(255,213,79,0.6)',
          borderRadius: '999px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontWeight: 900,
          color: '#FFD54F',
          fontSize: '16px'
        }}>
          ⭐ {score}
        </div>
      </div>

      {/* Target Instruction Pill */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        margin: '12px 16px 4px',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '999px',
        padding: '10px 20px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '2px solid #FFF'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 900, color: '#3E2723', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🔍</span> Find the <span style={{ color: '#D32F2F', textTransform: 'capitalize', textDecoration: 'underline' }}>{target.name}</span>!
        </div>
        <div style={{ fontSize: '14px', fontWeight: 800, color: '#795548', background: '#FFF8E1', padding: '4px 12px', borderRadius: '12px', border: '1px solid #FFE082' }}>
          "{target.sound}!"
        </div>
      </div>

      {/* Barn Field / Stalls Grid */}
      <div style={{
        flex: 1,
        padding: '10px 14px 16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        alignContent: 'center',
        position: 'relative',
        zIndex: 5
      }}>
        {ANIMALS.map((animal, index) => {
          const isOpen = revealed === index;
          const isCorrect = index === targetIndex;

          return (
            <div
              key={animal.name}
              onClick={() => handlePick(index)}
              style={{
                position: 'relative',
                height: '140px',
                background: '#FFE0B2',
                borderRadius: '20px',
                border: '4px solid #5D4037',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2), inset 0 4px 8px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                perspective: '600px'
              }}
            >
              <div style={{ position: 'absolute', bottom: '4px', right: '6px', fontSize: '20px', opacity: 0.6 }}>🌾</div>
              <div style={{ position: 'absolute', bottom: '4px', left: '6px', fontSize: '20px', opacity: 0.6 }}>🌾</div>

              <div style={{
                fontSize: '58px',
                zIndex: 2,
                transform: isOpen ? 'scale(1.15) translateY(-4px)' : 'scale(0.85)',
                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                filter: isOpen ? 'drop-shadow(0 8px 12px rgba(0,0,0,0.3))' : 'none'
              }}>
                {animal.emoji}
              </div>

              {isOpen && (
                <div style={{
                  position: 'absolute',
                  bottom: '6px',
                  background: isCorrect ? '#4CAF50' : '#FF5252',
                  color: '#FFF',
                  fontWeight: 900,
                  fontSize: '12px',
                  padding: '2px 10px',
                  borderRadius: '10px',
                  zIndex: 10,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  textTransform: 'capitalize'
                }}>
                  {isCorrect ? `✨ ${animal.name}!` : `Oops! ${animal.name}`}
                </div>
              )}

              {/* Left Barn Door */}
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: '50%',
                background: 'linear-gradient(135deg, #E53935 0%, #C62828 100%)',
                borderRight: '2px solid #B71C1C',
                zIndex: 5,
                transformOrigin: 'left center',
                transform: isOpen ? 'rotateY(-110deg)' : 'rotateY(0deg)',
                transition: 'transform 0.4s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isOpen ? 'none' : 'inset -3px 0 6px rgba(0,0,0,0.2)'
              }}>
                <div style={{ position: 'absolute', inset: '8px', border: '3px solid #FFFFFF', borderRadius: '4px' }} />
                <div style={{ position: 'absolute', width: '2px', height: '80%', background: '#FFFFFF', transform: 'rotate(-35deg)' }} />
                <div style={{ position: 'absolute', right: '4px', width: '6px', height: '14px', background: '#FFD54F', borderRadius: '3px', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
              </div>

              {/* Right Barn Door */}
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: '50%',
                background: 'linear-gradient(135deg, #E53935 0%, #C62828 100%)',
                borderLeft: '2px solid #B71C1C',
                zIndex: 5,
                transformOrigin: 'right center',
                transform: isOpen ? 'rotateY(110deg)' : 'rotateY(0deg)',
                transition: 'transform 0.4s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isOpen ? 'none' : 'inset 3px 0 6px rgba(0,0,0,0.2)'
              }}>
                <div style={{ position: 'absolute', inset: '8px', border: '3px solid #FFFFFF', borderRadius: '4px' }} />
                <div style={{ position: 'absolute', width: '2px', height: '80%', background: '#FFFFFF', transform: 'rotate(35deg)' }} />
                <div style={{ position: 'absolute', left: '4px', width: '6px', height: '14px', background: '#FFD54F', borderRadius: '3px', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
              </div>
            </div>
          );
        })}
      </div>

      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`,
          top: `${p.y}%`,
          fontSize: '32px',
          zIndex: 50,
          pointerEvents: 'none'
        }}>
          {p.emoji}
        </div>
      ))}
    </div>
  );
}

const FRUIT_TYPES = [
  { emoji: '🍎', name: 'Red Apple' },
  { emoji: '🍏', name: 'Green Apple' },
  { emoji: '🧃', name: 'Apple Juice' },
  { emoji: '🥧', name: 'Apple Pie' },
  { emoji: '🍐', name: 'Sweet Pear' },
  { emoji: '🍑', name: 'Harvest Peach' },
];

function FruitMarket({ onBack, onEarn }) {
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  useEffect(() => { scoreRef.current = score; }, [score]);
  const [basketX, setBasketX] = useState(120);
  const [fruits, setFruits] = useState([]);
  const [particles, setParticles] = useState([]);
  const [basketBump, setBasketBump] = useState(false);
  const basketXRef = useRef(120);
  const stageRef = useRef(null);
  const fruitsRef = useRef([]);
  const particlesRef = useRef([]);

  useEffect(() => {
    const spawn = () => {
      const width = stageRef.current?.clientWidth || 340;
      const type = FRUIT_TYPES[Math.floor(Math.random() * FRUIT_TYPES.length)];
      const fruit = {
        id: `${Date.now()}-${Math.random()}`,
        emoji: type.emoji,
        name: type.name,
        x: Math.max(10, Math.random() * (width - 60)),
        y: -40,
        speed: 2.4 + Math.random() * 1.6
      };
      fruitsRef.current.push(fruit);
    };
    const interval = window.setInterval(spawn, 850);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const stageWidth = stageRef.current?.clientWidth || 340;
      const basketWidth = 120;
      const stageHeight = stageRef.current?.clientHeight || 550;

      const nextFruits = [];
      let caughtCount = 0;

      fruitsRef.current.forEach((fruit) => {
        const y = fruit.y + fruit.speed;
        const basketLeft = Math.max(0, Math.min(stageWidth - basketWidth, basketXRef.current - basketWidth / 2));
        const fruitCenter = fruit.x + 24;

        const catchTop = stageHeight - 130;
        const catchBottom = stageHeight - 20;

        const inHorizontal = fruitCenter > basketLeft + 15 && fruitCenter < basketLeft + basketWidth - 15;
        const crossedTop = fruit.y <= catchTop && y > catchTop;
        const inBasket = (crossedTop || (y > catchTop && y < catchBottom)) && inHorizontal;

        if (inBasket) {
          caughtCount++;
          speak(fruit.name);
          particlesRef.current.push({ id: fruit.id, emoji: fruit.emoji, x: fruit.x, y: y, birth: Date.now() });
          return;
        }

        if (y < stageHeight + 50) nextFruits.push({ ...fruit, y });
      });

      fruitsRef.current = nextFruits;
      setFruits([...nextFruits]);

      const now = Date.now();
      const activeParticles = particlesRef.current.filter(p => now - p.birth < 450);
      if (activeParticles.length !== particlesRef.current.length) {
        particlesRef.current = activeParticles;
      }
      setParticles([...activeParticles]);

      if (caughtCount > 0) {
        if (typeof playSuccessSound === 'function') playSuccessSound();
        setScore(v => v + caughtCount);
        if (onEarn) onEarn(caughtCount * 2, 0);
        setBasketBump(true);
        setTimeout(() => setBasketBump(false), 250);
      }
    }, 32);
    return () => window.clearInterval(interval);
  }, []);

  const updateBasket = (event) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX ?? event.touches?.[0]?.clientX;
    if (typeof x !== 'number') return;
    const nextX = Math.max(60, Math.min(rect.width - 60, x - rect.left));
    basketXRef.current = nextX;
    setBasketX(nextX);
  };

  return (
    <div id="fruit-market" className="screen active" style={{
      background: 'linear-gradient(180deg, #4FC3F7 0%, #B3E5FC 30%, #81C784 30%, #4CAF50 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      touchAction: 'none'
    }}>
      {/* Sky Background & Orchard Canopy */}
      <div style={{ position: 'absolute', top: '2%', left: '5%', fontSize: '50px', opacity: 0.7 }}>☁️</div>
      <div style={{ position: 'absolute', top: '6%', right: '10%', fontSize: '60px', filter: 'drop-shadow(0 0 20px rgba(255,235,59,0.9))' }}>☀️</div>

      {/* Top Header Banner */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        background: 'linear-gradient(180deg, #E53935 0%, #C62828 100%)',
        padding: '16px 20px 14px',
        borderBottom: '6px solid #4E342E',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.25)',
          border: '2px solid rgba(255,255,255,0.5)',
          borderRadius: '16px',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#FFF',
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
        }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFD54F' }}>Sunny Harvest</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🍎</span> Apple Orchard
          </div>
        </div>

        <div style={{
          background: 'rgba(0,0,0,0.3)',
          border: '1.5px solid rgba(255,213,79,0.6)',
          borderRadius: '999px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontWeight: 900,
          color: '#FFD54F',
          fontSize: '16px'
        }}>
          🍎 {score}
        </div>
      </div>

      {/* Target Instruction Banner */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        margin: '12px 16px 4px',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '999px',
        padding: '10px 20px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #FFF',
        fontWeight: 900,
        fontSize: '15px',
        color: '#2E2140'
      }}>
        <span>🧺 Catch the falling apples from the orchard trees!</span>
      </div>

      {/* Orchard Stage */}
      <div style={{ flex: 1, padding: '8px 14px 16px', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 5 }}>
        <div ref={stageRef} onMouseMove={updateBasket} onTouchMove={updateBasket} style={{
          flex: 1,
          position: 'relative',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(129,199,132,0.3) 100%)',
          borderRadius: '28px',
          border: '3px solid rgba(255,255,255,0.6)',
          boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          touchAction: 'none'
        }}>
          {/* Orchard Tree Leaves at top of stage */}
          <div style={{ position: 'absolute', top: '-10px', left: '-10px', right: '-10px', height: '45px', background: 'radial-gradient(ellipse at center, #66BB6A 0%, #388E3C 100%)', borderRadius: '0 0 50% 50%', zIndex: 2 }} />

          {/* Falling Apples & Orchard Treats */}
          {fruits.map((fruit) => (
            <div key={fruit.id} style={{
              position: 'absolute',
              left: `${fruit.x}px`,
              top: `${fruit.y}px`,
              fontSize: '44px',
              filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.2))',
              zIndex: 3
            }}>
              {fruit.emoji}
            </div>
          ))}

          {/* Catch Particles */}
          {particles.map((p) => (
            <div key={`p-${p.id}`} style={{
              position: 'absolute',
              left: `${p.x + 18}px`,
              top: `${p.y}px`,
              fontSize: '36px',
              zIndex: 10,
              animation: 'pop-particle 0.6s ease-out forwards'
            }}>
              ✨
            </div>
          ))}

          {/* Bushel Basket */}
          <div aria-label="Apple Bushel Basket" style={{
            position: 'absolute',
            bottom: '16px',
            left: `${Math.max(12, basketX - 60)}px`,
            width: '120px',
            height: '84px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '76px',
            zIndex: 6,
            filter: 'drop-shadow(0 10px 16px rgba(0,0,0,0.3))',
            transform: basketBump ? 'scale(1.18)' : 'scale(1)',
            transition: 'transform 0.15s ease-out'
          }}>
            🧺
          </div>
        </div>
      </div>
    </div>
  );
}

const MEMORY_EMOJIS = [
  '🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🦁', '🐸',
  '🐯', '🐮', '🐷', '🐵', '🐔', '🐧', '🦉', '🐢',
  '🍎', '🍌', '🍊', '🍓', '🍇', '🍉', '🍍', '🍑',
  '💎', '🔮', '🌟', '✨', '⚡', '🌙', '☀️', '🍀',
  '🍄', '🌺', '🌸', '👑', '🔑', '🎨', '🚀', '🛸',
  '🏎️', '✈️', '⛵', '🚂', '🐙', '🐬', '🦄', '🦕'
];

function MemoryMatch({ onBack, onEarn }) {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [particles, setParticles] = useState([]);
  const scoreRef = useRef(0);
  useEffect(() => { scoreRef.current = score; }, [score]);

  useEffect(() => {
    let pairCount = 2 + (level * 2);
    if (pairCount > 10) pairCount = 10;

    // Shuffle emoji pool so every level receives a fresh, unique set of pictures
    const shuffledPool = shuffle([...MEMORY_EMOJIS]);
    const levelEmojis = shuffledPool.slice(0, pairCount);

    const deck = shuffle([...levelEmojis, ...levelEmojis])
      .map(emoji => ({ id: Math.random(), emoji }));

    setCards(deck);
    setFlipped([]);
    setMatched([]);
  }, [level]);

  const handleCardClick = (index) => {
    if (flipped.length === 2) return;
    if (flipped.includes(index) || matched.includes(index)) return;

    if (typeof playPopSound === 'function') playPopSound();
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        if (typeof playSuccessSound === 'function') playSuccessSound();

        const newP = Array.from({ length: 8 }).map((_, i) => ({
          id: Date.now() + i,
          emoji: ['🍃', '✨', '🌰', '⭐'][i % 4],
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20,
        }));
        setParticles(newP);
        setTimeout(() => setParticles([]), 1200);

        setTimeout(() => {
          setMatched(prev => {
            const next = [...prev, first, second];
            if (next.length === cards.length) {
              setTimeout(() => setLevel(l => l + 1), 1000);
              if (onEarn) onEarn(20, 1);
            }
            return next;
          });
          setFlipped([]);
          setScore(s => s + 10);
          if (onEarn) onEarn(5, 0);
        }, 400);
      } else {
        if (typeof playErrorSound === 'function') playErrorSound();
        setTimeout(() => {
          setFlipped([]);
        }, 900);
      }
    }
  };

  return (
    <div id="memory-match" className="screen active" style={{
      background: 'linear-gradient(180deg, #1B5E20 0%, #2E7D32 40%, #388E3C 70%, #1B5E20 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      touchAction: 'none'
    }}>
      {/* Fireflies & Forest Canopy Elements */}
      <div style={{ position: 'absolute', top: '5%', left: '10%', fontSize: '40px', opacity: 0.6 }}>🌳</div>
      <div style={{ position: 'absolute', top: '5%', right: '10%', fontSize: '40px', opacity: 0.6 }}>🌳</div>
      <div style={{ position: 'absolute', top: '15%', left: '20%', fontSize: '20px' }}>✨</div>
      <div style={{ position: 'absolute', top: '25%', right: '25%', fontSize: '24px' }}>🌟</div>

      {/* Top Header Banner */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        background: 'linear-gradient(180deg, #2E7D32 0%, #1B5E20 100%)',
        padding: '16px 20px 14px',
        borderBottom: '5px solid #A5D6A7',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.2)',
          border: '2px solid rgba(255,255,255,0.4)',
          borderRadius: '16px',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#FFF',
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
        }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A5D6A7' }}>Enchanted Grove</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🌳</span> Memory Tree
          </div>
        </div>

        <div style={{
          background: 'rgba(0,0,0,0.3)',
          border: '1.5px solid rgba(165,214,167,0.6)',
          borderRadius: '999px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontWeight: 900,
          color: '#FFD54F',
          fontSize: '16px'
        }}>
          ⭐ {score}
        </div>
      </div>

      {/* Target Level Instruction Banner */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        margin: '12px 16px 6px',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '999px',
        padding: '10px 20px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '2px solid #FFF'
      }}>
        <div style={{ fontSize: '16px', fontWeight: 900, color: '#1B5E20' }}>
          🍃 Level {level} Memory Tree
        </div>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#388E3C', background: '#E8F5E9', padding: '4px 12px', borderRadius: '12px' }}>
          Matched: {matched.length / 2} / {cards.length / 2}
        </div>
      </div>

      {/* Memory Tree Grid Container */}
      <div style={{
        flex: 1,
        padding: '6px 14px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 5,
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cards.length <= 16 ? 4 : 5}, 1fr)`,
          gap: cards.length > 12 ? '8px' : '10px',
          width: '100%',
          maxWidth: '360px',
          margin: '0 auto'
        }}>
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index) || matched.includes(index);
            const isMatched = matched.includes(index);

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(index)}
                style={{
                  position: 'relative',
                  aspectRatio: '1',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  perspective: '600px',
                  transform: isMatched ? 'scale(0.96)' : 'scale(1)',
                  transition: 'transform 0.2s ease',
                  opacity: isMatched ? 0.75 : 1
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '20px',
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.25)'
                }}>
                  {/* Card Back (Magic Acorn Wood) */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #3E2723 0%, #4E342E 60%, #5D4037 100%)',
                    border: '3px solid #A5D6A7',
                    backfaceVisibility: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF8E1'
                  }}>
                    <div style={{ fontSize: '34px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>🌰</div>
                    <div style={{ fontSize: '10px', fontWeight: 900, color: '#A5D6A7', letterSpacing: '0.1em', marginTop: '2px' }}>TREE</div>
                  </div>

                  {/* Card Front (Revealed Emoji) */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '20px',
                    background: isMatched
                      ? 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)'
                      : 'linear-gradient(135deg, #FFF8E1 0%, #FFE082 100%)',
                    border: isMatched ? '3px solid #4CAF50' : '3px solid #FFB300',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: cards.length > 12 ? '36px' : '44px',
                    boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.8)'
                  }}>
                    {card.emoji}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const CONSTELLATIONS = [
  {
    name: 'Starlight Unicorn',
    emoji: '🦄',
    stars: [
      { id: 0, top: '40%', left: '20%' },
      { id: 1, top: '20%', left: '50%' },
      { id: 2, top: '40%', left: '80%' },
      { id: 3, top: '70%', left: '60%' },
      { id: 4, top: '70%', left: '40%' }
    ],
    customLines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]
  },
  {
    name: 'Cosmic Rocket',
    emoji: '🚀',
    stars: [
      { id: 0, top: '80%', left: '20%' },
      { id: 1, top: '50%', left: '30%' },
      { id: 2, top: '20%', left: '50%' },
      { id: 3, top: '50%', left: '70%' },
      { id: 4, top: '80%', left: '80%' }
    ],
    customLines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]
  },
  {
    name: 'Royal Crown',
    emoji: '👑',
    stars: [
      { id: 0, top: '30%', left: '20%' },
      { id: 1, top: '60%', left: '20%' },
      { id: 2, top: '60%', left: '80%' },
      { id: 3, top: '30%', left: '80%' },
      { id: 4, top: '45%', left: '50%' }
    ],
    customLines: [[0, 1], [1, 4], [4, 3], [3, 2], [2, 0]]
  },
  {
    name: 'Magic Wand',
    emoji: '🪄',
    stars: [
      { id: 0, top: '80%', left: '20%' },
      { id: 1, top: '65%', left: '35%' },
      { id: 2, top: '50%', left: '50%' },
      { id: 3, top: '35%', left: '65%' },
      { id: 4, top: '20%', left: '80%' },
      { id: 5, top: '15%', left: '70%' },
      { id: 6, top: '10%', left: '85%' },
      { id: 7, top: '25%', left: '90%' }
    ],
    customLines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 6], [6, 7], [7, 5], [5, 2]]
  },
  {
    name: 'Crystal Diamond',
    emoji: '💎',
    stars: [
      { id: 0, top: '50%', left: '20%' },
      { id: 1, top: '20%', left: '50%' },
      { id: 2, top: '50%', left: '80%' },
      { id: 3, top: '80%', left: '50%' },
      { id: 4, top: '50%', left: '20%' },
      { id: 5, top: '35%', left: '35%' },
      { id: 6, top: '35%', left: '65%' },
      { id: 7, top: '50%', left: '80%' }
    ],
    customLines: [[1, 5], [5, 6], [6, 1], [5, 0], [6, 2], [0, 3], [2, 3], [0, 2]]
  },
  {
    name: 'Big Dipper',
    emoji: '🌌',
    stars: [
      { id: 0, top: '30%', left: '80%' },
      { id: 1, top: '40%', left: '70%' },
      { id: 2, top: '50%', left: '60%' },
      { id: 3, top: '60%', left: '50%' },
      { id: 4, top: '70%', left: '35%' },
      { id: 5, top: '65%', left: '20%' },
      { id: 6, top: '50%', left: '30%' },
      { id: 7, top: '60%', left: '50%' }
    ],
    customLines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]]
  },
  {
    name: 'Star Dragon',
    emoji: '🐉',
    stars: [
      { id: 0, top: '75%', left: '15%' },
      { id: 1, top: '60%', left: '30%' },
      { id: 2, top: '45%', left: '45%' },
      { id: 3, top: '25%', left: '55%' },
      { id: 4, top: '20%', left: '75%' },
      { id: 5, top: '40%', left: '85%' },
      { id: 6, top: '60%', left: '70%' }
    ],
    customLines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
  },
  {
    name: 'Celestial Phoenix',
    emoji: '🦅',
    stars: [
      { id: 0, top: '70%', left: '50%' },
      { id: 1, top: '45%', left: '50%' },
      { id: 2, top: '20%', left: '50%' },
      { id: 3, top: '30%', left: '20%' },
      { id: 4, top: '30%', left: '80%' },
      { id: 5, top: '15%', left: '35%' }
    ],
    customLines: [[0, 1], [1, 2], [1, 3], [3, 5], [1, 4]]
  },
  {
    name: 'Starlight Dolphin',
    emoji: '🐬',
    stars: [
      { id: 0, top: '70%', left: '20%' },
      { id: 1, top: '50%', left: '35%' },
      { id: 2, top: '30%', left: '50%' },
      { id: 3, top: '25%', left: '75%' },
      { id: 4, top: '45%', left: '85%' },
      { id: 5, top: '65%', left: '60%' }
    ],
    customLines: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5]]
  },
  {
    name: 'Golden Lion',
    emoji: '🦁',
    stars: [
      { id: 0, top: '75%', left: '20%' },
      { id: 1, top: '75%', left: '50%' },
      { id: 2, top: '55%', left: '65%' },
      { id: 3, top: '30%', left: '80%' },
      { id: 4, top: '20%', left: '55%' },
      { id: 5, top: '35%', left: '35%' },
      { id: 6, top: '55%', left: '20%' }
    ],
    customLines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]]
  },
  {
    name: 'Sky Castle',
    emoji: '🏰',
    stars: [
      { id: 0, top: '75%', left: '25%' },
      { id: 1, top: '75%', left: '75%' },
      { id: 2, top: '45%', left: '75%' },
      { id: 3, top: '20%', left: '75%' },
      { id: 4, top: '20%', left: '50%' },
      { id: 5, top: '20%', left: '25%' },
      { id: 6, top: '45%', left: '25%' }
    ],
    customLines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]]
  },
  {
    name: 'Alien Saucer',
    emoji: '🛸',
    stars: [
      { id: 0, top: '50%', left: '15%' },
      { id: 1, top: '30%', left: '35%' },
      { id: 2, top: '30%', left: '65%' },
      { id: 3, top: '50%', left: '85%' },
      { id: 4, top: '70%', left: '65%' },
      { id: 5, top: '70%', left: '35%' }
    ],
    customLines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]]
  }
];

function StarlightGame({ onBack }) {
  const [level, setLevel] = useState(() => {
    try {
      const saved = localStorage.getItem('observatory_saved_level');
      return saved !== null ? parseInt(saved, 10) || 0 : 0;
    } catch (e) {
      return 0;
    }
  });

  const [activeStar, setActiveStar] = useState(0);
  const [score, setScore] = useState(0);
  const [showCatalog, setShowCatalog] = useState(false);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('observatory_saved_level', level.toString());
    } catch (e) { }
  }, [level]);

  const backgroundStars = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3.5 + 1.5,
      delay: Math.random() * 4
    }));
  }, []);

  const playStarSound = (index, isFinal) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const freq = isFinal ? 880 : 300 * Math.pow(1.05946, index * 2);
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.type = isFinal ? 'triangle' : 'sine';

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + (isFinal ? 1.5 : 0.5));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + (isFinal ? 1.5 : 0.5));
    } catch (e) { }
  };

  const currentLevel = CONSTELLATIONS[level % CONSTELLATIONS.length];
  const isComplete = activeStar >= currentLevel.stars.length;

  const handleStarClick = (id) => {
    if (id === activeStar) {
      const isLast = id === currentLevel.stars.length - 1;
      playStarSound(id, isLast);
      try {
        if (typeof speak === 'function') speak((id + 1).toString());
      } catch (e) { }

      setActiveStar(prev => prev + 1);
      if (isLast) {
        if (typeof playSuccessSound === 'function') playSuccessSound();
        setScore(s => s + 50);
        setTimeout(() => {
          setLevel(l => l + 1);
          setActiveStar(0);
        }, 3200);
      }
    }
  };

  const svgLines = [];
  if (currentLevel.customLines) {
    currentLevel.customLines.forEach(([a, b], idx) => {
      if (a < activeStar && b < activeStar) {
        const start = currentLevel.stars[a];
        const end = currentLevel.stars[b];
        if (start && end) {
          svgLines.push(
            <line
              key={`custom-${idx}`}
              className="starlight-line"
              x1={start.left}
              y1={start.top}
              x2={end.left}
              y2={end.top}
              stroke="#4FC3F7"
              strokeWidth="6"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 12px #00E5FF)' }}
            />
          );
        }
      }
    });
  } else {
    for (let i = 0; i < activeStar; i++) {
      const start = currentLevel.stars[i];
      const end = currentLevel.stars[i + 1];
      if (start && end) {
        svgLines.push(
          <line
            key={i}
            className="starlight-line"
            x1={start.left}
            y1={start.top}
            x2={end.left}
            y2={end.top}
            stroke="#4FC3F7"
            strokeWidth="6"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 12px #00E5FF)' }}
          />
        );
      }
    }
  }

  return (
    <div id="starlight-game" className="screen active" style={{
      background: 'linear-gradient(180deg, #0B001A 0%, #1A0033 40%, #2E0B54 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      touchAction: 'none'
    }}>

      {/* Background Twinkle Stars */}
      {backgroundStars.map(s => (
        <div key={s.id} className="twinkle-star" style={{
          top: s.top, left: s.left, width: `${s.size}px`, height: `${s.size}px`,
          animationDelay: `${s.delay}s`,
          background: '#FFF',
          borderRadius: '50%',
          boxShadow: '0 0 8px #FFF'
        }} />
      ))}

      {/* Top Header Banner */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        background: 'linear-gradient(180deg, #1A0B2E 0%, #311B92 100%)',
        padding: '16px 20px 14px',
        borderBottom: '5px solid #FFD54F',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.2)',
          border: '2px solid rgba(255,255,255,0.4)',
          borderRadius: '16px',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#FFF',
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
        }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFD54F' }}>Celestial Telescope</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🔭</span> Observatory
          </div>
        </div>

        <button onClick={() => setShowCatalog(true)} style={{
          background: 'rgba(255,213,79,0.3)',
          border: '1.5px solid #FFD54F',
          borderRadius: '999px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontWeight: 900,
          color: '#FFD54F',
          fontSize: '13px',
          cursor: 'pointer'
        }} type="button">
          🌌 Catalog
        </button>
      </div>

      {/* Target Constellation Card */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        margin: '12px 16px 4px',
        background: 'rgba(18, 0, 43, 0.92)',
        borderRadius: '999px',
        padding: '10px 20px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '2px solid #FFD54F',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontSize: '16px', fontWeight: 900, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>✨ Map {currentLevel.emoji}</span>
          <span style={{ color: '#FFD54F', textDecoration: 'underline' }}>{currentLevel.name}</span>
        </div>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#4FC3F7', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '12px' }}>
          Star: {Math.min(activeStar + 1, currentLevel.stars.length)} / {currentLevel.stars.length}
        </div>
      </div>

      {/* Observatory Dome Telescope Viewing Stage */}
      <div style={{ flex: 1, position: 'relative', zIndex: 5, padding: '10px 20px 20px', display: 'flex', flexDirection: 'column' }}>

        <div style={{ flex: 1, position: 'relative', border: '2px solid rgba(255,255,255,0.15)', borderRadius: '24px', overflow: 'hidden', background: 'radial-gradient(circle at 50% 50%, rgba(46,11,84,0.4) 0%, rgba(11,0,26,0.8) 100%)' }}>
          {/* Laser Lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}>
            {svgLines}
          </svg>

          {/* Constellation Star Nodes */}
          {currentLevel.stars.map((star, idx) => {
            const isActive = idx === activeStar;
            const isConnected = idx < activeStar;

            return (
              <button
                key={star.id}
                onClick={() => handleStarClick(idx)}
                style={{
                  position: 'absolute',
                  top: star.top,
                  left: star.left,
                  transform: 'translate(-50%, -50%)',
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: (isActive || isConnected) ? 'pointer' : 'default',
                  zIndex: isActive ? 15 : 5,
                  padding: 0
                }}
                type="button"
              >
                <div style={{
                  width: isActive ? '32px' : (isConnected ? '16px' : '20px'),
                  height: isActive ? '32px' : (isConnected ? '16px' : '20px'),
                  background: isConnected ? '#FFFFFF' : isActive ? 'linear-gradient(135deg, #FFD54F, #FF9100)' : 'rgba(255,255,255,0.4)',
                  borderRadius: '50%',
                  boxShadow: isActive ? '0 0 24px 6px #FFD54F' : (isConnected ? '0 0 12px 2px #00E5FF' : 'none'),
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: isActive ? '3px solid #FFF' : 'none'
                }}>
                  {isActive && (
                    <div style={{ fontSize: '16px', fontWeight: 900, color: '#090314' }}>{idx + 1}</div>
                  )}
                </div>
              </button>
            );
          })}

          {/* Final Constellation Reveal */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${isComplete ? 1 : 0})`,
            opacity: isComplete ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            fontSize: '130px',
            filter: 'drop-shadow(0 0 40px #FFD54F)',
            zIndex: 20
          }}>
            {currentLevel.emoji}
          </div>
        </div>

      </div>

      {/* Observatory Catalog Modal */}
      {showCatalog && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(11, 0, 26, 0.95)',
          backdropFilter: 'blur(10px)',
          zIndex: 60,
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#FFF', margin: 0 }}>🌌 Constellation Catalog</h2>
            <button onClick={() => setShowCatalog(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: '#FFF', fontWeight: 900, cursor: 'pointer' }}>✕</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CONSTELLATIONS.map((constellation, idx) => {
              const isSelected = level === idx;
              return (
                <button
                  key={idx}
                  onClick={() => { setLevel(idx); setActiveStar(0); setShowCatalog(false); }}
                  style={{
                    background: isSelected ? 'linear-gradient(135deg, #FFD54F, #FF9100)' : 'rgba(255,255,255,0.1)',
                    border: isSelected ? '3px solid #FFF' : '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '16px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    color: isSelected ? '#090314' : '#FFF',
                    fontWeight: 900,
                    fontSize: '16px'
                  }}
                  type="button"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '28px' }}>{constellation.emoji}</span>
                    <span>{constellation.name}</span>
                  </div>
                  <span style={{ fontSize: '13px', opacity: 0.8 }}>{constellation.stars.length} Stars</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}

const POTION_RECIPES = [
  { name: 'Purple Dragon Elixir', colors: ['red', 'blue'], resultHex: '#9C27B0', emoji: '🔮' },
  { name: 'Orange Sunfire Brew', colors: ['red', 'yellow'], resultHex: '#FF9800', emoji: '🔥' },
  { name: 'Green Emerald Tonic', colors: ['blue', 'yellow'], resultHex: '#4CAF50', emoji: '🧪' },
  { name: 'Pink Fairy Sparkle', colors: ['red', 'white'], resultHex: '#FF80AB', emoji: '✨' },
  { name: 'Sky Frost Essence', colors: ['blue', 'white'], resultHex: '#81D4FA', emoji: '❄️' },
  { name: 'Lemon Star Potion', colors: ['yellow', 'white'], resultHex: '#FFF59D', emoji: '⭐' },
  { name: 'Shadow Obsidian Brew', colors: ['red', 'black'], resultHex: '#880E4F', emoji: '🌒' },
  { name: 'Deep Cosmic Navy', colors: ['blue', 'black'], resultHex: '#1A237E', emoji: '🌌' },
  { name: 'Ancient Olive Potion', colors: ['yellow', 'black'], resultHex: '#827717', emoji: '🌿' },
  { name: 'Mystic Silver Mist', colors: ['white', 'black'], resultHex: '#9E9E9E', emoji: '🌫️' },
];

function CauldronGame({ onBack, onEarn }) {
  const [level, setLevel] = useState(0);
  const [potionsBrewed, setPotionsBrewed] = useState(0);
  const [added, setAdded] = useState([]);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  useEffect(() => { scoreRef.current = score; }, [score]);

  const target = POTION_RECIPES[(level + potionsBrewed) % POTION_RECIPES.length];

  const addColor = (color) => {
    if (added.length >= 2) return;
    if (typeof playPopSound === 'function') playPopSound();

    // Speak color for learning
    try {
      if (typeof speak === 'function') speak(color);
    } catch (e) { }

    const next = [...added, color];
    setAdded(next);

    if (next.length === 2) {
      const isMatch = target.colors.every(c => next.includes(c));
      if (isMatch) {
        if (typeof playSuccessSound === 'function') playSuccessSound();
        setScore(s => s + 50);
        if (onEarn) onEarn(25, 1);
        const nextBrewed = potionsBrewed + 1;
        setPotionsBrewed(nextBrewed);
        setTimeout(() => {
          if (nextBrewed % 4 === 0) {
            setLevel(l => l + 1);
          }
          setAdded([]);
        }, 2200);
      } else {
        if (typeof playErrorSound === 'function') playErrorSound();
        setTimeout(() => {
          setAdded([]);
        }, 1400);
      }
    }
  };

  const getLiquidColor = () => {
    if (added.length === 0) return '#2E1C40';
    if (added.length === 1) {
      if (added[0] === 'red') return '#FF5252';
      if (added[0] === 'blue') return '#4FC3F7';
      if (added[0] === 'yellow') return '#FFD54F';
      if (added[0] === 'white') return '#FFFFFF';
      if (added[0] === 'black') return '#424242';
    }
    const mixedRecipe = POTION_RECIPES.find(r => r.colors.every(c => added.includes(c)));
    return mixedRecipe ? mixedRecipe.resultHex : '#4E342E';
  };

  const isComplete = added.length === 2 && target.colors.every(c => added.includes(c));
  const liquidColor = getLiquidColor();

  return (
    <div id="cauldron-game" className="screen active" style={{
      background: 'linear-gradient(180deg, #1B0B2E 0%, #2A0845 50%, #12002B 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      touchAction: 'none'
    }}>

      {/* Wizard Tent Canopy Ambient Background */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', fontSize: '44px', opacity: 0.5 }}>⛺</div>
      <div style={{ position: 'absolute', top: '12%', right: '8%', fontSize: '44px', opacity: 0.5 }}>🧙‍♂️</div>
      <div style={{ position: 'absolute', top: '22%', left: '15%', fontSize: '20px' }}>✨</div>
      <div style={{ position: 'absolute', top: '28%', right: '20%', fontSize: '24px' }}>🌟</div>

      {/* Top Header Banner */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        background: 'linear-gradient(180deg, #4A148C 0%, #311B92 100%)',
        padding: '16px 20px 14px',
        borderBottom: '5px solid #FFD54F',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.2)',
          border: '2px solid rgba(255,255,255,0.4)',
          borderRadius: '16px',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#FFF',
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
        }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFD54F' }}>Arcane Observatory</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>⛺</span> Wizard's Tent
          </div>
        </div>

        <div style={{
          background: 'rgba(0,0,0,0.3)',
          border: '1.5px solid rgba(255,213,79,0.6)',
          borderRadius: '999px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontWeight: 900,
          color: '#FFD54F',
          fontSize: '16px'
        }}>
          ⭐ {score}
        </div>
      </div>

      {/* Target Spell Recipe Card */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        margin: '12px 16px 4px',
        background: 'rgba(18, 0, 43, 0.92)',
        borderRadius: '999px',
        padding: '12px 20px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #FFD54F',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📖 Brew {target.emoji}</span>
          <span style={{
            color: target.resultHex === '#FFF59D' ? '#FFEE58' : target.resultHex,
            textShadow: `0 0 12px ${target.resultHex}`,
            fontWeight: 900,
            textDecoration: 'underline'
          }}>{target.name}</span>!
        </div>
      </div>

      {/* Wizard Cauldron Laboratory Stage */}
      <div style={{ flex: 1, padding: '10px 20px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 5 }}>

        {/* Magic Aura */}
        <div style={{
          position: 'absolute',
          top: '15%',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: `radial-gradient(circle at 50% 50%, ${liquidColor}88 0%, transparent 70%)`,
          filter: 'blur(20px)',
          transition: 'all 0.5s ease',
          pointerEvents: 'none'
        }} />

        {/* Bubbles / Spell Explosion on Match */}
        {isComplete && (
          <div style={{
            position: 'absolute',
            top: '18%',
            fontSize: '56px',
            animation: 'bounce-idle 1s infinite',
            filter: 'drop-shadow(0 0 20px #FFD54F)',
            zIndex: 10
          }}>
            {target.emoji} ✨
          </div>
        )}

        {/* 3D Black Iron Wizard Cauldron */}
        <div style={{ position: 'relative', width: '220px', height: '190px', margin: '20px 0 30px' }}>
          {/* Cauldron Liquid Surface */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '16px',
            right: '16px',
            height: '46px',
            background: liquidColor,
            borderRadius: '50%',
            zIndex: 3,
            boxShadow: `inset 0 -6px 12px rgba(0,0,0,0.4), 0 0 ${isComplete ? '40px' : '15px'} ${liquidColor}`,
            transition: 'all 0.4s ease',
            border: '4px solid #37474F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: '20px', opacity: 0.8 }}>🧪</div>
          </div>

          {/* Black Iron Pot */}
          <div style={{
            position: 'absolute',
            top: '32px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 35% 35%, #424242 0%, #151515 80%)',
            borderRadius: '50% 50% 40% 40% / 40% 40% 60% 60%',
            zIndex: 2,
            boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 -10px 20px rgba(0,0,0,0.8)',
            border: '2px solid #546E7A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: '32px', opacity: 0.6, marginTop: '20px' }}>🌟</div>
          </div>
        </div>

        {/* Magic Color Potion Bottles */}
        <div style={{ width: '100%', maxWidth: '340px' }}>
          <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 900, color: '#FFD54F', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
            Select 2 Magic Ingredients:
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { id: 'red', name: 'Ruby', color: '#FF5252', emoji: '🔴' },
              { id: 'blue', name: 'Sapphire', color: '#4FC3F7', emoji: '🔵' },
              { id: 'yellow', name: 'Sunfire', color: '#FFD54F', emoji: '🟡' },
              { id: 'white', name: 'Moonlight', color: '#FFFFFF', emoji: '⚪' },
              { id: 'black', name: 'Obsidian', color: '#424242', emoji: '🖤' }
            ].map(ing => {
              const isSelected = added.includes(ing.id);
              return (
                <button
                  key={ing.id}
                  onClick={() => addColor(ing.id)}
                  disabled={added.length >= 2}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px',
                    background: isSelected ? 'rgba(255,213,79,0.3)' : 'rgba(255,255,255,0.08)',
                    border: isSelected ? '3px solid #FFD54F' : `2px solid ${ing.color}`,
                    borderRadius: '20px',
                    padding: '10px 14px',
                    cursor: added.length >= 2 ? 'default' : 'pointer',
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    boxShadow: isSelected ? '0 0 20px #FFD54F' : '0 4px 12px rgba(0,0,0,0.2)'
                  }}
                  type="button"
                >
                  <span style={{ fontSize: '28px' }}>{ing.emoji}</span>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#FFF' }}>{ing.name}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

const HOPPER_LEVELS = [
  { name: 'Level 1 • Numbers 1 to 10 🔢', sequence: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], distractors: ['12', '15', '0', '99', '7', '4', '11'] },
  { name: 'Level 2 • Phonics Vowels 🔤', sequence: ['A', 'E', 'I', 'O', 'U'], distractors: ['B', 'C', 'D', 'F', 'G', 'H', 'J'] },
  { name: 'Level 3 • Skip Counting by 2s ✌️', sequence: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20'], distractors: ['3', '5', '7', '9', '11', '13'] },
  { name: 'Level 4 • Safari Animals 🐾', sequence: ['Panda 🐼', 'Lion 🦁', 'Fox 🦊', 'Bunny 🐰', 'Koala 🐨'], distractors: ['Car 🚗', 'Star ⭐', 'Book 📚'] },
  { name: 'Level 5 • Rainbow Colors 🎨', sequence: ['Red 🔴', 'Blue 🔵', 'Green 🟢', 'Yellow 🟡', 'Violet 🔮'], distractors: ['Rock 🪨', 'Hat 🎩', 'Door 🚪'] },
  { name: 'Level 6 • Alphabet A to Z 🔡', sequence: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'], distractors: ['Z', 'X', 'Y', 'W', 'V'] },
  { name: 'Level 7 • Skip Counting by 5s 🖐️', sequence: ['5', '10', '15', '20', '25', '30'], distractors: ['7', '12', '18', '22', '29'] },
  { name: 'Level 8 • Short CVC Words 📖', sequence: ['CAT 🐱', 'DOG 🐶', 'SUN ☀️', 'FOX 🦊', 'PEN 🖊️'], distractors: ['BOX 📦', 'HAT 🎩', 'BUG 🐛'] },
  { name: 'Level 9 • Shapes & Gems 🌟', sequence: ['Star ⭐', 'Heart ❤️', 'Circle 🔴', 'Diamond 💎', 'Moon 🌙'], distractors: ['Spoon 🥄', 'Cup 🥤', 'Tree 🌳'] },
  { name: 'Level 10 • Sky Citadel Master 🏆', sequence: ['10', '20', '30', '40', '50', '100 ⭐'], distractors: ['15', '25', '35', '45', '55'] }
];

function CloudHopperGame({ onBack, onEarn, onComplete }) {
  const [level, setLevel] = useState(() => {
    try {
      const saved = localStorage.getItem('cloud_stairs_saved_level');
      return saved !== null ? parseInt(saved, 10) || 0 : 0;
    } catch (e) {
      return 0;
    }
  });

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showLevelMap, setShowLevelMap] = useState(false);
  const [selectedCloudIdx, setSelectedCloudIdx] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('cloud_stairs_saved_level', level.toString());
    } catch (e) { }
  }, [level]);

  const current = HOPPER_LEVELS[level % HOPPER_LEVELS.length];
  const isComplete = step >= current.sequence.length;
  const currentTarget = current.sequence[step];

  const choices = useMemo(() => {
    if (!currentTarget) return [];
    const pool = current.distractors.filter(d => d !== currentTarget);
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const d1 = shuffledPool[0] || '1';
    const d2 = shuffledPool[1] || '2';
    return [currentTarget, d1, d2].sort(() => 0.5 - Math.random());
  }, [level, step, currentTarget]);

  const handleCloudClick = (val, choiceIdx) => {
    if (val === currentTarget) {
      if (typeof playPopSound === 'function') playPopSound();
      if (typeof speak === 'function') speak(val);
      setSelectedCloudIdx(choiceIdx);
      setScore(s => s + 15);
      if (onEarn) onEarn(10, 5);

      setTimeout(() => {
        setSelectedCloudIdx(null);
        setStep(s => s + 1);
        if (step + 1 >= current.sequence.length) {
          if (typeof playSuccessSound === 'function') playSuccessSound();
        }
      }, 400);
    } else {
      if (typeof playErrorSound === 'function') playErrorSound();
      if (typeof speak === 'function') speak('Try another cloud!');
    }
  };

  const handleNextLevel = () => {
    setLevel(l => l + 1);
    setStep(0);
  };

  const selectLevel = (idx) => {
    setLevel(idx);
    setStep(0);
    setShowLevelMap(false);
  };

  return (
    <div id="cloud-hopper-game" className="screen active" style={{
      background: 'linear-gradient(180deg, #0288D1 0%, #29B6F6 40%, #81D4FA 80%, #E1F5FE 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      touchAction: 'none'
    }}>

      {/* Decorative Sky Background */}
      <div style={{ position: 'absolute', top: '4%', right: '8%', fontSize: '64px', filter: 'drop-shadow(0 0 20px rgba(255,235,59,0.9))' }}>☀️</div>
      <div style={{ position: 'absolute', top: '10%', left: '4%', fontSize: '80px', opacity: 0.5 }}>☁️</div>
      <div style={{ position: 'absolute', top: '18%', right: '15%', fontSize: '70px', opacity: 0.4 }}>☁️</div>

      {/* Top Header Banner */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        background: 'linear-gradient(180deg, #0288D1 0%, #01579B 100%)',
        padding: '16px 20px 14px',
        borderBottom: '5px solid #FFD54F',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.2)',
          border: '2px solid rgba(255,255,255,0.4)',
          borderRadius: '16px',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#FFF',
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
        }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFD54F' }}>Sky Staircase</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🌤️</span> Cloud Stairs
          </div>
        </div>

        <button onClick={() => setShowLevelMap(true)} style={{
          background: 'rgba(255,213,79,0.3)',
          border: '1.5px solid #FFD54F',
          borderRadius: '999px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontWeight: 900,
          color: '#FFD54F',
          fontSize: '14px',
          cursor: 'pointer'
        }} type="button">
          🗺️ Levels
        </button>
      </div>

      {/* Target Learning Goal Banner */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        margin: '12px 16px 4px',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '999px',
        padding: '10px 20px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '2px solid #FFF'
      }}>
        <div style={{ fontSize: '15px', fontWeight: 900, color: '#01579B', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#0288D1', background: '#E1F5FE', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>Lvl {level + 1}</span>
          <span>{current.name}</span>
        </div>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#0288D1', background: '#E1F5FE', padding: '4px 12px', borderRadius: '12px' }}>
          Step {Math.min(step + 1, current.sequence.length)} / {current.sequence.length}
        </div>
      </div>

      {/* Main Sky Castle & Ascending Platform Stage */}
      <div style={{ flex: 1, padding: '10px 16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', zIndex: 5 }}>

        {/* Sky Castle Goal at Top */}
        <div style={{
          alignSelf: 'center',
          fontSize: '56px',
          filter: isComplete ? 'drop-shadow(0 0 24px #FFD54F)' : 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))',
          transform: isComplete ? 'scale(1.2)' : 'scale(1)',
          transition: 'all 0.4s ease',
          zIndex: 10,
          marginTop: '4px'
        }}>
          🏰
        </div>

        {/* Step Prompt Indicator */}
        {!isComplete && (
          <div style={{ background: '#FFF', borderRadius: '20px', padding: '10px 20px', margin: '0 auto', textAlign: 'center', fontWeight: 900, color: '#0277BD', border: '2px solid #81D4FA', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            Hop on Cloud: <strong style={{ color: '#E65100', fontSize: '20px', marginLeft: '6px' }}>{currentTarget}</strong> 🌤️
          </div>
        )}

        {/* Dynamic 3-Cloud Choice Platform Tier */}
        {!isComplete && (
          <div style={{
            display: 'flex',
            justify: 'space-around',
            alignItems: 'center',
            width: '100%',
            gap: '10px',
            position: 'relative',
            marginTop: 'auto',
            marginBottom: '20px'
          }}>
            {choices.map((val, idx) => {
              const isSelected = selectedCloudIdx === idx;
              return (
                <div key={`${step}-${idx}-${val}`} style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Cute Dragon Hopper on Active Selected Cloud */}
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      top: '-48px',
                      fontSize: '48px',
                      animation: 'bounce-idle 0.6s infinite',
                      filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.3))',
                      zIndex: 20
                    }}>
                      🐲
                    </div>
                  )}

                  <button
                    onClick={() => handleCloudClick(val, idx)}
                    style={{
                      width: '100%',
                      maxWidth: '110px',
                      height: '70px',
                      background: isSelected ? 'linear-gradient(180deg, #FFF9C4 0%, #FFF176 100%)' : 'linear-gradient(180deg, #FFFFFF 0%, #E0F7FA 100%)',
                      borderRadius: '32px',
                      border: isSelected ? '4px solid #FFD54F' : '3px solid #FFF',
                      boxShadow: isSelected ? '0 0 24px #FFD54F, 0 10px 20px rgba(0,0,0,0.2)' : '0 8px 16px rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                      transform: isSelected ? 'scale(1.15) translateY(-10px)' : 'scale(1)',
                      transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                    type="button"
                  >
                    <div style={{ position: 'absolute', width: '36px', height: '36px', background: '#FFF', borderRadius: '50%', top: '-14px', left: '10px', zIndex: 1 }} />
                    <div style={{ position: 'absolute', width: '42px', height: '42px', background: '#FFF', borderRadius: '50%', top: '-16px', right: '10px', zIndex: 1 }} />

                    <span style={{
                      position: 'relative',
                      zIndex: 3,
                      fontSize: '18px',
                      fontWeight: 900,
                      color: isSelected ? '#E65100' : '#0277BD',
                      textAlign: 'center'
                    }}>
                      {val}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Sky Level Selector Modal */}
      {showLevelMap && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(2, 119, 189, 0.95)',
          backdropFilter: 'blur(10px)',
          zIndex: 60,
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#FFF', margin: 0 }}>🗺️ Select Sky Level</h2>
            <button onClick={() => setShowLevelMap(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: '#FFF', fontWeight: 900, cursor: 'pointer' }}>✕</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {HOPPER_LEVELS.map((lvl, idx) => {
              const isSelected = level === idx;
              return (
                <button
                  key={idx}
                  onClick={() => selectLevel(idx)}
                  style={{
                    background: isSelected ? 'linear-gradient(135deg, #FFD54F, #FF9100)' : 'rgba(255,255,255,0.15)',
                    border: isSelected ? '3px solid #FFF' : '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '16px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    color: isSelected ? '#090314' : '#FFF',
                    fontWeight: 900,
                    fontSize: '16px'
                  }}
                  type="button"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '13px', background: isSelected ? '#090314' : 'rgba(255,255,255,0.2)', color: isSelected ? '#FFD54F' : '#FFF', padding: '2px 8px', borderRadius: '8px' }}>Lvl {idx + 1}</span>
                    <span>{lvl.name}</span>
                  </div>
                  <span>{isSelected ? '▶️ Playing' : '☁️ Start'}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sky Castle Victory Celebration */}
      {isComplete && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(1, 87, 155, 0.92)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '80px', marginBottom: '16px', animation: 'bounce-idle 1s infinite' }}>🏰</div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#FFD54F', marginBottom: '8px' }}>Sky Castle Reached!</h2>
          <p style={{ fontSize: '18px', color: '#E1F5FE', fontWeight: 800, marginBottom: '32px' }}>
            Mastered Level {level + 1}: {current.name}!
          </p>
          <button
            onClick={() => {
              if (onComplete) onComplete(100, 50, 1);
              handleNextLevel();
            }}
            style={{
              background: 'linear-gradient(135deg, #FFD54F, #FF923C)',
              border: 'none',
              borderRadius: '32px',
              padding: '16px 44px',
              fontSize: '20px',
              fontWeight: 900,
              color: '#090314',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(255,213,79,0.4)'
            }}
            type="button"
          >
            Next Staircase Level 🚀
          </button>
        </div>
      )}

    </div>
  );
}

function MathDefenderGame({ player, onBack, onComplete, onEarn, onLoss }) {
  const [gameState, setGameState] = useState('intro'); // 'intro', 'playing', 'gameover', 'victory'
  const [difficulty, setDifficulty] = useState('normal'); // 'easy', 'normal', 'hard'
  const [health, setHealth] = useState(3);
  const [maxHealth, setMaxHealth] = useState(3);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [mana, setMana] = useState(50);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [screenFlash, setScreenFlash] = useState(null); // 'freeze', 'heal', 'zap', 'damage'
  const [heroAngle, setHeroAngle] = useState(0); // -25deg, 0deg, 25deg for lane targeting
  const [isCasting, setIsCasting] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState([]); // [{ id, text, x, y, color }]

  // Stats tracking
  const [stats, setStats] = useState({ total: 0, correct: 0, wrong: 0, spellsUsed: 0 });

  // Enemies state: list of active monsters
  const [enemies, setEnemies] = useState([]);
  const [selectedEnemyId, setSelectedEnemyId] = useState(null);
  const [bolts, setBolts] = useState([]); // active laser bolts [{ id, startX, startY, endX, endY, color }]
  const [explosions, setExplosions] = useState([]); // [{ id, x, y, emoji }]

  const LANES = [20, 50, 80]; // percentage positions for lanes 0, 1, 2
  const EMOJI_TYPES = {
    goblin: ['🧟', '👺', '🕷️', '🦂'],
    bat: ['🦇', '🐺', '🦅'],
    dragon: ['🐉', '👾', '👹'],
    boss: ['👑🐉', '👹🔥', '👾⚡']
  };

  // High score persistence
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('math_defender_highscore') || '0', 10);
    } catch (e) {
      return 0;
    }
  });

  // Web Audio Synth Generator for rich sound effects
  const playSynthSFX = (type) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'cast') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'hit') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'combo') {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.05 + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.05);
          osc.stop(ctx.currentTime + idx * 0.05 + 0.15);
        });
      } else if (type === 'wrong') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(250, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'freeze') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(1400, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'shield') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'zap') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'victory') {
        const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        chord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
          gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.08);
          osc.stop(ctx.currentTime + i * 0.08 + 0.4);
        });
      }
    } catch (e) {
      // Audio fallback
    }
  };

  // Generate dynamic math problem according to level & difficulty
  const createMathProblem = (lvl) => {
    let ops = ['+'];
    if (lvl >= 2) ops.push('-');
    if (lvl >= 3) ops.push('*');
    if (lvl >= 5) ops.push('/');

    if (difficulty === 'hard') {
      if (lvl >= 2) ops.push('*');
      if (lvl >= 4) ops.push('/');
    }

    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, ans;

    const diffMult = difficulty === 'easy' ? 0.7 : difficulty === 'hard' ? 1.4 : 1.0;

    if (op === '+') {
      a = Math.floor(Math.random() * Math.max(8, (8 + lvl * 3) * diffMult)) + 1;
      b = Math.floor(Math.random() * Math.max(8, (8 + lvl * 3) * diffMult)) + 1;
      ans = a + b;
    } else if (op === '-') {
      a = Math.floor(Math.random() * Math.max(10, (10 + lvl * 3) * diffMult)) + 5;
      b = Math.floor(Math.random() * (a - 1)) + 1;
      ans = a - b;
    } else if (op === '*') {
      a = Math.floor(Math.random() * Math.max(3, (3 + Math.floor(lvl / 2)) * diffMult)) + 2;
      b = Math.floor(Math.random() * Math.max(5, (6 + Math.floor(lvl / 2)) * diffMult)) + 2;
      ans = a * b;
    } else if (op === '/') {
      ans = Math.floor(Math.random() * Math.max(4, (4 + Math.floor(lvl / 2)) * diffMult)) + 2;
      b = Math.floor(Math.random() * Math.max(3, (3 + Math.floor(lvl / 3)) * diffMult)) + 2;
      a = ans * b;
    }

    // Generate 3 clever distractors
    const options = [ans];
    while (options.length < 4) {
      let delta = Math.floor(Math.random() * 7) - 3;
      if (delta === 0) delta = Math.random() > 0.5 ? 1 : -1;
      const wrong = ans + delta;
      if (wrong >= 0 && !options.includes(wrong)) {
        options.push(wrong);
      }
    }
    options.sort(() => Math.random() - 0.5);

    return { q: `${a} ${op === '*' ? '×' : op === '/' ? '÷' : op} ${b}`, ans, options };
  };

  // Spawn new monster
  const spawnMonster = (lvl) => {
    const lane = Math.floor(Math.random() * 3);
    let type = 'goblin';
    let hp = 1;

    // Boss levels
    if (lvl % 5 === 0 && Math.random() > 0.3) {
      type = 'boss';
      hp = 3;
    } else if (lvl >= 4 && Math.random() > 0.6) {
      type = 'dragon';
      hp = 2;
    } else if (lvl >= 2 && Math.random() > 0.5) {
      type = 'bat';
      hp = 1;
    }

    const emojiList = EMOJI_TYPES[type];
    const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
    const problem = createMathProblem(lvl);

    return {
      id: Date.now() + Math.random(),
      lane,
      y: 0,
      problem,
      type,
      hp,
      maxHp: hp,
      emoji,
      frozen: false,
      speedMult: type === 'bat' ? 1.3 : type === 'dragon' ? 0.75 : type === 'boss' ? 0.6 : 1.0
    };
  };

  // Add floating combat text
  const addFloatingText = (text, x, y, color = '#FFD54F') => {
    const id = Date.now() + Math.random();
    setFloatingTexts(prev => [...prev, { id, text, x, y, color }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== id));
    }, 1000);
  };

  // Trigger screen flash effect
  const triggerFlash = (color) => {
    setScreenFlash(color);
    setTimeout(() => setScreenFlash(null), 300);
  };

  // Start new game
  const startGame = () => {
    setHealth(3);
    setMaxHealth(3);
    setScore(0);
    setLevel(1);
    setMana(50);
    setCombo(0);
    setMaxCombo(0);
    setStats({ total: 0, correct: 0, wrong: 0, spellsUsed: 0 });
    const initialMonster = spawnMonster(1);
    setEnemies([initialMonster]);
    setSelectedEnemyId(initialMonster.id);
    setGameState('playing');
  };

  // Main game tick: update enemy positions & handle spawns
  useEffect(() => {
    if (gameState !== 'playing') return;

    const baseSpeed = Math.max(0.2, 0.45 + level * 0.06);
    const tickInterval = 50; // ms

    const interval = setInterval(() => {
      setEnemies(prevEnemies => {
        let reachedWall = false;
        const nextEnemies = prevEnemies.map(enemy => {
          if (enemy.frozen) return enemy;
          const newY = enemy.y + baseSpeed * enemy.speedMult;
          if (newY >= 75) {
            reachedWall = true;
            return { ...enemy, y: 75, reached: true };
          }
          return { ...enemy, y: newY };
        });

        if (reachedWall) {
          playSynthSFX('wrong');
          setHealth(h => {
            const nextH = h - 1;
            if (nextH <= 0) {
              setGameState('gameover');
            }
            return nextH;
          });
          setShaking(true);
          triggerFlash('rgba(255, 92, 92, 0.3)');
          setTimeout(() => setShaking(false), 500);

          // Filter out breached monsters & spawn replacements
          const remaining = nextEnemies.filter(e => !e.reached);
          if (remaining.length === 0) {
            const fresh = spawnMonster(level);
            setSelectedEnemyId(fresh.id);
            return [fresh];
          }
          setSelectedEnemyId(remaining[0].id);
          return remaining;
        }

        return nextEnemies;
      });
    }, tickInterval);

    return () => clearInterval(interval);
  }, [gameState, level]);

  // Periodic monster spawner for horde feel at higher levels
  useEffect(() => {
    if (gameState !== 'playing') return;
    const maxMonsters = Math.min(3, 1 + Math.floor(level / 3));

    const spawnTimer = setInterval(() => {
      setEnemies(prev => {
        if (prev.length < maxMonsters) {
          const newMonster = spawnMonster(level);
          if (!selectedEnemyId) setSelectedEnemyId(newMonster.id);
          return [...prev, newMonster];
        }
        return prev;
      });
    }, Math.max(3000, 7000 - level * 400));

    return () => clearInterval(spawnTimer);
  }, [gameState, level, selectedEnemyId]);

  // Target active enemy (lowest enemy on screen)
  const targetEnemy = enemies.find(e => e.id === selectedEnemyId) || enemies[0];

  // Handle answer click or keypress
  const handleAnswer = (chosenOpt) => {
    if (gameState !== 'playing' || !targetEnemy) return;

    setStats(s => ({ ...s, total: s.total + 1 }));

    // Aim hero staff at target lane
    const targetLaneIdx = targetEnemy.lane;
    setHeroAngle(targetLaneIdx === 0 ? -25 : targetLaneIdx === 2 ? 25 : 0);
    setIsCasting(true);
    setTimeout(() => setIsCasting(false), 200);

    if (chosenOpt === targetEnemy.problem.ans) {
      // Correct Answer!
      playSynthSFX('cast');

      // Create magic bolt visual
      const boltId = Date.now() + Math.random();
      const startX = LANES[1]; // center castle top
      const endX = LANES[targetEnemy.lane];
      const endY = targetEnemy.y;

      setBolts(prev => [...prev, { id: boltId, startX, endX, endY, color: '#B28DFF' }]);
      setTimeout(() => {
        setBolts(prev => prev.filter(b => b.id !== boltId));
      }, 250);

      // Hit effect after bolt hits
      setTimeout(() => {
        playSynthSFX('hit');
        const explosionId = Date.now() + Math.random();
        setExplosions(prev => [...prev, { id: explosionId, x: endX, y: endY, emoji: targetEnemy.emoji }]);
        setTimeout(() => {
          setExplosions(prev => prev.filter(ex => ex.id !== explosionId));
        }, 300);

        // Check if enemy has HP remaining (Boss/Dragon)
        if (targetEnemy.hp > 1) {
          addFloatingText('HIT! -1 HP', endX, endY, '#FF6B8B');
          setEnemies(prev => prev.map(e => e.id === targetEnemy.id ? { ...e, hp: e.hp - 1, problem: createMathProblem(level) } : e));
        } else {
          // Defeated!
          const newCombo = combo + 1;
          setCombo(newCombo);
          if (newCombo > maxCombo) setMaxCombo(newCombo);

          const comboBonus = Math.floor(newCombo / 3) * 5;
          const earnedScore = 10 + comboBonus;
          const newScore = score + earnedScore;
          setScore(newScore);

          // Update High score
          if (newScore > highScore) {
            setHighScore(newScore);
            try { localStorage.setItem('math_defender_highscore', newScore.toString()); } catch (e) {}
          }

          // Add mana
          setMana(m => Math.min(100, m + 15 + newCombo * 2));
          setStats(s => ({ ...s, correct: s.correct + 1 }));

          if (newCombo > 2) {
            playSynthSFX('combo');
            addFloatingText(`COMBO x${newCombo}! +${earnedScore}`, endX, endY, '#FFD54F');
          } else {
            addFloatingText(`+${earnedScore} PTS`, endX, endY, '#6BFFB8');
          }

          if (typeof onEarn === 'function') onEarn(5, 0);

          // Remove monster & progress level
          setEnemies(prev => {
            const nextList = prev.filter(e => e.id !== targetEnemy.id);
            if (nextList.length === 0) {
              const fresh = spawnMonster(level);
              setSelectedEnemyId(fresh.id);
              return [fresh];
            }
            setSelectedEnemyId(nextList[0].id);
            return nextList;
          });

          // Level up check every 5 monsters
          if ((stats.correct + 1) % 5 === 0) {
            const nextLvl = level + 1;
            if (nextLvl > 10) {
              playSynthSFX('victory');
              setGameState('victory');
            } else {
              setLevel(nextLvl);
              addFloatingText(`LEVEL ${nextLvl} UNLOCKED!`, 50, 40, '#8A6BFF');
              if (typeof onEarn === 'function') onEarn(0, 1);
            }
          }
        }
      }, 200);

    } else {
      // Wrong Answer!
      playSynthSFX('wrong');
      setCombo(0);
      setStats(s => ({ ...s, wrong: s.wrong + 1 }));
      setShaking(true);
      addFloatingText('MISS!', LANES[targetEnemy.lane], targetEnemy.y, '#FF5C5C');
      setTimeout(() => setShaking(false), 400);
    }
  };

  // Keyboard shortcut listener (Keys 1-4 for options, Q, W, E for spells)
  useEffect(() => {
    if (gameState !== 'playing' || !targetEnemy) return;

    const handleKeyDown = (e) => {
      const options = targetEnemy.problem.options;
      if (e.key === '1' && options[0] !== undefined) handleAnswer(options[0]);
      else if (e.key === '2' && options[1] !== undefined) handleAnswer(options[1]);
      else if (e.key === '3' && options[2] !== undefined) handleAnswer(options[2]);
      else if (e.key === '4' && options[3] !== undefined) handleAnswer(options[3]);
      else if (e.key.toLowerCase() === 'q') castSpell('freeze');
      else if (e.key.toLowerCase() === 'w') castSpell('shield');
      else if (e.key.toLowerCase() === 'e') castSpell('zap');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, targetEnemy, mana]);

  // Cast Power-up Spells
  const castSpell = (spellType) => {
    if (gameState !== 'playing') return;

    if (spellType === 'freeze') {
      if (mana < 30) { addFloatingText('NEED 30 MANA!', 50, 70, '#FF5C5C'); return; }
      setMana(m => m - 30);
      playSynthSFX('freeze');
      triggerFlash('rgba(107, 220, 255, 0.3)');
      setStats(s => ({ ...s, spellsUsed: s.spellsUsed + 1 }));
      addFloatingText('❄️ FROST NOVA!', 50, 40, '#6BCBFF');

      setEnemies(prev => prev.map(e => ({ ...e, frozen: true })));
      setTimeout(() => {
        setEnemies(prev => prev.map(e => ({ ...e, frozen: false })));
      }, 4000);

    } else if (spellType === 'shield') {
      if (mana < 50) { addFloatingText('NEED 50 MANA!', 50, 70, '#FF5C5C'); return; }
      setMana(m => m - 50);
      playSynthSFX('shield');
      triggerFlash('rgba(178, 141, 255, 0.3)');
      setStats(s => ({ ...s, spellsUsed: s.spellsUsed + 1 }));
      setHealth(h => Math.min(maxHealth, h + 1));
      addFloatingText('🛡️ BARRIER HEAL +1 ❤️', 50, 70, '#B28DFF');

    } else if (spellType === 'zap') {
      if (mana < 40) { addFloatingText('NEED 40 MANA!', 50, 70, '#FF5C5C'); return; }
      if (!targetEnemy) return;

      setMana(m => m - 40);
      playSynthSFX('zap');
      triggerFlash('rgba(255, 213, 79, 0.3)');
      setStats(s => ({ ...s, spellsUsed: s.spellsUsed + 1 }));
      addFloatingText('⚡ CHAIN LIGHTNING!', LANES[targetEnemy.lane], targetEnemy.y, '#FFD54F');

      // Auto solve target enemy
      handleAnswer(targetEnemy.problem.ans);
    }
  };

  // Hearts UI renderer
  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < maxHealth; i++) {
      hearts.push(
        <span key={i} style={{
          opacity: i < health ? 1 : 0.25,
          fontSize: '26px',
          filter: i < health ? 'drop-shadow(0 0 10px rgba(255,50,50,0.8))' : 'none',
          transition: 'all 0.3s'
        }}>
          ❤️
        </span>
      );
    }
    return hearts;
  };

  return (
    <div className="screen active" style={{
      background: 'radial-gradient(circle at top, #2C1B4D 0%, #0F0A20 100%)',
      color: '#fff',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      overflow: 'hidden',
      width: '100%',
      height: '100%'
    }}>

      {/* Screen flash overlay for spells & damage */}
      {screenFlash && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: screenFlash,
          zIndex: 99,
          pointerEvents: 'none',
          transition: 'opacity 0.2s'
        }} />
      )}

      {/* Starry Sky & Nebula */}
      <div style={{ position: 'absolute', top: '8%', left: '15%', width: '4px', height: '4px', background: '#fff', borderRadius: '50%', boxShadow: '0 0 10px #fff' }} />
      <div style={{ position: 'absolute', top: '22%', left: '82%', width: '3px', height: '3px', background: '#fff', borderRadius: '50%', boxShadow: '0 0 8px #fff' }} />
      <div style={{ position: 'absolute', top: '35%', left: '25%', width: '5px', height: '5px', background: '#FFD54F', borderRadius: '50%', boxShadow: '0 0 12px #FFD54F' }} />

      {/* Background Castle Silhouette */}
      <div style={{ position: 'absolute', bottom: '25%', left: '50%', transform: 'translateX(-50%)', fontSize: '240px', opacity: 0.08, zIndex: 0, pointerEvents: 'none', filter: 'blur(2px)' }}>🏰</div>

      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', zIndex: 10, background: 'rgba(15,10,32,0.6)', backdropFilter: 'blur(10px)' }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '16px',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* High score badge */}
          <div style={{ background: 'rgba(255,213,79,0.15)', border: '1px solid rgba(255,213,79,0.4)', borderRadius: '20px', padding: '6px 14px', fontSize: '14px', fontWeight: 800, color: '#FFD54F', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🏆</span> {score} <span style={{ opacity: 0.6, fontSize: '11px' }}>({highScore})</span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {renderHearts()}
          </div>
        </div>
      </div>

      {/* INTRO SCREEN */}
      {gameState === 'intro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '90px', marginBottom: '16px', filter: 'drop-shadow(0 0 40px rgba(138,107,255,0.8))', animation: 'bounce-idle 2s infinite ease-in-out' }}>🧙‍♂️🏰</div>
          <h1 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '12px', background: 'linear-gradient(180deg, #FFD54F 0%, #FF9E5E 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}>Math Defender</h1>
          <p style={{ fontSize: '16px', color: '#C1C5D6', marginBottom: '28px', maxWidth: '85%', lineHeight: 1.5 }}>
            Cast magical equations to destroy advancing monster hordes! Unleash <b>Frost Nova</b>, <b>Aegis Shield</b> & <b>Chain Lightning</b> spells.
          </p>

          {/* Difficulty selector */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
            {['easy', 'normal', 'hard'].map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                style={{
                  background: difficulty === d ? 'linear-gradient(135deg, #8A6BFF, #6B4EE0)' : 'rgba(255,255,255,0.08)',
                  border: difficulty === d ? '2px solid #FFD54F' : '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '16px',
                  padding: '10px 20px',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  boxShadow: difficulty === d ? '0 0 16px rgba(138,107,255,0.6)' : 'none'
                }}
                type="button"
              >
                {d === 'easy' ? '🟢 Easy' : d === 'normal' ? '🟡 Normal' : '🔴 Hard'}
              </button>
            ))}
          </div>

          <button
            onClick={startGame}
            style={{
              background: 'linear-gradient(135deg, #FF6B8B, #FF8E53)',
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: '32px',
              padding: '20px 56px',
              fontSize: '24px',
              fontWeight: 900,
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 12px 32px rgba(255,107,139,0.5), inset 0 2px 8px rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              transform: 'scale(1)',
              transition: 'transform 0.2s'
            }}
            type="button"
          >
            ⚔️ Defend Castle
          </button>
        </div>
      )}

      {/* PLAYING SCREEN */}
      {gameState === 'playing' && (
        <>
          {/* Status Header Bar (Level, Mana & Combo) */}
          <div style={{ padding: '0 20px 10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
            {/* Level Badge */}
            <div style={{ background: 'linear-gradient(90deg, #8A6BFF, #FF6B8B)', borderRadius: '999px', padding: '6px 20px', fontSize: '16px', fontWeight: 900, color: '#FFF', boxShadow: '0 4px 16px rgba(138,107,255,0.5)' }}>
              Level {level}
            </div>

            {/* Combo Meter */}
            {combo > 1 && (
              <div style={{ background: 'linear-gradient(90deg, #FFD54F, #FF9E5E)', borderRadius: '999px', padding: '6px 16px', fontSize: '15px', fontWeight: 900, color: '#1A0F2E', animation: 'bounce-idle 0.6s infinite alternate' }}>
                🔥 COMBO x{combo}!
              </div>
            )}

            {/* Mana Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 900, color: '#6BCBFF' }}>⚡ MANA</span>
              <div style={{ width: '100px', height: '14px', background: 'rgba(0,0,0,0.5)', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(107,203,255,0.5)' }}>
                <div style={{ width: `${mana}%`, height: '100%', background: 'linear-gradient(90deg, #00D2FF, #3A7BD5)', transition: 'width 0.3s' }} />
              </div>
            </div>
          </div>

          {/* Spell Power-Up Bar (Q, W, E) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', padding: '4px 20px 8px 20px', zIndex: 10 }}>
            <button
              onClick={() => castSpell('freeze')}
              style={{
                background: mana >= 30 ? 'linear-gradient(135deg, #00C6FF, #0072FF)' : 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(0,198,255,0.6)',
                borderRadius: '16px',
                padding: '8px 14px',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 800,
                cursor: mana >= 30 ? 'pointer' : 'not-allowed',
                opacity: mana >= 30 ? 1 : 0.4,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: mana >= 30 ? '0 4px 12px rgba(0,198,255,0.4)' : 'none'
              }}
              type="button"
            >
              <span>❄️ Frost (30)</span> <span style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '6px', fontSize: '10px' }}>[Q]</span>
            </button>

            <button
              onClick={() => castSpell('shield')}
              style={{
                background: mana >= 50 ? 'linear-gradient(135deg, #B28DFF, #8A6BFF)' : 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(178,141,255,0.6)',
                borderRadius: '16px',
                padding: '8px 14px',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 800,
                cursor: mana >= 50 ? 'pointer' : 'not-allowed',
                opacity: mana >= 50 ? 1 : 0.4,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: mana >= 50 ? '0 4px 12px rgba(178,141,255,0.4)' : 'none'
              }}
              type="button"
            >
              <span>🛡️ Shield (50)</span> <span style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '6px', fontSize: '10px' }}>[W]</span>
            </button>

            <button
              onClick={() => castSpell('zap')}
              style={{
                background: mana >= 40 ? 'linear-gradient(135deg, #FFD54F, #FF9E5E)' : 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,213,79,0.6)',
                borderRadius: '16px',
                padding: '8px 14px',
                color: mana >= 40 ? '#1A0F2E' : '#fff',
                fontSize: '13px',
                fontWeight: 800,
                cursor: mana >= 40 ? 'pointer' : 'not-allowed',
                opacity: mana >= 40 ? 1 : 0.4,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: mana >= 40 ? '0 4px 12px rgba(255,213,79,0.4)' : 'none'
              }}
              type="button"
            >
              <span>⚡ Zap (40)</span> <span style={{ background: 'rgba(0,0,0,0.3)', color: '#fff', padding: '2px 6px', borderRadius: '6px', fontSize: '10px' }}>[E]</span>
            </button>
          </div>

          {/* MAIN 3D BATTLEFIELD CANVAS AREA */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', perspective: '800px' }}>
            {/* Background 3D Floor & Grid */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%, #3B2A6B 0%, #1A1A3A 40%, #0B0B1A 100%)', zIndex: -2 }} />
            <div style={{
              position: 'absolute',
              bottom: '-20%',
              left: '-20%',
              width: '140%',
              height: '120%',
              background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 40px, transparent 40px, transparent 80px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 40px, transparent 40px, transparent 80px)',
              transform: 'rotateX(60deg)',
              transformOrigin: 'top center',
              zIndex: -1,
              boxShadow: 'inset 0 100px 100px #0B0B1A'
            }} />

            {/* 3 Lane Marker Lines */}
            <div style={{ position: 'absolute', top: 0, bottom: '25%', left: '33%', width: '2px', background: 'linear-gradient(180deg, transparent, rgba(138,107,255,0.3), transparent)', zIndex: 1 }} />
            <div style={{ position: 'absolute', top: 0, bottom: '25%', left: '66%', width: '2px', background: 'linear-gradient(180deg, transparent, rgba(138,107,255,0.3), transparent)', zIndex: 1 }} />

            {/* Castle Wall at bottom */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '24%',
              background: 'linear-gradient(180deg, #1A1A2A 0%, #0D0D15 100%)',
              transform: shaking ? 'translateY(8px)' : 'translateY(0)',
              transition: 'transform 0.05s',
              zIndex: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.8)'
            }}>
              {/* Barrier Line */}
              <div style={{
                width: '100%',
                height: '4px',
                background: '#B28DFF',
                boxShadow: '0 0 25px 8px rgba(178,141,255,0.7), inset 0 0 10px #fff',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2
              }} />

              {/* Hero Mage standing on castle wall */}
              <div style={{
                position: 'absolute',
                top: '-55px',
                left: '50%',
                transform: `translateX(-50%) rotate(${heroAngle}deg)`,
                transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                fontSize: '52px',
                zIndex: 6,
                filter: isCasting ? 'drop-shadow(0 0 24px #B28DFF)' : 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))'
              }}>
                🧙‍♂️
              </div>
            </div>

            {/* ACTIVE ENEMIES */}
            {enemies.map(enemy => {
              const isSelected = enemy.id === targetEnemy?.id;
              return (
                <div
                  key={enemy.id}
                  onClick={() => setSelectedEnemyId(enemy.id)}
                  style={{
                    position: 'absolute',
                    top: `${enemy.y}%`,
                    left: `${LANES[enemy.lane]}%`,
                    transform: 'translateX(-50%)',
                    cursor: 'pointer',
                    transition: 'top 0.05s linear',
                    zIndex: isSelected ? 8 : 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  {/* Math equation bubble above monster */}
                  <div style={{
                    background: isSelected ? 'linear-gradient(135deg, #1A0F2E, #2A1A4A)' : 'rgba(0,0,0,0.8)',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    fontSize: '26px',
                    fontWeight: 900,
                    color: isSelected ? '#FFD54F' : '#FFF',
                    marginBottom: '8px',
                    border: isSelected ? '3px solid #FFD54F' : '2px solid rgba(255,255,255,0.3)',
                    boxShadow: isSelected ? '0 0 25px rgba(255,213,79,0.7)' : '0 4px 12px rgba(0,0,0,0.5)',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {enemy.frozen && <span>❄️</span>}
                    <span>{enemy.problem.q} = ?</span>
                  </div>

                  {/* HP Hearts bar for Boss / Armored enemies */}
                  {enemy.maxHp > 1 && (
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                      {Array.from({ length: enemy.maxHp }).map((_, i) => (
                        <div key={i} style={{ width: '12px', height: '6px', borderRadius: '4px', background: i < enemy.hp ? '#FF5C5C' : 'rgba(255,255,255,0.2)' }} />
                      ))}
                    </div>
                  )}

                  {/* Monster Sprite */}
                  <div style={{
                    fontSize: enemy.type === 'boss' ? '72px' : '54px',
                    animation: enemy.frozen ? 'none' : 'bounce-idle 1s infinite alternate ease-in-out',
                    filter: enemy.frozen
                      ? 'drop-shadow(0 0 20px #00C6FF) hue-rotate(180deg)'
                      : isSelected
                        ? 'drop-shadow(0 0 20px rgba(255,92,92,0.9))'
                        : 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))'
                  }}>
                    {enemy.emoji}
                  </div>
                </div>
              );
            })}

            {/* MAGIC BOLTS */}
            {bolts.map(b => (
              <div
                key={b.id}
                style={{
                  position: 'absolute',
                  bottom: '120px',
                  left: `${b.startX}%`,
                  width: '8px',
                  height: '100%',
                  background: `linear-gradient(0deg, ${b.color}, #FFF)`,
                  boxShadow: `0 0 30px 10px ${b.color}`,
                  transform: `translateX(-50%) rotate(${b.endX > b.startX ? 15 : b.endX < b.startX ? -15 : 0}deg)`,
                  zIndex: 7,
                  borderRadius: '999px',
                  animation: 'bolt-shoot-new 0.25s ease-out forwards'
                }}
              />
            ))}

            {/* EXPLOSIONS */}
            {explosions.map(ex => (
              <div
                key={ex.id}
                style={{
                  position: 'absolute',
                  top: `${ex.y}%`,
                  left: `${ex.x}%`,
                  transform: 'translateX(-50%)',
                  fontSize: '70px',
                  zIndex: 9,
                  animation: 'pop-in 0.3s ease-out'
                }}
              >
                💥
              </div>
            ))}

            {/* FLOATING COMBAT TEXT */}
            {floatingTexts.map(ft => (
              <div
                key={ft.id}
                style={{
                  position: 'absolute',
                  top: `${ft.y}%`,
                  left: `${ft.x}%`,
                  transform: 'translateX(-50%)',
                  fontSize: '22px',
                  fontWeight: 900,
                  color: ft.color,
                  textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                  zIndex: 10,
                  animation: 'float-up 1s ease-out forwards',
                  pointerEvents: 'none'
                }}
              >
                {ft.text}
              </div>
            ))}

            <style>{`
              @keyframes bolt-shoot-new {
                0% { height: 0; opacity: 1; }
                100% { height: 400px; opacity: 0; }
              }
              @keyframes bounce-idle {
                0% { transform: translateY(0); }
                100% { transform: translateY(-12px); }
              }
              @keyframes float-up {
                0% { opacity: 1; transform: translate(-50%, 0); }
                100% { opacity: 0; transform: translate(-50%, -40px); }
              }
              @keyframes pop-in {
                0% { transform: translate(-50%, 0) scale(0.3); opacity: 1; }
                100% { transform: translate(-50%, 0) scale(1.4); opacity: 0; }
              }
            `}</style>
          </div>

          {/* RUNIC SPELL CONTROLS (2x2 Answer Grid) */}
          <div style={{
            padding: '18px 20px 24px 20px',
            background: 'rgba(26,19,37,0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '2px solid rgba(255,255,255,0.15)',
            zIndex: 10
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {targetEnemy?.problem.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  style={{
                    background: 'linear-gradient(180deg, #4A3382 0%, #2A1A4A 100%)',
                    border: '2px solid rgba(138,107,255,0.6)',
                    borderRadius: '20px',
                    padding: '20px',
                    fontSize: '32px',
                    fontWeight: 900,
                    color: '#FFF',
                    textShadow: '0 0 12px rgba(138,107,255,0.8)',
                    cursor: 'pointer',
                    boxShadow: '0 6px 0 #1A0F2E, 0 10px 16px rgba(0,0,0,0.6), inset 0 2px 10px rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    transition: 'all 0.1s'
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'translateY(4px)';
                    e.currentTarget.style.boxShadow = '0 2px 0 #1A0F2E, inset 0 2px 10px rgba(255,255,255,0.2)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 0 #1A0F2E, 0 10px 16px rgba(0,0,0,0.6), inset 0 2px 10px rgba(255,255,255,0.2)';
                  }}
                  type="button"
                >
                  {/* Keybinding Badge */}
                  <span style={{
                    position: 'absolute',
                    top: '8px',
                    left: '12px',
                    fontSize: '12px',
                    fontWeight: 800,
                    color: 'rgba(255,255,255,0.5)',
                    background: 'rgba(0,0,0,0.3)',
                    padding: '2px 8px',
                    borderRadius: '8px'
                  }}>
                    [{i + 1}]
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* GAME OVER SCREEN */}
      {gameState === 'gameover' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '80px', marginBottom: '16px' }}>💥🏰</div>
          <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#FF5C5C', marginBottom: '8px', textShadow: '0 4px 12px rgba(255,92,92,0.4)' }}>Castle Breached!</h2>
          <p style={{ fontSize: '18px', color: '#C1C5D6', marginBottom: '24px' }}>The monster horde overwhelmed the magical barrier.</p>

          {/* Performance Stats Card */}
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '24px', padding: '20px 32px', marginBottom: '32px', display: 'flex', gap: '28px' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#A0A5B5', fontWeight: 700 }}>SCORE</div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#FFD54F' }}>{score}</div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#A0A5B5', fontWeight: 700 }}>ACCURACY</div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#6BCBFF' }}>
                {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
              </div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#A0A5B5', fontWeight: 700 }}>MAX COMBO</div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#FF8E53' }}>{maxCombo}x</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => onLoss ? onLoss(startGame) : startGame()}
              style={{ background: 'linear-gradient(135deg, #FF5C5C, #D32F2F)', border: 'none', borderRadius: '32px', padding: '16px 36px', fontSize: '18px', fontWeight: 900, color: '#fff', cursor: 'pointer', boxShadow: '0 8px 24px rgba(255,92,92,0.4)' }}
              type="button"
            >
              🔄 Defend Again
            </button>
            <button
              onClick={() => onLoss ? onLoss(onBack) : onBack()}
              style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '32px', padding: '16px 36px', fontSize: '18px', fontWeight: 800, color: '#fff', cursor: 'pointer' }}
              type="button"
            >
              🗺️ Retreat to Map
            </button>
          </div>
        </div>
      )}

      {/* VICTORY SCREEN */}
      {gameState === 'victory' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '90px', marginBottom: '16px', filter: 'drop-shadow(0 0 40px rgba(255,213,79,0.9))', animation: 'bounce-idle 2s infinite ease-in-out' }}>🏆👑</div>
          <h2 style={{ fontSize: '42px', fontWeight: 900, color: '#FFD54F', marginBottom: '8px', textShadow: '0 4px 16px rgba(255,213,79,0.5)' }}>Victory! Castle Saved!</h2>
          <p style={{ fontSize: '18px', color: '#FFF', marginBottom: '24px', fontWeight: 600 }}>You vanquished all monster waves!</p>

          {/* Stars rating */}
          <div style={{ fontSize: '48px', marginBottom: '24px', display: 'flex', gap: '12px' }}>
            <span>⭐</span>
            <span style={{ opacity: stats.correct / Math.max(1, stats.total) >= 0.7 ? 1 : 0.25 }}>⭐</span>
            <span style={{ opacity: health === 3 ? 1 : 0.25 }}>⭐</span>
          </div>

          {/* Performance Stats Card */}
          <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,213,79,0.4)', borderRadius: '24px', padding: '20px 36px', marginBottom: '36px', display: 'flex', gap: '32px' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#A0A5B5', fontWeight: 700 }}>FINAL SCORE</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#FFD54F' }}>{score}</div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#A0A5B5', fontWeight: 700 }}>ACCURACY</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#6BFFB8' }}>
                {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
              </div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#A0A5B5', fontWeight: 700 }}>MAX COMBO</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#FF8E53' }}>{maxCombo}x</div>
            </div>
          </div>

          <button
            onClick={() => onComplete(150, 100, 3)}
            style={{
              background: 'linear-gradient(135deg, #FFD54F, #FF9E5E)',
              border: 'none',
              borderRadius: '32px',
              padding: '20px 52px',
              fontSize: '22px',
              fontWeight: 900,
              color: '#1A0F2E',
              cursor: 'pointer',
              boxShadow: '0 12px 32px rgba(255,158,94,0.5), inset 0 2px 8px rgba(255,255,255,0.4)'
            }}
            type="button"
          >
            🎁 Claim +150 Coins & +100 XP
          </button>
        </div>
      )}
    </div>
  );
}

function AsteroidBlasterGame({ player, onBack, onComplete, onLoss }) {
  const [status, setStatus] = React.useState('intro'); // 'intro', 'playing', 'gameover', 'victory'
  const [difficulty, setDifficulty] = React.useState('normal'); // 'easy', 'normal', 'hard'
  const [score, setScore] = React.useState(0);
  const [level, setLevel] = React.useState(1);
  const [health, setHealth] = React.useState(3);
  const [maxHealth, setMaxHealth] = React.useState(3);
  const [energy, setEnergy] = React.useState(0); // 0 to 100 overcharge
  const [combo, setCombo] = React.useState(0);
  const [maxCombo, setMaxCombo] = React.useState(0);
  const [shaking, setShaking] = React.useState(false);
  const [screenFlash, setScreenFlash] = React.useState(null);
  const [rocketX, setRocketX] = React.useState(50);

  // Power-up Active Durations (in ms)
  const [tripleShotTimer, setTripleShotTimer] = React.useState(0);
  const [hasShield, setHasShield] = React.useState(false);
  const [superBeamActive, setSuperBeamActive] = React.useState(false);

  // Stats
  const [stats, setStats] = React.useState({ totalShots: 0, hits: 0, destroyed: 0, powerups: 0 });

  // Floating combat text & particles
  const [floatingTexts, setFloatingTexts] = React.useState([]);

  // High score persistence
  const [highScore, setHighScore] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem('asteroid_blaster_highscore') || '0', 10);
    } catch (e) {
      return 0;
    }
  });

  // Mutable Game Entities in useRef to run smooth requestAnimationFrame loop
  const entitiesRef = React.useRef({
    asteroids: [],
    lasers: [],
    particles: [],
    powerups: [],
    lastSpawn: 0,
    lastFire: 0,
    keys: { left: false, right: false, space: false }
  });

  const [, setTick] = React.useState(0);

  // Procedural Web Audio SFX Generator
  const playSynthSFX = (type) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'laser') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'superbeam') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      } else if (type === 'shatter') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'powerup') {
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.04);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.04 + 0.12);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.04);
          osc.stop(ctx.currentTime + idx * 0.04 + 0.12);
        });
      } else if (type === 'shieldHit') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'victory') {
        const chord = [523.25, 659.25, 783.99, 1046.50];
        chord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
          gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.07 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.07);
          osc.stop(ctx.currentTime + i * 0.07 + 0.35);
        });
      }
    } catch (e) {
      // Audio fallback
    }
  };

  // Add floating combat text
  const addFloatingText = (text, x, y, color = '#FFD54F') => {
    const id = Date.now() + Math.random();
    setFloatingTexts(prev => [...prev, { id, text, x, y, color }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== id));
    }, 1000);
  };

  // Screen flash trigger
  const triggerFlash = (color) => {
    setScreenFlash(color);
    setTimeout(() => setScreenFlash(null), 300);
  };

  // Keyboard navigation & space trigger
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') entitiesRef.current.keys.left = true;
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') entitiesRef.current.keys.right = true;
      if (e.key === ' ' || e.key.toLowerCase() === 'q') {
        e.preventDefault();
        triggerSuperBeam();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') entitiesRef.current.keys.left = false;
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') entitiesRef.current.keys.right = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [energy, status]);

  // Triple shot timer countdown
  React.useEffect(() => {
    if (tripleShotTimer <= 0) return;
    const interval = setInterval(() => {
      setTripleShotTimer(t => Math.max(0, t - 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [tripleShotTimer]);

  // Overcharge Mega Plasma Beam trigger
  const triggerSuperBeam = () => {
    if (status !== 'playing' || energy < 100 || superBeamActive) return;

    setEnergy(0);
    setSuperBeamActive(true);
    playSynthSFX('superbeam');
    triggerFlash('rgba(0, 229, 255, 0.4)');
    addFloatingText('⚡ PLASMA MEGA BEAM!', 50, 50, '#00E5FF');

    // Superbeam destroys all active screen asteroids
    const destroyedCount = entitiesRef.current.asteroids.length;
    entitiesRef.current.asteroids.forEach(a => {
      // Spawn particles
      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2;
        entitiesRef.current.particles.push({
          id: Date.now() + Math.random(),
          x: a.x, y: a.y,
          dx: Math.cos(angle) * 2.5, dy: Math.sin(angle) * 2.5,
          color: '#00E5FF', life: 1.0
        });
      }
    });
    entitiesRef.current.asteroids = [];

    setScore(s => s + destroyedCount * 15);
    setStats(st => ({ ...st, destroyed: st.destroyed + destroyedCount }));

    setTimeout(() => {
      setSuperBeamActive(false);
    }, 1200);
  };

  // Start new game session
  const startGame = () => {
    setScore(0);
    setLevel(1);
    setHealth(3);
    setMaxHealth(3);
    setEnergy(0);
    setCombo(0);
    setMaxCombo(0);
    setTripleShotTimer(0);
    setHasShield(false);
    setSuperBeamActive(false);
    setStats({ totalShots: 0, hits: 0, destroyed: 0, powerups: 0 });
    setRocketX(50);

    entitiesRef.current = {
      asteroids: [],
      lasers: [],
      particles: [],
      powerups: [],
      lastSpawn: Date.now(),
      lastFire: 0,
      keys: { left: false, right: false, space: false }
    };
    setStatus('playing');
  };

  // Main game tick loop (requestAnimationFrame)
  React.useEffect(() => {
    let animId;

    const gameLoop = () => {
      if (status === 'playing') {
        const now = Date.now();
        const entities = entitiesRef.current;

        // 1. Move Rocket via Keyboard
        let rx = rocketX;
        if (entities.keys.left) rx = Math.max(8, rx - 1.8);
        if (entities.keys.right) rx = Math.min(92, rx + 1.8);
        if (rx !== rocketX) setRocketX(rx);

        // 2. Auto Cannon firing
        const fireInterval = tripleShotTimer > 0 ? 120 : 160;
        if (now - entities.lastFire > fireInterval && !superBeamActive) {
          entities.lastFire = now;
          playSynthSFX('laser');
          setStats(st => ({ ...st, totalShots: st.totalShots + (tripleShotTimer > 0 ? 3 : 1) }));

          if (tripleShotTimer > 0) {
            entities.lasers.push(
              { id: now + Math.random(), x: rx, y: 82, vx: 0, vy: -3.5, color: '#FFD54F', width: '5px' },
              { id: now + Math.random() + 1, x: rx - 2, y: 82, vx: -0.6, vy: -3.3, color: '#FF9E5E', width: '4px' },
              { id: now + Math.random() + 2, x: rx + 2, y: 82, vx: 0.6, vy: -3.3, color: '#FF9E5E', width: '4px' }
            );
          } else {
            entities.lasers.push({
              id: now + Math.random(), x: rx, y: 82, vx: 0, vy: -3.5, color: '#69F0AE', width: '6px'
            });
          }
        }

        // 3. Spawn Asteroids & Space Hazards
        const diffMult = difficulty === 'easy' ? 0.75 : difficulty === 'hard' ? 1.3 : 1.0;
        const spawnInterval = Math.max(400, (1100 - (level * 70)) / diffMult);

        if (now - entities.lastSpawn > spawnInterval && entities.asteroids.length < 8 + level * 2) {
          entities.lastSpawn = now;
          const isBossLevel = level % 5 === 0;
          const isUFO = !isBossLevel && level >= 3 && Math.random() > 0.75;
          const isComet = !isBossLevel && level >= 2 && Math.random() > 0.6;
          const isBoss = isBossLevel && entities.asteroids.filter(a => a.type === 'boss').length === 0;

          let type = 'rock';
          let emoji = '🪨';
          let hp = 1;
          let speed = (0.28 + level * 0.05 + Math.random() * 0.3) * diffMult;
          let dx = (Math.random() - 0.5) * 0.3;

          if (isBoss) {
            type = 'boss';
            emoji = '👾';
            hp = 12 + level * 3;
            speed = 0.1;
            dx = 0.5;
          } else if (isUFO) {
            type = 'ufo';
            emoji = '🛸';
            hp = 2;
            speed = 0.22;
            dx = (Math.random() > 0.5 ? 0.7 : -0.7);
          } else if (isComet) {
            type = 'comet';
            emoji = '☄️';
            hp = 1;
            speed = 0.55 * diffMult;
          }

          entities.asteroids.push({
            id: now + Math.random(),
            x: Math.random() * 80 + 10,
            y: -10,
            speed,
            dx,
            type,
            hp,
            maxHp: hp,
            emoji
          });
        }

        // 4. Update Laser Positions
        entities.lasers.forEach(l => {
          l.y += l.vy;
          l.x += l.vx;
        });
        entities.lasers = entities.lasers.filter(l => l.y > -10 && l.x >= 0 && l.x <= 100);

        // 5. Update Asteroids
        let hitPlayerDamage = 0;
        entities.asteroids.forEach(a => {
          a.y += a.speed;
          a.x += a.dx;

          if (a.x <= 5 || a.x >= 95) {
            a.dx *= -1;
          }

          // Check Player Collision
          if (a.y >= 80 && a.y <= 92 && Math.abs(a.x - rx) < 8) {
            a.y = 120; // Destroy asteroid on crash
            hitPlayerDamage += 1;
          }
        });

        // Remove off-screen & crashed asteroids
        entities.asteroids = entities.asteroids.filter(a => a.y <= 100);

        // Handle Player Damage
        if (hitPlayerDamage > 0) {
          if (hasShield) {
            setHasShield(false);
            playSynthSFX('shieldHit');
            triggerFlash('rgba(0, 229, 255, 0.4)');
            addFloatingText('🛡️ SHIELD ABSORBED IMPACT!', rx, 80, '#00E5FF');
          } else {
            playSynthSFX('shatter');
            setShaking(true);
            setCombo(0);
            triggerFlash('rgba(255, 92, 92, 0.4)');
            setTimeout(() => setShaking(false), 500);

            setHealth(h => {
              const nextH = h - hitPlayerDamage;
              if (nextH <= 0) setStatus('gameover');
              return Math.max(0, nextH);
            });
          }
        }

        // 6. Laser vs Asteroid Collisions
        const newParticles = [];
        const newPowerups = [];

        entities.asteroids = entities.asteroids.filter(a => {
          let destroyed = false;

          entities.lasers = entities.lasers.filter(l => {
            if (destroyed) return true;
            const dist = Math.hypot(a.x - l.x, a.y - l.y);

            if (dist < (a.type === 'boss' ? 12 : 7)) {
              a.hp -= 1;
              setStats(st => ({ ...st, hits: st.hits + 1 }));

              // Hit particles
              newParticles.push({
                id: Date.now() + Math.random(),
                x: a.x, y: a.y,
                dx: (Math.random() - 0.5) * 1.5,
                dy: (Math.random() - 0.5) * 1.5,
                color: l.color, life: 0.8
              });

              if (a.hp <= 0) {
                destroyed = true;
                playSynthSFX('shatter');

                // Explosion particles
                for (let i = 0; i < (a.type === 'boss' ? 16 : 8); i++) {
                  const angle = (i / 8) * Math.PI * 2;
                  newParticles.push({
                    id: Date.now() + Math.random() + i,
                    x: a.x, y: a.y,
                    dx: Math.cos(angle) * (a.type === 'boss' ? 3 : 1.8),
                    dy: Math.sin(angle) * (a.type === 'boss' ? 3 : 1.8),
                    color: a.type === 'boss' ? '#FF5C5C' : '#FF9E5E', life: 1.0
                  });
                }

                // Chance to drop power-up orb
                if (Math.random() > 0.7 || a.type === 'boss') {
                  const pTypes = ['energy', 'triple', 'shield'];
                  const pType = pTypes[Math.floor(Math.random() * pTypes.length)];
                  newPowerups.push({
                    id: Date.now() + Math.random(),
                    x: a.x, y: a.y,
                    speed: 0.25,
                    type: pType,
                    emoji: pType === 'energy' ? '💎' : pType === 'triple' ? '⚡' : '🛡️'
                  });
                }

                // Combo & Score updates
                const earnedPts = a.type === 'boss' ? 150 : a.type === 'ufo' ? 40 : 20;
                setScore(sc => {
                  const newSc = sc + earnedPts;
                  if (newSc > highScore) {
                    setHighScore(newSc);
                    try { localStorage.setItem('asteroid_blaster_highscore', newSc.toString()); } catch (e) {}
                  }

                  // Sector progression check
                  const requiredScore = level * 100;
                  if (newSc >= requiredScore) {
                    if (level >= 10) {
                      playSynthSFX('victory');
                      setStatus('victory');
                    } else {
                      setLevel(lvl => lvl + 1);
                      addFloatingText(`SECTOR ${level + 1} UNLOCKED!`, 50, 40, '#FFD54F');
                    }
                  }

                  return newSc;
                });

                setCombo(cb => {
                  const nCb = cb + 1;
                  if (nCb > maxCombo) setMaxCombo(nCb);
                  return nCb;
                });

                // Overcharge Energy charge (+8 per kill)
                setEnergy(eg => Math.min(100, eg + (a.type === 'boss' ? 40 : 8)));
                setStats(st => ({ ...st, destroyed: st.destroyed + 1 }));

                addFloatingText(`+${earnedPts}`, a.x, a.y, '#FFD54F');
              }
              return false; // Consume laser bolt
            }
            return true;
          });

          return !destroyed;
        });

        // 7. Update & Collect Power-Up Orbs
        entities.powerups.forEach(p => { p.y += p.speed; });
        entities.powerups = entities.powerups.filter(p => {
          if (p.y >= 80 && p.y <= 92 && Math.abs(p.x - rx) < 8) {
            // Powerup Collected!
            playSynthSFX('powerup');
            setStats(st => ({ ...st, powerups: st.powerups + 1 }));

            if (p.type === 'energy') {
              setEnergy(eg => Math.min(100, eg + 35));
              addFloatingText('💎 +35 ENERGY!', rx, 75, '#00E5FF');
            } else if (p.type === 'triple') {
              setTripleShotTimer(10000); // 10s triple shot
              addFloatingText('⚡ TRIPLE SPREAD SHOT!', rx, 75, '#FFD54F');
            } else if (p.type === 'shield') {
              setHasShield(true);
              addFloatingText('🛡️ SHIELD MATRIX ACTIVE!', rx, 75, '#B28DFF');
            }
            return false;
          }
          return p.y <= 100;
        });

        // 8. Update Particles
        newParticles.forEach(p => entities.particles.push(p));
        newPowerups.forEach(p => entities.powerups.push(p));

        entities.particles.forEach(p => {
          p.x += p.dx;
          p.y += p.dy;
          p.life -= 0.04;
        });
        entities.particles = entities.particles.filter(p => p.life > 0);

        setTick(t => t + 1);
      }

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [status, level, difficulty, rocketX, tripleShotTimer, hasShield, superBeamActive]);

  // Pointer & Touch position tracker
  const handlePointerMove = (e) => {
    if (status !== 'playing') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setRocketX(Math.max(6, Math.min(94, x)));
  };

  // Render Hearts
  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < maxHealth; i++) {
      hearts.push(
        <span key={i} style={{
          opacity: i < health ? 1 : 0.25,
          fontSize: '24px',
          filter: i < health ? 'drop-shadow(0 0 8px rgba(255,50,50,0.8))' : 'none',
          transition: 'all 0.3s'
        }}>
          ❤️
        </span>
      );
    }
    return hearts;
  };

  const entities = entitiesRef.current;

  return (
    <div
      className="screen active"
      onPointerMove={handlePointerMove}
      onTouchMove={(e) => handlePointerMove(e.touches[0])}
      style={{
        background: 'radial-gradient(circle at center, #2B1B54 0%, #0B041C 100%)',
        color: '#fff',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      {/* Flash overlay */}
      {screenFlash && (
        <div style={{ position: 'absolute', inset: 0, background: screenFlash, zIndex: 99, pointerEvents: 'none', transition: 'opacity 0.2s' }} />
      )}

      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', zIndex: 10, background: 'rgba(11,4,28,0.6)', backdropFilter: 'blur(10px)' }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '16px',
          width: '44px', height: '44px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(255,158,94,0.15)', border: '1px solid rgba(255,158,94,0.4)', borderRadius: '20px', padding: '6px 14px', fontSize: '14px', fontWeight: 800, color: '#FF9E5E', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🏆</span> {score} <span style={{ opacity: 0.6, fontSize: '11px' }}>({highScore})</span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {renderHearts()}
          </div>
        </div>
      </div>

      {/* INTRO SCREEN */}
      {status === 'intro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '90px', marginBottom: '16px', filter: 'drop-shadow(0 0 40px rgba(255,158,94,0.8))', animation: 'bounce-idle 2s infinite ease-in-out' }}>🚀🛸</div>
          <h1 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '12px', background: 'linear-gradient(180deg, #FF9E5E 0%, #FF5C5C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}>Asteroid Blaster</h1>
          <p style={{ fontSize: '16px', color: '#C1C5D6', marginBottom: '28px', maxWidth: '85%', lineHeight: 1.5 }}>
            Pilot your starship, blast deep space hazards, collect <b>Energy Crystals</b>, and unleash the <b>Overcharge Plasma Beam</b>!
          </p>

          {/* Difficulty selector */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
            {['easy', 'normal', 'hard'].map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                style={{
                  background: difficulty === d ? 'linear-gradient(135deg, #FF9E5E, #FF5C5C)' : 'rgba(255,255,255,0.08)',
                  border: difficulty === d ? '2px solid #FFD54F' : '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '16px',
                  padding: '10px 20px',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  boxShadow: difficulty === d ? '0 0 16px rgba(255,158,94,0.6)' : 'none'
                }}
                type="button"
              >
                {d === 'easy' ? '🟢 Cadet' : d === 'normal' ? '🟡 Captain' : '🔴 Ace Pilot'}
              </button>
            ))}
          </div>

          <button
            onClick={startGame}
            style={{
              background: 'linear-gradient(135deg, #FF9E5E, #FF5C5C)',
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: '32px',
              padding: '20px 56px',
              fontSize: '24px',
              fontWeight: 900,
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 12px 32px rgba(255,92,92,0.5), inset 0 2px 8px rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
            type="button"
          >
            🚀 Launch Mission
          </button>
        </div>
      )}

      {/* PLAYING SCREEN */}
      {status === 'playing' && (
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', transform: shaking ? 'translateY(6px)' : 'none', transition: 'transform 0.05s' }}>

          {/* Sector & Energy Status Header */}
          <div style={{ padding: '0 20px 10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
            {/* Sector Badge */}
            <div style={{ background: 'linear-gradient(90deg, #FF9E5E, #FF5C5C)', borderRadius: '999px', padding: '6px 20px', fontSize: '15px', fontWeight: 900, color: '#FFF', boxShadow: '0 4px 16px rgba(255,158,94,0.5)' }}>
              Sector {level} • Goal: {level * 100} PTS
            </div>

            {/* Active Triple Shot Timer */}
            {tripleShotTimer > 0 && (
              <div style={{ background: 'linear-gradient(90deg, #FFD54F, #FF9E5E)', borderRadius: '999px', padding: '4px 14px', fontSize: '13px', fontWeight: 900, color: '#0B041C', animation: 'bounce-idle 0.6s infinite alternate' }}>
                ⚡ TRIPLE SPREAD ({Math.ceil(tripleShotTimer / 1000)}s)
              </div>
            )}

            {/* Shield Active Badge */}
            {hasShield && (
              <div style={{ background: 'rgba(0,229,255,0.2)', border: '1px solid #00E5FF', borderRadius: '999px', padding: '4px 14px', fontSize: '13px', fontWeight: 900, color: '#00E5FF' }}>
                🛡️ SHIELD MATRIX
              </div>
            )}
          </div>

          {/* Overcharge Beam Trigger Button Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', padding: '4px 20px', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#00E5FF' }}>⚡ OVERCHARGE</span>
              <div style={{ width: '120px', height: '14px', background: 'rgba(0,0,0,0.6)', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(0,229,255,0.5)' }}>
                <div style={{ width: `${energy}%`, height: '100%', background: 'linear-gradient(90deg, #00E5FF, #0072FF)', transition: 'width 0.2s' }} />
              </div>
            </div>

            <button
              onClick={triggerSuperBeam}
              style={{
                background: energy >= 100 ? 'linear-gradient(135deg, #00E5FF, #0072FF)' : 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(0,229,255,0.6)',
                borderRadius: '16px',
                padding: '6px 16px',
                color: energy >= 100 ? '#0B041C' : '#fff',
                fontSize: '13px',
                fontWeight: 900,
                cursor: energy >= 100 ? 'pointer' : 'not-allowed',
                opacity: energy >= 100 ? 1 : 0.4,
                boxShadow: energy >= 100 ? '0 0 20px rgba(0,229,255,0.8)' : 'none'
              }}
              type="button"
            >
              <span>⚡ MEGA BEAM [SPACE]</span>
            </button>
          </div>

          {/* 3D Warp Starfield Background */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at center, #2B1B54 0%, #0B041C 100%)',
            zIndex: -2
          }} />
          <div style={{
            position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
            backgroundImage: 'radial-gradient(circle at 10% 20%, #FFF 1px, transparent 1px), radial-gradient(circle at 80% 40%, #FFF 1.5px, transparent 1px), radial-gradient(circle at 30% 70%, #FFF 2px, transparent 2px)',
            backgroundSize: '100px 100px, 150px 150px, 200px 200px',
            transform: 'rotateX(60deg) translateZ(-100px)',
            animation: 'star-scroll 1.2s linear infinite',
            opacity: 0.5, zIndex: -1
          }} />

          <style>{`
            @keyframes star-scroll {
              0% { background-position: 0 0; }
              100% { background-position: 0 100px; }
            }
            @keyframes beam-pulse {
              0% { opacity: 0.8; width: 60px; }
              100% { opacity: 1.0; width: 90px; }
            }
          `}</style>

          {/* Superbeam Effect */}
          {superBeamActive && (
            <div style={{
              position: 'absolute',
              bottom: '100px',
              left: `${rocketX}%`,
              transform: 'translateX(-50%)',
              width: '80px',
              height: '100%',
              background: 'linear-gradient(0deg, #00E5FF 0%, #FFFFFF 50%, transparent 100%)',
              boxShadow: '0 0 50px 20px #00E5FF, inset 0 0 20px #FFF',
              borderRadius: '999px',
              zIndex: 7,
              animation: 'beam-pulse 0.1s infinite alternate'
            }} />
          )}

          {/* LASERS */}
          {entities.lasers.map(l => (
            <div
              key={l.id}
              style={{
                position: 'absolute',
                top: `${l.y}%`,
                left: `${l.x}%`,
                width: l.width,
                height: '28px',
                background: `linear-gradient(180deg, ${l.color}, #FFF)`,
                borderRadius: '999px',
                transform: 'translate(-50%, -50%)',
                boxShadow: `0 0 16px ${l.color}`,
                zIndex: 5
              }}
            />
          ))}

          {/* POWER-UP ORBS */}
          {entities.powerups.map(p => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                top: `${p.y}%`,
                left: `${p.x}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: '28px',
                filter: 'drop-shadow(0 0 12px #00E5FF)',
                zIndex: 6,
                animation: 'bounce-idle 0.8s infinite alternate ease-in-out'
              }}
            >
              {p.emoji}
            </div>
          ))}

          {/* ASTEROIDS & BOSS ENEMIES */}
          {entities.asteroids.map(a => (
            <div
              key={a.id}
              style={{
                position: 'absolute',
                top: `${a.y}%`,
                left: `${a.x}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {/* Boss HP Bar */}
              {a.type === 'boss' && (
                <div style={{ width: '80px', height: '8px', background: 'rgba(0,0,0,0.6)', borderRadius: '4px', overflow: 'hidden', border: '1px solid #FF5C5C', marginBottom: '4px' }}>
                  <div style={{ width: `${(a.hp / a.maxHp) * 100}%`, height: '100%', background: '#FF5C5C' }} />
                </div>
              )}

              <div style={{
                fontSize: a.type === 'boss' ? '80px' : a.type === 'ufo' ? '52px' : '48px',
                filter: a.type === 'boss'
                  ? 'drop-shadow(0 0 25px rgba(255,92,92,0.9))'
                  : 'drop-shadow(0 8px 16px rgba(0,0,0,0.7))'
              }}>
                {a.emoji}
              </div>
            </div>
          ))}

          {/* PARTICLES */}
          {entities.particles.map(p => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                top: `${p.y}%`,
                left: `${p.x}%`,
                width: '8px',
                height: '8px',
                background: p.color,
                borderRadius: '50%',
                opacity: p.life,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 7
              }}
            />
          ))}

          {/* FLOATING COMBAT TEXT */}
          {floatingTexts.map(ft => (
            <div
              key={ft.id}
              style={{
                position: 'absolute',
                top: `${ft.y}%`,
                left: `${ft.x}%`,
                transform: 'translateX(-50%)',
                fontSize: '20px',
                fontWeight: 900,
                color: ft.color,
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                zIndex: 10,
                pointerEvents: 'none'
              }}
            >
              {ft.text}
            </div>
          ))}

          {/* PLAYER ROCKET SPRITE */}
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              left: `${rocketX}%`,
              transform: 'translateX(-50%)',
              fontSize: '68px',
              zIndex: 8,
              filter: hasShield
                ? 'drop-shadow(0 0 30px #00E5FF)'
                : 'drop-shadow(0 12px 24px rgba(0,176,255,0.7))',
              pointerEvents: 'none'
            }}
          >
            🚀
            {/* Thruster Flame effect */}
            <div style={{
              position: 'absolute',
              bottom: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '14px',
              height: '24px',
              background: 'linear-gradient(180deg, #FFD54F, #FF5C5C)',
              borderRadius: '50%',
              boxShadow: '0 0 16px #FF5C5C',
              animation: 'bounce-idle 0.2s infinite alternate'
            }} />
          </div>
        </div>
      )}

      {/* GAME OVER SCREEN */}
      {status === 'gameover' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '80px', marginBottom: '16px' }}>💥🚀</div>
          <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#FF5C5C', marginBottom: '8px', textShadow: '0 4px 12px rgba(255,92,92,0.4)' }}>Ship Damaged!</h2>
          <p style={{ fontSize: '18px', color: '#C1C5D6', marginBottom: '24px' }}>Deep space hazards overwhelmed your shields.</p>

          {/* Performance Stats Card */}
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '24px', padding: '20px 32px', marginBottom: '32px', display: 'flex', gap: '28px' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#A0A5B5', fontWeight: 700 }}>FINAL SCORE</div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#FF9E5E' }}>{score}</div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#A0A5B5', fontWeight: 700 }}>ACCURACY</div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#00E5FF' }}>
                {stats.totalShots > 0 ? Math.round((stats.hits / stats.totalShots) * 100) : 0}%
              </div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#A0A5B5', fontWeight: 700 }}>MAX COMBO</div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#FFD54F' }}>{maxCombo}x</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => onLoss ? onLoss(startGame) : startGame()}
              style={{ background: 'linear-gradient(135deg, #FF5C5C, #D32F2F)', border: 'none', borderRadius: '32px', padding: '16px 36px', fontSize: '18px', fontWeight: 900, color: '#fff', cursor: 'pointer', boxShadow: '0 8px 24px rgba(255,92,92,0.4)' }}
              type="button"
            >
              🔄 Launch Again
            </button>
            <button
              onClick={() => onLoss ? onLoss(onBack) : onBack()}
              style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '32px', padding: '16px 36px', fontSize: '18px', fontWeight: 800, color: '#fff', cursor: 'pointer' }}
              type="button"
            >
              🗺️ Retreat to Map
            </button>
          </div>
        </div>
      )}

      {/* VICTORY SCREEN */}
      {status === 'victory' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '90px', marginBottom: '16px', filter: 'drop-shadow(0 0 40px rgba(255,158,94,0.9))', animation: 'bounce-idle 2s infinite ease-in-out' }}>🏆🌌</div>
          <h2 style={{ fontSize: '42px', fontWeight: 900, color: '#FFD54F', marginBottom: '8px', textShadow: '0 4px 16px rgba(255,213,79,0.5)' }}>Galaxy Saved!</h2>
          <p style={{ fontSize: '18px', color: '#FFF', marginBottom: '24px', fontWeight: 600 }}>You cleared all 10 sector hazards!</p>

          {/* Stars rating */}
          <div style={{ fontSize: '48px', marginBottom: '24px', display: 'flex', gap: '12px' }}>
            <span>⭐</span>
            <span style={{ opacity: stats.totalShots > 0 && (stats.hits / stats.totalShots) >= 0.5 ? 1 : 0.25 }}>⭐</span>
            <span style={{ opacity: health === 3 ? 1 : 0.25 }}>⭐</span>
          </div>

          {/* Performance Stats Card */}
          <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,158,94,0.4)', borderRadius: '24px', padding: '20px 36px', marginBottom: '36px', display: 'flex', gap: '32px' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#A0A5B5', fontWeight: 700 }}>FINAL SCORE</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#FF9E5E' }}>{score}</div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#A0A5B5', fontWeight: 700 }}>ACCURACY</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#6BFFB8' }}>
                {stats.totalShots > 0 ? Math.round((stats.hits / stats.totalShots) * 100) : 0}%
              </div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#A0A5B5', fontWeight: 700 }}>MAX COMBO</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#FFD54F' }}>{maxCombo}x</div>
            </div>
          </div>

          <button
            onClick={() => onComplete(150, 100, 3)}
            style={{
              background: 'linear-gradient(135deg, #FF9E5E, #FF5C5C)',
              border: 'none',
              borderRadius: '32px',
              padding: '20px 52px',
              fontSize: '22px',
              fontWeight: 900,
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 12px 32px rgba(255,92,92,0.5), inset 0 2px 8px rgba(255,255,255,0.4)'
            }}
            type="button"
          >
            🎁 Claim +150 Coins & +100 XP
          </button>
        </div>
      )}
    </div>
  );
}

function DeepSeaDiverGame({ player, onBack, onComplete, onLoss }) {
  const gameState = React.useRef({
    status: 'intro',
    score: 0,
    level: 1,
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

    if (now - state.lastSpawn > 2200 - Math.min((state.level - 1) * 100 + state.score * 30, 800)) {
      const isShark = state.level >= 4 && Math.random() > 0.7;
      if (isShark) {
        state.obstacles.push({
          id: now, type: 'shark', x: 100, y: 15 + Math.random() * 70, passed: false
        });
      } else {
        const gapSize = Math.max(25, 45 - ((state.level - 1) * 2 + state.score * 1.0));
        const gapTop = 15 + Math.random() * (100 - 30 - gapSize);
        state.obstacles.push({
          id: now, type: 'coral', x: 100, gapTop, gapSize, passed: false
        });
      }
      state.lastSpawn = now;
    }

    state.obstacles.forEach(obs => {
      obs.x -= 0.4 + ((state.level - 1) * 0.05) + (state.score * 0.01);

      if (obs.type === 'shark') {
        if (obs.x < 30 && obs.x > 10) {
          if (Math.abs(state.y - obs.y) < 8) {
            state.status = 'gameover';
          }
        }
      } else {
        if (obs.x < 25 && obs.x > 10) {
          if (state.y < obs.gapTop || state.y > obs.gapTop + (obs.gapSize || 30)) {
            state.status = 'gameover';
          }
        }
      }

      if (obs.x < 10 && !obs.passed) {
        obs.passed = true;
        state.score += 1;
        const requiredScore = 10 + (state.level * 5);
        if (state.score >= requiredScore) {
          if (state.level >= 10) {
            state.status = 'victory';
          } else {
            state.status = 'levelup';
          }
        }
      }
    });

    state.obstacles = state.obstacles.filter(obs => obs.x > -20);
    setRenderTick(t => t + 1);
    requestRef.current = requestAnimationFrame(updateGame);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);

  const handlePointerDown = (e) => {
    if (gameState.current.status !== 'playing') return;
    e.preventDefault();
    gameState.current.velocity = gameState.current.swimForce;
  };

  const startGame = () => {
    gameState.current = {
      status: 'playing', score: 0, level: 1, y: 50, velocity: 0,
      obstacles: [], lastSpawn: Date.now(), gravity: 0.04, swimForce: -1.2
    };
    setRenderTick(t => t + 1);
  };

  const startNextLevel = () => {
    gameState.current = {
      ...gameState.current,
      status: 'playing', score: 0, level: gameState.current.level + 1, y: 50, velocity: 0,
      obstacles: [], lastSpawn: Date.now()
    };
    setRenderTick(t => t + 1);
  };

  const state = gameState.current;

  return (
    <div className="screen active" onPointerDown={handlePointerDown} style={{ background: 'linear-gradient(180deg, #0277BD 0%, #01579B 100%)', color: '#fff', padding: 0, display: 'flex', flexDirection: 'column', position: 'absolute', overflow: 'hidden', width: '100%', height: '100%', userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'none' }}>
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
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', pointerEvents: 'none', perspective: '800px' }}>

          <style>{`
            @keyframes water-scroll {
              0% { background-position: 0 0; }
              100% { background-position: 100px 100px; }
            }
          `}</style>

          {/* 3D Ocean Ceiling */}
          <div style={{
            position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '100%',
            background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 20px, transparent 20px, transparent 40px)',
            backgroundColor: '#0277BD',
            transform: 'rotateX(-75deg)', transformOrigin: 'top center',
            animation: 'water-scroll 4s linear infinite', zIndex: 1, opacity: 0.8
          }} />

          {/* 3D Ocean Floor */}
          <div style={{
            position: 'absolute', bottom: '-50%', left: '-50%', width: '200%', height: '100%',
            background: 'repeating-linear-gradient(90deg, #F57F17 0px, #F57F17 40px, #F9A825 40px, #F9A825 80px)',
            transform: 'rotateX(75deg)', transformOrigin: 'bottom center',
            animation: 'water-scroll 2s linear infinite', zIndex: 1, opacity: 0.9,
            boxShadow: 'inset 0 100px 50px rgba(1,87,155,0.8)'
          }} />

          {/* Bubbles particle effect */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.3,
            backgroundImage: 'radial-gradient(circle at 10% 20%, #FFF 2px, transparent 2px), radial-gradient(circle at 80% 40%, #FFF 3px, transparent 3px), radial-gradient(circle at 30% 70%, #FFF 4px, transparent 4px)',
            backgroundSize: '100px 100px, 150px 150px, 200px 200px',
            animation: 'bounce-idle 4s infinite linear',
            zIndex: 2
          }} />

          <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.4)', padding: '8px 24px', borderRadius: '24px', fontSize: '20px', fontWeight: 900, color: '#81D4FA', border: '1px solid rgba(129,212,250,0.3)', boxShadow: '0 0 12px rgba(0,0,0,0.2)', zIndex: 10 }}>
            Level {state.level} • Passed: {state.score}/{10 + (state.level * 5)}
          </div>

          {state.obstacles.map(obs => {
            if (obs.type === 'shark') {
              return (
                <div key={obs.id} style={{ position: 'absolute', top: `${obs.y}%`, left: `${obs.x}%`, fontSize: '60px', transform: 'translate(-50%, -50%)', zIndex: 6, filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.6))', animation: 'bounce-idle 1s infinite alternate' }}>
                  🦈
                </div>
              );
            } else {
              return (
                <React.Fragment key={obs.id}>
                  {/* Top Coral Pipe */}
                  <div style={{ position: 'absolute', top: 0, left: `${obs.x}%`, width: '12%', height: `${obs.gapTop}%`, background: 'linear-gradient(90deg, #FF7043 0%, #D84315 50%, #BF360C 100%)', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.5), inset 5px 0 10px rgba(255,255,255,0.3), 5px 10px 15px rgba(0,0,0,0.5)', zIndex: 4 }} />
                  {/* Bottom Coral Pipe */}
                  <div style={{ position: 'absolute', top: `${obs.gapTop + (obs.gapSize || 30)}%`, left: `${obs.x}%`, width: '12%', height: `${100 - (obs.gapTop + (obs.gapSize || 30))}%`, background: 'linear-gradient(90deg, #FF7043 0%, #D84315 50%, #BF360C 100%)', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.5), inset 5px 0 10px rgba(255,255,255,0.3), 5px -10px 15px rgba(0,0,0,0.5)', zIndex: 4 }} />
                </React.Fragment>
              );
            }
          })}

          <div style={{ position: 'absolute', top: `${state.y}%`, left: '20%', transform: `translate(-50%, -50%) scaleX(-1) rotate(${-state.velocity * 15}deg)`, fontSize: '50px', zIndex: 6, filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.6))' }}>🐡</div>
        </div>
      )}

      {state.status === 'gameover' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>💫</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#FF5252', marginBottom: '12px' }}>Ouch!</h2>
          <p style={{ fontSize: '20px', color: '#E1F5FE', marginBottom: '40px' }}>You reached Level {state.level}!</p>
          <button onClick={(e) => { e.stopPropagation(); if (onLoss) onLoss(startGame); else startGame(); }} style={{ background: 'linear-gradient(135deg, #29B6F6, #0277BD)', border: 'none', borderRadius: '32px', padding: '20px 48px', fontSize: '20px', fontWeight: 900, color: '#fff', cursor: 'pointer', marginBottom: '16px', zIndex: 20 }} type="button">
            Try Again
          </button>
        </div>
      )}

      {state.status === 'levelup' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '100px', marginBottom: '20px', animation: 'bounce-idle 1s infinite' }}>🐠</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#FFD54F', marginBottom: '12px' }}>Level {state.level} Complete!</h2>
          <p style={{ fontSize: '20px', color: '#FFF8E1', marginBottom: '40px' }}>Dive deeper into Level {state.level + 1}...</p>
          <button onClick={(e) => { e.stopPropagation(); startNextLevel(); }} style={{ background: 'linear-gradient(135deg, #FFB74D, #F57C00)', border: 'none', borderRadius: '32px', padding: '20px 48px', fontSize: '20px', fontWeight: 900, color: '#fff', cursor: 'pointer', marginBottom: '16px', zIndex: 20 }} type="button">
            Next Level
          </button>
        </div>
      )}

      {state.status === 'victory' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '100px', marginBottom: '20px', animation: 'bounce-idle 2s infinite', filter: 'drop-shadow(0 0 40px #0277BD)' }}>🧜‍♀️</div>
          <h2 style={{ fontSize: '40px', fontWeight: 900, color: '#81D4FA', marginBottom: '16px' }}>Ocean Master!</h2>
          <p style={{ fontSize: '20px', color: '#FFF8E1', marginBottom: '40px' }}>You earned +100 Coins & +1 Star!</p>
          <button onClick={() => onComplete(100, 50, 1)} style={{ background: 'linear-gradient(135deg, #29B6F6, #0277BD)', border: 'none', borderRadius: '32px', padding: '20px 48px', fontSize: '22px', fontWeight: 900, color: '#fff', cursor: 'pointer', boxShadow: '0 12px 32px rgba(2,119,189,0.4)', zIndex: 20 }} type="button">
            Claim Rewards
          </button>
        </div>
      )}
    </div>
  );
}

const WORD_FOREST_LEVEL_POOLS = [
  {
    name: 'Level 1 • CVC Phonics Masters',
    targetWords: ['CAT', 'DOG', 'SUN', 'FOX', 'BUS', 'PEN', 'HAT', 'MAP'],
    gems: [
      { type: '🐱', word: 'CAT' },
      { type: '🐶', word: 'DOG' },
      { type: '☀️', word: 'SUN' },
      { type: '🖊️', word: 'PEN' },
      { type: '🦊', word: 'FOX' },
      { type: '🚌', word: 'BUS' },
      { type: '🧢', word: 'HAT' },
      { type: '🗺️', word: 'MAP' }
    ],
    obstacles: [
      { type: '📦', word: 'BOX' },
      { type: '🥤', word: 'CUP' },
      { type: '🕳️', label: 'PIT HOLE' }
    ]
  },
  {
    name: 'Level 2 • Jungle Wildlife & Nature',
    targetWords: ['TREE', 'LEAF', 'FROG', 'BIRD', 'BEAR', 'LION', 'DEER', 'FISH'],
    gems: [
      { type: '🍎', word: 'APPLE' },
      { type: '🌳', word: 'TREE' },
      { type: '🍃', word: 'LEAF' },
      { type: '🐟', word: 'FISH' },
      { type: '🐸', word: 'FROG' },
      { type: '🐦', word: 'BIRD' },
      { type: '🦌', word: 'DEER' },
      { type: '🐻', word: 'BEAR' }
    ],
    obstacles: [
      { type: '🌿', word: 'BUSH' },
      { type: '🍄', word: 'SHROOM' },
      { type: '🐊', word: 'CROC' }
    ]
  },
  {
    name: 'Level 3 • Action & Adventure Verbs',
    targetWords: ['JUMP', 'LEAP', 'DASH', 'SOAR', 'SWIM', 'ROAR', 'FAST', 'HERO'],
    gems: [
      { type: '🦘', word: 'JUMP' },
      { type: '🦅', word: 'SOAR' },
      { type: '⚡', word: 'DASH' },
      { type: '🏊‍♂️', word: 'SWIM' },
      { type: '🦁', word: 'ROAR' },
      { type: '🏃‍♂️', word: 'FAST' },
      { type: '🦸', word: 'HERO' },
      { type: '🌟', word: 'LEAP' }
    ],
    obstacles: [
      { type: '🪵', word: 'LOG' },
      { type: '🐍', word: 'SNAKE' },
      { type: '🌋', word: 'LAVA' }
    ]
  },
  {
    name: 'Level 4 • Star & Magic Vocabulary',
    targetWords: ['STAR', 'MOON', 'CROWN', 'PEARL', 'FLOWER', 'SHIELD', 'BRAVE', 'ROYAL'],
    gems: [
      { type: '⭐', word: 'STAR' },
      { type: '🌙', word: 'MOON' },
      { type: '🌸', word: 'FLOWER' },
      { type: '🌈', word: 'RAINBOW' },
      { type: '🦋', word: 'BUTTERFLY' },
      { type: '👑', word: 'CROWN' },
      { type: '🛡️', word: 'SHIELD' },
      { type: '🔮', word: 'MAGIC' }
    ],
    obstacles: [
      { type: '💎', word: 'GEM' },
      { type: '⚡', word: 'BOLT' },
      { type: '🦇', label: 'GIANT BAT' }
    ]
  },
  {
    name: 'Level 5 • Legendary Kingdom Phonics',
    targetWords: ['DRAGON', 'PHOENIX', 'CRYSTAL', 'THUNDER', 'VICTORY', 'KINGDOM'],
    gems: [
      { type: '🐉', word: 'DRAGON' },
      { type: '🦅', word: 'PHOENIX' },
      { type: '💎', word: 'CRYSTAL' },
      { type: '⚡', word: 'THUNDER' },
      { type: '🏆', word: 'VICTORY' },
      { type: '🏰', word: 'KINGDOM' }
    ],
    obstacles: [
      { type: '🔥', word: 'FIRE' },
      { type: '☄️', word: 'METEOR' }
    ]
  }
];

function DinoJumperGame({ player, onBack, onComplete, onLoss, isWordForest = true }) {
  const [renderTick, setRenderTick] = React.useState(0);
  const gameState = React.useRef({
    status: 'intro', score: 0, level: 1, lives: 3, y: 0, velocity: 0,
    obstacles: [], gems: [], powerups: [], particles: [], lastSpawn: Date.now(), gravity: -0.45, jumpForce: 5.6,
    combo: 0, wordsLearned: [], popups: [], bgOffset: 0, canDoubleJump: false, isDoubleJumping: false,
    hasShield: false, magnetUntil: 0, doubleScoreUntil: 0,
    targetIdx: 0, targetWord: 'CAT'
  });
  const requestRef = React.useRef();

  const getLevelPool = (lvl) => {
    const idx = Math.min(WORD_FOREST_LEVEL_POOLS.length - 1, Math.max(0, (lvl || 1) - 1));
    return WORD_FOREST_LEVEL_POOLS[idx];
  };

  const updateGame = () => {
    if (gameState.current.status !== 'playing') {
      requestRef.current = requestAnimationFrame(updateGame);
      return;
    }

    const now = Date.now();
    const state = gameState.current;
    state.bgOffset = (state.bgOffset + 1.2) % 1000;

    // Apply gravity & physics
    if (state.isFallingInHole) {
      state.y -= 4.2;
      if (state.y < -70) {
        state.y = 0;
        state.velocity = 0;
        state.isFallingInHole = false;
        if (state.lives <= 0) {
          state.status = 'gameover';
        }
      }
    } else {
      state.velocity += state.gravity;
      state.y += state.velocity;
      if (state.y <= 0) {
        state.y = 0;
        state.velocity = 0;
      }
    }

    // Magnet Effect: pull gems towards player position (x: 20%, y: state.y)
    const isMagnetActive = now < state.magnetUntil;
    if (isMagnetActive) {
      state.gems.forEach(gem => {
        if (!gem.collected) {
          if (gem.x > 20) gem.x -= 1.8;
          const targetY = (state.y / 10) * 5 + 10;
          gem.height += (targetY - gem.height) * 0.1;
        }
      });
    }

    // Spawn obstacles, gems & powerups
    const spawnRate = Math.max(650, 1100 - (state.level - 1) * 140);
    if (now - state.lastSpawn > spawnRate) {
      const isFlyingEnemy = state.level >= 4 && Math.random() > 0.7;
      if (isFlyingEnemy) {
        state.obstacles.push({
          id: now, x: 105, y: 45 + Math.random() * 15, type: isWordForest ? '🦇' : '🦖', label: isWordForest ? 'GIANT BAT' : 'PTERODACTYL', passed: false, isFlying: true
        });
      } else {
        const pool = getLevelPool(state.level);
        const spawnRoll = Math.random();

        // 15% Powerup drop chance in Word Forest
        if (isWordForest && spawnRoll < 0.15) {
          const powerTypes = [
            { type: '🍌', name: 'BANANA SHIELD', effect: 'shield' },
            { type: '🧲', name: 'JUNGLE MAGNET', effect: 'magnet' },
            { type: '🌟', name: '2X SCORE', effect: 'double' }
          ];
          const p = powerTypes[Math.floor(Math.random() * powerTypes.length)];
          state.gems.push({
            id: now, x: 105, height: 4 + Math.random() * 5, type: p.type, word: p.name, isPowerup: true, effect: p.effect, collected: false
          });
        } else if (spawnRoll < 0.6) {
          // Gem / Word spawn
          if (isWordForest) {
            // Higher chance to spawn target word item!
            const spawnTarget = Math.random() > 0.4 && pool.gems.some(g => g.word === state.targetWord);
            let item;
            if (spawnTarget) {
              item = pool.gems.find(g => g.word === state.targetWord) || pool.gems[0];
            } else {
              item = pool.gems[Math.floor(Math.random() * pool.gems.length)];
            }
            state.gems.push({
              id: now, x: 105, height: 2 + Math.random() * 7, type: item.type, word: item.word, collected: false
            });
          } else {
            state.gems.push({
              id: now, x: 105, height: 2 + Math.random() * 6, type: Math.random() > 0.5 ? '🥚' : '🦴', collected: false
            });
          }
        } else {
          // Obstacle spawn
          if (isWordForest) {
            const item = pool.obstacles ? pool.obstacles[Math.floor(Math.random() * pool.obstacles.length)] : null;
            const pitTypes = [
              { type: '🐍', label: 'COBRA STRIKE' },
              { type: '🐍', label: 'COBRA STRIKE' },
              { type: '🕳️', label: 'PIT HOLE' },
              { type: '🐊', label: 'CROC SWAMP' },
              { type: '🪵', label: 'SPIKE TRAP' },
              { type: '🌋', label: 'LAVA PIT' }
            ];
            const chosenPit = pitTypes[Math.floor(Math.random() * pitTypes.length)];
            state.obstacles.push({
              id: now, x: 105, type: chosenPit.type, label: chosenPit.label, word: item ? item.word : chosenPit.label, passed: false, isStriking: false, warned: false
            });
          } else {
            state.obstacles.push({
              id: now, x: 105, type: Math.random() > 0.5 ? '🌋' : '🪨', passed: false
            });
          }
        }
      }
      state.lastSpawn = now;
    }

    // Move obstacles & collision check
    state.obstacles.forEach(obs => {
      obs.x -= 1.4 + ((state.level - 1) * 0.35);

      // Trigger Cobra lunge strike warning when approaching player (x: 24 to 44)
      if (isWordForest && (obs.type === '🐍' || obs.label === 'COBRA STRIKE') && !obs.warned && obs.x < 44 && obs.x > 22) {
        obs.warned = true;
        obs.isStriking = true;
        state.popups.push({ id: now, text: '🐍 HISS! COBRA STRIKE! LEAP NOW!', x: obs.x, y: 38, opacity: 1 });
        try {
          if (typeof speak === 'function') speak('Watch out! Cobra striking!');
        } catch (e) { }
      }

      if (obs.isFlying) {
        if (obs.x < 24 && obs.x > 12 && !obs.hit) {
          if (Math.abs(state.y - obs.y) < 15) {
            obs.hit = true;
            if (state.hasShield) {
              state.hasShield = false;
              state.popups.push({ id: now, text: '🛡️ BANANA SHIELD SAVED YOU!', x: 20, y: 30, opacity: 1 });
              try { if (typeof speak === 'function') speak('Banana Shield Saved Tarzan!'); } catch (e) { }
            } else {
              state.lives -= 1;
              state.combo = 0;
              state.isFallingInHole = true;
              try { if (typeof speak === 'function') speak('Watch out! Flying enemy!'); } catch (e) { }
            }
          }
        }
      } else {
        if (obs.x < 24 && obs.x > 12 && state.y < 15 && !obs.hit && !state.isFallingInHole) {
          obs.hit = true;
          if (state.hasShield) {
            state.hasShield = false;
            state.velocity = 10.5;
            state.popups.push({ id: now, text: '🛡️ BANANA SHIELD SUPER LEAP!', x: 20, y: 30, opacity: 1 });
            try { if (typeof speak === 'function') speak('Banana Shield Super Leap!'); } catch (e) { }
          } else {
            state.lives -= 1;
            state.combo = 0;
            state.isFallingInHole = true;
            try { if (typeof speak === 'function') speak('Whoops! Tarzan fell in a hole!'); } catch (e) { }
          }
        }
      }

      if (obs.x < 10 && !obs.passed && !obs.hit) {
        obs.passed = true;
        state.score += (now < state.doubleScoreUntil ? 10 : 5);
        const required = 1500 + (state.level * 400);
        if (state.score >= required) {
          if (state.level >= 5) state.status = 'victory';
          else state.status = 'levelup';
        }
      }
    });

    // Move Gems & Powerups & check collection
    state.gems.forEach(gem => {
      gem.x -= 1.4 + ((state.level - 1) * 0.35);
      if (!gem.collected && gem.x < 26 && gem.x > 10 && Math.abs(state.y - gem.height) < 18) {
        gem.collected = true;
        state.combo += 1;

        if (gem.isPowerup) {
          if (gem.effect === 'shield') {
            state.hasShield = true;
            state.popups.push({ id: now, text: '🛡️ BANANA SHIELD ACTIVATED!', x: gem.x, y: gem.height + 25, opacity: 1 });
            try { if (typeof speak === 'function') speak('Banana Shield Activated!'); } catch (e) { }
          } else if (gem.effect === 'magnet') {
            state.magnetUntil = now + 8000;
            state.popups.push({ id: now, text: '🧲 JUNGLE MAGNET ACTIVATED! (8s)', x: gem.x, y: gem.height + 25, opacity: 1 });
            try { if (typeof speak === 'function') speak('Jungle Magnet Active!'); } catch (e) { }
          } else if (gem.effect === 'double') {
            state.doubleScoreUntil = now + 8000;
            state.popups.push({ id: now, text: '🌟 2X SCORE MULTIPLIER! (8s)', x: gem.x, y: gem.height + 25, opacity: 1 });
            try { if (typeof speak === 'function') speak('Double Score Active!'); } catch (e) { }
          }
        } else {
          // Check if collected target word!
          const isTarget = isWordForest && gem.word === state.targetWord;
          let bonusPts = (isTarget ? 50 : 15) + (state.combo > 1 ? state.combo * 5 : 0);
          if (now < state.doubleScoreUntil) bonusPts *= 2;

          state.score += bonusPts;

          if (gem.word && !gem.isPowerup) {
            if (!state.wordsLearned.some(w => w.word === gem.word)) {
              state.wordsLearned.push({ type: gem.type, word: gem.word });
            }
          }

          if (isTarget) {
            // Advance Target Word
            const pool = getLevelPool(state.level);
            state.targetIdx = (state.targetIdx + 1) % pool.targetWords.length;
            state.targetWord = pool.targetWords[state.targetIdx];

            state.popups.push({
              id: now,
              text: `🎯 TARGET MATCH! +${bonusPts} ⭐`,
              x: gem.x,
              y: gem.height + 30,
              opacity: 1
            });

            // Sparkle Particle Burst
            for (let i = 0; i < 6; i++) {
              state.particles.push({
                id: now + i,
                x: gem.x + (Math.random() - 0.5) * 10,
                y: gem.height + (Math.random() - 0.5) * 10,
                symbol: ['✨', '⭐', '🌟', '🍃'][Math.floor(Math.random() * 4)],
                opacity: 1,
                vy: 0.5 + Math.random() * 0.8
              });
            }

            try {
              if (typeof playSuccessSound === 'function') playSuccessSound();
              if (typeof speak === 'function') speak(`${gem.word}! Target Completed! Super!`);
            } catch (e) { }
          } else {
            state.popups.push({
              id: now,
              text: `+${bonusPts} ⭐ ${state.combo > 1 ? `${state.combo}x Combo! 🔥` : ''}`,
              x: gem.x,
              y: gem.height + 25,
              opacity: 1
            });

            try {
              if (typeof playSuccessSound === 'function') playSuccessSound();
              if (typeof speak === 'function') speak(`${gem.word || 'Great'}!`);
            } catch (e) { }
          }
        }

        const required = 1500 + (state.level * 400);
        if (state.score >= required) {
          if (state.level >= 5) state.status = 'victory';
          else state.status = 'levelup';
        }
      }
    });

    // Update floating popups & particles
    state.popups.forEach(p => {
      p.y += 0.8;
      p.opacity -= 0.03;
    });
    state.popups = state.popups.filter(p => p.opacity > 0);

    state.particles.forEach(pt => {
      pt.y += pt.vy;
      pt.opacity -= 0.04;
    });
    state.particles = state.particles.filter(pt => pt.opacity > 0);

    state.obstacles = state.obstacles.filter(obs => obs.x > -20);
    state.gems = state.gems.filter(gem => gem.x > -20 && !gem.collected);

    setRenderTick(t => t + 1);
    requestRef.current = requestAnimationFrame(updateGame);
  };

  const handlePointerDown = (e) => {
    if (gameState.current.status !== 'playing') return;
    if (e && e.preventDefault) e.preventDefault();

    if (gameState.current.y === 0) {
      gameState.current.velocity = gameState.current.jumpForce;
      gameState.current.canDoubleJump = true;
      gameState.current.isDoubleJumping = false;
      try {
        if (typeof playPopSound === 'function') playPopSound();
      } catch (e) { }
    } else if (gameState.current.canDoubleJump && gameState.current.y > 6 && !gameState.current.isFallingInHole) {
      gameState.current.velocity = gameState.current.jumpForce * 0.95;
      gameState.current.canDoubleJump = false;
      gameState.current.isDoubleJumping = true;
      try {
        if (typeof playSuccessSound === 'function') playSuccessSound();
        if (typeof speak === 'function') speak('Vine Double Leap!');
      } catch (e) { }
    }
  };

  // Keyboard controls listener (Spacebar, Up Arrow, W Key)
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState.current.status === 'playing') {
        if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
          e.preventDefault();
          handlePointerDown(e);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);

  const startGame = () => {
    const pool = getLevelPool(1);
    gameState.current = {
      status: 'playing', score: 0, level: 1, lives: 3, y: 0, velocity: 0,
      obstacles: [], gems: [], powerups: [], particles: [], lastSpawn: Date.now(), gravity: -0.45, jumpForce: 5.6,
      combo: 0, wordsLearned: [], popups: [], bgOffset: 0, canDoubleJump: false, isDoubleJumping: false,
      hasShield: false, magnetUntil: 0, doubleScoreUntil: 0,
      targetIdx: 0, targetWord: pool.targetWords[0]
    };
    setRenderTick(t => t + 1);
  };

  const startNextLevel = () => {
    const nextLvl = gameState.current.level + 1;
    const pool = getLevelPool(nextLvl);
    gameState.current = {
      ...gameState.current,
      status: 'playing',
      level: nextLvl,
      lives: Math.min(3, gameState.current.lives + 1),
      y: 0,
      velocity: 0,
      obstacles: [],
      gems: [],
      particles: [],
      lastSpawn: Date.now(),
      combo: 0,
      wordsLearned: [],
      popups: [],
      canDoubleJump: false,
      isDoubleJumping: false,
      targetIdx: 0,
      targetWord: pool.targetWords[0]
    };
    setRenderTick(t => t + 1);
  };

  const state = gameState.current;
  const currentPool = getLevelPool(state.level);
  const now = Date.now();
  const isMagnetActive = now < state.magnetUntil;
  const isDoubleActive = now < state.doubleScoreUntil;

  const getJungleBg = (lvl) => {
    switch ((lvl - 1) % 5) {
      case 0: return 'linear-gradient(180deg, #032719 0%, #0A5034 35%, #054028 70%, #022014 100%)';
      case 1: return 'linear-gradient(180deg, #182B1D 0%, #28442E 35%, #423520 70%, #16271A 100%)';
      case 2: return 'linear-gradient(180deg, #011510 0%, #033429 40%, #02241D 75%, #010F0C 100%)';
      case 3: return 'linear-gradient(180deg, #0A1126 0%, #054534 45%, #02271E 100%)';
      default: return 'linear-gradient(180deg, #241F12 0%, #083E2C 40%, #02281C 100%)';
    }
  };

  return (
    <div
      className="screen active"
      onPointerDown={handlePointerDown}
      style={{
        background: isWordForest
          ? getJungleBg(state.level)
          : 'linear-gradient(180deg, #3B1F2B 0%, #5E2638 50%, #3E2723 100%)',
        color: '#fff',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'none'
      }}
    >
      {/* Background & Animations */}
      <style>{`
        @keyframes tarzan-run-fluid {
          0%   { transform: translate(-50%, 0) rotate(-5deg) scaleY(0.96); }
          50%  { transform: translate(-50%, -7px) rotate(0deg) scaleY(1.03); }
          100% { transform: translate(-50%, 0) rotate(5deg) scaleY(0.96); }
        }
        @keyframes pulse-target {
          0% { transform: scale(1); box-shadow: 0 0 12px rgba(82, 183, 136, 0.4); }
          100% { transform: scale(1.05); box-shadow: 0 0 28px rgba(52, 211, 153, 0.95); }
        }
        @keyframes firefly-float {
          0% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(18px, -24px); opacity: 0.95; }
          100% { transform: translate(-12px, -45px); opacity: 0.1; }
        }
        @keyframes bird-fly {
          0%   { transform: translateX(-40px) translateY(0); opacity: 0.1; }
          10%  { opacity: 0.85; }
          90%  { opacity: 0.85; }
          100% { transform: translateX(420px) translateY(-25px); opacity: 0; }
        }
        @keyframes aura-rotate {
          0%   { transform: rotate(0deg) scale(1); }
          50%  { transform: rotate(180deg) scale(1.06); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes gem-pulse {
          0%   { transform: scale(1); filter: drop-shadow(0 0 10px #34D399); }
          50%  { transform: scale(1.1); filter: drop-shadow(0 0 22px #6EE7B7); }
          100% { transform: scale(1); filter: drop-shadow(0 0 10px #34D399); }
        }
        @keyframes sun-ray {
          0%   { opacity: 0.2; }
          50%  { opacity: 0.45; }
          100% { opacity: 0.2; }
        }
        @keyframes snake-hiss-lunge {
          0%   { transform: translate(-50%, 0) rotate(0deg) scale(1); }
          25%  { transform: translate(-68%, -28px) rotate(-24deg) scale(1.28); }
          55%  { transform: translate(-85%, -46px) rotate(-38deg) scale(1.4); }
          82%  { transform: translate(-62%, -20px) rotate(-14deg) scale(1.18); }
          100% { transform: translate(-50%, 0) rotate(0deg) scale(1); }
        }
        @keyframes snake-tongue {
          0%   { transform: scaleX(0.3); opacity: 0.2; }
          50%  { transform: scaleX(1.5); opacity: 1; }
          100% { transform: scaleX(0.3); opacity: 0.2; }
        }
        @keyframes venom-drip {
          0%   { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(24px); opacity: 0; }
        }
      `}</style>

      {/* Sun Ray Beam Overlay */}
      {isWordForest && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 235, 150, 0.25) 0%, transparent 68%)',
          pointerEvents: 'none',
          zIndex: 3,
          animation: 'sun-ray 4s infinite ease-in-out'
        }} />
      )}

      {/* Floating Fireflies, Birds & Forest FX */}
      {isWordForest && (
        <>
          <div style={{ position: 'absolute', top: '12%', left: '8%', fontSize: '18px', animation: 'firefly-float 4s infinite ease-in-out', zIndex: 2 }}>✨</div>
          <div style={{ position: 'absolute', top: '22%', right: '14%', fontSize: '16px', animation: 'firefly-float 3.5s infinite ease-in-out 1s', zIndex: 2 }}>🌟</div>
          <div style={{ position: 'absolute', top: '40%', left: '70%', fontSize: '20px', animation: 'firefly-float 5s infinite ease-in-out 0.5s', zIndex: 2 }}>✨</div>
          <div style={{ position: 'absolute', top: '16%', left: '-20px', fontSize: '24px', animation: 'bird-fly 14s linear infinite', zIndex: 3, pointerEvents: 'none' }}>🦜</div>
          <div style={{ position: 'absolute', top: '26%', left: '-20px', fontSize: '20px', animation: 'bird-fly 19s linear infinite 6s', zIndex: 3, pointerEvents: 'none' }}>🦋</div>
          <div style={{ position: 'absolute', top: '8%', left: '6%', fontSize: '42px', opacity: 0.35, filter: 'drop-shadow(0 0 12px #52B788)', animation: 'bounce-idle 2s infinite' }}>🌳</div>
          <div style={{ position: 'absolute', top: '15%', right: '10%', fontSize: '38px', opacity: 0.3, filter: 'drop-shadow(0 0 14px #74C69D)' }}>🍃</div>
          <div style={{ position: 'absolute', top: '35%', left: '78%', fontSize: '32px', opacity: 0.35 }}>🌿</div>
        </>
      )}

      {/* Earth Ground Trail */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '22%',
        background: isWordForest
          ? 'linear-gradient(180deg, #2D6A4F 0%, #1B4332 40%, #081C15 100%)'
          : 'linear-gradient(180deg, #5D4037 0%, #3E2723 100%)',
        borderTop: isWordForest ? '5px solid #4ADE80' : '4px solid #8D6E63',
        boxShadow: isWordForest ? '0 -6px 25px rgba(74,222,128,0.5), inset 0 8px 16px rgba(0,0,0,0.6)' : '0 -4px 20px rgba(78,52,46,0.5)'
      }}>
        <div style={{ position: 'absolute', top: '12px', left: '15%', width: '18px', height: '5px', background: isWordForest ? '#74C69D' : '#8D6E63', borderRadius: '3px', opacity: 0.7 }} />
        <div style={{ position: 'absolute', top: '26px', left: '55%', width: '24px', height: '5px', background: isWordForest ? '#95D5B2' : '#A1887F', borderRadius: '3px', opacity: 0.8 }} />
        <div style={{ position: 'absolute', top: '18px', left: '80%', width: '16px', height: '5px', background: isWordForest ? '#74C69D' : '#8D6E63', borderRadius: '3px', opacity: 0.7 }} />
      </div>

      {/* Top Header Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', zIndex: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={(e) => { e.stopPropagation(); onBack(); }} style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '16px',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff'
          }} type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>

          {state.status === 'playing' && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{
                background: 'linear-gradient(135deg, #7CB342, #558B2F)',
                border: '1px solid #C0CA33',
                backdropFilter: 'blur(10px)',
                padding: '6px 14px',
                borderRadius: '20px',
                fontWeight: 800,
                fontSize: '14px',
                color: '#FFF8E1',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}>
                {isWordForest ? `🧔‍♂️ Level ${state.level}` : `🦕 Level ${state.level}`}
              </div>

              <div style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,213,79,0.4)',
                backdropFilter: 'blur(10px)',
                padding: '6px 14px',
                borderRadius: '20px',
                fontWeight: 800,
                fontSize: '14px',
                color: '#FFD700',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}>
                ⭐ {state.score}
              </div>

              <div style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '14px'
              }}>
                {'❤️'.repeat(Math.max(0, state.lives))}
              </div>
            </div>
          )}
        </div>

        {/* Active Power-up Status Pills */}
        {state.status === 'playing' && (state.hasShield || isMagnetActive || isDoubleActive) && (
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {state.hasShield && (
              <span style={{ background: '#10B981', color: '#FFF', fontSize: '11px', fontWeight: 900, padding: '3px 10px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(16,185,129,0.5)' }}>
                🛡️ BANANA SHIELD READY
              </span>
            )}
            {isMagnetActive && (
              <span style={{ background: '#3B82F6', color: '#FFF', fontSize: '11px', fontWeight: 900, padding: '3px 10px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(59,130,246,0.5)' }}>
                🧲 MAGNET ACTIVE
              </span>
            )}
            {isDoubleActive && (
              <span style={{ background: '#F59E0B', color: '#FFF', fontSize: '11px', fontWeight: 900, padding: '3px 10px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(245,158,11,0.5)' }}>
                🌟 2X SCORE ACTIVE
              </span>
            )}
          </div>
        )}

        {/* Target Phonics Challenge Banner */}
        {isWordForest && state.status === 'playing' && (
          <div style={{
            alignSelf: 'center',
            background: 'rgba(6, 78, 59, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '2px solid #34D399',
            borderRadius: '24px',
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'pulse-target 1.8s infinite alternate',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
          }}>
            <span style={{ fontSize: '24px' }}>🎯</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#6EE7B7', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                TARGET WORD (COLLECT THIS):
              </span>
              <span style={{ fontSize: '20px', fontWeight: 900, color: '#FFD54F', letterSpacing: '0.1em', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                {state.targetWord || 'CAT'}
              </span>
            </div>
          </div>
        )}

        {/* Level Progress Bar */}
        {state.status === 'playing' && (
          <div style={{
            alignSelf: 'center',
            width: '80%',
            maxWidth: '300px',
            height: '10px',
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '10px',
            overflow: 'hidden',
            marginTop: '2px'
          }}>
            <div style={{
              width: `${Math.min(100, Math.floor((state.score / (1500 + (state.level * 400))) * 100))}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #10B981, #F59E0B)',
              borderRadius: '10px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        )}
      </div>

      {/* Intro Screen */}
      {state.status === 'intro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          {isWordForest ? (
            <img src="/tarzan_hero.png" alt="Tarzan Hero" style={{ width: '90px', height: '110px', objectFit: 'contain', marginBottom: '16px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))', animation: 'bounce-idle 1.5s infinite', mixBlendMode: 'multiply' }} />
          ) : (
            <div style={{ fontSize: '76px', marginBottom: '20px', animation: 'bounce-idle 1.5s infinite' }}>🦕</div>
          )}
          <h1 style={{
            fontSize: '36px',
            fontWeight: 900,
            marginBottom: '12px',
            background: 'linear-gradient(135deg, #AED581, #FFD54F, #FF8A65)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>{isWordForest ? 'Tarzan Trojan Dash' : 'Dino Valley Dash'}</h1>
          <p style={{ fontSize: '15px', color: '#DCEDC8', maxWidth: '340px', marginBottom: '24px', lineHeight: 1.5 }}>
            {isWordForest ? 'Leap over pit traps & crocs, collect Phonics words & Banana Shields, and match target words! Press SPACE or tap screen to leap.' : 'Help baby Dino leap over rolling boulders & lava pools to collect prehistoric Dino eggs!'}
          </p>
          <button onClick={(e) => { e.stopPropagation(); startGame(); }} style={{
            background: 'linear-gradient(135deg, #7CB342, #33691E)',
            border: '2px solid #C0CA33',
            borderRadius: '32px',
            padding: '18px 48px',
            fontSize: '20px',
            fontWeight: 900,
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(51,105,30,0.5)',
            zIndex: 20
          }} type="button">
            {isWordForest ? 'Start Tarzan Run 🌴' : 'Start Dino Dash 🦕'}
          </button>
        </div>
      )}

      {/* Main Playing Stage */}
      {state.status === 'playing' && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 5, perspective: '800px' }}>

          <style>{`
            @keyframes pan-bg-horizontal {
              0% { background-position: 0 0; }
              100% { background-position: -80px 0; }
            }
            @keyframes pan-parallax {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>

          {/* 3D Floor Plane */}
          <div style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: '120%',
            height: '42%',
            background: 'repeating-linear-gradient(90deg, #1B5E20, #1B5E20 40px, #2E7D32 40px, #2E7D32 80px)',
            transform: 'rotateX(75deg)',
            transformOrigin: 'top center',
            animation: 'pan-bg-horizontal 0.6s linear infinite',
            zIndex: 4,
            boxShadow: 'inset 0 30px 40px rgba(0,0,0,0.8), inset 0 -20px 40px #000'
          }} />

          {/* Parallax Background Trees */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '200%',
            height: '78%',
            animation: 'pan-parallax 20s linear infinite',
            zIndex: 1,
            display: 'flex',
            alignItems: 'flex-end',
            paddingBottom: '20px',
            fontSize: '60px',
            gap: '100px',
            opacity: 0.3,
            filter: 'saturate(0.5) brightness(0.8)'
          }}>
            🌴 🌳 🌿 🌴 🌳 🌿 🌴 🌳 🌿 🌴 🌳 🌿
          </div>

          {/* Dynamic Jungle Vine Rope for Tarzan Leap */}
          {isWordForest && state.y > 4 && (
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9 }}>
              <path
                d={`M 22% 0 Q ${20 + Math.sin(state.y * 0.1) * 4}% ${40}%, 20% calc(78% - ${state.y}%)`}
                stroke="#33691E"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d={`M 22% 0 Q ${20 + Math.sin(state.y * 0.1) * 4}% ${40}%, 20% calc(78% - ${state.y}%)`}
                stroke="#7CB342"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          )}

          {/* Floating Gems, Words, & Powerups */}
          {state.gems.map(gem => {
            const isTarget = isWordForest && gem.word === state.targetWord;
            const wordLabel = gem.word || (gem.type === '🍎' ? 'APPLE' : gem.type === '⭐' ? 'STAR' : 'WORD');
            return (
              <div key={gem.id} style={{
                position: 'absolute',
                bottom: `calc(22% + ${gem.height}%)`,
                left: `${gem.x}%`,
                transform: 'translate(-50%, 0)',
                zIndex: 5,
                animation: isTarget ? 'gem-pulse 1s infinite ease-in-out alternate' : 'bounce-idle 1s infinite'
              }}>
                {isWordForest ? (
                  gem.isPowerup ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 14px',
                      background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), rgba(255,255,255,0.15))',
                      border: '2px solid rgba(255,255,255,0.9)',
                      borderRadius: '24px',
                      backdropFilter: 'blur(6px)',
                      boxShadow: '0 0 20px rgba(255,255,255,0.8), inset 0 0 10px rgba(255,255,255,0.5)',
                      animation: 'pulse 1.2s infinite alternate'
                    }}>
                      <span style={{ fontSize: '36px', filter: 'drop-shadow(0 0 10px #FFF)' }}>{gem.type}</span>
                      <span style={{ fontSize: '15px', fontWeight: 900, color: '#FFF', textShadow: '0 2px 6px #000', letterSpacing: '0.06em' }}>
                        {gem.word}
                      </span>
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: isTarget ? '6px 14px' : '4px 10px',
                      background: isTarget
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.45), rgba(5, 150, 105, 0.65))'
                        : 'rgba(0,0,0,0.3)',
                      border: isTarget ? '2px solid #34D399' : '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '20px',
                      backdropFilter: 'blur(8px)',
                      boxShadow: isTarget
                        ? '0 0 24px #34D399, inset 0 0 12px rgba(52, 211, 153, 0.6)'
                        : '0 6px 14px rgba(0,0,0,0.5)',
                      userSelect: 'none'
                    }}>
                      <span style={{ fontSize: isTarget ? '36px' : '30px', filter: isTarget ? 'drop-shadow(0 0 12px #34D399)' : 'none' }}>{gem.type}</span>
                      <span style={{
                        fontSize: isTarget ? '24px' : '19px',
                        fontWeight: 900,
                        color: isTarget ? '#A7F3D0' : '#FFD54F',
                        textShadow: isTarget ? '0 0 14px #34D399, 0 3px 6px #000' : '0 3px 6px rgba(0,0,0,0.9)',
                        letterSpacing: '0.08em'
                      }}>
                        {wordLabel}
                      </span>
                    </div>
                  )
                ) : (
                  <div style={{ fontSize: '34px', filter: 'drop-shadow(0 0 10px #C0CA33)' }}>
                    {gem.type}
                  </div>
                )}
              </div>
            );
          })}

          {/* Floating Sparkle Particles */}
          {state.particles.map(pt => (
            <div key={pt.id} style={{
              position: 'absolute',
              bottom: `calc(22% + ${pt.y}%)`,
              left: `${pt.x}%`,
              fontSize: '22px',
              opacity: pt.opacity,
              zIndex: 12,
              pointerEvents: 'none'
            }}>
              {pt.symbol}
            </div>
          ))}

          {/* Obstacles & Pit Holes */}
          {state.obstacles.map(obs => {
            if (obs.isFlying) {
              return (
                <div key={obs.id} style={{
                  position: 'absolute',
                  bottom: `calc(22% + ${obs.y}%)`,
                  left: `${obs.x}%`,
                  transform: 'translateX(-50%)',
                  fontSize: '56px',
                  zIndex: 8,
                  filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.6))',
                  pointerEvents: 'none',
                  animation: 'bounce-idle 0.5s infinite alternate'
                }}>
                  {obs.type}
                </div>
              );
            }
            if (obs.type === '🐍' || obs.label === 'COBRA STRIKE' || obs.label === 'SNAKE PIT') {
              return (
                <div key={obs.id} style={{
                  position: 'absolute',
                  bottom: 0,
                  left: `${obs.x}%`,
                  transform: 'translateX(-50%)',
                  width: '130px',
                  height: '22%',
                  zIndex: 7,
                  pointerEvents: 'none'
                }}>
                  {/* Underground Snake Pit Hole Container */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(180deg, #0A0A0A 0%, #000000 100%)',
                    boxShadow: 'inset 0 12px 24px rgba(0,0,0,1), inset 10px 0 16px rgba(0,0,0,0.9), inset -10px 0 16px rgba(0,0,0,0.9)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    position: 'relative',
                    overflow: 'visible'
                  }}>
                    {/* Pit Top Moss Edge Lip */}
                    <div style={{
                      position: 'absolute',
                      top: '-4px',
                      left: '-5%',
                      width: '110%',
                      height: '8px',
                      background: '#10B981',
                      borderRadius: '0 0 50% 50%',
                      boxShadow: '0 4px 10px rgba(16,185,129,0.8), inset 0 -2px 4px rgba(0,0,0,0.8)'
                    }} />

                    {/* Subterranean Pit Spikes & Roots in Deep Pit */}
                    <div style={{ position: 'absolute', bottom: '-5px', display: 'flex', width: '100%', justifyContent: 'space-between', padding: '0 10px', opacity: 0.6 }}>
                      <div style={{ width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '38px solid #064E3B' }} />
                      <div style={{ width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderBottom: '52px solid #047857' }} />
                      <div style={{ width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '35px solid #065F46' }} />
                    </div>

                    {/* Cobra Snake Rising UP OUT of the Deep Pit Hole */}
                    <div style={{
                      position: 'absolute',
                      top: obs.isStriking ? '-52px' : '4px',
                      transition: 'top 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      zIndex: 10,
                      animation: obs.isStriking
                        ? 'snake-hiss-lunge 0.35s infinite ease-in-out alternate'
                        : 'bounce-idle 1.2s infinite ease-in-out'
                    }}>
                      {/* Cobra Head & Hood */}
                      <div style={{
                        position: 'relative',
                        fontSize: '62px',
                        filter: 'drop-shadow(0 0 18px rgba(16,185,129,0.9)) drop-shadow(0 10px 16px rgba(0,0,0,0.9))',
                        zIndex: 3
                      }}>
                        🐍
                        {/* Red Glowing Eyes FX */}
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          left: '12px',
                          fontSize: '12px',
                          filter: 'drop-shadow(0 0 8px #FF1744)'
                        }}>
                          🔴🔴
                        </div>

                        {/* Flickering Forked Tongue */}
                        <div style={{
                          position: 'absolute',
                          bottom: '-6px',
                          left: '4px',
                          fontSize: '18px',
                          animation: 'snake-tongue 0.3s infinite ease-in-out',
                          transformOrigin: 'left center'
                        }}>
                          👅
                        </div>

                        {/* Dripping Venom Drops */}
                        {obs.isStriking && (
                          <div style={{
                            position: 'absolute',
                            bottom: '-14px',
                            left: '16px',
                            fontSize: '14px',
                            animation: 'venom-drip 0.5s infinite linear'
                          }}>
                            💧
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hazard Badge on Underground Pit Wall */}
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      background: obs.isStriking ? 'linear-gradient(135deg, #DC2626, #991B1B)' : 'rgba(0,0,0,0.85)',
                      border: '1.5px solid #EF4444',
                      padding: '3px 10px',
                      borderRadius: '10px',
                      fontSize: '11px',
                      fontWeight: 900,
                      color: '#FFF',
                      boxShadow: '0 0 12px rgba(239,68,68,0.8)',
                      whiteSpace: 'nowrap',
                      zIndex: 12,
                      animation: obs.isStriking ? 'pulse 0.4s infinite alternate' : 'none'
                    }}>
                      🐍 {obs.isStriking ? 'SNAKE BURST OUT OF PIT!' : 'SNAKE PIT HOLE'}
                    </div>
                  </div>
                </div>
              );
            }
            if (!isWordForest) {
              return (
                <div key={obs.id} style={{
                  position: 'absolute',
                  bottom: 'calc(22% - 10px)',
                  left: `${obs.x}%`,
                  transform: 'translateX(-50%)',
                  fontSize: obs.type === '🌋' ? '48px' : '42px',
                  zIndex: 6,
                  filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
                  pointerEvents: 'none'
                }}>
                  {obs.type}
                </div>
              );
            }
            return (
              <div key={obs.id} style={{
                position: 'absolute',
                bottom: 0,
                left: `${obs.x}%`,
                transform: 'translateX(-50%)',
                width: '120px',
                height: '22%',
                zIndex: 6,
                pointerEvents: 'none'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(180deg, #111 0%, #000 100%)',
                  boxShadow: 'inset 0 10px 20px rgba(0,0,0,1), inset 8px 0 12px rgba(0,0,0,0.8), inset -8px 0 12px rgba(0,0,0,0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ position: 'absolute', top: 0, left: '-5%', width: '110%', height: '8px', background: '#2E7D32', borderRadius: '0 0 50% 50%', boxShadow: '0 4px 6px rgba(0,0,0,0.9)' }} />

                  <div style={{ position: 'absolute', bottom: '-5px', display: 'flex', width: '100%', justifyContent: 'space-between', padding: '0 10px' }}>
                    <div style={{ width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderBottom: '45px solid #9E9E9E', filter: 'drop-shadow(0 -2px 4px #000)' }} />
                    <div style={{ width: 0, height: 0, borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderBottom: '60px solid #BDBDBD', filter: 'drop-shadow(0 -2px 4px #000)' }} />
                    <div style={{ width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderBottom: '40px solid #757575', filter: 'drop-shadow(0 -2px 4px #000)' }} />
                  </div>

                  <div style={{
                    fontSize: '28px',
                    marginTop: '20px',
                    zIndex: 2,
                    animation: 'bounce-idle 1s infinite alternate',
                    filter: 'drop-shadow(0 0 12px rgba(255,100,100,0.8))'
                  }}>
                    {obs.type === '🕳️' ? '💀' : obs.type}
                  </div>

                  {obs.word && (
                    <div style={{
                      position: 'absolute',
                      top: '60px',
                      background: 'rgba(0,0,0,0.6)',
                      border: '1px solid #FF5252',
                      padding: '2px 8px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 900,
                      color: '#FF5252',
                      textShadow: '0 2px 4px #000',
                      letterSpacing: '0.06em',
                      zIndex: 3
                    }}>
                      {obs.word}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Ground Track */}
          <div style={{ position: 'absolute', bottom: '22%', left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.2)', zIndex: 5, boxShadow: '0 2px 8px rgba(0,0,0,0.8)' }} />

          {/* Player Ground Dynamic Shadow */}
          {isWordForest && !state.isFallingInHole && (
            <div style={{
              position: 'absolute',
              bottom: 'calc(22% - 4px)',
              left: '20%',
              width: `${Math.max(16, 56 - state.y * 0.9)}px`,
              height: '10px',
              background: 'rgba(0,0,0,0.55)',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              filter: 'blur(3px)',
              zIndex: 9
            }} />
          )}

          {/* Player Character */}
          {isWordForest ? (
            <div style={{
              position: 'absolute',
              bottom: `calc(22% - 38px + ${state.y}%)`,
              left: '20%',
              transform: state.isFallingInHole
                ? 'translate(-50%, 0) rotate(45deg) scale(0.65)'
                : state.y > 0
                  ? `translate(-50%, 0) rotate(${state.isDoubleJumping ? '-18deg' : '-12deg'})`
                  : 'translate(-50%, 0)',
              width: '76px',
              height: '100px',
              zIndex: 10,
              filter: state.hasShield ? 'drop-shadow(0 0 24px #10B981)' : 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: (state.y === 0 && !state.isFallingInHole) ? 'tarzan-run-fluid 0.32s infinite ease-in-out alternate' : 'none'
            }}>
              <img
                src="/tarzan_hero.png"
                alt="Tarzan Hero"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply'
                }}
              />
              {state.hasShield && (
                <div style={{
                  position: 'absolute',
                  width: '95px',
                  height: '115px',
                  borderRadius: '50%',
                  border: '3px dashed #10B981',
                  boxShadow: '0 0 24px #10B981, inset 0 0 12px rgba(16,185,129,0.5)',
                  animation: 'aura-rotate 4s linear infinite'
                }} />
              )}
              {isMagnetActive && (
                <div style={{
                  position: 'absolute',
                  width: '110px',
                  height: '125px',
                  borderRadius: '50%',
                  border: '3px dashed #60A5FA',
                  boxShadow: '0 0 25px rgba(96,165,250,0.8), inset 0 0 15px rgba(96,165,250,0.4)',
                  animation: 'aura-rotate 3s linear infinite'
                }} />
              )}
              {state.isFallingInHole && (
                <div style={{
                  position: 'absolute',
                  top: '-28px',
                  background: '#D84315',
                  border: '2px solid #FFD54F',
                  borderRadius: '12px',
                  padding: '3px 10px',
                  fontSize: '12px',
                  fontWeight: 900,
                  color: '#FFF',
                  boxShadow: '0 0 16px rgba(255,82,82,1)',
                  whiteSpace: 'nowrap',
                  animation: 'pulse 0.3s infinite alternate'
                }}>
                  💥 FELL IN HOLE!
                </div>
              )}
            </div>
          ) : (
            <div style={{
              position: 'absolute',
              bottom: `calc(22% - 12px + ${state.y}%)`,
              left: '20%',
              transform: 'translate(-50%, 0) scaleX(-1)',
              fontSize: '56px',
              zIndex: 10,
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))'
            }}>
              🦕
            </div>
          )}
        </div>
      )}

      {/* Tactile Jump Action Button */}
      {state.status === 'playing' && (
        <div style={{
          position: 'absolute',
          bottom: '14px',
          right: '14px',
          zIndex: 35,
          pointerEvents: 'auto'
        }}>
          <button
            onClick={handlePointerDown}
            style={{
              background: 'linear-gradient(135deg, #FFD54F, #FF8E53)',
              border: '2px solid #FFF',
              borderRadius: '24px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 900,
              color: '#1B5E20',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              animation: 'bounce-idle 1.5s infinite'
            }}
            type="button"
          >
            <span>🦘</span>
            <span>LEAP! [SPACE]</span>
          </button>
        </div>
      )}

      {/* Game Over Screen */}
      {state.status === 'gameover' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 30, background: 'rgba(6, 78, 59, 0.95)', backdropFilter: 'blur(16px)' }}>
          <div style={{ fontSize: '72px', marginBottom: '16px' }}>💥</div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#FF8A65', marginBottom: '12px' }}>Stumbled!</h2>
          <p style={{ fontSize: '18px', color: '#A7F3D0', marginBottom: '32px' }}>
            Tarzan explored <strong>Level {state.level}</strong> with <strong>{state.score}</strong> points!
          </p>
          <button onClick={(e) => { e.stopPropagation(); if (onLoss) onLoss(startGame); else startGame(); }} style={{
            background: 'linear-gradient(135deg, #FF7043, #D84315)',
            border: 'none',
            borderRadius: '32px',
            padding: '16px 44px',
            fontSize: '18px',
            fontWeight: 900,
            color: '#fff',
            cursor: 'pointer',
            zIndex: 35
          }} type="button">
            Try Again 🌴
          </button>
        </div>
      )}

      {/* Level Cleared Screen with Interactive Dictionary */}
      {state.status === 'levelup' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 30, background: 'rgba(6, 78, 59, 0.95)', backdropFilter: 'blur(16px)' }}>
          <div style={{ fontSize: '72px', marginBottom: '8px', animation: 'bounce-idle 1.5s infinite' }}>🌟</div>
          <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#FFD54F', marginBottom: '4px' }}>
            {isWordForest ? `${currentPool.name} Mastered! 🎉` : `Dino Valley ${state.level} Cleared!`}
          </h2>

          {isWordForest && state.wordsLearned.length > 0 && (
            <div style={{ margin: '14px 0 20px', width: '100%', maxWidth: '360px' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#6EE7B7', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                Phonics Words Learned (Tap 🔊 to Hear):
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxHeight: '140px', overflowY: 'auto' }}>
                {state.wordsLearned.map((w, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (typeof speak === 'function') speak(`${w.word}!`);
                    }}
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '16px',
                      padding: '6px 14px',
                      color: '#FFF',
                      fontWeight: 800,
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    type="button"
                  >
                    <span style={{ fontSize: '18px' }}>{w.type}</span>
                    <span>{w.word}</span>
                    <span style={{ fontSize: '14px', opacity: 0.8 }}>🔊</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <p style={{ fontSize: '15px', color: '#A7F3D0', maxWidth: '340px', marginBottom: '24px', lineHeight: 1.4 }}>
            {isWordForest
              ? `Outstanding! Tarzan learned all target Phonics words in Level ${state.level}! Ready to unlock Level ${state.level + 1}?`
              : 'The next Jurassic zone opens up!'}
          </p>

          <button onClick={(e) => { e.stopPropagation(); startNextLevel(); }} style={{
            background: 'linear-gradient(135deg, #10B981, #047857)',
            border: '2px solid #6EE7B7',
            borderRadius: '32px',
            padding: '18px 44px',
            fontSize: '18px',
            fontWeight: 900,
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(16,185,129,0.5)',
            zIndex: 35
          }} type="button">
            {isWordForest ? `Unlock Level ${state.level + 1} 🚀` : `Next Dino Zone 🦕`}
          </button>
        </div>
      )}

      {/* Victory Screen */}
      {state.status === 'victory' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 30, background: 'rgba(6, 78, 59, 0.95)', backdropFilter: 'blur(16px)' }}>
          <div style={{ fontSize: '90px', marginBottom: '16px', animation: 'bounce-idle 2s infinite', filter: 'drop-shadow(0 0 40px #FFD54F)' }}>🏆</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#FFD54F', marginBottom: '12px' }}>Jungle Trojan Champion!</h2>
          <p style={{ fontSize: '18px', color: '#FFF8E1', marginBottom: '32px' }}>You mastered all Phonics Levels & earned +100 Coins & +1 Star!</p>
          <button onClick={() => onComplete(100, 50, 1)} style={{ background: 'linear-gradient(135deg, #10B981, #047857)', border: '2px solid #6EE7B7', borderRadius: '32px', padding: '20px 48px', fontSize: '20px', fontWeight: 900, color: '#fff', cursor: 'pointer', boxShadow: '0 8px 32px rgba(16,185,129,0.5)', zIndex: 35 }} type="button">
            Claim Rewards
          </button>
        </div>
      )}
    </div>
  );
}

const MELODY_SONGS = [
  {
    id: 'saregama',
    title: '🪕 Sa Re Ga Ma Pa Dha Ni Sa',
    swaraNotes: ['SA', 'RE', 'GA', 'MA', 'PA', 'DHA', 'NI', "SA'", "SA'", 'NI', 'DHA', 'PA', 'MA', 'GA', 'RE', 'SA'],
    notes: [
      { note: 'Sa', freq: 261.63, lane: 0, emoji: '🪕', color: '#FF5252' },
      { note: 'Re', freq: 293.66, lane: 1, emoji: '🎵', color: '#42A5F5' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Ma', freq: 349.23, lane: 2, emoji: '🔔', color: '#66BB6A' },
      { note: 'Pa', freq: 392.00, lane: 3, emoji: '🌟', color: '#FFD54F' },
      { note: 'Dha', freq: 440.00, lane: 3, emoji: '🎶', color: '#AB47BC' },
      { note: 'Ni', freq: 493.88, lane: 3, emoji: '✨', color: '#EC407A' },
      { note: "Sa'", freq: 523.25, lane: 3, emoji: '👑', color: '#FFD54F' },
      { note: "Sa'", freq: 523.25, lane: 3, emoji: '👑', color: '#FFD54F' },
      { note: 'Ni', freq: 493.88, lane: 3, emoji: '✨', color: '#EC407A' },
      { note: 'Dha', freq: 440.00, lane: 3, emoji: '🎶', color: '#AB47BC' },
      { note: 'Pa', freq: 392.00, lane: 3, emoji: '🌟', color: '#FFD54F' },
      { note: 'Ma', freq: 349.23, lane: 2, emoji: '🔔', color: '#66BB6A' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Re', freq: 293.66, lane: 1, emoji: '🎵', color: '#42A5F5' },
      { note: 'Sa', freq: 261.63, lane: 0, emoji: '🪕', color: '#FF5252' },
    ]
  },
  {
    id: 'twinkle',
    title: '⭐ Twinkle Twinkle Little Star',
    swaraNotes: ['SA', 'SA', 'PA', 'PA', 'DHA', 'DHA', 'PA', 'MA', 'MA', 'GA', 'GA', 'RE', 'RE', 'SA'],
    notes: [
      { note: 'Sa', freq: 261.63, lane: 0, emoji: '⭐', color: '#FF5252' },
      { note: 'Sa', freq: 261.63, lane: 0, emoji: '⭐', color: '#FF5252' },
      { note: 'Pa', freq: 392.00, lane: 3, emoji: '🌟', color: '#FFD54F' },
      { note: 'Pa', freq: 392.00, lane: 3, emoji: '🌟', color: '#FFD54F' },
      { note: 'Dha', freq: 440.00, lane: 3, emoji: '🎶', color: '#AB47BC' },
      { note: 'Dha', freq: 440.00, lane: 3, emoji: '🎶', color: '#AB47BC' },
      { note: 'Pa', freq: 392.00, lane: 3, emoji: '🌟', color: '#FFD54F' },
      { note: 'Ma', freq: 349.23, lane: 2, emoji: '🔔', color: '#66BB6A' },
      { note: 'Ma', freq: 349.23, lane: 2, emoji: '🔔', color: '#66BB6A' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Re', freq: 293.66, lane: 1, emoji: '🎵', color: '#42A5F5' },
      { note: 'Re', freq: 293.66, lane: 1, emoji: '🎵', color: '#42A5F5' },
      { note: 'Sa', freq: 261.63, lane: 0, emoji: '⭐', color: '#FF5252' },
    ]
  },
  {
    id: 'janagana',
    title: '🪔 Jana Gana Mana Anthem',
    swaraNotes: ['SA', 'RE', 'GA', 'GA', 'GA', 'GA', 'GA', 'GA', 'GA', 'GA', 'GA', 'RE', 'GA', 'MA'],
    notes: [
      { note: 'Sa', freq: 261.63, lane: 0, emoji: '🪔', color: '#FF5252' },
      { note: 'Re', freq: 293.66, lane: 1, emoji: '🎵', color: '#42A5F5' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Re', freq: 293.66, lane: 1, emoji: '🎵', color: '#42A5F5' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Ma', freq: 349.23, lane: 2, emoji: '🔔', color: '#66BB6A' },
    ]
  },
  {
    id: 'birthday',
    title: '🎂 Happy Birthday Tune',
    swaraNotes: ['SA', 'SA', 'RE', 'SA', 'MA', 'GA', 'SA', 'SA', 'RE', 'SA', 'PA', 'MA'],
    notes: [
      { note: 'Sa', freq: 261.63, lane: 0, emoji: '🎂', color: '#FF5252' },
      { note: 'Sa', freq: 261.63, lane: 0, emoji: '🎂', color: '#FF5252' },
      { note: 'Re', freq: 293.66, lane: 1, emoji: '🎵', color: '#42A5F5' },
      { note: 'Sa', freq: 261.63, lane: 0, emoji: '🎂', color: '#FF5252' },
      { note: 'Ma', freq: 349.23, lane: 2, emoji: '🔔', color: '#66BB6A' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Sa', freq: 261.63, lane: 0, emoji: '🎂', color: '#FF5252' },
      { note: 'Sa', freq: 261.63, lane: 0, emoji: '🎂', color: '#FF5252' },
      { note: 'Re', freq: 293.66, lane: 1, emoji: '🎵', color: '#42A5F5' },
      { note: 'Sa', freq: 261.63, lane: 0, emoji: '🎂', color: '#FF5252' },
      { note: 'Pa', freq: 392.00, lane: 3, emoji: '🌟', color: '#FFD54F' },
      { note: 'Ma', freq: 349.23, lane: 2, emoji: '🔔', color: '#66BB6A' },
    ]
  },
  {
    id: 'lamb',
    title: '🐑 Mary Had a Little Lamb',
    swaraNotes: ['GA', 'RE', 'SA', 'RE', 'GA', 'GA', 'GA', 'RE', 'RE', 'RE', 'GA', 'PA', 'PA'],
    notes: [
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Re', freq: 293.66, lane: 1, emoji: '🎵', color: '#42A5F5' },
      { note: 'Sa', freq: 261.63, lane: 0, emoji: '⭐', color: '#FF5252' },
      { note: 'Re', freq: 293.66, lane: 1, emoji: '🎵', color: '#42A5F5' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Re', freq: 293.66, lane: 1, emoji: '🎵', color: '#42A5F5' },
      { note: 'Re', freq: 293.66, lane: 1, emoji: '🎵', color: '#42A5F5' },
      { note: 'Re', freq: 293.66, lane: 1, emoji: '🎵', color: '#42A5F5' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Pa', freq: 392.00, lane: 3, emoji: '🌟', color: '#FFD54F' },
      { note: 'Pa', freq: 392.00, lane: 3, emoji: '🌟', color: '#FFD54F' },
    ]
  },
  {
    id: 'joy',
    title: '🎼 Ode to Joy',
    swaraNotes: ['GA', 'GA', 'MA', 'PA', 'PA', 'MA', 'GA', 'RE', 'SA', 'SA', 'RE', 'GA', 'GA', 'RE', 'RE'],
    notes: [
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Ma', freq: 349.23, lane: 2, emoji: '🔔', color: '#66BB6A' },
      { note: 'Pa', freq: 392.00, lane: 3, emoji: '🌟', color: '#FFD54F' },
      { note: 'Pa', freq: 392.00, lane: 3, emoji: '🌟', color: '#FFD54F' },
      { note: 'Ma', freq: 349.23, lane: 2, emoji: '🔔', color: '#66BB6A' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
      { note: 'Re', freq: 293.66, lane: 1, emoji: '🎵', color: '#42A5F5' },
      { note: 'Sa', freq: 261.63, lane: 0, emoji: '⭐', color: '#FF5252' },
      { note: 'Sa', freq: 261.63, lane: 0, emoji: '⭐', color: '#FF5252' },
      { note: 'Re', freq: 293.66, lane: 1, emoji: '🎵', color: '#42A5F5' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🌸', color: '#4FC3F7' },
    ]
  },
  {
    id: 'jingle',
    title: '🔔 Jingle Bells',
    swaraNotes: ['GA', 'GA', 'GA', 'GA', 'GA', 'GA', 'GA', 'PA', 'SA', 'RE', 'GA'],
    notes: [
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🔔', color: '#4FC3F7' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🔔', color: '#4FC3F7' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🔔', color: '#4FC3F7' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🔔', color: '#4FC3F7' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🔔', color: '#4FC3F7' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🔔', color: '#4FC3F7' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🔔', color: '#4FC3F7' },
      { note: 'Pa', freq: 392.00, lane: 3, emoji: '🌟', color: '#FFD54F' },
      { note: 'Sa', freq: 261.63, lane: 0, emoji: '⭐', color: '#FF5252' },
      { note: 'Re', freq: 293.66, lane: 1, emoji: '🎵', color: '#42A5F5' },
      { note: 'Ga', freq: 329.63, lane: 2, emoji: '🔔', color: '#4FC3F7' },
    ]
  }
];

const SWARA_KEYS = [
  { note: 'SA', fullName: 'Shadja', freq: 261.63, color: '#FF5252', emoji: '🪕', type: 'shuddha' },
  { note: 're', fullName: 'Komal Rishabh', freq: 277.18, color: '#FF7043', emoji: '🎵', type: 'komal' },
  { note: 'RE', fullName: 'Shuddha Rishabh', freq: 293.66, color: '#42A5F5', emoji: '🎵', type: 'shuddha' },
  { note: 'ga', fullName: 'Komal Gandhar', freq: 311.13, color: '#26C6DA', emoji: '🌸', type: 'komal' },
  { note: 'GA', fullName: 'Shuddha Gandhar', freq: 329.63, color: '#4FC3F7', emoji: '🌸', type: 'shuddha' },
  { note: 'MA', fullName: 'Shuddha Madhyam', freq: 349.23, color: '#66BB6A', emoji: '🔔', type: 'shuddha' },
  { note: "ma'", fullName: 'Teevra Madhyam', freq: 369.99, color: '#9CCC65', emoji: '🔔', type: 'teevra' },
  { note: 'PA', fullName: 'Pancham', freq: 392.00, color: '#FFD54F', emoji: '🌟', type: 'shuddha' },
  { note: 'dha', fullName: 'Komal Dhaivat', freq: 415.30, color: '#AB47BC', emoji: '🎶', type: 'komal' },
  { note: 'DHA', fullName: 'Shuddha Dhaivat', freq: 440.00, color: '#BA68C8', emoji: '🎶', type: 'shuddha' },
  { note: 'ni', fullName: 'Komal Nishad', freq: 466.16, color: '#EC407A', emoji: '✨', type: 'komal' },
  { note: 'NI', fullName: 'Shuddha Nishad', freq: 493.88, color: '#F06292', emoji: '✨', type: 'shuddha' },
  { note: "SA'", fullName: 'High Shadja', freq: 523.25, color: '#FFD54F', emoji: '👑', type: 'shuddha' }
];

let globalMelodyAudioCtx = null;

function getMelodyAudioContext() {
  if (!globalMelodyAudioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      globalMelodyAudioCtx = new AudioCtx();
    }
  }
  if (globalMelodyAudioCtx && globalMelodyAudioCtx.state === 'suspended') {
    globalMelodyAudioCtx.resume();
  }
  return globalMelodyAudioCtx;
}

function MelodyMakerGame({ player, onBack, onComplete, onLoss }) {
  const gameState = React.useRef({
    status: 'intro',
    playMode: 'keys', // 'keys' (middle Swara keys, no falling notes) or 'arcade' (falling notes)
    score: 0,
    combo: 0,
    maxCombo: 0,
    level: 1,
    lives: 3,
    notes: [],
    lastSpawn: 0,
    songNoteIdx: 0,
    selectedSongIdx: 0,
    instrument: 'piano'
  });

  const [renderTick, setRenderTick] = React.useState(0);
  const [lastSwaraKey, setLastSwaraKey] = React.useState(null);
  const requestRef = React.useRef();

  const playNoteSound = (noteObj) => {
    try {
      const ctx = getMelodyAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const freq = noteObj ? noteObj.freq : 261.63;
      const inst = gameState.current ? (gameState.current.instrument || 'piano') : 'piano';

      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.setValueAtTime(0.7, now);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + (inst === 'piano' ? 1.4 : 0.8));

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();

      if (inst === 'piano') {
        osc1.type = 'triangle';
        osc2.type = 'sine';
        osc3.type = 'sine';
        osc1.frequency.setValueAtTime(freq, now);
        osc2.frequency.setValueAtTime(freq * 2, now);
        osc3.frequency.setValueAtTime(freq * 3, now);

        const g1 = ctx.createGain();
        const g2 = ctx.createGain();
        const g3 = ctx.createGain();
        g1.gain.setValueAtTime(0.6, now);
        g2.gain.setValueAtTime(0.3, now);
        g3.gain.setValueAtTime(0.15, now);

        osc1.connect(g1);
        osc2.connect(g2);
        osc3.connect(g3);

        g1.connect(masterGain);
        g2.connect(masterGain);
        g3.connect(masterGain);

        osc1.start(now);
        osc2.start(now);
        osc3.start(now);

        osc1.stop(now + 1.4);
        osc2.stop(now + 1.4);
        osc3.stop(now + 1.4);
      } else {
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(freq, now);
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(freq * 4, now);
        filter.frequency.exponentialRampToValueAtTime(freq * 0.9, now + 0.3);
        osc1.connect(filter);
        filter.connect(masterGain);
        osc1.start(now);
        osc1.stop(now + 1.2);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateGame = () => {
    if (gameState.current.status !== 'playing') {
      requestRef.current = requestAnimationFrame(updateGame);
      return;
    }

    const now = Date.now();
    const state = gameState.current;

    if (state.playMode === 'keys') {
      state.notes = [];
      setRenderTick(t => t + 1);
      requestRef.current = requestAnimationFrame(updateGame);
      return;
    }

    const spawnInterval = Math.max(700, 1400 - (state.level - 1) * 200);
    const activeSong = MELODY_SONGS[state.selectedSongIdx % MELODY_SONGS.length];

    if (now - state.lastSpawn > spawnInterval) {
      const songNote = activeSong.notes[state.songNoteIdx % activeSong.notes.length];
      state.songNoteIdx += 1;

      const currentSpeed = 0.20 + ((state.level - 1) * 0.08);

      state.notes.push({
        id: now,
        lane: songNote.lane,
        x: 12.5 + songNote.lane * 25,
        y: -12,
        speed: currentSpeed,
        noteData: songNote,
        hit: false,
        popped: false
      });
      state.lastSpawn = now;
    }

    let missedCount = 0;
    state.notes.forEach(note => {
      if (!note.hit) {
        note.y += note.speed;
        if (note.y > 92 && !note.missed) {
          note.missed = true;
          missedCount++;
        }
      }
    });

    if (missedCount > 0) {
      state.combo = 0;
      state.lives -= missedCount;
      if (state.lives <= 0) {
        state.status = 'gameover';
      }
    }

    state.notes = state.notes.filter(n => n.y < 105 && !n.popped);

    setRenderTick(t => t + 1);
    requestRef.current = requestAnimationFrame(updateGame);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);

  const startGame = () => {
    gameState.current = {
      ...gameState.current,
      status: 'playing', score: 0, combo: 0, maxCombo: 0, notesHit: 0, level: 1, lives: 3, notes: [], lastSpawn: Date.now(), songNoteIdx: 0
    };
    setRenderTick(t => t + 1);
  };

  const startNextLevel = () => {
    gameState.current = {
      ...gameState.current,
      status: 'playing',
      level: gameState.current.level + 1,
      selectedSongIdx: (gameState.current.selectedSongIdx + 1) % MELODY_SONGS.length,
      lives: Math.min(3, gameState.current.lives + 1),
      notesHit: 0,
      notes: [],
      lastSpawn: Date.now(),
      songNoteIdx: 0
    };
    setRenderTick(t => t + 1);
  };

  const tapOrb = (note) => {
    if (gameState.current.status !== 'playing' || note.hit) return;
    const state = gameState.current;

    note.hit = true;
    note.popped = true;
    playNoteSound(note.noteData);

    state.combo += 1;
    state.notesHit = (state.notesHit || 0) + 1;
    if (state.combo > state.maxCombo) state.maxCombo = state.combo;
    state.score += 10 + Math.min(state.combo * 2, 50);

    const activeSong = MELODY_SONGS[state.selectedSongIdx % MELODY_SONGS.length];
    if (state.notesHit >= activeSong.notes.length * 2) {
      state.status = 'levelup';
    }
    setRenderTick(t => t + 1);
  };

  const tapKeyPad = (laneIndex) => {
    if (gameState.current.status !== 'playing') return;
    const state = gameState.current;
    const candidate = state.notes.find(n => n.lane === laneIndex && !n.hit && n.y >= 45 && n.y <= 95);
    if (candidate) {
      tapOrb(candidate);
    } else {
      const sampleNotes = [
        { note: 'C4', freq: 261.63, name: 'Do' },
        { note: 'D4', freq: 293.66, name: 'Re' },
        { note: 'E4', freq: 329.63, name: 'Mi' },
        { note: 'G4', freq: 392.00, name: 'Sol' }
      ];
      playNoteSound(sampleNotes[laneIndex]);
    }
  };

  const state = gameState.current;
  const activeSong = MELODY_SONGS[state.selectedSongIdx % MELODY_SONGS.length];

  // Identify active target lane that child should hit right now
  const targetNoteNearBottom = state.notes.find(n => !n.hit && n.y >= 50 && n.y <= 95);

  return (
    <div className="screen active" style={{
      background: 'radial-gradient(circle at 50% 30%, #1A0B2E 0%, #090314 100%)',
      color: '#fff',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      touchAction: 'none'
    }}>

      {/* Top Header Bar */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        right: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 30
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '16px',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#fff'
        }} type="button">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        {state.status === 'playing' && (
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <div style={{
              background: 'linear-gradient(135deg, #7B2CBF, #9D4EDD)',
              border: '1px solid #00F5D4',
              padding: '4px 10px',
              borderRadius: '16px',
              fontWeight: 800,
              fontSize: '12px',
              color: '#00F5D4'
            }}>
              ⭐ {state.score}
            </div>

            <div style={{
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '4px 10px',
              borderRadius: '16px',
              fontSize: '13px'
            }}>
              {'❤️'.repeat(Math.max(0, state.lives))}
            </div>

            <button
              type="button"
              onClick={() => {
                state.playMode = state.playMode === 'keys' ? 'arcade' : 'keys';
                state.notes = [];
                setRenderTick(t => t + 1);
              }}
              style={{
                background: state.playMode === 'keys' ? 'linear-gradient(135deg, #00F5D4, #00BBF9)' : 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: '16px',
                padding: '4px 10px',
                fontWeight: 900,
                fontSize: '11px',
                color: state.playMode === 'keys' ? '#090314' : '#fff',
                cursor: 'pointer'
              }}
            >
              {state.playMode === 'keys' ? '🎹 Swara Keys' : '🎮 Arcade'} Mode
            </button>

            <button
              type="button"
              onClick={() => {
                state.instrument = state.instrument === 'guitar' ? 'piano' : 'guitar';
                setRenderTick(t => t + 1);
              }}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: '16px',
                padding: '4px 10px',
                fontWeight: 800,
                fontSize: '11px',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              {state.instrument === 'guitar' ? '🎸' : '🎹'}
            </button>
          </div>
        )}
      </div>

      {/* Intro Screen */}
      {state.status === 'intro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10 }}>
          <div style={{
            fontSize: '64px',
            marginBottom: '12px',
            filter: 'drop-shadow(0 0 20px rgba(157,78,221,0.8))',
            animation: 'bounce-idle 1.5s infinite'
          }}>🎼</div>
          <h1 style={{
            fontSize: '30px',
            fontWeight: 900,
            marginBottom: '6px',
            background: 'linear-gradient(135deg, #00F5D4, #7B2CBF, #FF6B6B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Melody Learning Studio</h1>
          <p style={{ fontSize: '14px', color: '#D8B4F8', maxWidth: '320px', marginBottom: '16px', lineHeight: 1.4 }}>
            Master Piano 🎹 & Guitar 🎸 tunes note-by-note with guided visual sheet prompts!
          </p>

          {/* Instrument Mode Selector */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '16px' }}>
            {[
              { id: 'piano', label: '🎹 Piano Learning' },
              { id: 'guitar', label: '🎸 Guitar Learning' }
            ].map(inst => (
              <button
                key={inst.id}
                type="button"
                onClick={() => { state.instrument = inst.id; setRenderTick(t => t + 1); }}
                style={{
                  background: state.instrument === inst.id ? 'linear-gradient(135deg, #00F5D4, #00BBF9)' : 'rgba(255,255,255,0.08)',
                  border: state.instrument === inst.id ? '2px solid #00F5D4' : '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '20px',
                  padding: '10px 18px',
                  color: state.instrument === inst.id ? '#090314' : '#fff',
                  fontWeight: 900,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: state.instrument === inst.id ? '0 4px 16px rgba(0,245,212,0.4)' : 'none'
                }}
              >
                {inst.label}
              </button>
            ))}
          </div>

          {/* Select Song List Selector */}
          <div style={{ width: '100%', maxWidth: '340px', marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#00F5D4', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px', textAlign: 'center' }}>
              🎵 Select Song Tune List:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto' }} className="hide-scroll">
              {MELODY_SONGS.map((song, sIdx) => {
                const isSelected = (state.selectedSongIdx % MELODY_SONGS.length) === sIdx;
                return (
                  <button
                    key={song.id}
                    type="button"
                    onClick={() => {
                      state.selectedSongIdx = sIdx;
                      setRenderTick(t => t + 1);
                    }}
                    style={{
                      background: isSelected ? 'linear-gradient(135deg, #7B2CBF, #9D4EDD)' : 'rgba(255,255,255,0.08)',
                      border: isSelected ? '2px solid #00F5D4' : '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '16px',
                      padding: '10px 14px',
                      color: '#FFF',
                      fontWeight: 900,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: isSelected ? '0 4px 14px rgba(0,245,212,0.3)' : 'none'
                    }}
                  >
                    <span>{song.title}</span>
                    {isSelected && <span style={{ fontSize: '11px', color: '#00F5D4', background: 'rgba(0,245,212,0.2)', padding: '2px 8px', borderRadius: '10px' }}>Selected ✨</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <button onClick={startGame} style={{
            background: 'linear-gradient(135deg, #00F5D4, #00BBF9)',
            border: 'none',
            borderRadius: '32px',
            padding: '16px 44px',
            fontSize: '18px',
            fontWeight: 900,
            color: '#090314',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(0,245,212,0.4)',
            zIndex: 20
          }} type="button">
            Start Learning 🎵
          </button>
        </div>
      )}

      {/* Main Gameplay Canvas / Stage */}
      {state.status === 'playing' && (
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

          {/* Guided Sheet Music Ribbon Banner */}
          <div style={{
            margin: '56px 12px 0',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '8px 12px',
            border: '1.5px solid rgba(0,245,212,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 20
          }}>
            <div style={{ fontSize: '13px', fontWeight: 900, color: '#FFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>{state.instrument === 'guitar' ? '🎸' : '🎹'}</span>
              <select
                value={state.selectedSongIdx % MELODY_SONGS.length}
                onChange={(e) => {
                  state.selectedSongIdx = parseInt(e.target.value, 10);
                  state.songNoteIdx = 0;
                  state.notes = [];
                  setRenderTick(t => t + 1);
                }}
                style={{
                  background: 'rgba(9, 3, 20, 0.85)',
                  border: '1.5px solid #00F5D4',
                  borderRadius: '12px',
                  color: '#FFD54F',
                  fontWeight: 900,
                  fontSize: '12px',
                  padding: '4px 8px',
                  outline: 'none',
                  cursor: 'pointer',
                  maxWidth: '180px'
                }}
              >
                {MELODY_SONGS.map((song, idx) => (
                  <option key={song.id} value={idx} style={{ background: '#1A0B2E', color: '#FFF' }}>
                    {song.title}
                  </option>
                ))}
              </select>
            </div>
            {targetNoteNearBottom ? (
              <div style={{
                background: 'linear-gradient(135deg, #FFD54F, #FF923C)',
                color: '#090314',
                fontWeight: 900,
                fontSize: '11px',
                padding: '3px 10px',
                borderRadius: '12px',
                boxShadow: '0 0 10px rgba(255,213,79,0.8)',
                animation: 'pulse 0.8s infinite alternate'
              }}>
                👉 TAP {targetNoteNearBottom.noteData.note}!
              </div>
            ) : (
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#00F5D4', background: 'rgba(0,0,0,0.3)', padding: '3px 8px', borderRadius: '10px' }}>
                Follow Notes 🎶
              </div>
            )}
          </div>

          {/* Cosmic Sound Wave Lanes / Guitar Strings */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            background: state.instrument === 'guitar'
              ? 'linear-gradient(180deg, #2D1810 0%, #1A0B2E 100%)'
              : 'radial-gradient(circle at 50% 80%, rgba(123, 44, 191, 0.15), transparent 70%)'
          }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                flex: 1,
                borderRight: i < 3 ? (state.instrument === 'guitar' ? '2px solid rgba(255,213,79,0.3)' : '1px dashed rgba(255,255,255,0.06)') : 'none',
                height: '100%',
                position: 'relative'
              }}>
                {/* Metallic String Line for Guitar Mode */}
                {state.instrument === 'guitar' && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    width: `${2 + i}px`,
                    background: 'linear-gradient(180deg, #E0E0E0 0%, #9E9E9E 100%)',
                    boxShadow: '0 0 8px rgba(255,255,255,0.5)',
                    transform: 'translateX(-50%)'
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Interactive Middle Song Text prompter + Down Clickable Notation Keys Deck */}
          {state.playMode === 'keys' ? (
            <>
              {/* Middle Area: Guided Song Lyrics & Swara Sheet Text Box */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                zIndex: 20,
                margin: '40px 0 110px'
              }}>
                <div style={{
                  background: 'rgba(26, 11, 46, 0.9)',
                  backdropFilter: 'blur(16px)',
                  border: '2px solid #00F5D4',
                  borderRadius: '24px',
                  padding: '20px 16px',
                  width: '100%',
                  maxWidth: '380px',
                  boxShadow: '0 12px 32px rgba(0,245,212,0.3)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#00F5D4', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>
                    🎵 {activeSong.title} Swara Text:
                  </div>

                  {/* Full Swara Text Sequence (S1, R1, G1, M1, P1, D1, N1, S2) */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '12px 0',
                    maxHeight: '110px',
                    overflowY: 'auto'
                  }} className="hide-scroll">
                    {activeSong.swaraNotes.map((rawSwara, sIdx) => {
                      const notationMap = {
                        'SA': 'S1', 'Sa': 'S1', 'S1': 'S1',
                        'RE': 'R1', 'Re': 'R1', 'R1': 'R1',
                        'GA': 'G1', 'Ga': 'G1', 'G1': 'G1',
                        'MA': 'M1', 'Ma': 'M1', 'M1': 'M1',
                        'PA': 'P1', 'Pa': 'P1', 'P1': 'P1',
                        'DHA': 'D1', 'Dha': 'D1', 'D1': 'D1',
                        'NI': 'N1', 'Ni': 'N1', 'N1': 'N1',
                        "SA'": 'S2', "Sa'": 'S2', 'S2': 'S2'
                      };
                      const code = notationMap[rawSwara] || rawSwara;
                      const isCurrent = (state.songNoteIdx % activeSong.swaraNotes.length) === sIdx;
                      return (
                        <span
                          key={sIdx}
                          style={{
                            padding: '5px 10px',
                            borderRadius: '12px',
                            fontWeight: 900,
                            fontSize: isCurrent ? '17px' : '13px',
                            background: isCurrent ? 'linear-gradient(135deg, #FFD54F, #FF923C)' : 'rgba(255,255,255,0.08)',
                            color: isCurrent ? '#090314' : '#E0E0E0',
                            border: isCurrent ? '2px solid #FFD54F' : '1px solid rgba(255,255,255,0.15)',
                            boxShadow: isCurrent ? '0 0 16px rgba(255,213,79,0.8)' : 'none',
                            transform: isCurrent ? 'scale(1.15)' : 'scale(1)',
                            transition: 'transform 0.15s, background 0.15s'
                          }}
                        >
                          {code}
                        </span>
                      );
                    })}
                  </div>

                  {/* Big Target prompter */}
                  {(() => {
                    const notationMap = {
                      'SA': 'S1', 'Sa': 'S1', 'S1': 'S1',
                      'RE': 'R1', 'Re': 'R1', 'R1': 'R1',
                      'GA': 'G1', 'Ga': 'G1', 'G1': 'G1',
                      'MA': 'M1', 'Ma': 'M1', 'M1': 'M1',
                      'PA': 'P1', 'Pa': 'P1', 'P1': 'P1',
                      'DHA': 'D1', 'Dha': 'D1', 'D1': 'D1',
                      'NI': 'N1', 'Ni': 'N1', 'N1': 'N1',
                      "SA'": 'S2', "Sa'": 'S2', 'S2': 'S2'
                    };
                    const targetRaw = activeSong.swaraNotes ? activeSong.swaraNotes[state.songNoteIdx % activeSong.swaraNotes.length] : '';
                    const targetCode = notationMap[targetRaw] || targetRaw;
                    return (
                      <div style={{
                        fontSize: '18px',
                        fontWeight: 900,
                        color: '#FFD54F',
                        marginTop: '8px',
                        textShadow: '0 0 12px rgba(255,213,79,0.6)'
                      }}>
                        👉 Click Down Key: <span style={{ background: '#FFD54F', color: '#090314', padding: '4px 14px', borderRadius: '14px', marginLeft: '4px' }}>{targetCode} ({targetRaw})</span> 👈
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Down Deck: Clickable Keys Labeled with Notation Symbols (S1, R1, G1, M1, P1, D1, N1, S2) */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '8px',
                right: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                zIndex: 30
              }}>
                {/* Filter Mode Toggle (Song Keys Only vs All Keys) */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => {
                      state.onlySongKeys = state.onlySongKeys === false ? true : false;
                      setRenderTick(t => t + 1);
                    }}
                    style={{
                      background: (state.onlySongKeys !== false) ? 'linear-gradient(135deg, #00F5D4, #00BBF9)' : 'rgba(255,255,255,0.12)',
                      border: (state.onlySongKeys !== false) ? '2px solid #00F5D4' : '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '14px',
                      padding: '4px 12px',
                      fontSize: '11px',
                      fontWeight: 900,
                      color: (state.onlySongKeys !== false) ? '#090314' : '#FFF',
                      cursor: 'pointer',
                      boxShadow: (state.onlySongKeys !== false) ? '0 0 12px rgba(0,245,212,0.4)' : 'none'
                    }}
                  >
                    {(state.onlySongKeys !== false)
                      ? (state.instrument === 'guitar' ? '🎯 Active Song Guitar Frets Only' : '🎯 Active Song Piano Keys Only')
                      : (state.instrument === 'guitar' ? '🎸 All Guitar Frets' : '🎹 All Piano Keys')}
                  </button>
                </div>

                {/* Piano / Guitar Keys Deck */}
                {(() => {
                  const isGuitar = state.instrument === 'guitar';
                  const notationMap = {
                    'SA': 'S1', 'Sa': 'S1', 'S1': 'S1',
                    'RE': 'R1', 'Re': 'R1', 'R1': 'R1',
                    'GA': 'G1', 'Ga': 'G1', 'G1': 'G1',
                    'MA': 'M1', 'Ma': 'M1', 'M1': 'M1',
                    'PA': 'P1', 'Pa': 'P1', 'P1': 'P1',
                    'DHA': 'D1', 'Dha': 'D1', 'D1': 'D1',
                    'NI': 'N1', 'Ni': 'N1', 'N1': 'N1',
                    "SA'": 'S2', "Sa'": 'S2', 'S2': 'S2'
                  };

                  const allSwaraKeys = [
                    { code: 'S1', note: 'SA', freq: 261.63, color: '#FF5252' },
                    { code: 'R1', note: 'RE', freq: 293.66, color: '#42A5F5' },
                    { code: 'G1', note: 'GA', freq: 329.63, color: '#4FC3F7' },
                    { code: 'M1', note: 'MA', freq: 349.23, color: '#66BB6A' },
                    { code: 'P1', note: 'PA', freq: 392.00, color: '#FFD54F' },
                    { code: 'D1', note: 'DHA', freq: 440.00, color: '#AB47BC' },
                    { code: 'N1', note: 'NI', freq: 493.88, color: '#EC407A' },
                    { code: 'S2', note: "SA'", freq: 523.25, color: '#FFD54F' }
                  ];

                  const songRequiredCodes = new Set(
                    (activeSong.swaraNotes || []).map(raw => notationMap[raw] || raw)
                  );

                  const displayKeys = (state.onlySongKeys !== false && songRequiredCodes.size > 0)
                    ? allSwaraKeys.filter(k => songRequiredCodes.has(k.code))
                    : allSwaraKeys;

                  return (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${displayKeys.length}, 1fr)`,
                      gap: '5px',
                      width: '100%',
                      maxWidth: '420px'
                    }}>
                      {displayKeys.map((swaraKey) => {
                        const targetRaw = activeSong.swaraNotes ? activeSong.swaraNotes[state.songNoteIdx % activeSong.swaraNotes.length] : '';
                        const targetCode = notationMap[targetRaw] || targetRaw;
                        const isTarget = targetCode.toUpperCase() === swaraKey.code.toUpperCase();

                        return (
                          <button
                            key={swaraKey.code}
                            type="button"
                            onPointerDown={(e) => {
                              e.preventDefault();
                              playNoteSound({ freq: swaraKey.freq });
                              setLastSwaraKey(swaraKey.code);

                              if (isTarget) {
                                state.songNoteIdx += 1;
                                state.score += 100;
                                state.combo += 1;
                              }
                            }}
                            style={{
                              background: isTarget
                                ? (isGuitar
                                  ? 'linear-gradient(180deg, #FFD54F 0%, #FF923C 75%, #D84315 100%)'
                                  : 'linear-gradient(180deg, #FFF59D 0%, #FFEE58 75%, #FBC02D 100%)')
                                : (isGuitar
                                  ? `linear-gradient(180deg, ${swaraKey.color} 0%, #3E2723 85%, #1A0B2E 100%)`
                                  : `linear-gradient(180deg, ${swaraKey.color} 0%, #1A0B2E 100%)`),
                              border: isTarget ? '3px solid #FFD54F' : `2px solid ${swaraKey.color}`,
                              borderBottom: isTarget ? '7px solid #D84315' : `6px solid ${swaraKey.color}`,
                              borderRadius: isGuitar ? '20px 20px 8px 8px' : '14px',
                              height: isGuitar ? '82px' : '75px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: isTarget ? '#090314' : '#FFF',
                              fontWeight: 900,
                              fontSize: '16px',
                              cursor: 'pointer',
                              boxShadow: isTarget ? '0 0 24px #FFD54F' : `0 6px 14px ${swaraKey.color}55`,
                              transform: (lastSwaraKey === swaraKey.code || isTarget) ? 'scale(1.06)' : 'scale(1)',
                              transition: 'transform 0.12s, boxShadow 0.12s',
                              position: 'relative'
                            }}
                          >
                            {isTarget && (
                              <div style={{
                                position: 'absolute',
                                top: '-10px',
                                background: '#FFD54F',
                                color: '#090314',
                                fontWeight: 900,
                                fontSize: '9px',
                                padding: '2px 7px',
                                borderRadius: '8px',
                                boxShadow: '0 0 10px rgba(255,213,79,1)',
                                animation: 'pulse 0.6s infinite alternate'
                              }}>
                                TAP!
                              </div>
                            )}
                            {isGuitar && <span style={{ fontSize: '13px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>🎸</span>}
                            <span style={{ fontSize: '16px', fontWeight: 900 }}>{swaraKey.code}</span>
                            <span style={{ fontSize: '10px', opacity: 0.9, marginTop: '1px' }}>{swaraKey.note}</span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </>
          ) : (
            <>
              {/* Floating Guided Musical Orbs */}
              {state.notes.map(note => (
                <div
                  key={note.id}
                  onPointerDown={(e) => { e.preventDefault(); tapOrb(note); }}
                  style={{
                    position: 'absolute',
                    top: `${note.y}%`,
                    left: `${note.x}%`,
                    transform: 'translateX(-50%)',
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle at 30% 30%, ${note.noteData.color}, #1A0B2E)`,
                    border: `3px solid ${note.noteData.color}`,
                    boxShadow: note.y >= 50 ? `0 0 32px ${note.noteData.color}` : `0 0 16px ${note.noteData.color}88`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 15,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <span style={{ fontSize: '24px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                    {note.noteData.emoji}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', marginTop: '-2px' }}>
                    {note.noteData.note}
                  </span>
                </div>
              ))}

              {/* Guided Piano Keys OR Guitar Fret Pads */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                right: '12px',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: state.instrument === 'piano' ? '4px' : '8px',
                zIndex: 25
              }}>
                {(activeSong.id === 'saregama' ? [
                  { note: 'Sa', name: 'Shadja', color: '#FF5252' },
                  { note: 'Re', name: 'Rishabh', color: '#42A5F5' },
                  { note: 'Ga', name: 'Gandhar', color: '#4FC3F7' },
                  { note: 'Pa', name: 'Pancham', color: '#FFD54F' }
                ] : [
                  { note: 'C4', name: 'Do', color: '#FF5252' },
                  { note: 'D4', name: 'Re', color: '#42A5F5' },
                  { note: 'E4', name: 'Mi', color: '#4FC3F7' },
                  { note: 'G4', name: 'Sol', color: '#FFD54F' }
                ]).map((keyPad, idx) => {
                  const isTargetLane = targetNoteNearBottom && targetNoteNearBottom.lane === idx;

                  if (state.instrument === 'piano') {
                    return (
                      <button
                        key={keyPad.note}
                        type="button"
                        onPointerDown={(e) => { e.preventDefault(); tapKeyPad(idx); }}
                        style={{
                          background: isTargetLane
                            ? 'linear-gradient(180deg, #FFF59D 0%, #FFEE58 85%, #FBC02D 100%)'
                            : 'linear-gradient(180deg, #FFFFFF 0%, #E0E0E0 85%, #BDBDBD 100%)',
                          border: isTargetLane ? '3px solid #FBC02D' : '2px solid #9E9E9E',
                          borderBottom: isTargetLane ? '6px solid #F57F17' : '6px solid #757575',
                          borderRadius: '0 0 14px 14px',
                          padding: '16px 4px 10px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          color: '#212121',
                          fontWeight: 900,
                          fontSize: '14px',
                          cursor: 'pointer',
                          boxShadow: isTargetLane ? '0 0 24px #FFD54F' : '0 6px 12px rgba(0,0,0,0.3)',
                          transform: isTargetLane ? 'scale(1.04)' : 'scale(1)',
                          transition: 'transform 0.15s ease, boxShadow 0.15s ease',
                          position: 'relative'
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          top: '4px',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: keyPad.color
                        }} />
                        <span>{keyPad.note}</span>
                        <span style={{ fontSize: '10px', color: '#616161', fontWeight: 800 }}>{keyPad.name}</span>
                      </button>
                    );
                  }

                  return (
                    <button
                      key={keyPad.note}
                      type="button"
                      onPointerDown={(e) => { e.preventDefault(); tapKeyPad(idx); }}
                      style={{
                        background: isTargetLane
                          ? `linear-gradient(135deg, #FFD54F 0%, ${keyPad.color} 100%)`
                          : `linear-gradient(135deg, ${keyPad.color} 0%, #3E2723 100%)`,
                        border: isTargetLane ? '3px solid #FFD54F' : `2px solid ${keyPad.color}`,
                        borderRadius: '20px 20px 8px 8px',
                        padding: '12px 4px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFF',
                        fontWeight: 900,
                        fontSize: '14px',
                        cursor: 'pointer',
                        boxShadow: isTargetLane ? '0 0 24px #FFD54F' : `0 6px 16px ${keyPad.color}66`,
                        transform: isTargetLane ? 'scale(1.04)' : 'scale(1)',
                        transition: 'transform 0.15s ease, boxShadow 0.15s ease'
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>🎸</span>
                      <span>{keyPad.note}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Combo Indicator */}
          {state.combo > 1 && (
            <div style={{
              position: 'absolute',
              top: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '18px',
              fontWeight: 900,
              color: '#00F5D4',
              textShadow: '0 0 12px rgba(0,245,212,0.8)',
              animation: 'bounce-idle 0.6s infinite',
              zIndex: 25
            }}>
              🔥 {state.combo}x Combo!
            </div>
          )}
        </div>
      )}

      {/* Game Over Screen */}
      {state.status === 'gameover' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 30, background: 'rgba(9, 3, 20, 0.92)' }}>
          <div style={{ fontSize: '72px', marginBottom: '16px' }}>🎶</div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#FF6B6B', marginBottom: '12px' }}>Melody Paused!</h2>
          <p style={{ fontSize: '18px', color: '#D8B4F8', marginBottom: '32px' }}>
            You scored <strong>{state.score}</strong> points with a max combo of <strong>{state.maxCombo}</strong>!
          </p>
          <button onClick={() => onLoss ? onLoss(startGame) : startGame()} style={{
            background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
            border: 'none',
            borderRadius: '32px',
            padding: '16px 44px',
            fontSize: '18px',
            fontWeight: 900,
            color: '#fff',
            cursor: 'pointer'
          }} type="button">
            Try Again 🎵
          </button>
        </div>
      )}

      {/* 3-Star Melody Master Celebration Screen */}
      {state.status === 'levelup' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 30, background: 'rgba(9, 3, 20, 0.94)' }}>
          <div style={{ fontSize: '80px', marginBottom: '16px', animation: 'bounce-idle 1s infinite' }}>🏆</div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#00F5D4', marginBottom: '8px' }}>⭐ Perfect Melody Master! ⭐</h2>
          <p style={{ fontSize: '18px', color: '#FFD54F', fontWeight: 800, marginBottom: '24px' }}>
            You learned {activeSong.title}!
          </p>
          <button onClick={startNextLevel} style={{
            background: 'linear-gradient(135deg, #00F5D4, #00BBF9)',
            border: 'none',
            borderRadius: '32px',
            padding: '16px 44px',
            fontSize: '18px',
            fontWeight: 900,
            color: '#090314',
            cursor: 'pointer'
          }} type="button">
            Next Song Tune 🎶
          </button>
        </div>
      )}
    </div>
  );
}

const RAINBOW_COLORS = [
  { name: 'Red', hex: '#FF5252', emoji: '🍎', targetMix: null },
  { name: 'Orange', hex: '#FF9800', emoji: '📙', targetMix: ['Red', 'Yellow'] },
  { name: 'Yellow', hex: '#FFD54F', emoji: '🌟', targetMix: null },
  { name: 'Green', hex: '#4CAF50', emoji: '🌿', targetMix: ['Blue', 'Yellow'] },
  { name: 'Blue', hex: '#29B6F6', emoji: '💧', targetMix: null },
  { name: 'Indigo', hex: '#7C4DFF', emoji: '🔮', targetMix: ['Blue', 'Red'] },
  { name: 'Violet', hex: '#FF4081', emoji: '🌸', targetMix: ['Red', 'White'] }
];

const RAINBOW_SHAPES = [
  { name: 'Star', emoji: '⭐', color: '#FFD54F' },
  { name: 'Heart', emoji: '❤️', color: '#FF5252' },
  { name: 'Circle', emoji: '🔴', color: '#FF9800' },
  { name: 'Triangle', emoji: '🔺', color: '#4CAF50' },
  { name: 'Square', emoji: '🟩', color: '#29B6F6' },
  { name: 'Diamond', emoji: '💎', color: '#7C4DFF' },
  { name: 'Crescent Moon', emoji: '🌙', color: '#FF4081' }
];

function RainbowVillageGame({ onBack, onEarn, onComplete }) {
  const [mode, setMode] = useState('spectrum');
  const [rainbowArcCount, setRainbowArcCount] = useState(0);
  const [selectedMix, setSelectedMix] = useState([]);
  const [mixedResult, setMixedResult] = useState(null);
  const [shapeIdx, setShapeIdx] = useState(0);
  const [activePaint, setActivePaint] = useState('#FFD54F');
  const [activePaintName, setActivePaintName] = useState('Gold Yellow');
  const [isSplashing, setIsSplashing] = useState(false);
  const [score, setScore] = useState(0);
  const [showVictory, setShowVictory] = useState(false);

  const handleColorClick = (colorObj) => {
    try {
      if (typeof playClickSound === 'function') playClickSound();
      if (typeof speak === 'function') speak(colorObj.name);
    } catch (e) { }

    if (mode === 'spectrum') {
      if (rainbowArcCount >= 7) return;
      const expected = RAINBOW_COLORS[rainbowArcCount];
      if (expected && colorObj.name === expected.name) {
        if (typeof playSuccessSound === 'function') playSuccessSound();
        const nextArc = rainbowArcCount + 1;
        setRainbowArcCount(nextArc);
        setScore(s => s + 15);
        if (typeof onEarn === 'function') onEarn(5, 0);

        if (nextArc >= 7) {
          setShowVictory(true);
        }
      }
    } else if (mode === 'alchemy') {
      if (selectedMix.length < 2) {
        const next = [...selectedMix, colorObj.name];
        setSelectedMix(next);
        if (next.length === 2) {
          const target = RAINBOW_COLORS.find(c =>
            c.targetMix &&
            ((c.targetMix[0] === next[0] && c.targetMix[1] === next[1]) ||
              (c.targetMix[1] === next[0] && c.targetMix[0] === next[1]))
          );
          if (target) {
            setMixedResult(target);
            if (typeof playSuccessSound === 'function') playSuccessSound();
            try {
              if (typeof speak === 'function') speak(`You mixed ${target.name}!`);
            } catch (e) { }
            setScore(s => s + 25);
            if (typeof onEarn === 'function') onEarn(5, 0);
          } else {
            if (typeof playErrorSound === 'function') playErrorSound();
            setMixedResult({ name: 'Mystic Mud', hex: '#8D6E63', emoji: '🧪' });
          }
        }
      }
    }
  };

  const handleShapeSculpt = (chosenColor) => {
    const colorToUse = chosenColor || activePaint;
    const colorName = RAINBOW_COLORS.find(c => c.hex === colorToUse)?.name || activePaintName;

    setIsSplashing(true);
    if (typeof playSuccessSound === 'function') playSuccessSound();

    const currentShape = RAINBOW_SHAPES[shapeIdx % RAINBOW_SHAPES.length];
    try {
      if (typeof speak === 'function') speak(`Painted ${colorName} ${currentShape.name}`);
    } catch (e) { }

    setScore(s => s + 25);
    if (typeof onEarn === 'function') onEarn(5, 0);

    setTimeout(() => {
      setIsSplashing(false);
      setShapeIdx(prev => prev + 1);
    }, 600);
  };

  const resetAlchemy = () => {
    setSelectedMix([]);
    setMixedResult(null);
  };

  const resetSpectrum = () => {
    setRainbowArcCount(0);
    setShowVictory(false);
  };

  return (
    <div id="rainbow-village-game" className="screen active" style={{
      background: 'linear-gradient(180deg, #1A0033 0%, #2D006B 40%, #001F54 100%)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      padding: 0,
      height: '100%',
      width: '100%'
    }}>
      <div style={{ position: 'absolute', top: '10%', left: '5%', fontSize: '60px', opacity: 0.3, animation: 'bounce-idle 3s infinite' }}>☁️</div>
      <div style={{ position: 'absolute', top: '15%', right: '8%', fontSize: '80px', opacity: 0.3, animation: 'bounce-idle 4s infinite' }}>☁️</div>

      <div style={{ position: 'relative', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px 8px' }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '16px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFF', backdropFilter: 'blur(10px)' }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFD54F' }}>Palette Studio</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🌈</span> Rainbow Village
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid #FFD54F', borderRadius: '999px', padding: '6px 14px', fontWeight: 900, color: '#FFD54F', fontSize: '14px' }}>
          ⭐ {score}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', padding: '0 16px 12px', justifyContent: 'center', position: 'relative', zIndex: 20 }}>
        {[
          { id: 'spectrum', label: '🌈 Arc Builder' },
          { id: 'alchemy', label: '🎨 Color Mixer' },
          { id: 'shapes', label: '🌟 Shape Sculptor' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id)}
            style={{
              background: mode === tab.id ? 'linear-gradient(135deg, #FF4081, #7C4DFF)' : 'rgba(255,255,255,0.1)',
              border: mode === tab.id ? '2px solid #FFF' : '1px solid rgba(255,255,255,0.2)',
              borderRadius: '20px',
              padding: '8px 14px',
              color: '#FFF',
              fontWeight: 900,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: mode === tab.id ? '0 4px 16px rgba(255,64,129,0.5)' : 'none'
            }}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, padding: '0 16px 20px', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10 }}>
        {mode === 'spectrum' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '20px', padding: '10px 20px', fontWeight: 900, color: '#090314', fontSize: '15px', border: '2px solid #FFD54F', boxShadow: '0 8px 20px rgba(0,0,0,0.3)', width: '100%', textAlign: 'center' }}>
              {rainbowArcCount < 7 && RAINBOW_COLORS[rainbowArcCount] ? (
                <>Tap Color: <span style={{ color: RAINBOW_COLORS[rainbowArcCount].hex, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{RAINBOW_COLORS[rainbowArcCount].name}</span> ({rainbowArcCount + 1}/7)</>
              ) : (
                '🌈 Rainbow Spectrum Complete!'
              )}
            </div>

            {/* Main Stage with Rainbow Arc & Fluffy Cloud Stairs */}
            <div style={{ position: 'relative', width: '320px', height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', margin: '16px 0' }}>

              {/* 5-Step Cloud Stairs Pathway */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
                <div style={{ position: 'absolute', bottom: '5px', left: '5%', fontSize: '30px', opacity: 0.8, filter: 'drop-shadow(0 4px 8px rgba(255,255,255,0.5))' }}>☁️</div>
                <div style={{ position: 'absolute', bottom: '35px', left: '22%', fontSize: '34px', opacity: 0.85, filter: 'drop-shadow(0 4px 8px rgba(255,255,255,0.6))' }}>☁️</div>
                <div style={{ position: 'absolute', bottom: '65px', left: '42%', fontSize: '38px', opacity: 0.9, filter: 'drop-shadow(0 4px 8px rgba(255,255,255,0.7))' }}>☁️</div>
                <div style={{ position: 'absolute', bottom: '35px', right: '22%', fontSize: '34px', opacity: 0.85, filter: 'drop-shadow(0 4px 8px rgba(255,255,255,0.6))' }}>☁️</div>
                <div style={{ position: 'absolute', bottom: '5px', right: '5%', fontSize: '30px', opacity: 0.8, filter: 'drop-shadow(0 4px 8px rgba(255,255,255,0.5))' }}>☁️</div>
              </div>

              {RAINBOW_COLORS.map((c, idx) => {
                const isPlaced = idx < rainbowArcCount;
                const size = 260 - idx * 30;
                return (
                  <div
                    key={c.name}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      width: `${size}px`,
                      height: `${size / 2}px`,
                      borderRadius: `${size}px ${size}px 0 0`,
                      border: `12px solid ${isPlaced ? c.hex : 'rgba(255,255,255,0.08)'}`,
                      borderBottom: 'none',
                      boxShadow: isPlaced ? `0 0 16px ${c.hex}` : 'none',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      zIndex: 10 - idx
                    }}
                  />
                );
              })}

              {/* Fluffy ☁️ Cloud Stairs Base */}
              <div style={{
                position: 'absolute',
                bottom: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                zIndex: 15,
                pointerEvents: 'none'
              }}>
                <span style={{ fontSize: '38px', filter: 'drop-shadow(0 6px 12px rgba(255,255,255,0.7))', animation: 'bounce-idle 2s infinite' }}>☁️</span>
                <span style={{ fontSize: '50px', filter: 'drop-shadow(0 8px 16px rgba(255,255,255,0.9))', animation: 'bounce-idle 1.6s infinite' }}>☁️</span>
                <span style={{ fontSize: '38px', filter: 'drop-shadow(0 6px 12px rgba(255,255,255,0.7))', animation: 'bounce-idle 2.2s infinite' }}>☁️</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', width: '100%' }}>
              {RAINBOW_COLORS.map(c => (
                <button
                  key={c.name}
                  onClick={() => handleColorClick(c)}
                  style={{
                    background: c.hex,
                    border: '2px solid #FFF',
                    borderRadius: '16px',
                    height: '52px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: `0 6px 12px ${c.hex}66`,
                    transform: 'scale(1)',
                    transition: 'transform 0.1s'
                  }}
                  type="button"
                >
                  <span style={{ fontSize: '18px' }}>{c.emoji}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === 'alchemy' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '20px', padding: '10px 20px', fontWeight: 900, color: '#090314', fontSize: '15px', border: '2px solid #FF4081', width: '100%', textAlign: 'center' }}>
              Pick 2 Primary Colors to Mix! 🎨
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '32px', border: '2px solid rgba(255,255,255,0.2)', padding: '24px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', margin: '16px 0' }}>
              <div style={{ fontSize: '64px', marginBottom: '8px', animation: 'bounce-idle 1.5s infinite' }}>
                {mixedResult ? mixedResult.emoji : selectedMix.length > 0 ? '🎨' : '🥣'}
              </div>

              <div style={{ fontSize: '18px', fontWeight: 900, color: mixedResult ? mixedResult.hex || '#FFF' : '#FFF', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {mixedResult ? `Result: ${mixedResult.name}!` : selectedMix.length > 0 ? `Mixing: ${selectedMix.join(' + ')}` : 'Select 2 colors below'}
              </div>

              {selectedMix.length > 0 && (
                <button onClick={resetAlchemy} style={{ marginTop: '12px', background: 'rgba(255,255,255,0.2)', border: '1px solid #FFF', borderRadius: '14px', padding: '6px 16px', color: '#FFF', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }} type="button">
                  Clear Mixer 🔄
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', width: '100%' }}>
              {[
                { name: 'Red', hex: '#FF5252', emoji: '🔴' },
                { name: 'Yellow', hex: '#FFD54F', emoji: '🟡' },
                { name: 'Blue', hex: '#29B6F6', emoji: '🔵' },
                { name: 'White', hex: '#FFFFFF', emoji: '⚪' }
              ].map(c => (
                <button
                  key={c.name}
                  onClick={() => handleColorClick(c)}
                  style={{
                    background: c.hex,
                    border: '3px solid #FFF',
                    borderRadius: '20px',
                    padding: '12px 4px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: c.name === 'White' || c.name === 'Yellow' ? '#090314' : '#FFF',
                    fontWeight: 900,
                    boxShadow: `0 8px 16px ${c.hex}66`
                  }}
                  type="button"
                >
                  <span style={{ fontSize: '24px' }}>{c.emoji}</span>
                  <span style={{ fontSize: '13px', marginTop: '4px' }}>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === 'shapes' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Top Status Header */}
            <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '20px', padding: '10px 20px', fontWeight: 900, color: '#090314', fontSize: '15px', border: '2px solid #7C4DFF', width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span>Sculpting:</span>
              <span style={{ color: activePaint, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                {RAINBOW_SHAPES[shapeIdx % RAINBOW_SHAPES.length].name} ({activePaintName})
              </span>
              <span>🌟</span>
            </div>

            {/* Shape Selector Carousel Strip */}
            <div style={{ display: 'flex', gap: '6px', width: '100%', overflowX: 'auto', padding: '8px 0', msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="hide-scroll">
              {RAINBOW_SHAPES.map((shape, sIdx) => {
                const isSelected = (shapeIdx % RAINBOW_SHAPES.length) === sIdx;
                return (
                  <button
                    key={shape.name}
                    onClick={() => {
                      setShapeIdx(sIdx);
                      try {
                        if (typeof speak === 'function') speak(shape.name);
                      } catch (e) { }
                    }}
                    style={{
                      background: isSelected ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                      border: isSelected ? `2px solid ${activePaint}` : '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '16px',
                      padding: '6px 12px',
                      fontSize: '18px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#FFF',
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                      transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                      transition: 'all 0.2s'
                    }}
                    type="button"
                  >
                    <span>{shape.emoji}</span>
                    <span style={{ fontSize: '11px' }}>{shape.name}</span>
                  </button>
                );
              })}
            </div>

            {/* 3D Sculpted Shape Visual Stage */}
            <div
              onClick={() => handleShapeSculpt()}
              style={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              {/* Glowing Aura Ring */}
              <div style={{
                position: 'absolute',
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${activePaint}99 0%, transparent 70%)`,
                filter: 'blur(20px)',
                animation: 'bounce-idle 2s infinite'
              }} />

              {/* Main 3D Shape Icon */}
              <div style={{
                fontSize: '110px',
                filter: `drop-shadow(0 0 36px ${activePaint})`,
                transform: isSplashing ? 'scale(1.25) rotate(15deg)' : 'scale(1)',
                animation: isSplashing ? 'none' : 'bounce-idle 1.4s infinite',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                margin: '10px 0',
                position: 'relative',
                zIndex: 5
              }}>
                {RAINBOW_SHAPES[shapeIdx % RAINBOW_SHAPES.length].emoji}
              </div>

              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: 800 }}>
                Tap shape or pick paint color below to sculpt 🖌️
              </div>
            </div>

            {/* Interactive Paint Palette Buckets Toolbar */}
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '24px', padding: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: '11px', fontWeight: 900, color: '#FFD54F', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', textAlign: 'center' }}>
                Select Brush Paint Color 🎨
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', width: '100%' }}>
                {RAINBOW_COLORS.map(c => {
                  const isActive = activePaint === c.hex;
                  return (
                    <button
                      key={c.name}
                      onClick={() => {
                        setActivePaint(c.hex);
                        setActivePaintName(c.name);
                        handleShapeSculpt(c.hex);
                      }}
                      style={{
                        background: c.hex,
                        border: isActive ? '3px solid #FFF' : '2px solid rgba(255,255,255,0.4)',
                        borderRadius: '16px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: isActive ? `0 0 16px ${c.hex}` : `0 4px 8px ${c.hex}66`,
                        transform: isActive ? 'scale(1.15)' : 'scale(1)',
                        transition: 'all 0.2s'
                      }}
                      type="button"
                    >
                      <span style={{ fontSize: '18px' }}>{c.emoji}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {showVictory && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(26, 0, 51, 0.95)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '80px', marginBottom: '16px', animation: 'bounce-idle 1s infinite' }}>🌈</div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#FFD54F', marginBottom: '8px' }}>Rainbow Complete!</h2>
          <p style={{ fontSize: '18px', color: '#E1F5FE', fontWeight: 800, marginBottom: '32px' }}>
            You mastered all 7 colors of the Rainbow Spectrum!
          </p>
          <button
            onClick={() => {
              if (onComplete) onComplete(100, 50, 1);
              resetSpectrum();
            }}
            style={{
              background: 'linear-gradient(135deg, #FF4081, #7C4DFF)',
              border: 'none',
              borderRadius: '32px',
              padding: '16px 44px',
              fontSize: '20px',
              fontWeight: 900,
              color: '#FFF',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(255,64,129,0.5)'
            }}
            type="button"
          >
            Play Again 🌈
          </button>
        </div>
      )}
    </div>
  );
}



const BAKERY_FRACTIONS = [
  { name: 'Whole Cake', value: 1, label: '1 Whole', emoji: '🎂', description: 'Serve 1 Full Cake!' },
  { name: 'Half Slice', value: 0.5, label: '1/2 Half', emoji: '🍰', description: 'Serve 1/2 Half Slice!' },
  { name: 'Quarter Slice', value: 0.25, label: '1/4 Quarter', emoji: '🧁', description: 'Serve 1/4 Quarter Slice!' },
  { name: 'Third Slice', value: 0.33, label: '1/3 Third', emoji: '🥧', description: 'Serve 1/3 Third Slice!' }
];

const BAKERY_PATTERNS = [
  { pattern: ['🍓', '🫐', '🍓', '🫐'], answer: '🍓', options: ['🍓', '🫐', '🍋', '🍒'] },
  { pattern: ['⭐', '❤️', '⭐', '❤️'], answer: '⭐', options: ['⭐', '❤️', '💎', '🌙'] },
  { pattern: ['🍫', '🍒', '🍫', '🍒'], answer: '🍫', options: ['🍫', '🍒', '🍯', '🍩'] },
  { pattern: ['🟩', '🟨', '🟩', '🟨'], answer: '🟩', options: ['🟩', '🟨', '🟦', '🟥'] }
];

const BAKERY_RECIPES = [
  { word: 'CAKE', target: ['C', 'A', 'K', 'E'], emoji: '🎂' },
  { word: 'SUGAR', target: ['S', 'U', 'G', 'A', 'R'], emoji: '🍬' },
  { word: 'MILK', target: ['M', 'I', 'L', 'K'], emoji: '🥛' },
  { word: 'BERRY', target: ['B', 'E', 'R', 'R', 'Y'], emoji: '🫐' }
];

const BAKERY_GUESTS = [
  { name: 'Panda', emoji: '🐼' },
  { name: 'Lion', emoji: '🦁' },
  { name: 'Fox', emoji: '🦊' },
  { name: 'Bunny', emoji: '🐰' }
];

function WonderBakeryGame({ onBack, onEarn, onComplete }) {
  const [mode, setMode] = useState('fractions');
  const [orderIdx, setOrderIdx] = useState(0);
  const [patternIdx, setPatternIdx] = useState(0);
  const [recipeIdx, setRecipeIdx] = useState(0);
  const [currentSpell, setCurrentSpell] = useState([]);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const guest = BAKERY_GUESTS[orderIdx % BAKERY_GUESTS.length];
  const targetFraction = BAKERY_FRACTIONS[orderIdx % BAKERY_FRACTIONS.length];
  const currentPattern = BAKERY_PATTERNS[patternIdx % BAKERY_PATTERNS.length];
  const currentRecipe = BAKERY_RECIPES[recipeIdx % BAKERY_RECIPES.length];

  const handleFractionServe = (fracObj) => {
    try {
      if (typeof playClickSound === 'function') playClickSound();
    } catch (e) { }

    if (fracObj.value === targetFraction.value) {
      if (typeof playSuccessSound === 'function') playSuccessSound();
      try {
        if (typeof speak === 'function') speak(`Served ${fracObj.label} to ${guest.name}! Yum!`);
      } catch (e) { }
      setScore(s => s + 20);
      if (typeof onEarn === 'function') onEarn(5, 0);

      const nextOrder = orderIdx + 1;
      setOrderIdx(nextOrder);
      if (nextOrder >= 4) {
        setShowCelebration(true);
      }
    } else {
      if (typeof playErrorSound === 'function') playErrorSound();
      try {
        if (typeof speak === 'function') speak(`Oops! ${guest.name} wants ${targetFraction.label}`);
      } catch (e) { }
    }
  };

  const handlePatternAnswer = (topping) => {
    if (topping === currentPattern.answer) {
      if (typeof playSuccessSound === 'function') playSuccessSound();
      try {
        if (typeof speak === 'function') speak(`Perfect topping match!`);
      } catch (e) { }
      setScore(s => s + 15);
      if (typeof onEarn === 'function') onEarn(5, 0);
      setPatternIdx(prev => prev + 1);
    } else {
      if (typeof playErrorSound === 'function') playErrorSound();
    }
  };

  const handleLetterAdd = (letter) => {
    try {
      if (typeof playClickSound === 'function') playClickSound();
      if (typeof speak === 'function') speak(letter);
    } catch (e) { }

    const nextSpell = [...currentSpell, letter];
    setCurrentSpell(nextSpell);

    if (nextSpell.join('') === currentRecipe.word) {
      if (typeof playSuccessSound === 'function') playSuccessSound();
      try {
        if (typeof speak === 'function') speak(`Baked ${currentRecipe.word}! Delicious!`);
      } catch (e) { }
      setScore(s => s + 30);
      if (typeof onEarn === 'function') onEarn(5, 0);
      setTimeout(() => {
        setCurrentSpell([]);
        setRecipeIdx(prev => prev + 1);
      }, 800);
    } else if (!currentRecipe.word.startsWith(nextSpell.join(''))) {
      if (typeof playErrorSound === 'function') playErrorSound();
      setTimeout(() => setCurrentSpell([]), 500);
    }
  };

  return (
    <div id="wonder-bakery-game" className="screen active" style={{
      background: 'linear-gradient(180deg, #FFF3E0 0%, #FFE0B2 50%, #FFCC80 100%)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      padding: 0,
      height: '100%',
      width: '100%',
      color: '#4E342E'
    }}>
      <div style={{ position: 'absolute', top: '8%', left: '10%', fontSize: '40px', opacity: 0.4, animation: 'bounce-idle 2s infinite' }}>✨</div>
      <div style={{ position: 'absolute', top: '14%', right: '12%', fontSize: '50px', opacity: 0.4, animation: 'bounce-idle 2.5s infinite' }}>🧁</div>

      <div style={{ position: 'relative', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px 8px' }}>
        <button onClick={onBack} style={{ background: '#FFF', border: '2px solid #FF7043', borderRadius: '16px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#D84315', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E65100' }}>Cake & Math Studio</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#4E342E', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🧁</span> Wonder Bakery
          </div>
        </div>

        <div style={{ background: '#FFF', border: '2px solid #FFB74D', borderRadius: '999px', padding: '6px 14px', fontWeight: 900, color: '#E65100', fontSize: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          ⭐ {score}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', padding: '0 16px 12px', justifyContent: 'center', position: 'relative', zIndex: 20 }}>
        {[
          { id: 'fractions', label: '🍰 Fraction Slicer' },
          { id: 'patterns', label: '🧁 Topping Decorator' },
          { id: 'recipe', label: '📜 Recipe Baker' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id)}
            style={{
              background: mode === tab.id ? 'linear-gradient(135deg, #FF7043, #D84315)' : '#FFF',
              border: mode === tab.id ? '2px solid #FFF' : '1px solid #FFB74D',
              borderRadius: '20px',
              padding: '8px 14px',
              color: mode === tab.id ? '#FFF' : '#E65100',
              fontWeight: 900,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: mode === tab.id ? '0 4px 16px rgba(239,83,80,0.4)' : 'none'
            }}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, padding: '0 16px 20px', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10 }}>
        {mode === 'fractions' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ background: '#FFF', borderRadius: '20px', padding: '12px 20px', fontWeight: 900, color: '#4E342E', fontSize: '15px', border: '2px solid #FF7043', boxShadow: '0 8px 20px rgba(0,0,0,0.08)', width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span style={{ fontSize: '32px' }}>{guest.emoji}</span>
              <span>{guest.name} wants: <strong style={{ color: '#D84315' }}>{targetFraction.description}</strong></span>
            </div>

            <div style={{ background: 'linear-gradient(180deg, #D7CCC8 0%, #A1887F 100%)', borderRadius: '32px', border: '4px solid #6D4C41', padding: '24px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 24px rgba(0,0,0,0.15)', margin: '16px 0' }}>
              <div style={{ fontSize: '84px', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))', animation: 'bounce-idle 1.5s infinite' }}>
                {targetFraction.emoji}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#FFF', marginTop: '8px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {targetFraction.label}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', width: '100%' }}>
              {BAKERY_FRACTIONS.map(frac => (
                <button
                  key={frac.name}
                  onClick={() => handleFractionServe(frac)}
                  style={{
                    background: '#FFF',
                    border: '3px solid #FF7043',
                    borderRadius: '20px',
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    color: '#D84315',
                    fontWeight: 900,
                    fontSize: '15px',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.08)'
                  }}
                  type="button"
                >
                  <span style={{ fontSize: '28px' }}>{frac.emoji}</span>
                  <span>{frac.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === 'patterns' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ background: '#FFF', borderRadius: '20px', padding: '12px 20px', fontWeight: 900, color: '#4E342E', fontSize: '15px', border: '2px solid #FFB74D', width: '100%', textAlign: 'center' }}>
              Complete the Cupcake Topping Pattern! 🧁
            </div>

            <div style={{ background: '#FFF', borderRadius: '32px', border: '3px solid #FFB74D', padding: '24px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', boxShadow: '0 12px 24px rgba(0,0,0,0.08)', margin: '16px 0' }}>
              {currentPattern.pattern.map((top, idx) => (
                <div key={idx} style={{ fontSize: '40px', background: '#FFF8E1', borderRadius: '16px', padding: '8px 12px', border: '2px dashed #FFA726' }}>
                  {top}
                </div>
              ))}
              <div style={{ fontSize: '40px', background: '#FFE0B2', borderRadius: '16px', padding: '8px 16px', border: '3px solid #FF7043', fontWeight: 900, color: '#D84315', animation: 'pulse 1s infinite' }}>
                ?
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', width: '100%' }}>
              {currentPattern.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePatternAnswer(opt)}
                  style={{
                    background: '#FFF',
                    border: '3px solid #FF7043',
                    borderRadius: '20px',
                    padding: '16px 4px',
                    fontSize: '32px',
                    cursor: 'pointer',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.08)'
                  }}
                  type="button"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === 'recipe' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ background: '#FFF', borderRadius: '20px', padding: '12px 20px', fontWeight: 900, color: '#4E342E', fontSize: '15px', border: '2px solid #FF7043', width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span style={{ fontSize: '28px' }}>{currentRecipe.emoji}</span>
              <span>Spell Ingredient: <strong style={{ color: '#D84315' }}>{currentRecipe.word}</strong></span>
            </div>

            <div style={{ background: '#FFF', borderRadius: '32px', border: '3px solid #FF7043', padding: '24px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 24px rgba(0,0,0,0.08)', margin: '16px 0' }}>
              <div style={{ fontSize: '54px', marginBottom: '8px', animation: 'bounce-idle 1.5s infinite' }}>🥣</div>

              <div style={{ display: 'flex', gap: '8px', minHeight: '44px', alignItems: 'center' }}>
                {currentRecipe.target.map((char, idx) => {
                  const typed = currentSpell[idx];
                  return (
                    <div key={idx} style={{
                      width: '36px',
                      height: '44px',
                      borderRadius: '12px',
                      background: typed ? '#FF7043' : '#FFE0B2',
                      color: typed ? '#FFF' : '#E65100',
                      border: '2px solid #FF7043',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 900
                    }}>
                      {typed || '_'}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', width: '100%' }}>
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(char => (
                <button
                  key={char}
                  onClick={() => handleLetterAdd(char)}
                  style={{
                    background: '#FFF',
                    border: '2px solid #FF7043',
                    borderRadius: '14px',
                    height: '40px',
                    fontSize: '16px',
                    fontWeight: 900,
                    color: '#D84315',
                    cursor: 'pointer',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  type="button"
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {showCelebration && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(78, 52, 46, 0.94)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '80px', marginBottom: '16px', animation: 'bounce-idle 1s infinite' }}>🎂</div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#FFD54F', marginBottom: '8px' }}>Master Baker!</h2>
          <p style={{ fontSize: '18px', color: '#FFF8E1', fontWeight: 800, marginBottom: '32px' }}>
            You baked and served all delicious bakery orders!
          </p>
          <button
            onClick={() => {
              if (onComplete) onComplete(100, 50, 1);
              setShowCelebration(false);
              setOrderIdx(0);
            }}
            style={{
              background: 'linear-gradient(135deg, #FF7043, #D84315)',
              border: 'none',
              borderRadius: '32px',
              padding: '16px 44px',
              fontSize: '20px',
              fontWeight: 900,
              color: '#FFF',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(255,112,67,0.5)'
            }}
            type="button"
          >
            Bake Next Cake 🧁
          </button>
        </div>
      )}
    </div>
  );
}

const PHONICS_TREE_PUZZLES = [
  { sound: '/a/', label: 'Starts Apple', emoji: '🍎', target: 'A', choices: ['/a/ Apple', '/b/ Ball', '/c/ Cat', '/m/ Mango'], correctIdx: 0 },
  { sound: '/b/', label: 'Starts Bear', emoji: '🐻', target: 'B', choices: ['/d/ Dog', '/b/ Bear', '/p/ Pig', '/t/ Turtle'], correctIdx: 1 },
  { sound: '/c/', label: 'Starts Cat', emoji: '🐱', target: 'C', choices: ['/s/ Sun', '/k/ Kite', '/c/ Cat', '/g/ Goat'], correctIdx: 2 },
  { sound: '/m/', label: 'Starts Monkey', emoji: '🐵', target: 'M', choices: ['/n/ Nest', '/l/ Lion', '/r/ Rabbit', '/m/ Monkey'], correctIdx: 3 },
  { sound: '/s/', label: 'Starts Star', emoji: '⭐', target: 'S', choices: ['/s/ Star', '/z/ Zebra', '/f/ Fish', '/v/ Van'], correctIdx: 0 },
  { sound: '/t/', label: 'Starts Tiger', emoji: '🐯', target: 'T', choices: ['/p/ Pig', '/t/ Tiger', '/d/ Dog', '/b/ Ball'], correctIdx: 1 }
];

const TARZAN_LESSON_LEVELS = [
  {
    level: 1,
    name: 'Level 1 • Short CVC Words',
    badge: '🌱 Level 1',
    steps: [
      { letter: 'C', sound: '/c/', word: 'CAT', emoji: '🐱' },
      { letter: 'D', sound: '/d/', word: 'DOG', emoji: '🐶' },
      { letter: 'S', sound: '/s/', word: 'SUN', emoji: '☀️' },
      { letter: 'P', sound: '/p/', word: 'PEN', emoji: '🖊️' },
      { letter: 'F', sound: '/f/', word: 'FOX', emoji: '🦊' },
      { letter: 'B', sound: '/b/', word: 'BUS', emoji: '🚌' }
    ]
  },
  {
    level: 2,
    name: 'Level 2 • Forest & Animals',
    badge: '🌿 Level 2',
    steps: [
      { letter: 'A', sound: '/a/', word: 'APPLE', emoji: '🍎' },
      { letter: 'T', sound: '/t/', word: 'TREE', emoji: '🌳' },
      { letter: 'L', sound: '/l/', word: 'LEAF', emoji: '🍃' },
      { letter: 'F', sound: '/f/', word: 'FISH', emoji: '🐟' },
      { letter: 'F', sound: '/f/', word: 'FROG', emoji: '🐸' },
      { letter: 'B', sound: '/b/', word: 'BIRD', emoji: '🐦' }
    ]
  },
  {
    level: 3,
    name: 'Level 3 • Wild Safari',
    badge: '🦁 Level 3',
    steps: [
      { letter: 'B', sound: '/b/', word: 'BEAR', emoji: '🐻' },
      { letter: 'L', sound: '/l/', word: 'LION', emoji: '🦁' },
      { letter: 'M', sound: '/m/', word: 'MONKEY', emoji: '🐵' },
      { letter: 'Z', sound: '/z/', word: 'ZEBRA', emoji: '🦓' },
      { letter: 'E', sound: '/e/', word: 'ELEPHANT', emoji: '🐘' },
      { letter: 'G', sound: '/g/', word: 'GIRAFFE', emoji: '🦒' }
    ]
  },
  {
    level: 4,
    name: 'Level 4 • Star Master',
    badge: '⭐ Level 4',
    steps: [
      { letter: 'S', sound: '/s/', word: 'STAR', emoji: '⭐' },
      { letter: 'M', sound: '/m/', word: 'MOON', emoji: '🌙' },
      { letter: 'F', sound: '/f/', word: 'FLOWER', emoji: '🌸' },
      { letter: 'R', sound: '/r/', word: 'RAINBOW', emoji: '🌈' },
      { letter: 'B', sound: '/b/', word: 'BUTTERFLY', emoji: '🦋' },
      { letter: 'C', sound: '/c/', word: 'CROWN', emoji: '👑' }
    ]
  },
  {
    level: 5,
    name: 'Level 5 • Jungle Actions',
    badge: '🏃 Level 5',
    steps: [
      { letter: 'R', sound: '/r/', word: 'RUN', emoji: '🏃' },
      { letter: 'J', sound: '/j/', word: 'JUMP', emoji: '🦘' },
      { letter: 'S', sound: '/s/', word: 'SWIM', emoji: '🏊' },
      { letter: 'S', sound: '/s/', word: 'SWING', emoji: '🐒' },
      { letter: 'C', sound: '/c/', word: 'CLIMB', emoji: '🧗' },
      { letter: 'H', sound: '/h/', word: 'HIDE', emoji: '🙈' }
    ]
  },
  {
    level: 6,
    name: 'Level 6 • Digraph Vines',
    badge: '🌿 Level 6',
    steps: [
      { letter: 'SH', sound: '/sh/', word: 'SHIP', emoji: '🚢' },
      { letter: 'CH', sound: '/ch/', word: 'CHAIR', emoji: '🪑' },
      { letter: 'TH', sound: '/th/', word: 'THUMB', emoji: '👍' },
      { letter: 'WH', sound: '/wh/', word: 'WHALE', emoji: '🐋' },
      { letter: 'SH', sound: '/sh/', word: 'SHOE', emoji: '👞' },
      { letter: 'CH', sound: '/ch/', word: 'CHEESE', emoji: '🧀' }
    ]
  }
];

function PhonicsTreeClimberGame({ player, onBack, onEarn, onLoss, onComplete }) {
  const [levelIdx, setLevelIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [distanceMeters, setDistanceMeters] = useState(100);
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [collectedLetters, setCollectedLetters] = useState([]);
  const [showVictory, setShowVictory] = useState(false);

  const currentLevel = TARZAN_LESSON_LEVELS[levelIdx % TARZAN_LESSON_LEVELS.length];
  const currentStep = currentLevel.steps[stepIdx % currentLevel.steps.length];

  useEffect(() => {
    try {
      if (typeof speak === 'function') speak(`${currentLevel.name}! Touch ${currentStep.word}!`);
    } catch (e) { }
  }, [levelIdx, stepIdx]);

  const handleJumpAndTouch = () => {
    if (isJumping || isTouched) return;
    setIsJumping(true);
    setIsTouched(true);
    const nextMeters = distanceMeters + 150;
    setDistanceMeters(nextMeters);
    setScore(s => s + 100);
    setCollectedLetters(prev => [...prev, `${currentStep.emoji} ${currentStep.word}`]);

    try {
      if (typeof playPopSound === 'function') playPopSound();
      if (typeof playSuccessSound === 'function') playSuccessSound();
      if (typeof speak === 'function') speak(`${currentStep.word}! ${currentStep.sound} for ${currentStep.word}!`);
    } catch (e) { }

    setTimeout(() => {
      setIsJumping(false);
      setIsTouched(false);
      if (stepIdx >= currentLevel.steps.length - 1) {
        setShowVictory(true);
        if (typeof speak === 'function') speak(`Great Job! You completed ${currentLevel.name}!`);
        if (onEarn) onEarn(150, 5);
      } else {
        setStepIdx(prev => prev + 1);
        if (onEarn) onEarn(30, 1);
      }
    }, 1100);
  };

  const handleNextLevel = () => {
    setShowVictory(false);
    if (levelIdx < TARZAN_LESSON_LEVELS.length - 1) {
      setLevelIdx(prev => prev + 1);
    } else {
      setLevelIdx(0);
    }
    setStepIdx(0);
    setDistanceMeters(prev => prev + 100);
    setCollectedLetters([]);
  };

  const handleRestart = () => {
    setShowVictory(false);
    setLevelIdx(0);
    setStepIdx(0);
    setDistanceMeters(100);
    setScore(0);
    setCollectedLetters([]);
  };

  return (
    <div id="phonics-tree-climber" className="screen active" style={{
      position: 'relative',
      overflow: 'hidden',
      padding: 0,
      background: 'linear-gradient(180deg, #0A2E0D 0%, #1B5E20 40%, #061A08 100%)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      color: '#FFF'
    }}>
      <style>{`
        @keyframes pan-bg {
          0% { background-position: 0% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes swing-vine {
          0% { transform: scale(1.2) rotate(-15deg); }
          50% { transform: scale(1.2) rotate(15deg); }
          100% { transform: scale(1.2) rotate(-15deg); }
        }
        .jungle-bg {
          background-image: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%),
                            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" opacity="0.1"><path d="M50 100 Q 30 50 50 0 Q 70 50 50 100" fill="%234CAF50"/></svg>');
          background-size: 100px 100px;
          animation: pan-bg 4s linear infinite;
        }
      `}</style>
      {/* Top Navbar */}
      <div style={{ position: 'relative', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px 8px' }}>
        <button onClick={onBack} style={{ background: '#FFF', border: 'none', borderRadius: '16px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1B5E20', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A5D6A7' }}>
            {currentLevel.name}
          </div>
          <div style={{ fontSize: '18px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🧔‍♂️</span> Tarzan Word Jumper
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #FFD54F, #FF8E53)', color: '#1B5E20', borderRadius: '999px', padding: '6px 14px', fontWeight: 900, fontSize: '13px', boxShadow: '0 4px 14px rgba(255,142,83,0.4)', border: '1.5px solid #FFF' }}>
          🪙 {score}
        </div>
      </div>

      {/* Distance & Level Progress Inventory Bar */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', padding: '0 16px', position: 'relative', zIndex: 20 }}>
        <div style={{ background: 'rgba(0,0,0,0.35)', border: '1.5px solid #A5D6A7', borderRadius: '999px', padding: '4px 14px', fontSize: '12px', fontWeight: 900, color: '#A5D6A7', backdropFilter: 'blur(8px)' }}>
          🚩 {currentLevel.badge} • Step {stepIdx + 1}/{currentLevel.steps.length}
        </div>
        <div style={{ background: 'rgba(0,0,0,0.35)', border: '1.5px solid #FFD54F', borderRadius: '999px', padding: '4px 14px', fontSize: '12px', fontWeight: 900, color: '#FFD54F', backdropFilter: 'blur(8px)', maxWidth: '200px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          🔤 Words: <span style={{ color: '#FFF' }}>{collectedLetters.join(' • ')}</span>
        </div>
      </div>

      {/* 3D Arena */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10, padding: '10px 16px' }}>

        {/* 3D Jungle Track Stage Dome */}
        <div
          onClick={handleJumpAndTouch}
          style={{
            width: '320px',
            height: '270px',
            borderRadius: '36px',
            background: 'linear-gradient(180deg, #1B5E20 0%, #000 100%)',
            border: isTouched ? '4px solid #FFD54F' : '4px solid #FFF',
            boxShadow: isTouched ? '0 0 50px rgba(255,213,79,0.7)' : '0 20px 48px rgba(0,0,0,0.5), inset 0 6px 12px rgba(255,255,255,0.7)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            padding: '16px 12px 20px',
            cursor: 'pointer',
            perspective: '600px',
            animation: (isJumping && isTouched) ? 'camera-shake 0.4s ease-in-out' : 'none'
          }}
        >
          {/* 3D Ground Plane */}
          <div style={{
            position: 'absolute',
            bottom: '-40%',
            left: '-50%',
            width: '200%',
            height: '140%',
            background: 'repeating-linear-gradient(0deg, #0A2E0D, #0A2E0D 30px, #1B5E20 30px, #1B5E20 60px)',
            transform: 'rotateX(75deg) translateZ(-50px)',
            transformOrigin: 'top center',
            animation: 'pan-bg-3d 1.5s linear infinite',
            zIndex: 1,
            boxShadow: 'inset 0 80px 80px #000'
          }} />

          {/* Sky / Back wall */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50%',
            background: 'linear-gradient(180deg, #0A2E0D 0%, #1B5E20 100%)',
            zIndex: 2,
            boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
          }} />
          {/* Target Prompt Banner (Up Image Place with Image + Word) */}
          <div style={{
            background: 'rgba(0,0,0,0.65)',
            borderRadius: '20px',
            padding: '8px 18px',
            fontWeight: 900,
            fontSize: '13px',
            color: '#FFD54F',
            border: '2px solid #FFD54F',
            zIndex: 15,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
            maxWidth: '96%'
          }}>
            <span style={{ fontSize: '28px', filter: 'drop-shadow(0 2px 6px rgba(255,213,79,0.8))' }}>{currentStep.emoji}</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '10px', color: '#A5D6A7', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{currentLevel.name}</span>
              <span style={{ fontSize: '18px', color: '#FFF', letterSpacing: '0.05em', fontWeight: 900 }}>Touch {currentStep.word} ({currentStep.letter})</span>
            </div>
          </div>

          {/* DINO JUMPER RUNNING GROUND TRACK LINE */}
          <div style={{ position: 'absolute', bottom: '32px', left: '16px', right: '16px', height: '4px', background: 'rgba(255,255,255,0.4)', borderRadius: '999px', zIndex: 10 }} />

          {/* TARZAN HERO RUNNER ON THE LEFT (Official Tarzan Artwork) */}
          <div style={{
            position: 'absolute',
            bottom: isJumping ? '80px' : '26px',
            left: isJumping ? '100px' : '20px',
            width: '76px',
            height: '96px',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))',
            transform: isJumping ? 'scale(1.2) rotate(-15deg)' : 'scale(1)',
            transformOrigin: isJumping ? '50% -120px' : 'center',
            transition: 'bottom 0.5s ease-out, left 0.5s ease-out, transform 0.5s ease-out',
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: isJumping ? 'swing-vine 1.1s ease-in-out infinite' : 'none'
          }}>
            {isJumping && (
              <div style={{
                position: 'absolute',
                top: '-130px',
                left: '38px',
                width: '4px',
                height: '140px',
                background: 'linear-gradient(90deg, #5D4037 0%, #8D6E63 50%, #5D4037 100%)',
                borderRadius: '4px',
                zIndex: -1,
                boxShadow: '2px 2px 4px rgba(0,0,0,0.4)'
              }} />
            )}
            <img
              src="/tarzan_hero.png"
              alt="Tarzan Hero"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))'
              }}
            />
            {isJumping && <span style={{ position: 'absolute', top: '-10px', right: '-15px', fontSize: '24px' }}>🦘✨</span>}
          </div>

          {/* 3D ROYAL GOLDEN BLOCK WITH IMAGE & FULL WORD COMING FROM RIGHT */}
          <div style={{
            position: 'absolute',
            bottom: isJumping ? '80px' : '40px',
            left: isTouched ? '50px' : '150px',
            zIndex: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformStyle: 'preserve-3d',
            transform: isTouched ? 'scale(1.2) translateZ(40px) rotateY(-180deg)' : 'scale(1) translateZ(-40px)'
          }}>
            {/* CSS 3D Cube */}
            <div style={{
              position: 'relative',
              width: '80px',
              height: '80px',
              transformStyle: 'preserve-3d',
              animation: isTouched ? 'none' : 'cube-spin 4s linear infinite',
              transition: 'all 0.3s',
              filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.8))'
            }}>
              <div className="cube-face" style={{ transform: 'translateZ(40px)' }}>
                {currentStep.emoji}
              </div>
              <div className="cube-face" style={{ transform: 'rotateY(90deg) translateZ(40px)', background: 'linear-gradient(135deg, #A5D6A7, #4CAF50)' }}>
                {currentStep.letter}
              </div>
              <div className="cube-face" style={{ transform: 'rotateY(180deg) translateZ(40px)', background: '#FF5252', color: '#FFF' }}>
                <span style={{ fontSize: '20px' }}>{currentStep.word}</span>
              </div>
              <div className="cube-face" style={{ transform: 'rotateY(-90deg) translateZ(40px)', background: 'linear-gradient(135deg, #A5D6A7, #4CAF50)' }}>
                {currentStep.emoji}
              </div>
              <div className="cube-face" style={{ transform: 'rotateX(90deg) translateZ(40px)', background: '#FFD54F' }} />
              <div className="cube-face" style={{ transform: 'rotateX(-90deg) translateZ(40px)', background: '#D84315', boxShadow: '0 0 30px rgba(0,0,0,0.9)' }} />
            </div>

            <div style={{
              background: 'rgba(0,0,0,0.7)',
              border: '1px solid rgba(255,213,79,0.8)',
              color: '#FFD54F',
              borderRadius: '999px',
              padding: '4px 14px',
              fontSize: '11px',
              fontWeight: 900,
              boxShadow: '0 8px 16px rgba(0,0,0,0.6)',
              marginTop: '16px',
              transform: 'translateZ(30px)'
            }}>
              Touch Cube! 🔊
            </div>
          </div>
        </div>
      </div>

      {/* Action Control Deck */}
      <div style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F1F8E9 100%)',
        borderTopLeftRadius: '32px',
        borderTopRightRadius: '32px',
        padding: '18px 20px 28px',
        boxShadow: '0 -12px 32px rgba(0,0,0,0.4)',
        position: 'relative',
        zIndex: 20
      }}>
        <button
          onClick={handleJumpAndTouch}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #FF7043, #D84315)',
            border: '3px solid #FFF',
            borderRadius: '24px',
            padding: '16px 20px',
            fontSize: '18px',
            fontWeight: 900,
            color: '#FFF',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(255,112,67,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          type="button"
        >
          <span>🦘</span>
          <span>TARZAN JUMP & TOUCH {currentStep.word}! {currentStep.emoji} 🔊</span>
        </button>
      </div>

      {/* Victory / Level Complete Overlay */}
      {showVictory && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10, 46, 13, 0.96)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '72px', marginBottom: '12px', animation: 'bounce-idle 1s infinite' }}>🧔‍♂️🏆🌟</div>
          <div style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#A5D6A7', marginBottom: '4px' }}>
            {currentLevel.name} Mastered!
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#FFD54F', marginBottom: '10px' }}>
            LESSON {currentLevel.level} CLEARED!
          </h2>
          <p style={{ fontSize: '15px', color: '#E1F5FE', fontWeight: 800, marginBottom: '20px', maxWidth: '300px', lineHeight: 1.5 }}>
            Tarzan leaped across the jungle and learned all new words: <br />
            <span style={{ color: '#FFD54F', fontSize: '16px', fontWeight: 900 }}>{collectedLetters.join(' • ')}</span>
          </p>

          <button
            onClick={() => {
              if (onComplete) onComplete(150, 100, 3);
              handleNextLevel();
            }}
            style={{
              background: 'linear-gradient(135deg, #7CB342, #33691E)',
              border: '2px solid #FFF',
              borderRadius: '32px',
              padding: '16px 36px',
              fontSize: '18px',
              fontWeight: 900,
              color: '#FFF',
              cursor: 'pointer',
              boxShadow: '0 8px 28px rgba(124,179,66,0.6)',
              marginBottom: '12px'
            }}
            type="button"
          >
            {levelIdx < TARZAN_LESSON_LEVELS.length - 1
              ? `Go to Level ${currentLevel.level + 1}: Next Words 🚀`
              : 'Replay All Lessons 🏆'}
          </button>

          <button
            onClick={onBack}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '24px',
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: 800,
              color: '#A5D6A7',
              cursor: 'pointer'
            }}
            type="button"
          >
            Back to Word Forest 🌳
          </button>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

