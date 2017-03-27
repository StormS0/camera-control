var debugMode = false;

var sony1_connection = Sony.createConnection(new savona.client(), "sony1");
var sony2_connection = Sony.createConnection(new savona_two.client(), "sony2");
var canon_connection = Canon.createConnection();

setInterval(function () {
    sony1_connection.updateStatus();
    sony2_connection.updateStatus();
    canon_connection.updateStatus();
}, 1000);

document.querySelector("#button_record").onclick = function () {
    this.classList.toggle('active');
    var recording = this.classList.contains('active');
    sony1_connection.setRecording(recording);
    sony2_connection.setRecording(recording);
    canon_connection.setRecording(recording);
};

document.querySelector("#button_map").onclick = function () {
    document.querySelector('#cameras').classList.toggle('hidden');
    document.querySelector('#scheme').classList.toggle('hidden');
};

document.querySelector("#button_settings").onclick = function () {
    document.querySelector('.control_cameras').classList.toggle('hidden');
};


