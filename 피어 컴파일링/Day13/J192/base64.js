const util = require("./util");

class Base64 {
    encode(string) {
        let bits = [];
        for (const char of string) {
            const cc = char.charCodeAt(0);
            bits = bits.concat(this.#getBitsFromNum(cc, 8));
        }

        let buffer = [];
        while (bits.length > 0) {
            buffer.push(this.#getBase64CharFromBits(bits.slice(0, 6)));
            bits = bits.slice(6);
        }

        buffer = util.padToAlign(buffer, '=', 4);
        const encoded = buffer.join("");

        return encoded;
    }

    decode(string) {
        let bits = [];
        for (const char of string) {
            const num = this.#getNumFromBase64Char(char);
            bits = bits.concat(this.#getBitsFromNum(num, 6));
        }

        let buffer = [];
        while (bits.length > 0) {
            buffer.push(this.#getCharFromBits(bits.slice(0, 8)));
            bits = bits.slice(8);
        }

        buffer = buffer.filter(char => char.charCodeAt(0) !== 0); // discard null
        const decoded = buffer.join("");
        return decoded;
    }

    #getBitsFromNum(num, alignSize) {
        // read bit in reverse order
        let bits = [];
        while (num > 0) {
            bits.push(num & 0x1);
            num >>= 1;
        }

        // zero padding
        bits = util.padToAlign(bits, 0, alignSize);

        bits.reverse();
        return bits;
    }

    #getBase64CharFromBits(bits) {
        if (bits.length > 6) {
            throw new Error("Expected bits to be length less than or equal to 6")
        }

        // pad zeros
        bits = util.padToAlign(bits, 0, 6);

        // get char code (cc) number
        let cc = 0;
        bits.forEach(bit => {
            cc <<= 1;
            cc |= bit
        });

        // match table
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[cc];
    }

    #getNumFromBase64Char(char) {
        const cc = char.charCodeAt(0);
        const A = "A".charCodeAt(0);
        const Z = "Z".charCodeAt(0);
        const a = "a".charCodeAt(0);
        const z = "z".charCodeAt(0);
        const n0 = "0".charCodeAt(0);
        const n9 = "9".charCodeAt(0);
        const eq = "=".charCodeAt(0);

        if (A <= cc && cc <= Z) {
            return cc - A;
        }
        if (a <= cc && cc <= z) {
            return cc - a + 26;
        }
        if (n0 <= cc && cc <= n9) {
            return cc - n0 + 52;
        }
        if (char === "+") {
            return 62;
        }
        if (char === "/") {
            return 63;
        }
        if (cc === eq) {
            return 0;
        }
    }

    #getCharFromBits(bits) {
        if (bits.length > 8) {
            throw new Error("Expected bits to be length less than or equal to 8")
        }

        // pad zeros
        bits = util.padToAlign(bits, 0, 8);

        // get char code (cc) number
        let cc = 0;
        bits.forEach(bit => {
            cc <<= 1;
            cc |= bit
        });

        // match table
        return String.fromCharCode(cc);
    }
}

module.exports = Base64;