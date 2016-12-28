/**
 * File: persistent-checkbox.js
 * Date: 28-Dec-2016
 *
 * Distributed under the FreeBSD License:
 *
 * Copyright (c) 2016, Henry Feild
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met: 
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer. 
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution. 
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * The views and conclusions contained in the software and documentation are those
 * of the authors and should not be interpreted as representing official policies, 
 * either expressed or implied, of the FreeBSD Project. 
 */

/**
 * Provides persistent storage of checkbox status for input checkboxes with
 * non-empty id attributes. These are stored in localStorage, so only browsers
 * that support localStorage will see checkboxes status stored.
 *
 * Usage: Invoke the PersistantCheckboxes function. It will load any saved check
 * boxes and place a listener on checkbox changes, saving the status of every
 * checkbox as it changes. 
 */
var PersistentCheckboxes = function(){
    var load, save, addListeners, init;

    /**
     * A listener to be placed on a checkbox. Saves the checked property (true 
     * or false) of the checkbox provided in localStorage using its id as the 
     * key. Checkboxes without an id are not saved.
     *
     * @param event The triggered event (ignored). 
     */
    save = function(event){
        // Only inputs with an id will be saved.
        if(this.id === ""){ return; }
        localStorage.setItem(this.id, this.checked+"");
    };

    /**
     * Loads any saved checkbox statuses from localStorage.
     */
    load = function(){
        jQuery('input[type="checkbox"]').each(function(i, elm){
            // Ignore checkboxes with no id.
            if(elm.id !== "" && elm.id in localStorage){
                elm.checked = localStorage.getItem(elm.id) === "true";
            }
        });
    };

    /**
     * Places a listener on checkbox changes, which triggers the save function.
     */
    addListeners = function(){
        jQuery(document).on('change', 'input[type=checkbox]', save);
    };

    /**
     * Loads any saved data and adds listeners for changes to checkboxes.
     */
    init = function(options){
        // Only supported if localStorage is available.
        if(typeof(Storage) === "undefined"){ return; }
        load();
        addListeners();
    };

    init();

    return this;
};


// Lets get this party started!
var persistentCheckboxes;
jQuery(document).ready(function(){
    persistentCheckboxes = new PersistentCheckboxes();
});