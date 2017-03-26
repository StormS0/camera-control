var Canon = (function () {

    var enabled = false;

    return {
        createConnection: function () {
            return {
                id: "canon",
                reconnect: reconnect,
                setRecording: setRecording
            };
        }
    };

    function setRecording() {
        if (!enabled) return;

        j.ajax({
            type: "GET",
            url: "http://127.0.0.1:55555/api/cam/rec?cmd=trig",
            dataType: 'json',
            success: function (msg) {
                console.log(msg);
            }
        });
    }

    function reconnect() {
        console.log("reconnect canon");
        if (!enabled) return;

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