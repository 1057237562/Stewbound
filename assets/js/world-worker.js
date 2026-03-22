// World Generation Web Worker
// Runs world generation off the main thread

const TILE_SIZE = 16;
const WORLD_WIDTH = 400;
const WORLD_HEIGHT = 150;

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

let seed;

// Noise functions
function hash2D(x, y) {
    let n = (x * 374761393) ^ (y * 668265263) ^ (Math.floor(seed * 1000));
    n = (n ^ (n >>> 13)) >>> 0;
    return ((n & 0x7fffffff) / 0x7fffffff);
}

function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function noise2DValue(x, y) {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;
    const n00 = hash2D(xi, yi);
    const n10 = hash2D(xi + 1, yi);
    const n01 = hash2D(xi, yi + 1);
    const n11 = hash2D(xi + 1, yi + 1);
    const u = fade(xf);
    const v = fade(yf);
    const x1 = lerp(n00, n10, u);
    const x2 = lerp(n01, n11, u);
    return lerp(x1, x2, v);
}

function fbm(x, y, octaves = 4, freq = 0.01, amp = 1) {
    let total = 0;
    let maxAmp = 0;
    let f = freq;
    let a = amp;
    for (let i = 0; i < octaves; i++) {
        total += noise2DValue(x * f, y * f) * a;
        maxAmp += a;
        f *= 2;
        a *= 0.5;
    }
    return maxAmp > 0 ? total / maxAmp : 0;
}

function noise2D(x, y, s) {
    const n = Math.sin(x * 12.9898 + y * 78.233 + s) * 43758.5453;
    return n - Math.floor(n);
}

function octaveNoise(x, y, octaves, persistence, lacunarity, s) {
    let total = 0;
    let frequency = 1;
    let amplitude = 1;
    let maxValue = 0;
    for (let i = 0; i < octaves; i++) {
        total += noise2D(x * frequency, y * frequency, s) * amplitude;
        maxValue += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
    }
    return total / maxValue;
}

function terrainNoise(x, s) {
    return octaveNoise(x, 0, 6, 0.5, 2.0, s);
}

function worleyNoise(x, y, s, cellSize) {
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
    let minDist = 999;
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            const cx = cellX + dx;
            const cy = cellY + dy;
            const pointX = cx * cellSize + hash2D(cx + s * 137, cy + s * 241) * cellSize;
            const pointY = cy * cellSize + hash2D(cx + s * 311, cy + s * 419) * cellSize;
            const dist = Math.sqrt((x - pointX) ** 2 + (y - pointY) ** 2);
            if (dist < minDist) minDist = dist;
        }
    }
    return minDist / (cellSize * 1.5);
}

function caveNoise(x, y, s) {
    const w1 = worleyNoise(x, y, s, 12);
    const w2 = worleyNoise(x, y, s + 500, 8);
    const v = fbm(x * 0.08, y * 0.08, 3, 0.5, 1);
    return w1 * 0.5 + w2 * 0.3 + v * 0.2;
}

// Biome helpers
function getSurfaceBlock(biome) {
    switch (biome) {
        case 0: return BLOCKS.GRASS;
        case 1: return BLOCKS.SAND;
        case 2: return BLOCKS.SNOW;
        case 3: return BLOCKS.JUNGLE_GRASS;
        case 4: return BLOCKS.CORRUPTION_STONE;
        case 5: return BLOCKS.SAND;
        case 6: return BLOCKS.GRASS;
        default: return BLOCKS.GRASS;
    }
}

function getSubsurfaceBlock(biome, depth) {
    switch (biome) {
        case 0: return depth < 5 ? BLOCKS.DIRT : BLOCKS.STONE;
        case 1: return depth < 6 ? BLOCKS.SAND : BLOCKS.SANDSTONE;
        case 2: return depth < 4 ? BLOCKS.DIRT : BLOCKS.ICE;
        case 3: return depth < 4 ? BLOCKS.MUD : BLOCKS.STONE;
        case 4: return depth < 4 ? BLOCKS.DIRT : BLOCKS.EBONSTONE;
        case 5: return BLOCKS.SAND;
        case 6: return depth < 7 ? BLOCKS.DIRT : BLOCKS.STONE;
        default: return BLOCKS.DIRT;
    }
}

