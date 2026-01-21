import { Sprite } from '../sprite.js';

export class SpikeHead extends Sprite {
    constructor({ position, range = 100 }) {
        super({
            imageSrc: 'assets/Traps/Spike Head/Idle.png', // Start Idle
            frameRate: 1, // Idle is usually 1 frame
            frameBuffer: 1,
            loop: true,
            autoplay: true,
            position: position,
            dimensions: { width: 54, height: 52 } 
        });

        this.range = range;
        this.distanceMoved = 0;
        this.speed = 1.5;
        this.movingPositive = true; // Moving Down (or Right)
        this.moveHorizontal = false; // Set to TRUE if you want it to move Left/Right
    }

    update(ctx) {
        // MOVEMENT LOGIC
        const movement = this.movingPositive ? this.speed : -this.speed;

        if (this.moveHorizontal) {
            this.position.x += movement;
        } else {
            this.position.y += movement;
        }

        this.distanceMoved += Math.abs(this.speed);

        // Turn around
        if (this.distanceMoved >= this.range) {
            this.movingPositive = !this.movingPositive;
            this.distanceMoved = 0;
            
            // Optional: Switch to "Blink" animation when turning if you have it
        }

        this.draw(ctx);
    }
}