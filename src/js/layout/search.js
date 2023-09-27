"use strict";

// Определение класса
var LayoutSearch = function() {
    // Private variables
    var element;
    var formElement;
    var mainElement;
    var resultsElement;
    var wrapperElement;
    var emptyElement;

    var preferencesElement;
    var preferencesShowElement;
    var preferencesDismissElement;
    
    var advancedOptionsFormElement;
    var advancedOptionsFormShowElement;
    var advancedOptionsFormCancelElement;
    var advancedOptionsFormSearchElement;
    
    var searchObject;

    // Приватные методы
    var processs = function(search) {
        var timeout = setTimeout(function() {
            var number = Util.getRandomInt(1, 3);

            // Hide recently viewed
            mainElement.classList.add('d-none');

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

    var processsAjax = function(search) {
        // Hide recently viewed
        mainElement.classList.add('d-none');

        // Learn more: https://axios-http.com/docs/intro
        axios.post('/search.php', {
            query: searchObject.getQuery()
        })
        .then(function (response) {
            // Populate results
            resultsElement.innerHTML = response;
            // Show results
            resultsElement.classList.remove('d-none');
            // Hide empty message 
            emptyElement.classList.add('d-none');

            // Complete search
            search.complete();
        })
        .catch(function (error) {
            // Hide results
            resultsElement.classList.add('d-none');
            // Show empty message 
            emptyElement.classList.remove('d-none');

            // Complete search
            search.complete();
        });
    }

    var clear = function(search) {
        // Show recently viewed
        mainElement.classList.remove('d-none');
        // Hide results
        resultsElement.classList.add('d-none');
        // Hide empty message 
        emptyElement.classList.add('d-none');
    }    

    var handlePreferences = function() {
        // Preference show handler
        preferencesShowElement.addEventListener('click', function() {
            wrapperElement.classList.add('d-none');
            preferencesElement.classList.remove('d-none');
        });

        // Preference dismiss handler
        preferencesDismissElement.addEventListener('click', function() {
            wrapperElement.classList.remove('d-none');
            preferencesElement.classList.add('d-none');
        });
    }

    var handleAdvancedOptionsForm = function() {
        // Show
        advancedOptionsFormShowElement.addEventListener('click', function() {
            wrapperElement.classList.add('d-none');
            advancedOptionsFormElement.classList.remove('d-none');
        });

        // Cancel
        advancedOptionsFormCancelElement.addEventListener('click', function() {
            wrapperElement.classList.remove('d-none');
            advancedOptionsFormElement.classList.add('d-none');
        });

        // Search
        advancedOptionsFormSearchElement.addEventListener('click', function() {
            
        });
    }

    // Публичные методы
	return {
		init: function() {
            // Elements
            element = document.querySelector('#header_search');

            if (!element) {
                return;
            }

            wrapperElement = element.querySelector('[data-search-element="wrapper"]');
            formElement = element.querySelector('[data-search-element="form"]');
            mainElement = element.querySelector('[data-search-element="main"]');
            resultsElement = element.querySelector('[data-search-element="results"]');
            emptyElement = element.querySelector('[data-search-element="empty"]');

            preferencesElement = element.querySelector('[data-search-element="preferences"]');
            preferencesShowElement = element.querySelector('[data-search-element="preferences-show"]');
            preferencesDismissElement = element.querySelector('[data-search-element="preferences-dismiss"]');

            advancedOptionsFormElement = element.querySelector('[data-search-element="advanced-options-form"]');
            advancedOptionsFormShowElement = element.querySelector('[data-search-element="advanced-options-form-show"]');
            advancedOptionsFormCancelElement = element.querySelector('[data-search-element="advanced-options-form-cancel"]');
            advancedOptionsFormSearchElement = element.querySelector('[data-search-element="advanced-options-form-search"]');
            
            // Initialize search handler
            searchObject = new Search(element);

            // Demo search handler
            searchObject.on('kt.search.process', processs);

            // Ajax search handler
            //searchObject.on('kt.search.process', processsAjax);

            // Clear handler
            searchObject.on('kt.search.clear', clear);

            // Custom handlers
            handlePreferences();
            handleAdvancedOptionsForm();            
		}
	};
}();

// При загрузке документа
Util.onDOMContentLoaded(function() {
    LayoutSearch.init();
});