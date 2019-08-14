/**
 * @module Topic
 * @license MIT Licence
 * @copyright Copyright (c) 2018-present cheratt karim
 */

const Util = require('./util.js');

/**
 * Create a new Topic Object to store a set of events
 * 
 * @param {string} topicName
 * @retruns {Object} New Topic instance 
 */

function Topic(topicName) {

  if (!Util.isString(topicName)) {
    throw new TypeError(`package eventset : Topic.Topic() : topicName argument must be of type string`);
  }

  var _eventMap = new Map();

  /**
   * Get Topic Name
   * 
   * @returns {string} topic name
   */
  this.getName = function () {
    return topicName;
  }

  /**
   * Get all registered events
   * 
   * @returns {Array<string>} An array of event names
   */
  this.getEvent = function () {
    var result = Array.from(_eventMap.keys());
    return result;
  }

  /**
   * Register the event to the topic
   * 
   * @param   {string} eventName - event name
   * 
   * @returns {Array<string>} An array of event names
   */
  this.addEvent = function (eventName) {
    if (!Util.isString(eventName)) {
      throw new TypeError(`package eventset : Topic.addEvent() : eventName argument must be of type string`);
    }

    var eventToken = Util.clean(eventName);

    if (!_eventMap.has(eventToken)) {
      _eventMap.set(eventToken, new Map());
    }
    return this.getEvent();
  }

  /**
   * Remove the event from the topic and all its attached listeners
   * 
   * @param {string} eventName 
   * @returns {Array<string>} An array of events names
   */

  this.removeEvent = function (eventName) {
    if (!Util.isString(eventName)) {
      throw new TypeError(`package eventset : Topic.removeEvent() : eventName argument must be of type string`);
    }

    var eventToken = Util.clean(eventName);

    if (_eventMap.has(eventToken)) {
      _eventMap.delete(eventToken);
    }
    return this.getEvent();
  }

  /**
   * Register event listener
   * 
   * @param {string} eventName
   * @param {Function} listener
   * 
   * @returns {string} listener identifier
   */
  this.addListener = function (eventName, listener) {
    if (!Util.isString(eventName)) {
      throw new TypeError(`package eventset : Topic.addListener() : eventName argument must be a String type`);
    }

    if (typeof listener !== 'function') {
      throw new Error(`package eventset : Topic.addListener() : the listener argument must be a Function`);
    }

    var eventToken = Util.clean(eventName);
    if (!_eventMap.has(eventToken)) {
      throw new Error(`package eventset : Topic.addListener() Invalid event name : 
                        event named ${eventName} does not exists`);
    }

    var listenerMap = _eventMap.get(eventToken);
    var listenerId = eventToken + '/' + (listenerMap.size + 1).toString();
    listenerMap.set(listenerId, listener);

    return listenerId;
  }


  /**
   * Remove listener
   * 
   * @param {string} listenerId
   * 
   * @retruns {boolean} true if it succeeds, false otherwise
   */
  this.removeListener = function (listenerId) {
    if (!Util.isString(listenerId)) {
      throw new TypeError(`package eventset : Topic.removeListener() : listenerId argument must be of type string`);
    }

    var eventToken = listenerId.split("/", 1)[0];
    if (!_eventMap.has(eventToken)) {
      throw new Error(`package eventset : Invalid listener identifier :
                        listener with idetifier ${listenerId} does not exists`);
    }

    var listenerMap = _eventMap.get(eventToken);
    var deleteResult = listenerMap.delete(listenerId);
    return deleteResult;
  }


  /**
   * Trigger event
   * 
   * @returns {undefined}
   */
  this.dispatch = function (eventName, message) {
    if (!Util.isString(eventName)) {
      throw new TypeError(`package eventset : Topic.dispatch() : eventName argument must be of type string`);
    }
    var eventToken = Util.clean(eventName);
    if (!_eventMap.has(eventToken)) {
      throw new Error(`package eventset : Topic.dispatch() Invalid event name : 
                        event named ${eventName} does not exists`);
    }

    var event = { topic: topicName, event: eventName };
    
    // check if the message is of a valid type
    // JSON.stringify() returns undefined for "Function" and "undefined" value
    var copyMessage = JSON.stringify(message);
    if(typeof copyMessage !== 'undefined'){
      event.message = JSON.parse(copyMessage);
    }
    else event.message = null;

    var listenerMap = _eventMap.get(eventToken);
    listenerMap.forEach(function (listener) {
      listener(event);
    });
  }
}

module.exports = Topic;