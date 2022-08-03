class PathParseResult {
    constructor(components, dirSep) {
        this.dirSep = dirSep;
        this.components = components;
    }

    toString() {
        return `[PathParseResult: [${this.components.map(e => `[${e.join(", ")}]`).join(", ")}]], '${this.dirSep}']`;
    }
}

class PathParser {
    static #WIN_ROOT_DRIVE = "C:";
    static WIN_NAME_FORMAT = /^[^<>:"\\|\/?*]*[^<>:"\\|\/?*. ]$/;
    static WIN_DRIVE_FORMAT = /^[a-zA-Z]:$/;
    static WIN_RESERVED_NAMES = [
        "CON", "PRN", "AUX", "NUL",
        "COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9",
        "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9"
    ];

    constructor() { }

    parse(str) {
        const winPathFormat = /^([a-zA-Z]:)?\\([^\\;]+\\)*([^\\;]+)$/;
        const unixPathFormat = /^(\/[^\/:]+)+$/;

        if (str.split(";").every(s => winPathFormat.test(s))) {
            return this.#parseAsArray(str, {
                dirSep: "\\",
                splitPath: s => s.split(";"),
                splitDir: s => s.split("\\"),
                getInitDir: this.#getInitWinDir,
                validateName: this.#validateWindowComponentName,
                goUp: (components) => { if (components.length > 0) { components.pop(); } }
            });
        }
        if (str.split(":").every(s => unixPathFormat.test(s))) {
            return this.#parseAsArray(str, {
                dirSep: "/",
                splitPath: s => s.split(":"),
                splitDir: s => s.split("/"),
                getInitDir: () => "/",
                goUp: (components) => { if (components.length > 1) { components.pop(); } }
            });
        }

        throw new CannotParsePathError(`Use correct path format`)
    }

    /*
     * Common logic
     */

    #parseAsArray(str, action) {
        const components = [];
        for (const s of action.splitPath(str)) {
            const parsed = this.#parseSinglePath(s, action);

            if (parsed.length > 0) {
                components.push(new PathParseResult(parsed, action.dirSep));
            }
        }
        return components;
    }

    #parseSinglePath(str, action) {
        const components = []

        const names = action.splitDir(str);

        if (action.getInitDir !== undefined) {
            components.push(action.getInitDir(names));
        }

        for (const name of names.slice(1)) {
            if (action.validateName !== undefined) {
                action.validateName(name);
            }

            if (name === ".") {
                continue;
            }
            if (name === "..") {
                action.goUp(components);
            } else {
                components.push(name);
            }
        }

        return components;
    }

    /*
     * for Windows
     */

    /*
    * - Windows path name rules:
    *   - name cannot contain '<', '>', ':', '"', '\', '|', '/', '?', '*'
    *   - name cannot end with ' ' or '.'
    *   - name cannot start with CON, PRN, AUX, NUL, COM1, COM2, COM3, COM4, COM5,
    *       COM6, COM7, COM8, COM9, LPT1, LPT2, LPT3, LPT4, LPT5, LPT6, LPT7,
    *       LPT8, and LPT9
    * 
    *   reference:
    *   - https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file#naming-conventions
    */

    #getInitWinDir(names) {
        if (PathParser.WIN_DRIVE_FORMAT.test(names[0])) {
            return names[0];
        } else {
            return PathParser.#WIN_ROOT_DRIVE;
        }
    }

    #validateWindowComponentName(name) {
        if (name === "." || name === "..") {
            return;
        }
        if (PathParser.WIN_DRIVE_FORMAT.test(name)) {
            return;
        }

        const nameFormat = PathParser.WIN_NAME_FORMAT;
        const reserved = PathParser.WIN_RESERVED_NAMES;

        if (!nameFormat.test(name)) {
            throw new WinInvalidNameError(`Invalid name '${name}' is given; do not use reserved characters`)
        }
        if (reserved.some(r => name.startsWith(r))) {
            throw new WinReservedNameError(`The name '${name}' is reserved; try another name`);
        }
    }
}

class WinReservedNameError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "WinReservedNameError";
    }
}

class WinInvalidNameError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "WinInvalidNameError";
    }
}

class CannotParsePathError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "CannotParsePathError";
    }
}

module.exports = { PathParser, WinReservedNameError, WinInvalidNameError, CannotParsePathError, PathParseResult };