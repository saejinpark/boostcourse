import * as fs from "fs";

let data = "First,Second";
data += "\r\nnew,Row";
fs.writeFileSync("test.CSV", data);
