
// AppEventManager is an Instance of EventSet
import AppEventManager from './demo.event.js';

import Form from './form.js';
import List from './list.js';

/**
 * Inject AppEventManager into component
 * to prevent using EventSet as GLOBAL OBJECT
 */
var anchorFormID = 'anchor_form';
new Form(anchorFormID , AppEventManager);

var anchorListID = 'anchor_list';
new List(anchorListID , AppEventManager);






