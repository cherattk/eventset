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
        if( (!!userCallBack) && typeof userCallBack === "function"){
           this.before = function(message){
                return userCallBack(message);
           };
        }
    }

    afterNotify(userCallBack){ 
        if( (!!userCallBack) && typeof userCallBack === "function"){
            this.after = function(message){
                return userCallBack(message);
            };
        }
    }
}