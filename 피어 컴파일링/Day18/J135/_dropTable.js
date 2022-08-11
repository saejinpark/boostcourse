import fs from "fs";
import helperCommands from "./helper.js";
import validator from "./validator.js";

/**
 * 예외 상황
 * 파일이 이미 없는 경우 v
 */

const _dropTable = (cmd) => {
  try {
    const tableName = cmd.replace(
      /([Dd][Rr][Oo][Pp]\s[Tt][Aa][Bb][Ll][Ee])\s/g,
      ""
    );

    const filename = helperCommands.getFilename(tableName);

    validator.isExist(filename, tableName);

    fs.unlinkSync(filename, (err) => {
      if (err) throw new Error(err);
    });
  } catch (error) {
    console.error(`❌${error}`);
  }
};

export default _dropTable;
