"use strict";

// Определение класса
var ProjectUsers = function () {

    var initTable = function () {
        // Set date data order
        const table = document.getElementById('project_users_table');

        if (!table) {
            return;
        }
        
        const tableRows = table.querySelectorAll('tbody tr');
        
        tableRows.forEach(row => {
            const dateRow = row.querySelectorAll('td');
            const realDate = moment(dateRow[1].innerHTML, "MMM D, YYYY").format();
            dateRow[1].setAttribute('data-order', realDate);
        });

        // Init datatable --- more info on datatables: https://datatables.net/manual/
        const datatable = $(table).DataTable({
            "info": false,
            'order': [],
            "columnDefs": [{
                "targets": 4,
                "orderable": false
            }]
        });

        // Search --- official docs reference: https://datatables.net/reference/api/search()
        var filterSearch = document.getElementById('filter_search');
        if (filterSearch) {
            filterSearch.addEventListener('keyup', function (e) {
                datatable.search(e.target.value).draw();
            });
        }        
    }

    // Публичные методы
    return {
        init: function () {
            initTable();
        }
    }
}();

// При загрузке документа
Util.onDOMContentLoaded(function() {
    ProjectUsers.init();
});