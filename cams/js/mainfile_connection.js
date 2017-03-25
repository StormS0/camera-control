// JavaScript Document
/****************************************************
*	Set File value form sovona by bi.wb
*****************************************************/

var g_FormatWidth = 1024;
var g_FormatHeight = 2496;
var g_FormatEncoding = "XAVC";
var g_FrameRate;
var g_FrameRateunits;
var g_Subsampling = "";
var g_BitRate = "";
var g_AspectRatioHeight = "";
var g_AspectRatioWidth = "";

function GetMainFileValue()
{
	var names = {"P.Clip.Mediabox.Video.Format.AspectRatio.Height":null,
				"P.Clip.Mediabox.Video.Format.AspectRatio.Width":null,
				"P.Clip.Mediabox.Video.Format.BitRate.Value":null,
				"P.Clip.Mediabox.Video.Format.Chroma.Subsampling":null,
				"P.Clip.Mediabox.Video.Format.Encoding":null,
				"P.Clip.Mediabox.Video.Format.FrameRate":null,
				"P.Clip.Mediabox.Video.Format.Height":null,
				"P.Clip.Mediabox.Video.Format.Scanning.Format":null,
				"P.Clip.Mediabox.Video.Format.Width":null};
	
	var id = client.property.GetValue({params: names,
		 onresponse: function(resp) {
		
		var respMainFile = JSON.stringify(resp.error || resp.result);
		var MainFileData = JSON.parse(respMainFile);	
		g_AspectRatioHeight = MainFileData["P.Clip.Mediabox.Video.Format.AspectRatio.Height"];
		g_AspectRatioWidth = MainFileData["P.Clip.Mediabox.Video.Format.AspectRatio.Width"];	
		g_BitRate = MainFileData["P.Clip.Mediabox.Video.Format.BitRate.Value"]; 
		g_Subsampling = MainFileData["P.Clip.Mediabox.Video.Format.Chroma.Subsampling"]; 
		g_FormatEncoding = MainFileData["P.Clip.Mediabox.Video.Format.Encoding"];
		g_FrameRate = MainFileData["P.Clip.Mediabox.Video.Format.FrameRate"];
		g_FormatHeight = MainFileData["P.Clip.Mediabox.Video.Format.Height"];
		var value = MainFileData["P.Clip.Mediabox.Video.Format.Scanning.Format"];
		g_FormatWidth = MainFileData["P.Clip.Mediabox.Video.Format.Width"];
		
		if(value == "Progressive")
		{
			g_FrameRateunits = "P";
		}
		if(value == "Interleave")
		{
			g_FrameRateunits = "i";
		}	
		g_objFrameRate.innerHTML = g_FrameRate + g_FrameRateunits;
		if (g_FormatWidth == 0 && g_FormatHeight == 0)
		{
			g_objPictureSize.innerHTML = "";
		}
		else
		{
			g_objPictureSize.innerHTML = g_FormatWidth + " x " + g_FormatHeight;
		}
		
		switch(g_FormatEncoding)
		{
			case "XAVC":
				g_objRecFormat.innerHTML = g_FormatEncoding + "-I";
				break;
			case "XAVCLong":
				if (50 == g_BitRate) {
					g_objRecFormat.innerHTML = "XAVC-L50";
				} else if (35 == g_BitRate) {
					g_objRecFormat.innerHTML = "XAVC-L35";
				}else if (25 == g_BitRate) {
					g_objRecFormat.innerHTML = "XAVC-L25";
				} else
				{
					g_objRecFormat.innerHTML = "XAVC-L";
				}
				break;
			case "MPEG2":
				if("4:2:2" == g_Subsampling)
				{
					g_objRecFormat.innerHTML = "HD422 50";	
				}else if("4:2:0" == g_Subsampling)
				{
					if (35 == g_BitRate)
					{
						g_objRecFormat.innerHTML = "HD420 HQ";	
					}
				}
				break;
			case "DVCAM":
				if ((9 == g_AspectRatioHeight)&& (16 == g_AspectRatioWidth)) {
            		g_objRecFormat.innerHTML = "DVCAM SQ";	
				} else {
					g_objRecFormat.innerHTML = "DVCAM EC";
				}
				break;
			case "AVCHD":
				g_objRecFormat.innerHTML = "AVCHD";
				break;
			case "DNxHD":
				if (6 == g_BitRate)
				{
					g_objRecFormat.innerHTML = "DNxHD 220x";
				}
				else
				{
					g_objRecFormat.innerHTML = "DNxHD 145";
				}
				break;
			case "ProRes":
				if (97 == g_BitRate)
				{
					g_objRecFormat.innerHTML = "ProRes HQ";
				}
				else if (98 == g_BitRate)
				{
					g_objRecFormat.innerHTML = "ProRes 422";
				}
				break;
			default:
				g_objRecFormat.innerHTML = "";	
				break;
			
		}					  
	}});
	

}


