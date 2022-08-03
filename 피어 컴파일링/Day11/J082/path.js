export class Path {
    constructor(path) {
        this.root = null;
        this.base = null;
        this.ext = null;
        this.name = null;
        this.lastDirectory = null;
        this.components = null;
        this.init(path);
    }

    init(path) {
        try {
            if (/.*\\.*/.test(path)) {
                const pathArr = path.split(";");
                if (pathArr.length === 1) {
                    (function (path) {
                        this.getAbsoluteString = () => {
                            return path;
                        };
                        this.appendComponent = (component) => {
                            if (component === undefined) {
                                throw new Error("component가 입력되지 않았습니다.");
                            } else {
                                let [paths, base] = path.match(/(.+\\)|(.+)/g);
                                paths += `${component}\\`;
                                this.init(paths + base);
                            }
                        };
                        this.deleteLastComponent = () => {
                            const [...paths] = path.match(/(.+?\\)|(.+)/g);
                            const base = dir.pop();
                            paths.pop();
                            paths.push(base);
                            this.init(paths.join(""));
                        };
                        this.relative = (to) => {
                            let relativePath = "";
                            const [...paths] = path.match(/\\[^/]+/g);
                            const [...toPaths] = to.match(/\\[^/]+/g);
                            while (paths.includes(toPaths[0]) && paths[0] !== toPaths[0]) {
                                relativePath += "..\\..\\..\\..\\";
                                paths.shift();
                            }
                            while (paths.length > 0) {
                                if (paths[0] === toPaths[0]) {
                                    relativePath += "..\\";
                                    paths.shift();
                                    toPaths.shift();
                                } else {
                                    break;
                                }
                            }
                            relativePath += toPaths.join("").substring(1);
                            return relativePath;
                        };
                    }.call(this, pathArr[0]));
                    this.setComponents(this.getAbsoluteString().split("\\"));
                    this.setComponentsByIndex(0, this.getComponentsByIndex(0) + "\\");
                } else {
                    return this.returnPathArr(pathArr);
                }
            } else if (/.*\/.*/.test(path)) {
                const pathArr = path.split(":");
                if (pathArr.length === 1) {
                    (function (path) {
                        this.getAbsoluteString = () => {
                            return path;
                        };
                        this.appendComponent = (component) => {
                            if (component === undefined) {
                                throw new Error("component가 입력되지 않았습니다.");
                            } else {
                                let [paths, base] = path.match(/(.+\/)|(.+)/g);
                                paths += `${component}/`;
                                this.init(paths + base);
                            }
                        };
                        this.deleteLastComponent = () => {
                            const [...paths] = path.match(/(.+?\/)|(.+)/g);
                            const base = paths.pop();
                            paths.pop();
                            paths.push(base);
                            this.init(paths.join(""));
                        };
                        this.relative = (to) => {
                            let relativePath = "";
                            const [...paths] = path.match(/\/[^/]+/g);
                            const [...toPaths] = to.match(/\/[^/]+/g);
                            if (paths.includes(toPaths[0]) && paths[0] !== toPaths[0]) {
                                while (paths.includes(toPaths[0]) && paths[0] !== toPaths[0]) {
                                    relativePath += "../../../../";
                                    paths.shift();
                                }
                            } else {
                                while (paths.length > 0) {
                                    if (paths[0] === toPaths[0]) {
                                        relativePath += "../";
                                        paths.shift();
                                        toPaths.shift();
                                    } else {
                                        break;
                                    }
                                }
                            }
                            relativePath += toPaths.join("").substring(1);
                            return relativePath;
                        };
                    }.call(this, pathArr[0]));
                    this.setComponents(this.getAbsoluteString().split("/"));
                    this.setComponentsByIndex(0, this.getComponentsByIndex(0) + "/");
                } else {
                    return this.returnPathArr(pathArr);
                }
            } else {
                throw new Error("운영체제를 찾을수 없습니다.");
            }
        } catch {
            throw new Error("문자열이 잘못되었습니다.");
        }
        this.setRoot(this.getComponentsByIndex(0));
        this.setBase(this.getComponentsByIndex(this.getComponentsLength() - 1));
        const [name, ext] = this.getBase().split(".");
        this.setName(name);
        this.setExt("." + ext);
        this.setLastDirectory(this.getComponentsByIndex(this.getComponentsLength() - 2));
    }

    returnPathArr(pathArr) {
        return pathArr.map((path) => new Path(path));
    }

    stringfy() {
        return `{root : '${this.getRoot()}',\ndir : '${this.getAbsoluteString()}',\nbase : '${this.getBase()}',\next : '${this.getExt()}',\nname : '${this.getName()}' }`;
    }

    getRoot() {
        return this.root;
    }
    setRoot(root) {
        this.root = root;
    }

    getBase() {
        return this.base;
    }

    setBase(base) {
        this.base = base;
    }

    getExt() {
        return this.ext;
    }

    setExt(ext) {
        this.ext = ext;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getLastDirectory() {
        return this.lastDirectory;
    }

    setLastDirectory(lastDirectory) {
        this.lastDirectory = lastDirectory;
    }

    getComponents() {
        return this.components;
    }

    setComponents(components) {
        this.components = components;
    }

    getComponentsLength() {
        return this.getComponents().length;
    }

    getComponentsByIndex(index) {
        return this.components[index];
    }

    setComponentsByIndex(index, value) {
        this.components[index] = value;
    }
}
