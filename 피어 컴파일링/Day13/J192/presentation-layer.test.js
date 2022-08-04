const PresentationLayer = require("./presentation-layer");

describe("Presentation layer encoding", () => {
    const presLayer = new PresentationLayer();
    const cases = [
        [
            // input
            "From: jk@boostcamp.connect.or.kr\r\n"
            + "To: camper@boostcamp.connect.or.kr\r\n"
            + "Title: Hello World\r\n"
            + "\r\n"
            + "Hello BoostCamper,\r\n\tThis message written by JK.",
            // expected
            "From: jk@boostcamp.connect.or.kr\r\n"
            + "To: camper@boostcamp.connect.or.kr\r\n"
            + "Title: Hello World\r\n"
            + "\r\n"
            + "SGVsbG8gQm9vc3RDYW1wZXIsDQoJVGhpcyBtZXNzYWdlIHdyaXR0ZW4gYnkgSksu"
        ],
    ];

    test.each(cases)("case %#", (input, expected) => {
        expect(presLayer.encode(input)).toEqual(expected);
    });
});