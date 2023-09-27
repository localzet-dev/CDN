"use strict";

// Определение класса
var ModalCustomerSelect = function() {
    // Private variables
    var element;
    var suggestionsElement;
    var resultsElement;
    var wrapperElement;
    var emptyElement;
    var searchObject;
    
    var modal;

    // Приватные методы
    var processs = function(search) {
        var timeout = setTimeout(function() {
            var number = Util.getRandomInt(1, 6);

            // Hide recently viewed
            suggestionsElement.classList.add('d-none');

            if (number === 3) {
                // Hide results
                resultsElement.classList.add('d-none');
                // Show empty message 
                emptyElement.classList.remove('d-none');
            } else {
                // Show results
                resultsElement.classList.remove('d-none');
                // Hide empty message 
                emptyElement.classList.add('d-none');
            }                  

            // Complete search
            search.complete();
        }, 1500);
    }

    var clear = function(search) {
        // Show recently viewed
        suggestionsElement.classList.remove('d-none');
        // Hide results
        resultsElement.classList.add('d-none');
        // Hide empty message 
        emptyElement.classList.add('d-none');
    }    

    // Публичные методы
	return {
		init: function() {
            // Elements
            element = document.querySelector('#modal_customer_search_handler');
            modal = new bootstrap.Modal(document.querySelector('#modal_customer_search'));

            if (!element) {
                return;
            }

            wrapperElement = element.querySelector('[data-search-element="wrapper"]');
            suggestionsElement = element.querySelector('[data-search-element="suggestions"]');
            resultsElement = element.querySelector('[data-search-element="results"]');
            emptyElement = element.querySelector('[data-search-element="empty"]');
            
            // Initialize search handler
            searchObject = new Search(element);

            // Search handler
            searchObject.on('search.process', processs);

            // Clear handler
            searchObject.on('search.clear', clear);

            // Handle select
            Util.on(element, '[data-search-element="customer"]', 'click', function() {
                modal.hide();
            });
		}
	};
}();

// При загрузке документа
Util.onDOMContentLoaded(function () {
    ModalCustomerSelect.init();
});