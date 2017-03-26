var Sony = (function () {
    return {
        createConnection: function (client, id) {

            var connection = {

                id: id,

                client: client,

                reconnect: function () {
                    console.log("reconnect " + id);
                    if (client.state() === 'disconnected') {
                        client.connect();
                    }
                },

                setRecording: function (isStart) {
                    if (isStart) {
                        client.clip.recorder.Start([], function(response) {});
                    } else {
                        client.clip.recorder.Stop([], function(response) {});
                    }
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