function direct(toCamperId, text, fromCamperId, toClient) {
    let obj = {
        'message' : `direct from ${fromCamperId}, ${text}`
    }
    const toResponse = {
        'header' : `HTTP/1.1 200 OK`,
        'data' : obj
    }
    toClient.write(JSON.stringify(toResponse));
    obj = {
        'message': 'direct success!'
    }
    const response = {
        'header' : `HTTP/1.1 200 OK`,
        'data' : obj
    }

    return response;
}

module.exports = {direct};