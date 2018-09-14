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
//# sourceMappingURL=form.js.map