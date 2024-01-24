"use strict";

// Class definition
var KTAppSidebar = function () {
	// Private variables
	var wrapper;
	var sidebar;
	var toggle;

	var handleToggle = function () {
		var toggleObj = KTToggle.getInstance(toggle);

		if ( toggleObj === null) {
			return;
		}

		// Add a class to prevent sidebar hover effect after toggle click
		toggleObj.on('kt.toggle.change', function() {
			// Set animation state
			sidebar.classList.add('animating');
			
			// Wait till animation finishes
			setTimeout(function() {
				// Remove animation state
				sidebar.classList.remove('animating');
			}, 300);
		});

		// Store sidebar minimize state in cookie
		toggleObj.on('kt.toggle.changed', function() {
			// In server side check sidebar_minimize_state cookie 
			// value and add data-kt-app-sidebar-minimize="on" 
			// attribute to Body tag and "active" class to the toggle button
			var date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

			KTCookie.set("sidebar_minimize_state", toggleObj.isEnabled() ? "on" : "off", {expires: date}); 
		});
	}

	var handleMenuScroll = function() {
		var menuActiveItem = wrapper.querySelector(".menu-link.active");

		if ( !menuActiveItem ) {
			return;
		} 

		if ( KTUtil.isVisibleInContainer(menuActiveItem, wrapper) === true) {
			return;
		}

		wrapper.scroll({
			top: KTUtil.getRelativeTopPosition(menuActiveItem, wrapper),
			behavior: 'smooth'
		});
	}

	// Public methods
	return {
		init: function () {
			// Elements
			toggle = document.querySelector('#kt_app_sidebar_toggle');
			wrapper = document.querySelector('#kt_app_sidebar_navs_wrappers');
			sidebar = document.querySelector('#kt_app_sidebar');

			if ( toggle ) {
				handleToggle();	
			}
			
			if ( wrapper ) {
				handleMenuScroll();
			}
		}
	};
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
	KTAppSidebar.init();
});