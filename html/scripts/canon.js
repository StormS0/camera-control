var Canon = (function () {

    var CANON_URL = 'http://127.0.0.1:55555';
    var SETTINGS_PAGE = CANON_URL + '/wpd/VLAX01/rc/advanced.htm';

    var API = CANON_URL + '/api/cam/';
    var START_RECORDING = API + 'rec?cmd=trig';
    var START_STREAMING = API + 'lv?cmd=start&sz=l';
    var STATUS_REQUEST = API + 'getcurprop?seq=4';
    var CURRENT_IMAGE = API + 'lvgetimg?time=';

    var j = jQuery.noConflict();
    var imageHolder = j('#liveview');

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
        console.log(result);
        post(START_STREAMING, startedCallback)
    }

    function startedCallback(result) {
        console.log(result);

        setInterval(function() {
            imageHolder.attr('src', CURRENT_IMAGE + new Date().getTime());
        }, 200);
    }

    function post(url, callback) {
        j.ajax({url: url, type: 'POST', dataType: 'json', success: callback});
    }
})();