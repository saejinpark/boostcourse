function Packet({ type, receiver, msg }) {
  this.type = type;
  this.receiver = receiver;
  this.msg = msg;
}

function IpInfo({ socket, campId, groupNumber }) {
  this.socket = socket;
  this.campId = campId;
  this.groupNumber = groupNumber;
}

function Group() {
  this.members = [];
  this.broadcast = 0;
  this.msgCount = 0;
  this.maxCount = undefined;
}

export { Packet, IpInfo, Group };
