// JavaScript Document

var FocusValue = 0;
var FocusLock = 0;
var g_bFocusGray = false;
var g_FocusValue1 = 0;
var g_FocusUnit;
var Focuspre1 = 0;
var Focusnext1 = -1;
var Focuspre2 = 0;
var Focusnext2 = -1;
var g_FocusEnabled = true;

var FocusCtrl = {

	GetValue : function()
	{
		var  assignValueItems = new Array();
		var names = {"Camera.Focus.Distance":null,"Camera.Focus.Distance.Unit":null,"Camera.Focus.SettingMethod":null,
					 "Camera.Focus.Distance.Enabled":null};
		
		var id = client.property.GetValue({params: names,
		onresponse: function(resp) {
			var respFocus = JSON.stringify(resp.error || resp.result);
			var FocusData = JSON.parse(respFocus);
			if (FocusData == "timeout")
			{
					
			}
			else
			{
				g_FocusValue1 = FocusData["Camera.Focus.Distance"];
				var unitType = FocusData["Camera.Focus.Distance.Unit"];
				FocusLock = FocusData["Camera.Focus.SettingMethod"];
				g_FocusEnabled = FocusData["Camera.Focus.Distance.Enabled"];
			
				if (unitType == "Meter")
				{
					g_FocusUnit = "m";
				}
				else if (unitType == "Feet")
				{
					g_FocusUnit = "ft";
				}
				
				if (!g_FocusEnabled)
				{
					g_ObjFocusValue.innerHTML = "---";
				}
				if (g_LensMountValue != "Disconnected" && g_FocusEnabled == true)
				{
					if (g_FocusValue1 < 0 || g_FocusValue1 > 999)
					{
						g_ObjFocusValue.innerHTML = "&infin;" + g_FocusUnit;
					}
					else 				
					{
						if ( g_FocusValue1 < 10 )
						{
							g_ObjFocusValue.innerHTML = plusone(g_FocusValue1) + g_FocusUnit;
						}
						if ( g_FocusValue1 >= 10 )
						{
							g_ObjFocusValue.innerHTML = parseInt(g_FocusValue1) + g_FocusUnit;
						}
					}
				}
			}
	
		}});

	},
	
	GetStatus : function ()
	{
		var names = {"P.Control.u2x500.Focus":null};
		
		var id = client.property.GetStatus({params: names,
			onresponse: function(resp) {
				var resp_str = JSON.stringify(resp.error || resp.result);
				var respData = JSON.parse(resp_str);
				if (respData == "timeout")
				{		
				}
				else
				{
					var strFocusLocked = respData["P.Control.u2x500.Focus"];
					
					if(strFocusLocked == "Locked")
					{
						g_bFocusGray = true;	
					}
					else 
					{
						g_bFocusGray = false;
					}
					FocusGrayFunction(g_bFocusGray, g_LockFlag);
				}
			},
			timeout:3000});
	},
	
	IncrementProperties : function()
	{
		var names = {"Camera.Focus.Velocity":FocusValue};
		var id = client.property.SetValue({params: names,onresponse: function(resp) {}});

	},
	
	DecrementProperties : function()
	{
		var names = {"Camera.Focus.Velocity":FocusValue};
		var id = client.property.SetValue({params: names,onresponse: function(resp) {}});

	},
		
	NotifySetFocusData : function(objArrItem)
	{	
		j.each(objArrItem, function(key, value) 
		{
			switch(key)
			{
				case "Camera.Focus.Distance.Unit":	
					if (value == "Meter")
					{
						g_FocusUnit = "m";
					}
					else if (value == "Feet")
					{
						g_FocusUnit = "ft";
					}
					
					if (g_LensMountValue != "Disconnected")
					{
						if (g_FocusValue1 < 0 || g_FocusValue1 > 999)
						{
							g_ObjFocusValue.innerHTML = "&infin;" + g_FocusUnit;
						}
						else
						{
							if ( g_FocusValue1 < 10 )
							{
								g_ObjFocusValue.innerHTML = plusone(g_FocusValue1) + g_FocusUnit;
							}else
							{
								g_ObjFocusValue.innerHTML = parseInt(g_FocusValue1) + g_FocusUnit;
							}
						}
					}
					break;
				case "Camera.Focus.Distance":
					g_FocusValue1 = value;
					if (g_LensMountValue != "Disconnected")
					{
						
						if (g_FocusValue1 < 0 || g_FocusValue1 > 999)
						{
							g_ObjFocusValue.innerHTML = "&infin;" + g_FocusUnit;
						}
						else
						{
							if ( g_FocusValue1 < 10 )
							{
								g_ObjFocusValue.innerHTML = plusone(g_FocusValue1) + g_FocusUnit;
							}else
							{
								g_ObjFocusValue.innerHTML = parseInt(g_FocusValue1) + g_FocusUnit;
							}
						}
					}
					break;
				case "Camera.Focus.SettingMethod":
					FocusLock = value;
					break;
				case "Camera.Focus.Distance.Enabled":
					g_FocusEnabled = value;
					if (!g_FocusEnabled)
					{
						g_ObjFocusValue.innerHTML = "---";
					}
					break;
				case "P.Menu.pmw-f5x.Event.EventID":
					if ((EVENT_PLAY_UPDATE == value)
						|| (EVENT_THUMBNAIL_UPDATE == value)
						|| (EVENT_RECORDE_UPDATE == value)
						|| (EVENT_VIEW_UPDATE == value)
						|| (EVENTKIND_ADJUSTFOCUS_FOCUSMODE_UPDATE == value)
						|| (EVENT_ATTACHLENS_NOTIFY_LENSEXTENDER_UPDATE == value))
						{
							FocusCtrl.GetStatus();
						}	
					break;
				default:
					break;
			}

		})	
	},
	
	SetFocusText : function()
	{
		if (g_FocusValue1 < 0 || g_FocusValue1 > 999)
		{
			g_ObjFocusValue.innerHTML = "&infin;" + g_FocusUnit;
		}
		else
		{
			if ( g_FocusValue1 < 10 )
			{
				g_ObjFocusValue.innerHTML = plusone(g_FocusValue1) + g_FocusUnit;
			}else
			{
				g_ObjFocusValue.innerHTML = parseInt(g_FocusValue1) + g_FocusUnit;
			}
		}
	}
}
