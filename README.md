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
$ npm run test
```

### example
```bash
$ node example/example.js
```
### API
#### EventSet

- EventSet.createTopic(topicName : string) : Topic

#### Topic

- Topic.getName() : string

- Topic.getEvent() : Array\<string\>

- Topic.addEvent(eventName : string) : Array\<string\>

- Topic.removeEvent(eventName : string) : Array\<string\>

- Topic.addListener(eventName : string , listener : Function) : string

- Topic.getListener(eventName : string) : Array\<Function\>

- Topic.removeListener(listenerId : string) : boolean

- Topic.dispatch(eventName : string , message : any) : undefined

#### Util

- Util.clean(input : string) : string

- Util.isString(input : string) : boolean 