// World generation functions
function generateBiomes(biomeMap) {
    const biomeSeed = seed;
    const biomeNoiseScale = 0.02;

    for (let x = 0; x < WORLD_WIDTH; x++) {
        const noiseVal = noise2D(x * biomeNoiseScale, 0, biomeSeed);
        const noiseVal2 = noise2D(x * biomeNoiseScale + 100, 0, biomeSeed);
        const worldPosition = x / WORLD_WIDTH;

        if (worldPosition < 0.1) {
            biomeMap[x] = 5;
        } else if (worldPosition < 0.3) {
            biomeMap[x] = noiseVal > 0.6 ? 1 : 0;
        } else if (worldPosition < 0.5) {
            biomeMap[x] = noiseVal > 0.5 ? 2 : 0;
        } else if (worldPosition < 0.7) {
            biomeMap[x] = noiseVal > 0.55 ? 3 : 0;
        } else if (worldPosition < 0.85) {
            if (noiseVal2 > 0.55) {
                biomeMap[x] = 6;
            } else if (noiseVal > 0.65) {
                biomeMap[x] = 4;
            } else {
                biomeMap[x] = 0;
            }
        } else {
            biomeMap[x] = 5;
        }
    }

    for (let x = 2; x < WORLD_WIDTH - 2; x++) {
        if (biomeMap[x] !== biomeMap[x - 1] && biomeMap[x] !== biomeMap[x + 1]) {
            biomeMap[x] = biomeMap[x - 1];
        }
    }
}

function generateSurfaceHeights(surfaceHeight, biomeMap) {
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
            default:
                noiseAmplitude = 8;
                heightModifier = 0;
                noiseFreq = 0.03;
                noiseOctaves = 4;
        }

        // Generate height using FBM with sub-tile precision
        const noise1 = fbm(x * noiseFreq, seed, noiseOctaves, 0.5, 1);
        const noise2 = fbm(x * noiseFreq * 0.4, seed + 1000, Math.max(3, noiseOctaves - 1), 0.5, 1) * 0.4;
        const noise3 = fbm(x * noiseFreq * 0.15, seed + 2000, Math.max(3, noiseOctaves - 2), 0.5, 1) * 0.2;

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
    }
}

function fillTerrainLayers(world, surfaceHeight, biomeMap) {
    for (let x = 0; x < WORLD_WIDTH; x++) {
        const surface = surfaceHeight[x];
        const biome = biomeMap[x];

        for (let y = 0; y < WORLD_HEIGHT; y++) {
            if (y < surface) {
                world[x][y] = BLOCKS.AIR;
            } else if (y === surface) {
                world[x][y] = getSurfaceBlock(biome);
            } else if (y < surface + 12) {
                world[x][y] = getSubsurfaceBlock(biome, y - surface);
            } else if (y < surface + 35) {
                const transitionProgress = (y - surface - 12) / 23;
                world[x][y] = hash2D(x, y) < transitionProgress ? BLOCKS.STONE : BLOCKS.DIRT;
            } else {
                world[x][y] = BLOCKS.STONE;
            }
        }
    }
}

function cleanupIsolatedBlocks(world) {
    for (let pass = 0; pass < 2; pass++) {
        for (let x = 1; x < WORLD_WIDTH - 1; x++) {
            for (let y = 60; y < WORLD_HEIGHT - 1; y++) {
                if (world[x][y] === BLOCKS.AIR) continue;

                let airNeighbors = 0;
                if (world[x - 1][y] === BLOCKS.AIR) airNeighbors++;
                if (world[x + 1][y] === BLOCKS.AIR) airNeighbors++;
                if (world[x][y - 1] === BLOCKS.AIR) airNeighbors++;
                if (world[x][y + 1] === BLOCKS.AIR) airNeighbors++;

                if (airNeighbors >= 3) {
                    world[x][y] = BLOCKS.AIR;
                } else if (airNeighbors === 2) {
                    const leftAir = world[x - 1][y] === BLOCKS.AIR;
                    const rightAir = world[x + 1][y] === BLOCKS.AIR;
                    const topAir = world[x][y - 1] === BLOCKS.AIR;
                    const bottomAir = world[x][y + 1] === BLOCKS.AIR;
                    if ((leftAir && rightAir) || (topAir && bottomAir)) {
                        if (hash2D(x + y * 100, pass + seed) > 0.4) {
                            world[x][y] = BLOCKS.AIR;
                        }
                    }
                }
            }
        }
    }
}

