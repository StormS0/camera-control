/* Copyright CANON INC. 2016 */
var format = "",
    recTypeStyle = 0,
    statusCtrl = function() {
        function p() {}
        p.prototype = {
            stopFlag: null,
            timerID: null,
            init: function() {
                statusCtrl.current.seq = 0;
                this.stopFlag = !1;
                this.timerID = null;
                this.start()
            },
            destory: function() {
                this.stop(!0)
            },
            start: function() {
                this.stop(this.stopFlag);
                common.ajax("http://127.0.0.1:55555/api/cam/getcurprop", {
                    callback: common.bind(this, function(a) {
                        if (!this.stopFlag) this.cbSend(a), this.timerID = setTimeout(common.bind(this, this.start), prop.status.interval)
                    }),
                    abort: common.bind(this, function() {
                        if (!this.stopFlag) this.timerID =
                            setTimeout(common.bind(this, this.start), prop.status.interval)
                    }),
                    params: {
                        seq: statusCtrl.current.seq
                    }
                })
            },
            stop: function(a) {
                if (this.timerID) clearTimeout(this.timerID), this.timerID = null;
                this.stopFlag = a
            },
            cbSend: function(a) {
                if (!this.stopFlag && "ok" == a.res) {
                    0 === statusCtrl.current.seq && (ctrl.showSubType("rec", !0), ctrl.showSubType("view", !0));
                    if (null != a.recformat) recTypeStyle = "photo" == a.recformat ? 3 : 4, format = a.recformat;
                    var b = a.mode,
                        c = !1;
                    "NonCtrl" == b ? c = !0 : "mode" in a || (c = currentLock.isNonCtrl());
                    var h = [],
                        g;
                    if (c)
                        for (g in a) switch (g +
                            ":" + def.ctrl.name) {
                            case "seq:Advanced":
                            case "seq:Basic":
                            case "com:Advanced":
                            case "cbtn:Advanced":
                            case "cbtn:Basic":
                                this.cbFunc[g](a[g]);
                                break;
                            case "msg:Advanced":
                            case "msg:Basic":
                                h[g] = a[g]
                        } else
                            for (g in a) switch (g + ":" + def.ctrl.name) {
                                case "seq:Advanced":
                                case "seq:Basic":
                                case "com:Advanced":
                                case "rec:Advanced":
                                case "rec:Basic":
                                case "batt:Advanced":
                                case "tc:Advanced":
                                case "cbtn:Advanced":
                                case "cbtn:Basic":
                                case "camid:Advanced":
                                case "camid:Basic":
                                case "Ocf:Advanced":
                                case "Osd:Advanced":
                                case "Owbm:Advanced":
                                case "Owbv:Advanced":
                                case "Oav:Advanced":
                                case "Ossv:Advanced":
                                case "Ogcm:Advanced":
                                case "Ogcv:Advanced":
                                case "Oev:Advanced":
                                case "fbtn:Advanced":
                                case "ebtn:Advanced":
                                case "aes:Advanced":
                                case "aesbtn:Advanced":
                                case "recformat:Advanced":
                                case "recformat:Basic":
                                case "recp:Advanced":
                                case "scn:Advanced":
                                    this.cbFunc[g](a[g]);
                                    break;
                                case "msg:Advanced":
                                case "msg:Basic":
                                case "Offrame:Advanced":
                                case "faceficon:Advanced":
                                    h[g] = a[g]
                            }
                    for (var d in h) this.cbFunc[d](h[d]);
                    b && this.cbFunc.mode(b)
                }
            },
            cbFunc: {
                seq: function(a) {
                    statusCtrl.current.seq = a
                },
                com: function(a) {
                    var b = common.get("ID1301");
                    b.src = "Metadata" == def.ctrl.name ? IMG_MAP["comm" + a] : IMG_MAP["com" + a];
                    common.show(b)
                },
                mode: function(a) {
                    if ("NonCtrl" == a) {
                        if ("Advanced" == def.ctrl.name && (ctrl.changeScreen("ID_Control_Setting", "ID_Control_Status"), secondCtrl.close()), !currentLock.isNonCtrl() &&
                            (currentLock.executeNonCtrl(!0), "Metadata" != def.ctrl.name && prop.view)) view.stop(!1), e("view", !0, !0), statusCtrl.current.recformat === "photo" ? common.get("ID1224").src = common.changeImgPath(IMG_MAP.recPhotoBTN, currentLock.isLock()) : common.get("ID1224").src = common.changeImgPath(IMG_MAP.recStbyBTN, currentLock.isLock())
                    } else currentLock.isNonCtrl() ? currentLock.executeNonCtrl(!1) : "CtrlNonLV" == a && prop.view && view.stop(!0), prop.view && e("view", "CtrlNonLV" == a, !0)
                },
                rec: function() {},
                batt: function(a) {
                    var b = common.get("ID1303");
                    switch (a) {
                        case -1:
                            common.hide(b);
                            break;
                        default:
                            b.src = IMG_MAP["batt" + a], common.show(b)
                    }
                },
                tc: function(a) {
                    if ("non" === a) common.hide(common.get("ID1304"));
                    else {
                        for (var b = 0; b < a.length; b++) common.get("ID1304_" + (b + 1)).src = "." == a.charAt(b) ? IMG_MAP.numdot : IMG_MAP[a.charAt(b)];
                        common.show(common.get("ID1304"))
                    }
                },
                cbtn: function(a) {
                    ctrl.showSubType("focus", !0);
                    e("focus", "f1" != a.substr(0, 2), !0);
                    ctrl.showSubType("iris", !0);
                    e("iris", "i1" != a.substr(2, 2), !0);
                    if ("Advanced" == def.ctrl.name) {
                        switch (a.substr(4, 3)) {
                            case "af0":
                                ctrl.showSubType("oneshot", !0);
                                ctrl.showSubType("aflock", !1);
                                common.hide(common.get("ID9106"));
                                e("oneshot", !0, !0);
                                break;
                            case "af1":
                                ctrl.showSubType("oneshot", !0);
                                ctrl.showSubType("aflock", !1);
                                common.hide(common.get("ID9106"));
                                e("oneshot", !1, !0);
                                break;
                            case "af3":
                                ctrl.showSubType("oneshot", !1);
                                ctrl.showSubType("aflock", !0);
                                e("aflock", !0, !0);
                                break;
                            case "af4":
                                ctrl.showSubType("oneshot", !1), ctrl.showSubType("aflock", !0), e("aflock", !1, !0)
                        }
                        ctrl.showSubType("pushauto", !0);
                        e("pushauto", "ai1" != a.substr(7, 3), !0);
                        ctrl.showSubType("afmode", !0);
                        e("afmode", "fm1" != a.substr(10, 3), !0)
                    }
                },
                camid: function(a) {
                    0 === a.length ? common.messageBox.clear() : common.messageBox.view(a, !1)
                },
                msg: function(a) {
                    common.messageBox.view(a, !0)
                },
                Ocf: function(a) {
                    statusCtrl.current.Ocf = a;
                    o()
                },
                Osd: function(a) {
                    statusCtrl.current.Osd = a;
                    o()
                },
                Owbm: function(a) {
                    statusCtrl.current.wbm = a;
                    var b = a.pv;
                    switch (b) {
                        case "non":
                            f("wbm", b, a.en, "ID1500", "1", !1, !0);
                            break;
                        case "PresetA":
                        case "PresetB":
                            f("wbm", b, a.en, "ID1500", "1", !0, !0);
                            break;
                        case "AWB":
                            f("wbm", b, a.en, "ID1500", "1", !0, !0);
                            break;
                        default:
                            f("wbm", b, a.en, "ID1500", "1", !0, !0)
                    }
                },
                Owbv: function(a) {
                    ctrl.showSubType("wbv", !1);
                    var b = a.pv,
                        a = a.en,
                        c, h;
                    c = statusCtrl.current.wbm.pv;
                    if ("non" == b) c = [];
                    else switch (c) {
                        case "Kelvin":
                        case "AWB":
                            c = common.createImgElement(b);
                            h = "K" + (c.length - 3);
                            c.push(common.createImgElement("wbvK")[0]);
                            break;
                        case "Daylight":
                        case "Tungsten":
                            c = common.createImgElement(b);
                            h = "W3";
                            "0" == b ? (c.unshift(common.createImgElement("-")[0]), c.unshift(common.createImgElement("+")[0]), h = "W2") : -1 == b.indexOf("-") && (c.unshift(common.createImgElement("+")[0]),
                                h = "W1");
                            c.unshift(common.createImgElement("wbvDayTung")[0]);
                            break;
                        case "PresetA":
                        case "PresetB":
                            if (statusCtrl.current.wbm.en) switch (b) {
                                case "run":
                                case "err":
                                    common.get("ID1500P" + b.charAt(0) + "_1").src = common.changeImgPath(IMG_MAP["wbm" + c], currentLock.isLock());
                                    common.show("ID1500P" + b.charAt(0));
                                    ctrl.enabledSubType("wbm", !currentLock.isLock());
                                    break;
                                case "comp":
                                    f("wbm", c, statusCtrl.current.wbm.en, "ID1500", "1", !0, !0)
                            }
                            c = common.createImgElement("wbvPreset");
                            d("wbv", c, a, "ID1510P", 1, !0);
                            return;
                        case "non":
                            c = [];
                            break;
                        default:
                            c = []
                    }
                    d("wbv", c, a, "ID1510", h, !0)
                },
                Oav: function(a) {
                    var b = a.pv,
                        c, h;
                    if ("-1" == b) c = [];
                    else if ("non" == b) c = [];
                    else if ("CLOSE" == b) c = common.createImgElement("av" + b), h = 0;
                    else {
                        if ("--" == b) c = common.createImgElement("e"), c.push(common.createImgElement("e")[0]), h = "1";
                        else switch (c = common.createImgElement(b), b.length) {
                            case 2:
                                h = "1";
                                break;
                            case 3:
                                h = "2";
                                break;
                            case 6:
                                h = "3";
                                break;
                            case 7:
                                h = "4";
                                break;
                            case 8:
                                h = "5";
                                break;
                            case 9:
                                h = "6"
                        }
                        c.unshift(common.createImgElement("avF")[0])
                    }
                    d("av", c, a.en, "ID1520", h, !0)
                },
                Ossv: function(a) {
                    var b = a.pv,
                        c, h;
                    if ("non" == b) c = [];
                    else switch (c = common.createImgElement(b), "speed") {
                        case "off":
                        case "speed":
                        case "slow":
                        case "Automatic":
                            h = b[1] === '"' ? "s0" : "s" + (c.length - 2);
                            break;
                        case "angle":
                            c.push(common.createImgElement("ssvangle")[0]);
                            h = "a" + (c.length - 2);
                            break;
                        case "cls":
                            c.push(common.createImgElement("ssvcls")[0]);
                            h = "c" + (c.length - 5);
                            break;
                        case "non":
                            c = [];
                            break;
                        default:
                            c = []
                    }
                    d("ssv", c, a.en, "ID1540", h, !0)
                },
                Ogcm: function(a) {
                    var b = a.pv;
                    statusCtrl.current.gcm = a;
                    "non" == b ? f("gcm", b, a.en,
                        "ID1550", "1", !1, !0) : f("gcm", b, a.en, "ID1550", "1", !0, !0)
                },
                Ogcv: function(a) {
                    var b = a.pv,
                        c, h, g = statusCtrl.current.gcm.pv;
                    if ("non" == b) c = [];
                    else switch (c = common.createImgElement(b), g) {
                        case "iso":
                            h = "i" + (c.length - 2);
                            break;
                        case "gain":
                        case "Automatic":
                        case "Manual":
                            c.push(common.createImgElement("gcvDb")[0]), h = -1 == b.indexOf("-") ? "g" + (c.length - 3) : "g3"
                    }
                    d("gcv", c, a.en, "ID1560", h, !0)
                },
                Oev: function(a) {
                    var b = a.pv,
                        c, h;
                    b === "non" ? c = [] : b === "0" ? (c = common.createImgElement(b), h = 1, c.unshift(common.createImgElement("+")[0]),
                        c.unshift(common.createImgElement("-")[0])) : (c = common.createImgElement(b.replace(/\s+/g, "")), h = c.length === 2 ? -1 != b.indexOf("-") ? 2 : 3 : c.length === 5 ? -1 != b.indexOf("-") ? 4 : 5 : -1 != b.indexOf("-") ? 6 : 7);
                    d("ev", c, a.en, "ID1530", h, !0)
                },
                Offrame: function(a) {
                    statusCtrl.current.Offrame = a;
                    common.canvasControl.drawOfframe()
                },
                faceficon: function(a) {
                    statusCtrl.current.faceficon = a;
                    common.canvasControl.drawFaceficon()
                },
                aesbtn: function(a) {
                    var b = common.get("ID1401"),
                        c = common.get("ID1402"),
                        h, g;
                    switch (a) {
                        case "PM":
                            g = h = !1;
                            break;
                        case "PdM":
                            h = !1;
                            g = !0;
                            break;
                        case "PMd":
                            h = !0;
                            g = !1;
                            break;
                        case "PdMd":
                            g = h = !0
                    }
                    b.src = common.changeImgPath("http://127.0.0.1:55555/images/AesM_n.gif", h ? !0 : currentLock.isLock());
                    e("asem", h, !0);
                    c.src = common.changeImgPath("http://127.0.0.1:55555/images/AesP_n.gif", g ? !0 : currentLock.isLock());
                    e("asep", g, !0)
                },
                aes: function(a) {
                    var b, c, h, g;
                    if (a === "non") common.hide("ID1323");
                    else {
                        b = common.createImgElement(a);
                        c = common.getChilds("ID1323", "IMG").length;
                        h = b.length;
                        common.show("ID1323");
                        g = a.slice(0, 1) === "-" ? "m" + a.length : "p" + a.length;
                        for (var d = 0; d < c; d++) a = common.get("ID1323_" +
                            (d + 1)), d === 0 ? (a.src = "http://127.0.0.1:55555/images/AeStr_n.gif", a.className = "ID1323_" + g + "_" + (d + 1), common.show(a)) : d < h + 1 ? (a.src = b[d - 1].src, a.className = "ID1323_" + g + "_" + (d + 1), common.show(a)) : common.hide(a)
                    }
                },
                fbtn: function(a) {
                    var b = "d" == a.slice(-1),
                        a = b ? a.slice(0, -1) : a;
                    common.get("ID1401").src = common.changeImgPath(IMG_MAP["fbtn" + a], b ? !0 : currentLock.isLock());
                    e("fbtn", b, !0)
                },
                ebtn: function(a) {
                    var b = "d" == a.slice(-1),
                        c = b ? a.slice(0, -1) : a;
                    common.get("ID1402").src = common.changeImgPath(IMG_MAP["ebtn" + c], b ? !0 : currentLock.isLock());
                    e("ebtn", b, !0);
                    "M" === a.slice(0, 1) ? (common.get("ID1324").src = "http://127.0.0.1:55555/images/S_ExLo.gif", common.show(common.get("ID1324"))) : common.hide(common.get("ID1324"))
                },
                recformat: function(a) {
                    statusCtrl.current.recformat = a;
                    C(statusCtrl.current.rec);
                    o();
                    var b = common.get("ID1259"),
                        c;
                    switch (a) {
                        case "4k":
                            def.ctrl.name === "Advanced" ? (b.src = common.changeImgPath("http://127.0.0.1:55555/images/StStCn.gif", currentLock.isLock()), c = common.get("ID1302"), c.src = "http://127.0.0.1:55555/images/stat4k.gif", common.show(c)) : b.src = common.changeImgPath("http://127.0.0.1:55555/images/sStStCn.gif", currentLock.isLock());
                            break;
                        case "mp4hd":
                        case "hd":
                            def.ctrl.name === "Advanced" ? (b.src = "http://127.0.0.1:55555/images/StStCn.gif", b.src = common.changeImgPath("http://127.0.0.1:55555/images/StStCn.gif", currentLock.isLock()), c = common.get("ID1302"), c.src = "http://127.0.0.1:55555/images/stathd_n.gif", common.show(c)) : b.src = common.changeImgPath("http://127.0.0.1:55555/images/sStStCn.gif", currentLock.isLock());
                            break;
                        case "photo":
                            if (def.ctrl.name === "Advanced") {
                                b.src = common.changeImgPath("http://127.0.0.1:55555/images/PtTr_n.gif", currentLock.isLock());
                                c = common.get("ID1302");
                                c.src = "http://127.0.0.1:55555/images/statstl.gif";
                                common.show(c);
                                break
                            } else b.src =
                                common.changeImgPath("http://127.0.0.1:55555/images/sPtTr_n.gif", currentLock.isLock());
                            break;
                        default:
                            common.hide(c)
                    }
                },
                recp: function(a) {
                    var b = common.get("ID1321");
                    switch (a) {
                        case "P":
                            b.src = "http://127.0.0.1:55555/images/ModePn.gif";
                            common.show(b);
                            break;
                        case "Tv":
                            b.src = "http://127.0.0.1:55555/images/ModeTvn.gif";
                            common.show(b);
                            break;
                        case "Av":
                            b.src = "http://127.0.0.1:55555/images/ModeAvn.gif";
                            common.show(b);
                            break;
                        case "M":
                            b.src = "http://127.0.0.1:55555/images/ModeMn.gif";
                            common.show(b);
                            break;
                        case "SCN":
                            b.src = "http://127.0.0.1:55555/images/ModeScn.gif";
                            common.show(b);
                            break;
                        case "AUTO":
                            b.src = "http://127.0.0.1:55555/images/ModeAt_n.gif";
                            common.show(b);
                            break;
                        default:
                            common.hide(b)
                    }
                },
                scn: function(a) {
                    var b = common.get("ID1322");
                    switch (a) {
                        case "portrait":
                            b.src = "http://127.0.0.1:55555/images/SnPt.gif";
                            common.show(b);
                            break;
                        case "sports":
                            b.src = "http://127.0.0.1:55555/images/SnSp.gif";
                            common.show(b);
                            break;
                        case "nightscene":
                            b.src = "http://127.0.0.1:55555/images/SnNv.gif";
                            common.show(b);
                            break;
                        case "snow":
                            b.src = "http://127.0.0.1:55555/images/SnSw.gif";
                            common.show(b);
                            break;
                        case "beach":
                            b.src = "http://127.0.0.1:55555/images/SnBc.gif";
                            common.show(b);
                            break;
                        case "sunset":
                            b.src = "http://127.0.0.1:55555/images/SnSt.gif";
                            common.show(b);
                            break;
                        case "lowlight":
                            b.src = "http://127.0.0.1:55555/images/SnLl.gif";
                            common.show(b);
                            break;
                        case "spotlight":
                            b.src = "http://127.0.0.1:55555/images/SnSl.gif";
                            common.show(b);
                            break;
                        case "fireworks":
                            b.src = "http://127.0.0.1:55555/images/SnFw.gif";
                            common.show(b);
                            break;
                        case "non":
                            common.hide(b);
                            break;
                        default:
                            common.hide(b)
                    }
                }
            }
        };
        var x = function() {};
        x.prototype = new p;
        (function() {
            this.init = function(a) {
                p.prototype.init.apply(this);
                j.set("ID1500Pr", prop.switching.run);
                j.set("ID1500Pe", prop.switching.err);
                if (a) this.cbFunc = common.copyHash({
                    rec: function(a) {
                        statusCtrl.current.rec = a;
                        C(a);
                        z(a)
                    }
                }, this.cbFunc)
            };
            this.destory = function() {
                p.prototype.destory.apply(this);
                j.clear("ID1500Pr");
                j.clear("ID1500Pe")
            }
        }).apply(x.prototype);
        var m = function() {};
        m.prototype = new p;
        (function() {
            this.init = function(a) {
                p.prototype.init.apply(this);
                if (a) this.cbFunc = common.copyHash({
                    rec: function(a) {
                        z(a)
                    }
                }, this.cbFunc)
            }
        }).apply(m.prototype);
        var u = function() {};
        u.prototype = new p;
        (function() {
            this.init = function(a) {
                p.prototype.init.apply(this);
                if (a) this.cbFunc = common.copyHash({
                    rec: function(a) {
                        statusCtrl.current.rec = a;
                        C(a)
                    }
                }, this.cbFunc)
            }
        }).apply(u.prototype);
        var z = function(a) {
                var b = "D" == a.slice(-1),
                    c = b ? a.slice(0, -1) : a,
                    h, a = "ID1901_";
                switch (c) {
                    case "Rec":
                    case "PreRec":
                    case "FrmRecStby":
                    case "FrmRec":
                    case "IntRecStby":
                    case "IntRec":
                    case "SFRec":
                    case "PlsRec":
                    case "PlsRecMP4Rec":
                    case "MP4Rec":
                    case "PreRecPlsRec":
                        h = common.createImgElement("rec" + c);
                        "hd" == format || "4k" == format ? h.unshift(common.createImgElement("mxfIcon")[0]) : "mp4hd" == format && h.unshift(common.createImgElement("mp4Icon")[0]);
                        h.unshift(common.createImgElement("recRecICON")[0]);
                        a += "photo" != format ? "r_" : "s_r_";
                        break;
                    case "Stby":
                    case "PreRecStby":
                    case "SFStby":
                    case "FrmStby":
                    case "IntStby":
                    case "PlsStby":
                    case "PlsRecMXFRec":
                    case "PlsRecMXFStby":
                    case "PlsRecMP4Stby":
                    case "PreRecPlsStby":
                    case "ContRecVrtuStby":
                    case "ContStbyVrtuStby":
                    case "MP4Stby":
                    case "ContRecVrtuRec":
                        h =
                            common.createImgElement("rec" + c);
                        "hd" == format || "4k" == format ? h.unshift(common.createImgElement("mxfIcon")[0]) : "mp4hd" == format && h.unshift(common.createImgElement("mp4Icon")[0]);
                        h.unshift(common.createImgElement("recStbyICON")[0]);
                        a += "photo" != format ? "r_" : "s_r_";
                        break;
                    case "off":
                        h = [], a += "photo" != format ? "o_" : "s_o_"
                }
                b && (h.unshift(common.createImgElement("recDoubleICON")[0]), a += "photo" != format ? "d_" : "s_d_");
                b = 0;
                for (c = h.length; b < recTypeStyle; b++) {
                    var d = common.get("ID1901_" + (b + 1));
                    if (b < c) d.src = h[b].src;
                    d.className =
                        a + (b + 1)
                }
                common.show("ID1901")
            },
            C = function(a) {
                var b = common.get("ID1224"),
                    a = "D" == a.slice(-1) ? a.slice(0, -1) : a;
                if (statusCtrl.current.recformat === "photo") b.src = common.changeImgPath(IMG_MAP.recPhotoBTN, currentLock.isLock());
                else switch (a) {
                    case "Stby":
                    case "PreRecStby":
                    case "FrmStby":
                    case "IntStby":
                    case "SFStby":
                    case "off":
                    case "PlsStby":
                    case "PreRecPlsStby":
                    case "ContRecVrtuStby":
                    case "ContStbyVrtuStby":
                    case "PlsRecMXFStby":
                    case "PlsRecMP4Stby":
                    case "PlsRecMP4Rec":
                    case "MP4Rec":
                    case "MP4Stby":
                    case "ContRecVrtuRec":
                        b.src =
                            common.changeImgPath(IMG_MAP.recStbyBTN, currentLock.isLock());
                        break;
                    case "Rec":
                    case "PreRec":
                    case "FrmRecStby":
                    case "FrmRec":
                    case "IntRecStby":
                    case "IntRec":
                    case "SFRec":
                    case "PlsRec":
                    case "PlsRecMXFRec":
                    case "PreRecPlsRec":
                        b.src = common.changeImgPath(IMG_MAP.recRecBTN, currentLock.isLock())
                }
            },
            B = function(a, b, c) {
                b ? (common.show(a), common.show(a + "_1")) : c ? (common.show(a), common.hide(a + "_1")) : common.hide(a)
            },
            o = function() {
                function a(a, d) {
                    var h, e;
                    h = statusCtrl.current.recformat === "photo" ? "s_value_" : "m_value_";
                    if (typeof d === "undefined") common.hide(a);
                    else {
                        e = -1 == d ? statusCtrl.current.recformat === "photo" ? "eeee" : "eeem" : statusCtrl.current.recformat === "photo" ? ("ssss" + d).slice(-4) : ("000" + d).slice(-3) + "m";
                        for (c = 3; c <= 6; c++) b = common.get(a + "_" + c), b.src = IMG_MAP[e.charAt(c - 3)], b.className = h + (c - 2), common.show(b)
                    }
                }
                var b, c;
                if (def.ctrl.name === "Advanced") {
                    var d = statusCtrl.current.Ocf.sel;
                    B("ID1307", -1 != d.indexOf("A"), -1 != d.indexOf("a"));
                    B("ID1308", -1 != d.indexOf("B"), -1 != d.indexOf("b"));
                    d = statusCtrl.current.Osd.sel; - 1 != d.indexOf("x") ?
                        common.get("ID1309_2").src = IMG_MAP.lSdSlot : common.get("ID1309_2").src = IMG_MAP.nSdSlot;
                    B("ID1309", -1 != d.indexOf("A"), -1 != d.indexOf("a"));
                    a("ID1307", statusCtrl.current.Ocf.artime);
                    a("ID1308", statusCtrl.current.Ocf.brtime);
                    a("ID1309", statusCtrl.current.Osd.artime)
                }
            },
            f = function(a, b, c, d, g, j, f) {
                ctrl.showSubType(a, !1);
                c = e(a, 0 === c, f);
                f = common.get(d + "_1");
                j ? (f.src = common.changeImgPath(IMG_MAP[a + b], c), f.className = d + "_" + g + "_1", common.show(f)) : common.hide(f);
                common.show(d)
            },
            d = function(a, b, c, d, g, j) {
                for (var a =
                        e(a, 0 === c, j), c = common.getChilds(d, "IMG").length - 2, j = 0, f = b.length; j < c; j++) {
                    var m = common.get(d + "_" + (j + 1));
                    j < f ? (m.src = common.changeImgPath(b[j].src, a), m.className = d + "_" + g + "_" + (j + 1), common.show(m)) : common.hide(m)
                }
                common.show(d)
            },
            e = function(a, b, c) {
                c = c ? b ? !0 : currentLock.isLock() : b ? !0 : !1;
                ctrl.enabledSubType(a, !c);
                statusCtrl.current[a].en = b ? 0 : 1;
                return c
            },
            j = {
                timerID: {},
                set: function(a, b) {
                    var c = setInterval(common.bindNotAppendArgs(this, j.blink, a), b);
                    this.timerID[a] = {
                        time: b,
                        timerId: c
                    }
                },
                clear: function(a) {
                    clearInterval(this.timerID[a].timerId);
                    delete this.timerID[a]
                },
                blink: function(a) {
                    var b = common.get(a + "_1");
                    common.isShow(a) && (common.isShow(b) ? common.hide(b) : common.show(b))
                }
            };
        return {
            statusObj: null,
            current: {
                seq: 0,
                fbtn: {
                    en: 1
                },
                ebtn: {
                    en: 1
                },
                focus: {
                    en: 1
                },
                iris: {
                    en: 1
                },
                view: {
                    en: 1
                },
                oneshot: {
                    en: 1
                },
                pushauto: {
                    en: 1
                },
                afmode: {
                    en: 1
                },
                aflock: {
                    en: 1
                },
                asem: {
                    en: 1
                },
                asep: {
                    en: 1
                },
                Offrame: {
                    movie: "off",
                    still: ""
                },
                faceficon: "off",
                Ocf: {
                    sel: "n",
                    artime: -1,
                    brtime: -1
                },
                Osd: {
                    sel: "n",
                    artime: -1
                },
                ev: {
                    en: 1
                },
                wbm: {
                    en: 1
                },
                wbv: {
                    en: 1
                },
                am: {
                    en: 1
                },
                av: {
                    en: 1
                },
                ssm: {
                    en: 1
                },
                ssv: {
                    en: 1
                },
                gcm: {
                    en: 1
                },
                gcv: {
                    en: 1
                },
                recformat: "4k"
            },
            init: function() {
                if ("Advanced" == def.ctrl.name) this.statusObj = new x;
                else if ("Metadata" == def.ctrl.name) this.statusObj = new m;
                else if ("Basic" == def.ctrl.name) this.statusObj = new u;
                ctrl.showSubType("focus", !1);
                ctrl.showSubType("iris", !1);
                ctrl.showSubType("rec", !1);
                ctrl.showSubType("view", !1);
                this.hidden(!0);
                this.statusObj.init(!0)
            },
            reset: function() {
                this.statusObj.destory();
                this.statusObj.init(!1)
            },
            hidden: function(a) {
                "Advanced" == def.ctrl.name ? (common.hide("ID1901"), common.hide("ID1302"),
                    common.hide("ID1303"), common.hide("ID1304"), common.hide("ID1307"), common.hide("ID1308"), common.hide("ID1309"), common.hide("ID1321"), common.hide("ID1322"), common.hide("ID1323"), common.hide("ID1324"), common.canvasControl.hide(), ctrl.showSubType("wbm", !1), ctrl.showSubType("wbv", !1), ctrl.showSubType("am", !1), ctrl.showSubType("av", !1), ctrl.showSubType("ssm", !1), ctrl.showSubType("ssv", !1), ctrl.showSubType("gcm", !1), ctrl.showSubType("gcv", !1), ctrl.showSubType("ev", !1)) : "Metadata" == def.ctrl.name && (common.hide("ID1901"),
                    common.hide("ID1302"), common.hide("ID1303"), a ? (common.hide("ID2210d"), common.hide("ID2210a"), common.hide("ID2210p"), common.hide("ID2210p0"), common.hide("ID2220d"), common.hide("ID2220e")) : common.isShow("ID2210a") || common.isShow("ID2210p") || common.isShow("ID2210p0") ? (common.show("ID2210d"), common.hide("ID2210a"), common.hide("ID2210p"), common.hide("ID2210p0"), common.hide("ID2220d"), common.hide("ID2220e")) : common.isShow("ID2220e") && (common.hide("ID2210d"), common.hide("ID2210a"), common.hide("ID2210p"),
                        common.hide("ID2210p0"), common.show("ID2220d"), common.hide("ID2220e")));
                common.messageBox.clear()
            }
        }
    }();

