"use strict";var AppFileManagerSettings=function(){var t;return{init:function(e){t=document.querySelector("#file_manager_settings"),function(){const e=t.querySelector("#file_manager_settings_submit");e.addEventListener("click",(t=>{t.preventDefault(),e.setAttribute("data-indicator","on"),setTimeout((function(){toastr.options={closeButton:!0,debug:!1,newestOnTop:!1,progressBar:!1,positionClass:"toast-top-right",preventDuplicates:!1,showDuration:"300",hideDuration:"1000",timeOut:"5000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut"},toastr.success("File manager settings have been saved"),e.removeAttribute("data-indicator")}),1e3)}))}()}}}();Util.onDOMContentLoaded((function(){AppFileManagerSettings.init()}));
//# sourceMappingURL=settings.js.map
