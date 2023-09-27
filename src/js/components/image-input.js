"use strict";

// Определение класса
var ImageInput = function(element, options) {
    ////////////////////////////
    // ** Private Variables  ** //
    ////////////////////////////
    var the = this;

    if ( typeof element === "undefined" || element === null ) {
        return;
    }

    // Default Options
    var defaultOptions = {
        
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var _construct = function() {
        if ( Util.data(element).has('image-input') === true ) {
            the = Util.data(element).get('image-input');
        } else {
            _init();
        }
    }

    var _init = function() {
        // Variables
        the.options = Util.deepExtend({}, defaultOptions, options);
        the.uid = Util.getUniqueId('image-input');

        // Elements
        the.element = element;
        the.inputElement = Util.find(element, 'input[type="file"]');
        the.wrapperElement = Util.find(element, '.image-input-wrapper');
        the.cancelElement = Util.find(element, '[data-image-input-action="cancel"]');
        the.removeElement = Util.find(element, '[data-image-input-action="remove"]');
        the.hiddenElement = Util.find(element, 'input[type="hidden"]');
        the.src = Util.css(the.wrapperElement, 'backgroundImage');

        // Set initialized
        the.element.setAttribute('data-image-input', 'true');

        // Event Handlers
        _handlers();

        // Bind Instance
        Util.data(the.element).set('image-input', the);
    }

    // Init Event Handlers
    var _handlers = function() {
        Util.addEvent(the.inputElement, 'change', _change);
        Util.addEvent(the.cancelElement, 'click', _cancel);
        Util.addEvent(the.removeElement, 'click', _remove);
    }

    // Event Handlers
    var _change = function(e) {
        e.preventDefault();

        if ( the.inputElement !== null && the.inputElement.files && the.inputElement.files[0] ) {
            // Fire change event
            if ( EventHandler.trigger(the.element, 'kt.imageinput.change', the) === false ) {
                return;
            }

            var reader = new FileReader();

            reader.onload = function(e) {
                Util.css(the.wrapperElement, 'background-image', 'url('+ e.target.result +')');
            }

            reader.readAsDataURL(the.inputElement.files[0]);

            the.element.classList.add('image-input-changed');
            the.element.classList.remove('image-input-empty');

            // Fire removed event
            EventHandler.trigger(the.element, 'kt.imageinput.changed', the);
        }
    }

    var _cancel = function(e) {
        e.preventDefault();

        // Fire cancel event
        if ( EventHandler.trigger(the.element, 'kt.imageinput.cancel', the) === false ) {
            return;
        }

        the.element.classList.remove('image-input-changed');
        the.element.classList.remove('image-input-empty');

        if (the.src === 'none') {   
            Util.css(the.wrapperElement, 'background-image', '');
            the.element.classList.add('image-input-empty');
        } else {
            Util.css(the.wrapperElement, 'background-image', the.src);
        }
        
        the.inputElement.value = "";

        if ( the.hiddenElement !== null ) {
            the.hiddenElement.value = "0";
        }

        // Fire canceled event
        EventHandler.trigger(the.element, 'kt.imageinput.canceled', the);
    }

    var _remove = function(e) {
        e.preventDefault();

        // Fire remove event
        if ( EventHandler.trigger(the.element, 'kt.imageinput.remove', the) === false ) {
            return;
        }

        the.element.classList.remove('image-input-changed');
        the.element.classList.add('image-input-empty');

        Util.css(the.wrapperElement, 'background-image', "none");
        the.inputElement.value = "";

        if ( the.hiddenElement !== null ) {
            the.hiddenElement.value = "1";
        }

        // Fire removed event
        EventHandler.trigger(the.element, 'kt.imageinput.removed', the);
    }

    var _destroy = function() {
        Util.data(the.element).remove('image-input');
    }

    // Construct Class
    _construct();

    ///////////////////////
    // ** Public API  ** //
    ///////////////////////

    // Plugin API
    the.getInputElement = function() {
        return the.inputElement;
    }

    the.getElement = function() {
        return the.element;
    }
    
    the.destroy = function() {
        return _destroy();
    }

    // Event API
    the.on = function(name, handler) {
        return EventHandler.on(the.element, name, handler);
    }

    the.one = function(name, handler) {
        return EventHandler.one(the.element, name, handler);
    }

    the.off = function(name, handlerId) {
        return EventHandler.off(the.element, name, handlerId);
    }

    the.trigger = function(name, event) {
        return EventHandler.trigger(the.element, name, event, the, event);
    }
};

// Static methods
ImageInput.getInstance = function(element) {
    if ( element !== null && Util.data(element).has('image-input') ) {
        return Util.data(element).get('image-input');
    } else {
        return null;
    }
}

// Create instances
ImageInput.createInstances = function(selector = '[data-image-input]') {
    // Initialize Menus
    var elements = document.querySelectorAll(selector);

    if ( elements && elements.length > 0 ) {
        for (var i = 0, len = elements.length; i < len; i++) {
            new ImageInput(elements[i]);
        }
    }
}

// Global initialization
ImageInput.init = function() {
    ImageInput.createInstances();
};

// Webpack Support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = ImageInput;
}
