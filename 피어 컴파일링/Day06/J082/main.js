import { XMLParser } from "./xmlParser.js";

const main = () => {
    const str1 =
        '<!DOCTYPE html><HTML lang="ko"><BODY><P>BOOST<IMG SRC="codesquad.kr"><BR/></P></BODY></HTML>';
    const str2 = `
<HTML>
    <HEAD>
        <TITLE>Your Title Here</TITLE>
    </HEAD>
        <BODY BGCOLOR="FFFFFF">
        <CENTER><IMG SRC="clouds.jpg" ALIGN="BOTTOM"> </CENTER>
        <HR>
        <A href="http://somegreatsite.com">Link Name</A>
        is a link to another nifty site
        <H1>This is a Header</H1>
        <H2>This is a Medium Header</H2>
        Send me mail at <a href="mailto:support@yourcompany.com">
        support@yourcompany.com</a>.
        <P> This is a new paragraph!
        <P> <B>This is a new paragraph!</B>
        <BR> <B><I>This is a new sentence without a paragraph break, in bold italics.</I></B>
        <HR>
    </BODY>
</HTML>
        `;
    const str3 = `
<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:height="64dp"
    android:width="64dp"
    android:viewportHeight="600"
    android:viewportWidth="600" >
    <group
            android:name="rotationGroup"
            android:pivotX="300.0"
            android:pivotY="300.0"
            android:rotation="45.0" >
            <path
                android:fillColor="#000000"
                android:pathData="M300,70 l 0,-70 70,70 0,0 -70,70z" />
    </group>
    <group
            android:name="horizontalGroup"
            android:pivotX="200.0"
            android:pivotY="200.0"
            android:rotation="180.0" >
            <path
                android:fillColor="#111111"
                android:pathData="M300,70 l 0,-70 70,70 0,0 -70,70z" />
    </group>
</vector>
`;

    // const dom = XMLParser(str1);
    // const dom = XMLParser(str2);
    const dom = XMLParser(str3);
    console.log(dom.stringify());

    // console.log(dom.findXPath("/HTML/BODY/P"));
    // console.log(dom.elementByAttribute("SRC", "codesquad.kr"));
};
main();
