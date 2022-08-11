import fs from "fs";
import helperCommands from "./helper.js";
import validator from "./validator.js";

/**
 * 예외 처리
 * 파일 없는 경우 v
 * 해당 column 없는 경우 v
 * column에 맞지 않는 value를 찾는 경우 ex) id에 문자열이 들어온 경우 v
 */

const _deleteFrom = (cmd) => {
  try {
    const tableName = cmd.replace(
      /([Dd][Ee][Ll][Ee][Tt][Ee]\s[Ff][Rr][Oo][Mm]\s)|(\s[Ww][Hh][Ee][Rr][Ee].*)/g,
      ""
    );

    const [targetKey, targetValue] = cmd
      .replace(/.*[Ww][Hh][Ee][Rr][Ee]\s/g, "")
      .split(/\s?\=\s?/g);

    const filename = helperCommands.getFilename(tableName);
    const fileContent = helperCommands.readFile(filename);
    const parsedData = helperCommands.parseRows(fileContent);
    const metaDataName = helperCommands.getMetaDataName(tableName);
    const metaData = helperCommands.readMetaData(metaDataName);

    validator.isExist(filename, tableName);
    validator.hasColumn(metaData, targetKey);
    validator.checkType(metaData, targetKey, targetValue);

    const newValues = [];
    const output = [];

    parsedData.forEach((row) => {
      if (row[targetKey] !== targetValue) {
        newValues.push("\n" + Object.values(row).join(","));
      } else {
        output.push(`(${Object.values(row).join(",")})`);
      }
    });

    const newContent = fileContent.slice(0, 2).join("\n") + newValues.join();

    fs.writeFileSync(filename, newContent, (err) => {
      if (err) throw new Error(err);
    });

    console.log(`DELETED: ${output}`);
  } catch (error) {
    console.error(`❌${error}`);
  }
};

export default _deleteFrom;
