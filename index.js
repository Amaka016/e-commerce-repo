let nextButton = document.getElementById('nxt-btn')
nextButton.addEventListener('click', moveToNext)

let prevButton =  document.getElementById('prev-btn')
prevButton.addEventListener('click', moveToPrev)

let slides = document.querySelectorAll('img.slide')
let slide2 = document.querySelectorAll('.slide2')

let secPrevBtn = document.getElementById('slide2-prev-btn')
let secNxtBtn = document.getElementById('slide2-nxt-btn')

var autoPlayTimer = null
var autoPlayDelay = 3000

let currentSlide = 0

//first slide buttons
function moveToNext() {
    slides[currentSlide].classList.remove('active')
    currentSlide = (currentSlide + 1) % slides.length
    slides[currentSlide].classList.add('active')
    
}

function moveToPrev() {
    slides[currentSlide].classList.remove('active')
    currentSlide = (currentSlide - 1 + slides.length) % slides.length
    slides[currentSlide].classList.add('active')
}

//second slide buttons
secNxtBtn.addEventListener('click', toNext)
function toNext() {
   slide2[currentSlide].classList.remove('active-now')
   currentSlide = (currentSlide + 1) % slide2.length
   slide2[currentSlide].classList.add('active-now')
}

secPrevBtn.addEventListener('click', toPrev)
function toPrev() {
    slide2[currentSlide].classList.remove('active-now')
    currentSlide = (currentSlide - 1 + slide2.length) % slide2.length
    slide2[currentSlide].classList.add('active-now')
}

  document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.getElementById('slidesContainer');
    const prevButton = document.querySelector('.previous');
    const nextButton = document.querySelector('.next');

    // Calculate scroll amount based on first card width + gap
    const slideItem = slidesContainer.querySelector('.slide-item');
    const slideWidth = slideItem.offsetWidth + 23; // 2em gap ≈ 32px

    nextButton.addEventListener('click', () => {
      slidesContainer.scrollBy({ left: slideWidth * 1, behavior: 'smooth' });
    });

    prevButton.addEventListener('click', () => {
      slidesContainer.scrollBy({ left: -slideWidth * 1, behavior: 'smooth' });
    });
  });



  //rotating promotional messages
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

// let listOfItems = document.querySelectorAll('.img-grid');
// let slideItems = document.querySelectorAll('.slide-item'); // Add slide items
// let searchInput = document.querySelector('.search input');

// // Combine both lists into one array
// let allProducts = [...listOfItems, ...slideItems];

// // Create overlay backdrop
// let overlay = document.createElement('div');
// overlay.className = 'search-overlay';
// overlay.style.cssText = `
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100vw;
//     height: 100vh;
//     background-color: rgba(0, 0, 0, 0.9);
//     z-index: 9999;
//     display: none;
//     align-items: center;
//     justify-content: center;
//     padding: 1em;
// `;

// // Create modal box (95% of screen)
// let modal = document.createElement('div');
// modal.style.cssText = `
//     background-color: white;
//     border-radius: 15px;
//     padding: 2em;
//     width: 95%;
//     height: 95%;
//     box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
//     position: relative;
//     display: flex;
//     flex-direction: column;
// `;

// // Close button
// let closeBtn = document.createElement('button');
// closeBtn.textContent = 'Close';
// closeBtn.style.cssText = `
//     position: absolute;
//     top: 1.5em;
//     right: 1.5em;
//     background-color: orange;
//     color: white;
//     border: none;
//     padding: 0.8em 2.5em;
//     border-radius: 8px;
//     cursor: pointer;
//     font-size: 1.2em;
//     font-weight: bold;
//     transition: all 0.3s ease;
//     z-index: 10;
// `;

// closeBtn.addEventListener('mouseenter', function() {
//     this.style.backgroundColor = 'white';
//     this.style.color = 'orange';
//     this.style.border = '2px solid orange';
// });

