// special thanks to @evelew for the mentorship and help with refactoring

const MAX_OPACITY = 255;

const submitBtn = document.getElementById('hexSubmit');

if(!submitBtn){
    console.log(`Submit button was not found.`)
}

const formValidation = (hexInputString) => {
    if (hexInputString.length < 6) {
        return alert(`Your input must be 6-8 characters long. \nYou inputed ${hexInputString.length} characters.`);
    }
}

const getUserInput = () => {
    const hexInput = document.getElementById('hexInput');
    const userInput = hexInput.value;
    return userInput;
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
    const inputAsArray = slice(inputString.toUpperCase());
    const rbgOutputAsArray = inputAsArray.map((eachColorString) => {
        if (isNotEmpty(eachColorString)) {
            return eachColorToRgb(eachColorString);
        } else {
            return 255;
        }
    });
    rbgOutputAsArray[3] = transparencyToPercent(rbgOutputAsArray[3])
    return rbgOutputAsArray;
}

const printRGBstring = (rbgOutputAsArray) => {
    return rbgOutputAsArray.map((char) => String(char));
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
}

const convertToRBG = () => {
    const hexInputString = getUserInput();
    if (hexInputString.length < 6) {
        return formValidation(hexInputString);
    }
    const rbgOutputAsArray = hexToRGB(hexInputString);
    const rbgOutputString = printRGBstring(rbgOutputAsArray);
    return assembleHTMLOutput(hexInputString, rbgOutputString);
}

submitBtn.addEventListener('click', convertToRBG);
