import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Camera } from './camera.js';
import { Background } from './background.js';
import { LevelManager, level1 } from './levels.js'; 

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const input = new InputHandler();
const camera = new Camera({ width: canvas.width, height: canvas.height });
const background = new Background({ imageSrc: level1.background });

// --- LOAD LEVEL ---
const { blocks: collisionBlocks, objects: gameObjects } = LevelManager.parse2D(level1.data);
const mapWidth = level1.data[0].length * 32; 
const mapHeight = level1.data.length * 32;

// CHANGE 1: Use 'let' instead of 'const' so we can assign it later
let player;
let gameRunning = false; // Flag to stop animation until play is clicked

// --- MENU LOGIC ---
let selectedCharacter = 'NinjaFrog'; // Default
const menuOverlay = document.getElementById('menuOverlay');
const charOptions = document.querySelectorAll('.char-option');
const playButton = document.getElementById('playButton');

// 1. Handle Character Selection clicks
charOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove 'selected' class from all
        charOptions.forEach(opt => opt.classList.remove('selected'));
        // Add 'selected' to clicked one
        option.classList.add('selected');
        // Update variable
        selectedCharacter = option.dataset.name;
    });
});

// 2. Handle Play Button
playButton.addEventListener('click', () => {
    startGame(selectedCharacter);
});

function startGame(characterName) {
    // Hide the Menu
    menuOverlay.style.display = 'none';

    // Initialize Player with selected character
    player = new Player({
        characterName: characterName, 
        position: { x: 100, y: 300 } 
    });

    // Start the Game Loop
    gameRunning = true;
    animate();
}

// --- ANIMATION LOOP ---
const animate = () => {
    // CHANGE 2: Stop if game isn't running
    if (!gameRunning) return;

    window.requestAnimationFrame(animate);

    // 1. Clear Screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Update Camera
    camera.update(player.position, mapWidth, mapHeight);

    // 3. Draw Background
    background.draw(ctx); 

    // --- START WORLD CAMERA ---
    ctx.save();
    ctx.translate(-camera.position.x, -camera.position.y);

    // 4. Draw Terrain
    collisionBlocks.forEach(block => {
        block.update(ctx); 
    });

    // 5. Draw Objects
    if (gameObjects) {
        gameObjects.forEach(object => {
            object.update(ctx, collisionBlocks);
        });
    }

    // 6. Player Input
    player.velocity.x = 0;
    
    if (!player.isHit) {
        if (input.keys.right.pressed) {
            player.velocity.x = 3; 
            player.switchSprite('run');
            player.facingRight = true;
        } 
        else if (input.keys.left.pressed) {
            player.velocity.x = -3;      
            player.switchSprite('run');
            player.facingRight = false;
        } 
        else {
            player.switchSprite('idle');
        }
    }

    if (player.velocity.y < 0) player.switchSprite('jump');
    else if (player.velocity.y > 0) player.switchSprite('fall');

    // 7. Update Player
    player.update(collisionBlocks, gameObjects, ctx);
    
    // --- END WORLD CAMERA ---
    ctx.restore();

    // 8. DRAW UI
    drawUI();
};

function drawUI() {
    ctx.font = 'bold 10px sans-serif';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black'; 
    ctx.lineWidth = 2;

    ctx.strokeText('LIVES:', 10, 20);
    ctx.fillText('LIVES:', 10, 20);

    const heartGap = 15;   
    const heartStart = 50; 

    for (let i = 0; i < player.lives; i++) {
        ctx.strokeText('❤️', heartStart + (i * heartGap), 20);
        ctx.fillText('❤️', heartStart + (i * heartGap), 20);
    }
}

window.addEventListener('keydown', (event) => {
    // Only allow jumping if game is running!
    if (!gameRunning) return;
    
    switch (event.key) {
        case 'w':
        case 'ArrowUp':
        case ' ': 
            player.jump();
            break;
    }
});