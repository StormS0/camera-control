// JavaScript Document
var g_bGammaGray = false;

var g_arrSetList = {"STD1 DVW":"STD1","STD2 X4.5":"STD2","STD3 X3.5":"STD3","STD4 240M":"STD4","STD5 R709":"STD5","STD6 X5.0":"STD6","HG1 3250G36":"HG1","HG2 4600G30":"HG2","HG3 3259G40":"HG3","HG4 4609G33":"HG4","HG7 8009G40":"HG7","HG8 8009G33":"HG8","User 1":"User1","User 2":"User2","User 3":"User3","User 4":"User4","User 5":"User5","":""};

var g_arrSetSelectList = {"STD1":"STD1 DVW","STD2":"STD2 X4.5","STD3":"STD3 X3.5","STD4":"STD4 240M","STD5":"STD5 R709","STD6":"STD6 X5.0","HG1":"HG1 3250G36","HG2":"HG2 4600G30","HG3":"HG3 3259G40","HG4":"HG4 4609G33","HG7":"HG7 8009G40","HG8":"HG8 8009G33","User1":"User 1","User2":"User 2","User3":"User 3","User4":"User 4","User5":"User 5", "S-Log3":"S-Log3"};

var GammaCtrl = {
	IsDisabled : false,
	GammaType : "",
	GammaValue : "",
	
	GetValue : function()
	{
		var gammaItems = new Array();
		var names = [{"Paint.Gamma.Enabled":""},{"Paint.Gamma.Type":""},{"Paint.Gamma.Value":""}];
		var id = client.property.GetValue({params: names, onresponse: function(resp) {
			var respGamma = JSON.stringify(resp.error || resp.result);
			var gammaData = JSON.parse(respGamma);
			if (gammaData == "timeout")
			{
				//TODO timeout	
			}
			else
			{
				GammaCtrl.GammaValue = gammaData["Paint.Gamma.Value"];
				GammaCtrl.GammaType = gammaData["Paint.Gamma.Type"];
				var isEnabled = gammaData["Paint.Gamma.Enabled"];
				if ("S-LOG2" == GammaCtrl.GammaValue)
				{
					GammaCtrl.GammaValue = "S-Log2";
				}
				if ("S-LOG3" == GammaCtrl.GammaValue)
				{
					GammaCtrl.GammaValue = "S-Log3";
				}
				if(GammaCtrl.GammaValue != "Unknown")
				{
					j("#TEXT_GAMMA").text(GammaCtrl.GammaValue);
				}
				/*if (g_objGamma.userData[0])
				{
					g_objGamma.userData[0].SetDisable(g_bGammaGray);
					g_objGamma.userData[0].SetEnabled(true, g_LockFlag);	
				}*/
			}
		}});

	},
	
	GetCapabilities : function()
	{
		if ((g_objGamma.userData[1]) && (GammaCtrl.GammaValue != "Unknown"))
		{
			g_objGamma.userData[1].SetGammaType(GammaCtrl.GammaType);
			g_objGamma.userData[1].SetSelect(GammaCtrl.GammaValue);
		}
		var names = ["Paint.Gamma.Enabled","Paint.Gamma.Type","Paint.Gamma.Value"];
		var id = client.capability.GetValue({ params: names, onresponse: function(resp) {
			var gammaValue = JSON.stringify(resp.error | resp.result);	//json object to json string
			var gammaDlgData = JSON.parse(gammaValue);					//json string to json object
			var gammaDlgItems = new Array();

			for (var key in gammaDlgData)
			{
				gammaDlgItems.push(gammaDlgData[key]);
				return gammaDlgItems;
			}
		}});
		ShowMainPageDialog(g_objGamma);
	},
	

	SetValue : function(isEnabled, gammaType, SelectedValue)
	{
		var names = {"Paint.Gamma.Type":gammaType,"Paint.Gamma.Value":g_arrSetList[SelectedValue]};
		var id = client.property.SetValue({params: names, onresponse: function(resp) { }});	
	},

	NotifySetGammaData : function(objArrItem)
	{
		j.each(objArrItem, function(key, value) {
		   if ("Paint.Gamma.Enabled" == key)
		   {
				//TODO Nothing
		   } 
		   else if ("Paint.Gamma.Type" == key)
		   {
				GammaCtrl.GammaType = value;		//"STD", "HG", "S-LOG2"
		   } 
		   else if ("Paint.Gamma.Value" == key)
		   {
				if ("S-LOG3" ==value)
				{		
					value = "S-Log3";
				}
				else if ("S-LOG2" ==value)
				{		
					value = "S-Log2";
				}
				if(value != "Unknown")
				{
					j("#TEXT_GAMMA").text(value);
				}
				g_objGamma.userData[1].SetGammaType(GammaCtrl.GammaType);
				g_objGamma.userData[1].SetSelect(g_arrSetSelectList[value]);
		   }
		   else if ("P.Menu.pmw-f5x.Event.EventID" == key)
		   {
				if ((EVENT_RECORDE_UPDATE  == value)|| 
					 (EVENT_PLAY_UPDATE == value) || 
					 (EVENT_VIEW_UPDATE == value) || 
					 (EVENT_THUMBNAIL_UPDATE  == value) || 
					 (EVENT_GAMMA_UPDATE == value) ||
					 (EVENT_REFRESH_OUTPUTFORMAT_MENU  == value)|| 
					 (EVENTKIND_KNEE_RETURN_BY_GAMMA_TRIGER == value)||
					 (EVENTKIND_SHOOTINGMODE_REFRESH == value) ||
					 (EVENT_AWB_MODE_DISPLAY == value) ||
					 (EVENT_ABB_START == value))
				{
					GammaCtrl.GetStatus(); 
				}
			}	 
			else 
			{
			}
		})
	},
	
	GetGammaType : function()
	{
		return GammaCtrl.GammaType;
	},
	
	GetStatus : function()
	{
		var names = {"P.Control.u2x500.Gamma":null};			 
		var id = client.property.GetStatus({params: names, onresponse: function(resp) {
			var resp_str = JSON.stringify(resp.error || resp.result);
			var gamma_GetStatus = JSON.parse(resp_str);
			if (gamma_GetStatus == "timeout")
			{
				//TODO timeout
			}
			else
			{
				if ("Locked" == gamma_GetStatus["P.Control.u2x500.Gamma"])
				{
					g_bGammaGray = true;
					if (g_OldObject == g_objGamma)
					{
						g_objGamma.userData[1].ShowDialog(false);
						g_OldObject = null;
					}
				}
				else
				{
					g_bGammaGray = false;
				}
				g_objGamma.userData[0].SetDisable(g_bGammaGray);
			}
		}});
	}
}
