var Connection = (function () {

    return {
        create: function (id, ip, settingsPageUrl) {
            var recordButton = document.querySelector("#button_record");

            var connection = {
                id: id, settingsPageUrl: settingsPageUrl,
                indicator: document.querySelector("#camerabox_" + id),
                updateIndicator: updateIndicator,
                settingsOpened: stub.bind(null, 'settingsOpened'),
                settingsClosed: stub.bind(null, 'settingsClosed')
            };

            initSettings(connection);

            return connection;

            function updateIndicator(status) {
                var classes = connection.indicator.classList;
                classes.remove('camerabox-recorded');
                classes.remove('camerabox-enabled');
                classes.remove('camerabox-disabled');
                var statusClass = classForStatus(status);
                classes.add(statusClass);

                var classList = recordButton.classList;
                if ('camerabox-recorded' === statusClass) {
                    classList.add(connection.id);
                } else {
                    classList.remove(connection.id);
                }

                if (!classList.contains('sony1') &&
                    !classList.contains('sony2') &&
                    !classList.contains('canon')) {

                    classList.remove('active');
                    recordButton.innerHTML = 'Старт';
                }else {
                    recordButton.innerHTML = 'Стоп';
                    classList.add('active');
                }
            }

            function classForStatus(status) {
                if (status === connection.statuses.recording)
                    return 'camerabox-recorded';
                if (status === connection.statuses.standby)
                    return 'camerabox-enabled';
                return 'camerabox-disabled';
            }
        }
    };

    function stub(name) {
        console.log(name + ' must be implemented in concrete connection script');
    }

    function initSettings (connection) {
        var key = "camera-" + connection.id + "-state";
        var state = localStorage.getItem(key);
        var toggle = document.querySelector(".control_cameras__link." + connection.id);
        var camera = document.querySelector("#camerabox_" + connection.id);
        camera.connection = connection;
        camera.settingsPageUrl = connection.settingsPageUrl;

        change(!(state === 'disabled'));

        toggle.onclick = function () {
            var newState = !toggle.classList.contains('enabled');
            change(newState);
            localStorage.setItem(key, newState ? 'enabled' : 'disabled');
        };

        function change(newState) {
            connection.enabled = newState;

            if (newState) {
                toggle.classList.add('enabled');
                camera.classList.remove('hidden');
                connection.reconnect && connection.reconnect();
            } else {
                toggle.classList.remove('enabled');
                camera.classList.add('hidden');
                connection.disconnect && connection.disconnect();
            }
        }
    }

})();
