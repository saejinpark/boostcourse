const util = require("./util");

describe("Util: padToAlign()", () => {
    const cases = [
        // arr, pad, size, expected
        [[1], 0, 2, [1, 0]],
        [[1], 0, 3, [1, 0, 0]],
        [[1], 0, 4, [1, 0, 0, 0]],

        [[1, 1], 0, 4, [1, 1, 0, 0]],
        [[1, 1, 1], 0, 4, [1, 1, 1, 0]],
        [[1, 1, 1, 1], 0, 4, [1, 1, 1, 1]],

        [[1, 2, 3], 0, 3, [1, 2, 3]],
        [[1, 2, 3, 4], 0, 3, [1, 2, 3, 4, 0, 0]],
        [[1, 2, 3, 4, 5], 0, 3, [1, 2, 3, 4, 5, 0]],
        [[1, 2, 3, 4, 5, 6], 0, 3, [1, 2, 3, 4, 5, 6]],
    ];

    test.each(cases)("case %#", (arr, pad, size, expected) => {
        expect(util.padToAlign(arr, pad, size)).toEqual(expected);
    });
});