const assert = require('assert');
const expect = require('chai').expect;

const EventSet = require('../build/index.js');
const Topic = require('../build/topic.js');

describe("Test EventSet Object", function () {

  it("Test EventSet.Topic(name) : DEPRECATED creates a new Topic Instance", function () {

    var topic = EventSet.Topic("topic-name");
    expect(topic).to.be.an.instanceOf(Topic);
  });

  it("Test EventSet.createTopic(name) : creates a new Topic Instance", function () {

    var topic = EventSet.createTopic("topic-name");
    expect(topic).to.be.an.instanceOf(Topic);
  });

  it("Test EventSet.createTopic(name) : returns a Topic Instance identified by name", function () {

    var topicInstanceOne = EventSet.createTopic('topic-name');
    var topicInstanceTwo = EventSet.createTopic('topic-name');
    var topicInstanceThree = EventSet.createTopic('another-topic-name');

    assert.strictEqual(topicInstanceTwo, topicInstanceOne);
    assert.notStrictEqual(topicInstanceThree, topicInstanceOne);
  });



});