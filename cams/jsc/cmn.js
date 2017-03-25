/* Copyright CANON INC. 2016 */
var BrowserType = {
        IE: "IE",
        SAFARI: "SAFARI",
        FIREFOX: "FIREFOX",
        MOBILE_SAFARI: "MOBILE_SAFARI",
        TABLET_SAFARI: "TABLET_SAFARI",
        ANDROID: "ANDROID",
        ANDROID_TAB: "ANDROID_TAB",
        UNKNOWN: "UNKNOWN"
    },
    ProductId = {
        VKCX00: "VKCX00",
        VKIX00: "VKIX00",
        VLAX00: "VLAX00",
        VLAX01: "VLAX01",
        VLBX00: "VLBX00",
        VLDX00: "VLDX00",
        VKDX00: "VKDX00"
    },
    LangSelId = ["VKIX00", "VLAX00", "VLAX01", "VMFX00"],
    URI_LOGIN = "http://127.0.0.1:55555/api/acnt/login",
    URI_DEV = "http://127.0.0.1:55555/api/sys/getdevinfo",
    URI_STG = "http://127.0.0.1:55555/api/cds/getstginfo",
    URI_OBJ = "http://127.0.0.1:55555/api/cds/getobjinfo",
    URI_GCI = "http://127.0.0.1:55555/api/cds/getchildinfo",
    URI_GOBJ = "http://127.0.0.1:55555/api/cds/getobj",
    URI_STLNG = "http://127.0.0.1:55555/api/cds/setlang",
    apiMap = {
        AcntLogin: {
            uri: URI_LOGIN,
            type: "get",
            params: {},
            returns: "res"
        },
        GetDeviceInfo: {
            uri: URI_DEV,
            type: "get",
            params: {},
            returns: ["modelName", "manufacturer", "serialNum", "lang", "mode", "productId"]
        },
        GetStorageInfo: {
            uri: URI_STG,
            type: "get",
            params: {},
            returns: ["stgCnt", "stgInfo"]
        },
        GetChildInfo: {
            uri: URI_GCI,
            type: "get",
            params: {
                stgId: "",
                objId: "",
                startIdx: "",
                max: "",
                sort: "",
                startObjId: ""
            },
            returns: ["res", "matches", "objCnt", "startNum", "objInfo"]
        },
        SetLanguage: {
            uri: URI_STLNG,
            type: "get",
            params: {
                lang: ""
            },
            returns: "res"
        }
    },
    prop = {
        ajax: {},
        retry: {},
        thumb: {},
        viewer: {}
    };
prop.ajax.TIMEOUT = 3E4;
prop.retry.INTERVAL = 1E3;

