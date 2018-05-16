$(document).ready(function () {

    var trigger = false;
    setInterval(function () {
        if (PE_API.isLost() && !trigger) {
            trigger = !trigger;
            alert("Vous êtes perdus !");
        }

        if (PE_API.isAngry() && !trigger) {
            trigger = !trigger;
            alert("Vous êtes énervées, une hotesse va venir vous prendre en charge");
        }
    }, 2000)
})