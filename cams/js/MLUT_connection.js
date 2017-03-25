// JavaScript Document
var  g_MlutValue = "undefined";
var  g_IsEnabled = "false";
var categoryValue = ["LUT", "Look Profile", "User3D LUT"];
var arrUserThDItemsIn = ["User 3D-1", "User 3D-2", "User 3D-3", "User 3D-4"];
var arrUserThDItemsOut = ["User3D-1", "User3D-2", "User3D-3", "User3D-4"];
var ulutMap = [["P1","709(800%)"], ["P2","HG8009G40"], ["P3","HG8009G33"], ["P4","S-Log2"], ["P5","S-Log3"], ["P6", "LC-709"], ["P7","LC-709typeA"], ["P8","SLog2-709"], ["P9","Cine+709"], ["U1","User1"], ["U2","User2"], ["U3","User3"], ["U4","User4"], ["U5","User5"], ["U6","User6"]]
var mlutCategory = null;
var m_GrayStatus = null;
var m_MLUTDialg = null;
var m_UserThDMLUT = null;
var g_bMLUTGray = false;
var g_IsMLUTClick = false;

var arrMLUTSetListItem = [["P1","P1:709(800%)"], ["P2","P2:HG8009G40"], ["P3","P3:HG8009G33"], ["P4","P4:S-Log2"], ["P5","P5:S-Log3"], ["P6", "1.LC-709"], ["P7","2.LC-709typeA"], ["P8","3.SLog2-709"], ["P9","4.Cine+709"], ["U1","U1"], ["U2","U2"], ["U3","U3"], ["U4","U4"], ["U5","U5"], ["U6","U6"]];

