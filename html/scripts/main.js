
var debugMode = window.location.search.indexOf('debug') > 0;

(function() {
    var connections = [
        Sony.createConnection("192.168.111.41", "sony1"),
        Sony.createConnection("192.168.111.42", "sony2"),
        Canon.createConnection()
    ];

    Scheme.init();
    var recordButton = document.querySelector("#button_record");
    recordButton.onclick = toggleRecording;
    document.querySelector("#button_map").onclick = toggleHidden.bind(null, ['#cameras', '#scheme']);
    document.querySelector("#button_settings").onclick = toggleHidden.bind(null, ['.control_cameras']);

    forEachSelector('.camerabox', initCamerabox);
    setInterval(update, debugMode ? 10000: 1000);

    connections.forEach(function (conn) {
        if (conn.enabled) conn.reconnect();
    });

    var canonVideo = document.querySelector('#camerabox_canon').querySelector('.camerabox_inner');
    canonVideo.addEventListener('dblclick', function () {
        canonVideo.classList.toggle('full_screen');
    }, false);



    function initCamerabox(box) {
        var settingsButton = box.querySelector('.camerabox_title__right-settings');
        if (!settingsButton) return;
        settingsButton.title = 'Настройки';
        settingsButton.onclick = function() {
            var settings = document.querySelector('.settings_page');
            var hidden = settings.classList.contains('hidden');
            var settingsPageElements = ['.camerabox-stub', '#buttons_mask', '.settings_page', '#' + box.id];
            var camerasPageElements = [];
            connections.forEach(function (connection) {
                if (connection.enabled) camerasPageElements.push('#camerabox_' + connection.id);
            });

            hideAll(hidden ? camerasPageElements : settingsPageElements);
            showAll(hidden ? settingsPageElements : camerasPageElements);

            document.querySelector('.control_cameras').classList.add('hidden');

            setupIframe(hidden, box, settingsButton);
        };
    }

    function setupIframe(hidden, box, settingsButton) {
        var iframe = document.querySelector('iframe');
        if (hidden) {
            iframe.onload = function () {
                setTimeout(box.connection.settingsPageLoaded, 1000);
            };
            iframe.src = box.settingsPageUrl;
            settingsButton.classList.add('activated');
            settingsButton.title = 'Закрыть настройки';
            box.connection.settingsOpened(box);
        } else {
            iframe.onload = function () {
            };
            iframe.src = 'settings.html';
            settingsButton.classList.remove('activated');
            settingsButton.title = 'Настройки';
            box.connection.settingsClosed(box);
        }
    }

    function update() {
        connections.forEach(function (conn) {
            if (conn.enabled) conn.updateStatus();
        });
        Scheme.update();
    }

    function toggleRecording() {
        var recording = !this.classList.contains('active');
        connections.forEach(function (conn) {
            if (conn.enabled) conn.setRecording(recording);
        });
    }

    function toggleHidden(selectors) {
        applyClassForSelectors(selectors, 'hidden', 'toggle');
    }

    function hideAll(selectors) {
        applyClassForSelectors(selectors, 'hidden', 'add');
    }

    function showAll(selectors) {
        applyClassForSelectors(selectors, 'hidden', 'remove')
    }

    function applyClassForSelectors(selectors, className, action) {
        selectors.forEach(function (selector) {
            forEachSelector(selector, function (node) {
                node.classList[action](className);
            });
        });
    }

    function forEachSelector(selector, func) {
        Array.prototype.forEach.call(document.querySelectorAll(selector), func);
    }

})();

