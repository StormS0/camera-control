// JavaScript Document

var IsZoomLock = "Unlocked";
var ZoomValue = 0;
var g_bZoomGray = false;
var Zoompre1 = 0;
var Zoomnext1 = -1;
var Zoompre2 = 0;
var Zoomnext2 = -1;
var g_ZoomValue = 0;
var g_ZoomEnabled = true;

var ZoomCtrl = {

	GetValue : function()
	{
		var  assignValueItems = new Array();
		var names = {"Camera.Zoom.Value":null, "Camera.Zoom.Value.Enabled":null};
		var id = client.property.GetValue({params: names,
		onresponse: function(resp) {
			var respZoom = JSON.stringify(resp.error || resp.result);
			var ZoomData = JSON.parse(respZoom);
			if (ZoomData == "timeout")
			{
					
			}
			else
			{
				g_ZoomValue = ZoomData["Camera.Zoom.Value"];
				g_ZoomEnabled = ZoomData["Camera.Zoom.Value.Enabled"];
				if (!g_ZoomEnabled)
				{
					g_ObjZoomValue.innerHTML = "---";
				}
				if (g_LensMountValue != "Disconnected" && g_ZoomEnabled == true)
				{
					g_ObjZoomValue.innerHTML = g_ZoomValue;
				}
			}
		
		}});

	},

	GetStatus : function ()
	{
		var names = {"P.Control.u2x500.Zoom":null};
		
		var id = client.property.GetStatus({params: names,
			onresponse: function(resp) {
				var resp_str = JSON.stringify(resp.error || resp.result);
				var respData = JSON.parse(resp_str);
				if (respData == "timeout")
				{		
				}
				else
				{
					var strZoomLocked = respData["P.Control.u2x500.Zoom"];
					
					if(strZoomLocked == "Locked")
					{
						g_bZoomGray = true;	
					}
					else 
					{
						g_bZoomGray = false;
					}
					ZoomGrayFunction(g_bZoomGray, g_LockFlag);
				}
			},
			timeout:3000});
	},

	IncrementProperties : function()
	{
		var names = {"Camera.Zoom.Velocity":ZoomValue};
		var id = client.property.SetValue({params: names,onresponse: function(resp) {}});

	},
	
	DecrementProperties : function()
	{
		var names = {"Camera.Zoom.Velocity":ZoomValue};
		var id = client.property.SetValue({params: names,onresponse: function(resp) {}});

	},

	NotifySetZoomData : function(objArrItem)
	{
		j.each(objArrItem, function(key, value) 
		{
			
			if ("Camera.Zoom.Value" == key)
			{
				g_ZoomValue = value;
				if (g_LensMountValue != "Disconnected")
				{
					g_ObjZoomValue.innerHTML = g_ZoomValue;
				}
			}
			else if ("Camera.Zoom.Value.Enabled" == key)
			{
				g_ZoomEnabled = value;
				if (!g_ZoomEnabled)
				{
					g_ObjZoomValue.innerHTML = "---";
				}
			}
			
			if ("P.Menu.pmw-f5x.Event.EventID" == key)
			{
				if ((EVENT_PLAY_UPDATE == value)
					|| (EVENT_THUMBNAIL_UPDATE == value)
					|| (EVENT_RECORDE_UPDATE == value)
					|| (EVENT_VIEW_UPDATE == value)
					|| (EVENT_ATTACHLENS_NOTIFY_LENSEXTENDER_UPDATE == value))
				{
					ZoomCtrl.GetStatus();
				}
			}

			
		})
		
	}
}
