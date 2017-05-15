var Sony = (function () {
    return {
        createConnection: function (ip, id) {

            var connection = Connection.create(id, ip, 'http://' + ip + ':8080/');

            connection.camera = Savona.create(ip, 80);

            connection.updateStatus = updateStatus.bind(null, connection);

            connection.setRecording = function (isRecording) {
                setRecording(connection, isRecording);
            };

            connection.camera.ondisconnect = function (e) {
                sonyConnectionStateHandler(e, connection);
            };

            connection.reconnect = function () {
                connection.camera.reconnect();
            };

            connection.disconnect = function () {
                connection.camera.disconnect();
            };

            connection.statuses = {
                recording: 'Recording',
                standby: 'Standby'
            };

            return connection;
        }
    };

    function setRecording(connection, isRecording) {
        console.log(connection.id + " recording: " + isRecording);
        if (isRecording) {
            connection.camera.clip.recorder.Start([], function(response) {});
        } else {
            connection.camera.clip.recorder.Stop([], function(response) {});
        }
    }

    function updateStatus(connection) {
        var key = "P.Clip.Mediabox.Status";
        var params = {};
        params[key] = null;
        connection.camera.property.GetValue({params: params, onresponse: function(resp) {
            resp = JSON.stringify(resp.error || resp.result);
            resp = JSON.parse(resp);
            connection.updateIndicator(resp[key]);
        }});
    }

    function sonyConnectionStateHandler(event, connection) {
        if (event.type != "connected" && connection.enabled) {
            setTimeout(connection.reconnect, 5000);
        }
    }

})();