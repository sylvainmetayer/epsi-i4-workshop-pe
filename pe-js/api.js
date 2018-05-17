var PE_API = {
    getFacialEmotions: function () {
        var angry = document.getElementById("angry").innerHTML;
        return {
            "angry": angry
        }
    },
    ARRAY_MAX_LENGTH: 20,
    init: function () {
        var fill = function (nb) {
            var tmp = []
            for (var i = 0; i < nb; i++) {
                tmp[i] = 0.5
            }
            return tmp;
        }
        this.datas = {
            lost: [],
            angry: fill(this.ARRAY_MAX_LENGTH)
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
        var elements = ["angry", "lost"];
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
        return this.avg("angry") > 0.6
    },
    isUserDetected: function () {
        var emotions = this.getFacialEmotions();
        return !(emotions["angry"] == 0);
    },
    isLost: function () {
        return document.getElementById("paume").innerHTML < 40
    }
}

PE_API.init()