const SessionLayer = require("./session-layer");

describe("Session", () => {
    const sesLayer = new SessionLayer();
    const cases = [
        // input
        "From: jk@boostcamp.connect.or.kr\r\n"
        + "To: camper@boostcamp.connect.or.kr\r\n"
        + "Title: Hello World\r\n"
        + "\r\n"
        + "SGVsbG8gQm9vc3RDYW1wZXIsDQoJVGhpcyBtZXNzYWdlIHdyaXR0ZW4gYnkgSksu"
    ].map(e => [e]);

    test.each(cases)("case %#", (input) => {
        const [from, to, title, blank, base64] = input.split("\r\n");
        const enc = sesLayer.encode(input);
        const [encFrom, encTo, encTitle, uuid, encBlank, encBase64] = enc.split("\r\n");

        // all is same but random session id
        expect(from).toBe(encFrom);
        expect(to).toBe(encTo);
        expect(title).toBe(encTitle);
        expect(uuid.startsWith("Session-Id: ")).toBe(true);
        expect(blank).toBe(encBlank);
        expect(base64).toBe(encBase64);
    });
});