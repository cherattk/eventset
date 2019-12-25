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

  this.createTopic = function (_topicName) {

    if (!Util.isValidString(_topicName)) {
      throw new TypeError(`package eventset : EventSet.createTopic() : topicName argument must be of type string`);
    }

    var _topic = null;
    var _topicToken = Util.clean(_topicName);

    if (_topicList.has(_topicToken)) {
      _topic = _topicList.get(_topicName);
    }
    else {
      _topic = new Topic(_topicName);
      _topicList.set(_topicName, _topic);
    }

    return _topic;
  }
}

module.exports = new EventSet();
