$(function () {
    "use strict";
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        console.log('No WS support');
        return;
    }

    var connection = new WebSocket(WS_URL);

    connection.onopen = function () {
        connection.send(JSON.stringify({ type: "name", value: "Borne 1" }));
    };

    connection.onerror = function (error) {
        console.log('Server unavailable')
    };

    window.connection = connection;
});