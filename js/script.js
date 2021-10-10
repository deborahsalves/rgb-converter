const form = document.getElementById('userHexInput');
console.log(`form: ${form}`);
const userInput = document.getElementById('hexInput');
console.log(`userInput: ${userInput}`);
const hexSubmitBtn = document.getElementById('hexSubmit');
console.log(`hexSubmitBtn: ${hexSubmitBtn}`);
const outputDiv = document.getElementById('outputDiv');

// slices string input into R, G, B and transparency 2-chr strings
const sliceInput = (str) => {
    let red = str.slice(0,2);
    let green = str.slice(2,4);
    let blue = str.slice(4,6);
    // if user inputs transparency code
    if (str.length > 6) {
        let transparency = str.slice(6,8);
        return numAsArray = [red, green, blue, transparency]
    } else {
        return numAsArray = [red, green, blue]
    }
}

// takes 16 base (hex) code and returns 10 base (rgb) code 
const colorLetterIntoNumbers = (str, index) => {
    str = str.toUpperCase();
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    // checks if code is number or letter
    if (letters.includes(str[index])) {
        let letterIndex = letters.indexOf(str[index]);
        let tens = 10;
        // if the number/letter is in the tens, adjust *10 and letter index
        if (index === 0) { 
            index = 16 
            tens = 160
        } 
        return tens + (letterIndex * index);
    } else {
        let eachStr = str[index];
        if (index === 0) { index = 16 }
        return eachStr * index;
    }
}

// converts transparency to percent
const transparencyToPercent = (num) => {
    let trans = (num * (100/25500)).toFixed(2)
    return Number(trans);
}

// prints codes as string for user to copy/paste
const printRGB = (arr) => {
    let returnStr = arr.map((each) => {
        each = String(each)
        return each;
    })
    return returnStr;
}

// calls functions when event is fired
const hexToRGB = (str) => {
    let hexArray = sliceInput(str);
    let rbgArray = hexArray.map((each) => {
        let firstIndex = colorLetterIntoNumbers(each, 0);
        let secondIndex = colorLetterIntoNumbers(each, 1);
        return firstIndex+secondIndex;
    })
    // runs if user inputed transparency code
    if (rbgArray.length === 4) {
        let strToNum = Number(rbgArray[3])
        rbgArray[3] = transparencyToPercent(strToNum);
    } else {
        rbgArray[3] = '1.00';
    }
    let output = printRGB(rbgArray);
    return output;
}

// console.log(sliceInput('222222ff'))
// console.log(colorLetterIntoNumbers('AA', 0))
//console.log(printRGB(hexToRGB('cd9922cc')))

if(!hexSubmitBtn){
    console.log('não achou')
}

const assembleHTMLOutput = (e) => {
    // e.preventDefault();
    console.log('clicked')

    // input
    const userInputData = userInput.value;
    const inputedText = document.getElementById('inputedHex');
    inputedText.textContent = `#${userInputData}`;
    const inputedData = document.getElementById('inputedData');
    inputedData.style.backgroundColor = `#${userInputData}`;

    // output
    const output = hexToRGB(userInputData);
    const outputText = document.getElementById('outputedRGB');
    outputText.textContent = `rgba(${output})`;
    const outputedData = document.getElementById('outputedData');
    outputedData.style.backgroundColor = `#${userInputData}`

    outputDiv.style.display = 'block';
}

hexSubmitBtn.addEventListener('click', assembleHTMLOutput);


