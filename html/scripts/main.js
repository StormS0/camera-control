// global scope variables
var debugMode = false;

(function() {

    var connections = [
        Sony.createConnection("192.168.111.41", "sony1")
         , Sony.createConnection("192.168.111.42", "sony2")
         , Canon.createConnection()
    ];

    initButtons();
    forEachSelector('circle', initCircle);
    setInterval(update, 1000);

    function initButtons() {
        document.querySelector("#button_record").onclick = toggleRecording;
        document.querySelector("#button_map").onclick = toggleHidden.bind(null, ['#cameras', '#scheme']);
        document.querySelector("#button_settings").onclick = toggleHidden.bind(null, ['.control_cameras']);
    }

    function update() {
        connections.forEach(function (conn) {
            conn.updateStatus();
        });
        updateScheme();
    }

    function toggleRecording() {
        this.classList.toggle('active');
        var recording = this.classList.contains('active');
        connections.forEach(function (conn) {
            conn.setRecording(recording);
        });
    }

    function toggleHidden(selectors) {
        selectors.forEach(function (selector) {
            document.querySelector(selector).classList.toggle('hidden');
        });
    }

    function updateScheme() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/status', true);
        xhr.onreadystatechange = onReply;
        xhr.send();

        function onReply() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var lines = xhr.responseText.split('\n');
                var statusDate = parseDate(lines[0] + lines[1]);

                var delta = new Date().getTime() - statusDate.getTime();

                if (delta > 120000) { // 2 min
                    console.log("outdated");
                    return;
                }

                handleStatusResponse(lines.filter(function (el, i) {
                    return i > 7 && i < lines.length - 6;
                }));
            }
        }
    }

    function initCircle(circle) {
        var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
        title.innerHTML = circle.getAttribute('title') + " " + circle.getAttribute('ip');
        circle.appendChild(title);
    }

    function diffInSeconds(dateString, date1) {
        var deltaInMs = date1.getTime() - parseDate(dateString).getTime();
        return deltaInMs / 1000;
    }

    function parseDate(dateString) {
        var d = dateString.split(" ").join(".").split(":").join(".").split('.');
        return new Date(d[2], d[1] - 1, d[0], d[3], d[4]);
    }

    function forEachSelector(selector, func) {
        Array.prototype.forEach.call(
            document.querySelectorAll(selector),
            func
        );
    }

    function handleStatusResponse(lines) {
        var status = document.querySelector('#status');
        status.innerHTML = "";

        forEachSelector('circle', function (circle) {
            var ip = circle.getAttribute('ip');
            lines.forEach(handleLine);

            function handleLine(line) {
                if (line.split(": ")[0].split(ip)[1] == "") {
                    circle.setAttribute('fill', line.indexOf('Reply') > -1 ? 'green' : 'red');
                }
            }
        });

        lines.forEach(function (line) {
            status.innerHTML += line + '<br>';
        });
    }
})();