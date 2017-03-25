
var ShootModeValue = 1;

function NotifyMessagePopupProperties(objArrItems)
{
	j.each(objArrItems, function(key, value) {
		if ("P.Control.Common.AllItems" == key)
		{
			MenuGrayStatus = value;
			if (MenuGrayStatus == "Locked")
			{
			   if (g_OldObject)
			   {
					g_OldObject.userData[1].ShowDialog(false);
			   }
			   if (GotoCursor  == false)
			   {
					objUpperMask.style.display = "block";
					objMiddleMask.style.display = "block";
					objLowerMask.style.display = "block";
			   }
			   if (GotoCursor  == true)
			   {
					objUpperMask.style.display = "block";
					objMiddleMask.style.display = "block";
					objLowerMask.style.display = "none";
					g_objMaskClickDlg.userData.ShowDialog(false);   
			   }
			}
			if (MenuGrayStatus == "Unlocked")
			{
				objABMask.style.display = "none";
				objUpperMask.style.display = "none";
				objMiddleMask.style.display = "none";
				objLowerMask.style.display = "none";
				g_objMaskClickDlg.userData.ShowDialog(false);
			}
	}});
}

function GetMessagePopupStatus()
{	
	var names = {"P.Control.Common.AllItems":null};
	var id = client.property.GetStatus({params: names, onresponse: function(resp) {
		var respMessagePopup = JSON.stringify(resp.error || resp.result);
		var MessagePopupData = JSON.parse(respMessagePopup);
		MenuGrayStatus =  MessagePopupData["P.Control.Common.AllItems"];
		
		if (MenuGrayStatus == "Locked")
		{
		   if (GotoCursor  == false)
		   {
				objUpperMask.style.display = "block";
				objMiddleMask.style.display = "block";
				objLowerMask.style.display = "block";
		   }
		   if (GotoCursor  == true)
		   {
				objUpperMask.style.display = "block";
				objMiddleMask.style.display = "block";
				objLowerMask.style.display = "none";
				g_objMaskClickDlg.userData.ShowDialog(false);
		   }
		}
		if (MenuGrayStatus == "Unlocked")
		{
			objABMask.style.display = "none";
			objUpperMask.style.display = "none";
			objMiddleMask.style.display = "none";
			objLowerMask.style.display = "none";
			g_objMaskClickDlg.userData.ShowDialog(false);
		}	 		
	}});
}


function SetShootModeNotifyData(objArrItems)
{
	j.each(objArrItems, function(key, value) {
		if ("Camera.ShootingMode" == key)
		{
			if ("CineEI" == value)
			{
				ShootModeValue = 0;
			}
			else 
			{
				ShootModeValue = 1;
			}
			GrayedInfoShootingModeFunction();
		}
		else
		{
			//TODO nothing
		}
	})
}


function GetShootModeValue()
{
	var names = {"Camera.ShootingMode":""};
	var id = client.property.GetValue({params: names, onresponse: function(resp) {
		var respGray = JSON.stringify(resp.error || resp.result);
		var SubGrayData = JSON.parse(respGray);
		j.each(SubGrayData, function(key, value) {
			if("Camera.ShootingMode" == key)
			{
				if("CineEI" == value)
				{
					ShootModeValue = 0;
				}
				else 
				{
					ShootModeValue = 1;
				}
				GrayedInfoShootingModeFunction();
			}
			else 
			{
				//TODO nothing
			}
		});
	}});
}