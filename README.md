# EventSet
Topic-based Pub-Sub Implementation

## usage
```bash
$ npm install --save eventset

```
```js
// ES6 import
import EventSet from 'eventset';
//or 
//const EventSet = require('eventset').default;

 // ui topic
const UIEvent = new EventSet('ui');

// business data topic
const DataModelEvent = new EventSet('data-model');

/**
* callback action when event is dispatched
*/
function EventNotification(event){

    var log = event.message + ' from [' + event.topic + ']::[' + event.name + ']';
        console.log(log);
}

var myEvent = {
    name : 'my-event',
    message : 'hello word!'
};

// register listener
UIEvent.AddListener(myEvent.name , EventNotification);
DataModelEvent.AddListener(myEvent.name , EventNotification);

// trigger event
UIEvent.trigger(myEvent.name , myEvent.message);
DataModelEvent.trigger(myEvent.name , myEvent.message);
    
```
### To run the [demo app](https://github.com/cherattk/eventset/tree/master/demo)
##### 1) install source
```
$  git clone https://github.com/cherattk/eventset.git
```
##### 2) install dependencies and compile src/* and test/src/* files
```
$ cd eventset
$ npm install
$ npm run build
```
##### 3) install demo
```
$ npm run build:demo
```
##### run the README example
```
$ node demo/dist/readme.example.js
```
##### or open ./demo/demo.html