// closeBtn.addEventListener('mouseleave', function() {
//     this.style.backgroundColor = 'orange';
//     this.style.color = 'white';
//     this.style.border = 'none';
// });

// // Title
// let title = document.createElement('h2');
// title.textContent = 'Search Products';
// title.style.cssText = `
//     margin: 0 0 1em 0;
//     font-size: 2.5em;
//     color: black;
//     font-weight: bolder;
// `;

// // Search input in modal
// let modalSearchInput = document.createElement('input');
// modalSearchInput.type = 'text';
// modalSearchInput.placeholder = 'Search for products...';
// modalSearchInput.style.cssText = `
//     width: 100%;
//     padding: 1.2em;
//     font-size: 1.3em;
//     border: 2px solid black;
//     border-radius: 10px;
//     margin-bottom: 2em;
//     outline: none;
//     transition: border-color 0.3s ease;
// `;

// modalSearchInput.addEventListener('focus', function() {
//     this.style.borderColor = 'orange';
// });

// modalSearchInput.addEventListener('blur', function() {
//     this.style.borderColor = 'black';
// });

// // Results container
// let resultsContainer = document.createElement('div');
// resultsContainer.className = 'search-results';
// resultsContainer.style.cssText = `
//     flex: 1;
//     overflow-y: auto;
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//     gap: 2em;
//     padding: 1em 0;
// `;

// // Append everything
// modal.appendChild(closeBtn);
// modal.appendChild(title);
// modal.appendChild(modalSearchInput);
// modal.appendChild(resultsContainer);
// overlay.appendChild(modal);
// document.body.appendChild(overlay);

// // Show modal when clicking search input
// searchInput.addEventListener('click', function(e) {
//     e.preventDefault();
//     overlay.style.display = 'flex';
//     modalSearchInput.focus();
//     showAllProducts();
// });

// // Close modal
// closeBtn.addEventListener('click', function() {
//     overlay.style.display = 'none';
//     modalSearchInput.value = '';
// });

// // Close on ESC key
// document.addEventListener('keydown', function(e) {
//     if (e.key === 'Escape') {
//         overlay.style.display = 'none';
//         modalSearchInput.value = '';
//     }
// });

// // Close when clicking outside modal
// overlay.addEventListener('click', function(e) {
//     if (e.target === overlay) {
//         overlay.style.display = 'none';
//         modalSearchInput.value = '';
//     }
// });

// // Filter as user types
// modalSearchInput.addEventListener('input', function() {
//     let searchTerm = this.value.toLowerCase().trim();
    
//     if (searchTerm === '') {
//         showAllProducts();
//     } else {
//         filterAndShow(searchTerm);
//     }
// });

// // Show all products (both img-grid and slide-item)
// function showAllProducts() {
//     resultsContainer.innerHTML = '';
    
//     allProducts.forEach(item => {
//         let productCard = createProductCard(item);
//         resultsContainer.appendChild(productCard);
//     });
// }

// // Filter and show matching products
// function filterAndShow(searchTerm) {
//     resultsContainer.innerHTML = '';
//     let matches = 0;
    
//     allProducts.forEach(item => {
//         let productText = item.textContent.toLowerCase();
        
//         if (productText.includes(searchTerm)) {
//             matches++;
//             let productCard = createProductCard(item);
//             resultsContainer.appendChild(productCard);
//         }
//     });
    
//     if (matches === 0) {
//         resultsContainer.style.display = 'flex';
//         resultsContainer.style.alignItems = 'center';
//         resultsContainer.style.justifyContent = 'center';
//         resultsContainer.innerHTML = `
//             <div style="
//                 text-align: center;
//                 padding: 4em;
//                 color: #666;
//                 font-size: 1.8em;
//             ">
//                 No products found for "${searchTerm}"
//             </div>
//         `;
//     } else {
//         resultsContainer.style.display = 'grid';
//     }
// }

