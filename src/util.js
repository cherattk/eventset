/**
 * @module Util
 * @license MIT Licence
 * @copyright Copyright (c) 2018-2019 cheratt karim
 */


const Util = {
    
    /**
     * Convert input string to lowercase and remove whitespaces and slashes
     * 
     * @param {string} value to clean 
     */
    clean : function(input){
        if(!this.isString(input)){
            var errorMsg = `Util.clean() : input argument must be of type string`;            
            throw new TypeError(errorMsg);
        }
        return input.toLowerCase().replace(/\s|\//g, "");
    },

    /**
     * 
     * @param {string} input
     */
    isString : function(input){
        return (typeof input === 'string' && input !== '');
    }

};

module.exports = Util;