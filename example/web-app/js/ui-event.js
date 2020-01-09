const eventset = require('eventset');

var UIEvent = eventset.createTopic('app-ui-event');

UIEvent.addEvent('show-list');

module.exports = UIEvent;