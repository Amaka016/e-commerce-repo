//Filter-search//
/*
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

  */


//Rotating promotional messages on nav-bar//
let navbarNotes = [
  "Easy, convenient shopping",
  "100% authentic products",
  "Secure payment options",
  "24/7 customer support"
]

let currentNoteIndex = 0
let navbarNotesElement = document.querySelector('.navbar-notes p')
let notesTimer = null
let notesDelay = 3000

function updateNavbarNote() {
    // Add fade out effect
    navbarNotesElement.style.transition = 'opacity 0.3s ease-in-out'
    navbarNotesElement.style.opacity = '0'
    
    setTimeout(function() {
        // Change text
        navbarNotesElement.textContent = navbarNotes[currentNoteIndex]
        
        // Fade in
        navbarNotesElement.style.opacity = '1'
        
        // Move to next note
        currentNoteIndex = (currentNoteIndex + 1) % navbarNotes.length
    }, 300)
}

function startNavbarNotesRotation() {
    notesTimer = setInterval(updateNavbarNote, notesDelay)
}

// Start rotation on page load
startNavbarNotesRotation();









