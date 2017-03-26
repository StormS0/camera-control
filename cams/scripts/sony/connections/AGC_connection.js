// JavaScript Document
var g_bAGCGray = false;
var AGCCtrl = {

	GetValue : function()
	{
		var names = {"Camera.Gain.SettingMethod":null};
		var id = client.property.GetValue({params: names,
		onresponse: function(resp) {
			var respAGC = JSON.stringify(resp.error || resp.result);
			var agcData = JSON.parse(respAGC);
			if (agcData == "timeout")
			{
					
			}
			else
			{
				var agcValue = agcData["Camera.Gain.SettingMethod"];
				var agcValueMap = {"Manual":"Off","Automatic":"On"};

				if ("Manual" == agcValue)
				{
					g_objAGC.innerHTML = "Off";
				}
				else if ("Automatic" == agcValue)
				{
					g_objAGC.innerHTML = "On";
				}
				g_objAGC.userData[1].SetSelect(g_objAGC.innerHTML);
			}
		}});

	},

	SetValue : function(isEnabled, SelectedValue)
	{
		var agcValueMap = {"Off":"Manual","On":"Automatic"};
		var names = {"Camera.Gain.SettingMethod":agcValueMap[SelectedValue]};
		var id = client.property.SetValue({params: names, onresponse: function(resp) { }});	
	},
	
	GetStatus : function()
	{
		var names = {"P.Control.u2x500.AGC":null};	
		var id = client.property.GetStatus({params: names, onresponse: function(resp) {
			var resp_str = JSON.stringify(resp.error || resp.result);
			var statusData = JSON.parse(resp_str);
			if (statusData == "timeout")
			{
				//TODO
			}
			else
			{
				if ("Locked" == statusData["P.Control.u2x500.AGC"])
				{
					g_bAGCGray = true;
					if (g_OldObject == g_objAGC)
					{
						g_objAGC.userData[1].ShowDialog(false);
						g_OldObject = null;
					}
				}
				else
				{
					g_bAGCGray = false;
				}
				g_objAGC.userData[0].SetDisable(g_bAGCGray);
			}
		}});
	},

	NotifySetAGCData : function(objArrItem)
	{
		j.each(objArrItem, function(key, value) {
			switch(key)
			{
				case "Camera.Gain.SettingMethod":
					if ("Manual" == value)
					{
						g_objAGC.innerHTML = "Off";
					}
					else if ("Automatic" == value)
					{
						g_objAGC.innerHTML = "On";
					}
					g_objAGC.userData[1].SetSelect(g_objAGC.innerHTML);
					break;
				case "P.Menu.pmw-f5x.Event.EventID":
					if ((EVENT_PLAY_UPDATE == value)
						|| (EVENT_THUMBNAIL_UPDATE == value)
						|| (EVENT_RECORDE_UPDATE == value)
						|| (EVENT_VIEW_UPDATE == value)
						|| (EVENT_GAIN_AGC_MODE == value)
						|| (EVENTKIND_SHOOTINGMODE_REFRESH == value)
						|| (EVENT_ABB_START == value)
						|| (EVENT_AWB_MODE_DISPLAY == value))
						{
							AGCCtrl.GetStatus();
						}	
					break;
				default: 
					break;
			}
		})
	}
}