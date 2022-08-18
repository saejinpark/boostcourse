const fs = require("fs");
const { util }  = require("./util");

const imgString = util.encodeToBase64(fs.readFileSync('./image.png').toString('binary'));
const fileContents = new Buffer.from(util.decodeByBase64(imgString), 'binary');
fs.writeFileSync('./received.png', fileContents);
