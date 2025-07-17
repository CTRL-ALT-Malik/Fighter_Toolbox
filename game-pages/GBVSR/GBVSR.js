// Map button text to image IDs (fill out for all buttons)
const buttonImageMap = {
    // Archetype buttons
    "All-rounder": ["img15", "img16", "img25", "img9", "img32", "img10", "img19", "img3", "img30"],
    "Zoner": ["img18","img33","img29","img23","img12","img8","img11"],
    "Rushdown": ["img17","img7","img1","img28","img6","img26","img22","img27"],
    "Big Body": ["img2","img13"],
    "Unorthodox": ["img24","img31","img14","img5","img4","img35","img34","img36","img20"],
    // Desired Tools buttons
    "5f c.L": [],
    "Plus On Block Normal": [],
    "Decent Anti-Air Option": [],
    "Non-Launching/Crumple Specials": [],
    "Low Recovery f.H": [],
    "Throw Bait Option": []
};

// Helper to set greyscale for a set of images
function setGreyscaleForImages(imageIds, greyscaleOn) {
    imageIds.forEach(id => {
        const img = document.getElementById(id);
        if (img) {
            if (greyscaleOn) {
                img.classList.add('greyed-out');
            } else {
                img.classList.remove('greyed-out');
            }
        }
    });
}

// --- Archetype Buttons: Exclusive selection ---
const archetypeRow = document.querySelectorAll('.button-row')[0]; // First button-row (archetypes)
const archetypeButtons = archetypeRow.querySelectorAll('button');
let activeArchetype = null;

archetypeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const btnText = button.textContent.trim();
        const imageIds = buttonImageMap[btnText];
        if (!imageIds) return;

        const isActive = button.classList.contains('active-button');

        if (isActive) {
            // Toggle OFF: Remove active style, set images back to greyscale
            button.classList.remove('active-button');
            setGreyscaleForImages(imageIds, true);
            activeArchetype = null;
        } else {
            // If another archetype is active, disable its images
            if (activeArchetype && activeArchetype !== button) {
                const prevBtnText = activeArchetype.textContent.trim();
                const prevImageIds = buttonImageMap[prevBtnText];
                if (prevImageIds) setGreyscaleForImages(prevImageIds, true);
                activeArchetype.classList.remove('active-button');
            }
            // Toggle ON: style this button, set images to color
            button.classList.add('active-button');
            setGreyscaleForImages(imageIds, false);
            activeArchetype = button;
        }
    });
});