// JavaScript Document

var g_ClrTempMode = null;
var g_ClrTempValue = null;
var g_IsnotifyPresetType = 0;
var g_bPresetWhiteGray = false;
var PresetWhiteCtrl = {
	
	GetValue : function()
	{  
		var names = {"Camera.WhiteBalance.ColorTemperature.Value":null,
					 "Camera.WhiteBalance.ColorTemperature.SelectMode":null};
		var id = client.property.GetValue({params: names,
		onresponse: function(resp) {
			var respClrTemp = JSON.stringify(resp.error || resp.result);
			var ClrTempData = JSON.parse(respClrTemp);
			if (ClrTempData == "timeout")
			{
					
			}
			else
			{
				g_ClrTempValue = ClrTempData["Camera.WhiteBalance.ColorTemperature.BackupValue"];
				g_ClrTempMode = ClrTempData["Camera.WhiteBalance.ColorTemperature.Preset"];
				//g_ClrTempValue = ClrTempData["Camera.WhiteBalance.ColorTemperature.Value"];
				g_objPresetWhite.innerHTML = g_ClrTempValue;	
				g_objPresetWhite.userData[1].SetSelect(g_ClrTempValue);	
			}
		}});
	},
	
	SetValue : function(strValue)
	{ 
		var names = {"Camera.WhiteBalance.ColorTemperature.Value": strValue};
		var id = client.property.SetValue({params: names, onresponse: function(resp) { }});	
	},
	
	SetSliderValue : function(iValue)
	{ 
		var names = {"P.Control.ColorTemperature.Slider": iValue};
		var id = client.property.SetValue({params: names, onresponse: function(resp) { }});	
	},
	
	IncrementProperties : function()
	{
		var params = {"Camera.WhiteBalance.ColorTemperature.Value":""};
		var id = client.system.IncrementProperties({params: params, onresponse:function(resp) {	}});
	},
	
	DecrementProperties : function()
	{
		var params = {"Camera.WhiteBalance.ColorTemperature.Value":""};
		var id = client.system.DecrementProperties({params: params, onresponse:function(resp) {	}});
	},
	
	
	UpdateValue : function(value)
	{
		var params = {"Camera.WhiteBalance.ColorTemperature.Value":value};
		var id = client.property.UpdateValue({params: params, onresponse:function(resp) {	}});
	},
	
	GetStatus: function()
	{
				var names = {"P.Control.u2x500.ColorTemp": null};
		var id = client.property.GetStatus({params: names, onresponse: function(resp) 			{
				var respStatus= JSON.stringify(resp.error || resp.result);
				var statusData = JSON.parse(respStatus);
				if (statusData == "timeout")
				{
					//TODO timeout
				}
				else
				{
					var strPresetWhiteLock = statusData["P.Control.u2x500.ColorTemp"];	
					
					if(strPresetWhiteLock == "Locked")
					{
						g_bPresetWhiteGray = true;
						
						if (g_OldObject == g_objPresetWhite)
						{
							g_objPresetWhite.userData[1].ShowDialog(false);
							g_OldObject = null;
						}
					}else 
					{
						g_bPresetWhiteGray = false;
					}
					g_objPresetWhite.userData[0].SetDisable(g_bPresetWhiteGray);
				}
		}});
	},
	
	
	NotifySetClrTempData : function (objArrItem)
	{
		j.each(objArrItem,function(key,value)
		{
			switch(key)
			{
				case "Camera.WhiteBalance.ColorTemperature.SelectMode":
					break;
				case "Camera.WhiteBalance.ColorTemperature.Value":
					g_objPresetWhite.innerHTML = value;
					g_objPresetWhite.userData[1].SetSelect(value);
					break;
				case "P.Menu.pmw-f5x.Event.EventID":
					if ((EVENT_PLAY_UPDATE == value)
						|| (EVENT_THUMBNAIL_UPDATE == value)
						|| (EVENT_RECORDE_UPDATE == value)
						|| (EVENT_VIEW_UPDATE == value))
					{
						PresetWhiteCtrl.GetStatus();
					}	
					break;
				default:
					break;
			}
		})
	}
	
}