window.onload = function () {

    var angryData = []; // dataPoints
    var lostData = []; // dataPoints
    var happyData = []; // dataPoints
    var sadData = []; // dataPoints
    var surprisedData = []; // dataPoints
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
            name: "Angry",
            showInLegend: true,
            dataPoints: angryData,
            markerSize: 0,
            yValueFormatString: "#'%'",
            xValueFormatString: " "
        }, {
            type: "line",
            name: "Lost",
            showInLegend: true,
            dataPoints: lostData,
            markerSize: 0,
            yValueFormatString: "#'%'",
            xValueFormatString: " "
        },
        {
            type: "line",
            name: "Happy",
            showInLegend: true,
            dataPoints: happyData,
            markerSize: 0,
            yValueFormatString: "#'%'",
            xValueFormatString: " "
        },
        {
            type: "line",
            name: "Sad",
            showInLegend: true,
            dataPoints: sadData,
            markerSize: 0,
            yValueFormatString: "#'%'",
            xValueFormatString: " "
        },
        {
            type: "line",
            name: "Surprised",
            showInLegend: true,
            dataPoints: surprisedData,
            markerSize: 0,
            yValueFormatString: "#'%'",
            xValueFormatString: " "
        }
        ]
    });

    var xVal = 0;
    var updateInterval = 10;
    var dataLength = 100; // number of dataPoints visible at any point

    window.updateChart = function (values) {

        console.log(values)
        update(angryData, values.angry)
        update(sadData, values.sad)
        update(happyData, values.happy)
        update(surprisedData, values.surprised)
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