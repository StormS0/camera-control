var Sony = (function () {

    var baseWidth = 509;
    var baseHeight = 287;

    return {
        createConnection: function (ip, id) {
            var a = document.querySelector('#camerabox_' + id).querySelector('a');
            var videoframe = document.querySelector('#camerabox_' + id).querySelector('embed');
            var connection = Connection.create(id, ip, 'http://' + ip + ':80/rms.html');

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

            connection.settingsOpened = function () {
                videoframe.width = baseWidth * 1.5;
                videoframe.height = baseHeight * 1.5;
                a.classList.add('a_large');
            };

            connection.settingsClosed = function () {
                videoframe.width = baseWidth;
                videoframe.height = baseHeight;
                a.classList.remove('a_large');
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