import { Sprite } from './sprite.js';
import { 
    Saw, Trophy, Checkpoint, Trampoline, Spikes, Fire, 
    SpikeHead, SpikeBall, Fruit, FallingPlatform 
} from './objects/index.js';

export class Player extends Sprite {
    constructor({ characterName = 'NinjaFrog', position }) {
        super({
            imageSrc: `assets/MainCharacters/${characterName}/idle.png`,
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            autoplay: true,
            position: position,
        });

        this.characterName = characterName;
        this.position = position;
        this.spawnPoint = { x: position.x, y: position.y };
        
        this.velocity = { x: 0, y: 0 };
        this.gravity = 0.7; 
        this.facingRight = true;
        this.isOnGround = false; 

        // --- HEALTH & STATUS ---
        this.lives = 3;
        this.isInvulnerable = false;
        this.isHit = false; 

        this.animations = {
            idle: { imageSrc: `assets/MainCharacters/${characterName}/idle.png`, frameRate: 11, frameBuffer: 6, loop: true },
            run:  { imageSrc: `assets/MainCharacters/${characterName}/run.png`,  frameRate: 12, frameBuffer: 6, loop: true },
            jump: { imageSrc: `assets/MainCharacters/${characterName}/jump.png`, frameRate: 1,  frameBuffer: 1, loop: false },
            fall: { imageSrc: `assets/MainCharacters/${characterName}/fall.png`, frameRate: 1,  frameBuffer: 1, loop: false },
            hit:  { imageSrc: `assets/MainCharacters/${characterName}/Hit.png`,  frameRate: 7,  frameBuffer: 4, loop: false }
        };

        for (let key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;
            this.animations[key].image = image;
        }
    }

    update(collisionBlocks, gameObjects, ctx) {
        // 1. Horizontal Movement & Collisions
        this.position.x += this.velocity.x;
        this.updateHitbox(); 
        this.checkForHorizontalCollisions(collisionBlocks, gameObjects);

        // 2. Vertical Movement & Collisions
        this.applyGravity();
        this.updateHitbox(); 
        this.isOnGround = false; 
        this.checkForVerticalCollisions(collisionBlocks, gameObjects);

        // 3. Object Interactions (Triggers like Coins/Trampolines)
        if (gameObjects) {
            this.checkForObjectCollisions(gameObjects);
        }

        // 4. Animation Reset (If Hit animation finishes)
        if (this.image === this.animations.hit.image && 
            this.currentFrame >= this.frameRate - 1) {
             this.isHit = false;
             this.switchSprite('idle');
        }

        this.updateFrames();
        this.draw(ctx);
    }

    // --- PHYSICS ENGINE (Solid Objects) ---

