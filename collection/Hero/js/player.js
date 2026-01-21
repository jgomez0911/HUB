import { Sprite } from './sprite.js';

export class Player extends Sprite {
    constructor({ characterName = 'NinjaFrog', position }) {
        super({
            imageSrc: `assets/MainCharacters/${characterName}/idle.png`,
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            autoplay: true,
            position: position,
            scale: 1,
        });

        this.position = position;
        this.velocity = { x: 0, y: 0 };
        this.gravity = 0.7; 
        this.characterName = characterName;
        this.facingRight = true;
        this.isOnGround = false; 

        this.animations = {
            idle: {
                imageSrc: `assets/MainCharacters/${characterName}/idle.png`,
                frameRate: 11, frameBuffer: 8, loop: true
            },
            run: {
                imageSrc: `assets/MainCharacters/${characterName}/run.png`,
                frameRate: 12, frameBuffer: 8, loop: true
            },
            jump: {
                imageSrc: `assets/MainCharacters/${characterName}/jump.png`,
                frameRate: 1, frameBuffer: 8, loop: false
            },
            fall: {
                imageSrc: `assets/MainCharacters/${characterName}/fall.png`,
                frameRate: 1, frameBuffer: 1, loop: false
            }
        };

        for (let key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;
            this.animations[key].image = image;
        }
    }

    // UPDATE THIS: Add 'ctx' to arguments
    update(collisionBlocks, ctx) {
        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkForHorizontalCollisions(collisionBlocks);

        this.applyGravity();
        this.updateHitbox();
        
        this.isOnGround = false; 
        this.checkForVerticalCollisions(collisionBlocks);

        this.updateFrames();
        
        // Pass 'ctx' to draw
        this.draw(ctx);
    }

    // UPDATE THIS: Add 'ctx' to arguments
    draw(ctx) {
        if (!this.loaded) return;

        ctx.save();
        
        if (!this.facingRight) {
            ctx.translate(this.position.x + this.width, this.position.y);
            ctx.scale(-1, 1);
            ctx.translate(-this.position.x, -this.position.y);
        }

        const cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        };

        ctx.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        ctx.restore();
    }
    
    // ... keep updateHitbox, checkForCollisions, applyGravity, jump, etc. exactly the same ...
    // (I am omitting them to save space, but DO NOT delete them from your file!)
    updateHitbox() {
        this.hitbox = {
            position: { x: this.position.x + 10, y: this.position.y + 10 },
            width: 14, height: 22 
        };
    }
    checkForHorizontalCollisions(collisionBlocks) {
        for (let i = 0; i < collisionBlocks.length; i++) {
            const block = collisionBlocks[i];
            if (this.hitbox.position.x <= block.position.x + block.width && this.hitbox.position.x + this.hitbox.width >= block.position.x && this.hitbox.position.y + this.hitbox.height >= block.position.y && this.hitbox.position.y <= block.position.y + block.height) {
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                    this.position.x = block.position.x - offset - 0.01;
                }
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x;
                    this.position.x = block.position.x + block.width - offset + 0.01;
                }
            }
        }
    }
    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }
    checkForVerticalCollisions(collisionBlocks) {
        for (let i = 0; i < collisionBlocks.length; i++) {
            const block = collisionBlocks[i];
            if (this.hitbox.position.x <= block.position.x + block.width && this.hitbox.position.x + this.hitbox.width >= block.position.x && this.hitbox.position.y + this.hitbox.height >= block.position.y && this.hitbox.position.y <= block.position.y + block.height) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.isOnGround = true; 
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = block.position.y - offset - 0.01;
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y;
                    this.position.y = block.position.y + block.height - offset + 0.01;
                }
            }
        }
    }
    switchSprite(name) {
        if (!this.animations[name] || this.image === this.animations[name].image) return;
        this.currentFrame = 0;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
        this.loop = this.animations[name].loop;
    }
    jump() {
        if (this.isOnGround) {
            this.velocity.y = -12;
            this.isOnGround = false;
        }
    }
}