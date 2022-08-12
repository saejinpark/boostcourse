import Missions from "./missions.js";

const handleMission = (parameters) => {
  const { packet, client, clientAddress, clientPool, camperPool, groups } =
    parameters;

  if (clientAddress in clientPool) {
    const {
      [clientAddress]: { campId },
    } = clientPool;
    const day = packet.msg;
    const keywords = Missions[day];
    client.write(`[Server] ${day}의 키워드: ${keywords}`);
    console.log(`[Mission] ${day}: ${keywords} FROM ${campId}`);
  }
};

export default handleMission;
