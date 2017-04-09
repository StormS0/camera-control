var Sony = (function () {
    return {
        createConnection: function (ip, id) {

            var connection = Connection.create(id, ip);

            connection.camera = Savona.create(ip, 80);

            connection.updateStatus = updateStatus.bind(null, connection);

            connection.setRecording = function (isRecording) {
                setRecording(connection, isRecording);
            };

            connection.camera.ondisconnect = function (e) {
                sonyConnectionStateHandler(e, connection);
            };

            connection.reconnect = function () {
                if (!offline)
                connection.camera.reconnect();
            };

            connection.disconnect = function () {
                connection.camera.disconnect();
            };

            if (connection.enabled) {
                connection.reconnect();
            }

            connection.updateStatus();

            return connection;
        }
    };

    function setRecording(connection, isRecording) {
        if (!connection.enabled) {
            return;
        }
        console.log(connection.id + " recording: " + isRecording);
        if (isRecording) {
            connection.camera.clip.recorder.Start([], function(response) {});
        } else {
            connection.camera.clip.recorder.Stop([], function(response) {});
        }
    }

    function classForStatus(status) {
        if (status == "Recording")
            return 'camerabox-recorded';
        if (status == "Standby")
            return 'camerabox-enabled';
        return 'camerabox-disabled';
    }

    function updateStatus(connection) {
        if (!connection.enabled || offline)
            return;

        var key = "P.Clip.Mediabox.Status";
        var params = {};
        params[key] = null;
        connection.camera.property.GetValue({params: params, onresponse: function(resp) {
            resp = JSON.stringify(resp.error || resp.result);
            resp = JSON.parse(resp);
            var classes = document.querySelector("#camerabox_" + connection.id).classList;
            classes.remove('camerabox-recorded');
            classes.remove('camerabox-enabled');
            classes.remove('camerabox-disabled');
            classes.add(classForStatus(resp[key]));
        }});
    }

    function sonyConnectionStateHandler(event, connection) {
        console.log(event);
        if (event.type != "connected" && connection.enabled) {
            setTimeout(connection.reconnect, 5000);
        }
    }

})();