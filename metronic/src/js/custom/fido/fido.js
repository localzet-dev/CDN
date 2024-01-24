/*!
 * Triangle FIDO2 Plugin
 * https://github.com/localzet-dev/FIDO2
 *
 * Copyright Ivan Zorin <creator@localzet.com>
 * Released under the AGPL-3.0 license
 * https://www.gnu.org/licenses/agpl
 *
 * Date: 2023-03-21T22:48Z
 */
async function createRegistration() {
    try {
        if (!navigator.credentials || !navigator.credentials.create) {
            throw new Error('Браузер не поддерживается');
        }

        axios.get('/app/FIDO/create').then(async function (response) {
            const createArgs = response.data;

            if (createArgs.success === false) {
                throw new Error(createArgs.msg || 'Произошла неизвестная ошибка');
            }

            recursiveBase64StrToArrayBuffer(createArgs);

            const cred = await navigator.credentials.create(createArgs);

            const authenticatorAttestationResponse = {
                transports: cred.response.getTransports ? cred.response.getTransports() : null,
                clientDataJSON: cred.response.clientDataJSON ? arrayBufferToBase64(cred.response.clientDataJSON) : null,
                attestationObject: cred.response.attestationObject ? arrayBufferToBase64(cred.response.attestationObject) : null
            };

            axios.post('/app/FIDO/create', authenticatorAttestationResponse).then(function (response) {
                const authenticatorAttestationServerResponse = response.data;


                if (authenticatorAttestationServerResponse.success) {
                    return true;
                } else {
                    throw new Error(authenticatorAttestationServerResponse.msg);
                }
            }).catch(function (error) {
                throw new Error(error || 'Произошла неизвестная ошибка');
            });
        }).catch(function (error) {
            throw new Error(error || 'Произошла неизвестная ошибка');
        });


    } catch (err) {
        console.error(err);
        return false;
    }
}

async function checkRegistration() {
    try {

        if (!navigator.credentials || !navigator.credentials.create) {
            throw new Error('Браузер не поддерживается');
        }

        axios.get('/app/FIDO/verify').then(async function (response) {
            const getArgs = response.data;

            if (getArgs.success === false) {
                throw new Error(getArgs.msg);
            }

            recursiveBase64StrToArrayBuffer(getArgs);

            const cred = await navigator.credentials.get(getArgs);

            const authenticatorAttestationResponse = {
                id: cred.rawId ? arrayBufferToBase64(cred.rawId) : null,
                clientDataJSON: cred.response.clientDataJSON ? arrayBufferToBase64(cred.response.clientDataJSON) : null,
                authenticatorData: cred.response.authenticatorData ? arrayBufferToBase64(cred.response.authenticatorData) : null,
                signature: cred.response.signature ? arrayBufferToBase64(cred.response.signature) : null,
                userHandle: cred.response.userHandle ? arrayBufferToBase64(cred.response.userHandle) : null
            };

            axios.post('/app/FIDO/verify', authenticatorAttestationResponse).then(function (response) {
                const authenticatorAttestationServerResponse = response.data;

                if (authenticatorAttestationServerResponse.success) {
                    return true;
                } else {
                    throw new Error(authenticatorAttestationServerResponse.msg);
                }
            }).catch(function (error) {
                throw new Error(error || 'Произошла неизвестная ошибка');
            });


        }).catch(function (error) {
            throw new Error(error || 'Произошла неизвестная ошибка');
        });


    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * convert RFC 1342-like base64 strings to array buffer
 * @param {mixed} obj
 * @returns {undefined}
 */
function recursiveBase64StrToArrayBuffer(obj) {
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
function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}