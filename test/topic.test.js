const assert = require('assert');

const Topic = require('../src/topic.js');
   
// *********************************************************************

describe("Test Topic Object" , function () {

    it("Test .getName()",  function(){
            
        var topic = new Topic('topic-name');            
            assert.strictEqual(topic.getName('topic-name') , 'topic-name');
        
    });

    it("Test .getEvent()",  function(){
            
        var topic = new Topic('topic-1');
            topic.addEvent('event-1');

        var result = topic.getEvent();
            assert.strictEqual(result[0] , 'event-1'); 
    });

    it("Test .addEvent()",  function(){
            
        var topic = new Topic('topic-1');

        var result = topic.addEvent('event-name');
            assert.strictEqual(result.length, 1);      
    });

    it("Test .removeEvent()",  function(){
            
        var topic = new Topic('topic-1');
            topic.addEvent('event-1');

        var result = topic.removeEvent('event-1');
            assert.strictEqual(result.length, 0);      

    });

    it("Test .addListener()" , function () {

        var topic = new Topic('topic-1');
        
            topic.addEvent('some-event-name');
        
        var result = topic.addListener('some-event-name' , 'listener');

        // expected result format = {event-name}/{listener-index}
            assert.strictEqual(result , 'some-event-name/1');

    });

    it("Test .addListener() throws Error" , function () {

        var topic = new Topic('topic-1');

        // add listener to not registered event
        assert.throws(function(){
                topic.addListener('not-available-event' , 'listenerObject');
        }, 'Error');

    });

    it("Test .getListener()" , function () {
        
        var topic = new Topic('topic-1');

            topic.addEvent('event-1');
            topic.addListener('event-1' , 'listener-1');

        var listenerArray = topic.getListener('event-1');

            assert.strictEqual(listenerArray.length , 1);
            assert.strictEqual(listenerArray[0] , 'listener-1');
    });

    it("Test .removeListener()" , function () {

        var topic = new Topic('topic-1');        
            topic.addEvent('event-1');
        var listenerId = topic.addListener('event-1' , 'listener-1');
            
        var result = topic.removeListener(listenerId);
            assert.strictEqual(result , true);
    });

    it("Test .dispatch()" , function () {

        var dataObject = {};
        
        var listenerAction = function(event){
            this.topic   = event.topicName;
            this.event   = event.eventName;
            this.message = event.eventMessage;
        }

        var topic = new Topic('topic-1');

            topic.addEvent('event-1');
            topic.addListener('event-1' , listenerAction.bind(dataObject));
        
        topic.dispatch('event-1' , 'hello word');
        
        assert.strictEqual(dataObject.topic , 'topic-1' );
        assert.strictEqual(dataObject.event , 'event-1');
        assert.strictEqual(dataObject.message , 'hello word');        

    });

    


});