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
//# sourceMappingURL=list.js.map