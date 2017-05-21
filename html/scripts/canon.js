var Canon = (function () {

    var CANON_URL = 'http://127.0.0.1:55555';
    var SETTINGS_PAGE = 'canon.html'; //CANON_URL + '/wpd/VLAX01/rc/advanced.htm';

    var API = CANON_URL + '/api/cam/';
    var START_RECORDING = API + 'rec?cmd=trig';
    var START_STREAMING = API + 'lv?cmd=start&sz=l';
    var STATUS_REQUEST = API + 'getcurprop?seq=';
    var CURRENT_IMAGE = API + 'lvgetimg?time=';

    var j = jQuery.noConflict();
    var imageHolder = j('#liveview');
    var iframe = document.querySelector('iframe');

    return {
        createConnection: function () {
            var connection = Connection.create("canon", CANON_URL, SETTINGS_PAGE);
            connection.reconnect = post.bind(null, CANON_URL, loginCallback);
            connection.updateStatus = updateStatus.bind(null, connection);
            // connection.settingsPageLoaded = post.bind(null, START_STREAMING);
            connection.statuses = {recording: 'Rec', standby: 'Stby'};
            connection.sequenceValue = 0;
            connection.setRecording = function (isRecording) {
                setRecording(connection, isRecording);
            };
            return connection;
        }
    };

    function updateStatus(connection) {
        if (!connection.enabled) return;
        post(STATUS_REQUEST + connection.sequenceValue, function(status) {
            if (!connection.summary) {
                connection.summary = status;
            }
            connection.sequenceValue = status.seq;
            j.extend(connection.summary, status);
            connection.updateIndicator(connection.summary.rec);
            iframe.contentWindow.post && iframe.contentWindow.post(connection.summary);
        });
    }

    function setRecording(connection, isRecording) {
        console.log("canon recording: " + isRecording);
        post(START_RECORDING);
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