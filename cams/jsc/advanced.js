/* Copyright CANON INC. 2016 */
var prop = {
    ajax: {},
    msgbox: {},
    status: {},
    view: {},
    af: {},
    switching: {},
    second: {},
    scroll: {}
};
prop.ajax.timeout = 2E3;
prop.ajax.retryInterval = 1E3;
prop.msgbox.x = 370;
prop.msgbox.y = 340;
prop.msgbox.w = 290;
prop.status.interval = 1E3;
prop.view.interval = 100;
prop.view.timeout = 2E3;
prop.view.stopretry = 3;
prop.af.LINEWIDTH = 2;
prop.af.run = "#fbfbfb";
prop.af.err = "#ffff00";
prop.af.achieve = "#1be823";
prop.af.contin = "#fbfbfb";
prop.af.lock = "#808080";
prop.af.SHADOWWIDTH = 1;
prop.af.SHADOWCOLOR = "#000000";
prop.switching.run = 200;
prop.switching.err = 500;
prop.second.pageitem = 20;
prop.second.interval = 10;
prop.scroll.interval = 150;
prop.scroll.boxH = 30;
prop.scroll.culltime = 20;
var def = {
    ctrl: {},
    param: {},
    img: {}
};
def.ctrl.name = "Advanced";
def.param.viewsize = "l";
def.img.stby = "http://127.0.0.1:55555/images/StStn.gif";
def.img.rec = "http://127.0.0.1:55555/images/StStRn.gif";
def.img.photo = "http://127.0.0.1:55555/images/SlRn.gif";