function generateCaves(world) {
    const caveSeed = seed + 1000;

    // Pass 1: Cellular automata
    const caveGrid = [];
    for (let x = 0; x < WORLD_WIDTH; x++) {
        caveGrid[x] = [];
        for (let y = 0; y < WORLD_HEIGHT; y++) {
            if (y < 35 || world[x][y] === BLOCKS.AIR) {
                caveGrid[x][y] = 0;
            } else {
                const depthRatio = (y - 35) / (WORLD_HEIGHT - 35);
                caveGrid[x][y] = hash2D(x + caveSeed, y + caveSeed * 2) > (0.55 + depthRatio * 0.2) ? 1 : 0;
            }
        }
    }

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

                next[x][y] = neighbors >= 5 ? 1 : (neighbors <= 3 ? 0 : caveGrid[x][y]);
            }
        }
        for (let x = 0; x < WORLD_WIDTH; x++) {
            for (let y = 0; y < WORLD_HEIGHT; y++) {
                caveGrid[x][y] = next[x][y];
            }
        }
    }

    // Pass 2: Layered caves (increase depth threshold to push caves further from surface)
    for (let x = 0; x < WORLD_WIDTH; x++) {
        for (let y = 70; y < WORLD_HEIGHT; y++) {
            if (world[x][y] === BLOCKS.AIR) continue;

            const depthRatio = (y - 70) / (WORLD_HEIGHT - 70);

            const tunnel = caveNoise(x * 1.2, y * 1.5, caveSeed);
            const tunnelThresh = 0.26 - depthRatio * 0.15;
            if (tunnel < tunnelThresh) {
                world[x][y] = BLOCKS.AIR;
                continue;
            }

            if (depthRatio > 0.3) {
                const cavern = worleyNoise(x * 0.7, y * 0.9, caveSeed + 300, 14);
                const cavernThresh = 0.08 - (depthRatio - 0.3) * 0.1;
                if (cavern < cavernThresh) {
                    world[x][y] = BLOCKS.AIR;
                    continue;
                }
            }

            if (depthRatio > 0.6) {
                const chamber = worleyNoise(x * 0.4, y * 0.5, caveSeed + 600, 22);
                const chamberThresh = 0.05 - (depthRatio - 0.6) * 0.1;
                if (chamber < chamberThresh) {
                    world[x][y] = BLOCKS.AIR;
                }
            }
        }
    }

    // Pass 3: Blend with CA (ignore near-surface, start at depth 70)
    for (let x = 0; x < WORLD_WIDTH; x++) {
        for (let y = 70; y < WORLD_HEIGHT; y++) {
            if (caveGrid[x][y] === 0 && world[x][y] !== BLOCKS.AIR) {
                const depthRatio = (y - 70) / (WORLD_HEIGHT - 70);
                const blend = fbm(x * 0.05 + caveSeed, y * 0.05, 2, 0.5, 1);
                const blendThresh = 0.48 - depthRatio * 0.15;
                if (blend < blendThresh) {
                    world[x][y] = BLOCKS.AIR;
                }
            }
        }
    }

    // Pass 4: Connect caves
    for (let x = 2; x < WORLD_WIDTH - 2; x++) {
        for (let y = 70; y < WORLD_HEIGHT - 5; y++) {
            if (world[x][y] !== BLOCKS.AIR) {
                const horizAir = (world[x-1][y] === BLOCKS.AIR && world[x+1][y] === BLOCKS.AIR);
                const vertAir = (world[x][y-1] === BLOCKS.AIR && world[x][y+1] === BLOCKS.AIR);
                if (horizAir && vertAir) {
                    world[x][y] = BLOCKS.AIR;
                }
            }
        }
    }

    cleanupIsolatedBlocks(world);
}

