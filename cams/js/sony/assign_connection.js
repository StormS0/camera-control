// JavaScript Document
var g_GrayAssignWitchButton = 0;

var g_arrAssignList = {"Off":"Off","Marker":"Marker","Zebra":"Zebra","Peaking":"Peaking","Signal Monitor":"Video Signal Monitor", "Dur/TC/UB":"Duration/TC/UB", "Focus Mag":"Focus Magnifier", "Focus Mag x4":"Focus Magnifier x4", "Focus Mag x8":"Focus Magnifier x8", "Push AF":"Push AF/Focus Hold", "VF Mode":"VF Mode", "IRIS":"IRIS", "AGC":"AGC", "SHUTTER":"SHUTTER", "AE Level":"Auto Exposure Level", "Push Auto IRIS":"Push Auto IRIS", "Push AGC":"Push AGC", "Spotlight":"Spotlight", "Backlight":"Backlight", "ATW":"ATW", "ATW Hold":"ATW Hold", "SteadyShot":"SteadyShot", "Color Bars":"Color Bars", "User Menu":"User Menu", "Rec Lamp":"Rec Lamp", "S&Q Motion":"S&Q Motion", "Cache Rec":"Picture Cache Rec", "Rec Review":"Rec Review", "Thumbnail":"Thumbnail", "Shot Mark1":"Shot Mark1", "Shot Mark2":"Shot Mark2", "Clip Flag OK":"Clip Flag OK", "Clip Flag NG":"Clip Flag NG", "Clip Flag Keep":"Clip Flag Keep", "High/Low Key":"High/Low Key","Fcs Area(Push)":"Focus Area (Push)","Focus Area":"Focus Area"};

var g_arrAssignListShow = {"Off":"Off","Marker":"Marker","Zebra":"Zebra","Peaking":"Peaking","Video Signal Monitor":"Signal Monitor", "Duration/TC/UB":"Dur/TC/UB", "Focus Magnifier":"Focus Mag", "Focus Magnifier x4":"Focus Mag x4", "Focus Magnifier x8":"Focus Mag x8", "Push AF/Focus Hold":"Push AF", "VF Mode":"VF Mode", "IRIS":"IRIS", "AGC":"AGC", "SHUTTER":"SHUTTER", "Auto Exposure Level":"AE Level", "Push Auto IRIS":"Push Auto IRIS", "Push AGC":"Push AGC", "Spotlight":"Spotlight", "Backlight":"Backlight", "ATW":"ATW", "ATW Hold":"ATW Hold", "SteadyShot":"SteadyShot", "Color Bars":"Color Bars", "User Menu":"User Menu", "Rec Lamp":"Rec Lamp", "S&Q Motion":"S&Q Motion", "Picture Cache Rec":"Cache Rec", "Rec Review":"Rec Review", "Thumbnail":"Thumbnail", "Shot Mark1":"Shot Mark1", "Shot Mark2":"Shot Mark2", "Clip Flag OK":"Clip Flag OK", "Clip Flag NG":"Clip Flag NG", "Clip Flag Keep":"Clip Flag Keep", "High/Low Key":"High/Low Key","Focus Area":"Focus Area","Focus Area (Push AF)":"Fcs Area(Push)"};

