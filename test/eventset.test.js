const assert = require('assert');
const EventSet = require('../src/index.js');

describe("Test EventSet Object" , function () {

    it("Test EventSet.createTopic() " , function () {

        var topic = EventSet.createTopic("topic-name");

            assert.strictEqual(topic instanceof Object , true);
    });
    
    it("Test invoking EventSet object as a function throws exception" , function () {
        assert.throws(function(){
            EventSet('topic-name');
        }, 'Error');

    });


    
});