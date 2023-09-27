"use strict";

// Определение класса
var PricingGeneral = function () {
    // Private variables
    var element;
	var planPeriodMonthButton;
	var planPeriodAnnualButton;

	var changePlanPrices = function(type) {
		var items = [].slice.call(element.querySelectorAll('[data-plan-price-month]'));

		items.map(function (item) {
			var monthPrice = item.getAttribute('data-plan-price-month');
			var annualPrice = item.getAttribute('data-plan-price-annual');

			if ( type === 'month' ) {
				item.innerHTML = monthPrice;
			} else if ( type === 'annual' ) {
				item.innerHTML = annualPrice;
			}
		});
	}

    var handlePlanPeriodSelection = function(e) {

        // Handle period change
        planPeriodMonthButton.addEventListener('click', function (e) {
            e.preventDefault();

            planPeriodMonthButton.classList.add('active');
            planPeriodAnnualButton.classList.remove('active');

            changePlanPrices('month');
        });

		planPeriodAnnualButton.addEventListener('click', function (e) {
            e.preventDefault();

            planPeriodMonthButton.classList.remove('active');
            planPeriodAnnualButton.classList.add('active');
            
            changePlanPrices('annual');
        });
    }

    // Публичные методы
    return {
        init: function () {
            element = document.querySelector('#pricing');
			planPeriodMonthButton = element.querySelector('[data-plan="month"]');
			planPeriodAnnualButton = element.querySelector('[data-plan="annual"]');

            // Handlers
            handlePlanPeriodSelection();
        }
    }
}();

// При загрузке документа
Util.onDOMContentLoaded(function() {
    PricingGeneral.init();
});
