"use strict";var UsersAddSchedule=function(){const e=document.getElementById("modal_add_schedule"),t=e.querySelector("#modal_add_schedule_form"),n=new bootstrap.Modal(e);return{init:function(){(()=>{$("#modal_add_schedule_datepicker").flatpickr({enableTime:!0,dateFormat:"Y-m-d H:i"});const o=t.querySelector("#modal_add_schedule_tagify");new Tagify(o,{whitelist:["sean@dellito.com","brian@exchange.com","mikaela@pexcom.com","f.mitcham@kpmg.com.au","olivia@corpmail.com","owen.neil@gmail.com","dam@consilting.com","emma@intenso.com","ana.cf@limtel.com","robert@benko.com","lucy.m@fentech.com","ethan@loop.com.au"],maxTags:10,dropdown:{maxItems:20,classname:"tagify__inline__suggestions",enabled:0,closeOnSelect:!1}});var i=FormValidation.formValidation(t,{fields:{event_datetime:{validators:{notEmpty:{message:"Event date & time is required"}}},event_name:{validators:{notEmpty:{message:"Event name is required"}}},event_org:{validators:{notEmpty:{message:"Event organiser is required"}}},event_invitees:{validators:{notEmpty:{message:"Event invitees is required"}}}},plugins:{trigger:new FormValidation.plugins.Trigger,bootstrap:new FormValidation.plugins.Bootstrap5({rowSelector:".fv-row",eleInvalidClass:"",eleValidClass:""})}});$(t.querySelector('[name="event_invitees"]')).on("change",(function(){i.revalidateField("event_invitees")})),e.querySelector('[data-users-modal-action="close"]').addEventListener("click",(e=>{e.preventDefault(),Swal.fire({text:"Are you sure you would like to cancel?",icon:"warning",showCancelButton:!0,buttonsStyling:!1,confirmButtonText:"Yes, cancel it!",cancelButtonText:"No, return",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-active-light"}}).then((function(e){e.value?(t.reset(),n.hide()):"cancel"===e.dismiss&&Swal.fire({text:"Your form has not been cancelled!.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}})}))})),e.querySelector('[data-users-modal-action="cancel"]').addEventListener("click",(e=>{e.preventDefault(),Swal.fire({text:"Are you sure you would like to cancel?",icon:"warning",showCancelButton:!0,buttonsStyling:!1,confirmButtonText:"Yes, cancel it!",cancelButtonText:"No, return",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-active-light"}}).then((function(e){e.value?(t.reset(),n.hide()):"cancel"===e.dismiss&&Swal.fire({text:"Your form has not been cancelled!.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}})}))}));const a=e.querySelector('[data-users-modal-action="submit"]');a.addEventListener("click",(function(e){e.preventDefault(),i&&i.validate().then((function(e){console.log("validated!"),"Valid"==e?(a.setAttribute("data-indicator","on"),a.disabled=!0,setTimeout((function(){a.removeAttribute("data-indicator"),a.disabled=!1,Swal.fire({text:"Form has been successfully submitted!",icon:"success",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}}).then((function(e){e.isConfirmed&&n.hide()}))}),2e3)):Swal.fire({text:"Sorry, looks like there are some errors detected, please try again.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}})}))}))})()}}}();Util.onDOMContentLoaded((function(){UsersAddSchedule.init()}));
//# sourceMappingURL=add-schedule.js.map