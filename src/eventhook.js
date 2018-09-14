/**
 * EventSet
 * @copyright Copyright (c) 2018 cheratt karim
 * @license MIT Licence
 */

export default class Hook{

    before(message){
        return message;
    }

    after(message){
        return message;
    }

    beforeNotify(userCallBack){
        if(typeof userCallBack === "function"){
           this.before = userCallBack;
        }
    }

    afterNotify(userCallBack){ 
        if(typeof userCallBack === "function"){
            this.after = userCallBack;
        }
    }
}