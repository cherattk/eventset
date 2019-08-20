### Example usage of eventset package with isolated components.

#### isolated component
- Each component is defined in its own file and exports only a 
factory function to instantiate and initialize the component 
so that there is no way to access the component's properties 
from outside the component's file. furthermore, the factory function does not return a component instance.

#### communication
- The communication between components is done through eventset's topic
that is instantiated in **js/ui-event.js** file and exported as **UIEvent** Object.
It acts as a bridge between components.

#### producer & consumer
- The producer/publisher is the **ShowListButton** defined in **button.element.js** that trigger **toggle-list** event by calling **UIEvent.dispatch()**, 
and the consumer/listener is the **List** component defined in **list.element.js**.
The **List** component subscribes to the **toggle-list** event by 
adding the it's method **toggleListHandler()** as a callback function by calling **UIEvent.addListener()** method.

####