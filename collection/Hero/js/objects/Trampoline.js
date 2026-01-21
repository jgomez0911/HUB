import { Sprite } from '../sprite.js';

export class Trampoline extends Sprite {
    constructor({ position }) {
        super({
            imageSrc: 'assets/Traps/Trampoline/Idle.png',
            frameRate: 1,
            frameBuffer: 1,
            loop: false,
            autoplay: false,
            position: position,
            dimensions: { width: 28, height: 28 }
        });

        this.animations = {
            idle: {
                imageSrc: 'assets/Traps/Trampoline/Idle.png',
                frameRate: 1, loop: false
            },
            jump: {
                imageSrc: 'assets/Traps/Trampoline/Jump (28x28).png',
                frameRate: 8, frameBuffer: 2, loop: false
            }
        };
    }

    update(ctx) {
        // If the animation finished, go back to idle
        if (this.image.src.includes('Jump') && this.currentFrame === this.frameRate - 1) {
            this.image.src = this.animations.idle.imageSrc;
            this.frameRate = this.animations.idle.frameRate;
            this.currentFrame = 0;
        }
        
        this.draw(ctx);
    }

    bounce() {
        this.image.src = this.animations.jump.imageSrc;
        this.frameRate = this.animations.jump.frameRate;
        this.frameBuffer = this.animations.jump.frameBuffer;
        this.loop = this.animations.jump.loop;
        this.currentFrame = 0;
        this.autoplay = true;
    }
}