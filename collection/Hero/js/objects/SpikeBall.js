import { Sprite } from '../sprite.js';

export class SpikeBall extends Sprite {
    constructor({ position }) {
        super({
            imageSrc: 'assets/Traps/Spiked Ball/Spiked Ball (28x28).png',
            frameRate: 1,
            frameBuffer: 1,
            loop: true,
            autoplay: true,
            position: position,
            dimensions: { width: 28, height: 28 }
        });

        this.angle = 0;
        this.radius = 70; // How wide the circle is
        this.centerX = position.x;
        this.centerY = position.y;
        this.speed = 0.05; // Rotation speed
    }

    update(ctx) {
        // Circular Movement Math
        this.angle += this.speed;
        
        // Update position based on angle
        this.position.x = this.centerX + Math.cos(this.angle) * this.radius;
        this.position.y = this.centerY + Math.sin(this.angle) * this.radius;

        // Draw the "Chain" (Line from center to ball)
        ctx.beginPath();
        ctx.moveTo(this.centerX + 14, this.centerY + 14); // Start at center anchor
        ctx.lineTo(this.position.x + 14, this.position.y + 14); // Draw to ball center
        ctx.strokeStyle = "grey";
        ctx.lineWidth = 4;
        ctx.stroke();

        this.draw(ctx);
    }
}