    checkForHorizontalCollisions(collisionBlocks, gameObjects) {
        // A. Terrain Walls
        for (let i = 0; i < collisionBlocks.length; i++) {
            const block = collisionBlocks[i];
            if (this.checkCollision(this.hitbox, block)) {
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

        // B. Solid Objects (Fire & Spikes)
        if (gameObjects) {
            for (let i = 0; i < gameObjects.length; i++) {
                const object = gameObjects[i];
                
                // Only check if colliding
                if (this.checkCollision(this.hitbox, object)) {
                    
                    // FIRE (Side = Toggle)
                    if (object instanceof Fire) {
                        // Push out logic
                        if (this.velocity.x > 0) {
                            const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                            this.position.x = object.position.x - offset - 0.01;
                        }
                        if (this.velocity.x < 0) {
                            const offset = this.hitbox.position.x - this.position.x;
                            this.position.x = object.position.x + object.width - offset + 0.01;
                        }
                        // Toggle Safe
                        if (!this.isInvulnerable) { 
                             object.toggle();
                             this.triggerInvulnerability(500); 
                        }
                    }

                    // SPIKES (Side = Block + Pain)
                    if (object instanceof Spikes) {
                        // Push out logic
                        if (this.velocity.x > 0) {
                            const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                            this.position.x = object.position.x - offset - 0.01;
                        }
                        if (this.velocity.x < 0) {
                            const offset = this.hitbox.position.x - this.position.x;
                            this.position.x = object.position.x + object.width - offset + 0.01;
                        }
                        this.takeDamage();
                    }
                }
            }
        }
    }

    checkForVerticalCollisions(collisionBlocks, gameObjects) {
        // A. Terrain Floor/Ceiling
        for (let i = 0; i < collisionBlocks.length; i++) {
            const block = collisionBlocks[i];
            if (this.checkCollision(this.hitbox, block)) {
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

        // B. Solid Objects (Switch Statement)
        if (gameObjects) {
            for (let i = 0; i < gameObjects.length; i++) {
                const object = gameObjects[i];
                
                if (this.checkCollision(this.hitbox, object)) {
                    
                    switch (true) {
                        // --- FIRE ---
                        case object instanceof Fire:
                            if (this.velocity.y > 0) { // Hit Top
                                const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                                this.position.y = object.position.y - offset - 0.01;
                                
                                if (object.isOn) {
                                    this.takeDamage();
                                    this.velocity.y = -8; 
                                } else {
                                    this.velocity.y = 0;
                                    this.isOnGround = true;
                                }
                            }
                            else if (this.velocity.y < 0) { // Hit Bottom
                                this.velocity.y = 0;
                                const offset = this.hitbox.position.y - this.position.y;
                                this.position.y = object.position.y + object.height - offset + 0.01;
                            }
                            break;

                        // --- SPIKES ---
                        case object instanceof Spikes:
                            if (this.velocity.y > 0) { // Land on spikes
                                const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                                this.position.y = object.position.y - offset - 0.01;
                                this.takeDamage();
                                this.velocity.y = -6; 
                            }
                            else if (this.velocity.y < 0) { // Jump into spikes
                                this.velocity.y = 0;
                                const offset = this.hitbox.position.y - this.position.y;
                                this.position.y = object.position.y + object.height - offset + 0.01;
                                this.takeDamage();
                            }
                            break;

                        // --- FALLING PLATFORM ---
                        case object instanceof FallingPlatform:
                            if (this.velocity.y > 0) { // Land on top
                                const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                                this.position.y = object.position.y - offset - 0.01;
                                this.velocity.y = 0;
                                this.isOnGround = true;
                                object.fall(); 
                            }
                            break;
                    }
                }
            }
        }
    }

    // --- TRIGGERS (Pass-through objects) ---
    checkForObjectCollisions(objects) {
        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];

            // SKIP items handled in Physics (Fire, Spikes, FallingPlatform)
            if (object instanceof Fire || object instanceof Spikes || object instanceof FallingPlatform) continue;

            if (this.checkCollision(this.hitbox, object)) {
                
                // Dangerous Objects
                if (object instanceof Saw || object instanceof SpikeHead || object instanceof SpikeBall) {
                    this.takeDamage();
                }
                
                // Interaction Objects
                if (object instanceof Trampoline && this.velocity.y > 0) {
                     object.bounce(); 
                     this.velocity.y = -20; // Super Jump!
                }
                
                // Collectibles
                if (object instanceof Fruit && !object.wasCollected) object.collect();
                
                // Logic
                if (object instanceof Checkpoint) {
                    object.activate();
                    this.spawnPoint = { x: object.position.x, y: object.position.y }; 
                }
                if (object instanceof Trophy) console.log("WIN!");
            }
        }
    }

    // --- HELPERS ---

    checkCollision(rect1, rect2) {
        return (
            rect1.position.x <= rect2.position.x + rect2.width &&
            rect1.position.x + rect1.width >= rect2.position.x &&
            rect1.position.y + rect1.height >= rect2.position.y &&
            rect1.position.y <= rect2.position.y + rect2.height
        );
    }

    takeDamage() {
        if (this.isInvulnerable) return;
        
        console.log("Player Hit! Lives:", this.lives - 1);
        this.lives--;
        
        if (this.lives <= 0) {
            this.respawn();
        } else {
            this.velocity.y = -4; 
            this.switchSprite('hit');
            this.isHit = true;

            // 4 Seconds Invulnerability
            this.triggerInvulnerability(4000); 

            // Unlock movement quickly (0.5s)
            setTimeout(() => {
                this.isHit = false;
            }, 500);
        }
    }

    triggerInvulnerability(time) {
        this.isInvulnerable = true;
        // No opacity change (Solid player)
        setTimeout(() => {
            this.isInvulnerable = false;
        }, time);
    }

    respawn() {
        console.log("Respawning...");
        this.lives = 3; 
        this.position.x = this.spawnPoint.x;
        this.position.y = this.spawnPoint.y;
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.isHit = false; 
        this.switchSprite('idle');
    }

    switchSprite(name) {
        if (this.image === this.animations.hit.image && 
            this.currentFrame < this.animations.hit.frameRate - 1) return;

        if (!this.animations[name] || this.image === this.animations[name].image) return;
        
        this.currentFrame = 0;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
        this.loop = this.animations[name].loop;
    }

    updateHitbox() {
        this.hitbox = {
            position: { x: this.position.x + 10, y: this.position.y + 10 },
            width: 14, height: 22 
        };
    }

    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    jump() {
        if (this.isOnGround) {
            this.velocity.y = -10; // Reduced Jump Height
            this.isOnGround = false;
        }
    }

    draw(ctx) {
        if (!this.loaded) return;
        ctx.save();
        ctx.globalAlpha = this.opacity || 1; 
        
        if (!this.facingRight) {
            ctx.translate(this.position.x + this.width, this.position.y);
            ctx.scale(-1, 1);
            ctx.translate(-this.position.x, -this.position.y);
        }

        const cropbox = {
            position: { x: this.currentFrame * (this.image.width / this.frameRate), y: 0 },
            width: this.image.width / this.frameRate,
            height: this.image.height
        };

        ctx.drawImage(
            this.image,
            cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height,
            this.position.x, this.position.y, this.width, this.height
        );
        ctx.restore();
    }
}