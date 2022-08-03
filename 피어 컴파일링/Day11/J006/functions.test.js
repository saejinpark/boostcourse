import { checkRelative, unixPathTest, windowPathTest } from "./functions.js";
import Path from "./Path.js";

const unixPath = new Path("/home/user/boost/camp/challenge/day17/problem.md");
const windowPath = new Path("C:\\home\\user\\bost\\camp\\challenge\\day17\\problem.md");
const unixErrPath = "/home/user/boost/ca//mp/challenge/day17/problem.md";
const windowErrPath = "C:\\home\\user\\bo*st\\camp\\challenge\\day17\\problem.md";
test("Path 예외처리 테스트", () => {
  try {
    unixPathTest(unixErrPath);
  } catch (e) {
    (e) => expect(e).toBe("올바르지 않은 경로표현입니다.");
  }
  try {
    windowPathTest(windowErrPath);
  } catch (e) {
    (e) => expect(e).toBe("올바르지 않은 경로표현입니다.");
  }
});
test("checkRelative 테스트", () => {
  expect(
    checkRelative(
      unixPath.pathComponents,
      new Path("/home/user/boost/camp/challenge/test/day11/problem.md").pathComponents,
      "UNIX"
    )
  ).toBe("../../test/day11/problem.md");
});
