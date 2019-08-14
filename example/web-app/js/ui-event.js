const eventset = require('eventset');

var UIEvent = eventset.Topic('app-ui-event');

UIEvent.addEvent('toggle-list');

module.exports = UIEvent;