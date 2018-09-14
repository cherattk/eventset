(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * EventSet
 * @copyright Copyright (c) 2018 cheratt karim
 * @license MIT Licence
 */

var Hook = function () {
    function Hook() {
        _classCallCheck(this, Hook);
    }

    _createClass(Hook, [{
        key: "before",
        value: function before(message) {
            return message;
        }
    }, {
        key: "after",
        value: function after(message) {
            return message;
        }
    }, {
        key: "beforeNotify",
        value: function beforeNotify(userCallBack) {
            if (typeof userCallBack === "function") {
                this.before = userCallBack;
            }
        }
    }, {
        key: "afterNotify",
        value: function afterNotify(userCallBack) {
            if (typeof userCallBack === "function") {
                this.after = userCallBack;
            }
        }
    }]);

    return Hook;
}();

exports.default = Hook;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * EventSet
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright Copyright (c) 2018 cheratt karim
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license MIT Licence
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _eventhook = require('./eventhook.js');

var _eventhook2 = _interopRequireDefault(_eventhook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**  @package */
var MapComponent;

/**  @package */
var MapHook;

var EventSet = function () {
    function EventSet() {
        _classCallCheck(this, EventSet);

        MapComponent = new Map();
        MapHook = new Map();
        this.EventHook('default').beforeNotify(function (message) {
            return message;
        });

        this.EventHook('default').afterNotify(function (message) {
            return message;
        });
    }

    /**
     * @return Hook "API" for specifique event
     */


    _createClass(EventSet, [{
        key: 'EventHook',
        value: function EventHook(eventName) {
            var eventKey = this.generateEventKey(eventName);
            if (!MapHook.has(eventKey)) {
                MapHook.set(eventKey, new _eventhook2.default());
            }
            return MapHook.get(eventKey);
        }
    }, {
        key: 'generateEventKey',
        value: function generateEventKey(event) {
            return event.toLowerCase().replace(/\s/g, "");
        }
    }, {
        key: 'removeListener',
        value: function removeListener(event, listener) {

            var eventKey = this.generateEventKey(event);
            if (MapComponent.has(eventKey)) {
                var listenerSet = MapComponent.get(eventKey);
                listenerSet.delete(listener);
            }
            return MapComponent.get(eventKey);
        }
    }, {
        key: 'addListener',
        value: function addListener(event, listener) {

            var listenerSet;
            var eventKey = this.generateEventKey(event);

            if (MapComponent.has(eventKey)) {
                listenerSet = MapComponent.get(eventKey);
                listenerSet.add(listener);
            } else {
                listenerSet = new Set();
                listenerSet.add(listener);
                MapComponent.set(eventKey, listenerSet);
            }
            return MapComponent.get(eventKey);
        }
    }, {
        key: 'getListenerSet',
        value: function getListenerSet(event) {
            var eventKey = this.generateEventKey(event);
            return MapComponent.get(eventKey);
        }
    }, {
        key: 'triggerEvent',
        value: function triggerEvent(event, message) {

            var msg_hook_1 = this.EventHook('default').before(message);

            //        var msg_hook_2 = this.EventHook(event).before(msg_hook_1);

            /****************** notify listeners ******************/
            var listenerSet = this.getListenerSet(event);

            if (listenerSet instanceof Set) {
                listenerSet.forEach(function (listener) {
                    listener.EventSetNotification(msg_hook_1, event);
                });
            }
            /*******************************************************/

            var msg_hook_3 = this.EventHook('default').after(msg_hook_1);

            //        this.EventHook(event).after(msg_hook_3);

        }
    }]);

    return EventSet;
}();

exports.default = EventSet;

},{"./eventhook.js":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventset = require('./eventset.js');

var _eventset2 = _interopRequireDefault(_eventset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _eventset2.default; /**
                                       * EventSet
                                       * @copyright Copyright (c) 2018 cheratt karim
                                       * @license MIT
                                       */

},{"./eventset.js":2}],4:[function(require,module,exports){
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

},{"eventset":3}],5:[function(require,module,exports){
'use strict';

var _demoEvent = require('./demo.event.js');

var _demoEvent2 = _interopRequireDefault(_demoEvent);

var _form = require('./form.js');

var _form2 = _interopRequireDefault(_form);

var _list = require('./list.js');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * init app
 * 
 * to prevent using EventSet as
 */
var anchorFormID = 'anchor_form'; /**
                                   * 
                                   */

new _form2.default(anchorFormID, _demoEvent2.default);

var anchorListID = 'anchor_list';
new _list2.default(anchorListID, _demoEvent2.default);

},{"./demo.event.js":4,"./form.js":6,"./list.js":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  I - Form : Component That will Trigger Event "form.add.task"
 */
var Form = function () {
    function Form(anchor_id, EventManager) {
        _classCallCheck(this, Form);

        this.id = 'task_form';
        this.initView(anchor_id);
        this.eventHandler(EventManager);
    }

    _createClass(Form, [{
        key: 'initView',
        value: function initView(anchor_id) {
            var anchor = document.getElementById(anchor_id);
            anchor.innerHTML = '<form id="' + this.id + '">\n                    <input type="text" name="task_label" placeholder="Add a task"/>\n                    <input type="submit" value="save"/>\n                </form>';
        }
    }, {
        key: 'eventHandler',
        value: function eventHandler(EventManager) {

            document.getElementById(this.id).onsubmit = function (e) {

                e.preventDefault();
                if (!this.elements['task_label'].value) {
                    window.alert('Sorry, i can\'t add an empty value to the list');
                    return;
                }
                var value = this.elements['task_label'].value;

                /**
                 * Trigger Event
                 */
                var eventName = "form.add.task";
                var eventMessage = { "label": value };

                EventManager.triggerEvent(eventName, eventMessage);

                this.elements['task_label'].focus();
                this.elements['task_label'].value = '';
            };
        }
    }]);

    return Form;
}();

exports.default = Form;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  II - "List" Component That Listen to "add.task" Event
 */
var List = function () {
    function List(anchor_id, EventManager) {
        _classCallCheck(this, List);

        this.id = 'task_list';
        this.dataView = [];
        this.initView(anchor_id);
        this.listView();

        // Register List to listen to "add.task" Event
        EventManager.addListener("form.add.task", this);
    }

    // event receiving method


    _createClass(List, [{
        key: 'EventSetNotification',
        value: function EventSetNotification(message, eventname) {

            switch (eventname) {
                case 'form.add.task':
                    this.dataView.push(message);
                    this.listView();
                    break;
                default:
                    var msg = 'ERROR : I don\'t know what to do with this event : ' + eventname;
                    alert("message from Form : " + msg);
                    console.log(msg);

            }
        }
    }, {
        key: 'initView',
        value: function initView(anchor_id) {
            var anchor = document.getElementById(anchor_id);
            anchor.innerHTML = '<ul id="' + this.id + '" class="task_list">\n                                <li class="empty-state">Empty List</li>\n                            </ul>';
        }
    }, {
        key: 'listView',
        value: function listView() {
            if (this.dataView.length) {
                var list = document.getElementById(this.id);
                list.innerHTML = '';
                this.dataView.map(function (task) {
                    list.innerHTML += '<li>\n                                    <label>\n                                        <input type="checkbox" name="task"/>\n                                        <span class="task">' + task.label + '</span>\n                                    </label>\n                                    </li>';
                });
            }
        }
    }]);

    return List;
}();

exports.default = List;

},{}]},{},[5]);
