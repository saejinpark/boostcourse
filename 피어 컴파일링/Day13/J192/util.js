class Util {
    // pad 'arr' with 'padded' to align with 'size'
    // ex. padToAlign(["A"], "B", 3) === ["A", "B", "B"]
    //     padToAlign(["A", "A", "A", "A"], "B", 3) === ["A", "A", "A", "A", "B", "B"]
    static padToAlign(arr, pad, size) {
        if (arr.length % size === 0) {
            return arr;
        }

        const copy = Array.from(arr);

        let padLen = size - (arr.length % size);
        while (padLen > 0) {
            copy.push(pad);
            --padLen;
        }

        return copy;
    }
}

module.exports = Util;