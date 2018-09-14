# EventSet
Publish-Subscribe Implementation with Hooks before and after notification

## usage
```bash
$ npm install --save eventset

```

```js

var EventSet = require('eventset').default;

var eventSet = new EventSet();
var eventName = 'my.event';

/**
* the listener MUST be an Object that 
* implements .EventSetNotification() method to receive the event
*/
var listenerObject = {
        EventSetNotification : function(event_name , event_message){
            console.log(event_name);
            console.log(event_message);
        }
    };
    
// register listener
eventSet.addListener(eventName , listenerObject);
    
// trigger event
var message = {message:'hello world!'};
eventSet.triggerEvent(eventName , message);
    
```