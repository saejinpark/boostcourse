import fs from "fs";
import helperCommands from "./helper.js";
import validator from "./validator.js";

/**
 * 예외 상황
 * 파일 둘 중에 하나라도 없는 경우
 */

const _importFrom = (cmd) => {
  try {
    const fromTableName = cmd.replace(
      /([Ii][Mm][Pp][Oo][Rr][Tt]\s[Ff][Rr][Oo][Mm]\s)|(\s[Tt][Oo].*)/g,
      ""
    );

    const toTableName = cmd.replace(/(.*[Tt][Oo]\s)/g, "");

    const fromFilename = helperCommands.getFilename(fromTableName);
    const fromFileContent = helperCommands.readFile(fromFilename);
    const fromParsedData = helperCommands.parseRows(fromFileContent);
    const fromMetaDataName = helperCommands.getMetaDataName(fromTableName);
    const fromMetaData = helperCommands.readMetaData(fromMetaDataName);

    validator.isExist(fromFilename, fromTableName);

    const toFilename = helperCommands.getFilename(toTableName);
    const toFileContent = helperCommands.readFile(toFilename);
    const toParsedData = helperCommands.parseRows(toFileContent);
    const toMetaDataName = helperCommands.getMetaDataName(toTableName);
    const toMetaData = helperCommands.readMetaData(toMetaDataName);

    validator.isExist(toFilename, toTableName);

    if (JSON.stringify(fromMetaData) !== JSON.stringify(toMetaData)) {
      throw new Error("칼럼이 일치하지 않습니다.");
    }

    const targets = [];

    for (let fromObj of fromParsedData) {
      let flag = true;
      const { id, ...fromRest } = fromObj;
      const fromRow = JSON.stringify(fromRest);
      for (let toObj of toParsedData) {
        const { id, ...toRest } = toObj;
        const toRow = JSON.stringify(toRest);
        if (fromRow === toRow) {
          flag = false;
          break;
        }
      }
      if (flag) targets.push(fromRest);
    }

    let lastId = toParsedData.at(-1)["id"];

    for (let i = 0; i < targets.length; i++) {
      targets[i] = Object.values({ id: ++lastId, ...targets[i] });
    }

    const rows = targets.join("\n");

    fs.appendFileSync(toFilename, `\n${rows}`, (err) => {
      if (err) throw new Error(err);
    });

    console.log(`IMPORT COUNT = ${targets.length}`);
    for (let row of targets) {
      console.log(`(${row})`);
    }
  } catch (error) {
    console.error(`❌${error}`);
  }
};

export default _importFrom;
