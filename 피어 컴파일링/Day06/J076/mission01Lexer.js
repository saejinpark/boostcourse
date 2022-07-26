const XML_TYPE_OBJ = {
  OPEN: "opentag",
  END: "closetag",
  TEXT: "text",
  SINGLE: "singletag",
};

function mission01Lexer(map) {
  return convertMapIntoObjArray(map);
}

function convertMapIntoObjArray(map) {
  const typeObjectArray = clarifyTypeAndElement(map);
  const attrNameValueArray = classifyAttrNameValue(typeObjectArray, map);
  return attrNameValueArray;
}

// clarifyTypeAndElement: 객체의 type과 element 속성을 정함
function clarifyTypeAndElement(map) {
  const arr = [];
  const keys = Array.from(map.keys());
  keys.forEach((el) => {
    const splitEl = el.split("_");
    if (splitEl[1] !== "TEXT") {
      arr.push({
        type: XML_TYPE_OBJ[splitEl[1]],
        element: splitEl[0],
      });
    }
    if (splitEl[1] === "TEXT") {
      arr.push({
        text: splitEl[0],
      });
    }
  });

  return arr;
}

// classifyAttrNameValue: attribute는 여러 개의 key/value 객체로 이루어져 있다.
// 이를 객체 내부에 집어넣기 위한 함수이다.
function classifyAttrNameValue(typeObjectArray, map) {
  [...map.values()].forEach(function (el, idx) {
    if (el.length >= 2 && !typeObjectArray[idx].text) {
      const attributes = [];
      typeObjectArray[idx].attributes = attributes;
      for (let i = 0; i < el.length - 1; i += 2) {
        attributes.push({ name: el[i], value: el[i + 1] });
      }
    }
  });

  return typeObjectArray;
}

exports.mission01Lexer = mission01Lexer;
