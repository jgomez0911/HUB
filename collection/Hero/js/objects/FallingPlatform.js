import { Sprite } from '../sprite.js';

export class FallingPlatform extends Sprite {
    constructor({ position }) {
        super({
            imageSrc: 'assets/Traps/Falling Platforms/On (32x10).png',
            frameRate: 4,
            frameBuffer: 4,
            loop: true,
            autoplay: true,
            position: position,
            dimensions: { width: 32, height: 10 }
        });

        this.velocity = { x: 0, y: 0 };
        this.falling = false;
        this.shakeTime = 0;
    }

    update(ctx) {
        if (this.falling) {
            // Apply gravity
            this.velocity.y += 0.5;
            this.position.y += this.velocity.y;
        }

        this.draw(ctx);
    }

    trigger() {
        if (!this.falling && this.shakeTime === 0) {
            // Start the "Shake" logic (simplified here as immediate fall for now)
            // You can add a timeout here to make it shake for 1 second before falling
            this.falling = true;
        }
    }
}