function mission01Parser(arr) {
  const finalReturnObj = {};
  const PARSER_STACK = [[]];
  let stackPointer = 0;
  let currentObject = finalReturnObj;

  arr.forEach((el) => {
    // 1. 열린 태그인 경우 현재 객체에 entries를 넣는다.
    // 2. 완성된 객체는 현재 스택의 stackPointer 위치에 push한다.
    // 3. currentObject를 children 내부의 첫 번째 인덱스에 들어있는 객체로 교체한다.
    // 4. stackPointer를 1 증가시키고, stackPointer에 배열이 없으면 빈 배열을 생성한다.
    if (el.type === "opentag") {
      currentObject.element = el.element;
      currentObject.attributes = el.attributes;
      currentObject.children = [{}];
      PARSER_STACK[stackPointer].push(currentObject);

      currentObject = currentObject.children[0];
      stackPointer++;
      if (!PARSER_STACK[stackPointer]) PARSER_STACK[stackPointer] = [];
    }

    // 1. 닫힌 태그의 경우에는 스택 포인터를 1 감소시킨다.
    if (el.type === "closetag") {
      stackPointer--;
    }

    // 1. 단일 태그의 경우에는 현재 stackPointer에 새 객체를 push한다.
    // 2. stackPointer 인덱스는 변하지 않는다.
    if (el.type === "singletag") {
      PARSER_STACK[stackPointer].push({
        element: el.element,
        attributes: el.attributes,
      });
    }

    // 1. text인 경우에는 children이 아니라 children의 parent에 접근해야 한다.
    // 2. 1 감소시킨 뒤, 배열의 가장 마지막 객체의 text 프로퍼티의 값을 넣는다.
    // 3. 다시 스택 포인터를 1 증가시킨다.
    if (el.text) {
      stackPointer--;
      const lastElIdx = PARSER_STACK[stackPointer].length - 1;
      PARSER_STACK[stackPointer][lastElIdx].text = el.text;
      stackPointer++;
    }
  });

  return [finalReturnObj, PARSER_STACK];
}

exports.mission01Parser = mission01Parser;
