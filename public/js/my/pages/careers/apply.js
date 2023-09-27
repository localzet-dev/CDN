"use strict";var CareersApply=function(){var e,t,i;return{init:function(){i=document.querySelector("#careers_form"),e=document.getElementById("careers_submit_button"),$(i.querySelector('[name="position"]')).on("change",(function(){t.revalidateField("position")})),$(i.querySelector('[name="start_date"]')).flatpickr({enableTime:!1,dateFormat:"d, M Y"}),t=FormValidation.formValidation(i,{fields:{first_name:{validators:{notEmpty:{message:"First name is required"}}},last_name:{validators:{notEmpty:{message:"Last name is required"}}},age:{validators:{notEmpty:{message:"Age is required"}}},city:{validators:{notEmpty:{message:"City is required"}}},email:{validators:{notEmpty:{message:"Email address is required"},emailAddress:{message:"The value is not a valid email address"}}},salary:{validators:{notEmpty:{message:"Expected salary is required"}}},position:{validators:{notEmpty:{message:"Position is required"}}},start_date:{validators:{notEmpty:{message:"Start date is required"}}}},plugins:{trigger:new FormValidation.plugins.Trigger,bootstrap:new FormValidation.plugins.Bootstrap5({rowSelector:".fv-row",eleInvalidClass:"",eleValidClass:""})}}),e.addEventListener("click",(function(i){i.preventDefault(),t&&t.validate().then((function(t){console.log("validated!"),"Valid"==t?(e.setAttribute("data-indicator","on"),e.disabled=!0,setTimeout((function(){e.removeAttribute("data-indicator"),e.disabled=!1,Swal.fire({text:"Form has been successfully submitted!",icon:"success",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}}).then((function(e){e.isConfirmed}))}),2e3)):Swal.fire({text:"Sorry, looks like there are some errors detected, please try again.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}}).then((function(e){Util.scrollTop()}))}))}))}}}();Util.onDOMContentLoaded((function(){CareersApply.init()}));
//# sourceMappingURL=apply.js.map
