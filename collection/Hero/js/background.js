export class Background {
    constructor({ imageSrc }) {
        this.position = { x: 0, y: 0 };
        this.image = new Image();
        this.image.src = imageSrc;
        this.loaded = false;

        this.image.onload = () => {
            this.loaded = true;
        };
    }

    // UPDATE: We removed 'camera' from the arguments here
    draw(ctx) {
        if (!this.image || !this.loaded) return;

        // Draw the image at 0,0 of the SCREEN (Static)
        // We force it to stretch to the canvas size
        ctx.drawImage(
            this.image,
            0,
            0,
            ctx.canvas.width,  
            ctx.canvas.height  
        );
    }
}