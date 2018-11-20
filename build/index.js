/**
 * EventSet
 * @copyright Copyright (c) 2018 cheratt karim
 * @license MIT Licence
 */
var isString = function(param){
    return (typeof param === 'string' && param !== '');
}

var token = function(name){
    return name.toString().toLowerCase().replace(/\s/g, "");
}

var EventMap = function(topicName){

    var _eventMap = new Map();

    this.getTopicName = function(){
        return topicName;
    }

    this.addEvent = function (eventName){
        if(!isString(topicName)){
            throw new TypeError('bad argument given to addEvent()');
        }
        var eventToken = token(eventName);
        if(!_eventMap.has(eventToken)){
            _eventMap.set(eventToken , new Set());
            return true;
        }
        return false;
    }
    
    /**
     * @returns Set<any> listener set
     */
    this.addListener = function( eventName , listenerObject){
        if(!isString(topicName)){
            throw new TypeError('bad first argument given to addListener()');
        }
        var eventToken = token(eventName);
        if(!_eventMap.has(eventToken)){
            const msg = eventName + ' does not exist';
            throw new Error(msg);
        }
        var listener = _eventMap.get(eventToken);
            listener.add(listenerObject);
        
        return listener;
    }

    /**
     * @returns Set<any> listener set
     */    
    this.getListener = function(eventName){
        if(!isString(topicName)){
            throw new TypeError('bad argument given to getListener()');
        }
        var eventToken = token(eventName);
        var listener = _eventMap.get(eventToken);
        if(listener === undefined){
            return new Set();
        }
        return listener;
    }
    

    /**
     * 
     */
    this.removeListener = function(eventName , listenerObject){
        if(!isString(topicName)){
            throw new TypeError('bad first argument given to removeListener()');
        }
        var eventToken = token(eventName);
        if(_eventMap.has(eventToken)){
            var listener = _eventMap.get(eventToken);
                listener.delete(listenerObject);
            return listener;
        }
        return false;
    }

    /**
     * 
     */
    this.dispatch = function(eventName , message){
        if(!isString(topicName)){
            throw new TypeError('bad first argument given to dispatch()');
        }
        var copyMessage = JSON.parse(JSON.stringify(message));
        var listenerSet = this.getListener(eventName);

        if(listenerSet instanceof Set){
            listenerSet.forEach(function(listener){

                if(typeof listener === 'function'){
                    listener({
                        topicName    : topicName,
                        eventName    : eventName, 
                        eventMessage : copyMessage
                    });
                }
            });
        }
    }
}


var EventSet = {

    createTopic : function(topicName){
        if(!isString(topicName)){
            throw new TypeError('bad argument given to EventSet.createTopic()');
        }

        var eventMap = new EventMap(topicName);        
        return eventMap;
    },

    token : function(name){
        return token(name);
    }
}

module.exports = EventSet;