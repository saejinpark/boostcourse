import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import path from "path";

import { sharedInstance } from "./database.js";

const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = path.resolve();

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    socket.on("create", (data) => socket.emit("create", sharedInstance().create(data)));
    socket.on("insert", (data) => socket.emit("insert", sharedInstance().insert(data)));
    socket.on("delete", (data) => socket.emit("delete", sharedInstance().delete(data)));
    socket.on("update", (data) => socket.emit("update", sharedInstance().update(data)));
    socket.on("select", (data) => socket.emit("select", sharedInstance().select(data)));
    socket.on("drop", (data) => socket.emit("drop", sharedInstance().drop(data)));
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
