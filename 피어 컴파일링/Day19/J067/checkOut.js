const chalk = require('chalk');

function checkout(clientId, groupId, groupMember, peer, sessionId, camper) {
    groupMember.reduce((prev, cur) => {
        const client = camper[cur][0];
        if (cur !== clientId) {
            response = {
                'header' : `HTTP/1.1 200 OK`,
                'data' : {"message": `${clientId} checkout!`}
            }
            client.write(JSON.stringify(response));
        } else {
            response = {
                'header' : `HTTP/1.1 200 OK`,
                'data' : {"message": `checkout disconnected`},
                'type' : 'checkout'
            }
            client.write(JSON.stringify(response));
        }
    }, '');
    if (groupMember.length !== 1) console.log(chalk.green(`>>(success) message to group#${groupId + 1} => "${clientId} Checkout!" from ="server"`));
    console.log(chalk.green(`>>(success) checkout from session#${sessionId}(${clientId}) - disconnected`));
    return response;
}

module.exports = {
    checkout
}