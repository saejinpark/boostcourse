import helperCommands from "./helper.js";
import validator from "./validator.js";

/**
 * 예외 상황
 * 파일이 없는 경우 v
 */

const _reportTable = (cmd) => {
  try {
    const tableName = cmd.replace(
      /([Rr][Ee][Pp][Oo][Rr][Tt]\s[Tt][Aa][Bb][Ll][Ee])\s/g,
      ""
    );

    const filename = helperCommands.getFilename(tableName);
    const fileContent = helperCommands.readFile(filename);
    const parsedData = helperCommands.parseRows(fileContent);
    const metaDataName = helperCommands.getMetaDataName(tableName);
    const metaData = helperCommands.readMetaData(metaDataName);

    validator.isExist(filename);

    console.log(`칼럼 종류 : ${Object.keys(metaData)}`);
    console.log(`전체 레코드 수 : ${parsedData.length}`);
    console.log(`최초 레코드 : (${Object.values(parsedData[0])})`);
    console.log(`마지막 레코드 : (${Object.values(parsedData.at(-1))})`);
  } catch (error) {
    console.error(`❌${error}`);
  }
};

export default _reportTable;
