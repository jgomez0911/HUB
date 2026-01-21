export class Background {
    constructor({ imageSrc }) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.loaded = false;
        this.pattern = null; 

        this.image.onload = () => {
            this.loaded = true;
        };
    }

    // UPDATE: Accept 'camera' as an argument
    draw(ctx, camera) {
        if (!this.loaded) return;

        if (!this.pattern) {
            this.pattern = ctx.createPattern(this.image, 'repeat');
        }

        ctx.fillStyle = this.pattern;
        
        // DRAW CHANGE: 
        // Instead of (0,0), we draw the rectangle exactly where the camera is.
        // We add 'camera.position.x' to make sure the background covers the new view.
        ctx.save();
        ctx.translate(camera.position.x, camera.position.y);
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }
}