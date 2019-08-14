const EventSet = require('../src/index.js');

function commonOutput(event) {
  console.log('\t topic name    : ' + event.topic);
  console.log('\t event name    : ' + event.event);
  console.log('\t event message : ' + event.message);
}
function firstListener(event) {
  console.log('   listener 1 output :');
  commonOutput(event);
}

function secondListener(event) {
  console.log('   listener 2 output :');
  commonOutput(event);
}

// 1 - 
var topic = EventSet.Topic('topic-1');
console.log('1) create topic : ' + topic.getName());


// 2 -
var eventArray = topic.addEvent('event-1');
console.log('2) register event : ' + eventArray[0]);

topic.addListener('event-1', firstListener);
console.log('3) register listener : ' + firstListener.name);

var secondListenerId = topic.addListener('event-1', secondListener);
console.log('4) register listener : ' + secondListener.name);

console.log('5) dispatch event : ' + eventArray[0]);

topic.dispatch('event-1', 'Hello World 1');

topic.removeListener(secondListenerId);
console.log('\n6) remove listener : ' + secondListener.name);

console.log('7) re-dispatch : ' + eventArray[0]);
topic.dispatch('event-1', 'Hello World 2');


