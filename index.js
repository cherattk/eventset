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
function __EventSet() {

  var _topicList = new Map();

  /**
  * @deprecated will be removed in v1.9.0
  * @alias of Eventset.Topic()
  * 
  */
  this.Topic = function (topicName) {
    return this.createTopic(topicName);
  }


  /** 
  * Singleton factory for a Topic instance
  * 
  * @param {string} topicName 
  * @returns Topic Instance
  * 
  * */
  this.createTopic = function (topicName) {

    if (!Util.isValidString(topicName)) {
      throw new TypeError(`package eventset : EventSet.createTopic() : topicName argument must be of type string`);
    }

    var _topic = null;
    var _topicToken = Util.clean(topicName);

    if (_topicList.has(_topicToken)) {
      _topic = _topicList.get(topicName);
    }
    else {
      _topic = new Topic(topicName);
      _topicList.set(topicName, _topic);
    }

    return _topic;
  }
}

module.exports = new __EventSet();
