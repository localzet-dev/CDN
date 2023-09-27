"use strict";

// Определение класса
var ModalShareEarn = function () {
    // Приватные методы
    var handleForm = function() {
        var button = document.querySelector('#share_earn_link_copy_button');
        var input = document.querySelector('#share_earn_link_input');
        var clipboard = new ClipboardJS(button);

        if (!clipboard) {
            return;
        }

        //  Copy text to clipboard. For more info check the plugin's documentation: https://clipboardjs.com/
        clipboard.on('success', function(e) {
            var buttonCaption = button.innerHTML;
            //Add bgcolor
            input.classList.add('bg-success');
            input.classList.add('text-inverse-success');

            button.innerHTML = 'Copied!';

            setTimeout(function() {
                button.innerHTML = buttonCaption;

                // Remove bgcolor
                input.classList.remove('bg-success'); 
                input.classList.remove('text-inverse-success'); 
            }, 3000);  // 3seconds

            e.clearSelection();
        });
    }

    // Публичные методы
    return {
        init: function () {
            handleForm();
        }
    }
}();

// При загрузке документа
Util.onDOMContentLoaded(function() {
    ModalShareEarn.init();
});
