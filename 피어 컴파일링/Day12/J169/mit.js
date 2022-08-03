const fs = require("fs");
const crypto = require('crypto');
const zlib = require('zlib');
const Tree = require("./Tree");
const Commit = require("./Commit");
const Blob = require("./Blob");
const Common = require("./Common");

/**
 * mit 저장소 생성
 */
exports.init = function(dir){
    dir = './'+dir;
    if(fs.existsSync(dir+'/.mit')){console.log("이미 저장소가 생성되어져 있습니다."); return};

    Common.mkdir(dir+'/.mit/objects');
    Common.mkdir(dir+'/.mit/index');
    Common.mkdir(dir+'/.mit/refs/heads');
};

exports.commit = async function(dir){
    dir = './'+dir;
    let currentCommit;
    let currentTree;

    try{
        currentCommit = await loadRecentCommitByBranch(dir, 'main');
        currentTree = new Tree(dir, currentCommit.curTree);
    }catch(e){ //커밋 기록이 아직 없는 경우
        currentCommit = new Commit(dir);
        currentTree = new Tree(dir);
    }
    
    newTree = await add(dir, currentTree);
    newTree.generateFile();

    currentCommit.setContent(currentTree.hash, newTree.hash);
    currentCommit.generateFile();

    updateRecentCommitByBranch(dir, 'main', currentCommit.hash);

    writeCommitLog(dir, currentCommit.hash);
}

async function add(dir, currentTree){
    let existsChange=false;
    const newTree = new Tree(dir);

    const files = await getFiles(dir);
    for(let [filename, fileContent] of files){ // const header = `blob ${fileContent.length}\u0000`;
        const blobHash = crypto.createHash('sha256').update(fileContent, 'utf8').digest('hex');

        if(isNeWHash(currentTree, blobHash)){
            console.log(filename,' is commited!');
            existsChange = true;
            const blob = new Blob(dir, blobHash, fileContent);
            newTree.set(filename, {hash:blobHash, zipSize:blob.zipSize}); //중복된 filename에 대해서는 자동으로 새로운 값이 저장됨.
        }
    }

    if(!existsChange) throw new Error('변경된 내용이 없습니다. 커밋을 취소합니다.');

    return newTree
}

async function loadRecentCommitByBranch (dir, branch){
    const currentCommitHash = fs.readFileSync(dir+'/.mit/refs/heads/'+branch, {encoding:'utf8',flag:'r'});
    return new Commit(dir, currentCommitHash);
}

function updateRecentCommitByBranch (dir, branch, commitHash){
    fs.writeFileSync(dir+'/.mit/refs/heads/'+branch, commitHash, 'utf8');
    return
}

async function writeCommitLog (dir, commitHash){
    try{
        const data = fs.readFileSync(dir+'/.mit/index/commits', {encoding:'utf8',flag:'r'});
        fs.writeFileSync(dir+'/.mit/index/commits', commitHash+'\n'+data, 'utf8')
    }catch(e){
        //commits가 없을 경우
        fs.writeFileSync(dir+'/.mit/index/commits', commitHash, 'utf8');
    }
}

async function getFiles(dir){
    const files = fs.readdirSync(dir);
    const fileMap = new Map();

    const promises = files.map(async(file) =>{
        const path = dir+'/'+file;
        if(fs.lstatSync(path).isFile()){
            const fileContent = fs.readFileSync(path, {encoding:'utf8',flag:'r'});
            fileMap.set(file, fileContent);
        }
    });
    await Promise.all(promises);

    return fileMap
}

function isNeWHash(currentTree, hash){
    const mapIter = currentTree.values();
    
    let next = mapIter.next().value;
    while(next){
        if(next.hash==hash) return false

        next = mapIter.next().value;
    }
    
    return true
}

exports.log = async function(dir){
    const commits = fs.readFileSync(dir+'/.mit/index/commits', {encoding:'utf8',f:'r'}).split('\n');

    for(let commitHash of commits){
        const commit = new Commit(dir, commitHash);
        const currentTree = new Tree(dir, commit.curTree);
        console.log("\x1b[31m", `\ncommit ${commit.hash}`);
        let res = `Date: ${commit.date}\n`;
        for(let filename of currentTree.keys()){
            res+=`\n${filename}`;
        }
        res+=`\n${currentTree.size} files changes`;
        console.log("\x1b[0m", res);
    }
}

exports.restore = async function(dir, commitHash){
    const rootDir = "./"+dir;

    if(commitHash.length==8){
        commitHash = getOneCommit(rootDir,commitHash);
    }else if(!commitHash.length==64){
        throw new Error("올바른 해시값이 아닙니다. 해시값은 8자리 또는 64자리로 입력해주십시오.");
    }

    const [restoredCommits, pop] = restoreCommit(rootDir, commitHash);
    if(pop==commitHash){
        console.log("Restored to "+commitHash);
        return
    }else if(restoredCommits.includes(commitHash)){
        const commit = new Commit(rootDir,pop);
        restoreTree(rootDir, commit.prevTree, commit.curTree);
        updateIndexCommit(rootDir, restoredCommits);
        this.restore(dir, commitHash);
    }else{
        throw new Error("해당 해시값은 커밋 해시값이 아닙니다.");
    }
}

