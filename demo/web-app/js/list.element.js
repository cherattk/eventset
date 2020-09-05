const EventStore = require('./ui-event');

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
    EventStore.UIEvent.addListener('show-list' , this.toggleList.bind(this));
    EventStore.DataEvent.addListener('get-data-list' , function name(myEvent) {
      console.log('topic : ' + myEvent.topic);
      console.log('event : ' + myEvent.event);
      console.log('message : ' + JSON.stringify(myEvent.message));
    });
  }

  this.toggleList = function(myCustomEvent){
    _state.show = myCustomEvent.message.show;
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