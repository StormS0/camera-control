var Canon = (function () {

    var CANON_URL = 'http://127.0.0.1:55555';
    // var SETTINGS_PAGE = CANON_URL + '/wpd/VLAX01/rc/advanced.htm';
    var SETTINGS_PAGE = 'canon.html';

    var API = CANON_URL + '/api/cam/';
    var START_RECORDING = API + 'rec?cmd=trig';
    var START_STREAMING = API + 'lv?cmd=start&sz=l';
    var STATUS_REQUEST = API + 'getcurprop?seq=1';
    var CURRENT_IMAGE = API + 'lvgetimg?time=';

    var j = jQuery.noConflict();
    var imageHolder = j('#liveview');
    var iframe = document.querySelector('iframe');

    return {
        createConnection: function () {
            var connection = Connection.create("canon", CANON_URL, SETTINGS_PAGE);

            connection.reconnect = reconnect.bind(null, connection);

            connection.updateStatus = updateStatus.bind(null, connection);

            connection.setRecording = function (isRecording) {
                setRecording(connection, isRecording);
            };

            connection.settingsPageLoaded = function () {
                post(START_STREAMING);
            };

            connection.statuses = {
                recording: 'Rec',
                standby: 'Stby'
            };

            return connection;
        }
    };

    function updateStatus(connection) {
        if (!connection.enabled)
            return;

        post(STATUS_REQUEST, function(status) {
            connection.updateIndicator(status.rec);
            iframe.contentWindow.post && iframe.contentWindow.post(status);
        });
    }

    function setRecording(connection, isRecording) {
        console.log("canon recording: " + isRecording);

        post(START_RECORDING, function (msg) {
            console.log('canon: ' + msg);
        });
    }

    function reconnect(connection) {
        post(CANON_URL, loginCallback);
    }

    function loginCallback(result) {
        post(START_STREAMING, startedCallback)
    }

    function startedCallback(result) {
        setInterval(function() {
            imageHolder.attr('src', CURRENT_IMAGE + new Date().getTime());
        }, 500);
    }

    function post(url, callback) {
        j.ajax({url: url, type: 'POST', dataType: 'json', success: callback});
    }
})();