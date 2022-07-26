const { mission01Lexer } = require("./mission01Lexer");
const { mission01Parser } = require("./mission01Parser");
const { mission01Tokenizer } = require("./mission01Tokenizer");

const str =
  "<!DOCTYPE html><HTML lang='ko'><BODY><P>BOOST<IMG SRC=\"codesquad.kr\"></IMG><BR/></P></BODY></HTML>";

// IMG 닫힌 슬래시 '/' 없음에도 불구하고 정상적으로 작동해야 된다.
const str2 =
  '<HTML><HEAD><TITLE>Your Title Here</TITLE></HEAD><BODY BGCOLOR="FFFFFF"><CENTER><IMG SRC="clouds.jpg" ALIGN="BOTTOM"> </CENTER><HR><A href="http://somegreatsite.com">Link Name</A>is a link to another nifty site<H1>This is a Header</H1><H2>This is a Medium Header</H2>Send me mail at <a href="mailto:support@yourcompany.com">support@yourcompany.com</a>.<P> This is a new paragraph!<P> <B>This is a new paragraph!</B><BR><B><I>This is a new sentence without a paragraph break, in bold italics.</I></B><HR></BODY></HTML>';

function XMLParser(sampleStr) {
  let result;

  try {
    const token = mission01Tokenizer(sampleStr);
    const lexerArray = mission01Lexer(token);
    result = mission01Parser(lexerArray);
  } catch (err) {
    console.error(err);
  }

  XMLParser.prototype.stringify = () => result[0];
  XMLParser.prototype.getParserStack = () => result[1];

  XMLParser.prototype.elementByAttribute = function (name, value) {
    const stackParser = result[1];
    const answer = [];
    stackParser.forEach((arr) =>
      arr.forEach((obj) => {
        obj.attributes?.forEach((attrObj) => {
          if (
            attrObj.name.replace(/'/g, "").replace(/"/g, "") === name &&
            attrObj.value.replace(/'/g, "").replace(/"/g, "") === value
          ) {
            answer.push(obj);
          }
        });
      })
    );
    return answer;
  };

  XMLParser.prototype.elementByTag = function (element) {
    const stackParser = result[1];
    const answer = [];

    stackParser.forEach((arr) =>
      arr.forEach((obj) => {
        obj.element === element && answer.push(obj);
      })
    );

    return answer;
  };

  XMLParser.prototype.findXPath = function (path) {
    const pathArr = path
      .split("/")
      .filter((el) => el !== "")
      .map((el) => el.split("["));
    const stackParser = result[1];
    const returnArr = [];

    for (let i = 0; i < stackParser.length; i++) {
      const parserArray = stackParser[i];
      for (let j = 0; j < parserArray.length; j++) {
        const parserObject = parserArray[j];
        if (parserObject.element === pathArr[0][0]) {
          returnArr.push(findElement(parserObject.children, pathArr.slice(1)));
        }
      }
    }

    return returnArr;
  };

  function findElement(obj, arr) {
    let targetArr = arr[0];
    let targetObj = obj[0];
    let counter = 1;
    if (!targetArr) return;

    if (targetArr.length >= 2) {
      counter = Number(targetArr[1][0]);
    }
    if (
      arr.length === 1 &&
      targetArr[0] === targetObj.element &&
      counter === 1
    ) {
      return targetObj;
    }
    if (
      arr.length === 1 &&
      targetArr[0] === targetObj.element &&
      counter >= 2
    ) {
      counter--;
      while (counter !== 1) {
        if (targetArr[0] === targetObj.element) counter--;
        targetArr = arr.slice(1)[0];
      }
    }
    if (targetObj?.element === targetArr[0]) {
      return findElement(obj[0].children, arr.slice(1));
    }
  }
}

module.exports.XMLParser = XMLParser;
