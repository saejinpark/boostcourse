import * as fs from "fs";

// datatype - numeric(-), string(+) / unique - u

const checkFormat = (input) => {
  const format =
    /^CREATE TABLE [a-zA-Z0-9]+ \((:?[a-zA-Z0-9_]+ (:?String|Numeric)(:?, )*)+\)/g;
  if (!format.test(input)) throw new Error("옳지 않은 형식");
};

const trimString = (input) => {
  const splitted = input.split("(");
  const tableName = splitted[0].split(" ")[2].trim();
  let columns = splitted[1].replaceAll(")", "").split(",");
  return [
    tableName,
    columns.map((ele) => {
      return ele.trim().split(" ");
    }),
  ];
};
// CREATE TABLE billboard2 (singer String, year Numeric, song String, singer String, year Numeric, song String, singer String, year Numeric, song String)
const makeColumnHeader = (columns) => {
  if (columns.length > 8)
    throw new Error("칼럼은 1개부터 9개까지만 가능합니다(id 포함)");
  let id = "id,";
  columns = columns.reduce((acc, curr, idx) => {
    acc = idx === 1 ? acc[0] : acc;
    curr = curr[0];
    return `${acc},${curr}`;
  });
  return id + columns;
};

const throwExistingFileError = (path) => {
  if (fs.existsSync(path)) throw new Error("이미 파일이 존재합니다.");
};
// type 근데 안 넣는 게 맞을듯...?메타 데이터 넣을 곳이 없다고 한다.
const createTable = (input) => {
  try {
    checkFormat(input);
    let [tableName, columns] = trimString(input);
    let columnHeader = makeColumnHeader(columns);
    let divder = "-----------";
    const path = `./${tableName}.csv`;
    throwExistingFileError(path);
    fs.writeFileSync(path, `${columnHeader}\r\n${divder}`);
    console.log(`${tableName}.csv 이(가) 생성되었습니다.`);
  } catch (err) {
    console.log(err.message);
  }
};

export { createTable };
