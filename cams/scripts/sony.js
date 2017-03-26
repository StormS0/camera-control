var Sony = (function () {
    return {
        createConnection: function (client, id) {

            var connection = {id: id, client: client};
            connection.reconnect = reconnect.bind(null, connection);
            connection.updateStatus = updateStatus.bind(null, connection);

            connection.setRecording = function (isRecording) {
                setRecording(connection, isRecording);
            };

            client.onconnect = client.ondisconnect = function (e) {
                sonyConnectionStateHandler(e, connection);
            };

            client.onnotify = function (e) {
                sonyConnectionNotifyHandler(e, connection);
            };

            initSettings(connection);
            connection.reconnect();

            return connection;
        }
    };

    function reconnect(connection) {
        if (connection.client.state() === 'disconnected') {
            connection.client.connect();
            updateStatus(connection);
        }
    }

    function setRecording(connection, isRecording) {
        if (!connection.enabled) {
            return;
        }
        console.log(connection.id + " recording: " + isRecording);
        if (isRecording) {
            connection.client.clip.recorder.Start([], function(response) {});
        } else {
            connection.client.clip.recorder.Stop([], function(response) {});
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
        connection.client.property.GetValue({params: params, onresponse: function(resp) {
            resp = JSON.stringify(resp.error || resp.result);
            resp = JSON.parse(resp);
            var classes = document.querySelector("#camerabox_" + connection.id).classList;
            classes.remove('camerabox-recorded');
            classes.remove('camerabox-enabled');
            classes.remove('camerabox-disabled');
            classes.add(classForStatus(resp[key]));
        }});
    }

    function sonyConnectionNotifyHandler(event, connection) {
        var jsonstring  = JSON.stringify(event.data);
        var objArrItems = JSON.parse(jsonstring)[0];
        if (event.name == "Notify.Property.Value.Changed") {

        } else if (event.name == "Notify.Property.Status.Changed") {

        } else {

        }

        console.log("event " + event.name + " from " + connection.id);
    }

    function sonyConnectionStateHandler(event, connection) {

        console.log(event);
        console.log("state from " + connection.id);

        if (event.type != "connected") { // was ==
            // setInterval(connection.reconnect, 5000);
            connection.reconnect();
        } else {

        }
    }

})();