/*Notify method*/
function MainFileNotifyData(objArrItems)
{
	j.each(objArrItems, function(key, value)
	{
		switch(key)
		{
			case "P.Clip.Mediabox.Video.Format.AspectRatio.Height":
				g_AspectRatioHeight = value;
				break;
			case "P.Clip.Mediabox.Video.Format.AspectRatio.Width":
				g_AspectRatioWidth = value;
				break;
			case "P.Clip.Mediabox.Video.Format.BitRate.Value":
				g_BitRate = value;
				break;
			case "P.Clip.Mediabox.Video.Format.Chroma.Subsampling":
				g_Subsampling = value;
				break;
			case "P.Clip.Mediabox.Video.Format.Encoding":
				g_FormatEncoding = value;
				break;
			case "P.Clip.Mediabox.Video.Format.FrameRate":
				g_FrameRate = value;
				break;
			case "P.Clip.Mediabox.Video.Format.Height":
				g_FormatHeight = value;
				break;
			case "P.Clip.Mediabox.Video.Format.Scanning.Format":
				if(value == "Progressive")
				{
					g_FrameRateunits = "P";
				}
				if(value == "Interleave")
				{
					g_FrameRateunits = "i";
				}
				break;
			case "P.Clip.Mediabox.Video.Format.Width":
				g_FormatWidth = value;
				break;
			default:
				break;
		}
	})
	g_objFrameRate.innerHTML = g_FrameRate + g_FrameRateunits;
	if (g_FormatWidth == 0 && g_FormatHeight == 0)
	{
		g_objPictureSize.innerHTML = "";
	}
	else
	{
		g_objPictureSize.innerHTML = g_FormatWidth + " x " + g_FormatHeight;
	}
	
	switch(g_FormatEncoding)
	{
		case "XAVC":
			g_objRecFormat.innerHTML = g_FormatEncoding + "-I";
			break;
		case "XAVCLong":
			if (50 == g_BitRate) {
				g_objRecFormat.innerHTML = "XAVC-L50";
			} else if (35 == g_BitRate) {
				g_objRecFormat.innerHTML = "XAVC-L35";
			}else if (25 == g_BitRate) {
				g_objRecFormat.innerHTML = "XAVC-L25";
			} else
			{
				g_objRecFormat.innerHTML = "XAVC-L";
			}
			break;
		case "MPEG2":
			if("4:2:2" == g_Subsampling)
			{
				g_objRecFormat.innerHTML = "HD422 50";	
			}else if("4:2:0" == g_Subsampling)
			{
				if (35 == g_BitRate)
				{
					g_objRecFormat.innerHTML = "HD420 HQ";	
				}
			}
			break;
		case "DVCAM":
			if ((9 == g_AspectRatioHeight)&& (16 == g_AspectRatioWidth)) {
				g_objRecFormat.innerHTML = "DVCAM SQ";	
			} else {
				g_objRecFormat.innerHTML = "DVCAM EC";
			}
			break;
		case "AVCHD":
			g_objRecFormat.innerHTML = "AVCHD";
			break;
		case "DNxHD":
			if (6 == g_BitRate)
			{
				g_objRecFormat.innerHTML = "DNxHD 220x";
			}
			else
			{
				g_objRecFormat.innerHTML = "DNxHD 145";
			}
			break;
		case "ProRes":
			if (97 == g_BitRate)
			{
				g_objRecFormat.innerHTML = "ProRes HQ";
			}
			else if (98 == g_BitRate)
			{
				g_objRecFormat.innerHTML = "ProRes 422";
			}
			break;			
		default:
			g_objRecFormat.innerHTML = "";
			break;
		
	}	
	
}


