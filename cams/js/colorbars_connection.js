// JavaScript Document
var g_bColorBarsGray = false;
var g_DftValue = "";
var ColorBarsCtrl = {

	GetValue : function()
	{
		var names = {"Camera.ColorBar.Enabled":null, "Camera.ColorBar.Type":null};
		var id = client.property.GetValue({params: names,
		onresponse: function(resp) {
			var respColorBars = JSON.stringify(resp.error || resp.result);
			var colorBarsData = JSON.parse(respColorBars);
			if (colorBarsData == "timeout")
			{
					
			}
			else
			{
				
				g_DftValue = colorBarsData["Camera.ColorBar.Type"];
				var isEnabled = colorBarsData["Camera.ColorBar.Enabled"];
			
				if (true == isEnabled)
				{
					g_objColorBars.innerHTML = "On";
				}
				else 
				{
					g_objColorBars.innerHTML = "Off";
				}
				g_objColorBars.userData[1].SetSelect(g_objColorBars.innerHTML);
			}
		}});

	},

	SetValue : function(isEnabled, SelectedValue)
	{
		if ("On" == SelectedValue)
		{
			SelectedValue = true;
		}
		else
		{
			SelectedValue = false;
		}
		var names = {"Camera.ColorBar.Enabled":SelectedValue,"Camera.ColorBar.Type":g_DftValue};
		var id = client.property.SetValue({params: names, onresponse: function(resp) { }});	
	},
	
	GetStatus : function()
	{
		var names = {"P.Control.u2x500.ColorBar":null};	
		var id = client.property.GetStatus({params: names, onresponse: function(resp) 						{
			var resp_str = JSON.stringify(resp.error || resp.result);
			var statusData = JSON.parse(resp_str);
			if (statusData == "timeout")
			{
				//TODO
			}
			else
			{
				if ("Locked" == statusData["P.Control.u2x500.ColorBar"])
				{
					g_bColorBarsGray = true;
					if (g_OldObject == g_objColorBars)
					{
						g_objColorBars.userData[1].ShowDialog(false);
						g_OldObject = null;
					}
				}
				else
				{
					g_bColorBarsGray = false;
				}
				g_objColorBars.userData[0].SetDisable(g_bColorBarsGray);
			}
		}});
	},

	NotifySetColorBarsData : function(objArrItem)
	{
		j.each(objArrItem, function(key, value) {
			switch(key)
			{
				case "Camera.ColorBar.Enabled":
					if (true == value)
					{
						g_objColorBars.innerHTML = "On";
					}
					else 
					{
						g_objColorBars.innerHTML = "Off";
					}
					g_objColorBars.userData[1].SetSelect(g_objColorBars.innerHTML);
					break;
				case "Camera.ColorBar.Type":
					g_DftValue = value;//TODO
					break;
				case "P.Menu.pmw-f5x.Event.EventID":
					if ((EVENT_PLAY_UPDATE == value)
						|| (EVENT_THUMBNAIL_UPDATE == value)
						|| (EVENT_RECORDE_UPDATE == value)
						|| (EVENT_VIEW_UPDATE == value)
						|| (EVENT_RETURN_SANDQMOTION_ISAVAILABLE == value)
						|| (EVENT_RETURN_SANDQMOTION_UNAVAILABLE == value)
						|| (EVENT_NOTIFY_SANDQMOTION_UNAVAILABLE == value)
						|| (EVENT_NOTIFY_SANDQMOTION_ISAVAILABLE == value)
						|| (EVENT_AWB_MODE_DISPLAY == value)
						|| (EVENT_ABB_START == value)
						|| (EVENTKIND_SETGREY_RETURNPAGE_IMAGEINVERTSION == value))
					{
						ColorBarsCtrl.GetStatus();
					}
					break;
				default:
					break;
			}
		})
	}
}