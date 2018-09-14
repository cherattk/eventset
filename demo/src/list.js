/**
 *  II - "List" Component That Listen to "form.add.task" Event
 */
export default class List {

    constructor(anchor_id , EventManager){
        
        this.id = 'task_list';
        this.dataView = [];
        this.initView(anchor_id);        
        this.listView();
        
        // Register List to listen to "add.task" Event
        EventManager.addListener("form.add.task" , this);
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






