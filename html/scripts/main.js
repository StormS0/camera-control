// global scope variables
var debugMode = false;

(function() {

    var connections = [
        Sony.createConnection("192.168.111.41", "sony1")
        // , Sony.createConnection("192.168.111.42", "sony2")
        // , Canon.createConnection()
    ];

    document.querySelector("#button_record").onclick = toggleRecording;
    document.querySelector("#button_map").onclick = toggleHidden.bind(null, ['#cameras', '#scheme']);
    document.querySelector("#button_settings").onclick = toggleHidden.bind(null, ['.control_cameras']);

    setInterval(updateStatus, 1000);

    function updateStatus() {
        connections.forEach(function (conn) {
            conn.updateStatus();
        });
    }

    function toggleRecording() {
        this.classList.toggle('active');
        var recording = this.classList.contains('active');
        connections.forEach(function (conn) {
            conn.setRecording(recording);
        });
    }

    function toggleHidden(selectors) {
        selectors.forEach(function (selector) {
            document.querySelector(selector).classList.toggle('hidden');
        });
    }

})();