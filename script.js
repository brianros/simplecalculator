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

document.addEventListener('keydown', (event) => {
    const key = event.key;
    switch (key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
        case '+':
        case '-':
        case '*':
        case '/':
            parseInput(key);
            break;
        case 'Enter':
            calculateResult(savedInput, operator);
            break;
        case 'Escape':
            clearScreen();
            break;
        case 'Backspace':
            parseInput('DEL');
            break;
        // Add more cases for other keys as needed
    }
});

function populateKeys(node) {
    let symbols = ['AC','DEL','7','8','9','*','4','5','6','-','1','2','3','+','0','.','=','/']
    for (let i = 0; i < node.length && i < symbols.length; i++) {
        node[i].textContent = symbols[i];
        node[i].setAttribute("id",symbols[i])
        node[i].addEventListener('click', () => parseInput(node[i].textContent));
    }
}

const screen = document.querySelector('.screen');

let screenUpperLine = document.createElement('div')
let screenLowerLine = document.createElement('div')
screenUpperLine.classList.add('screenUpperLine')
screenLowerLine.classList.add('screenLowerLine')
screen.appendChild(screenUpperLine)
screen.appendChild(screenLowerLine)
let savedInput = [[],[]]
let index = 0
let operator = ''


function clearScreen () {
    savedInput=[[],[]]
    operator=''
    index=0
    screenLog(savedInput[0].join('')+' ' +operator+' '+ savedInput[1].join(''),'')
}

function screenLog(upperLine, lowerLine) {
    screenUpperLine.innerText=upperLine
    screenLowerLine.innerText=lowerLine
}

function parseInput (input) {
    switch (input) {
        case 'DEL': 
        if (savedInput[1].length > 0) {
            savedInput[index].splice(-1)
            screenLog(savedInput[0].join('')+' ' +operator+' '+ savedInput[1].join(''),'')}
       
        else {
            if (operator != '') {
            operator = ''
            index = 0}
            else
            savedInput[index].splice(-1)
            screenLog(savedInput[0].join('')+' ' +operator+' '+ savedInput[1].join(''),'')
        }
        break;

        
        case 'AC': clearScreen()
        break;
    }
    
    
    if (!isNaN(input)) 
        {savedInput[index].push(input)
            screenLog(savedInput[0].join('')+' ' +operator+' '+ savedInput[1].join(''),'')}
        
    else if (input === '.' && !savedInput[index].includes('.'))
        {savedInput[index].push(input)}
    else if (['=','*','-','+','/'].includes(input) && savedInput[1].length!==0 )    
    {
        calculateResult(savedInput,operator)
    }

    else if (['*','-','+','/'].includes(input)) {
        if (input === '-' && savedInput[0].length===0) {
            savedInput[index].push(input)
            screenLog(savedInput[0].join('')+' ' +operator+' '+ savedInput[1].join(''),'')
            console.log('first:'+savedInput[0]+'second:'+savedInput[1]+'operator is:'+operator)}
            
            else if (savedInput[0].length===0) {
                index=0
                screenLog(savedInput[0].join('')+' ' +operator+' '+ savedInput[1].join(''),'')
                console.log('estas aca3')
            }
        
        else if (savedInput[0].length!=0 && savedInput[0].some(item => !isNaN(item))) {
            operator=input
            index=1
            screenLog(savedInput[0].join('')+' ' +operator+' '+ savedInput[1].join(''),'')
            console.log('first:'+savedInput[0]+'second:'+savedInput[1]+'operator is:'+operator)
        }
}
    

    
}

function calculateResult(input, operator) {

    let lastOperation = input[0].join('')+' '+operator+' '+input[1].join('')
    let result='0'
if (parseFloat(input[1].join('')) === 0 && operator === '/') {
    clearScreen()
    return(screenLog(lastOperation,"Math error: Can't divide by 0"))
}   
else {
    switch(operator){
    case '+': 
        result = (parseFloat(input[0].join('')) + parseFloat(input[1].join(''))).toFixed(3);
        break;
    case '-': 
        result = (parseFloat(input[0].join('')) - parseFloat(input[1].join(''))).toFixed(3);
        break;
    case '*': 
        result = (parseFloat(input[0].join('')) * parseFloat(input[1].join(''))).toFixed(3);
        break;
    case '/': 
        result = (parseFloat(input[0].join('')) / parseFloat(input[1].join(''))).toFixed(3);
        break;
}


}
clearScreen()
if (result.includes('.') && parseFloat(result) !== 0) {
    return screenLog(lastOperation, parseFloat(result));
} else {
    return screenLog(lastOperation, parseInt(result));
}
}




populateKeys(keypad)
