const { PathParser, PathParseResult, WinInvalidNameError, WinReservedNameError } = require("./path-parser");

class Path {
    #components;
    #dirSep;

    // return multiple paths
    // ex. getPaths("/foo:/bar:/baz")
    static getPaths(string) {
        const parser = new PathParser();
        const parsed = parser.parse(string);
        return parsed.map(parseResult => new Path(parseResult));
    }

    // return single (first) path
    // ex. new Path("/foo")
    constructor(init) {
        if (typeof init === "string") {
            const parser = new PathParser();
            const parsed = parser.parse(init)[0];

            this.#components = parsed.components;
            this.#dirSep = parsed.dirSep;
        } else if (init instanceof PathParseResult) {
            this.#components = init.components;
            this.#dirSep = init.dirSep;
        }
    }

    toString() {
        return `[Path: ${this.#components}, ${this.#dirSep}]`;
    }

    get root() {
        return (this.#dirSep === "/") ? "/" : this.#components[0];
    }

    get base() {
        return this.#components[this.#components.length-1];
    }

    get ext() {
        const i = this.base.lastIndexOf(".");
        return (i === -1) ? "" : this.base.slice(i);
    }

    get name() {
        const i = this.base.lastIndexOf(".");
        return (i === -1) ? this.base : this.base.slice(0, i);
    }

    get lastDirectory() {
        return this.#components[this.#components.length-2];
    }

    get components() {
        return this.#components;
    }

    get absoluteString() {
        if (this.#dirSep === "/") { // for Unix
            return "/" + this.#components.slice(1).join(this.#dirSep);
        } else if (this.#dirSep === "\\") { // Windows
            return this.#components.join(this.#dirSep);
        }
    }

    appendComponent(component) {
        this.#validateComponent(component);

        const base = this.#components.pop();
        this.#components.push(component);
        this.#components.push(base);
    }

    #validateComponent(component) {
        if (this.#dirSep === "\\" && !PathParser.WIN_NAME_FORMAT.test(component)) {
            throw new WinInvalidNameError(`Invalid name '${name}' is given; do not use reserved characters`)
        }
        if (PathParser.WIN_RESERVED_NAMES.some(r => component.startsWith(r))) {
            throw new WinReservedNameError(`The name '${component}' is reserved; try another name`);
        }
    }

    deleteLastComponent() {
        if (this.#components.length === 2) {
            throw new CannotDeleteError(`Cannot delete component any more`)
        }

        const base = this.#components.pop();
        this.#components.pop();
        this.#components.push(base);
    }

    relative(str) {
        const parser = new PathParser();
        const thatParsed = parser.parse(str)[0];
        
        if (thatParsed.dirSep !== this.#dirSep) {
            throw new CannotCompareError(`Paths are not compatible`);
        };

        const thatComp = thatParsed.components;
        const thisComp = this.#components;

        // skip common parent directories
        const imax = Math.min(thisComp.length, thatComp.length);
        let i = 0;
        while (i < imax) {
            if (thatComp[i] !== thisComp[i]) {
                break;
            }
            ++i;
        }

        // go to parent directory
        let relativePath = thisComp.slice(i).map(() => "..");

        // go to target directory
        relativePath = relativePath.concat(thatComp.slice(i));

        return relativePath.join(this.#dirSep);
    }
}

class CannotDeleteError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "CannotDeleteError";
    }
}

class CannotCompareError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "CannotCompareError";
    }
}

module.exports = Path;