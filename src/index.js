/**
 * @copyright Copyright (c) 2018 cheratt karim
 * @license MIT Licence
 */

const Topic = require('./topic.js');

 /**
  * EventSet 
  */


const EventSet = function() {

    this.createTopic = function(topicName) {
        var _topic = new Topic(topicName);
        return _topic;
    }
}

module.exports = new EventSet();
