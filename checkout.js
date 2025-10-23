function loadCheckoutData (){
    const checkoutData = sessionStorage.getItem('checkoutData');
    
    if (!checkoutData){
        alert('No items in checkout. Redirecting to cart...');
        window.location.href = 'cart.html';
        return null;
    }
    return JSON.parse(checkoutData);
}

function renderOrderSummary(){
    const data = loadCheckoutData();
    if (!data) return;

    const orderItemsDiv = document.getElementById('orderItems');

    orderItemsDiv.innerHTML = data.items.map(item =>`
        <div class= "order-item">
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-quantity">Quantity: ${item.quantity}</div>
            </div>
            <div class="item-price">N${(item.price).toLocalestring()}</div>
        </div>        
        `).join('');

        const total = data.subtotal + data.tax;

        document.getElementById('summarySubtotal'). textContent = `N${data.subtotal.toLocalestring()}`;
        document.getElementById('summaryTax').textContent = `N${data.subtotal.toLocalestring()}`;
        document.getElementById('summaryTotal').textContent = `N${data.subtotal.toLocalestring()}`;
}

function handleCheckoutSubmit(e) {
    e.preventDefault();

    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        cardNumber: document.getElementById('caedNumber').value,
        expiry: document.getElementById('expiry').value,
        cvv: document.getElementById('cvv').value
    };

    // Stimulate order processing
    alert('Order placed successfully! Thank you for your purchase.');

    // Clear checkout data
    sessionStorage.removeItem('checkoutData');

    // Redirect to Confirmation page (or home)
    window.location.href = 'cart.html';
}

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    renderOrderSummary();
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);

});
