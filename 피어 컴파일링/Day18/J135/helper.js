import fs from "fs";

const helperCommands = {
  getFilename(tableName) {
    return `./${tableName}.csv`;
  },
  getMetaDataName(tableName) {
    return `./.${tableName}.json`;
  },
  readFile(filename) {
    return fs.readFileSync(filename).toString().split("\n");
  },
  readMetaData(metaDataName) {
    return JSON.parse(fs.readFileSync(metaDataName));
  },
  parseRows(fileContent) {
    const columns = fileContent[0].split(",");
    const parsedData = [];
    for (let i = 2; i < fileContent.length; i++) {
      const row = fileContent[i].split(",");
      const obj = {};
      for (let j = 0; j < columns.length; j++) {
        obj[columns[j]] = row[j];
      }
      parsedData.push(obj);
    }
    return parsedData;
  },
};

export default helperCommands;
