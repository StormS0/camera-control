// JavaScript Document

function RecButtonCtrl(objSrc, objCallback, buttonpress, buttonnormal)
{
	this.Parent = GetParent(objSrc);
	this.AttachSrc = objSrc;
	this.Width = 100;//parseInt(objSrc.style.width);
	this.CallbackFunc = objCallback;
	this.RootURL = GetRootPath();
	this.Type = "BUTTON";
	this.Status = false;
	this.LockStatus = false;
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
			this.AttachSrc.LockStatus = false;
		}
	};
	
	this.CallbackBtnMouseOut = function(objEvent)
	{
		var objSrc = GetEventSource(objEvent);
		
		if ("" == objSrc.id)
		{
			objSrc = GetParent(objSrc);
		}
		
		objSrc.style.backgroundImage = buttonnormal;
		
	};
	
	this.CallbackBtnMouseDown = function(objEvent)
	{
		var objSrc = GetEventSource(objEvent);
		if ("" == objSrc.id)
		{
			objSrc = GetParent(objSrc);
		}
		
		objSrc.style.backgroundImage = buttonpress;
	
	};
	
	this.CallbackBtnMouseUp = function(objEvent)
	{
		var objSrc = GetEventSource(objEvent);
		
		if ("" == objSrc.id)
		{
			objSrc = GetParent(objSrc);
		}
		
		objSrc.style.backgroundImage = buttonnormal;
		
	};

	this.CallbackBtnTouchStart = function(objEvent)
	{
		var objSrc = GetEventSource(objEvent);
		if ("" == objSrc.id)
		{
			objSrc = GetParent(objSrc);
		}
		objEvent.preventDefault();
		
		objSrc.style.backgroundImage = buttonpress;
		
	};
	
	this.CallbackBtnTouchEnd = function(objEvent)
	{
		var objSrc = GetEventSource(objEvent);
		
		if ("" == objSrc.id)
		{
			objSrc = GetParent(objSrc);
		}
		
		objSrc.style.backgroundImage = buttonnormal;
		if (m_objSelf.CallbackFunc)
		{
			m_objSelf.CallbackFunc(m_objSelf.AttachSrc);
		}
	};

	this.CallbackBtnTouchCancel = function(objEvent)
	{
		var objSrc = GetEventSource(objEvent);
		
		if ("" == objSrc.id)
		{
			objSrc = GetParent(objSrc);
		}
		
		objSrc.style.backgroundImage = buttonnormal;
		
	};

	this.CallbackBtnClick = function(objEvent)
	{
		var objSrc = GetEventSource(objEvent);

		if ("" == objSrc.id)
		{
			objSrc = GetParent(objSrc);
		}
		
		if (m_objSelf.CallbackFunc)
		{
			m_objSelf.CallbackFunc(m_objSelf.AttachSrc);
		}
	};
	
	/*this.SetStatus = function(lightStatus)
	{
		this.AttachSrc.Status = lightStatus;
		m_objSelf.Status = lightStatus;
		if (this.AttachSrc.Status)
		{
			this.AttachSrc.style.backgroundImage = buttonnormal;
		}
		else
		{
			this.AttachSrc.style.backgroundImage = "URL(WebCommon/images/Parts_CR_T_CC_Rec_Button_Rec_InActive_Normal.png)";
		}
	};*/
	
	this.SetDisabled = function(bDisabled)
	{
		this.AttachSrc.LockStatus = bDisabled;
		if (bDisabled)
		{
			RemoveEvent(this.AttachSrc, "click", this.CallbackBtnClick);
			RemoveEvent(this.AttachSrc, "mouseover", this.CallbackBtnMouseOver);
			RemoveEvent(this.AttachSrc, "mouseout", this.CallbackBtnMouseOut);
			RemoveEvent(this.AttachSrc, "mousedown", this.CallbackBtnMouseDown);
			RemoveEvent(this.AttachSrc, "mouseup", this.CallbackBtnMouseUp);
			RemoveEvent(this.AttachSrc, "touchstart", this.CallbackBtnTouchStart);	
			RemoveEvent(this.AttachSrc, "touchend", this.CallbackBtnTouchEnd);
			RemoveEvent(this.AttachSrc, "touchcancel", this.CallbackBtnTouchCancel);
			AddEvent(this.AttachSrc, "touchstart", this.CallbackTempTouchEvent);	
			AddEvent(this.AttachSrc, "touchend", this.CallbackTempTouchEvent);	
			AddEvent(this.AttachSrc, "touchcancel", this.CallbackTempTouchEvent);
			
			this.AttachSrc.style.backgroundImage = buttonnormal;
			j(this.AttachSrc).css({opacity: "0.2"});
		
		}
		else
		{
			AddEvent(this.AttachSrc, "click", this.CallbackBtnClick);
			AddEvent(this.AttachSrc, "mouseover", this.CallbackBtnMouseOver);
			AddEvent(this.AttachSrc, "mouseout", this.CallbackBtnMouseOut);
			AddEvent(this.AttachSrc, "mousedown", this.CallbackBtnMouseDown);
			AddEvent(this.AttachSrc, "mouseup", this.CallbackBtnMouseUp);	
			AddEvent(this.AttachSrc, "touchstart", this.CallbackBtnTouchStart);	
			AddEvent(this.AttachSrc, "touchend", this.CallbackBtnTouchEnd);
			AddEvent(this.AttachSrc, "touchcancel", this.CallbackBtnTouchCancel);
			RemoveEvent(this.AttachSrc, "touchstart", this.CallbackTempTouchEvent);	
			RemoveEvent(this.AttachSrc, "touchend", this.CallbackTempTouchEvent);	
			RemoveEvent(this.AttachSrc, "touchcancel", this.CallbackTempTouchEvent);
			
			this.AttachSrc.style.backgroundImage = buttonnormal;
			j(this.AttachSrc).css({opacity: "1"});
			
		}
	}
	
	this.CallbackTempTouchEvent = function (objEvent)
	{
		objEvent.preventDefault();
	};
	
	this.Initialize();
}