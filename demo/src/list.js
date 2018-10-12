/**
 *  II - "List" Component That Listen to "form.add.task" Event
 */

import {DataModelEvent} from './demo.event.js';

export default class List {

    constructor(anchor_id , EventManager){
        
        this.id = 'task_list';
        this.dataView = [];
        this.initView(anchor_id);        
        this.listView();
        
        /** 
         * List component is now listening to  
         * "form.add.task" event of "business-data" topic
        */
         DataModelEvent.AddListener("form.add.task" , this.EventSetNotification.bind(this));
    }
    
    // event receiving method
    EventSetNotification(event){
       switch(event.name){
            case 'form.add.task':
                this.dataView.push(event.message);
                this.listView();
            break;
            default:
                alert("message from Form : " + 
                        'ERROR : I don\'t know what to do with this event : ' + event.name );            
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
            var view = '';
            this.dataView.map(function(task){
               view += `<li>
                        <label>
                            <input type="checkbox" name="task"/>
                            <span class="task">${task.label}</span>
                        </label>
                        </li>`;
            });

            list.innerHTML = view;
        }
    }
    
}






