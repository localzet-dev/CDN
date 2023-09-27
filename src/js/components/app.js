"use strict";

// Определение класса
var App = function () {
    var initialized = false;
    var select2FocusFixInitialized = false;
    var countUpInitialized = false;

    var createBootstrapTooltip = function (el, options) {
        if (el.getAttribute("data-initialized") === "1") {
            return;
        }

        var delay = {};

        // Обработка опций задержки
        if (el.hasAttribute('data-bs-delay-hide')) {
            delay['hide'] = el.getAttribute('data-bs-delay-hide');
        }

        if (el.hasAttribute('data-bs-delay-show')) {
            delay['show'] = el.getAttribute('data-bs-delay-show');
        }

        if (delay) {
            options['delay'] = delay;
        }

        // Проверка опций отмены
        if (el.hasAttribute('data-bs-dismiss') && el.getAttribute('data-bs-dismiss') == 'click') {
            options['dismiss'] = 'click';
        }

        // Инициализация всплывающей подсказки
        var tp = new bootstrap.Tooltip(el, options);

        // Обработка события отмены
        if (options['dismiss'] && options['dismiss'] === 'click') {
            // Скрытие всплывающей подсказки при клике на элемент
            el.addEventListener("click", function (e) {
                tp.hide();
            });
        }

        el.setAttribute("data-initialized", "1");

        return tp;
    }

    var createBootstrapTooltips = function () {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            createBootstrapTooltip(tooltipTriggerEl, {});
        });
    }

    var createBootstrapPopover = function (el, options) {
        if (el.getAttribute("data-initialized") === "1") {
            return;
        }

        var delay = {};

        // Обработка опций задержки
        if (el.hasAttribute('data-bs-delay-hide')) {
            delay['hide'] = el.getAttribute('data-bs-delay-hide');
        }

        if (el.hasAttribute('data-bs-delay-show')) {
            delay['show'] = el.getAttribute('data-bs-delay-show');
        }

        if (delay) {
            options['delay'] = delay;
        }

        // Обработка опции отмены
        if (el.getAttribute('data-bs-dismiss') == 'true') {
            options['dismiss'] = true;
        }

        if (options['dismiss'] === true) {
            options['template'] = '<div class="popover" role="tooltip"><div class="popover-arrow"></div><span class="popover-dismiss btn btn-icon"></span><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }

        // Инициализация всплывающего окна
        var popover = new bootstrap.Popover(el, options);

        // Обработка события отмены клика
        if (options['dismiss'] === true) {
            var dismissHandler = function (e) {
                popover.hide();
            }

            el.addEventListener('shown.bs.popover', function () {
                var dismissEl = document.getElementById(el.getAttribute('aria-describedby'));
                dismissEl.addEventListener('click', dismissHandler);
            });

            el.addEventListener('hide.bs.popover', function () {
                var dismissEl = document.getElementById(el.getAttribute('aria-describedby'));
                dismissEl.removeEventListener('click', dismissHandler);
            });
        }

        el.setAttribute("data-initialized", "1");

        return popover;
    }

    var createBootstrapPopovers = function () {
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));

        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
            createBootstrapPopover(popoverTriggerEl, {});
        });
    }

    var createBootstrapToasts = function () {
        var toastElList = [].slice.call(document.querySelectorAll('.toast'));
        var toastList = toastElList.map(function (toastEl) {
            if (toastEl.getAttribute("data-initialized") === "1") {
                return;
            }

            toastEl.setAttribute("data-initialized", "1");

            return new bootstrap.Toast(toastEl, {})
        });
    }

    var createButtons = function () {
        var buttonsGroup = [].slice.call(document.querySelectorAll('[data-buttons="true"]'));

        buttonsGroup.map(function (group) {
            if (group.getAttribute("data-initialized") === "1") {
                return;
            }

            var selector = group.hasAttribute('data-buttons-target') ? group.getAttribute('data-buttons-target') : '.btn';
            var activeButtons = [].slice.call(group.querySelectorAll(selector));

            // Обработчик переключения
            Util.on(group, selector, 'click', function (e) {
                activeButtons.map(function (button) {
                    button.classList.remove('active');
                });

                this.classList.add('active');
            });

            group.setAttribute("data-initialized", "1");
        });
    }

    var createDateRangePickers = function () {
        // Проверка наличия jQuery
        if (typeof jQuery == 'undefined') {
            return;
        }

        // Проверка наличия daterangepicker
        if (typeof $.fn.daterangepicker === 'undefined') {
            return;
        }

        var elements = [].slice.call(document.querySelectorAll('[data-daterangepicker="true"]'));
        var start = moment().subtract(29, 'days');
        var end = moment();

        elements.map(function (element) {
            if (element.getAttribute("data-initialized") === "1") {
                return;
            }

            var display = element.querySelector('div');
            var attrOpens = element.hasAttribute('data-daterangepicker-opens') ? element.getAttribute('data-daterangepicker-opens') : 'left';
            var range = element.getAttribute('data-daterangepicker-range');

            var cb = function (start, end) {
                var current = moment();

                if (display) {
                    if (current.isSame(start, "day") && current.isSame(end, "day")) {
                        display.innerHTML = start.format('D MMM YYYY');
                    } else {
                        display.innerHTML = start.format('D MMM YYYY') + ' - ' + end.format('D MMM YYYY');
                    }
                }
            }

            if (range === "today") {
                start = moment();
                end = moment();
            }

            $(element).daterangepicker({
                startDate: start,
                endDate: end,
                opens: attrOpens,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            }, cb);

            cb(start, end);

            element.setAttribute("data-initialized", "1");
        });
    }

    var createSelect2 = function () {
        // Проверка наличия jQuery
        if (typeof jQuery == 'undefined') {
            return;
        }

        // Проверка наличия select2
        if (typeof $.fn.select2 === 'undefined') {
            return;
        }

        var elements = [].slice.call(document.querySelectorAll('[data-control="select2"], [data-select2="true"]'));

        elements.map(function (element) {
            if (element.getAttribute("data-initialized") === "1") {
                return;
            }

            var options = {
                dir: document.body.getAttribute('direction')
            };

            if (element.getAttribute('data-hide-search') == 'true') {
                options.minimumResultsForSearch = Infinity;
            }

            $(element).select2(options);

            element.setAttribute("data-initialized", "1");
        });

        /*
        * Временное исправление ошибки в select2 с новой версией jQuery 3.6.0
        * см.: https://github.com/select2/select2/issues/5993
        * см.: https://github.com/jquery/jquery/issues/4382
        *
        * TODO: Проверить вопрос в GH select2 и удалить после исправления
        */

        if (select2FocusFixInitialized === false) {
            select2FocusFixInitialized = true;

            $(document).on('select2:open', function (e) {
                var elements = document.querySelectorAll('.select2-container--open .select2-search__field');
                if (elements.length > 0) {
                    elements[elements.length - 1].focus();
                }
            });
        }
    }

    var createAutosize = function () {
        if (typeof autosize === 'undefined') {
            return;
        }

        var inputs = [].slice.call(document.querySelectorAll('[data-autosize="true"]'));

        inputs.map(function (input) {
            if (input.getAttribute("data-initialized") === "1") {
                return;
            }

            autosize(input);

            input.setAttribute("data-initialized", "1");
        });
    }

    var createCountUp = function () {
        if (typeof countUp === 'undefined') {
            return;
        }

        var elements = [].slice.call(document.querySelectorAll('[data-countup="true"]:not(.counted)'));

        elements.map(function (element) {
            if (Util.isInViewport(element) && Util.visible(element)) {
                if (element.getAttribute("data-initialized") === "1") {
                    return;
                }

                var options = {};

                var value = element.getAttribute('data-countup-value');
                value = parseFloat(value.replace(/,/g, ""));

                if (element.hasAttribute('data-countup-start-val')) {
                    options.startVal = parseFloat(element.getAttribute('data-countup-start-val'));
                }

                if (element.hasAttribute('data-countup-duration')) {
                    options.duration = parseInt(element.getAttribute('data-countup-duration'));
                }

                if (element.hasAttribute('data-countup-decimal-places')) {
                    options.decimalPlaces = parseInt(element.getAttribute('data-countup-decimal-places'));
                }

                if (element.hasAttribute('data-countup-prefix')) {
                    options.prefix = element.getAttribute('data-countup-prefix');
                }

                if (element.hasAttribute('data-countup-separator')) {
                    options.separator = element.getAttribute('data-countup-separator');
                }

                if (element.hasAttribute('data-countup-suffix')) {
                    options.suffix = element.getAttribute('data-countup-suffix');
                }

                var count = new countUp.CountUp(element, value, options);

                count.start();

                element.classList.add('counted');

                element.setAttribute("data-initialized", "1");
            }
        });
    }

    var createCountUpTabs = function () {
        if (typeof countUp === 'undefined') {
            return;
        }

        if (countUpInitialized === false) {
            // Первичный вызов
            createCountUp();

            // Обработчик события прокрутки окна
            window.addEventListener('scroll', createCountUp);
        }

        // Обработчик события показа вкладок
        var tabs = [].slice.call(document.querySelectorAll('[data-countup-tabs="true"][data-bs-toggle="tab"]'));
        tabs.map(function (tab) {
            if (tab.getAttribute("data-initialized") === "1") {
                return;
            }

            tab.addEventListener('shown.bs.tab', createCountUp);

            tab.setAttribute("data-initialized", "1");
        });

        countUpInitialized = true;
    }

    var createTinySliders = function () {
        if (typeof tns === 'undefined') {
            return;
        }

        // Слайдеры
        const elements = Array.prototype.slice.call(document.querySelectorAll('[data-tns="true"]'), 0);

        if (!elements && elements.length === 0) {
            return;
        }

        elements.forEach(function (el) {
            if (el.getAttribute("data-initialized") === "1") {
                return;
            }

            initTinySlider(el);

            el.setAttribute("data-initialized", "1");
        });
    }

    var initTinySlider = function (el) {
        if (!el) {
            return;
        }

        const tnsOptions = {};

        // Преобразование строкового значения в булево
        const checkBool = function (val) {
            if (val === 'true') {
                return true;
            }
            if (val === 'false') {
                return false;
            }
            return val;
        };

        // Получение дополнительных опций через атрибуты данных
        el.getAttributeNames().forEach(function (attrName) {
            // Дополнительные опции; https://github.com/ganlanyuan/tiny-slider#options
            if ((/^data-tns-.*/g).test(attrName)) {
                let optionName = attrName.replace('data-tns-', '').toLowerCase().replace(/(?:[\s-])\w/g, function (match) {
                    return match.replace('-', '').toUpperCase();
                });

                if (attrName === 'data-tns-responsive') {
                    // Исправление строки с корректным JSON
                    const jsonStr = el.getAttribute(attrName).replace(/(\w+:)|(\w+ :)/g, function (matched) {
                        return '"' + matched.substring(0, matched.length - 1) + '":';
                    });
                    try {
                        // Преобразование строки JSON в объект
                        tnsOptions[optionName] = JSON.parse(jsonStr);
                    }
                    catch (e) {
                    }
                }
                else {
                    tnsOptions[optionName] = checkBool(el.getAttribute(attrName));
                }
            }
        });

        const opt = Object.assign({}, {
            container: el,
            slideBy: 'page',
            autoplay: true,
            center: true,
            autoplayButtonOutput: false,
        }, tnsOptions);

        if (el.closest('.tns')) {
            Util.addClass(el.closest('.tns'), 'tns-initiazlied');
        }

        return tns(opt);
    }

    var initSmoothScroll = function () {
        if (initialized === true) {
            return;
        }

        if (typeof SmoothScroll === 'undefined') {
            return;
        }

        new SmoothScroll('a[data-scroll-toggle][href*="#"]', {
            speed: 1000,
            speedAsDuration: true,
            offset: function (anchor, toggle) {
                // Целое число или функция, возвращающая целое число. На сколько пикселей сместить расположение якоря прокрутки
                // В этом примере используется функция, но можно просто использовать `offset: 25`

                // Пример возвращающий разные значения в зависимости от того, находится ли щелчок по ссылке в навигации заголовка или нет
                if (anchor.hasAttribute('data-scroll-offset')) {
                    var val = Util.getResponsiveValue(anchor.getAttribute('data-scroll-offset'));

                    return val;
                } else {
                    return 0;
                }
            }
        });
    }

    var initCard = function () {
        // Обработчик переключения
        Util.on(document.body, '[data-card-action="remove"]', 'click', function (e) {
            e.preventDefault();

            const card = this.closest('.card');

            if (!card) {
                return;
            }

            const confirmMessage = this.getAttribute("data-card-confirm-message");
            const confirm = this.getAttribute("data-card-confirm") === "true";

            if (confirm) {
                // Показать всплывающее окно с сообщением. Для получения дополнительной информации см. официальную документацию плагина: https://sweetalert2.github.io/
                Swal.fire({
                    text: confirmMessage ? confirmMessage : "Вы уверены, что хотите удалить?",
                    icon: "warning",
                    buttonsStyling: false,
                    confirmButtonText: "Подтвердить",
                    denyButtonText: "Отмена",
                    customClass: {
                        confirmButton: "btn btn-primary",
                        denyButton: "btn btn-danger"
                    }
                }).then(function (result) {
                    if (result.isConfirmed) {
                        card.remove();
                    }
                });
            } else {
                card.remove();
            }
        });
    }

    var initModal = function () {
        var elements = Array.prototype.slice.call(document.querySelectorAll("[data-bs-stacked-modal]"));

        if (elements && elements.length > 0) {
            elements.forEach((element) => {
                if (element.getAttribute("data-initialized") === "1") {
                    return;
                }

                element.setAttribute("data-initialized", "1");

                element.addEventListener("click", function (e) {
                    e.preventDefault();

                    const modalEl = document.querySelector(this.getAttribute("data-bs-stacked-modal"));

                    if (modalEl) {
                        const modal = new bootstrap.Modal(modalEl);
                        modal.show();
                    }
                });
            });
        }
    }

    var initCheck = function () {
        if (initialized === true) {
            return;
        }

        // Обработчик переключения
        Util.on(document.body, '[data-check="true"]', 'change', function (e) {
            var check = this;
            var targets = document.querySelectorAll(check.getAttribute('data-check-target'));

            Util.each(targets, function (target) {
                if (target.type == 'checkbox') {
                    target.checked = check.checked;
                } else {
                    target.classList.toggle('active');
                }
            });
        });
    }

    var initBootstrapCollapse = function () {
        if (initialized === true) {
            return;
        }

        Util.on(document.body, '.collapsible[data-bs-toggle="collapse"]', 'click', function (e) {
            if (this.classList.contains('collapsed')) {
                this.classList.remove('active');
                this.blur();
            } else {
                this.classList.add('active');
            }

            if (this.hasAttribute('data-toggle-text')) {
                var text = this.getAttribute('data-toggle-text');
                var target = this.querySelector('[data-toggle-text-target="true"]');
                var target = target ? target : this;

                this.setAttribute('data-toggle-text', target.innerText);
                target.innerText = text;
            }
        });
    }

    var initBootstrapRotate = function () {
        if (initialized === true) {
            return;
        }

        Util.on(document.body, '[data-rotate="true"]', 'click', function (e) {
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.blur();
            } else {
                this.classList.add('active');
            }
        });
    }

    var initLozad = function () {
        // Проверка наличия lozad
        if (typeof lozad === 'undefined') {
            return;
        }

        const observer = lozad(); // ленивая загрузка элементов с селектором по умолчанию '.lozad'
        observer.observe();
    }

    var initFlatpickr = function () {
        flatpickr.localize({
            weekdays: {
                shorthand: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                longhand: [
                    "Воскресенье",
                    "Понедельник",
                    "Вторник",
                    "Среда",
                    "Четверг",
                    "Пятница",
                    "Суббота",
                ],
            },
            months: {
                shorthand: [
                    "Янв",
                    "Фев",
                    "Март",
                    "Апр",
                    "Май",
                    "Июнь",
                    "Июль",
                    "Авг",
                    "Сен",
                    "Окт",
                    "Ноя",
                    "Дек",
                ],
                longhand: [
                    "Январь",
                    "Февраль",
                    "Март",
                    "Апрель",
                    "Май",
                    "Июнь",
                    "Июль",
                    "Август",
                    "Сентябрь",
                    "Октябрь",
                    "Ноябрь",
                    "Декабрь",
                ],
            },
            firstDayOfWeek: 1,
            ordinal: function () {
                return "";
            },
            rangeSeparator: " — ",
            weekAbbreviation: "Нед.",
            scrollTitle: "Прокрутите для увеличения",
            toggleTitle: "Нажмите для переключения",
            amPM: ["ДП", "ПП"],
            yearAriaLabel: "Год",
            time_24hr: true,
        });
    }

    var showPageLoading = function () {
        document.body.classList.add('page-loading');
        document.body.setAttribute('data-app-page-loading', "on");
    }

    var hidePageLoading = function () {
        // Плавные переходы только после загрузки страницы (.page-loading или .app-page-loading класс добавлен к тегу body и удален с помощью JS при загрузке страницы)
        document.body.classList.remove('page-loading');
        document.body.removeAttribute('data-app-page-loading');
    }

    return {
        init: function () {
            initFlatpickr();

            initLozad();

            initSmoothScroll();

            initCard();

            initModal();

            initCheck();

            initBootstrapCollapse();

            initBootstrapRotate();

            createBootstrapTooltips();

            createBootstrapPopovers();

            createBootstrapToasts();

            createDateRangePickers();

            createButtons();

            createSelect2();

            createCountUp();

            createCountUpTabs();

            createAutosize();

            createTinySliders();

            initialized = true;
        },

        initTinySlider: function (el) {
            initTinySlider(el);
        },

        showPageLoading: function () {
            showPageLoading();
        },

        hidePageLoading: function () {
            hidePageLoading();
        },

        createBootstrapPopover: function (el, options) {
            return createBootstrapPopover(el, options);
        },

        createBootstrapTooltip: function (el, options) {
            return createBootstrapTooltip(el, options);
        }
    };
}();

// Declare App for Webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = App;
}