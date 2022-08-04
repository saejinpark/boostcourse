const Base64 = require("./base64");

describe("Base64 encoding", () => {
    const base64 = new Base64();

    const cases = [
        "g",
        "gm",
        "And",
        "FOOBAR",
        "FOOBARB",
        "gm",
        "And",
        "FOOBAR",
        "FOOBARB",
        "FOOBARBA",
        "FOOBARBAZ",

        // edge case
        "",
        "foo bar baz qux quux quuz corge grault garply waldo fred plugh xyzzy babble thud",

        // special characters
        "\t",
        "\r",
        "\n",

        // from sample example
        "Hello BoostCamper,",
        "Hello BoostCamper,\n\tThis message written by JK.\n",
        "Hello BoostCamper,\r\n\tThis message written by JK.",
    ].map(e => [e]);

    test.each(cases)("case %#", (input) => {
        expect(base64.encode(input)).toBe(Buffer.from(input).toString("base64"));
    });
});

describe("Base64 decoding", () => {
    const base64 = new Base64();

    const cases = [
        "Zw==",
        "aGVsbG8=",
        "SGVsbG8gQm9vc3RDYW1wZXIs",
    ].map(e => [e]);

    test.each(cases)("case %#", (input) => {
        expect(base64.decode(input)).toBe(Buffer.from(input, "base64").toString());
    });
});