"use strict";var UsersUpdateDetails=function(){const t=document.getElementById("modal_update_details"),e=t.querySelector("#modal_update_user_form"),n=new bootstrap.Modal(t);return{init:function(){(()=>{t.querySelector('[data-users-modal-action="close"]').addEventListener("click",(t=>{t.preventDefault(),Swal.fire({text:"Are you sure you would like to cancel?",icon:"warning",showCancelButton:!0,buttonsStyling:!1,confirmButtonText:"Yes, cancel it!",cancelButtonText:"No, return",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-active-light"}}).then((function(t){t.value?(e.reset(),n.hide()):"cancel"===t.dismiss&&Swal.fire({text:"Your form has not been cancelled!.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}})}))})),t.querySelector('[data-users-modal-action="cancel"]').addEventListener("click",(t=>{t.preventDefault(),Swal.fire({text:"Are you sure you would like to cancel?",icon:"warning",showCancelButton:!0,buttonsStyling:!1,confirmButtonText:"Yes, cancel it!",cancelButtonText:"No, return",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-active-light"}}).then((function(t){t.value?(e.reset(),n.hide()):"cancel"===t.dismiss&&Swal.fire({text:"Your form has not been cancelled!.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}})}))}));const o=t.querySelector('[data-users-modal-action="submit"]');o.addEventListener("click",(function(t){t.preventDefault(),o.setAttribute("data-indicator","on"),o.disabled=!0,setTimeout((function(){o.removeAttribute("data-indicator"),o.disabled=!1,Swal.fire({text:"Form has been successfully submitted!",icon:"success",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}}).then((function(t){t.isConfirmed&&n.hide()}))}),2e3)}))})()}}}();Util.onDOMContentLoaded((function(){UsersUpdateDetails.init()}));
//# sourceMappingURL=update-details.js.map