$(document).ready(function () {

    function getLevel() {
        return parseInt($("#paume").html());
    }

    PE_API.addData("lost", getLevel());

    function incrLevel(increment) {
        var value = parseInt(getLevel()) + increment;
        $("#paume").html(value)
        PE_API.addData("lost", value)
    }

    setInterval(function () {
        if (PE_API.isUserDetected() && getLevel() <= 98) incrLevel(2)
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