import readlineSync from "readline-Sync";
import application from "./application.js";
import fs from "fs";
// const from = readlineSync.question("From: ");
// const to = readlineSync.question("To: ");
// const title = readlineSync.question("Title: ");
// const fileName = readlineSync.question("fileName: ");
// console.log("\r\n");
//7계층에서 send
// application(from, to, title, fileName, "send");

application("a", "b", "c", "./test.txt", "send");
setTimeout(() => fs.unlinkSync("./requestData"), 1000);
setTimeout(() => fs.unlinkSync("./getrequestedData"), 1000);
