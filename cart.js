let cart = [
    {id: 1, name: "Premium Whiskey", price: 45.99, quantity: 1, Image: "https://via.placeholder.com/80"},
    {id: 2, name: "Red Wine", price: 28.50, quantity: 2, Image:"https://via.placeholder.com/80"},
    {id: 3, name: "Carft Beer (6-pack)", price: 12.99, quantity: 1, image:"https://via.placeholder.com/80"}
];

const TAX_RATE = 0.08; // 8% tax

function renderCart(){
    const cartItemsDiv = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartContent = document.getElementById('cartContent');
    const cartCount = document.getElementById('cartCount');

    if (cart.length === 0){
        cartEmpty.style.display = 'block';
        cartContent.style.display = 'none';
        cartContent.textContent = '0';
        return;
    }
    cartEmpty.style.display = 'none';
    cartContent.style.display = 'block';
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img scr="${item.imamge}" alt="${item.name}" class"item-image">
            <div class"item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class"item-controls">
                <div class="quantity-control">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
            </div>
        </div>    
        `).join('');

        updateSummary();
}

function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item){
        item.quantity += change;
        if (item.quantity <= 0){
            removeItem(id);
        } else{
            renderCart();
        }
    }
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    renderCart();
}

function updateSummary() {
    const subtotal = cart.reduce((sum, item)=> sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax'). textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function goToCheckout() {
    // Store cart data for checkout page
    const cartData = {
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        tax: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * TAX_RATE
    };

    sessionStorage.setItem('checkoutData', JSON.stringify(cartData));
    window.location.href= 'checkout.html';
}
document.addEventListener('DOMContentLoaded', renderCart);