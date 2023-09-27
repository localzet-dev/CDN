"use strict";

// Определение класса
var ProjectTargets = function () {

    var initDatatable = function () {
        const table = document.getElementById('profile_overview_table');

        // set date data order
        const tableRows = table.querySelectorAll('tbody tr');
        tableRows.forEach(row => {
            const dateRow = row.querySelectorAll('td');
            const realDate = moment(dateRow[1].innerHTML, "MMM D, YYYY").format();
            dateRow[1].setAttribute('data-order', realDate);
        });

        // init datatable --- more info on datatables: https://datatables.net/manual/
        const datatable = $(table).DataTable({
            "info": false,
            'order': [],
            "paging": false,
        });

    }

    // Публичные методы
    return {
        init: function () {
            initDatatable();
        }
    }
}();


// При загрузке документа
Util.onDOMContentLoaded(function() {
    ProjectTargets.init();
});
