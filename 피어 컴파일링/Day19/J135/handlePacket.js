import handleCheckIn from "./handleCheckIn.js";
import handleCheckOut from "./handleCheckOut.js";
import handleComplete from "./handleComplete.js";
import handleDirect from "./handleDirect.js";
import handleMessage from "./handleMessage.js";
import handleMission from "./handleMission.js";
import handlePeersession from "./handlePeersession.js";
import TYPE from "./type.js";

const handlePacket = (parameters) => {
  switch (parameters.packet.type) {
    case TYPE.In:
      handleCheckIn(parameters);
      break;

    case TYPE.Out:
      handleCheckOut(parameters);
      break;

    case TYPE.Mission:
      handleMission(parameters);
      break;

    case TYPE.Peer:
      handlePeersession(parameters);
      break;

    case TYPE.Complete:
      handleComplete(parameters);
      break;

    case TYPE.Msg:
      handleMessage(parameters);
      break;

    case TYPE.Direct:
      handleDirect(parameters);
      break;
  }
};

export default handlePacket;
