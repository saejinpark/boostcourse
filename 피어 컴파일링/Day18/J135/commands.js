import _createTable from "./_createTable.js";
import _deleteFrom from "./_deleteFrom.js";
import _dropTable from "./_dropTable.js";
import _exportTo from "./_exportTo.js";
import _importFrom from "./_importFrom.js";
import _insertInto from "./_insertInto.js";
import _reportTable from "./_reportTable.js";
import _selectFrom from "./_selectFrom.js";
import _update from "./_update.js";

// const cmdRegex = {
//   createTable: new RegExp(
//     "([Cc][Rr][Ee][Aa][Tt][Ee]\\s[Tt][Aa][Bb][Ll][Ee])\\s([\\w]+)\\s\\((([\\w]+)\\s(Numeric|String)(\\,\\s?)?){1,9}\\)",
//     "g"
//   ),
//   insertIndo: new RegExp(
//     '([Ii][Nn][Ss][Ee][Rr][Tt]\\s[Ii][Nn][Tt][Oo])\\s([\\w]+)\\s\\((([\\w]+)(\\,\\s?)?){1,9}\\)\\s([Vv][Aa][Ll][Uu][Ee][Ss])\\s\\(((\\"?[\\w]+\\"?)(\\,\\s?)?){1,9}\\)',
//     "g"
//   ),
//   deleteFrom: new RegExp(
//     '([Dd][Ee][Ll][Ee][Tt][Ee]\\s[Ff][Rr][Oo][Mm])\\s([\\w]+)\\s([Ww][Hh][Ee][Rr][Ee])\\s([\\w]+\\s?\\=\\s?\\"?[\\w]+\\"?)',
//     "g"
//   ),
//   update: new RegExp(
//     '([Ue][Pp][Dd][Aa][Tt][Ee])\\s([\\w]+)\\s([Ss][Ee][Tt])\\s([\\w]+\\s?\\=\\s?\\"?[\\w]+\\"?)\\s([Ww][Hh][Ee][Rr][Ee])\\s([\\w]+\\s?\\=\\s?\\"?[\\w]+\\"?)',
//     "g"
//   ),
//   selectFrom: new RegExp(
//     '([Ss][Ee][Ll][Ee][Cc][Tt]\\s[Ff][Rr][Oo][Mm])\\s([\\w]+)\\s([Ws][Hh][Ee][Rr][Ee])\\s([\\w]+\\s?\\=\\s?\\"?[\\w]+\\"?)',
//     "g"
//   ),
// };

const cmdRegex = [
  new RegExp(
    "([Cc][Rr][Ee][Aa][Tt][Ee]\\s[Tt][Aa][Bb][Ll][Ee])\\s([\\w]+)\\s\\((([\\w]+)\\s(Numeric|String)(\\,\\s?)?){1,9}\\)",
    "g"
  ),
  new RegExp(
    '([Ii][Nn][Ss][Ee][Rr][Tt]\\s[Ii][Nn][Tt][Oo])\\s([\\w]+)\\s\\((([\\w]+)(\\,\\s?)?){1,9}\\)\\s([Vv][Aa][Ll][Uu][Ee][Ss])\\s\\(((\\"?[\\w]+\\"?)(\\,\\s?)?){1,9}\\)',
    "g"
  ),
  new RegExp(
    '([Dd][Ee][Ll][Ee][Tt][Ee]\\s[Ff][Rr][Oo][Mm])\\s([\\w]+)\\s([Ww][Hh][Ee][Rr][Ee])\\s([\\w]+\\s?\\=\\s?\\"?[\\w]+\\"?)',
    "g"
  ),
  new RegExp(
    '([Ue][Pp][Dd][Aa][Tt][Ee])\\s([\\w]+)\\s([Ss][Ee][Tt])\\s([\\w]+\\s?\\=\\s?\\"?[\\w]+\\"?)\\s([Ww][Hh][Ee][Rr][Ee])\\s([\\w]+\\s?\\=\\s?\\"?[\\w]+\\"?)',
    "g"
  ),
  new RegExp(
    '([Ss][Ee][Ll][Ee][Cc][Tt]\\s[Ff][Rr][Oo][Mm])\\s([\\w]+)\\s([Ws][Hh][Ee][Rr][Ee])\\s([\\w]+\\s?\\=\\s?\\"?[\\w]+\\"?)',
    "g"
  ),
  new RegExp(`([Dd][Rr][Oo][Pp]\\s[Tt][Aa][Bb][Ll][Ee])\\s([\\w]+)`, "g"),
  new RegExp(
    `([Rr][Ee][Pp][Oo][Rr][Tt]\\s[Tt][Aa][Bb][Ll][Ee])\\s([\\w]+)`,
    "g"
  ),
  new RegExp(
    '([Ee][Xx][Pp][Oo][Rr][Tt]\\s[Tt][Oo])\\s[\\w]+\\s([Ff][Rr][Oo][Mm])\\s[\\w]+\\s([Ww][Hh][Ee][Rr][Ee])\\s([\\w]+\\s?\\=\\s?\\"?[\\w]+\\"?)',
    "g"
  ),
  new RegExp(
    `([Ii][Mm][Pp][Oo][Rr][Tt]\\s[Ff][Rr][Oo][Mm])\\s[\\w]+\\s([Tt][Oo])\\s[\\w]+`,
    "g"
  ),
];

const dbmsCommands = {
  run(cmd) {
    try {
      cmdRegex.forEach((regex, i) => {
        if (regex.test(cmd)) {
          switch (i) {
            case 0:
              return this.createTable(cmd);

            case 1:
              return this.insertInto(cmd);

            case 2:
              return this.deleteFrom(cmd);

            case 3:
              return this.update(cmd);

            case 4:
              return this.selectFrom(cmd);

            case 5:
              return this.dropTable(cmd);

            case 6:
              return this.reportTable(cmd);

            case 7:
              return this.exportTo(cmd);

            case 8:
              return this.importFrom(cmd);

            default:
              throw new Error("Invalid Command!");
          }
        }
      });
    } catch (error) {
      console.error(`❌${error}`);
    }
  },
  createTable(cmd) {
    _createTable(cmd);
  },
  insertInto(cmd) {
    _insertInto(cmd);
  },
  deleteFrom(cmd) {
    _deleteFrom(cmd);
  },
  update(cmd) {
    _update(cmd);
  },
  selectFrom(cmd) {
    _selectFrom(cmd);
  },
  dropTable(cmd) {
    _dropTable(cmd);
  },
  reportTable(cmd) {
    _reportTable(cmd);
  },
  exportTo(cmd) {
    _exportTo(cmd);
  },
  importFrom(cmd) {
    _importFrom(cmd);
  },
};

export default dbmsCommands;
