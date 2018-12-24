/**
 * @copyright Copyright (c) 2018 cheratt karim
 * @license MIT Licence
 */

 const Util = require('./util.js');

 /**
  * 
  * @param {string} topicName
  * 
  * @retruns {Object} New Topic instance 
  */
const Topic = function Topic(topicName){

    if(!Util.isString(topicName)){
        var errorMsg = `Topic.Topic() : topicName argument must be of type string`;            
        throw new TypeError(errorMsg);
    }

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
     * Get all registered events
     * 
     * @returns {Array<string>} array of event names
     */
    this.getEvent = function (){
        var result = Array.from(_eventMap.keys());
        return result;
    }

    /**
     * Register the event to the topic
     * 
     * @param   {string} eventName - event name
     * 
     * @returns {Array<string>} 
     */
    this.addEvent = function (eventName){
        if(!Util.isString(eventName)){
            var errorMsg = `Topic.addEvent() : eventName argument must be of type string`;            
            throw new TypeError(errorMsg);
        }
        var eventToken = Util.clean(eventName);
        if(!_eventMap.has(eventToken)){
            _eventMap.set(eventToken , new Map());
        }
        return this.getEvent();
    }

    /**
     * Remove the event from the topic and all its event listeners
     * 
     * @param {string} eventName
     * 
     * @returns {Array<string>} array of event names
     */

    this.removeEvent = function(eventName) {
        if(!Util.isString(eventName)){
            var errorMsg = `Topic.removeEvent() : eventName argument must be of type string`;            
            throw new TypeError(errorMsg);
        }
        var eventToken = Util.clean(eventName);
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
     * @returns {string} listener identifier
     */
    this.addListener = function(eventName , listenerValue){
        if(!Util.isString(eventName)){
            var errorMsg = `Topic.addListener() : eventName argument must be of type string`;            
            throw new TypeError(errorMsg);
        }
        var eventToken = Util.clean(eventName);
        if(!_eventMap.has(eventToken)){
            throw new Error( eventName + ' does not exist');
        }

        var listener = _eventMap.get(eventToken);
        var listenerId = eventToken + '/' + (listener.size + 1).toString();
            listener.set(listenerId , listenerValue);
        
        return listenerId;
    }

    /**
     * Get event listeners
     * 
     * @param {string} eventName
     * 
     * @returns {Array<any>}
     */    
    this.getListener = function(eventName){
        if(!Util.isString(eventName)){
            var errorMsg = `Topic.getListener() : eventName argument must be of type string`;            
            throw new TypeError(errorMsg);
        }
        var eventToken = Util.clean(eventName);
        var listener = _eventMap.get(eventToken);
        if(listener === undefined){
            return [];
        }
        return Array.from(listener.values());
    }
    

    /**
     * Remove event listener
     * 
     * @param {string} listenerId
     * 
     * @retruns {boolean}
     */
    this.removeListener = function(listenerId){
        if(!Util.isString(listenerId)){
            var errorMsg = `Topic.removeListener() : listenerId argument must be of type string`;            
            throw new TypeError(errorMsg);
        }
        var eventName = listenerId.split("/" , 1);
        var eventToken = Util.clean(eventName[0]);

        if(!_eventMap.has(eventToken)){
            throw new Error( eventName + ' does not exist');
        }

        var listenerMap  = _eventMap.get(eventToken);
        var deleteResult = listenerMap.delete(listenerId);
        return deleteResult;
    }


    /**
     * Dispatch event
     * 
     * @returns {undefined}
     */
    this.dispatch = function(eventName , message){
        if(!Util.isString(eventName)){
            var errorMsg = `Topic.dispatch() : eventName argument must be of type string`;            
            throw new TypeError(errorMsg);
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

module.exports = Topic;