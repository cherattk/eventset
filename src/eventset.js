/**
 * EventSet
 * @copyright Copyright (c) 2018 cheratt karim
 * @license MIT Licence
 */

/** @package */
var TopicStore = new Map();

function isString(param){
    return (typeof param === 'string' && param !== '');
}

export default class EventSet {

    constructor(topicName) {
        if(!isString(topicName)){
            throw new TypeError('bad argument given to EventSet();');
        }

        var topic_name = this.genKey(topicName);
        
        if(!TopicStore.has(topic_name)){
            TopicStore.set(topic_name , new Map());
        }

        this.getTopicName = function(){
            return (topic_name);
        }

    }

    genKey(name){
        return name.toString().toLowerCase().replace(/\s/g, "");
    }

    clear(){
        return TopicStore.delete(this.getTopicName());
    }   

    /**
     * @return Map<event : string, listener : Set>
     */
    get EventMap(){
        return TopicStore.get(this.getTopicName());
    };

    /**
     * prevent overriding
     */
    set EventMap(param){}

    removeListener(eventName , listener){

        var eventKey = this.genKey(eventName);
        if(this.EventMap.has(eventKey)){
            let listenerSet = this.EventMap.get(eventKey);
                listenerSet.delete(listener);
        }
        return this.EventMap.get(eventKey);
    }


    AddListener(eventName , listener){

        var listenerSet;
        var eventKey = this.genKey(eventName);
        
        if(this.EventMap.has(eventKey)){
            listenerSet = this.EventMap.get(eventKey);
            listenerSet.add(listener);
        }
        else{
            listenerSet = new Set();
            listenerSet.add(listener);
            this.EventMap.set(eventKey , listenerSet);
        }
        return this.EventMap.get(eventKey);
    }
    
    getListenerSet(eventName){
        var eventKey = this.genKey(eventName);
        return this.EventMap.get(eventKey);
    }

    trigger(eventName , message){

        var copyMessage = JSON.parse(JSON.stringify(message));
        var listenerSet = this.getListenerSet(eventName);
        var topicName = this.getTopicName();

        if(listenerSet instanceof Set){
            listenerSet.forEach(function(listenerAction){
                listenerAction({
                    topic : topicName,
                    name : eventName, 
                    message: copyMessage
                });
            });
        }
    }
}
