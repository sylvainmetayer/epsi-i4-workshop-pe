window.onload = function () {

    var colereData = []; // dataPoints
    var stressData = []; // dataPoints
    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Monitoring"
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            fontSize: 22,
            fontColor: "dimGrey"
        },
        toolTip: {
            shared: true
        },
        axisY: {
            includeZero: true,
            suffix: "%",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        data: [{
            type: "line",
            name: "Colere",
            showInLegend: true,
            dataPoints: colereData,
            markerSize: 0,
            yValueFormatString: "#'%'",
            xValueFormatString: " "
        }, {
            type: "line",
            name: "Stress",
            showInLegend: true,
            dataPoints: stressData,
            markerSize: 0,
            yValueFormatString: "#'%'",
            xValueFormatString: " "
        }]
    });

    var xVal = 0;
    var updateInterval = 10;
    var dataLength = 100; // number of dataPoints visible at any point

    var updateChart = function (count) {

        update(colereData, getRandomInt(40, 70))
        update(stressData, getRandomInt(50, 65))

        xVal++;
    };

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function update(data, value) {
        data.push({
            x: xVal,
            y: value,
        });

        if (data.length > dataLength) {
            data.shift();
        }

        chart.render();
    }


    updateChart(dataLength);
    setInterval(function () { updateChart() }, updateInterval);

}