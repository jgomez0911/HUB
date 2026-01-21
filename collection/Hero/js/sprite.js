export class Sprite {
    // 1. Add 'dimensions' to the arguments list
    constructor({ position, imageSrc, frameRate = 1, frameBuffer = 3, scale = 1, loop = true, autoplay = true, dimensions }) {
        this.position = position;
        this.scale = scale;
        this.loaded = false;
        this.image = new Image();

        // 2. If dimensions provided, set them immediately
        if (dimensions) {
            this.width = dimensions.width;
            this.height = dimensions.height;
        }

        this.image.onload = () => {
            this.loaded = true;

            // 3. CRITICAL FIX: Only auto-calculate size if dimensions were NOT provided
            // This prevents the huge terrain image from overriding your 32x32 block size
            if (!dimensions) {
                this.width = (this.image.width / this.frameRate) * this.scale;
                this.height = this.image.height * this.scale;
            }
        };

        this.image.src = imageSrc;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.frameBuffer = frameBuffer;
        this.elapsedFrames = 0;
        this.loop = loop;
        this.autoplay = autoplay;
    }

    draw(ctx) {
        if (!this.image || !this.loaded) return;

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

        this.updateFrames();
    }

    updateFrames() {
        if (!this.autoplay) return;

        this.elapsedFrames++;

        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++;
            } else if (this.loop) {
                this.currentFrame = 0;
            }
        }
    }
}