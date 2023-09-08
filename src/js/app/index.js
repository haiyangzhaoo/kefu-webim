// 1. 管理布局
// 2. 管理初始化
// 3. 管理通信
// 4. 管理切换
const OpenCC = require('opencc-js');
const i18next = require("i18next");
const i18nextHttpBackend = require("i18next-http-backend");

const converter = OpenCC.Converter({ from: 'cn', to: 'hk' });
let search = window.location ? window.location.search : '';
let searchParams = {}
// 改变语言刷新本地，因此保存在本地
let localI18n = window.localStorage.getItem('i18n');
let localConfigId = window.atob(window.localStorage.getItem('configId'));
search.substr(1).split('&').forEach(function(v) {
	let [key, val] = v.split('=');
	searchParams[key] = val;
});
// 链接上语言优先级最高
let lang = searchParams.language || localI18n || 'en';
let initLang = lang.split('-')[0];
if (lang == 'zh-HK') {
	initLang = lang;
}

i18next.use(i18nextHttpBackend).init({
	lng: initLang,
	fallbackLng: false,
	keySeparator: ".",
	nsSeparator: false,
	saveMissing: true,
	// ns: ['translation'],
	// defaultNS: 'translation',
	// languages: ['zhCN', 'enUS'],
	backend: {
		loadPath: `/v1/webimplugin/settings/config/${searchParams.configId || localConfigId}/language/content?language=${initLang}`,
		addPath: null,
		parse: ret => {
			return JSON.parse(ret).entity
		}
	},
}, function(err, t) {
	console.log('1111111html', initLang, lang, err)
	window.i18nWebim = i18next;
	if (lang == 'zh-HK') {
		window.__ = function() {
			return converter(t.apply(null, arguments));
		}
	} else {
		window.__ = t;
	}

require("es6-promise").polyfill();
require("@/common/polyfill");
require("./libs/modernizr");
require("./libs/sdk/webim.config");
require("underscore");
require("jquery");
window._ = require("underscore");
var dd = require("./libs/sdk/ddsdk")
var utils = require("@/common/utils");
var chat = require("./pages/main/chat");
var body_template = require("../../template/body.html");
var main = require("./pages/main/init");
var functionView = require("./pages/q&a");
var commonConfig = require("@/common/config");
var apiHelper = require("@/app/common/apiHelper");
var _const = require("@/common/const");
var profile = require("@/app/tools/profile");
var handleConfig = commonConfig.handleConfig;
var doWechatAuth = require("@/app/common/wechat");
var getToHost = require("@/app/common/transfer");
var eventListener = require("@/app/tools/eventListener");
var fromUserClick = false;
var Tab = require("@/common/uikit/tab");
var Apis = require("./pages/main/apis");
var loading = require("./pages/main/uikit/loading");

var ISIFRAME = false; // 网页插件为true
var slideSwitch;
var slideFoldedrState = true;
var slideWidth;
var slideSwitchAndMore;
var iframeContent = [];
var commonIssueEnable;
var selfServiceEnable;
var iframeEnable;
var initIframeStateDate;
var domData = {
	contact_agent: __("common.contact_agent"),
	close: __("common.close"),
	video_ended: __("video.video_ended"),
	agent_is_typing: __("chat.agent_is_typing"),
	current_queue_number: __("chat.current_queue_number"),
	connecting: __("chat.connecting"),
	video_connecting: __("video.connecting"),
	input_placeholder: __("chat.input_placeholder"),
	emoji: __("toolbar.emoji"),
	picture: __("toolbar.picture"),
	attachment: __("toolbar.attachment"),
	ticket: __("toolbar.ticket"),
	video_invite: __("toolbar.video_invite"),
	evaluate_agent: __("toolbar.evaluate_agent"),
	transfer_to_kefu: __("toolbar.transfer_to_kefu"),
	transfer_to_ticket: __("toolbar.transfer_to_ticket"),
	abandon_queue: __("toolbar.abandon_queue"),
	press_save_img: __("common.press_save_img"),
	send_video: __("toolbar.send_video"),
	out_of_line: __("toolbar.out_of_line"),
	exit_video: __("toolbar.exit_video"),
	unavailable: __("prompt.unavailable"),
	risk_alert: __("prompt.risk_alert"),
	camera_permissions: __("common.camera_permissions"),
	allow: __("common.allow"),
	refuse: __("common.refuse"),
	accept: __("common.accept"),
	self_service: __("common.self_service"),
	min_window: __("common.min_window"),
	close_sound: __("common.close_sound"),
	screenShot: ""
};

screenShot();
var selfServiceData; // 自助服务的数据
var issueData; // 常见问题的数据
var iframeData; // 新菜单页的数据

var dingdingData;
load_html();
getToHost.send({
	event: "i18n_init_ok",
	data: true
});

if (utils.isTop) {
	commonConfig.h5_mode_init();
	initCrossOriginIframe();
	widgetBoxShow();
}
else {
	main.chat_window_mode_init();
	getToHost.listen(function (msg) {
		var event = msg.event;
		var data = msg.data;
		switch (event) {
			// 用户点击联系客服时收到
			case _const.EVENTS.SHOW:
				fromUserClick = true;
				widgetBoxShow();
				break;
			case _const.EVENTS.CLOSE:
				widgetBoxHide();
				break;
			case _const.EVENTS.INIT_CONFIG:
				getToHost.to = data.parentId;
				commonConfig.setConfig(data);
				console.log(1111111, data.language, lang, initLang)
				if (data.language !== lang) {
					window.localStorage.setItem('i18n', data.language);
					window.localStorage.setItem('configId', window.btoa(data.configId));
					i18nWebim.changeLanguage(initLang);
					window.location.reload();
				}
				initCrossOriginIframe();
				ISIFRAME = true;
				break;
			default:
				break;
		}
	}, ["down2Im"]);
}
main.init(setUserInfo);

// 监听点击咨询客服收到的通知
eventListener.add(_const.SYSTEM_EVENT.CONSULT_AGENT, function () {
	$(".em-self-wrapper").addClass("hide");
	main.initChat();
	if (utils.isMobile) {
		$(".expand").addClass("hide");
		$(".em-service-title").addClass("hide");

	}
});

function widgetBoxShow() {
	if (utils.isMobile) {
		loading.show("mobile-uni");
	}
	utils.removeClass(document.querySelector(".em-widget-box"), "hide");
	if (!$("body").hasClass("window-demo")) {
		if (utils.isMobile) {
			$(".expand").addClass("hide");
			setTimeout(function () {
				loading.hide("mobile-uni");
			}, 1000);
		}
		return false;
	}
	if (!slideSwitch) {
		$(".em-self-wrapper").addClass("hide");
		if (!$("body").hasClass("window-demo") && !utils.isMobile) {
			$(".em-widget-box").css("width", "735px");
		}
		main.initChat();
		eventListener.trigger("swiper.update");
	}

	if (utils.isMobile && !slideSwitch) {
		$(".em-self-wrapper").addClass("hide");
		main.initChat();
		setTimeout(function () {
			loading.hide("mobile-uni");
		}, 1000);
		return false;
	}
	if ((selfServiceData.length == 0 || !selfServiceEnable) && (issueData.length == 0 || !commonIssueEnable) && (iframeContent.length == 0 || !iframeEnable)) {
		if (utils.isMobile && slideSwitch) {
			$(".em-self-wrapper").addClass("hide");
			main.initChat();
			$(".expand").addClass("hide");
			setTimeout(function () {
				loading.hide("mobile-uni");
			}, 1000);
			return false;
		}
		$(".em-self-wrapper").addClass("hide");
		$(".expand").addClass("hide");
		setTimeout(function () {
			// var chatWidth = $(".em-widget-content-box").width() - slideWidth;
			var closeWidth = 0;
			var closeChat = $(".em-widget-content-box").width() - closeWidth;
			$("#em-kefu-webim-self").css("width", closeWidth + "px");
			$("#em-kefu-webim-chat").css("width", closeChat + "px");
			$("#em-kefu-webim-self").css("display", "block");
			eventListener.trigger("swiper.update");
		}, 50);
	}
	else if (slideSwitch && !utils.isMobile) {
		if (!slideSwitchAndMore) {
			return false;
		}
		// 获取坐席端设置的宽度并设置，js集成网页的时候
		apiHelper.getSidebarWidth().then(function (res) {
			var sideWidth;
			if (!res.entity) {
				sideWidth = 360;
			}
			else {
				sideWidth = res.entity.value;
			}
			var chatWidth = $(".em-widget-content-box").width() - Number(sideWidth) - 20;
			$("#em-kefu-webim-chat").css("width", chatWidth + "px");
			$("#em-kefu-webim-self").css("width", sideWidth + "px");
			setTimeout(function () {
				$("#em-kefu-webim-self").css("display", "block");
			}, 500);
			eventListener.trigger("swiper.update");
		});
	}

	// 点击接受邀请的时候也需要滚动
	var listEle = $(".em-widget-left");
	var scroBox = $(".chat-wrapper")[0];
	var top = scroBox.scrollTop;
	var divEl = $(listEle[listEle.length - 1]).find(".em-widget-msg-wrapper");
	var elHeight = $(divEl).outerHeight() - 330;
	if ($(divEl).hasClass("msgtype-skillgroupMenu") || $(divEl).hasClass("msgtype-robotList")) {
		$(scroBox).scrollTop(top - elHeight);
	}

}
function widgetBoxHide() {
	utils.addClass(document.querySelector(".em-widget-box"), "hide");
}
function setUserInfo(targetUserInfo) {
	if (targetUserInfo) {
		// 游客
		if (targetUserInfo.userName) {
			return Promise.resolve("user");
		}
		// 访客带 token，sina patch
		else if (commonConfig.getConfig().user.token) {
			return Promise.resolve("userWithToken");
		}
		return new Promise(function (resolve) {
			apiHelper.getPassword().then(function (res) {
				commonConfig.setConfig({
					user: _.extend({}, commonConfig.getConfig().user, {
						password: res.password
					}),
					userNicknameFlg: res.nicename
				});
				resolve("userWithPassword");
			}, function (err) {
				console.error("username is not exist.");
				throw err;
			});
		});
	}
	else if (
		commonConfig.getConfig().user.username
		&& (
			commonConfig.getConfig().user.password
			|| commonConfig.getConfig().user.token
		)
	) {
		if (commonConfig.getConfig().user.token) {
			return Promise.resolve("userWithNameAndToken");
		}
		return Promise.resolve("userWidthNameAndPassword");
	}
	// 检测微信网页授权
	else if (commonConfig.getConfig().wechatAuth) {
		return new Promise(function (resolve) {
			doWechatAuth(function (entity) {
				commonConfig.setConfig({
					user: _.extend({}, commonConfig.getConfig().user, {
						username: entity.userId,
						password: entity.userPassword
					})
				});
				resolve("wechatAuth");
			}, function () {
				createVisitor().then(function () {
					resolve("noWechatAuth");
				});
			});
		});
	}
	else if (commonConfig.getConfig().user.username) {
		return new Promise(function (resolve) {
			apiHelper.getPassword().then(function (res) {
				commonConfig.setConfig({
					user: _.extend({}, commonConfig.getConfig().user, {
						password: res.password
					}),
					userNicknameFlg: res.nicename
				});
				resolve("widthPassword");
			}, function () {
				if (profile.grayList.autoCreateAppointedVisitor) {
					createVisitor(commonConfig.getConfig().user.username).then(function () {
						resolve("autoCreateAppointedVisitor");
					});
				}
				else {
					createVisitor().then(function () {
						resolve("noAutoCreateAppointedVisitor");
					});
				}
			});
		});
	}
	// if(true){
	var params = parseUrlSearch(window.location.href);
	if(params.originType && (params.originType == 'dingtalk')){
		return new Promise(function (resolve) {
			if (dd.env.platform!=="notInDingTalk") {
				dd.ready(function() {
					// dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
					var apiHelper = require("@/app/common/apiHelper");
					dd.runtime.permission.requestAuthCode({
						corpId: params.corpId,
						// corpId: "ding0eb82ac70e6295d0",
						onSuccess: function(result) {
						/*{
							code: 'hYLK98jkf0m' //string authCode
						}*/
							apiHelper.getDingdingVisitor({code: result.code, tenantId: commonConfig.getConfig().tenantId}).then(function(res){
								var visitor = commonConfig.getConfig().visitor;
								visitor.userNickname = res.userNickname;
								visitor.phone = res.phone;
								visitor.companyName = res.companyName;
								visitor.email = res.email;
								createVisitor(res.username).then(function () {
									resolve("")
								});
								commonConfig.setConfig({visitor: visitor})
							})
						},
						onFail : function(err) {
							createVisitor().then(function () {
								resolve("")
							});
						}
					});
				});
			} else {
				createVisitor().then(function () {
					resolve("")
				});
			}
		});
	} else {
		return createVisitor().then(function () {
			return Promise.resolve();
		});
	}
}
function createVisitor(username) {
	return apiHelper.createVisitor(username).then(function (entity) {
		commonConfig.setConfig({
			user: _.extend({}, commonConfig.getConfig().user, {
				username: entity.userId,
				password: entity.userPassword,
				userNickname: entity.nicename
			}),
			userNicknameFlg: entity.nicename
		});
		return Promise.resolve();
	});
}

function initConfig() {
	apiHelper.getConfig(commonConfig.getConfig().configId)
	.then(function (entity) {
		entity.configJson.tenantId = entity.tenantId;
		entity.configJson.configName = entity.configName;
		handleConfig(entity.configJson);
		handleSettingIframeSize();
		initRelevanceList(entity.tenantId);
		initInvite({ themeName: entity.configJson.ui.themeName });
		if (!ISIFRAME) {
			apiHelper.getQualificationStatus(entity.tenantId).then(function (res) {
				if (res) {
					widgetBoxHide();
					var str = __("prompt.unavailable");
					document.querySelector(".auth-box-PC >div span").innerHTML = str;
					utils.removeClass(document.querySelector(".auth-box-PC"), "hide");
				}
			});
		}
	});
}

function initInvite(opt) {
	apiHelper.getInviteInfo(commonConfig.getConfig().tenantId, commonConfig.getConfig().configId)
		.then(function (res) {
			if (res.status) {
				res.themeName = opt.themeName;
				getToHost.send({
					event: _const.EVENTS.INVITATION_INIT,
					data: res
				});
			}
		});
}

function initRelevanceList(tenantId) {
	apiHelper.getConfigOption(commonConfig.getConfig().configId)
		.then(function (value) {
			commonConfig.setConfig({
				configOption: _.extend({}, commonConfig.getConfig().configOption, value)
			});
			// 获取关联信息（targetChannel）
			var relevanceList;
			var tId = tenantId || utils.query("tenantId");
			if (!ISIFRAME) {
				apiHelper.getQualificationStatus(tId).then(function (res) {
					if (res) {
						widgetBoxHide();
						var str = "";
						if (res === 1) {
							str = "未进行认证，";
						}
						else if (res === 2) {
							str = "认证未通过，";
						}
						else if (res === 3) {
							str = "认证审核中，";
						}
						if (utils.isMobile) {
							document.querySelector(".auth-box-H5 >div span.is-auth").innerHTML = str;
							utils.removeClass(document.querySelector(".auth-box-H5"), "hide");
						}
						else {
							str += "认证未通过前，咨询通道暂不可用";
							document.querySelector(".auth-box-PC >div span").innerHTML = str;
							utils.removeClass(document.querySelector(".auth-box-PC"), "hide");
						}
					}
					getRelevanceList();
				});
			}
			else {
				getRelevanceList();
			}


			function getRelevanceList() {
				// TODO 接口替换为 配置文件
				if (commonConfig.getConfig().configOption && commonConfig.getConfig().configOption.option) {
					var slideOption = commonConfig.getConfig().configOption.option;
					// for(var i=0;i<slideOption.length;i++){
					// 	if(slideOption[i]  && slideOption[i].name === "sidebar-width"){
					// 		slideWidth = slideOption[i].value ? slideOption[i].value : 360;
					// 	}
					// 	else{
					// 		slideWidth = 360;
					// 	}
					// 	if( slideOption[i]  && slideOption[i].name === "sidebar"){
					// 		slideSwitch = slideOption[i].value ? slideOption[i].value : false;
					// 	}
					// 	else{
					// 		slideSwitch = false;
					// 	}
					// }
					for (var i = 0; i < slideOption.length; i++) {
						if (slideOption[i] && slideOption[i].name === "sidebar-width") {
							slideWidth = slideOption[i].value ? slideOption[i].value : 360;
						}
						else if (slideOption[i] && slideOption[i].name === "sidebar") {
							slideSwitch = slideOption[i].value ? slideOption[i].value : false;
						}
					}
					selfServiceData = commonConfig.getConfig().configOption["self-service"].content;
					issueData = commonConfig.getConfig().configOption.issue.content;
					iframeData = commonConfig.getConfig().configOption["webim-menu"].content;
					// slideWidth = commonConfig.getConfig().configOption.option.filter(item => item.name==="sidebar-width" );
					// slideSwitch = commonConfig.getConfig().configOption.option.filter(item => item.name==="sidebar" );
					if (slideSwitch === "true") {
						slideSwitch = true;
					}
					else {
						slideSwitch = false;
					}
				}
				else {
					slideWidth = 360;
					slideSwitch = false;
				}

				if (commonConfig.getConfig().configOption["self-service"] && commonConfig.getConfig().configOption["self-service"].content) {
					selfServiceData = commonConfig.getConfig().configOption["self-service"].content;
				}
				else {
					selfServiceData = [];
				}

				if (commonConfig.getConfig().configOption.issue && commonConfig.getConfig().configOption.issue.content) {
					issueData = commonConfig.getConfig().configOption.issue.content;
				}
				else {
					issueData = [];
				}

				if (commonConfig.getConfig().configOption["webim-menu"] && commonConfig.getConfig().configOption["webim-menu"].content) {
					iframeData = commonConfig.getConfig().configOption["webim-menu"].content;
				}
				else {
					iframeData = [];
				}
				apiHelper.getRelevanceList()
					.then(function (_relevanceList) {
						relevanceList = _relevanceList;
						return initFunctionStatus();
					}, function (err) {
						main.initRelevanceError(err);
					})
					.then(function (results) {
						handleCfgData(relevanceList, results);
					}, function () {
						handleCfgData(relevanceList || [], []);
					});
			}
		});
}





function initFunctionStatus() {
	if (commonConfig.getConfig().configId) {
		return arguments.callee.cache = arguments.callee.cache || Promise.all([
			apiHelper.getFaqOrSelfServiceStatus("issue"),
			apiHelper.getFaqOrSelfServiceStatus("self-service"),
			apiHelper.getIframeEnable(),
			apiHelper.getIframeSetting(),
		]);
	}
	return Promise.resolve([]);
}

function parseUrlSearch(url) {
	var result = {};
	var kv = url ? (url.split("?")[1] || "") : window.location.search;
	kv = $.trim(kv.replace("?", ""));
	if (kv) {
		kv = kv.split("&");
		var tmp;
		for (var i = 0; i < kv.length; i++) {
			tmp = kv[i].split("=");
			result[tmp[0]] = (tmp[1] ? decodeURIComponent(tmp[1]) : null);
		}
	}
	return result;
}

// todo: rename this function
function handleCfgData(relevanceList, status) {
	// var defaultStaticPath = __("config.language") === "en-US" ? "../static" : "static";
	var defaultStaticPath = location.pathname.indexOf('en-US') !== -1 ? "../static" : "static";
	// default value

	var targetItem;
	var appKey = commonConfig.getConfig().appKey;
	var splited = appKey.split("#");
	var orgName = splited[0];
	var appName = splited[1];
	var toUser = commonConfig.getConfig().toUser || commonConfig.getConfig().to;

	// toUser 转为字符串， todo: move it to handle config
	typeof toUser === "number" && (toUser = toUser.toString());

	if (appKey && toUser) {
		// appKey，imServiceNumber 都指定了
		targetItem = _.where(relevanceList, {
			orgName: orgName,
			appName: appName,
			imServiceNumber: toUser
		})[0];
	}

	// 未指定appKey, toUser时，或未找到符合条件的关联时，默认使用关联列表中的第一项
	if (!targetItem) {
		targetItem = targetItem || relevanceList[0];
		// 防止关联列表是空的情况js报错（海外环境）
		if (!targetItem) {
			targetItem = {
				imServiceNumber: ""
			};
		}
		console.log("mismatched channel, use default.");
	}
	var params = parseUrlSearch(window.location.href);
	var initlanguage = {'zh-CN': 'zh', 'en-US': 'en'}[__("config.language")] || __("config.language");
	commonConfig.setConfig({
		logo: commonConfig.getConfig().logo || { enabled: !!targetItem.tenantLogo, url: targetItem.tenantLogo },
		toUser: targetItem.imServiceNumber,
		orgName: targetItem.orgName,
		appName: targetItem.appName,
		channelId: targetItem.channelId,
		appKey: targetItem.orgName + "#" + targetItem.appName,
		restServer: commonConfig.getConfig().restServer || targetItem.restDomain,
		xmppServer: commonConfig.getConfig().xmppServer || targetItem.xmppServer,
		staticPath: commonConfig.getConfig().staticPath || defaultStaticPath,
		offDutyWord: commonConfig.getConfig().offDutyWord || __("prompt.default_off_duty_word"),
		emgroup: commonConfig.getConfig().emgroup || "",
		timeScheduleId: commonConfig.getConfig().timeScheduleId || 0,

		user: commonConfig.getConfig().user || {},
		visitor: commonConfig.getConfig().visitor || {},
		routingRuleFlag: commonConfig.getConfig().routingRuleFlag || params.routingRuleFlag || "",
		initLanguage: commonConfig.getConfig().initLanguage || initlanguage,
		channel: commonConfig.getConfig().channel || {},
		ui: commonConfig.getConfig().ui || {
			H5Title: {}
		},
		toolbar: commonConfig.getConfig().toolbar || {
			sendAttachment: true,
			sendSmallVideo: !commonConfig.getConfig().configId,
		},
		chat: commonConfig.getConfig().chat || {},
		options: commonConfig.getConfig().options || {
			onlyCloseWindow: "true", // 访客离开下面的开关，默认不会传该值，默认为true 这样不影响之前的逻辑
			onlyCloseSession: "true", // 访客离开下面的开关，默认不会传该值，默认为true 这样不影响之前的逻辑
			showEnquiryButtonInAllTime: "false", // 是否在所有时间段显示主动评价按钮,默认不会传该值，默认值为"false"，即只在坐席接待时显示主动评价按钮
			closeSessionWhenCloseWindow: "false" // 是否在关闭聊窗的时候关闭会话，默认不会传该值，默认值为"false"
		},
		originType: params.originType || "",
	});

	// fake patch: 老版本配置的字符串需要decode
	if (commonConfig.getConfig().offDutyWord) {
		try {
			commonConfig.setConfig({
				offDutyWord: decodeURIComponent(commonConfig.getConfig().offDutyWord)
			});
		}
		catch (e) { }
	}

	if (commonConfig.getConfig().emgroup) {
		try {
			commonConfig.setConfig({
				emgroup: decodeURIComponent(commonConfig.getConfig().emgroup)
			});
		}
		catch (e) { }
	}

	// 获取企业头像和名称
	// todo: rename to tenantName
	profile.tenantAvatar = utils.getAvatarsFullPath(targetItem.tenantAvatar, commonConfig.getConfig().domain);
	profile.defaultAgentName = targetItem.tenantName;
	profile.defaultAvatar = commonConfig.getConfig().staticPath + "/img/default_avatar.png";

	renderUI(status);
}
function renderUI(resultStatus) {
	// 添加移动端样式类
	if (utils.isMobile) {
		utils.addClass(document.body, "em-mobile");
	}
	else if (!utils.isTop) {
		utils.addClass(document.body, "window-demo");
	}
	else {
		utils.addClass(document.body, "window-pc");
	}


	// 用于预览模式
	if (commonConfig.getConfig().previewObj) {
		handleSettingIframeSize();
		allDisable();	// 相当于全关
	}
	// configId
	else if (commonConfig.getConfig().configId) {
		var slideState = commonConfig.getConfig().options.sidebar;
		commonIssueEnable = resultStatus[0];
		selfServiceEnable = resultStatus[1];
		iframeEnable = resultStatus[2];
		iframeContent = resultStatus[3];
		var serviceTitle = $(".em-service-title"); // issue self-servire
		selfServiceData = commonConfig.getConfig().configOption["self-service"].content;
		issueData = commonConfig.getConfig().configOption.issue.content;
		if (slideState == "true" && ((selfServiceData.length !== 0 && selfServiceEnable) || (issueData.length !== 0 && commonIssueEnable))) {
			serviceTitle.removeClass("hide");
		}
		else {
			serviceTitle.addClass("hide");
		}

		if ((commonIssueEnable || selfServiceEnable || iframeEnable) && slideState == "true") {
			slideSwitchAndMore = true;
		}
		// pc 端判断三个开关
		if (!utils.isMobile) {
			// 任意一个打开
			if ((commonIssueEnable || selfServiceEnable || iframeEnable) && slideState == "true") {
				utils.addClass(document.body, "big-window");
				// iframe 没有 url 时，初始化 tab 条件满足，但是没有内容！
				if (!pcAnyEnable()) {
					utils.removeClass(document.body, "big-window");
				}
				// 初始化成功 - 1 - im.html
				else if (utils.isTop) {
					utils.addClass(document.body, "big-window-h5");
				}
				// 初始化成功 - 2 - demo.html
				else {
					handleSettingIframeSize({
						// iframe 常见问题和自主服务，固定宽度 360px
						width: (Math.floor(commonConfig.getConfig().dialogWidth.slice(0, -2)) + Math.floor(360)) + "px"
					});
				}
			}
			// 全关
			else {
				utils.removeClass(document.body, "big-window");
				allDisable();
			}
		}
		// 移动端不判断 iframe 开关
		else {
			// 全关
			if (!commonIssueEnable && !selfServiceEnable) {
				allDisable();
			}
			// 任意一个打开（包括 iframeEnable）
			else {
				mobileAnyEnable();
			}
			// initSidePage
			var domTab = document.querySelector(".em-self-wrapper");
			setTimeout(function () {
				$(domTab).css("display", "block");
			}, 500);
		}
	}
	// tenantId
	else {
		allDisable();	// 相当于全关
		if (!fromUserClick) {
			main.close();
		}
	}

	apiHelper.getTheme().then(function (themeName) {
		var color;
		var className;
		if (themeName && themeName.indexOf("theme_custom") > -1) {
			var arr = themeName.split("theme_custom");
			color = arr[1];
			className = "theme_custom";
		}
		else {
			className = _const.themeMap[themeName];
		}
		className = className || "theme-1";
		className && utils.addClass(document.body, className);

		// 自定义主题色
		if (themeName && themeName.indexOf("theme_custom") > -1) {
			var fgColor = $(".theme_custom .fg-hover-color").css("color");
			$(".theme_custom .fg-color").css("cssText", "color: " + color + " !important");
			$(".theme_custom .selected .border-color").css("cssText", "border-color: " + color + " !important ; color: " + color + " !important");
			$(".theme_custom .bg-color").css("cssText", "background-color: " + color + " !important");
			$(".theme_custom .ui-cmp-tab .selected").css("cssText", "border-color: " + color + " !important ; color: " + color + " !important");
			if (!utils.isMobile) {
				$(".theme_custom .fg-hover-color").hover(function () {
					$(this).css("cssText", "color: " + color + " !important");
				}, function () {
					$(this).css("cssText", "color: " + fgColor + " !important");
				});
			}
		}

	});

	function allDisable() {
		// console.log("全关");
		$(".em-self-wrapper").addClass("hide");
		if (!$("body").hasClass("window-demo") && !utils.isMobile) {
			$(".em-widget-box").css("width", "735px");
		}
		main.initChat();
	}
	function mobileAnyEnable() {
		// console.log("移动任一");
		main.close();
		return initSidePage(resultStatus);
	}
	function pcAnyEnable() {
		// console.log("电脑任一");
		main.initChat();
		return initSidePage(resultStatus);
	}
	function initSidePage(resultStatus) {
		if (!slideSwitch) {
			return false;
		}
		// apiHelper.getSidebarWidth().then(function(res){
		// 	if(!res.entity){
		// 		slideWidth = 360;
		// 	}
		// 	else{
		// 		slideWidth = res.entity.value;
		// 	}
		// })
		var commonIssueEnable = resultStatus[0];
		var selfServiceEnable = resultStatus[1];
		var iframeEnable = resultStatus[2];
		var iframeSettings = resultStatus[3][0];	// 只取第一个
		if ((selfServiceData.length == 0 || !selfServiceEnable) && (issueData.length == 0 || !commonIssueEnable) && (iframeContent.length == 0 || !iframeEnable)) {
			return false;
		}
		var side_page = functionView.init({
			resultStatus: resultStatus
		});
		var tab = new Tab();
		if (commonIssueEnable || selfServiceEnable) {
			var faqInsArr = [];
			if (selfServiceEnable) {
				faqInsArr.push(side_page.ss);
				faqTxt = __("common.self_service");
			}
			if (commonIssueEnable) {
				faqInsArr.push(side_page.faq);
				faqTxt = __("common.faq");
			}
			if (selfServiceEnable && commonIssueEnable) {
				faqTxt = __("common.self_service");
			}
			if (utils.isMobile) {
				faqInsArr.push(side_page.contact);
			}
			tab.addTab({
				sign: "faq",
				text: faqTxt,
				ins: faqInsArr,
			});

			if (commonIssueEnable && !selfServiceEnable) {
				tab.$el.find(".faq-list > p").hide();
			}
		}
		// iframe 开关开启并且信息完备时
		if (!utils.isMobile && iframeEnable && iframeSettings && iframeSettings.url) {
			for (var i = 0; i < resultStatus[3].length; i++) {
				tab.addTab({
					sign: "iframe" + i,
					text: resultStatus[3][i].name,
					ins: [side_page.iframeList[i]],
				});
			}
		}
		// 监听tab点击，在点击的时候发送postMessage，传递参数给iframe
		eventListener.add("ui.tab.click", function (e, sing) {
			if (sing && sing != "faq") {
				var iframeParent = $("div[sign='" + sing + "']")[0];
				setTimeout(function () {
					var msg = commonConfig.getConfig().visitorInfo;
					if (msg) {
						var obj = {
							phone: msg.phone,
							userId: msg.userId,
							username: msg.username
						};
					}
					if (iframeParent) {
						$(iframeParent).find("iframe")[0].contentWindow.postMessage(obj, "*");
					}
				}, 1000);
			}
		});
		// 第一个tab在页面渲染完成时候再触发事件
		if (tab.tabs != 0 && tab.tabs[0].sign != "faq") {
			setTimeout(function () {
				var iframeParent = $("div[sign='" + tab.tabs[0].sign + "']")[0];
				var msg = commonConfig.getConfig().visitorInfo;
				if (msg) {
					var obj = {
						phone: msg.phone,
						userId: msg.userId,
						username: msg.username
					};
				}
				$(iframeParent).find("iframe")[0].contentWindow.postMessage(obj, "*");
			}, 5000);
		}
		// 优先第一个
		if (tab.selectFirstTab()) {
			$("#em-kefu-webim-self").append(tab.$el);
			return true;
		}
		return false;
	}
	if (utils.isMobile && !slideSwitch) {
		$(".em-self-wrapper").addClass("hide");
		main.initChat();
		return false;
	}
	if ((selfServiceData.length == 0 || !selfServiceEnable) && (issueData.length == 0 || !commonIssueEnable) && (iframeContent.length == 0 || !iframeEnable)) {
		if (utils.isMobile && slideSwitch) {
			$(".em-self-wrapper").addClass("hide");
			main.initChat();
			$(".expand").addClass("hide");
			return false;
		}
		$(".em-self-wrapper").addClass("hide");
		$(".expand").addClass("hide");
		var chatWidth = $(".em-widget-content-box").width() - slideWidth;
		var closeWidth = 0;
		var closeChat = $(".em-widget-content-box").width() - closeWidth;
		$("#em-kefu-webim-self").css("width", closeWidth + "px");
		$("#em-kefu-webim-chat").css("width", closeChat + "px");
		setTimeout(function () {
			$("#em-kefu-webim-self").css("display", "block");
		}, 500);
		eventListener.trigger("swiper.update");
	}
	else if (slideSwitch && !utils.isMobile) {
		if (!slideSwitchAndMore) {
			return false;
		}
		// 获取坐席端设置的宽度并设置，js集成网页的时候
		apiHelper.getSidebarWidth().then(function (res) {
			var sideWidth;
			if (!res.entity) {
				sideWidth = 360;
			}
			else {
				sideWidth = res.entity.value;
			}
			var chatWidth = $(".em-widget-content-box").width() - Number(sideWidth) - 20;
			$("#em-kefu-webim-chat").css("width", chatWidth + "px");
			$("#em-kefu-webim-self").css("width", sideWidth + "px");
			setTimeout(function () {
				$("#em-kefu-webim-self").css("display", "block");
			}, 500);
			eventListener.trigger("swiper.update");
		});
	}
	// 监听页面状态
	listenPageState();
}


function handleSettingIframeSize(params) {
	// 把 iframe 里收到 _const.EVENTS.RESET_IFRAME 事件时设置 config 参数移到这里了
	if (params) {
		commonConfig.setConfig(params);
	}
	params = params || {};
	// 重新去设置iframe 的宽高
	getToHost.send({
		event: _const.EVENTS.RESET_IFRAME,
		data: {
			dialogHeight: commonConfig.getConfig().dialogHeight,
			dialogWidth: params.width || commonConfig.getConfig().dialogWidth,
			dialogPosition: commonConfig.getConfig().dialogPosition
		}
	});
}

function initCrossOriginIframe() {
	var iframe = document.getElementById("cross-origin-iframe");
	iframe.src = commonConfig.getConfig().domain + "__WEBIM_SLASH_KEY_PATH__/webim/transfer.html?v=__WEBIM_PLUGIN_VERSION__";
	utils.on(iframe, "load", function () {
		apiHelper.initApiTransfer();
    var config = commonConfig.getConfig()
    if(config.customer === "ysp") {
      apiHelper.getYspVisitorInfo(config.key, config.visitor.visitorExt)
      .then(function (data) {
        var yspInfo = data.entity
        var visitor = config.visitor
        visitor.trueName = yspInfo.userName
        visitor.phone = yspInfo.bindPhoneNumber
        visitor.userNickname = yspInfo.loginName
        visitor.userDefineColumn = JSON.stringify(yspInfo)
        commonConfig.setConfig({ visitor: visitor })

        // 有 configId 需要先去获取 config 信息
		    commonConfig.getConfig().configId ? initConfig() : initRelevanceList();
      })
    } else {
      // 有 configId 需要先去获取 config 信息
      commonConfig.getConfig().configId ? initConfig() : initRelevanceList();
    }
	});
}
function screenShot() {
	var system = !!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
	if (system) $(".screenshot").addClass("hide");
	var agent = navigator.userAgent.toLowerCase();
	var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
	if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) tips = domData.screenShot = __("toolbar.screen_shotTip_win");
	if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) tips = domData.screenShot = __("toolbar.screen_shotTip_win");
	if (isMac) domData.screenShot = __("toolbar.screen_shotTip");
}
// 监听页面的状态
function listenPageState() {
	var hiddenProperty = "hidden" in document ? "hidden" :
		"webkitHidden" in document ? "webkitHidden" :
			"mozHidden" in document ? "mozHidden" :
				null;
	var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, "visibilitychange");
	var onVisibilityChange = function () {
		if (!document[hiddenProperty]) {
			commonConfig.setConfig({
				pageState: true
			});
			// 每次页面激活时候需要调用已读消息接口
			var SessionId = profile.currentOfficialAccount.sessionId;
			Apis.readMessageLastRead(SessionId);
		}
		else {
			// console.log('页面非激活')
			commonConfig.setConfig({
				pageState: false
			});
		}
	};
	document.addEventListener(visibilityChangeEvent, onVisibilityChange);
}





// body.html 显示词语
function load_html() {
	utils.appendHTMLToBody(_.template(body_template)(domData));

	chat.getDom();
}

	
});