const handleCheckOut = (parameters) => {
  const { packet, client, clientAddress, clientPool, camperPool, groups } =
    parameters;

  const {
    [clientAddress]: { campId, groupNumber },
  } = clientPool;

  if (campId in camperPool) {
    groups[groupNumber].members = groups[groupNumber].members.filter(
      (id) => id !== campId
    );

    const {
      [groupNumber]: { members },
    } = groups;

    if (members.length === 0) {
      delete groups[groupNumber];
    } else {
      for (let memberId of members) {
        const memberAddress = camperPool[memberId];
        const {
          [memberAddress]: { socket },
        } = clientPool;
        socket.write(
          `[Server] ${campId} 님이 Group#${groupNumber}을 떠나셨습니다. (현재 인원: ${members.length}/4)`
        );
      }
    }

    delete clientPool[clientAddress];
    delete camperPool[campId];

    client.write("checkout");
    client.end();
    console.log(`[CheckOut] ${campId}(${clientAddress}) Group#${groupNumber}(${members.length}/4)`);
  }
};

export default handleCheckOut;
