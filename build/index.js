/**
 * @copyright Copyright (c) 2018 cheratt karim
 * @license MIT Licence
 */

const Topic = require('./topic.js');

 /**
  * EventSet 
  */
const EventSet = {

    createTopic : function(topicName) {
        var _topic = new Topic(topicName);
        return _topic;
    }
}

module.exports = EventSet;
