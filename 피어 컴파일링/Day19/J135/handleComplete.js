const handleComplete = (parameters) => {
  const { packet, client, clientAddress, clientPool, camperPool, groups } =
    parameters;

  const {
    [clientAddress]: { campId, groupNumber },
  } = clientPool;

  const {
    [groupNumber]: { members, broadcast, maxCount },
  } = groups;

  if (campId === broadcast) {
    groups[groupNumber].broadcast = -1;
    groups[groupNumber].maxCount = undefined;
    for (let memberId of members) {
      const { [memberId]: memberAddress } = camperPool;
      const {
        [memberAddress]: { socket },
      } = clientPool;
      socket.write(
        `[Server] ${campId} 님이 Group#${groupNumber} 피어 세션 종료하셨습니다.`
      );
    }

    console.log(
      `[Complete] Group#${groupNumber} 피어 세션 종료 FROM ${campId}`
    );
  }
};

export default handleComplete;
