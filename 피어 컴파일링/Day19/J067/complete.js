function complete(groupMember, camper) {
    groupMember.reduce((prev, cur) => {
        const client = camper[cur][0];
        const response = {
            'header' : `HTTP/1.1 200 OK`,
            'data' : {"message": "message from server, 피어세션이 종료되었습니다."}
        }
        client.write(JSON.stringify(response));
    }, '');
}

module.exports = {
    complete
}