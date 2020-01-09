# ChangeLog
All notable changes to this project will be documented in this file

## v1.8.0
- Asynchronous and Non-Blocking call of event listeners, even when listenrs throws Error.
- **Topic.addListener()** accepts error callback function as third argument. 
  By default the Error is sent to the console.
- Rename **Eventset.Topic()** is deprecated and will be removed, use **Eventset.createTopic()** instead.

## v1.7.3
- **message** property of the listener's argument is set to 
empty object when no message is dispatched.
- Rename **Topic.getEvent()** to **Topic.getEventList()**.

## v1.7.2
- Fix module path in the tests suite : now the tests import module from the **build** folder.
- Assign a **null** value to the **message** property of the listener's argument
rather than leaving it undefined.
- Rename Util.iString() to Util.isValidString() which is semantically more accurate.

## v1.7.1
### Fix
- **Topic.dispatch()** : the event can now be dispatched without message,
in this case the listener's argument does not have the message property.  
example : Topic.dispatch('show-list') // the second argument can be omited.

## v1.7.0
### Added
- Add changelog file
- Add a link to an example usage with UI Components

### Changed
- package.json : remove build command
- rename example.js to cli.example.js
