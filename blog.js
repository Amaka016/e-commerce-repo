document.addEventListener("DOMContentLoaded", () => {
  // Grab elements
  const form = document.querySelector(".search-container form");
  const input = document.querySelector(".search-container input");
  const grid  = document.querySelector(".blog__grid");
  if (!form || !input || !grid) return;

  const cards = Array.from(grid.querySelectorAll(".card"));

  // Create the "no match" message element
  const noMatch = document.createElement("div");
  noMatch.className = "no-results";
  noMatch.textContent = "No blog posts match your search.";
  noMatch.style.display = "none";
  grid.after(noMatch);

  // Debounce utility (prevents lag)
  const debounce = (fn, delay = 150) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  // Filter function
  const filterCards = (query) => {
    const term = query.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
      const title   = card.querySelector(".card__title")?.textContent.toLowerCase() || "";
      const excerpt = card.querySelector(".card__excerpt")?.textContent.toLowerCase() || "";
      const badge   = card.querySelector(".badge")?.textContent.toLowerCase() || "";
      const tags    = card.dataset.tags?.toLowerCase() || "";

      const match = term === "" || 
        title.includes(term) || excerpt.includes(term) || badge.includes(term) || tags.includes(term);

      card.style.display = match ? "" : "none";
      if (match) visibleCount++;
    });

    // Show message if nothing found
    noMatch.style.display = visibleCount === 0 ? "block" : "none";
  };

  // Prevent form reload
  form.addEventListener("submit", e => e.preventDefault());

  // Live filtering
  input.addEventListener("input", debounce(() => {
    filterCards(input.value);
  }, 160));

  // Initial: show all
  filterCards("");
});


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
startNavbarNotesRotation()
