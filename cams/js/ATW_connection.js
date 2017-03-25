// JavaScript Document
var g_bATWGray = false;
var ATWCtrl = {

	GetValue : function()
	{
		var names = {"Camera.WhiteBalance.SettingMethod":null};
		var id = client.property.GetValue({params: names,
		onresponse: function(resp) {
			var respATW = JSON.stringify(resp.error || resp.result);
			var atwData = JSON.parse(respATW);
			if (atwData == "timeout")
			{
					
			}
			else
			{
				var atwValue = atwData["Camera.WhiteBalance.SettingMethod"];
				var atwValueMap = {"Manual":"Off","Automatic":"On"};
			
				if ("Manual" == atwValue)
				{
					g_objATW.innerHTML = "Off";
				}
				else 
				{
					g_objATW.innerHTML = "On";
				}
				g_objATW.userData[1].SetSelect(g_objATW.innerHTML);
			}
		}});

	},

	SetValue : function(isEnabled, SelectedValue)
	{
		var atwValueMap = {"Off":"Manual","On":"Automatic"};
		var names = {"Camera.WhiteBalance.SettingMethod":atwValueMap[SelectedValue]};
		var id = client.property.SetValue({params: names, onresponse: function(resp) { }});	
	},
	
	GetStatus : function()
	{
		var names = {"P.Control.u2x500.ATW":null};	
		var id = client.property.GetStatus({params: names, onresponse: function(resp) {
			var resp_str = JSON.stringify(resp.error || resp.result);
			var statusData = JSON.parse(resp_str);
			if (statusData == "timeout")
			{
				//TODO
			}
			else
			{
				if ("Locked" == statusData["P.Control.u2x500.ATW"])
				{
					g_bATWGray = true;
					if (g_OldObject == g_objATW)
					{
						g_objATW.userData[1].ShowDialog(false);
						g_OldObject = null;
					}
				}
				else
				{
					g_bATWGray = false;
				}
				g_objATW.userData[0].SetDisable(g_bATWGray);
			}
		}});
	},

	NotifySetATWData : function(objArrItem)
	{
		j.each(objArrItem, function(key, value) {
									
			switch(key)
			{
				case "Camera.WhiteBalance.SettingMethod":
					if ("Manual" == value)
					{
						g_objATW.innerHTML = "Off";
					}
					else 
					{
						g_objATW.innerHTML = "On";
					}
					g_objATW.userData[1].SetSelect(g_objATW.innerHTML);
					break;
				case "P.Menu.pmw-f5x.Event.EventID":
					if ((EVENT_PLAY_UPDATE == value)
						|| (EVENT_THUMBNAIL_UPDATE == value)
						|| (EVENT_RECORDE_UPDATE == value)
						|| (EVENT_VIEW_UPDATE == value)
						|| (EVENT_ATW_HOLD_DISPLAY  == value)
						|| (EVENTKIND_SHOOTINGMODE_REFRESH == value)
						|| (EVENT_AWB_MODE_DISPLAY == value)
						|| (EVENT_ABB_START == value))
						{
							ATWCtrl.GetStatus();
						}	
					break;
				default: 
					break;
			}
		})
	}
}