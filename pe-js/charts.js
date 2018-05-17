window.onload = function () {

    var angryData = [];
    var lostData = [];

    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Suivi de l'utilisateur"
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
            name: "Enervement",
            showInLegend: true,
            dataPoints: angryData,
            markerSize: 0,
            yValueFormatString: "#'%'",
            xValueFormatString: " "
        }, {
            type: "line",
            name: "Confiance de l'utilisateur",
            showInLegend: true,
            dataPoints: lostData,
            markerSize: 0,
            yValueFormatString: "#'%'",
            xValueFormatString: " "
        },
        ]
    });

    var xVal = 0;
    var updateInterval = 10;
    var dataLength = 100; // number of dataPoints visible at any point

    window.updateChart = function (values) {
        update(angryData, values.angry * 100)
        update(lostData, values.lost)
        xVal++;
    };

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
}