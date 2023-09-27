"use strict";

// Определение класса
var FIDOAuth = function () {
    var verifyButton;

    // Приватные методы
    var init = function () {
        if (!navigator.credentials || !navigator.credentials.create) {
            swal.fire({
                text: "Браузер не поддерживается",
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Хорошо!",
                customClass: {
                    confirmButton: "btn fw-bold btn-light-primary"
                }
            });
            return false;
        }
        return true;
    }

    var handle = function () {
        verifyButton.addEventListener('click', function (e) {
            e.preventDefault();

            axios.get('/fido/verify').then(async function (response1) {
                if (response1.data.data && response1.data.status == 200) {
                    console.log(response1.data.data)

                    // try {
                        recursiveBase64StrToArrayBuffer(response1.data.data);

                        const cred = await navigator.credentials.get(response1.data.data);

                        const authenticatorAttestationResponse = {
                            id: cred.rawId ? arrayBufferToBase64(cred.rawId) : null,
                            clientDataJSON: cred.response.clientDataJSON ? arrayBufferToBase64(cred.response.clientDataJSON) : null,
                            authenticatorData: cred.response.authenticatorData ? arrayBufferToBase64(cred.response.authenticatorData) : null,
                            signature: cred.response.signature ? arrayBufferToBase64(cred.response.signature) : null,
                            userHandle: cred.response.userHandle ? arrayBufferToBase64(cred.response.userHandle) : null
                        };
                    // } catch (error) {
                    //     swal.fire({
                    //         text: "Ошибка FIDO: " + error,
                    //         icon: "error",
                    //         buttonsStyling: false,
                    //         confirmButtonText: "Хорошо!",
                    //         customClass: {
                    //             confirmButton: "btn fw-bold btn-light-primary"
                    //         }
                    //     });
                    // }

                    axios.post('/fido/verify', authenticatorAttestationResponse).then(function (response2) {
                        if (response2.data.data && response2.data.status == 200) {
                            console.log(response2.data.data)
                            location.href = "/";
                        } else {
                            console.error(response2.data.error, response2.data.traces)

                            swal.fire({
                                text: response2.data.error ?? "Неизвестная ошибка",
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
                        swal.fire({
                            text: "Ошибка FIDO: " + error,
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Хорошо!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-light-primary"
                            }
                        });
                    });
                } else {
                    console.error(response1.data.error, response1.data.traces)

                    swal.fire({
                        text: response1.data.error ?? "Неизвестная ошибка",
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
                swal.fire({
                    text: "Ошибка FIDO: " + error,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Хорошо!",
                    customClass: {
                        confirmButton: "btn fw-bold btn-light-primary"
                    }
                });
            });
        });
    }

    /**
     * Convert RFC 1342-like base64 strings to array buffer
     * @param {mixed} obj
     * @returns {undefined}
     */
    var recursiveBase64StrToArrayBuffer = function (obj) {
        let prefix = '=?BINARY?B?';
        let suffix = '?=';
        if (typeof obj === 'object') {
            for (let key in obj) {
                if (typeof obj[key] === 'string') {
                    let str = obj[key];
                    if (str.substring(0, prefix.length) === prefix && str.substring(str.length - suffix.length) === suffix) {
                        str = str.substring(prefix.length, str.length - suffix.length);

                        let binary_string = window.atob(str);
                        let len = binary_string.length;
                        let bytes = new Uint8Array(len);
                        for (let i = 0; i < len; i++) {
                            bytes[i] = binary_string.charCodeAt(i);
                        }
                        obj[key] = bytes.buffer;
                    }
                } else {
                    recursiveBase64StrToArrayBuffer(obj[key]);
                }
            }
        }
    }

    /**
     * Convert a ArrayBuffer to Base64
     * @param {ArrayBuffer} buffer
     * @returns {String}
     */
    var arrayBufferToBase64 = function (buffer) {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    // Публичные методы
    return {
        init: function () {
            try {
                verifyButton = document.getElementById('fido_verify');

                if (init()) {
                    handle();
                }
            } catch (err) {
                swal.fire({
                    text: err,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Хорошо!",
                    customClass: {
                        confirmButton: "btn fw-bold btn-light-primary"
                    }
                });
                return false;
            }
        }
    }
}();

// При загрузке документа
Util.onDOMContentLoaded(function () {
    FIDOAuth.init();
});
