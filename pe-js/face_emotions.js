$(document).ready(function () {
    var seeked_emotions = ["angry"];

    var vid = document.getElementById('videoel');
    var vid_width = vid.width;
    var vid_height = vid.height;

    function gumSuccess(stream) {
        // add camera stream if getUserMedia succeeded
        if ("srcObject" in vid) {
            vid.srcObject = stream;
        } else {
            vid.src = (window.URL && window.URL.createObjectURL(stream));
        }
        vid.onloadedmetadata = function () {
            vid.play();
        }
        vid.onresize = function () {
            if (trackingStarted) {
                ctrack.stop();
                ctrack.reset();
                ctrack.start(vid);
            }
        }
        startVideo();
    }

    function gumFail() {
        alert("There was some problem trying to fetch video from your webcam. If you have a webcam, please make sure to accept when the browser asks for access to your webcam.");
    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

    // check for camerasupport
    if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(gumSuccess).catch(gumFail);
    } else if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true }, gumSuccess, gumFail);
    } else {
        alert("This demo depends on getUserMedia, which your browser does not seem to support. :(");
    }

    /*********** setup of emotion detection *************/
    // set eigenvector 9 and 11 to not be regularized. This is to better detect motion of the eyebrows
    pModel.shapeModel.nonRegularizedVectors.push(9);
    pModel.shapeModel.nonRegularizedVectors.push(11);
    var ctrack = new clm.tracker({ useWebGL: true });
    ctrack.init(pModel);
    var trackingStarted = false;

    function startVideo() {
        // start video
        vid.play();
        // start tracking
        ctrack.start(vid);
        trackingStarted = true;
        trackEmotions();
    }

    function trackEmotions() {
        requestAnimationFrame(trackEmotions);
        var cp = ctrack.getCurrentParameters();
        var er = ec.meanPredict(cp);
        if (er) {
            for (var i = 0; i < er.length; i++) {
                var user_emotion = er[i].emotion;
                if (seeked_emotions.indexOf(user_emotion) != -1) {
                    PE_API.addData(user_emotion, er[i].value);
                }

                for (var j = 0; j < seeked_emotions.length; j++) {
                    $("#" + seeked_emotions[j]).html(PE_API.avg(seeked_emotions[j]));
                }
            }
        }
    }

    delete emotionModel['disgusted'];
    delete emotionModel['fear'];
    var ec = new emotionClassifier();
    ec.init(emotionModel);
    var emotionData = ec.getBlank();
});