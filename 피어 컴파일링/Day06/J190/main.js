const XMLParser = require("./XMLParser.js");
const print = console.log
const util = require('util')

const str = `<!DOCTYPE html><HTML lang=\"ko\"><BODY><P>BOOST<IMG SRC=\"codesquad.kr\"></IMG><BR/></P><P>CAMP</P></BODY></HTML>`

const dom = new XMLParser(str)
print(dom.stringify())
// print(dom.elementByAttribute('lang', 'ko'))
// print(dom.elementByTag('HTML'))
// print(dom.findXPath('/HTML/BODY/P[2]'))
// print()
// console.log(util.inspect(dom.Lexer.getXML()[0], {showHidden: false, depth: null, colors: true}))
// print()