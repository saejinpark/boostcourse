/**
 * 물리 계층
 * 전송하는 프레임을 바이트 단위로 변경해서 물리적으로 전송되는 것을 16진수 문자열을 생성
 * @param {*} frame 
 */
export function txPhysical(frame){
    console.log("\n=========== Physical Layer ===========");
    console.log(`요청 "${_frameToString(frame)}"\n`);

    const bits = ASCIItoHex(_frameToString(frame));
    console.log(bits)
}

/**
 * 아스키 문자열을 16진수로 변환
 * @param {string} str 
 * @returns 
 */
function ASCIItoHex(str){
    let result = [];
    for(let n = 0, l = str.length; n < l; n ++) {
        let hex = Number(str.charCodeAt(n)).toString(16);
        result.push(hex);
    }
    return result.join('');
}

function _frameToString(frame){
    return `( ${Object.values(frame[0]).join(', ')}, { ${Object.values(frame[1]).join(', ')}, [${Object.values(frame[2]).join(', ')}] } )`
}