function generateOreVein(world, startX, startY, oreType, size) {
    const queue = [[startX, startY]];
    const visited = new Set();
    visited.add(`${startX},${startY}`);

    while (queue.length > 0 && visited.size < size * 5) {
        const [x, y] = queue.shift();

        if (x >= 0 && x < WORLD_WIDTH && y >= 0 && y < WORLD_HEIGHT) {
            if (world[x][y] === BLOCKS.STONE) {
                world[x][y] = oreType;

                const neighbors = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
                for (let i = neighbors.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [neighbors[i], neighbors[j]] = [neighbors[j], neighbors[i]];
                }
                for (const [nx, ny] of neighbors) {
                    const key = `${nx},${ny}`;
                    if (!visited.has(key) && hash2D(nx * 7, ny * 13) > 0.3) {
                        visited.add(key);
                        queue.push([nx, ny]);
                    }
                }
            }
        }
    }
}

function generateUndergroundFeatures(world, surfaceHeight) {
    const oreSeed = seed + 2000;

    for (let x = 0; x < WORLD_WIDTH; x += 3) {
        for (let y = 50; y < WORLD_HEIGHT; y += 3) {
            if (world[x][y] !== BLOCKS.STONE) continue;

            const depthRatio = (y - 50) / (WORLD_HEIGHT - 50);
            const noiseVal = noise2D(x * 0.5, y * 0.5, oreSeed);

            if (depthRatio < 0.4 && noiseVal > 0.85) {
                generateOreVein(world, x, y, BLOCKS.COAL, 3);
            }
            if (depthRatio > 0.2 && depthRatio < 0.7 && noiseVal > 0.88) {
                generateOreVein(world, x, y, BLOCKS.IRON_ORE, 4);
            }
            if (depthRatio > 0.5 && noiseVal > 0.92) {
                generateOreVein(world, x, y, BLOCKS.GOLD_ORE, 3);
            }
            if (depthRatio > 0.8 && noiseVal > 0.96) {
                generateOreVein(world, x, y, BLOCKS.DIAMOND_ORE, 2);
            }
        }
    }

    // Clay deposits
    for (let x = 0; x < WORLD_WIDTH; x++) {
        for (let y = 45; y < 70; y++) {
            if (world[x][y] === BLOCKS.DIRT) {
                if (noise2D(x * 0.3, y * 0.3, oreSeed + 500) > 0.8) {
                    world[x][y] = BLOCKS.CLAY;
                }
            }
        }
    }

    // Marble and granite pockets
    for (let i = 0; i < 20; i++) {
        const cx = Math.floor(noise2D(i, 0, oreSeed + 1000) * WORLD_WIDTH);
        const cy = 60 + Math.floor(noise2D(i, 1, oreSeed + 1000) * (WORLD_HEIGHT - 70));
        const radius = 3 + Math.floor(noise2D(i, 2, oreSeed + 1000) * 4);
        const type = i % 2 === 0 ? BLOCKS.MARBLE : BLOCKS.GRANITE;

        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist <= radius) {
                    const nx = cx + dx;
                    const ny = cy + dy;
                    if (nx >= 0 && nx < WORLD_WIDTH && ny >= 0 && ny < WORLD_HEIGHT) {
                        if (world[nx][ny] === BLOCKS.STONE && hash2D(nx + i, ny + i) > 0.3) {
                            world[nx][ny] = type;
                        }
                    }
                }
            }
        }
    }

    // Mushroom biome
    const mushroomX = Math.floor(WORLD_WIDTH * (0.3 + noise2D(0, 0, oreSeed + 2000) * 0.4));
    const mushroomY = 70 + Math.floor(noise2D(1, 0, oreSeed + 2000) * 30);

    for (let dx = -15; dx <= 15; dx++) {
        for (let dy = -10; dy <= 10; dy++) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= 12) {
                const nx = mushroomX + dx;
                const ny = mushroomY + dy;
                if (nx >= 0 && nx < WORLD_WIDTH && ny >= 0 && ny < WORLD_HEIGHT) {
                    if (world[nx][ny] === BLOCKS.STONE || world[nx][ny] === BLOCKS.DIRT) {
                        if (dist <= 10) {
                            world[nx][ny] = BLOCKS.MUSHROOM_GRASS;
                        }
                        if (dist <= 8 && hash2D(nx, ny) > 0.85 && ny - 1 >= 0 && world[nx][ny - 1] === BLOCKS.AIR) {
                            world[nx][ny - 1] = BLOCKS.MUSHROOM;
                        }
                    }
                }
            }
        }
    }

    // Hell layer
    for (let x = 0; x < WORLD_WIDTH; x++) {
        for (let y = WORLD_HEIGHT - 15; y < WORLD_HEIGHT; y++) {
            if (y > WORLD_HEIGHT - 5) {
                world[x][y] = BLOCKS.HELLSTONE;
            } else if (y > WORLD_HEIGHT - 10) {
                if (world[x][y] === BLOCKS.STONE) {
                    world[x][y] = BLOCKS.HELLSTONE;
                }
            } else {
                if (world[x][y] === BLOCKS.STONE && hash2D(x, y + seed) > 0.7) {
                    world[x][y] = BLOCKS.ASH;
                }
            }
        }
    }
}

