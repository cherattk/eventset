var EventSet = require('eventset').default;

/**
 *  I - First Component (Form) 
 *      That Trigger Event
 */
class FormComponent {

    constructor(anchor_id , eventSet){
        this.id = 'task_form';
        this.initView(anchor_id);
        this.eventHandler(eventSet);
    }
    
    initView(anchor_id){
        var anchor = document.getElementById(anchor_id);
            anchor.innerHTML =  `<form id="${this.id}">
                    <input type="text" name="task_label" placeholder="Add a task"/>
                    <input type="submit" value="save"/>
                </form>`;
    }

    eventHandler(eventSet){

        document.getElementById(this.id).onsubmit = function(e){

            e.preventDefault();
            if(!this.elements['task_label'].value){
                window.alert('Sorry, i can\'t add an empty value to the list');
                return;
            }            
            var value = this.elements['task_label'].value;
            var eventMessage = {
                        "label" : value
                    };
            
            /**
             * Trigger Event
             */
            var eventName = "add.task";
            eventSet.triggerEvent(eventName , eventMessage);
            
            this.elements['task_label'].focus();
            this.elements['task_label'].value = '';
        };
    }
    
}


/**
 *  II - Seconde Component (List) 
 *      That Listen to FirstComponent (Form)
 */
class ListComponent {

    constructor(anchor_id , eventSet){
        // 1-
        this.id = 'task_list';
        this.dataView = [];
        this.initView(anchor_id);        
        this.listView();
        
        /**
         *  Register ListComponent to "add.task" Event
         */
        this.eventToListenTo = "add.task";
        eventSet.addListener(this.eventToListenTo , this  /* ListComponent instance */);
    }
    
    initView(anchor_id){
        var anchor = document.getElementById(anchor_id);
            anchor.innerHTML = `<ul id="${this.id}" class="task_list">
                                <li class="empty-state">Empty List</li>
                            </ul>`;
    }    
    listView(){        
        if(this.dataView.length){
            var list = document.getElementById(this.id);
            list.innerHTML = '';
            this.dataView.map(function(task){
               list.innerHTML += `<li>
                                    <label>
                                        <input type="checkbox" name="task"/>
                                        <span class="task">${task.label}</span>
                                    </label>
                                    </li>`; 
            });
        }
    }
    /**
     * notification() is a required method to receive the message
     * from event trigger component
     */
    notification(event_name , message){        
        var dataView = this.dataView.push(message);
        if(event_name === this.eventToListenTo){
            this.listView(dataView);
        }
    }
}

// III =========================================
var eventSet = new EventSet();
new FormComponent('anchor_form' , eventSet);
new ListComponent('anchor_list' , eventSet);






