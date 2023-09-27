"use strict";

// Определение класса
var UsersAddAuthApp = function () {
    // Shared variables
    const element = document.getElementById('modal_add_auth_app');
    const modal = new bootstrap.Modal(element);

    // Init add schedule modal
    var initAddAuthApp = () => {

        // Close button handler
        const closeButton = element.querySelector('[data-users-modal-action="close"]');
        closeButton.addEventListener('click', e => {
            e.preventDefault();

            Swal.fire({
                text: "Are you sure you would like to close?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, close it!",
                cancelButtonText: "No, return",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function (result) {
                if (result.value) {
                    modal.hide(); // Hide modal				
                } 
            });
        });

    }

    // QR code to text code swapper
    var initCodeSwap = () => {
        const qrCode = element.querySelector('[ data-add-auth-action="qr-code"]');
        const textCode = element.querySelector('[ data-add-auth-action="text-code"]');
        const qrCodeButton = element.querySelector('[ data-add-auth-action="qr-code-button"]');
        const textCodeButton = element.querySelector('[ data-add-auth-action="text-code-button"]');
        const qrCodeLabel = element.querySelector('[ data-add-auth-action="qr-code-label"]');
        const textCodeLabel = element.querySelector('[ data-add-auth-action="text-code-label"]');

        const toggleClass = () =>{
            qrCode.classList.toggle('d-none');
            qrCodeButton.classList.toggle('d-none');
            qrCodeLabel.classList.toggle('d-none');
            textCode.classList.toggle('d-none');
            textCodeButton.classList.toggle('d-none');
            textCodeLabel.classList.toggle('d-none');
        }

        // Swap to text code handler
        textCodeButton.addEventListener('click', e =>{
            e.preventDefault();

            toggleClass();
        });

        qrCodeButton.addEventListener('click', e =>{
            e.preventDefault();

            toggleClass();
        });
    }

    return {
        // Public functions
        init: function () {
            initAddAuthApp();
            initCodeSwap();
        }
    };
}();

// При загрузке документа
Util.onDOMContentLoaded(function () {
    UsersAddAuthApp.init();
});