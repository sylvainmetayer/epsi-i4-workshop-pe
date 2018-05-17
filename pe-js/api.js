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
    ARRAY_MAX_LENGTH: 20,
    initAll: function () {
        var fill = function (nb) {
            var tmp = []
            for (var i = 0; i < nb; i++) {
                tmp[i] = 0.5
            }
            return tmp;
        }
        this.datas = {
            lost: [],
            angry: fill(this.ARRAY_MAX_LENGTH),
            happy: fill(this.ARRAY_MAX_LENGTH),
            sad: fill(this.ARRAY_MAX_LENGTH),
            surprised: fill(this.ARRAY_MAX_LENGTH),
        }
    },
    datas: {},
    addData: function (type, value) {
        this.datas[type].push(value);
        if (this.datas[type].length > this.ARRAY_MAX_LENGTH) {
            this.datas[type].shift();
        }
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
    avg: function (type) {
        var total = this.datas[type].reduce(function (acc, el) {
            return acc + el;
        })
        var avg = total / this.datas[type].length;
        return avg;
    },
    isAngry: function () {
        return (this.avg("angry") > 0.6)
    },
    isSurprised: function () {
        return this.avg("surprised") > 0.6;
    },
    isUserDetected: function () {
        var emotions = this.getFacialEmotions();
        return !(emotions["sad"] == 0 && emotions["happy"] == 0 && emotions["surprised"] == 0 && emotions["angry"] == 0);
    },
    isLost: function () {
        return document.getElementById("paume").innerHTML < 40
    }
}

PE_API.initAll()

console.log(PE_API.datas)