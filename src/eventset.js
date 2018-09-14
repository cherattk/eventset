/**
 * EventSet
 * @copyright Copyright (c) 2018 cheratt karim
 * @license MIT Licence
 */

import EventHook from './eventhook.js';

/**  @package */
var MapComponent;

/**  @package */
var MapHook;

export default class EventSet {
    
    constructor() {

        MapComponent = new Map();
        MapHook = new Map();
        this.EventHook('default').beforeNotify(function(message){
            return message;
        });

        this.EventHook('default').afterNotify(function(message){
            return message;
        });
    }

    /**
     * @return EventHook instance "attached" to event
     */
    EventHook(eventName){
        var eventKey = this.generateEventKey(eventName);
        if(!MapHook.has(eventKey)){            
            MapHook.set(eventKey , new EventHook());
        }
        return MapHook.get(eventKey);
    }

    generateEventKey(event){
        return event.toLowerCase().replace(/\s/g, "");
    }

    removeListener(event , listener){

        var eventKey = this.generateEventKey(event);
        if(MapComponent.has(eventKey)){
            let listenerSet = MapComponent.get(eventKey);
                listenerSet.delete(listener);
        }
        return MapComponent.get(eventKey);
    }


    addListener(event , listener){

        var listenerSet;
        var eventKey = this.generateEventKey(event);
        
        if(MapComponent.has(eventKey)){
            listenerSet = MapComponent.get(eventKey);
            listenerSet.add(listener);
        }
        else{
            listenerSet = new Set();
            listenerSet.add(listener);
            MapComponent.set(eventKey , listenerSet);
        }
        return MapComponent.get(eventKey);
    }
    
    getListenerSet(event){
        var eventKey = this.generateEventKey(event);
        return MapComponent.get(eventKey);
    }

    triggerEvent(event , message){
        
        var msg_hook_1 = this.EventHook('default').before(message);
        
//        var msg_hook_2 = this.EventHook(event).before(msg_hook_1);

        /****************** notify listeners ******************/
        var listenerSet = this.getListenerSet(event);

        if(listenerSet instanceof Set){
            listenerSet.forEach(function(listener){
                listener.EventSetNotification(msg_hook_1 , event);
            });
        }
        /*******************************************************/

        var msg_hook_3 = this.EventHook('default').after(msg_hook_1);
        
//        this.EventHook(event).after(msg_hook_3);


    }
}
