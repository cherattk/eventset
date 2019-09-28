const EventSet = require('../build/index.js');

function commonOutput(event) {
  console.log('\t topic name    : ' + event.topic);
  console.log('\t event name    : ' + event.event);
  console.log('\t event message : ' + event.message);
  console.log('');
}
function firstListener(event) {
  console.log(' - listener 1 output :');
  commonOutput(event);
}

function secondListener(event) {
  console.log(' - listener 2 output :');
  commonOutput(event);
}

// 1 - 
var topic = EventSet.Topic('my-topic');
console.log('1) create topic : ' + topic.getName());


// 2 -
var eventArray = topic.addEvent('my-event');
console.log('2) register event : ' + eventArray[0]);

topic.addListener('my-event', firstListener);
console.log('3) register listener : ' + firstListener.name);

var secondListenerId = topic.addListener('my-event', secondListener);
console.log('4) register listener : ' + secondListener.name);

var eventMessage = 'Hello World';
console.log(`\n 5) dispatch event : '${eventArray[0]}' with message '${eventMessage}'`);

topic.dispatch('my-event', eventMessage);

topic.removeListener(secondListenerId);
console.log('\n6) remove listener : ' + secondListener.name);

console.log('7) re-dispatch event ' + eventArray[0] + ' without message');
topic.dispatch('my-event');


