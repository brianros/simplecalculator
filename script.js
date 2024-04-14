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
    let symbols = ['AC','DEL','7','8','9','X','4','5','6','-','1','2','3','+','0','.','/','=']
    for (let i = 0; i < node.length && i < symbols.length; i++) {
        node[i].textContent = symbols[i];
        node[i].setAttribute("id",symbols[i])
        node[i].addEventListener('click', () => takeInput(node[i].textContent));
    }
}

const screen = document.querySelector('.screen');
let savedInput = []
let operands = ['', ''] // Initialize operands array with two empty strings
let operator = ''
let index = 0
let screenUpperLine = document.createElement('div')
screenUpperLine.classList.add('screenUpperLine')
screen.appendChild(screenUpperLine)

/* this function passes the user input */
function takeInput(key) {
    savedInput.push(key)
    sanityCheck(key)
}

populateKeys(keypad)
