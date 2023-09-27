"use strict";
 
// Определение класса
var SearchHorizontal = function () {
    // Приватные методы
    var initAdvancedSearchForm = function () {
       var form = document.querySelector('#advanced_search_form');

       // Init tags
       var tags = form.querySelector('[name="tags"]');
       new Tagify(tags);
    }

    var handleAdvancedSearchToggle = function () {
        var link = document.querySelector('#horizontal_search_advanced_link');

        link.addEventListener('click', function (e) {
            e.preventDefault();
            
            if (link.innerHTML === "Advanced Search") {
                link.innerHTML = "Hide Advanced Search";
            } else {
                link.innerHTML = "Advanced Search";
            }
        })
    }

    // Публичные методы
    return {
        init: function () {
            initAdvancedSearchForm();
            handleAdvancedSearchToggle();
        }
    }     
}();

// При загрузке документа
Util.onDOMContentLoaded(function () {
    SearchHorizontal.init();
});
