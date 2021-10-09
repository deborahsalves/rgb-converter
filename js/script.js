// const userInput = document.getElementsByName('hexInput');
// const hexSubmitBtn = document.getElementsByName('hexSubmit');

// splce string by R, G, B, transparency
// convert each to 16 base
// convert 16 base to (rgb) 10 base

const sliceInput = (str) => {
    let red = str.slice(0,2);
    let green = str.slice(2,4);
    let blue = str.slice(4,6);
    let transparency;
    let numAsArray = [red, green, blue]
    if (str.length > 6) {   
        transparency = str.slice(6,8);
        return numAsArray = [red, green, blue, transparency]
    }
    return numAsArray
}

// pra cada 1 no HEX dá 16 no RGB

const colorLetterIntoNumbers = (str, index) => {
    str = str.toUpperCase();
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    if (letters.includes(str[index])) {
        let letterIndex = letters.indexOf(str[index]);
        let tens = 10;
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

const transparencyToPercent = (num) => {
    console.log(`num: ${num}`)
    let trans = (num * (100/25500)).toFixed(2)
    return Number(trans);
}

const hexToRGB = (str) => {
    let hexArray = sliceInput(str);
    let rbgArray = hexArray.map((each) => {
        let firstIndex = colorLetterIntoNumbers(each, 0);
        let secondIndex = colorLetterIntoNumbers(each, 1);
        return firstIndex+secondIndex;
    })
    if (rbgArray.length === 4) {
        let strToNum = Number(rbgArray[3])
        rbgArray[3] = transparencyToPercent(strToNum);
        console.log(typeof rbgArray[3])
    }
    return rbgArray;
}
