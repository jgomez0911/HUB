import { Sprite } from '../sprite.js'; // Note the '..' to go up one folder

export class Saw extends Sprite {
    constructor({ position, range = 0 }) {
        super({
            imageSrc: 'assets/Traps/Saw/on.png', // Check this path!
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            autoplay: true,
            position: position,
        });

        this.range = range; // How far it moves
        this.distanceMoved = 0;
        this.moveSpeed = 1;
        this.moveRight = true;
        
        // Hitbox for the saw (slightly smaller than the image)
        this.width = 32; 
        this.height = 32;
    }

    update(ctx) {
        // 1. Move the Saw (Patrol Logic)
        if (this.range > 0) {
            if (this.moveRight) {
                this.position.x += this.moveSpeed;
                this.distanceMoved += this.moveSpeed;
                if (this.distanceMoved >= this.range) {
                    this.moveRight = false;
                }
            } else {
                this.position.x -= this.moveSpeed;
                this.distanceMoved -= this.moveSpeed;
                if (this.distanceMoved <= 0) {
                    this.moveRight = true;
                }
            }
        }

        // 2. Draw
        this.draw(ctx);
    }
}