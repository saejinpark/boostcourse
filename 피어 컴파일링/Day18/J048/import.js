import * as fs from "fs";

const importFrom = (input) => {
  try {
    let [from, to] = checkFormat(input);
    let fromPath = `${from}.csv`;
    let toPath = `${to}.csv`;
    throwNotExistingFileError(fromPath);
    throwNotExistingFileError(toPath);
    let fromData = getData(fromPath);
    let toData = getData(toPath);
    throwColCntDiffError(fromData.at(0), toData.at(0));
    let [filterdData, filteredIdx] = filterExistingData(fromData, toData);

    fs.appendFileSync(toPath, "\r\n" + filterdData.join("\r\n"));
    display(fromData, filteredIdx);
  } catch (err) {
    console.log(err.message);
  }
};

const checkFormat = (input) => {
  const format = /IMPORT FROM ([a-zA-Z0-9_]+) TO ([a-zA-Z0-9_]+)/;
  if (!format.test(input)) throw new Error("옳지 않은 형식");
  let [, from, to] = input.match(format);
  return [from, to];
};

const throwNotExistingFileError = (path) => {
  if (!fs.existsSync(path))
    throw new Error("존재하지 않는 테이블입니다. 테이블명을 확인해주세요.");
};

const getData = (path) => {
  let data = fs.readFileSync(path, "utf-8");
  return data.split("\r\n");
};

const throwColCntDiffError = (from, to) => {
  if (from.split(",").length !== to.split(",").length) {
    throw new Error("칼럼 개수가 일치하지 않습니다.");
  }
};

const trimId = (data) => {
  return data.map((row) => row.split(",").slice(1).join(","));
};

const filterExistingData = (fromData, toData) => {
  let trimmedFrom = trimId(fromData.slice(2));
  let trimmedTo = trimId(toData.slice(2));
  let id = getLastId(toData.slice(2)) + 1;
  let temp = [];
  let originalIdx = [];
  trimmedFrom.forEach((record) => {
    if (trimmedTo.indexOf(record) === -1) {
      temp.push(id++ + "," + record);
      originalIdx.push(trimmedFrom.indexOf(record));
    }
  });
  if (Array.isArray(temp) && temp.length === 0) {
    throw new Error("모든 항목이 이미 존재합니다.");
  }
  return [temp, originalIdx];
};

const getLastId = (data) => {
  let lastIdx = 0;
  for (let i = 0; i < data.length; i++) {
    let record = data[i];
    let idx = parseInt(record.split(",")[0]);
    if (idx > lastIdx) {
      lastIdx = idx;
    }
  }
  return lastIdx;
};

const display = (data, ids) => {
  console.log(`IMPORT COUNT = ${ids.length}`);
  ids.forEach((id) => {
    let record = data[id + 2];
    record = addDoubleQoute(record);
    console.log("( " + record + " )");
  });
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
export { importFrom };
