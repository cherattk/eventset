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

- EventSet.token(param : string) : string

- EventSet.isString(param : string) : boolean 

#### Topic

- Topic.getName() : string

- Topic.getEvent() : Array\<string\>

- Topic.addEvent(eventName : string) : Array\<string\>

- Topic.removeEvent(eventName : string) : Array\<string\>

- Topic.addListener(eventName : string , listener : any) : Array\<any\>

- Topic.getListener(eventName : string) : Array\<any\>

- Topic.removeListener(eventName : string , listener : any) : Array\<any\>

- Topic.dispatch(eventName : string , message : any) : undefined