var Sony = (function () {
    return {
        createConnection: function (client, id) {

            var connection = {

                id: id,
                client: client,
                reconnect: reconnect.bind(null, client),
                updateStatus: updateStatus.bind(null, client),

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

    function reconnect(client) {
        if (client.state() === 'disconnected') {
            client.connect();
            updateStatus(client);
        }
    }

    function setRecording(client, isStart) {
        if (isStart) {
            client.clip.recorder.Start([], function(response) {});
        } else {
            client.clip.recorder.Stop([], function(response) {});
        }
    }

    function updateStatus(client) {
        client.property.GetValue({params: {
            "P.Clip.Mediabox.Status": null,
            "P.Clip.Mediabox.TimeCode": null
        }, onresponse: function(resp) {
            resp = JSON.stringify(resp.error || resp.result);
            resp = JSON.parse(resp);
            console.log(resp);
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