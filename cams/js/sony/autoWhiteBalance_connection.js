// JavaScript Document
var g_bAWBGray = null;

var AWBCtrl = {

	GetStatus: function()
	{
		var names = {"P.Control.u2x500.AutoWhiteBalance":null};
		var id = client.property.GetStatus({params: names, onresponse: function(resp) {
			var respStatus= JSON.stringify(resp.error || resp.result);
			var statusData = JSON.parse(respStatus);
			if (statusData == "timeout")
			{
				//TODO timeout
			}
			else
			{
				var grayAWB = statusData["P.Control.u2x500.AutoWhiteBalance"];
				if (grayAWB == "Locked")
				{
					g_bAWBGray = true;
					g_objAWBDialog.userData.ShowDialog(false);
				}
				else
				{
					g_bAWBGray = false;
				}
				g_objAWBButton.userData.SetDisabled(g_bAWBGray || g_LockFlag);
			}	
		}});
	},

	NotifySetAWBData : function(objArrItem)
	{
		j.each(objArrItem, function(key, value) {
			switch(key)
			{
				case "P.Menu.pmw-f5x.Event.EventID":
					if ((EVENT_PLAY_UPDATE == value)
						|| (EVENT_THUMBNAIL_UPDATE == value)
						|| (EVENT_RECORDE_UPDATE == value)
						|| (EVENT_VIEW_UPDATE == value)
						|| (EVENT_AWB_MODE_DISPLAY == value)
						|| (EVENTKIND_SHOOTINGMODE_REFRESH == value))
						{
							AWBCtrl.GetStatus();
						}	
					break;
				default:
					break;
			}
		})
	}
}
