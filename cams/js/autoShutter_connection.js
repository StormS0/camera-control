// JavaScript Document
var g_bAutoShutterGray = false;
var AutoShutterCtrl = {

	GetValue : function()
	{
		var names = {"Camera.Shutter.SettingMethod":null}
		var id = client.property.GetValue({params: names, onresponse: function(resp) {
			var respAutoShutter = JSON.stringify(resp.error || resp.result);
			var autoShutterData = JSON.parse(respAutoShutter);
			if (autoShutterData == "timeout")
			{
					
			}
			else
			{
				var autoShutterValue = autoShutterData["Camera.Shutter.SettingMethod"];
				var autoShutterValueMap = {"Manual":"Off","Automatic":"On"};

				if ("Manual" == autoShutterValue)
				{
					g_objAutoShutter.innerHTML = "Off";
				}
				else 
				{
					g_objAutoShutter.innerHTML = "On";
				}
				g_objAutoShutter.userData[1].SetSelect(g_objAutoShutter.innerHTML);
			}
		}});

	},

	SetValue : function(isEnabled, SelectedValue)
	{
		var autoShutterValueMap = {"Off":"Manual","On":"Automatic"};
		var names = {"Camera.Shutter.SettingMethod":autoShutterValueMap[SelectedValue]};
		var id = client.property.SetValue({params: names, onresponse: function(resp) { }});	
	},
	
	GetStatus : function()
	{
		var names = {"P.Control.u2x500.AutoShutter":null};	
		var id = client.property.GetStatus({params: names, onresponse: function(resp) {
			var resp_str = JSON.stringify(resp.error || resp.result);
			var statusData = JSON.parse(resp_str);
			if (statusData == "timeout")
			{
				//TODO
			}
			else
			{
				if ("Locked" == statusData["P.Control.u2x500.AutoShutter"])
				{
					g_bAutoShutterGray = true;
					if (g_OldObject == g_objAutoShutter)
					{
						g_objAutoShutter.userData[1].ShowDialog(false);
						g_OldObject = null;
					}
				}
				else
				{
					g_bAutoShutterGray = false;
				}
				g_objAutoShutter.userData[0].SetDisable(g_bAutoShutterGray);
			}
		}});
	},

	NotifySetAutoShutterData : function(objArrItem)
	{
		j.each(objArrItem, function(key, value) {
									
			switch(key)
			{
				case "Camera.Shutter.SettingMethod":
					if ("Manual" == value)
					{
						g_objAutoShutter.innerHTML = "Off";
					}
					else 
					{
						g_objAutoShutter.innerHTML = "On";
					}
					g_objAutoShutter.userData[1].SetSelect(g_objAutoShutter.innerHTML);
					break;
				case "P.Menu.pmw-f5x.Event.EventID":
					if ((EVENT_PLAY_UPDATE == value)
						|| (EVENT_THUMBNAIL_UPDATE == value)
						|| (EVENT_RECORDE_UPDATE == value)
						|| (EVENT_VIEW_UPDATE == value)
						|| (EVENTKIND_REFRESH_EE_AUTO_SHUTTER == value)
						|| (EVENT_ABB_START == value)
						|| (EVENT_AWB_MODE_DISPLAY == value))
						{
							AutoShutterCtrl.GetStatus();
						}	
					break;
				default: 
					break;
			}
		})
	}
}