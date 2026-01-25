import { Sprite } from '../sprite.js';

export class Fruit extends Sprite {
    constructor({ position, fruitName = 'Kiwi' }) {
        super({
            imageSrc: `assets/Items/Fruits/${fruitName}.png`, // e.g., Apple.png
            frameRate: 17, 
            frameBuffer: 5,
            loop: true,
            autoplay: true,
            position: position,
            dimensions: { width: 32, height: 32 }
        });

        this.wasCollected = false;
        
        this.animations = {
            idle: {
                imageSrc: `assets/Items/Fruits/${fruitName}.png`,
                frameRate: 17, frameBuffer: 6, loop: true
            },
            collected: {
                imageSrc: 'assets/Items/Fruits/Collected.png', // The "Poof" effect
                frameRate: 6, frameBuffer: 6, loop: false
            }
        };
    }

    collect() {
        if (this.wasCollected) return;
        
        this.wasCollected = true;
        this.image.src = this.animations.collected.imageSrc;
        this.frameRate = this.animations.collected.frameRate;
        this.frameBuffer = this.animations.collected.frameBuffer;
        this.loop = false;
        this.currentFrame = 0;
    }

    update(ctx) {
        // If collected and animation finished, we can hide it (handled in main.js usually)
        this.draw(ctx);
    }
}