// // Create product card (works for both img-grid and slide-item)
// function createProductCard(item) {
//     let img = item.querySelector('img');
    
//     // Get the product name from the <p> tag text content
//     let pTag = item.querySelector('p');
//     let fullText = pTag ? pTag.textContent : '';
    
//     // Extract product name (remove "New Arrival" and price parts)
//     let productName = fullText
//         .replace('New Arrival', '')
//         .replace(/N[\d,]+/g, '') // Remove price
//         .trim();
    
//     // Get price
//     let priceElement = item.querySelector('.orange');
//     let productPrice = priceElement ? priceElement.textContent : '';
    
//     let card = document.createElement('div');
//     card.style.cssText = `
//         background: white;
//         border: 2px solid black;
//         border-radius: 12px;
//         padding: 1.2em;
//         cursor: pointer;
//         transition: all 0.3s ease;
//         text-align: center;
//         display: flex;
//         flex-direction: column;
//     `;
    
//     card.innerHTML = `
//         <img src="${img.src}" alt="${img.alt}" style="
//             width: 100%;
//             height: 180px;
//             object-fit: cover;
//             border-radius: 10px;
//             margin-bottom: 1em;
//         ">
//         <h5 style="
//             margin: 0.5em 0;
//             font-size: 1.1em;
//             flex: 1;
//             min-height: 3em;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//         ">${productName}</h5>
//         <p style="
//             color: orange;
//             font-weight: bold;
//             font-size: 1.3em;
//             margin: 0.5em 0 0 0;
//         ">${productPrice}</p>
//     `;
    
//     card.addEventListener('mouseenter', function() {
//         this.style.transform = 'translateY(-10px)';
//         this.style.borderColor = 'orange';
//         this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
//     });
    
//     card.addEventListener('mouseleave', function() {
//         this.style.transform = 'translateY(0)';
//         this.style.borderColor = 'black';
//         this.style.boxShadow = 'none';
//     });
    
//     card.addEventListener('click', function() {
//         overlay.style.display = 'none';
//         modalSearchInput.value = '';
//         item.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     });
    
//     return card;
// }

// // Make responsive for mobile
// let mediaQuery = window.matchMedia('(max-width: 767px)');

// function handleResponsive(e) {
//     if (e.matches) {
//         // Mobile: full screen with less padding
//         modal.style.width = '100%';
//         modal.style.height = '100%';
//         modal.style.padding = '1em';
//         modal.style.borderRadius = '0';
//         title.style.fontSize = '1.8em';
//         modalSearchInput.style.fontSize = '1.1em';
//         resultsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
//         resultsContainer.style.gap = '1em';
//         closeBtn.style.padding = '0.6em 1.5em';
//         closeBtn.style.fontSize = '1em';
//     } else {
//         // Desktop: 95% with rounded corners
//         modal.style.width = '95%';
//         modal.style.height = '95%';
//         modal.style.padding = '2em';
//         modal.style.borderRadius = '15px';
//         title.style.fontSize = '2.5em';
//         modalSearchInput.style.fontSize = '1.3em';
//         resultsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
//         resultsContainer.style.gap = '2em';
//         closeBtn.style.padding = '0.8em 2.5em';
//         closeBtn.style.fontSize = '1.2em';
//     }
// }

// mediaQuery.addListener(handleResponsive);
// handleResponsive(mediaQuery);// Make responsive for mobile
// searchInput.addEventListener('keyup', filterItem)

// function filterItem() {
//   let searched = searchInput.value.toUpperCase()
//   let grid = document.querySelectorAll('.img-grid')
//   let slide = document.querySelectorAll('.slide-item')

//   for(let i = 0; i < grid.length; i++) {
//    let textContent = grid[i].textContent || grid[i].innerText
//    if (textContent.toUpperCase().indexOf(searched) > - 1) {
//     grid[i].style.display = ''
//    } else { 
//     grid[i].style.display = 'none'
//    }
//   }

