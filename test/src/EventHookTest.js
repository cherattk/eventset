import assert from 'assert';

// import app's build file
import {default as EventHook} from '../../build/eventhook.js';

describe("Test EventHook Class - " , function () {

    it("Test beforeNotify(function) \n\
        " , function () {
        
        var eventHook = new EventHook();
        
        var originalMessage = "hello";

        eventHook.beforeNotify(function(msg){
            return msg + "-before";
        });
        assert.equal(eventHook.before(originalMessage) , "hello-before");
        
    });


    it("Test afterNotify(function) \n\
        " , function () {
        
        var eventHook = new EventHook();
        
        var originalMessage = "hello";

        eventHook.afterNotify(function(msg){
            return msg + "-after";
        });
        assert.equal(eventHook.after(originalMessage) , "hello-after");
        
    });
});