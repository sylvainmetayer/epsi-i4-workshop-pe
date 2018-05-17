$(function () {
    "use strict";

    // for better performance - to avoid searching in DOM
    var content = $('#notifications');

    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        content.prepend($('<li>', {
            text: 'Sorry, but your browser doesn\'t '
                + 'support WebSockets.'
        }));
        return;
    }

    // open connection
    var connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onopen = function () {
        connection.send("Poste de controle");
    };

    connection.onerror = function (error) {
        // just in there were some problems with conenction...
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

        // NOTE: if you're not sure about the JSON structure
        // check the server source code above
        if (json.type === 'message') { // it's a single message
            addMessage(json.data.author, json.data.text, new Date(json.data.time));
        } else {
            console.log('Hmm..., I\'ve never seen JSON like this: ', json);
        }
    };

    /**
     * This method is optional. If the server wasn't able to respond to the
     * in 3 seconds then show some error message to notify the user that
     * something is wrong.
     */
    setInterval(function () {
        if (connection.readyState !== 1) {
            content.prepend($('<li>', { text: 'Unable to communicate with the WebSocket server.' }));
        }
    }, 5000);

    /**
     * Add message to the chat window
     */
    function addMessage(author, message, dt) {
        content.prepend('<li>' + author + ' @ ' +
            + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
            + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
            + ': ' + message + '</p>');
    }
});