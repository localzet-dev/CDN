"use strict";

var AccountSettingsSigninMethods = function () {
    var signInForm;
    var signInMainEl;
    var signInEditEl;
    var passwordMainEl;
    var passwordEditEl;
    var signInChangeEmail;
    var signInCancelEmail;
    var passwordChange;
    var passwordCancel;

    var toggleChangeEmail = function () {
        signInMainEl.classList.toggle('d-none');
        signInChangeEmail.classList.toggle('d-none');
        signInEditEl.classList.toggle('d-none');
    }

    var toggleChangePassword = function () {
        passwordMainEl.classList.toggle('d-none');
        passwordChange.classList.toggle('d-none');
        passwordEditEl.classList.toggle('d-none');
    }

    // Приватные функции
    var initSettings = function () {
        if (!signInMainEl) {
            return;
        }

        // Переключение интерфейса
        signInChangeEmail.querySelector('button').addEventListener('click', function () {
            toggleChangeEmail();
        });

        signInCancelEmail.addEventListener('click', function () {
            toggleChangeEmail();
        });

        passwordChange.querySelector('button').addEventListener('click', function () {
            toggleChangePassword();
        });

        passwordCancel.addEventListener('click', function () {
            toggleChangePassword();
        });
    }

    var handleChangeEmail = function (e) {
        var validation;

        if (!signInForm) {
            return;
        }

        validation = FormValidation.formValidation(
            signInForm,
            {
                fields: {
                    emailaddress: {
                        validators: {
                            notEmpty: {
                                message: 'Почта обязательна'
                            },
                            emailAddress: {
                                message: 'Введите корректную почту'
                            }
                        }
                    },

                    confirmemailpassword: {
                        validators: {
                            notEmpty: {
                                message: 'Пароль обязателен'
                            }
                        }
                    }
                },

                plugins: { //Learn more: https://formvalidation.io/guide/plugins
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row'
                    })
                }
            }
        );

        signInForm.querySelector('#signin_submit').addEventListener('click', function (e) {
            e.preventDefault();
            console.log('click');

            validation.validate().then(function (status) {
                if (status == 'Valid') {
                    swal.fire({
                        text: "Отправлено письмо для сброса пароля. Пожалуйста, проверьте свою почту",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ок, понятно!",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-light-primary"
                        }
                    }).then(function () {
                        signInForm.reset();
                        validation.resetForm(); // Reset formvalidation --- more info: https://formvalidation.io/guide/api/reset-form/
                        toggleChangeEmail();
                    });
                } else {
                    swal.fire({
                        text: "Извините, обнаружены ошибки. Пожалуйста, попробуйте еще раз.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ок, понятно!",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-light-primary"
                        }
                    });
                }
            });
        });
    }

    var handleChangePassword = function (e) {
        var validation;

        // Элементы формы
        var passwordForm = document.getElementById('signin_change_password');

        if (!passwordForm) {
            return;
        }

        validation = FormValidation.formValidation(
            passwordForm,
            {
                fields: {
                    currentpassword: {
                        validators: {
                            notEmpty: {
                                message: 'Текущий пароль обязателен'
                            }
                        }
                    },

                    newpassword: {
                        validators: {
                            notEmpty: {
                                message: 'Новый пароль обязателен'
                            }
                        }
                    },

                    confirmpassword: {
                        validators: {
                            notEmpty: {
                                message: 'Подтверждение пароля обязательно'
                            },
                            identical: {
                                compare: function () {
                                    return passwordForm.querySelector('[name="newpassword"]').value;
                                },
                                message: 'Пароль и подтверждение не совпадают'
                            }
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row'
                    })
                }
            }
        );

        passwordForm.querySelector('#password_submit').addEventListener('click', function (e) {
            e.preventDefault();
            console.log('click');

            validation.validate().then(function (status) {
                if (status == 'Valid') {
                    swal.fire({
                        text: "Отправлено письмо для сброса пароля. Пожалуйста, проверьте свою почту",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ок, понятно!",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-light-primary"
                        }
                    }).then(function () {
                        passwordForm.reset();
                        validation.resetForm(); // Reset formvalidation --- more info: https://formvalidation.io/guide/api/reset-form/
                        toggleChangePassword();
                    });
                } else {
                    swal.fire({
                        text: "Извините, обнаружены ошибки. Пожалуйста, попробуйте еще раз.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ок, понятно!",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-light-primary"
                        }
                    });
                }
            });
        });
    }

    // Публичные методы
    return {
        init: function () {
            signInForm = document.getElementById('signin_change_email');
            signInMainEl = document.getElementById('signin_email');
            signInEditEl = document.getElementById('signin_email_edit');
            passwordMainEl = document.getElementById('signin_password');
            passwordEditEl = document.getElementById('signin_password_edit');
            signInChangeEmail = document.getElementById('signin_email_button');
            signInCancelEmail = document.getElementById('signin_cancel');
            passwordChange = document.getElementById('signin_password_button');
            passwordCancel = document.getElementById('password_cancel');

            initSettings();
            handleChangeEmail();
            handleChangePassword();
        }
    }
}();

// При загрузке документа
Util.onDOMContentLoaded(function () {
    AccountSettingsSigninMethods.init();
});