function generateWaterFeatures(world, surfaceHeight) {
    const waterSeed = seed + 3000;

    // Underground water pockets (elliptical with noise edges)
    for (let i = 0; i < 30; i++) {
        const wx = Math.floor(noise2D(i, 0, waterSeed) * WORLD_WIDTH);
        const wy = 60 + Math.floor(noise2D(i, 1, waterSeed) * (WORLD_HEIGHT - 80));
        const rx = 3 + Math.floor(noise2D(i, 2, waterSeed) * 6);
        const ry = 2 + Math.floor(noise2D(i, 3, waterSeed) * 4);

        for (let dx = -rx; dx <= rx; dx++) {
            for (let dy = -ry; dy <= ry; dy++) {
                const dist = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);
                const edgeNoise = noise2D(dx + wx * 3, dy + wy * 3, waterSeed + 500) * 0.3;
                if (dist <= 1.0 - edgeNoise) {
                    const nx = Math.floor(wx + dx);
                    const ny = wy + dy;
                    if (nx >= 0 && nx < WORLD_WIDTH && ny >= 0 && ny < WORLD_HEIGHT) {
                        if (world[nx][ny] === BLOCKS.AIR || world[nx][ny] === BLOCKS.STONE) {
                            world[nx][ny] = BLOCKS.WATER;
                        }
                    }
                }
            }
        }
    }

    // Surface lakes (half-ellipse with noise edges)
    for (let i = 0; i < 5; i++) {
        const lx = 30 + Math.floor(noise2D(i, 4, waterSeed) * (WORLD_WIDTH - 60));
        const lakeWidth = 8 + Math.floor(noise2D(i, 5, waterSeed) * 12);
        const lakeDepth = 4 + Math.floor(noise2D(i, 6, waterSeed) * 6);
        const rx = lakeWidth / 2;
        const ry = lakeDepth;

        for (let dx = -Math.ceil(rx); dx <= Math.ceil(rx); dx++) {
            const nx = Math.floor(lx + dx);
            if (nx >= 0 && nx < WORLD_WIDTH) {
                const sy = surfaceHeight[nx];
                const normalizedX = dx / rx;
                const maxY = Math.ceil(ry * Math.sqrt(Math.max(0, 1 - normalizedX * normalizedX)));
                for (let dy = 0; dy <= maxY; dy++) {
                    const edgeNoise = noise2D(dx + lx * 3, dy, waterSeed + 500) * 0.3;
                    if (dy <= maxY * (1.0 - edgeNoise)) {
                        const ny = sy + dy;
                        if (ny >= 0 && ny < WORLD_HEIGHT) {
                            world[nx][ny] = BLOCKS.WATER;
                        }
                    }
                }
            }
        }
    }
}

// Removed incomplete generateTree function; subtree now handled by generateTreeAt for specific x

