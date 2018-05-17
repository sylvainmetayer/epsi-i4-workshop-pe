$(document).ready(function () {

    // If you want to stop trigger, set this to true
    var trigger = false;

    setTimeout(function () {
        window.connection.send(JSON.stringify({ type: "message", "value": "connecté" }))
    }, 2000);

    setInterval(function () {
        if (PE_API.isUserDetected()) {
            window.connection.send(JSON.stringify({ type: "chart", value: PE_API.getLastDatas() }))
        }
    }, 100)

    setInterval(function () {
        if (PE_API.isLost() && !trigger) {
            window.connection.send(JSON.stringify({ type: "message", "value": "perdu" }))
            $("#status").html("Vous êtes perdu !");
        }

        if (PE_API.isAngry() && !trigger) {
            window.connection.send(JSON.stringify({ type: "message", "value": "énervé" }))
            $("#status").html("Vous êtes énervé, une hotesse va venir vous prendre en charge");
        }

        // Whatever you want !
    }, 2000)
})