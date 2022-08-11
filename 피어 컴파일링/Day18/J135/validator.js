import fs from "fs";

const validator = {
  isExist(filename, tableName) {
    if (!fs.existsSync(filename)) {
      throw new Error(`${tableName} 테이블이 존재하지 않습니다.`);
    }
  },
  isNotExist(filename, tableName) {
    if (fs.existsSync(filename)) {
      throw new Error(`이미 ${tableName} 테이블이 존재합니다.`);
    }
  },
  hasColumn(metaData, targetKey) {
    if (!Object.keys(metaData).includes(targetKey)) {
      throw new Error(`${targetKey} 칼럼은 존재하지 않습니다.`);
    }
  },
  checkType(metaData, targetKey, targetValue) {
    if (metaData[targetKey] === "Numeric") {
      if (/^\"[\w]+\"$/g.test(targetValue) || isNaN(Number(targetValue))) {
        throw new Error(`${targetKey} 칼럼은 Numeric 입니다.`);
      }
    } else if (metaData[targetKey] === "String") {
      if (!/^\"[\w]+\"$/g.test(targetValue) || !isNaN(Number(targetValue))) {
        throw new Error(`${targetKey} 칼럼은 String 입니다.`);
      }
    }
  },
};

export default validator;
