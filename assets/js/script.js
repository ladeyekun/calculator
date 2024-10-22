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
let lastOperator = '';
let lastNumber = '';

numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener('click', (clickEvent) => {
        display.innerText = 
            inputNumber(display.innerText, clickEvent.target.innerText);
    });
});

operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', (clickEvent) => {
        display.innerText = 
            inputOperator(display.innerText, clickEvent.target.innerText);
            lastOperator = clickEvent.target.innerText;
            lastNumber = display.innerText;
            console.log(`Last Number = ${lastNumber}, Last operator= ${lastOperator}`);
    });
});

function inputNumber(display, input) {
    if (display === '0' || display === 'Infinity') {
        display = '';
    }

    if (input === '.') {
        if (isDecimalPointPresent(display)) {
            input = '';
        }
    }

    display += input;
    return display;
}

function inputOperator(display, input) {
    switch (input) {
        case '=':
            return eval(display);
            break;

        case 'AC':
            return '0';
            break;

        case 'DEL':
            display = display.slice(0, display.length - 1);
            return display === '' ? '0' : display;
            break;

        default:
            return display += input;
    }
}

function isDecimalPointPresent(display) {
    return display.indexOf('.') !== -1 ? true : false;
}

console.log(numberBtns);
