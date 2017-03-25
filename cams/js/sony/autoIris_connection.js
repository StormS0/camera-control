var g_bAutoIrisGray = false;
var AutoIrisCtrl = {

	GetValue : function()
	{
		var names = {"Camera.Iris.SettingMethod":null};
		var id = client.property.GetValue({params: names,
		onresponse: function(resp) {
			var respAutoIris = JSON.stringify(resp.error || resp.result);
			var autoIrisData = JSON.parse(respAutoIris);
			if (autoIrisData == "timeout")
			{
					
			}
			else
			{
				var autoIrisSettingMethod = autoIrisData["Camera.Iris.SettingMethod"];
				var autoIrisSettingMethodMap = {"Manual":"Off","Automatic":"On"};

				if ("Manual" == autoIrisSettingMethod)
				{
					g_objAutoIris.innerHTML = "Off";
				}
				else 
				{
					g_objAutoIris.innerHTML = "On";
				}
				g_objAutoIris.userData[1].SetSelect(g_objAutoIris.innerHTML);
			}
		}});

	},

	SetValue : function(isEnabled, SelectedValue)
	{
		var autoIrisSettingMethodMap = {"Off":"Manual","On":"Automatic"};		
		var names = {"Camera.Iris.SettingMethod":autoIrisSettingMethodMap[SelectedValue]};
		var id = client.property.SetValue({params: names, onresponse: function(resp) {}});	
	},
	
	GetStatus : function()
	{
		var names = {"P.Control.u2x500.AutoIris":null};	
		var id = client.property.GetStatus({params: names, onresponse: function(resp) {
			var resp_str = JSON.stringify(resp.error || resp.result);
			var arrData = JSON.parse(resp_str);
			if (arrData == "timeout")
			{
				//TODO
			}
			else
			{
				if ("Locked" == arrData["P.Control.u2x500.AutoIris"])
				{
					g_bAutoIrisGray = true;
					if (g_OldObject == g_objAutoIris)
					{
						g_objAutoIris.userData[1].ShowDialog(false);
						g_OldObject = null;
					}
				}
				else
				{
					g_bAutoIrisGray = false;
				}
				g_objAutoIris.userData[0].SetDisable(g_bAutoIrisGray);
			}
		}});
	},
	

	NotifySetAutoIrisData : function(objArrItem)
	{
		j.each(objArrItem, function(key, value) {
			switch(key)
			{
				case "Camera.Iris.SettingMethod":
					if ("Manual" == value)
					{
						g_objAutoIris.innerHTML = "Off";
					}
					else 
					{
						g_objAutoIris.innerHTML = "On";
					}
					g_objAutoIris.userData[1].SetSelect(g_objAutoIris.innerHTML);
					break;
				case "P.Menu.pmw-f5x.Event.EventID":
					if ((EVENT_PLAY_UPDATE == value)
						|| (EVENT_THUMBNAIL_UPDATE == value)
						|| (EVENT_RECORDE_UPDATE == value)
						|| (EVENT_VIEW_UPDATE == value)
						|| (EVENT_IRISAUTOMODE_NOTIFY_DISPLAY == value)
						|| (EVENT_ATTACHLENS_NOTIFY_LENSEXTENDER_UPDATE == value)
						|| (EVENTKIND_SETGREY_RETURNPAGE_IMAGEINVERTSION == value)
						|| (EVENT_AWB_MODE_DISPLAY == value)
						|| (EVENT_ABB_START == value))
						{
							AutoIrisCtrl.GetStatus();
						}	
					break;
				default: 
					break;
			}
		})	
	}
}
