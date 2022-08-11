import * as fs from "fs";

const dropTable = (input) => {
  try {
    let tableName = checkFormat(input);
    const path = `./${tableName}.csv`;
    throwNotExistingFileError(path);
    fs.unlinkSync(path);
    console.log(`${tableName}이(가) 삭제되었습니다.`);
  } catch (err) {
    console.log(err.message);
  }
};

const throwNotExistingFileError = (path) => {
  if (!fs.existsSync(path))
    throw new Error("존재하지 않는 테이블입니다. 테이블명을 확인해주세요.");
};

const checkFormat = (input) => {
  const format = /DROP TABLE [a-zA-Z0-9_]+/g;

  if (!format.test(input)) {
    throw new Error("옳지 않은 형식");
  } else {
    return input.split(" ")[2];
  }
};
export { dropTable };
