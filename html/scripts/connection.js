var Connection = (function () {

    return {
        create: function (id, ip, settingsPageUrl) {

            var connection = {
                id: id,
                settingsPageUrl: settingsPageUrl,
                indicator: document.querySelector("#camerabox_" + id),
                updateIndicator: updateIndicator,
                openSettings: function () {}
            };

            initSettings(connection);

            return connection;

            function updateIndicator(status) {
                var classes = connection.indicator.classList;
                classes.remove('camerabox-recorded');
                classes.remove('camerabox-enabled');
                classes.remove('camerabox-disabled');
                classes.add(classForStatus(status))
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
