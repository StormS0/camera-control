var MARK_DIV="div";var MARK_SPAN="span";var ATTRIBUTE_ABSOLUTE="absolute";var ATTRIBUTE_POINTER="pointer";var EVENT_CLICK="click";var EVENT_MOUSEOVER="mouseover";var EVENT_MOUSEOUT= "mouseout";var EVENT_MOUSEDOWN="mousedown";var EVENT_MOUSEUP="mouseup";
//for this.Initialize(); 
function setStyle(obDefinite, strPositionStyle, iTop, iLeft, iWidth, iHeight, strBackgroundImage){obDefinite.style.position = strPositionStyle;obDefinite.style.top = iTop + "px";obDefinite.style.left = iLeft + "px";obDefinite.style.width = iWidth + "px";obDefinite.style.height = iHeight + "px";obDefinite.style.backgroundImage = strBackgroundImage;}function setURL(strPictureName) {return "url(WebCommon/images/" + strPictureName + ")";}


/* ********eventID*******/

var EVENTKIND_COMMON_REFRESH_MENU = 65536;
var EVENT_PLAY_UPDATE = 65537;
var EVENT_THUMBNAIL_UPDATE = 65540;
var EVENT_RECORDE_UPDATE = 65539;
var EVENT_VIEW_UPDATE = 65538;
var EVENTKIND_SHOOTINGMODE_REFRESH = 5111811;

//shutter
var AUTOSHUTTER_GRAYOUT_SHUTTERSPEED = 8585218;
var SANDQ_GRAYOUT_SLOWSHUTTER = 8585219;
var RPN_GRAYOUT_SHUTTER = 8585220;
var ABB_GRAYOUT_SHUTTER = 8585221;

//Gamma
var EVENT_GAMMA_UPDATE = 3407872;
var EVENTKIND_KNEE_RETURN_BY_GAMMA_TRIGER = 1835019;
var EVENT_REFRESH_OUTPUTFORMAT_MENU = 3538949;

//SandQMotion
var EVENT_RETURN_SANDQMOTION_ISAVAILABLE = 786434;
var EVENT_RETURN_SANDQMOTION_UNAVAILABLE = 786435;
var EVENT_NOTIFY_SANDQMOTION_UNAVAILABLE = 786436;
var EVENT_NOTIFY_SANDQMOTION_ISAVAILABLE = 786437;
var EVENT_SANDQMOTION_RESULT_SETTING_TRUE = 786432;
var EVENTKIND_SETGREY_RETURNPAGE_IMAGEINVERTSION = 5505024;

//AutoWhite:
var EVENT_AWB_MODE_DISPLAY = 3276800;

//AutoIris:
var EVENT_IRISAUTOMODE_NOTIFY_DISPLAY = 5242881;
var EVENTKIND_SETGREY_RETURNPAGE_IMAGEINVERTSION = 5505024;

//AutoShutter£º
var EVENTKIND_REFRESH_EE_AUTO_SHUTTER = 8454144;

//AGC:
var EVENT_GAIN_AGC_MODE = 5570566;

//Iris:
var EVENT_IRISPOSITION_NOTIFY_DISPLAY = 5242880;

//ATW
var EVENT_ATW_HOLD_DISPLAY = 3276807;

//focus
var EVENTKIND_ADJUSTFOCUS_FOCUSMODE_UPDATE = 2555908

//Gain
var EVENT_REFRESH_PRESETGAIN_PAGE = 5636096;

//ABB
var EVENT_MENU_REFRESH_RECORD = 3670018;
var EVENT_COLORBAR_ON = 2424832;
var EVENTKIND_SKINDETAIL = 96;
var EVENT_TESTSAW_ON = 2359296;
var EVENT_REFRESH_ABB_BLACKSETTING_OFF = 7208962;

//700P
var EVENT_700P_CONNECTION_STATUS_REFRESH_WIFI = 7208962;

//Lens Mount
var EVENT_ATTACHLENS_NOTIFY_LENSEXTENDER_UPDATE = 5177347;

var EVENT_ABB_START = 6619136;