document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.mainContainer');
    let isDragging = false;
    let offset = { x: 0, y: 0 };

    mainContainer.addEventListener('mousedown', (event) => {
        isDragging = true;
        const rect = mainContainer.getBoundingClientRect();
        offset = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const x = event.clientX - offset.x;
            const y = event.clientY - offset.y;
            const maxX = window.innerWidth - mainContainer.offsetWidth;
            const maxY = window.innerHeight - mainContainer.offsetHeight;

            mainContainer.style.left = `${Math.min(Math.max(x, 0), maxX)}px`;
            mainContainer.style.top = `${Math.min(Math.max(y, 0), maxY - 100)}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});


/* here starts the logic */

const keypad = document.querySelectorAll('.buttons')

function populateKeys(node) {
    let symbols = ['(',')','AC','/','7','8','9','X','4','5','6','-','1','2','3','+','0','.','DEL','=']
    for (let i = 0; i < node.length && i < symbols.length; i++) {
        node[i].textContent = symbols[i];
        node[i].setAttribute("id",symbols[i])
        node[i].addEventListener('click',  () => takeInput(node[i])
    
    ); 
        
}
}

const screen = document.querySelector('.screen');
/* 
function createPixels() {
    for (let i = 1; i <= 20; i++) {
        const pixel = document.createElement('div');
        pixel.textContent = i;
        pixel.classList.add('inputPixel');
        pixel.classList.add('pixels');
        pixel.style.gridArea = `${Math.ceil(i / 10)}/${(i - 1) % 10 + 1}`; // Calculate grid area dynamically
        screen.appendChild(pixel);
    }
}

createPixels();
 */
let savedInput = []
let currentInput = ''
let screenUpperLine = document.createElement('div')
screenUpperLine.classList.add('screenUpperLine')
screen.appendChild(screenUpperLine)

function takeInput (node) {
    if (!isNaN(node.innerText) || node.innerText === '+' || node.innerText === '-' || node.innerText === 'X' || node.innerText === '/' || node.innerText === '(' || node.innerText === ')' || node.innerText === '.' ) {
        savedInput.push(node.innerText)
        screenUpperLine.textContent = savedInput.join(' ');
    }
    else
        switch (node.innerText){
        case 'DEL' : savedInput.splice(-1,1)
        screenUpperLine.textContent = savedInput.join(' ');
        case 'AC' : savedInput = []
        screenUpperLine.textContent = savedInput.join(' ');
        case '=' : calculateResult(savedInput)
        break;
    }   
    
    console.log(savedInput)
}
function calculateResult () {
    console.log('not ready')
    
}
populateKeys(keypad)


