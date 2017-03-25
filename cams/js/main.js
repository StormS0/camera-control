var j = jQuery.noConflict();

var client = new savona.client();
var client_two = new savona_two.client();

client.onconnect = client_two.onconnect = connectionStateHandler;
client.ondisconnect = client_two.ondisconnect = connectionStateHandler;
client.onnotify = client_two.onnotify = sonyConnectionNotifyHandler;

var g_OldObject = null;
var g_objABStatusDlg = j("DIV_BALANCE_STATUS_DLG");
var g_objRecStop = j("DIV_REC_STOP");
var g_objRecStart = j("DIV_REC_START");

j('.control_btn').each(function(){
    j(this).click(function(e){
        //e.preventDefault();
        j(this).toggleClass('active');
        j(this).next('.control_cameras').toggle();
    });
});

initClicker();

//InitMainData();

connect();
connect_two();

function sonyConnectionNotifyHandler(event){
    var jsonstring;
    var objArrItems;
    if (typeof JSON !== 'undefined') {
        jsonstring = JSON.stringify(event.data);
    } else { // sorry, IE does not have JSON.stringify
        jsonstring = event.data;
    }
    if (event.name == "Notify.Property.Value.Changed") {
        objArrItems = JSON.parse(jsonstring)[0];
        ShutterCtrl.NotifySetShutterData(objArrItems);
        RecordCtrl.NotifySetRecorderData(objArrItems);
        AssignCtrl.NotifySetAssignData(objArrItems);
        ColorBarsCtrl.NotifySetColorBarsData(objArrItems);
        SQFPSCtrl.NotifySetSQFPSData(objArrItems);
        WhiteCtrl.NotifySetClrTempData(objArrItems);
        GammaCtrl.NotifySetGammaData(objArrItems);
        MLUTCtrl.NotifySetMLUTData(objArrItems);
        SetCardNotifyData(objArrItems); //Card Notify
        MainBtteryNotifyData(objArrItems); //MainBattery Notify
        SetAudioNotifyData(objArrItems); //Audio
        SetClipNotifyData(objArrItems); //Clip number
        AutoIrisCtrl.NotifySetAutoIrisData(objArrItems);
        AutoShutterCtrl.NotifySetAutoShutterData(objArrItems);
        AGCCtrl.NotifySetAGCData(objArrItems);
        ATWCtrl.NotifySetATWData(objArrItems);
        GainCtrl.NotifySetGainData(objArrItems);
        AWBCtrl.NotifySetAWBData(objArrItems);
        ABBCtrl.NotifySetABBData(objArrItems);
        LensMountCtrl.NotifySetLensMountData(objArrItems);
        FocusCtrl.NotifySetFocusData(objArrItems);
        ZoomCtrl.NotifySetZoomData(objArrItems);
        IrisCtrl.NotifySetIrisData(objArrItems);
        MainFileNotifyData(objArrItems); //Main File
        SetShootModeNotifyData(objArrItems); //Shooting Mode Notify
        ClipNameCtrl.NotifySetClipNameData(objArrItems);
    } else if (event.name == "Notify.Property.Status.Changed") {
        objArrItems = JSON.parse(jsonstring)[0];
        NotifyMessagePopupProperties(objArrItems);
        ShutterCtrl.NotifyShutterStatusData(objArrItems);
    } else if (event.name == "Notify.Process.ErrorOccurred") {
        objArrItems = JSON.parse(jsonstring)[0];
        if (objArrItems == "Camera.WhiteBalance") {
            g_objABStatusDlg.userData.SetTitle("Auto White");
            g_objABStatusDlg.userData.SetText("Auto White Balance", "NG");
            g_objABStatusDlg.userData.ShowDialog();
        }
        if (objArrItems == "Camera.BlackBalance") {
            g_objABStatusDlg.userData.SetTitle("Auto Black");
            g_objABStatusDlg.userData.SetText("Auto Black Balance", "NG");
            g_objABStatusDlg.userData.ShowDialog();
        }
    } else if (event.name == "Notify.Process.Completed") {
        objArrItems = JSON.parse(jsonstring)[0];
        if (objArrItems == "Camera.WhiteBalance") {
            g_objABStatusDlg.userData.SetTitle("Auto White");
            g_objABStatusDlg.userData.SetText("Auto White Balance", "OK");
            g_objABStatusDlg.userData.ShowDialog();
        }
        if (objArrItems == "Camera.BlackBalance") {
            g_objABStatusDlg.userData.SetTitle("Auto Black");
            g_objABStatusDlg.userData.SetText("Auto Black Balance", "OK");
            g_objABStatusDlg.userData.ShowDialog();
        }
    } else if (event.name == "Notify.Process.Started") {
        closeAllShowingDialog();
        objArrItems = JSON.parse(jsonstring)[0];
        j.each(objArrItems, function(key, value) {
            if (key == "Camera.WhiteBalance") {
                g_objABStatusDlg.userData.ShowDialog(false);
            }
            if (key == "Camera.BlackBalance") {
                g_objABStatusDlg.userData.ShowDialog(false);
            }
        });
    } else if (event.name == "Notify.Process.Aborted") {
        objArrItems = JSON.parse(jsonstring)[0];
        j.each(objArrItems, function(key, value) {
            if (key == "Camera.WhiteBalance") {
                g_objABStatusDlg.userData.SetTitle("Auto White");
                g_objABStatusDlg.userData.SetText("Auto White Balance", "Cancelled");
                g_objABStatusDlg.userData.ShowDialog();
            }
            if (key == "Camera.BlackBalance") {
                g_objABStatusDlg.userData.SetTitle("Auto Black");
                g_objABStatusDlg.userData.SetText("Auto Black Balance", "Cancelled");
                g_objABStatusDlg.userData.ShowDialog();
            }
        });
    }
}

