import { Sprite } from '../sprite.js';

export class Checkpoint extends Sprite {
    constructor({ position }) {
        super({
            // Start with the "No Flag" or "Idle" animation
            imageSrc: 'assets/Items/Checkpoints/Checkpoint/Checkpoint (No Flag).png', 
            frameRate: 1, // Static image initially
            frameBuffer: 1,
            loop: false,
            autoplay: false,
            position: position,
            dimensions: { width: 64, height: 64 }
        });

        this.reached = false;
        
        // Preload the "Flag Out" animation
        this.animations = {
            inactive: {
                imageSrc: 'assets/Items/Checkpoints/Checkpoint/Checkpoint (No Flag).png',
                frameRate: 1, frameBuffer: 1, loop: false
            },
            active: {
                // This animation plays when you touch it
                imageSrc: 'assets/Items/Checkpoints/Checkpoint/Checkpoint (Flag Out) (64x64).png',
                frameRate: 26, // Assuming it has 26 frames
                frameBuffer: 2, 
                loop: false // Don't loop the flag raising, just stop at the end
            }
        };
    }

    update(ctx) {
        // We will call this method later in main.js when collision happens
        if (this.reached) {
            // Logic to ensure animation plays is handled in Sprite
        }
        this.draw(ctx);
    }

    // Call this function when player touches the checkpoint
    activate() {
        if (!this.reached) {
            this.reached = true;
            this.image.src = this.animations.active.imageSrc;
            this.frameRate = this.animations.active.frameRate;
            this.frameBuffer = this.animations.active.frameBuffer;
            this.loop = this.animations.active.loop;
            this.currentFrame = 0;
            this.autoplay = true;
        }
    }
}