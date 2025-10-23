let cart = JSON.parse(localStorage.getItem('cart')) || [];

const TAX_RATE = 0.08; // 8% tax

window.addEventListener('storage', function(e){
    if (e.key=== 'cart'){
        cart = JSON.parse(e.newValue) || [];
    }
});

(function(){
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('addProduct')){
        const productData = {
            id : Date.now(),
            name: decodeURIComponent(urlParams.get('name') || 'Product'),
            price: parseInt(urlParams.get('price')) || 0,
            Image: decodeURIComponent(urlParams.get('image') || 'https://via.placeholder.com/80')
        };
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.name === productData.name);
        if (existingItem){
            existingItem.quantity += 1;
        } else{
            cart.push(productData);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.history.replaceState({}, document.title, 'cart.html');
    }
}) ();

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
                <div class="item-price">$${item.price.to.Localestring()}</div>
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

    document.getElementById('subtotal').textContent = `N${subtotal.toLocalestring()}`;
    document.getElementById('tax'). textContent = `N${total.toLocalestring()}`;
    document.getElementById('total').textContent = `N${total.toLocalestring()}`;
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

