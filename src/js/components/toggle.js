"use strict";

// Определение класса
var Toggle = function(element, options) {
    ////////////////////////////
    // ** Private variables  ** //
    ////////////////////////////
    var the = this;

    if (!element) {
        return;
    }

    // Default Options
    var defaultOptions = {
        saveState: true
    };

    ////////////////////////////
    // ** Private methods  ** //
    ////////////////////////////

    var _construct = function() {
        if ( Util.data(element).has('toggle') === true ) {
            the = Util.data(element).get('toggle');
        } else {
            _init();
        }
    }

    var _init = function() {
        // Variables
        the.options = Util.deepExtend({}, defaultOptions, options);
        the.uid = Util.getUniqueId('toggle');

        // Elements
        the.element = element;

        the.target = document.querySelector(the.element.getAttribute('data-toggle-target')) ? document.querySelector(the.element.getAttribute('data-toggle-target')) : the.element;
        the.state = the.element.hasAttribute('data-toggle-state') ? the.element.getAttribute('data-toggle-state') : '';
        the.mode = the.element.hasAttribute('data-toggle-mode') ? the.element.getAttribute('data-toggle-mode') : '';
        the.attribute = 'data-' + the.element.getAttribute('data-toggle-name');

        // Event Handlers
        _handlers();

        // Bind Instance
        Util.data(the.element).set('toggle', the);
    }

    var _handlers = function() {
        Util.addEvent(the.element, 'click', function(e) {
            e.preventDefault();

            if ( the.mode !== '' ) {
                if ( the.mode === 'off' && _isEnabled() === false ) {
                    _toggle();
                } else if ( the.mode === 'on' && _isEnabled() === true ) {
                    _toggle();
                }
            } else {
                _toggle();
            }
        });
    }

    // Event handlers
    var _toggle = function() {
        // Trigger "after.toggle" event
        EventHandler.trigger(the.element, 'kt.toggle.change', the);

        if ( _isEnabled() ) {
            _disable();
        } else {
            _enable();
        }       

        // Trigger "before.toggle" event
        EventHandler.trigger(the.element, 'kt.toggle.changed', the);

        return the;
    }

    var _enable = function() {
        if ( _isEnabled() === true ) {
            return;
        }

        EventHandler.trigger(the.element, 'kt.toggle.enable', the);

        the.target.setAttribute(the.attribute, 'on');

        if (the.state.length > 0) {
            the.element.classList.add(the.state);
        }        

        if ( typeof Cookie !== 'undefined' && the.options.saveState === true ) {
            Cookie.set(the.attribute, 'on');
        }

        EventHandler.trigger(the.element, 'kt.toggle.enabled', the);

        return the;
    }

    var _disable = function() {
        if ( _isEnabled() === false ) {
            return;
        }

        EventHandler.trigger(the.element, 'kt.toggle.disable', the);

        the.target.removeAttribute(the.attribute);

        if (the.state.length > 0) {
            the.element.classList.remove(the.state);
        } 

        if ( typeof Cookie !== 'undefined' && the.options.saveState === true ) {
            Cookie.remove(the.attribute);
        }

        EventHandler.trigger(the.element, 'kt.toggle.disabled', the);

        return the;
    }

    var _isEnabled = function() {
        return (String(the.target.getAttribute(the.attribute)).toLowerCase() === 'on');
    }

    var _destroy = function() {
        Util.data(the.element).remove('toggle');
    }

    // Construct class
    _construct();

    ///////////////////////
    // ** Public API  ** //
    ///////////////////////

    // Plugin API
    the.toggle = function() {
        return _toggle();
    }

    the.enable = function() {
        return _enable();
    }

    the.disable = function() {
        return _disable();
    }

    the.isEnabled = function() {
        return _isEnabled();
    }

    the.goElement = function() {
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
Toggle.getInstance = function(element) {
    if ( element !== null && Util.data(element).has('toggle') ) {
        return Util.data(element).get('toggle');
    } else {
        return null;
    }
}

// Create instances
Toggle.createInstances = function(selector = '[data-toggle]') {
    // Get instances
    var elements = document.body.querySelectorAll(selector);

    if ( elements && elements.length > 0 ) {
        for (var i = 0, len = elements.length; i < len; i++) {
            // Initialize instances
            new Toggle(elements[i]);
        }
    }
}

// Global initialization
Toggle.init = function() {
    Toggle.createInstances();
};

// Webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Toggle;
}