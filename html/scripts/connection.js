var Connection = (function () {

    return {
        create: function (id) {
            var connection = {id: id};
            initSettings(connection);
            return connection;
        }
    };

    function initSettings (connection) {
        var key = "camera-" + connection.id + "-state";
        var state = localStorage.getItem(key);
        var toggle = document.querySelector(".control_cameras__link." + connection.id);
        var camera = document.querySelector("#camerabox_" + connection.id);

        change(state != 'disabled');

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
