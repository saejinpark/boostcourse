const fs = require("fs");
const { join: joinPath } = require("path");
const crypto = require("crypto");
const ZipIO = require("./zip-io");

/*
 * Mit (Mini(?)-gIT) version control system class
 *
 * - All public methods are interfaces of mit.js, which handles console IO
 */

// TODO:
// - this class is too long; make some subclasses
//   - factor out low-level operations to another class
//   - factor out file operations to another class

class MitVCS {
    static #INIT_DIR = ".mit";
    static #OBJ_DIR = "objects";
    static #INDEX_DIR = "index";
    static #INDEX_NAME = "commits";
    static #NULL_TREE = "!NULL";

    #dir;
    #initDir;
    #objDir;
    #indexDir;
    #indexPath;

    constructor(dir) {
        // throw if directory not found
        fs.accessSync(dir, fs.constants.R_OK | fs.constants.W_OK);

        this.#dir = dir;
        this.#initDir = joinPath(dir, MitVCS.#INIT_DIR);
        this.#objDir = joinPath(this.#initDir, MitVCS.#OBJ_DIR);
        this.#indexDir = joinPath(this.#initDir, MitVCS.#INDEX_DIR);
        this.#indexPath = joinPath(this.#indexDir, MitVCS.#INDEX_NAME);
    }

