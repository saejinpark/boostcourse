class ApplicationLayer {
    encode(fromAddr, toAddr, title, attach) {
        const buffer = [];
        buffer.push(`From: ${fromAddr}\r\n`);
        buffer.push(`To: ${toAddr}\r\n`);
        buffer.push(`Title: ${title}\r\n`);
        buffer.push(`\r\n`);
        buffer.push(`${attach}`);

        const message = buffer.join("");
        return buffer.join("");
    }
}

module.exports = ApplicationLayer;