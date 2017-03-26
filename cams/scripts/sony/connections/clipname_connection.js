// JavaScript Document
/****************************************************
*	Set File value form sovona by bi.wb
*****************************************************/
function SetMainFileInfo()
{
	var funFileArea = $("DIV_MAINFILE_INFO");
	
	var FunRightFileValue = funFileArea.childNodes;
	
	<!--childNodes-->
	for(i = 0; i < FunRightFileValue.length; i++)
	{
	switch(parseInt(FunRightFileValue[i].id)) {
		case 1:
		FunRightFileValue[i].innerHTML = "W000W000_000000WW";
		break;
		case 2:
	    FunRightFileValue[i].innerHTML = 23.98 + "P";
		break;
		case 3:
		FunRightFileValue[i].innerHTML = 4096 + "x" + 2160;
		break;
		case 4:
		FunRightFileValue[i].innerHTML = "XAVC";
		break;
		default:
		break;
		}	
	}
}

var ClipNameCtrl = {
	
	GetValue : function ()
	{
		var names = {"P.Clip.Mediabox.ClipName":null};
		var id = client.property.GetValue({params: names, onresponse: function(resp) {
			var respStr = JSON.stringify(resp.error || resp.result);
			var StrData = JSON.parse(respStr);
			if (StrData == "timeout")
			{	
			}
			else
			{
				var strClipName = StrData["P.Clip.Mediabox.ClipName"];
				var tmp_strValue = "";
				var tmp_strLength = GetStrOffsetWidth($("11_FILE_INFO_VALUE"), 202, strClipName);
				if (tmp_strLength == 0)
				{
					return;
				}
				tmp_strValue = strClipName.substr(0, tmp_strLength);
				$("1_FILE_INFO_VALUE").innerHTML = tmp_strValue.replace(/ /g,"&nbsp;");
			}
		}});
	},
	
	NotifySetClipNameData : function (objArrItem)
	{
		j.each(objArrItem, function(key, value) {
			switch (key)
			{
				case "P.Clip.Mediabox.ClipName":
					var tmp_strValue = "";
					var tmp_strLength = GetStrOffsetWidth($("11_FILE_INFO_VALUE"), 202, value);
					if (tmp_strLength == 0)
					{
						return;
					}
					tmp_strValue = value.substr(0, tmp_strLength);
					$("1_FILE_INFO_VALUE").innerHTML = tmp_strValue.replace(/ /g,"&nbsp;");
					break;
				default:
					break;
			}
		})
	}
}


