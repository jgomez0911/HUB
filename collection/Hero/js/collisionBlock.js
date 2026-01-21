import { Sprite } from './sprite.js';

export class CollisionBlock extends Sprite {
    constructor({ position, imageSrc, frameData, dimensions }) {
        // 1. PASS 'dimensions' to super() so Sprite knows to use them
        super({ position, imageSrc, dimensions }); 

        this.position = position;
        this.width = dimensions.width;
        this.height = dimensions.height;
        this.loaded = false;

        if (imageSrc) {
            this.image = new Image();
            this.image.onload = () => {
                this.loaded = true;
            };
            this.image.src = imageSrc;
            this.frameData = frameData; 
        }
    }

    draw(ctx) {
        if (this.image && this.loaded && this.frameData) {
            ctx.drawImage(
                this.image,
                this.frameData.sx,
                this.frameData.sy,
                this.frameData.sWidth,
                this.frameData.sHeight,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
        }
    }

    update(ctx) {
        this.draw(ctx);
    }
}