import fs from "fs";
import helperCommands from "./helper.js";
import validator from "./validator.js";

/**
 * 예외 상황
 * 파일이 이미 존재하는 경우 v
 * id 칼럼을 입력한 경우 v
 */

const _createTable = (cmd) => {
  try {
    const tableName = cmd.replace(
      /([Cc][Rr][Ee][Aa][Tt][Ee]\s[Tt][Aa][Bb][Ll][Ee]\s)|(\s\(.+\))/g,
      ""
    );

    const filename = helperCommands.getFilename(tableName);

    validator.isNotExist(filename, tableName);

    const colAndTypes = { id: "Numeric" };
    cmd
      .replace(/(.+\()|(\))/g, "")
      .split(/(\,\s?)/g)
      .filter((v) => !v.includes(","))
      .forEach((v) => {
        const [columnName, type] = v.split(" ");
        colAndTypes[columnName] = type;
      });

    const columns = ["id"];
    let flag = true;
    for (const [columnName, type] of Object.entries(colAndTypes)) {
      if (flag) {
        flag = false;
        continue;
      }
      if (columnName === "id") {
        throw new Error(`Can't contain "id" column`);
      } else {
        columns.push(columnName);
      }
    }

    const rows = columns.join(",") + "\n" + "=".repeat(30);

    fs.writeFileSync(filename, rows, (err) => {
      if (err) throw new Error(err);
    });

    const metaDataName = helperCommands.getMetaDataName(tableName);
    fs.writeFileSync(metaDataName, JSON.stringify(colAndTypes));
  } catch (error) {
    console.error(`❌${error}`);
  }
};

export default _createTable;
