"use strict";

// Определение класса
var AccountSettingsOverview = function () {
    // Приватные методы
    var initSettings = function() {

    }

    // Публичные методы
    return {
        init: function () {
            initSettings();
        }
    }
}();

// При загрузке документа
Util.onDOMContentLoaded(function() {
    AccountSettingsOverview.init();
});
