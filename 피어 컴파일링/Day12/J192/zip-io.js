const zlib = require("zlib");
const fs = require("fs");

class ZipIO {
    read(fname) {
        const buffer = fs.readFileSync(fname);
        return zlib.inflateSync(buffer).toString();
    }

    write(fname, str) {
        const deflated = zlib.deflateSync(str);
        fs.writeFileSync(fname, deflated);
    }
}

module.exports = ZipIO;