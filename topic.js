/**
 * @module Topic
 * @license MIT Licence
 * @copyright Copyright (c) 2018-present cheratt karim
 */

const Util = require('./util.js');

/**
 * Topic constructor
 * 
 * @param {string} topicName
 * @retruns {Object} New Topic instance 
 */

module.exports = function Topic(topicName) {

  if (!Util.isValidString(topicName)) {
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
  this.getEventList = function () {
    var result = Array.from(_eventMap.keys());
    return result;
  }

  /**
   * Register the event to the topic
   * and returns an array of registered events
   * 
   * @param   {string} eventName - event name
   * 
   * @returns {Array<string>} An array of events
   */
  this.addEvent = function (eventName) {
    if (!Util.isValidString(eventName)) {
      throw new TypeError(`package eventset : Topic.addEvent() : eventName argument must be of type string`);
    }

    var eventToken = Util.clean(eventName);

    if (!_eventMap.has(eventToken)) {
      _eventMap.set(eventToken, new Map());
    }
    return this.getEventList();
  }

  /** 
  * Remove the event named 'eventName' from the queue
  * - Notice : all listeners() attached to the event will be remove too
  * 
  * @param {string} eventName 
  * @returns {Array} An array of events
  * 
  * */

  this.removeEvent = function (eventName) {
    if (!Util.isValidString(eventName)) {
      throw new TypeError(`package eventset : Topic.removeEvent() : eventName argument must be of type string`);
    }

    var eventToken = Util.clean(eventName);

    if (_eventMap.has(eventToken)) {
      _eventMap.delete(eventToken);
    }
    return this.getEventList();
  }

  /** 
     * Register listener function to the event named 'eventName' 
     * - The listener function will receive object as argument with 
     *  the following properties: 
     *    {  
     *      topic : 'topic-name' ,  
     *      event : 'event-name' ,  
     *      message : 'the-message-passed-with-dispatch()'
     *    }
     * 
     * - The errorCallback function will receive the Error thown by the listenerCallback
     * 
     * - The returned value is the listener id that must be 
     *    used with Topic.removeListener() to remove the listener from the queue
     * 
     * @param {string} eventName
     * @param {Function} listener
     * @param {Function} errorCallback
     * 
     * @returns {string} listener id
     * 
     * */
  this.addListener = function (eventName, listenerCallback, errorCallback) {
    if (!Util.isValidString(eventName)) {
      throw new TypeError(`package eventset : Topic.addListener() : eventName argument must be a String type`);
    }

    if (typeof listenerCallback !== 'function') {
      throw new Error(`package eventset : Topic.addListener() : the listener argument must be a Function`);
    }

    var eventToken = Util.clean(eventName);
    if (!_eventMap.has(eventToken)) {
      throw new Error(`package eventset : Topic.addListener() Invalid event name : event named ${eventName} does not exists`);
    }

    var listenerMap = _eventMap.get(eventToken);
    var listenerId = eventToken + '/' + (listenerMap.size + 1).toString();

    listenerMap.set(listenerId, {
      listener: listenerCallback,
      error: (typeof errorCallback === 'function' ? errorCallback :
        function (listenerError) { console.log(listenerError); })
    });

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
    if (!Util.isValidString(listenerId)) {
      throw new TypeError(`package eventset : Topic.removeListener() : listenerId argument must be of type string`);
    }

    var eventToken = listenerId.split("/", 1)[0];
    if (!_eventMap.has(eventToken)) {
      throw new Error(`package eventset : Invalid listener identifier : listener with idetifier ${eventToken} does not exists`);
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
    if (!Util.isValidString(eventName)) {
      throw new TypeError(`package eventset : Topic.dispatch() : eventName argument must be of type string`);
    }
    var eventToken = Util.clean(eventName);
    if (!_eventMap.has(eventToken)) {
      throw new Error(`package eventset : Topic.dispatch() Invalid event name : event named ${eventName} does not exists`);
    }

    var event = {
      topic: topicName,
      event: eventName,
      message: {}
    };

    // check if the message is of a valid type
    // JSON.stringify() returns undefined for "Function" and "undefined" value
    var copyMessage = JSON.stringify(message);
    if (typeof copyMessage !== 'undefined') {
      event.message = JSON.parse(copyMessage);
    }

    var listenerMap = _eventMap.get(eventToken);
    listenerMap.forEach(function (callback, listener_id) {
      setTimeout(function () {
        try {
          callback.listener(event);
        } catch (error) {
          callback.error(error, event);
        }
      }, 0);
    });
  }
}