"use strict";

// Определение класса
var AccountSettingsProfileDetails = function () {
    // Private variables
    var form;
    var submitButton;
    var validation;

    // Приватные методы
    var initValidation = function () {
        validation = FormValidation.formValidation(
            form,
            {
                fields: {
                    lastname: {
                        validators: {
                            notEmpty: {
                                message: 'Фамилия обязательна'
                            }
                        }
                    },
                    firstname: {
                        validators: {
                            notEmpty: {
                                message: 'Имя обязательно'
                            }
                        }
                    },
                    username: {
                        validators: {
                            notEmpty: {
                                message: 'Логин обязателен'
                            }
                        }
                    },
                    sex: {
                        validators: {
                            notEmpty: {
                                message: 'Пол обязателен'
                            }
                        }
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        );
    }

    var handleForm = function () {
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            validation.validate().then(function (status) {
                if (status == 'Valid') {

                    swal.fire({
                        text: "Thank you! You've updated your basic info",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-light-primary"
                        }
                    });

                } else {
                    swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-light-primary"
                        }
                    });
                }
            });
        });
    }

    // Публичные методы
    return {
        init: function () {
            $("#birthday_picker").flatpickr({
                dateFormat: "d.m.Y",
            });

            form = document.getElementById('account_details_form');

            if (!form) {
                return;
            }

            submitButton = form.querySelector('#account_details_save');

            initValidation();
            handleForm();
        }
    }
}();

// При загрузке документа
Util.onDOMContentLoaded(function () {
    AccountSettingsProfileDetails.init();
});