function connectionStateHandler(e){
    if (e.type == "connected") {
        $("TEXT_WIFI_STATUS").innerHTML = "Connected";
        $("DIV_WIFI_STATUS_C").style.display = "inline-block";
        $("DIV_WIFI_STATUS_D").style.display = "none";
        g_RmtTimerId = setInterval(connect, 5000);
        Reconnect();
    } else {
        $("TEXT_WIFI_STATUS").innerHTML = "Disconnected";
        $("DIV_WIFI_STATUS_C").style.display = "none";
        $("DIV_WIFI_STATUS_D").style.display = "inline-block";

        if (g_OldObject) {
            g_OldObject.userData[1].ShowDialog(false);
            g_OldObject = null;
            return;
        }
    }
}

function initClicker(){
    var clicker = 0; //щёлкатель
    j('html').on('click', '#rec', function(){
        j.ajax({
            type: "GET",
            url: "http://127.0.0.1:55555/api/cam/rec?cmd=trig",
            dataType: 'json',
            success: function(msg) {
                console.log(msg);
            }
        });

        if(clicker == 0) {
            //g_objRecStart.click();
            RecordCtrl.RecorderStartRecord();
            clicker = 1;
            console.log('запись');
        } else {
            //g_objRecStop.click();
            RecordCtrl.RecorderStopRecord();
            clicker = 0;
            console.log('стоп');
        }
    });
}

function initCanon(){
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('POST', 'http://127.0.0.1:55555', true)
    xhr.send();
    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
        var xhr_two;
        xhr_two = new XMLHttpRequest();
        xhr_two.withCredentials = true;
        xhr_two.open('POST', 'http://127.0.0.1:55555/api/cam/lv?cmd=start&sz=l', true)
        xhr_two.send();
        if (xhr_two.status != 200) {
            j('#ID1258').click();
            console.log( xhr_two.status + ': ' + xhr_two.statusText );

            var interRand = 0;
            var viewSpeed = 200;
            setInterval(function() {
                interRand = Math.random();
                j('#ID1200').delay(viewSpeed).css('backgroundImage', 'url(http://127.0.0.1:55555/api/cam/lvgetimg?baba=' + interRand + ')');
                j('#liveview').attr('src', 'http://127.0.0.1:55555/api/cam/lvgetimg?baba=' + interRand);
            }, viewSpeed)
        } else {
            console.log( xhr_two.responseText );
        }
    } else {
        console.log( xhr.responseText );
    }
}

function connect() {
    if (client.state() !== 'disconnected') return
    client.connect();
}

function connect_two() {
    if (client_two.state() !== 'disconnected') return
    client_two.connect();
}

function Reconnect() {
    connect();
    connect_two();
    console.log("connected");
    // GetValue();
    // GetStatus();
}

function NotifySubscribe() {
    names = ["Notify.Properties", "Notify.Process", "Notify.Property"];
    var id = client.notify.Subscribe({
        params: names,
        onresponse: function(resp) {}
    });
    id = client_two.notify.Subscribe({
        params: names,
        onresponse: function(resp) {}
    });
}



function InitMainData() {
    //Rec Button
    g_objRecStop.userData = new RecButtonCtrl(g_objRecStop, CBButtonClickRec, "URL(images/RecStop_Pressed.png)", "URL(images/RecStop_Normal.png)");
    g_objRecStart.userData = new RecButtonCtrl(g_objRecStart, CBButtonClickRec, "URL(images/RecStart_Pressed.png)", "URL(images/RecStart_Normal.png)");
}

function GetValue() {
    //Assign
    //AssignCtrl.GetValue();

    //Main
    // SQFPSCtrl.GetValue();
    // ShutterCtrl.GetValue();
    // WhiteCtrl.GetValue();
    // GammaCtrl.GetValue();
    // MLUTCtrl.GetValue();
    // AutoIrisCtrl.GetValue();
    // AutoShutterCtrl.GetValue();
    // AGCCtrl.GetValue();
    // ATWCtrl.GetValue();
    // GainCtrl.GetValue();
    // ColorBarsCtrl.GetValue();
    RecordCtrl.GetValue();
    // GetAudioValue();
    // GetClipProperties()
    // GetMainFileValue();
    // GetCardValue();
    // GetMainBtteryValue();
    // LensMountCtrl.GetValue();
    // IrisCtrl.GetValue();
    // FocusCtrl.GetValue();
    // ZoomCtrl.GetValue();
    // GetShootModeValue();
    // ClipNameCtrl.GetValue();
}

function GetStatus() {
    //Main
    // SQFPSCtrl.GetStatus();
    // ShutterCtrl.GetStatus();
    // WhiteCtrl.GetStatus();
    // GammaCtrl.GetStatus();
    // MLUTCtrl.GetStatus();
    // AutoIrisCtrl.GetStatus();
    // AutoShutterCtrl.GetStatus();
    // AGCCtrl.GetStatus();
    // ATWCtrl.GetStatus();
    // GainCtrl.GetStatus();
    // ColorBarsCtrl.GetStatus();
    // AWBCtrl.GetStatus();
    // ABBCtrl.GetStatus();
    // IrisCtrl.GetStatus();
    // ZoomCtrl.GetStatus();
    // FocusCtrl.GetStatus();
    // ShutterCtrl.GetShutterValueStatus();
}

function CBButtonClickRec(objSrc) {
    console.log("rec");
    if ("DIV_REC_STOP" == objSrc.id) RecordCtrl.RecorderStopRecord()
    if ("DIV_REC_START" == objSrc.id) RecordCtrl.RecorderStartRecord()
}