//   for(let i = 0; i < slide.length; i++) {
//     let textContent = slide[i].innerHTML || slide[i].textContent
//     if(textContent.toUpperCase().indexOf(searched) > - 1) {
//       slide[i].style.display = ''
//     } else {
//       slide[i].style.display = 'none'
//     }
//   }
// }

// function createProductCard(item) {
//     let img = item.querySelector('img');
//     let productName = item.querySelector('h5')?.textContent || 'Product';
//     let productPrice = item.querySelector('.orange')?.textContent || '';
    
//     let card = document.createElement('div');
//     card.style.cssText = `
//         background: white;
//         border: 2px solid black;
//         border-radius: 12px;
//         padding: 1.2em;
//         cursor: pointer;
//         transition: all 0.3s ease;
//         text-align: center;
//         display: flex;
//         flex-direction: column;
//     `;
    
//     card.innerHTML = `
//         <img src="${img.src}" alt="${img.alt}" style="
//             width: 100%;
//             height: 180px;
//             object-fit: cover;
//             border-radius: 10px;
//             margin-bottom: 1em;
//         ">
//         <h5 style="
//             margin: 0.5em 0;
//             font-size: 1.1em;
//             flex: 1;
//         ">${productName}</h5>
//         <p style="
//             color: orange;
//             font-weight: bold;
//             font-size: 1.3em;
//             margin: 0.5em 0 0 0;
//         ">${productPrice}</p>
//     `;
    
//     card.addEventListener('mouseenter', function() {
//         this.style.transform = 'translateY(-10px)';
//         this.style.borderColor = 'orange';
//         this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
//     });
    
//     card.addEventListener('mouseleave', function() {
//         this.style.transform = 'translateY(0)';
//         this.style.borderColor = 'black';
//         this.style.boxShadow = 'none';
//     });
    
//     card.addEventListener('click', function() {
//         overlay.style.display = 'none';
//         modalSearchInput.value = '';
//         item.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     });
    
//     return card;
// }

// Get products from current page
let listOfItems = document.querySelectorAll('.img-grid');
let slideItems = document.querySelectorAll('.slide-item');
let allProducts = [...listOfItems, ...slideItems];

let searchInput = document.querySelector('.search input');

// Track if we've already loaded external products
let externalProductsLoaded = false;

// Function to load products from another HTML file
async function loadProductsFromFile(filename) {
    try {
        const response = await fetch(filename);
        const html = await response.text();
        
        // Create a temporary container to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Get products from the other file
        const externalImgGrid = Array.from(tempDiv.querySelectorAll('.product-content-cover'));
        const externalSlideItems = Array.from(tempDiv.querySelectorAll('.slide-item'));
        
        // Add them to allProducts array
        allProducts = [...allProducts, ...externalImgGrid, ...externalSlideItems];
        
        console.log(`Loaded ${externalImgGrid.length + externalSlideItems.length} products from ${filename}`);
        console.log(`Total products: ${allProducts.length}`);
    } catch (error) {
        console.error(`Error loading products from "${filename}":`, error);
    }
}

// Load products from multiple files
async function loadAllExternalProducts() {
    if (externalProductsLoaded) return; // Don't load twice
    
    // Add the filenames you want to load
    await loadProductsFromFile('shop.html');
    
    externalProductsLoaded = true;
}

// Create overlay backdrop
let overlay = document.createElement('div');
overlay.className = 'search-overlay';
overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 9999;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 1em;
`;

// Create modal box (95% of screen)
let modal = document.createElement('div');
modal.style.cssText = `
    background-color: white;
    border-radius: 15px;
    padding: 2em;
    width: 95%;
    height: 95%;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
    position: relative;
    display: flex;
    flex-direction: column;
`;

// Close button
let closeBtn = document.createElement('button');
closeBtn.textContent = 'Close';
closeBtn.style.cssText = `
    position: absolute;
    top: 1.5em;
    right: 1.5em;
    background-color: orange;
    color: white;
    border: none;
    padding: 0.8em 2.5em;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: bold;
    transition: all 0.3s ease;
    z-index: 10;
