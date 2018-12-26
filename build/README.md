# EventSet
Topic-based Pub-Sub Implementation

##### usage
```bash
$ npm install --save eventset
```
##### Install
```bash
$ git clone https://github.com/cherattk/eventset.git
``` 
##### test
```bash
$ npm run test:all
$ npm run test:eventset
$ npm run test:topic
$ npm run test:util
```

### example
```bash
$ node example/example.js
```
### API
#### EventSet

```js
EventSet.createTopic(topicName : string) : Topic
```

#### Topic

```js
Topic.getName() : string
```

```js 
// Returns an array of events
Topic.getEvent() : Array<string>
```

```js
// Append event named eventName to events queue
// Returns an array of events
Topic.addEvent(eventName : string) : Array<string>
```

```js 
// Remove the event named eventName
// Returns an array of events
Topic.removeEvent(eventName : string) : Array<string>
```

```js
// Add listener to the event named eventName
// Returns listener identifier
Topic.addListener(eventName : string , listener : Function) : string
```

```js
// Remove listener
// Returns true if it succeeds, false otherwise
Topic.removeListener(listenerId : string) : boolean
```

```js
// Triggers all event listener
// Returns undefined
Topic.dispatch(eventName : string , message : any) : undefined
```

#### Util

```js
// Remove slashes and whitespaces from the input string
Util.clean(input : string) : string
```

```js
// check if input is of type String
Util.isString(input : string) : boolean 
```