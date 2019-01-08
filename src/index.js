/**
 * @module EventSet
 * @license MIT Licence
 * @copyright Copyright (c) 2018-2019 cheratt karim
 *                                              
 */

const Topic = require('./topic.js');
const Util = require('./util.js');

 /**
  * EventSet 
  */


function EventSet() {

    var _topicList = new Map();

    this.Topic = function(topicName) {
        
        if(!Util.isString(topicName)){
            var errorMsg = `EventSet.createTopic() : topicName argument must be of type string`;            
            throw new TypeError(errorMsg);
        }

        var _topic = null;
        var topicToken = Util.clean(topicName);   

        if(_topicList.has(topicToken)){
            _topic = _topicList.get(topicName);
        }
        else{
            _topic = new Topic(topicName);
            _topicList.set(topicName , _topic);
        }

        return _topic;
    }
}

module.exports = new EventSet();
