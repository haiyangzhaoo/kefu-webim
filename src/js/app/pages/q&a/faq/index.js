var apis = require("../apis");
var utils = require("@/common/utils");
var container_tpl = require("./indexTpl.html");
var item_tpl = require("./itemTpl.html");
var channel = require("../../main/channel");
var _const = require("@/common/const");
var eventListener = require("@/app/tools/eventListener");
var enableFaqClickToSend = false;

module.exports = function(clickAction){
	var container = $(_.template(container_tpl)({
		faq: __("common.faq"),
	}));

  enableFaqClickToSend = clickAction === "1";

	apis.getFaqList()
	.then(function(data){
		_.each(data, function(itm){
			itm.content = utils.encode(itm.content);
			itm.content = utils.parseUrl(itm.content);
		});
    
    if(enableFaqClickToSend){ // 设置为单击发送则隐藏列表项的展开箭头
      container.addClass("hide-list-icon");
    }

		container.removeClass("hide");
		container.find(".faq-list-content").append(_.template(item_tpl)({
			faq: data,
		}));
		container.delegate(".question", "click", onMenuClick);
		container.delegate(".question>i", "click", function(e){
			e.target.parentNode.click();
		});
	});

	// 菜单点击
	function onMenuClick(e){
		var issueId = e.target.getAttribute("data-id");
		issueId && apis.recordFaqClick(issueId);	// 统计
    if(enableFaqClickToSend){ // 点击直接发送
      var title = e.target.innerText.trim();
      if(title){
        if(utils.isMobile){
          eventListener.trigger(_const.SYSTEM_EVENT.CONSULT_AGENT);
          window._sendFaqMessage = function() {
            channel.sendText(title);
          }
        }else{
          channel.sendText(title);
        }
      }
    }
    else{
      utils.toggleClass(e.target.parentNode, "hide-answer");
    }
		utils.stopPropagation();
		return false;
	}

	// APIs
	this.$el = container;
	this.show = function(){
	};
};
