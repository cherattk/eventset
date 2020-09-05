const Button = require('./button.element');
const List = require('./list.element');


// const UIEvent = require('./ui-event');
// // Register listener BEFORE List() component,
// // this listener Throws Error that will be catched
// UIEvent.addListener('show-list',
//   function listener(eventMessage) {
//     throw new Error('the-error');
//   },
//   function (error, event) {
//     console.log("catched listener error : ");
//     console.log(event);
//     console.log(error);
//   })

Button({
  anchor_id: 'show-list-button'
});
List({
  anchor_id: 'list'
});