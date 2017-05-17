
var debugMode = window.location.search.indexOf('debug') > 0;
var pollingInterval = debugMode ? 10000: 1000;

window.applyClassForSelectors = function (selectors, className, action) {
    selectors.forEach(function (selector) {
        forEachSelector(selector, function (node) {
            node.classList[action](className);
        })
    });
};

window.forEachSelector = function (selector, func) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), func);
};

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

    forEachSelector('.camerabox', function(box) {
        var settingsButton = box.querySelector('.camerabox_title__right-settings');
        settingsButton.title = 'Настройки';
        settingsButton.onclick = function() {

            var camerasPageElements = ['#buttons'];
            connections.forEach(function (connection) {
                if (connection.enabled) {
                    camerasPageElements.push('#camerabox_' + connection.id);
                }
            });

            var settingsPageElements = ['.settings_page', '#' + box.id];

            var settings = document.querySelector('.settings_page');
            var hidden = settings.classList.contains('hidden');
            hideAll(hidden ? camerasPageElements : settingsPageElements);
            showAll(hidden ? settingsPageElements : camerasPageElements);

            var iframe = settings.querySelector('iframe');
            if (hidden) {
                iframe.onload = function() {
                    setTimeout(box.connection.settingsPageLoaded, 1000);
                };
                iframe.src = box.settingsPageUrl;
                settingsButton.classList.add('activated');
                settingsButton.title = 'Закрыть настройки';
                box.connection.settingsOpened(box);
            } else {
                iframe.onload = function(){};
                iframe.src = 'settings.html';
                settingsButton.classList.remove('activated');
                settingsButton.title = 'Настройки';
                box.connection.settingsClosed(box);
            }
        };
    });

    connections.forEach(function (conn) {
        if (conn.enabled) conn.reconnect();
    });


    var canonVideo = document.querySelector('#camerabox_canon').querySelector('.camerabox_inner');
    canonVideo.addEventListener('dblclick', function () {
        canonVideo.classList.toggle('full_screen');
    }, false);


    setInterval(update, pollingInterval);

    function update() {
        connections.forEach(function (conn) {
            if (conn.enabled) conn.updateStatus();
        });
        Scheme.update();
    }

    function toggleRecording() {
        //this.classList.toggle('active');
        var recording = !this.classList.contains('active');
        connections.forEach(function (conn) {
            if (conn.enabled) conn.setRecording(recording);
        });
       // recordButton.innerHTML = recording ? 'Стоп' : 'Старт';
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

})();