function baseCommon() {}
baseCommon.prototype = {
    isBasicAuth: function(a) {
        return a == ProductId.VKIX00 || a == ProductId.VLAX00 || a == ProductId.VLBX00 || a == ProductId.VLDX00 ? !1 : !0
    },
    get: function(a) {
        if ("string" == typeof a) return document.getElementById(a);
        else if ("object" == typeof a) return a
    },
    getChilds: function(a, c) {
        for (var b = common.get(a).childNodes, d = [], h = 0, i = b.length; h < i; h++) b[h].tagName == c.toUpperCase() && d.push(b[h]);
        return d
    },
    getChildById: function(a, c) {
        for (var b = a.firstChild; null !== b; b = b.nextSibling)
            if (b.id == c) return b;
            else {
                var d = arguments.callee(b,
                    c);
                if (d) return d
            }
    },
    removeElement: function(a) {
        a = common.get(a);
        a.parentNode.removeChild(a)
    },
    removeAllChild: function(a) {
        for (; a.firstChild;) a.removeChild(a.firstChild)
    },
    isShow: function(a) {
        a = common.get(a);
        a = common.getCssStyle(a);
        return "hidden" != a.visibility && "none" != a.display
    },
    show: function(a) {
        a = common.get(a);
        a.style.visibility = "visible";
        a.style.display = "block"
    },
    hide: function(a) {
        a = common.get(a);
        a.style.visibility = "hidden";
        a.style.display = "none"
    },
    getCssStyle: function(a) {
        return a.currentStyle || document.defaultView.getComputedStyle(a,
            null)
    },
    getSize: function(a, c) {
        var b = common.get(a);
        return parseInt(common.getCssStyle(b)[c], 10)
    },
    setSize: function(a, c, b) {
        a = common.get(a);
        b = Math.ceil(parseInt(b, 10)) + "px";
        a.style[c] = b
    },
    getInnerWidth: function() {
        if (window.innerWidth) return window.innerWidth;
        else if (document.documentElement && 0 !== document.documentElement.clientWidth) return document.documentElement.clientWidth;
        else if (document.body) return document.body.clientWidth;
        return 0
    },
    getInnerHeight: function() {
        if (window.innerHeight) return window.innerHeight;
        else if (document.documentElement && 0 !== document.documentElement.clientHeight) return document.documentElement.clientHeight;
        else if (document.body) return document.body.clientHeight;
        return 0
    },
    getPosition: function(a) {
        for (var c = 0, b = 0; a;) c += a.offsetLeft, b += a.offsetTop, a = a.offsetParent;
        return {
            x: c,
            y: b
        }
    },
    getMousePosition: function(a) {
        return a.touches ? (a = a.touches[0], {
            x: a.pageX || 0,
            y: a.pageY || 0
        }) : {
            x: a.clientX || 0,
            y: a.clientY || 0
        }
    },
    px: function(a, c) {
        var b;
        b = BrowserType.IE == common.Browser ? a.currentStyle[c] : document.defaultView.getComputedStyle(a,
            null).getPropertyValue(c);
        return Math.ceil(parseInt(b, 10))
    },
    getEvent: function(a) {
        return window.event || a
    },
    getEventSrc: function(a) {
        return a.srcElement || a.target
    },
    addEvent: function(a, c, b, d) {
        if (a.addEventListener) return a.addEventListener(c, b, d), !0;
        else if (a.attachEvent) return a.attachEvent("on" + c, b), !0;
        return !1
    },
    removeEvent: function(a, c, b, d) {
        a.removeEventListener ? a.removeEventListener(c, b, d) : a.detachEvent && a.detachEvent("on" + c, b)
    },
    stopEvent: function(a) {
        a.cancelBubble = !0;
        a.returnValue = !1
    },
    addChangeImageEvent: function(a,
        c, b) {
        common.isTouchBrowser() ? (common.addEvent(a, "touchstart", c, b), common.addEvent(a, "touchmove", c, b), common.addEvent(a, "touchend", c, b)) : (common.addEvent(a, "mousedown", c, b), common.addEvent(a, "mouseout", c, b));
        common.addEvent(a, "click", c, b)
    },
    removeChangeImageEvent: function(a, c, b) {
        common.isTouchBrowser() ? (common.removeEvent(a, "touchstart", c, b), common.removeEvent(a, "touchmove", c, b), common.removeEvent(a, "touchend", c, b)) : (common.removeEvent(a, "mousedown", c, b), common.removeEvent(a, "mouseout", c, b));
        common.removeEvent(a,
            "click", c, b)
    },
    trim: function(a) {
        for (; a.match(/^ +/) || a.match(/^\t+/) || a.match(/^\n+/) || a.match(/^\r+/);) a = a.replace(/^ +/g, ""), a = a.replace(/^\t+/g, ""), a = a.replace(/^\n+/g, ""), a = a.replace(/^\r+/g, "");
        for (; a.match(/ +$/) || a.match(/\t+$/) || a.match(/\n+$/) || a.match(/\r+$/);) a = a.replace(/ +$/g, ""), a = a.replace(/\t+$/g, ""), a = a.replace(/\n+$/g, ""), a = a.replace(/\r+$/g, "");
        return a
    },
    copyHash: function(a, c) {
        if (!a || "object" != typeof a) return c;
        c || (c = []);
        for (var b in a) c[b] = a[b];
        return c
    },
    roundExtend: function(a,
        c) {
        var b, d = 1;
        c && 0 < c && (d = Math.pow(10, c));
        b = Math.round(a * d);
        return b / d
    },
    uniqueNumber: 0,
    getUniqueNumber: function() {
        return common.uniqueNumber++
    },
    getParam: function(a) {
        var c = [],
            b = a; - 1 < a.indexOf("?") && (b = a.split("?")[1]);
        a = b.split("&");
        for (b = 0; b < a.length; b++) {
            var d = a[b].indexOf("=");
            0 < d && (c[a[b].substring(0, d)] = a[b].substring(d + 1))
        }
        return c
    },
    bind: function(a, c) {
        var b = null;
        2 < arguments.length && (b = Array.prototype.slice.call(arguments, 2));
        return function() {
            var d = Array.prototype.slice.call(arguments, 0);
            null !==
                b && (d = d.concat(b));
            a ? c.apply(a, d) : c.apply(this, d)
        }
    },
    bindNotAppendArgs: function(a, c) {
        var b = null;
        2 < arguments.length && (b = Array.prototype.slice.call(arguments, 2));
        return function() {
            a ? c.apply(a, b) : c.apply(this, b)
        }
    },
    changeClickImage: function(a, c) {
        a.src = c ? a.src.replace("n.gif", "nc.gif") : a.src.replace("nc.gif", "n.gif")
    },
    changeDisabledImage: function(a, c) {
        if (c) a.src = common.compelChangeImgPath(a.src, "d");
        else {
            var b = common.compelChangeImgPath(a.src, "c");
            if (a.src != b) a.src = common.compelChangeImgPath(a.src, "n")
        }
    },
    initScreen: function() {
        window.scrollTo(0, 1);
        window.scrollTo(0, -1);
        var a = common.px(common.get("ID_Control"), "width");
        this.setViewportWidth(a);
        this.orientationchange(a);
        common.show("ID_Control")
    },
    orientationchange: function(a) {
        if (BrowserType.ANDROID == common.Browser || BrowserType.ANDROID_TAB == common.Browser) a = common.roundExtend(document.documentElement.clientWidth / a * 100, 2), document.body.style.zoom = a + "%"
    },
    setViewportWidth: function(a) {
        if (BrowserType.MOBILE_SAFARI == common.Browser || BrowserType.TABLET_SAFARI ==
            common.Browser) {
            var c = document.createElement("meta");
            c.name = "viewport";
            c.content = "width=" + a + ", user-scalable=yes";
            document.getElementsByTagName("head")[0].appendChild(c)
        }
    },
    setViewport: function() {
        if (common.Browser == BrowserType.ANDROID_TAB) common.get("viewport").content = "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no";
        else if (common.Browser == BrowserType.ANDROID) - 1 < navigator.userAgent.indexOf("Chrome") ? common.get("viewport").content = "width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5, user-scalable=no" :
            common.get("viewport").content = "target-densitydpi=device-dpi, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no";
        else if (common.Browser == BrowserType.MOBILE_SAFARI) common.getInnerWidth() >= common.getInnerHeight() ? common.get("viewport").content = "width=960, height=538, user-scalable=no, minimum-scale=0.5, maximum-scale=0.5" : common.get("viewport").content = "width=640, height=834, user-scalable=no, minimum-scale=0.5, maximum-scale=0.5"
    },
    changeWindowOrientation: function() {
        common.getInnerWidth() >=
            common.getInnerHeight() ? common.get("viewport").content = "width=960, height=538, user-scalable=no, minimum-scale=0.5, maximum-scale=0.5" : common.get("viewport").content = "width=640, height=834, user-scalable=no, minimum-scale=0.5, maximum-scale=0.5"
    },
    changeStyle: function(a, c, b) {
        c.className = a ? c.className.replace(b + "_n", b + "_d") : c.className.replace(b + "_d", b + "_n")
    },
    getCookies: function() {
        var a = {};
        if (document.cookie)
            for (var c = document.cookie.split(";"), b = 0; b < c.length; b++) {
                var d = c[b].split("=");
                a[this.trim(d[0])] =
                    this.trim(unescape(d[1]))
            }
        return a
    },
    setCookie: function(a, c) {
		//document.cookie = a + "=" + escape(c) + "; path=/;"
        document.cookie = a + "=" + escape(c) + "; path=http://127.0.0.1:55555/;"
    },
    isTouchBrowser: function() {
        return BrowserType.MOBILE_SAFARI == common.Browser || BrowserType.TABLET_SAFARI == common.Browser || BrowserType.ANDROID == common.Browser || BrowserType.ANDROID_TAB == common.Browser
    },
    Browser: function() {
        var a = navigator.userAgent;
        return -1 < a.indexOf("Android") ? -1 < a.indexOf("mobile") || -1 < a.indexOf("Mobile") ? BrowserType.ANDROID : BrowserType.ANDROID_TAB : -1 < a.indexOf("Firefox") ? BrowserType.FIREFOX :
            -1 < a.indexOf("AppleWebKit") ? -1 < a.indexOf("iPhone") ? BrowserType.MOBILE_SAFARI : -1 < a.indexOf("iPad") ? BrowserType.TABLET_SAFARI : BrowserType.SAFARI : (-1 < a.indexOf("MSIE") || a.indexOf("Trident"), BrowserType.IE)
    }()
};
var API = function() {
    var a = null,
        c = null,
        b = null,
        d = null,
        h = null,
        i = !0;
    return {
        execute: function(l, f, j, k) {
            clearTimeout(a);
            a = null;
            b = apiMap[l];
            d = l;
            h = f;
            i = k;
            c = j;
            typeof k === "undefined" && (k = !0);
            API.ajax(b.uri, {
                type: b.type,
                callback: common.bind(this, API.callback),
                params: f
            }, k)
        },
        callback: function(a) {
            if (a !== null) switch (a.res) {
                case "ok":
                    var f = [];
                    if (b.returns instanceof Array)
                        for (var j = 0; j < b.returns.length; j++) f[b.returns[j]] = a[b.returns[j]];
                    else f[b.returns] = a[b.returns];
                    c(f);
                    break;
                case "busy":
                    setTimeout(function() {
                        API.execute(d,
                            h, c, i)
                    }, prop.retry.INTERVAL);
                    break;
                case "errsession":
                    a = document.URL;
                    f = common.getCookies();
                    f = f.brlang ? f.brlang : 0;
                    a = -1 == a.indexOf(".htm") || -1 < a.indexOf("index.htm") ? common.Browser == BrowserType.MOBILE_SAFARI || common.Browser == BrowserType.ANDROID ? "http://127.0.0.1:55555/cmn/seserr_m.htm?lang=" + f : "http://127.0.0.1:55555/cmn/seserr.htm?lang=" + f : common.Browser == BrowserType.MOBILE_SAFARI || common.Browser == BrowserType.ANDROID ? "http://127.0.0.1:55555/cmn/seserr_m.htm?lang=" + f : "http://127.0.0.1:55555/cmn/seserr.htm?lang=" + f;
                    window.location.replace(a);
                    break;
                case "rootredirect":
                    window.location.replace("/");
                    break;
                case "failparam":
                case "failid":
                    document.body.innerHTML = "Error", document.body.style.backgroundColor = "#ffffff", common.show(document.body)
            }
        },
        ajax: function(a, b, c) {
            function d(a, b) {
                if (b) g.abort(), g = null, e.abort && e.abort();
                else if (g.readyState == 4) {
                    clearTimeout(h);
                    var c;
                    if (g.status == 200) switch (e.responseType.toLowerCase()) {
                            case "json":
                                c = JSON && JSON.parse ? JSON.parse(g.responseText) : eval("(" + g.responseText + ")");
                                break;
                            case "xml":
                                c = g.responseXML;
                                break;
                            case "text":
                                c = g.responseText
                        } else if (g.status === 0) c =
                            0;
                        else if (g.status === 401) c = 0;
                    else {
                        d(0, !0);
                        return
                    }
                    e.callback && e.callback(c)
                }
            }
            var e = API.getOption(b),
                h = setTimeout(function() {
                    d(0, !0)
                }, e.timeout),
                b = API.getParamStr(e.params),
                g = API.getRequestObject();
            g.onreadystatechange = d;
            try {
                e.type.toUpperCase() == "GET" && b !== "" && (a += a.indexOf("?") == -1 ? "?" : "&", a += b, b = "");
                g.open(e.type, a, c, e.user, e.pass);
                for (var i in e.requestHeader) g.setRequestHeader(i, e.requestHeader[i]);
                g.send(b)
            } catch (m) {
                e.abort && e.abort(), clearTimeout(h)
            }
        },
        getRequestObject: function() {
            try {
                return new window.XMLHttpRequest
            } catch (a) {}
            try {
                return new ActiveXObject("Msxml2.XMLHTTP")
            } catch (b) {}
            try {
                return new ActiveXObject("Microsoft.XMLHTTP")
            } catch (c) {}
        },
        getOption: function(a) {
            return common.copyHash(a, {
                type: "POST",
                params: {},
                responseType: "json",
                requestHeader: {
                    "If-Modified-Since": "Thu, 01 Jun 1970 00:00:00 GMT"
                },
                timeout: prop.ajax.TIMEOUT
            })
        },
        getParamStr: function(a) {
            if (typeof a == "string") return a;
            else {
                var b = [],
                    c;
                for (c in a) b.push(c + "=" + encodeURIComponent(a[c]));
                return b.length === 0 ? "" : b.join("&")
            }
        },
        getDateStr: function(a) {
            a = a.replace(/-/, "/");
            a = a.replace(/-/, "/");
            return a = a.replace(/T/, " ")
        }
    }
}();
window.onresize = function() {
    if (common.get("ID_Control")) {
        var a = common.px(common.get("ID_Control"), "width");
        common.orientationchange(a)
    }
};