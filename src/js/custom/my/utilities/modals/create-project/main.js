"use strict";

// Определение класса
var ModalCreateProject = function () {
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
			stepper = document.querySelector('#modal_create_project_stepper');
			form = document.querySelector('#modal_create_project_form');

			initStepper();
		},

		getStepperObj: function () {
			return stepperObj;
		},

		getStepper: function () {
			return stepper;
		},
		
		getForm: function () {
			return form;
		}
	};
}();

// При загрузке документа
Util.onDOMContentLoaded(function () {
	if (!document.querySelector('#modal_create_project')) {
		return;
	}

	ModalCreateProject.init();
	ModalCreateProjectType.init();
	ModalCreateProjectBudget.init();
	ModalCreateProjectSettings.init();
	ModalCreateProjectTeam.init();
	ModalCreateProjectTargets.init();
	ModalCreateProjectFiles.init();
	ModalCreateProjectComplete.init();
});

// Webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	window.ModalCreateProject = module.exports = ModalCreateProject;
}
