/* Copyright CANON INC. 2016 */
var ctrl = {
        ctrlMap: {
            ID1101: {
                type: "page",
                advanced: !0,
                metadata: !0,
                basic: !0,
                name: "Advanced",
                uri: "http://127.0.0.1:55555/advanced.htm"
            },
            ID1102: {
                type: "page",
                advanced: !0,
                metadata: !0,
                basic: !0,
                name: "Metadata",
                uri: "http://127.0.0.1:55555/metadata.htm"
            },
            ID1103: {
                type: "page",
                advanced: !0,
                metadata: !0,
                basic: !0,
                name: "Basic",
                uri: "http://127.0.0.1:55555/basic.htm"
            },
            ID1105: {
                type: "langDisp",
                subType: "langStr",
                advanced: !0,
                metadata: !0,
                basic: !1
            },
            ID1106: {
                type: "langDisp",
                subType: "langBtn",
                advanced: !0,
                metadata: !0,
                basic: !1
            },
            ID5101: {
                type: "langSel",
                advanced: !0,
                metadata: !0,
                basic: !1,
                value: 0
            },
            ID5102: {
                type: "langSel",
                advanced: !0,
                metadata: !0,
                basic: !1,
                value: 1
            },
            ID5103: {
                type: "langSel",
                advanced: !0,
                metadata: !0,
                basic: !1,
                value: 2
            },
            ID5104: {
                type: "langSel",
                advanced: !0,
                metadata: !0,
                basic: !1,
                value: 3
            },
            ID5105: {
                type: "langSel",
                advanced: !0,
                metadata: !0,
                basic: !1,
                value: 4
            },
            ID5106: {
                type: "langSel",
                advanced: !0,
                metadata: !0,
                basic: !1,
                value: 5
            },
            ID5107: {
                type: "langSel",
                advanced: !0,
                metadata: !0,
                basic: !1,
                value: 6
            },
            ID5108: {
                type: "langSel",
                advanced: !0,
                metadata: !0,
                basic: !1,
                value: 7
            },
            ID_LangSelect: {
                type: "langSelFrame",
                advanced: !0,
                metadata: !0,
                basic: !1
            },
            ID_Lang: {
                type: "langLayer",
                advanced: !0,
                metadata: !0,
                basic: !1
            },
            ID9100: {
                type: "layer",
                subType: "focus",
                advanced: !0,
                metadata: !1,
                basic: !0
            },
            ID9101: {
                type: "layer",
                subType: "iris",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID9102: {
                type: "layer",
                subType: "view",
                advanced: !0,
                metadata: !1,
                basic: !0
            },
            ID9110: {
                type: "layer",
                subType: "fbtn",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID9111: {
                type: "layer",
                subType: "ebtn",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1500_Lock: {
                type: "layer",
                subType: "wbm",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1510_Lock: {
                type: "layer",
                subType: "wbv",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1520_Lock: {
                type: "layer",
                subType: "av",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1530_Lock: {
                type: "layer",
                subType: "ev",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1540_Lock: {
                type: "layer",
                subType: "ssv",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1550_Lock: {
                type: "layer",
                subType: "gcm",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1560_Lock: {
                type: "layer",
                subType: "gcv",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID_Lock_Button_Normal: {
                type: "lock",
                advanced: !0,
                metadata: !0,
                basic: !0
            },
            ID_Lock_Button_Locked: {
                type: "unlock",
                advanced: !0,
                metadata: !0,
                basic: !0
            },
            ID1250: {
                type: "label",
                subType: "focus",
                advanced: !0,
                metadata: !1,
                basic: !0
            },
            ID1251: {
                type: "label",
                subType: "focus",
                advanced: !0,
                metadata: !1,
                basic: !0
            },
            ID1252: {
                type: "label",
                subType: "focus",
                advanced: !0,
                metadata: !1,
                basic: !0
            },
            ID1253: {
                type: "label",
                subType: "iris",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1259: {
                type: "label",
                subType: "rec",
                advanced: !0,
                metadata: !1,
                basic: !0
            },
            ID1258: {
                type: "label",
                subType: "view",
                advanced: !0,
                metadata: !1,
                basic: !0
            },
            ID1401: {
                type: "ctrl",
                subType: "fbtn",
                advanced: !0,
                metadata: !1,
                basic: !1,
                uri: "http://127.0.0.1:55555/api/cam/drivelens",
                params: {
                    sw: "focus"
                }
            },
            ID1402: {
                type: "ctrl",
                subType: "ebtn",
                advanced: !0,
                metadata: !1,
                basic: !1,
                uri: "http://127.0.0.1:55555/api/cam/drivelens",
                params: {
                    sw: "expcomp"
                }
            },
            ID1211: {
                type: "ctrl",
                subType: "focus",
                advanced: !0,
                metadata: !1,
                basic: !0,
                uri: "http://127.0.0.1:55555/api/cam/drivelens",
                params: {
                    fl: "near3"
                }
            },
            ID1212: {
                type: "ctrl",
                subType: "focus",
                advanced: !0,
                metadata: !1,
                basic: !0,
                uri: "http://127.0.0.1:55555/api/cam/drivelens",
                params: {
                    fl: "near2"
                }
            },
            ID1213: {
                type: "ctrl",
                subType: "focus",
                advanced: !0,
                metadata: !1,
                basic: !0,
                uri: "http://127.0.0.1:55555/api/cam/drivelens",
                params: {
                    fl: "near1"
                }
            },
            ID1214: {
                type: "ctrl",
                subType: "focus",
                advanced: !0,
                metadata: !1,
                basic: !0,
                uri: "http://127.0.0.1:55555/api/cam/drivelens",
                params: {
                    fl: "far1"
                }
            },
            ID1215: {
                type: "ctrl",
                subType: "focus",
                advanced: !0,
                metadata: !1,
                basic: !0,
                uri: "http://127.0.0.1:55555/api/cam/drivelens",
                params: {
                    fl: "far2"
                }
            },
            ID1216: {
                type: "ctrl",
                subType: "focus",
                advanced: !0,
                metadata: !1,
                basic: !0,
                uri: "http://127.0.0.1:55555/api/cam/drivelens",
                params: {
                    fl: "far3"
                }
            },
            ID1217: {
                type: "ctrl",
                subType: "iris",
                advanced: !0,
                metadata: !1,
                basic: !1,
                uri: "http://127.0.0.1:55555/api/cam/drivelens",
                params: {
                    iris: "minus"
                }
            },
            ID1218: {
                type: "ctrl",
                subType: "iris",
                advanced: !0,
                metadata: !1,
                basic: !1,
                uri: "http://127.0.0.1:55555/api/cam/drivelens",
                params: {
                    iris: "plus"
                }
            },
            ID1403: {
                type: "ctrl",
                subType: "slot",
                advanced: !0,
                metadata: !1,
                basic: !1,
                uri: "http://127.0.0.1:55555/api/cam/rec",
                params: {
                    cmd: "slot"
                }
            },
            ID1224: {
                type: "ctrl",
                subType: "rec",
                advanced: !0,
                metadata: !1,
                basic: !0,
                uri: "http://127.0.0.1:55555/api/cam/rec",
                params: {
                    cmd: "trig"
                }
            },
            ID1223: {
                type: "view",
                subType: "view",
                advanced: !0,
                metadata: !1,
                basic: !0
            },
            ID1500: {
                type: "statusSel",
                subType: "wbm",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1500Pr: {
                type: "statusSel",
                subType: "wbm",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1500Pe: {
                type: "statusSel",
                subType: "wbm",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1510: {
                type: "statusSel",
                subType: "wbv",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1510P: {
                type: "statusNonSel",
                subType: "wbv",
                advanced: !0,
                metadata: !1,
                basic: !1,
                uri: "http://127.0.0.1:55555/api/cam/getprop",
                params: {
                    r: "wbv"
                }
            },
            ID1520: {
                type: "statusSel",
                subType: "av",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1530: {
                type: "statusSel",
                subType: "ev",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1540: {
                type: "statusSel",
                subType: "ssv",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1550: {
                type: "statusSel",
                subType: "gcm",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1560: {
                type: "statusSel",
                subType: "gcv",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID1801: {
                type: "close2nd",
                advanced: !0,
                metadata: !1,
                basic: !1
            },
            ID2211a: {
                type: "mcbtn",
                subType: "active",
                advanced: !1,
                metadata: !0,
                basic: !1
            },
            ID2212p: {
                type: "mcbtn",
                subType: "send",
                advanced: !1,
                metadata: !0,
                basic: !1,
                target: 0
            },
            ID2213p: {
                type: "mcbtn",
                subType: "send",
                advanced: !1,
                metadata: !0,
                basic: !1,
                target: 1
            },
            ID2213p0: {
                type: "mcbtn",
                subType: "send",
                advanced: !1,
                metadata: !0,
                basic: !1,
                target: 1
            },
            ID2222e: {
                type: "mcbtn",
                subType: "send",
                advanced: !1,
                metadata: !0,
                basic: !1,
                target: 2
            },
            ID2403: {
                type: "clear",
                advanced: !1,
                metadata: !0,
                basic: !1,
                targets: ["ID2402"]
            },
            ID2413: {
                type: "clear",
                advanced: !1,
                metadata: !0,
                basic: !1,
                targets: ["ID2412"]
            },
            ID2423: {
                type: "clear",
                advanced: !1,
                metadata: !0,
                basic: !1,
                targets: ["ID2422"]
            },
            ID2433: {
                type: "clear",
                advanced: !1,
                metadata: !0,
                basic: !1,
                targets: ["ID2432"]
            },
            ID2454: {
                type: "clear",
                advanced: !1,
                metadata: !0,
                basic: !1,
                targets: ["ID2443", "ID2446", "ID2447", "ID2448", "ID2451", "ID2452", "ID2453"]
            }
        },
        subTypeMap: null,
        getTopObj: function(a) {
            a =
                common.getEventSrc(a); - 1 != a.id.indexOf("WRAP_", 0) && (a = common.get(a.id.replace("WRAP_", "")));
            return a
        },
        getButtonObj: function(a) {
            a = common.getEventSrc(a); - 1 != a.id.indexOf("WRAP_", 0) && (a = common.get(a.id.replace("WRAP_", "BTN_")));
            return a
        },
        cbButtonEvt: function(a) {
            var b = ctrl.getButtonObj(a),
                c = ctrl.getTopObj(a),
                d = ctrl.ctrlMap[c.id];
            switch (a.type) {
                case "mouseover":
                case "mousedown":
                case "touchstart":
                    "langSel" == d.type ? c.className = "lsel lsel_o" : "langSelFrame" != d.type && "langLayer" != d.type && common.changeClickImage(b, !0);
                    break;
                case "click":
                    ctrl.buttonExec(a);
                    "langSel" == d.type ? c.className = "lsel lsel_n" : "langSelFrame" != d.type && "langLayer" != d.type && common.changeClickImage(b, !1);
                    break;
                case "mouseout":
                case "touchmove":
                case "touchend":
                    "langSel" == d.type ? c.className = "lsel lsel_n" : "langSelFrame" != d.type && "langLayer" != d.type && common.changeClickImage(b, !1)
            }
        },
        buttonExec: function(a) {
            var b = ctrl.getTopObj(a),
                b = ctrl.ctrlMap[b.id];
            switch (b.type) {
                case "page":
                    window.location.replace(b.uri);
                    break;
                case "langDisp":
                    common.isShow("ID_Lang") ?
                        common.hide("ID_Lang") : common.show("ID_Lang");
                    break;
                case "langSel":
                    common.hide("ID_Lang");
                    lang.change(b.value);
                    common.stopEvent(common.getEvent(a));
                    break;
                case "langSelFrame":
                    common.stopEvent(common.getEvent(a));
                    break;
                case "langLayer":
                    common.hide("ID_Lang");
                    common.stopEvent(common.getEvent(a));
                    break;
                case "lock":
                    currentLock.executeKey(!0);
                    break;
                case "unlock":
                    currentLock.executeKey(!1);
                    break;
                case "ctrl":
                case "statusNonSel":
                    if (b.disabled)
                        for (var a = b.disabled, c = 0; c < a.length; c++) ctrl.enabledSubType(a[c],
                            0), statusCtrl.current[a[c]].en = 0;
                    if (b.subType === "rec") {
                        statusCtrl.current.recformat === "photo" ? common.ajax(b.uri, {
                            params: {
                                cmd: "stltrig"
                            }
                        }) : common.ajax(b.uri, {
                            params: {
                                cmd: "trig"
                            }
                        });
                        break
                    }
                    common.ajax(b.uri, {
                        params: b.params
                    });
                    break;
                case "view":
                    view.send(!0);
                    break;
                case "statusSel":
                    ctrl.changeScreen("ID_Control_Status", "ID_Control_Setting");
                    secondCtrl.settingScope(b.subType);
                    break;
                case "close2nd":
                    ctrl.changeScreen("ID_Control_Setting", "ID_Control_Status");
                    secondCtrl.close();
                    break;
                case "mcbtn":
                    "send" == b.subType ?
                        metaCtrl.sendData(b.target) : metaCtrl.active();
                    break;
                case "clear":
                    metaCtrl.clear(b.targets, a)
            }
        },
        showSubType: function(a, b) {
            if (a in ctrl.subTypeMap)
                for (var c = ctrl.subTypeMap[a], d = 0; d < c.length; d++) "layer" != ctrl.ctrlMap[c[d].id].type && (b ? common.show(c[d]) : common.hide(c[d]))
        },
        enabledSubType: function(a, b) {
            if (a in ctrl.subTypeMap)
                for (var c = ctrl.subTypeMap[a], d = 0; d < c.length; d++) {
                    var e = ctrl.ctrlMap[c[d].id].type;
                    "layer" == e ? b ? common.hide(c[d]) : common.show(c[d]) : "statusSel" != e && "statusNonSel" != e && common.changeDisabledImage(c[d], !b)
                }
        },
        changeScreen: function(a, b) {
            common.hide(a);
            common.show(b)
        },
        lock: function() {
            var a, b = !1,
                c, d;
            common.isShow("ID_Lock") ? (common.hide("ID_Lock"), a = !1) : (common.show("ID_Lock"), a = !0);
            for (var e in ctrl.subTypeMap) {
                b = !1;
                switch (e) {
                    case "lock":
                    case "unlock":
                    case "langSel":
                    case "langSelFrame":
                    case "close2nd":
                        b = !0;
                        break;
                    case "focus":
                    case "iris":
                    case "view":
                    case "ebtn":
                        0 === statusCtrl.current[e].en ? b = !0 : a || (ctrl.enabledSubType(e, !0), b = !0);
                        break;
                    case "wbm":
                    case "wbv":
                    case "am":
                    case "av":
                    case "ev":
                    case "ssm":
                    case "ssv":
                    case "gcm":
                    case "gcv":
                        0 ===
                            statusCtrl.current[e].en ? b = !0 : a || ctrl.enabledSubType(e, !0)
                }
                if (!b) {
                    var f = ctrl.subTypeMap[e];
                    for (c = 0; c < f.length; c++) switch (ctrl.ctrlMap[f[c].id].type) {
                        case "layer":
                            break;
                        case "langLayer":
                            common.hide(f[c]);
                            break;
                        case "langDisp":
                            if ("langStr" == e) {
                                b = common.getChilds(f[c], "IMG");
                                for (d = 0; d < b.length; d++) - 1 == b[d].id.indexOf("WRAP_", 0) && common.changeDisabledImage(b[d], a);
                                a ? common.get("STR_" + f[c].id).className = "lstr lstr_d" : common.get("STR_" + f[c].id).className = "lstr lstr_n"
                            } else common.changeDisabledImage(f[c],
                                a);
                            break;
                        case "statusSel":
                        case "statusNonSel":
                            b = common.getChilds(f[c], "IMG");
                            for (d = 0; d < b.length; d++) - 1 == b[d].id.indexOf("WRAP_", 0) && common.changeDisabledImage(b[d], a);
                            break;
                        case "text":
                            common.changeStyle(a, f[c], "oasn");
                            break;
                        default:
                            common.changeDisabledImage(f[c], a)
                    }
                }
            }
            "Metadata" == def.ctrl.name && metaCtrl.lock(a)
        },
        init: function() {
            ctrl.subTypeMap = [];
            for (var a in ctrl.ctrlMap) {
                var b = ctrl.ctrlMap[a],
                    c = b.type;
                if ("Advanced" != def.ctrl.name || b.advanced)
                    if ("Metadata" != def.ctrl.name || b.metadata)
                        if ("Basic" !=
                            def.ctrl.name || b.basic) {
                            var d = common.get(a);
                            switch (c) {
                                case "page":
                                    b.name != def.ctrl.name && common.addEvent(d, "click", ctrl.cbButtonEvt, !1);
                                    break;
                                case "langSelFrame":
                                case "langLayer":
                                    common.addEvent(d, "click", ctrl.cbButtonEvt, !1);
                                    break;
                                case "langSel":
                                    common.get(a).innerHTML = LANG_DATA[b.value].name;
                                    common.addEvent(d, "mouseover", ctrl.cbButtonEvt, !1);
                                    common.addChangeImageEvent(d, ctrl.cbButtonEvt, !1);
                                    break;
                                case "langDisp":
                                case "lock":
                                case "unlock":
                                case "ctrl":
                                case "view":
                                case "statusSel":
                                case "statusNonSel":
                                case "close2nd":
                                case "mcbtn":
                                case "clear":
                                    var e =
                                        d;
                                    if ("statusSel" == c || "statusNonSel" == c) e = common.get("WRAP_" + a);
                                    common.addChangeImageEvent(e, ctrl.cbButtonEvt, !1)
                            }
                            "subType" in b && (c = b.subType);
                            c in ctrl.subTypeMap || (ctrl.subTypeMap[c] = []);
                            ctrl.subTypeMap[c].push(d)
                        }
            }
            "Metadata" == def.ctrl.name && metaCtrl.setData();
            if (a = common.getCookies().authlevel) switch (a) {
                case "ctrl":
                case "meta":
                    ctrl.showSubType("page", !1)
            }
            metaCtrl.resizeTextBox()
        }
    },
    metaCtrl = {
        titleLock: ["ID2401", "ID2411", "ID2421", "ID2431", "ID2441", "ID2442", "ID2444", "ID2449"],
        titleGPS: ["ID2441", "ID2442",
            "ID2444", "ID2449"
        ],
        saves: ["ID2402", "ID2412", "ID2422", "ID2432", "ID2443", "ID2450", "ID2451", "ID2452", "ID2453", "ID2445", "ID2446", "ID2447", "ID2448"],
        lock: function(a) {
            var b;
            for (b = 0; b < metaCtrl.titleLock.length; b++) {
                var c = common.get(metaCtrl.titleLock[b]);
                common.changeStyle(a, c, "str")
            }
            c = ["input", "textarea", "select", "option"];
            for (b = 0; b < c.length; b++)
                for (var d = document.getElementsByTagName(c[b]), e = 0; e < d.length; e++) common.changeStyle(a, d[e], "iobj"), d[e].disabled = a ? !0 : !1
        },
        gpsInfoOnOff: function(a) {
            var b, c = ["ID2443",
                "ID2445", "ID2446", "ID2447", "ID2448", "ID2450", "ID2451", "ID2452", "ID2453"
            ];
            for (b = 0; b < metaCtrl.titleGPS.length; b++) {
                var d = common.get(metaCtrl.titleGPS[b]);
                common.changeStyle(a, d, "str")
            }
            for (b = 0; b < c.length; b++) d = common.get(c[b]), common.changeStyle(a, d, "iobj"), d.disabled = a ? !0 : !1
        },
        active: function() {
            common.hide("ID2210a");
            common.show("ID2210d");
            metaCtrl.sendActive()
        },
        sendActive: function() {
            common.ajax("http://127.0.0.1:55555/api/cam/ctrlmeta", {
                callback: metaCtrl.cbSendActive,
                params: {
                    cmd: "activate"
                }
            })
        },
        cbSendActive: function(a) {
            "busy" ==
            a.res && setTimeout(metaCtrl.sendActive, prop.ajax.retryInterval)
        },
        sendData: function(a) {
            var b = common.get("ID2402");
            b.value = common.trim(b.value);
            var c = common.get("ID2412");
            c.value = common.trim(c.value);
            var c = c.value.replace(/\r|\n|\t/g, " "),
                d = common.get("ID2422");
            d.value = common.trim(d.value);
            var e = common.get("ID2432");
            e.value = common.trim(e.value);
            var f = common.get("ID2443");
            f.value = common.trim(f.value);
            var g = common.get("ID2446");
            g.value = common.trim(g.value);
            var h = common.get("ID2447");
            h.value = common.trim(h.value);
            var i = common.get("ID2448");
            i.value = common.trim(i.value);
            var j = common.get("ID2451");
            j.value = common.trim(j.value);
            var k = common.get("ID2452");
            k.value = common.trim(k.value);
            var l = common.get("ID2453");
            l.value = common.trim(l.value);
            if (100 < b.value.length) common.messageBox.view(LANG_DATA[lang.current].msgTitle, !0);
            else if (100 < c.length) common.messageBox.view(LANG_DATA[lang.current].msgOperator, !0);
            else if (100 < d.value.length) common.messageBox.view(LANG_DATA[lang.current].msgLocation, !0);
            else if (1E3 < e.value.length) common.messageBox.view(LANG_DATA[lang.current].msgDescription, !0);
            else {
                var m = !1;
                if (f.value)
                    if (-1 != f.value.indexOf("\u3000")) m = !0;
                    else if (-1 != f.value.indexOf(".")) m = !0;
                else if (isFinite(f.value)) {
                    if (-999999 > parseFloat(f.value) || 999999 < parseFloat(f.value)) m = !0
                } else m = !0;
                if (m) common.messageBox.view(LANG_DATA[lang.current].msgAltitude, !0);
                else {
                    if (g.value || h.value || i.value || j.value || k.value || l.value) {
                        g = metaCtrl.validateDeg(g, 180);
                        if (-1 == g) {
                            common.messageBox.view(LANG_DATA[lang.current].msgLongitude, !0);
                            return
                        }
                        h = metaCtrl.validateMin(h);
                        if (-1 == h) {
                            common.messageBox.view(LANG_DATA[lang.current].msgMinute, !0);
                            return
                        }
                        i = metaCtrl.validateSec(i);
                        if (-1 == i) {
                            common.messageBox.view(LANG_DATA[lang.current].msgSecond, !0);
                            return
                        }
                        if (180 == g && (h || i)) {
                            common.messageBox.view(LANG_DATA[lang.current].msgLongitude, !0);
                            return
                        }
                        j = metaCtrl.validateDeg(j, 90);
                        if (-1 == j) {
                            common.messageBox.view(LANG_DATA[lang.current].msgLatitude, !0);
                            return
                        }
                        k = metaCtrl.validateMin(k);
                        if (-1 == k) {
                            common.messageBox.view(LANG_DATA[lang.current].msgMinute, !0);
                            return
                        }
                        l = metaCtrl.validateSec(l);
                        if (-1 == l) {
                            common.messageBox.view(LANG_DATA[lang.current].msgSecond, !0);
                            return
                        }
                        if (90 == j && (k || l)) {
                            common.messageBox.view(LANG_DATA[lang.current].msgLatitude, !0);
                            return
                        }
                    }
                    common.isShow("ID2210p") ? (common.hide("ID2210p"), common.show("ID2210d")) : common.isShow("ID2210p0") ? (common.hide("ID2210p0"), common.show("ID2210d")) : common.isShow("ID2220e") && (common.hide("ID2220e"), common.show("ID2220d"));
                    a = {
                        target: a,
                        title: b.value,
                        operator: c,
                        location: d.value,
                        description: e.value,
                        altitude: f.value,
                        longitude: metaCtrl.convert("ID2445", "ID2446", "ID2447", "ID2448"),
                        latitude: metaCtrl.convert("ID2450",
                            "ID2451", "ID2452", "ID2453")
                    };
                    b = !0;
                    c = [];
                    c.push("{");
                    for (var n in a) b ? b = !1 : c.push(","), c.push('"'), c.push(n), c.push('":'), "target" == n ? c.push(a[n]) : (c.push('"'), c.push(common.jsonEscape(a[n])), c.push('"'));
                    c.push("}");
                    common.ajax("/api/cam/postmeta", {
                        type: "POST",
                        params: c.join("")
                    })
                }
            }
        },
        validateDeg: function(a, b) {
            var c = a.value;
            if (!c) return -1;
            if (-1 != c.indexOf("\u3000")) return -1;
            if (!isFinite(c)) return -1;
            c = parseInt(c, 10);
            if (0 > c || b < c) return -1;
            return c
        },
        validateMin: function(a) {
            a = a.value;
            if (!a) return -1;
            if (-1 !=
                a.indexOf("\u3000")) return -1;
            if (!isFinite(a)) return -1;
            a = parseInt(a, 10);
            if (0 > a || 59 < a) return -1;
            return a
        },
        validateSec: function(a) {
            a = a.value;
            if (!a) return -1;
            if (-1 != a.indexOf("\u3000")) return -1;
            if (!isFinite(a)) return -1;
            a = common.roundExtend(parseFloat(a), 1);
            if (0 > a || 59.9 < a) return -1;
            return a
        },
        convertMap: {
            ID2450: ["N", "S"],
            ID2445: ["E", "W"]
        },
        convert: function(a, b, c, d) {
            var e = common.get(a).selectedIndex,
                b = common.get(b),
                c = common.get(c),
                d = common.get(d);
            if (!b.value || !c.value || !d.value) return "";
            b = parseInt(b.value, 10);
            c = parseInt(c.value, 10);
            d = parseFloat(d.value);
            return 0 === b + c + d ? metaCtrl.convertMap[a][e] + "0.00000" : metaCtrl.convertMap[a][e] + common.roundExtend(b + c / 60 + d / 3600, 5).toFixed(5)
        },
        clear: function(a) {
            for (var b = 0; b < a.length; b++) {
                var c = common.get(a[b]);
                c.value = "";
                metaCtrl.saveData(c)
            }
        },
        cbChange: function(a) {
            a = common.getEventSrc(a);
            metaCtrl.saveData(a)
        },
        saveDataAll: function() {
            for (var a = 0; a < metaCtrl.saves.length; a++) {
                var b = common.get(metaCtrl.saves[a]);
                metaCtrl.saveData(b)
            }
        },
        saveData: function(a) {
            if (window.sessionStorage) switch (a.type) {
                case "text":
                case "textarea":
                    0 ===
                        a.value.length ? window.sessionStorage.removeItem(a.id) : window.sessionStorage.setItem(a.id, a.value);
                    break;
                case "select-one":
                    window.sessionStorage.setItem(a.id, a.selectedIndex)
            }
        },
        setData: function() {
            if (window.sessionStorage)
                for (var a = 0; a < metaCtrl.saves.length; a++) {
                    var b = common.get(metaCtrl.saves[a]);
                    common.addEvent(b, "change", metaCtrl.cbChange, !1);
                    switch (b.type) {
                        case "text":
                        case "textarea":
                            b.value = window.sessionStorage.getItem(b.id) || "";
                            break;
                        case "select-one":
                            b.selectedIndex = window.sessionStorage.getItem(b.id) ||
                                0
                    }
                }
        },
        resizeTextBox: function() {
            for (var a = ["input", "textarea"], b = 0; b < a.length; b++)
                for (var c = document.getElementsByTagName(a[b]), d = 0; d < c.length; d++) {
                    var e = common.px(c[d], "width"),
                        f, g;
                    BrowserType.IE == common.Browser ? (f = common.px(c[d], "borderLeftWidth"), g = common.px(c[d], "borderRightWidth")) : (f = common.px(c[d], "border-left-width"), g = common.px(c[d], "border-right-width"));
                    c[d].style.width = e - f - g + "px";
                    e = common.px(c[d], "height");
                    BrowserType.IE == common.Browser ? (f = common.px(c[d], "borderTopWidth"), g = common.px(c[d],
                        "borderBottomWidth")) : (f = common.px(c[d], "border-top-width"), g = common.px(c[d], "border-bottom-width"));
                    c[d].style.height = e - f - g + "px"
                }
        }
    };
