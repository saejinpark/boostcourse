class publisher{
    constructor(name='dummy') {
        this.name = name;
    }

    post(name, userData, eventManager) {
        eventManager.postEvent(name, this, userData);
    }

    delayPost(name, userData, eventManager) {
        eventManager.delayPostEvent(name, this, userData);
    }

    asyncPost(name, userData, eventManager) {
        eventManager.asyncPostEvent(name, this, userData);
    }
}

module.exports = {
    publisher
}