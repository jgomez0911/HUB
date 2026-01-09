// Data array containing all items from menu image
const menuData = [
    // Main Dishes - Row 1
    { id: 1, name: "Cheeseburger", price: 2.50, spriteClass: "m-r1-c1" },
    { id: 2, name: "Hamburger", price: 2.00, spriteClass: "m-r1-c2" },
    { id: 3, name: "Double Cheeseburger", price: 3.50, spriteClass: "m-r1-c3" },
    { id: 4, name: "Quarter Pounder", price: 4.50, spriteClass: "m-r1-c4" },
    { id: 5, name: "Big Mac", price: 5.00, spriteClass: "m-r1-c5" },
    { id: 6, name: "Bacon BBQ Burger", price: 5.50, spriteClass: "m-r1-c6" },

    // Main Dishes - Row 2
    { id: 7, name: "McChicken", price: 3.00, spriteClass: "m-r2-c1" },
    { id: 8, name: "Buttermilk Crispy", price: 4.50, spriteClass: "m-r2-c2" },
    { id: 9, name: "Artisan Grilled", price: 4.75, spriteClass: "m-r2-c3" },
    { id: 10, name: "4pc Nuggets", price: 2.00, spriteClass: "m-r2-c4" },
    { id: 11, name: "Chicken Tenders", price: 4.00, spriteClass: "m-r2-c5" },
    { id: 12, name: "Filet-O-Fish", price: 3.75, spriteClass: "m-r2-c6" },

    // Salads
    { id: 13, name: "Crispy Chicken bacon ranch Salad", price: 2.25, spriteClass: "m-r3-c1" },
    { id: 14, name: "Grilled chicken bacon ranc sald", price: 1.00, spriteClass: "m-r3-c2" },
    { id: 15, name: "Crispy Chicken Southwest salad", price: 1.00, spriteClass: "m-r3-c3" },
    { id: 16, name: "Grilled chicken southwest salad", price: 2.50, spriteClass: "m-r3-c4" },

    //Sides - Row 1
    { id: 17, name: "Fries", price: 2.25, spriteClass: "s-r1-c1" },
    { id: 18, name: "Apple Slices", price: 1.00, spriteClass: "s-r1-c2" },
    { id: 19, name: "Go-Gurt", price: 1.00, spriteClass: "s-r1-c3" },
    { id: 20, name: "Fruit Parfait", price: 2.50, spriteClass: "s-r1-c4" },
    { id: 21, name: "Side Salad", price: 2.00, spriteClass: "s-r1-c5" },
    { id: 22, name: "Milkshake", price: 3.00, spriteClass: "s-r1-c6" },

    //Sides - Row 2
    { id: 23, name: "Ice cream cone", price: 2.25, spriteClass: "s-r2-c1" },
    { id: 24, name: "Sundae", price: 1.00, spriteClass: "s-r2-c2" },
    { id: 25, name: "McFlurry", price: 1.00, spriteClass: "s-r2-c3" },
    { id: 26, name: "Baked apple pie", price: 2.50, spriteClass: "s-r2-c4" },
    { id: 27, name: "Chocolate chip cookie", price: 2.00, spriteClass: "s-r2-c5" },
    { id: 28, name: "Donut Sticks", price: 3.00, spriteClass: "s-r2-c6" },

    // Drinks - Row 1
    { id: 29, name: "Coca Cola", price: 1.50, spriteClass: "d-r1-c1" },
    { id: 30, name: "Diet Coke", price: 1.50, spriteClass: "d-r1-c2" },
    { id: 31, name: "Sprite", price: 1.50, spriteClass: "d-r1-c3" },
    { id: 32, name: "Fanta", price: 1.50, spriteClass: "d-r1-c4" },
    { id: 33, name: "Dr. Pepper", price: 1.50, spriteClass: "d-r1-c5" },
    { id: 34, name: "Iced Tea", price: 1.50, spriteClass: "d-r1-c6" },

    // Drinks - Row 2
    { id: 35, name: "Chocolate Milk", price: 1.50, spriteClass: "d-r2-c1" },
    { id: 36, name: "Milk", price: 1.50, spriteClass: "d-r2-c2" },
    { id: 37, name: "Apple Juice", price: 1.50, spriteClass: "d-r2-c3" },
    { id: 38, name: "Slushie", price: 1.50, spriteClass: "d-r2-c4" },
    { id: 39, name: "Bottled water", price: 1.50, spriteClass: "d-r2-c5" },
    { id: 40, name: "Water Cup", price: 0.00, spriteClass: "d-r2-c6" },
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    renderMenu();
});

