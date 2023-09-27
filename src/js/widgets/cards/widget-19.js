"use strict";

// Определение класса
var CardsWidget19 = function () {
    // Private methods
    var initChart = function() {
        var el = document.getElementById('card_widget_19_chart'); 

        if (!el) {
            return;
        }

        var options = {
            size: el.getAttribute('data-size') ? parseInt(el.getAttribute('data-size')) : 70,
            lineWidth: el.getAttribute('data-line') ? parseInt(el.getAttribute('data-line')) : 11,
            rotate: el.getAttribute('data-rotate') ? parseInt(el.getAttribute('data-rotate')) : 145,            
            //percent:  el.getAttribute('data-percent') ,
        }

        var canvas = document.createElement('canvas');
        var span = document.createElement('span'); 
            
        if (typeof(G_vmlCanvasManager) !== 'undefined') {
            G_vmlCanvasManager.initElement(canvas);
        }

        var ctx = canvas.getContext('2d');
        canvas.width = canvas.height = options.size;

        el.appendChild(span);
        el.appendChild(canvas);

        ctx.translate(options.size / 2, options.size / 2); // change center
        ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

        //imd = ctx.getImageData(0, 0, 240, 240);
        var radius = (options.size - options.lineWidth) / 2;

        var drawCircle = function(color, lineWidth, percent) {
            percent = Math.min(Math.max(0, percent || 1), 1);
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
            ctx.strokeStyle = color;
            ctx.lineCap = 'round'; // butt, round or square
            ctx.lineWidth = lineWidth
            ctx.stroke();
        };

        // Init 
        drawCircle('#E4E6EF', options.lineWidth, 100 / 100); 
        drawCircle(Util.getCssVariableValue('--bs-primary'), options.lineWidth, 100 / 150);
        drawCircle(Util.getCssVariableValue('--bs-success'), options.lineWidth, 100 / 250);   
    }

    // Публичные методы
    return {
        init: function () {
            initChart();
        }   
    }
}();

// Webpack support
if (typeof module !== 'undefined') {
    module.exports = CardsWidget19;
}

// При загрузке документа
Util.onDOMContentLoaded(function() {
    CardsWidget19.init();
});
   
        
        
        
           