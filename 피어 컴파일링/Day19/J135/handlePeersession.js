const handlePeersession = (parameters) => {
  const { packet, client, clientAddress, clientPool, camperPool, groups } =
    parameters;

  const maxCount = Number(packet.msg);
  const {
    [clientAddress]: { campId, groupNumber },
  } = clientPool;

  const {
    [groupNumber]: { members, broadcast },
  } = groups;

  if (broadcast === 0) {
    groups[groupNumber].broadcast = campId;
    groups[groupNumber].maxCount = maxCount;

    for (let memberId of members) {
      const memberAddress = camperPool[memberId];
      const {
        [memberAddress]: { socket },
      } = clientPool;
      socket.write(
        `[Server] Group#${groupNumber}의 피어 세션이 시작되었습니다. (maxCount: ${maxCount})`
      );
    }
    console.log(
      `[Peersession] Group#${groupNumber} 피어 세션 시작 (maxCount: ${maxCount}) FROM ${campId}`
    );
  }
};

export default handlePeersession;
