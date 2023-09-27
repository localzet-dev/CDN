"use strict";

// Определение класса
var ModalCreateProjectComplete = function () {
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
			form = ModalCreateProject.getForm();
			stepper = ModalCreateProject.getStepperObj();
			startButton = ModalCreateProject.getStepper().querySelector('[data-element="complete-start"]');

			handleForm();
		}
	};
}();

// Webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	window.ModalCreateProjectComplete = module.exports = ModalCreateProjectComplete;
}
