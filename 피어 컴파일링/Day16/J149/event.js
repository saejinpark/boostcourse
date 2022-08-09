export default class Event {
    eventName = '';
    sender;
    userData;
    constructor(eventName, sender, userData) {
        this.eventName = eventName;
        this.sender = sender;
        this.userData = userData;
    }
}