var debugMode = false;

var j = jQuery.noConflict();

var sony1_connection = Sony.createConnection(new savona.client(), "sony1");
var sony2_connection = Sony.createConnection(new savona_two.client(), "sony2");
var canon_connection = Canon.createConnection();

setInterval(function () {
    sony1_connection.updateStatus();
    sony2_connection.updateStatus();
    canon_connection.updateStatus();
}, 3000);

j('.control_btn').each(function() {
    j(this).click(function() {
        j(this).toggleClass('active');
        j(this).next('.control_cameras').toggle();
    });
});

var recording = false;

j('html').on('click', '#rec', function() {
    recording = !recording;
    sony1_connection.setRecording(recording);
    sony2_connection.setRecording(recording);
    canon_connection.setRecording(recording);
});