var MLUTCtrl = {
	IsDisabled : false,
	
	GetValue : function()
	{
		var mlutItems = new Array();
		var names = [{"Output.Video.HDMI.LUT.Enabled":""}, {"Output.Video.HDMI.LUT.Value":""}, {"Output.Video.HDMI.LUT.Mode":""}];
		var id = client.property.GetValue({params: names, onresponse: function(resp) {
			var respMlut = JSON.stringify(resp.error || resp.result);
			var mlutData = JSON.parse(respMlut);
			if (mlutData == "timeout")
			{
				//TODO	
			}
			else
			{
				var MLUTValue = mlutData["Output.Video.HDMI.LUT.Value"];
				var MLUTEnabled = mlutData["Output.Video.HDMI.LUT.Enabled"];
				var mlutMode = mlutData["Output.Video.HDMI.LUT.Mode"];
				
				var mlutRegx = /\w*[-%+()]*\s*\w*[-%+()]*\s*\w+[-%+()]*/gi;
				if ("LUT" == mlutMode)
				{					
					var mlutString = MLUTValue.match(mlutRegx);
					var mlutUserValue = MLUTCtrl.SetUlutMap(mlutString)
					if(mlutUserValue)
					{
						g_objMLUT.innerHTML = mlutUserValue;
					}
					else
					{
						g_objMLUT.innerHTML = mlutString;
					}
					g_objMLUT.userData[1].SetMlutType("LUT");
					var getValue = MLUTCtrl.GetSetMLUTDialogItem(MLUTValue);
					g_objMLUT.userData[1].SetSelect(categoryValue[0], getValue);
					g_objMLUT.userData[1].setOldValueForCancel(categoryValue[0], getValue);
				}
				else if ("Profile" == mlutMode)
				{
					var ulutString = MLUTValue.match(mlutRegx);
					var mlutUserValue = MLUTCtrl.SetUlutMap(ulutString)
					if(mlutUserValue)
					{
						g_objMLUT.innerHTML = mlutUserValue;
					}
					else
					{
						g_objMLUT.innerHTML = ulutString;
					}
					g_objMLUT.userData[1].SetMlutType("Look Profile");
					var getValue = MLUTCtrl.GetSetMLUTDialogItem(MLUTValue);
					g_objMLUT.userData[1].SetSelect(categoryValue[1], getValue);
					g_objMLUT.userData[1].setOldValueForCancel(categoryValue[1], getValue);
				}
				else if("User3D" == mlutMode)
				{
					g_objMLUT.innerHTML = MLUTValue;
					g_objMLUT.userData[1].SetMlutType("User3D LUT");
					g_objMLUT.userData[1].SetSelect(categoryValue[2], MLUTValue);
					g_objMLUT.userData[1].setOldValueForCancel(categoryValue[2], MLUTValue);
				}
				else
				{
					// Error Mode
				}
			}
		}});
	},
	
	GetCapabilities : function()
	{
		var names = ["Output.Video.HDMI.LUT.Value"];
		var id = client.capability.GetValue({ params: names, onresponse: function(resp) {
			var respData = JSON.stringify(resp.result);
			var MLUTData = JSON.parse(respData);
			if (MLUTData == "timeout")
			{
			}
			else
			{
				var arrMLUTList = MLUTData["Output.Video.HDMI.LUT.Value"];
				var arrDisableItem = new Array();
				var arrEnableItem = new Array(); 
				for (var i = 0; i < arrMLUTList.length; i++)
				{
					for (key in arrMLUTList[i])
					{
						var status = arrMLUTList[i][key];
						if ("Locked" == status)
						{
							arrDisableItem.push(i);
							if (i < 11)
							{
								g_objMLUT.userData[1].SetLUTListItemsDisable("MLUT", arrDisableItem, true);
							}
						}
						else
						{
							arrEnableItem.push(i);
							if (i < 11)
							{
								g_objMLUT.userData[1].SetLUTListItemsDisable("MLUT", arrEnableItem, false);
							}
						}
					}
				}
				
				if (arrDisableItem.length >= 4)
				{
					var grayList = [2];
					g_objMLUT.userData[1].SetCateListItemsDisable("MLUT", grayList, true);
				}
				else
				{
					var enabledList = [2];
					g_objMLUT.userData[1].SetCateListItemsDisable("MLUT", enabledList, false);
				}
				
				if (g_IsMLUTClick)
				{
					g_IsMLUTClick = false;
					ShowMainPageDialog(g_objMLUT);
				}
			}
		}});
	},
	
	SetProperties : function(Mode, SelectedValue)
	{
		var namesMode = "";
		var namesSelectedValue = "";
		if("P.Menu.pmw-f5x.Video.MonitorLUT.MLUTSelect" == Mode)
		{
			namesMode = "LUT";
			var setValue = MLUTCtrl.GetSetMLUTValue(SelectedValue);
			if (setValue)
			{
				namesSelectedValue = setValue;
			}
			else
			{
				namesSelectedValue = "";
			}
		}
		else if ("P.Menu.pmw-f5x.Video.MonitorLUT.LookProfileSelect" == Mode)
		{
			namesMode = "Profile";
			var setValue = MLUTCtrl.GetSetMLUTValue(SelectedValue);
			if (setValue)
			{
				namesSelectedValue = setValue;
			}
			else
			{
				namesSelectedValue = "";
			}
		}
		else if ("P.Menu.pmw-f5x.Video.MonitorLUT.User3DSelect" == Mode)
		{
			namesMode = "User3D";
			if (SelectedValue == null)
			{
				namesSelectedValue = "";
			}
			else
			{
				namesSelectedValue = SelectedValue;
			}
		}
		//MLUTCtrl.SetMode(namesMode);
		MLUTCtrl.SetValue(namesMode ,namesSelectedValue);
	},
	
	SetMode : function(Mode)
	{
		var names = {"Output.Video.HDMI.LUT.Mode":Mode};
		var id = client.property.SetValue({params: names, onresponse: function(resp) { }});		
	},
	
	SetValue : function(Mode ,SelectedValue)
	{
		var names = {"Output.Video.HDMI.LUT.Mode":Mode, "Output.Video.HDMI.LUT.Value":SelectedValue}
		var id = client.property.SetValue({params: names, onresponse: function(resp) { }});		
	},

	NotifySetMLUTData : function (objArrItem)
	{
		j.each(objArrItem, function(key, value) {
			switch (key)
			{
				case "Output.Video.HDMI.LUT.Enabled":
					break;
				case "Output.Video.HDMI.LUT.Value":
					MLUTCtrl.SetShowMLUTText(value);
					break;
				case "Output.Video.HDMI.LUT.Mode":
					mlutCategory = value;
					break;
				case "P.Menu.pmw-f5x.Event.EventID":
					if ((EVENTKIND_COMMON_REFRESH_MENU == value)|| (EVENTKIND_SHOOTINGMODE_REFRESH == value))
					{
						var objShutterDlg = $("TEXT_SHUTTER");
						var bIsShutterDlgShow = (objShutterDlg.userData[1] && objShutterDlg.userData[1].IsDialogShow());
						if (!objShutterDlg.userData[1] || !bIsShutterDlgShow)
						{
							MLUTCtrl.GetStatus();
						}
					}
					if (EVENT_GAMMA_UPDATE == value
						|| EVENT_ABB_START == value
						|| EVENT_AWB_MODE_DISPLAY == value
						|| EVENT_THUMBNAIL_UPDATE == value
						|| EVENT_PLAY_UPDATE == value
						|| EVENT_VIEW_UPDATE == value)
					{
						MLUTCtrl.GetValue();
						MLUTCtrl.GetStatus();
					}
					break;
				default:
					break;
			}
		})
	},

	SetShowMLUTText : function(strValue)
	{
		var mlutRegx = /\w*[-%+()]*\s*\w*[-%+()]*\s*\w+[-%+()]*/gi;
		var subValue = "";
		switch (mlutCategory)
		{
			case "LUT":
				subValue = strValue.match(mlutRegx);
				var mlutUserValue = MLUTCtrl.SetUlutMap(subValue)
				if(mlutUserValue)
				{
					g_objMLUT.innerHTML = mlutUserValue;
				}
				else
				{
					g_objMLUT.innerHTML = subValue;
				}
				var getValue = MLUTCtrl.GetSetMLUTDialogItem(strValue);
				$("TEXT_MLUT").userData[1].SetSelect(categoryValue[0], getValue);
				break;
			case "Profile":
				subValue = strValue.match(mlutRegx);
				var getValue = MLUTCtrl.GetSetMLUTDialogItem(strValue);
				var mlutValue = MLUTCtrl.SetUlutMap(subValue)
				if(mlutValue)
				{
					g_objMLUT.innerHTML = mlutValue;
				}
				else
				{
					g_objMLUT.innerHTML = subValue;
				}
				$("TEXT_MLUT").userData[1].SetSelect(categoryValue[1], getValue);
				break;
			case "User3D":
				g_objMLUT.innerHTML = strValue;
				$("TEXT_MLUT").userData[1].SetSelect(categoryValue[2], strValue);
				break;
			default:
				break;
		}
	},
	
	GetStatus : function()
	{
		var names = {"P.Control.pmw-f5x.MLUT":null};	
		var id = client.property.GetStatus({params: names, onresponse: function(resp) {
			var resp_str = JSON.stringify(resp.error || resp.result);
			var mlut_GetStatus = JSON.parse(resp_str);
			if (mlut_GetStatus == "timeout")
			{
				//TODO	
			}
			else
			{
				m_GrayStatus = mlut_GetStatus["P.Control.pmw-f5x.MLUT"];
				if ("Locked" == mlut_GetStatus["P.Control.pmw-f5x.MLUT"])
				{
					g_bMLUTGray = true;
					if (g_OldObject == g_objMLUT)
					{
						g_objMLUT.userData[1].ShowDialog(false);
						g_OldObject = null;
					}
				}
				else
				{
					g_bMLUTGray = false;
				}
				g_objMLUT.userData[0].SetDisable(g_bMLUTGray);
			}
		}});
	},
	
	ChangeUserThDValueIn : function(value)
	{
		for(var i = 0; i < arrUserThDItemsIn.length; i++)
		{
			if(value == arrUserThDItemsIn[i])
			{
				return arrUserThDItemsOut[i];
			}
		}
	},
	
		
	SetUlutMap : function(value)
	{
		for(i =0; i<ulutMap.length; ++i)
		{
			if(value == ulutMap[i][0])
			{
				return ulutMap[i][1];
			}
		}
	},
	
	GetSetMLUTDialogItem : function(value)
	{
		for(i =0; i< arrMLUTSetListItem.length; ++i)
		{
			if(value == arrMLUTSetListItem[i][0])
			{
				return arrMLUTSetListItem[i][1];
			}
		}
	},
	
	GetSetMLUTValue : function(value)
	{
		for(i =0; i< arrMLUTSetListItem.length; ++i)
		{
			if(value == arrMLUTSetListItem[i][1])
			{
				return arrMLUTSetListItem[i][0];
			}
		}
	}
}
