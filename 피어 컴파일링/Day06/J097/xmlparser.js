
const lRegex = [];
lRegex.push(["comment tag", /<!--.*?-->/]);
lRegex.push(["comment(DTD) tag", /<!.*?>/]);
lRegex.push(["comment(XML declaration) tag", /<\?.*?\?>/]);
lRegex.push(["empty element tag", /<.*?\/>/]);
lRegex.push(["end tag", /<\/.*?>/]);
lRegex.push(["start tag", /<.*?>/]);
lRegex.push(["text"], /.*?/);

const singleton = [
  "area", "base", "br", "col", "command", "embed",
  "hr", "img", "input", "keygen", "link", "meta",
  "param", "source", "track", "wbr",
];

let re_name =  /[A-Za-z_][A-Za-z0-9_]*/;
let re_attr =  /[A-Za-z_][A-Za-z0-9_]*=".*?"/g;
let re_attrname = /[^=]+/;
let re_attrvalue =  /".*?"/;


function ParsingException(message){
  this.message = `올바른 XML 형식이 아닙니다. (${message})`;
  this.name = "ParsingException";
}

function SearchingException(message){
  this.message = `존재하지 않습니다. (${message})`;
  this.name = "SearchingException";
}

function tokenizer(str){
  return str.replace(/\n/g, "").match(/<[^>]+>|[^<>]+/g);
}

function categorizeToken(token) {
  for (let i=0; i<lRegex.length; i++){
    let result = token.match(lRegex[i][1]);
    if (result) {
      return lRegex[i][0];
    }
  }
  throw new ParsingException("지정되지 않은 토큰 형식");
}

function typeofToken(type){
  if (type === "empty element tag" ||
  type === "end tag" || 
  type === "start tag")
    return "tag";
  if (type === "text")
    return "text";
  return "comment";
}


function isSingelton(lex){
  return singleton.includes(lex.element.toLowerCase());
}

function analyzeToken(token, lexlist){
  let lex = {};
  lex.type = categorizeToken(token);
  if (typeofToken(lex.type) === "tag"){
    lex.element = token.match(re_name)[0];
    if (lex.type === "empty element tag" || lex.type === "start tag"){
      if (isSingelton(lex)) 
        lex.type = "empty element tag"; 
      let attr = [];
      let result = token.match(re_attr);
      if (result) result.forEach((attrline)=>{
        attr.push({name: attrline.match(re_attrname)[0], value: attrline.match(re_attrvalue)[0].slice(1,-1)});
      });
      if (attr.length !== 0) lex.attributes = attr;
    }
    if (lex.type === "end tag" && isSingelton(lex)) lex = null;
  }
  else if (lex.type === "text") lex.value = token;
  if (lex !== null) lexlist.push(lex);
}

function lexer(tokenlist){
  lexlist = [];
  tokenlist.forEach((token) => analyzeToken(token, lexlist));
  return lexlist;
}

function initObject(lex) {
  if (lex.attributes !== undefined)
    return {element: lex.element, attributes: lex.attributes};
  else
    return {element: lex.element};
}

function lastof(stack){
  return stack[stack.length-1];
}

function parseStarttag(stack, lex, root) {
  let obj = initObject(lex);
      
  if (root === null) 
    root = obj;
  else {
    if (lastof(stack).children === undefined) 
      lastof(stack).children = [];
    lastof(stack).children.push(obj);
  }
  stack.push(obj);
  return root;
}

function parseEndtag(stack, lex){
  if (lastof(stack).element === lex.element)
    stack.pop();
  else
    throw new ParsingException("태그 쌍이 맞지 않음");
}

function parseEmptyelementtag(stack, lex, root){
  if (root === null)
    throw new ParsingException("empty element tag는 루트로 사용될 수 없음");
  let obj = initObject(lex);
  if (lastof(stack).children === undefined) 
    lastof(stack).children = [];
  lastof(stack).children.push(obj);
}

function parseText(stack, lex, root){
  if (root === null)
    throw new ParsingException("root 요소 없이 text가 올 수 없음");
  if (lastof(stack).text === undefined)
    lastof(stack).text = lex.value;
  else
    lastof(stack).text += lex.value;
}

function parser(lexlist) {
  let stack = [];
  let root = null;
  lexlist.forEach((lex) => {
    if (lex.type === "start tag") 
      root = parseStarttag(stack, lex, root);
    if (lex.type === "end tag")
      parseEndtag(stack, lex);
    if (lex.type === "empty element tag")
      parseEmptyelementtag(stack, lex, root);
    if (lex.type === "text")
      parseText(stack, lex, root);
  });
  if (stack.length !== 0)
    throw new ParsingException("닫히지 않은 tag가 존재함");
  
  return root;
}

function XMLParser(str, type="XML"){
  if (type === "XML")
    singleton.length = 0;
  return parser(lexer(tokenizer(str)));
}

function elementByAttribute(dom, attr, val){
  let list = _elementByAttribute(attr, val, dom);
  if (list.length === 0)
    throw new SearchingException("해당 Attribute의 Element 없음");
  return JSON.stringify(list, null, 4);
}


function _elementByAttribute(attr, val, obj) {
  let list = [];
  if (obj.attributes !== undefined) {
    obj.attributes.forEach(({name, value}) => {
      if (attr === name && val === value)
        list.push(obj);
    })
  }
  if (obj.children !== undefined)
    obj.children.forEach((child)=>{list.push(..._elementByAttribute(attr, val, child))});
  return list;
}