function generateTreeAt(world, x, groundY, biome) {
    // Don't generate tree if the ground is water
    if (world[x][groundY] === BLOCKS.WATER) {
        return;
    }
    const treeSeed = seed + 5000;
    let trunkHeight, trunkBlock, leafBlock;

    if (biome === 3) {
        trunkHeight = 8 + Math.floor(hash2D(x, 0) * 6);
        trunkBlock = BLOCKS.WOOD;
        leafBlock = BLOCKS.LEAVES;
    } else {
        trunkHeight = 5 + Math.floor(hash2D(x, 1) * 4);
        trunkBlock = BLOCKS.WOOD;
        leafBlock = BLOCKS.LEAVES;
    }

    for (let y = 1; y <= trunkHeight + 3; y++) {
        if (groundY - y < 0) return;
        if (world[x][groundY - y] !== BLOCKS.AIR) return;
    }

    for (let y = 1; y <= trunkHeight; y++) {
        if (groundY - y >= 0) {
            world[x][groundY - y] = trunkBlock;
        }
    }

    const leafStart = groundY - trunkHeight;
    for (let ly = -2; ly <= 1; ly++) {
        const width = Math.abs(ly) === 2 ? 1 : 2;
        for (let lx = -width; lx <= width; lx++) {
            const nx = x + lx;
            const ny = leafStart + ly;
            if (nx >= 0 && nx < WORLD_WIDTH && ny >= 0 && ny < WORLD_HEIGHT) {
                if (world[nx][ny] === BLOCKS.AIR) {
                    if (Math.abs(lx) < width || Math.abs(ly) < 2) {
                        world[nx][ny] = leafBlock;
                    }
                }
            }
        }
    }

    if (leafStart - 1 >= 0) {
        world[x][leafStart - 1] = leafBlock;
    }
}

function generateCactus(world, x, groundY) {
    // Don't generate cactus if the ground is water
    if (world[x][groundY] === BLOCKS.WATER) {
        return;
    }
    const height = 3 + Math.floor(hash2D(x, seed) * 3);
    for (let y = 1; y <= height; y++) {
        if (groundY - y >= 0) {
            world[x][groundY - y] = BLOCKS.CACTUS;
        }
    }
}

function generateVegetation(world, surfaceHeight, biomeMap) {
    const treeSeed = seed + 4000;

    for (let x = 5; x < WORLD_WIDTH - 5; x++) {
        const biome = biomeMap[x];
        const surface = surfaceHeight[x];

        if (biome === 0 || biome === 3) {
            if (noise2D(x, 0, treeSeed) > 0.75) {
                generateTreeAt(world, x, surface, biome);
            }
        }

        if (biome === 1 && noise2D(x, 1, treeSeed) > 0.8) {
            generateCactus(world, x, surface);
        }

        if (biome === 3) {
            for (let y = surface - 1; y > surface - 15; y--) {
                if (world[x][y] === BLOCKS.AIR &&
                    world[x][y + 1] === BLOCKS.JUNGLE_GRASS &&
                    noise2D(x, y, treeSeed + 100) > 0.85) {
                    world[x][y] = BLOCKS.JUNGLE_VINE;
                }
            }
        }
    }

    // Cloud islands
    for (let i = 0; i < 5; i++) {
        const cx = 20 + Math.floor(noise2D(i, 0, treeSeed + 2000) * (WORLD_WIDTH - 40));
        const cy = 10 + Math.floor(noise2D(i, 1, treeSeed + 2000) * 20);
        const cloudWidth = 8 + Math.floor(noise2D(i, 2, treeSeed + 2000) * 12);

        for (let dx = -cloudWidth / 2; dx < cloudWidth / 2; dx++) {
            const nx = Math.floor(cx + dx);
            if (nx >= 0 && nx < WORLD_WIDTH) {
                const cloudHeight = 2 + Math.floor(noise2D(nx, cy, treeSeed + 3000) * 3);
                for (let dy = 0; dy < cloudHeight; dy++) {
                    if (cy + dy >= 0 && cy + dy < WORLD_HEIGHT) {
                        world[nx][cy + dy] = BLOCKS.CLOUD;
                    }
                }
            }
        }
    }
}

function generateUndergroundHouse(world, startX, startY, width, height) {
    for (let x = startX; x < startX + width; x++) {
        for (let y = startY; y < startY + height; y++) {
            if (x < 0 || x >= WORLD_WIDTH || y < 0 || y >= WORLD_HEIGHT) return;
            if (world[x][y] === BLOCKS.AIR) return;
        }
    }

    for (let x = startX + 1; x < startX + width - 1; x++) {
        for (let y = startY + 1; y < startY + height - 1; y++) {
            world[x][y] = BLOCKS.AIR;
        }
    }

    for (let y = startY; y < startY + height; y++) {
        world[startX][y] = BLOCKS.COBBLESTONE;
        world[startX + width - 1][y] = BLOCKS.COBBLESTONE;
    }

    for (let x = startX; x < startX + width; x++) {
        world[x][startY] = BLOCKS.COBBLESTONE;
        world[x][startY + height - 1] = BLOCKS.COBBLESTONE;
    }

    world[startX + Math.floor(width / 2)][startY + height - 2] = BLOCKS.AIR;
    world[startX + Math.floor(width / 2)][startY + height - 3] = BLOCKS.AIR;
}

