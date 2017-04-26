var Canon = (function () {

    var j = jQuery.noConflict();

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
        j.ajax({
            type: "GET",
            url: "http://127.0.0.1:55555/api/cam/rec?cmd=trig",
            dataType: 'json',
            success: function (msg) {
                console.log(msg);
            }
        });
    }

    function reconnect(connection) {

        if (!connection.enabled || offline)
            return;

        post('http://127.0.0.1:55555', loginCallback);

        function loginCallback(result) {
            console.log(result);
            post("http://127.0.0.1:55555/api/cam/lv?cmd=start&sz=l", startedCallback)
        }

        function startedCallback(result) {
            console.log(result);

            imageUpdateInterval = setInterval(function() {
                j('#liveview').attr('src', 'http://127.0.0.1:55555/api/cam/lvgetimg?time=' + new Date().getTime());
            }, 1000);
        }

    }

    function post(url, callback) {
        j.ajax({
            url: url,
            type: 'POST',
            async: false,
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: callback
        });
    }

})();