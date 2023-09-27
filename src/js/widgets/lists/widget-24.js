"use strict";

// Определение класса
var TimelineWidget24 = function () {
    // Private methods
    var handleActions = function() {
        var card = document.querySelector('#t_widget_24');        
        
        if ( !card ) {
            return;
        }

        // Checkbox Handler
        Util.on(card, '[data-element="follow"]', 'click', function (e) {
            if ( this.innerText === 'Following' ) {
                this.innerText = 'Follow';
                this.classList.add('btn-light-primary');
                this.classList.remove('btn-primary');
                this.blur();
            } else {
                this.innerText = 'Following';
                this.classList.add('btn-primary');
                this.classList.remove('btn-light-primary');
                this.blur();
            }
        });
    }

    // Публичные методы
    return {
        init: function () {           
            handleActions();             
        }   
    }
}();

// Webpack support
if (typeof module !== 'undefined') {
    module.exports = TimelineWidget24;
}

// При загрузке документа
Util.onDOMContentLoaded(function() {
    TimelineWidget24.init();
}); 
