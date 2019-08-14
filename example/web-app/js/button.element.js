const UIEvent = require('./ui-event');

function ShowListButton() {

  var _state = {showList : true};
  var _element = null;

  this.init = function (config) {
    _element = document.getElementById(config.anchor_id);
    _element.onclick = this.clickHandler.bind(this);
    this.render();
  }

  this.clickHandler = function () {
    _state.showList = !_state.showList;
    this.render();
    UIEvent.dispatch('toggle-list' , "hello world");
  }

  this.render = function () {
    var text = _state.showList ? 'Show List' : 'Hide List';
    _element.innerHTML = `
      <span id="btn-show-list" class="button">
        ${text}
      </span>`;
  }
}

module.exports = function (config) {
  var b = new ShowListButton();
  b.init(config);
};;