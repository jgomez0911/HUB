import { Sprite } from '../sprite.js';

export class Fire extends Sprite {
    constructor({ position }) {
        super({
            imageSrc: 'assets/Traps/Fire/On.png',
            frameRate: 3, 
            frameBuffer: 12,
            loop: true,
            autoplay: true,
            position: position,
            dimensions: { width: 16, height: 32 } 
        });

        this.isOn = true;
        
        // Hitbox matches the fire size
        this.hitbox = { width: 16, height: 32 };

        this.animations = {
            on: {
                imageSrc: 'assets/Traps/Fire/on.png',
                frameRate: 3, 
                frameBuffer: 12, 
                loop: true
            },
            off: {
                // Ensure this path matches your file exactly!
                imageSrc: 'assets/Traps/Fire/off.png', 
                frameRate: 1, // vital: Off image is single frame
                frameBuffer: 1, 
                loop: false
            }
        };
    }

    toggle() {
        this.isOn = !this.isOn;
        
        if (this.isOn) {
            this.switchSprite('on');
        } else {
            this.switchSprite('off');
        }
    }

    // Helper to cleanly switch animations and force properties
    switchSprite(name) {
        const animation = this.animations[name];
        if (this.image.src === animation.imageSrc) return;

        this.image.src = animation.imageSrc;
        this.frameRate = animation.frameRate;
        this.frameBuffer = animation.frameBuffer;
        this.loop = animation.loop;
        this.currentFrame = 0; 
        
        // If ON, we autoplay. If OFF, we stop.
        this.autoplay = this.isOn;
    }

    update(ctx) {
        // FIX VISIBILITY: We MUST update frames every loop
        this.updateFrames();
        this.draw(ctx);
    }
}