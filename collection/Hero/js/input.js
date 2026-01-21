export class InputHandler {
    constructor() {
        this.keys = {
            right: { pressed: false },
            left: { pressed: false },
        };

        // 1. KEYBOARD LISTENERS (Existing)
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'd':
                case 'ArrowRight':
                    this.keys.right.pressed = true;
                    break;
                case 'a':
                case 'ArrowLeft':
                    this.keys.left.pressed = true;
                    break;
            }
        });

        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'd':
                case 'ArrowRight':
                    this.keys.right.pressed = false;
                    break;
                case 'a':
                case 'ArrowLeft':
                    this.keys.left.pressed = false;
                    break;
            }
        });

        // 2. TOUCH CONTROLS (New)
        this.setupTouchControls();
    }

    setupTouchControls() {
        const btnLeft = document.getElementById('btnLeft');
        const btnRight = document.getElementById('btnRight');
        const btnJump = document.getElementById('btnJump');

        // Helper to prevent context menus on long press
        const preventDefault = (e) => { e.preventDefault(); e.stopPropagation(); };

        // --- LEFT BUTTON ---
        if (btnLeft) {
            btnLeft.addEventListener('touchstart', (e) => {
                preventDefault(e);
                this.keys.left.pressed = true;
            });
            btnLeft.addEventListener('touchend', (e) => {
                preventDefault(e);
                this.keys.left.pressed = false;
            });
        }

        // --- RIGHT BUTTON ---
        if (btnRight) {
            btnRight.addEventListener('touchstart', (e) => {
                preventDefault(e);
                this.keys.right.pressed = true;
            });
            btnRight.addEventListener('touchend', (e) => {
                preventDefault(e);
                this.keys.right.pressed = false;
            });
        }

        // --- JUMP BUTTON ---
        // We simulate a 'w' keypress so main.js hears it!
        if (btnJump) {
            btnJump.addEventListener('touchstart', (e) => {
                preventDefault(e);
                // Create a fake keyboard event
                const event = new KeyboardEvent('keydown', { key: 'w' });
                window.dispatchEvent(event);
            });
        }
    }
}