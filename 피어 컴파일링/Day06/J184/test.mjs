import XMLParser from "./XMLParser.mjs";

const str = "<!DOCTYPE html><HTML lang=\"ko\"><BODY><P>BOOST<IMG SRC=\"codesquad.kr\"></IMG><BR/></P></BODY></HTML>";

const dom = new XMLParser();
dom.init(str);
dom.tokenizer();
dom.stringfy(); 