function elementByTag(dom, tag){
  tag = tag.toLowerCase();
  let list = _elementByTag(tag, dom);
  if (list.length === 0)
    throw new SearchingException("해당 Tag의 Element 없음");
  return JSON.stringify(list, null, 4);
}

function _elementByTag(tag, obj) {
  let list = [];
  if (obj.element !== undefined && obj.element.toLowerCase() === tag) {
    list.push(obj);
  }
  if (obj.children !== undefined)
    obj.children.forEach((child)=>{list.push(..._elementByTag(tag, child))});
  return list;
}

// /로 시작하는 절대 경로만 탐색함
function findXPath(dom, path){
  if (path[0] !== '/')
    throw new SearchingException("XPath가 절대 경로가 아님");
  
  path = path.toLowerCase().slice(1).split('/');
  let xpath = [];
  path.forEach((pathstr)=>{
    let result = pathstr.match(/\[[0-9]+\]/) ;
    if (result) xpath.push({element: pathstr.slice(0, result.index), index: Number(result[0].slice(1,-1))});
    else xpath.push({element: pathstr, index: 1});
  });
  
  if (xpath[0].element === dom.element.toLowerCase() && xpath[0].index === 1)
    return JSON.stringify(_findXPath(dom, xpath.slice(1)), null, 4);
  else
    throw new SearchingException("root 경로가 유효하지 않습니다.")
}

function _findXPath(obj, xpath){
  if (xpath.length === 0)
    return obj;
  let index = 0;
  if (obj.children !== undefined)
  for (let i=0; i<obj.children.length; i++) {
    if (obj.children[i].element.toLowerCase() === xpath[0].element)
      index++;
    if (index == xpath[0].index)
      return _findXPath(obj.children[i], xpath.slice(1));
  }
  throw new SearchingException("찾으려는 경로가 없습니다");
}

console.log(`----------------------------------------------
1) XML Parser 의 정상동작 예시
----------------------------------------------`)
const str_XMLParser1 = '<!DOCTYPE html><HTML lang="ko"><BODY><P>BOOST<IMG lang="ko" SRC=\"codesquad.kr\"></IMG><BR/>ZZ</P></BODY></HTML>';
let dom = XMLParser(str_XMLParser1, "HTML");
console.log(JSON.stringify(dom, null, 4));

console.log(`----------------------------------------------
1) XML Parser 의 잘못된 HTML5 오류 처리 예시
----------------------------------------------`)
const str_XMLParser2 = `<!DOCTYPE html><HTML lang="ko"><BODY></HTML></BODY>`;

try {
  dom = XMLParser(str_XMLParser2, "HTML");
  console.log(JSON.stringify(dom, null, 4));
} catch (e) {
  console.log(e);
}

console.log(`----------------------------------------------
2) XPath 처리 의 elementByAttribute 정상동작 예시
----------------------------------------------`)

const str_XPath1 = "<!DOCTYPE html><HTML lang=\"ko\"><BODY><P>BOOST<IMG SRC=\"codesquad.kr\"></IMG><BR/></P><P>CAMP</P></BODY></HTML>";
dom = XMLParser(str_XPath1, "HTML");
console.log(elementByAttribute(dom, "lang", "ko"));

console.log(`----------------------------------------------
2) XPath 처리 의 elementByTag 정상동작 예시
----------------------------------------------`)

console.log(elementByTag(dom, "IMG"));

console.log(`----------------------------------------------
2) XPath 처리 의 findXPath 정상동작 예시
----------------------------------------------`)

console.log(findXPath(dom, "/HTML/BODY/P[1]"));

console.log(`----------------------------------------------
2) XPath 처리 의 findXPath 오류 처리 예시
----------------------------------------------`)
try {
  console.log(findXPath(dom, "/HTML/BODY/P[3]"));
} catch (e) {
  console.log(e);
}

console.log(`----------------------------------------------
5) 체크포인트와 확인할 사항 의 HTML 샘플 페이지 정상작동 예시
(P 태그 추측하는 기능 미구현이라 닫는 P를 추가하였음)
----------------------------------------------`)

const str_HTMLSample = `
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
<P> This is a new paragraph! </P>
<P> <B>This is a new paragraph!</B> </P>
<BR> <B><I>This is a new sentence without a paragraph break, in bold italics.</I></B>
<HR>
</BODY>
</HTML>`

dom = XMLParser(str_HTMLSample, "HTML");
console.log(JSON.stringify(dom, null, 4));

console.log(`----------------------------------------------
5) 체크포인트와 확인할 사항 의 HTML 샘플 페이지 XPath 오류 처리
----------------------------------------------`)
try {
console.log(findXPath(dom, "/html/body/p[2]/span"));
} catch (e) {
  console.log(e);
}

console.log(`----------------------------------------------
5) 체크포인트와 확인할 사항 의 리소스 XML 정상작동 예시
----------------------------------------------`)

const str_ResourceXML = `<?xml version="1.0" encoding="utf-8"?>
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
</vector>`;

dom = XMLParser(str_ResourceXML, "XML");
console.log(JSON.stringify(dom, null, 4));


console.log(`----------------------------------------------
5) 체크포인트와 확인할 사항 의 리소스 XML XPath 정상작동 예시
----------------------------------------------`)

console.log(findXPath(dom, "/vector/group[2]/path"));