
/*Get SubBttery Properties*/

var A_status;
var B_status;
var C_status;

var An_status = "";
var Bn_status = "";
var Cp_status = "";
var Cn_status = "";

var A_Iswriteprotected;
var A_nextIswriteprotected = false;
var B_Iswriteprotected;
var B_nextIswriteprotected = false;
var C_Iswriteprotected;
var C_nextIswriteprotected = false;

var A_value;
var B_value;
var C_value = "Undefine";
var A_Isnormal = "Normal";
var B_Isnormal = "Normal";
var C_Isnormal = "Normal";
var player_arr = [];
var rec_arr = [];

var Ap_Isplayer = 2;
var Ap_Isrec = 2;
var An_Isplayer = 3;
var An_Isrec = 3;

var Bp_Isplayer = 2;
var Bp_Isrec = 2;
var Bn_Isplayer = 3;
var Bn_Isrec = 3;

var Cp_Isplayer = 2;
var Cp_Isrec = 2;
var Cn_Isplayer = 3;
var Cn_Isrec = 3;
var PlayBackInfoStatusValue = 0; // 0: OFF 1:PLAY
//set bar and circle display
function BCdiplay(player, rec, id)
{
	if(player == true && rec == true)
	{
		$(id).style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard_R_P.png)";
		$(id).style.backgroundRepeat = "no-repeat";
	}
	if(player == true && rec == false)
	{
		$(id).style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard_P.png)";
		$(id).style.backgroundRepeat = "no-repeat";
	}
	if(player == false && rec == true)
	{
		$(id).style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard_R.png)";
		$(id).style.backgroundRepeat = "no-repeat";
	}
	if(player == false && rec == false)
	{
		$(id).style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard.png)";
		$(id).style.backgroundRepeat = "no-repeat";
	}
	
	
}

function NumBCdiplay(player, rec, id)
{
	if(player == 1 && rec == 1)
	{	
		$(id).style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard_R_P.png)";
		$(id).style.backgroundRepeat = "no-repeat";
	}
	if(player == 1 && rec != 1)
	{
		$(id).style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard_P.png)";
		$(id).style.backgroundRepeat = "no-repeat";
	}
	if(player != 1 && rec == 1)
	{	
		$(id).style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard_R.png)";
		$(id).style.backgroundRepeat = "no-repeat";
	}
	if(player != 1 && rec != 1)
	{	
		$(id).style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard.png)";
		$(id).style.backgroundRepeat = "no-repeat";
	}
	
	
}


//set GetProperty Picture
function BCSet(medianum, id, p_arr, r_arr)
{	
	var Isplayer = false;
	var Isrec = false;
		
	for(i = 0; i < player_arr.length; i++)
	{
		if(p_arr[i] == medianum)
		{
			Isplayer = true;
		}
	}
	for(i = 0; i < rec_arr.length; i++)
	{
		if(r_arr[i] == medianum)
		{
			Isrec = true;	
		}
	}
	BCdiplay(Isplayer, Isrec, id);
		
}
	
function ProxySet(medianum, id)
{
	var Isrec = false;
		
	for(i = 0; i < rec_arr.length; i++)
	{
		if(rec_arr[i] == medianum)
		{
			Isrec = true;	
		}
	}
	
	if(Isrec == true)
	{
		$(id).style.backgroundImage = "url(WebCommon/images/Parts_PFXR_T_CC_Status_MediaCard_R.png)";
		$(id).style.backgroundRepeat = "no-repeat";
	}
	if(Isrec == false)
	{
		$(id).style.backgroundImage = "url(WebCommon/images/Parts_PFXR_T_CC_Status_MediaCard.png)";
		$(id).style.backgroundRepeat = "no-repeat";
	}
	
}