function renderMenu() {
    const menuGrid = document.getElementById('menu-grid');
    if (!menuGrid) return;

    menuData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';

        // Entire card is now the click target
        card.onclick = () => addToCart(item.id);

        card.innerHTML = `
            <div class="sprite ${item.spriteClass}"></div>
            <div class="item-info">
                <p class="item-price">$${item.price.toFixed(2)}</p>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

function addToCart(itemId) {
    const item = menuData.find(i => i.id === itemId);
    if (item) {
        cart.push(item);
        updateCartCount();

        // Simple visual confirmation on the floating cart
        const cartBtn = document.getElementById('cart-button');
        cartBtn.style.transform = "scale(1.2)";
        setTimeout(() => cartBtn.style.transform = "scale(1)", 200);
    }
}

function updateCartCount() {
    const countLabel = document.getElementById('cart-count');
    if (countLabel) {
        countLabel.innerText = cart.length;
    }
}

// 1. Logic to show the custom popup instead of alert
function showPopup(message) {
    document.getElementById('popup-message').innerText = message;
    document.getElementById('custom-popup').classList.remove('hidden');
}

function closePopup() {
    document.getElementById('custom-popup').classList.add('hidden');
}

// 2. Updated Toggle Receipt
function toggleReceipt() {
    const modal = document.getElementById('receipt-modal');
    if (cart.length === 0) {
        showPopup("Your cart is empty! Pick some food first.");
        return;
    }
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) {
        generateReceiptContent();
    }
}

function generateReceiptContent() {
    const orderNum = Math.floor(Math.random() * 900) + 100;
    const orderNumSpan = document.getElementById('order-number');
    if (orderNumSpan) orderNumSpan.innerText = orderNum;

    const itemsContainer = document.getElementById('receipt-items');
    itemsContainer.innerHTML = "";
    let total = 0;

    // 2. Build Rows with the specific Flexbox structure
    cart.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'receipt-row'; // This triggers the CSS space-between

        row.innerHTML = `
            <span class="receipt-item-name">${item.name}</span>
            <div class="receipt-item-right">
                <span>$${item.price.toFixed(2)}</span>
                <button class="remove-btn" onclick="removeItem(${index})">X</button>
            </div>
        `;
        itemsContainer.appendChild(row);
        total += item.price;
    });

    const totalSpan = document.getElementById('receipt-total');
    if (totalSpan) totalSpan.innerText = total.toFixed(2);

    itemsContainer.scrollTop = itemsContainer.scrollHeight;
}

// 4. Remove Item Function
function removeItem(index) {
    cart.splice(index, 1); // Remove 1 item at that specific index
    updateCartCount();

    if (cart.length === 0) {
        toggleReceipt(); // Close modal if last item is removed
        showPopup("All items removed.");
    } else {
        generateReceiptContent(); // Refresh the list
    }
}

// 5. Updated Paid Logic to use Popup
function markAsPaid() {
    cart = [];
    updateCartCount();
    document.getElementById('receipt-modal').classList.add('hidden');
    showPopup("Thank you! Order complete. Next customer please!");
}

function printOrder() {
    window.print();
    cart = [];
    updateCartCount();
    toggleReceipt();
}