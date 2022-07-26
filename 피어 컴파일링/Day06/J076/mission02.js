const { XMLParser } = require("./XMLParser");

const str =
  "<!DOCTYPE html><HTML lang='ko'><BODY><P>BOOST<IMG SRC=\"codesquad.kr\"></IMG><BR/></P></BODY></HTML>";

const dom = new XMLParser(str);
let oElement = dom.elementByAttribute("lang", "ko");
console.log(oElement);
let tElement = dom.elementByTag("IMG");
console.log(tElement);
let pElement = dom.findXPath("/HTML/BODY/P[1]");
console.log(pElement);
