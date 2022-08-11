import * as fs from "fs";
import { runSelectCommand } from "./select.js";

const exportTo = (input) => {
  try {
    let [from, to, conditionCol, condition] = checkFormat(input);
    let selectCommand = makeCommand(from, conditionCol, condition);
    let selected = runSelectCommand(selectCommand);
    selected = replaceDoubleQuote(selected);
    if (selected) {
      exportToFile(`./${to}.csv`, selected);
    }
  } catch (err) {
    console.log(err.message);
  }
};

const exportToFile = (to, selected) => {
  try {
    let toData = fs.readFileSync(to, "utf-8");
    toData = trimId(toData.split("\r\n").slice(2));
    let noIdSelected = trimId(selected);
    let idxs = checkRecordExist(noIdSelected, toData);
    selected = idxs.map((idx) => selected[idx]);
    fs.appendFileSync(to, "\r\n" + `${selected.join("\r\n")}`);
    display(selected);
  } catch (err) {
    console.log(err.message);
  }
};

const trimId = (data) => {
  return data.map((row) => row.split(",").slice(1).join(","));
};

const replaceDoubleQuote = (data) => {
  return data.map((ele) => ele.replaceAll('"', ""));
};

const checkRecordExist = (selected, toData) => {
  let temp = [];
  selected.forEach((record, idx) => {
    if (toData.indexOf(record) === -1) {
      temp.push(idx);
    }
  });
  if (Array.isArray(temp) && temp.length === 0) {
    throw new Error("이미 모든 레코드가 존재합니다.");
  }
  return temp;
};

const checkFormat = (input) => {
  const format =
    /EXPORT TO ([a-zA-Z0-9_]+) FROM ([a-zA-Z0-9_]+) WHERE ([a-zA-Z0-9_]+) = ([a-zA-Z0-9_]+)/;
  if (!format.test(input)) throw new Error("옳지 않은 형식");
  let [, to, from, conditionCol, condition] = input.match(format);
  return [to, from, conditionCol, condition];
};

const makeCommand = (from, conditionCol, condition) => {
  return `SELECT FROM ${from} WHERE ${conditionCol}=${condition}`;
};

const display = (selected) => {
  console.log(`EXPORT COUNT = ${selected.length}`);
  selected.forEach((record) => {
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

exportTo("EXPORT TO y2021song FROM billboard WHERE year = 2021");
export { exportTo };
