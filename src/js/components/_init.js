// Глобальная инициализация основных компонентов

// Инициализация компонентов
var Components = function () {
	// Публичные методы
	return {
		init: function () {
			App.init(); // Инициализация компонента "App"
			Drawer.init(); // Инициализация компонента "Drawer"
			Menu.init(); // Инициализация компонента "Menu"
			Scroll.init(); // Инициализация компонента "Scroll"
			Sticky.init(); // Инициализация компонента "Sticky"
			Swapper.init(); // Инициализация компонента "Swapper"
			Toggle.init(); // Инициализация компонента "Toggle"
			Scrolltop.init(); // Инициализация компонента "Scrolltop"
			Dialer.init(); // Инициализация компонента "Dialer"
			ImageInput.init(); // Инициализация компонента "ImageInput"
			PasswordMeter.init(); // Инициализация компонента "PasswordMeter"
		}
	}
}();

// При загрузке документа
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", function () {
		Components.init(); // Инициализация компонентов при загрузке документа
	});
} else {
	Components.init(); // Инициализация компонентов
}

// Инициализация загрузчика страницы
window.addEventListener("load", function () {
	App.hidePageLoading(); // Скрытие загрузчика страницы
});

// Объявление App для поддержки Webpack
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	window.Components = module.exports = Components;
}