function updateIndexCommit(dir, commits){
    const data = commits.reverse().join('\n');
    fs.writeFileSync(dir+'/.mit/index/commits', data, 'utf8');
}

function restoreCommit(dir, commitHash){
    const commits = getCommits(dir, commitHash);
    const pop = commits.pop();
    return [commits, pop];
}

function restoreTree(dir, prevTreeHash, curTreeHash){
    const prevTree = new Tree(dir, prevTreeHash);
    const curTree = new Tree(dir, curTreeHash);

    for(let filename of curTree.keys()){
        try{
            if(!prevTree.has(filename)) fs.unlinkSync(dir+'/'+filename); //삭제
            else {
                restoreBlob(dir, prevTree, filename);
            }
        }catch(e){
            console.log(e);
            throw new Error("파일 삭제 시도, 하지만 존재하지 않아 실패함 : "+dir+'/'+filename);
        }
    }
}

function restoreBlob(dir, prevTree, filename){
    const blobHash = prevTree.get(filename).hash;
    const restoredBlobContent = new Blob(dir, blobHash).fileContent;
    fs.writeFileSync(dir+'/'+filename, restoredBlobContent);
}

function getOneCommit(dir, commitHash8){
    try{
        const ls = fs.readdirSync(dir+'/.mit/objects/'+commitHash8);
        if(ls.length==1) return commitHash8+ls[0]
        else throw new Error("해당 해시값 디렉토리에는 커밋 파일이 2개 이상 존재합니다.");
    }catch(e){
        throw new Error("디렉토리를 찾을 수 없습니다., "+dir+"/.mit/objects/"+commitHash8);
    }
}

function getCommits(dir){ //입력한 해시가 커밋 해시가 맞으면 commits 이력 리턴
    try{
        const commits = fs.readFileSync(dir+'/.mit/index/commits', {encoding:'utf8',flag:'r'}).split('\n').reverse();
        return commits
    }catch(e){
        console.log(e);
        throw new Error("커밋 이력이 존재하지 않습니다.");
    }
    
}



// async function loadFileByHash (dir, hash){
//     const path = dir+'/.mit/objects/'+hash.slice(0,8)+'/'+hash.slice(8);
//     console.log(path);
//     return fs.readFileSync(path, {encoding:'utf8',flag:'r'});
// }

// async function loadTreeByHash(dir, hash){
//     return new Tree(dir, hash);
// }

// function readFile(path) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, 'utf8', function (err, data) {
//             if (err) reject(err);
//             else resolve(data);
//         });
//     });
// }

// function readdir(path) {
//     return new Promise((resolve, reject) => {
//         fs.readdir(path, function (err, result) {
//             if (err) reject(err);
//             else resolve(result);
//         });
//     });
// }


// let string = "filename, size\nfilename1, size\n";
// console.log(string);
// string = string.slice(0,-1);
// console.log(string);

// let map = new Map();
// string.split("\n").forEach(ele=>{
//     const arr = ele.split(", ");
//     map.set(arr[0],{size:arr[1]});
// })
// console.log(map);

// async function readfile(path){
//     const data = await readFile(path);
//     console.log(data);
// }

// readfile('./new.txt');

// async function getfiles(dir){
//     const data = await getFiles(dir);
//     console.log(data);
// }
// getfiles('.');

// async function getHash(){
//     const filename='./test/new.txt';
//     const fileContent = await readFile(filename);
//     const blobHash = crypto.createHash('sha256').update(fileContent, 'utf8').digest('hex');
//     console.log(blobHash);

//     const input = fs.createReadStream(filename);
//     const out = fs.createWriteStream('./test/Hash.txt');
//     input.pipe(crypto.createHash('sha256')).setEncoding('hex').pipe(out);
// }
// getHash();

// async function getZippedfile(){
//     const filename='./test/test.txt';
//     const fileContent = await readFile(filename);
//     console.log(fileContent.length);
//     zlib.deflate(fileContent, (err, buffer)=>{
//         // console.log(buffer);
//         // console.log(buffer.toString('utf8'));

//         zlib.inflate(buffer, (err,buf)=>{
//             // console.log(buf.toString('utf8'));
//         });
//     });

//     const deflated = zlib.deflateSync(fileContent);
//     console.log(deflated);
//     console.log(deflated.length);
//     console.log(deflated.toString('utf8').length);
//     console.log('sync : ',zlib.inflateSync(deflated).toString('utf8'));

    
// }

// getZippedfile();

// function getFileSizeInBytes(){
//     const stats = fs.statSync('./test/test.txt');
//     const getFileSizeInBytes = stats.size;
//     console.log('original size : ',getFileSizeInBytes);
// }

// getFileSizeInBytes();

// console.log(fs.readdirSync('./dir').length);


// existOneCommitFile('./dir', '23456789');

// getCommits("test");