'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var EventSet = require('eventset').default;

var AppEventManager = new EventSet();

/**
 * IMPORTANT : EventHook.beforeNotify() MUST 
 * @return the processed event message
*/

// The default Hook is applied to all events
var DEFAULT_HOOK = 'default';
var defaultEventHook = AppEventManager.EventHook(DEFAULT_HOOK);

// process event message BEFORE notification
defaultEventHook.beforeNotify(function (msg) {

    console.log('Hook action BEFORE notification');
    // converts a label field of event message to uppercase letters
    msg.label = msg.label.toUpperCase();
    return msg;
});

// process the event message AFTER all listeners are notified
defaultEventHook.afterNotify(function (msg) {
    console.log('Hook action AFTER notification');
    return msg;
});

/**
const FORM_ADD_TASK = 'form.add.task';
var addTaskHook  = AppEventManager.EventHook(FORM_ADD_TASK);

    addTaskHook.beforeNotify(function(msg){
        console.log('Hook action BEFORE notify listeners');
        msg.label = "value from hook.beforeNotify()";
        return msg;
    });    
    addTaskHook.afterNotify(function(msg){
        console.log('Hook action AFTER notify listeners');
        return msg;
    });
    

 * 
 */

exports.default = AppEventManager;
//# sourceMappingURL=demo.event.js.map