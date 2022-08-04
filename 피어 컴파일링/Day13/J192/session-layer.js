const crypto = require("crypto");

class SessionLayer {
    encode(message) {
        // split
        const split = message.split("\r\n");
        const front = split.slice(0, 3).join("\r\n");
        const rest = split.slice(3).join("\r\n");

        const uuid = crypto.randomUUID();
        const uuidStr = `Session-Id: ${uuid}`;
        
        return [front, uuidStr, rest].join("\r\n");
    }

    decode(message) {
        // split
        const split = message.split("\r\n");
        const front = split.slice(0, 3).join("\r\n");
        const rest = split.slice(4).join("\r\n");
        
        return [front, rest].join("\r\n");
    }
}

module.exports = SessionLayer;