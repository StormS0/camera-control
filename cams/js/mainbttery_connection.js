// JavaScript Document
/****************************************************
*	Set Main Battery form sovona by bi.wb
*****************************************************/
var MainBtteryType;
var MainBtteryMvalue;
var MainBtteryVvalue;
var preMainBtteryPvalue;
var nextMainBtteryPvalue = -100;

function plusone(value)
{
	var pre = ChangeTwoDecimal_F(value);
	var next = parseInt(pre * 10 + 0.5);
	var final = Change1Decimal(Math.round(next) / 10);
	return final;
}

/*************** Get MainBttery Properties **************/
function SetBatteryPicture(value)
{
	if(value > 0 && value <= 10)
	{
		g_objBattery.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_Battery_0.png)";
		g_objBattery.style.backgroundRepeat = "no-repeat";
	}
	if(value > 10 && value <= 30)
	{
		g_objBattery.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_Battery_1.png)";
		g_objBattery.style.backgroundRepeat = "no-repeat";
	}
	if(value > 30 && value <= 50)
	{
		g_objBattery.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_Battery_2.png)";
		g_objBattery.style.backgroundRepeat = "no-repeat";
	}
	if(value > 50 && value <= 70)
	{
		g_objBattery.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_Battery_3.png)";
		g_objBattery.style.backgroundRepeat = "no-repeat";
	}
	if(value > 70 && value <= 90)
	{
		g_objBattery.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_Battery_4.png)";
		g_objBattery.style.backgroundRepeat = "no-repeat";
	}
	if(value > 90 && value <= 100)
	{
		g_objBattery.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_Battery_5.png)";
		g_objBattery.style.backgroundRepeat = "no-repeat";
	}
}

function GetMainBtteryValue()
{
	var names = {"System.Battery.Active.Type":null,
				"System.Battery.Active.Remain.Percentage":null,
				"System.Battery.Active.Remain.Minute":null,
				"System.Battery.Active.Remain.Voltage":null};
	var id = client.property.GetValue({params: names, onresponse: function(resp) {
																		   
		var respMainBttery = JSON.stringify(resp.error || resp.result);
		var MainBtteryData = JSON.parse(respMainBttery);
	
		MainBtteryType = MainBtteryData["System.Battery.Active.Type"];
		preMainBtteryPvalue = MainBtteryData["System.Battery.Active.Remain.Percentage"];
		MainBtteryMvalue = MainBtteryData["System.Battery.Active.Remain.Minute"];
		MainBtteryVvalue = MainBtteryData["System.Battery.Active.Remain.Voltage"];

		if(MainBtteryVvalue != -1)
		{
			g_objBatteryTime.innerHTML = plusone(MainBtteryVvalue) + "V";
			if(MainBtteryType == "Battery")
			{	
				g_objBattery.style.backgroundImage = "";
				g_objBattery.innerHTML = "Batt";
			}
			if(MainBtteryType == "DC")
			{
				g_objBattery.style.backgroundImage = "";
				g_objBattery.innerHTML = "DC IN";
			}
			
		}
		
		if(MainBtteryVvalue == -1)
		{
			if(MainBtteryMvalue != -1)
			{
				g_objBattery.innerHTML = "";
				g_objBatteryTime.innerHTML = MainBtteryMvalue + "min";
				SetBatteryPicture(preMainBtteryPvalue);
			}
			if(MainBtteryMvalue == -1)
			{
				if(preMainBtteryPvalue != -1)
				{	
					g_objBattery.innerHTML = "";
					g_objBatteryTime.innerHTML = preMainBtteryPvalue; + "%";
					SetBatteryPicture(preMainBtteryPvalue);
				}
				else
				{	
					g_objBattery.innerHTML = "";
					g_objBattery.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_Battery_0.png)";
					g_objBattery.style.backgroundRepeat = "no-repeat";
					g_objBatteryTime.innerHTML = "---min";
				}
			}
		}
	}});
}

/******************* Notify method ***********************/
function MainBtteryNotifyData(objArrItems)
{	
	j.each(objArrItems, function(key, value){
		if(key == "System.Battery.Active.Type")
		{
			MainBtteryType = value;
		}
		
		if(key == "System.Battery.Active.Remain.Percentage")
		{
			preMainBtteryPvalue = value;
		}
		if(key == "System.Battery.Active.Remain.Minute")
		{
			MainBtteryMvalue = value;
		}
		if(key == "System.Battery.Active.Remain.Voltage")
		{
			MainBtteryVvalue = value;
		}
	});

	if(MainBtteryVvalue != -1)
	{
		g_objBatteryTime.innerHTML = plusone(MainBtteryVvalue) + "V";
		if(MainBtteryType == "Battery")
		{
			g_objBattery.style.backgroundImage = "";
			g_objBattery.innerHTML = "Batt";
		}
		if(MainBtteryType == "DC")
		{
			g_objBattery.style.backgroundImage = "";
			g_objBattery.innerHTML = "DC IN";
		}
	}
	if(MainBtteryVvalue == -1)
	{
		if(MainBtteryMvalue != -1)
		{
			g_objBattery.innerHTML = "";
			g_objBatteryTime.innerHTML = MainBtteryMvalue + "min";
			if(preMainBtteryPvalue != nextMainBtteryPvalue)
			{
				SetBatteryPicture(preMainBtteryPvalue);
				nextMainBtteryPvalue = preMainBtteryPvalue;
			}
		}
		if(MainBtteryMvalue == -1)
		{
			if(preMainBtteryPvalue != -1)
			{
				g_objBattery.innerHTML = "";
				g_objBatteryTime.innerHTML = preMainBtteryPvalue; + "%";
				if(preMainBtteryPvalue != nextMainBtteryPvalue)
				{
					SetBatteryPicture(preMainBtteryPvalue);
					nextMainBtteryPvalue = preMainBtteryPvalue;
				}
			}
			else
			{	
				g_objBattery.innerHTML = "";
				g_objBattery.style.backgroundImage = "url(WebCommon/images/Parts_CR_T_CC_Status_Battery_0.png)";
				g_objBattery.style.backgroundRepeat = "no-repeat";
				g_objBatteryTime.innerHTML = "---min";
				nextMainBtteryPvalue = -100;
			}
		}
	}
}
