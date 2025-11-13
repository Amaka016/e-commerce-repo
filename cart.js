// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// const TAX_RATE = 0.08; // 8% tax

// window.addEventListener('storage', function(e){
//     if (e.key=== 'cart'){
//         cart = JSON.parse(e.newValue) || [];
//     }
// });

// (function(){
//     const urlParams = new URLSearchParams(window.location.search);

//     if (urlParams.has('addProduct')){
//         const productData = {
//             id : Date.now(),
//             name: decodeURIComponent(urlParams.get('name') || 'Product'),
//             price: parseInt(urlParams.get('price')) || 0,
//             Image: decodeURIComponent(urlParams.get('image') || 'https://via.placeholder.com/80')
//         };
//         let cart = JSON.parse(localStorage.getItem('cart')) || [];
//         const existingItem = cart.find(item => item.name === productData.name);
//         if (existingItem){
//             existingItem.quantity += 1;
//         } else{
//             cart.push(productData);
//         }
//         localStorage.setItem('cart', JSON.stringify(cart));
//         window.history.replaceState({}, document.title, 'cart.html');
//     }
// }) ();

// function renderCart(){
//     const cartItemsDiv = document.getElementById('cartItems');
//     const cartEmpty = document.getElementById('cartEmpty');
//     const cartContent = document.getElementById('cartContent');
//     const cartCount = document.getElementById('cartCount');

//     if (cart.length === 0){
//         cartEmpty.style.display = 'block';
//         cartContent.style.display = 'none';
//         cartContent.textContent = '0';
//         return;
//     }
//     cartEmpty.style.display = 'none';
//     cartContent.style.display = 'block';
//     cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

//     cartItemsDiv.innerHTML = cart.map(item => `
//         <div class="cart-item">
//             <img scr="${item.imamge}" alt="${item.name}" class"item-image">
//             <div class"item-details">
//                 <div class="item-name">${item.name}</div>
//                 <div class="item-price">N${item.price.toLocaleString()}</div>
//             </div>
//             <div class"item-controls">
//                 <div class="quantity-control">
//                     <button onclick="updateQuantity(${item.id}, -1)">-</button>
//                     <span>${item.quantity}</span>
//                     <button onclick="updateQuantity(${item.id}, 1)">+</button>
//                 </div>
//             <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
//             </div>
//         </div>    
//         `).join('');

//         updateSummary();
// }

// function updateQuantity(id, change) {
//     const item = cart.find(i => i.id === id);
//     if (item){
//         item.quantity += change;
//         if (item.quantity <= 0){
//             removeItem(id);
//         } else{
//             renderCart();
//         }
//     }
// }

// function removeItem(id) {
//     cart = cart.filter(i => i.id !== id);
//     renderCart();
// }

// function updateSummary() {
//     const subtotal = cart.reduce((sum, item)=> sum + (item.price * item.quantity), 0);
//     const tax = subtotal * TAX_RATE;
//     const total = subtotal + tax;

//     document.getElementById('subtotal').textContent = `N${subtotal.toLocaleString()}`;
//     document.getElementById('tax'). textContent = `N${total.toLocaleString()}`;
//     document.getElementById('total').textContent = `N${total.toLocaleString()}`;
// }

// function goToCheckout() {
//     // Store cart data for checkout page
//     const cartData = {
//         items: cart,
//         subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
//         tax: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * TAX_RATE
//     };

//     sessionStorage.setItem('checkoutData', JSON.stringify(cartData));
//     window.location.href= 'checkout.html';
// }
// document.addEventListener('DOMContentLoaded', renderCart);


let cart = JSON.parse(localStorage.getItem('cart')) || [];

const TAX_RATE = 0.08; // 8% tax

window.addEventListener('storage', function(e){
    if (e.key === 'cart'){
        cart = JSON.parse(e.newValue) || [];
        renderCart();
    }
});

function renderCart(){
    const cartItemsDiv = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartContent = document.getElementById('cartContent');
    const cartCount = document.getElementById('cartCount');

    cart=JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0){
        cartEmpty.style.display = 'block';
        cartContent.style.display = 'none';
        cartContent.textContent = '0';
        return;
    }
    cartEmpty.style.display = 'none';
    cartContent.style.display = 'block';
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartItemsDiv.innerHTML = cart.map((item, index) => `
        <div class="cart-item"  data-index="${index}">
            <img scr="${item.imamge}" alt="${item.name}" class"item-image" onerror="this.src='https: //via.placeholder.com/80'">
            <div class"item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">N${item.price.toLocaleString()}</div>
            </div>
            <div class"item-controls">
                <div class="quantity-control">
                    <button onclick="window.updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="window.updateQuantity(${index}, 1)">+</button>
                </div>
            <button class="remove-btn" onclick="window.removeItemByName('${item.name.replace(/'/g,"\\'")}')">Remove</button>
            </div>
        </div>    
        `).join('');
        
        updateSummary();
    }

    function updateQuantity(index, change) {
        cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart[index]){
            cart[index].quantity += change;
            if (cart[index].quantity <= 0){
                cart.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }

    function removeItemByName(name) {
        cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart = cart.filter(item => item.name !== name);

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

function updateSummary() {
    const subtotal = cart.reduce((sum, item)=> sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `N${subtotal.toLocaleString()}`;
    document.getElementById('tax'). textContent = `N${total.toLocaleString()}`;
    document.getElementById('total').textContent = `N${total.toLocaleString()}`;
}

function goToCheckout() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const cartData = {
        items : cart,
        subtotal : cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        tax : cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * TAX_RATE
    };

    sessionStorage.setItem('checkoutData', JSON.stringify(cartData));
    window.location.href = 'checkout.html';
}

window.updateQuantity = updateQuantity;
window.removeItemByName = removeItemByName;

document.addEventListener('DOMContentLoaded', function(){
    renderCart();
});

document.addEventListener('visibilitychange', function(){
    if (!document.hidden){
        renderCart();
    }
});

window.addEventListener('focus', function(){
    renderCart();
});