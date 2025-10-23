//Filter-search//

  (function productSearch() {
    const form   = document.querySelector('.search-container form');
    const input  = form?.querySelector('input');
    const cards  = [...document.querySelectorAll('.product-content-cover')];
    const grid   = document.querySelector('.product-container');

    if (!form || !input || !cards.length || !grid) return;

    // Results counter (inserts once above the grid)
    let counter = document.getElementById('results-count');
    if (!counter) {
      counter = document.createElement('div');
      counter.id = 'results-count';
      counter.setAttribute('aria-live', 'polite');
      counter.style.cssText = 'width:min(1200px,92vw);margin:8px auto 0;color:#bbb;font-size:12px;';
      const container = document.querySelector('.body-container') || document.body;
      container.insertBefore(counter, grid);
    }

    function updateCounter(visibleCount) {
      if (visibleCount === cards.length || input.value.trim() === '') {
        counter.textContent = ''; // hide when showing all or query empty
      } else {
        counter.textContent = `${visibleCount} result${visibleCount !== 1 ? 's' : ''} found`;
      }
    }

    function filterProducts(query) {
      const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
      let visible = 0;

      cards.forEach(card => {
        const name  = card.querySelector('.desc')?.textContent.toLowerCase() || '';
        const price = card.querySelector('.price')?.textContent.toLowerCase() || '';
        const haystack = `${name} ${price}`;

        // Require all terms to appear (AND search)
        const match = terms.length === 0 || terms.every(t => haystack.includes(t));

        card.style.display = match ? '' : 'none';
        if (match) visible++;
      });

      updateCounter(visible);
    }

    // Debounce helper for smooth typing
    function debounce(fn, delay = 120) {
      let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
    }

    // Wire events
    form.addEventListener('submit', e => {
      e.preventDefault();
      filterProducts(input.value);
    });

    input.addEventListener('input', debounce(() => {
      filterProducts(input.value);
    }, 120));

    // ESC clears search
    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        input.value = '';
        filterProducts('');
      }
    });

    // Initial state (show all)
    filterProducts('');
  })();

document.addEventListener('DOMContentLoaded', function() {
    // Get all add-to-cart buttons
    const addToCartButtons = document.querySelectorAll('a[id="add-to-cart"]');
    
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Find the parent container
            let productCard = this.closest('.slide-item');
            if (!productCard) {
                productCard = this.closest('.img-grid');
            }
            
            if (productCard) {
                // Get image
                const img = productCard.querySelector('img');
                const imageSrc = img ? img.src : '';
                
                // Get price
                const priceElement = productCard.querySelector('.orange');
                let price = 0;
                if (priceElement) {
                    const priceText = priceElement.textContent || priceElement.innerText;
                    price = parseInt(priceText.replace(/\D/g, ''));
                }
                
                // Get product name - improved extraction
                let productName = 'Product';
                const pElement = productCard.querySelector('p');
                if (pElement) {
                    // Get all text nodes
                    let textContent = pElement.textContent || pElement.innerText;
                    // Split by line breaks
                    let lines = textContent.split(/\r?\n/).filter(line => line.trim());
                    
                    // Find product name (skip "New Arrival" and price lines)
                    for (let i = 0; i < lines.length; i++) {
                        let line = lines[i].trim();
                        if (line && 
                            line !== 'New Arrival' && 
                            !line.match(/^[N₦]\s*[\d,]+/) && 
                            line.length > 5) {
                            productName = line;
                            break;
                        }
                    }
                }
                
                // Create product object
                const product = {
                    id: Date.now() + Math.random(),
                    name: productName,
                    price: price,
                    quantity: 1,
                    image: imageSrc
                };
                
                // Get cart from localStorage
                let cart = [];
                try {
                    const cartData = localStorage.getItem('cart');
                    if (cartData) {
                        cart = JSON.parse(cartData);
                    }
                } catch (error) {
                    cart = [];
                }
                
                // Check if item exists
                const existingIndex = cart.findIndex(item => item.name === product.name);
                if (existingIndex > -1) {
                    cart[existingIndex].quantity += 1;
                } else {
                    cart.push(product);
                }
                
                // Save to localStorage
                try {
                    localStorage.setItem('cart', JSON.stringify(cart));
                } catch (error) {
                    alert('Failed to add item to cart');
                    return;
                }
                
                // Go to cart page
                window.location.href = 'cart.html';
            }
        });
    });
});
