'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var EventSet = require('eventset').default;

var AppEventManager = new EventSet();

/**
 * IMPORTANT : EventHook.beforeNotify() MUST return the event message
*/

var DEFAULT_HOOK = 'default';
var defaultEventHook = AppEventManager.EventHook(DEFAULT_HOOK);

defaultEventHook.beforeNotify(function (msg) {
    console.log('Hook action BEFORE notify listeners');
    msg.label = "value from hook.beforeNotify()";
    return msg;
});
defaultEventHook.afterNotify(function (msg) {
    console.log('Hook action AFTER notify listeners');
    return msg;
});

/**
 * 
 */
var FORM_ADD_TASK = 'form.add.task';
var addTaskHook = AppEventManager.EventHook(FORM_ADD_TASK);

addTaskHook.beforeNotify(function (msg) {
    console.log('Hook action BEFORE notify listeners');
    msg.label = "value from hook.beforeNotify()";
    return msg;
});
addTaskHook.afterNotify(function (msg) {
    console.log('Hook action AFTER notify listeners');
    return msg;
});

exports.default = AppEventManager;
//# sourceMappingURL=demo.event.js.map