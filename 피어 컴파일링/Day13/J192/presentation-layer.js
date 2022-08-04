const fs = require("fs");
const Base64 = require("./base64");

class PresentationLayer {
    encode(message) {
        // get attachment and rest
        const split = message.split("\r\n");
        const attach = split.slice(4).join("\r\n");
        const front = split.slice(0, 4).join("\r\n");

        const encodedAttach = new Base64().encode(attach);

        const encoded = [front, encodedAttach].join("\r\n");
        return encoded;
    }

    decode(message, fname) {
        // get base64-encoded attachment and rest
        const split = message.split("\r\n");
        const attach = split.slice(4).join("");
        const front = split.slice(0, 4).join("\r\n");
        
        const decodedAttach = new Base64().decode(attach);
        
        fs.writeFileSync(fname, decodedAttach);

        const decoded = [front, decodedAttach].join("\r\n");
        return decoded;
    }
}

module.exports = PresentationLayer;