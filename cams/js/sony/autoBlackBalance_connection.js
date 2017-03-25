// JavaScript Document
var g_bABBGray = null;

var ABBCtrl = {

	GetStatus: function()
	{
		var names = {"P.Control.u2x500.AutoBlackBalance":null};
		var id = client.property.GetStatus({params: names, onresponse: function(resp) {
			var respStatus= JSON.stringify(resp.error || resp.result);
			var statusData = JSON.parse(respStatus);
			if (statusData == "timeout")
			{
				//TODO timeout
			}
			else
			{
				var grayABB = statusData["P.Control.u2x500.AutoBlackBalance"];
				if (grayABB == "Locked")
				{
					g_bABBGray = true;
					g_objABBDialog.userData.ShowDialog(false);
				}
				else
				{
					g_bABBGray = false;
				}
				g_objABBButton.userData.SetDisabled(g_bABBGray || g_LockFlag);
			}	
		}});
	},

	NotifySetABBData : function(objArrItem)
	{
		j.each(objArrItem, function(key, value) {
			switch(key)
			{
				case "P.Menu.pmw-f5x.Event.EventID":
					if ((EVENT_PLAY_UPDATE == value)
						|| (EVENT_THUMBNAIL_UPDATE == value)
						|| (EVENT_RECORDE_UPDATE == value)
						|| (EVENT_VIEW_UPDATE == value)
						|| (EVENT_TESTSAW_ON == value)
						|| (EVENT_COLORBAR_ON  == value)
						|| (EVENT_REFRESH_ABB_BLACKSETTING_OFF == value))
						{
							ABBCtrl.GetStatus();
						}	
					break;
				default:
					break;
			}
		})
	}
}
