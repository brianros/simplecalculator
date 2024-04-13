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
let savedInput = []
let curatedInput = []
let screenUpperLine = document.createElement('div')
screenUpperLine.classList.add('screenUpperLine')
screen.appendChild(screenUpperLine)


function sanityCheck(button) {
    if  (!isNaN(parseInt(button))) {
        curatedInput.push(button)}

    switch (button) {
        case 'DEL':
            curatedInput.splice(-1);
            break;
        case 'AC':
            curatedInput = [];
            break;
        case '=':
            calculateResult(savedInput);
            break;
    }
     
    screenUpperLine.textContent = curatedInput.join(' ')
    console.log(curatedInput)
    console.log(button)
}



function takeInput (node) {
    
        savedInput.push(node.innerText)
        sanityCheck(node.innerText)
        ;
    }
    
function calculateResult () {
    console.log('not ready')
    
}
populateKeys(keypad)


