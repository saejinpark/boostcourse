// 이벤트 매니저
class EventManager{
    constructor(){
        this.subscribers = [];
    }
    // 수신자 추가
    add(Subscriber,eventName,sender,handler){
        const obj = {
        Subscriber : Subscriber,
        eventName : eventName,
        sender : sender,
        handler : handler
    };
    this.subscribers.push(obj)
    }

    // 수신자 제거
    remove(Subscriber){
        const newArr = this.subscribers.reduce((ac,v)=> v.Subscriber.name === Subscriber.name ? ac : [...ac,v], [] )
        this.subscribers = newArr
    }

    // 이벤트 발행
    postEvent(name, sender, userData){
        const obj = {
            name : name,
            sender : sender,
            userData : userData
        }
    }
}

// 발행자
class Publisher{
    constructor(name){
        this.name = name
    }
}

// 수신자
class Subscriber{
    constructor(name){
        this.name = name
    }
}

// 이벤트 매니저 싱글톤
let instance;
function sharedInstance(){
    if(instance){return instance}
    instance = new EventManager()
    return instance
}


const manager = sharedInstance()
const userP = new Publisher('userP')
const userS = new Subscriber('userS')

manager.add(userS, 'click', userP, 'handle')
manager.remove(userS)
console.log(manager.subscribers)

