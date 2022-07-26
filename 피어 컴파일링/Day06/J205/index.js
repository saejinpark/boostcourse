const util = require("util");

const XMLParser = require("./XMLParser");

/* 주석 바꿔가며 테스트 하시면 됩니다 */

const str =
  '<!DOCTYPE html><HTML lang="ko"><BODY><P>BOOST<IMG SRC="codesquad.kr"></IMG><BR/></P></BODY></HTML>';

// const str = `<HTML>
// <HEAD>
// <TITLE>Your Title Here</TITLE>
// </HEAD>
// <BODY BGCOLOR="FFFFFF">
// <CENTER><IMG SRC="clouds.jpg" ALIGN="BOTTOM"> </CENTER>
// <HR>
// <A href="http://somegreatsite.com">Link Name</A>
// is a link to another nifty site
// <H1>This is a Header</H1>
// <H2>This is a Medium Header</H2>
// Send me mail at <a href="mailto:support@yourcompany.com">
// support@yourcompany.com</a>.
// <P> This is a new paragraph!
// <P> <B>This is a new paragraph!</B>
// <BR> <B><I>This is a new sentence without a paragraph break, in bold italics.</I></B>
// <HR>
// </BODY>
// </HTML>
// `;

// const str = `
// <?xml version="1.0" encoding="utf-8"?>
// <vector xmlns:android="http://schemas.android.com/apk/res/android"
//     android:height="64dp"
//     android:width="64dp"
//     android:viewportHeight="600"
//     android:viewportWidth="600" >
//    <group
//         android:name="rotationGroup"
//         android:pivotX="300.0"
//         android:pivotY="300.0"
//         android:rotation="45.0" >
//         <path
//             android:fillColor="#000000"
//             android:pathData="M300,70 l 0,-70 70,70 0,0 -70,70z" />
//    </group>
//    <group
//         android:name="horizontalGroup"
//         android:pivotX="200.0"
//         android:pivotY="200.0"
//         android:rotation="180.0" >
//         <path
//             android:fillColor="#111111"
//             android:pathData="M300,70 l 0,-70 70,70 0,0 -70,70z" />
//    </group>
// </vector>
// `;

let dom = XMLParser(str);
console.log("\n=============== parser ===============\n");
console.log(util.inspect(dom.stringfy(), false, null, true));

const elem = dom.elementByAttribute("SRC", "codesquad.kr");
console.log("\n=============== elementByAttribute ===============\n");
console.log(util.inspect(elem, false, null, true));

const elems = dom.elementsByTag("P");
console.log("\n=============== elementsByTag ===============\n");
console.log(util.inspect(elems, false, null, true));

let pElement = dom.findXPath("/HTML/BODY/P[1]");
// let pElement = dom.findXPath("/vector/group[2]/path");

console.log("\n=============== findXPath ===============\n");
console.log(util.inspect(pElement, false, null, true));
