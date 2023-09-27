"use strict";

// Определение класса
var ModalOfferADealComplete = function () {
	// Variables
	var startButton;
	var form;
	var stepper;

	// Приватные методы
	var handleForm = function() {
		startButton.addEventListener('click', function () {
			stepper.goTo(1);
		});
	}

	return {
		// Public functions
		init: function () {
			form = ModalOfferADeal.getForm();
			stepper = ModalOfferADeal.getStepperObj();
			startButton = ModalOfferADeal.getStepper().querySelector('[data-element="complete-start"]');

			handleForm();
		}
	};
}();

// Webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	window.ModalOfferADealComplete = module.exports = ModalOfferADealComplete;
}