import fs from "fs";

export const getWorkerInnerText = async () => {
    return new Promise((resolve) => {
        const workerInnerText = fs.readFileSync("./worker.js", "utf8");
        resolve(workerInnerText);
    });
};

export const makeWorkerDir = async () => {
    return new Promise((resolve) => {
        fs.mkdirSync("./workers");
        resolve();
    });
};

export const generateWorker = (name) => {
    return new Promise(async (resolve) => {
        fs.writeFileSync(
            `./workers/${name}.js`,
            await getWorkerInnerText(),
            (err) => {
                console.log(err);
            }
        );
        resolve();
    });
};

export const rmWorkerDir = () => {
    return new Promise((resolve) => {
        console.log("./workers 폴더를 삭제합니다.");
        setTimeout(() => {
            fs.rm("./workers", { recursive: true, force: true }, () => {
                console.log("./workers 폴더가 삭제되었습니다.");
            });
            resolve();
        }, 1000);
    });
};

