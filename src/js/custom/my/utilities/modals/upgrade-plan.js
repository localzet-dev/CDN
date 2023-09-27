"use strict";

// Определение класса
var ModalUpgradePlan = function () {
    // Private variables
    var modal;
	var planPeriodMonthButton;
	var planPeriodAnnualButton;
    var planUpgradeButton;

    // Приватные методы
	var changePlanPrices = function(type) {
		var items = [].slice.call(modal.querySelectorAll('[data-plan-price-month]'));

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

    var handlePlanPeriodSelection = function() {
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
    
    var handlePlanUpgrade = function () {
        if ( !planUpgradeButton ) {
            return;
        }

        planUpgradeButton.addEventListener('click', function (e) {
            e.preventDefault();

            var el = this;

            swal.fire({
                text: "Are you sure you would like to upgrade to selected plan ?",
                icon: "warning",
                buttonsStyling: false,
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: 'No',
                customClass: {
                    confirmButton: "btn btn-primary",
                    denyButton: "btn btn-light-danger"
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    el.setAttribute('data-indicator', 'on');            
                    el.disabled = true;

                    setTimeout(function() {
                        Swal.fire({
                            text: 'Your subscription plan has been successfully upgraded', 
                            icon: 'success',
                            confirmButtonText: "Ok",
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: "btn btn-light-primary"
                            }
                        }).then((result) => {
                            bootstrap.Modal.getInstance(modal).hide();
                        })

                    }, 2000);
                } 
            });            
        });
    }

    // Публичные методы
    return {
        init: function () {
            // Elements
            modal = document.querySelector('#modal_upgrade_plan');

            if (!modal) {
				return;
			}

			planPeriodMonthButton = modal.querySelector('[data-plan="month"]');
			planPeriodAnnualButton = modal.querySelector('[data-plan="annual"]');
            planUpgradeButton = document.querySelector('#modal_upgrade_plan_btn');

            // Handlers
            handlePlanPeriodSelection();
            handlePlanUpgrade();
            changePlanPrices();
        }
    }
}();

// При загрузке документа
Util.onDOMContentLoaded(function() {
    ModalUpgradePlan.init();
});
