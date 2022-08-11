import * as fs from "fs";

const update = (input) => {
  try {
    checkFormat(input);
    let [tableName, set, where] = trimInput(input);
    const path = `./${tableName}.csv`;
    let data = fs.readFileSync(path, "utf-8").split("\r\n");
    let [conditionIdx, setIdx] = getColIdx(data, where[0], set[0]);
    let header = data.splice(0, 2);
    let [updatedData, updated] = updateData(
      data,
      conditionIdx,
      where[1],
      setIdx,
      set[1]
    );
    data = header.concat(updatedData);
    fs.writeFileSync(path, data.join("\r\n"), "utf-8");
    console.log(`UPDATED (${updated})`);
  } catch (err) {
    console.log(err.message);
  }
};

const checkFormat = (input) => {
  const format =
    /UPDATE ([a-z_A-Z0-9]+) SET ([a-z_A-Z0-9]+) = ("*[a-z_A-Z0-9]+)"* WHERE ([a-z_A-Z0-9]+) = ([a-z_A-Z0-9]+)/;
  if (!format.test(input)) throw new Error("옳지 않은 형식");
};

const trimInput = (input) => {
  input = input.split(" ");
  let tableName = input[1];
  let set = [input[3], input[5].replaceAll('"', "")];
  let where = [input[7], input[9].replaceAll('"', "")];
  return [tableName, set, where];
};

const getColIdx = (data, condition, set) => {
  let conditionIdx = data[0].split(",").indexOf(condition);
  let setIdx = data[0].split(",").indexOf(set);
  if (conditionIdx > -1 && setIdx > -1) return [conditionIdx, setIdx];
  throw new Error("존재하지 않는 칼럼");
};

const updateData = (data, columnIdx, condition, setIdx, dataToUpdate) => {
  let updated = false;
  data = data.map((row) => {
    row = row.split(",");
    if (row[columnIdx] === condition && !updated) {
      row[setIdx] = dataToUpdate;
      updated = row.join(",");
    }
    return row.join(",");
  });
  if (updated) return [data, updated];
  throw new Error("조건에 맞는 레코드가 존재하지 않습니다.");
};

export { update };
