import { Sprite } from '../sprite.js';

export class Fire extends Sprite {
    constructor({ position }) {
        super({
            imageSrc: 'assets/Traps/Fire/On (16x32).png',
            frameRate: 3, 
            frameBuffer: 6, // Adjust speed of burning
            loop: true,
            autoplay: true,
            position: position,
            dimensions: { width: 32, height: 64 } // Fire is usually tall
        });

        // Hitbox is slightly smaller so you don't get burned by the edges
        this.hitboxWidth = 20;
        this.hitboxHeight = 40;
    }

    update(ctx) {
        this.draw(ctx);
        // We will calculate the specific hitbox in main.js collision checks
    }
}