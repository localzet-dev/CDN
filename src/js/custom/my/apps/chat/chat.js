"use strict";

// Определение класса
var AppChat = function () {
	// Приватные методы
	var handeSend = function (element) {
		if (!element) {
			return;
		}

		// Handle send
		Util.on(element, '[data-element="input"]', 'keydown', function(e) {
			if (e.keyCode == 13) {
				handeMessaging(element);
				e.preventDefault();

				return false;
			}
		});

		Util.on(element, '[data-element="send"]', 'click', function(e) {
			handeMessaging(element);
		});
	}

	var handeMessaging = function(element) {
		var messages = element.querySelector('[data-element="messages"]');
		var input = element.querySelector('[data-element="input"]');

        if (input.value.length === 0 ) {
            return;
        }

		var messageOutTemplate = messages.querySelector('[data-element="template-out"]');
		var messageInTemplate = messages.querySelector('[data-element="template-in"]');
		var message;
		
		// Show example outgoing message
		message = messageOutTemplate.cloneNode(true);
		message.classList.remove('d-none');
		message.querySelector('[data-element="message-text"]').innerText = input.value;		
		input.value = '';
		messages.appendChild(message);
		messages.scrollTop = messages.scrollHeight;
		
		
		setTimeout(function() {			
			// Show example incoming message
			message = messageInTemplate.cloneNode(true);			
			message.classList.remove('d-none');
			message.querySelector('[data-element="message-text"]').innerText = 'Thank you for your awesome support!';
			messages.appendChild(message);
			messages.scrollTop = messages.scrollHeight;
		}, 2000);
	}

	// Публичные методы
	return {
		init: function(element) {
			handeSend(element);
        }
	};
}();

// При загрузке документа
Util.onDOMContentLoaded(function () {
	// Init inline chat messenger
    AppChat.init(document.querySelector('#chat_messenger'));

	// Init drawer chat messenger
	AppChat.init(document.querySelector('#drawer_chat_messenger'));
});
