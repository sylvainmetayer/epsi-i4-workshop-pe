$(function () {
    "use strict";
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    if (!window.WebSocket) {
        console.log('No WS support');
        return;
    }

    var connection = new WebSocket(WS_URL);
    var timerId = 0;

    function init() {
        console.log((new Date()) + ' (re)connection...')
        connection.onopen = function () {
            connection.send(JSON.stringify({ type: "name", value: "Borne 1" }));
        };

        connection.onerror = function (error) {
            console.log('Server unavailable')
        };

        timerId = setInterval(function () {
            if (connection.readyState !== 1) {
                connection = new WebSocket(WS_URL);
                clearInterval(timerId);
                init();
            }
        }, 5000);

        window.connection = connection;
    }

    init();


});