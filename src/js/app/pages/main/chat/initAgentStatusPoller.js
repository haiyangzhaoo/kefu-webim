var _const = require("@/common/const");
var utils = require("@/common/utils");
var profile = require("@/app/tools/profile");
var eventListener = require("@/app/tools/eventListener");
var apiHelper = require("../apis");

var $agentStatusText;
var agentStateTimer = null;

module.exports = function(){
	var topBar = document.querySelector(".em-widget-header");
	$agentStatusText = topBar.querySelector(".em-header-status-text");

	// 开始轮询坐席状态
	agentStateTimer = setInterval(function(){
		var officialAccount = profile.currentOfficialAccount;
		_setAgentStatus(officialAccount);
	}, 5000);

	eventListener.add(_const.SYSTEM_EVENT.SESSION_OPENED, _setAgentStatus);
	eventListener.add(_const.SYSTEM_EVENT.SESSION_TRANSFERED, _setAgentStatus);
	eventListener.add(_const.SYSTEM_EVENT.SESSION_CLOSED, _setAgentStatus);
	eventListener.add(_const.SYSTEM_EVENT.SESSION_TRANSFERING, _setAgentStatus);
	eventListener.add(_const.SYSTEM_EVENT.SESSION_RESTORED, _setAgentStatus);
	eventListener.add(_const.SYSTEM_EVENT.OFFICIAL_ACCOUNT_SWITCHED, function(officialAccount){
		_update(officialAccount.status);
	});
	eventListener.add(_const.SYSTEM_EVENT.CLEAR_AGENTSTATE, _clearTimer);
};

function _setAgentStatus(officialAccount){
	if(
		officialAccount !== profile.currentOfficialAccount
		|| !officialAccount
		|| !profile.isChatWindowOpen
		|| utils.isBrowserMinimized()
	) return;

	var agentId = officialAccount.agentId;
	var agentType = officialAccount.agentType;
	var isSessionOpen = officialAccount.isSessionOpen;

	if(
		!profile.isAgentNicknameEnable
		|| !agentId
		|| !isSessionOpen
	){
		_update(null);
	}
	else if(agentType === _const.AGENT_ROLE.ROBOT){
		// 机器人不去轮询，显示为在线
		_update("Online");
	}
	else{
		apiHelper.getAgentStatus(agentId).then(function(status){
			officialAccount.agentState = status;
			_update(status);
		});
	}
}

function _update(status){
    var agentStatusText = _const.agentStatusText[status || "Other"];
    if (profile.isHideCustomerStatus) {
        $agentStatusText.innerText = '';
    } else {
        $agentStatusText.innerText = agentStatusText;
    }
}

function _clearTimer(){
	clearInterval(agentStateTimer);
}