import fs from "fs";
import helperCommands from "./helper.js";
import validator from "./validator.js";

/**
 * 예외 상황
 * 파일 없는 경우 에러 v
 * 기존의 column과 맞지 않으면 에러 v
 * column의 수와 value의 수 맞지 않으면 에러 v
 * 정의된 타입과 다르면 에러 v
 */

const _insertInto = (cmd) => {
  try {
    const tableName = cmd.replace(
      /([Ii][Nn][Ss][Ee][Rr][Tt]\s[Ii][Nn][Tt][Oo]\s)|(\s\(.+\))/g,
      ""
    );

    const filename = helperCommands.getFilename(tableName);
    const fileContent = helperCommands.readFile(filename);
    const metaDataName = helperCommands.getMetaDataName(tableName);
    const metaData = helperCommands.readMetaData(metaDataName);

    validator.isExist(filename, tableName);

    const columnRow = fileContent[0].split(",");
    const id = fileContent.length - 1;

    const [columns, values] = cmd
      .match(/\((.*?)\)/g)
      .map((v) => v.split(/[\(\)(\,\s?)]/g))
      .map((arr) => arr.filter((m) => m !== ""));

    const rowString = [id].concat(values).join(",");

    if (JSON.stringify(columnRow.slice(1)) !== JSON.stringify(columns)) {
      throw new Error("정의된 칼럼과 맞지 않습니다.");
    } else if (columns.length !== values.length) {
      throw new Error("칼럼의 수와 값의 수가 맞지 않습니다.");
    }
    for (let i = 0; i < columns.length; i++) {
      const targetKey = columns[i];
      const targetValue = values[i];
      validator.checkType(metaData, targetKey, targetValue);
    }

    fs.appendFileSync(filename, `\n${rowString}`, (err) => {
      if (err) throw new Error(err);
    });

    console.log(`INSERTED: (${rowString})`);
  } catch (error) {
    console.error(`❌${error}`);
  }
};

export default _insertInto;
