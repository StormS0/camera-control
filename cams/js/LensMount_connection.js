// JavaScript Document

var g_LensMountValue = null;

var LensMountCtrl = {
	
	GetValue : function()
	{
		var names = {"Camera.Lens.Mount":null};
		var id = client.property.GetValue({params:names, onresponse : function(resp){
			var respStr = JSON.stringify(resp.error || resp.result);
			var LensMountData = JSON.parse(respStr);
			if (LensMountData == "timeout")
			{
			}
			else
			{
				g_LensMountValue = LensMountData["Camera.Lens.Mount"];
				if (g_LensMountValue == "Disconnected")
				{
					g_ObjIrisValue.innerHTML = "---";
					g_ObjFocusValue.innerHTML = "---";
					g_ObjZoomValue.innerHTML = "---";
				}
			}
		}});
	},
	
	NotifySetLensMountData : function(objArrItem)
	{
		j.each(objArrItem, function(key, value) 
		{
			switch (key)
			{
				case "Camera.Lens.Mount":
					g_LensMountValue = value;
					if (g_LensMountValue == "Disconnected")
					{
						g_ObjIrisValue.innerHTML = "---";
						g_ObjFocusValue.innerHTML = "---";
						g_ObjZoomValue.innerHTML = "---";
					}
					else
					{
						IrisCtrl.SetIrisText();
						FocusCtrl.SetFocusText();
						g_ObjZoomValue.innerHTML = g_ZoomValue;
					}
					break;
				default:
					break;
			}
		})
	}
}