function generateStructures(world, surfaceHeight, biomeMap) {
    const structureSeed = seed + 6000;

    for (let i = 0; i < 8; i++) {
        const sx = 10 + Math.floor(noise2D(i, 0, structureSeed) * (WORLD_WIDTH - 20));
        const sy = 55 + Math.floor(noise2D(i, 1, structureSeed) * (WORLD_HEIGHT - 70));
        const width = 7 + Math.floor(noise2D(i, 2, structureSeed) * 5);
        const height = 5;

        generateUndergroundHouse(world, sx, sy, width, height);
    }
}

function convertStaticWaterToLevels(world, waterLevel) {
    for (let x = 0; x < WORLD_WIDTH; x++) {
        for (let y = 0; y < WORLD_HEIGHT; y++) {
            if (world[x][y] === BLOCKS.WATER) {
                world[x][y] = BLOCKS.AIR;
                waterLevel[x][y] = 1.0;
            }
        }
    }
}

// Main generation function
function generateWorld() {
    // Initialize arrays
    const world = [];
    const waterLevel = [];
    for (let x = 0; x < WORLD_WIDTH; x++) {
        world[x] = [];
        waterLevel[x] = [];
        for (let y = 0; y < WORLD_HEIGHT; y++) {
            world[x][y] = BLOCKS.AIR;
            waterLevel[x][y] = 0;
        }
    }

    self.postMessage({ type: 'progress', value: 10, message: 'Generating biomes...' });

    // Step 1: Biomes
    const biomeMap = new Array(WORLD_WIDTH);
    generateBiomes(biomeMap);

    self.postMessage({ type: 'progress', value: 20, message: 'Generating surface...' });

    // Step 2: Surface heights
    const surfaceHeight = new Array(WORLD_WIDTH);
    generateSurfaceHeights(surfaceHeight, biomeMap);

    self.postMessage({ type: 'progress', value: 30, message: 'Filling terrain...' });

    // Step 3: Terrain layers
    fillTerrainLayers(world, surfaceHeight, biomeMap);

    // Caves generation disabled for normal terrain (no caves)

    self.postMessage({ type: 'progress', value: 60, message: 'Placing ores...' });

    // Step 5: Underground features
    generateUndergroundFeatures(world, surfaceHeight);

    self.postMessage({ type: 'progress', value: 72, message: 'Adding water...' });

    // Step 6: Water features
    generateWaterFeatures(world, surfaceHeight);

    self.postMessage({ type: 'progress', value: 82, message: 'Growing vegetation...' });

    // Step 7: Vegetation
    generateVegetation(world, surfaceHeight, biomeMap);

    self.postMessage({ type: 'progress', value: 90, message: 'Building structures...' });

    // Step 8: Structures
    generateStructures(world, surfaceHeight, biomeMap);

    self.postMessage({ type: 'progress', value: 95, message: 'Finalizing...' });

    // Convert static water to levels
    convertStaticWaterToLevels(world, waterLevel);

    // Cave-free terrain: do not force solid all stones here

    // Pack world into flat arrays for transfer
    const worldFlat = new Uint8Array(WORLD_WIDTH * WORLD_HEIGHT);
    const waterFlat = new Float32Array(WORLD_WIDTH * WORLD_HEIGHT);
    for (let x = 0; x < WORLD_WIDTH; x++) {
        for (let y = 0; y < WORLD_HEIGHT; y++) {
            worldFlat[x * WORLD_HEIGHT + y] = world[x][y];
            waterFlat[x * WORLD_HEIGHT + y] = waterLevel[x][y];
        }
    }

    self.postMessage({
        type: 'complete',
        world: worldFlat.buffer,
        waterLevel: waterFlat.buffer,
        width: WORLD_WIDTH,
        height: WORLD_HEIGHT
    }, [worldFlat.buffer, waterFlat.buffer]);
}

// Handle messages from main thread
self.onmessage = function(e) {
    const data = e.data;
    if (data.type === 'generate') {
        seed = data.seed;
        generateWorld();
    }
};
