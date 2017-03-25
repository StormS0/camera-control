// JavaScript Document
/****************************************************
*	Set Audio form sovona by bi.wb
*****************************************************/


var ch1prelevel = 0;
var ch1nextlevel = -1;
var ch2prelevel = 0;
var ch2nextlevel = -1;
var ch3prelevel = 0;
var ch3nextlevel = -1;
var ch4prelevel = 0;
var ch4nextlevel = -1;

var Audio1Gray1 = 0;
var Audio1Gray2 = -1;
var Audio2Gray1 = 0;
var Audio2Gray2 = -1;
var Audio3Gray1 = 0;
var Audio3Gray2 = -1;
var Audio4Gray1 = 0;
var Audio4Gray2 = -1;

/*Get Audio Properties*/

function GetAudioValue()
{
	var names = {"Output.Audio.Level":null};
	var id = client.property.GetValue({params: names,
	onresponse: function(resp) {
			 
		var respAudio = JSON.stringify(resp.error || resp.result);
		var AudioData = JSON.parse(respAudio);
			 
	      	j.each(AudioData, function(key, value)
			 {
				 if(key == "Output.Audio.Level")
				 {
					j.each(AudioData[key], function(subkey, subvalue)
					{
						if(subkey == "ch.1")
						{
							ch1prelevel = subvalue;
							
						}
						else if(subkey == "ch.2")
						{
							ch2prelevel = subvalue;
							
						}
						else if (subkey == "ch.3")
						{
							ch3prelevel = subvalue;
						}
						else if (subkey == "ch.4")
						{
							ch4prelevel = subvalue;
						}
						
						if (g_bSQPFSEnabled == true)
						{	
							if (PlayBackInfoStatusValue == 0)
							{
								AudioDisplay(0, 5);
								AudioDisplay(0, 9);
								AudioDisplay(0, 13);
								AudioDisplay(0, 17);
							}
							else
							{
								AudioDisplay(ch1prelevel, 5);
								AudioDisplay(ch2prelevel, 9);	
								AudioDisplay(ch3prelevel, 13);
								AudioDisplay(ch4prelevel, 17);
							}
							
						}
						else
						{
							AudioDisplay(ch1prelevel, 5);
							AudioDisplay(ch2prelevel, 9);
							AudioDisplay(ch3prelevel, 13);
							AudioDisplay(ch4prelevel, 17);
						}

					}
				)}
	})}});
}

