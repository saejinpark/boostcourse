import UNIX from "./UNIX.js";
import WINDOW from "./WINDOW.js";
export function checkRelative(targetComponents, relativeComponents, style) {
  let resultPath = "";
  let depth = -1;
  while (targetComponents[depth + 1] === relativeComponents[depth + 1]) {
    depth += 1;
  }
  if (style === "UNIX") {
    for (let i = targetComponents.length - 1; i > depth; i--) {
      resultPath += "../";
    }
    resultPath += relativeComponents.slice(depth + 1).join("/");
  } else {
    for (let i = targetComponents.length - 1; i > depth; i--) {
      resultPath += "..\\";
    }
    resultPath += relativeComponents
      .slice(depth + 1)
      .join("\\")
      .replace("\\\\", "\\");
  }
  return resultPath;
}

export function unixPathTest(path) {
  let tempComponents = new UNIX(path).makeComponents();

  // UNIX에서는 /사용할 수 없음 단, 가장 상위 디렉토리 /는 뺄것
  if (tempComponents[0] === "/") {
    tempComponents = tempComponents
      .slice(1)
      .map((el) => {
        // UNIX에서는 /사용할 수 없음 단, 가장 상위 디렉토리 /는 뺄것
        if (el.match(/[\/]/g)) return 1;
      })
      .filter((el) => el === 1);
  } else {
    tempComponents = tempComponents
      .map((el) => {
        if (el.match(/[\/]/g)) return 1;
      })
      .filter((el) => el === 1);
  }
  if (tempComponents.length) {
    throw "올바르지 않은 경로표현입니다.";
  } else return true;
}
export function windowPathTest(path) {
  let tempComponents = new WINDOW(path).makeComponents();

  // UNIX에서는 /사용할 수 없음 단, 가장 상위 디렉토리 /는 뺄것
  if (tempComponents[0].includes(":")) {
    tempComponents = tempComponents
      .slice(1)
      .map((el) => {
        // WINDOW에서는 *|\\:"<>?\/사용할 수 없음 단, 가장 상위 디렉토리는 뺄것
        if (el.match(/[*|\\:"<>?/]/)) return 1;
      })
      .filter((el) => el === 1);
  } else {
    tempComponents = tempComponents
      .map((el) => {
        // WINDOW에서는 *|\\:"<>?\/사용할 수 없음 단, 가장 상위 디렉토리는 뺄것
        if (el.match(/[*|\\:"<>?/]/)) return 1;
      })
      .filter((el) => el === 1);
  }
  if (tempComponents.length) {
    throw "올바르지 않은 경로표현입니다.";
  }
  return true;
}
