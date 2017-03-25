// JavaScript Document

function ClickCtrl(objSrc, objCallback)
{
	this.Parent = GetParent(objSrc);
	this.AttachSrc = objSrc;
	this.Width = parseInt(objSrc.style.width);
	this.CallbackFunc = objCallback;
	this.RootURL = GetRootPath();
	this.Type = "CLICK";
	
	var m_objSelf = null;
	
	this.Initialize = function()
	{
		if (!m_objSelf)
		{
			m_objSelf = this;
			AddEvent(this.AttachSrc, "click", this.CallbackBtnClick);
			AddEvent(this.AttachSrc, "mouseout", this.CallbackBtnMouseOut);
			AddEvent(this.AttachSrc, "mousedown", this.CallbackBtnMouseDown);
			AddEvent(this.AttachSrc, "mouseup", this.CallbackBtnMouseUp);
			AddEvent(this.AttachSrc, "touchstart", this.CallbackBtnTouchStart);	
			AddEvent(this.AttachSrc, "touchend", this.CallbackBtnTouchEnd);
			AddEvent(this.AttachSrc, "touchcancel", this.CallbackBtnTouchCancel);
		}
	};

	
	this.CallbackBtnMouseOut = function(objEvent)
	{
		var objSrc = GetEventSource(objEvent);
		
		if ("" == objSrc.id)
		{
			objSrc = GetParent(objSrc);
		}
		objSrc.style.color = "rgb(255,170,0)";
		if (objSrc.className == "DIV_ASSIGN_BTN_VALUE")
		{
			GetParent(objSrc).style.backgroundImage  = "URL(WebCommon/images/Parts_CR_T_CC_Assign_Base_Normal.png)";
		}
		else
		{
			objSrc.style.backgroundImage  = "URL(WebCommon/images/Parts_CR_T_CC_Assign_Base_Normal.png)";
		}
		
		//objSrc.style.backgroundImage  = "URL(WebCommon/images/Parts_CR_T_CC_Assign_Base_Normal.png)";
	};
	
	this.CallbackBtnMouseDown = function(objEvent)
	{
		var objSrc = GetEventSource(objEvent);
		
		if ("" == objSrc.id)
		{
			objSrc = GetParent(objSrc);
		}
		objSrc.style.color = "rgb(0,0,0)";
		if (objSrc.className == "DIV_ASSIGN_BTN_VALUE")
		{
			GetParent(objSrc).style.backgroundImage  = "URL(WebCommon/images/Parts_CR_T_CC_Assign_Base_Pressed.png)";
		}
		else
		{
			objSrc.style.backgroundImage  = "URL(WebCommon/images/Parts_CR_T_CC_Assign_Base_Pressed.png)";
		}
		//objSrc.style.backgroundImage  = "URL(WebCommon/images/Parts_CR_T_CC_Assign_Base_Pressed.png)";
	};
	
	this.CallbackBtnMouseUp = function(objEvent)
	{
		var objSrc = GetEventSource(objEvent);
		
		if ("" == objSrc.id)
		{
			objSrc = GetParent(objSrc);
		}
		objSrc.style.color = "rgb(255,170,0)";
		if (objSrc.className == "DIV_ASSIGN_BTN_VALUE")
		{
			GetParent(objSrc).style.backgroundImage  = "URL(WebCommon/images/Parts_CR_T_CC_Assign_Base_Normal.png)";
		}
		else
		{
			objSrc.style.backgroundImage  = "URL(WebCommon/images/Parts_CR_T_CC_Assign_Base_Normal.png)";
		}
	};
	
	this.CallbackBtnTouchStart = function(objEvent)
	{
		var objSrc = GetEventSource(objEvent);
		objEvent.preventDefault();
		
		if ("" == objSrc.id)
		{
			objSrc = GetParent(objSrc);
		}
		objSrc.style.color = "rgb(0,0,0)";
		if (objSrc.className == "DIV_ASSIGN_BTN_VALUE")
		{
			GetParent(objSrc).style.backgroundImage  = "URL(WebCommon/images/Parts_CR_T_CC_Assign_Base_Pressed.png)";
		}
		else
		{
			objSrc.style.backgroundImage  = "URL(WebCommon/images/Parts_CR_T_CC_Assign_Base_Pressed.png)";
		}
	};
	
	this.CallbackBtnTouchEnd = function(objEvent)
	{
		var objSrc = GetEventSource(objEvent);
		
		if ("" == objSrc.id)
		{
			objSrc = GetParent(objSrc);
		}
		objSrc.style.color = "rgb(255,170,0)";
		if (objSrc.className == "DIV_ASSIGN_BTN_VALUE")
		{
			GetParent(objSrc).style.backgroundImage  = "URL(WebCommon/images/Parts_CR_T_CC_Assign_Base_Normal.png)";
		}
		else
		{
			objSrc.style.backgroundImage  = "URL(WebCommon/images/Parts_CR_T_CC_Assign_Base_Normal.png)";
		}
		
		m_objSelf.CallbackFunc(m_objSelf.AttachSrc);
	};
	
	this.CallbackBtnTouchCancel = function(objEvent)
	{
		var objSrc = GetEventSource(objEvent);
		
		if ("" == objSrc.id)
		{
			objSrc = GetParent(objSrc);
		}
		objSrc.style.color = "rgb(255,170,0)";
		if (objSrc.className == "DIV_ASSIGN_BTN_VALUE")
		{
			GetParent(objSrc).style.backgroundImage  = "URL(WebCommon/images/Parts_CR_T_CC_Assign_Base_Normal.png)";
		}
		else
		{
			objSrc.style.backgroundImage  = "URL(WebCommon/images/Parts_CR_T_CC_Assign_Base_Normal.png)";
		}
	};
	
	this.CallbackBtnClick = function(objEvent)
	{
		var objSrc = GetEventSource(objEvent);
		
		if ("" == objSrc.id)
		{
			objSrc = GetParent(objSrc);
		}
		
//		if (m_objSelf.CallbackFunc)
//		{
			m_objSelf.CallbackFunc(m_objSelf.AttachSrc);
//		}
	};
	
	this.SetDisable = function(isGray)
	{
		if (g_LockFlag)
		{
			m_objSelf.AttachSrc.style.color = "rgb(230, 230, 230)";
			RemoveEvent(this.AttachSrc, "click", this.CallbackBtnClick);
			RemoveEvent(this.AttachSrc, "mouseout", this.CallbackBtnMouseOut);
			RemoveEvent(this.AttachSrc, "mousedown", this.CallbackBtnMouseDown);
			RemoveEvent(this.AttachSrc, "mouseup", this.CallbackBtnMouseUp);
			RemoveEvent(this.AttachSrc, "touchstart", this.CallbackBtnTouchStart);	
			RemoveEvent(this.AttachSrc, "touchend", this.CallbackBtnTouchEnd);
			RemoveEvent(this.AttachSrc, "touchcancel", this.CallbackBtnTouchCancel);
			
			AddEvent(this.AttachSrc, "touchstart", this.CallBackTouchEmptyEvent);
			AddEvent(this.AttachSrc, "touchend", this.CallBackTouchEmptyEvent);
			if (isGray)
			{
				
				this.AttachSrc.style.opacity = 0.2;
			}
			else
			{
				this.AttachSrc.style.opacity = 1;
			}
		}
		else
		{
			if (isGray)
			{
				m_objSelf.AttachSrc.style.color = "rgb(250, 170, 0)";
				RemoveEvent(this.AttachSrc, "click", this.CallbackBtnClick);
				RemoveEvent(this.AttachSrc, "mouseout", this.CallbackBtnMouseOut);
				RemoveEvent(this.AttachSrc, "mousedown", this.CallbackBtnMouseDown);
				RemoveEvent(this.AttachSrc, "mouseup", this.CallbackBtnMouseUp);
				RemoveEvent(this.AttachSrc, "touchstart", this.CallbackBtnTouchStart);	
				RemoveEvent(this.AttachSrc, "touchend", this.CallbackBtnTouchEnd);
				RemoveEvent(this.AttachSrc, "touchcancel", this.CallbackBtnTouchCancel);
				
				AddEvent(this.AttachSrc, "touchstart", this.CallBackTouchEmptyEvent);
				AddEvent(this.AttachSrc, "touchend", this.CallBackTouchEmptyEvent);
				this.AttachSrc.style.opacity = 0.2;
				
			}
			else
			{
				m_objSelf.AttachSrc.style.color = "rgb(250, 170, 0)";
				AddEvent(this.AttachSrc, "click", this.CallbackBtnClick);
				AddEvent(this.AttachSrc, "mouseout", this.CallbackBtnMouseOut);
				AddEvent(this.AttachSrc, "mousedown", this.CallbackBtnMouseDown);
				AddEvent(this.AttachSrc, "mouseup", this.CallbackBtnMouseUp);	
				AddEvent(this.AttachSrc, "touchstart", this.CallbackBtnTouchStart);	
				AddEvent(this.AttachSrc, "touchend", this.CallbackBtnTouchEnd);
				AddEvent(this.AttachSrc, "touchcancel", this.CallbackBtnTouchCancel);
				
				RemoveEvent(this.AttachSrc, "touchstart", this.CallBackTouchEmptyEvent);
				RemoveEvent(this.AttachSrc, "touchend", this.CallBackTouchEmptyEvent);
				this.AttachSrc.style.opacity = 1;
			}
		}
	};

	this.CallBackTouchEmptyEvent = function (objEvent)
	{
		objEvent.preventDefault();
	};
	
	this.Initialize();
}