function GetCardValue()
{
	var names = {"Storage.Media.WriteProtected":null};	
	var id = client.property.GetValue({params: names,
		 onresponse: function(resp) {
			 
			 var respSubBttery = JSON.stringify(resp.error || resp.result);
			 var SubBtteryData = JSON.parse(respSubBttery);
			 j.each(SubBtteryData, function(key, value){
			 	if(key == "Storage.Media.WriteProtected")
				{
					j.each(value, function(subkey, subvalue){
						if(subkey == "media.1")
						{
							A_Iswriteprotected = subvalue;
						}
						if(subkey == "media.2")
						{
							B_Iswriteprotected = subvalue;
						}
						if(subkey == "media.3")
						{
							C_Iswriteprotected = subvalue;
						}
						
				})
					
				}})
			
		 	}});
	
	names = {"System.Storage":null};	
	var id = client.property.GetValue({params: names,
		 onresponse: function(resp) {
			 
			 var respSubBttery = JSON.stringify(resp.error || resp.result);
			 var SubBtteryData = JSON.parse(respSubBttery);
			 j.each(SubBtteryData, function(key, value){
			 	if(key == "System.Storage")
			 	{
			 		j.each(value, function(subkey, subvalue){
			 		if(subkey == "player")
					{
						player_arr = subvalue;
					}
					if(subkey == "recorder")
					{
						rec_arr = subvalue;
					}
	
				})
					
		        }})
			 
		 	}});
	
	names = {"Storage.Drive.Status":null};
	var id = client.property.GetValue({params: names,
		 onresponse: function(resp) {
			 
			 var respSubBttery = JSON.stringify(resp.error || resp.result);
			 var SubBtteryData = JSON.parse(respSubBttery);
			 
			 j.each(SubBtteryData, function(key, value){
					if(key == "Storage.Drive.Status")
			 		{
			 			j.each(value, function(subkey, subvalue){
			 			if(subkey == "media.1")
			 			{
							A_status = subvalue;
							//Ap_status = subvalue;
			 			}
			 			if(subkey == "media.2")
			 			{
							B_status = subvalue;
							//Bp_status = subvalue;
			 			}
						if(subkey == "media.3")
			 			{
							C_status = subvalue;
							//Cp_status = subvalue;
			 			}	
		
					})
								 
					}})

				}});


	names = {"Storage.Media.File.Status":null};
	var id = client.property.GetValue({params: names,
		 onresponse: function(resp) {
			 
			 var respSubBttery = JSON.stringify(resp.error || resp.result);
			 var SubBtteryData = JSON.parse(respSubBttery);
			 
			 j.each(SubBtteryData, function(key, value){
					if(key == "Storage.Media.File.Status")
			 		{
			 			j.each(value, function(subkey, subvalue){
			 			if(subkey == "media.1")
			 			{
							A_Isnormal = subvalue;
			 			}
			 			if(subkey == "media.2")
			 			{
							B_Isnormal = subvalue;
			 			}
						if(subkey == "media.3")
			 			{
							C_Isnormal = subvalue;
			 			}	
					
					})
					
					}})	
		       
				}});


	names = {"Storage.Media.AvailableTime":null};
	var id = client.property.GetValue({params: names,
		 onresponse: function(resp) {
			 
			 var respSubBttery = JSON.stringify(resp.error || resp.result);
			 var SubBtteryData = JSON.parse(respSubBttery);
		
	      	 j.each(SubBtteryData, function(key, value){
			
			 if(key == "Storage.Media.AvailableTime")
			 { 
			  	j.each(value, function(subkey, subvalue){
              		if(subkey == "media.1")
					{
						A_value = parseInt(subvalue / 60) + "min";	  
			    	}
			   		else if(subkey == "media.2")
			    	{
						B_value = parseInt(subvalue / 60) + "min";
			    	}
					else if(subkey == "media.3")
					{
						C_value = parseInt(subvalue / 60) + "min";
			    	}
			 	
			 })
				
			if(A_status == "Mounted")
			{
				g_objACardLable.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard_Label_A.png)";
				g_objACardLable.style.backgroundRepeat = "no-repeat";
				g_objACardStatus.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard.png)";
				g_objACardStatus.style.backgroundRepeat = "no-repeat";
				BCSet("media.1", "DIV_BC_A", player_arr, rec_arr);
				if(A_Isnormal == "Normal")
				{	
					if(A_Iswriteprotected == true)
					{
						g_objACardLastTime.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard_Lock.png)";
						g_objACardLastTime.style.backgroundRepeat = "no-repeat";
						g_objACardLastTime.innerHTML = "";			
					}
					else if(A_Iswriteprotected == false)
					{
						g_objACardLastTime.style.backgroundImage = "";
						//add play gray
						if (PlayBackInfoStatusValue == 0)
						{
							g_objACardLastTime.innerHTML = A_value;
						}
						else 
						{
							g_objACardLastTime.innerHTML = "";
						}
						
					}
				}
				else
				{
					g_objACardLastTime.style.backgroundImage = "";
					g_objACardLastTime.innerHTML = "---min";	
					
				}
			}
			if(B_status == "Mounted")
			{
				g_objBCardLable.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard_Label_B.png)";
				g_objBCardLable.style.backgroundRepeat = "no-repeat";
				g_objBCardStatus.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard.png)";
				g_objBCardStatus.style.backgroundRepeat = "no-repeat";
				BCSet("media.2", "DIV_BC_B", player_arr, rec_arr);
				if(B_Isnormal == "Normal")
				{
					if(B_Iswriteprotected == true)
					{
						g_objBCardLastTime.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard_Lock.png)";
						g_objBCardLastTime.style.backgroundRepeat = "no-repeat";
						g_objBCardLastTime.innerHTML = "";			
					}
					else if(B_Iswriteprotected == false)
					{
						g_objBCardLastTime.style.backgroundImage = "";
						
						if (PlayBackInfoStatusValue == 0)
						{
							g_objBCardLastTime.innerHTML = B_value;
						}
						else
						{
							g_objBCardLastTime.innerHTML = "";
						}
					}
				}
				else
				{
					g_objBCardLastTime.style.backgroundImage = "";
					g_objBCardLastTime.innerHTML = "---min";	
				}
			}
			if(C_status == "Mounted")
			{	
				g_objCCardLable.style.backgroundImage = "url(WebCommon/images/Parts_PFXR_T_CC_Status_MediaCard_Label_Proxy.png)";
				g_objCCardLable.style.backgroundRepeat = "no-repeat";
				g_objCCardStatus.style.backgroundImage = "url(WebCommon/images/Parts_PFXR_T_CC_Status_MediaCard.png)";
				g_objCCardStatus.style.backgroundRepeat = "no-repeat";
				ProxySet("media.3", "DIV_BC_C");
				if(C_Isnormal == "Normal")
				{
					if(C_Iswriteprotected == true)
					{
						g_objCCardLastTime.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard_Lock.png)";
						g_objCCardLastTime.style.backgroundRepeat = "no-repeat";
						g_objCCardLastTime.innerHTML = "";			
					}
					else if(C_Iswriteprotected == false)
					{
						g_objCCardLastTime.style.backgroundImage = "";
						if(C_value == "Undefine")
						{
							g_objCCardLastTime.innerHTML = "";
						}
						else
						{
							g_objCCardLastTime.innerHTML = C_value;
						}
					}
				}
				else
				{
					g_objCCardLastTime.style.backgroundImage = "";
					g_objCCardLastTime.innerHTML = "---min";	
				}
			}
			
			if(A_status == "None")
			{
				g_objACardLable.style.backgroundImage = "";
				g_objACardLastTime.innerHTML = "";
				g_objACardStatus.style.backgroundImage = "";
				g_objACardLastTime.style.backgroundImage = "";
			}
			if(B_status == "None")
			{
				g_objBCardLable.style.backgroundImage = "";
				g_objBCardLastTime.innerHTML = "";
				g_objBCardStatus.style.backgroundImage = "";
				g_objBCardLastTime.style.backgroundImage = "";
			}
			if(C_status == "None")
			{
				g_objCCardLable.style.backgroundImage = "";
				g_objCCardLastTime.innerHTML = "";
				g_objCCardStatus.style.backgroundImage = "";
				g_objCCardLastTime.style.backgroundImage = "";
			}
		
		
			}});
					
		}});
	
		
				
}

