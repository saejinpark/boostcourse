import * as fs from "fs";

const insertInto = (input) => {
  try {
    checkFormat(input);
    let [tableName, columns, values] = trimString(input);
    checkCnt(columns, values);
    const path = `./${tableName}.csv`;
    throwNotExistingFileError(path);
    let content = fs.readFileSync(path, "utf-8");
    let id = getId(content);
    let data = id + "," + values.reduce((acc, curr, idx) => `${acc},${curr}`);
    fs.appendFileSync(path, "\r\n" + data, "utf-8");
    console.log(`\r\nINSERTED (${data})`);
  } catch (err) {
    console.log(err.message);
  }
};

const checkFormat = (input) => {
  const format =
    /^INSERT INTO [a-zA-Z0-9]+ \((:?[a-zA-Z0-9_]+(:?, )*)+\) VALUES \((:?"*[A-Za-z0-9 ]+"*(:?, )*)+\)/g;
  if (!format.test(input)) throw new Error("옳지 않은 형식");
};

const trimString = (input) => {
  const splitted = input.split("(");
  const tableName = splitted[0].split(" ")[2].trim();
  let columns = splitted[1]
    .split(") VALUES")[0]
    .split(",")
    .map((ele) => {
      return ele.trim();
    });
  const values = splitted[2]
    .replaceAll(")", "")
    .split(",")
    .map((ele) => {
      return ele.replaceAll('"', "").trim();
    });
  return [tableName, columns, values];
};

const checkCnt = (columns, values) => {
  if (columns.length !== values.length) {
    throw new Error("컬럼 갯수가 일치하지 않습니다.");
  }
};

const throwNotExistingFileError = (path) => {
  if (!fs.existsSync(path))
    throw new Error("존재하지 않는 테이블입니다. 테이블명을 확인해주세요.");
};

const getId = (content) => {
  content = content.split("\r\n");
  let divder = "-----------";
  let aboveLine = content.at(-1);
  if (aboveLine === divder) return "1";
  return parseInt(aboveLine.split(",").at(0)) + 1;
};
export { insertInto };
