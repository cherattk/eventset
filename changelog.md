# ChangeLog
All notable changes to this project will be documented in this file

## v1.7.1
### Fix
- Topic.dispatch() : the event can now be dispatched without message,
in this case the listeners argument will not contains message property
ex : Topic.dispatch('show-list') , the second argument can be omited

## v1.7.0
### Added
- Add changelog file
- Add a link to an example usage with UI Components

### Changed
- package.json : remove build command
- rename example.js to cli.example.js
