import net from 'node:net'
import readline from 'readline';

const rl = readline.createInterface({input: process.stdin, output: process.stdout});

const c = net.connect({port:2022, host:'localhost'}, () => {
    console.log("Connected to " + JSON.stringify(c.address()));

    // Data 핸들링
    /**
     * type : msg | msgRaw
     * command : "message" | "direct"
     * sender : campId | "server"
     * data : string
     */
    c.on("data", (data) => {
        const d = JSON.parse(data);
        if(d.type === "msgRaw") console.log(d.data);
        if(d.type === "msg") console.log(`${d.command} from ${d.sender}, "${d.data}"`);
        rl.prompt();
    })

    rl.on("line", (l) => {
        c.write(l);
        rl.prompt();
    })

    c.on("close", () => {
        rl.close();
    })

    c.on("error", (e) => {
        console.log("Connection lost!");
        rl.close();
    })
})
