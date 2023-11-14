const OpenCC = require('opencc-js');
const i18next = require("i18next");
const i18nextHttpBackend = require("i18next-http-backend");
const _zh_cn_map_ = require("../../i18n/zh-CN");

const converter = OpenCC.Converter({ from: 'cn', to: 'hk' });

function getNoteConfig() {
	var i;
	var len;
	var tmp = [];
	var obj = {};
	// 需要测兼容性
	var src = document.location.search;
	var arr = src.slice(1).split("&");
	for (i = 0, len = arr.length; i < len; i++) {
		tmp = arr[i].split("=");
		tmp[1] = window.atob
			? window.atob(tmp[1])
			: tmp[1];
		obj[tmp[0]] = tmp.length > 1
			? JSON.parse(decodeURIComponent(tmp[1]))
			: "";
	}
	return obj;
}
// url 传递的参数
var config = getNoteConfig().config || {};

// 改变语言刷新本地，因此保存在本地
// let localI18n = window.localStorage.getItem('i18n');
let lang = config.language || 'zh';
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
		loadPath: `/v1/webimplugin/settings/config/${config.configId}/language/content?language=${initLang}`,
		addPath: null,
		parse: ret => {
			ret = JSON.parse(ret);
			let data = ret.status == 'OK' ? ret.entity : {};
			initLang && Object.keys(data).length && (data.config.language = lang);

			return data;
		}
	},
}, function(err, t) {
	console.log('1111111note', initLang, err)
	if(err){
		// 有错误默认中文
		i18next.init({
			lng: "zh-CN",
			fallbackLng: false,
			keySeparator: ".",
			nsSeparator: false,
			saveMissing: true,
			resources: {
				"zh-CN": {
					translation: _zh_cn_map_,
				},
			},
		},cb);
	
		function cb(err, tt){
			window.__ = tt;
		}
	}else{
		window.i18nWebim = i18next;
		if (lang == 'zh-HK') {
			window.__ = function() {
				return converter(t.apply(null, arguments));
			}
		} else {
			window.__ = t;
		}
	}
	

require("underscore");
require("es6-promise").polyfill();
require("@/common/polyfill");
require("jquery");
window._ = require("underscore");

var utils = require("@/common/utils");
var commonConfig = require("@/common/config");
var uikit = require("../pages/main/uikit");
var api = require("./api");
var Selector = require("../pages/main/uikit/selector");
var getToHost = require("@/app/common/transfer");
var _const = require("@/common/const");

var isSending = false;

var dom = utils.createElementFromHTML([
	"<div class=\"em-dialog ticket satisfaction \">",
	"<div class=\"wrapper\">",
	"<div class=\"wrapper-title\">" + __("ticket.note_title") + " <i class=\"icon-close\"></i></div>",
	"<h3>" + __("ticket.title") + "</h3>",
	"<input type=\"text\" class=\"name\" placeholder=\"" + __("ticket.name") + "\"> <span class=\"font-red\">*</span>",
	"<input type=\"text\" class=\"phone\" placeholder=\"" + __("ticket.phone_number") + "\"> <span class=\"font-red\">*</span>",
	"<input type=\"text\" class=\"mail\" placeholder=\"" + __("ticket.email") + "\">",
	"<div class=\"note-category hide\"></div>",
	"<textarea spellcheck=\"false\" placeholder=\"" + __("ticket.content_placeholder") + "\"></textarea><span class=\"font-red-text\">*</span>",
	"<div class=\"line\"></div>",
	"<div class=\"cancel\">" + __("common.cancel") + "</div>",
	"<div class=\"confirm bg-color\">" + __("common.ticket") + "</div>",
	"</div>",
	"</div>"
].join(""));

// 不要用parent 获取元素。
if (utils.isMobile || (config.showBody && config.showSelf)) {
	var dom = utils.createElementFromHTML([
		"<div  class=\"em-dialog note\">",
		"<div class=\"wrapper\">",
		"<div class=\"wrapper-title bg-color\">" + __("ticket.note_title") + " <i class=\"icon-back-new\"></i></div>",
		"<h3>" + __("ticket.title") + "</h3>",
		"<input type=\"text\" class=\"name\" placeholder=\"" + __("ticket.name") + "\"> <span class=\"font-red\">*</span>",
		"<input type=\"text\" class=\"phone\" placeholder=\"" + __("ticket.phone_number") + "\"> <span class=\"font-red\">*</span>",
		"<input type=\"text\" class=\"mail\" placeholder=\"" + __("ticket.email") + "\">",
		"<div class=\"note-category hide\"></div>",
		"<textarea spellcheck=\"false\" placeholder=\"" + __("ticket.content_placeholder") + "\"></textarea><span class=\"font-red-text\">*</span>",
		"<div class=\"line\"></div>",
		"<div class=\"cancel\">" + __("common.cancel") + "</div>",
		"<div class=\"confirm bg-color\">" + __("common.ticket") + "</div>",
		"</div>",
		"</div>"
	].join(""));
}
else if (config.showBody && !config.showSelf) {
	var dom = utils.createElementFromHTML([
		"<div id=\"demo-wrapper\" class=\"em-dialog ticket satisfaction \">",
		"<div class=\"wrapper\">",
		"<div class=\"wrapper-title\">" + __("ticket.note_title") + " <i class=\"icon-close\"></i></div>",
		"<h3>" + __("ticket.title") + "</h3>",
		"<input type=\"text\" class=\"name\" placeholder=\"" + __("ticket.name") + "\"> <span class=\"font-red\">*</span>",
		"<input type=\"text\" class=\"phone\" placeholder=\"" + __("ticket.phone_number") + "\"> <span class=\"font-red\">*</span>",
		"<input type=\"text\" class=\"mail\" placeholder=\"" + __("ticket.email") + "\">",
		"<div class=\"note-category hide\"></div>",
		"<textarea spellcheck=\"false\" placeholder=\"" + __("ticket.content_placeholder") + "\"></textarea><span class=\"font-red-text\">*</span>",
		"<div class=\"line\"></div>",
		"<div class=\"cancel\">" + __("common.cancel") + "</div>",
		"<div class=\"confirm bg-color\">" + __("common.ticket") + "</div>",
		"</div>",
		"</div>"
	].join(""));
}
document.body.appendChild(dom);

var content = document.querySelector("textarea");
var name = document.querySelector(".name");
var phone = document.querySelector(".phone");
var mail = document.querySelector(".mail");
var noteCategory = document.querySelector(".note-category");
var noteCategoryList = new Selector({
	list: [],
	container: noteCategory,
});
// var cancelBtn = document.querySelector(".cancel-btn");
// var confirmBtn = document.querySelector(".confirm-btn");
var cancelBtn = document.querySelector(".cancel");
var confirmBtn = document.querySelector(".confirm");

api.update(config);
utils.addClass(document.body, config.themeClassName || "theme-1");
// 根据配置隐藏取消按钮
config.hideCloseBtn && utils.addClass(cancelBtn, "hide");

var themeCustomColor = config.themeCustomColor;
if (themeCustomColor) {
	// color = config.themeColor;
	$(".theme_custom").find(".bg-color").css("cssText", "background-color: " + themeCustomColor + " !important");
}
var color = config.themeColor;
if (color) {
	$(".theme_custom").find(".bg-color").css("cssText", "background-color: " + color + " !important");
}
if (config.offDutyType == "") {
	var closeEl = $(".ticket>.wrapper .icon-close");
	var ticketEl = $(".ticket>.wrapper .confirm");
	closeEl && closeEl.remove();
	$(ticketEl).css("cssText", "margin-left: 280px;display:block;margin:auto;margin-bottom: 65px;");
}

var _getCategories = _.once(function () {
	api.getNoteCategories().then(function (list) {
		var optionList = _.map(list, function (item) {
			return {
				sign: item.id,
				desc: item.name
			};
		});

		if (!_.isEmpty(optionList)) {
			utils.removeClass(noteCategory, "hide");
			noteCategoryList.updateList({ list: optionList });
		}
	});
});

function _createTicket() {
	Promise.all([
		api.getToken(),
		api.getProjectId()
	]).then(function (result) {
		var token = result[0];
		var projectId = result[1];
		var sessionId = config.sessionId || "";

		api.createTicket({
			token: token,
			projectId: projectId,
			name: name.value,
			phone: phone.value,
			mail: mail.value,
			content: content.value,
			category_id: noteCategoryList.getSelectedValue(),
			session_id: sessionId,
		}).then(function () {
			isSending = false;
			uikit.showSuccess(__("ticket.send_success"));

			_clearInput();
		}, function (err) {
			isSending = false;
			uikit.tip(__("ticket.send_failed_retry"));
			console.error(err);
		});
	})
	["catch"](function (err) {
		uikit.tip(__("ticket.send_failed_invalid_token"));
		console.error(err);
	});
}

function _clearInput() {
	name.value = "";
	phone.value = "";
	mail.value = "";
	content.value = "";
}

function _writePreDate(preData) {
	name.value = preData.name || "";
	phone.value = preData.phone || "";
	mail.value = preData.mail || "";
}

config.grayNoteCategory && _getCategories();
config.preData && _writePreDate(config.preData);


// 海外用户，不验证手机号格式 新增敦煌用户不校验格式2020-05-06
function overseasTest() {
	// 海外集群
	if (config.tenantId >= 1000000) {
		return !phone.value;
	}
	if (config.tenantId == "76141") {
		return !phone.value;
	}
	if (config.tenantId == "78882") {
		return !phone.value;
	}
	if (config.tenantId == "6437") {
		return !phone.value;
	}
	return !phone.value || !(/^1[3456789]\d{9}$/.test(phone.value));
}
// 添加邮箱的校验
function checkEmail() {
	var check = /^[0-9a-z]([_.0-9a-z-]{0,30}[0-9a-z])?@([0-9a-z][0-9a-z-]{0,30}[.]){1,3}[a-z]{2,4}$/i;
	if (mail.value) {
		if (check.test(mail.value)) {
			return true
		} else {
			return false
		}
	}
	else {
		return true
	}
}

// 留言
utils.on(confirmBtn, "click", function () {
	if (isSending) {
		uikit.tip(__("ticket.is_sending"));
	}
	else if (!name.value || name.value.length > 140) {
		uikit.tip(__("ticket.invalid_name"));
	}
	else if (overseasTest()) {
		uikit.tip(__("ticket.invalid_phone"));
	}
	else if (!checkEmail()) {
		uikit.tip(__("ticket.invalid_email"));
	}
	else if (!content.value || content.value.length > 1500) {
		uikit.tip(__("ticket.invalid_content"));
	}
	else {
		isSending = true;
		setTimeout(function () { isSending = false; }, 10000);
		_createTicket();
	}
});

// 取消
utils.on(cancelBtn, "click", function () {
	if (config.offDutyType == "") {

	}
	else {
		window.parent.postMessage({ closeNote: true }, "*");
	}
});
utils.live(".wrapper-title .icon-close", "click", function () {
	// window.parent.postMessage({ closeNote: true }, "*");
	if (config.offDutyType == "") {

	}
	else {
		window.parent.postMessage({ closeNote: true }, "*");
	}
});
utils.live(".wrapper-title .icon-back-new", "click", function () {
	// window.parent.postMessage({ closeNote: true }, "*");
	if (config.offDutyType == "") {
		window.parent.postMessage({ closeChat: true }, "*");
	}
	else {
		window.parent.postMessage({ closeNote: true }, "*");
	}
});
})