import net from 'node:net'

const server = net.createServer((c) => {
    console.log("connected");
    console.log(c.address());
    c.on('end', () => {
        console.log("disconnected");
    });
    
    c.write("Connected to " + JSON.stringify(server.address()) + ".\r\n", "utf-8");
    c.write("Escape character is '^]'.\r\n");
    let buffer = '';
    c.on('data', (data) => {
        // 13 10

        buffer += data.toString();
        if(data.toString().indexOf(String.fromCharCode(13)) >= 0 || data.length > 3 || buffer.length > 1023) {
            console.log(buffer);
            c.write(buffer);
            c.destroy();
        }
        
    });
    
})

server.listen(2022, "0.0.0.0", () => {
    console.log('server bound');
});