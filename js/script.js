// special thanks to @evelew for the mentorship and help with refactoring

//helper

const showHideLoader = (state) => {
    const loader = document.getElementsByClassName('loader')[0];
    loader.style.display = state === 'none' ? 'block' : 'none';
}

// RGB converter
const MAX_OPACITY = 255;


const submitBtn = document.getElementById('hexSubmit');

if(!submitBtn){
    console.log(`Submit button was not found.`)
}

const getUserInput = () => {
    const hexInput = document.getElementById('hexInput');
    const userInput = hexInput.value;
    return userInput;
}

const formValidation = (hexInputString) => {
    const hexInputArray = hexInputString.toLowerCase().split('');
    const shorterThanMinLength = hexInputArray.length < 6 ? true : false;
    const hasInvalidChars = hexInputArray.some(char => char.charCodeAt(0) >102);
    if (shorterThanMinLength) {
        return alert(`Your input must be 6-8 characters long. \nYou inputed ${hexInputArray.length} characters.`);
    }
    if (hasInvalidChars) {
        return alert(`Your input can only include letters from A to F.`);
    }
    return true;
}

const slice = (inputString) => {
    const red = inputString.slice(0,2);
    const green = inputString.slice(2,4);
    const blue = inputString.slice(4,6);
    const transparency = inputString.slice(6,8);
    return [red, green, blue, transparency];
}

const isNotEmpty = (eachColorString) => {
    return eachColorString.length !== 0 ? true : false;
}

const eachColorToRgb = (eachColorString) => {
    return parseInt(eachColorString, 16);
}

const transparencyToPercent = (transparencyString) => {
    const transparency = (transparencyString / MAX_OPACITY).toFixed(2)
    return Number(transparency);
}

const hexToRGB = (inputString) => {
    const inputArray = slice(inputString.toUpperCase());
    const rbgOutputArray = inputArray.map((eachColorString) => {
        if (isNotEmpty(eachColorString)) {
            return eachColorToRgb(eachColorString);
        } else {
            return MAX_OPACITY;
        }
    });
    rbgOutputArray[3] = transparencyToPercent(rbgOutputArray[3])
    return rbgOutputArray;
}

const printRGBstring = (rbgOutputArray) => {
    return rbgOutputArray.map((char) => String(char));
}

const assembleHTMLOutput = (hexInputString, rbgOutputString) => {
    // select page elements
    const outputDiv = document.getElementById('outputDiv');
    const inputedHex = document.getElementById('inputedHex');
    const inputedData = document.getElementById('inputedData');
    const outputText = document.getElementById('outputedRGB');
    const outputedData = document.getElementById('outputedData');    

    inputedHex.textContent = `#${hexInputString}`;
    inputedData.style.backgroundColor = `#${hexInputString}`;
    outputText.textContent = `rgba(${rbgOutputString})`;
    outputedData.style.backgroundColor = `rgba(${rbgOutputString})`

    outputDiv.style.display = 'block';
    showHideLoader('block');
    return;
}

const convertToRBG = () => {
    showHideLoader('none');
    const hexInputString = getUserInput();
    if (!formValidation(hexInputString)){
        return;
    }
    const rbgOutputArray = hexToRGB(hexInputString);
    const rbgOutputString = printRGBstring(rbgOutputArray);
    return assembleHTMLOutput(hexInputString, rbgOutputString);
}


// Copy RGB output
const copyBtn = document.getElementById('rgbCopy');

if(!copyBtn){
    console.log(`Copy button was not found.`)
}


const copyRGBoutput = async () => {
    const rgbString = document.getElementById('outputedRGB').textContent;
    try {
        const copiedText = await navigator.clipboard.writeText(rgbString);
        alert('RGB code was copied successfully!')
    } catch(error){
        console.log(error);
        alert(`Sorry, there was an error:${error}`)
    }
    return;
}


// Set user color as background
const setBgBtn = document.getElementById('rgbBgSet');

const setBackgroundColor = () => {
    const rgbString = document.getElementById('outputedRGB').textContent;
    console.log(rgbString);
    const body = document.getElementById('app')
    console.log(`main: ${body.style.backgroundColor}`);
    const inputDiv = document.getElementsByClassName('inputDiv')[0];
    body.style.background = rgbString;
    inputDiv.style.background = '#F2f2f2';
    inputDiv.style.marginLeft = '-10px';
    inputDiv.style.paddingLeft = '10px';
}


submitBtn.addEventListener('click', convertToRBG);
copyBtn.addEventListener('click', copyRGBoutput);
setBgBtn.addEventListener('click', setBackgroundColor);

