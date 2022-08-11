import * as fs from "fs";

const reportTable = (input) => {
  try {
    const tableName = checkFormat(input);
    const path = `./${tableName}.csv`;
    throwNotExistingFileError(path);
    let data = fs.readFileSync(path, "utf-8").split("\r\n");
    makeReport(data);
  } catch (err) {
    console.log(err.message);
  }
};

const checkFormat = (input) => {
  const format = /REPORT TABLE ([a-zA-Z0-9_]+)/;
  if (!format.test(input)) throw new Error("옳지 않은 형식");
  let [, tableName] = input.match(format);
  return tableName;
};

const throwNotExistingFileError = (path) => {
  if (!fs.existsSync(path))
    throw new Error("존재하지 않는 테이블입니다. 테이블명을 확인해주세요.");
};

const makeReport = (data) => {
  let columns = data[0]
    .split(",")
    .slice(1)
    .reduce((acc, curr) => `${acc}, ${curr}`);
  let totalRecords = data.slice(2).length;
  // if (!totalRecords) {
  //   let firstRecord = "레코드가 존재하지 않습니다";
  //   let lastRecord = "레코드가 존재하지 않습니다";
  // } else {
  let [firstRecord, lastRecord] = getLastAndFirstRecord(
    data.slice(2),
    totalRecords
  );
  // }
  displayReport(columns, totalRecords, firstRecord, lastRecord);
};

const getLastAndFirstRecord = (data, cnt) => {
  let firstDataIdx = 0;
  let firstIdx = 0;
  let lastDataIdx = 0;
  let lastIdx = 0;
  for (let i = 0; i < cnt; i++) {
    let record = data[i];
    let idx = parseInt(record.split(",")[0]);
    if (idx > lastIdx) {
      lastIdx = idx;
      lastDataIdx = i;
    }
    if (idx < firstIdx) {
      firstIdx = idx;
      firstDataIdx = i;
    }
  }
  return [
    addDoubleQoute(data[firstDataIdx]),
    addDoubleQoute(data[lastDataIdx]),
  ];
};

const addDoubleQoute = (row) => {
  row = row.split(",");
  return row
    .map((ele) => {
      if (isNaN(ele)) {
        ele = '"' + ele + '"';
      }
      return ele;
    })
    .join(", ");
};

const displayReport = (columns, totalRecords, firstRecord, lastRecord) => {
  console.log();
  console.log(`컬럼 종류 : ${columns}`);
  console.log(`전체 레코드 수: ${totalRecords}개`);
  console.log(`최초 레코드 : (${firstRecord})`);
  console.log(`마지막 레코드 : (${lastRecord})`);
};

export { reportTable };
