// Game Constants
const TILE_SIZE = 16;
const WORLD_WIDTH = 400;
const WORLD_HEIGHT = 150;
const GRAVITY = 800;
const PLAYER_SPEED = 150;
const JUMP_VELOCITY = -350;
const DAY_LENGTH = 720; // 12 minutes real time = 1 day

// Block Types
const BLOCKS = {
    AIR: 0,
    DIRT: 1,
    GRASS: 2,
    STONE: 3,
    SAND: 4,
    WOOD: 5,
    LEAVES: 6,
    IRON_ORE: 7,
    GOLD_ORE: 8,
    DIAMOND_ORE: 9,
    WATER: 10,
    TORCH: 11,
    COAL: 12,
    SNOW: 13,
    ICE: 14,
    SANDSTONE: 15,
    MUD: 16,
    CLAY: 17,
    MUSHROOM_GRASS: 18,
    MUSHROOM: 19,
    GLASS: 20,
    COBBLESTONE: 21,
    MARBLE: 22,
    GRANITE: 23,
    CACTUS: 24,
    JUNGLE_GRASS: 25,
    JUNGLE_VINE: 26,
    CORRUPTION_STONE: 27,
    EBONSTONE: 28,
    CRIMSTONE: 29,
    HELLSTONE: 30,
    OBSIDIAN: 31,
    ASH: 32,
    CLOUD: 33,
    RAIN_CLOUD: 34
};

// Block Colors
const BLOCK_COLORS = {
    [BLOCKS.AIR]: 0x87CEEB,
    [BLOCKS.DIRT]: 0x8B4513,
    [BLOCKS.GRASS]: 0x228B22,
    [BLOCKS.STONE]: 0x808080,
    [BLOCKS.SAND]: 0xF4A460,
    [BLOCKS.WOOD]: 0xDEB887,
    [BLOCKS.LEAVES]: 0x006400,
    [BLOCKS.IRON_ORE]: 0xA52A2A,
    [BLOCKS.GOLD_ORE]: 0xFFD700,
    [BLOCKS.DIAMOND_ORE]: 0x00FFFF,
    [BLOCKS.WATER]: 0x1E90FF,
    [BLOCKS.TORCH]: 0xFFFF00,
    [BLOCKS.COAL]: 0x2F2F2F,
    [BLOCKS.SNOW]: 0xFFFFFF,
    [BLOCKS.ICE]: 0xB0E0E6,
    [BLOCKS.SANDSTONE]: 0xD2B48C,
    [BLOCKS.MUD]: 0x5C4033,
    [BLOCKS.CLAY]: 0xB87333,
    [BLOCKS.MUSHROOM_GRASS]: 0x4A6741,
    [BLOCKS.MUSHROOM]: 0xFF69B4,
    [BLOCKS.GLASS]: 0xADD8E6,
    [BLOCKS.COBBLESTONE]: 0x696969,
    [BLOCKS.MARBLE]: 0xF0F0F0,
    [BLOCKS.GRANITE]: 0x404040,
    [BLOCKS.CACTUS]: 0x2E8B57,
    [BLOCKS.JUNGLE_GRASS]: 0x006400,
    [BLOCKS.JUNGLE_VINE]: 0x228B22,
    [BLOCKS.CORRUPTION_STONE]: 0x4B0082,
    [BLOCKS.EBONSTONE]: 0x483D8B,
    [BLOCKS.CRIMSTONE]: 0x8B0000,
    [BLOCKS.HELLSTONE]: 0xFF4500,
    [BLOCKS.OBSIDIAN]: 0x1C1C1C,
    [BLOCKS.ASH]: 0x555555,
    [BLOCKS.CLOUD]: 0xFFFFFF,
    [BLOCKS.RAIN_CLOUD]: 0x778899
};

// Block Names
const BLOCK_NAMES = {
    [BLOCKS.DIRT]: 'Dirt',
    [BLOCKS.GRASS]: 'Grass',
    [BLOCKS.STONE]: 'Stone',
    [BLOCKS.SAND]: 'Sand',
    [BLOCKS.WOOD]: 'Wood',
    [BLOCKS.LEAVES]: 'Leaves',
    [BLOCKS.IRON_ORE]: 'Iron Ore',
    [BLOCKS.GOLD_ORE]: 'Gold Ore',
    [BLOCKS.DIAMOND_ORE]: 'Diamond Ore',
    [BLOCKS.WATER]: 'Water',
    [BLOCKS.TORCH]: 'Torch',
    [BLOCKS.COAL]: 'Coal',
    [BLOCKS.SNOW]: 'Snow',
    [BLOCKS.ICE]: 'Ice',
    [BLOCKS.SANDSTONE]: 'Sandstone',
    [BLOCKS.MUD]: 'Mud',
    [BLOCKS.CLAY]: 'Clay',
    [BLOCKS.MUSHROOM_GRASS]: 'Mushroom Grass',
    [BLOCKS.MUSHROOM]: 'Mushroom',
    [BLOCKS.GLASS]: 'Glass',
    [BLOCKS.COBBLESTONE]: 'Cobblestone',
    [BLOCKS.MARBLE]: 'Marble',
    [BLOCKS.GRANITE]: 'Granite',
    [BLOCKS.CACTUS]: 'Cactus',
    [BLOCKS.JUNGLE_GRASS]: 'Jungle Grass',
    [BLOCKS.JUNGLE_VINE]: 'Jungle Vine',
    [BLOCKS.CORRUPTION_STONE]: 'Corruption Stone',
    [BLOCKS.EBONSTONE]: 'Ebonstone',
    [BLOCKS.CRIMSTONE]: 'Crimstone',
    [BLOCKS.HELLSTONE]: 'Hellstone',
    [BLOCKS.OBSIDIAN]: 'Obsidian',
    [BLOCKS.ASH]: 'Ash',
    [BLOCKS.CLOUD]: 'Cloud',
    [BLOCKS.RAIN_CLOUD]: 'Rain Cloud'
};

// Block Hardness (time to break)
const BLOCK_HARDNESS = {
    [BLOCKS.DIRT]: 0.5,
    [BLOCKS.GRASS]: 0.5,
    [BLOCKS.STONE]: 1.5,
    [BLOCKS.SAND]: 0.4,
    [BLOCKS.WOOD]: 1.0,
    [BLOCKS.LEAVES]: 0.2,
    [BLOCKS.IRON_ORE]: 2.0,
    [BLOCKS.GOLD_ORE]: 2.5,
    [BLOCKS.DIAMOND_ORE]: 3.0,
    [BLOCKS.COAL]: 1.5,
    [BLOCKS.SNOW]: 0.3,
    [BLOCKS.ICE]: 0.8,
    [BLOCKS.SANDSTONE]: 1.2,
    [BLOCKS.MUD]: 0.5,
    [BLOCKS.CLAY]: 0.6,
    [BLOCKS.MUSHROOM_GRASS]: 0.5,
    [BLOCKS.GLASS]: 0.3,
    [BLOCKS.COBBLESTONE]: 2.0,
    [BLOCKS.MARBLE]: 2.5,
    [BLOCKS.GRANITE]: 2.5,
    [BLOCKS.CACTUS]: 0.4,
    [BLOCKS.JUNGLE_GRASS]: 0.5,
    [BLOCKS.CORRUPTION_STONE]: 2.0,
    [BLOCKS.EBONSTONE]: 3.0,
    [BLOCKS.CRIMSTONE]: 3.0,
    [BLOCKS.HELLSTONE]: 4.0,
    [BLOCKS.OBSIDIAN]: 5.0,
    [BLOCKS.ASH]: 0.3,
    [BLOCKS.CLOUD]: 0.1
};

// Items
const ITEMS = {
    PICKAXE: { name: 'Pickaxe', type: 'tool', miningSpeed: 1.5 },
    SWORD: { name: 'Sword', type: 'weapon', damage: 10 },
    TORCH: { name: 'Torch', type: 'placeable', block: BLOCKS.TORCH },
    DIRT: { name: 'Dirt Block', type: 'placeable', block: BLOCKS.DIRT },
    STONE: { name: 'Stone Block', type: 'placeable', block: BLOCKS.STONE },
    WOOD: { name: 'Wood Block', type: 'placeable', block: BLOCKS.WOOD },
    WATER_BUCKET: { name: 'Water Bucket', type: 'water_bucket' }
};

// Water simulation constants
const WATER_MAX = 1.0;
const WATER_MIN = 0.005;
const WATER_FLOW_DOWN = 0.5;
const WATER_FLOW_SIDE = 0.25;
const WATER_EVAPORATION_THRESHOLD = 0.01;
const WATER_CHUNK_SIZE = 16;
const WATER_UPDATE_INTERVAL = 50; // ms between water ticks

// Game State
class GameState {
    constructor() {
        this.world = [];
        this.waterLevel = []; // Per-tile water amount (0-1)
        this.dirtyWaterChunks = new Set(); // Chunks needing water update
        this.waterUpdateTimer = 0;
        this.player = null;
        this.inventory = new Array(40).fill(null);
        this.hotbar = new Array(5).fill(null);
        this.selectedSlot = 0;
        this.health = 100;
        this.maxHealth = 100;
        this.mana = 50;
        this.maxMana = 50;
        this.time = 0; // 0-720 (day cycle)
        this.day = 1;
        this.isNight = false;
        this.inventoryOpen = false;
        this.isPaused = false;
        this.seed = Math.random() * 10000;

        // Debug: Log seed
        console.log("Game seed:", this.seed);
    }

