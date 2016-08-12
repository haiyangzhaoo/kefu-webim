/**
 * webim交互相关
 */
;(function () {

    easemobim.chat = function ( config ) {
		var utils = easemobim.utils;

		//DOM init
		easemobim.im = utils.$Dom('EasemobKefuWebim'),
		easemobim.imBtn = utils.$Dom('easemobWidgetPopBar'),
		easemobim.imChat = utils.$Dom('EasemobKefuWebimChat'),
		easemobim.imChatBody = utils.$Dom('easemobWidgetBody'),
		easemobim.send = utils.$Dom('easemobWidgetSend'),
		easemobim.textarea = easemobim.send.getElementsByTagName('textarea')[0],
		easemobim.sendBtn = utils.$Dom('easemobWidgetSendBtn'),
		easemobim.faceBtn = easemobim.send.getElementsByTagName('i')[0],
		easemobim.realFile = utils.$Dom('easemobWidgetFileInput'),
		easemobim.sendFileBtn = utils.$Dom('easemobWidgetFile'),
		easemobim.noteBtn = utils.$Dom('easemobWidgetNote'),
		easemobim.mobileNoteBtn = utils.$Dom('easemobWidgetNotem'),
		easemobim.dragHeader = utils.$Dom('easemobWidgetDrag'),
		easemobim.dragBar = easemobim.dragHeader.getElementsByTagName('p')[0],
		easemobim.chatFaceWrapper = utils.$Dom('EasemobKefuWebimFaceWrapper'),
		easemobim.messageCount = easemobim.imBtn.getElementsByTagName('span')[0];
		easemobim.swfupload = null;//flash 上传


		//chat window object
        return {
            init: function () {
                
                this.channel = easemobim.channel.call(this, config);

				//create & init connection
                this.setConnection();
				//sroll bottom timeout stamp
                this.scbT = 0;
				//unread message count
				this.msgCount = 0;
				//just show date label once in 1 min
                this.msgTimeSpan = {};
				//chat window status
                this.opened = true;
				//fill theme
				this.setTheme();
				//add min icon
                this.setMinmum();
				//init sound reminder
                this.soundReminder();
				//mobile adjust
				this.mobile();
				//root adjust
				this.setRoot();
				//bind events on dom
                this.bindEvents();
            }
            , handleReady: function ( info ) {
                var me = this;

                if ( me.readyHandled ) {
                    return false;
                }

                me.readyHandled = true;

                if ( info && config.user ) {
                    config.user.token = config.user.token || info.accessToken;
                }

                easemobim.leaveMessage && easemobim.leaveMessage.auth(me.token, config);

                if ( utils.root ) {
                    //get visitor
                    var visInfo = config.visitor;
                    if ( !visInfo ) {
                        visInfo = utils.getStore(config.tenantId + config.emgroup + 'visitor');
                        try { config.visitor = Easemob.im.Utils.parseJSON(visInfo); } catch ( e ) {}
                        utils.clearStore(config.tenantId + config.emgroup + 'visitor');
                    }

                    //get ext
                    var ext = utils.getStore(config.tenantId + config.emgroup + 'ext');
                    try { ext && me.sendTextMsg('', false, {ext: Easemob.im.Utils.parseJSON(ext)}); } catch ( e ) {}
                    utils.clearStore(config.tenantId + config.emgroup + 'ext');
                } else {
                    transfer.send(easemobim.EVENTS.ONREADY, window.transfer.to);
                } 
            }
			, setExt: function ( msg ) {
				msg.body.ext = msg.body.ext || {};
				msg.body.ext.weichat = msg.body.ext.weichat || {};

				//bind skill group
				if ( config.emgroup ) {
					msg.body.ext.weichat.queueName = decodeURIComponent(config.emgroup);
				}

				//bind visitor
				var visitor = config.visitor;
				if ( visitor ) {
					msg.body.ext.weichat.visitor = visitor;
				}

				//bind agent
				if ( config.agentName ) {
					msg.body.ext.weichat.agentUsername = config.agentName;
				}

                //set language
                if ( config.language ) {
					msg.body.ext.weichat.language = config.language;
                }

                //set growingio id
                var gr_user_id = utils.getStore(config.tenantId + 'gr_user_id');
                if ( gr_user_id ) {
					msg.body.ext.weichat.visitor = msg.body.ext.weichat.visitor || {};
					msg.body.ext.weichat.visitor.gr_user_id = gr_user_id;
                    utils.clearStore(config.tenantId + 'gr_user_id');
                }

                //set originType
				if ( config.originType ) {
					msg.body.ext.weichat.originType = config.originType;
				}
			}
			, setRoot: function () {
				if ( !utils.root ) { return false; }

				config.dragenable = false;
				this.fillFace();
			}
			, mobile: function () {
				if ( !utils.isMobile ) { return false; }

				//mobile need set drag disable
				config.dragenable = false;

                config.ticket && utils.removeClass(easemobim.mobileNoteBtn, 'em-hide');

				if ( !config.hideKeyboard ) {
					var i = document.createElement('i');
					utils.addClass(i, 'easemobWidgetHeader-keyboard easemobWidgetHeader-keyboard-down');
					easemobim.dragHeader.appendChild(i);
				}
			}
            , ready: function () {
				//add tenant notice
                this.setNotice();
				//add msg callback
                this.sdkInit();
				//connect to xmpp server
                this.open();
				//create chat container
                this.handleGroup();
				//get service serssion info
                this.getSession();
				//set tenant logo
				this.setLogo();
				//mobile set textarea can growing with inputing
				this.initAutoGrow();
                this.chatWrapper.getAttribute('data-getted') || config.newuser || this.getHistory();
            }
			, initAutoGrow: function () {
				var me = this;

				if ( !me.autoGrowOptions ) {
                    me.autoGrowOptions = {};
                    me.autoGrowOptions.callback = function () {
                        var height = easemobim.send.getBoundingClientRect().height;
						if ( me.direction === 'up' ) {
							easemobim.chatFaceWrapper.style.top = 43 + easemobim.send.getBoundingClientRect().height + 'px';
						} else {
							easemobim.imChatBody.style.bottom = height + 'px';
							easemobim.chatFaceWrapper.style.bottom = easemobim.send.getBoundingClientRect().height + 'px';
						}
                    };
                    me.autoGrowOptions.dom = easemobim.textarea;
					setTimeout(function () {
						utils.isMobile && easemobim.autogrow(me.autoGrowOptions);
					}, 1000);
                }
			}
            , setConnection: function() {
                this.conn = this.channel.getConnection();
            }
            , handleChatWrapperByHistory: function ( chatHistory, chatWrapper ) {
                if ( chatHistory.length === easemobim.LISTSPAN ) {
                    chatWrapper.setAttribute('data-start', Number(chatHistory[easemobim.LISTSPAN - 1].chatGroupSeqId) - 1);
                    chatWrapper.setAttribute('data-history', 0);
                } else {
                    chatWrapper.setAttribute('data-history', 1);
                }
            }
            , getHistory: function ( notScroll ) {
                if ( config.offDuty || config.newuser ) {
                    return;
                }

                var me = this,
                    chatWrapper = me.chatWrapper,
                    groupid = chatWrapper.getAttribute('data-groupid');

                if ( groupid ) {
                    Number(chatWrapper.getAttribute('data-history')) || easemobim.api('getHistory', {
                        fromSeqId: chatWrapper.getAttribute('data-start') || 0
                        , size: easemobim.LISTSPAN
                        , chatGroupId: groupid
                        , tenantId: config.tenantId
                    }, function ( msg ) {
                        me.handleChatWrapperByHistory(msg.data, chatWrapper);
                        if ( msg.data && msg.data.length > 0 ) {
                            me.channel.handleHistory(msg.data);
                            notScroll || me.scrollBottom();
                        }
                    });
                } else {
                    Number(chatWrapper.getAttribute('data-history')) || easemobim.api('getGroup', {
                        id: config.user.username
                        , orgName: config.orgName
                        , appName: config.appName
                        , imServiceNumber: config.toUser
                        , tenantId: config.tenantId
                    }, function ( msg ) {
                        if ( msg && msg.data ) {
                            chatWrapper.setAttribute('data-groupid', msg.data);
                            easemobim.api('getHistory', {
                                fromSeqId: chatWrapper.getAttribute('data-start') || 0
                                , size: easemobim.LISTSPAN
                                , chatGroupId: msg.data
                                , tenantId: config.tenantId
                            }, function ( msg ) {
                                me.handleChatWrapperByHistory(msg.data, chatWrapper);
                                if ( msg && msg.data && msg.data.length > 0 ) {
                                    me.channel.handleHistory(msg.data);
                                    notScroll || me.scrollBottom();
                                }
                            });
                        }
                    });
                }
                chatWrapper.setAttribute('data-getted', 1);
            }
			, getGreeting: function () {
				var me = this,
					msg = null;

				if ( me.greetingGetted ) {
					return;
				}

				me.greetingGetted = true;

				//system greeting
				easemobim.api('getSystemGreeting', {
					tenantId: config.tenantId
				}, function ( msg ) {
					if ( msg && msg.data ) {
						msg = {
							data: msg.data,
							type: 'txt',
							noprompt: true
						};
						me.receiveMsg(msg, 'txt');
					}

					//robert greeting
					easemobim.api('getRobertGreeting', {
						tenantId: config.tenantId,
						originType: config.originType || 'webim'
					}, function ( msg ) {
						if ( msg && msg.data ) {
							var rGreeting = msg.data;

							switch ( rGreeting.greetingTextType ) {
								case 0:
									//robert text greeting
									msg = {
										data: rGreeting.greetingText,
										type: 'txt',
										noprompt: true
									};
									me.receiveMsg(msg, 'txt');
									break;
								case 1:
									try {
										var greetingObj = Easemob.im.Utils.parseJSON(rGreeting.greetingText.replace(/&quot;/g, '"'));
										if ( rGreeting.greetingText === '{}' ) {
											msg = {
												data: '该菜单不存在',
												type: 'txt',
												noprompt: true
											};
											me.receiveMsg(msg, 'txt');
										} else {
											//robert list greeting
											msg = { 
												ext: greetingObj.ext,
												noprompt: true
											 };
											me.receiveMsg(msg);	
										}
									} catch ( e ) {}
									break;
								default: break;
							}
						}
					});
				});
			}
            , getSession: function () {
				if ( config.offDuty ) { return; }

                var me = this

				if ( !me.session || !me.sessionSent ) {
					me.sessionSent = true;
					me.agent = me.agent || {};

					easemobim.api('getExSession', {
						id: config.user.username
						, orgName: config.orgName
						, appName: config.appName
						, imServiceNumber: config.toUser
						, tenantId: config.tenantId
					}, function ( msg ) {
						if ( msg && msg.data ) {
							var ref = config.referrer ? decodeURIComponent(config.referrer) : document.referrer;
							me.onlineHumanAgentCount = msg.data.onlineHumanAgentCount;
							me.onlineRobotAgentCount = msg.data.onlineRobotAgentCount;
							me.agentCount = me.onlineHumanAgentCount/1 + me.onlineRobotAgentCount/1;
						} else {
							me.session = null;
							me.getGreeting();
						}

						if ( !msg.data.serviceSession ) {
							//get greeting only when service session is not exist
							me.getGreeting();
						} else {
							me.session = msg.data.serviceSession;
							msg.data.serviceSession.visitorUser 
							&& msg.data.serviceSession.visitorUser.userId 
							&& easemobim.api('sendVisitorInfo', {
								tenantId: config.tenantId,
								visitorId: msg.data.serviceSession.visitorUser.userId,
								referer:  ref
							});//ref info
						}
					});
				}
            }
            , handleGroup: function () {
                this.handleChatContainer(config.toUser);
                this.chatWrapper = utils.$Dom(config.toUser);
            }
            , handleChatContainer: function ( userName ) {
                var curChatContainer = utils.$Dom(userName);

				this.setAgentProfile({
					userNickname: config.defaultAgentName,
                    avatar: config.tenantAvatar
				});
                if ( curChatContainer ) {
                    utils.removeClass(curChatContainer, 'em-hide');
                    utils.addClass(utils.siblings(curChatContainer, 'easemobWidget-chat'), 'em-hide');
                    utils.removeClass(utils.$Dom(config.toUser + '-transfer'), 'em-hide');
                } else {
                    curChatContainer = document.createElement('div');
                    curChatContainer.id = userName;
                    utils.addClass(curChatContainer, 'easemobWidget-chat');
                    utils.insertBefore(easemobim.imChatBody, curChatContainer, easemobim.imChatBody.childNodes[this.hasLogo ? 1 : 0]);

                    curChatContainer = document.createElement('div');
                    curChatContainer.id = config.toUser + '-transfer';
					utils.addClass(curChatContainer, 'easemobWidget-status-prompt');
                    easemobim.imChat.appendChild(curChatContainer);
                    curChatContainer = null;
                    this.handleChatContainer(userName);     
                }
            }
            , getMsgid: function ( msg ) {
                if ( msg ) {
                    if ( msg.ext && msg.ext.weichat ) {
                        return msg.ext.weichat.msgId;
                    }
                    return msg.msgId
                }
                return null;
            }
			, setKeyboard: function ( direction ) {
				var me = this;

				me.direction = direction;					
				switch ( direction ) {
					case 'up':
						easemobim.send.style.bottom = 'auto';
						easemobim.send.style.zIndex = '3';
						easemobim.send.style.top = '43px';
						easemobim.imChatBody.style.bottom = '0';
						easemobim.chatFaceWrapper.style.bottom = 'auto';
						easemobim.chatFaceWrapper.style.top = 43 + easemobim.send.getBoundingClientRect().height + 'px';
						break;
					case 'down':
						easemobim.send.style.bottom = '0';
						easemobim.send.style.zIndex = '3';
						easemobim.send.style.top = 'auto';
						easemobim.imChatBody.style.bottom = easemobim.send.getBoundingClientRect().height + 'px';
						easemobim.chatFaceWrapper.style.bottom = easemobim.send.getBoundingClientRect().height + 'px';
						easemobim.chatFaceWrapper.style.top = 'auto';
						me.scrollBottom(50);
						break;
				}
			}
            , setAgentProfile: function ( info ) {
                var nickName = utils.$Class('span.easemobWidgetHeader-nickname')[0],
                    avatar = utils.$Class('img.easemobWidgetHeader-portrait')[0];

                utils.html(nickName, info && info.userNickname ? info.userNickname : info && info.agentUserNiceName || config.defaultAgentName);

				this.currentAvatar = info && info.avatar ? utils.getAvatarsFullPath(info.avatar, config.domain) : config.tenantAvatar || config.defaultAvatar;
                if ( avatar.getAttribute('src') !== this.currentAvatar ) {
                    var cur = this.currentAvatar;

                    avatar.onload = function () {
                        avatar.style.opacity = '1';
                    };
					avatar.style.opacity = '0';
					avatar.setAttribute('src', cur);
                }
            }
            , setMinmum: function () {
                if ( !config.minimum || utils.root ) {
                    return;
                }
                var me = this,
					min = document.createElement('a');

                min.setAttribute('href', 'javascript:;');
                min.setAttribute('title', '关闭');
                utils.addClass(min, 'easemobWidgetHeader-min bg-color border-color');
                easemobim.dragHeader.appendChild(min);
                utils.on(min, 'mousedown touchstart', function () {
                    utils.root || transfer.send(easemobim.EVENTS.CLOSE, window.transfer.to);
					return false;
				});
                utils.on(min, 'mouseenter', function () {
                    utils.addClass(this, 'hover-color');
                });
                utils.on(min, 'mouseleave', function () {
                    utils.removeClass(this, 'hover-color');
                });
                min = null;
            }
			, setTheme: function () {
                var me = this;

				easemobim.api('getTheme', {
					tenantId: config.tenantId
				}, function ( msg ) {
					config.theme = msg.data && msg.data.length && msg.data[0].optionValue ? msg.data[0].optionValue : '天空之城';

					if ( !easemobim.THEME[config.theme] ) {
						config.theme = '天空之城';
					}

					var style = document.createElement('style');
					style.setAttribute('type', 'text/css');
					utils.html(style, easemobim.THEME[config.theme].css);
					var head = document.head || document.getElementsByTagName('head')[0];
					head.appendChild(style);
				});

            }
			, setLogo: function () {
				if ( !utils.$Class('div.easemobWidget-tenant-logo').length && config.logo ) {
					utils.html(this.chatWrapper, '<div class="easemobWidget-tenant-logo"><img src="' + config.logo + '"></div>' + utils.html(this.chatWrapper));
					this.hasLogo = true;
				}
			}
            , setNotice: function () {
                var me = this;

                if ( me.slogan || config.offDuty ) {
                    return;
                }

                easemobim.api('getSlogan', {
                    tenantId: config.tenantId
                }, function ( msg ) {
                    if ( msg.data && msg.data.length > 0 && msg.data[0].optionValue ) {
                        easemobim.imChatBody.style.top = '90px';
                        me.slogan = document.createElement('div');
                        utils.addClass(me.slogan, 'easemobWidget-word');

                        var slogan = Easemob.im.Utils.parseLink(msg.data[0].optionValue);
                        utils.html(me.slogan, "<span>" + slogan + "</span><a class='easemobWidget-word-close' href='javascript:;'></a>");
                        easemobim.imChat.appendChild(me.slogan);

                        //关闭广告语按钮
                        utils.on(utils.$Class('a.easemobWidget-word-close'), utils.click, function () {
                            utils.addClass(me.slogan, 'em-hide');
                            easemobim.imChatBody.style.top = '43px';
                        });
                    }
                });
            }
			//fill emotions async
            , fillFace: function () {
                if ( utils.html(easemobim.chatFaceWrapper.getElementsByTagName('ul')[0]) ) {
                    return;
                }

				var faceStr = '',
					count = 0,
					me = this;

                utils.on(easemobim.faceBtn, 'mouseenter', function () {
                    utils.isMobile || utils.addClass(this, 'theme-color');
                })
                utils.on(easemobim.faceBtn, 'mouseleave', function () {
                    utils.isMobile || utils.removeClass(this, 'theme-color');
                });
                utils.on(easemobim.faceBtn, utils.click, function () {
					easemobim.textarea.blur();
                    utils.hasClass(easemobim.chatFaceWrapper, 'em-hide')
                    ? utils.removeClass(easemobim.chatFaceWrapper, 'em-hide')
                    : utils.addClass(easemobim.chatFaceWrapper, 'em-hide')

					if ( faceStr ) return false;
					faceStr = '<li class="e-face">';
					utils.each(Easemob.im.EMOTIONS.map, function ( k, v ) {
						count += 1;
						faceStr += ["<div class='easemobWidget-face-bg e-face'>",
										"<img class='easemobWidget-face-img e-face em-emotion' ",
											"src='" + Easemob.im.EMOTIONS.path + v + "' ",
											"data-value=" + k + " />",
									"</div>"].join('');
						if ( count % 7 === 0 ) {
							faceStr += '</li><li class="e-face">';
						}
					});
					if ( count % 7 === 0 ) {
						faceStr = faceStr.slice(0, -('<li class="e-face">').length);
					} else {
						faceStr += '</li>';
					}

					utils.html(easemobim.chatFaceWrapper.getElementsByTagName('ul')[0], faceStr);
                });

                //表情的选中
                utils.live('img.em-emotion', utils.click, function ( e ) {
                    !utils.isMobile && easemobim.textarea.focus();
                    easemobim.textarea.value = easemobim.textarea.value + this.getAttribute('data-value');
                    if ( utils.isMobile ) {
                        me.autoGrowOptions.update();//update autogrow
                        setTimeout(function () {
                            easemobim.textarea.scrollTop = 10000;
                        }, 100);
                    }
                    me.readyHandled && utils.removeClass(easemobim.sendBtn, 'disabled');
                }, easemobim.chatFaceWrapper);
            }
            , errorPrompt: function ( msg, isAlive ) {//暂时所有的提示都用这个方法
                var me = this;

                if ( !me.ePrompt ) {
                    me.ePrompt = document.createElement('p');
                    me.ePrompt.className = 'easemobWidget-error-prompt em-hide';
                    utils.html(me.ePrompt, '<span></span>');
                    easemobim.imChat.appendChild(me.ePrompt);
                    me.ePromptContent = me.ePrompt.getElementsByTagName('span')[0];
                }
                
                utils.html(me.ePromptContent, msg);
                utils.removeClass(me.ePrompt, 'em-hide');
                isAlive || setTimeout(function(){
                    utils.html(me.ePromptContent, '');
                    utils.addClass(me.ePrompt, 'em-hide');
                }, 2000);
            }
            , setOffline: function ( isOffDuty ) {
                var me = this;

                switch ( config.offDutyType ) {
                    case 'note':// show note
                        if ( easemobim.leaveMessage ) {
                            this.slogan && utils.addClass(this.slogan, 'em-hide');
                            //utils.addClass(easemobim.imBtn.getElementsByTagName('a')[0], 'easemobWidget-offline-bg');
                            utils.removeClass(easemobim.leaveMessage.dom, 'em-hide');
                            utils.addClass(easemobim.imChatBody, 'em-hide');
                            utils.addClass(easemobim.send, 'em-hide');
                            easemobim.leaveMessage.show(isOffDuty);
                        }            
                        break;
                    case 'none':// disable note & msg
                        
                        utils.addClass(easemobim.mobileNoteBtn, 'em-hide');
					    utils.addClass(utils.$Class('i.easemobWidgetHeader-keyboard'), 'em-hide');
                        easemobim.textarea.blur();

                        var msg = new Easemob.im.EmMessage('txt');
                        msg.set({ value: config.offDutyWord });
                        setTimeout(function () {
                            me.appendMsg(config.toUser, config.user.username, msg);
                        }, 1000);
                        utils.addClass(easemobim.send, 'easemobWidget-send-disable');
                        break;
                    default:break;
                }


                
            }
			//close chat window
            , close: function () {
                this.opened = false;

				if ( !config.hide ) {
					utils.addClass(easemobim.imChat, 'em-hide');
					setTimeout(function () {
						utils.removeClass(easemobim.imBtn, 'em-hide');
					}, 60);
				}
            }
			//show chat window
            , show: function () {
				var me = this;

                me.opened = true;
                me.fillFace();
                me.scrollBottom(50);
                utils.addClass(easemobim.imBtn, 'em-hide');
                utils.removeClass(easemobim.imChat, 'em-hide');
                try { easemobim.textarea.focus(); } catch ( e ) {}
				me.resetPrompt();
            }
            , sdkInit: function () {
                this.channel.listen();
            }
            , appendDate: function ( date, to, isHistory ) {
                var chatWrapper = utils.$Dom(to || config.toUser),
                    dom = document.createElement('div'),
                    fmt = 'M月d日 hh:mm';

                if ( !chatWrapper ) {
                    return;
                }
                utils.html(dom, new Date(date).format(fmt));
                utils.addClass(dom, 'easemobWidget-date');
                if ( !isHistory ) {
                    if ( !this.msgTimeSpan[to] || (date - this.msgTimeSpan[to] > 60000) ) {//间隔大于1min  show
                        chatWrapper.appendChild(dom); 
                    }
                    this.resetSpan(to);
                } else {
                    utils.insertBefore(chatWrapper, dom, chatWrapper.getElementsByTagName('div')[this.hasLogo ? 1 : 0]);
                }
            }
            , resetSpan: function ( id ) {
                this.msgTimeSpan[id] = new Date().getTime();
            }
            , open: function () {
				var me = this;

				var op = {
					user: config.user.username
					, appKey: config.appKey
					, apiUrl: (utils.ssl ? 'https://' : 'http://') + config.restServer
				};

				if ( config.user.token ) {
					op.accessToken = config.user.token;
				} else {
					op.pwd = config.user.password;
				}

				me.conn.open(op);
            }
            , soundReminder: function () {
                var me = this;

                //if lte ie 8 , return
                if ( (utils.getIEVersion && utils.getIEVersion < 9) || utils.isMobile || !config.soundReminder ) {
                    me.soundReminder = function () {};
                    return;
                }

                me.reminder = document.createElement('a');
                me.reminder.setAttribute('href', 'javascript:;');
                utils.addClass(me.reminder, 'easemobWidgetHeader-audio theme-color');
                easemobim.dragHeader.appendChild(me.reminder);

                //音频按钮静音
                utils.on(me.reminder, 'mousedown touchstart', function () {
                    me.silence = me.silence ? false : true;
                    utils.hasClass(me.reminder, 'easemobWidgetHeader-silence') 
                    ? utils.removeClass(me.reminder, 'easemobWidgetHeader-silence') 
                    : utils.addClass(me.reminder, 'easemobWidgetHeader-silence');

                    return false;
                });

                if ( window.HTMLAudioElement ) {
                    var ast = 0;
                    
                    me.audio = document.createElement('audio');
                    me.audio.src = config.staticPath + '/mp3/msg.m4a';
                    me.soundReminder = function () {
                        if ( (utils.isMin() ? false : me.opened) || ast !== 0 || me.silence ) {
                            return;
                        }
                        ast = setTimeout(function() {
                            ast = 0;
                        }, 3000);
                        me.audio.play();
                    };
                }
            }
            , setThemeBackground: function ( obj ) {
                utils.isMobile || utils.addClass(obj, 'bg-color');
            }
            , clearThemeBackground: function ( obj ) {
                utils.isMobile || utils.removeClass(obj, 'bg-color');
            }
            , setThemeColor: function ( obj ) {
                utils.isMobile || utils.addClass(obj, 'theme-color');
            }
            , clearThemeColor: function ( obj ) {
                utils.isMobile || utils.removeClass(obj, 'theme-color');
            }
            , bindEvents: function () {
                var me = this;

				utils.live('i.easemobWidgetHeader-keyboard', utils.click, function () {
					if ( utils.hasClass(this, 'easemobWidgetHeader-keyboard-up') ) {
						utils.addClass(this, 'easemobWidgetHeader-keyboard-down');
						utils.removeClass(this, 'easemobWidgetHeader-keyboard-up');
						me.setKeyboard('down');
					} else {
						utils.addClass(this, 'easemobWidgetHeader-keyboard-up');
						utils.removeClass(this, 'easemobWidgetHeader-keyboard-down');
						me.setKeyboard('up');
					}
				});
				
				!utils.isMobile && !utils.root && utils.on(easemobim.imBtn, utils.click, function () {
				    transfer.send(easemobim.EVENTS.SHOW, window.transfer.to);
				});
				utils.on(easemobim.imChatBody, utils.click, function () {
					easemobim.textarea.blur();
					return false;
				});
                utils.on(document, 'mouseover', function () {
					utils.root || transfer.send(easemobim.EVENTS.RECOVERY, window.transfer.to);
                });
				utils.live('img.easemobWidget-imgview', 'click', function () {
					easemobim.imgView.show(this.getAttribute('src'));
                });
                utils.live('button.easemobWidget-list-btn', 'mouseover', function () {
                    me.setThemeBackground(this);
                });
                utils.live('button.easemobWidget-list-btn', 'mouseout', function () {
                    me.clearThemeBackground(this);
                });
                utils.on(easemobim.sendFileBtn, 'mouseenter', function () {
                    me.setThemeColor(this);
                });
                utils.on(easemobim.sendFileBtn, 'mouseleave', function () {
                    me.clearThemeColor(this);
                });
                utils.on(easemobim.noteBtn, 'mouseenter', function () {
                    me.setThemeColor(this);
                });
                utils.on(easemobim.noteBtn, 'mouseleave', function () {
                    me.clearThemeColor(this);
                });

				if ( config.dragenable ) {//drag
					
					easemobim.dragBar.style.cursor = 'move';

					utils.isMobile || utils.on(easemobim.dragBar, 'mousedown', function ( ev ) {
						var e = window.event || ev;
						easemobim.textarea.blur();//ie a  ie...
						easemobim.EVENTS.DRAGREADY.data = { x: e.clientX, y: e.clientY };
                        utils.root || transfer.send(easemobim.EVENTS.DRAGREADY, window.transfer.to);
						return false;
					}, false);
				}

                //pc 和 wap 的上滑加载历史记录的方法
                (function () {
                    var st,
                        _startY,
                        _y,
                        touch;

                    //wap
                    utils.live('div.easemobWidget-date', 'touchstart', function ( ev ) {
                        var e = ev || window.event,
                            touch = e.touches;

                        if ( e.touches && e.touches.length > 0 ) {
                            _startY = touch[0].pageY;
                        }
                    });
                    utils.live('div.easemobWidget-date', 'touchmove', function ( ev ) {
                        var e = ev || window.event,
                            touch = e.touches;

                        if ( e.touches && e.touches.length > 0 ) {
                            _y = touch[0].pageY;
                            if ( _y - _startY > 8 && this.getBoundingClientRect().top >= 0 ) {
                                clearTimeout(st);
                                st = setTimeout(function () {
                                    me.getHistory(true);
                                }, 100);
                            }
                        }
                    });

                    //pc
                    var getHis = function ( ev ) {
                        var e = ev || window.event,
                            touch = e.touches,
                            that = this;

                        if ( e.wheelDelta / 120 > 0 || e.detail < 0 ) {
                            clearTimeout(st);
                            st = setTimeout(function () {
                                if ( that.getBoundingClientRect().top >= 0 ) {
                                    me.getHistory(true);
                                }
                            }, 400);
                        }
                    };
                    utils.live('div.easemobWidget-chat', 'mousewheel', getHis);
                    utils.live('div.easemobWidget-chat', 'DOMMouseScroll', getHis);
                }());

                //resend
                utils.live('div.easemobWidget-msg-status', utils.click, function () {
                    var id = this.getAttribute('id').slice(0, -7);

                    utils.addClass(this, 'em-hide');
                    utils.removeClass(utils.$Dom(id + '_loading'), 'em-hide');
                    me.conn.send(id);
                });

				utils.live('button.js_robertTransferBtn', utils.click,  function () {
                    var that = this;

                    me.transferToKf(that.getAttribute('data-id'), that.getAttribute('data-sessionid'));
                    return false;
                });

                //机器人列表
                utils.live('button.js_robertbtn', utils.click, function () {
                    var that = this;

                    me.sendTextMsg(utils.html(that), null, {
                        msgtype: {
                            choice: { menuid: that.getAttribute('data-id') }
                        }
                    });
                    return false;
                });
                
                var handleSendBtn = function () {
                    if ( !me.readyHandled ) {
                        utils.hasClass(easemobim.sendBtn, 'disabled') || utils.addClass(easemobim.sendBtn, 'disabled');
                        return false;
                    }
                    easemobim.textarea.value ? utils.removeClass(easemobim.sendBtn, 'disabled') : utils.addClass(easemobim.sendBtn, 'disabled');
                };

                utils.on(easemobim.textarea, 'keyup', handleSendBtn);
                utils.on(easemobim.textarea, 'change', handleSendBtn);
                utils.on(easemobim.textarea, 'input', handleSendBtn);
                
                if ( utils.isMobile ) {
                    var handleFocus = function () {
						easemobim.textarea.style.overflowY = 'auto';
						me.scrollBottom(800);
						clearInterval(me.focusText);
						me.focusText = setInterval(function () {
							document.body.scrollTop = 10000;
						}, 100);
					};
                    utils.on(easemobim.textarea, 'input', function () {
                        me.autoGrowOptions.update();
                        me.scrollBottom(800);
                    });
                    utils.on(easemobim.textarea, 'focus', handleFocus);
                    utils.one(easemobim.textarea, 'touchstart', handleFocus);
                    utils.on(easemobim.textarea, 'blur', function () {
                        clearInterval(me.focusText);
                    });
                }

                //选中文件并发送
                utils.on(easemobim.realFile, 'change', function () {
                    easemobim.realFile.value && me.sendImgMsg();
                });

                //hide face wrapper
                utils.on(document, utils.click, function ( ev ) {
                    var e = window.event || ev,
                        t = e.srcElement || e.target;

                    if ( !utils.hasClass(t, 'e-face') ) {
                        utils.addClass(easemobim.chatFaceWrapper, 'em-hide');
                    }
                });

				utils.on(easemobim.sendFileBtn, 'touchend', function () {
                    easemobim.textarea.blur();
                });
                //弹出文件选择框
                utils.on(easemobim.sendFileBtn, 'click', function () {
                    if ( !me.readyHandled ) {
                        me.errorPrompt('正在连接中...');
                        return false;
                    }
                    if ( !Easemob.im.Utils.isCanUploadFileAsync ) {
                        me.errorPrompt('当前浏览器需要安装flash发送图片');
                        return false;    
                    }
                    easemobim.realFile.click();
                });

                //显示留言界面
                utils.on(easemobim.noteBtn, 'click', function () {
                    easemobim.leaveMessage.show();
                });
                utils.on(easemobim.mobileNoteBtn, 'click', function () {
                    easemobim.leaveMessage.show();
                });

                //hot key
                utils.on(easemobim.textarea, 'keydown', function ( evt ) {
                    var that = this;
                    if ( (utils.isMobile && evt.keyCode === 13) 
                        || (evt.ctrlKey && evt.keyCode === 13) 
                        || (evt.shiftKey && evt.keyCode === 13) ) {

                        that.value = that.value + '\n';
                        return false;
                    } else if ( evt.keyCode === 13 ) {
                        utils.addClass(easemobim.chatFaceWrapper, 'em-hide');
                        if ( utils.hasClass(easemobim.sendBtn, 'disabled') ) {
                            return false;
                        }
                        me.sendTextMsg();
                        setTimeout(function(){
                            that.value = '';
                        }, 0);
                    }
                });

                utils.on(easemobim.sendBtn, 'click', function () {
                    if ( utils.hasClass(this, 'disabled') ) {
                        return false;
                    }
                    utils.addClass(easemobim.chatFaceWrapper, 'em-hide');
                    me.sendTextMsg();
                    if ( utils.isMobile ) {
                        easemobim.textarea.style.height = '34px';
                        easemobim.textarea.style.overflowY = 'hidden';
                        me.direction === 'up' || (easemobim.imChatBody.style.bottom = '43px');
                        easemobim.textarea.focus();
                    }
                    return false;
                });
            }
            , scrollBottom: function ( wait ) {
                var ocw = easemobim.imChatBody;

                wait 
                ? (clearTimeout(this.scbT), this.scbT = setTimeout(function () {
                    ocw.scrollTop = ocw.scrollHeight - ocw.offsetHeight + 10000;
                }, wait))
                : (ocw.scrollTop = ocw.scrollHeight - ocw.offsetHeight + 10000);
            }
			//send image message function
            , sendImgMsg: function ( file, isHistory ) {
                this.channel.send('img', file, isHistory);
            }
			//send file message function
			, sendFileMsg: function ( file, isHistory ) {
                this.channel.send('file', file, isHistory);
            }
            , handleTransfer: function ( action, info, robertToHubman ) {
                if ( config.hideStatus ) { return; }
                var wrap = utils.$Dom(config.toUser + '-transfer');

                config.agentList = config.agentList || {};
                config.agentList[config.toUser] = config.agentList[config.toUser] || {};

                var res = robertToHubman ? this.onlineHumanAgentCount < 1 : (!this.session && this.agentCount < 1);
				if ( res ) {
					utils.addClass(wrap, 'none');
					utils.removeClass(wrap, 'transfer');
					utils.removeClass(wrap, 'link');
					utils.removeClass(wrap, 'em-hide');
					this.handleMobileHeader();
				} else if ( action === 'sending' ) {
					if ( config.offDuty || this.session || config.agentName ) { return; }

                    if ( !config.agentList[config.toUser].firstMsg && !this.chatWrapper.getAttribute('data-session') ) {
                        config.agentList[config.toUser].firstMsg = true;
						utils.addClass(wrap, 'link');
						utils.removeClass(wrap, 'transfer');
						utils.removeClass(wrap, 'none');
                        utils.removeClass(wrap, 'em-hide');
                    }
					this.handleMobileHeader();
                } else if ( action === 'transfer' ) {
                    utils.addClass(wrap, 'transfer');
                    utils.removeClass(wrap, 'link');
                    utils.removeClass(wrap, 'none');
                    utils.removeClass(wrap, 'em-hide');
					this.handleMobileHeader();
                } else if ( action === 'reply' ) {
                    utils.addClass(wrap, 'em-hide');

                    if ( info && info.userNickname ) {
                        this.setAgentProfile({
                            userNickname: info.userNickname,
                            avatar: info.avatar
                        });
                    }
					if ( utils.isMobile ) {
						utils.removeClass(easemobim.dragHeader.getElementsByTagName('img')[0], 'em-hide');
						utils.removeClass(easemobim.dragHeader.getElementsByTagName('span')[0], 'em-hide');
					}
                }
            }
			, handleMobileHeader: function () {
				if ( utils.isMobile ) {
					utils.addClass(easemobim.dragHeader.getElementsByTagName('img')[0], 'em-hide');
					utils.addClass(easemobim.dragHeader.getElementsByTagName('span')[0], 'em-hide');
				}
			}
			//消息上屏
            , appendMsg: function ( from, to, msg, isHistory ) {
                var isSelf = from == config.user.username && (from || config.user.username),
					me = this,
                    curWrapper = me.chatWrapper;

                var div = document.createElement('div');
                div.className = 'emim-clear emim-mt20 emim-tl emim-msg-wrapper ';
                div.className += isSelf ? 'emim-fr' : 'emim-fl';
                utils.html(div, msg.get(!isSelf));

                if ( isHistory ) {
                    utils.insertBefore(curWrapper, div, curWrapper.childNodes[me.hasLogo ? 1 : 0]);
                } else {
                    curWrapper.appendChild(div);
					me.scrollBottom(utils.isMobile ? 800 : null);
                }
				var imgList = utils.$Class('img.easemobWidget-imgview', div),
					img = imgList.length > 0 ? imgList[0] : null;
					
				if ( img ) {
					utils.on(img, 'load', function () {
						me.scrollBottom();
						img = null;
					});
				}
                div = null;
            }
			//send text message function
            , sendTextMsg: function ( message, isHistory, ext ) {
                this.channel.send('txt', message, isHistory, ext);
            }
			, transferToKf: function ( id, sessionId ) {
                var me = this;

				var msg = new Easemob.im.EmMessage('cmd');
				msg.set({
                    to: config.toUser
					, action: 'TransferToKf'
                    , ext: {
                        weichat: {
                            ctrlArgs: {
                                id: id,
								serviceSessionId: sessionId,
                            }
                        }
                    }
                });
                me.conn.send(msg.body);
                me.handleTransfer('sending', null, true);
            }
			//send satisfaction evaluation message function
            , sendSatisfaction: function ( level, content, session, invite ) {
                this.channel.send('satisfaction', level, content, session, invite);
            }
			//未读消息提醒
            , messagePrompt: function ( message ) {

				if ( utils.isMobile ) {
					return;
				}

				var me = this;

				if ( !me.opened ) {
					utils.removeClass(utils.html(easemobim.messageCount, ''), 'em-hide');
					me.msgCount += 1;

					if ( me.msgCount > 9 ) {
						utils.html(utils.addClass(easemobim.messageCount, 'mutiCount'), '\…');
					} else {
						utils.html(utils.removeClass(easemobim.messageCount, 'mutiCount'), me.msgCount);
					}

				} else {
					me.resetPrompt();
				}

				if ( utils.isMin() || !me.opened ) {
					me.soundReminder();
					easemobim.EVENTS.NOTIFY.data = {
						avatar: this.currentAvatar,
						title: '新消息',
						brief: message.brief
					};
					utils.root || transfer.send(easemobim.EVENTS.SLIDE, window.transfer.to);
					utils.root || transfer.send(easemobim.EVENTS.NOTIFY, window.transfer.to);
				}
            }
			, resetPrompt: function () {
				this.msgCount = 0;
				utils.addClass(utils.html(easemobim.messageCount, ''), 'em-hide');
				utils.root || transfer.send(easemobim.EVENTS.RECOVERY, window.transfer.to);
			}
			//receive message function
            , receiveMsg: function ( msg, type, isHistory ) {
                if ( config.offDuty ) {
                    return;
                }

                this.channel.handleReceive(msg, type, isHistory);
            }
        };
    };



	/**
	 * 调用指定接口获取数据
	*/
	easemobim.api = function ( apiName, data, success, error ) {
		//cache
		easemobim.api[apiName] = easemobim.api[apiName] || {};

		var ts = new Date().getTime();
		easemobim.api[apiName][ts] = {
            success: success,
            error: error
        };
		easemobim.getData
		.send({
			api: apiName
			, data: data
			, timespan: ts
		})
		.listen(function ( msg ) {
			if ( easemobim.api[msg.call] && easemobim.api[msg.call][msg.timespan] ) {

				var callback = easemobim.api[msg.call][msg.timespan];
				delete easemobim.api[msg.call][msg.timespan];

                if ( msg.status !== 0 ) {
                    typeof callback.error === 'function' && callback.error(msg);
                } else {
                    typeof callback.success === 'function' && callback.success(msg);
                }
			}
		}, ['api']);
	};
}());
