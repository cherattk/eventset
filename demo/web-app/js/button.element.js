const EventStore = require('./ui-event');

function ShowListButton() {

  var _state = {showList : false};
  var _element = null;

  this.init = function (config) {
    _element = document.getElementById(config.anchor_id);
    _element.onclick = this.clickHandler.bind(this);
    this.render();
  }

  this.clickHandler = function () {
    _state.showList = !_state.showList;
    this.render();
    
    EventStore.UIEvent.dispatch('show-list' , {show : _state.showList});
    EventStore.DataEvent.dispatch('get-data-list' , {data_list : ['value-1' , 'value-2' , 'value-3']});
  }

  this.render = function () {
    var text = _state.showList ? 'Hide List' : 'Show List';
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