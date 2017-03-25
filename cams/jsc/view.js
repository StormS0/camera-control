/* Copyright CANON INC. 2016 */
var view = {
    viewFlag: null,
    divObj: null,
    imgObj: null,
    timeoutTimerID: null,
    loadTimerID: null,
    retryCnt: null,
    init: function() {
        view.viewFlag = !1;
        view.divObj = document.getElementById("ID1200");
        view.imgObj = new Image;
        view.imgObj.className = "wrap";
        view.imgObj.onload = view.cbLoad;
        view.imgObj.onerror = view.cbLoad;
        view.timeoutTimerID = null;
        view.loadTimerID = null;
        view.retryCnt = 0
    },
    send: function(a) {
        var b;
        view.viewFlag ? (b = {
            cmd: "stop"
        }, 0 === view.retryCnt && (view.stopTimer(), view.divObj.removeChild(view.imgObj))) : b = {
            cmd: "start",
            sz: def.param.viewsize
        };
        common.ajax("http://127.0.0.1:55555/api/cam/lv", {
            params: b,
            callback: view.cbSend,
            async: a,
            abort: view.cbAbort
        })
    },
    cbSend: function(a) {
        switch (a.res) {
            case "ok":
                view.viewFlag ? (view.viewFlag = !1, common.canvasControl.hide(), common.messageBox.review()) : (view.viewFlag = !0, view.divObj.appendChild(view.imgObj), view.load(), common.canvasControl.drawFaceficon(), common.canvasControl.drawOfframe(), common.messageBox.camaraIdClose());
                view.retryCnt = 0;
                break;
            default:
                view.cbAbort()
        }
    },
    cbAbort: function() {
        if (view.viewFlag && view.retryCnt < prop.view.stopretry) view.retryCnt++,
            view.send(!1);
        else {
            if (view.viewFlag) common.canvasControl.hide(), common.messageBox.review(), view.viewFlag = !1;
            view.retryCnt = 0
        }
    },
    stop: function(a) {
        if (view.viewFlag) view.viewFlag = !1, 0 === view.retryCnt && (view.stopTimer(), view.divObj.removeChild(view.imgObj), common.canvasControl.hide(), a && common.messageBox.review())
    },
    load: function() {
        view.stopTimer();
        if (view.viewFlag) {
            var a = new Date,
                a = "?d=" + a.getFullYear() + "-" + ("00" + (a.getMonth() + 1)).slice(-2) + "-" + ("00" + a.getDate()).slice(-2) + "T" + ("00" + a.getHours()).slice(-2) +
                ":" + ("00" + a.getMinutes()).slice(-2) + ":" + ("00" + a.getSeconds()).slice(-2) + ("000" + a.getMilliseconds()).slice(-3);
            view.timeoutTimerID = setTimeout(view.cbLoad, prop.view.timeout);
            view.imgObj.src = "http://127.0.0.1:55555/api/cam/lvgetimg" + a
        }
    },
    cbLoad: function() {
        view.stopTimer();
        if (view.viewFlag) view.loadTimerID = setTimeout(view.load, prop.view.interval)
    },
    stopTimer: function() {
        clearTimeout(view.timeoutTimerID);
        view.timeoutTimerID = null;
        clearTimeout(view.loadTimerID);
        view.loadTimerID = null
    }
};
