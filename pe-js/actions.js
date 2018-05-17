$(document).ready(function () {

    // If you want to stop sending events, set this to true
    var trigger = false;

    setInterval(function () {
        if (PE_API.isUserDetected()) {
            window.connection.send(JSON.stringify({ type: "chart", value: PE_API.getLastDatas() }))
        }
    }, 100)

    setInterval(function () {
        if (PE_API.isLost() && !trigger) {
            window.connection.send(JSON.stringify({ type: "message", value: "perdu(e)" }))
            $("#status").html("Vous êtes perdu !");
        }

        if (PE_API.isAngry() && !trigger) {
            window.connection.send(JSON.stringify({ type: "message", value: "énervé(e)" }))
            $("#status").html("Vous êtes énervé !");
        }

        // Whatever you want !
    }, 2000)
})