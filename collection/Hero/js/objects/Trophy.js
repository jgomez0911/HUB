import { Sprite } from '../sprite.js';

export class Trophy extends Sprite {
    constructor({ position }) {
        super({
            imageSrc: 'assets/Items/Checkpoints/End/End (Pressed) (64x64).png', // Check path!
            frameRate: 8,
            frameBuffer: 6,
            loop: true,
            autoplay: true,
            position: position,
        });
    }

    update(ctx) {
        this.draw(ctx);
    }
}