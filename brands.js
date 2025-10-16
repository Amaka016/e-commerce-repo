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

let searchInput = document.querySelector('.search input')
searchInput.addEventListener('keyup', filterItem)


function filterItem() {
    let searched = searchInput.value.toUpperCase()
    let brandName = document.querySelectorAll('.brand')
    for(let i = 0; i < brandName.length; i++) {
        let name = brandName[i].textContent || brandName[i].innerText
        if (name.toUpperCase().indexOf(searched) > -1 ){
            brandName[i].style.display = ''
        } else {
            brandName[i].style.display = 'none'
        }
    }
}