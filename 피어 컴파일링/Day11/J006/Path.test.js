import Path from "./Path.js";

const testPath = new Path("/home/user/boost/camp/challenge/day17/problem.md");
const testPath2 = new Path("C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md");
test("Path 생성 ", () => {
  expect(testPath.components).toEqual(["/", "home", "user", "boost", "camp", "challenge", "day17", "problem.md"]);
  expect(testPath2.components).toEqual(["C:\\", "home", "user", "boost", "camp", "challenge", "day17", "problem.md"]);
});

test("relative 오류 체크", () => {
  try {
    testPath.relative("C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md");
  } catch (e) {
    (e) => {
      expect(e).toBe("두 링크의 OS가 동일 하지 않습니다.");
    };
  }
});

test("unix append 작동 ", () => {
  const appendPath = new Path("/home/user/boost/camp/challenge/day17/problem.md");
  appendPath.appendComponent("test");
  expect(appendPath.absoluteString).toBe("/home/user/boost/camp/challenge/day17/test/problem.md");
});
test("window append 작동 ", () => {
  const appendPath = new Path("C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md");
  appendPath.appendComponent("test");
  expect(appendPath.absoluteString).toBe("C:\\home\\user\\boost\\camp\\challenge\\day17\\test\\problem.md");
});
test("unix delete 작동", () => {
  const deletePath = new Path("/home/user/boost/camp/challenge/day17/problem.md");
  deletePath.deleteLastComponent();
  expect(deletePath.absoluteString).toBe("/home/user/boost/camp/challenge/problem.md");
});
test("window delete 작동", () => {
  const deletePath = new Path("C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md");
  deletePath.deleteLastComponent();
  expect(deletePath.absoluteString).toBe("C:\\home\\user\\boost\\camp\\challenge\\problem.md");
});

test("absoluteString 값 바꿔보고 오류나는지 체크 ", () => {
  try {
    unixPath.absoluteString = "abcd";
  } catch (e) {
    expect(e).toBeInstanceOf(ReferenceError);
  }
});
test("pathcomponents 값 바꿔보고 오류나는지 체크 ", () => {
  try {
    unixPath.pathcomponents.push("test");
  } catch (e) {
    expect(e).toBeInstanceOf(ReferenceError);
  }
});
