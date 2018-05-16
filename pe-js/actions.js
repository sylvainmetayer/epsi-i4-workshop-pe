$(document).ready(function () {

    var trigger = false;
    setInterval(function () {
        if (PE_API.isLost() && !trigger) {
            trigger = !trigger;
            alert("Vous êtes perdu !");
        }

        if (PE_API.isAngry() && !trigger) {
            trigger = !trigger;
            alert("Vous êtes énervé, une hotesse va venir vous prendre en charge");
        }

        if (PE_API.isSurprised() && !trigger) {
            trigger = !trigger;
            alert('Vous semblez surpris, avez-vous besoin d\'aide ?');
        }

        // Whatever you want !
    }, 2000)
})