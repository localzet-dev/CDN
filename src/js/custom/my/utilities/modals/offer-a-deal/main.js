"use strict";

// Определение класса
var ModalOfferADeal = function () {
    // Private variables
	var stepper;
	var stepperObj;
	var form;	

	// Приватные методы
	var initStepper = function () {
		// Initialize Stepper
		stepperObj = new Stepper(stepper);
	}

	return {
		// Public functions
		init: function () {
			stepper = document.querySelector('#modal_offer_a_deal_stepper');
			form = document.querySelector('#modal_offer_a_deal_form');

			initStepper();
		},

		getStepper: function () {
			return stepper;
		},

		getStepperObj: function () {
			return stepperObj;
		},
		
		getForm: function () {
			return form;
		}
	};
}();

// При загрузке документа
Util.onDOMContentLoaded(function () {
	if (!document.querySelector('#modal_offer_a_deal')) {
		return;
	}

    ModalOfferADeal.init();
    ModalOfferADealType.init();
    ModalOfferADealDetails.init();
    ModalOfferADealFinance.init();
    ModalOfferADealComplete.init();
});

// Webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	window.ModalOfferADeal = module.exports = ModalOfferADeal;
}