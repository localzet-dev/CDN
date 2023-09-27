"use strict";

var LoginAuth = function () {
    var passAuth;
    var passAuthButton;

    var socialAuth;
    var socialAuthButton;

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
                        // regexp: {
                        //     regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        //     message: "The value is not a valid email address"
                        // },
                        notEmpty: {
                            message: "Логин обязателен"
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
        submitButton.addEventListener("click", (function (e) {
            e.preventDefault();
            
            validator.validate().then(function (status) {
                if (status === 'Valid') {
                    submitButton.setAttribute("data-indicator", "on");
                    submitButton.disabled = true;

                    // Check axios library docs: https://axios-http.com/docs/intro
                    axios.post(
                        '/login', {
                        login: form.querySelector('[name="login"]').value,
                        password: form.querySelector('[name="password"]').value
                    }
                    ).then(function (response) {
                        submitButton.removeAttribute("data-indicator");
                        submitButton.disabled = false;

                        if (response.data && response.data.status == 200) {
                            console.error(response)
                            form.querySelector('[name="login"]').value = "";
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
                    }).catch(function (error) {
                        console.error(response)
                        submitButton.removeAttribute("data-indicator");
                        submitButton.disabled = false;

                        errorHead.innerHTML = "Ошибка связи с сервером";
                        errorBody.innerHTML = "Проверьте соединение с интернетом или обратитесь к администрации"
                        errorAlert.classList.remove("d-none");
                    });
                } else {
                    errorHead.innerHTML = "Ошибка запроса";
                    errorBody.innerHTML = "Проверьте введённые данные"
                    errorAlert.classList.remove("d-none");
                }
            });
        }));
    }

    var handleModes = function (e) {
        // Вход по паролю
        passAuthButton.addEventListener("click", function (e) {
            e.preventDefault();
            setActiveButton(passAuthButton, [passAuthButton, socialAuthButton]);
            toggleForm(passAuth, [passAuth, socialAuth]);
        });

        // Вход через социальные сети
        socialAuthButton.addEventListener("click", function (e) {
            e.preventDefault();
            setActiveButton(socialAuthButton, [passAuthButton, socialAuthButton]);
            toggleForm(socialAuth, [passAuth, socialAuth]);
        });
    }

    var setActiveButton = function (activeButton, buttons) {
        buttons.forEach(button => {
            if (button === activeButton) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    }

    var toggleForm = function (form, forms) {
        forms.forEach(formElement => {
            if (formElement === form) {
                formElement.classList.remove("d-none");
            } else {
                formElement.classList.add("d-none");
            }
        });
    }

    // Public functions
    return {
        // Initialization
        init: function () {
            passAuthButton = document.querySelector('#password-auth-icon');
            socialAuthButton = document.querySelector('#social-auth-icon');

            passAuth = document.querySelector('#password-auth');
            socialAuth = document.querySelector('#social-auth');

            form = document.querySelector('#login_form');
            submitButton = document.querySelector('#login_submit');

            errorAlert = document.querySelector('#error-alert');
            errorHead = document.querySelector('#error-head');
            errorBody = document.querySelector('#error-body');

            handleModes();
            handleValidation();
            handleSubmit();
        }
    };
}();

// При загрузке документа
Util.onDOMContentLoaded(function () {
    LoginAuth.init();
});
