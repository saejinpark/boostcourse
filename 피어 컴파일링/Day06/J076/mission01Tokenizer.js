function mission01Tokenizer(str) {
  const regExpForXMLTag = /<\/?[^>]*>|.*?./g;

  // 정규표현식을 기반으로 태그를 분리한다.
  // 단, Text는 '문자(알파벳) 단위'로 쪼개진다.
  const elements = str.match(regExpForXMLTag);
  const elementsWithText = [];

  // 문자(char)를 기존의 text로 합친다.
  makeTextFromChar(elements, elementsWithText);

  // '<!'로 시작하는 태그는 '주석'으로 처리되어 지운다.
  const elementsRemoveAnnotation = removeAnnotation(elementsWithText);

  // 띄어쓰기가 존재하면 일단 분리하고 '='를 기반으로 또 분리하기
  const elementSplitEqualAndSpace = splitEqualAndSpace(
    elementsRemoveAnnotation
  );

  // 토큰 스택을 이용해 예외처리 확인하기
  // 길이가 0이 아닌 경우 에러처리
  const stackLength = findErrorWithTokenStack(elementSplitEqualAndSpace);
  // if (stackLength !== 0) throw new Error("올바른 XML 형식이 아닙니다.");

  // 최종적으로 Map 자료형으로 이를 Lexer에 넘겨줌
  return changeArrayIntoMap(elementSplitEqualAndSpace);
}

// makeTextFromChar: '문자(char)' 단위로 나뉘어진 text를 하나의 '문자열'로 합치기
function makeTextFromChar(originalArr, newArr) {
  let text = "";
  let startIdx = -1;

  for (let i = 0; i < originalArr.length; i++) {
    if (originalArr[i].length === 1) {
      text += originalArr[i];
      if (startIdx === -1) {
        startIdx = i;
      }
    }
    if (originalArr[i].length !== 1 && text.length !== 0) {
      newArr[startIdx] = text;
      text = "";
      startIdx = -1;
    }
    if (originalArr[i].length !== 1 && text.length === 0) {
      newArr.push(originalArr[i]);
    }
  }
}

// removeAnnotation: 주석을 지울 수 있는 함수이다.
function removeAnnotation(arr) {
  return arr.filter((el) => !(el[0] === "<" && el[1] === "!"));
}

// splitEqualAndSpace: 공백을 기준으로 1차 분리, '='를 기준으로 2차 분리
function splitEqualAndSpace(arr) {
  return arr.map((el) => [...el.split(" ").map((el) => el.split("="))]);
}

// findErrorWithTokenStack: 토큰 스택을 이용하여 에러 유무를 확인하기
function findErrorWithTokenStack(arr) {
  const TOKEN_STACK = [];
  const notLetters = /[^A-Za-z]/g;
  const SINGLE_TAG_AVAILABLE = ["IMG", "HR", "BR"];

  arr.forEach((el) => {
    // 엘리먼트 문자열 꺼내기
    const element = el[0][0];
    // case 1: 열린 태그 -> STACK에 엘리먼트 이름을 push하기
    if (
      element[0] === "<" &&
      element[1] !== "/" &&
      element[element.length - 2] !== "/"
    ) {
      if (!SINGLE_TAG_AVAILABLE.includes(element)) {
        TOKEN_STACK.push(element.slice(1).replace(notLetters, ""));
      }
    }

    // case 2: 닫힌 태그 -> match한 후 pop하기
    if (element[0] === "<" && element[1] === "/") {
      const currentLetter = element.slice(1).replace(notLetters, "");
      const topOfTheStack = TOKEN_STACK[TOKEN_STACK.length - 1];
      if (currentLetter === topOfTheStack) {
        TOKEN_STACK.pop();
      }
    }

    // case 3: text -> 통과 (아무것도 작성 X)
    // case 4: 단일 태크 -> 통과 (아무것도 작성 X)
  });
  return TOKEN_STACK.length;
}

// changeArrayIntoMap: 기존의 문자열이 들어있었던 배열을 분석해서 Map으로 변환
function changeArrayIntoMap(arr) {
  const returnMap = new Map();
  const extractTag = /[\<\>\/]/g;
  arr.forEach((el) => {
    const firstElement = el[0][0];
    const last = el[el.length - 1];
    const lastElement = last[last.length - 1];
    const lastWithDeletedTagSymbol = last.map((el) =>
      el.replace(extractTag, "")
    );

    // lastConvertIntoPairArr: 'A=B' 꼴이 연달아 이어지면 이들을 여러 개의 [A, B] 꼴로 치환한 뒤 배열에 넣는다.
    const lastConvertIntoPairArr = [];

    for (let i = 0; i < lastWithDeletedTagSymbol.length - 1; i += 2) {
      lastConvertIntoPairArr.push([
        lastWithDeletedTagSymbol[i],
        lastWithDeletedTagSymbol[i + 1],
      ]);
    }

    // first    last
    // <HTML    'ko'>
    // <BODY>   <BODY>
    // <P>      <P>
    // BOOST    BOOST
    // <IMG     "codesquad.kr">
    // </IMG>   </IMG>
    // <BR/>    <BR/>
    // </P>     </P>
    // </BODY>  </BODY>
    // </HTML>  </HTML>

    // case 1: 열린 태그인 경우
    if (
      firstElement[0] === "<" &&
      firstElement[1] !== "/" &&
      lastElement[lastElement.length - 1] === ">" &&
      lastElement[lastElement.length - 2] !== "/"
    ) {
      returnMap.set(
        firstElement.replace(extractTag, "") + "_OPEN",
        lastWithDeletedTagSymbol
      );
    }

    // case 2: 닫힌 태그인 경우
    if (
      firstElement[0] === "<" &&
      lastElement[lastElement.length - 1] === ">" &&
      firstElement[1] === "/"
    ) {
      returnMap.set(firstElement.replace(extractTag, "") + "_END", "/");
    }

    // case 3: text인 경우
    if (
      firstElement[0] !== "<" &&
      lastElement[lastElement.length - 1] !== ">"
    ) {
      returnMap.set(firstElement.replace(extractTag, "") + "_TEXT", "text");
    }

    // case 4: 단일 태그인 경우
    if (
      firstElement[0] === "<" &&
      lastElement[lastElement.length - 1] === ">" &&
      lastElement[lastElement.length - 2] === "/"
    ) {
      returnMap.set(firstElement.replace(extractTag, "") + "_SINGLE", "/");
    }
  });

  // console.log(returnMap);
  return returnMap;
}

exports.mission01Tokenizer = mission01Tokenizer;
