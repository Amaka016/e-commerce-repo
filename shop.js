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
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[id="add-to-cart"]');
        if (target) {
            e.preventDefault();
            const productCard = target.closest('.slide-item') || target.closest('.img-grid');
            if (productCard) {
                const img = productCard.querySelector('img');
                const priceElement = productCard.querySelector('.orange');
                let productName = '';
                const pElement = productCard.querySelector('p');
                if (pElement) {
                    const textLines = pElement.textContent.split('\n').map(line => line.trim()).filter(line => line);
                    for (let line of textLines) {
                        if (line !== 'New Arrival' && !line.startsWith('N') && line.length > 3) {
                            productName = line;
                            break;
                        }
                    }
                }
                let price = 0;
                if (priceElement) {
                    price = parseInt(priceElement.textContent.replace(/[^\d]/g, ''));
                }
                const imageSrc = img ? img.getAttribute('src') : 'https://via.placeholder.com/80';
                const product = {id: Date.now() + Math.random(), name: productName, price: price, quantity: 1, image: imageSrc};
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingProduct = cart.find(item => item.name === product.name);
                if (existingProduct) {existingProduct.quantity += 1;} else {cart.push(product);}
                localStorage.setItem('cart', JSON.stringify(cart));
                window.location.href = 'cart.html';
            }
        }
    });
});
