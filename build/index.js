/**
 * EventSet
 * @copyright Copyright (c) 2018 cheratt karim
 * @license MIT Licence
 */

var Topic = function Topic(topicName){

    var _eventMap = new Map();

    /**
     * Get Topic Name
     * 
     * @returns {string} topic name
     */
    this.getName = function(){
        return topicName;
    }


    /**
     * Get all topic events
     * 
     * @returns {Array<string>}
     */
    this.getEvent = function (){
        var result = Array.from(_eventMap.keys());
        return result;
    }

    /**
     * Add the event to the topic
     * 
     * @param   {string} eventName - event name
     * 
     * @returns {Array<string>}
     */
    this.addEvent = function (eventName){
        if(!EventSet.isString(eventName)){
            throw new TypeError('bad argument given to addEvent()');
        }
        var eventToken = EventSet.token(eventName);
        if(!_eventMap.has(eventToken)){
            _eventMap.set(eventToken , new Set());
        }      

        return this.getEvent();
    }

    /**
     * Remove the event from the topic and all its event listeners
     * 
     * @param {string} eventName
     * 
     * @returns {Array<string>}
     */

    this.removeEvent = function(eventName) {
        if(!EventSet.isString(eventName)){
            throw new TypeError('bad argument given to addEvent()');
        }
        var eventToken = EventSet.token(eventName);
        if(_eventMap.has(eventToken)){
            _eventMap.delete(eventToken);
        }

        return this.getEvent();
    }
    
    /**
     * Register event listener
     * 
     * @param {string} eventName
     * @param {any} listener
     * 
     * @returns {Array<any>}
     */
    this.addListener = function(eventName , listenerValue){
        if(!EventSet.isString(eventName)){
            throw new TypeError('bad first argument given to addListener()');
        }
        var eventToken = EventSet.token(eventName);
        if(!_eventMap.has(eventToken)){
            const msg = eventName + ' does not exist';
            throw new Error(msg);
        }
        var listener = _eventMap.get(eventToken);
            listener.add(listenerValue);
        
        return Array.from(listener);
    }

    /**
     * Get event listeners
     * 
     * @param {string} eventName
     * 
     * @returns {Array<any>}
     */    
    this.getListener = function(eventName){
        if(!EventSet.isString(eventName)){
            throw new TypeError('bad argument given to getListener()');
        }
        var eventToken = EventSet.token(eventName);
        var listener = _eventMap.get(eventToken);
        if(listener === undefined){
            return [];
        }
        return Array.from(listener);
    }
    

    /**
     * Remove event listener
     * 
     * @param {string} eventName
     * @param {any} listenerValue
     * 
     * @retruns {Array<any>}
     */
    this.removeListener = function(eventName , listenerValue){
        if(!EventSet.isString(eventName)){
            throw new TypeError('bad first argument given to removeListener()');
        }
        var eventToken = EventSet.token(eventName);
        if(_eventMap.has(eventToken)){
            var listener = _eventMap.get(eventToken);
                listener.delete(listenerValue);
            return Array.from(listener);
        }
        return [];
    }

    /**
     * Dispatch event
     * 
     * @returns {undefined}
     */
    this.dispatch = function(eventName , message){
        if(!EventSet.isString(eventName)){
            throw new TypeError('bad first argument given to dispatch()');
        }
        var copyMessage = JSON.parse(JSON.stringify(message));
        var listenerArray = this.getListener(eventName);

        listenerArray.forEach(function(listener){
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


var EventSet = {

    createTopic : function(topicName){
        if(!EventSet.isString(topicName)){
            throw new TypeError('bad argument given to EventSet.createTopic()');
        }
        var eventMap = new Topic(topicName);
        return eventMap;
    },

    token : function(param){
        return param.toString().toLowerCase().replace(/\s/g, "");
    },

    isString : function(param){
        return (typeof param === 'string' && param !== '');
    }
}

module.exports = EventSet;