$(document).ready(function () {

    function getLevel() {
        return $("#paume").html()
    }

    function incrLevel(increment) {
        $("#paume").html(parseInt(getLevel()) + increment)
    }

    setInterval(function () {
        if (PE_API.isUserDetected()) incrLevel(2)
    }, 3000);

    // Gros menus
    $(".cbp-hrmenu > ul > li > a ").each(function (index) {
        $(this).click(
            function () {
                incrLevel(-10);
            }
        );
    });

    // Sub menu 
    $(".cbp-hrmenu .cbp-hrsub-inner > div a").each(function (index) {
        $(this).click(
            function () {
                incrLevel(-5)
            }
        );
    });
});