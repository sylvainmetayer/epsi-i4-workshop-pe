$(document).ready(function () {

    var trigger = false;
    setTimeout(function () {
        window.connection.send(JSON.stringify({ type: "message", "value": "Connecté !" }))
    }, 2000);

    setInterval(function () {
        if (PE_API.isLost() && !trigger) {
            trigger = !trigger;
            window.connection.send(JSON.stringify({ type: "message", "value": "Perdu !" }))
            alert("Vous êtes perdu !");
        }

        if (PE_API.isAngry() && !trigger) {
            trigger = !trigger;
            window.connection.send(JSON.stringify({ type: "message", "value": "Enervé !" }))
            alert("Vous êtes énervé, une hotesse va venir vous prendre en charge");
        }

        if (PE_API.isSurprised() && !trigger) {
            trigger = !trigger;
            window.connection.send(JSON.stringify({ type: "message", "value": "Surpris !" }))
            alert('Vous semblez surpris, avez-vous besoin d\'aide ?');
        }

        // Whatever you want !
    }, 2000)
})