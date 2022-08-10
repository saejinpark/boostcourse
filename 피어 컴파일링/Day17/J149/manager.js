import Delivery from "./delivery.js";
import Emitter from "./emitter.js";
import OrderList from "./orderlist.js";
import PowerChef from "./powerchef.js";
import TaskList from "./tasklist.js";
import { NumberofChefs, NumberofDeliverys, menu } from "./global.js";

export default class Manager {
    static #instance;
    emitter = new Emitter();
    list = new TaskList();
    orders = new OrderList();
    chefs = [];
    dels = [];

    // Mission 1
    c = new PowerChef("Chef");

    constructor(chefs = NumberofChefs, dels = NumberofDeliverys) { // singleton
        if(Manager.#instance) return Manager.#instance;
        else Manager.#instance = this;

        let expIndex = 1;
        for(var i=0; i<chefs; i++) {
            if(NumberofChefs > 2) {
                this.chefs.push(new PowerChef("Chef" + (i+1), expIndex));
                if(++expIndex > menu.size) expIndex = 1;
            } else {
                this.chefs.push(new PowerChef("Chef" + (i+1)));
            }
        }
        
        for(var i=0; i<dels; i++) {
            this.dels.push(new Delivery("Delivery" + (i+1)));
        }
        
        

        this.emitter.add(this, 'newOrder', undefined, (e) => {
            //console.log('Manager : newOrder eventHandler called');
            let idlechef;
            if(this.chefs.length > 2) {
                idlechef = this.checkIdleChef(e.data.menu.key);
            } else {
                idlechef = this.checkIdleChef();
            }
            if(idlechef) {
                this.list.pop();
                this.givejob(e.data, idlechef);
            }
        });
        this.emitter.add(this, 'chefDone', undefined, (e) => {
            //console.log('Manager : chefDone eventHandler called');
            let item;
            if(this.chefs.length > 2) {
                item = this.list.findOrderwithKey(this.findParentPowerchef(e.sender.name).expert);
                
            } else {
                item = this.list.pop();
            }
            if(item) {
                e.sender.startJob(item[0]);
            }
        });

        this.emitter.add(this, 'orderFoodCompleted', undefined, (e) => {
            // {name : customerMame}
            const idelDel = this.checkIdleDelivery();
            if(idelDel) {
                this.orders.pop();
                this.chulbal(e, idelDel);
            }
        })
        
    }

    checkIdleChef(menukey) {
        for(var i=0; i<this.chefs.length; i++) {
            if(menukey) {
                if(this.chefs[i].hasEmptyThread() && this.chefs[i].expert == menukey) {
                    return this.chefs[i];
                }
            } else if(this.chefs[i].hasEmptyThread()) {
                return this.chefs[i];
            }
        }

        /*
        let stat = this.c.hasEmptyThread();
        if(stat === true) return true;
        */
        return;
    }
    
    givejob(e, chef) {
        //console.log("called givejob");
        // el { menu {key, name, time}}
        chef.cook(e);
    }

    findParentPowerchef(name) {
        for(var i=0; i<this.chefs.length; i++) {
            if(this.chefs[i].name == name) return this.chefs[i];
        }
        return;
    }

    checkIdleDelivery() {
        for(var i=0; i<this.dels.length; i++) {
            if(this.dels[i].displayStatus()[0] === 0) return this.dels[i];
        }

        return;
    }

    chulbal(e, del) {
        del.startJob(e);
    }
}