/*Notify method*/

function SetCardNotifyData(objArrItems)
{

	 var respSubBttery = JSON.stringify(objArrItems);
	 var SubBtteryData = JSON.parse(respSubBttery);
	 
	  j.each(SubBtteryData, function(key, value){
									
		if(key == "Storage.Media.WriteProtected")
		{
			j.each(value, function(subkey, subvalue){
				if(subkey == "media.1")
				{
					A_Iswriteprotected = subvalue;
				}
				if(subkey == "media.2")
				{
					B_Iswriteprotected = subvalue;
				}
				if(subkey == "media.3")
				{
					C_Iswriteprotected = subvalue;
					
				}
	
		})
			
	}})


	j.each(SubBtteryData, function(key, value){
									
		if(key == "Storage.Media.File.Status")
		{	
			j.each(value, function(subkey, subvalue){
			 	if(subkey == "media.1")
			 	{
					A_Isnormal = subvalue;
			 	}
			 	if(subkey == "media.2")
			 	{
					B_Isnormal = subvalue;
			 	}
				if(subkey == "media.3")
			 	{
					C_Isnormal = subvalue;
			 	}
	
		})	

	}})
	
	 
	 j.each(SubBtteryData, function(key, value){
									
		if(key == "System.Storage")
		{
			j.each(value, function(subkey, subvalue){
			if(subkey == "player")
			{
				player_arr = subvalue;
				
			}
			if(subkey == "recorder")
			{
				rec_arr = subvalue;
				
			}
	
		})
	
	}})
	
	
	 j.each(SubBtteryData, function(key, value){
									
		if(key == "Storage.Drive.Status")
		{
			j.each(value, function(subkey, subvalue){
			if(subkey == "media.1")
			{
				A_status = subvalue;
			}
			if(subkey == "media.2")
			{
				B_status = subvalue;
			}
			if(subkey == "media.3")
			{
				Cp_status = subvalue;
			}
		
		})
	 
	}})	       


	 j.each(SubBtteryData, function(key, value){
	 if(key == "Storage.Media.AvailableTime")
	 { 
		j.each(value, function(subkey, subvalue){
			if(subkey == "media.1")
			{
				A_value = parseInt(subvalue / 60) + "min";
			}
			else if(subkey == "media.2")
			{
				B_value = parseInt(subvalue / 60) + "min";
			}
			else if(subkey == "media.3")
			{
				C_value = parseInt(subvalue / 60) + "min";
			}
		
	 	})
		
	 }});

	if(A_status == "Mounted")
	{		
		Ap_Isplayer = 2;
		for(i = 0; i < player_arr.length; i++)
		{
			if(player_arr[i] == "media.1")
			{
				Ap_Isplayer = 1;
			}
		}
	
		Ap_Isrec = 2;
		for(i = 0; i < rec_arr.length; i++)
		{
			if(rec_arr[i] == "media.1")
			{	
				Ap_Isrec = 1;	
			}
		}
	
		
		if(Ap_Isplayer != An_Isplayer || Ap_Isrec !=  An_Isrec)
		{	
			NumBCdiplay(Ap_Isplayer, Ap_Isrec,"DIV_BC_A");
			An_Isplayer = Ap_Isplayer;
			An_Isrec = Ap_Isrec;
		}
	
		if(A_status != An_status)
		{	
			g_objACardLable.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard_Label_A.png)";
			g_objACardLable.style.backgroundRepeat = "no-repeat";
		}
		An_status = A_status;
	
		if(A_Isnormal == "Normal")
		{	
			if(A_Iswriteprotected == true)
			{
				if(false == A_nextIswriteprotected)
				{
					g_objACardLastTime.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard_Lock.png)";
					g_objACardLastTime.style.backgroundRepeat = "no-repeat";
					g_objACardLastTime.innerHTML = "";	
					A_nextIswriteprotected = true;
				}
			}
			else if(A_Iswriteprotected == false)
			{ 	
				g_objACardLastTime.style.backgroundImage = "";
				if (PlayBackInfoStatusValue == 0)
				{
					g_objACardLastTime.innerHTML = A_value;
				}
				else
				{
					g_objACardLastTime.innerHTML = "";
				}
				A_nextIswriteprotected = false;
			}
		}
		else
		{	
			g_objACardLastTime.style.backgroundImage = "";
			g_objACardLastTime.innerHTML = "---min";	
		}
	}
	
	if(B_status == "Mounted")
	{		
		Bp_Isplayer = 2;
		for(i = 0; i < player_arr.length; i++)
		{
			if(player_arr[i] == "media.2")
			{
				Bp_Isplayer = 1;
			}
			
		}
		Bp_Isrec = 2;
		for(i = 0; i < rec_arr.length; i++)
		{
			if(rec_arr[i] == "media.2")
			{
				Bp_Isrec = 1;	
			}		
		}
		
		if(Bp_Isplayer != Bn_Isplayer || Bp_Isrec !=  Bn_Isrec)
		{	
			NumBCdiplay(Bp_Isplayer, Bp_Isrec, "DIV_BC_B");
			Bn_Isplayer = Bp_Isplayer;
			Bn_Isrec = Bp_Isrec;
		}
	
		if(B_status != Bn_status)
		{	
			g_objBCardLable.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard_Label_B.png)";
			g_objBCardLable.style.backgroundRepeat = "no-repeat";
		}
		Bn_status = B_status;
	
		if(B_Isnormal == "Normal")
		{	
			if(B_Iswriteprotected == true)
			{
				if(B_nextIswriteprotected == false)
				{	
					g_objBCardLastTime.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard_Lock.png)";
					g_objBCardLastTime.style.backgroundRepeat = "no-repeat";
					g_objBCardLastTime.innerHTML = "";		
				}
				B_nextIswriteprotected = true;
			}
			else if(B_Iswriteprotected == false)
			{ 	
				g_objBCardLastTime.style.backgroundImage = "";
				if (PlayBackInfoStatusValue == 0)
				{
					g_objBCardLastTime.innerHTML = B_value;
				}
				else
				{
					g_objBCardLastTime.innerHTML = "";
				}
				B_nextIswriteprotected = false;
			}
		}
		else
		{
			g_objBCardLastTime.style.backgroundImage = "";
			g_objBCardLastTime.innerHTML = "---min";	
			
		}
	}
	
	if(Cp_status == "Mounted")
	{		
		//undo repeat
		Cp_Isrec = 2;	
		
		for(i = 0; i < rec_arr.length; i++)
		{
			if(rec_arr[i] == "media.3")
			{	
				Cp_Isrec = 1;	
			}
		}
		
		if(Cp_Isrec != Cn_Isrec)
		{	
			ProxySet("media.3", "DIV_BC_C");
			Cn_Isrec = Cp_Isrec;
		}
		
		if(Cp_status != Cn_status)
		{	
			g_objCCardLable.style.backgroundImage = "url(WebCommon/images/Parts_PFXR_T_CC_Status_MediaCard_Label_Proxy.png)";
			g_objCCardLable.style.backgroundRepeat = "no-repeat";
		}
		Cn_status = Cp_status;
	
	
		if(C_Isnormal == "Normal")
		{	
			if(C_Iswriteprotected == true)
			{
				if(C_nextIswriteprotected == false)
				{	
					g_objCCardLastTime.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_MediaCard_Lock.png)";
					g_objCCardLastTime.style.backgroundRepeat = "no-repeat";
					g_objCCardLastTime.innerHTML = "";		
				}
				C_nextIswriteprotected = true;
			}
			else if(C_Iswriteprotected == false)
			{
				g_objCCardLastTime.style.backgroundImage = "";
				if(C_value == "Undefine")
				{
					g_objCCardLastTime.innerHTML = "";
				}
				else
				{
					g_objCCardLastTime.innerHTML = C_value;
				}
				C_nextIswriteprotected = false;
			}	
			
		}
		else
		{
			g_objCCardLastTime.style.backgroundImage = "";
			g_objCCardLastTime.innerHTML = "---min";	
			
		}
	}
		
	if(A_status == "None")
	{
		g_objACardLable.style.backgroundImage = "";
		g_objACardLastTime.innerHTML = "";
		g_objACardStatus.style.backgroundImage = "";
		g_objACardLastTime.style.backgroundImage = "";
		Ap_Isplayer = 2;
		Ap_Isrec = 2;
		An_Isplayer = 3;
		An_Isrec = 3;
		A_status = "";
		An_status = "";
	}
	if(B_status == "None")
	{
		g_objBCardLable.style.backgroundImage = "";
		g_objBCardLastTime.innerHTML = "";
		g_objBCardStatus.style.backgroundImage = "";
		g_objBCardLastTime.style.backgroundImage = "";
		Bp_Isplayer = 2;
		Bp_Isrec = 2;
		Bn_Isplayer = 3;
		Bn_Isrec = 3;
		B_status = "";
		Bn_status = "";
	}
	if(Cp_status == "None")
	{
		g_objCCardLable.style.backgroundImage = "";
		g_objCCardLastTime.innerHTML = "";
		g_objCCardStatus.style.backgroundImage = "";
		g_objCCardLastTime.style.backgroundImage = "";
		Cp_Isplayer = 2;
		Cp_Isrec = 2;
		Cn_Isplayer = 3;
		Cn_Isrec = 3;
		C_status = "";
		Cp_status = "";
		Cn_status = "";
	}
		
}
