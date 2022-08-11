import * as fs from "fs";

const deleteFrom = (input) => {
  try {
    checkFormat(input);
    let [tableName, column, value] = trimInput(input);
    const path = `./${tableName}.csv`;
    let data = fs.readFileSync(path, "utf-8").split("\r\n");
    let columnIdx = getColIdx(data, column);
    let deleted = [];
    let header = data.splice(0, 2);

    data = data.filter((row) => {
      if (row.split(",")[columnIdx] === value) {
        deleted.push(row);
      } else return row;
    });
    noDeletedError(deleted);
    deleted = deleted.reduce((acc, curr) => `(${acc}), (${curr})`);
    console.log(`DELETED ${deleted}`);
    data = header.concat(data);
    fs.writeFileSync(path, data.join("\r\n"), "utf-8");
  } catch (err) {
    console.log(err.message);
  }
};

const noDeletedError = (arr) => {
  if (Array.isArray(arr) && arr.length === 0) {
    throw new Error("조건에 맞는 데이터가 존재하지 않습니다.");
  }
};

const checkFormat = (input) => {
  const format =
    /DELETE FROM ([a-z_A-Z0-9]+) WHERE ([a-z_A-Z0-9]+) = ("*[a-z_A-Z0-9]+)"*/g;
  if (!format.test(input)) throw new Error("옳지 않은 형식");
};

const trimInput = (input) => {
  input = input.split(" ");
  let tableName = input[2];
  let column = input[4];
  let value = input[6].replaceAll('"', "");
  return [tableName, column, value];
};

const getColIdx = (data, column) => {
  let columnIdx = data[0].split(",").indexOf(column);
  if (columnIdx > -1) return columnIdx;
  throw new Error("존재하지 않는 칼럼");
};
// deleteFrom("DELETE FROM billboard WHERE id = 1");
export { deleteFrom };
