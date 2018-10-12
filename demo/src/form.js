/**
 *  I - Form : Component that triggers Event "form.add.task"
 */

import {DataModelEvent} from './demo.event.js';

export default class Form {

    constructor(anchor_id){
        this.id = 'task_form';
        this.initView(anchor_id);
        this.eventHandler();
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
            var eventMessage = { "label" : value };            
            DataModelEvent.trigger("form.add.task" , eventMessage);
            
            this.elements['task_label'].focus();
            this.elements['task_label'].value = '';
        };
    }
    
}






