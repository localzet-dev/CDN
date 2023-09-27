"use strict";

var Register = function () {
    var form;
    var submitButton;

    var errorAlert;
    var errorHead;
    var errorBody;

    var validator;

    var handleValidation = function (e) {
        validator = FormValidation.formValidation(form, {
            fields: {
                login: {
                    validators: {
                        notEmpty: {
                            message: "Логин обязателен"
                        }
                    }
                },
                email: {
                    validators: {
                        regexp: {
                            regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Это не адрес электронной почты"
                        },
                        notEmpty: {
                            message: "Электронная почта обязательна"
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: "Пароль обязателен"
                        }
                    }
                }
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger,
                bootstrap: new FormValidation.plugins.Bootstrap5({
                    rowSelector: ".fv-row",
                    eleInvalidClass: "",
                    eleValidClass: ""
                })
            }
        });
    }

    var handleSubmit = function (e) {
        submitButton.addEventListener("click", (function(e) {
            e.preventDefault();
            validator.validate().then(function(status) {
                if (status === 'Valid') {
                    submitButton.setAttribute("data-indicator", "on");
                    submitButton.disabled = true;

                    // Check axios library docs: https://axios-http.com/docs/intro
                    axios.post(
                        '/register', {
                            firstname: form.querySelector('[name="firstname"]').value,
                            login: form.querySelector('[name="login"]').value,
                            lastname: form.querySelector('[name="lastname"]').value,
                            email: form.querySelector('[name="email"]').value,
                            password: form.querySelector('[name="password"]').value
                        }
                    ).then(function(response) {
                        // console.error(response)

                        if (response.data && response.data.status == 200) {
                            form.querySelector('[name="firstname"]').value = "";
                            form.querySelector('[name="lastname"]').value = "";
                            form.querySelector('[name="login"]').value = "";
                            form.querySelector('[name="email"]').value = "";
                            form.querySelector('[name="password"]').value = "";

                            location.href = "/";
                        } else {
                            console.error(response.data.error, response.data.traces)

                            if (response.data.error_head) {
                                errorHead.innerHTML = response.data.error_head;
                            }

                            if (response.data.error) {
                                errorBody.innerHTML = response.data.error
                            }

                            errorAlert.classList.remove("d-none");
                        }
                    }).catch(function(error) {
                        console.error(response)

                        errorHead.innerHTML = "Ошибка связи с сервером";
                        errorBody.innerHTML = "Проверьте соединение с интернетом или обратитесь к администрации"
                        errorAlert.classList.remove("d-none");
                    });

                    submitButton.removeAttribute("data-indicator");
                    submitButton.disabled = false;

                } else {
                    errorHead.innerHTML = "Ошибка запроса";
                    errorBody.innerHTML = "Проверьте введённые данные"
                    errorAlert.classList.remove("d-none");
                }
            });
        }));
    }

    // Public functions
    return {
        // Initialization
        init: function () {
            form = document.querySelector('#register_form');
            submitButton = document.querySelector('#register_submit');

            errorAlert = document.querySelector('#error-alert');
            errorHead = document.querySelector('#error-head');
            errorBody = document.querySelector('#error-body');

            handleValidation();
            handleSubmit();
        }
    };
}();

// При загрузке документа
Util.onDOMContentLoaded(function () {
    Register.init();
});
