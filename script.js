// --- 1. Draggable Windows Logic ---
let isDragging = false;
let currentWindow = null;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

const titleBars = document.querySelectorAll('.title-bar');

titleBars.forEach(bar => {
    bar.addEventListener('mousedown', dragStart);
});

document.addEventListener('mouseup', dragEnd);
document.addEventListener('mousemove', drag);

function dragStart(e) {
    initialX = e.clientX;
    initialY = e.clientY;
    currentWindow = e.target.parentElement;
    
    // Get current transform values if any
    const style = window.getComputedStyle(currentWindow);
    const matrix = new WebKitCSSMatrix(style.transform);
    xOffset = matrix.m41;
    yOffset = matrix.m42;

    if (e.target.classList.contains('title-bar')) {
        isDragging = true;
        // Bring to front
        document.querySelectorAll('.window').forEach(w => w.style.zIndex = 10);
        currentWindow.style.zIndex = 20;
    }
}

function dragEnd() {
    initialX = currentWindow ? currentWindow.offsetLeft : 0;
    initialY = currentWindow ? currentWindow.offsetTop : 0;
    isDragging = false;
    currentWindow = null;
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        
        const currentX = e.clientX - initialX;
        const currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, currentWindow);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate(${xPos}px, ${yPos}px)`;
}

// --- 2. Text Scrambler Effect ---
const scrambleElements = document.querySelectorAll('.scramble');
const chars = '!<>-_\\/[]{}—=+*^?#________';

scrambleElements.forEach(el => {
    const originalText = el.innerText;
    el.addEventListener('mouseover', () => {
        let iterations = 0;
        const interval = setInterval(() => {
            el.innerText = el.innerText
                .split('')
                .map((letter, index) => {
                    if(index < iterations) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)]
                })
                .join('');
            
            if(iterations >= originalText.length) {
                clearInterval(interval);
            }
            
            iterations += 1 / 3;
        }, 30);
    });
});

// --- 3. Random "Shock" Glitch ---
// Occasionally flickers the entire screen's colors
setInterval(() => {
    const body = document.body;
    body.style.filter = 'invert(1)';
    setTimeout(() => {
        body.style.filter = 'invert(0)';
    }, 100); // Quick 100ms flash
}, Math.random() * 10000 + 5000); // Happens randomly between 5 and 15 seconds
