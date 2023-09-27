"use strict";

// Определение класса
var PosSystem = function () {
	var form;

    var moneyFormat = wNumb({
        mark: '.',
        thousand: ',',
        decimals: 2,
        prefix: '$',
    });

	var calculateTotals = function() {
        var items = [].slice.call(form.querySelectorAll('[data-pos-element="item-total"]'));
        var total = 0;
        var tax = 12;
        var discount = 8;
        var grantTotal = 0;

        items.map(function (item) {
            total += moneyFormat.from(item.innerHTML);
        });

        grantTotal = total;
        grantTotal -= discount;
        grantTotal += tax * 8 / 100;

        form.querySelector('[data-pos-element="total"]').innerHTML = moneyFormat.to(total); 
        form.querySelector('[data-pos-element="grant-total"]').innerHTML = moneyFormat.to(grantTotal); 
    }

	var handleQuantity = function() {
		var dialers = [].slice.call(form.querySelectorAll('[data-pos-element="item"] [data-dialer="true"]'));

        dialers.map(function (dialer) {
            var dialerObject = Dialer.getInstance(dialer);

            dialerObject.on('dialer.changed', function(){
                var quantity = parseInt(dialerObject.getValue());
                var item = dialerObject.getElement().closest('[data-pos-element="item"]');
                var value = parseInt(item.getAttribute("data-pos-item-price"));
                var total = quantity * value;

                item.querySelector('[data-pos-element="item-total"]').innerHTML = moneyFormat.to(total);

                calculateTotals();
            });    
        });
	}

	return {
		// Public functions
		init: function () {
			// Elements
			form = document.querySelector('#pos_form');

			handleQuantity();
		}
	};
}();

// При загрузке документа
Util.onDOMContentLoaded(function () {
	PosSystem.init();
});