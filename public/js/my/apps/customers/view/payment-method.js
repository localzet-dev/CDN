"use strict";var CustomerViewPaymentMethod={init:function(){document.getElementById("customer_view_payment_method").querySelectorAll('[ data-customer-payment-method="row"]').forEach((t=>{t.querySelector('[data-customer-payment-method="delete"]').addEventListener("click",(e=>{e.preventDefault(),Swal.fire({text:"Are you sure you would like to delete this card?",icon:"warning",showCancelButton:!0,buttonsStyling:!1,confirmButtonText:"Yes, delete it!",cancelButtonText:"No, return",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-active-light"}}).then((function(e){e.value?(t.remove(),modal.hide()):"cancel"===e.dismiss&&Swal.fire({text:"Your card was not deleted!.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}})}))}))})),document.querySelector('[data-payment-mehtod-action="set_as_primary"]').addEventListener("click",(t=>{t.preventDefault(),Swal.fire({text:"Are you sure you would like to set this card as primary?",icon:"warning",showCancelButton:!0,buttonsStyling:!1,confirmButtonText:"Yes, set it!",cancelButtonText:"No, return",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-active-light"}}).then((function(t){t.value?Swal.fire({text:"Your card was set to primary!.",icon:"success",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}}):"cancel"===t.dismiss&&Swal.fire({text:"Your card was not set to primary!.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}})}))}))}};Util.onDOMContentLoaded((function(){CustomerViewPaymentMethod.init()}));
//# sourceMappingURL=payment-method.js.map