function AudioDisplay(Audio_Value, count)
{
	if(Audio_Value == 0)
	{
		$(count + "_DIV_AUDIO_BAR").style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_Red_InActive.png)";
		$(count + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
		
		$(count + 1 + "_DIV_AUDIO_BAR").style.backgroundImage =  "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_InActive.png)";
		$(count + 1 + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
		
		$(count + 2 + "_DIV_AUDIO_BAR").style.backgroundImage =  "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_InActive.png)";
		$(count + 2 + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
		
		$(count + 3 + "_DIV_AUDIO_BAR").style.backgroundImage =  "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_InActive.png)";
		$(count + 3 + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
	}
	
	if(Audio_Value == 1)
	{
		$(count + "_DIV_AUDIO_BAR").style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_Red_InActive.png)";
		$(count + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
		
		$(count + 1 + "_DIV_AUDIO_BAR").style.backgroundImage =  "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_InActive.png)";
		$(count + 1 + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
		
		$(count + 2 + "_DIV_AUDIO_BAR").style.backgroundImage =  "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_InActive.png)";
		$(count + 2 + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
		
		$(count + 3 + "_DIV_AUDIO_BAR").style.backgroundImage =  "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_Active.png)";
		$(count + 3 + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
	}
	
	if(Audio_Value == 2)
	{
		$(count + "_DIV_AUDIO_BAR").style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_Red_InActive.png)";
		$(count + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
		
		$(count + 1 + "_DIV_AUDIO_BAR").style.backgroundImage =  "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_InActive.png)";
		$(count + 1 + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
		
		$(count + 2 + "_DIV_AUDIO_BAR").style.backgroundImage =  "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_Active.png)";
		$(count + 2 + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
		
		$(count + 3 + "_DIV_AUDIO_BAR").style.backgroundImage =  "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_Active.png)";
		$(count + 3 + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
	}
	
	if(Audio_Value == 3)
	{
		$(count + "_DIV_AUDIO_BAR").style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_Red_InActive.png)";
		$(count + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
		
		$(count + 1 + "_DIV_AUDIO_BAR").style.backgroundImage =  "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_Active.png)";
		$(count + 1 + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
		
		$(count + 2 + "_DIV_AUDIO_BAR").style.backgroundImage =  "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_Active.png)";
		$(count + 2 + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
		
		$(count + 3 + "_DIV_AUDIO_BAR").style.backgroundImage =  "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_Active.png)";
		$(count + 3 + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
	}
	
	if(Audio_Value == 4)
	{
		$(count + "_DIV_AUDIO_BAR").style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_Red_Active.png)";
		$(count + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
		
		$(count + 1 + "_DIV_AUDIO_BAR").style.backgroundImage =  "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_Active.png)";
		$(count + 1 + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
		
		$(count + 2 + "_DIV_AUDIO_BAR").style.backgroundImage =  "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_Active.png)";
		$(count + 2 + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
		
		$(count + 3 + "_DIV_AUDIO_BAR").style.backgroundImage =  "url(WebCommon/images/Parts_CR_T_CC_Status_ALM_Bar_Active.png)";
		$(count + 3 + "_DIV_AUDIO_BAR").style.backgroundRepeat = "no-repeat";
	}
	
}

/*Notify method*/
function SetAudioNotifyData(objArrItems)
{
	var respAudio = JSON.stringify(objArrItems);
	var AudioData = JSON.parse(respAudio);
	
	j.each(AudioData, function(key, value)
	{
		 if(key == "Output.Audio.Level")
		 {
			j.each(AudioData[key], function(subkey, subvalue)
			{
				if(subkey == "ch.1")
				{
					ch1prelevel = subvalue;
				}
				else if(subkey == "ch.2")
				{
					ch2prelevel = subvalue;
				}
				else if (subkey == "ch.3")
				{
					ch3prelevel = subvalue;
				}
				else if (subkey == "ch.4")
				{
					ch4prelevel = subvalue;
				}
			 })
			
			if(ch1prelevel != ch1nextlevel)
			{
				AudioDisplay(ch1prelevel, 5);
				ch1nextlevel = ch1prelevel;
			}
			
			if(ch2prelevel != ch2nextlevel)
			{
				AudioDisplay(ch2prelevel, 9);
				ch2nextlevel = ch2prelevel;
			}
			
			if(ch3prelevel != ch3nextlevel)
			{
				AudioDisplay(ch3prelevel, 13);
				ch3nextlevel = ch3prelevel;
			}
			
			if (ch4prelevel != ch4nextlevel)
			{
				AudioDisplay(ch4prelevel, 17);
				ch4nextlevel = ch4prelevel;
			}
			
		 }})
	
		
		/*Audio disable*/
		if (g_bSQPFSEnabled == true)
		{	
			if (PlayBackInfoStatusValue == 0)
			{
				if(Audio1Gray2 != Audio1Gray1)
				{
					AudioDisplay(0, 5);
					Audio1Gray2 = Audio1Gray1;
				}
				if(Audio2Gray2 != Audio2Gray1)
				{
					AudioDisplay(0, 9);
					Audio2Gray2 = Audio2Gray1;
				}
				if(Audio3Gray2 != Audio3Gray1)
				{
					AudioDisplay(0, 13);
					Audio3Gray2 = Audio3Gray1;
				}
				if(Audio4Gray2 != Audio4Gray1)
				{
					AudioDisplay(0, 17);
					Audio4Gray2 = Audio4Gray1;
				}
			}
			
			
		}
}
