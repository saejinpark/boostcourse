const https = require("https");

/*
 * https-request.js:
 *   wrapper promise module of https.request()
 */

const httpsRequest = (hostname, { path } = {}) => {
    return new Promise((resolve, reject) => {
        const options = { hostname, path, protocol: "https:", port: 443, method: "GET", header: { 'Content-Length': 1024 } };

        let statusCode;
        const curTs = Date.now(); // current timestamp
        let resTs; // response timestamp
        let dlTs; // download timestamp
        const data = [];
        let size = 0;

        const req = https.request(options, res => {
            statusCode = res.statusCode;
            resTs = Date.now();

            res.on("data", chunk => {
                data.push(chunk);
                size += chunk.length;
            });
            
            res.on("end", () => {
                dlTs = Date.now();
            });
        });

        // return result object when connection closed
        req.on("close", () => {
            resolve({
                statusCode,
                size,
                resTime: resTs - curTs,
                dlTime: dlTs - resTs,
                text: data.map(chunk => chunk.toString()).join("") // stringify
            });
        });

        req.end();
    });
};

module.exports = httpsRequest;