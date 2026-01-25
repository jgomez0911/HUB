import { Sprite } from '../sprite.js';

export class SpikeHead extends Sprite {
    constructor({ position }) {
        super({
            imageSrc: 'assets/Traps/Spike Head/Blink (54x52).png',
            frameRate: 4,
            frameBuffer: 50,
            loop: true,
            autoplay: true,
            position: position,
            // HERE IS THE FIX: We pass the desired size to the Sprite class
            dimensions: { width: 32, height: 32 } 
        });

        this.position = position;
        
        // MOVEMENT: Start moving UP slowly
        this.velocity = { x: 0, y: -1 }; 

        // HITBOX SIZE (Matches the visual size)
        this.width = 52;
        this.height = 52;
        
        this.hitbox = {
            position: { x: this.position.x, y: this.position.y },
            width: this.width,
            height: this.height
        };
    }

    update(ctx, collisionBlocks) {
        this.move(collisionBlocks);
        // Note: updateFrames is called inside super.draw() in your new Sprite class,
        // so we don't need to call it manually here unless you removed it from draw().
        // If your Sprite.draw() has this.updateFrames() at the bottom, just call:
        this.draw(ctx);
    }

    move(collisionBlocks) {
        // 1. Apply Movement
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // 2. Sync Hitbox
        this.hitbox.position.x = this.position.x;
        this.hitbox.position.y = this.position.y;

        // 3. Check Collisions (Thwomp Logic)
        if (collisionBlocks) {
            for (let i = 0; i < collisionBlocks.length; i++) {
                const block = collisionBlocks[i];

                if (this.checkCollision(this.hitbox, block)) {
                    
                    // A. Undo Move (Step Out)
                    this.position.x -= this.velocity.x;
                    this.position.y -= this.velocity.y;
                    
                    // B. Swap Speed
                    // Hit Ceiling -> Fast Down
                    if (this.velocity.y < 0) {
                        this.velocity.y = 3; 
                    } 
                    // Hit Floor -> Slow Up
                    else {
                        this.velocity.y = -1; 
                    }

                    break; 
                }
            }
        }
    }

    checkCollision(rect1, rect2) {
        return (
            rect1.position.x <= rect2.position.x + rect2.width &&
            rect1.position.x + rect1.width >= rect2.position.x &&
            rect1.position.y + rect1.height >= rect2.position.y &&
            rect1.position.y <= rect2.position.y + rect2.height
        );
    }
}