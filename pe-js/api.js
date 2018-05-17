var PE_API = {
    datas: {
        lost: [],
        angry: [],
        happy: [],
        sad: [],
        surprised: [],
    },
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
    addData: function (type, value) {
        this.datas[type].push(value);
    },
    getDatas: function (type) {
        return this.datas[type]
    },
    getLastData: function (type) {
        return this.datas[type][this.datas[type].length - 1];
    },
    getLastDatas: function () {
        var result = {}
        var elements = ["sad", "happy", "surprised", "angry", "lost"];
        for (var i = 0; i < elements.length; i++) {
            result[elements[i]] = this.getLastData(elements[i])
            if (result[elements[i]] === undefined) {
                result[elements[i]] = 0
            }
        }
        return result;
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
