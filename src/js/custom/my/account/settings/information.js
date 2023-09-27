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
                    submitButton.setAttribute("data-indicator", "on");
                    submitButton.disabled = true;

                    let formData = new FormData();

                    formData.append("avatar", form.querySelector('[name="avatar"]').files[0]);
                    formData.append("lastname", form.querySelector('[name="lastname"]').value);
                    formData.append("firstname", form.querySelector('[name="firstname"]').value);
                    formData.append("middlename", form.querySelector('[name="middlename"]').value);
                    formData.append("username", form.querySelector('[name="username"]').value);
                    formData.append("bithday", form.querySelector('[name="bithday"]').value);
                    formData.append("sex", form.querySelector('[name="sex"]').value);

                    axios.post(
                        '/settings/ajax/information',
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            }
                        }
                    ).then(function (response) {
                        submitButton.removeAttribute("data-indicator");
                        submitButton.disabled = false;

                        if (response.data && response.data.status == 200) {
                            console.debug(response)
                            swal.fire({
                                text: "Данные обновлены!",
                                icon: "success",
                                buttonsStyling: false,
                                confirmButtonText: "Хорошо!",
                                customClass: {
                                    confirmButton: "btn fw-bold btn-light-primary"
                                }
                            });
                        } else {
                            console.error(response.data.error, response.data.traces)

                            swal.fire({
                                text: response.data.error ?? "Неизвестная ошибка",
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Хорошо!",
                                customClass: {
                                    confirmButton: "btn fw-bold btn-light-primary"
                                }
                            });
                        }
                    }).catch(function (error) {
                        console.error(error)
                        submitButton.removeAttribute("data-indicator");
                        submitButton.disabled = false;

                        swal.fire({
                            text: "Проверьте соединение с интернетом или обратитесь к администрации",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Хорошо!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-light-primary"
                            }
                        });
                    });

                } else {
                    swal.fire({
                        text: "Пожалуйста, проверьте данные",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Хорошо!",
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
