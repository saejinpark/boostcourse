import Emitter from "./emitter.js";
import Queue from "./queue.js";

export default class TaskList {
    static #instance;
    emitter = new Emitter();
    list = new Queue();
    constructor() { // singleton
        if(TaskList.#instance) return TaskList.#instance;
        else TaskList.#instance = this;
        this.emitter.add(this, 'newTaskInput', undefined, (m) => {
            //console.log("TaskList : newInput eventHandler called");
            this.push(m.data)
        })
    }
    
    push(el) {
        let ret = this.list.push(el);
        this.emitter.emit('newOrder', this, el);
        return ret;
    }

    pop() {
        return this.list.pop();
    }

    findOrderwithKey(key) {
        for(var i=0; i<this.list.data.length; i++) {
            if(this.list.data[i].menu.key == key) {
                return this.list.data.splice(i, 1);
            }
        }
        return;
    }
}