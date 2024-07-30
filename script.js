let NUM1 = '';
let NUM2 = '';
let RESULT = '';
let NUM1_FINISHED = false;
let NUM2_ENTERED = false;
let OPERATION = '';

function operate() {
    const num1 = document.querySelector("#num1");
    switch (OPERATION) {
        case '+': 
            RESULT = NUM1 + NUM2;
            break;
        case '-': 
            RESULT = NUM1 - NUM2;
            break;
        case 'x': 
            RESULT = NUM1 * NUM2;
            break;
        case '/': 
            if (NUM2 === 0)
                RESULT = 'division by zeroooo';
            else
                RESULT = NUM1 / NUM2;
            break;
        default:
            const screen = document.querySelector("#screen");
            screen.innerHTML = 'whoops everything broke, refresh page';
            break;
    }
    NUM1 = RESULT;
    NUM2 = '';
    NUM1_FINISHED = false;
    NUM2_ENTERED = false;
    OPERATION = '';
    const screen = document.querySelector("#screen");
    screen.childNodes.forEach((node) => {node.innerHTML = ''});
    num1.textContent = RESULT;
}

function btnPress(press) {
    if (RESULT === 'division by zeroooo')
        RESULT = '';
    const screen = document.querySelector("#screen");
    switch (press.target.textContent) {
        case '+': 
        case '-': 
        case 'x': 
        case '/': 
            const operator = document.querySelector("#operator");
            if (NUM1 === '') {
                break;
            }
            else if (!NUM1_FINISHED) {
                NUM1_FINISHED = true;
                OPERATION = press.target.textContent;
                operator.textContent = press.target.textContent;
                break;
            }
            else if (NUM2_ENTERED) {
                operate();
                NUM1_FINISHED = true;
                OPERATION = press.target.textContent;
                operator.textContent = press.target.textContent;
            }
            else {
                OPERATION = press.target.textContent;
                operator.textContent = press.target.textContent;
            }
            break;
        case 'C':
            NUM1 = '';
            NUM2 = '';
            RESULT = '';
            NUM1_FINISHED = false;
            NUM2_ENTERED = false;
            OPERATION = '';
            screen.childNodes.forEach((node) => {node.innerHTML = ''});
            break;
        case '=': 
            if (NUM2_ENTERED)
                operate();
            break;
        case '.': 
            break;
        default://numbers:
            if (NUM1 === '') {
                if (press.target.textContent === '⑨')
                    NUM1 = 9;
                else
                    NUM1 = +press.target.textContent;
                const num1 = document.querySelector("#num1");
                num1.textContent = press.target.textContent;
            }
            else if (!NUM1_FINISHED) {
                NUM1 *= 10;
                if (press.target.textContent === '⑨') 
                    NUM1 += 9;
                else
                    NUM1 += +press.target.textContent;
                const num1 = document.querySelector("#num1");
                num1.textContent += press.target.textContent;
            }
            else if (!NUM2_ENTERED) {
                NUM2_ENTERED = true;
                if (press.target.textContent === '⑨')
                    NUM2 = 9;
                else
                    NUM2 = +press.target.textContent;
                const num2 = document.querySelector("#num2");
                num2.textContent = press.target.textContent;
            }
            else {
                NUM2 *= 10;
                if (press.target.textContent === '⑨') 
                    NUM2 += 9;
                else
                    NUM2 += +press.target.textContent;
                const num2 = document.querySelector("#num2");
                num2.textContent += press.target.textContent;
            }
            break;
    }
}

function styleButton(button) {
    switch (button.textContent) {
        case '+': 
        case '-': 
        case 'x': 
        case '/': 
            button.classList.add("black");
            break;
        case 'C': 
        case '=': 
            button.classList.add("orange");
            break;
        default:
            button.classList.add("plain");
            break;
    }
}

function drawRow(buttons, btnArr) {
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    for (btn of btnArr) {
        const newButton = document.createElement("button");
        newButton.textContent = btn;
        styleButton(newButton);
        newButton.addEventListener("click", (event) => {btnPress(event)});
        newRow.appendChild(newButton);
    }
    buttons.appendChild(newRow);
}

function drawButtons() {
    const buttons = document.querySelector("#buttons");
    drawRow(buttons, ['0', '.']);
    drawRow(buttons, ['7', '8', '⑨', 'C', '/']);
    drawRow(buttons, ['4', '5', '6', '-', 'x']);
    drawRow(buttons, ['1', '2', '3', '+', '=']);
}

function initialize() {
    drawButtons();
}

document.addEventListener("DOMContentLoaded", initialize);
