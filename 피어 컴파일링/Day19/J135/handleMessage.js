const handleMessage = (parameters) => {
  const { packet, client, clientAddress, clientPool, camperPool, groups } =
    parameters;

  const message = packet.msg;

  const {
    [clientAddress]: { campId, groupNumber },
  } = clientPool;

  const {
    [groupNumber]: { members, broadcast, msgCount, maxCount },
  } = groups;

  if (isNaN(broadcast) && msgCount < maxCount) {
    groups[groupNumber].msgCount++;

    for (let memberId of members) {
      if (memberId !== campId) {
        const { [memberId]: memberAddress } = camperPool;
        const {
          [memberAddress]: { socket },
        } = clientPool;

        socket.write(
          `[${campId}'s GroupMessage] ${message} (${msgCount}/${maxCount})`
        );
      }
    }
    console.log(
      `[GroupMessage] Group#${groupNumber}: ${message} FROM ${campId} (${msgCount}/${maxCount})`
    );
  }
};

export default handleMessage;
