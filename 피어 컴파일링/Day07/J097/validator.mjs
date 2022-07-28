import { Position } from "./position.mjs";

const Valid = {
  MOVE: 0,
  SHOW: 1
};
Object.freeze(Valid);

const regexRules = [
  {re: /(?<posFrom>^[A-H][1-8])->(?<posTo>[A-H][1-8]$)/,
   keyword: Valid.MOVE},
  {re: /^\?(?<pos>[A-H][1-8]$)/,
   keyword: Valid.SHOW}
];

function stringToPos(str){
  return new Position(str.charCodeAt(0)-65, str.charCodeAt(1)-49);  
}

const Validator = {
  input(line){ //인자로 온 line의 유효성을 검사함
    for (const rule of regexRules) { 
      const result = rule.re.exec(line);
      if (result !== null) { //정규표현식 매칭됨
        //[javascript - map function for objects (instead of arrays) - Stack Overflow](https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays)
        let newGroup = {};
        for (let [k, v] of Object.entries(result.groups))
          newGroup[k] = stringToPos(v);
        return {
          status: rule.keyword,
          groups: newGroup
        };
      }
    }
    throw "잘못된 형식의 입력";
  }
}

// console.log(Validator.input("?A1"))

export {Valid, Validator};