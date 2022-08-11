import * as readline from "readline";
import { createTable } from "./create.js";
import { insertInto } from "./insert.js";
import { deleteFrom } from "./delete.js";
import { update } from "./update.js";
import { dropTable } from "./drop.js";
import { selectFrom } from "./select.js";
import { exportTo } from "./export.js";
import { importFrom } from "./import.js";
import { reportTable } from "./report.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const noCommandError = () => {
  throw new Error(
    "올바른 명령어(CREATE TABLE, INSERT INTO, DROP TABLE, DELETE FROM, SELECT FROM, UPDATE)를 입력하시오."
  );
};

const commandLine = (input) => {
  let splitted = input.split(" ");

  if (splitted[0] === "UPDATE") {
    update(input);
  } else {
    const command = splitted[0] + " " + splitted[1];
    try {
      switch (command) {
        case "CREATE TABLE":
          createTable(input);
          break;
        case "INSERT INTO":
          insertInto(input);
          break;
        case "DROP TABLE":
          dropTable(input);
          break;
        case "DELETE FROM":
          deleteFrom(input);
          break;
        case "SELECT FROM":
          selectFrom(input);
          break;
        case "REPORT TABLE":
          reportTable(input);
          break;
        case "EXPORT TO":
          exportTo(input);
          break;
        case "IMPORT FROM":
          importFrom(input);
          break;
        default:
          noCommandError();
      }
    } catch (err) {
      console.log(err.message);
    }
  }
};

rl.on("line", (input) => {
  try {
    commandLine(input);
  } catch (err) {
    console.log(err.message);
  }
});
