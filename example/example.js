const EventSet = require('../build/index.js');

var dataObject = {};

var listenerAction = function(event){
    this.topic   = event.topicName;
    this.event   = event.eventName;
    this.message = event.eventMessage;
}

var topic = EventSet.createTopic('topic-1');

// 1
topic.addEvent('event-1');

// 2
topic.addListener('event-1' , listenerAction.bind(dataObject));

// 3
topic.dispatch('event-1' , 'hello word');

// result
console.log('topic name    : ' + dataObject.topic);
console.log('event name    : ' + dataObject.event);
console.log('event message : ' + dataObject.message);