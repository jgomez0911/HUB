import { Sprite } from '../sprite.js';

export class FallingPlatform extends Sprite {
    constructor({ position }) {
        super({
            // Default to the "On" animation (4 frames)
            imageSrc: 'assets/Traps/Falling Platforms/On.png',
            frameRate: 4,
            frameBuffer: 20,
            loop: true,
            autoplay: true,
            position: position,
            // Force hitbox size (usually thinner than a full block)
            dimensions: { width: 32, height: 10 } 
        });

        this.position = position;
        this.velocity = { x: 0, y: 0 };
        this.isFalling = false;
        
        // Setup the two states
        this.animations = {
            on: {
                imageSrc: 'assets/Traps/Falling Platforms/On.png',
                frameRate: 4,
                frameBuffer: 20,
                loop: true
            },
            off: {
                imageSrc: 'assets/Traps/Falling Platforms/Off.png',
                frameRate: 1, // Single frame
                frameBuffer: 20,
                loop: false
            }
        };
        
        // Ensure hitbox matches visual size
        this.width = 32;
        this.height = 10;
        this.hitbox = {
            position: { x: this.position.x, y: this.position.y },
            width: this.width,
            height: this.height
        };
    }

    update(ctx) {
        // Move (Falling physics)
        this.position.y += this.velocity.y;
        this.hitbox.position.y = this.position.y; // Sync hitbox

        this.updateFrames();
        this.draw(ctx);
    }

    // Called by Player when they land on it
    fall() {
        if (this.isFalling) return; // Don't trigger twice
        
        this.isFalling = true;
        
        console.log("Platform triggered!");

        // 1. Shake or Wait (Optional: 1 second delay before falling)
        setTimeout(() => {
            
            // 2. Switch to 'Off' image
            this.switchSprite('off');
            
            // 3. Start moving down
            this.velocity.y = 3; 

        }, 1000); // 1000ms = 1 second delay
    }

    switchSprite(name) {
        if (this.image.src.includes(this.animations[name].imageSrc)) return;

        this.image.src = this.animations[name].imageSrc;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
        this.loop = this.animations[name].loop;
        this.currentFrame = 0;
    }
}