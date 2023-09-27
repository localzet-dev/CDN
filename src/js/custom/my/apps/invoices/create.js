"use strict";

// Определение класса
var AppInvoicesCreate = function () {
    var form;

	// Приватные методы
	var updateTotal = function() {
		var items = [].slice.call(form.querySelectorAll('[data-element="items"] [data-element="item"]'));
		var grandTotal = 0;

		var format = wNumb({
			//prefix: '$ ',
			decimals: 2,
			thousand: ','
		});

		items.map(function (item) {
            var quantity = item.querySelector('[data-element="quantity"]');
			var price = item.querySelector('[data-element="price"]');

			var priceValue = format.from(price.value);
			priceValue = (!priceValue || priceValue < 0) ? 0 : priceValue;

			var quantityValue = parseInt(quantity.value);
			quantityValue = (!quantityValue || quantityValue < 0) ?  1 : quantityValue;

			price.value = format.to(priceValue);
			quantity.value = quantityValue;

			item.querySelector('[data-element="total"]').innerText = format.to(priceValue * quantityValue);			

			grandTotal += priceValue * quantityValue;
		});

		form.querySelector('[data-element="sub-total"]').innerText = format.to(grandTotal);
		form.querySelector('[data-element="grand-total"]').innerText = format.to(grandTotal);
	}

	var handleEmptyState = function() {
		if (form.querySelectorAll('[data-element="items"] [data-element="item"]').length === 0) {
			var item = form.querySelector('[data-element="empty-template"] tr').cloneNode(true);
			form.querySelector('[data-element="items"] tbody').appendChild(item);
		} else {
			Util.remove(form.querySelector('[data-element="items"] [data-element="empty"]'));
		}
	}

	var handeForm = function (element) {
		// Add item
		form.querySelector('[data-element="items"] [data-element="add-item"]').addEventListener('click', function(e) {
			e.preventDefault();

			var item = form.querySelector('[data-element="item-template"] tr').cloneNode(true);

			form.querySelector('[data-element="items"] tbody').appendChild(item);

			handleEmptyState();
			updateTotal();			
		});

		// Remove item
		Util.on(form, '[data-element="items"] [data-element="remove-item"]', 'click', function(e) {
			e.preventDefault();

			Util.remove(this.closest('[data-element="item"]'));

			handleEmptyState();
			updateTotal();			
		});		

		// Handle price and quantity changes
		Util.on(form, '[data-element="items"] [data-element="quantity"], [data-element="items"] [data-element="price"]', 'change', function(e) {
			e.preventDefault();

			updateTotal();			
		});
	}

	var initForm = function(element) {
		// Due date. For more info, please visit the official plugin site: https://flatpickr.js.org/
		var invoiceDate = $(form.querySelector('[name="invoice_date"]'));
		invoiceDate.flatpickr({
			enableTime: false,
			dateFormat: "d, M Y",
		});

        // Due date. For more info, please visit the official plugin site: https://flatpickr.js.org/
		var dueDate = $(form.querySelector('[name="invoice_due_date"]'));
		dueDate.flatpickr({
			enableTime: false,
			dateFormat: "d, M Y",
		});
	}

	// Публичные методы
	return {
		init: function(element) {
            form = document.querySelector('#invoice_form');

			handeForm();
            initForm();
			updateTotal();
        }
	};
}();

// При загрузке документа
Util.onDOMContentLoaded(function () {
    AppInvoicesCreate.init();
});
