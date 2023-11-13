var utils = require("@/common/utils");
var _const = require("@/common/const");
var uikit = require("./uikit");
var apiHelper = require("./apis");
var profile = require("@/app/tools/profile");
var eventListener = require("@/app/tools/eventListener");

var dom;
var dialog;

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
					"<div class=\"wrapper-title custom-url-title\"><i class=\"icon-close\"></i></div>",
					"<iframe  src=\""+ res.data.entities[0].optionValue +"\" frameborder=\"0\"></iframe>",
					"</div>"
				].join(""))
			
	
	utils.live(".custom-url-title .icon-close","click",function(){
		// dialog && dialog.hide();
		dialog && dialog.el.remove();
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

function show(inviteId, serviceSessionId, evaluateWay){
	_init();
}

function init(){
	eventListener.add(
		_const.SYSTEM_EVENT.SESSION_CLOSED,
		function(officialAccount, inviteId, serviceSessionId){
			if(officialAccount !== profile.currentOfficialAccount) return;
			show(inviteId, serviceSessionId, "system");
		}
	);
}
