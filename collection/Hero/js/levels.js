import { CollisionBlock } from './collisionBlock.js';
import { 
    Saw, Trophy, Checkpoint, Trampoline, Spikes, Fire, 
    SpikeHead, SpikeBall, Fruit, FallingPlatform 
} from './objects/index.js';

const GRID_SIZE = 32;

// ... TILES object remains the same ...
const TILES = {
                // --- TERRAIN ---
    // StoneBox
    1: { type: 'terrain', x1: 0, x2: 48, y1: 0, y2: 48 },
    // WoodBox
    2: { type: 'terrain', x1: 0, x2: 48, y1: 65, y2: 113 },
    // Shellbox
    3: { type: 'terrain', x1: 0, x2: 48, y1: 130, y2: 178 },
    // Grass-Green
    4: { type: 'terrain', x1: 98, x2: 133, y1: 0, y2: 48 },
    // Grass-Orange
    5: { type: 'terrain', x1: 98, x2: 133, y1: 65, y2: 113 },
    // Grass-Pink
    6: { type: 'terrain', x1: 98, x2: 133, y1: 130, y2: 178 },
    // BrickWall
    7: { type: 'terrain', x1: 270, x2: 318, y1: 65, y2: 113 },

            // -- horizontal- borders-gold
    8: { type: 'terrain', x1: 270, x2: 318, y1: 0, y2: 10 },
            // -- horizontal- borders-wood
    9: { type: 'terrain', x1: 270, x2: 318, y1: 10, y2: 20 },
            // -- horizontal- borders-stone
    10: { type: 'terrain', x1: 270, x2: 318, y1: 25, y2: 35 },

            // -- virtical- borders-brown
    11: { type: 'terrain', x1: 240, x2: 255, y1: 0, y2: 48 },

                // --- OBJECTS ---
    // Breakable Box
    12: { type: 'box' },

};

export class LevelManager {
    static parse2D(levelData) {
        const blocks = [];
        const objects = [];
        
        levelData.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if (symbol === 0) return;

                switch (symbol) {
                    // --- HAZARDS (DIE) ---
                    case 13: objects.push(new Fire({ position: { x: x * GRID_SIZE, y: y * GRID_SIZE } })); break;// hidden first
                    case 14: objects.push(new SpikeHead({ position: { x: x * GRID_SIZE, y: y * GRID_SIZE } })); break; // needs work
                    case 15: objects.push(new SpikeBall({ position: { x: x * GRID_SIZE, y: y * GRID_SIZE } })); break; // ok
                    case 16: objects.push(new Spikes({ position: { x: x * GRID_SIZE, y: y * GRID_SIZE } })); break; // ok
                    case 20: objects.push(new Saw({ position: { x: x * GRID_SIZE, y: y * GRID_SIZE }, range: 100 })); break; // ok

                    // --- INTERACTIVE ---
                    case 17: objects.push(new Trampoline({ position: { x: x * GRID_SIZE, y: y * GRID_SIZE } })); break; //ok
                    case 18: objects.push(new FallingPlatform({ position: { x: x * GRID_SIZE, y: y * GRID_SIZE } })); break; //ok
                    case 19: objects.push(new Fruit({ position: { x: x * GRID_SIZE, y: y * GRID_SIZE } })); break; // ok
                    case 21: objects.push(new Checkpoint({ position: { x: x * GRID_SIZE, y: y * GRID_SIZE } })); break;
                    case 99: objects.push(new Trophy({ position: { x: x * GRID_SIZE, y: y * GRID_SIZE } })); break;

                    // --- TERRAIN ---
                    default:
                        if (TILES[symbol]) {
                            const tile = TILES[symbol];
                            blocks.push(new CollisionBlock({
                                position: { x: x * GRID_SIZE, y: y * GRID_SIZE },
                                imageSrc: 'assets/Terrain/Terrain.png',
                                frameData: { sx: tile.x1, sy: tile.y1, sWidth: tile.x2 - tile.x1, sHeight: tile.y2 - tile.y1 },
                                dimensions: { width: GRID_SIZE, height: GRID_SIZE }
                            }));
                        }
                        break;
                }
            });
        });

        return { blocks, objects }; 
    }
}

export const level1 = {
    background: 'assets/Background/Blue.png',
    data: [
        // Row 0-1: Ceiling & Trophy Area (Top Right)
        [11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11],
        [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 0, 0, 0, 11],
        [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 11],
        [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
        [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
        
        // Row 5: Top Platform Layer (Go Right ->)
        [11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 18, 18, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11],
        [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
        [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
        [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
        
        // Row 9: Middle Platform Layer (<- Go Left)
        [11, 0, 0, 13, 13, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 11],
        [11, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
        [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
        [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
        [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 18, 18, 18, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
        [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
        
        // Row 15: Bottom Divider (Go Right ->)
        [11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11],
        [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
        [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 14, 0, 19, 0, 0, 11],
        [11, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 11],
        [11, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 11],
        [11, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 15, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 16, 1, 1, 1, 1, 1, 1, 1, 11],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], 
    ]
};