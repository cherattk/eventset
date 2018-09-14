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

    _createClass(EventSet, [{
        key: 'EventHook',
        value: function EventHook(event) {
            var eventKey = this.generateEventKey(event);
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

            var msg_step_1 = this.EventHook('default').before(message);

            var msg_step_2 = this.EventHook(event).before(msg_step_1);

            /****************** notify listeners ******************/
            var listenerSet = this.getListenerSet(event);

            if (listenerSet instanceof Set) {
                listenerSet.forEach(function (listener) {
                    listener.EventSetNotification(msg_step_2, event);
                });
            }
            /*******************************************************/

            var msg_step_3 = this.EventHook(event).after(msg_step_2);

            var defaultAfterHook = this.EventHook('default').after(msg_step_3);
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
var EventSet = require('eventset').default;

var eventManager = new EventSet();

/**
 *  I - (Form) - Component That will Trigger Event "form.add.task"
 */
class Form {

    constructor(anchor_id , eventSet){
        this.id = 'task_form';
        this.initView(anchor_id);
        this.eventHandler(eventSet);
    }
    
    initView(anchor_id){
        var anchor = document.getElementById(anchor_id);
            anchor.innerHTML =  `<form id="${this.id}">
                    <input type="text" name="task_label" placeholder="Add a task"/>
                    <input type="submit" value="save"/>
                </form>`;
    }

    eventHandler(){

        document.getElementById(this.id).onsubmit = function(e){

            e.preventDefault();
            if(!this.elements['task_label'].value){
                window.alert('Sorry, i can\'t add an empty value to the list');
                return;
            }            
            var value = this.elements['task_label'].value;            
            
            /**
             * Trigger Event
             */
            var eventName = "form.add.task";
            var eventMessage = { "label" : value };
            
            eventManager.triggerEvent(eventName , eventMessage);
            
            this.elements['task_label'].focus();
            this.elements['task_label'].value = '';
        };
    }
    
}


/**
 *  II - "List" Component That Listen to "add.task" Event
 */
class List {

    constructor(anchor_id){
        // 1-
        this.id = 'task_list';
        this.dataView = [];
        this.initView(anchor_id);        
        this.listView();
        
        // Register List to listen to "add.task" Event
        eventManager.addListener("form.add.task" , this);
    }
    
    EventSetNotification(message , eventname){
        
        switch(eventname){
            case 'form.add.task':
                this.dataView.push(message);
                this.listView();
            break;
            default:
                var msg = 'ERROR : I don\'t know what to do with this event : ' + eventname;
                alert("message from Form : " + msg );
                console.log(msg);
                
        }
    }
    
    initView(anchor_id){
        var anchor = document.getElementById(anchor_id);
            anchor.innerHTML = `<ul id="${this.id}" class="task_list">
                                <li class="empty-state">Empty List</li>
                            </ul>`;
    }    
    listView(){        
        if(this.dataView.length){
            var list = document.getElementById(this.id);
            list.innerHTML = '';
            this.dataView.map(function(task){
               list.innerHTML += `<li>
                                    <label>
                                        <input type="checkbox" name="task"/>
                                        <span class="task">${task.label}</span>
                                    </label>
                                    </li>`; 
            });
        }
    }
    
}

// III =========================================
new Form('anchor_form');
new List('anchor_list');







},{"eventset":3}]},{},[4]);
