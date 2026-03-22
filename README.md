# Web Terraria

A web-based Terraria clone built with Phaser.js featuring procedurally generated worlds, mining, building, and survival gameplay.

## Features

- **Procedural World Generation**: Each world is unique with terrain, caves, ores, trees, and water
- **Mining System**: Break blocks with a realistic mining progress indicator
- **Building**: Place blocks to build structures
- **Inventory System**: Collect and manage items with a 40-slot inventory
- **Day/Night Cycle**: Dynamic lighting that changes throughout the day
- **Enemy Spawning**: Enemies appear at night to challenge players
- **Save/Load System**: Automatic saving to localStorage every 30 seconds
- **Multiple Biomes**: Varied terrain with different block types

## Controls

- **WASD**: Move character
- **SPACE**: Jump
- **Left Click**: Mine blocks or attack enemies
- **Right Click**: Place blocks
- **1-5**: Select hotbar slot
- **E**: Open/close inventory
- **ESC**: Pause game

## Block Types

- Dirt
- Grass
- Stone
- Sand
- Wood
- Leaves
- Iron Ore
- Gold Ore
- Diamond Ore
- Coal
- Water
- Torch

## Starting Items

- Pickaxe (increased mining speed)
- Sword (combat weapon)
- 50 Dirt Blocks
- 20 Torches
- 30 Wood Blocks

## Installation

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. No server required - runs entirely in the browser

## Technical Details

- Built with Phaser 3.60.0
- Uses HTML5 Canvas for rendering
- Physics handled by Phaser's Arcade Physics
- Procedural generation using custom noise functions
- LocalStorage for save game persistence

## Future Enhancements

- Crafting system
- More enemy types
- Boss battles
- Multiplayer support
- More block types and items
- Sound effects and music
- Mobile touch controls
- World size options

## Credits

Built as a web game implementation inspired by Terraria.