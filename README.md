# EventSet
Topic based Pub/Sub Implementation

### usage
```bash
$ npm install --save eventset
```
### source
```bash
$ git clone https://github.com/cherattk/eventset.git
``` 
### test
```bash
$ npm run test
```

#### Usage

1- Define all application event in one main event file
```js
/**
 * ./my-event-store.js file
 * */
const eventset = require('eventset');

var UIEvent = eventset.createTopic('app-ui-event');

UIEvent.addEvent('show-list-event');

UIEvent.addEvent('my-another-event');

module.exports = UIEvent;

```
2- import event store and attache listener to the the event
```js
/**
 * ./my-list-component.js
 * */
const UIEvent = require('./my-event-store.js');

// register listener to 'show-list-event' event
UIEvent.addListener('show-list-event' , 
    // callback
    function(myEvent){
      console.log(JSON.stringify(myEvent));
    }, 
    // callback error
    function(callbackError){
      console.log(callbackError);
});
  
```
3- trigger event
```js
/**
 * ./my-button-component.js
 * */
const UIEvent = require('./my-event-store.js');

UIEvent.dispatch('show-list-event' , {show : true});

```

#### Browser usage.
See [example/web-app](https://github.com/cherattk/eventset/blob/master/example/web-app)

### API
#### EventSet

```js
/** 
 * Topic singleton factory
 * 
 * @param {string} topicName 
 * @returns Topic Instance
 * 
 * */

EventSet.createTopic(topicName : string) : Topic
```

#### Topic

```js
/**
 * Topic name getter
 * 
 * @returns {string} Topic Name
 * 
 * */

Topic.getName() : string
```

```js 
/**
 * Get list of events name
 * 
 * @returns {Array} An array of events name
 * 
 * */

Topic.getEventList() : Array<event : string>
```

```js
/** 
 * Append event named 'eventName' to events queue
 * 
 * @param {string} eventName
 * @returns {Array} an array of available events name
 * 
 * */

Topic.addEvent(eventName : string) : Array< event : string>
```

```js 
/** 
 * Remove the event named 'eventName' from the queue
 * - Notice : all listeners() attached to the event will be remove too
 * 
 * @param {string} eventName 
 * @returns {Array} An array of events
 * 
 * */

Topic.removeEvent(eventName : string) : Array<string>
```

```js
/** 
 * Register listener function to the event named 'eventName' 
 * - The listener function will receive object as argument with 
 *  the following properties: 
 *    {  
 *      topic : 'topic-name' ,  
 *      event : 'event-name' ,  
 *      message : 'the-message-passed-with-dispatch()'
 *    }
 * 
 * - The errorCallback function will receive the Error thown by the listenerCallback
 * 
 * - The returned value is the listener id that must be 
 *    used with Topic.removeListener() to remove the listener from the queue
 * 
 * @param {string} eventName
 * @param {Function} listener
 * @param {Function} errorCallback
 * 
 * @returns {string} listener id
 * 
 * */

Topic.addListener(eventName : string , listener : Function , errorCallback : Function) : string
```

```js
/** 
 * Remove listener 
 * 
 * @param {string} listenerId the id returned by Topic.addListener()
 * @returns true if it succeeds, false otherwise
 * 
 * */

Topic.removeListener(listenerId : string) : boolean
```

```js
/** 
 * Trigger all listeners attached to event named 'eventName'
 * 
 * @params {any} message the data to pass to the listeners
 * @returns undefined
 * 
 * */

Topic.dispatch(eventName : string , message : any) : undefined
```

#### Util

```js
/** 
 * Remove slashes and whitespaces from the input string
 * 
 * @param {string} input
 * @returns {string} cleaned value
 * 
 * */

Util.clean(input : string) : string
```

```js
/**
 * Check if input is of type String
 * 
 * @param {any}
 * @returns {boolean}
 * 
 * */

Util.isValidString(input) : boolean 
```