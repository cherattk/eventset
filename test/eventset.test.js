const assert = require('assert');

const EventSet = require('../src/index.js');

describe("Test EventSet Class" , function () {

    it("Test .token(Name : string ) " , function () {

        var Name = "event name with whitespace";

        var actual = EventSet.token(Name);
            assert.equal(actual , "eventnamewithwhitespace");
    });    

    it("Test .getTopicName()",  function(){
            
        var topic = EventSet.createTopic('topic-1');

        // tested method
        var actual = topic.getTopicName();
            assert.strictEqual(actual , 'topic-1');
        
    });

    it("Test .addEvent(eventName : string)",  function(){
            
        var topic = EventSet.createTopic('topic-1');

            // tested method
            assert.strictEqual(topic.addEvent('event-name') , true);

            // added eventName twice is not allowed
            assert.strictEqual(topic.addEvent('event-name') , false);
        
    });

    it("Test .addListener(eventName : string , listener : Object )" , function () {

        var topic = EventSet.createTopic('topic-1');
            topic.addEvent('event-1');
        
        var listenerObject = 'listenerObject';
        
        // tested method
        var actual = topic.addListener('event-1' , listenerObject);
            assert.equal(actual.size , 1);

    });

    it("Test .addListener(eventName : string , listener : Object ) Throw Error" , function () {

        var topic = EventSet.createTopic('topic-1');

        assert.throws(function(){
            var listenerObject = 'listenerObject';
                topic.addListener('event-1' , listenerObject);
        }, 'Error');

    });

    it("Test .getListener(eventName : string)" , function () {
        
        var topic = EventSet.createTopic('topic-1');

        var emptyListener = topic.getListener('event-1');
            assert.equal(emptyListener.size , 0);

            topic.addEvent('event-1');
            topic.addListener('event-1' , 'listener-1');

        // tested method
        var listenerSet = topic.getListener('event-1');

            assert.equal(listenerSet.size , 1);
            assert.equal(listenerSet.has('listener-1') , true);
    });

    it("Test .removeListener(eventName : string , listener : Object)" , function () {

        var topic = EventSet.createTopic('topic-1');

            assert.equal(false , topic.removeListener('event-1' , 'listener-1'));
        
            topic.addEvent('event-1');
            topic.addListener('event-1' , 'listener-1');
            
        // tested method
        var listenerSet = topic.removeListener('event-1' , 'listener-1');

            assert.equal(listenerSet.size , 0);
            assert.equal(listenerSet.has('listener-1') , false);
    });

    it("Test .dispatch(eventName : string , message : any)" , function () {

        var dataObject = {};
        
        var listenerAction = function(event){
            this.topic   = event.topicName;
            this.event   = event.eventName;
            this.message = event.eventMessage;
        }

        var topic = EventSet.createTopic('topic-1');

            topic.addEvent('event-1');
            topic.addListener('event-1' , listenerAction.bind(dataObject));
        
        // tested method
        topic.dispatch('event-1' , 'hello word');
        
        assert.equal(dataObject.topic , 'topic-1' );
        assert.equal(dataObject.event , 'event-1');
        assert.equal(dataObject.message , 'hello word');
    });
});