function scroll(p, x) {
    var m = common.copyHash(x, {
            TopClassName: "scroll-top",
            BtmClassName: "scroll-bottom",
            AreaClassName: "scroll-area",
            BoxClassName: "scroll-box",
            BoxMinSize: prop.scroll.boxH,
            Interval: prop.scroll.interval
        }),
        u = function() {
            var f = o.createElement("a");
            f.className = m.TopClassName;
            f.style.position = "absolute";
            f.style.top = "0px";
            f.style.right = "0px";
            var d = o.createElement("div");
            f.appendChild(d);
            return f
        },
        z = function() {
            var f = o.createElement("a");
            f.className = m.BtmClassName;
            f.style.position = "absolute";
            f.style.right =
                "0px";
            f.style.bottom = "0px";
            var d = o.createElement("div");
            f.appendChild(d);
            return f
        },
        C = function(f) {
            var d = o.createElement("a");
            d.style.position = "absolute";
            d.className = m.AreaClassName;
            d.style.right = "0px";
            d.style.top = "16px";
            d.style.height = f - 16 - 16 + "px";
            return d
        },
        B = function(f, d, e) {
            var j = parseInt(d.style.height, 10);
            parseInt(d.style.width, 10);
            f = j / ((e - f + m.Interval) / m.Interval);
            m.BoxMinSize > f ? f = m.BoxMinSize : 5 > f && (f = 5);
            e = o.createElement("a");
            e.style.position = "absolute";
            e.className = m.BoxClassName;
            e.style.right =
                "0px";
            e.style.top = d.style.top;
            e.style.height = f + "px";
            d = o.createElement("a");
            d.style.position = "absolute";
            d.className = "scrollBox-top";
            e.appendChild(d);
            d = o.createElement("a");
            d.style.position = "absolute";
            d.className = "scrollBox-bot";
            e.appendChild(d);
            j = o.createElement("a");
            j.style.position = "absolute";
            j.className = "scrollBox-center";
            j.style.height = f - 2 - 2 + "px";
            j.style.top = "2px";
            e.appendChild(j);
            d.style.top = f - 2 + "px";
            return e
        },
        o = document;
    (function(f, d) {
        var e = common.get("panel-container"),
            j = parseInt(common.getCssStyle(e).height,
                10);
        parseInt(common.getCssStyle(e).width, 10);
        var a = m.InnerHeight;
        if (!(a < j)) {
            var b = u();
            b.id = "panel-scroll-top-" + d;
            var c = z();
            c.id = "panel-scroll-btm-" + d;
            e.appendChild(b);
            e.appendChild(c);
            var h = C(j);
            h.id = "panel-scroll-area-" + d;
            e.appendChild(h);
            var g = B(j, h, a);
            g.id = "panel-scroll-box-" + d;
            e.appendChild(g);
            var i = function(b, c) {
                    var d = (a - j) / (parseInt(h.style.height, 10) - parseInt(g.style.height, 10)),
                        e = 0,
                        f = document.getElementById("panel-container").firstChild,
                        t = parseInt(h.style.top, 10),
                        k = parseFloat(g.style.top,
                            10);
                    if (c) {
                        if (t == k) {
                            g.style.top = h.style.top;
                            f.style.top = "0px";
                            return
                        }
                        k - t > b ? (g.style.top = k - b + "px", e = (k - b - t) * d * -1, f.style.top = e + "px") : (g.style.top = h.style.top, f.style.top = "0px")
                    } else {
                        var e = t + parseInt(h.style.height, 10),
                            l = parseFloat(g.style.top, 10) + parseInt(g.style.height, 10);
                        if (e == l) {
                            g.style.top = e - parseInt(g.style.height, 10) + "px";
                            e = j - a;
                            f.style.top = e + "px";
                            return
                        }
                        e - l > b ? (g.style.top = k + b + "px", e = (k + b - t) * d * -1) : (g.style.top = e - parseInt(g.style.height, 10) + "px", e = j - a);
                        f.style.top = e + "px"
                    }
                    if (m.viewDatas) {
                        for (var d =
                                m.viewDatas, n = d.length, i = Math.abs(e), t = 0, k = 1, l = 2, D = [], e = 0; e < n; e++) d[e].topPos <= i && i <= d[e].bottomPos && (k = e, t = e - 1, l = e + 1), d[e].viewFlag && D.push(e);
                        if (!d[k].viewFlag) f.appendChild(d[k].fragment.cloneNode(!0)), d[k].viewFlag = !0;
                        if (t != -1 && !d[t].viewFlag) f.appendChild(d[t].fragment.cloneNode(!0)), d[t].viewFlag = !0;
                        if (l != d.length && !d[l].viewFlag) f.appendChild(d[l].fragment.cloneNode(!0)), d[l].viewFlag = !0;
                        e = 0;
                        for (delLen = D.length; e < delLen; e++)
                            if (D[e] != t && D[e] != k && D[e] != l) {
                                n = d[D[e]];
                                n.viewFlag = !1;
                                f = n.index;
                                for (viewCnt =
                                    n.index + n.viewCnt; f < viewCnt; f++) common.removeElement(common.get(n.btnId + "__" + f))
                            }
                    }
                },
                o = function(b) {
                    var b = common.getEvent(b),
                        d = 0;
                    b.wheelDelta ? d = b.wheelDelta / 120 : b.detail && (d = b.detail / 3 * -1);
                    var c = parseInt(h.style.height, 10) / (a - j + m.Interval);
                    d > 0 ? i(m.Interval * c, !0) : i(m.Interval * c, !1);
                    common.stopEvent(b)
                },
                p = !1,
                x = function() {
                    p = !0;
                    var a = common.getChilds(g, "A");
                    a[0].style.backgroundImage = 'url("http://127.0.0.1:55555/images/SBHt_nc.gif")';
                    a[1].style.backgroundImage = 'url("http://127.0.0.1:55555/images/SBHb_nc.gif")';
                    a[2].style.backgroundImage = 'url("http://127.0.0.1:55555/images/SBHc_nc.gif")';
                    return !1
                },
                A = function() {
                    p = !1;
                    var a = common.getChilds(g, "A");
                    a[0].style.backgroundImage = 'url("http://127.0.0.1:55555/images/SBHt_n.gif")';
                    a[1].style.backgroundImage = 'url("http://127.0.0.1:55555/images/SBHb_n.gif")';
                    a[2].style.backgroundImage = 'url("http://127.0.0.1:55555/images/SBHc_n.gif")';
                    return !1
                },
                E = [],
                t = null,
                D = function() {
                    var a = E.pop();
                    i(a.interval, a.up);
                    t = null;
                    E = []
                },
                F = 0,
                G = function(a) {
                    if (p) {
                        var a = common.getEvent(a),
                            b = common.getPosition(g).y,
                            d = common.getPosition(g).x,
                            c = parseInt(g.style.height, 10);
                        b += c / 2;
                        c = common.getMousePosition(a);
                        F === 0 && (F = c.x / d);
                        c.y /= F;
                        c.y =
                            common.roundExtend(c.y, 0);
                        Math.abs(c.y - b) < 1 || (E.push({
                            up: c.y <= b,
                            interval: Math.abs(b - c.y)
                        }), t === null && (t = setTimeout(D, prop.scroll.culltime)), common.stopEvent(a))
                    } else F = 0
                };
            b.onclick = function() {
                var b = parseInt(h.style.height, 10) / (a - j + m.Interval);
                i(m.Interval * b, !0);
                this.style.backgroundImage = 'url("http://127.0.0.1:55555/images/ScBuU_n.gif")'
            };
            common.isTouchBrowser() ? (b.ontouchstart = function() {
                    this.style.backgroundImage = 'url("http://127.0.0.1:55555/images/ScBuU_nc.gif")'
                }, b.ontouchend = function() {
                    this.style.backgroundImage = 'url("http://127.0.0.1:55555/images/ScBuU_n.gif")'
                },
                b.ontouchmove = function() {
                    this.style.backgroundImage = 'url("http://127.0.0.1:55555/images/ScBuU_n.gif")'
                }) : (b.onmousedown = function() {
                this.style.backgroundImage = 'url("http://127.0.0.1:55555/images/ScBuU_nc.gif")'
            }, b.onmouseout = function() {
                this.style.backgroundImage = 'url("http://127.0.0.1:55555/images/ScBuU_n.gif")'
            });
            c.onclick = function() {
                var b = parseInt(h.style.height, 10) / (a - j + m.Interval);
                i(m.Interval * b, !1);
                this.style.backgroundImage = 'url("http://127.0.0.1:55555/images/ScBuD_n.gif")'
            };
            common.isTouchBrowser() ? (c.ontouchstart = function() {
                    this.style.backgroundImage = 'url("http://127.0.0.1:55555/images/ScBuD_nc.gif")'
                },
                c.ontouchend = function() {
                    this.style.backgroundImage = 'url("http://127.0.0.1:55555/images/ScBuD_n.gif")'
                }, c.ontouchmove = function() {
                    this.style.backgroundImage = 'url("http://127.0.0.1:55555/images/ScBuD_n.gif")'
                }) : (c.onmousedown = function() {
                this.style.backgroundImage = 'url("http://127.0.0.1:55555/images/ScBuD_nc.gif")'
            }, c.onmouseout = function() {
                this.style.backgroundImage = 'url("http://127.0.0.1:55555/images/ScBuD_n.gif")'
            });
            common.Browser == BrowserType.FIREFOX ? document.getElementById("panel-container").addEventListener("DOMMouseScroll", o, !1) : e.onmousewheel = o;
            common.isTouchBrowser() ? g.ontouchstart =
                x : g.onmousedown = x;
            var l;
            common.isTouchBrowser() ? g.ontouchend ? (l = g.ontouchend, g.ontouchend = function(a) {
                l(a);
                A(a)
            }) : g.ontouchend = A : (g.onmouseup = A, g.onmouseout = A);
            common.isTouchBrowser() ? g.ontouchmove ? (l = g.ontouchmove, g.ontouchmove = function(a) {
                l(a);
                G(a)
            }) : g.ontouchmove = G : g.onmousemove = G;
            h.onclick = function(a) {
                var b = common.getEvent(a),
                    c = common.getPosition(g).y,
                    a = common.getPosition(g).x,
                    d = parseInt(g.style.height, 10);
                c += d / 2;
                b = common.getMousePosition(b);
                b.y /= b.x / a;
                b.y = common.roundExtend(b.y, 0);
                b.y <= c ? i(c -
                    b.y, !0) : i(b.y - c, !1)
            };
            srcBox = srcArea = c = b = e = null
        }
    })(p, common.getUniqueNumber());
    p = o = null
}
var secondCtrl = function() {
    function p() {
        var d = arguments[arguments.length - 2],
            e = {};
        e[d] = arguments[arguments.length - 1];
        common.ajax("http://127.0.0.1:55555/api/cam/setprop", {
            params: e
        });
        ctrl.changeScreen("ID_Control_Setting", "ID_Control_Status");
        ctrl.showSubType(d, !1);
        switch (d) {
            case "am":
                ctrl.showSubType("am", !1);
                break;
            case "wbm":
                ctrl.showSubType("wbv", !1);
                break;
            case "ssm":
                ctrl.showSubType("ssv", !1);
                break;
            case "gcm":
                ctrl.showSubType("gcv", !1)
        }
        secondCtrl.close()
    }

    function x(d, e, j) {
        d = document.createElement("div");
        d.id = "ID1603";
        d.className = j ? "ID1603_btn_one" : "ID1603_btn_two";
        var a = new Image;
        a.id = "BTN_ID1603";
        a.src = j ? "http://127.0.0.1:55555/images/S2BL_n.gif" : "http://127.0.0.1:55555/images/S2Bu_n.gif";
        d.appendChild(a);
        for (j = 1; j <= e; j++) a = new Image, a.id = "ID1603_" + j, d.appendChild(a);
        e = new Image;
        e.id = "WRAP_ID1603";
        e.src = "http://127.0.0.1:55555/images/Spacer.gif";
        e.className = "wrap";
        d.appendChild(e);
        return d
    }

    function m(d, e) {
        switch (d.res) {
            case "ok":
                clearTimeout(f);
                f = null;
                break;
            case "failparam":
            case "failid":
                return;
            case "busy":
                f = setTimeout(function() {
                    B(e)
                }, prop.ajax.retryInterval);
                return
        }
        var j =
            "O" + e,
            a = parseInt(d[j].rvn, 10),
            b = !1,
            c;
        switch (e) {
            case "wbm":
                c = 1;
                break;
            case "wbv":
                c = 6;
                break;
            case "am":
                c = 1;
                break;
            case "av":
                c = a;
                break;
            case "ssm":
                c = 1;
                break;
            case "ssv":
                c = 7;
                break;
            case "gcm":
                c = 1;
                b = !0;
                break;
            case "gcv":
                c = 5;
                break;
            case "ev":
                c = 6
        }
        var h = x(e, c, b),
            g = common.get("ID1601_panel"),
            i = common.get("panel-container");
        i && (i.parentNode.removeChild(i), i = null);
        i = document.createElement("div");
        i.style.position = "relative";
        i.style.overflow = "hidden";
        i.id = "panel-container";
        i.className = "panel";
        g.appendChild(i);
        var m = document.createElement("div");
        i.appendChild(m);
        var o = 0,
            o = b ? 68 * (a - 1) : 68 * Math.floor((a - 1) / 2),
            H = RegExp("^" + h.id + ".*", "i");
        common.addChangeImageEvent(i, function(a) {
            for (var b = common.getEventSrc(common.getEvent(a)); !b.id || !b.id.match(H);) {
                if ("panel-container" == b.id) return;
                b = b.parentNode;
                if (!b) return
            }
            var c = b.getElementsByTagName("IMG");
            switch (a.type) {
                case "mousedown":
                case "touchstart":
                    a = 0;
                    for (len = c.length; a < len; a++) common.changeClickImage(c[a], !0);
                    break;
                case "click":
                    a = common.getChilds(b, "INPUT");
                    p(e, a[0].value);
                    a = 0;
                    for (len = c.length; a <
                        len; a++) common.changeClickImage(c[a], !1);
                    break;
                case "mouseout":
                case "touchmove":
                case "touchend":
                    a = 0;
                    for (len = c.length; a < len; a++) common.changeClickImage(c[a], !1)
            }
        }, !1);
        var A = [],
            E = function(a, g, f) {
                var i = {};
                b ? (i.topPos = 68 * a, i.bottomPos = 68 * (a + f < g ? a + f : g - 1)) : (i.topPos = 68 * Math.floor(a / 2), i.bottomPos = 68 * (a + f < g ? a + f / 2 : g - 1));
                for (var l = a, p = document.createDocumentFragment(), v, r, w = l, x = l + f; w < x && w < g; w++) {
                    v = h.cloneNode(!0);
                    r = "__" + l;
                    common.nestIdSuffix(v, r);
                    b ? (v.style.top = 68 * w + "px", v.style.left = "18px", w == g - 1 && (o = 68 *
                        w)) : (v.style.top = 68 * Math.floor(w / 2) + "px", v.style.left = 18 + 109 * (w % 2) + "px", w == g - 1 && (o = 68 * Math.floor(w / 2)));
                    l = document.createElement("input");
                    l.type = "hidden";
                    l.value = d[j].rv[w];
                    v.appendChild(l);
                    var q = v,
                        l = e,
                        k = d[j].rv[w],
                        y = c,
                        n = void 0,
                        s = 1;
                    switch (l) {
                        case "wbm":
                        case "ssm":
                        case "am":
                        case "gcm":
                            q = common.getChildById(q, "ID1603_1" + r);
                            q.src = common.createImgElement(l + k)[0].src;
                            q.className = "Automatic" == k || "Manual" == k ? "ID1603_" + l + "3_1" : "ssm" == l && "cls" == k ? "ID1603_" + l + "2_1" : "ID1603_" + l + "1_1";
                            break;
                        case "wbv":
                            n = common.createImgElement(k);
                            switch (statusCtrl.current.wbm.pv) {
                                case "Kelvin":
                                case "Automatic":
                                    n.push(common.createImgElement("wbvK")[0]);
                                    z(n, y, q, r, l, "K1");
                                    break;
                                case "Daylight":
                                case "Tungsten":
                                    s = "3", "0" == k ? (n.unshift(common.createImgElement("-")[0]), n.unshift(common.createImgElement("+")[0]), s = "2") : -1 == k.indexOf("-") && (n.unshift(common.createImgElement("+")[0]), s = "1"), u(n, y, q, r, l, "W" + s)
                            }
                            break;
                        case "av":
                            if (k == "CLOSE") n = common.createImgElement("av" + k), s = "0";
                            else switch (n = common.createImgElement(k), n.unshift(common.createImgElement("avF")[0]),
                                k.length) {
                                case 2:
                                    s = "1";
                                    break;
                                case 3:
                                    s = "2";
                                    break;
                                case 6:
                                    s = "3";
                                    break;
                                case 7:
                                    s = "4";
                                    break;
                                case 8:
                                    s = "5";
                                    break;
                                case 9:
                                    s = "6"
                            }
                            u(n, y, q, r, l, s);
                            break;
                        case "ssv":
                            n = common.createImgElement(k);
                            switch ("speed") {
                                case "off":
                                case "speed":
                                case "slow":
                                case "Automatic":
                                    k[1] === '"' ? u(n, y, q, r, l, "s2") : u(n, y, q, r, l, "s1");
                                    break;
                                case "angle":
                                    n.push(common.createImgElement("ssvangle")[0]); - 1 != k.indexOf(".") && 4 == k.length ? u(n, y, q, r, l, "a2") : -1 == k.indexOf(".") && 3 == k.length ? u(n, y, q, r, l, "a3") : z(n, y, q, r, l, "a1");
                                    break;
                                case "cls":
                                    n.push(common.createImgElement("ssvcls")[0]),
                                        z(n, y, q, r, l, "c1")
                            }
                            break;
                        case "gcv":
                            n = common.createImgElement(k);
                            switch (statusCtrl.current.gcm.pv) {
                                case "iso":
                                    z(n, y, q, r, l, "i1");
                                    break;
                                case "gain":
                                case "Automatic":
                                case "Manual":
                                    n.push(common.createImgElement("gcvDb")[0]), z(n, y, q, r, l, "g" + (-1 == k.indexOf("-") ? "1" : "2"))
                            }
                            break;
                        case "ev":
                            n = common.createImgElement(k.replace(/\s+/g, ""));
                            "0" == k ? (n.unshift(common.createImgElement("-")[0]), n.unshift(common.createImgElement("+")[0]), s = 1) : s = n.length === 2 ? -1 != k.indexOf("-") ? 2 : 3 : n.length === 5 ? -1 != k.indexOf("-") ? 4 :
                                5 : -1 != k.indexOf("-") ? 6 : 7;
                            for (k = 1; k <= n.length; k++) common.getChildById(q, "ID1603_" + k + r).className = "ID1603_ev" + s + "_" + k;
                            u(n, y, q, r, l, s)
                    }
                    l = w + 1;
                    common.show(v);
                    p.appendChild(v)
                }
                i.fragment = p;
                i.index = a;
                i.viewCnt = a + f < g ? f : g - a;
                i.btnId = h.id;
                A.push(i);
                p = Math.abs(parseInt(m.style.top, 10));
                v = p + 528;
                i.topPos <= p && p <= i.bottomPos || i.topPos <= v && v <= i.bottomPos ? (m.appendChild(i.fragment.cloneNode(!0)), i.viewFlag = !0) : i.viewFlag = !1;
                a + f < g && setTimeout(common.bindNotAppendArgs(this, E, a + f, g, f), prop.second.interval)
            };
        E(0, a, prop.second.pageitem);
        m.appendChild(A[0].fragment.cloneNode(!0));
        A[0].viewFlag = !0;
        a >= 1500 ? scroll(m, {
            BoxMinSize: prop.scroll.boxH,
            InnerHeight: 60 + o,
            viewDatas: A
        }) : scroll(m, {
            InnerHeight: 60 + o,
            viewDatas: A
        });
        C(currentLock.isLock())
    }

    function u(d, e, f, a, b, c) {
        for (var h = d.length, g = 0; g < e; g++) {
            var i = common.getChildById(f, "ID1603_" + (g + 1) + a);
            g < h ? (i.src = d[g].src, i.className = "ID1603_" + b + c + "_" + (g + 1)) : common.removeElement(i)
        }
    }

    function z(d, e, f, a, b, c) {
        for (var h = d.length, g = 0, i = 0; g < e; g++) {
            var m = common.getChildById(f, "ID1603_" + (g + 1) + a);
            g < e - h ? common.removeElement(m) :
                (m.src = d[i].src, m.className = "ID1603_" + b + c + "_" + (g + 1), i++)
        }
    }

    function C(d) {
        var e = common.get("ID_Control_Setting").getElementsByTagName("IMG"),
            f;
        f = 0;
        for (len = e.length; f < len; f++) e[f].src = common.compelChangeImgPath(e[f].src, d ? "d" : "n");
        e = common.get("ID_Control_Setting").getElementsByTagName("A");
        f = 0;
        for (leng = e.length; f < leng; f++)
            if ("scrollBox-top" == e[f].className) e[f].style.backgroundImage = d ? "url('http://127.0.0.1:55555/images/SBHt_nd.gif')" : "url('http://127.0.0.1:55555/images/SBHt_n.gif')";
            else if ("scrollBox-center" == e[f].className) e[f].style.backgroundImage =
            d ? "url('http://127.0.0.1:55555/images/SBHc_nd.gif')" : "url('http://127.0.0.1:55555/images/SBHc_n.gif')";
        else if ("scrollBox-bot" == e[f].className) e[f].style.backgroundImage = d ? "url('http://127.0.0.1:55555/images/SBHb_nd.gif')" : "url('http://127.0.0.1:55555/images/SBHb_n.gif')";
        else if ("scroll-top" == e[f].className) e[f].style.backgroundImage = d ? "url('http://127.0.0.1:55555/images/ScBuU_nd.gif')" : "url('http://127.0.0.1:55555/images/ScBuU_n.gif')";
        else if ("scroll-bottom" == e[f].className) e[f].style.backgroundImage = d ? "url('http://127.0.0.1:55555/images/ScBuD_nd.gif')" : "url('http://127.0.0.1:55555/images/ScBuD_n.gif')"
    }

    function B(d) {
        clearTimeout(f);
        f = null;
        common.isShow("ID_Control_Setting") &&
            common.ajax("http://127.0.0.1:55555/api/cam/getprop", {
                callback: common.bind(this, m, d),
                abort: common.bind(this, o, d),
                params: {
                    r: d
                }
            })
    }

    function o(d) {
        f = setTimeout(function() {
            B(d)
        }, prop.ajax.retryInterval)
    }
    var f = null;
    return {
        settingScope: function(d) {
            var e, f = "";
            switch (d) {
                case "wbv":
                    e = IMG_MAP["wbm" + statusCtrl.current.wbm.pv];
                    break;
                case "ssv":
                    "cls" == statusCtrl.current.ssm.pv && (f = "c");
                    break;
                case "gcv":
                    e = IMG_MAP["gcm" + statusCtrl.current.gcm.pv]
            }
            var a = common.get("ID1602");
            e ? (a.src = e, a.className = "ID1602_" + d + f, common.show(a)) : common.hide(a);
            B(d);
            currentLock.addDelegater("secondCtrl", common.bind(this, C, this.genre))
        },
        close: function() {
            var d = common.get("ID1602");
            d.src = "http://127.0.0.1:55555/images/Spacer.gif";
            common.hide(d);
            currentLock.delDelegater("secondCtrl");
            (d = common.get("panel-container")) && d.parentNode.removeChild(d)
        }
    }
}();