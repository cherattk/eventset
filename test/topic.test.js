const assert = require('assert');

const Topic = require('../build/topic');

// *********************************************************************

describe("Test Topic Object", function () {

  it("Test .getName()", function () {

    var topic = new Topic('topic-name');
    assert.strictEqual(topic.getName('topic-name'), 'topic-name');

  });

  it("Test .getEvent()", function () {

    var topic = new Topic('topic-1');
    topic.addEvent('event-1');

    var result = topic.getEvent();
    assert.strictEqual(result[0], 'event-1');
  });

  it("Test .addEvent()", function () {

    var topic = new Topic('topic-1');

    var result = topic.addEvent('my-event');
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0], 'my-event');
  });

  it("Test .removeEvent()", function () {

    var topic = new Topic('topic-1');
    topic.addEvent('event-1');

    var result = topic.removeEvent('event-1');
    assert.strictEqual(result.length, 0);

  });

  it("Test .addListener()", function () {

    var topic = new Topic('topic-1');

    topic.addEvent('some-event-name');

    var result = topic.addListener('some-event-name', function listener() { });

    // expected result format = {event-name}/{listener-index}
    assert.strictEqual(result, 'some-event-name/1');

  });

  it("Test .addListener() : throws Error when adding a listener to an unregistered event", function () {

    var topic = new Topic('topic-1');

    assert.throws(function () {
      topic.addListener('not-registered-event', function listener() { });
    }, 'Error');

  });

  it("Test .addListener() : throws Error if a listener is not a Function", function () {

    var topic = new Topic('topic-1');
    topic.addEvent('registered-event');

    assert.throws(function () {
      topic.addListener('registered-event', 'wrong-listener-type');
    }, 'Error');

  });

  it("Test .removeListener()", function () {

    var topic = new Topic('topic-1');
    topic.addEvent('event-1');

    var listenerId = topic.addListener('event-1', function () { });

    var result = topic.removeListener(listenerId);
    assert.strictEqual(result, true);
  });

  it("Test .dispatch()", function () {

    var dataResult = {};

    var listener = function (event) {
      this.topic = event.topic;
      this.event = event.event;
      this.message = event.message;
    }

    var topic = new Topic('topic-1');

    topic.addEvent('event-1');
    topic.addListener('event-1', listener.bind(dataResult));

    topic.dispatch('event-1', 'hello word');

    assert.strictEqual(dataResult.topic, 'topic-1');
    assert.strictEqual(dataResult.event, 'event-1');
    assert.strictEqual(dataResult.message, "hello word");

  });

  it("Test .dispatch() : throws Error when dispatch an unregistered event", function () {

    var topic = new Topic('topic-1');

    assert.throws(function () {
      topic.dispatch('event-1', 'message');
    }, 'Error');

  });

  it(`Test .dispatch() : dispatch an event without a message
      - The 'message' property of the listener argument is null`, function () {

    var dataResult = {};

    var listener = function (event) {
      this.topic = event.topic;
      this.event = event.event;
      this.message = event.message;
    }

    var topic = new Topic('topic-1');

    topic.addEvent('event-1');
    topic.addListener('event-1', listener.bind(dataResult));

    topic.dispatch('event-1');

    assert.strictEqual(dataResult.topic, 'topic-1');
    assert.strictEqual(dataResult.event, 'event-1');
    assert.strictEqual(dataResult.message, null);

  });

});