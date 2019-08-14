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
$ npm run test:all
$ npm run test:eventset
$ npm run test:topic
$ npm run test:util
```

### Demo
```bash
$ npm run demo:cli
```
#### Usage with UI Component
See [Todo App](https://github.com/cherattk/cherattk.github.io)

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
EventSet.Topic(topicName : string) : Topic
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
Topic.getEvent() : Array<event : string>
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
 * - Notice : all listeners() attached to the event will be remove to
 * 
 * @param {string} eventName 
 * @returns {Array} An array of events
 * 
 * */
Topic.removeEvent(eventName : string) : Array<string>
```

```js
/** 
 * Add listener() to the event named 'eventName' 
 * - The listener() will receive object as argument with 
 * the following properties: 
 * listenerArgument : {  
 * topic : 'topic-name' ,  
 * event : 'event-name' ,  
 * message : 'the-message-passed-with-dispatch()'
 * }
 * 
 * - The return value is the listener id that must be 
 *    used with Topic.removeListener() to remove the listener from the queue
 * 
 * @param {string} eventName
 * @param {Function} listener
 * 
 * @returns {string} listener id
 * 
 * */
Topic.addListener(eventName : string , listener : Function) : string
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
Util.isString(input) : boolean 
```