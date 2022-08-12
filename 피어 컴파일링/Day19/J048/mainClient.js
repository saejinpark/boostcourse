import { Client } from "./client.js";

const ip = "0.0.0.0";
const port = 2022;

const client = new Client();

client.connect(ip, port);
