import { init, commit, log, restore } from "./mit.js";
import fs from "fs";
import crypto from "crypto";
import { deflate } from "zlib";

export function checkValidCommand(line) {
  const commands = line.split(" ");
  if (commands[0] !== "mit") {
    throw "올바른 형식의 커맨드가 아닙니다.";
  }
  if (commands[1] === "restore") {
    if (commands.length !== 4) {
      throw "올바른 형식의 커맨드가 아닙니다.";
    }
  } else if (commands.length !== 3) throw "올바른 형식의 커맨드가 아닙니다.";

  if (!["init", "commit", "log", "restore"].includes(commands[1])) {
    throw "올바른 형식의 커맨드가 아닙니다.";
  }
  return commands;
}
export function executeCommand(commands, mitDir, prevTree) {
  if (commands[1] === "init") {
    init(commands[2]);
  } else if (commands[1] === "commit") {
    return commit(commands[2], mitDir, prevTree);
  } else if (commands[1] === "log") {
    log(commands[2]);
  } else if (commands[1] === "restore") {
    restore(commands[2], commands[3]);
  }
}

//-------------------commit 내 오브젝트-------------
export function blob(dir, mitDir) {
  async function encodingData(data) {
    let result = await new Promise((res, rej) => {
      deflate(data, (err, buffer) => {
        if (err) {
          console.err(err);
          process.exitCode = 1;
        }
        res(buffer.toString("hex"));
      });
    });
    return result;
  }
  fs.readdirSync(dir, { withFileTypes: true }).forEach(async (P) => {
    const file = P.name;
    if (!P.isDirectory()) {
      // 디렉토리 아닌 파일들만 blob생성
      const data = fs.readFileSync(`${dir}/${file}`, "utf8");
      let encodedata = await encodingData(data);

      const hashed = crypto.createHash("sha256").update(data).digest("hex");
      if (!fs.existsSync(`${mitDir}/.mit/index/${hashed.slice(0, 8)}`)) {
        const filedir = `${mitDir}/.mit/index/${hashed.slice(0, 8)}`;
        fs.mkdirSync(filedir);
        fs.writeFileSync(`${filedir}/${P.name}.blob`, encodedata);
      }
    }
  });
}
export function tree(mitDir, prevTree) {
  let data = "";
  return new Promise((res, rej) => {
    setTimeout(() => {
      let preBlobs = [];
      if (prevTree) {
        const datas = fs.readFileSync(`${mitDir}/.mit/index/${prevTree.slice(0, 8)}/${prevTree.slice(8)}.tree`, "utf8");
        preBlobs = datas.split("\n").map((el) => el.split(" ")[0]);
      }
      fs.readdirSync(`${mitDir}/.mit/index`, { withFileTypes: true }).forEach((P) => {
        //해시값
        if (P.isDirectory()) {
          const fileName = fs.readdirSync(`${mitDir}/.mit/index/${P.name}`, { withFileTypes: true })[0].name;
          const fileHash = `${fs.readFileSync(`${mitDir}/.mit/index/${P.name}/${fileName}`, "utf8")}`;
          if (!preBlobs.includes(fileHash) && !fileName.match(/.tree/)) {
            data += `${fs.readFileSync(`${mitDir}/.mit/index/${P.name}/${fileName}`, "utf8")}`;
            //압축 후 파일크기
            const stat = fs.statSync(`${mitDir}/.mit/index/${P.name}/${fileName}`).size;
            data += ` ${stat}`;
            data += ` ${fileName}\n`;
          } else {
          }
        }
      });
      if (data) {
        // console.log(data);
        const hashed = crypto.createHash("sha256").update(data).digest("hex");
        fs.mkdirSync(`${mitDir}/.mit/index/${hashed.slice(0, 8)}`);
        fs.writeFileSync(`${mitDir}/.mit/index/${hashed.slice(0, 8)}/${hashed.slice(8)}.tree`, data);
        res(hashed);
      } else {
        console.log("바뀐 데이터 없음");
      }
    }, 1000);
  });
}
export function commitobject(prevTree, mitDir, treehash) {
  let data = "";
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (prevTree) {
        data += `${prevTree} `;
      }
      data += `${treehash}\n`;
      data += `${new Date().getTime()}`;
      const hashed = crypto.createHash("sha256").update(data).digest("hex");
      fs.mkdirSync(`${mitDir}/.mit/objects/${hashed.slice(0, 8)}`);
      fs.writeFileSync(`${mitDir}/.mit/objects/${hashed.slice(0, 8)}/${hashed.slice(8)}.commit`, data);

      //commits파일에서 커밋 해시값 기록
      let commithash = fs.readFileSync(`${mitDir}/.mit/index/commits`, "utf8");
      commithash = `${hashed}\n${commithash}`;
      fs.writeFileSync(`${mitDir}/.mit/index/commits`, commithash);
      res(1);
    }, 1000);
  });
}
//-------------------log 명령어----------------
export function showLog(dir) {
  const commitPath = fs
    .readFileSync(`${dir}/.mit/index/commits`, "utf8")
    .split("\n")
    .filter((el) => el);
  commitPath.forEach((el) => {
    const treePath = fs.readFileSync(`${dir}/.mit/objects/${el.slice(0, 8)}/${el.slice(8)}.commit`, "utf8").split("\n");
    let blobpath = "";
    if (!treePath[0].match(/[ ]/)) {
      blobpath = treePath[0];
    } else {
      blobpath = treePath[0].split(" ")[1];
    }
    const changedBlobs = fs
      .readFileSync(`${dir}/.mit/index/${blobpath.slice(0, 8)}/${blobpath.slice(8)}.tree`, "utf8")
      .split("\n")
      .filter((el) => el)
      .map((el) => {
        return el.split(" ")[2].slice(0, -5);
      });

    console.log(`${new Date(parseInt(treePath[1]))} , 변경내역 : [${changedBlobs.join(", ")}]`);
  });
}
export function backRestore(dir, hash) {
  const commitPath = fs.readFileSync(`${dir}/.mit/index/commits`, "utf8").split("\n");
  if (
    commitPath.filter((el) => {
      return el === hash;
    }).length === 0
  ) {
    throw "해당 해쉬값이 존재하지 않습니다.";
  }
  while (commitPath[0] !== hash) {
    const hash2 = commitPath.shift();
    const hash3 = fs.readFileSync(`${dir}/.mit/object/${hash2.slice(0, 8)}/${hash2.slice(8)}`, "utf8");
    fs.readFileSync;
  }
}
