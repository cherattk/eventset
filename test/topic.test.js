const assert = require('assert');
const expect = require('chai').expect;
const Topic = require('../build/topic');

// *********************************************************************

describe("Test Topic Object", function () {

  it("Test .getName()", function () {

    var topic = new Topic('topic-name');
    var topicName = topic.getName('topic-name');
    expect(topicName).to.equal('topic-name');

  });

  it("Test .getEventList()", function () {

    var topic = new Topic('topic-1');
    topic.addEvent('event-1');

    var eventList = topic.getEventList();
    var eventName = eventList[0];
    expect(eventName).to.equal('event-1');
  });

  it("Test .addEvent()", function () {

    var topic = new Topic('topic-1');

    var eventList = topic.addEvent('my-event');
    expect(eventList.length).to.equal(1);

    var eventName = eventList[0];
    expect(eventName).to.equal('my-event');
  });

  it("Test .removeEvent()", function () {

    var topic = new Topic('topic-1');
    topic.addEvent('event-1');

    var eventList = topic.removeEvent('event-1');
    expect(eventList.length).to.equal(0);

  });

  it("Test .addListener()", function () {

    var topic = new Topic('topic-1');

    topic.addEvent('some-event-name');

    var listener_id = topic.addListener('some-event-name', function listener() {});

    // expected result format = {event-name}/{listener-index}
    expect(listener_id).to.equal('some-event-name/1');

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

    var listener_id = topic.addListener('event-1', function () { });

    var result = topic.removeListener(listener_id);
    expect(result).to.equal(true);
  });

  it("Test .dispatch() : Calls the registered listener", function (done) {

    var listener = function (event) {
      expect(event.topic).to.equal('topic-1');
      expect(event.event).to.equal('event-1');
      expect(event.message).to.equal('hello');
      done();
    }

    var topic = new Topic('topic-1');
    topic.addEvent('event-1');
    topic.addListener('event-1', listener);
    topic.dispatch('event-1', 'hello');

  });

  it("Test .dispatch() : Does not block the dispatching loop", function (done) {

    var topic = new Topic('topic-1');

    var listener_1_throws_error = function(){
      throw new Error();
    }

    var listener_2 = function(event) {
      expect(event.topic).to.equal('topic-1');
      expect(event.event).to.equal('event-1');
      expect(event.message).to.equal('hello');
      done();
    }
    topic.addEvent('event-1');
    topic.addListener('event-1', listener_1_throws_error , new Function /* override default error callback */);
    topic.addListener('event-1', listener_2);
    topic.dispatch('event-1', 'hello');

  });

  it("Test .dispatch() : Catches listener error", function (done) {

    var topic = new Topic('topic-1');

    var listener_throws_error = function(){
      throw new Error("test-error");
    }

    // error handler
    var listenerErrorCallback = function(errorObject , eventObject) {
      
      expect(errorObject).to.have.property('message');
      expect(errorObject.message).to.equal('test-error');

      expect(eventObject).to.have.property('topic');
      expect(eventObject).to.have.property('event');
      expect(eventObject).to.have.property('message');

      done();
    }
    topic.addEvent('event-1');
    topic.addListener('event-1', listener_throws_error , listenerErrorCallback /* override default error callback */);
    topic.dispatch('event-1', 'hello');

  });

  it("Test .dispatch() : throws Error when dispatch an unregistered event", function () {

    var topic = new Topic('topic-1');

    assert.throws(function () {
      topic.dispatch('event-1', 'message');
    }, 'Error');

  });

  it(`Test .dispatch() : dispatch an event without a message
      - The 'message' property of the listener argument is an empty object`, function (done) {

    var listener = function (event) {
      expect(event.topic).to.equal('topic-1');
      expect(event.event).to.equal('event-1');
      expect(event.message).to.be.empty;
      done();
    }

    var topic = new Topic('topic-1');
    topic.addEvent('event-1');
    topic.addListener('event-1', listener);
    topic.dispatch('event-1');

  });

});