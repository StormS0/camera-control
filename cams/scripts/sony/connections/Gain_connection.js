// JavaScript Document
var  g_GainValue = "- - -";
var  g_GainMode = "";
var  g_GainItems = new Array();
var g_bGainGray = false;

var GainCtrl = {
	/**************************************************
	* Get GainData Functions
	***************************************************/
	GetValue : function ()
	{
		var objGainDialog = $("TEXT_DIV_GAIN");    // show gain dialog obj
		var names = {"Camera.Gain.Value":""};
		var id = client.property.GetValue({params: names, onresponse: function(resp) {
			var respGain = JSON.stringify(resp.error || resp.result);
			var GainData = JSON.parse(respGain);
			if (GainData == "timeout")
			{
					
			}
			else
			{
				g_GainMode = GainData["Camera.Gain.Mode"];
				g_GainValue = GainData["Camera.Gain.Value"];
				//GainCtrl.GetStatus();
//				if ("ExposureIndex" == g_GainMode)
//				{
//					$("TEXT_DIV_GAIN").innerHTML = g_GainValue + "E";
//				}
//				else
//				{
					$("TEXT_DIV_GAIN").innerHTML = g_GainValue;
//				}
				GainCtrl.SetFunName();
			}
		}});
	},
	
	GetCapabilities : function()
	{
		var objGainDialog = $("TEXT_DIV_GAIN");    // show gain dialog obj
		var names = ["Camera.Gain.Value"];
		var id = client.capability.GetValue({ params: names, onresponse: function(resp) {
			var speed = JSON.stringify(resp.result);
			g_GainItems = JSON.parse(speed);
			for (var key in g_GainItems)
			{
				g_GainItems = g_GainItems[key];
			}

			g_GainItems = g_GainItems[2];
			var arrGainItems = g_GainItems;  		 //gain getArrayItems 
			GainCtrl.SetDlgTitle();
			objGainDialog.userData[1].SetSelect(g_GainValue);
			objGainDialog.userData[1].SetArrItems(arrGainItems);
			ShowMainPageDialog(objGainDialog);
		}});
	},
	
	GetGainMode: function()
	{
		return g_GainMode;
	},
	
	GetGainValue: function()
	{
		if(g_GainValue != "")
		{
			return g_GainValue;
		}
	},
	
	GetStatus: function()
    {
		var names = {"P.Control.pmw-f5x.Sensitivity":null};
		var id = client.property.GetStatus({params: names, onresponse: function(resp) {
			var respStatus= JSON.stringify(resp.error || resp.result);
			var statusData = JSON.parse(respStatus);
			if (statusData == "timeout")
			{
				//TODO timeout
			}
			else
			{
				var strGainLocked = statusData["P.Control.pmw-f5x.Sensitivity"];
				if (strGainLocked == "Locked")
				{
					g_bGainGray = true;
					if (g_OldObject == g_objGain)
					{
						g_objGain.userData[1].ShowDialog(false);
						g_OldObject = null;
					}
				}
				else
				{
					g_bGainGray = false;
				}
				g_objGain.userData[0].SetDisable(g_bGainGray);
			}	
		}});
	},

	/**************************************************
	* Set ShutterData Functions
	***************************************************/
	SetValue : function(objSrc, GainValue)
	{
		var names = {"Camera.Gain.Mode": g_GainMode,"Camera.Gain.Value": GainValue};
		var id = client.property.SetValue({params: names, onresponse: function(resp) { }});	
	},
	
	SetGainMode : function(GainMode)
	{
		if(g_GainMode != GainMode)
		{
			g_GainMode = GainMode;
			GainCtrl.SetFunName();
		}
	},
	
	SetGainValue:function(GainValue)
	{
		if("Unknown" == GainValue)
		{
			return;	
		}
//		if ("ExposureIndex" == g_GainMode)
//		{
//			$("TEXT_DIV_GAIN").innerHTML = GainValue + "E";
//		}
		else
		{
			$("TEXT_DIV_GAIN").innerHTML = GainValue;
		}
		g_GainValue = GainValue;
	},
	
	SetCapabilities : function(GainItems)
	{
		g_GainItems = GainItems;
	},
	
	SetFunName : function()
	{
		var objSenGainLbl = $("LBL_DIV_GAIN");
		if("ISO" == g_GainMode)
		{
			objSenGainLbl.innerHTML = "Sensitivity";
		}
		else if("dB" == g_GainMode)
		{
			objSenGainLbl.innerHTML = "Gain";
		}
		else if("ExposureIndex" == g_GainMode)
		{
			objSenGainLbl.innerHTML = "Exposure Index";
		}
	},
	
	SetDlgTitle : function()
	{
		if("ISO" == g_GainMode)
		{
			g_objGain.userData[1].SetTitle("Sensitivity");
		}
		else if("dB" == g_GainMode)
		{
			g_objGain.userData[1].SetTitle("Gain");
		}
		else if("ExposureIndex" == g_GainMode)
		{
			g_objGain.userData[1].SetTitle("Exposure Index");
		}
	},
	/**************************************************
	*  Sever Notify Functions
	***************************************************/
	NotifySetGainData : function (objArrItem)
	{
		for(var key in objArrItem)
		{
			if (key == "Camera.Gain.Value")
			{
				GainCtrl.SetGainValue(objArrItem[key]);
			}
			if (key == "Camera.Gain.Mode")
			{
				GainCtrl.SetGainMode(objArrItem[key]);
				g_GainMode = objArrItem[key];
			} 
		
			if (key == "P.Menu.pmw-f5x.Event.EventID")
			{
				if ((EVENT_RECORDE_UPDATE  == objArrItem[key]) || (EVENT_PLAY_UPDATE == objArrItem[key]) ||
					(EVENT_THUMBNAIL_UPDATE  == objArrItem[key]) || (EVENT_VIEW_UPDATE == objArrItem[key]) ||
					(EVENT_REFRESH_PRESETGAIN_PAGE == objArrItem[key]) || (EVENTKIND_COMMON_REFRESH_MENU == objArrItem[key])||
					(EVENTKIND_SHOOTINGMODE_REFRESH == objArrItem[key]) || (EVENT_GAIN_AGC_MODE == objArrItem[key]) ||
					(EVENT_ABB_START == objArrItem[key]) || (EVENT_AWB_MODE_DISPLAY == objArrItem[key]))
				{
					GainCtrl.GetStatus();
				}
			}
		}
	}
}