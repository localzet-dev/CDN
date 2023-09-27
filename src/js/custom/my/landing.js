"use strict";

// Определение класса
var LandingPage = function () {
    // Private methods
    var initTyped = function() {
        var typed = new Typed("#landing_hero_text", {
            strings: ["The Best Theme Ever", "The Most Trusted Theme", "#1 Selling Theme"],
            typeSpeed: 50
        });
    }

    // Публичные методы
    return {
        init: function () {
            //initTyped();
        }   
    }
}();

// Webpack support
if (typeof module !== 'undefined') {
    module.exports = LandingPage;
}

// При загрузке документа
Util.onDOMContentLoaded(function() {
    LandingPage.init();
});