    // FBM helpers for terrain generation
    hash2D(x, y) {
        let n = (x * 374761393) ^ (y * 668265263) ^ (Math.floor(this.seed * 1000));
        n = (n ^ (n >>> 13)) >>> 0;
        return ((n & 0x7fffffff) / 0x7fffffff);
    }
    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }
    lerp(a, b, t) {
        return a + (b - a) * t;
    }
    // Value noise with bilinear interpolation
    noise2DValue(x, y) {
        const xi = Math.floor(x);
        const yi = Math.floor(y);
        const xf = x - xi;
        const yf = y - yi;
        const n00 = this.hash2D(xi, yi);
        const n10 = this.hash2D(xi + 1, yi);
        const n01 = this.hash2D(xi, yi + 1);
        const n11 = this.hash2D(xi + 1, yi + 1);
        const u = this.fade(xf);
        const v = this.fade(yf);
        const x1 = this.lerp(n00, n10, u);
        const x2 = this.lerp(n01, n11, u);
        return this.lerp(x1, x2, v);
    }
    // Fractal Brownian Motion using 2D value noise
    fbm(x, y, octaves = 4, freq = 0.01, amp = 1) {
        let total = 0;
        let maxAmp = 0;
        let f = freq;
        let a = amp;
        for (let i = 0; i < octaves; i++) {
            total += this.noise2DValue(x * f, y * f) * a;
            maxAmp += a;
            f *= 2;
            a *= 0.5;
        }
        return maxAmp > 0 ? total / maxAmp : 0;
    }
    // Existing legacy noise helpers
    noise2D(x, y, seed) {
        const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
        return n - Math.floor(n);
    }

    // Better Perlin-like noise with multiple octaves
    octaveNoise(x, y, octaves, persistence, lacunarity, seed) {
        let total = 0;
        let frequency = 1;
        let amplitude = 1;
        let maxValue = 0;

        for (let i = 0; i < octaves; i++) {
            total += this.noise2D(x * frequency, y * frequency, seed) * amplitude;
            maxValue += amplitude;
            amplitude *= persistence;
            frequency *= lacunarity;
        }

        return total / maxValue;
    }

    // 1D noise for terrain height
    terrainNoise(x, seed) {
        return this.octaveNoise(x, 0, 6, 0.5, 2.0, seed);
    }

    // Worley noise - returns distance to nearest feature point for organic cave shapes
    worleyNoise(x, y, seed, cellSize) {
        const cellX = Math.floor(x / cellSize);
        const cellY = Math.floor(y / cellSize);
        let minDist = 999;

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const cx = cellX + dx;
                const cy = cellY + dy;
                const pointX = cx * cellSize + this.hash2D(cx + seed * 137, cy + seed * 241) * cellSize;
                const pointY = cy * cellSize + this.hash2D(cx + seed * 311, cy + seed * 419) * cellSize;
                const dist = Math.sqrt((x - pointX) ** 2 + (y - pointY) ** 2);
                if (dist < minDist) minDist = dist;
            }
        }

        return minDist / (cellSize * 1.5);
    }

    initWorld() {
        // Initialize empty world (used for loading from save)
        for (let x = 0; x < WORLD_WIDTH; x++) {
            this.world[x] = [];
            this.waterLevel[x] = [];
            for (let y = 0; y < WORLD_HEIGHT; y++) {
                this.world[x][y] = BLOCKS.AIR;
                this.waterLevel[x][y] = 0;
            }
        }

        console.log("World initialized");
    }

    generateWorldAsync(onProgress) {
        return new Promise((resolve, reject) => {
            const worker = new Worker('assets/js/world-worker.js');

            worker.onmessage = (e) => {
                const data = e.data;
                if (data.type === 'progress') {
                    if (onProgress) onProgress(data.value, data.message);
                } else if (data.type === 'complete') {
                    // Unpack flat arrays back into 2D
                    const worldFlat = new Uint8Array(data.world);
                    const waterFlat = new Float32Array(data.waterLevel);
                    const w = data.width;
                    const h = data.height;

                    for (let x = 0; x < w; x++) {
                        this.world[x] = [];
                        this.waterLevel[x] = [];
                        for (let y = 0; y < h; y++) {
                            this.world[x][y] = worldFlat[x * h + y];
                            this.waterLevel[x][y] = waterFlat[x * h + y];
                        }
                    }

                    // Mark all chunks dirty to simulate existing water
                    for (let cx = 0; cx < Math.ceil(WORLD_WIDTH / WATER_CHUNK_SIZE); cx++) {
                        for (let cy = 0; cy < Math.ceil(WORLD_HEIGHT / WATER_CHUNK_SIZE); cy++) {
                            this.dirtyWaterChunks.add(`${cx},${cy}`);
                        }
                    }

                    worker.terminate();
                    resolve();
                }
            };

            worker.onerror = (err) => {
                console.error('World worker error:', err);
                worker.terminate();
                reject(err);
            };

            worker.postMessage({ type: 'generate', seed: this.seed });
        });
    }

    convertStaticWaterToLevels() {
        // Convert existing WATER blocks to water level system
        for (let x = 0; x < WORLD_WIDTH; x++) {
            for (let y = 0; y < WORLD_HEIGHT; y++) {
                if (this.world[x][y] === BLOCKS.WATER) {
                    this.world[x][y] = BLOCKS.AIR;
                    this.waterLevel[x][y] = WATER_MAX;
                    this.markWaterChunkDirty(x, y);
                }
            }
        }
    }

    getWaterChunkKey(x, y) {
        const cx = Math.floor(x / WATER_CHUNK_SIZE);
        const cy = Math.floor(y / WATER_CHUNK_SIZE);
        return `${cx},${cy}`;
    }

    markWaterChunkDirty(x, y) {
        // Mark current chunk and neighbors as dirty
        const cx = Math.floor(x / WATER_CHUNK_SIZE);
        const cy = Math.floor(y / WATER_CHUNK_SIZE);
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const nx = cx + dx;
                const ny = cy + dy;
                if (nx >= 0 && nx < Math.ceil(WORLD_WIDTH / WATER_CHUNK_SIZE) &&
                    ny >= 0 && ny < Math.ceil(WORLD_HEIGHT / WATER_CHUNK_SIZE)) {
                    this.dirtyWaterChunks.add(`${nx},${ny}`);
                }
            }
        }
    }

    updateWater(delta) {
        this.waterUpdateTimer += delta;
        if (this.waterUpdateTimer < WATER_UPDATE_INTERVAL) return false;
        this.waterUpdateTimer = 0;

        if (this.dirtyWaterChunks.size === 0) return false;

        const changed = new Set();
        const chunksToProcess = new Set(this.dirtyWaterChunks);
        this.dirtyWaterChunks.clear();

        // Process each dirty chunk
        for (const chunkKey of chunksToProcess) {
            const [cx, cy] = chunkKey.split(',').map(Number);
            const startX = cx * WATER_CHUNK_SIZE;
            const startY = cy * WATER_CHUNK_SIZE;
            const endX = Math.min(startX + WATER_CHUNK_SIZE, WORLD_WIDTH);
            const endY = Math.min(startY + WATER_CHUNK_SIZE, WORLD_HEIGHT);

            // Bottom-up scan for gravity flow
            for (let y = endY - 1; y >= startY; y--) {
                for (let x = startX; x < endX; x++) {
                    const water = this.waterLevel[x][y];
                    if (water <= WATER_MIN) continue;

                    // Check if block is solid
                    if (this.world[x][y] !== BLOCKS.AIR) {
                        this.waterLevel[x][y] = 0;
                        changed.add(`${x},${y}`);
                        continue;
                    }

                    let remaining = water;
                    let didFlow = false;

                    // 1. Flow down
                    if (y + 1 < WORLD_HEIGHT) {
                        const below = this.world[x][y + 1];
                        const waterBelow = this.waterLevel[x][y + 1];
                        if (below === BLOCKS.AIR && waterBelow < WATER_MAX) {
                            const space = WATER_MAX - waterBelow;
                            const flow = Math.min(remaining * WATER_FLOW_DOWN, space);
                            if (flow > WATER_MIN) {
                                this.waterLevel[x][y + 1] += flow;
                                remaining -= flow;
                                didFlow = true;
                                changed.add(`${x},${y + 1}`);
                            }
                        }
                    }

                    // 2. Flow down-left and down-right (diagonal fall)
                    if (remaining > WATER_MIN && y + 1 < WORLD_HEIGHT) {
                        const dirs = [x - 1, x + 1];
                        for (const nx of dirs) {
                            if (nx < 0 || nx >= WORLD_WIDTH) continue;
                            if (this.world[nx][y + 1] === BLOCKS.AIR && this.waterLevel[nx][y + 1] < WATER_MAX) {
                                const space = WATER_MAX - this.waterLevel[nx][y + 1];
                                const flow = Math.min(remaining * 0.3, space);
                                if (flow > WATER_MIN) {
                                    this.waterLevel[nx][y + 1] += flow;
                                    remaining -= flow;
                                    didFlow = true;
                                    changed.add(`${nx},${y + 1}`);
                                }
                            }
                        }
                    }

                    // 3. Spread sideways (only if can't flow down)
                    if (remaining > WATER_MIN) {
                        // Check if below is blocked or full
                        const canFlowDown = (y + 1 < WORLD_HEIGHT) &&
                            this.world[x][y + 1] === BLOCKS.AIR &&
                            this.waterLevel[x][y + 1] < WATER_MAX - WATER_MIN;

                        if (!canFlowDown) {
                            // Spread to sides
                            const sides = [
                                { nx: x - 1, ny: y },
                                { nx: x + 1, ny: y }
                            ];

                            // Randomize direction for natural spread
                            if (Math.random() > 0.5) sides.reverse();

                            for (const side of sides) {
                                if (side.nx < 0 || side.nx >= WORLD_WIDTH) continue;
                                if (this.world[side.nx][side.ny] === BLOCKS.AIR) {
                                    const neighborWater = this.waterLevel[side.nx][side.ny];
                                    if (neighborWater < remaining - WATER_MIN) {
                                        // Equalize: flow from high to low
                                        const diff = remaining - neighborWater;
                                        const flow = Math.min(diff * WATER_FLOW_SIDE, remaining - WATER_MIN);
                                        if (flow > WATER_MIN) {
                                            this.waterLevel[side.nx][side.ny] += flow;
                                            remaining -= flow;
                                            didFlow = true;
                                            changed.add(`${side.nx},${side.ny}`);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // Update current cell
                    if (Math.abs(this.waterLevel[x][y] - remaining) > WATER_MIN) {
                        this.waterLevel[x][y] = remaining;
                        changed.add(`${x},${y}`);
                    }

                    // Evaporate tiny amounts to prevent infinite pooling
                    if (remaining < WATER_EVAPORATION_THRESHOLD) {
                        this.waterLevel[x][y] = 0;
                        changed.add(`${x},${y}`);
                    }
                }
            }
        }

        // Mark changed cells' chunks as dirty for next iteration
        for (const key of changed) {
            const [x, y] = key.split(',').map(Number);
            this.markWaterChunkDirty(x, y);
        }

        // Remove fully drained cells from dirty tracking
        for (const key of [...changed]) {
            const [x, y] = key.split(',').map(Number);
            if (this.waterLevel[x][y] <= 0) {
                changed.delete(key);
            }
        }

        return changed.size > 0;
    }

    getWaterLevel(x, y) {
        if (x >= 0 && x < WORLD_WIDTH && y >= 0 && y < WORLD_HEIGHT) {
            return this.waterLevel[x][y];
        }
        return 0;
    }

    setWater(x, y, amount) {
        if (x >= 0 && x < WORLD_WIDTH && y >= 0 && y < WORLD_HEIGHT) {
            this.waterLevel[x][y] = Math.max(0, Math.min(WATER_MAX, amount));
            this.markWaterChunkDirty(x, y);
        }
    }

    addWater(x, y, amount) {
        if (x >= 0 && x < WORLD_WIDTH && y >= 0 && y < WORLD_HEIGHT && this.world[x][y] === BLOCKS.AIR) {
            this.waterLevel[x][y] = Math.min(WATER_MAX, this.waterLevel[x][y] + amount);
            this.markWaterChunkDirty(x, y);
        }
    }

    generateWorldStructure() {
        const surfaceHeight = new Array(WORLD_WIDTH);
        const biomeMap = new Array(WORLD_WIDTH);

        // Step 1: Generate biomes
        this.generateBiomes(biomeMap);

        // Step 2: Generate surface heights based on biomes
        this.generateSurfaceHeights(surfaceHeight, biomeMap);

        // Step 3: Fill terrain layers
        this.fillTerrainLayers(surfaceHeight, biomeMap);

        // Step 4: Generate caves (disabled for flat terrain)
        // this.generateCaves();

        // Step 5: Generate underground layers and ores
        this.generateUndergroundFeatures(surfaceHeight);

        // Step 6: Generate water features
        this.generateWaterFeatures(surfaceHeight);

        // Step 7: Generate trees and vegetation
        this.generateVegetation(surfaceHeight, biomeMap);

        // Step 8: Generate structures
        this.generateStructures(surfaceHeight, biomeMap);
    }

    generateBiomes(biomeMap) {
        // Biomes: 0=Forest, 1=Desert, 2=Snow, 3=Jungle, 4=Corruption/Crimson, 5=Ocean, 6=Plains
        const biomeSeed = this.seed;
        const biomeNoiseScale = 0.02;

        // Generate biome boundaries
        let currentBiome = 0; // Start with forest
        let biomeStart = 0;
        const biomeWidths = [40, 30, 35, 35, 30, 30]; // Target widths for each biome

        for (let x = 0; x < WORLD_WIDTH; x++) {
            // Use noise to create biome transitions
            const noiseVal = this.noise2D(x * biomeNoiseScale, 0, biomeSeed);
            const noiseVal2 = this.noise2D(x * biomeNoiseScale + 100, 0, biomeSeed);

            // Determine biome based on position and noise
            const worldPosition = x / WORLD_WIDTH;

            if (worldPosition < 0.1) {
                biomeMap[x] = 5; // Left Ocean
            } else if (worldPosition < 0.3) {
                biomeMap[x] = noiseVal > 0.6 ? 1 : 0; // Forest or Desert
            } else if (worldPosition < 0.5) {
                biomeMap[x] = noiseVal > 0.5 ? 2 : 0; // Snow or Forest
            } else if (worldPosition < 0.7) {
                biomeMap[x] = noiseVal > 0.55 ? 3 : 0; // Jungle or Forest
            } else if (worldPosition < 0.85) {
                // Plains or Corruption - plains is gentle flat grassland
                if (noiseVal2 > 0.55) {
                    biomeMap[x] = 6; // Plains
                } else if (noiseVal > 0.65) {
                    biomeMap[x] = 4; // Corruption
                } else {
                    biomeMap[x] = 0; // Forest
                }
            } else {
                biomeMap[x] = 5; // Right Ocean
            }
        }

        // Smooth biome transitions
        for (let x = 2; x < WORLD_WIDTH - 2; x++) {
            if (biomeMap[x] !== biomeMap[x - 1] && biomeMap[x] !== biomeMap[x + 1]) {
                // Isolated biome tile, smooth it
                biomeMap[x] = biomeMap[x - 1];
            }
        }
    }

    generateSurfaceHeights(surfaceHeight, biomeMap) {
        const baseHeight = 45.0; // Base surface height (float)
        
        // Use float array for smooth generation, round only at the end
        const heights = new Float64Array(WORLD_WIDTH);

        for (let x = 0; x < WORLD_WIDTH; x++) {
            const biome = biomeMap[x];
            let heightModifier = 0;
            let noiseAmplitude = 8;
            let noiseFreq = 0.04;
            let noiseOctaves = 4;

            // Biome-specific height modifiers
            switch (biome) {
                case 0: // Forest - rolling hills
                    noiseAmplitude = 10;
                    heightModifier = 0;
                    noiseFreq = 0.03;
                    noiseOctaves = 5;
                    break;
                case 1: // Desert - gentle dunes
                    noiseAmplitude = 4;
                    heightModifier = 5;
                    noiseFreq = 0.02;
                    noiseOctaves = 4;
                    break;
                case 2: // Snow - mountains
                    noiseAmplitude = 14;
                    heightModifier = -3;
                    noiseFreq = 0.025;
                    noiseOctaves = 6;
                    break;
                case 3: // Jungle - elevated hills
                    noiseAmplitude = 8;
                    heightModifier = 3;
                    noiseFreq = 0.025;
                    noiseOctaves = 5;
                    break;
                case 4: // Corruption - valleys
                    noiseAmplitude = 14;
                    heightModifier = -4;
                    noiseFreq = 0.03;
                    noiseOctaves = 5;
                    break;
                case 5: // Ocean - low gentle
                    noiseAmplitude = 3;
                    heightModifier = -12;
                    noiseFreq = 0.015;
                    noiseOctaves = 3;
                    break;
                case 6: // Plains - flat
                    noiseAmplitude = 3;
                    heightModifier = 1;
                    noiseFreq = 0.02;
                    noiseOctaves = 4;
                    break;
            }

            // Generate height using FBM with sub-tile precision
            const noise1 = this.fbm(x * noiseFreq, this.seed, noiseOctaves, 0.5, 1);
            const noise2 = this.fbm(x * noiseFreq * 0.4, this.seed + 1000, Math.max(3, noiseOctaves - 1), 0.5, 1) * 0.4;
            const noise3 = this.fbm(x * noiseFreq * 0.15, this.seed + 2000, Math.max(3, noiseOctaves - 2), 0.5, 1) * 0.2;

            const combinedNoise = (noise1 + noise2 + noise3) / 1.6; // Normalize
            heights[x] = baseHeight + heightModifier + combinedNoise * noiseAmplitude;
        }

        // Gaussian-like smoothing with wide kernel for smooth rolling hills
        const smoothed = new Float64Array(WORLD_WIDTH);
        const kernel = [0.06, 0.12, 0.2, 0.24, 0.2, 0.12, 0.06]; // 7-tap Gaussian kernel
        
        for (let pass = 0; pass < 5; pass++) {
            const src = pass === 0 ? heights : smoothed;
            const dst = smoothed;
            
            for (let x = 0; x < WORLD_WIDTH; x++) {
                let sum = 0;
                let weightSum = 0;
                
                for (let k = -3; k <= 3; k++) {
                    const nx = x + k;
                    if (nx >= 0 && nx < WORLD_WIDTH) {
                        const biome = biomeMap[x];
                        const neighborBiome = biomeMap[nx];
                        
                        // Reduce weight at biome boundaries
                        let weight = kernel[k + 3];
                        if (biome !== neighborBiome) {
                            weight *= 0.3; // Strongly reduce smoothing across biome edges
                        }
                        
                        sum += src[nx] * weight;
                        weightSum += weight;
                    }
                }
                
                dst[x] = sum / weightSum;
            }
        }

        // Final rounding to integers
        for (let x = 0; x < WORLD_WIDTH; x++) {
            surfaceHeight[x] = Math.round(smoothed[x]);
            surfaceHeight[x] = Math.max(15, Math.min(85, surfaceHeight[x]));
            
            // Debug: Log surface height for a few x values
            if (x === 50 || x === 100 || x === 150) {
                console.log(`Surface height at x=${x}: ${surfaceHeight[x]} (biome=${biomeMap[x]})`);
            }
        }
        
        // Debug: Log surface heights
        console.log("Surface heights:");
        for (let x = 0; x < WORLD_WIDTH; x += 25) {
            console.log(`  x=${x}: ${surfaceHeight[x]}`);
        }
    }

    fillTerrainLayers(surfaceHeight, biomeMap) {
        console.log("Starting fillTerrainLayers...");
        let nonAirCount = 0;
        let totalBlocks = 0;
        
        for (let x = 0; x < WORLD_WIDTH; x++) {
            const surface = surfaceHeight[x];
            const biome = biomeMap[x];

            for (let y = 0; y < WORLD_HEIGHT; y++) {
                totalBlocks++;
                if (y < surface) {
                    // Sky
                    this.world[x][y] = BLOCKS.AIR;
                } else if (y === surface) {
                    // Surface layer - biome specific
                    this.world[x][y] = this.getSurfaceBlock(biome);
                    if (this.world[x][y] !== BLOCKS.AIR) nonAirCount++;
                } else if (y < surface + 12) {
                    // Subsurface layer (thicker dirt/sand/mud)
                    this.world[x][y] = this.getSubsurfaceBlock(biome, y - surface);
                    if (this.world[x][y] !== BLOCKS.AIR) nonAirCount++;
                } else if (y < surface + 35) {
                    // Underground dirt/stone transition
                    const transitionProgress = (y - surface - 12) / 23;
                    if (Math.random() < transitionProgress) {
                        this.world[x][y] = BLOCKS.STONE;
                    } else {
                        this.world[x][y] = BLOCKS.DIRT;
                    }
                    if (this.world[x][y] !== BLOCKS.AIR) nonAirCount++;
                } else {
                    // Deep underground - mostly stone
                    this.world[x][y] = BLOCKS.STONE;
                    if (this.world[x][y] !== BLOCKS.AIR) nonAirCount++;
                }
                
                // Debug: Log a few specific blocks as we set them
                if ((x === 50 && y === 50) || (x === 100 && y === 50)) {
                    console.log(`Setting block at (${x},${y}) to:`, this.world[x][y]);
                }
            }
        }
        
        console.log(`fillTerrainLayers complete. Total blocks: ${totalBlocks}, Non-air blocks: ${nonAirCount}`);
        
        // Sample some blocks to verify
        console.log("Sample blocks after terrain fill:");
        console.log("Block at (50, 30):", this.world[50] ? this.world[50][30] : "undefined");
        console.log("Block at (50, 50):", this.world[50] ? this.world[50][50] : "undefined");
        console.log("Block at (100, 30):", this.world[100] ? this.world[100][30] : "undefined");
        console.log("Block at (100, 50):", this.world[100] ? this.world[100][50] : "undefined");
        
        // Additional verification - count non-air in a region
        let checkNonAir = 0;
        for (let x = 95; x <= 105; x++) {
            for (let y = 45; y <= 55; y++) {
                if (this.world[x][y] !== BLOCKS.AIR) checkNonAir++;
            }
        }
        console.log(`Non-air blocks in region (95-105,45-55): ${checkNonAir}/121`);
    }

    getSurfaceBlock(biome) {
        switch (biome) {
            case 0: return BLOCKS.GRASS;     // Forest
            case 1: return BLOCKS.SAND;      // Desert
            case 2: return BLOCKS.SNOW;      // Snow
            case 3: return BLOCKS.JUNGLE_GRASS; // Jungle
            case 4: return BLOCKS.CORRUPTION_STONE; // Corruption
            case 5: return BLOCKS.SAND;      // Ocean beach
            case 6: return BLOCKS.GRASS;     // Plains
            default: return BLOCKS.GRASS;
        }
    }

    getSubsurfaceBlock(biome, depth) {
        switch (biome) {
            case 0: // Forest
                return depth < 5 ? BLOCKS.DIRT : BLOCKS.STONE;
            case 1: // Desert
                return depth < 6 ? BLOCKS.SAND : BLOCKS.SANDSTONE;
            case 2: // Snow
                return depth < 4 ? BLOCKS.DIRT : BLOCKS.ICE;
            case 3: // Jungle
                return depth < 4 ? BLOCKS.MUD : BLOCKS.STONE;
            case 4: // Corruption
                return depth < 4 ? BLOCKS.DIRT : BLOCKS.EBONSTONE;
            case 5: // Ocean
                return BLOCKS.SAND;
            case 6: // Plains
                return depth < 7 ? BLOCKS.DIRT : BLOCKS.STONE;
            default:
                return BLOCKS.DIRT;
        }
    }

    generateCaves() {
        const caveSeed = this.seed + 1000;

        // --- Pass 1: Carve caves using cellular automata ---
        // Create a temporary grid to work with
        const caveGrid = [];
        for (let x = 0; x < WORLD_WIDTH; x++) {
            caveGrid[x] = [];
            for (let y = 0; y < WORLD_HEIGHT; y++) {
                if (y < 35 || this.world[x][y] === BLOCKS.AIR) {
                    caveGrid[x][y] = 0; // air/sky stays air
                } else {
                    // Random fill: depth-dependent threshold - fewer caves near surface
                    const fillDepthRatio = (y - 35) / (WORLD_HEIGHT - 35);
                    caveGrid[x][y] = this.hash2D(x + caveSeed, y + caveSeed * 2) > (0.55 + fillDepthRatio * 0.2) ? 1 : 0;
                }
            }
        }

        // Run cellular automata smoothing passes (4 iterations)
        for (let iter = 0; iter < 4; iter++) {
            const next = [];
            for (let x = 0; x < WORLD_WIDTH; x++) {
                next[x] = [];
                for (let y = 0; y < WORLD_HEIGHT; y++) {
                    if (y < 35) { next[x][y] = 0; continue; }

                    let neighbors = 0;
                    for (let dx = -1; dx <= 1; dx++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            if (dx === 0 && dy === 0) continue;
                            const nx = x + dx, ny = y + dy;
                            if (nx < 0 || nx >= WORLD_WIDTH || ny < 0 || ny >= WORLD_HEIGHT) {
                                neighbors++;
                            } else {
                                neighbors += caveGrid[nx][ny];
                            }
                        }
                    }

                    // Rule: become solid if 5+ neighbors are solid, else become air if 3- are solid
                    next[x][y] = neighbors >= 5 ? 1 : (neighbors <= 3 ? 0 : caveGrid[x][y]);
                }
            }
            for (let x = 0; x < WORLD_WIDTH; x++) {
                for (let y = 0; y < WORLD_HEIGHT; y++) {
                    caveGrid[x][y] = next[x][y];
                }
            }
        }

        // --- Pass 2: Layer different cave sizes at different depths ---
        for (let x = 0; x < WORLD_WIDTH; x++) {
            for (let y = 35; y < WORLD_HEIGHT; y++) {
                if (this.world[x][y] === BLOCKS.AIR) continue;

                const depthRatio = (y - 35) / (WORLD_HEIGHT - 35);

                // Small winding tunnels (all depths) - lower threshold near surface for fewer caves
                const tunnel = this.caveNoise(x * 1.5, y * 2.0, caveSeed);
                const tunnelThresh = 0.26 - depthRatio * 0.15;
                if (tunnel < tunnelThresh) {
                    this.world[x][y] = BLOCKS.AIR;
                    continue;
                }

                // Medium caverns (deeper) - reduced frequency
                if (depthRatio > 0.3) {
                    const cavern = this.worleyNoise(x * 0.9, y * 1.2, caveSeed + 300, 14);
                    const cavernThresh = 0.08 - (depthRatio - 0.3) * 0.1;
                    if (cavern < cavernThresh) {
                        this.world[x][y] = BLOCKS.AIR;
                        continue;
                    }
                }

                // Large underground lakes/chambers (deep only) - significantly reduced
                if (depthRatio > 0.6) {
                    const chamber = this.worleyNoise(x * 0.6, y * 0.7, caveSeed + 600, 22);
                    const chamberThresh = 0.05 - (depthRatio - 0.6) * 0.1;
                    if (chamber < chamberThresh) {
                        this.world[x][y] = BLOCKS.AIR;
                    }
                }
            }
        }

        // --- Pass 3: Apply cellular automata result for organic shapes ---
        for (let x = 0; x < WORLD_WIDTH; x++) {
            for (let y = 35; y < WORLD_HEIGHT; y++) {
                if (caveGrid[x][y] === 0 && this.world[x][y] !== BLOCKS.AIR) {
                    // Use noise to decide - blend CA result with noise for variety
                    const depthRatioBlend = (y - 35) / (WORLD_HEIGHT - 35);
                    const blend = this.fbm(x * 0.08 + caveSeed, y * 0.08, 2, 0.5, 1);
                    const blendThresh = 0.48 - depthRatioBlend * 0.15;
                    if (blend < blendThresh) {
                        this.world[x][y] = BLOCKS.AIR;
                    }
                }
            }
        }

        // --- Pass 4: Connect caves with thin tunnels ---
        for (let x = 2; x < WORLD_WIDTH - 2; x++) {
            for (let y = 60; y < WORLD_HEIGHT - 5; y++) {
                if (this.world[x][y] !== BLOCKS.AIR) {
                    // Only horizontal connections to keep caves separate vertically
                    const horizAir = (this.world[x-1][y] === BLOCKS.AIR && this.world[x+1][y] === BLOCKS.AIR);
                    if (horizAir) {
                        this.world[x][y] = BLOCKS.AIR;
                    }
                }
            }
        }

        // Clean up isolated floating blocks
        this.cleanupIsolatedBlocks();
    }

    cleanupIsolatedBlocks() {
        // Two passes: remove isolated single blocks and thin walls between cave sections
        for (let pass = 0; pass < 2; pass++) {
            for (let x = 1; x < WORLD_WIDTH - 1; x++) {
                for (let y = 60; y < WORLD_HEIGHT - 1; y++) {
                    if (this.world[x][y] === BLOCKS.AIR) continue;

                    // Count air neighbors (4-directional)
                    let airNeighbors = 0;
                    if (this.world[x - 1][y] === BLOCKS.AIR) airNeighbors++;
                    if (this.world[x + 1][y] === BLOCKS.AIR) airNeighbors++;
                    if (this.world[x][y - 1] === BLOCKS.AIR) airNeighbors++;
                    if (this.world[x][y + 1] === BLOCKS.AIR) airNeighbors++;

                    // Remove blocks that are almost fully surrounded by air (floating singles)
                    if (airNeighbors >= 3) {
                        this.world[x][y] = BLOCKS.AIR;
                    }
                    // Remove thin walls (blocks with air on opposite sides)
                    else if (airNeighbors === 2) {
                        const leftAir = this.world[x - 1][y] === BLOCKS.AIR;
                        const rightAir = this.world[x + 1][y] === BLOCKS.AIR;
                        const topAir = this.world[x][y - 1] === BLOCKS.AIR;
                        const bottomAir = this.world[x][y + 1] === BLOCKS.AIR;
                        // Opposite sides are air = thin wall
                        if ((leftAir && rightAir) || (topAir && bottomAir)) {
                            if (this.hash2D(x + y * 100, pass + this.seed) > 0.7) {
                                this.world[x][y] = BLOCKS.AIR;
                            }
                        }
                    }
                }
            }
        }
    }

    generateUndergroundFeatures(surfaceHeight) {
        const oreSeed = this.seed + 2000;

        // Generate ore veins with proper depth distribution
        for (let x = 0; x < WORLD_WIDTH; x += 3) {
            for (let y = 50; y < WORLD_HEIGHT; y += 3) {
                if (this.world[x][y] !== BLOCKS.STONE) continue;

                const depthRatio = (y - 50) / (WORLD_HEIGHT - 50);
                const noiseVal = this.noise2D(x * 0.5, y * 0.5, oreSeed);

                // Coal - common, shallow
                if (depthRatio < 0.4 && noiseVal > 0.85) {
                    this.generateOreVein(x, y, BLOCKS.COAL, 6);
                }

                // Iron - common, medium depth
                if (depthRatio > 0.2 && depthRatio < 0.7 && noiseVal > 0.88) {
                    this.generateOreVein(x, y, BLOCKS.IRON_ORE, 7);
                }

                // Gold - rare, deep
                if (depthRatio > 0.5 && noiseVal > 0.92) {
                    this.generateOreVein(x, y, BLOCKS.GOLD_ORE, 5);
                }

                // Diamond - very rare, very deep
                if (depthRatio > 0.8 && noiseVal > 0.96) {
                    this.generateOreVein(x, y, BLOCKS.DIAMOND_ORE, 4);
                }
            }
        }

        // Generate clay deposits near water
        for (let x = 0; x < WORLD_WIDTH; x++) {
            for (let y = 45; y < 70; y++) {
                if (this.world[x][y] === BLOCKS.DIRT) {
                    if (this.noise2D(x * 0.3, y * 0.3, oreSeed + 500) > 0.8) {
                        this.world[x][y] = BLOCKS.CLAY;
                    }
                }
            }
        }

        // Generate marble and granite pockets
        for (let i = 0; i < 20; i++) {
            const cx = Math.floor(this.noise2D(i, 0, oreSeed + 1000) * WORLD_WIDTH);
            const cy = 60 + Math.floor(this.noise2D(i, 1, oreSeed + 1000) * (WORLD_HEIGHT - 70));
            const radius = 3 + Math.floor(this.noise2D(i, 2, oreSeed + 1000) * 4);
            const type = i % 2 === 0 ? BLOCKS.MARBLE : BLOCKS.GRANITE;

            for (let dx = -radius; dx <= radius; dx++) {
                for (let dy = -radius; dy <= radius; dy++) {
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist <= radius) {
                        const nx = cx + dx;
                        const ny = cy + dy;
                        if (nx >= 0 && nx < WORLD_WIDTH && ny >= 0 && ny < WORLD_HEIGHT) {
                            if (this.world[nx][ny] === BLOCKS.STONE && Math.random() > 0.3) {
                                this.world[nx][ny] = type;
                            }
                        }
                    }
                }
            }
        }

        // Generate underground mushroom biome
        const mushroomX = Math.floor(WORLD_WIDTH * (0.3 + this.noise2D(0, 0, oreSeed + 2000) * 0.4));
        const mushroomY = 70 + Math.floor(this.noise2D(1, 0, oreSeed + 2000) * 30);

        for (let dx = -15; dx <= 15; dx++) {
            for (let dy = -10; dy <= 10; dy++) {
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist <= 12) {
                    const nx = mushroomX + dx;
                    const ny = mushroomY + dy;
                    if (nx >= 0 && nx < WORLD_WIDTH && ny >= 0 && ny < WORLD_HEIGHT) {
                        if (this.world[nx][ny] === BLOCKS.STONE || this.world[nx][ny] === BLOCKS.DIRT) {
                            if (dist <= 10) {
                                this.world[nx][ny] = BLOCKS.MUSHROOM_GRASS;
                            }
                            // Add mushrooms
                            if (dist <= 8 && Math.random() > 0.85 && this.world[nx][ny - 1] === BLOCKS.AIR) {
                                this.world[nx][ny - 1] = BLOCKS.MUSHROOM;
                            }
                        }
                    }
                }
            }
        }

        // Generate hell layer at bottom
        for (let x = 0; x < WORLD_WIDTH; x++) {
            for (let y = WORLD_HEIGHT - 15; y < WORLD_HEIGHT; y++) {
                if (y > WORLD_HEIGHT - 5) {
                    this.world[x][y] = BLOCKS.LAVA || BLOCKS.HELLSTONE;
                } else if (y > WORLD_HEIGHT - 10) {
                    if (this.world[x][y] === BLOCKS.STONE) {
                        this.world[x][y] = BLOCKS.HELLSTONE;
                    }
                } else {
                    if (this.world[x][y] === BLOCKS.STONE && Math.random() > 0.7) {
                        this.world[x][y] = BLOCKS.ASH;
                    }
                }
            }
        }
    }

    generateOreVein(startX, startY, oreType, size) {
        const stack = [[startX, startY]];
        const visited = new Set();
        visited.add(`${startX},${startY}`);

        while (stack.length > 0 && visited.size < size * 5) {
            const [x, y] = stack.pop();

            if (x >= 0 && x < WORLD_WIDTH && y >= 0 && y < WORLD_HEIGHT) {
                if (this.world[x][y] === BLOCKS.STONE) {
                    this.world[x][y] = oreType;

                    // Add neighbors with probability
                    const neighbors = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
                    for (const [nx, ny] of neighbors) {
                        const key = `${nx},${ny}`;
                        if (!visited.has(key) && Math.random() > 0.3) {
                            visited.add(key);
                            stack.push([nx, ny]);
                        }
                    }
                }
            }
        }
    }

    generateWaterFeatures(surfaceHeight) {
        const waterSeed = this.seed + 3000;

        // Generate underground water pockets
        for (let i = 0; i < 30; i++) {
            const wx = Math.floor(this.noise2D(i, 0, waterSeed) * WORLD_WIDTH);
            const wy = 60 + Math.floor(this.noise2D(i, 1, waterSeed) * (WORLD_HEIGHT - 80));
            const width = 5 + Math.floor(this.noise2D(i, 2, waterSeed) * 10);
            const height = 3 + Math.floor(this.noise2D(i, 3, waterSeed) * 6);

            for (let dx = -width / 2; dx < width / 2; dx++) {
                for (let dy = 0; dy < height; dy++) {
                    const nx = Math.floor(wx + dx);
                    const ny = wy + dy;
                    if (nx >= 0 && nx < WORLD_WIDTH && ny >= 0 && ny < WORLD_HEIGHT) {
                        if (this.world[nx][ny] === BLOCKS.AIR || this.world[nx][ny] === BLOCKS.STONE) {
                            this.world[nx][ny] = BLOCKS.WATER;
                        }
                    }
                }
            }
        }

        // Generate surface lakes
        for (let i = 0; i < 5; i++) {
            const lx = 30 + Math.floor(this.noise2D(i, 4, waterSeed) * (WORLD_WIDTH - 60));
            let ly = surfaceHeight[lx];
            const lakeWidth = 10 + Math.floor(this.noise2D(i, 5, waterSeed) * 15);
            const lakeDepth = 4 + Math.floor(this.noise2D(i, 6, waterSeed) * 8);

            for (let dx = -lakeWidth / 2; dx < lakeWidth / 2; dx++) {
                const nx = Math.floor(lx + dx);
                if (nx >= 0 && nx < WORLD_WIDTH) {
                    // Find surface at this x
                    let sy = surfaceHeight[nx];
                    for (let dy = 0; dy < lakeDepth; dy++) {
                        const ny = sy + dy;
                        if (ny >= 0 && ny < WORLD_HEIGHT) {
                            this.world[nx][ny] = BLOCKS.WATER;
                        }
                    }
                }
            }
        }
    }

    generateVegetation(surfaceHeight, biomeMap) {
        const treeSeed = this.seed + 4000;

        for (let x = 5; x < WORLD_WIDTH - 5; x++) {
            const biome = biomeMap[x];
            const surface = surfaceHeight[x];

            // Only generate trees on suitable biomes
            if (biome === 0 || biome === 3) { // Forest or Jungle
                if (this.noise2D(x, 0, treeSeed) > 0.75) {
                    this.generateTree(x, surface, biome);
                }
            }

            // Generate cacti in desert
            if (biome === 1 && this.noise2D(x, 1, treeSeed) > 0.8) {
                this.generateCactus(x, surface);
            }

            // Generate jungle vines
            if (biome === 3) {
                for (let y = surface - 1; y > surface - 15; y--) {
                    if (this.world[x][y] === BLOCKS.AIR &&
                        this.world[x][y + 1] === BLOCKS.JUNGLE_GRASS &&
                        this.noise2D(x, y, treeSeed + 100) > 0.85) {
                        this.world[x][y] = BLOCKS.JUNGLE_VINE;
                    }
                }
            }
        }

        // Generate cloud islands in the sky
        for (let i = 0; i < 5; i++) {
            const cx = 20 + Math.floor(this.noise2D(i, 0, treeSeed + 2000) * (WORLD_WIDTH - 40));
            const cy = 10 + Math.floor(this.noise2D(i, 1, treeSeed + 2000) * 20);
            const cloudWidth = 8 + Math.floor(this.noise2D(i, 2, treeSeed + 2000) * 12);

            for (let dx = -cloudWidth / 2; dx < cloudWidth / 2; dx++) {
                const nx = Math.floor(cx + dx);
                if (nx >= 0 && nx < WORLD_WIDTH) {
                    const cloudHeight = 2 + Math.floor(this.noise2D(nx, cy, treeSeed + 3000) * 3);
                    for (let dy = 0; dy < cloudHeight; dy++) {
                        if (cy + dy >= 0 && cy + dy < WORLD_HEIGHT) {
                            this.world[nx][cy + dy] = BLOCKS.CLOUD;
                        }
                    }
                }
            }
        }
    }

     generateTree(x, groundY, biome) {
        // Don't generate tree if the ground is water
        if (this.getBlock(x, groundY) === BLOCKS.WATER) {
            return;
        }
        const treeSeed = this.seed + 5000;
        let trunkHeight, trunkBlock, leafBlock;

        if (biome === 3) { // Jungle
            trunkHeight = 8 + Math.floor(this.noise2D(x, 0, treeSeed) * 6);
            trunkBlock = BLOCKS.WOOD;
            leafBlock = BLOCKS.LEAVES;
        } else { // Forest
            trunkHeight = 5 + Math.floor(this.noise2D(x, 1, treeSeed) * 4);
            trunkBlock = BLOCKS.WOOD;
            leafBlock = BLOCKS.LEAVES;
        }

        // Check if there's space for the tree
        for (let y = 1; y <= trunkHeight + 3; y++) {
            if (groundY - y < 0) return;
            if (this.world[x][groundY - y] !== BLOCKS.AIR) return;
        }

        // Generate trunk
        for (let y = 1; y <= trunkHeight; y++) {
            if (groundY - y >= 0) {
                this.world[x][groundY - y] = trunkBlock;
            }
        }

        // Generate leaves
        const leafStart = groundY - trunkHeight;
        for (let ly = -2; ly <= 1; ly++) {
            const width = Math.abs(ly) === 2 ? 1 : 2;
            for (let lx = -width; lx <= width; lx++) {
                const nx = x + lx;
                const ny = leafStart + ly;
                if (nx >= 0 && nx < WORLD_WIDTH && ny >= 0 && ny < WORLD_HEIGHT) {
                    if (this.world[nx][ny] === BLOCKS.AIR) {
                        if (Math.abs(lx) < width || Math.abs(ly) < 2) {
                            this.world[nx][ny] = leafBlock;
                        }
                    }
                }
            }
        }

        // Top leaves
        if (leafStart - 1 >= 0) {
            this.world[x][leafStart - 1] = leafBlock;
        }
    }

     generateCactus(x, groundY) {
         // Don't generate cactus if the ground is water
         if (this.getBlock(x, groundY) === BLOCKS.WATER) {
             return;
         }
         const height = 3 + Math.floor(Math.random() * 3);
         for (let y = 1; y <= height; y++) {
             if (groundY - y >= 0) {
                 this.world[x][groundY - y] = BLOCKS.CACTUS;
             }
         }
     }

    generateStructures(surfaceHeight, biomeMap) {
        // Generate small underground houses
        const structureSeed = this.seed + 6000;

        for (let i = 0; i < 8; i++) {
            const sx = 10 + Math.floor(this.noise2D(i, 0, structureSeed) * (WORLD_WIDTH - 20));
            const sy = 55 + Math.floor(this.noise2D(i, 1, structureSeed) * (WORLD_HEIGHT - 70));
            const width = 7 + Math.floor(this.noise2D(i, 2, structureSeed) * 5);
            const height = 5;

            this.generateUndergroundHouse(sx, sy, width, height);
        }
    }

    generateUndergroundHouse(startX, startY, width, height) {
        // Check if location is suitable
        for (let x = startX; x < startX + width; x++) {
            for (let y = startY; y < startY + height; y++) {
                if (x < 0 || x >= WORLD_WIDTH || y < 0 || y >= WORLD_HEIGHT) return;
                if (this.world[x][y] === BLOCKS.AIR) return;
            }
        }

        // Create hollow space
        for (let x = startX + 1; x < startX + width - 1; x++) {
            for (let y = startY + 1; y < startY + height - 1; y++) {
                this.world[x][y] = BLOCKS.AIR;
            }
        }

        // Add walls
        for (let y = startY; y < startY + height; y++) {
            this.world[startX][y] = BLOCKS.COBBLESTONE;
            this.world[startX + width - 1][y] = BLOCKS.COBBLESTONE;
        }

        // Add floor and ceiling
        for (let x = startX; x < startX + width; x++) {
            this.world[x][startY] = BLOCKS.COBBLESTONE;
            this.world[x][startY + height - 1] = BLOCKS.COBBLESTONE;
        }

        // Add door
        this.world[startX + Math.floor(width / 2)][startY + height - 2] = BLOCKS.AIR;
        this.world[startX + Math.floor(width / 2)][startY + height - 3] = BLOCKS.AIR;
    }

    setBlock(x, y, block) {
        if (x >= 0 && x < WORLD_WIDTH && y >= 0 && y < WORLD_HEIGHT) {
            const oldBlock = this.world[x][y];
            this.world[x][y] = block;
            // If block changed, mark surrounding water chunks dirty
            if (oldBlock !== block) {
                this.markWaterChunkDirty(x, y);
                // Also clear water if a solid block was placed
                if (block !== BLOCKS.AIR && block !== BLOCKS.WATER) {
                    this.waterLevel[x][y] = 0;
                }
            }
            return true;
        }
        return false;
    }

    getBlock(x, y) {
        if (x >= 0 && x < WORLD_WIDTH && y >= 0 && y < WORLD_HEIGHT) {
            return this.world[x][y];
        }
        return BLOCKS.AIR;
    }

    addToInventory(item) {
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i] === null) {
                this.inventory[i] = item;
                return true;
            }
        }
        return false;
    }

    removeFromInventory(slot) {
        if (slot >= 0 && slot < this.inventory.length) {
            const item = this.inventory[slot];
            this.inventory[slot] = null;
            return item;
        }
        return null;
    }

    updateTime(delta) {
        this.time += delta / 1000 * 60; // Convert to game time
        if (this.time >= DAY_LENGTH) {
            this.time = 0;
            this.day++;
        }
        this.isNight = this.time >= DAY_LENGTH / 2;
    }

    getTimeString() {
        const hours = Math.floor((this.time / DAY_LENGTH) * 24);
        const minutes = Math.floor(((this.time / DAY_LENGTH) * 24 - hours) * 60);
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `Day ${this.day} - ${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    save(player) {
        const saveData = {
            world: this.world,
            waterLevel: this.waterLevel,
            playerX: player ? player.x : 0,
            playerY: player ? player.y : 0,
            health: this.health,
            mana: this.mana,
            inventory: this.inventory,
            hotbar: this.hotbar,
            time: this.time,
            day: this.day,
            seed: this.seed
        };
        localStorage.setItem('terraria_save', JSON.stringify(saveData));
    }

    load() {
        const saveData = localStorage.getItem('terraria_save');
        if (saveData) {
            const data = JSON.parse(saveData);
            this.world = data.world;
            this.waterLevel = data.waterLevel || [];
            // Initialize waterLevel if not present in save
            if (!data.waterLevel) {
                for (let x = 0; x < WORLD_WIDTH; x++) {
                    this.waterLevel[x] = [];
                    for (let y = 0; y < WORLD_HEIGHT; y++) {
                        this.waterLevel[x][y] = 0;
                    }
                }
                // Mark all chunks dirty to simulate existing water
                for (let cx = 0; cx < Math.ceil(WORLD_WIDTH / WATER_CHUNK_SIZE); cx++) {
                    for (let cy = 0; cy < Math.ceil(WORLD_HEIGHT / WATER_CHUNK_SIZE); cy++) {
                        this.dirtyWaterChunks.add(`${cx},${cy}`);
                    }
                }
            }
            this.health = data.health;
            this.mana = data.mana;
            this.inventory = data.inventory;
            this.hotbar = data.hotbar;
            this.time = data.time;
            this.day = data.day;
            this.seed = data.seed;
            return { x: data.playerX, y: data.playerY };
        }
        return null;
    }
}

// Main Game Scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.gameState = new GameState();
        this.tileGraphics = null;
        this.waterGraphics = null;
        this.player = null;
        this.cursors = null;
        this.miningTarget = null;
        this.miningProgress = 0;
        this.isMining = false;
        this.placementPreview = null;
        this.enemies = [];
        this.particles = [];
        this.worldRendered = false;
        this.lastRenderPos = new Phaser.Math.Vector2(0, 0);
        this.initialized = false;
        this.needsInitialRender = false;
    }

    preload() {
        // Create textures programmatically
        this.createTextures();
    }

    createTextures() {
        // Player texture
        const playerGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        playerGraphics.fillStyle(0x00ff00);
        playerGraphics.fillRect(0, 0, 14, 28);
        playerGraphics.fillStyle(0xffcc99);
        playerGraphics.fillRect(2, 2, 10, 10);
        playerGraphics.generateTexture('player', 14, 28);
        playerGraphics.destroy();

        // Block textures
        Object.entries(BLOCK_COLORS).forEach(([blockId, color]) => {
            const blockGraphics = this.make.graphics({ x: 0, y: 0, add: false });
            blockGraphics.fillStyle(color);
            blockGraphics.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
            blockGraphics.lineStyle(1, 0x000000, 0.3);
            blockGraphics.strokeRect(0, 0, TILE_SIZE, TILE_SIZE);
            blockGraphics.generateTexture(`block_${blockId}`, TILE_SIZE, TILE_SIZE);
            blockGraphics.destroy();
        });

        // Mining progress texture
        const progressGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        progressGraphics.fillStyle(0xffffff, 0.5);
        progressGraphics.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
        progressGraphics.generateTexture('mining_progress', TILE_SIZE, TILE_SIZE);
        progressGraphics.destroy();

        // Enemy texture
        const enemyGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        enemyGraphics.fillStyle(0xff0000);
        enemyGraphics.fillRect(0, 0, 16, 16);
        enemyGraphics.generateTexture('enemy', 16, 16);
        enemyGraphics.destroy();
        
        // Debug: Check if textures were created
        console.log("Available textures:", Object.keys(this.textures.list).filter(t => t.startsWith('block_')));
    }

    async     create() {
        // Show loading overlay
        const loadingOverlay = document.getElementById('loading-overlay');
        const loadingBarFill = document.getElementById('loading-bar-fill');
        const loadingMessage = document.getElementById('loading-message');
        loadingOverlay.classList.add('visible');

        // Initialize world
        const savedPos = this.gameState.load();
        if (!savedPos) {
            // Generate world asynchronously using Web Worker
            await this.gameState.generateWorldAsync((progress, message) => {
                loadingBarFill.style.width = `${progress}%`;
                loadingMessage.textContent = message;
            });
        }

        // Hide loading overlay
        loadingOverlay.classList.remove('visible');

        // Create tile layer as static group for better performance
        this.tileGraphics = this.physics.add.staticGroup();

        // Create water graphics layer (rendered dynamically)
        this.waterGraphics = this.add.graphics();
        this.waterGraphics.setDepth(5);

        // Create player
        let startX, startY;
        if (savedPos) {
            startX = savedPos.x;
            startY = savedPos.y;
        } else {
            // Find surface at world center and spawn just above it
            startX = Math.floor(WORLD_WIDTH / 2) * TILE_SIZE;
            const tileX = Math.floor(startX / TILE_SIZE);
            // Scan from top to find first solid block (the surface)
            let surfaceY = WORLD_HEIGHT - 1; // Default to bottom if not found
            for (let y = 0; y < WORLD_HEIGHT; y++) {
                if (this.gameState.getBlock(tileX, y) !== BLOCKS.AIR) {
                    surfaceY = y;
                    break;
                }
            }
             // Spawn on the surface
             startY = surfaceY * TILE_SIZE;
             // Ensure we don't go above the world
             startY = Math.min(startY, (WORLD_HEIGHT - 1) * TILE_SIZE);
        }

        this.player = this.physics.add.sprite(startX, startY, 'player');
        this.player.setCollideWorldBounds(false);
        this.player.body.setGravityY(GRAVITY);
        this.player.setDepth(10);

        // Add collision between player and world tiles
        this.physics.add.collider(this.player, this.tileGraphics);

        // Setup camera bounds
        this.cameras.main.setBounds(0, 0, WORLD_WIDTH * TILE_SIZE, WORLD_HEIGHT * TILE_SIZE);
        this.physics.world.setBounds(0, 0, WORLD_WIDTH * TILE_SIZE, WORLD_HEIGHT * TILE_SIZE);
        
        // Mark that we need to do initial render after everything is set up
        this.needsInitialRender = true;

        // Setup input
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
            inventory: Phaser.Input.Keyboard.KeyCodes.E,
            pause: Phaser.Input.Keyboard.KeyCodes.ESC
        });

        // Number keys for hotbar
        for (let i = 1; i <= 5; i++) {
            this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[`NUMPAD_${i}`] || (48 + i));
        }

        // Mouse input
        this.input.on('pointerdown', (pointer) => {
            if (this.gameState.inventoryOpen || this.gameState.isPaused) return;

            const worldX = pointer.worldX;
            const worldY = pointer.worldY;
            const tileX = Math.floor(worldX / TILE_SIZE);
            const tileY = Math.floor(worldY / TILE_SIZE);

            if (pointer.leftButtonDown()) {
                this.startMining(tileX, tileY);
            } else if (pointer.rightButtonDown()) {
                this.placeBlock(tileX, tileY);
            }
        });

        this.input.on('pointerup', () => {
            this.stopMining();
        });

        // Initialize UI
        this.initUI();

        // Give player starting items
        this.gameState.hotbar[0] = { ...ITEMS.PICKAXE };
        this.gameState.hotbar[1] = { ...ITEMS.SWORD };
        this.gameState.hotbar[2] = { ...ITEMS.DIRT, count: 50 };
        this.gameState.hotbar[3] = { ...ITEMS.TORCH, count: 20 };
        this.gameState.hotbar[4] = { ...ITEMS.WOOD, count: 30 };

        // Add water bucket to inventory
        this.gameState.inventory[0] = { ...ITEMS.WATER_BUCKET, count: 5 };

        this.updateUI();

        // Spawn enemies at night
        this.time.addEvent({
            delay: 5000,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        // Auto-save every 30 seconds
        this.time.addEvent({
            delay: 30000,
            callback: () => this.gameState.save(this.player),
            callbackScope: this,
            loop: true
        });

        this.initialized = true;
    }

    renderWorld() {
        // Clear existing tiles
        this.tileGraphics.clear(true, true);

        // Render world around player position
        const playerTileX = Math.floor(this.player.x / TILE_SIZE);
        const playerTileY = Math.floor(this.player.y / TILE_SIZE);
        
        // Load a chunk of world around the player (e.g., 100x100 tiles)
        const renderRadius = 50; // Number of tiles to render in each direction from player
        const startX = Math.max(0, playerTileX - renderRadius);
        const startY = Math.max(0, playerTileY - renderRadius);
        const endX = Math.min(WORLD_WIDTH, playerTileX + renderRadius);
        const endY = Math.min(WORLD_HEIGHT, playerTileY + renderRadius);

        console.log(`Rendering world from (${startX},${startY}) to (${endX},${endY})`);

        let tileCount = 0;
        for (let x = startX; x < endX; x++) {
            for (let y = startY; y < endY; y++) {
                const block = this.gameState.getBlock(x, y);
                // Skip water blocks - handled by dynamic water system
                if (block !== BLOCKS.AIR && block !== BLOCKS.WATER) {
                    const tile = this.tileGraphics.create(
                        x * TILE_SIZE + TILE_SIZE / 2,
                        y * TILE_SIZE + TILE_SIZE / 2,
                        `block_${block}`
                    );
                    tile.setDepth(1);
                    tileCount++;
                }
            }
        }
        
        console.log(`Created ${tileCount} tiles total`);

        // Render water after tiles
        this.renderWater();
        
        // Update last render position
        this.lastRenderPos.set(playerTileX, playerTileY);
    }

    renderWater() {
        this.waterGraphics.clear();

        const playerTileX = Math.floor(this.player.x / TILE_SIZE);
        const playerTileY = Math.floor(this.player.y / TILE_SIZE);
        const renderRadius = 50;
        const startX = Math.max(0, playerTileX - renderRadius);
        const startY = Math.max(0, playerTileY - renderRadius);
        const endX = Math.min(WORLD_WIDTH, playerTileX + renderRadius);
        const endY = Math.min(WORLD_HEIGHT, playerTileY + renderRadius);

        for (let x = startX; x < endX; x++) {
            for (let y = startY; y < endY; y++) {
                const waterLevel = this.gameState.getWaterLevel(x, y);
                if (waterLevel > WATER_MIN) {
                    // Color based on depth/opacity
                    const alpha = Math.min(0.7, waterLevel * 0.7);
                    const depth = Math.max(0, 1 - waterLevel);
                    const r = Math.floor(30 + depth * 50);
                    const g = Math.floor(144 + depth * 60);
                    const b = Math.floor(255 - depth * 30);
                    const color = (r << 16) | (g << 8) | b;

                    // Draw partial water tile based on level
                    const height = TILE_SIZE * waterLevel;
                    const yOffset = TILE_SIZE - height;

                    this.waterGraphics.fillStyle(color, alpha);
                    this.waterGraphics.fillRect(
                        x * TILE_SIZE,
                        y * TILE_SIZE + yOffset,
                        TILE_SIZE,
                        height
                    );
                }
            }
        }
    }

    initUI() {
        // Create hotbar UI
        const hotbarDiv = document.getElementById('hotbar');
        hotbarDiv.innerHTML = '';

        for (let i = 0; i < 5; i++) {
            const slot = document.createElement('div');
            slot.className = 'hotbar-slot';
            slot.dataset.slot = i;
            slot.addEventListener('click', () => this.selectSlot(i));
            hotbarDiv.appendChild(slot);
        }

        // Create inventory grid
        const inventoryGrid = document.getElementById('inventory-grid');
        inventoryGrid.innerHTML = '';

        for (let i = 0; i < 40; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            slot.dataset.slot = i;
            slot.addEventListener('click', () => this.handleInventoryClick(i));
            inventoryGrid.appendChild(slot);
        }

        // Initialize minimap
        this.minimapCanvas = document.getElementById('minimap-canvas');
        this.minimapCtx = this.minimapCanvas.getContext('2d');
        this.minimapPlayer = document.getElementById('minimap-player');
        this.lastMinimapUpdate = 0;
        this.minimapDirty = true;

        // Number keys for slot selection
        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '5') {
                this.selectSlot(parseInt(e.key) - 1);
            } else if (e.key.toLowerCase() === 'e') {
                if (!this.gameState.isPaused) this.toggleInventory();
            } else if (e.key === 'Escape') {
                if (this.gameState.inventoryOpen) {
                    this.toggleInventory();
                } else {
                    this.togglePause();
                }
            }
        });

        // Pause menu buttons
        document.getElementById('btn-resume').addEventListener('click', () => {
            this.togglePause();
        });
        document.getElementById('btn-save').addEventListener('click', () => {
            this.saveAndExit();
        });
        document.getElementById('btn-quit').addEventListener('click', () => {
            this.quitToMenu();
        });
    }

    renderMinimap() {
        if (!this.minimapCtx || !this.minimapCanvas) return;

        const ctx = this.minimapCtx;
        const canvas = this.minimapCanvas;
        const width = canvas.width;
        const height = canvas.height;

        // Clear minimap
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, width, height);

        // Scale factors
        const scaleX = width / WORLD_WIDTH;
        const scaleY = height / WORLD_HEIGHT;

        // Render world blocks on minimap
        for (let x = 0; x < WORLD_WIDTH; x++) {
            for (let y = 0; y < WORLD_HEIGHT; y++) {
                const block = this.gameState.getBlock(x, y);
                const waterLevel = this.gameState.getWaterLevel(x, y);

                if (block !== BLOCKS.AIR) {
                    // Get block color
                    const colorHex = BLOCK_COLORS[block] || 0x808080;
                    const r = (colorHex >> 16) & 0xFF;
                    const g = (colorHex >> 8) & 0xFF;
                    const b = colorHex & 0xFF;
                    ctx.fillStyle = `rgb(${r},${g},${b})`;
                    ctx.fillRect(
                        Math.floor(x * scaleX),
                        Math.floor(y * scaleY),
                        Math.ceil(scaleX),
                        Math.ceil(scaleY)
                    );
                } else if (waterLevel > WATER_MIN) {
                    // Render water
                    const alpha = Math.min(0.8, waterLevel * 0.8);
                    ctx.fillStyle = `rgba(30, 144, 255, ${alpha})`;
                    ctx.fillRect(
                        Math.floor(x * scaleX),
                        Math.floor(y * scaleY),
                        Math.ceil(scaleX),
                        Math.ceil(scaleY)
                    );
                }
            }
        }

        // Draw player position indicator
        if (this.player) {
            const playerTileX = Math.floor(this.player.x / TILE_SIZE);
            const playerTileY = Math.floor(this.player.y / TILE_SIZE);
            const minimapX = playerTileX * scaleX;
            const minimapY = playerTileY * scaleY;

            // Update player indicator position
            this.minimapPlayer.style.left = `${minimapX}px`;
            this.minimapPlayer.style.top = `${minimapY}px`;
        }
    }

    updateMinimap(time) {
        // Update minimap every 2 seconds or when dirty
        if (time - this.lastMinimapUpdate > 2000 || this.minimapDirty) {
            this.renderMinimap();
            this.lastMinimapUpdate = time;
            this.minimapDirty = false;
        }
    }

    selectSlot(slot) {
        this.gameState.selectedSlot = slot;
        this.updateUI();
    }

    toggleInventory() {
        if (this.gameState.isPaused) return;
        this.gameState.inventoryOpen = !this.gameState.inventoryOpen;
        document.getElementById('inventory').style.display =
            this.gameState.inventoryOpen ? 'block' : 'none';
        this.updateUI();
    }

    togglePause() {
        this.gameState.isPaused = !this.gameState.isPaused;
        document.getElementById('pause-menu').style.display =
            this.gameState.isPaused ? 'flex' : 'none';
        if (this.gameState.isPaused) {
            this.physics.pause();
        } else {
            this.physics.resume();
        }
    }

    saveAndExit() {
        this.gameState.save(this.player);
        this.gameState.isPaused = false;
        document.getElementById('pause-menu').style.display = 'none';
        this.scene.start('MenuScene');
    }

    quitToMenu() {
        this.gameState.isPaused = false;
        document.getElementById('pause-menu').style.display = 'none';
        this.scene.start('MenuScene');
    }

    handleInventoryClick(slot) {
        // Simple inventory management
        const item = this.gameState.inventory[slot];
        if (item) {
            // Move to hotbar if there's space
            for (let i = 0; i < this.gameState.hotbar.length; i++) {
                if (this.gameState.hotbar[i] === null) {
                    this.gameState.hotbar[i] = item;
                    this.gameState.inventory[slot] = null;
                    break;
                }
            }
        }
        this.updateUI();
    }

    updateUI() {
        // Update health bar
        const healthPercent = (this.gameState.health / this.gameState.maxHealth) * 100;
        document.getElementById('health-fill').style.width = `${healthPercent}%`;

        // Update mana bar
        const manaPercent = (this.gameState.mana / this.gameState.maxMana) * 100;
        document.getElementById('mana-fill').style.width = `${manaPercent}%`;

        // Update hotbar
        const hotbarSlots = document.querySelectorAll('.hotbar-slot');
        hotbarSlots.forEach((slot, i) => {
            const item = this.gameState.hotbar[i];
            slot.className = `hotbar-slot ${i === this.gameState.selectedSlot ? 'selected' : ''}`;
            slot.innerHTML = item ? `<div style="text-align:center;font-size:10px;color:white;">
                ${item.name}${item.count ? `<br>${item.count}` : ''}
            </div>` : '';
        });

        // Update inventory
        const inventorySlots = document.querySelectorAll('.inventory-slot');
        inventorySlots.forEach((slot, i) => {
            const item = this.gameState.inventory[i];
            slot.innerHTML = item ? `<div style="text-align:center;font-size:10px;color:white;">
                ${item.name}${item.count ? `<br>${item.count}` : ''}
            </div>` : '';
        });

        // Update time display
        document.getElementById('time-display').textContent = this.gameState.getTimeString();

        // Update position display
        if (this.player) {
            const tileX = Math.floor(this.player.x / TILE_SIZE);
            const tileY = Math.floor(this.player.y / TILE_SIZE);
            document.getElementById('position-display').textContent = `X: ${tileX} Y: ${tileY}`;
        }
    }

    startMining(tileX, tileY) {
        const block = this.gameState.getBlock(tileX, tileY);
        const waterLevel = this.gameState.getWaterLevel(tileX, tileY);
        if (block === BLOCKS.AIR && waterLevel <= 0) return;

        this.miningTarget = { x: tileX, y: tileY };
        this.miningProgress = 0;
        this.isMining = true;
    }

    stopMining() {
        this.isMining = false;
        this.miningTarget = null;
        this.miningProgress = 0;

        // Remove mining progress indicator
        if (this.miningIndicator) {
            this.miningIndicator.destroy();
            this.miningIndicator = null;
        }
    }

    mineBlock(delta) {
        if (!this.isMining || !this.miningTarget) return;

        const block = this.gameState.getBlock(this.miningTarget.x, this.miningTarget.y);
        const waterLevel = this.gameState.getWaterLevel(this.miningTarget.x, this.miningTarget.y);

        // Can't mine air with no water
        if (block === BLOCKS.AIR && waterLevel <= 0) {
            this.stopMining();
            return;
        }

        // Check distance to player
        const playerTileX = Math.floor(this.player.x / TILE_SIZE);
        const playerTileY = Math.floor(this.player.y / TILE_SIZE);
        const distance = Math.sqrt(
            Math.pow(playerTileX - this.miningTarget.x, 2) +
            Math.pow(playerTileY - this.miningTarget.y, 2)
        );

        if (distance > 5) {
            this.stopMining();
            return;
        }

        // Handle water "mining" - just drain it
        if (block === BLOCKS.AIR && waterLevel > 0) {
            this.gameState.setWater(this.miningTarget.x, this.miningTarget.y, 0);
            this.stopMining();
            return;
        }

        // Calculate mining speed
        let miningSpeed = 1;
        const heldItem = this.gameState.hotbar[this.gameState.selectedSlot];
        if (heldItem && heldItem.miningSpeed) {
            miningSpeed = heldItem.miningSpeed;
        }

        const hardness = BLOCK_HARDNESS[block] || 1;
        this.miningProgress += (delta / 1000) * miningSpeed;

        // Show mining progress
        if (!this.miningIndicator) {
            this.miningIndicator = this.add.image(
                this.miningTarget.x * TILE_SIZE + TILE_SIZE / 2,
                this.miningTarget.y * TILE_SIZE + TILE_SIZE / 2,
                'mining_progress'
            );
            this.miningIndicator.setDepth(15);
            this.miningIndicator.setAlpha(0.5);
        }

        const progress = Math.min(1, this.miningProgress / hardness);
        this.miningIndicator.setScale(progress, progress);

        if (this.miningProgress >= hardness) {
            // Block mined
            this.breakBlock(this.miningTarget.x, this.miningTarget.y, block);
            this.stopMining();
        }
    }

    breakBlock(tileX, tileY, block) {
        // Water blocks are handled by water system, not inventory
        if (block === BLOCKS.WATER) {
            this.gameState.setWater(tileX, tileY, 0);
            this.minimapDirty = true;
            return;
        }

        // Add block to inventory
        const item = {
            name: BLOCK_NAMES[block] || 'Unknown',
            type: 'placeable',
            block: block,
            count: 1
        };

        // Try to add to existing stack
        for (let i = 0; i < this.gameState.hotbar.length; i++) {
            const slotItem = this.gameState.hotbar[i];
            if (slotItem && slotItem.block === block && slotItem.count) {
                slotItem.count++;
                this.gameState.setBlock(tileX, tileY, BLOCKS.AIR);
                this.renderWorld();
                this.updateUI();
                this.createBreakParticles(tileX, tileY, block);
                this.minimapDirty = true;
                return;
            }
        }

        // Try to add to inventory
        for (let i = 0; i < this.gameState.inventory.length; i++) {
            const slotItem = this.gameState.inventory[i];
            if (slotItem && slotItem.block === block && slotItem.count) {
                slotItem.count++;
                this.gameState.setBlock(tileX, tileY, BLOCKS.AIR);
                this.renderWorld();
                this.updateUI();
                this.createBreakParticles(tileX, tileY, block);
                this.minimapDirty = true;
                return;
            }
        }

        // Add to empty slot
        if (this.gameState.addToInventory(item)) {
            this.gameState.setBlock(tileX, tileY, BLOCKS.AIR);
            this.renderWorld();
            this.updateUI();
            this.createBreakParticles(tileX, tileY, block);
            this.minimapDirty = true;
        }
    }

    placeBlock(tileX, tileY) {
        const heldItem = this.gameState.hotbar[this.gameState.selectedSlot];
        if (!heldItem) return;

        // Check if block can be placed
        const currentBlock = this.gameState.getBlock(tileX, tileY);
        if (currentBlock !== BLOCKS.AIR) return;

        // Check distance
        const playerTileX = Math.floor(this.player.x / TILE_SIZE);
        const playerTileY = Math.floor(this.player.y / TILE_SIZE);
        const distance = Math.sqrt(
            Math.pow(playerTileX - tileX, 2) +
            Math.pow(playerTileY - tileY, 2)
        );

        if (distance > 5) return;

        // Check not placing on player
        const playerBounds = {
            x: this.player.x - 7,
            y: this.player.y - 14,
            width: 14,
            height: 28
        };

        const blockBounds = {
            x: tileX * TILE_SIZE,
            y: tileY * TILE_SIZE,
            width: TILE_SIZE,
            height: TILE_SIZE
        };

        if (this.rectanglesOverlap(playerBounds, blockBounds)) return;

        // Handle water bucket placement
        if (heldItem.type === 'water_bucket') {
            this.gameState.addWater(tileX, tileY, WATER_MAX);
            if (heldItem.count) {
                heldItem.count--;
                if (heldItem.count <= 0) {
                    this.gameState.hotbar[this.gameState.selectedSlot] = null;
                }
            }
            this.updateUI();
            this.minimapDirty = true;
            return;
        }

        // Place solid block
        if (!heldItem.block) return;
        this.gameState.setBlock(tileX, tileY, heldItem.block);

        // Decrease count
        if (heldItem.count) {
            heldItem.count--;
            if (heldItem.count <= 0) {
                this.gameState.hotbar[this.gameState.selectedSlot] = null;
            }
        }

        this.renderWorld();
        this.updateUI();
        this.minimapDirty = true;
    }

    rectanglesOverlap(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    createBreakParticles(tileX, tileY, block) {
        const color = BLOCK_COLORS[block] || 0xffffff;
        for (let i = 0; i < 8; i++) {
            const particle = this.add.rectangle(
                tileX * TILE_SIZE + TILE_SIZE / 2,
                tileY * TILE_SIZE + TILE_SIZE / 2,
                4, 4, color
            );
            particle.setDepth(20);

            const angle = Math.random() * Math.PI * 2;
            const speed = 50 + Math.random() * 100;

            this.tweens.add({
                targets: particle,
                x: particle.x + Math.cos(angle) * speed,
                y: particle.y + Math.sin(angle) * speed,
                alpha: 0,
                duration: 500,
                onComplete: () => particle.destroy()
            });
        }
    }

    spawnEnemy() {
        if (!this.gameState.isNight) return;
        if (this.enemies.length >= 10) return;

        // Spawn near player
        const spawnX = this.player.x + (Math.random() > 0.5 ? 1 : -1) * (200 + Math.random() * 300);
        const spawnY = this.player.y - 100;

        // Find ground
        let groundY = spawnY;
        const tileX = Math.floor(spawnX / TILE_SIZE);
        for (let y = Math.floor(spawnY / TILE_SIZE); y < WORLD_HEIGHT; y++) {
            const block = this.gameState.getBlock(tileX, y);
            if (block !== BLOCKS.AIR && block !== BLOCKS.WATER) {
                groundY = y * TILE_SIZE - 16;
                break;
            }
        }

        const enemy = this.physics.add.sprite(spawnX, groundY, 'enemy');
        enemy.setCollideWorldBounds(false);
        enemy.body.setGravityY(GRAVITY);
        enemy.setDepth(10);
        enemy.health = 30;
        enemy.damage = 10;
        enemy.speed = 50 + Math.random() * 50;
        enemy.direction = spawnX > this.player.x ? -1 : 1;

        this.enemies.push(enemy);
    }

    updateEnemies(delta) {
        this.enemies = this.enemies.filter(enemy => {
            if (!enemy.active) return false;

            // Move towards player
            const dx = this.player.x - enemy.x;
            const dy = this.player.y - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 300) {
                enemy.setVelocityX(Math.sign(dx) * enemy.speed);
            } else {
                // Wander
                enemy.setVelocityX(enemy.direction * enemy.speed * 0.5);
                if (Math.random() < 0.01) {
                    enemy.direction *= -1;
                }
            }

            // Attack player
            if (distance < 30) {
                this.damagePlayer(enemy.damage * delta / 1000);
            }

            // Ground collision
            const tileX = Math.floor(enemy.x / TILE_SIZE);
            const tileY = Math.floor((enemy.y + 8) / TILE_SIZE);
            const block = this.gameState.getBlock(tileX, tileY);
            if (block !== BLOCKS.AIR && block !== BLOCKS.WATER) {
                enemy.body.setVelocityY(0);
                enemy.y = tileY * TILE_SIZE - 8;
            }

            return true;
        });
    }

    damagePlayer(amount) {
        this.gameState.health -= amount;
        if (this.gameState.health <= 0) {
            this.gameState.health = 0;
            this.respawnPlayer();
        }
        this.updateUI();
    }

    respawnPlayer() {
        this.gameState.health = this.gameState.maxHealth;
        this.player.x = WORLD_WIDTH / 2 * TILE_SIZE;
        this.player.y = 30 * TILE_SIZE;
        this.player.setVelocity(0, 0);
    }

    update(time, delta) {
        if (!this.cursors) return;
        if (this.gameState.isPaused) return;

        // Update game time
        this.gameState.updateTime(delta);

        // Player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-PLAYER_SPEED);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(PLAYER_SPEED);
        } else {
            this.player.setVelocityX(0);
        }

        // Jumping
        if (this.cursors.jump.isDown && this.isPlayerOnGround()) {
            this.player.setVelocityY(JUMP_VELOCITY);
        }

        // Handle mining
        this.mineBlock(delta);

        // Update enemies
        this.updateEnemies(delta);

        // Water simulation
        const waterChanged = this.gameState.updateWater(delta);
        if (waterChanged) {
            this.renderWater();
        }

        // World bounds
        if (this.player.x < 0) this.player.x = 0;
        if (this.player.x > WORLD_WIDTH * TILE_SIZE) {
            this.player.x = WORLD_WIDTH * TILE_SIZE;
        }

        // Fall damage
        if (this.player.y > WORLD_HEIGHT * TILE_SIZE) {
            this.respawnPlayer();
        }

        // Update UI periodically
        if (Math.floor(time / 1000) !== Math.floor((time - delta) / 1000)) {
            this.updateUI();
        }

        // Update ambient lighting based on time
        this.updateAmbientLighting();

        // Handle initial render - defer until after first update to ensure everything is initialized
        if (this.needsInitialRender) {
            this.needsInitialRender = false;
            // Position camera follow to instantly position on player for initial render
            this.cameras.main.startFollow(this.player, true, 1, 1);
            this.renderWorld();
            // Setup camera follow for smooth movement after initial render
            this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
            // Render minimap on initial load
            this.renderMinimap();
            return; // Skip the rest of update for this frame
        }

        // Re-render world chunks if player has moved significantly
        const playerTileX = Math.floor(this.player.x / TILE_SIZE);
        const playerTileY = Math.floor(this.player.y / TILE_SIZE);
        const moveThreshold = 10; // Re-render if player moves more than 10 tiles from last render position
        if (Math.abs(playerTileX - this.lastRenderPos.x) > moveThreshold ||
            Math.abs(playerTileY - this.lastRenderPos.y) > moveThreshold) {
            this.renderWorld();
            this.minimapDirty = true;
        }

        // Update minimap
        this.updateMinimap(time);
    }

    isPlayerOnGround() {
        const tileX = Math.floor(this.player.x / TILE_SIZE);
        const tileY = Math.floor((this.player.y + 14) / TILE_SIZE);

        // Check multiple tiles below player
        for (let dx = -1; dx <= 1; dx++) {
            const block = this.gameState.getBlock(tileX + dx, tileY);
            const waterLevel = this.gameState.getWaterLevel(tileX + dx, tileY);
            // Player can stand on solid blocks, not on air/water
            if (block !== BLOCKS.AIR && block !== BLOCKS.WATER && waterLevel <= 0) {
                return true;
            }
        }
        return false;
    }



    updateAmbientLighting() {
        const timePercent = this.gameState.time / DAY_LENGTH;
        let ambientLight;

        if (timePercent < 0.25) {
            // Night to dawn
            ambientLight = 0.3 + timePercent * 2.8;
        } else if (timePercent < 0.5) {
            // Day
            ambientLight = 1.0;
        } else if (timePercent < 0.75) {
            // Day to dusk
            ambientLight = 1.0 - (timePercent - 0.5) * 2.8;
        } else {
            // Night
            ambientLight = 0.3;
        }

        this.cameras.main.setBackgroundColor(
            Phaser.Display.Color.GetColor(
                Math.floor(135 * ambientLight),
                Math.floor(206 * ambientLight),
                Math.floor(235 * ambientLight)
            )
        );
    }
}

// Menu Scene
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Background
        this.add.rectangle(width / 2, height / 2, width, height, 0x87CEEB);

        // Title
        this.add.text(width / 2, height / 3, 'WEB TERRARIA', {
            fontSize: '48px',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // New Game button
        const newGameBtn = this.add.text(width / 2, height / 2, 'NEW GAME', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#333',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        newGameBtn.on('pointerover', () => newGameBtn.setStyle({ fill: '#ff0' }));
        newGameBtn.on('pointerout', () => newGameBtn.setStyle({ fill: '#fff' }));
        newGameBtn.on('pointerdown', () => {
            // Clear save data to force new world generation
            localStorage.removeItem('terraria_save');
            this.scene.start('GameScene');
        });

        // Load Game button
        const loadGameBtn = this.add.text(width / 2, height / 2 + 60, 'LOAD GAME', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#333',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        loadGameBtn.on('pointerover', () => loadGameBtn.setStyle({ fill: '#ff0' }));
        loadGameBtn.on('pointerout', () => loadGameBtn.setStyle({ fill: '#fff' }));
        loadGameBtn.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        // Instructions
        this.add.text(width / 2, height - 80, 'WASD - Move | SPACE - Jump\nLeft Click - Mine | Right Click - Place\nE - Inventory | 1-5 - Select Slot', {
            fontSize: '16px',
            fill: '#fff',
            align: 'center'
        }).setOrigin(0.5);
    }
}

// Game Configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#87CEEB',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MenuScene, GameScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true,
        antialias: false
    }
};

// Start Game
const game = new Phaser.Game(config);
