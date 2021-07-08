# EventSet
Topic based Pub/Sub Implementation

### installation
```bash
$ npm install --save eventset
```
### test
```bash
$ git clone https://github.com/cherattk/eventset.git
$ cd eventset
$ npm run test
$ npm run test:usage
```

#### Example
see [example file](./test/example.usage.js)

### API
#### EventSet : index.js

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
```js
/**
   * @deprecated since 1.8.0
   * @alias of Eventset.createTopic()
   * 
   */
  EventSet.Topic(topicName : string) : Topic

```

#### Topic : topic.js

```js
/**
 * Get Topic Name
 * 
 * @returns {string} topic name
 */
Topic.getName() : string

```

```js 
/**
 * Get all registered events
 * 
 * @returns {Array<string>} An array of event names
 */
Topic.getEventList() : Array<event : string>

```

```js
/**
 * Register the event to the topic
 * and returns an array of registered events
 * 
 * @param   {string} eventName - event name
 * 
 * @returns {Array<string>} An array of events
 */
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

#### Util : util.js

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