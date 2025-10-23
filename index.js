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
    const slideWidth = slideItem.offsetWidth + 32; // 2em gap ≈ 32px

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


//filtering search
let searchInput = document.querySelector('.search input')
searchInput.addEventListener('keyup', filterItem)

function filterItem() {
  let searched = searchInput.value.toUpperCase()
  let grid = document.querySelectorAll('.img-grid')
  let slide = document.querySelectorAll('.slide-item')

  for(let i = 0; i < grid.length; i++) {
   let textContent = grid[i].textContent || grid[i].innerText
   if (textContent.toUpperCase().indexOf(searched) > - 1) {
    grid[i].style.display = ''
   } else { 
    grid[i].style.display = 'none'
   }
  }

  for(let i = 0; i < slide.length; i++) {
    let textContent = slide[i].innerHTML || slide[i].textContent
    if(textContent.toUpperCase().indexOf(searched) > - 1) {
      slide[i].style.display = ''
    } else {
      slide[i].style.display = 'none'
    }
  }
}

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
