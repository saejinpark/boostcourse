const path = require("path");
const { MitVCS, MitVCSError } = require("./mit-vcs");

const args = process.argv;

if (args.length === 2 || args[2] === "--help") {
    printUsage();
} else if (["init", "commit", "log", "restore"].every(cmd => cmd !== args[2])) {
    printGuide(args[2]);
} else {
    main(args);
}

function main(args) {
    const cmd = args[2];

    if (cmd === "init") {
        init(args);
    } else if (cmd === "commit") {
        commit(args);
    } else if (cmd === "log") {
        log(args);
    } else if (cmd === "restore") {
        restore(args);
    } else {
        printGuide(cmd);
    }
}

function init(args) {
    if (args.length === 3) {
        console.log("mit: missing target directory");
        printInitUsage();
        return;
    }

    const dir = args[3]
    const mit = new MitVCS(dir);
    try {
        if (mit.init()) {
            console.log(`Initialized empty Mit repository in ${path.join(args[1], "..", dir)}`)
        }
    } catch (e) {
        if (e instanceof MitVCSError) {
            console.error(e.message);
        } else {
            throw e;
        }
    }
}

function commit(args) {
    if (args.length === 3) {
        console.log("mit: missing target directory");
        printCommitUsage();
        return;
    }

    const dir = args[3];
    const mit = new MitVCS(dir);
    if (mit.commit()) {
        console.log("Successfully committed");
    } else {
        console.log("Nothing to commit");
    }
}

function log(args) {
    if (args.length === 3) {
        console.log("mit: missing target directory");
        printLogUsage();
        return;
    }

    const dir = args[3];
    const mit = new MitVCS(dir);
    console.log(mit.log());
}

function restore(args) {
    if (args.length === 3) {
        console.log("mit: missing target directory");
        printRestoreUsage();
        return;
    }
    if (args.length === 4) {
        console.log("mit: missing target commit hash");
        printRestoreUsage();
        return;
    }

    const dir = args[3];
    const hash = args[4];
    const mit = new MitVCS(dir);
    console.log(mit.restore(hash));
}

function printUsage() {
    console.log("usage: mit <command> [<args>]");
    console.log();
    console.log("These are Mit commands:");
    console.log("   init      Create an empty Mit repository");
    console.log("   commit    Record changes to the repository");
    console.log("   log       Show commit logs");
    console.log("   restore   Restore to the specified state");
}

function printInitUsage() {
    console.log("usage: mit init <directory>");
}

function printCommitUsage() {
    console.log("usage: mit commit <directory>");
}

function printLogUsage() {
    console.log("usage: mit log <directory>");
}

function printRestoreUsage() {
    console.log("usage: mit restore <directory> <hash>");
}

function printGuide(cmd) {
    console.log(`mit: '${cmd}' is not a mit command. See 'mit --help'`);
}