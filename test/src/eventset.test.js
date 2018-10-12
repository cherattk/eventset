import assert from 'assert';

// import app's build file
import {default as EventSet} from '../../build/index.js';

describe("Test EventSet Class" , function () {

    it("Test getTopicName() : string \n\
        " , function () {

        var topicName = 'event-topic';
        var topic = new EventSet(topicName);
            assert.equal('event-topic' , topic.getTopicName());
    });

    it("Test genKey(eventName : string ) \n\
        " , function () {

            var eventName = "event name with whitespace";
            var topic = new EventSet('event-topic');

            assert.equal("eventnamewithwhitespace" , topic.genKey(eventName));
    });

    it("Test clear() : clear all topic's events \n\
        " , function () {

        var topicName = 'event-topic';
        var topic = new EventSet(topicName);

        var removed = topic.clear();
        assert.equal(true , removed);
        assert.equal(undefined , topic.EventMap);
    });
    
    it("Test removeListener(eventName : string , listener : function ) \n\
        " , function(){

        var topicName = 'event-topic';
        var eventName = "my.event";
        var topic = new EventSet(topicName);

        var firstListener = function(){};        
        var listenerSet = topic.AddListener(eventName , firstListener);
            assert.equal(listenerSet.size , 1);
            assert.equal(listenerSet.has(firstListener) , true);

            listenerSet = topic.removeListener(eventName , firstListener);
            assert.equal(listenerSet.size , 0);
            assert.equal(listenerSet.has(firstListener) , false);

            // clear topic
            topic.clear();
    });

    it("Test AddListener(eventName : string , listener : function ) \n\
        " , function () {

        var topicName = 'event-topic';
        var eventName = "event-name";

        var topic = new EventSet(topicName);

        var firstListener = function(){};        
        var secondeListener = function(){};
        
            topic.AddListener(eventName , firstListener);
            topic.AddListener(eventName , firstListener);
            topic.AddListener(eventName , firstListener);
        
        var listenerSet = topic.AddListener(eventName , secondeListener);

            // only one instance of the listener is registered
            assert.equal(listenerSet.size , 2);
            assert.equal(listenerSet.has(firstListener) , true);
            assert.equal(listenerSet.has(secondeListener) , true);
            
            // clear topic after test
            topic.clear();
    });
    
    it("Test getListenerSet(eventName : string ) \n\
        " , function () {

        var topicName = 'event-topic';
        var eventName = "my.event";

        var topic = new EventSet(topicName);

        var firstListener = function(){};
        
            topic.AddListener(eventName , firstListener);        
        var listenerSet = topic.getListenerSet(eventName);
        
            assert.equal(listenerSet instanceof Set , true);
            assert.equal(listenerSet.size , 1);

            // clear topic after test
            topic.clear();
    });

    it("Test trigger(eventName : string , message : any) \n\
        " , function () {

        var topicName = 'event-topic';
        var topic = new EventSet(topicName);
        
        var eventName = "my.event";
        var message = "event-message";

        var dataObject = {
            topicName : '',
            eventName : '',
            message : ''
        };
        
        var listenerCallback = function(event){
            this.topicName = event.topic;
            this.eventName = event.name;
            this.msg       = event.message;
        }

            topic.AddListener(eventName , listenerCallback.bind(dataObject));
            
            topic.trigger(eventName , message);
            
            assert.equal(dataObject.topicName , topicName );
            assert.equal(dataObject.eventName , eventName);
            assert.equal(dataObject.msg , message );

            // clear topic after test
            topic.clear();        
    });
});