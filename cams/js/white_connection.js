// JavaScript Document

var g_WhiteMode = null;
var g_WhiteValue = null;
var g_WhitePreValue = null;
var g_bWhiteGray = false;
var g_PresetMode = {"Preset3200":"Preset 3200K", "Preset4300":"Preset 4300K", "Preset5500":"Preset 5500K"};
var g_PresetModeDialog = {"Preset 3200K":"Preset3200", "Preset 4300K":"Preset4300", "Preset 5500K":"Preset5500"};
var WhiteCtrl = {
	
	GetValue : function()
	{
		var names = {"Camera.WhiteBalance.Mode":null,
					 "Camera.WhiteBalance.ColorTemperature.MemoryValue":null};
		var id = client.property.GetValue({params: names,
		onresponse: function(resp) {
			var respClrTemp = JSON.stringify(resp.error || resp.result);
			var ClrTempData = JSON.parse(respClrTemp);
			if (ClrTempData == "timeout")
			{
					
			}
			else
			{
				g_WhiteValue = ClrTempData["Camera.WhiteBalance.ColorTemperature.MemoryValue"];
				g_WhiteMode = ClrTempData["Camera.WhiteBalance.Mode"];
				
				WhiteCtrl.ShowWhiteClickAreaText();
			}
		}});
	},
	
	GetCapabilities : function()
	{
		var names = {"Camera.WhiteBalance.Mode":null,
					 "Camera.WhiteBalance.ColorTemperature.MemoryValue":null};
		var id = client.property.GetValue({params: names,
		onresponse: function(resp) {
			var respClrTemp = JSON.stringify(resp.error || resp.result);
			var ClrTempData = JSON.parse(respClrTemp);
			if (ClrTempData == "timeout")
			{
					
			}
			else
			{
				g_WhiteValue = ClrTempData["Camera.WhiteBalance.ColorTemperature.MemoryValue"];
				g_WhiteMode = ClrTempData["Camera.WhiteBalance.Mode"];
				
				WhiteCtrl.JudgeWhiteShowDialog();
				WhiteCtrl.SetDialogMode();
				
				ShowMainPageDialog(g_objWhite);
			}
		}});
	},
	
	ShowWhiteClickAreaText : function()
	{
		if (g_WhiteMode == "Preset")
		{
			g_objWhite.innerHTML = g_WhiteMode + " " + g_WhiteValue[g_WhiteMode] + "K";
		}
		else if (g_WhiteMode == "ATW")
		{
			g_objWhite.innerHTML = g_WhiteMode;
		}
		else if (g_WhiteMode == "Memory A")
		{
			g_objWhite.innerHTML = g_WhiteMode + " " + g_WhiteValue[g_WhiteMode] + "K";
		}
		else if (g_WhiteMode == "Memory B")
		{
			g_objWhite.innerHTML = g_WhiteMode + " " + g_WhiteValue[g_WhiteMode] + "K";
		}
		else if (g_WhiteMode == "Memory C")
		{
			g_objWhite.innerHTML = g_WhiteMode + " " + g_WhiteValue[g_WhiteMode] + "K";
		}
		else
		{
			g_objWhite.innerHTML = g_WhiteMode;
		}
	},
	
	JudgeWhiteShowDialog : function()
	{
		if (!ShootModeValue)
		{
			//CineEI
			g_objWhite.userData[1] = g_objWhite.userData[4];
		}
		else
		{
			//Custom
			for (var key in g_WhiteValue)
			{
				if (key == "ATW")
				{
					g_objWhite.userData[1] = g_objWhite.userData[3];
					break;
				}
				else
				{
					g_objWhite.userData[1] = g_objWhite.userData[2];
				}
			}
		}
	},
	
	SetDialogMode : function()
	{
		if (!ShootModeValue)
		{
			g_objWhite.userData[1].SetSelect(g_PresetModeDialog[g_WhiteMode]);
		}
		else
		{
			g_objWhite.userData[1].SetWhiteMode(g_WhiteMode);
			g_objWhite.userData[1].SetValue(g_WhiteValue);
		}
	},
	
	SetValue : function(strMode)
	{ 
		var names;
		if (!ShootModeValue)
		{
			names = {"Camera.WhiteBalance.Mode": g_PresetMode[strMode]};
		}
		else
		{
			names = {"Camera.WhiteBalance.Mode": strMode};
		}
		var id = client.property.SetValue({params: names, onresponse: function(resp) { }});	
	},
	
	SetSliderValue : function(iValue)
	{ 
		var names = {"P.Control.ColorTemperature.Slider": iValue};
		var id = client.property.SetValue({params: names, onresponse: function(resp) { }});	
	},
	
	UpdateValue : function(value)
	{
		var params = {"Camera.WhiteBalance.ColorTemperature.Value":value};
		var id = client.property.UpdateValue({params: params, onresponse:function(resp) {	}});
	},
	
	GetStatus: function()
	{
		var names = {"P.Control.u2x500.ColorTemp": null};
		var id = client.property.GetStatus({params: names, onresponse: function(resp) {
				var respStatus= JSON.stringify(resp.error || resp.result);
				var statusData = JSON.parse(respStatus);
				if (statusData == "timeout")
				{
					//TODO timeout
				}
				else
				{
					var strWhiteLock = statusData["P.Control.u2x500.ColorTemp"];	
					
					if(strWhiteLock == "Locked")
					{
						g_bWhiteGray = true;
						if (g_OldObject == g_objWhite)
						{
							g_objWhite.userData[1].ShowDialog(false);
							g_OldObject = null;
						}
					}
					else 
					{
						g_bWhiteGray = false;
					}
					g_objWhite.userData[0].SetDisable(g_bWhiteGray);
				}
		}});
	},
	
	NotifySetClrTempData : function (objArrItem)
	{
		j.each(objArrItem,function(key,value)
		{
			switch(key)
			{
				case "Camera.WhiteBalance.Mode":
					g_WhiteMode = value;
					WhiteCtrl.ShowWhiteClickAreaText();
					WhiteCtrl.JudgeWhiteShowDialog();
					WhiteCtrl.SetDialogMode();
					if (ShootModeValue)
					{
						g_objWhite.userData[1].ShowSubPannel();
					}
					break;
				case "Camera.WhiteBalance.ColorTemperature.MemoryValue":
					g_WhiteValue = value;
					WhiteCtrl.ShowWhiteClickAreaText();
					WhiteCtrl.JudgeWhiteShowDialog();
					WhiteCtrl.SetDialogMode();
					break;
				case "P.Menu.pmw-f5x.Event.EventID":
					if ((EVENT_PLAY_UPDATE == value)
						|| (EVENT_THUMBNAIL_UPDATE == value)
						|| (EVENT_RECORDE_UPDATE == value)
						|| (EVENT_VIEW_UPDATE == value)
						|| (EVENT_700P_CONNECTION_STATUS_REFRESH_WIFI == value)
						|| (EVENT_AWB_MODE_DISPLAY == value)
						|| (EVENT_ABB_START == value))
					{
						WhiteCtrl.GetStatus();
					}	
					break;
				default:
					break;
			}
		})
	}
	
}