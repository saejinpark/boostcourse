import fs from "fs";

const TYPE = ["Numeric", "String"];

let database = null;

export const sharedInstance = () => {
    if (database === null) database = new Database();
    return database;
};

class Database {
    constructor() {
        this.warehouse = new Map();
    }

    create(data) {
        if (!/TABLE\s\w+\s\((\w|,|\s)+\)/.test) return false;
        let [object, name, columns] = data.match(/(\w+)|\(.+\)/g);
        let cols = ["id"];
        let types = ["Numeric"];
        if (this.warehouse.has(name)) return false;
        columns = columns
            .replace(/\(|\)/g, "")
            .split(",")
            .map((column) => column.trim().split(" "));
        if (columns.length === 0) return false;
        for (let column of columns) {
            if (column.length !== 2) return false;
            const [col, type] = column;
            if (cols.includes(col)) return false;
            if (!TYPE.includes(type)) return false;
            cols.push(col);
            types.push(type);
        }
        console.log(cols);
        console.log(types);
        this.warehouse.set(name, {
            cols,
            types,
        });
        fs.writeFileSync(`${name}.csv`, `${cols.slice(1).join(",")}`);
        return {
            cols,
            types,
        };
    }

    insert(data) {
        if (!/INTO\s\w+\s\(.+?\)\sVALUES\s\(.+?\)/.test(data)) return false;
        let [_into, name, columns, _values, values] = data.match(/(\w+)|\(.+?\)/g);
        if (!this.warehouse.has(name)) return false;
        columns = columns
            .replace(/\(|\)/g, "")
            .split(",")
            .map((column) => column.trim());
        values = values
            .replace(/\(|\)/g, "")
            .split(",")
            .map((value) => value.trim());
        console.log(columns);
        console.log(values);
        if (columns.length !== values.length) return false;
        const mart = this.warehouse.get(name);
        let contents = [];
        if ("contents" in mart) contents = mart["contents"];
        const content = {};
        const cols = mart["cols"].slice();
        const types = mart["types"].slice();
        console.log(cols);
        cols.shift();
        types.shift();
        const csv = [];
        if (contents.length === 0) content["id"] = 1;
        else content["id"] = contents[contents.length - 1]["id"] + 1;
        if (cols.length !== columns.length) return false;
        if (types.length !== values.length) return false;
        while (cols.length > 0) {
            const col = cols.shift();
            if (col !== columns.shift()) return false;
            const type = types.shift();
            const value = values.shift();
            if (type === "Numeric" && isNaN(value)) return false;
            content[col] = value;
            csv.push(value);
        }
        contents.push(content);
        console.log(contents);
        mart["contents"] = contents;
        this.warehouse.set(name, mart);
        fs.writeFileSync(`${name}.csv`, fs.readFileSync(`${name}.csv`, "utf-8") + `\n${csv.join(",")}`);
        return mart;
    }

    delete(data) {
        if (!/FROM\s\w+\sWHERE\s\w+\s=\s\w+/.test(data)) return false;
        const [_from, name, _where, col, value] = data.match(/\w+/g);
        if (!this.warehouse.has(name)) return false;
        const mart = this.warehouse.get(name);
        const cols = mart["cols"];
        if (!cols.includes(col)) return false;
        if (!"data" in mart) return false;
        const contents = mart["contents"];
        let indexArr = [];
        for (let index in contents) {
            if (contents[index][col] == value) indexArr.unshift(index);
        }
        if (indexArr.length === 0) return false;
        for (let index of indexArr) {
            contents.splice(index, 1);
        }
        console.log(contents);
        let csv = fs.readFileSync(`${name}.csv`, "utf-8");
        csv = csv.match(/[^\n]+/g).shift();
        for (let content of contents) {
            csv += `\n${Object.values(content).slice(1).join(",")}`;
        }
        fs.writeFileSync(`${name}.csv`, csv);
        mart["contents"] = contents;
        this.warehouse.set(name, mart);
        return mart;
    }
    update(data) {
        if (!/\w+\sSET\s\w+\s=\s\w+\sWHERE\s\w+\s=\s\w+/.test(data)) return false;
        const [name, _set, col, value, _where, findCol, findVal] = data.match(/\w+/g);
        if (!this.warehouse.has(name)) return false;
        const mart = this.warehouse.get(name);
        if (!"contents" in mart) return false;
        const contents = mart["contents"];
        const cols = mart["cols"];
        const types = mart["types"];
        if (!cols.includes(col)) return false;
        if (!cols.includes(findCol)) return false;
        if (types[cols.indexOf(col)] === "Numeric" && isNaN(value)) return false;
        if (types[cols.indexOf(findCol)] === "Numeric" && isNaN(findVal)) return false;
        let testCase = false;
        for (let content of contents) {
            if (content[findCol] == findVal) {
                content[col] = value;
                testCase = true;
            }
        }
        if (!testCase) return false;
        let csv = fs.readFileSync(`${name}.csv`, "utf-8");
        csv = csv.match(/[^\n]+/g).shift();
        for (let content of contents) {
            csv += `\n${Object.values(content).slice(1).join(",")}`;
        }
        fs.writeFileSync(`${name}.csv`, csv);
        mart["contents"] = contents;
        this.warehouse.set(name, mart);
        return mart;
    }

    select(data) {
        if (/\*\sFROM\s\w+/.test(data)) {
            let [_from, name] = data.match(/\w+/g);
            if (!this.warehouse.has(name)) return false;
            return this.warehouse.get(name);
        } else if (/\w+\sFROM\s\w+\sWHERE\s\w+\s[=<>]\s\w+/.test(data)) {
            let [col, _from, name, _where, findCol, calc, findVal] = data.match(/[^\s]+/g);
            console.log(col, _from, name, _where, findCol, calc, findVal);
            if (!this.warehouse.has(name)) return false;
            const mart = this.warehouse.get(name);
            const cols = mart["cols"];
            const types = mart["types"];
            if (!cols.includes(col)) return false;
            if (!cols.includes(findCol)) return false;
            const findColIndex = cols.indexOf(findCol);
            if (types[findColIndex] === "Numeric" && isNaN(findVal)) return false;
            if (!"contents" in mart) return false;
            const contents = mart["contents"];
            const dummy = {};
            dummy["cols"] = ["id", col];
            dummy["types"] = ["Numeric", types[findColIndex]];
            console.log(contents);
            console.log(dummy);
            const dummyContents = [];
            for (let content of contents) {
                console.log(calc === "=" && content[findCol] != findVal);
                if (calc === "=" && content[findCol] != findVal) continue;
                console.log(calc === ">" && content[findCol] <= findVal);
                if (calc === ">" && content[findCol] < findVal) continue;
                console.log(calc === "<" && content[findCol] >= findVal);
                if (calc === "<" && content[findCol] > findVal) continue;
                const dummyContent = {};
                dummyContent["id"] = content["id"];
                dummyContent[col] = content[col];
                dummyContents.push(dummyContent);
            }
            dummy["contents"] = dummyContents;
            console.log(dummy);
            return dummy;
        }
    }
    drop(data) {
        if (!/TABLE\s\w+/.test(data)) return false;
        let [_table, name] = data.match(/\w+/g);
        if (!this.warehouse.has(name)) return false;
        const mart = this.warehouse.get(name);
        this.warehouse.delete(name);
        fs.rmSync(`${name}.csv`);
        return mart;
    }
}
