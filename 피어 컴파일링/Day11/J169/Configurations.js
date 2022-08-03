/**
 * WINDOWS.splitDelimiter : .확장자;C:\
 * UNIX.splitDelimiter : .확장자:/
 */
const Configuration = {
    WINDOWS : {sep: '\\', 
        delimiter: ';', 
        splitDelimiter: /(?:\.\w{1,3}\;\w\:\\)/i, 
        componentReg: /(?:^\w*\:*\\)|(?:[^\\]+)/gi, 
        error: (/(?:[\\|\/|:|\*|\?|"|<|>|\||])|(?:^(CON|PRN|AUX|NUL|COM1|COM2|COM3|COM4|COM5|COM6|COM7|COM8|COM9|LPT1|LPT2|LPT3|LPT4|LPT5|LPT6|LPT7|LPT8|LPT9)$)|(?:\.$)/i)},
    UNIX : {sep: '/', 
        delimiter: ':', 
        splitDelimiter: /(?:\.\w{1,3}\:\/)/i, 
        componentReg: /(?:^\w*\/)|(?:[^\/]+)/g,
        error: (/(?:^(\.{1,2})$)|(?:[^\w\-.\s])/)}
}

Object.freeze(Configuration);

module.exports = Configuration;