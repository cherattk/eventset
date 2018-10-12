// ES6 import
import EventSet from 'eventset';
//or 
//const EventSet = require('eventset').default;

 // ui topic
const UIEvent = new EventSet('ui');

// business data topic
const DataModelEvent = new EventSet('data-model');

/**
* callback action when event is dispatched
*/
function EventNotification(event){

    var log = event.message + ' from [' + event.topic + ']::[' + event.name + ']';
        console.log(log);
}

var myEvent = {
    name : 'my-event',
    message : 'hello word!'
};

// register listener
UIEvent.AddListener(myEvent.name , EventNotification);
DataModelEvent.AddListener(myEvent.name , EventNotification);

// trigger event
UIEvent.trigger(myEvent.name , myEvent.message);
DataModelEvent.trigger(myEvent.name , myEvent.message);