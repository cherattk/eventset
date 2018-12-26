const assert = require('assert');
const EventSet = require('../src/index.js');

describe("Test EventSet Object" , function () {

    it("Test EventSet.createTopic() " , function () {

        var topic = EventSet.createTopic("topic-name");

            assert.strictEqual(topic instanceof Object , true);
    });
    
    it("Test create topic twice throws Error" , function () {
        
        // EventSet.createTopic('topic-name');
        // assert.throws(function(){
        //     EventSet.createTopic('topic-name');
        // }, 'Error');

    });


    
});