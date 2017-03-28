var Sony = (function () {
    return {
        createConnection: function (ip, id) {

            var connection = Connection.create(id);
            connection.camera = Savona.create(ip, 80);
            connection.encoder = Savona.create(ip, 8080);

            connection.updateStatus = updateStatus.bind(null, connection);

            connection.setRecording = function (isRecording) {
                setRecording(connection, isRecording);
            };

            connection.camera.ondisconnect = function (e) {
                sonyConnectionStateHandler(e, connection.camera, connection);
            };

            connection.encoder.ondisconnect = function (e) {
                sonyConnectionStateHandler(e, connection.encoder, connection);
            };

            connection.reconnect = function () {
                connection.camera.reconnect();
                connection.encoder.reconnect();
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

    function sonyConnectionStateHandler(event, client, connection) {
        console.log(event);
        if (event.type != "connected" && connection.enabled) {
            setTimeout(client.reconnect, 5000);
        }
    }

})();