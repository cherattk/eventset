const assert = require('assert');

const EventSet = require('../src/index.js');

describe("Test EventSet" , function () {

    it("Test EventSet() Throws exception" , function () {

        assert.throws(function(){
            EventSet();
        }, 'Error');

    });

    it("Test .createTopic() " , function () {

        var topic = EventSet.createTopic("topic-name");
            assert.strictEqual(topic instanceof Object , true);
    });

    it("Test .token() " , function () {

        var actual = EventSet.token("event name with whitespace");
            assert.strictEqual(actual , "eventnamewithwhitespace");
    });

    it("Test .isString() " , function () {

        var valid = EventSet.isString('string');
            assert.strictEqual(valid , true);
        
        var notValid = EventSet.isString({});
            assert.strictEqual(notValid , false);
    });

});
   
describe("Test Topic" , function () {

    it("Test .getName()",  function(){
            
        var topic = EventSet.createTopic('topic-name');            
            assert.strictEqual(topic.getName('topic-name') , 'topic-name');
        
    });

    it("Test .getEvent()",  function(){
            
        var topic = EventSet.createTopic('topic-1');
            topic.addEvent('event-1');

        var result = topic.getEvent();
            assert.strictEqual(result[0] , 'event-1'); 
    });

    it("Test .addEvent()",  function(){
            
        var topic = EventSet.createTopic('topic-1');

        var result = topic.addEvent('event-1');
            assert.strictEqual(result.length, 1);      
    });

    it("Test .removeEvent()",  function(){
            
        var topic = EventSet.createTopic('topic-1');
            topic.addEvent('event-1');

        var result = topic.removeEvent('event-1');
            assert.strictEqual(result.length, 0);      

    });
    

    it("Test .addListener()" , function () {

        var topic = EventSet.createTopic('topic-1');
            topic.addEvent('event-1');
        
        var result = topic.addListener('event-1' , 'listenerObject');
            assert.strictEqual(result.length , 1);

    });

    it("Test .addListener() Throws Error" , function () {

        var topic = EventSet.createTopic('topic-1');

        // add listener to not registered event
        assert.throws(function(){
                topic.addListener('not-available-event' , 'listenerObject');
        }, 'Error');

    });

    it("Test .getListener()" , function () {
        
        var topic = EventSet.createTopic('topic-1');

            topic.addEvent('event-1');
            topic.addListener('event-1' , 'listener-1');

        var listenerArray = topic.getListener('event-1');

            assert.strictEqual(listenerArray.length , 1);
            assert.strictEqual(listenerArray[0] , 'listener-1');
    });

    it("Test .removeListener()" , function () {

        var topic = EventSet.createTopic('topic-1');        
            topic.addEvent('event-1');
            topic.addListener('event-1' , 'listener-1');
            
        var listenerArray = topic.removeListener('event-1' , 'listener-1');
            assert.strictEqual(listenerArray.length , 0);
    });

    it("Test .dispatch()" , function () {

        var dataObject = {};
        
        var listenerAction = function(event){
            this.topic   = event.topicName;
            this.event   = event.eventName;
            this.message = event.eventMessage;
        }

        var topic = EventSet.createTopic('topic-1');

            topic.addEvent('event-1');
            topic.addListener('event-1' , listenerAction.bind(dataObject));
        
        topic.dispatch('event-1' , 'hello word');
        
        assert.strictEqual(dataObject.topic , 'topic-1' );
        assert.strictEqual(dataObject.event , 'event-1');
        assert.strictEqual(dataObject.message , 'hello word');        

    });
});