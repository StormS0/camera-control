var Canon = (function () {

    return {
        createConnection: function () {
            var connection = Connection.create("canon");
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
        if (!connection.enabled)
            return;

        var xhr = post('http://127.0.0.1:55555');

        if (xhr.status == 200) {
            console.log(xhr.responseText);
            return;
        }
        console.log(xhr.status + ': ' + xhr.statusText);

        var xhr_two = post("http://127.0.0.1:55555/api/cam/lv?cmd=start&sz=l");
        if (xhr_two.status == 200) {
            console.log(xhr_two.responseText);
            return;
        }

        // j('#ID1258').click();
        console.log(xhr_two.status + ': ' + xhr_two.statusText);

        // var interRand = 0;
        // var viewSpeed = 200;
        // setInterval(function() {
        //     interRand = Math.random();
        //     j('#ID1200').delay(viewSpeed).css('backgroundImage', 'url(http://127.0.0.1:55555/api/cam/lvgetimg?baba=' + interRand + ')');
        //     j('#liveview').attr('src', 'http://127.0.0.1:55555/api/cam/lvgetimg?baba=' + interRand);
        // }, viewSpeed)
    }

    function post(url) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open('POST', url, true); /// было true ???
        xhr.send();
        return xhr;
    }

})();