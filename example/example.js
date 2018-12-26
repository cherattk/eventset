const EventSet = require('../build/index.js');


function commonOutput(event) {    
    console.log('\t topic name    : ' + event.topicName);
    console.log('\t event name    : ' +  event.eventName);
    console.log('\t event message : ' + event.eventMessage);
}
function firstListener(event){
    console.log('   listener 1 output :');
    commonOutput(event);
}

function secondListener(event){
    console.log('   listener 2 output :');
    commonOutput(event);
}

var topic = EventSet.createTopic('topic-1');
console.log('1) create topic : ' + topic.getName());

var eventArray = topic.addEvent('event-1');
console.log('2) register event : ' + eventArray[0]);

topic.addListener('event-1' , firstListener);
console.log('3) register listener : ' + firstListener.name);

var secondListenerId = topic.addListener('event-1' , secondListener);
console.log('4) register listener : ' + secondListener.name);

console.log('5) dispatch event : ' + eventArray[0]);

topic.dispatch('event-1' , 'hello world 1');

topic.removeListener(secondListenerId);
console.log('\n6) remove listener : ' + secondListener.name);

console.log('7) re-dispatch event : ' + eventArray[0]);
topic.dispatch('event-1' , 'hello world 2');


