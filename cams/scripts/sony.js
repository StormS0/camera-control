var Sony = (function () {
    return {
        createConnection: function (client, id) {

            var connection = {

                id: id,
                client: client,
                reconnect: reconnect.bind(null, client, id),
                updateStatus: updateStatus.bind(null, client, id),

                setRecording: function (isStart) {
                    setRecording(client, isStart);
                }
            };

            client.onconnect = client.ondisconnect = function (e) {
                sonyConnectionStateHandler(e, connection);
            };

            client.onnotify = function (e) {
                sonyConnectionNotifyHandler(e, connection);
            };

            return connection;
        }
    };

    function reconnect(client, id) {
        if (client.state() === 'disconnected') {
            client.connect();
            updateStatus(client, id);
        }
    }

    function setRecording(client, isStart) {
        if (isStart) {
            client.clip.recorder.Start([], function(response) {});
        } else {
            client.clip.recorder.Stop([], function(response) {});
        }
    }

    function classForStatus(status) {
        if (status == "Recording")
            return 'camerabox-recorded';
        if (status == "Standby")
            return 'camerabox-enabled';
        return 'camerabox-disabled';
    }

    function updateStatus(client, id) {
        var key = "P.Clip.Mediabox.Status";
        var params = {};
        params[key] = null;
        client.property.GetValue({params: params, onresponse: function(resp) {
            resp = JSON.stringify(resp.error || resp.result);
            resp = JSON.parse(resp);
            var classes = document.querySelector("#camerabox_" + id).classList;
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
            setInterval(connection.reconnect, 5000);
            connection.reconnect();
        } else {

        }
    }

})();