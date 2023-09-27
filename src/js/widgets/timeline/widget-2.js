"use strict";

// Определение класса
var TimelineWidget2 = function () {
    // Private methods
    var handleCheckbox = function() {
        var card = document.querySelector('#timeline_widget_2_card');        
        
        if (!card) {
            return;
        }

        // Checkbox Handler
        Util.on(card, '[data-element="checkbox"]', 'change', function (e) {
            var check = this.closest('.form-check');
            var tr = this.closest('tr');
            var bullet = tr.querySelector('[data-element="bullet"]');
            var status = tr.querySelector('[data-element="status"]');

            if ( this.checked === true ) {
                check.classList.add('form-check-success');

                bullet.classList.remove('bg-primary');
                bullet.classList.add('bg-success');

                status.innerText = 'Done';
                status.classList.remove('badge-light-primary');
                status.classList.add('badge-light-success');
            } else {
                check.classList.remove('form-check-success');

                bullet.classList.remove('bg-success');
                bullet.classList.add('bg-primary');

                status.innerText = 'In Process';
                status.classList.remove('badge-light-success');
                status.classList.add('badge-light-primary');
            }
        });
    }

    // Публичные методы
    return {
        init: function () {           
            handleCheckbox();             
        }   
    }
}();

// Webpack support
if (typeof module !== 'undefined') {
    module.exports = TimelineWidget2;
}

// При загрузке документа
Util.onDOMContentLoaded(function() {
    TimelineWidget2.init();
});


 