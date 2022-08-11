import fs from "fs";
import helperCommands from "./helper.js";
import validator from "./validator.js";

/**
 * 예외 상황
 * 파일 없는 경우 v
 * 조건 키가 없는 경우 v
 * 조건 값이 없는 경우 v
 * 바꿀려는 키가 없는 경우 v
 * 바꿀려는 값 타입이 맞지 않는 경우 v
 */

const _update = (cmd) => {
  try {
    const tableName = cmd.replace(
      /([Ue][Pp][Dd][Aa][Tt][Ee]\s)|(\s[Ss][Ee][Tt].*)/g,
      ""
    );

    const [newKey, newValue] = cmd
      .replace(/(.*[Ss][Ee][Tt]\s)|(\s[Ww][Hh][Ee][Rr][Ee].*)/g, "")
      .split(/\s?\=\s?/g);

    const [targetKey, targetValue] = cmd
      .replace(/(.*[Ww][Hh][Ee][Rr][Ee]\s)/g, "")
      .split(/\s?\=\s?/g);

    const filename = helperCommands.getFilename(tableName);
    const fileContent = helperCommands.readFile(filename);
    const parsedData = helperCommands.parseRows(fileContent);
    const metaDataName = helperCommands.getMetaDataName(tableName);
    const metaData = helperCommands.readMetaData(metaDataName);

    validator.isExist(filename, tableName);
    validator.hasColumn(metaData, newKey);
    validator.hasColumn(metaData, targetKey);
    validator.checkType(metaData, newKey, newValue);

    const updatedData = [];

    const newValues = parsedData.reduce((prev, row, idx) => {
      if (row[targetKey] === targetValue) {
        row[newKey] = newValue;
        updatedData.push(`(${Object.values(row)})`);
      }
      const rowString = Object.values(row);
      return [...prev, rowString];
    }, []);

    if (updatedData.length === 0) {
      throw new Error(`"${targetKey} = ${targetValue}"인 레코드가 없습니다.`);
    }

    const newContent =
      fileContent.slice(0, 2).join("\n") +
      newValues.map((v) => `\n${v}`).join();

    fs.writeFileSync(filename, newContent, (err) => {
      if (err) throw new Error(err);
    });

    console.log(`UPDATED: ${updatedData}`);
  } catch (error) {
    console.error(`❌${error}`);
  }
};

export default _update;
