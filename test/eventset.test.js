const assert = require('assert');

const EventSet = require('../build/index.js');
const Topic = require('../build/topic.js');

describe("Test EventSet Object" , function () {

    it("Test EventSet.Topic() : returns Topic Instance" , function () {

        var topic = EventSet.Topic("topic-name");
            assert.strictEqual(topic instanceof Topic, true);
        });
        
    it("Test EventSet.Topic() : returns One Topic Instance" , function () {
            
        var topicInstanceOne = EventSet.Topic('topic-name');
        var topicInstanceTwo = EventSet.Topic('topic-name');
        var topicInstanceThree = EventSet.Topic('another-topic-name');

        assert.strictEqual(topicInstanceTwo , topicInstanceOne);
        assert.notStrictEqual(topicInstanceThree , topicInstanceOne);
    });


    
});