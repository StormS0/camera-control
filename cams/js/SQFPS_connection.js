// JavaScript Document
var g_SQFPSValue = "- - -";
var g_bHighFrameRateEnabled = true;
var g_bSQPFSEnabled = true;
var g_OldSelectedIndex = 0;
var g_bSAndQGray = false;

var SQFPSCtrl = {
	/**************************************************
	*   Get SQFPS Properties and Methods Functions
	***************************************************/
	GetValue : function ()
	{
		var names = [{"Camera.SlowAndQuickMotion.Enabled":""}, {"Camera.SlowAndQuickMotion.HighFrameRate.Enabled":""}, {"Camera.SlowAndQuickMotion.FrameRate":""}];
		var id = client.property.GetValue({params: names,onresponse: function(resp) {
			var respSQFPS = JSON.stringify(resp.error || resp.result);
			var SQFPSData = JSON.parse(respSQFPS);
			if (SQFPSData == "timeout")
			{
				//TODO Timeout	
			}
			else
			{
				g_SQFPSValue = SQFPSData["Camera.SlowAndQuickMotion.FrameRate"];
				g_bSQPFSEnabled = SQFPSData["Camera.SlowAndQuickMotion.Enabled"];
				g_bHighFrameRateEnabled = SQFPSData["Camera.SlowAndQuickMotion.HighFrameRate.Enabled"];
				
				g_bSQPFSEnabled ? j(g_objSandQ).text(g_SQFPSValue + "FPS") : j(g_objSandQ).text("Off");
			}
		}});	
	},

	GetCapabilities : function()
	{
		var g_objSandQ = $("CLICK_DIV_SQFPS");   			  // S&Q Dialog Dom Element
		SQFPSCtrl.SetSQFstPageSelect(g_objSandQ);
		g_objSandQ.userData[1].SetSQMotionText(g_SQFPSValue + "FPS"); //Set S&Q Dialog Text
		g_OldSelectedIndex = g_bSQPFSEnabled ? 0 : 1;
		var names = ["Camera.SlowAndQuickMotion.FrameRate"];
		var id = client.capability.GetValue({ params: names, onresponse: function(resp) {
			var respSQFPS = JSON.stringify(resp.error || resp.result);
			var SQFPSData = JSON.parse(respSQFPS);
			if (SQFPSData == "timeout")
			{
			}
			else
			{
				var arrSQFPSArray = new Array(); //Array to Save S&Q Motion Data
					
				for (var key in SQFPSData)
				{
					arrSQFPSArray = SQFPSData[key];
				}
				arrSQFPSArray = arrSQFPSArray[2];
				//	to show dialog			
				if(g_objSandQ.userData[1])
				{
					if(arrSQFPSArray.length > 0)
					{					
						g_objSandQ.userData[1].SetsqMotionItems(arrSQFPSArray);			//Set Items to Dialog
						g_objSandQ.userData[1].SetSqMotionIndex(parseInt(g_SQFPSValue, 10));
					}
				}
				ShowMainPageDialog(g_objSandQ);
			}
			}, timeout : 3000});
	},
	
	GetSQPFSEnabled : function()
	{
		if(g_bSQPFSEnabled != "")
		{
			return g_bSQPFSEnabled;
		}
	},
	
	GetHighFrameRateEnabled: function()
	{
		if(g_bHighFrameRateEnabled != "")
		{
			return g_bHighFrameRateEnabled;
		}
	},
		
	GetSQHighFrameRateValue: function()
	{
		if(g_SQFPSValue != "")
		{
			return g_SQFPSValue;
		}
	},
		
	/**************************************************
	*  Set SQFPS Properties and Methods Functions
	***************************************************/
	SetValue : function(objSrc, SelectedIndex, SQFPSValue)
	{
		var names = {};
		if (SQFPSValue == "" && SelectedIndex == "")
		{
			// Do Nothing : Enable and Value is Not Changed
		}
		else
		{
			if(SelectedIndex != g_OldSelectedIndex || parseInt(SQFPSValue) != parseInt(g_SQFPSValue))
			{
				if(0 == SelectedIndex)
				{
					//S&Q Motion: On
					g_SQFPSValue = parseInt(SQFPSValue);	
					names = {"Camera.SlowAndQuickMotion.Enabled": true, "Camera.SlowAndQuickMotion.HighFrameRate.Enabled": false, "Camera.SlowAndQuickMotion.FrameRate": g_SQFPSValue};
				}
				else if(1 == SelectedIndex) 
				{
					names = {"Camera.SlowAndQuickMotion.Enabled": false,"Camera.SlowAndQuickMotion.HighFrameRate.Enabled": false, "Camera.SlowAndQuickMotion.FrameRate": g_SQFPSValue};
				}
				
				g_OldSelectedIndex = SelectedIndex;
				var id = client.property.SetValue({params: names, onresponse: function(resp) { }});	
			}
		}
	},

	SetSQFstPageSelect : function(g_objSandQ)
	{
		if(true == g_bSQPFSEnabled)					  // Set S&Q Motion Setting : On / Off
		{
			g_objSandQ.userData[1].SetSelect(0);
		}
		else
		{
			g_objSandQ.userData[1].SetSelect(1);
			j("#0_SQFPS_DLG_ITEM, #0_SQFPS_DLG_ITEM > div").css("color", "rgb(230,230,230)");
		}
	},

	SetSQPFSEnabled:function(bIsSQPFSEnabled)
	{
		var g_objSandQ = $("CLICK_DIV_SQFPS");   			// S&Q Dialog Dom Element
		if(bIsSQPFSEnabled != g_bSQPFSEnabled)
		{
			SQFPSCtrl.CloseShutterDlg();
			if(bIsSQPFSEnabled == false)
			{
				$("CLICK_DIV_SQFPS").innerHTML = "Off";
				g_objSandQ.userData[1].SetSqMotionIndex(parseInt(g_SQFPSValue));
			}
			g_bSQPFSEnabled = bIsSQPFSEnabled;
		}
	},
	
	CloseShutterDlg:function()
	{
		//var g_objShutter = $("2_DIV_SHUTTER");
		if(g_objShutter.userData[1])
		{
			if(g_objShutter.userData[1].IsDialogShow())
			{
				g_objShutter.userData[1].ShowDialog(false);
			}
		}
	},
	
	SetHighFrameRateEnabled:function(bHighFrameRateEnabled)
	{
		if(bHighFrameRateEnabled != g_bHighFrameRateEnabled)
		{
			g_bHighFrameRateEnabled = bHighFrameRateEnabled;
			SQFPSCtrl.CloseShutterDlg();
			if (g_bHighFrameRateEnabled == true)
			{
				g_bHighFrameRateEnabled = 1;
			}
			else if (g_bHighFrameRateEnabled == false)
			{
				g_bHighFrameRateEnabled = 0;
			}
		}
	},
		
	SetSQHighFrameRateValue : function(HighFrameRateValue)
	{
		g_SQFPSValue = HighFrameRateValue;
		var g_objSandQ = $("CLICK_DIV_SQFPS");
		if(g_bSQPFSEnabled)
		{
			g_objSandQ.innerHTML = HighFrameRateValue + "FPS";
			g_objSandQ.userData[1].SetSQMotionText(g_SQFPSValue + "FPS"); //Set S&Q Dialog Text
		}
	},
	/**************************************************
	* 		 Sever Notify Functions
	***************************************************/		
	NotifySetSQFPSData : function (objArrItem)
	{
		j.each(objArrItem, function(key, value) {
			switch(key)
			{
				case "Camera.SlowAndQuickMotion.Enabled":
					SQFPSCtrl.SetSQPFSEnabled(objArrItem[key]);
					
					break;
				case "Camera.SlowAndQuickMotion.FrameRate":
					SQFPSCtrl.SetSQHighFrameRateValue(objArrItem[key]);
					break;
				case "Camera.SlowAndQuickMotion.HighFrameRate.Enabled":
					SQFPSCtrl.SetHighFrameRateEnabled(objArrItem[key]);
					break;
				case "P.Menu.pmw-f5x.Event.EventID":
					{
						if ((EVENT_PLAY_UPDATE == value)
						|| (EVENT_THUMBNAIL_UPDATE == value)
						|| (EVENT_RECORDE_UPDATE == value)
						|| (EVENT_VIEW_UPDATE == value)
						|| (EVENT_RETURN_SANDQMOTION_ISAVAILABLE == value)
						|| (EVENT_RETURN_SANDQMOTION_UNAVAILABLE == value)
						|| (EVENT_NOTIFY_SANDQMOTION_UNAVAILABLE == value)
						|| (EVENT_NOTIFY_SANDQMOTION_ISAVAILABLE == value)
						|| (EVENT_ABB_START == value)
						|| (EVENT_AWB_MODE_DISPLAY == value))
						{
							SQFPSCtrl.GetStatus();
						}
					}
					break;
				default:
					break;
			}
		})
	},
	
	GetStatus : function ()
	{
		var names = {"P.Control.u2x500.SlowAndQuickMotion":null};
		
		var id = client.property.GetStatus({params: names,
			onresponse: function(resp) {
				var resp_str = JSON.stringify(resp.error || resp.result);
				var respData = JSON.parse(resp_str);
				if (respData == "timeout")
				{		
				}
				else
				{
					var strSandQLocked = respData["P.Control.u2x500.SlowAndQuickMotion"];
					
					if(strSandQLocked == "Locked")
					{
						g_bSAndQGray = true;
						
						if (g_OldObject == g_objSandQ)
						{
							g_objSandQ.userData[1].ShowDialog(false);
							g_OldObject = null;
						}
					}else 
					{
						g_bSAndQGray = false;
					}
					g_objSandQ.userData[0].SetDisable(g_bSAndQGray);
				}
			},
			timeout:3000});
	}
}