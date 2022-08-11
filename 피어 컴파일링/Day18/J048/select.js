import * as fs from "fs";

const selectFrom = (input) => {
  let selected = runSelectCommand(input);
  displaySelected(selected);
};

const runSelectCommand = (input) => {
  try {
    let [tableName, conditionCol, operator, condition] = checkFormat(input);
    const path = `./${tableName}.csv`;
    let data = fs.readFileSync(path, "utf-8").split("\r\n");
    let colIdx = findCol(data[0], conditionCol);
    let selected = searchData(data.slice(2), colIdx, operator, condition);
    noSelectedError(selected);
    return selected;
  } catch (err) {
    console.log(err.message);
  }
};

const checkFormat = (input) => {
  const format =
    /SELECT FROM ([a-zA-Z0-9_]+) WHERE ([a-zA-Z0-9_]+)([=><])"*([a-zA-Z0-9_]+)"*/;
  if (!format.test(input)) throw new Error("옳지 않은 형식");
  let [, tableName, conditionCol, operator, condition] = input.match(format);

  return [tableName, conditionCol, operator, condition];
};

const findCol = (row, conditionCol) => {
  let colIdx = row.split(",").indexOf(conditionCol);
  if (colIdx > -1) return colIdx;
  throw new Error("조건에 맞는 칼럼이 존재하지 않습니다.");
};

const searchData = (data, colIdx, operator, condition) => {
  let selected = [];
  for (let i = 0; i < data.length; i++) {
    let row = data[i].split(",");
    if (isNaN(row[colIdx]) && operator !== "=") {
      throw new Error("잘못된 비교 연산자");
    }
    useOperator(operator, row[colIdx], condition)
      ? selected.push(addDoubleQoute(row).join(","))
      : null;
  }
  return selected;
};

const useOperator = (operator, target, condition) => {
  if (operator === "=") return target === condition;
  else if (operator === ">") return target > condition;
  else if (operator === ">") return target < condition;
};

const addDoubleQoute = (row) => {
  return row.map((ele) => {
    if (isNaN(ele)) {
      ele = '"' + ele + '"';
    }
    return ele;
  });
};

const noSelectedError = (arr) => {
  if (Array.isArray(arr) && arr.length === 0)
    throw new Error("조건에 맞는 레코드가 없습니다.");
};

const displaySelected = (selected) => {
  console.log(`SELECTED COUNT = ${selected.length}`);
  selected.forEach((row) => console.log(`( ${row} )`));
};

export { selectFrom, runSelectCommand };
