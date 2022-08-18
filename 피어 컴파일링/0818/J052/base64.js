const Base64Table = new Map();
let key = 0;
// 대문자 65 : A
for (let i=0;i<26;i++) {
    Base64Table.set(key++, String.fromCharCode(65+i));
}
// 소문자 97 : a
for (let i=0;i<26;i++) {
    Base64Table.set(key++, String.fromCharCode(97+i));
}
// 숫자
for (let i=0;i<10;i++) {
    Base64Table.set(key++, i.toString());
}
// 공백과 /
Base64Table.set(key++, '+');
Base64Table.set(key, '/');

const Base64TableReverse = new Map();
Base64Table.forEach((value, key) => {
    Base64TableReverse.set(value, key);
});


/**
 * 
 * @param {string} content 
 */
 function strToBinary(content) {
    const contentLen = content.length;
    let binaryData = "";
    for (let i=0;i<contentLen;i++) {
        const asciiValue = content.charCodeAt(i);
        binaryData += numTo8bitBinary(asciiValue);
    }
    return binaryData;
}

function numTo8bitBinary(num) {
    let digitValue = 1<<7;
    let binaryValue = "";
    for (let i=0;i<8;i++) {
        binaryValue += parseInt(num/digitValue);
        num %= digitValue;
        digitValue >>= 1;
    }
    return binaryValue;
}

function numTo6bitBinary(num) {
    let digitValue = 1<<5;
    let binaryValue = "";
    for (let i=0;i<6;i++) {
        binaryValue += parseInt(num/digitValue);
        num %= digitValue;
        digitValue >>= 1;
    }
    return binaryValue;
}

function isNonBinaryData(data) {
    // true 이면 다른 문자가 있다는 것
    const checkNonBinaryCharacterRegex = new RegExp(/[^10]/);
    return checkNonBinaryCharacterRegex.test(data);
}

/**
 * 
 * @param {string} binaryData 
 */
function base64Encoder(data) {
    // binary data인지 체크
    if (isNonBinaryData(data)) data = strToBinary(data);

    // numOfPadding / 2가 = 들어갈 개수
    const numOfPadding = 6 - data.length % 6 === 6 ? 0 : 6 - data.length % 6;
    data += makePadding(numOfPadding);
    const binary6bitArr = [];
    while (data.length !== 0) {
        binary6bitArr.push(data.substring(0,6));
        data = data.substring(6);
    }

    let encodedData = "";
    for (let data of binary6bitArr) {
        encodedData += Base64Table.get(parseInt(data,2));   
    }
    for (let i=0;i<numOfPadding/2;i++) {
        encodedData += "=";
    }
    return encodedData;
}

function base64Decoder(data) {
    // console.log(Base64TableReverse);
    const dataLen = data.length;
    let binaryData = "";
    let numOfPadding = 0;
    for (let i=0;i<dataLen;i++) {
        if (data[i] === "=") {
            numOfPadding++;
            continue;
        }
        binaryData += numTo6bitBinary(Base64TableReverse.get(data[i]));
    }
    // console.log(binaryData);
    numOfPadding *= 2;
    binaryData = binaryData.slice(0,-numOfPadding);
    // console.log(binaryData);
    
    let decodedData = "";
    while (binaryData.length !== 0) {
        const asciiCode = parseInt(binaryData.substring(0,8),2);
        decodedData += String.fromCharCode(asciiCode);
        binaryData = binaryData.substring(8);
    }
    return decodedData;
}

function makePadding(num) {
    let padding = "";
    for (let i=0;i<num;i++) {
        padding += "0";
    }
    return padding;
}

export { Base64Table, numTo8bitBinary, strToBinary, base64Encoder, base64Decoder };