"use strict";var ProfileGeneral=function(){var t,e,i,o;return{init:function(){t=document.querySelector("#followers_show_more_button"),e=document.querySelector("#followers_show_more_cards"),i=document.querySelector("#user_follow_button"),o=document.querySelector("#user_profile_nav"),t&&t.addEventListener("click",(function(i){t.setAttribute("data-indicator","on"),t.disabled=!0,setTimeout((function(){t.removeAttribute("data-indicator"),t.disabled=!1,t.classList.add("d-none"),e.classList.remove("d-none"),Util.scrollTo(e,200)}),2e3)})),i&&i.addEventListener("click",(function(t){t.preventDefault(),i.setAttribute("data-indicator","on"),i.disabled=!0,i.classList.contains("btn-success")?setTimeout((function(){i.removeAttribute("data-indicator"),i.classList.remove("btn-success"),i.classList.add("btn-light"),i.querySelector("i").classList.add("d-none"),i.querySelector(".indicator-label").innerHTML="Follow",i.disabled=!1}),1500):setTimeout((function(){i.removeAttribute("data-indicator"),i.classList.add("btn-success"),i.classList.remove("btn-light"),i.querySelector("i").classList.remove("d-none"),i.querySelector(".indicator-label").innerHTML="Following",i.disabled=!1}),1e3)})),Util.on(document.body,'[data-follow-btn="true"]',"click",(function(t){t.preventDefault();var e=this,i=e.querySelector(".indicator-label"),o=e.querySelector(".following"),n=e.querySelector(".follow");e.setAttribute("data-indicator","on"),e.disabled=!0,n.classList.add("d-none"),o.classList.add("d-none"),setTimeout((function(){e.removeAttribute("data-indicator"),e.disabled=!1,e.classList.contains("btn-light-primary")?(e.classList.remove("btn-light-primary"),e.classList.add("btn-light"),n.classList.remove("d-none"),i.innerHTML="Follow"):(e.classList.add("btn-light-primary"),e.classList.remove("btn-light"),o.classList.remove("d-none"),i.innerHTML="Following")}),2e3)})),o&&o.getAttribute("data-sticky")&&Util.isBreakpointUp("lg")&&("1"===localStorage.getItem("nav-initialized")&&window.scroll({top:parseInt(o.getAttribute("data-page-scroll-position")),behavior:"smooth"}),localStorage.setItem("nav-initialized","1"))}}}();Util.onDOMContentLoaded((function(){ProfileGeneral.init()}));
//# sourceMappingURL=general.js.map
