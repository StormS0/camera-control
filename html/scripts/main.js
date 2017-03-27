var debugMode = false;
var recording = false;

var rec = document.querySelector("#button_rec");

rec.onclick = function () {
    recording = !recording;
    sony1_connection.setRecording(recording);
    sony2_connection.setRecording(recording);
    canon_connection.setRecording(recording);
    rec.classList.toggle('active');
};

var map = document.querySelector("#button_map");

map.onclick = function () {
    Array.prototype.forEach.call(document.querySelectorAll('.camerabox'), function (element) {
        element.classList.toggle('hidden');
    });
    document.querySelector('#scheme').classList.toggle('hidden');
};


var sony1_connection = Sony.createConnection(new savona.client(), "sony1");
var sony2_connection = Sony.createConnection(new savona_two.client(), "sony2");
var canon_connection = Canon.createConnection();

setInterval(function () {
    sony1_connection.updateStatus();
    sony2_connection.updateStatus();
    canon_connection.updateStatus();
}, 1000);
