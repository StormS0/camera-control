// JavaScript Document

var IrisValue = 5.6;
var g_bIrisGray = false;
var IsIrisClose = false;
var IrisValue1 = 0;
var Irispre1 = 0;
var Irisnext1 = -1;
var Irispre2 = 0;
var Irisnext2 = -1;
var g_IrisEnabled = true;

var IrisCtrl = {
	

	GetValue : function()
	{
		var  assignValueItems = new Array();
		var names = {"Camera.Iris.Value":null,"Camera.Iris.Close.Enabled":null, "Camera.Iris.Value.Enabled":null};
		var Value_Array = [0.7,0.9,1,1.1,1.4,1.6,2,2.2,2.8,3.2,4,4.5,5.6,6.3,8,9,11,12.5,16,18,22,25,32,35.4];
		//var Iris_Array = [122,134,148,162,180,198,216,234,252,270,288,306,324,342,360,378,396,414,432,450,486,522,574];
		var Iris_Array = [122,125,126,127,131,134,139,142,149,155,165,171,186,195,217,230,256,276,321,347,399,439,530,574];
		
		var id = client.property.GetValue({params: names,
		onresponse: function(resp) {
			
			var respIris = JSON.stringify(resp.error || resp.result);
			var IrisData = JSON.parse(respIris);
			
			
			if (IrisData == "timeout")
			{
					
			}
			else
			{
				IrisValue1 = IrisData["Camera.Iris.Value"];
				IsIrisClose = IrisData["Camera.Iris.Close.Enabled"];
				g_IrisEnabled = IrisData["Camera.Iris.Value.Enabled"];
				if (g_IrisEnabled == false)
				{
					g_ObjIrisValue.innerHTML = "---";
				}
				if (g_LensMountValue != "Disconnected" && g_IrisEnabled == true)
				{
					if (IsIrisClose == "true" || IsIrisClose == true)
					{	
						g_ObjIrisValue.innerHTML = "Close";
					}
					else
					{	
						if ( IrisValue1 == 2 || IrisValue1 == 4 || IrisValue1 == 8 || IrisValue1 == 11 || IrisValue1 == 10 )
						{
							g_ObjIrisValue.innerHTML = "F" + IrisValue1;
						}
						else
						{
							g_ObjIrisValue.innerHTML = "F" + Irisplusone(IrisValue1);
						}
					}

					for (var i = 0; i < Value_Array.length; i++)
					{
						if (Irisplusone(IrisValue1) == Value_Array[i])
						{
							IrisReturn = Iris_Array[i];
						}
					}
				
					j("#IRIS_SLIDER_HANDLE").css({left: IrisReturn, backgroundImage:"URL(WebCommon/images/Parts_CR_T_CC_Rec_Slider_Knob_Iris.png)"});
				}
			
			}
	
		}});

	},
	
	SetValue : function()
	{
		var names = {"Camera.Iris.Value":linear.todouble(IrisValue),"Camera.Iris.Close.Enabled":IsIrisClose};
		var id = client.property.SetValue({params: names,
		onresponse: function(resp) {
											
		}})
	},
	GetStatus : function ()
	{
		var names = {"P.Control.u2x500.Iris":null};
		
		var id = client.property.GetStatus({params: names,
			onresponse: function(resp) {
				var resp_str = JSON.stringify(resp.error || resp.result);
				var respData = JSON.parse(resp_str);
				if (respData == "timeout")
				{		
				}
				else
				{
					var strIrisLocked = respData["P.Control.u2x500.Iris"];
					
					if(strIrisLocked == "Locked")
					{
						g_bIrisGray = true;	
					}
					else 
					{
						g_bIrisGray = false;
					}
					IrisGrayFunction(g_bIrisGray, g_LockFlag);
				}
			},
			timeout:3000});
	},

	NotifySetIrisData : function(objArrItem)
	{
		j.each(objArrItem, function(key, value) 
		{
			if ("Camera.Iris.Close.Enabled" == key)
			{
				IsIrisClose = value;
			}
			
			if ("Camera.Iris.Value" == key)
			{
				IrisValue1 = value;
				if (g_LensMountValue != "Disconnected" && g_IrisEnabled == true)
				{
					if (IsIrisClose == "true" || IsIrisClose == true)
					{
						g_ObjIrisValue.innerHTML = "Close";
					}
					else
					{
						if ( IrisValue1 == 2 || IrisValue1 == 4 || IrisValue1 == 8 || IrisValue1 == 11 || IrisValue1 == 10 )
						{
							g_ObjIrisValue.innerHTML = "F" + IrisValue1;
						}
						else
						{
							g_ObjIrisValue.innerHTML = "F" + Irisplusone(IrisValue1);
						}
					}
				}
			}
			if ("Camera.Iris.Value.Enabled" == key)
			{
				g_IrisEnabled = value;
				if (!g_IrisEnabled)
				{
					g_ObjIrisValue.innerHTML = "---";
				}
			}
			
			if ("P.Menu.pmw-f5x.Event.EventID" == key)
			{
				if (value == EVENT_THUMBNAIL_UPDATE || 
					value == EVENT_PLAY_UPDATE || 
					value == EVENT_RECORDE_UPDATE || 
					value == EVENT_VIEW_UPDATE || 
					value == EVENT_IRISPOSITION_NOTIFY_DISPLAY ||
					value == EVENT_700P_CONNECTION_STATUS_REFRESH_WIFI ||
					value == EVENT_IRISAUTOMODE_NOTIFY_DISPLAY ||
					value == EVENT_ATTACHLENS_NOTIFY_LENSEXTENDER_UPDATE)
				{
					IrisCtrl.GetStatus();
				}
			}
			
		})
	},
	
	SetIrisText : function()
	{
		if (IsIrisClose == "true" || IsIrisClose == true)
		{
			g_ObjIrisValue.innerHTML = "Close";
		}
		else
		{
			if ( IrisValue1 == 2 || IrisValue1 == 4 || IrisValue1 == 8 || IrisValue1 == 11 || IrisValue1 == 10 )
			{
				g_ObjIrisValue.innerHTML = "F" + IrisValue1;
			}
			else
			{
				g_ObjIrisValue.innerHTML = "F" + Irisplusone(IrisValue1);
			}
		}
	}
}
