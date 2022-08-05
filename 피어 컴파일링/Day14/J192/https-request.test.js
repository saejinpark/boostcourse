const httpsRequest = require("./https-request");

describe("HttpsRequest", () => {
    const testcases = [
        { host: "www.google.com" },
        { host: "www.naver.com" },
        { host: "pm.pstatic.net", path: "/dist/css/nmain.20220720.css" },
    ].map(e => [e]);

    test.each(testcases)("For %o", async ({host, path}) => {
        const { statusCode, resTime, dlTime, text } = await httpsRequest(host, { path });
        
        expect(statusCode).toBe(200);
        expect(resTime).toBeGreaterThan(0);
        expect(dlTime).toBeGreaterThan(0);
        expect(typeof text).toBe("string");
        expect(text.length).toBeGreaterThan(0);
    });
});