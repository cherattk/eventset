const eventset = require('../eventset.js');

///////////////////////////////////////////////////////////////////
// 1 - Events
///////////////////////////////////////////////////////////////////
// create one events store named 'app-ui-event' to store UI related events
const UIEvent = eventset.createTopic('app-ui-event');

// create another events store named 'app-data-event' to store Data related events
const DataEvent = eventset.createTopic('app-data-event');

// register event "show-list" in "app-ui-event" topic
UIEvent.addEvent('show-list');

// register event "fetch-data-list" in "app-data-event" topic
DataEvent.addEvent('fetch-data-list');

/////////////////////////////////////////////////////////////////
// 2 - LISTENERS
/////////////////////////////////////////////////////////////////
UIEvent.addListener('show-list' , 
    // callback
    function(myEvent){
      console.log("Event from Topic : " + myEvent.topic);
      console.log("Event name : " + myEvent.event);
      console.log("Event description: " + myEvent.message.messageContent);
      console.log("load the data ? : " + (myEvent.message.show ? "yes please" : "no"));
      console.log("=====================================================");

      DataEvent.dispatch('fetch-data-list' , {
        eventDescription : "Load The data list",
        dataListUrl : "www.my-data-url.tld"
      });

    });

DataEvent.addListener('fetch-data-list' , 
    // callback
    function(myEvent){
      console.log("Event from Topic : " + myEvent.topic);
      console.log("Event name : " + myEvent.event);
      console.log("Event description: " + myEvent.message.eventDescription);
      console.log("Data List URL : " + myEvent.message.dataListUrl);
    },
    // callback error
    function(callbackError){
      console.log(callbackError);
});

////////////////////////////////////////////////////////////
// 3 - TRIGGERS
////////////////////////////////////////////////////////////
UIEvent.dispatch('show-list' , {
  show : true , 
  messageContent : "User clicked on the button"
});