module.exports = {
	config: {
		message_timestamp_format: "M月D日 HH:mm",
		article_timestamp_format: "M月D日",
		language: "zh-CN",
		transfer_to_kefu_words: "转人工|转坐席|转人工客服|转人工坐席|转人工服务",
		scheduler_role_nickname: "调度员",
	},
	common: {
		confirm: "确定",
		cancel: "取消",
		contact_agent: "联系客服",
		ticket: "留言",
		submit: "提交",
		agent: "客服坐席",
		visitor: "访客",
		close: "关闭",
		reply: "回复",
		tip: "提示",
		send_failed: "发送失败",
		loading: "加载中...",
		no_more_msg: "没有更多消息",
		press_save_img: "长按图片保存到本地",
		session_over_limit: "目前咨询人数较多，请稍候再试~~~",
		faq: "常见问题",
		consult_agent: "点此咨询客服"
	},
	chat: {
		agent_is_typing: "正在输入...",
		current_queue_number: "当前排队人数为",
		connecting: "连接中...",
		send: "发送",
		input_placeholder: "点击输入内容...",
		click_to_ticket: "留言",
		evaluate_agent_title: "请对我的服务做出评价",
		click_to_evaluate: "立即评价",
		invalid:"已失效",
		paste_image_submit: "发送",
		read_full_version: "阅读全文",
		default_emoji: "默认",
		powered_by_easemob: "环信提供技术支持"
	},
	message_brief: {
		link: "[链接]",
		menu: "[菜单]",
		file: "[文件]",
		picture: "[图片]",
		emoji: "[表情]",
		unknown: "[未知类型]",
		video: "[视频]",
	},
	agent_status: {
		online: "(空闲)",
		busy: "(忙碌)",
		leave: "(离开)",
		hidden: "(隐身)",
		offline: "(离线)",
	},
	event_message: {
		no_agent_online: "当前暂无客服在线，请您留下联系方式，稍后我们将主动联系您",
		session_created: "会话创建成功",
		session_opened: "会话已被客服接起",
		sessing_transfering: "会话转接中，请稍候",
		session_transfered: "会话已被转接至其他客服",
		sessing_closed: "会话已结束",
	},
	evaluation: {
		rate_my_service: "请对我的服务做出评价",
		rate_my_evalute: "请问客服是否解决了您的问题?",
		review: "请输入评价内容",
		select_level_please: "请先选择星级",
		select_tag_please: "请先选择标签",
		submit_success: "提交成功",
		resolved: "已解决",
		unsolved: "未解决",
		WEBIM_338: "访客评价超时",
		WEBIM_OTHER: "其他错误"
	},
	ticket: {
		title: "请填写以下内容以方便我们及时联系您",
		name: "姓名",
		phone_number: "手机号",
		email: "邮箱",
		content_placeholder: "请输入留言",
		is_sending: "留言提交中...",
		invalid_name: "姓名输入不正确",
		invalid_phone: "手机号输入不正确",
		invalid_email: "邮箱输入不正确",
		invalid_content: "留言内容不能为空，长度小于1500字",
		send_success: "留言发送成功",
		send_failed_retry: "留言失败，请稍后重试",
		send_failed_invalid_token: "留言失败，token无效",
	},
	video: {
		waiting: "等待中",
		me: "我",
		video_ended: "视频已结束",
		confirm_prompt: "您要邀请客服为您进行实时视频服务么？点击确认发送邀请，等待客服接受后即可体验实时视频服务。",
		invite_agent_video: "邀请客服进行实时视频",
		invite_exit_video: "访客取消实时视频",
		connecting: "视频通话中",
		waiting_confirm: "视频连接请求，等待你的确认",
		can_not_connected: "视频无法接通，请重试",
		can_not_open_camera: "打开摄像头失败",
	},
	toolbar: {
		emoji: "表情",
		picture: "图片",
		attachment: "附件",
		ticket: "留言",
		video_invite: "视频通话",
		evaluate_agent: "评价客服",
		transfer_to_kefu: "转人工",
		send_video: "发送小视频",
	},
	prompt: {
		new_message_title_notice: "新消息提醒",
		no_valid_channel: "未创建关联",
		new_message: "新消息",
		too_many_words: "输入字数过多",
		default_off_duty_word: "现在是下班时间。",
		_10_mb_file_limit: "文件大小不能超过10MB",
	},
};