AssignCtrl = {
	
	GetValue : function()
	{
		var names = {"Button.Assign":null};
		var id = client.property.GetValue({params: names, onresponse: function(resp) {
			var respAssign = JSON.stringify(resp.error || resp.result);
			var AssignData = JSON.parse(respAssign);
			if (AssignData == "timeout")
			{
			}
			else
			{
				j.each(AssignData, function(key, value) 
				{
					if ("Button.Assign" == key) 
					{				
						AssignCtrl.SetAssignBtnProperties(value);
					}
				});
			}
		}, timeout : 3000});
	},
	
	SetValue : function(targetBtnId, SelectedValue)
	{
		var names;
		var mapValue = {"Off":"None",
					   "Marker":"Marker",
					   "Zebra":"Zebra",
					   "Peaking":"Peaking",
					   "Video Signal Monitor":"VideoSignalMonitor",
					   "Duration/TC/UB":"TcUbDuration", 
					   "Focus Magnifier":"FocusMagnifier-x1x4x8",
					   "Focus Magnifier x4":"FocusMagnifier-x4",
					   "Focus Magnifier x8":"FocusMagnifier-x8",
					   "Push AF/Focus Hold":"OnePushAF_or_FocusHold",
					   "Focus Area":"SelectFocusArea",
					   "Focus Area (Push)":"SelectFocusArea(PushAF)",
					   "VF Mode":"ViewFinderColorMode",
					   "IRIS":"AutoIris",
					   "AGC":"AutoGain",
					   "SHUTTER":"AutoShutter",
					   "Auto Exposure Level":"AutoExposureLevel",
					   "Push Auto IRIS":"PushAutoIris",//Not found
					   "Push AGC":"PushAGC",
					   "Spotlight":"Spotlight",
					   "Backlight":"Blacklight",
					   "ATW":"ATW",
					   "ATW Hold":"ATWHold",
					   "SteadyShot":"SteadyShot",
					   "Color Bars":"ColorBar", 
					   "User Menu":"UserMenu",
					   "Rec Lamp":"RecLamp",
					   "S&Q Motion":"SlowAndQuickMotion",
					   "Cont Rec":"ClipContinuousRec",
					   "Picture Cache Rec":"PictureCache",
					   "Rec Review":"RecReview",
					   "Thumbnail":"Thumbnail",
					   "Last Clip Del.":"DeleteLastClip",
					   "Shot Mark1":"ShotMark1", 
					   "Shot Mark2":"ShotMark2", 
					   "Clip Flag OK":"ClipFlagOK", 
					   "Clip Flag NG":"ClipFlagNG",
					   "Clip Flag Keep":"ClipFlagKeep",
					   "High/Low Key":"HighLowKey"
					   };
					   
		switch (targetBtnId)
		{
			case 1:
				names = {"Button.Assign" : {"Assignable.1" : [mapValue[SelectedValue],"None"]}};
				break;
			case 2:
				names = {"Button.Assign" : {"Assignable.2" : [mapValue[SelectedValue],"None"]}};
				break;
			case 3:
				names = {"Button.Assign" : {"Assignable.3" : [mapValue[SelectedValue],"None"]}};
				break;
			case 4:
				names = {"Button.Assign" : {"Assignable.4" : [mapValue[SelectedValue],"None"]}};
				break;
			case 5:
				names = {"Button.Assign" : {"Assignable.5" : [mapValue[SelectedValue],"None"]}};
				break;
			case 6:
				names = {"Button.Assign" : {"Assignable.6" : [mapValue[SelectedValue],"None"]}};
				break;
			default:
				break;
		}
		var id = client.property.SetValue({params: names, onresponse: function(resp) { }, timeout : 3000});
	},
	
	NotifySetAssignData : function (objArrItem)
	{
		j.each(objArrItem, function(key, value) {
			if ("Button.Assign" == key) 
			{
				AssignCtrl.SetAssignBtnProperties(value);
			}
		});
	},
	
	SetAssignBtnProperties : function(assignValueItems)
	{
		var boolMap = {"On":true, "Off":false};
		var mapValue = {"None":"Off",
					   "Marker":"Marker",
					   "Zebra":"Zebra",
					   "Peaking":"Peaking",
					   "VideoSignalMonitor":"Video Signal Monitor",
					   "TcUbDuration":"Duration/TC/UB", 
					   "FocusMagnifier-x1x4x8":"Focus Magnifier",
					   "FocusMagnifier-x4":"Focus Magnifier x4",
					   "FocusMagnifier-x8":"Focus Magnifier x8",
					   "OnePushAF_or_FocusHold":"Push AF/Focus Hold",
					   "SelectFocusArea":"Focus Area",
					   "SelectFocusArea(PushAF)":"Focus Area (Push AF)",
					   "ViewFinderColorMode":"VF Mode",
					   "AutoIris":"IRIS",
					   "AutoGain":"AGC",
					   "AutoShutter":"SHUTTER",
					   "AutoExposureLevel":"Auto Exposure Level",
					   "PushAutoIris":"Push Auto IRIS",//not found
					   "PushAGC":"Push AGC",
					   "Spotlight":"Spotlight",
					   "Blacklight":"Backlight",
					   "ATW":"ATW",
					   "ATWHold":"ATW Hold",
					   "SteadyShot":"SteadyShot",
					   "ColorBar":"Color Bars",
					   "UserMenu":"User Menu",
					   "RecLamp":"Rec Lamp",
					   "SlowAndQuickMotion":"S&Q Motion",
					   "ClipContinuousRec":"Cont Rec",
					   "PictureCache":"Picture Cache Rec",
					   "RecReview":"Rec Review",
					   "Thumbnail":"Thumbnail",
					   "DeleteLastClip":"Last Clip Del.",
					   "ShotMark1":"Shot Mark1",
					   "ShotMark2":"Shot Mark2",
					   "ClipFlagOK":"Clip Flag OK",
					   "ClipFlagNG":"Clip Flag NG",
					   "ClipFlagKeep":"Clip Flag Keep",
					   "HighLowKey":"High/Low Key",
					   };
		j.each(assignValueItems, function(key, value){
			var assignBtnIndex = key.substr(11, 1);
				if((assignBtnIndex > 0) && (assignBtnIndex < 7))
				{
					if ("None" == value[0]) 
					{
					  g_arrAssignButton[assignBtnIndex-1].userData.SetStatus(false);  
					}
					else
					{
					  g_arrAssignButton[assignBtnIndex-1].userData.SetStatus(boolMap[value[1]]); 
					}
					
					g_arrAssignLableList[assignBtnIndex-1].innerHTML = g_arrAssignListShow[mapValue[value[0]]];
					
					if(("Push Auto IRIS" == g_arrAssignLableList[assignBtnIndex-1].innerHTML)
					||("Push AGC" == g_arrAssignLableList[assignBtnIndex-1].innerHTML)
					||("Push AF" == g_arrAssignLableList[assignBtnIndex-1].innerHTML))
					{
						g_arrAssignButton[assignBtnIndex - 1].userData.SetDisabled(true);
						g_GrayAssignWitchButton = 1;
					}
					else
					{
						if(1 == g_GrayAssignWitchButton)
						{
							g_arrAssignButton[assignBtnIndex - 1].userData.SetDisabled(false);
						}
					}
				}
		 })
	}
}