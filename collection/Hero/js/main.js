/**
 * js/main.js
 * The "Brain" of the game.
 */

// 1. IMPORTS
import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Camera } from './camera.js';
import { Background } from './background.js';
import { LevelManager, level1 } from './levels.js'; 

// 2. SETUP CANVAS
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 3. INSTANTIATE CLASSES
const input = new InputHandler();
const camera = new Camera({ width: canvas.width, height: canvas.height });

const background = new Background({ imageSrc: level1.background });

// --- PARSE LEVEL DATA ---
// We get two arrays: 'blocks' (Terrain) and 'objects' (Saws, Trophies, etc.)
const { blocks: collisionBlocks, objects: gameObjects } = LevelManager.parse2D(level1.data);

// Calculate the full size of the map (Grid Size * Number of Tiles)
const mapWidth = level1.data[0].length * 32; 
const mapHeight = level1.data.length * 32;

// Create Player
const player = new Player({
    characterName: 'NinjaFrog', 
    position: { x: 100, y: 300 } 
});

// 4. ANIMATION LOOP
const animate = () => {
    window.requestAnimationFrame(animate);

    // A. Clear Screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // B. Update Camera
    // We pass mapWidth and mapHeight so the camera stops at the edges
    camera.update(player.position, mapWidth, mapHeight);

    // C. Begin Camera Translation (Everything moves relative to camera)
    ctx.save();
    ctx.translate(-camera.position.x, -camera.position.y);

    // D. Draw Background
    background.draw(ctx, camera);

    // E. Draw Terrain Blocks
    collisionBlocks.forEach(block => {
        block.update(ctx); 
    });

    // F. Draw Interactive Objects (Saws, Trophies, etc.)
    if (gameObjects) {
        gameObjects.forEach(object => {
            object.update(ctx);
        });
    }

    // G. Player Input Logic
    player.velocity.x = 0;

    if (input.keys.right.pressed) {
        player.velocity.x = 2; // Reduced speed slightly for the zoomed-in view       
        player.switchSprite('run');
        player.facingRight = true;
    } 
    else if (input.keys.left.pressed) {
        player.velocity.x = -2;      
        player.switchSprite('run');
        player.facingRight = false;
    } 
    else {
        player.switchSprite('idle');
    }

    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    } 
    else if (player.velocity.y > 0) {
        player.switchSprite('fall');
    }

    // H. Update Player Physics & Draw
    // Note: We only pass collisionBlocks for physics (standing on ground)
    // We will handle object collisions (dying) in a later step!
    player.update(collisionBlocks, ctx);
    
    // I. End Camera Translation
    ctx.restore();
};

// Start Loop
animate();

// 5. EVENT LISTENERS
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
        case 'ArrowUp':
        case ' ': 
            player.jump();
            break;
    }
});