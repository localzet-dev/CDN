"use strict";

// Определение класса
var AccountReferralsReferralProgram = function () {
    // Приватные методы

    var initReferralProgrammClipboard = function() {
        var button = document.querySelector('#referral_program_link_copy_btn');
        var input = document.querySelector('#referral_link_input');
        var clipboard = new ClipboardJS(button);

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
            initReferralProgrammClipboard();
        }
    }
}();

// При загрузке документа
Util.onDOMContentLoaded(function() {
    AccountReferralsReferralProgram.init();
});
