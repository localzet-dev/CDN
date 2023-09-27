"use strict";

// Определение класса
var ModalCreateProjectTeam = function () {
	// Variables
	var nextButton;
	var previousButton;
	var form;
	var stepper;

	// Приватные методы
	var handleForm = function() {
		nextButton.addEventListener('click', function (e) {
			// Prevent default button action
			e.preventDefault();

			// Disable button to avoid multiple click 
			nextButton.disabled = true;

			// Show loading indication
			nextButton.setAttribute('data-indicator', 'on');

			// Simulate form submission
			setTimeout(function() {
				// Enable button
				nextButton.disabled = false;
				
				// Simulate form submission
				nextButton.removeAttribute('data-indicator');
				
				// Go to next step
				stepper.goNext();
			}, 1500); 		
		});

		previousButton.addEventListener('click', function () {
			stepper.goPrevious();
		});
	}

	return {
		// Public functions
		init: function () {
			form = ModalCreateProject.getForm();
			stepper = ModalCreateProject.getStepperObj();
			nextButton = ModalCreateProject.getStepper().querySelector('[data-element="team-next"]');
			previousButton = ModalCreateProject.getStepper().querySelector('[data-element="team-previous"]');

			handleForm();
		}
	};
}();

// Webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	window.ModalCreateProjectTeam = module.exports = ModalCreateProjectTeam;
}