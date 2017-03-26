/*Get Audio Properties*/
var ClipTotle = 100;
var ClipPosition = 10;

function GetClipProperties()
{	
	var names = {"P.Clip.Mediabox.TotalClips":null};
	
	var id = client.property.GetValue({params: names, onresponse: function(resp) {
		var respClip = JSON.stringify(resp.error || resp.result);
		var ClipData = JSON.parse(respClip);
		
		for(var key in ClipData)
		{	
			 if(key == "P.Clip.Mediabox.TotalClips")
			 {	
				ClipTotle = ClipData[key];
				if(ClipPosition == 0)
				{	
					g_objPlayClip.innerHTML =  "";	
				}	
				else
				{	
					g_objPlayClip.innerHTML = appendZero3(ClipPosition) + "/" + appendZero3(ClipTotle);
				}
			 }
			 if(key == "P.Clip.Mediabox.ClipPosition")
			 {	
				ClipPosition = ClipData[key];
			 }			 
		}
	}})
}

/********************  *Notify method ***********************/
function SetClipNotifyData(objArrItems)
{
	for(var key in objArrItems)
	{	 
		 if(key == "P.Clip.Mediabox.TotalClips")
		 {
			ClipTotle = objArrItems[key];
			
			if(ClipPosition == 0)
			{	
				g_objPlayClip.innerHTML =  "";	
			}	
			else
			{	
				g_objPlayClip.innerHTML = appendZero3(ClipPosition) + "/" + appendZero3(ClipTotle);
			}
		 }
		 if(key == "P.Clip.Mediabox.ClipPosition")
		 {
			ClipPosition = objArrItems[key];
		 }
	}
}

function appendZero3(s)
{	
	var arr;
	if(isNaN(s))
	{
		return s;
	}
	else
	{
		if (parseInt(s, 10)<10 && parseInt(s, 10)>=0)
		{
			arr = "000"+s;
		}
		else if (parseInt(s, 10)<100 && parseInt(s, 10)>=10)
		{
			arr = "00"+s;
		}
		else if (parseInt(s, 10)<1000 && parseInt(s, 10)>=100)
		{
			arr = "0"+s;
		}
		else
		{
			arr = s;
		}
		return arr;
	}	
}