import sys
import re

file_path = r'c:\Users\tejak\Downloads\WonderVerseAcademy-AndroidPrototype\web-preview\src\main.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Since we don't know the exact corrupt characters, we can fix it by finding non-standard unicode characters.
# Actually, we can just replace by using byte sequence matching or copy-pasting the exact strings.

replacements = {
    'ðŸ °': '🏰',
    'ðŸ›\xa0ï¸ ': '🛠️',
    'ðŸ  ': '🐠',
    'ðŸ ™': '🐙',
    'ðŸ—ºï¸ ': '🗺️',
    'ðŸ ›ï¸ ': '🏛️',
    'âœ ï¸ ': '✏️',
    'â­ ': '⭐',
    'ðŸ …': '🏅',
    'ðŸ ‰': '🍉',
    'â† ': '←',
    'ðŸ Ž': '🍎',
    'ðŸŽ ': '🎁',
    'ðŸ „': '🐄',
    'ðŸ  ': '🍌',
    'ðŸ Š': '🍊',
    'ðŸ “': '🍓',
    'â˜ ': '☁️'
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done replacing main.jsx.')
