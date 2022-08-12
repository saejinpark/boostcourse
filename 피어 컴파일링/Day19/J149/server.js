import net from 'node:net'
import { getMission, parseCommand, hello } from './util.js';

let campers = [];
let groups = [[]];
let inPS = new Map();
let sessionidx = 0;

const server = net.createServer((c) => {
    const user = new UserSession(c);
    user.init();
})

server.listen(2022, "0.0.0.0", () => {
    console.log('BOOSTCAMP CHALLENGE SERVER STARTED');
});

function broadcast(group, msg, from) {
    console.log(`>> message to group#${group} => text="${msg}", from="${from}"`);
    groups[group].forEach(c => {
        c.chat(msg, from, "message");
    })
}

class UserSession {
    c;
    checkedIn = false;
    campId = '';
    group = -1;
    session = -1;
    constructor(c) {
        this.c = c;
        this.session = sessionidx++;
    }

    init() {
        this.sysMsg("Connected to " + JSON.stringify(server.address()) + ".\r\n" + 
        "Escape character is '^]'.\r\n=====================================================\r\n" +
        hello() +
        "\r\nex ) checkin J149\r\n");
        this.c.on('data', (data) => {
            //console.log('received msg : ' +data.toString());
            const [command, args] = parseCommand(data.toString());
    
            if(command.toLowerCase() === 'checkin') {
                this.checkIn(args);
                return;
            }
            if(command.toLowerCase() === 'checkout') {
                this.checkOut();
                return;
            }
            if(command.toLowerCase() === 'mission') {
                this.mission(args);
                return;
            }
            if(command.toLowerCase() === 'peersession') {
                this.peerSession(args);
                return;
            }
            if(command.toLowerCase() === 'complete') {
                this.complete();
                return;
            }
            if(command.toLowerCase() === 'message') {
                this.message(args);
                return;
            }
            if(command.toLowerCase() === 'direct') {
                this.direct(args);
                return;
            }
            this.sysMsg("잘못된 명령어입니다.");
    
        });

        this.c.on("error", (e) => {
            if(this.checkedIn === true) this.checkOut();
        })
    }

    sysMsg(str) {
        let msg = {type : "msgRaw", data : str};
        this.c.write(JSON.stringify(msg));
    }

    chat(str, from, cmd) {
        let msg = {type : "msg", data : str, sender : from, command : cmd};
        this.c.write(JSON.stringify(msg));
    }

    checkIn(args) {
        if(this.checkedIn) {
            this.sysMsg("이미 체크인 했습니다!");
            return;
        }
        if(!args.match(/J\d{3}/)) {
            this.sysMsg("잘못된 아이디 형식입니다!");
            return;
        }
        const no = parseInt(args.slice(1));
        if(no < 1 || no > 384) {
            this.sysMsg("잘못된 아이디 형식입니다!");
            return;
        }
        if(campers[no]) {
            this.sysMsg("이미 체크인 한 사람이 있습니다!");
            return;
        }
        
        campers[no] = this;
        this.campId = args;
        
        // 빈 그룹 찾기
        for(var i=0; i<groups.length; i++) {
            if(groups[i].length < 1) {
                groups[i].push(this);
                this.group = i;
            }
        }
        if(this.group === -1) {
            groups.push([this]);
            this.group = groups.length - 1;
        }

        this.sysMsg(`${this.campId} of group #${this.group} checkin success`);
        console.log(`>> checkin ${this.campId} (success) from ${this.c.address().address}:${this.c.address().port} => session#${this.session}, group#${this.group}`)
        this.checkedIn = true;
        return;
    }

    checkOut() {
        console.log(`>> checkout from session#${this.session}(${this.campId}) - disconnected`);
        broadcast(this.group, `${this.campId} in your group#${this.group} checked out`, "server");
        const no = parseInt(this.campId.slice(1));
        campers[no] = null;
        let idx = groups[this.group].indexOf(this);
        groups[this.group].splice(idx, 1);
        this.sysMsg("checkout (disconnected)");
        
        this.c.destroy();
    }

    mission(args) {
        const ret = getMission(args);
        if(ret) {
            this.sysMsg(`keywords are "${ret}"`);
            console.log(`>> mission from session#${this.session}(${this.campId}) : args => '${ret}'`)
        } else {
            this.sysMsg("잘못된 명령어 형식 또는 날짜입니다!");
        }
        return;
    }

    peerSession(args) {
        // peersession maxCount=2
        // peersession 2
        const reg = /(?:maxCount *= *)?(?<count>\d+)/i;
        if(!args.match(reg)) {
            this.sysMsg("잘못된 명령어 형식입니다!");
            return;
        }
        if(inPS.has(this.group)) {
            this.chat("이미 피어세션이 진행중입니다! 남은 카운트 : " + inPS.get(this.group), "server", "message");
            return;
        }
        console.log(`>> peersession from session#${this.session}(${this.campId})`);

        const {groups : {count}} = args.match(reg);
        inPS.set(this.group, parseInt(count));

        broadcast(this.group, "피어세션이 시작되었습니다", "server" ,"message");
        //console.log(`message to group#${this.group} => "피어세션이 시작되었습니다", from="server"`);

        return;
    }

    complete() {
        if(!inPS.has(this.group)) {
            this.chat("현재 피어세션이 진행중이지 않습니다.", "server", "message");
            return;
        }
        inPS.delete(this.group);

        broadcast(this.group, "피어세션이 종료되었습니다", 'server');
        return;
    }
    
    message(args) {
        // message msg
        const reg = /("?)(?<content>[\S ]+)(\1)/i;
        if(!args.match(reg)) {
            this.sysMsg("잘못된 명령어 형식입니다!");
            return;
        }
        if(!inPS.has(this.group)) {
            this.chat("현재 피어세션이 진행중이지 않습니다.", "server" , "message");
            return;
        }
        const {groups : {content}} = args.match(reg);
        console.log(`>> message from session#${this.session}(${this.campId}) => "${content}"`);

        let count = inPS.get(this.group);
        if(count === 1) {
            this.complete();
        } else inPS.set(this.group, count - 1);
        broadcast(this.group, content, this.campId);
        return;
    }
    
    direct(args) {
        const reg = /J(?<dest>[\d]{3}) (?<msg>[\S ]+)/i;
        if(!args.match(reg)) {
            this.sysMsg("잘못된 명령어 형식입니다!");
            return;
        }
        const {groups : {dest, msg}} = args.match(reg);
        if(!campers[parseInt(dest)]) {
            this.sysMsg(`J${dest} 캠퍼가 없습니다!`);
            return;
        }
        
        campers[parseInt(dest)].chat(msg, this.campId, "direct");
        this.sysMsg("direct (success)");
        console.log(`>> direct from session#${this.session}(${this.campId}) => to="J${dest}", text="${msg}"`);
    }
}