$(function () {
    "use strict";
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        alert('No WS support');
        return;
    }

    var connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onopen = function () {
        connection.send("Borne 1");
    };

    connection.onerror = function (error) {
        alert('Error !')
    };

    window.connection = connection;
});