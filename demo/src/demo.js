var EventSet = require('eventset').default;

var eventManager = new EventSet();

/**
 *  I - (Form) - Component That will Trigger Event "form.add.task"
 */
class Form {

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

    eventHandler(){

        document.getElementById(this.id).onsubmit = function(e){

            e.preventDefault();
            if(!this.elements['task_label'].value){
                window.alert('Sorry, i can\'t add an empty value to the list');
                return;
            }            
            var value = this.elements['task_label'].value;            
            
            /**
             * Trigger Event
             */
            var eventName = "form.add.task";
            var eventMessage = { "label" : value };
            
            eventManager.triggerEvent(eventName , eventMessage);
            
            this.elements['task_label'].focus();
            this.elements['task_label'].value = '';
        };
    }
    
}


/**
 *  II - "List" Component That Listen to "add.task" Event
 */
class List {

    constructor(anchor_id){
        // 1-
        this.id = 'task_list';
        this.dataView = [];
        this.initView(anchor_id);        
        this.listView();
        
        // Register List to listen to "add.task" Event
        eventManager.addListener("form.add.task" , this);
    }
    
    // event receiving method
    EventSetNotification(message , eventname){
        
        switch(eventname){
            case 'form.add.task':
                this.dataView.push(message);
                this.listView();
            break;
            default:
                var msg = 'ERROR : I don\'t know what to do with this event : ' + eventname;
                alert("message from Form : " + msg );
                console.log(msg);
                
        }
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
    
}

/**
 * init components
 */ 
new Form('anchor_form');
new List('anchor_list');






