const EventSet = require('../build/index.js');

function myListener(event){
    console.log('\t topic name    : ' + event.topicName);
    console.log('\t event name    : ' +  event.eventName);
    console.log('\t event message : ' + event.eventMessage);
}

var topic = EventSet.createTopic('topic-1');
console.log('1) create topic : ' + topic.getName());

var eventArray = topic.addEvent('event-1');
console.log('2) register event : ' + eventArray[0]);

var listenerArray = topic.addListener('event-1' , myListener);
console.log('3) register listener : ' + listenerArray[0].name);

console.log('4) dispatch event : ' + eventArray[0]);

topic.dispatch('event-1' , 'hello word');


