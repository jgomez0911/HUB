export class Camera {
    constructor({ width, height }) {
        this.position = {
            x: 0,
            y: 0
        };
        this.width = width;   // The viewport width (480)
        this.height = height; // The viewport height (352)
    }

    // We now accept mapWidth AND mapHeight
    update(targetPosition, mapWidth, mapHeight) {
        // 1. Center on the player
        // (target.x - halfScreen)
        this.position.x = targetPosition.x - this.width / 2;
        this.position.y = targetPosition.y - this.height / 2;

        // 2. Clamp Horizontal (Don't show past Left Wall)
        if (this.position.x < 0) {
            this.position.x = 0;
        }
        
        // 3. Clamp Horizontal (Don't show past Right Wall)
        // (Map Width - Screen Width)
        if (this.position.x > mapWidth - this.width) {
            this.position.x = mapWidth - this.width;
        }

        // 4. Clamp Vertical (Don't show past Top Ceiling)
        if (this.position.y < 0) {
            this.position.y = 0;
        }

        // 5. Clamp Vertical (Don't show past Bottom Floor)
        if (this.position.y > mapHeight - this.height) {
            this.position.y = mapHeight - this.height;
        }
    }
}