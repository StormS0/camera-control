var Canon = (function () {

    var CANON_URL = 'http://127.0.0.1:55555';
    var START_RECORDING = CANON_URL + '/api/cam/rec?cmd=trig';
    var START_STREAMING = CANON_URL + '/api/cam/lv?cmd=start&sz=l';
    var CURRENT_IMAGE ='http://127.0.0.1:55555/api/cam/lvgetimg?time=';

    var j = jQuery.noConflict();
    var imageHolder = j('#liveview');
    var imageUpdateInterval;

    return {
        createConnection: function () {
            var connection = Connection.create("canon", "127.0.0.1");
            connection.reconnect = reconnect.bind(null, connection);
            connection.updateStatus = updateStatus.bind(null, connection);
            connection.setRecording = function (isRecording) {
                setRecording(connection, isRecording);
            };
            connection.reconnect();
            return connection;
        }
    };

    function updateStatus(connection) {
        if (!connection.enabled || offline)
            return;


    }

    function setRecording(connection, isRecording) {
        if (!connection.enabled) {
            return;
        }
        console.log("canon recording: " + isRecording);
        post(START_RECORDING, function (msg) {
            console.log(msg);
        });

    }

    function reconnect(connection) {
        if (!connection.enabled || offline)
            return;
        post(CANON_URL, loginCallback);
    }

    function loginCallback(result) {
        console.log(result);
        post(START_STREAMING, startedCallback)
    }

    function startedCallback(result) {
        console.log(result);

        imageUpdateInterval = setInterval(function() {
            imageHolder.attr('src', CURRENT_IMAGE + new Date().getTime());
        }, debugMode ? 10000 : 1000);
    }

    function post(url, callback) {
        j.ajax({url: url, type: 'POST', dataType: 'json', success: callback});
    }
})();