    init() {
        this.#valitdateInitDir();

        fs.mkdirSync(this.#initDir);
        fs.mkdirSync(this.#objDir);
        fs.mkdirSync(this.#indexDir);
        new ZipIO().write(this.#indexPath, "");

        return true;
    }

    commit() {
        const newFiles = this.#getNewFiles();

        if (newFiles.length === 0) {
            return false;
        }

        const lastTree = this.#getLastTree();
        const tree = this.#writeTree(newFiles);
        
        // write commit object
        const contents = `${lastTree} ${tree}\n${Date.now()}`;
        const hash = this.#writeObject(contents);

        this.#updateIndex(hash);

        return true;
    }

    // TODO: factor out nested if
    log() {
        const indexContents = new ZipIO().read(this.#indexPath).trim();
        if (indexContents === "") {
            return [];
        }

        const fileAndHash = new Map();
        const buffer = [];

        const commitHashes = indexContents.split("\n");
        for (const commitHash of commitHashes) {
            buffer.push(this.#getCommitMessage(commitHash, fileAndHash));
            buffer.push("");
        }
        buffer.pop();
        
        return buffer.join("\n");
    }

    // TODO: factor out nested for loop
    restore(hash) {
        try {
            this.#validateRestoreHash(hash);
        } catch(e) {
            if (e instanceof BadHashError) {
                return e.message;
            } else {
                throw e;
            }
        }

        const commits = new ZipIO().read(this.#indexPath).trim();
        if (commits === "") {
            return "Nothing to restore";
        }

        const commitsAndMaps = this.#getAllStates();
        while (commitsAndMaps.length > 0) {
            const [commitHash, fileToHash] = commitsAndMaps.pop();
            
            const cur = this.#getCurFilesAndHash();
            const toDelete = [];
            const toRollback = [];
            for (const [name, hash] of cur.entries()) {
                if (!fileToHash.has(name)) {
                    toDelete.push(name);
                } else if (fileToHash.get(name) !== hash) {
                    toRollback.push([name, fileToHash.get(name)]);
                }
            }

            toRollback.forEach(e => {
                const [name, hash] = e;

                const contents = this.#readObject(hash);
                fs.writeFileSync(name, contents);
            });

            toDelete.forEach(name => {
                fs.unlinkSync(name);
            });

            if (commitHash.startsWith(hash)) {
                break;
            }
        }

        this.#rewriteIndex(hash);

        return `restored to ${hash}`;
    }

    /*
     * restore helper methods
     */

    #getAllStates() {
        const commits = new ZipIO().read(this.#indexPath).trim();

        const commitHashes = commits.split("\n");
        const commitsAndMaps = []; // dp table
        const fileToHash = new Map();
        while (commitHashes.length > 0) {
            const commitHash = commitHashes.pop();

            const commitContents = this.#readObject(commitHash);
            const { curTreeHash } = this.#parseCommitContents(commitContents);
            const treeContents = this.#readObject(curTreeHash);

            for (const line of treeContents.split("\n")) {
                const [blobHash, size, path] = line.split(" ");
                fileToHash.set(path, blobHash);
            }
            commitsAndMaps.push([commitHash, new Map(fileToHash)]);
        }
        
        return commitsAndMaps;
    }

    /*
     * log helper methods
     */

    #getCommitMessage(commitHash, curFileAndHash) {
        const buffer = [];

        const commitContents = this.#readObject(commitHash);
        const { lastTreeHash, curTreeHash, timestamp } = this.#parseCommitContents(commitContents);

        buffer.push(`commit ${commitHash}`);
        buffer.push(`Date: ${new Date(parseInt(timestamp))}`);
        buffer.push("");

        const treeContents = this.#readObject(curTreeHash);
        for (const line of treeContents.split("\n")) {
            const [hash, size, path] = line.split(" ");
            
            if (curFileAndHash.has(path) && curFileAndHash.get(path) === hash) {
                continue;
            }

            buffer.push(`        ${path}`);
        }
        return buffer.join("\n");
    }

    /*
     * tree, blob and index operations
     */

    #writeTree(files) {
        const contents = files
            .map(file => {
                // create blob object
                const contents = fs.readFileSync(file).toString();
                const hash = this.#writeBlob(contents);

                // write tree contents
                const size = fs.statSync(file).size;

                return `${hash} ${size} ${file}`;
            })
            .join("\n");

        const hash = this.#writeObject(contents);
        return hash;
    }

    #writeBlob(contents) {
        const hash = this.#writeObject(contents);
        return hash;
    }

    #getLastTree() {
        const lastCommit = this.#getLastCommit();
        if (lastCommit === null) {
            return MitVCS.#NULL_TREE;
        }

        const contents = this.#readObject(lastCommit);
        return this.#getTreeHashFromCommitContents(contents);
    }

    #getLastCommit() {
        const indexContents = new ZipIO().read(this.#indexPath).trim();

        return (indexContents === "") ? null : indexContents.split("\n")[0];
    }

    #getTreeHashFromCommitContents(contents) {
        const firstLine = contents.split("\n")[0];
        const secondField = firstLine.split(" ")[1];
        return secondField;
    }

    #parseCommitContents(contents) {
        const lines = contents.split("\n");
        const firstLineFields = lines[0].split(" ");
        return {
            lastTreeHash: firstLineFields[0],
            curTreeHash: firstLineFields[1],
            timestamp: lines[1]
        };
    }

    #updateIndex(hash) {
        const zipIO = new ZipIO;

        const contents = zipIO.read(this.#indexPath);
        zipIO.write(this.#indexPath, `${hash}\n${contents}`);
    }

    #rewriteIndex(hash) {
        const zipIO = new ZipIO;

        const index = zipIO.read(this.#indexPath).trim().split("\n");

        // find where hash is at
        let i;
        for (i = 0; i < index.length; ++i) {
            if (index[i].startsWith(hash)) {
                break;
            }
        }
        
        const newIndex = index.slice(i);
        const contents = newIndex.join("\n");
        zipIO.write(this.#indexPath, contents);
    }

    /*
     * object read/write operations
     */

    #writeObject(contents) {
        const hash = this.#getHash(contents);

        const hashFront = hash.slice(0, 8);
        const dir = joinPath(this.#objDir, hashFront);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        const hashRest = hash.slice(8);
        const path = joinPath(dir, hashRest);
        new ZipIO().write(path, contents);

        return hash;
    }

    #readObject(hash) {
        const front = hash.slice(0, 8);
        const rest = hash.slice(8);

        const path = joinPath(this.#objDir, front, rest);
        return new ZipIO().read(path);
    }

    /*
     * file IO operations
     */

    #getNewFiles() {
        const prev = this.#getPrevFilesAndHash();
        const cur = this.#getCurFilesAndHash();

        const newFiles = [];
        for (const [file, hash] of cur.entries()) {
            if (prev.has(file) && prev.get(file) === hash) {
                continue;
            }

            newFiles.push(file);
        }
        return newFiles;
    }

    #getPrevFilesAndHash() {
        const map = new Map();

        const commits = new ZipIO().read(this.#indexPath).trim();
        if (commits === "") {
            return map; // empty map
        }

        const commitHashes = commits.split("\n");
        commitHashes.reverse();
        for (const commitHash of commitHashes) {
            // extract current tree hash for commit
            const commitContents = this.#readObject(commitHash);
            const treeHash = this.#getTreeHashFromCommitContents(commitContents);
            
            const treeContents = this.#readObject(treeHash);

            // update file path and hash
            for (const line of treeContents.split("\n")) {
                const [hash, size, path] = line.split(" ");
                map.set(path, hash);
            }
        }
        
        return map;
    }

    #getCurFilesAndHash() {
        const map = new Map();

        const curFiles = this.#getAllFilesInDir(this.#dir);
        for (const path of curFiles) {
            const contents = fs.readFileSync(path);
            const hash = this.#getHash(contents);

            map.set(path, hash);
        }
        return map;
    }

    /*
     * file operations
     */

    // TODO: factor out this methods to some path util class
    #getAllFilesInDir(dir, depth = 0) {
        const names = fs.readdirSync(dir);

        let files = [];
        for (const name of names) {
            const path = joinPath(dir, name);

            // skip mit directory
            if (path === this.#initDir) {
                continue;
            }

            if (fs.lstatSync(path).isFile()) {
                files.push(path);
            } else {
                // use recursion for subdirectory
                files = files.concat(this.#getAllFilesInDir(path, depth + 1));
            }
        }
        return files;
    }

    /*
     * validations
     */

    #valitdateInitDir() {
        const exists = fs.existsSync(this.#initDir);
        if (exists) {
            throw new DirectoryAlreadyExistsError(`Already initialized with '${this.#initDir}'`)
        }

        if (exists && fs.lstatSync(this.#initDir).isFile()) {
            throw new IsFileError(`expected '${this.#initDir}' to be directory, not file`);
        }
    }

    #validateRestoreHash(hash) {
        if (hash.length !== 8 && hash.length !== 64) {
            throw new BadHashError(`Hash '${hash}' is not of length 8 or 64`);
        }

        if (hash.length === 64 && !fs.existsSync(joinPath(this.#objDir, hash.slice(0, 8), hash.slice(8)))) {
            throw new BadHashError(`Hash '${hash}' has no matched commit`);
        }

        if (hash.length === 64) {
            return;
        }

        const path = joinPath(this.#objDir, hash);
        if (!fs.existsSync(path)) {
            throw new BadHashError(`Hash '${hash}' has no matched commit`);
        }

        const files = fs.readdirSync(path);
        if (files.length !== 1) {
            throw new BadHashError(`More than one commit for hash '${hash}'; try 64-length hash`);
        }
    }

    /*
     * util
     */

    #getHash(str) {
        return crypto.createHash("sha256").update(str).digest("hex");
    }
}

class MitVCSError extends Error {
    constructor(msg) {
        super(msg);
    }
}

class DirectoryAlreadyExistsError extends MitVCSError {
    constructor(msg) {
        super(msg);
    }
}

class IsFileError extends MitVCSError {
    constructor(msg) {
        super(msg);
    }
}

class BadHashError extends MitVCSError {
    constructor(msg) {
        super(msg);
    }
}

module.exports = { MitVCS, MitVCSError };