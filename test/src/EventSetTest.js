import assert from 'assert';

// import app's build file
import {default as EventSet} from '../../build/eventset.js';

describe("Test EventSet Class" , function () {

    it("Test addListener(event : string , listener : Object) \n\
        " , function () {

        var eventSet = new EventSet();
        var firstListener = function(){};
        
        var myEvent = "my.event";
        
        eventSet.addListener(myEvent , firstListener);
        eventSet.addListener(myEvent , firstListener);
        var listenerSet_1 =  eventSet.addListener(myEvent , firstListener);
        
        // only one instance of the firstListener is registered
        assert.equal(listenerSet_1.size , 1);   
        
        var secondeListener = function(){};
        var listenerSet_2 = eventSet.addListener(myEvent , secondeListener);
        
        assert.equal(listenerSet_2.size , 2);
        assert.equal(listenerSet_2.has(firstListener) , true);
        assert.equal(listenerSet_2.has(secondeListener) , true);
        
    });
    
    it("Test getListenerSet(event) \n\
        " , function () {
    
        var eventSet = new EventSet();
        var firstListener = function(){};
        
        var myEvent = "my.event";        
            eventSet.addListener(myEvent , firstListener);
        
        var listenerSet = eventSet.getListenerSet(myEvent);
        
        assert.equal(listenerSet instanceof Set , true);
        assert.equal(listenerSet.size , 1);
    });
    
    it("Test removeListener(event , listener) \n\
        " , function(){

        var eventSet = new EventSet();

        var firstListener = function(){};
        var secondeListener = function(){};
        
        var myEvent = "my.event";
        
        assert.equal(eventSet.removeListener(myEvent , firstListener) , undefined);

        eventSet.addListener(myEvent , firstListener);
        var listenerSet_1 = eventSet.addListener(myEvent , secondeListener);
        assert.equal(listenerSet_1.size , 2);

        var listenerSet_2 = eventSet.removeListener(myEvent , firstListener);
        assert.equal(listenerSet_2.size , 1);
        assert.equal(listenerSet_2.has(secondeListener) , true);
    });

    it("Test triggerEvent(event , message) \n\
        " , function () {

        var eventSet = new EventSet();
    
        var myEvent = "my.event";
        var message = "event-message";

        var listener = {
            data : '',
            eventName : '',
            EventSetNotification : function(event_message , eventName){
                this.data = event_message + "-after-callback";
                this.eventName = eventName;
            }
        };
        
        // 1
        eventSet.addListener(myEvent , listener);
        // 2
        eventSet.triggerEvent(myEvent , message);
        
        assert.equal(listener.data , message+"-after-callback");
        assert.equal(listener.eventName , myEvent);
        
    });
});