`;

closeBtn.addEventListener('mouseenter', function() {
    this.style.backgroundColor = 'white';
    this.style.color = 'orange';
    this.style.border = '2px solid orange';
});

closeBtn.addEventListener('mouseleave', function() {
    this.style.backgroundColor = 'orange';
    this.style.color = 'white';
    this.style.border = 'none';
});

// Title
let title = document.createElement('h2');
title.textContent = 'Search Products';
title.style.cssText = `
    margin: 0 0 1em 0;
    font-size: 2.5em;
    color: black;
    font-weight: bolder;
`;

// Loading indicator
let loadingIndicator = document.createElement('div');
loadingIndicator.textContent = 'Loading products...';
loadingIndicator.style.cssText = `
    text-align: center;
    padding: 2em;
    font-size: 1.2em;
    color: #666;
    display: none;
`;

// Search input in modal
let modalSearchInput = document.createElement('input');
modalSearchInput.type = 'text';
modalSearchInput.placeholder = 'Search for products...';
modalSearchInput.style.cssText = `
    width: 100%;
    padding: 1.2em;
    font-size: 1.3em;
    border: 2px solid black;
    border-radius: 10px;
    margin-bottom: 2em;
    outline: none;
    transition: border-color 0.3s ease;
`;

modalSearchInput.addEventListener('focus', function() {
    this.style.borderColor = 'orange';
});

modalSearchInput.addEventListener('blur', function() {
    this.style.borderColor = 'black';
});

// Results container
let resultsContainer = document.createElement('div');
resultsContainer.className = 'search-results';
resultsContainer.style.cssText = `
    flex: 1;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2em;
    padding: 1em 0;
