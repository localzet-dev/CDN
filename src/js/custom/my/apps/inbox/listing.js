"use strict";

// Определение класса
var AppInboxListing = function () {
    var table;
    var datatable;

    // Приватные методы
    var initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            "info": false,
            'order': [],
            // 'paging': false,
            // 'pageLength': false,      
        });

        datatable.on('draw', function () {
            handleDatatableFooter();
        });
    }

    // Handle datatable footer spacings
    var handleDatatableFooter = () => {
        const footerElement = document.querySelector('#inbox_listing_wrapper > .row');
        const spacingClasses = ['px-9', 'pt-3', 'pb-5'];
        footerElement.classList.add(...spacingClasses);
    }

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-inbox-listing-filter="search"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }


    // Публичные методы
    return {
        init: function () {
            table = document.querySelector('#inbox_listing');

            if (!table) {
                return;
            }

            initDatatable();
            handleSearchDatatable();
            handleDatatableFooter();
        }
    };
}();

// При загрузке документа
Util.onDOMContentLoaded(function () {
    AppInboxListing.init();
});
