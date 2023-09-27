"use strict";

// Определение класса
var PlayersWidget1 = function () {
    // Private methods
    var initPlayers = function() {
        // https://www.w3schools.com/jsref/dom_obj_audio.asp
        // Toggle Handler
        Util.on(document.body, '[data-element="list-play-button"]', 'click', function (e) {
            var currentButton = this;

            var audio = document.querySelector('[data-element="audio-track-1"]');
            var playIcon = this.querySelector('[data-element="list-play-icon"]');
            var pauseIcon = this.querySelector('[data-element="list-pause-icon"]');

            if (pauseIcon.classList.contains('d-none')) {
                audio.play();

                playIcon.classList.add('d-none');
                pauseIcon.classList.remove('d-none');
            } else {
                audio.pause();

                playIcon.classList.remove('d-none');
                pauseIcon.classList.add('d-none');
            }
            
            var buttons = [].slice.call(document.querySelectorAll('[data-element="list-play-button"]'));
            buttons.map(function (button) {
                if (button !== currentButton) {
                    var playIcon = button.querySelector('[data-element="list-play-icon"]');
                    var pauseIcon = button.querySelector('[data-element="list-pause-icon"]');

                    playIcon.classList.remove('d-none');
                    pauseIcon.classList.add('d-none');
                }
            });
        });
    }

    // Публичные методы
    return {
        init: function () {
            initPlayers();
        }   
    }
}();

// Webpack support
if (typeof module !== 'undefined') {
    module.exports = PlayersWidget1;
}

// Window load
window.addEventListener("load", function() {
    PlayersWidget1.init();
}); 
        
        
        
           