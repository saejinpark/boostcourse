export default class Event {
    eventName = '';
    sender;
    data;
    constructor(eventName, sender, data) {
        this.eventName = eventName;
        this.sender = sender;
        this.data = data;
    }
}