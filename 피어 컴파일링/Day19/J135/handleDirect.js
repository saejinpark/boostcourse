const handleDirect = (parameters) => {
  const { packet, client, clientAddress, clientPool, camperPool, groups } =
    parameters;

  const { receiver: targetId, msg: message } = packet;

  if (targetId in camperPool) {
    const { [targetId]: targetAddress } = camperPool;

    const {
      [targetAddress]: { socket },
      [clientAddress]: { campId },
    } = clientPool;

    socket.write(`[${campId}'DM] ${message}`);
    console.log(`[DM] ${campId}->${targetId}: ${message}`);
  }
};

export default handleDirect;
