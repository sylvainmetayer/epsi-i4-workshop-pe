var PE_API = {
    getFacialEmotions: function () {
        var angry = document.getElementsByClassName("angry")[0].innerHTML;
        var happy = document.getElementsByClassName("happy")[0].innerHTML;
        var surprised = document.getElementsByClassName("surprised")[0].innerHTML;
        var sad = document.getElementsByClassName('sad')[0].innerHTML;

        return {
            "sad": sad,
            "happy": happy,
            "surprised": surprised,
            "angry": angry
        }
    }
}
