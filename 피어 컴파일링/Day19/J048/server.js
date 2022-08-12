import net from "net";

class Server {
  constructor() {
    this.server = null;
    this.clients = new Map();
    this.groups = [[]];
    this.maxCnt = new Map();
    this.newSessionId = 1;
    this.mission = {
      day1: "IDE, node",
      day2: "Linux, Shell",
      day3: "Crawling, LRU",
      day4: "Heap, Stack",
      day6: "XML, XPath",
      day7: "Object, Class",
      day8: "CountSet, Closure",
      day9: "Process, Thread",
      day11: "Path, UnitTest",
      day12: "Git, Objects",
      day13: "OSI, TCP/IP",
      day14: "HTTP, Request",
      day16: "Event, Async",
      day17: "Food, Delivery",
      day18: "SQL, Report",
      day19: "Network, Server",
    };
  }

  startEchoServer(port) {
    this.server = net.createServer((socket) => {
      console.log("클라이언트 접속");
      console.log("IP주소: ", socket.remoteAddress);
      console.log("PORT 번호: ", socket.localPort);
      socket.write("Hello world\n");
      let data = "";

      socket.on("data", (chunk) => {
        data += chunk.toString();

        for (let i = 0; i < data.length; i += 1024) {
          console.log(data.slice(i, i + 1024));
          socket.write(data.slice(i, i + 1024));
        }
        data = "";
        socket.end();
      });

      socket.on("end", () => {
        console.log("Connection closed by foreign host.");
      });
    });
    this.#serverHandler();
    this.server.listen(port);
  }

  startChallengeServer(port) {
    this.server = net.createServer((socket) => {
      socket.on("data", (request) => {
        request = JSON.parse(request);
        let command = request.command;
        switch (command) {
          case "CHECKIN":
            this.#checkIn(socket, request);
            break;
          case "CHECKOUT":
            this.#checkout(socket, request);
            break;
          case "MISSION":
            this.#mission(socket, request);
            break;
          case "PEER":
            this.#peersession(socket, request);
            break;
        }
      });
      socket.on("end", () => {
        if (this.clients.has(socket)) {
          this.#checkout(socket);
        }
      });
    });
    this.#serverHandler();
    this.server.listen(port);
  }

  #checkIn(socket, request) {
    let data = null;
    let id = request.body.id;
    let intId = parseInt(id.replace("J", ""));

    if (0 < intId && intId < 384 && !this.#alreadyCheckin(id)) {
      let groupId = this.#assignGroup(socket);
      this.clients.set(socket, {
        campId: id,
        sessionId: this.newSessionId++,
        checkInDate: new Date(),
        groupId: groupId,
      });
      console.log(
        `checkin ${id} (success) from ${request.header.userAgent} => session#${sessionId}, group#${groupId}`
      );
      data = {
        command: "CHECKIN",
        statusCode: 200,
        statusText: "success",
        body: { groupId: groupId },
      };
    } else {
      data = {
        command: "CHECKIN",
        statusCode: 400,
        statusText: "failed to check in",
      };
    }
    socket.write(JSON.stringify(data));
  }

  #assignGroup(socket) {
    let groupId = 0;
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].length < 4) {
        this.groups[i].push(socket);
        groupId = i + 1;
        return groupId;
      }
    }
    this.groups.push([socket]);
    groupId = this.groups.length;
    return groupId;
  }
  #checkout(socket) {
    let { campId, sessionId, checkInDate, groupId } = this.clients.get(socket);
    this.clients.delete(socket);
    let idx = this.groups[groupId - 1].indexOf(socket);
    this.groups[groupId - 1].splice(idx, 1);
    console.log(`checkout from session#${sessionId}(${campId}) - disconnected`);
    let activityTime = Date.now() - checkInDate;
    let data = {
      statusCode: 200,
      statusText: "success",
      command: "CHECKOUT",
      body: { activityTime: this.#msToTime(activityTime) },
    };

    socket.write(JSON.stringify(data));
  }
  #mission(socket, request) {
    let day = request.body.day;
    let campId = request.body.campId;
    let keywords = this.mission[day];
    let data = {
      statusCode: 200,
      statusText: "success",
      command: "MISSION",
      body: { keywords: keywords },
    };
    let sessionId = this.clients.get(socket).sessionId;
    console.log(
      `mission from session#${sessionId}(${campId}) : ${day} => '${keywords}'`
    );
    socket.write(JSON.stringify(data));
  }

  #peersession(socket, request) {
    let maxCnt = request.body.maxCnt;
    let { campId, sessionId, checkInDate, groupId } = this.clients.get(socket);
    this.maxCnt.set(groupId, [maxCnt, 0]);
    let data = {
      statusCode: 200,
      statusText: "success",
      command: "PEER",
      body: { message: 'message from server, "피어세션이 시작되었습니다"' },
    };
    for (let s of this.groups[groupId - 1]) {
      s.write(JSON.stringify(data));
    }
  }

  #msToTime(sec) {
    let ms = sec % 1000;
    sec = (sec - ms) / 1000;
    let secs = sec % 60;
    sec = (sec - secs) / 60;
    let mins = sec % 60;
    let hrs = (sec - mins) / 60;

    return hrs + ":" + mins + ":" + secs + "." + ms;
  }

  #serverHandler() {
    this.server.on("listening", () => {
      console.log("Server is listening");
    });

    this.#closeServer();
  }

  #closeServer() {
    this.server.on("close", () => {
      console.log("Server closed");
    });
  }

  #alreadyCheckin(id) {
    return this.clients.has(id);
  }
}
export { Server };
