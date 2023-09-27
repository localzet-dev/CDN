"use strict";

var DrawerHandlersInitialized = false; 

// Определение класса
var Drawer = function(element, options) {
    //////////////////////////////
    // ** Private variables  ** //
    //////////////////////////////
    var the = this;

    if ( typeof element === "undefined" || element === null ) {
        return;
    }

    // Default options
    var defaultOptions = {
        overlay: true,
        direction: 'end',
        baseClass: 'drawer',
        overlayClass: 'drawer-overlay'
    };

    ////////////////////////////
    // ** Private methods  ** //
    ////////////////////////////

    var _construct = function() {
        if ( Util.data(element).has('drawer') ) {
            the = Util.data(element).get('drawer');
        } else {
            _init();
        }
    }

    var _init = function() {
        // Variables
        the.options = Util.deepExtend({}, defaultOptions, options);
        the.uid = Util.getUniqueId('drawer');
        the.element = element;
        the.overlayElement = null;
        the.name = the.element.getAttribute('data-drawer-name');
        the.shown = false;
        the.lastWidth;
        the.toggleElement = null;

        // Set initialized
        the.element.setAttribute('data-drawer', 'true');

        // Event Handlers
        _handlers();

        // Update Instance
        _update();

        // Bind Instance
        Util.data(the.element).set('drawer', the);
    }

    var _handlers = function() {
        var togglers = _getOption('toggle');
        var closers = _getOption('close');

        if ( togglers !== null && togglers.length > 0 ) {
            Util.on(document.body, togglers, 'click', function(e) {
                e.preventDefault();

                the.toggleElement = this;
                _toggle();
            });
        }

        if ( closers !== null && closers.length > 0 ) {
            Util.on(document.body, closers, 'click', function(e) {
                e.preventDefault();

                the.closeElement = this;
                _hide();
            });
        }
    }

    var _toggle = function() {
        if ( EventHandler.trigger(the.element, 'kt.drawer.toggle', the) === false ) {
            return;
        }

        if ( the.shown === true ) {
            _hide();
        } else {
            _show();
        }

        EventHandler.trigger(the.element, 'kt.drawer.toggled', the);
    }

    var _hide = function() {
        if ( EventHandler.trigger(the.element, 'kt.drawer.hide', the) === false ) {
            return;
        }

        the.shown = false;

        _deleteOverlay();

        document.body.removeAttribute('data-drawer-' + the.name, 'on');
        document.body.removeAttribute('data-drawer');

        Util.removeClass(the.element, the.options.baseClass + '-on');

        if ( the.toggleElement !== null ) {
            Util.removeClass(the.toggleElement, 'active');
        }

        EventHandler.trigger(the.element, 'kt.drawer.after.hidden', the) === false
    }

    var _show = function() {
        if ( EventHandler.trigger(the.element, 'kt.drawer.show', the) === false ) {
            return;
        }

        the.shown = true;

        _createOverlay();
        document.body.setAttribute('data-drawer-' + the.name, 'on');
        document.body.setAttribute('data-drawer', 'on');

        Util.addClass(the.element, the.options.baseClass + '-on');

        if ( the.toggleElement !== null ) {
            Util.addClass(the.toggleElement, 'active');
        }

        EventHandler.trigger(the.element, 'kt.drawer.shown', the);
    }

    var _update = function() {
        var width = _getWidth();
        var direction = _getOption('direction');

        var top = _getOption('top');
        var bottom = _getOption('bottom');
        var start = _getOption('start');
        var end = _getOption('end');

        // Reset state
        if ( Util.hasClass(the.element, the.options.baseClass + '-on') === true && String(document.body.getAttribute('data-drawer-' + the.name + '-')) === 'on' ) {
            the.shown = true;
        } else {
            the.shown = false;
        }       

        // Activate/deactivate
        if ( _getOption('activate') === true ) {
            Util.addClass(the.element, the.options.baseClass);
            Util.addClass(the.element, the.options.baseClass + '-' + direction);
            
            Util.css(the.element, 'width', width, true);
            the.lastWidth = width;

            if (top) {
                Util.css(the.element, 'top', top);
            }

            if (bottom) {
                Util.css(the.element, 'bottom', bottom);
            }

            if (start) {
                if (Util.isRTL()) {
                    Util.css(the.element, 'right', start);
                } else {
                    Util.css(the.element, 'left', start);
                }
            }

            if (end) {
                if (Util.isRTL()) {
                    Util.css(the.element, 'left', end);
                } else {
                    Util.css(the.element, 'right', end);
                }
            }
        } else {
            Util.removeClass(the.element, the.options.baseClass);
            Util.removeClass(the.element, the.options.baseClass + '-' + direction);

            Util.css(the.element, 'width', '');

            if (top) {
                Util.css(the.element, 'top', '');
            }

            if (bottom) {
                Util.css(the.element, 'bottom', '');
            }

            if (start) {
                if (Util.isRTL()) {
                    Util.css(the.element, 'right', '');
                } else {
                    Util.css(the.element, 'left', '');
                }
            }

            if (end) {
                if (Util.isRTL()) {
                    Util.css(the.element, 'left', '');
                } else {
                    Util.css(the.element, 'right', '');
                }
            }

            _hide();
        }
    }

    var _createOverlay = function() {
        if ( _getOption('overlay') === true ) {
            the.overlayElement = document.createElement('DIV');

            Util.css(the.overlayElement, 'z-index', Util.css(the.element, 'z-index') - 1); // update

            document.body.append(the.overlayElement);

            Util.addClass(the.overlayElement, _getOption('overlay-class'));

            Util.addEvent(the.overlayElement, 'click', function(e) {
                e.preventDefault();

                if ( _getOption('permanent') !== true ) {
                    _hide();
                }
            });
        }
    }

    var _deleteOverlay = function() {
        if ( the.overlayElement !== null ) {
            Util.remove(the.overlayElement);
        }
    }

    var _getOption = function(name) {
        if ( the.element.hasAttribute('data-drawer-' + name) === true ) {
            var attr = the.element.getAttribute('data-drawer-' + name);
            var value = Util.getResponsiveValue(attr);

            if ( value !== null && String(value) === 'true' ) {
                value = true;
            } else if ( value !== null && String(value) === 'false' ) {
                value = false;
            }

            return value;
        } else {
            var optionName = Util.snakeToCamel(name);

            if ( the.options[optionName] ) {
                return Util.getResponsiveValue(the.options[optionName]);
            } else {
                return null;
            }
        }
    }

    var _getWidth = function() {
        var width = _getOption('width');

        if ( width === 'auto') {
            width = Util.css(the.element, 'width');
        }

        return width;
    }

    var _destroy = function() {
        Util.data(the.element).remove('drawer');
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

    the.show = function() {
        return _show();
    }

    the.hide = function() {
        return _hide();
    }

    the.isShown = function() {
        return the.shown;
    }

    the.update = function() {
        _update();
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
Drawer.getInstance = function(element) {
    if (element !== null && Util.data(element).has('drawer')) {
        return Util.data(element).get('drawer');
    } else {
        return null;
    }
}

// Hide all drawers and skip one if provided
Drawer.hideAll = function(skip = null, selector = '[data-drawer="true"]') {
    var items = document.querySelectorAll(selector);

    if (items && items.length > 0) {
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            var drawer = Drawer.getInstance(item);

            if (!drawer) {
                continue;
            }

            if ( skip ) {
                if ( item !== skip ) {
                    drawer.hide();
                }
            } else {
                drawer.hide();
            }
        }
    }
}

// Update all drawers
Drawer.updateAll = function(selector = '[data-drawer="true"]') {
    var items = document.querySelectorAll(selector);

    if (items && items.length > 0) {
        for (var i = 0, len = items.length; i < len; i++) {
            var drawer = Drawer.getInstance(items[i]);

            if (drawer) {
                drawer.update();
            }
        }
    }
}

// Create instances
Drawer.createInstances = function(selector = '[data-drawer="true"]') {
    // Initialize Menus
    var elements = document.querySelectorAll(selector);

    if ( elements && elements.length > 0 ) {
        for (var i = 0, len = elements.length; i < len; i++) {
            new Drawer(elements[i]);
        }
    }
}

// Toggle instances
Drawer.handleShow = function() {
    // External drawer toggle handler
    Util.on(document.body,  '[data-drawer-show="true"][data-drawer-target]', 'click', function(e) {
        e.preventDefault();
        
        var element = document.querySelector(this.getAttribute('data-drawer-target'));

        if (element) {
            Drawer.getInstance(element).show();
        } 
    });
}

// Dismiss instances
Drawer.handleDismiss = function() {
    // External drawer toggle handler
    Util.on(document.body,  '[data-drawer-dismiss="true"]', 'click', function(e) {
        var element = this.closest('[data-drawer="true"]');

        if (element) {
            var drawer = Drawer.getInstance(element);
            if (drawer.isShown()) {
                drawer.hide();
            }
        } 
    });
}

// Handle resize
Drawer.handleResize = function() {
    // Window resize Handling
    window.addEventListener('resize', function() {
        var timer;

        Util.throttle(timer, function() {
            // Locate and update drawer instances on window resize
            var elements = document.querySelectorAll('[data-drawer="true"]');

            if ( elements && elements.length > 0 ) {
                for (var i = 0, len = elements.length; i < len; i++) {
                    var drawer = Drawer.getInstance(elements[i]);
                    if (drawer) {
                        drawer.update();
                    }
                }
            }
        }, 200);
    });
}

// Global initialization
Drawer.init = function() {
    Drawer.createInstances();

    if (DrawerHandlersInitialized === false) {
        Drawer.handleResize();
        Drawer.handleShow();
        Drawer.handleDismiss();

        DrawerHandlersInitialized = true;
    }
};

// Webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Drawer;
}