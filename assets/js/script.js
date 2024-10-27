'use strict';

function select(selector, scope = document) {
    return scope.querySelector(selector);
}

function selectAll(selector, scope = document) {
    return scope.querySelectorAll(selector);    
}

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

const numberBtns = selectAll('.number');
const operatorBtns = selectAll('.operator');
const display = select('.calculator-display p');
const operators = ['+', '-', '/', '*'];
let memoryNumber = 0;
let memoryOperator = '';
let operatorMonitor = 0;
let lastChar = '';

numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener('click', (clickEvent) => {
        inputNumber(display, clickEvent.target.innerText);
    });
});

operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', (clickEvent) => {
        inputOperator(display, clickEvent.target.innerText);
            //lastOperator = clickEvent.target.innerText;
            //lastNumber = display.innerText;
            //console.log(`Last Number = ${lastNumber}, Last operator= ${lastOperator}`);
    });
});

function inputNumber(selector, input) {
    let display = selector.innerText;
    lastChar = display.substring(display.length - 1);
    if (operators.includes(lastChar)){
        let result = eval(display.substring(0, lastChar + 1));
        console.log(`display=${display}`);
        console.log(`last Char=${lastChar}, Eval=${display.substring(0, lastChar + 1)}`);
        console.log(`result ${display.substring(0, lastChar + 1)}=${result}`);
    }

    if (operatorMonitor === 1) {
        operatorMonitor = 0;
        display = '';
    }

    if (display.length > 9) return;

    /*
    if (operatorMonitor === 1) {
        memoryNumber = display;
        display = '';
        operatorMonitor = 0;
    }
    */

    if (display === '0' || display === 'Infinity' || display === 'NaN') {
        display = '';
    }

    if (input === '.') {
        if (isDecimalPointPresent(display)) {
            input = '';
        }
    }

    display += input;
    selector.innerText = display;
}

function inputOperator(selector, input) {
    let display = selector.innerText;

    switch (input) {
        case '=':
            lastChar = display.substring(display.length - 1);
            if (! operators.includes(lastChar)){
                display = eval(display);
                operatorMonitor = 1;
            }
            //display += input;
            break;

        case '%':
            lastChar = display.substring(display.length - 1);
            if (! operators.includes(lastChar)){
                display = eval(display) / 100;
                operatorMonitor = 1;
            }
            //display += input;
            break;
    
        case 'AC':
            memoryNumber = 0;
            memoryOperator = '';
            operatorMonitor = 0;
            display = '0';
            break;

        case 'DEL':
            display = display.length > 1 ? 
                display.slice(0, display.length - 1) : '0';
            break;

        default:
            lastChar = display.substring(display.length - 1);
            if (operators.includes(lastChar)){
                display = display.substring(0, display.length - 1);
            } else {
                display = eval(display);
            }
            if (operatorMonitor === 1) operatorMonitor = 0;
            display += input;
            break;
    }
    selector.innerText = display;
}

function computeDisplayResult(display) {
    return eval(display);
}

function isDecimalPointPresent(display) {
    return display.indexOf('.') !== -1 ? true : false;
}

function clearDisplay(selector) {
    selector.innerText = '0';
}


