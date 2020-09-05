const eventset = require('eventset');

// create one event store named 'app-ui-event' to store UI Event
var UIEvent = eventset.createTopic('app-ui-event');

// create another event store named 'app-data-event' to store Data Event
var DataEvent = eventset.createTopic('app-data-event');

// register event 'show-list' to 'app-ui-event' topic
UIEvent.addEvent('show-list');

// register event 'get-data-list' to 'app-data-event' topic
DataEvent.addEvent('get-data-list');

module.exports = {
  UIEvent ,
  DataEvent
};