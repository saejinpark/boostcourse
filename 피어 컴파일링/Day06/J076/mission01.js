const { XMLParser } = require("./XMLParser");

const str =
  "<!DOCTYPE html><HTML lang='ko'><BODY><P>BOOST<IMG SRC=\"codesquad.kr\"></IMG><BR/></P></BODY></HTML>";

const str2 =
  '<HTML><HEAD><TITLE>Your Title Here</TITLE></HEAD><BODY BGCOLOR="FFFFFF"><CENTER><IMG SRC="clouds.jpg" ALIGN="BOTTOM"></CENTER><HR><A href="http://somegreatsite.com">Link Name</A>is a link to another nifty site<H1>This is a Header</H1><H2>This is a Medium Header</H2>Send me mail at <a href="mailto:support@yourcompany.com">support@yourcompany.com</a>.<P> This is a new paragraph!</P> <B>This is a new paragraph!</B><BR><B><I>This is a new sentence without a paragraph break, in bold italics.</I></B><HR></BODY></HTML>';

const dom = new XMLParser(str2);
console.log(dom.stringify());
console.log(dom.getParserStack());
