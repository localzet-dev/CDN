"use strict";

// Определение класса
var AppFileManagerSettings = function () {
    var form;

	// Приватные методы
	var handleForm = function() {
		const saveButton = form.querySelector('#file_manager_settings_submit');

        saveButton.addEventListener('click', e => {
            e.preventDefault();

            saveButton.setAttribute("data-indicator", "on");

            // Simulate process for demo only
            setTimeout(function(){
                toastr.options = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": false,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };

                toastr.success('File manager settings have been saved');

                saveButton.removeAttribute("data-indicator");
            }, 1000);
        });
	}

	// Публичные методы
	return {
		init: function(element) {
            form = document.querySelector('#file_manager_settings');

			handleForm();
        }
	};
}();

// При загрузке документа
Util.onDOMContentLoaded(function () {
    AppFileManagerSettings.init();
});
