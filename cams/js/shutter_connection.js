// JavaScript Document
var g_strShutterValue = null;
var g_shutterMode = null;
var g_shutterEnable = false;
var g_bShutterGray = false;
//var g_arrShutterAngleList = ["11.2","22.5", "45.0", "90.0", "180.0"];
var g_arrShutterSpeedList = [];
var g_arrShutterAngleList = [];
var g_arrShutterSLSList = ["2","3","4","5","6","7","8","16"];

var ShutterCtrl = {
	
	GetValue : function ()
	{
		var names = {"Camera.Shutter.Enabled":null, 
					"Camera.Shutter.Mode":null, 
					"Camera.Shutter.Value":null,};		
					/*"Camera.Shutter.Slow.Enabled":null, 
					"Camera.Shutter.Slow.Frames":null};*/
		var id = client.property.GetValue({params: names, onresponse: function(resp) {
			var respShutter = JSON.stringify(resp.error || resp.result);
			var ShutterData = JSON.parse(respShutter);
			if (ShutterData == "timeout")
			{
					
			}
			else
			{
				g_shutterEnable = ShutterData["Camera.Shutter.Enabled"];
				var shutterMode = ShutterData["Camera.Shutter.Mode"];
				var shutterValue = ShutterData["Camera.Shutter.Value"];
				/*var isSLSEnable = ShutterData["Camera.Shutter.Slow.Enabled"]
				var slowFrames = ShutterData["Camera.Shutter.Slow.Frames"];*/
				if (!g_shutterEnable)
				{
					g_objShutter.innerHTML = "Off";
				}
				else 
				{
					/*if (isSLSEnable)
					{
						g_shutterMode = "SLS";
						g_strShutterValue = slowFrames + "";
						g_objShutter.innerHTML = g_strShutterValue;
						g_objShutter.userData[1].SetListItems(g_arrShutterSLSList);
						g_objShutter.userData[1].SetSelect(g_strShutterValue);
					}
					else 
					{*/
					g_shutterMode = shutterMode;
					g_strShutterValue = shutterValue;
					if("ECS" == g_shutterMode)
					{
						g_objShutter.userData[1] = g_objShutter.userData[3];
						g_objShutter.userData[1].SetSelect(g_strShutterValue);
					}
					g_objShutter.innerHTML = g_strShutterValue;
				}
			}
			
		}});
	},
	
	
	GetModeValue : function ()
	{
		var names = {"Camera.Shutter.Mode":null, "Camera.Shutter.Value":null};
		var id = client.property.GetValue({params: names, onresponse: function(resp) {
			var respShutter = JSON.stringify(resp.error || resp.result);
			var ShutterData = JSON.parse(respShutter);
			if (ShutterData == "timeout")
			{
					
			}
			else
			{
				g_shutterMode = ShutterData["Camera.Shutter.Mode"];
				g_strShutterValue = ShutterData["Camera.Shutter.Value"];
				/*switch(g_shutterMode)
				{
					case "Angle":
						//g_objShutter.userData[1].SetListItems(g_arrShutterAngleList);
						//g_objShutter.userData[1].SetSelect(g_strShutterValue);
						break;
					case "Speed":
						break;
					case "ECS":
						g_objShutter.userData[1] = g_objShutter.userData[3];

						g_objShutter.userData[1].SetSelect(g_strShutterValue);
						break;
					default:
						break;
				}*/
				if("ECS" == g_shutterMode)
				{
					g_objShutter.userData[1] = g_objShutter.userData[3];
					g_objShutter.userData[1].SetSelect(g_strShutterValue);
				}
				g_objShutter.innerHTML = g_strShutterValue;
			}
			
		}});
	},
	
	GetCapabilities : function()
	{
		var names = ["Camera.Shutter.Speed"];
		switch(g_shutterMode)
		{
			case "Angle":
				names = ["Camera.Shutter.Angle"];
				break;
			case "Speed":
				names = ["Camera.Shutter.Speed"];
				break;
			default:
				break;
		}
		var id = client.capability.GetValue({ params: names, onresponse: function(resp) {
			var respData = JSON.stringify(resp.result);
			var jsonShutterData = JSON.parse(respData);
			var arrShutterList = null;
			for (var key in jsonShutterData)
			{
				arrShutterList = jsonShutterData[key];
			}
			if("Angle" == g_shutterMode)
			{
				g_arrShutterAngleList = arrShutterList[2];
				g_objShutter.userData[1].SetListItems(g_arrShutterAngleList);
				g_objShutter.userData[1].SetSelect(g_strShutterValue);
			}
			else if("Speed" == g_shutterMode)
			{
				g_arrShutterSpeedList = arrShutterList[2];
				g_objShutter.userData[1].SetListItems(g_arrShutterSpeedList);
				g_objShutter.userData[1].SetSelect(g_strShutterValue);
			}
			ShowMainPageDialog(g_objShutter);
		}});
	},
	
	SetValue : function(strSelectedValue)
	{
		if (g_strShutterValue != strSelectedValue)
		{
			var names = {"Camera.Shutter.Value":strSelectedValue};
			var id = client.property.SetValue({params: names, onresponse: function(resp){ }});
		}
	},
	
	SetSliderValue : function(iSelectedValue)
	{
		var names = {"P.Control.Shutter.Value.Slider":iSelectedValue};
		var id = client.property.SetValue({params: names, onresponse: function(resp){ }});	
	},
	
	IncrementProperties : function()
	{
		var params = {"Camera.Shutter.Value":""};
		var id = client.system.IncrementProperties({params: params, onresponse:function(resp) {	}});
	},
	
	DecrementProperties : function()
	{
		var params = {"Camera.Shutter.Value":""};
		var id = client.system.DecrementProperties({params: params, onresponse:function(resp) {	}});
	},
	
	UpdateValue : function(value)
	{
		var params = {"Camera.Shutter.Value":value};
		var id = client.property.UpdateValue({params: params, onresponse:function(resp) {	}});
	},
	
	NotifySetShutterData : function (objArrItem)
	{
		j.each(objArrItem,function(key,value){
		   switch(key)
		   {
			   case "Camera.Shutter.Enabled":
			   		g_shutterEnable = value;
					if (!g_shutterEnable)
					{
						g_objShutter.innerHTML = "Off";
					}
			   		break;
			   
				/*case "Camera.Shutter.Slow.Enabled":
					if (value)
					{
						if ("SLS" == g_shutterMode)
						{
							
						}else
						{
							g_shutterMode = "SLS";
							g_objShutter.userData[1] = g_objShutter.userData[2];
							g_objShutter.userData[1].SetListItems(g_arrShutterSLSList);
						}
					}
			   		break;
				case "Camera.Shutter.Slow.Frames":
					g_strShutterValue = value + "";
					if ("SLS" == g_shutterMode && g_shutterEnable)
					{
						g_objShutter.innerHTML = g_strShutterValue;
						g_objShutter.userData[1].SetSelect(g_strShutterValue);
					}
			   		break;*/
				case "Camera.Shutter.Mode":
					g_shutterMode = value;
					if ("Angle" == g_shutterMode)
					{
						g_objShutter.userData[1] = g_objShutter.userData[2];
						//g_objShutter.userData[1].SetListItems(g_arrShutterAngleList);
					}
					else if ("ECS" == g_shutterMode)
					{
						g_objShutter.userData[1] = g_objShutter.userData[3];
					}
					else if ("Speed" == g_shutterMode)
					{
						g_objShutter.userData[1] = g_objShutter.userData[2];
					}
			   		break;
				case "Camera.Shutter.Value":
					g_strShutterValue = value;
					if (g_shutterEnable)
					{
						g_objShutter.innerHTML = g_strShutterValue;
						g_objShutter.userData[1].SetSelect(g_strShutterValue);
					}
			   		break;
				case "P.Menu.pmw-f5x.Event.EventID":
					if ((EVENT_PLAY_UPDATE == value)
						|| (EVENT_THUMBNAIL_UPDATE == value)
						|| (EVENT_RECORDE_UPDATE == value)
						|| (EVENT_VIEW_UPDATE == value)
						|| (AUTOSHUTTER_GRAYOUT_SHUTTERSPEED == value)
						|| (SANDQ_GRAYOUT_SLOWSHUTTER == value)
						|| (RPN_GRAYOUT_SHUTTER == value)
						|| (ABB_GRAYOUT_SHUTTER == value)
						|| (EVENT_AWB_MODE_DISPLAY == value))
					{
						ShutterCtrl.GetStatus();
					}
					break;
				default:
			   		break;
		   }
		})
	},
	
	NotifyShutterStatusData : function (objArrItem)
	{
		j.each(objArrItem,function(key,value){
		   switch(key)
		   {
			   case "P.Control.Shutter.Value.Up":
					ShutterCtrl.SetPMBtnGray("plus", value);
					break;
				case "P.Control.Shutter.Value.Down":
					ShutterCtrl.SetPMBtnGray("minus", value);
					break;
				default:
			   		break;
		   }
		})
	},
	
	GetStatus: function()
	{
		var names = {"P.Control.u2x500.Shutter":null};
		var id = client.property.GetStatus({params: names, onresponse: function(resp) 			{
				var respStatus= JSON.stringify(resp.error || resp.result);
				var statusData = JSON.parse(respStatus);
				if (statusData == "timeout")
				{
					//TODO timeout
				}
				else
				{
					var strShutterLock = statusData["P.Control.u2x500.Shutter"];	
					if(strShutterLock == "Locked")
					{
						g_bShutterGray = true;
						
						if (g_OldObject == g_objShutter)
						{
							g_objShutter.userData[1].ShowDialog(false);
							g_OldObject = null;
						}
					}else 
					{
						g_bShutterGray = false;
					}
					g_objShutter.userData[0].SetDisable(g_bShutterGray);
				}
		}});
	},
	
	GetShutterValueStatus: function()
	{
		var names = {"P.Control.Shutter.Value.Up": null, "P.Control.Shutter.Value.Down": null}
		var id = client.property.GetStatus({params: names, onresponse: function(resp) {
				var resp_str = JSON.stringify(resp.error || resp.result);
				var shutter_GetStatus = JSON.parse(resp_str);
				var strMinusLock = shutter_GetStatus["P.Control.Shutter.Value.Down"];
				var strPlusLock = shutter_GetStatus["P.Control.Shutter.Value.Up"];
				ShutterCtrl.SetPMBtnGray("minus", strMinusLock);
				ShutterCtrl.SetPMBtnGray("plus", strPlusLock);
				},timeout:3000});
	},
	
	SetPMBtnGray:function(strBtnName, strValue)
	{
		if("ECS" == g_shutterMode)
		{
			if(strValue == "Unlocked")
			{
				g_objShutter.userData[1].SetPlusMinusButtonDisabled(strBtnName, false);
			}
			else  if(strValue == "Locked")
			{
				g_objShutter.userData[1].SetPlusMinusButtonDisabled(strBtnName, true);	
			}
			else
			{
				//Todo nothing
			}
		}
	},
}