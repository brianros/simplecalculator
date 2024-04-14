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
    let symbols = ['AC','DEL','7','8','9','X','4','5','6','-','1','2','3','+','0','.','=','/']
    for (let i = 0; i < node.length && i < symbols.length; i++) {
        node[i].textContent = symbols[i];
        node[i].setAttribute("id",symbols[i])
        node[i].addEventListener('click', () => parseInput(node[i].textContent));
    }
}

const screen = document.querySelector('.screen');
let savedInput = [[],[]]
let screenUpperLine = document.createElement('div')
let screenLowerLine = document.createElement('div')
screenUpperLine.classList.add('screenUpperLine')
screenLowerLine.classList.add('screenLowerLine')
screen.appendChild(screenUpperLine)
screen.appendChild(screenLowerLine)
let displayInput = []
let index = 0
let operator = ''
let lastCalculation = ['','','','']
function screenLog(upperLine, lowerLine) {
    screenUpperLine.innerText=upperLine
    screenLowerLine.innerText=lowerLine
}

function parseInput (input) {
    switch (input) {
        case 'DEL': 
        if (savedInput[1].length > 0) {
            savedInput[index].splice(-1)}
       
        else {
            if (operator != '') {
            operator = ''
            index = 0}
            else
            savedInput[index].splice(-1)
        }
        break;

        
        case 'AC': savedInput=[[],[]]
        operator=''
        lastCalculation=['','','','']
        index=0
        break;
    }
    
    
    if (!isNaN(input)) 
        {savedInput[index].push(input)
            screenLog(savedInput[0].join('')+' ' +operator+' '+ savedInput[1].join(''),'')}
        
    else if (input === '.' && !savedInput[index].includes('.'))
        {savedInput[index].push(input)}
    else if (['=','X','-','+','/'].includes(input) && savedInput[1].length!==0 )    
    {calculateResult(savedInput,operator)
    index=0}

    else if (['X','-','+','/'].includes(input)) {
    operator = input
    index = 1
    }
    console.log(savedInput[0]+' ' +operator+' '+ savedInput[1])

    screenLog(savedInput[0].join('')+' ' +operator+' '+ savedInput[1].join(''),'')
}

function calculateResult(input, operator) {
if (parseFloat(input[1].join('')) === 0 && operator === '/') {
    displayInput = []
    index = 0
    operator = ''
    screenLog("Can't divide by 0", '');
}
}
populateKeys(keypad)
