# ChangeLog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Types of changes
**Added** for new features.
**Changed** for changes in existing functionality.
**Deprecated** for soon-to-be removed features.
**Removed** for now removed features.
**Fixed** for any bug fixes.
**Security** in case of vulnerabilities.


### 1.9.0 [Unreleased]
### Added
- **Topic.on()** alias of **Topic.addListener()**.

### Changed
- **Topic.addListener()** can accept an array on events.
- **Topic.addEvent()** accepts an array of events.

**************************************************************************************************

## v1.8.2 - 2021-06-30
## Added
- Code coverage to tests.

### Changed
- **changelog.md** now follows **https://keepachangelog.com/en/1.0.0/** recommendation.

### Deprecated
- **Eventset.Topic()** - use **Eventset.createTopic()** instead.

**************************************************************************************************

## v1.8.1
- Update dev dependencies
- update readme file
- remove build/ folder

## v1.8.0
- Fix devDependencies.
- Asynchronous and Non-Blocking call of event listeners, even when listener callback throws Error.
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
