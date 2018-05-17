$(function () {
    "use strict";

    // for better performance - to avoid searching in DOM
    var content = $('#notifications');
    var pause = false;

    $("#pause").on("click", function () {
        pause = !pause;
        if (pause) {
            $("#pause").val("Reprendre")
        } else {
            $("#pause").val("Pause")
        }
    })

    window.WebSocket = window.WebSocket || window.MozWebSocket;

    if (!window.WebSocket) {
        console.log('No WS support');
        return;
    }

    // open connection
    var connection = new WebSocket(WS_URL);
    var timerId = 0;

    function init() {

        console.log((new Date()) + ' (re)connection...')

        connection.onopen = function () {
            connection.send(JSON.stringify({ type: "name", value: "Poste de contrôle" }));
        };

        connection.onerror = function (error) {
            // just in there were some problems with connection...
            content.prepend($('<li>', {
                text: 'Sorry, but there\'s some problem with your '
                    + 'connection or the server is down.'
            }));
        };

        connection.onmessage = function (message) {
            try {
                var json = JSON.parse(message.data);
            } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ', message.data);
                return;
            }

            if (json.type === 'message' && !pause) { // it's a single message
                logMessage(json.data.author, json.data.text, new Date(json.data.time));
            } else if (json.type == "chart" && !pause) {
                window.updateChart(json.data.text)
            } else {
                if (!pause) {
                    console.log(json);
                }
            }
        };

        timerId = setInterval(function () {
            if (connection.readyState !== 1) {
                connection = new WebSocket(WS_URL);
                clearInterval(timerId);
                init();
            }
        }, 5000);
    }

    init();

    function logMessage(author, message, dt) {
        content.prepend(`<li>La ${author} est ${message} à  `
            + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
            + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
            + ':' + (dt.getSeconds() < 10 ? '0' + dt.getSeconds() : dt.getSeconds()) + '</li>');
        $('#notifications > li').slice(5, -1).remove();
    }
});