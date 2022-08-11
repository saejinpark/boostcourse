import * as fs from "fs";
import { runSelectCommand } from "./select.js";

const exportTo = (input) => {
  try {
    let [to, from, conditionCol, condition] = checkFormat(input);
    let selectCommand = makeCommand(from, conditionCol, condition);
    let selected = runSelectCommand(selectCommand);
    let header = getHeader(from);
    if (selected) {
      selected = replaceDoubleQuote(selected);
      exportToFile(`./${to}.csv`, header, selected);
    }
  } catch (err) {
    console.log(err.message);
  }
};

const getHeader = (from) => {
  const path = `./${from}.csv`;
  return fs.readFileSync(path, "utf-8").split("\r\n").slice(0, 2);
};

const exportToFile = (to, header, selected) => {
  try {
    let noIdSelected = trimId(selected);
    let newIdSelected = giveNewId(noIdSelected);
    let data = header.concat(newIdSelected);
    fs.writeFileSync(to, data.join("\r\n"));
    display(newIdSelected);
  } catch (err) {
    console.log(err.message);
  }
};

const giveNewId = (data) => {
  let idx = 1;
  return data.map((record) => {
    return `${idx++},${record}`;
  });
};
const trimId = (data) => {
  return data.map((row) => row.split(",").slice(1).join(","));
};

const replaceDoubleQuote = (data) => {
  return data.map((ele) => ele.replaceAll('"', ""));
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

export { exportTo };
