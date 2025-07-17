// Map button text to image IDs (fill out for all buttons)
const buttonImageMap = {
    // Archetype buttons 
    "All-rounder": ["img15", "img16", "img25", "img9", "img32", "img10", "img19", "img3", "img30"],
    "Zone Control": ["img18","img33","img29","img23","img12","img8","img11"],
    "Rushdown": ["img17","img7","img1","img28","img6","img26","img22","img27"],
    "Big Body": ["img2","img13"],
    "Unorthodox": ["img24","img31","img14","img5","img4","img35","img34","img36","img20","img21"],
    // Desired Tools buttons 
    "5f c.L": ["img1","img3","img4","img6","img7","img8","img9","img10","img12","img14","img15","img16","img17","img19","img22","img24","img25","img26","img27","img28","img29","img30","img31","img32","img33","img34","img35"],
    "Meterless Reversal": ["img3","img9","img10","img14","img15","img16","img17","img19","img25","img26","img27","img30","img32","img33","img35"],
    "Non-Launching/Crumple Specials": ["img1","img3","img4","img5","img6","img7","img9","img11","img12","img13","img14","img15","img16","img17","img19","img20","img22","img23","img25","img26","img28","img29","img31","img32","img33","img34","img35","img36"],
    "Long Range Pokes": ["img1","img2","img4","img5","img8","img9","img10","img11","img14","img18","img20","img21","img22","img23","img25","img27","img30","img33","img34","img36"],
    "Command Grab": ["img2","img3","img9","img10","img13","img21","img26","img32","img33","img35"]
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

// Utility: Get all image IDs (img1-img36)
function getAllImageIds() {
    const ids = [];
    for (let i = 1; i <= 36; i++) {
        ids.push(`img${i}`);
    }
    return ids;
}

// Utility: Intersection of multiple arrays
function intersectArrays(arrays) {
    if (arrays.length === 0) return [];
    return arrays.reduce((acc, curr) => acc.filter(x => curr.includes(x)));
}

// --- Archetype Buttons: Exclusive selection ---
const archetypeRow = document.querySelectorAll('.button-row')[0]; // First button-row (archetypes)
const archetypeButtons = archetypeRow.querySelectorAll('button');
let activeArchetype = null;
let activeArchetypeName = null; // <-- ADD THIS

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
            activeArchetypeName = null; // <-- FIXED
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
            activeArchetypeName = btnText; // <-- FIXED
        }
        // Also update Desired Tools display in case archetype changes
        updateDesiredToolsImages();
    });
});

// --- Desired Tools Buttons: Multi-selection AND logic ---
const desiredToolsRow = document.querySelectorAll('.button-row')[1];
const desiredToolsButtons = desiredToolsRow.querySelectorAll('button');

// Main handler for Desired Tools button logic
function updateDesiredToolsImages() {
    // Get all active tool buttons
    const activeButtons = Array.from(desiredToolsButtons).filter(btn => btn.classList.contains('active-button'));
    let visibleImages = [];

    if (activeButtons.length === 0) {
        // No buttons active, greyscale all
        setGreyscaleForImages(getAllImageIds(), true);
        // If archetype is active, ungreyscale its images
        if (activeArchetypeName && buttonImageMap[activeArchetypeName]) {
            setGreyscaleForImages(buttonImageMap[activeArchetypeName], false);
        }
        return;
    }

    // Get the image sets for each active tool
    const selectedImageSets = activeButtons.map(btn => {
        const btnText = btn.textContent.trim();
        return buttonImageMap[btnText] || [];
    });

    if (activeArchetypeName && buttonImageMap[activeArchetypeName]) {
        // Only consider images in the selected archetype
        // Get intersection of archetype images and desired tools intersection
        const archetypeImgs = buttonImageMap[activeArchetypeName];
        visibleImages = intersectArrays([archetypeImgs, ...selectedImageSets]);
    } else {
        // No archetype selected: show intersection of all desired tools
        visibleImages = intersectArrays(selectedImageSets);
    }

    // Greyscale all, then ungreyscale only visible
    setGreyscaleForImages(getAllImageIds(), true);
    setGreyscaleForImages(visibleImages, false);
}

// Attach toggle logic to Desired Tools buttons
desiredToolsButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active-button');
        updateDesiredToolsImages();
    });
});