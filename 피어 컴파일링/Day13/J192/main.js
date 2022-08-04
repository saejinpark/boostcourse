const Sender = require("./sender");

const srcIp = "192.168.1.2";
const srcPort = "10001";
const sender = new Sender(srcIp, srcPort);

const email = {
    from: "jk@boostcamp.connect.or.kr",
    to: "camper@boostcamp.connect.or.kr",
    title: "Hello World",
    attach: "Hello BoostCamper,\r\n\tThis message written by JK."
}
const destIp = "192.168.1.3";
const destPort = "8080";

sender.sendEmail(email, destIp, destPort);