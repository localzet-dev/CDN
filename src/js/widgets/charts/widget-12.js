"use strict";

// Определение класса
var ChartsWidget12 = function () {
    // Private methods
    var initChart = function(tabSelector, chartSelector, data, initByDefault) {
        var element = document.querySelector(chartSelector);

        if (!element) {
            return;
        }
        
        var height = parseInt(Util.css(element, 'height'));
        var labelColor = Util.getCssVariableValue('--bs-gray-900');

        var borderColor = Util.getCssVariableValue('--bs-border-dashed-color');    

        var options = {
            series: [{
                name: 'Deliveries',
                data: data
            }],
            chart: {
                fontFamily: 'inherit',
                type: 'bar',
                height: height,
                toolbar: {
                    show: false
                }              
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: ['22%'],
                    borderRadius: 5,                     
                    dataLabels: {
                        position: "top" // top, center, bottom
                    },
                    startingShape: 'flat'
                },
            },
            legend: {
                show: false
            },
            dataLabels: {
                enabled: true, 
                offsetY: -28,                                             
                style: {
                    fontSize: '13px',
                    colors: labelColor
                }, 
                
                formatter: function(val) {
                    return val + "K";
                } 
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Grossey', 'Pet Food', 'Flowers', 'Restaurant', 'Kids Toys', 'Clothing', 'Still Water'],
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    style: {
                        colors: Util.getCssVariableValue('--bs-gray-500'),
                        fontSize: '13px'
                    }                    
                },
                crosshairs: {
                    fill: {         
                        gradient: {         
                            opacityFrom: 0,
                            opacityTo: 0
                        }
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: Util.getCssVariableValue('--bs-gray-500'),
                        fontSize: '13px'
                    },
                    
                    formatter: function(val) {
                        return val + "K";
                    } 
                }
            },
            fill: {
                opacity: 1
            },
            states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'none',
                        value: 0
                    }
                }
            },
            tooltip: {
                style: {
                    fontSize: '12px'
                },
                y: {
                    formatter: function (val) {
                        return  + val + 'K' 
                    }
                }
            },
            colors: [Util.getCssVariableValue('--bs-primary'), Util.getCssVariableValue('--bs-primary-light')],
            grid: {
                borderColor: borderColor,
                strokeDashArray: 4,
                yaxis: {
                    lines: {
                        show: true
                    }
                }
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
            initChart('#rts_widget_12_tab_1', '#ch#_widget_12_chart_1', [54, 42, 75, 110, 23, 87, 50], true);
            initChart('#rts_widget_12_tab_2', '#ch#_widget_12_chart_2', [25, 55, 35, 50, 45, 20, 31], false); 
            initChart('#rts_widget_12_tab_3', '#ch#_widget_12_chart_3', [45, 15, 35, 70, 45, 50, 21], false); 
        }        
    }
}();

// Webpack support
if (typeof module !== 'undefined') {
    module.exports = ChartsWidget12;
}

// При загрузке документа
Util.onDOMContentLoaded(function() {
    ChartsWidget12.init();
});


 