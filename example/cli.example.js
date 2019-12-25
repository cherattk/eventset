const EventSet = require('../build/index.js');

function commonOutput(event) {
  console.log('\t topic name    : ' + event.topic);
  console.log('\t event name    : ' + event.event);
  console.log('\t event message : ' + JSON.stringify(event.message));
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

///////////////////////////////////////////////////////////////
var myTopic = EventSet.createTopic('my-topic');
console.log('1) create topic : ' + myTopic.getName());

///////////////////////////////////////////////////////////////
var eventArray = myTopic.addEvent('my-event');
console.log('2) register event : ' + eventArray[0]);

///////////////////////////////////////////////////////////////
myTopic.addListener('my-event', firstListener);
console.log('3) register listener : ' + firstListener.name);

///////////////////////////////////////////////////////////////
var secondListenerId = myTopic.addListener('my-event', secondListener);
console.log('4) register listener : ' + secondListener.name);

var eventMessage = 'Hello World';
console.log(`\n 5) dispatch event : '${eventArray[0]}' with message '${eventMessage}'`);

///////////////////////////////////////////////////////////////
myTopic.dispatch('my-event', eventMessage);

///////////////////////////////////////////////////////////////
myTopic.removeListener(secondListenerId);
console.log('\n6) remove ' + secondListener.name);

///////////////////////////////////////////////////////////////
console.log('7) re-dispatch event ' + eventArray[0] + ' without message');
myTopic.dispatch('my-event');


