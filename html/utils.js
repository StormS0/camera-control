function getFrameElement(frameId, selector) {
    return document
        .getElementById(frameId)
        .contentDocument
        .querySelector(selector);
}

function forEachSelector(selector, func) {
    Array.prototype.forEach.call(
        document.querySelectorAll(selector),
        func
    );
}

function request(url, handler, isPost) {
    var xhr = new XMLHttpRequest();
    xhr.open(isPost ? 'POST' : 'GET', url, true);
    xhr.onreadystatechange = onReadyStateChange;
    xhr.send();

    function onReadyStateChange() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            handler(xhr.responseText);
        }
    }
}

function parseDate(dateString) {
    var d = dateString.split(" ").join(".").split(":").join(".").split('.');
    return new Date(d[2], d[1] - 1, d[0], d[3], d[4]);
}