`;

// Append everything
modal.appendChild(closeBtn);
modal.appendChild(title);
modal.appendChild(loadingIndicator);
modal.appendChild(modalSearchInput);
modal.appendChild(resultsContainer);
overlay.appendChild(modal);
document.body.appendChild(overlay);

// Show modal when clicking search input
searchInput.addEventListener('click', async function(e) {
    e.preventDefault();
    overlay.style.display = 'flex';
    modalSearchInput.focus();
    
    // Show loading indicator
    if (!externalProductsLoaded) {
        loadingIndicator.style.display = 'block';
        resultsContainer.style.display = 'none';
        
        // Load external products
        await loadAllExternalProducts();
        
        // Hide loading indicator
        loadingIndicator.style.display = 'none';
        resultsContainer.style.display = 'grid';
    }
    
    showAllProducts();
});

// Close modal
closeBtn.addEventListener('click', function() {
    overlay.style.display = 'none';
    modalSearchInput.value = '';
});

// Close on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        overlay.style.display = 'none';
        modalSearchInput.value = '';
    }
});

// Close when clicking outside modal
overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
        overlay.style.display = 'none';
        modalSearchInput.value = '';
    }
});

// Filter as user types
modalSearchInput.addEventListener('input', function() {
    let searchTerm = this.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        showAllProducts();
    } else {
        filterAndShow(searchTerm);
    }
});

// Show all products
function showAllProducts() {
    resultsContainer.innerHTML = '';
    
    allProducts.forEach(item => {
        let productCard = createProductCard(item);
        resultsContainer.appendChild(productCard);
    });
}

// Filter and show matching products
function filterAndShow(searchTerm) {
    resultsContainer.innerHTML = '';
    let matches = 0;
    
    allProducts.forEach(item => {
        let productText = item.textContent.toLowerCase();
        
        if (productText.includes(searchTerm)) {
            matches++;
            let productCard = createProductCard(item);
            resultsContainer.appendChild(productCard);
        }
    });
    
    if (matches === 0) {
        resultsContainer.style.display = 'flex';
        resultsContainer.style.alignItems = 'center';
        resultsContainer.style.justifyContent = 'center';
        resultsContainer.innerHTML = `
            <div style="
                text-align: center;
                padding: 4em;
                color: #666;
                font-size: 1.8em;
            ">
                No products found for "${searchTerm}"
            </div>
        `;
    } else {
        resultsContainer.style.display = 'grid';
    }
}

//Create product card
function createProductCard(item) {
    let img = item.querySelector('img');
    
    // FIX: broader selector to find product name in more cases
    let pTag = item.querySelector('p, h3, h5, .product-name');
    let fullText = pTag ? pTag.textContent : '';
    
    // Extract product name (remove "New Arrival" and price parts)
    let productName = fullText
        .replace('New Arrival', '')
        .replace(/N[\d,]+|₦[\d,]+/g, '') 
        .trim();
    
    // broader selector for price (in case .orange is missing)
    let priceElement = item.querySelector('.orange, .price, .product-price, span');
    let productPrice = priceElement ? priceElement.textContent.trim() : '';
    
    let card = document.createElement('a');
    card.href = 'cart.html';
    card.style.cssText = `
        background: white;
        border: 2px solid black;
        border-radius: 12px;
        padding: 1.2em;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-decoration: none;
        color: black
    `;

    // Add content with Add to Cart button
    card.innerHTML = `
        <img src="${img?.src || ''}" alt="${img?.alt || 'Product Image'}" style="
            width: 100%;
            height: 180px;
            object-fit: contain;
            border-radius: 10px;
            margin-bottom: 1em;
        ">
        <h5 style="
            margin: 0.5em 0;
            font-size: 1.1em;
            font-weight: bold;
            flex: 1;
            min-height: 3em;
            display: flex;
            align-items: center;
            justify-content: center;
        ">${productName}</h5>
        <p style="
            color: orange;
            font-weight: bold;
            font-size: 1.3em;
            margin: 0.5em 0;
        ">${productPrice}</p>
        <button class="add-to-cart-btn" style="
            background-color: orange;
            color: white;
            border: none;
            padding: 0.4em 1.5em;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 0.5em;
        ">Add to Cart</button>
    `;

    // Hover effects
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.borderColor = 'orange';
        this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.borderColor = 'black';
        this.style.boxShadow = 'none';
    });

    // Add to Cart click (prevent overlay close)
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        // FIX: lead to cart page instead of alert
        window.location.href = 'cart.html';
    });

    // Clicking outside button scrolls to original item
    card.addEventListener('click', function() {
        overlay.style.display = 'none';
        modalSearchInput.value = '';
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    return card;
}

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
                
                // Get product name
                let productName = 'Product';
                const pElement = productCard.querySelector('p');
                if (pElement) {
                    let textContent = pElement.textContent || pElement.innerText;
                    let lines = textContent.split(/\r?\n/).filter(line => line.trim());
                    
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

// Make responsive for mobile
let mediaQuery = window.matchMedia('(max-width: 767px)');

function handleResponsive(e) {
    if (e.matches) {
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.padding = '1em';
        modal.style.borderRadius = '0';
        title.style.fontSize = '1.8em';
        modalSearchInput.style.fontSize = '1.1em';
        resultsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
        resultsContainer.style.gap = '1em';
        closeBtn.style.padding = '0.6em 1.5em';
        closeBtn.style.fontSize = '1em';
    } else {
        modal.style.width = '95%';
        modal.style.height = '95%';
        modal.style.padding = '2em';
        modal.style.borderRadius = '15px';
        title.style.fontSize = '2.5em';
        modalSearchInput.style.fontSize = '1.3em';
        resultsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
        resultsContainer.style.gap = '2em';
        closeBtn.style.padding = '0.8em 2.5em';
        closeBtn.style.fontSize = '1.2em';
    }
}

mediaQuery.addListener(handleResponsive);
handleResponsive(mediaQuery);
