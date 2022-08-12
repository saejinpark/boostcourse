import { Server } from "./server.js";
import { Client } from "./client.js";

const port = 2022;

const server = new Server();
const client = new Client();
// server.startEchoServer(port);
server.startChallengeServer(port);
