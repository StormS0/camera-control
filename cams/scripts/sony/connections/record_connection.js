// JavaScript Document

var Status1Value = "";
var Status2Value = "";
var RECRedStatusValue = 0; // 0: OFF 1:REC
var PlayBackInfoStatusValue = 0; // 0: OFF 1:PLAY

var g_MediaBoxStatus = null;
var g_MediaBoxMode = null;
var g_MediaBoxSpeed = null;
var g_IsSimulRecord = false;
var g_SimulRecoedMode = null;

var RecordCtrl = {
	
	RecorderOpen : function() 
	{
        var params = [];
        client.clip.recorder.Open({params: params,	onresponse: function(resp){}});
        client_two.clip.recorder.Open({params: params,	onresponse: function(resp){}});
    },
							
	//Get RecordStatus Functions
	GetValue : function ()
	{
		var names = {"P.Clip.Mediabox.Mode":null, "P.Clip.Mediabox.Speed":null,
					"P.Clip.Mediabox.Status":null, "P.Clip.Mediabox.TimeCode":null,
					"P.Clip.Mediabox.TimeCode.Locked":null,"P.Clip.Mediabox.SimulRec.Enabled":null,
					"P.Clip.Mediabox.SimulRec.Mode":null};
		var id = client.property.GetValue({params: names,	onresponse: function(resp) {
			var respRecorder = JSON.stringify(resp.error || resp.result);
			var selectedShutterSpeed = JSON.parse(respRecorder);
			var StrData = JSON.parse(respRecorder);
			if (StrData == "timeout")
			{
					
			}
			else
			{		
				g_MediaBoxStatus = StrData["P.Clip.Mediabox.Status"];
				var mode = StrData["P.Clip.Mediabox.Mode"];
				if ("Normal" == mode)
				{
					g_MediaBoxMode = 0;
				}
				else if ("Interval" == mode)
				{
					g_MediaBoxMode = 2;
				}
				else if ("ClipContinuous" == mode)
				{
					g_MediaBoxMode = 3;
				}
				else if ("PictureCache" == mode)
				{
					g_MediaBoxMode = 4;
				}
				else if ("Frame" == mode)
				{
					g_MediaBoxMode = 5;
				}
				else 
				{
					g_MediaBoxMode = 1;
				}
				g_MediaBoxSpeed = Math.round(StrData["P.Clip.Mediabox.Speed"]);
				var TimeCodeType = StrData["P.Clip.Mediabox.TimeCode.Type"];
				var TimeCodeValue = StrData["P.Clip.Mediabox.TimeCode.Value"];
				var TimeCodeLocked = StrData["P.Clip.Mediabox.TimeCode.Locked"];
				g_IsSimulRecord = StrData["P.Clip.Mediabox.SimulRec.Enabled"];
				g_SimulRecoedMode = StrData["P.Clip.Mediabox.SimulRec.Mode"];
				
				var TimeCodeFlag = 1;
				if (TimeCodeType == "Unknown")
				{
					j("#0_TCG_NAME").text("");
					TimeCodeFlag = 0;
				}
				else if (TimeCodeType == "Duration") 
				{
					j("#0_TCG_NAME").text("Dur");
					TimeCodeFlag = 1;
				}
				else if (TimeCodeType == "UB")
				{
					j("#0_TCG_NAME").text("UBG");
					TimeCodeFlag = 1;
				}
				else 
				{
					j("#0_TCG_NAME").text(TimeCodeType);
					TimeCodeFlag = 1;
				}
				
				if (TimeCodeFlag == 0)
				{
					j("#1_TIMECODE_VALUE").text("");
				}
				else
				{
					j("#1_TIMECODE_VALUE").text(TimeCodeValue);
					if ($("0_TCG_NAME").innerHTML == "UBG")
					{
						$("1_TIMECODE_VALUE").style.fontSize = "30px";
					}
					else
					{
						$("1_TIMECODE_VALUE").style.fontSize = "36px";
					}
				}
				
				if (true == TimeCodeLocked)
				{
					j("#0_EXT_LK_NAME").text("Ext-Lk");
				}
				else if (false == TimeCodeLocked)
				{
					j("#0_EXT_LK_NAME").text("");
				}
				else if ("true" == TimeCodeLocked)
				{
					j("#0_EXT_LK_NAME").text("Ext-Lk");
				}
				else
				{
					j("#0_EXT_LK_NAME").text("");
				}
				
				RecordCtrl.JudgeIsRecord_IsPlayingOrIsNormal();
				RecordCtrl.ShowMediaBoxText();
				RecordCtrl.RefreshActiveMediaBoxStatus();
			}
		}})
	},
	
	JudgeIsRecord_IsPlayingOrIsNormal : function()
	{
		//Recorder Status : "Recording/OFF"
		if ("Recording" == g_MediaBoxStatus || "RecordingWithCall" == g_MediaBoxStatus)
		{
			RECRedStatusValue = 1;
		}
		else
		{
			RECRedStatusValue = 0;
		}
		
		//Playing Status : "Playing/OFF"
		if ("Playing" == g_MediaBoxStatus)
		{
			PlayBackInfoStatusValue = 1;	
		}
		else if ("Standby" == g_MediaBoxStatus || "NoMedia" == g_MediaBoxStatus || "Recording" == g_MediaBoxStatus || "RecordingWithCall" == g_MediaBoxStatus)
		{
			PlayBackInfoStatusValue = 0;
		}
	},
	
	ShowMediaBoxText : function()
	{
		if ("NoMedia" == g_MediaBoxStatus)
		{
			if (g_MediaBoxMode == 2)
			{
				j("#DIV_STATUS").text("Int");
				j("#2_DIV_STATUS").text("");
				j("#DIV_STATUS").css({color:"#fff"});
				j("#2_DIV_STATUS").css({color:""});
				Status1Value = "Int";
				Status2Value = "";
			}
			else
			{
				j("#DIV_STATUS").text("");
				j("#2_DIV_STATUS").text("");
				Status1Value = "";
				Status2Value = "";
			}
		}
		else if ("Recording" == g_MediaBoxStatus)
		{
			if (g_MediaBoxMode == 0)
			{
				j("#DIV_STATUS").text("Rec");
				j("#2_DIV_STATUS").text("");
				j("#DIV_STATUS").css({color:"#fff"});
				Status1Value = "Rec";
				Status2Value = "";
			}
			else if (g_MediaBoxMode == 2)
			{
				j("#DIV_STATUS").text("Int");
				j("#2_DIV_STATUS").text("Rec");
				j("#DIV_STATUS").css({color:"#fff"});
				j("#2_DIV_STATUS").css({color:"#fff"});
				Status1Value = "Int";
				Status2Value = "Rec";
			}
			else if (g_MediaBoxMode == 3)
			{
				j("#DIV_STATUS").text("Cont");
				j("#2_DIV_STATUS").text("Rec");
				j("#DIV_STATUS").css({color:"#fff"});
				j("#2_DIV_STATUS").css({color:"#fff"});
				Status1Value = "Cont";
				Status2Value = "Rec";
			}
			else if (g_MediaBoxMode == 5)
			{
				j("#DIV_STATUS").text("Int");
				j("#2_DIV_STATUS").text("Stby");
				j("#DIV_STATUS").css({color:"#fff"});
				j("#2_DIV_STATUS").css({color:"#00ff00"});
				Status1Value = "Int";
				Status2Value = "Stby";
			}
			else
			{
				j("#DIV_STATUS").text("S&Q");
				j("#2_DIV_STATUS").text("Rec");
				j("#DIV_STATUS").css({color:"#fff"});
				j("#2_DIV_STATUS").css({color:"#fff"});
				Status1Value = "S&Q";
				Status2Value = "Rec";
			}
		}
		else if ("Standby" == g_MediaBoxStatus)
		{
			if (g_MediaBoxMode == 0)
			{
				j("#DIV_STATUS").text("Stby");
				j("#2_DIV_STATUS").text("");
				j("#DIV_STATUS").css({color:"#00ff00"});
				Status1Value = "Stby";
				Status2Value = "";
			}
			else if (g_MediaBoxMode == 2)
			{
				j("#DIV_STATUS").text("Int");
				j("#2_DIV_STATUS").text("Stby");
				j("#DIV_STATUS").css({color:"#fff"});
				j("#2_DIV_STATUS").css({color:"#00ff00"});
				Status1Value = "Int";
				Status2Value = "Stby";
			}
			else if (g_MediaBoxMode == 3)
			{
				j("#DIV_STATUS").text("Cont");
				j("#2_DIV_STATUS").text("Stby");
				j("#DIV_STATUS").css({color:"#fff"});
				j("#2_DIV_STATUS").css({color:"#00ff00"});
				Status1Value = "Cont";
				Status2Value = "Stby";
			}
			else if (g_MediaBoxMode == 4)
			{
				j("#DIV_STATUS_LIGHT").css({"background-image":"url(../../WebCommon/images/Parts_CR_T_CC_Status_GreenCircle.png)"});
				j("#DIV_STATUS").text("Cache");
				j("#2_DIV_STATUS").text("");
				j("#DIV_STATUS").css({color:"#fff"});
				Status1Value = "Cache";
				Status2Value = "";
			}
			else
			{
				j("#DIV_STATUS").text("S&Q");
				j("#2_DIV_STATUS").text("Stby");
				j("#DIV_STATUS").css({color:"#fff"});
				j("#2_DIV_STATUS").css({color:"#00ff00"});
				Status1Value = "S&Q";
				Status2Value = "Stby";
			}
		}
		else if ("Playing" == g_MediaBoxStatus)
		{
			if (g_MediaBoxSpeed == 1)
			{
				j("#DIV_STATUS_LIGHT").css({"background-image":"url(../../WebCommon/images/Parts_CR_T_CC_Status_Playback_Play.png)"});
				j("#DIV_STATUS").text("Play");
				j("#DIV_STATUS").css({color:"#fff"});
				j("#2_DIV_STATUS").text("");
				Status1Value = "Play";
				Status2Value = "";
			}
			else if (g_MediaBoxSpeed == 0)
			{
				j("#DIV_STATUS_LIGHT").css({"background-image":"url(../../WebCommon/images/Parts_CR_T_CC_Status_Playback_Pause.png)"});
				j("#DIV_STATUS").text("Pause");
				j("#DIV_STATUS").css({color:"#fff"});
				j("#2_DIV_STATUS").text("");
				Status1Value = "Pause";
				Status2Value = "";
			}
			else if (g_MediaBoxSpeed  > 1)
			{
				j("#DIV_STATUS_LIGHT").css({"background-image":"url(../../WebCommon/images/Parts_CR_T_CC_Status_Playback_FFwd.png)"});
				j("#DIV_STATUS").text("Fwdx" + g_MediaBoxSpeed);
				j("#DIV_STATUS").css({color:"#fff"});
				j("#2_DIV_STATUS").text("");
				Status1Value = "Fwdx" + g_MediaBoxSpeed;
				Status2Value = "";
			}
			else if (g_MediaBoxSpeed  < 0)
			{
				j("#DIV_STATUS_LIGHT").css({"background-image":"url(../../WebCommon/images/Parts_CR_T_CC_Status_Playback_FRev.png)"});
				var SpeedValueAbs = -g_MediaBoxSpeed;
				j("#DIV_STATUS").text("Revx" + SpeedValueAbs);
				j("#DIV_STATUS").css({color:"#fff"});
				j("#2_DIV_STATUS").text("");
				Status1Value = "Revx" + SpeedValueAbs;
				Status2Value = "";
			}
			else
			{
				j("#DIV_STATUS_LIGHT").css({"background-image":"url(../../WebCommon/images/Parts_CR_T_CC_Status_Playback_Play.png)"});
				j("#DIV_STATUS").text("Play");
				j("#DIV_STATUS").css({color:"#fff"});
				j("#2_DIV_STATUS").text("");
				Status1Value = "Play";
				Status2Value = "";
			}
		}
		else if ("Call" == g_MediaBoxStatus)
		{
			j("#DIV_STATUS").text("CALL");
			j("#DIV_STATUS").css({color:"red"});
			j("#2_DIV_STATUS").text("");
			Status1Value = "CALL";
			Status2Value = "";
		}
		else if ("RecordingWithCall" == g_MediaBoxStatus)
		{
			j("#DIV_STATUS").text("CALL");
			j("#DIV_STATUS").css({color:"red"});
			j("#2_DIV_STATUS").text("");
			Status1Value = "CALL";
			Status2Value = "";
		}
		else if ("Pausing" == g_MediaBoxStatus)
		{
			j("#DIV_STATUS").text("Pause");
			j("#DIV_STATUS").css({color:"#fff"});
			j("#2_DIV_STATUS").text("");
			Status1Value = "Pause";
			Status2Value = "";
		}
		else if ("Stopping" == g_MediaBoxStatus)
		{
			j("#DIV_STATUS").text("Stop");
			j("#DIV_STATUS").css({color:"#fff"});
			j("#2_DIV_STATUS").text("");
			Status1Value = "Stop";
			Status2Value = "";
		}
		else if ("RecPausing" == g_MediaBoxStatus)
		{
			if (g_MediaBoxMode == 2)
			{
				j("#DIV_STATUS_LIGHT").css({"background-image":""});
				j("#DIV_STATUS").text("Int");
				j("#2_DIV_STATUS").text("Rec");
				j("#DIV_STATUS").css({color:"#fff"});
				j("#2_DIV_STATUS").css({color:"#fff"});
				Status1Value = "Int";
				Status2Value = "Rec";
			}
		}
		else
		{
			j("#DIV_STATUS").text("");
			j("#2_DIV_STATUS").text("");
			Status1Value = "";
			Status2Value = "";
		}
	},
	
	RefreshActiveMediaBoxStatus : function()
	{
		if (g_IsSimulRecord && (g_SimulRecoedMode == "SLOT_A" || g_SimulRecoedMode == "SLOT_B"))
		{	
			if (RECRedStatusValue == 1)
			{
				if (g_SimulRecoedMode == "SLOT_A")
				{
					j("#DIV_STATUS_LIGHT").css({"background-image":"url(../../WebCommon/images/Parts_CR_T_CC_Status_A.png)"});
				}
				else if (g_SimulRecoedMode == "SLOT_B")
				{
					j("#DIV_STATUS_LIGHT").css({"background-image":"url(../../WebCommon/images/Parts_CR_T_CC_Status_B.png)"});
				}
				else{}
				
				if ($("DIV_STATUS").innerHTML == "Rec")
				{
					$("1_DIV_STATUS_RED").style.display = "block";
					$("2_DIV_STATUS_RED").style.display = "none";
					j("#DIV_STATUS").css({ "width" : "60px", "padding-left" : "12px"});
					j("#2_DIV_STATUS").css({ "width" : "72px", "padding-left" : "0px"});
				}
				else if ($("2_DIV_STATUS").innerHTML == "Rec")
				{
					$("1_DIV_STATUS_RED").style.display = "none";
					$("2_DIV_STATUS_RED").style.display = "block";
					j("#DIV_STATUS").css({ "width" : "72px", "padding-left" : "0px"});
					j("#2_DIV_STATUS").css({ "width" : "60px", "padding-left" : "12px"});
				}
				else{}
			}
			else if (PlayBackInfoStatusValue == 1)
			{
				$("1_DIV_STATUS_RED").style.display = "none";
				$("2_DIV_STATUS_RED").style.display = "none";
				j("#DIV_STATUS").css({ "width" : "72px", "padding-left" : "0px"});
				j("#2_DIV_STATUS").css({ "width" : "72px", "padding-left" : "0px"});
				return;
			}
			else
			{
				if (g_SimulRecoedMode == "SLOT_A")
				{
					j("#DIV_STATUS_LIGHT").css({"background-image":"url(../../WebCommon/images/Parts_CR_T_CC_Status_A.png)"});
				}
				else if (g_SimulRecoedMode == "SLOT_B")
				{
					j("#DIV_STATUS_LIGHT").css({"background-image":"url(../../WebCommon/images/Parts_CR_T_CC_Status_B.png)"});
				}
				else{}
				
				$("1_DIV_STATUS_RED").style.display = "none";
				$("2_DIV_STATUS_RED").style.display = "none";
				j("#DIV_STATUS").css({ "width" : "72px", "padding-left" : "0px"});
				j("#2_DIV_STATUS").css({ "width" : "72px", "padding-left" : "0px"});
			}
		}
		else
		{
			if (RECRedStatusValue == 1)
			{
				j("#DIV_STATUS_LIGHT").css({"background-image":"url(../../WebCommon/images/Parts_CR_T_CC_Status_RecCircle.png)"});
			}
			else if (PlayBackInfoStatusValue == 1 || g_MediaBoxMode == 4)
			{
				return;
			}
			else
			{
				j("#DIV_STATUS_LIGHT").css({"background-image":""});
			}
			
			$("1_DIV_STATUS_RED").style.display = "none";
			$("2_DIV_STATUS_RED").style.display = "none";
			j("#DIV_STATUS").css({ "width" : "72px", "padding-left" : "0px"});
			j("#2_DIV_STATUS").css({ "width" : "72px", "padding-left" : "0px"});
		}
	},
	
	RecorderStopRecord : function()
	{
		var params = [];
        client.clip.recorder.Stop({params: params, onresponse: function(resp){}});
        client_two.clip.recorder.Stop({params: params, onresponse: function(resp){}});
	},
		
	RecorderStartRecord : function()
	{
		var params = [];
        client.clip.recorder.Start({params: params, onresponse: function(resp){}});
        client_two.clip.recorder.Start({params: params, onresponse: function(resp){}});
	},	
/**************************************************
*  Sever Notify Functions
***************************************************/
	NotifySubscribe : function () {
		names = [];
		names.push("Notify.Property");
		names.push("Notify.Properties");
		names.push("Notify.Process");
		var id = client.notify.Subscribe({params: names,	onresponse: function(resp){
									
		}});
	},
	
	NotifyUnsubscribe : function () {
		names = [];
		names.push("Notify.Properties");
		var id = client.notify.Unsubscribe({params: names,	onresponse: function(resp){
										
		}});
	},
	
	NotifySetRecorderData : function (objArrItem)
	{
		var TimeCodeFlag = 1;
		for(var key in objArrItem)
		{
			if (key == "P.Clip.Mediabox.Status")
			{
				g_MediaBoxStatus = objArrItem[key];
				RecordCtrl.JudgeIsRecord_IsPlayingOrIsNormal();
				RecordCtrl.ShowMediaBoxText();
				RecordCtrl.RefreshActiveMediaBoxStatus();
			}
			else if (key == "P.Clip.Mediabox.Mode")
			{
				if ("Normal" == objArrItem[key])
				{
					g_MediaBoxMode = 0;
				}
				else if ("Interval" == objArrItem[key])
				{
					g_MediaBoxMode = 2;
				}
				else if ("ClipContinuous" == objArrItem[key])
				{
					g_MediaBoxMode = 3;
				}
				else if ("PictureCache" == objArrItem[key])
				{
					g_MediaBoxMode = 4;
				}
				else if ("Frame" == objArrItem[key])
				{
					g_MediaBoxMode = 5;
				}
				else
				{
					g_MediaBoxMode = 1;
				}
				
			}
			else if (key == "P.Clip.Mediabox.Speed")
			{
				g_MediaBoxSpeed = Math.round(objArrItem[key]);	
			}  
			
			else if (key == "P.Clip.Mediabox.TimeCode.Type")
			{
				if (objArrItem[key] == "Unknown")
				 {
				 	j("#0_TCG_NAME").text("");
				 	TimeCodeFlag = 0;
				 }
				 else if (objArrItem[key] == "Duration") 
				 {
				 	j("#0_TCG_NAME").text("Dur");
				 	TimeCodeFlag = 1;
				 }
				 /*else if (value == "TimeCode") 
				 {
				 	j("#0_TCG_NAME").text("TC");
				 	TimeCodeFlag = 1;
				 }
				 else if (value == "UB") 
				 {
				 	j("#0_TCG_NAME").text("UB");
				 	TimeCodeFlag = 1;
				 }*/
				 else
				 {
				 	j("#0_TCG_NAME").text(objArrItem[key]);
				 	TimeCodeFlag = 1;
				 }
			} 
			else if (key == "P.Clip.Mediabox.TimeCode.Value")
			{
				if (TimeCodeFlag == 0)
				{
					j("#1_TIMECODE_VALUE").text("");
				}
				else
				{
					j("#1_TIMECODE_VALUE").text(objArrItem[key]);
					if ($("0_TCG_NAME").innerHTML == "UBG")
					{
						$("1_TIMECODE_VALUE").style.fontSize = "30px";
					}
					else
					{
						$("1_TIMECODE_VALUE").style.fontSize = "36px";
					}
				}
			}
			else if (key == "P.Clip.Mediabox.TimeCode.Locked")//return bool
			{
				if (true == objArrItem[key])
				{
					j("#0_EXT_LK_NAME").text("Ext-Lk");
				}
				else if (false == objArrItem[key])
				{
					j("#0_EXT_LK_NAME").text("");
				}
				else if ("true" == objArrItem[key])
				{
					j("#0_EXT_LK_NAME").text("Ext-Lk");
				}
				else
				{
					j("#0_EXT_LK_NAME").text("");
				}
			}
			else if (key == "P.Clip.Mediabox.SimulRec.Enabled")
			{
				g_IsSimulRecord = objArrItem[key];
			}
			else if (key == "P.Clip.Mediabox.SimulRec.Mode")
			{
				g_SimulRecoedMode = objArrItem[key];
				RecordCtrl.RefreshActiveMediaBoxStatus();
			}
			else
			{
			}
		}
	}
}
