var PE_API = {
    getFacialEmotions: function () {
        var angry = document.getElementById("angry").innerHTML;
        var happy = document.getElementById("happy").innerHTML;
        var surprised = document.getElementById("surprised").innerHTML;
        var sad = document.getElementById('sad').innerHTML;

        return {
            "sad": sad,
            "happy": happy,
            "surprised": surprised,
            "angry": angry
        }
    },
    isAngry: function () {
        var emotions = this.getFacialEmotions();
        return (emotions["angry"] > 0.6)
    },
    isSurprised: function () {
        var emotions = this.getFacialEmotions();
        return emotions["surprised"] > 0.6;
    },
    isUserDetected: function () {
        var emotions = this.getFacialEmotions();
        return !(emotions["sad"] == 0 && emotions["happy"] == 0 && emotions["surprised"] == 0 && emotions["angry"] == 0);
    },
    isLost: function () {
        return document.getElementById("paume").innerHTML > 120 || document.getElementById("paume").innerHTML < 40
    }
}
