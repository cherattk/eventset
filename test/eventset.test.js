const assert = require('assert');

const EventSet = require('../build/index.js');
const Topic = require('../build/topic.js');

describe("Test EventSet Object", function () {

  it("Test EventSet.createTopic(name) : creates a new Topic Instance", function () {

    var topic = EventSet.createTopic("topic-name");
    assert.strictEqual(topic instanceof Topic, true);
  });

  it("Test EventSet.createTopic(name) : returns a Topic Instance identified by name", function () {

    var topicInstanceOne = EventSet.createTopic('topic-name');
    var topicInstanceTwo = EventSet.createTopic('topic-name');
    var topicInstanceThree = EventSet.createTopic('another-topic-name');

    assert.strictEqual(topicInstanceTwo, topicInstanceOne);
    assert.notStrictEqual(topicInstanceThree, topicInstanceOne);
  });



});