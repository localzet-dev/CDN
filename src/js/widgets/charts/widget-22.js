"use strict";

// Определение класса
var ChartsWidget22 = function () {
    // Private methods
    var initChart = function(tabSelector, chartSelector, data, initByDefault) {
        var element = document.querySelector(chartSelector);        

        if (!element) {
            return;
        }  
          
        var height = parseInt(Util.css(element, 'height'));
        
        var options = {
            series: data,                 
            chart: {           
                fontFamily: 'inherit', 
                type: 'donut',
                width: 250,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '50%',
                        labels: {
                            value: {
                                fontSize: '10px'
                            }
                        }                        
                    }
                }
            },
            colors: [
                Util.getCssVariableValue('--bs-info'), 
                Util.getCssVariableValue('--bs-success'), 
                Util.getCssVariableValue('--bs-primary'), 
                Util.getCssVariableValue('--bs-danger') 
            ],           
            stroke: {
              width: 0
            },
            labels: ['Sales', 'Sales', 'Sales', 'Sales'],
            legend: {
                show: false,
            },
            fill: {
                type: 'false',          
            }     
        };                     

        var chart = new ApexCharts(element, options);

        var init = false;

        var tab = document.querySelector(tabSelector);
        
        if (initByDefault === true) {
            chart.render();
            init = true;
        }        

        tab.addEventListener('shown.bs.tab', function (event) {
            if (init == false) {
                chart.render();
                init = true;
            }
        })
    }

    // Публичные методы
    return {
        init: function () {           
            initChart('#chart_widgets_22_tab_1', '#chart_widgets_22_chart_1', [20, 100, 15, 25], true);
            initChart('#chart_widgets_22_tab_2', '#chart_widgets_22_chart_2', [70, 13, 11, 2], false);              
        }   
    }
}();

// Webpack support
if (typeof module !== 'undefined') {
    module.exports = ChartsWidget22;
}

// При загрузке документа
Util.onDOMContentLoaded(function() {
    ChartsWidget22.init();
});