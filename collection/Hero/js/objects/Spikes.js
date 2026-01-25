import { Sprite } from '../sprite.js';

export class Spikes extends Sprite {
    constructor({ position }) {
        super({
            imageSrc: 'assets/Traps/Spikes/idle.png',
            frameRate: 1, // It's just one image
            frameBuffer: 1,
            loop: false,
            autoplay: false,
            position: position,
            dimensions: { width: 32, height: 32 } // Force it to fill the grid
        });
        
        // Spikes are often smaller than the full block so you don't die 
        // if you just barely touch the empty air next to them.
        this.hitbox = {
            position: { x: this.position.x, y: this.position.y + 16 }, // Lower half only
            width: 32,
            height: 16
        };
    }

    update(ctx) {
        this.draw(ctx);
    }
}