import fs from "fs";
import helperCommands from "./helper.js";
import validator from "./validator.js";

/**
 *  예외 상황
 * 파일이 존재하지 않는 경우 v
 * 타입이 맞지 않는 경우 v
 */

const _exportTo = (cmd) => {
  try {
    const toTableName = cmd.replace(
      /([Ee][Xx][Pp][Oo][Rr][Tt]\s[Tt][Oo]\s)|(\s[Ff][Rr][Oo][Mm].*)/g,
      ""
    );

    const fromTableName = cmd.replace(
      /(.*[Ff][Rr][Oo][Mm]\s)|(\s[Ww][Hh][Ee][Rr][Ee].*)/g,
      ""
    );

    const [targetKey, targetValue] = cmd
      .replace(/.*[Ww][Hh][Ee][Rr][Ee]\s/g, "")
      .split(/\s?\=\s?/g);

    const fromFilename = helperCommands.getFilename(fromTableName);
    const fromFileContent = helperCommands.readFile(fromFilename);
    const fromParsedData = helperCommands.parseRows(fromFileContent);
    const fromMetaDataName = helperCommands.getMetaDataName(fromTableName);
    const fromMetaData = helperCommands.readMetaData(fromMetaDataName);

    validator.isExist(fromFilename, fromTableName);
    validator.checkType(fromMetaData, targetKey, targetValue);

    const targets = [];

    fromParsedData.forEach((v, i) => {
      if (v[targetKey] === targetValue) {
        targets.push(Object.values(v));
      }
    });

    const columns = Object.keys(fromMetaData);
    const toFilename = helperCommands.getFilename(toTableName);
    const toMetaDataName = helperCommands.getMetaDataName(toTableName);
    const rows =
      columns.join(",") +
      "\n" +
      "=".repeat(30) +
      targets.map((v) => `\n${v}`).join();

    if (targets.length !== 0) {
      fs.writeFileSync(toFilename, rows, (err) => {
        if (err) throw new Error(err);
      });
      fs.writeFileSync(toMetaDataName, JSON.stringify(fromMetaData));

      console.log(`EXPORT COUNT = ${targets.length}`);
      for (let row of targets) {
        console.log(`(${row})`);
      }
    }
  } catch (error) {
    console.error(`❌${error}`);
  }
};

export default _exportTo;
