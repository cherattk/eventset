import assert from 'assert';
import {default as EventSet} from '../../build/eventset.js';

describe("Test EventSet Class" , function () {

    it("Test addListener() \n\
        " , function () {

        var eventSet = new EventSet();
        var listenerObject = {
            notification : function(event_name , event_message){
                
            }
        };
        
        var myEvent = "my.event";
        eventSet.addListener(myEvent , listenerObject);
        eventSet.addListener(myEvent , listenerObject);
        eventSet.addListener(myEvent , listenerObject);
        
        var anotherListener = {
            name : "another_listener",
            notification : function(event_name , event_message){
                
            }
        };

        var listenerSet = eventSet.addListener(myEvent , anotherListener); 
        assert.equal(listenerSet.size , 2); // there is 2 listeners
        assert.equal(listenerSet.has(listenerObject) , true);
        assert.equal(listenerSet.has(anotherListener) , true);
        
    });
    
    it("Test removeListener() \n\
        " , function(){

        var eventSet = new EventSet();

        var listener   = {listener:"listener"};
        var listener_2 = {listener_2:"listener"};
        
        var myEvent = "my.event";
        
        assert.equal(eventSet.removeListener(myEvent , listener) , undefined);

        eventSet.addListener(myEvent , listener);
        eventSet.addListener(myEvent , listener_2);

        var listenerSet = eventSet.removeListener(myEvent , listener);
        assert.equal(listenerSet.has(listener_2) , true);
    });

    it("Test triggerEvent() \n\
        " , function () {

        var eventSet = new EventSet();
    
        var myEvent = "my.event";
        var message = "event-message";

        // listener object that implements notification() method
        var listenerObject = {
                data : {},
                notification : function(event_name , event_message){
                    this.data = {
                        event : event_name,
                        message : event_message
                    };
                }
        };

        // 1
        eventSet.addListener(myEvent , listenerObject);

        // 2
        eventSet.triggerEvent(myEvent , message);

        // 3 
        assert.equal(listenerObject.data.event , myEvent);
        assert.equal(listenerObject.data.message , message);
        
    });
});