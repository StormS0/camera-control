var state = document.querySelector('#state');

var frames = ['cam1_80', 'cam1_8080', 'cam2_80', 'cam2_8080'];
frames.forEach(listenFrameLoad);

var loaded = [];

syncButtons('start', 80, 'DIV_REC_START', start);
syncButtons('stop', 80, 'DIV_REC_STOP', stop);

syncState('cam1_state', 'cam1_80', 'DIV_REC_STOP');
syncState('cam2_state', 'cam2_80', 'DIV_REC_STOP');

forEachSelector('circle', initCircle);

setInterval(update, 3000);

forEachSelector('.tab', initTab);

function initTab(tab) {
    tab.onclick = function () {
        forEachSelector('.page', function (p) {
            p.classList.add('hidden')
        });

        var id = tab.id.split("_")[1];
        var page = document.querySelector("#page_" + id);
        page.classList.remove('hidden')
    };
}



function update() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/status', true);
    xhr.onreadystatechange = onReply;
    xhr.send();

    function onReply() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var lines = xhr.responseText.split('\n');
            var dateString = lines[0] + lines[1];

           if (diff(dateString, new Date()) > 120000) { // 2 min
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
    title.innerHTML = circle.getAttribute('title') + " "+ circle.getAttribute('ip');
    circle.appendChild(title);
}

function diff(dateString, date) {
    var d = dateString.split(" ").join(".").split(":").join(".").split('.');
    return date.getTime() - new Date(d[2], d[1] - 1, d[0], d[3], d[4]).getTime();
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

function syncButtons(sourceId, framePort, targetId, func) {
    document.getElementById(sourceId).onclick = function () {
        getButtons(framePort, '#' + targetId).forEach(func);
    };
}

function syncState(sourceId, frameId, targetId) {
    var elem = getFrameElement(frameId, '#' + targetId);
    if (elem) {
        document.getElementById(sourceId).innerHTML = elem.innerHTML;
    }
}

function start(btn) {
    console.log("start " + btn);
    click(btn);
}

function stop(btn) {
    console.log("stop " + btn);
    click(btn);
}

function click(btn) {
    if (btn) {
        btn.click();
    }
}

function getButtons(port, selector) {
    return [
        getFrameElement('cam1_' + port, selector),
        getFrameElement('cam2_' + port, selector)
    ];
}

function getFrameElement(frameId, selector) {
    return document.getElementById(frameId).contentDocument.querySelector(selector);
}

function updateState() {
    state.innerHTML = loaded;
}

function listenFrameLoad(frameId) {
    document.getElementById(frameId).addEventListener('load', function () {
        loaded.push(frameId);
        updateState();
    });
}
