const UIEvent = require('./ui-event');

function List() {

  var _element = null;
  var _state = {
    show : false,
    list :  [
      { name : 'Red'},
      { name : 'Blue'},
      { name : 'Green'}
    ]
  }

  this.init = function (config) {
    _element = document.getElementById(config.anchor_id);
    this.render();
  
    // register listener to 'toggle-list' event
    UIEvent.addListener('toggle-list' , this.toggleListHandler.bind(this));
  }

  this.toggleListHandler = function(){
    // we dont need to receive the message content,
    // we just toggle the show state
    _state.show = !_state.show;
    // re-render()
    this.render();
  }

  this.render = function () {
    var showState = _state.show ? 'show' : 'hide';
    var list = _state.list.map(function(data){
      return `<li>${data.name}</li>`;
    });

    _element.innerHTML = `    
      <ul class="${showState}">
        ${list.join('')}
      </ul>`;
  }
}

module.exports = function(config){
  var list = new List();
      list.init(config);
};