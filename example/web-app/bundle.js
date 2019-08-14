(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * @module EventSet
 * @license MIT Licence
 * @copyright Copyright (c) 2018-present cheratt karim
 *                                              
 */

const Topic = require('./topic.js');
const Util = require('./util.js');

/**
 * EventSet 
 */
function EventSet() {

  var _topicList = new Map();

  this.Topic = function (topicName) {

    if (!Util.isString(topicName)) {
      throw new TypeError(`package eventset : EventSet.createTopic() : topicName argument must be of type string`);
    }

    var _topic = null;
    var topicToken = Util.clean(topicName);

    if (_topicList.has(topicToken)) {
      _topic = _topicList.get(topicName);
    }
    else {
      _topic = new Topic(topicName);
      _topicList.set(topicName, _topic);
    }

    return _topic;
  }
}

module.exports = new EventSet();

},{"./topic.js":2,"./util.js":3}],2:[function(require,module,exports){
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
                        listener with idetifier ${eventToken} does not exists`);
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

    var listenerMap = _eventMap.get(eventToken);
    listenerMap.forEach(function (listener) {
      listener(event);
    });
  }
}

module.exports = Topic;
},{"./util.js":3}],3:[function(require,module,exports){
/**
 * @module Util
 * @license MIT Licence
 * @copyright Copyright (c) 2018-present cheratt karim
 */


const Util = {

  /**
   * Convert input string to lowercase and remove whitespaces and slashes
   * 
   * @param {string} value to clean 
   */
  clean: function (input) {
    if (!this.isString(input)) {
      throw new TypeError(`package eventset : Util.clean(input) : input argument must be of type string`);
    }
    return input.toLowerCase().replace(/\s|\//g, "");
  },

  /**
   * 
   * @param {string} input
   */
  isString: function (input) {
    return (typeof input === 'string' && input !== '');
  }

};

module.exports = Util;
},{}],4:[function(require,module,exports){
const UIEvent = require('./ui-event');

function ShowListButton() {

  var _state = {showList : true};
  var _element = null;

  this.init = function (config) {
    _element = document.getElementById(config.anchor_id);
    _element.onclick = this.clickHandler.bind(this);
    this.render();
  }

  this.clickHandler = function () {
    _state.showList = !_state.showList;
    this.render();
    UIEvent.dispatch('toggle-list' , "hello world");
  }

  this.render = function () {
    var text = _state.showList ? 'Show List' : 'Hide List';
    _element.innerHTML = `
      <span id="btn-show-list" class="button">
        ${text}
      </span>`;
  }
}

module.exports = function (config) {
  var b = new ShowListButton();
  b.init(config);
};;
},{"./ui-event":7}],5:[function(require,module,exports){
const UIEvent = require('./ui-event');

function List() {

  var _element = null;
  var _state = {
    show : false,
    list :  [
      { name : 'Red'},
      { name : 'Blue'},
      { name : 'Green'}
    ]
  }

  this.init = function (config) {
    _element = document.getElementById(config.anchor_id);
    this.render();
  
    // register listener to 'toggle-list' event
    UIEvent.addListener('toggle-list' , this.toggleListHandler.bind(this));
  }

  this.toggleListHandler = function(myCustomEvent){
    console.log(myCustomEvent);

    // no need to use the content of myCustomEvent,
    // we just toggle the show state
    _state.show = !_state.show;
    // re-render()
    this.render();
  }

  this.render = function () {
    var showState = _state.show ? 'show' : 'hide';
    var list = _state.list.map(function(data){
      return `<li>${data.name}</li>`;
    });

    _element.innerHTML = `    
      <ul class="${showState}">
        ${list.join('')}
      </ul>`;
  }
}

module.exports = function(config){
  var list = new List();
      list.init(config);
};
},{"./ui-event":7}],6:[function(require,module,exports){
const Button = require('./button.element');
const List = require('./list.element');

// init button
Button({
  anchor_id : 'show-list-button'
});
List({
  anchor_id : 'list'
});
},{"./button.element":4,"./list.element":5}],7:[function(require,module,exports){
const eventset = require('eventset');

var UIEvent = eventset.Topic('app-ui-event');

UIEvent.addEvent('toggle-list');

module.exports = UIEvent;
},{"eventset":1}]},{},[6]);
