var utils = require("@/common/utils");
var _const = require("@/common/const");
var uikit = require("./uikit");
var apiHelper = require("./apis");
var profile = require("@/app/tools/profile");
var eventListener = require("@/app/tools/eventListener");
var commonConfig = require("@/common/config");
var dom;
var dialog;
var dialogShow = false;

module.exports = {
	init: init,
	show: show,
};

function _init(){
	apiHelper.getSessionClosedDialog().then(function(res){
		if(res.data && res.data.entities.length >0 && res.data.entities[0].optionValue == "true"){
			apiHelper.getSessionClosedDialogUrl().then(function(res){
				dom = utils.createElementFromHTML([
					"<div class=\"wrapper\">",
					"<div class=\"custom-url-title\"><i class=\"icon-close\"></i></div>",
					"<iframe  src=\""+ res.data.entities[0].optionValue +"\" frameborder=\"0\"></iframe>",
					"</div>"
				].join(""))
			
	
	utils.live(".custom-url-title .icon-close","click",function(){
		// dialog && dialog.hide();
		dialog && dialog.el.remove();
		dialogShow = false;
	});

	if(utils.isMobile){
		dialog = uikit.createDialog({
			isFullSreen: true,
			contentDom: dom,
			className: "session-closed-dialog"
		});
	}
	else{
		dialog = uikit.createDialog({
			isFullSreen: false,
			contentDom: dom,
			className: "session-closed-dialog"
		});
	}
	
	dialog.show();

	if(!$(document.querySelector(".em-self-wrapper")).hasClass("hide")){
		dialog.el.style.cssText='left:10px;top:10px;';
		if(!utils.isMobile && $("body").hasClass("window-demo")){
			dom.querySelector(".icon-close").style.cssText='margin-right:20px;';
		}
	}
	else{
		dialog.el.style.cssText='left:0;top:0;';
	}
		})
	}
})
}

function show(){
	if(!dialogShow){//_init只执行一次，避免出现发送多次结束会话消息的情况。
		_init();
		dialogShow = true;
	}
	// _init = function(){};
}

function init(){
	eventListener.add(
		_const.SYSTEM_EVENT.SESSION_CLOSED,
		function(){
			// 满意度评价邀请为主动弹出邀请的情况时，先弹满意度。
			// config = commonConfig.getConfig();
			// if(config.ui.enquiryShowMode === "popup"){
			// 	eventListener.add(
			// 		_const.SYSTEM_EVENT.CUSTOMURL_DIALOG_SHOW,
			// 		function(){
			// 			show();
			// 		}
			// 	);
			// }
			// else{
			// 	show();
			// }

			show();
		}
	);
	eventListener.add(
		_const.SYSTEM_EVENT.SESSION_ABORTED,
		function(){
			show();
		}
	);
}
