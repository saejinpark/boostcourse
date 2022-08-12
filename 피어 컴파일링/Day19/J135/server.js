import net from "net";
import handleCheckOut from "./handleCheckOut.js";
import handlePacket from "./handlepacket.js";

const clientPool = {}; // ip - socket, campId, 그룹명
const camperPool = {}; // campId - ip
const groups = {}; // 그룹 번호 - 멤버 배열, 브로드 캐스트 여부

const server = net.createServer((client) => {
  client.setEncoding("utf-8");

  const clientAddress = `${client.remoteAddress}:${client.remotePort}`;
  console.log(`Client Connected: ${clientAddress}`);

  client.on("data", (raw) => {
    const packet = JSON.parse(raw.trim());
    const parameters = {
      packet,
      client,
      clientAddress,
      clientPool,
      camperPool,
      groups,
    };
    handlePacket(parameters);
    // client.end();
  });

  client.on("close", () => {
    if (clientAddress in clientPool) {
      const params = { client, clientAddress, clientPool, camperPool, groups };
      handleCheckOut(params);
    } else {
      console.log(`Client Disconnected: ${clientAddress}`);
    }
  });
});

server.listen(2022, "127.0.0.1", () => {
  const { address, port } = server.address();
  const serverAddress = `${address}:${port}`;
  console.log(`Server Address: ${serverAddress}`);
  console.log("Listening on Port 2022...");
});
