import helperCommands from "./helper.js";
import validator from "./validator.js";

/**
 * 에러 상황
 * 파일이 없는 경우 v
 * 칼럼이 없는 경우 v
 */

const _selectFrom = (cmd) => {
  try {
    const tableName = cmd.replace(
      /([Ss][Ee][Ll][Ee][Cc][Tt]\s[Ff][Rr][Oo][Mm]\s)|(\s[Ws][Hh][Ee][Rr][Ee].*)/g,
      ""
    );

    const [targetKey, targetValue] = cmd
      .replace(/(.*[Ww][Hh][Ee][Rr][Ee]\s)/g, "")
      .split(/\s?\=\s?/g);

    const filename = helperCommands.getFilename(tableName);
    const fileContent = helperCommands.readFile(filename);
    const parsedData = helperCommands.parseRows(fileContent);
    const metaDataName = helperCommands.getMetaDataName(tableName);
    const metaData = helperCommands.readMetaData(metaDataName);

    validator.isExist(filename, tableName);
    validator.hasColumn(metaData, targetKey);

    const targets = [];

    parsedData.forEach((v, i) => {
      if (v[targetKey] === targetValue) {
        targets.push(`\n(${Object.values(v)})`);
      }
    });

    if (targets.length === 0) {
      throw new Error("해당 칼");
    }

    const output = `SELECTED COUNT = ${targets.length}` + targets;

    console.log(output);
  } catch (error) {
    console.error(`❌${error}`);
  }
};

export default _selectFrom;
