(function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.dd = t() : e.dd = t()
}
)(this, function() {
    return function(e) {
        function t(r) {
            if (n[r])
                return n[r].exports;
            var o = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(o.exports, o, o.exports, t),
            o.l = !0,
            o.exports
        }
        var n = {};
        return t.m = e,
        t.c = n,
        t.i = function(e) {
            return e
        }
        ,
        t.d = function(e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }
        ,
        t.n = function(e) {
            var n = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return t.d(n, "a", n),
            n
        }
        ,
        t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        t.p = "",
        t(t.s = 917)
    }([function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.ddSdk = void 0;
        var r = n(4)
          , o = n(4);
        Object.defineProperty(t, "ENV_ENUM", {
            enumerable: !0,
            get: function() {
                return o.ENV_ENUM
            }
        }),
        Object.defineProperty(t, "ENV_ENUM_SUB", {
            enumerable: !0,
            get: function() {
                return o.ENV_ENUM_SUB
            }
        });
        var i = n(2);
        n(253),
        t.ddSdk = new i.Sdk(r.getENV())
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.genBizStoreParamsDealFn = t.genBoolResultDealFn = t.forceChangeParamsDealFn = t.genDefaultParamsDealFn = t.addDefaultCorpIdParamsDeal = t.addWatchParamsDeal = void 0,
        t.addWatchParamsDeal = function(e) {
            var t = Object.assign({}, e);
            return t.watch = !0,
            t
        }
        ,
        t.addDefaultCorpIdParamsDeal = function(e) {
            var t = Object.assign({}, e);
            return t.corpId = "corpId",
            t
        }
        ,
        t.genDefaultParamsDealFn = function(e) {
            var t = Object.assign({}, e);
            return function(e) {
                return Object.assign({}, t, e)
            }
        }
        ,
        t.forceChangeParamsDealFn = function(e) {
            var t = Object.assign({}, e);
            return function(e) {
                return Object.assign(e, t)
            }
        }
        ,
        t.genBoolResultDealFn = function(e) {
            return function(t) {
                var n = Object.assign({}, t);
                return e.forEach(function(e) {
                    void 0 !== n[e] && (n[e] = !!n[e])
                }),
                n
            }
        }
        ,
        t.genBizStoreParamsDealFn = function(e) {
            var t = Object.assign({}, e);
            return "string" != typeof t.params ? (t.params = JSON.stringify(t),
            t) : t
        }
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
            var n = e && e.vs;
            return "object" == typeof n && t.platformSub ? n[t.platformSub] : "string" == typeof n ? n : void 0
        }
        var o = this && this.__assign || function() {
            return o = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++) {
                    t = arguments[n];
                    for (var o in t)
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                }
                return e
            }
            ,
            o.apply(this, arguments)
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.Sdk = t.getTargetApiConfigVS = t.LogLevel = t.APP_TYPE = t.isFunction = t.compareVersion = t.ENV_ENUM_SUB = t.ENV_ENUM = void 0;
        var i = n(10);
        Object.defineProperty(t, "APP_TYPE", {
            enumerable: !0,
            get: function() {
                return i.APP_TYPE
            }
        }),
        Object.defineProperty(t, "LogLevel", {
            enumerable: !0,
            get: function() {
                return i.LogLevel
            }
        }),
        Object.defineProperty(t, "isFunction", {
            enumerable: !0,
            get: function() {
                return i.isFunction
            }
        }),
        Object.defineProperty(t, "compareVersion", {
            enumerable: !0,
            get: function() {
                return i.compareVersion
            }
        }),
        Object.defineProperty(t, "ENV_ENUM", {
            enumerable: !0,
            get: function() {
                return i.ENV_ENUM
            }
        }),
        Object.defineProperty(t, "ENV_ENUM_SUB", {
            enumerable: !0,
            get: function() {
                return i.ENV_ENUM_SUB
            }
        });
        var a = n(260)
          , d = n(9);
        t.getTargetApiConfigVS = r;
        var s = function() {
            function e(e) {
                var t = this;
                this.configJsApiList = [],
                this.hadConfig = !1,
                this.devConfig = {
                    debug: !1
                },
                this.invokeAPIConfigMapByMethod = {},
                this.p = {},
                this.config$ = new Promise(function(e, n) {
                    t.p.reject = n,
                    t.p.resolve = e
                }
                ),
                this.apiHandler = new a.ApiHandler,
                this.platformConfigMap = {},
                this.isBridgeDrity = !0,
                this.getExportSdk = function() {
                    return t.exportSdk
                }
                ,
                this.setAPI = function(e, n) {
                    t.invokeAPIConfigMapByMethod[e] = Object.assign(t.invokeAPIConfigMapByMethod[e] || {}, n)
                }
                ,
                this.setPlatform = function(e) {
                    t.isBridgeDrity = !0,
                    t.platformConfigMap[e.platform] = t.withDefaultEvent(e),
                    e.platform === t.env.platform && e.bridgeInit().catch(function(e) {
                        d.formatLog(d.diagnosticMessageMap.auto_bridge_init_error, null === e || void 0 === e ? void 0 : e.toString())
                    })
                }
                ,
                this.getPlatformConfigMap = function() {
                    return t.platformConfigMap
                }
                ,
                this.deleteApiConfig = function(e, n) {
                    var r = t.invokeAPIConfigMapByMethod[e];
                    r && delete r[n]
                }
                ,
                this.invokeAPI = function(e, n, r) {
                    return void 0 === n && (n = {}),
                    void 0 === r && (r = !0),
                    t.apiHandler.start({
                        method: e,
                        params: n,
                        isAuthApi: r
                    })
                }
                ,
                this.withDefaultEvent = function(e) {
                    var t = Object.assign({
                        on: function() {
                            return d.formatLog(d.diagnosticMessageMap.not_support_event_on)
                        },
                        off: function() {
                            return d.formatLog(d.diagnosticMessageMap.not_support_event_off)
                        }
                    }, e.event);
                    return o(o({}, e), {
                        event: t
                    })
                }
                ,
                this.env = e,
                this.bridgeInitFn = function() {
                    if (t.bridgeInitFnPromise && !t.isBridgeDrity)
                        return t.bridgeInitFnPromise;
                    t.isBridgeDrity = !1;
                    var n = t.platformConfigMap[e.platform];
                    if (n)
                        t.bridgeInitFnPromise = n.bridgeInit().catch(function(e) {
                            return d.formatLog(d.diagnosticMessageMap.JsBridge_init_fail),
                            Promise.reject(e)
                        });
                    else {
                        var r = d.formatLog(d.diagnosticMessageMap.not_support_env, e.platform);
                        t.bridgeInitFnPromise = Promise.reject(new Error(r))
                    }
                    return t.bridgeInitFnPromise
                }
                ;
                var n = function(e) {
                    void 0 === e && (e = {}),
                    t.devConfig = Object.assign(t.devConfig, e),
                    e.extraPlatform && t.setPlatform(e.extraPlatform)
                };
                this.exportSdk = {
                    config: function(r) {
                        void 0 === r && (r = {});
                        var o = !0;
                        Object.keys(r).forEach(function(e) {
                            -1 === ["debug", "usePromise"].indexOf(e) && (o = !1)
                        }),
                        o ? (d.formatLog(d.diagnosticMessageMap.config_debug_deprecated),
                        n(r)) : t.hadConfig ? d.formatLog(d.diagnosticMessageMap.repeat_config) : (r.jsApiList && (t.configJsApiList = r.jsApiList),
                        t.hadConfig = !0,
                        t.bridgeInitFn().then(function(n) {
                            var o = t.platformConfigMap[e.platform]
                              , i = r;
                            o.authParamsDeal && (i = o.authParamsDeal(i)),
                            n(o.authMethod, i).then(function(e) {
                                t.isReady = !0,
                                t.p.resolve(e)
                            }).catch(function(e) {
                                t.isReady = !1,
                                t.p.reject(e)
                            })
                        }, function(e) {
                            d.formatLog(d.diagnosticMessageMap.JsBridge_init_fail_dd_config),
                            t.p.reject(e)
                        }))
                    },
                    devConfig: n,
                    ready: function(e) {
                        !1 === t.hadConfig ? (d.formatLog(d.diagnosticMessageMap.dd_config_wrap_deprecated),
                        t.bridgeInitFn().then(function() {
                            e()
                        })) : t.config$.then(function(t) {
                            e()
                        })
                    },
                    error: function(e) {
                        t.config$.catch(function(t) {
                            e(t)
                        })
                    },
                    on: function(n, r) {
                        t.bridgeInitFn().then(function() {
                            var o;
                            null === (o = t.platformConfigMap[e.platform].event) || void 0 === o || o.on(n, r)
                        })
                    },
                    off: function(n, r) {
                        t.bridgeInitFn().then(function() {
                            var o;
                            null === (o = t.platformConfigMap[e.platform].event) || void 0 === o || o.off(n, r)
                        })
                    },
                    env: e,
                    checkJsApi: function(n) {
                        void 0 === n && (n = {});
                        var o = {};
                        return n.jsApiList && n.jsApiList.forEach(function(n) {
                            var a = t.invokeAPIConfigMapByMethod[n];
                            if (a) {
                                var d = a[e.platform]
                                  , s = r(d, e);
                                s && e.version && i.compareVersion(e.version, s) && (o[n] = !0)
                            }
                            o[n] || (o[n] = !1)
                        }),
                        Promise.resolve(o)
                    },
                    _invoke: function(e, n) {
                        return void 0 === n && (n = {}),
                        t.invokeAPI(e, n, !1)
                    }
                },
                this.initApiMiddleware()
            }
            return e.prototype.useApiMiddleware = function(e) {
                if (!i.isFunction(e))
                    throw TypeError("middleware must be a function");
                this.apiHandler.use(e)
            }
            ,
            e.prototype.initApiMiddleware = function() {
                this.apiHandler.use(a.bridge.bind(this)),
                this.apiHandler.use(a.retry.bind(this)),
                this.apiHandler.use(a.dealParamsAndResult.bind(this)),
                this.apiHandler.use(a.checkConfig.bind(this)),
                this.apiHandler.use(a.initBridge.bind(this)),
                this.apiHandler.use(a.hookBeforeAndAfter.bind(this))
            }
            ,
            e
        }();
        t.Sdk = s
    }
    , function(e, t, n) {
        "use strict";
        var r = n(12);
        n(264),
        e.exports = r
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getENV = t.getUA = void 0;
        var r = n(2)
          , o = n(2);
        Object.defineProperty(t, "ENV_ENUM", {
            enumerable: !0,
            get: function() {
                return o.ENV_ENUM
            }
        }),
        Object.defineProperty(t, "APP_TYPE", {
            enumerable: !0,
            get: function() {
                return o.APP_TYPE
            }
        }),
        Object.defineProperty(t, "ENV_ENUM_SUB", {
            enumerable: !0,
            get: function() {
                return o.ENV_ENUM_SUB
            }
        });
        var i, a = n(250), d = function() {
            try {
                if ("undefined" != typeof window && void 0 !== window.top) {
                    return window.top.__dingtalk_jsapi_top_platfrom_config__
                }
            } catch (e) {
                return
            }
        };
        (function(e) {
            e.singlePage = "singlePage",
            e.miniApp = "miniApp",
            e.miniWidget = "miniWidget"
        }
        )(i || (i = {})),
        t.getUA = function() {
            var e = "";
            try {
                "undefined" != typeof navigator && (e = navigator && (navigator.userAgent || navigator.swuserAgent) || "")
            } catch (t) {
                e = ""
            }
            return e
        }
        ,
        t.getENV = function() {
            var e, n, o = t.getUA(), s = /iPhone|iPad|iPod|iOS/i.test(o), u = /Android/i.test(o), c = /dingtalk/i.test(o), l = /dd-web/i.test(o), v = "object" == typeof nuva, f = "object" == typeof dd && "function" == typeof dd.dtBridge, p = /TaurusApp/.test(o), _ = p && !c, E = p && c, N = _ && "undefined" != typeof my && null !== my && void 0 !== my.alert, P = p && /dingtalk-win/.test(o), h = !P && _ && s, M = !P && _ && u, m = !P && E && s, g = !P && E && u, b = f && s || v && s, k = c || a.default.isdingtalk, y = s && k || a.default.isWeexiOS || b, I = u && k || a.default.isWeexAndroid, A = f, S = l, $ = r.APP_TYPE.WEB;
            if (N)
                $ = r.APP_TYPE.MINI_APP;
            else if (S)
                $ = r.APP_TYPE.WEBVIEW_IN_MINIAPP;
            else if (A)
                $ = r.APP_TYPE.MINI_APP;
            else if (a.default.isWeexiOS || a.default.isWeexAndroid)
                try {
                    var U = weex.config.ddWeexEnv;
                    $ = U === i.miniWidget ? r.APP_TYPE.WEEX_WIDGET : r.APP_TYPE.WEEX
                } catch (e) {
                    $ = r.APP_TYPE.WEEX
                }
            var V, O = "*", w = o.match(/AliApp\(\w+\/([a-zA-Z0-9.-]+)\)/);
            null === w && (w = o.match(/dingtalk\/([a-zA-Z0-9.-]+)/));
            var j;
            w && w[1] && (j = w[1]);
            var C = "";
            "undefined" != typeof name && (C = name);
            var D = d();
            try {
                D && "undefined" != typeof window && void 0 !== window.top && window.top !== window && (C = top.name)
            } catch (e) {}
            if (C)
                try {
                    var T = JSON.parse(C);
                    T.hostVersion && (j = T.hostVersion),
                    O = T.language || navigator.language || "*",
                    V = T.containerId
                } catch (e) {}
            var R = !!V || "undefined" != typeof window && (null === (n = null === (e = null === window || void 0 === window ? void 0 : window.dingtalk) || void 0 === e ? void 0 : e.platform) || void 0 === n ? void 0 : n.invokeAPI);
            R && !j && (w = o.match(/dingtalk\(([a-zA-Z0-9\.-]+)\)/)) && w[1] && (j = w[1]);
            var F, x = r.ENV_ENUM_SUB.noSub;
            if (P ? (F = r.ENV_ENUM.gdtPc,
            x = r.ENV_ENUM_SUB.win) : F = h ? r.ENV_ENUM.gdtIos : M ? r.ENV_ENUM.gdtAndroid : m ? r.ENV_ENUM.gdtStandardIos : g ? r.ENV_ENUM.gdtStandardAndroid : y ? r.ENV_ENUM.ios : I ? r.ENV_ENUM.android : R ? r.ENV_ENUM.pc : D && D.platform ? D.platform : r.ENV_ENUM.notIndingtalk,
            F === r.ENV_ENUM.pc) {
                x = o.indexOf("Macintosh; Intel Mac OS") > -1 ? r.ENV_ENUM_SUB.mac : r.ENV_ENUM_SUB.win
            }
            return {
                platform: F,
                platformSub: x,
                version: j,
                appType: $,
                language: O
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        var r = n(12);
        n(17),
        n(18),
        e.exports = r
    }
    , function(e, t, n) {
        (function(t, n) {
            e.exports = n()
        }
        )(0, function() {
            return function(e) {
                function t(r) {
                    if (n[r])
                        return n[r].exports;
                    var o = n[r] = {
                        i: r,
                        l: !1,
                        exports: {}
                    };
                    return e[r].call(o.exports, o, o.exports, t),
                    o.l = !0,
                    o.exports
                }
                var n = {};
                return t.m = e,
                t.c = n,
                t.i = function(e) {
                    return e
                }
                ,
                t.d = function(e, n, r) {
                    t.o(e, n) || Object.defineProperty(e, n, {
                        configurable: !1,
                        enumerable: !0,
                        get: r
                    })
                }
                ,
                t.n = function(e) {
                    var n = e && e.__esModule ? function() {
                        return e.default
                    }
                    : function() {
                        return e
                    }
                    ;
                    return t.d(n, "a", n),
                    n
                }
                ,
                t.o = function(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }
                ,
                t.p = "",
                t(t.s = 721)
            }({
                199: function(e, t, n) {
                    "use strict";
                    var r = n(201);
                    e.exports = r
                },
                201: function(e, t, n) {
                    "use strict";
                    var r = n(203)
                      , o = n(204)
                      , i = n(202)
                      , a = n(205)
                      , d = new i
                      , s = !1
                      , u = ""
                      , c = null
                      , l = {}
                      , v = /{.*}/;
                    try {
                        var f = window.name.match(v);
                        if (f && f[0])
                            var l = JSON.parse(f[0])
                    } catch (e) {
                        l = {}
                    }
                    l.hostOrigin && ".dingtalk.com" === l.hostOrigin.split(":")[1].slice(0 - ".dingtalk.com".length) && l.containerId && (s = !0,
                    u = l.hostOrigin,
                    c = l.containerId);
                    var p = {}
                      , _ = new Promise(function(e, t) {
                        p._resolve = e,
                        p._reject = t
                    }
                    )
                      , E = {}
                      , N = null;
                    window.top !== window ? (N = window.top,
                    p._resolve()) : "object" == typeof dingtalk && "object" == typeof dingtalk.platform && "function" == typeof dingtalk.platform.invokeAPI && (N = window,
                    p._resolve()),
                    E[a.SYS_INIT] = function(e) {
                        N = e.frameWindow,
                        p._resolve(),
                        e.respond({})
                    }
                    ,
                    window.addEventListener("message", function(e) {
                        var t = e.data
                          , n = e.origin;
                        if (n === u)
                            if ("response" === t.type && t.msgId) {
                                var r = t.msgId
                                  , i = d.getMsyById(r);
                                i && i.methodName !== a.SYS_EVENT && i.receiveResponse(t.body, !t.success)
                            } else if ("event" === t.type && t.msgId) {
                                var r = t.msgId
                                  , i = d.getMsyById(r);
                                i && i.receiveEvent(t.eventName, t.body)
                            } else if ("request" === t.type && t.msgId) {
                                var i = new o(e.source,n,t);
                                E[i.methodName] && E[i.methodName](i)
                            }
                    }),
                    t.invokeAPI = function(e, t) {
                        var n = new r(c,e,t);
                        return s && _.then(function() {
                            N && N.postMessage(n.getPayload(), u),
                            d.addPending(n)
                        }),
                        n
                    }
                    ;
                    var P = null;
                    t.addEventListener = function(e, n) {
                        P || (P = t.invokeAPI(a.SYS_EVENT, {})),
                        P.addEventListener(e, n)
                    }
                    ,
                    t.removeEventListener = function(e, t) {
                        P && P.removeEventListener(e, t)
                    }
                },
                202: function(e, t, n) {
                    "use strict";
                    var r = function() {
                        this.pendingMsgs = {}
                    };
                    r.prototype.addPending = function(e) {
                        this.pendingMsgs[e.id] = e;
                        var t = function() {
                            delete this.pendingMsgs[e.id],
                            e.removeEventListener("_finish", t)
                        }
                        .bind(this);
                        e.addEventListener("_finish", t)
                    }
                    ,
                    r.prototype.getMsyById = function(e) {
                        return this.pendingMsgs[e]
                    }
                    ,
                    e.exports = r
                },
                203: function(e, t, n) {
                    "use strict";
                    var r = n(716)
                      , o = n(715)
                      , i = 0
                      , a = Math.floor(1e3 * Math.random())
                      , d = function() {
                        return 1e3 * (1e3 * a + Math.floor(1e3 * Math.random())) + ++i % 1e3
                    }
                      , s = {
                        code: 408,
                        reason: "timeout"
                    }
                      , u = {
                        TIMEOUT: "_timeout",
                        FINISH: "_finish"
                    }
                      , c = {
                        timeout: -1
                    }
                      , l = function(e, t, n, r) {
                        this.id = d(),
                        this.methodName = t,
                        this.containerId = e,
                        this.option = o({}, c, r);
                        var n = n || {};
                        this._p = {},
                        this.result = new Promise(function(e, t) {
                            this._p._resolve = e,
                            this._p._reject = t
                        }
                        .bind(this)),
                        this.callbacks = {},
                        this.plainMsg = this._handleMsg(n),
                        this._eventsHandle = {},
                        this._timeoutTimer = null,
                        this._initTimeout(),
                        this.isFinish = !1
                    };
                    l.prototype._initTimeout = function() {
                        this._clearTimeout(),
                        this.option.timeout > 0 && (this._timeoutTimer = setTimeout(function() {
                            this.receiveEvent(u.TIMEOUT),
                            this.receiveResponse(s, !0)
                        }
                        .bind(this), this.option.timeout))
                    }
                    ,
                    l.prototype._clearTimeout = function() {
                        clearTimeout(this._timeoutTimer)
                    }
                    ,
                    l.prototype._handleMsg = function(e) {
                        var t = {};
                        return Object.keys(e).forEach(function(n) {
                            var o = e[n];
                            "function" == typeof o && "on" === n.slice(0, 2) ? this.callbacks[n] = o : t[n] = r(o)
                        }
                        .bind(this)),
                        t
                    }
                    ,
                    l.prototype.getPayload = function() {
                        return {
                            msgId: this.id,
                            containerId: this.containerId,
                            methodName: this.methodName,
                            body: this.plainMsg,
                            type: "request"
                        }
                    }
                    ,
                    l.prototype.receiveEvent = function(e, t) {
                        if (this.isFinish && e !== u.FINISH)
                            return !1;
                        e !== u.FINISH && e !== u.TIMEOUT && this._initTimeout(),
                        Array.isArray(this._eventsHandle[e]) && this._eventsHandle[e].forEach(function(e) {
                            try {
                                e(t)
                            } catch (e) {
                                console.error(t)
                            }
                        });
                        var n = "on" + e.charAt(0).toUpperCase() + e.slice(1);
                        return this.callbacks[n] && this.callbacks[n](t),
                        !0
                    }
                    ,
                    l.prototype.addEventListener = function(e, t) {
                        if (!e || "function" != typeof t)
                            throw "eventName is null or handle is not a function, addEventListener fail";
                        Array.isArray(this._eventsHandle[e]) || (this._eventsHandle[e] = []),
                        this._eventsHandle[e].push(t)
                    }
                    ,
                    l.prototype.removeEventListener = function(e, t) {
                        if (!e || !t)
                            throw "eventName is null or handle is null, invoke removeEventListener fail";
                        if (Array.isArray(this._eventsHandle[e])) {
                            var n = this._eventsHandle[e].indexOf(t);
                            -1 !== n && this._eventsHandle[e].splice(n, 1)
                        }
                    }
                    ,
                    l.prototype.receiveResponse = function(e, t) {
                        if (!0 === this.isFinish)
                            return !1;
                        this._clearTimeout();
                        var t = !!t;
                        return t ? this._p._reject(e) : this._p._resolve(e),
                        setTimeout(function() {
                            this.receiveEvent(u.FINISH)
                        }
                        .bind(this), 0),
                        this.isFinish = !0,
                        !0
                    }
                    ,
                    e.exports = l
                },
                204: function(e, t, n) {
                    "use strict";
                    var r = function(e, t, n) {
                        if (this._msgId = n.msgId,
                        this.frameWindow = e,
                        this.methodName = n.methodName,
                        this.clientOrigin = t,
                        this.containerId = n.containerId,
                        this.params = n.body,
                        !this._msgId)
                            throw "msgId not exist";
                        if (!this.frameWindow)
                            throw "frameWindow not exist";
                        if (!this.methodName)
                            throw "methodName not exits";
                        if (!this.clientOrigin)
                            throw "clientOrigin not exist";
                        this.hasResponded = !1
                    };
                    r.prototype.respond = function(e, t) {
                        var t = !!t;
                        if (!0 !== this.hasResponded) {
                            var n = {
                                type: "response",
                                success: !t,
                                body: e,
                                msgId: this._msgId
                            };
                            this.frameWindow.postMessage(n, this.clientOrigin),
                            this.hasResponded = !0
                        }
                    }
                    ,
                    r.prototype.emit = function(e, t) {
                        var n = {
                            type: "event",
                            eventName: e,
                            body: t,
                            msgId: this._msgId
                        };
                        this.frameWindow.postMessage(n, this.clientOrigin)
                    }
                    ,
                    e.exports = r
                },
                205: function(e, t, n) {
                    "use strict";
                    e.exports = {
                        SYS_EVENT: "SYS_openAPIContainerInitEvent",
                        SYS_INIT: "SYS_openAPIContainerInit"
                    }
                },
                4: function(e, t) {
                    var n;
                    n = function() {
                        return this
                    }();
                    try {
                        n = n || Function("return this")() || (0,
                        eval)("this")
                    } catch (e) {
                        "object" == typeof window && (n = window)
                    }
                    e.exports = n
                },
                714: function(e, t, n) {
                    (function(e, n) {
                        function r(e, t) {
                            return e.set(t[0], t[1]),
                            e
                        }
                        function o(e, t) {
                            return e.add(t),
                            e
                        }
                        function i(e, t) {
                            for (var n = -1, r = e.length; ++n < r && !1 !== t(e[n], n, e); )
                                ;
                            return e
                        }
                        function a(e, t) {
                            for (var n = -1, r = t.length, o = e.length; ++n < r; )
                                e[o + n] = t[n];
                            return e
                        }
                        function d(e, t, n, r) {
                            var o = -1
                              , i = e.length;
                            for (r && i && (n = e[++o]); ++o < i; )
                                n = t(n, e[o], o, e);
                            return n
                        }
                        function s(e, t) {
                            for (var n = -1, r = Array(e); ++n < e; )
                                r[n] = t(n);
                            return r
                        }
                        function u(e) {
                            return e && e.Object === Object ? e : null
                        }
                        function c(e) {
                            var t = !1;
                            if (null != e && "function" != typeof e.toString)
                                try {
                                    t = !!(e + "")
                                } catch (e) {}
                            return t
                        }
                        function l(e) {
                            var t = -1
                              , n = Array(e.size);
                            return e.forEach(function(e, r) {
                                n[++t] = [r, e]
                            }),
                            n
                        }
                        function v(e) {
                            var t = -1
                              , n = Array(e.size);
                            return e.forEach(function(e) {
                                n[++t] = e
                            }),
                            n
                        }
                        function f(e) {
                            var t = -1
                              , n = e ? e.length : 0;
                            for (this.clear(); ++t < n; ) {
                                var r = e[t];
                                this.set(r[0], r[1])
                            }
                        }
                        function p() {
                            this.__data__ = wt ? wt(null) : {}
                        }
                        function _(e) {
                            return this.has(e) && delete this.__data__[e]
                        }
                        function E(e) {
                            var t = this.__data__;
                            if (wt) {
                                var n = t[e];
                                return n === Se ? void 0 : n
                            }
                            return Et.call(t, e) ? t[e] : void 0
                        }
                        function N(e) {
                            var t = this.__data__;
                            return wt ? void 0 !== t[e] : Et.call(t, e)
                        }
                        function P(e, t) {
                            return this.__data__[e] = wt && void 0 === t ? Se : t,
                            this
                        }
                        function h(e) {
                            var t = -1
                              , n = e ? e.length : 0;
                            for (this.clear(); ++t < n; ) {
                                var r = e[t];
                                this.set(r[0], r[1])
                            }
                        }
                        function M() {
                            this.__data__ = []
                        }
                        function m(e) {
                            var t = this.__data__
                              , n = R(t, e);
                            return !(n < 0 || (n == t.length - 1 ? t.pop() : yt.call(t, n, 1),
                            0))
                        }
                        function g(e) {
                            var t = this.__data__
                              , n = R(t, e);
                            return n < 0 ? void 0 : t[n][1]
                        }
                        function b(e) {
                            return R(this.__data__, e) > -1
                        }
                        function k(e, t) {
                            var n = this.__data__
                              , r = R(n, e);
                            return r < 0 ? n.push([e, t]) : n[r][1] = t,
                            this
                        }
                        function y(e) {
                            var t = -1
                              , n = e ? e.length : 0;
                            for (this.clear(); ++t < n; ) {
                                var r = e[t];
                                this.set(r[0], r[1])
                            }
                        }
                        function I() {
                            this.__data__ = {
                                hash: new f,
                                map: new ($t || h),
                                string: new f
                            }
                        }
                        function A(e) {
                            return re(this, e).delete(e)
                        }
                        function S(e) {
                            return re(this, e).get(e)
                        }
                        function $(e) {
                            return re(this, e).has(e)
                        }
                        function U(e, t) {
                            return re(this, e).set(e, t),
                            this
                        }
                        function V(e) {
                            this.__data__ = new h(e)
                        }
                        function O() {
                            this.__data__ = new h
                        }
                        function w(e) {
                            return this.__data__.delete(e)
                        }
                        function j(e) {
                            return this.__data__.get(e)
                        }
                        function C(e) {
                            return this.__data__.has(e)
                        }
                        function D(e, t) {
                            var n = this.__data__;
                            return n instanceof h && n.__data__.length == Ae && (n = this.__data__ = new y(n.__data__)),
                            n.set(e, t),
                            this
                        }
                        function T(e, t, n) {
                            var r = e[t];
                            Et.call(e, t) && Ee(r, n) && (void 0 !== n || t in e) || (e[t] = n)
                        }
                        function R(e, t) {
                            for (var n = e.length; n--; )
                                if (Ee(e[n][0], t))
                                    return n;
                            return -1
                        }
                        function F(e, t) {
                            return e && ee(t, Ie(t), e)
                        }
                        function x(e, t, n, r, o, a, d) {
                            var s;
                            if (r && (s = a ? r(e, o, a, d) : r(e)),
                            void 0 !== s)
                                return s;
                            if (!ge(e))
                                return e;
                            var u = zt(e);
                            if (u) {
                                if (s = se(e),
                                !t)
                                    return Q(e, s)
                            } else {
                                var l = de(e)
                                  , v = l == we || l == je;
                                if (Bt(e))
                                    return q(e, t);
                                if (l == Te || l == Ue || v && !a) {
                                    if (c(e))
                                        return a ? e : {};
                                    if (s = ue(v ? {} : e),
                                    !t)
                                        return te(e, F(s, e))
                                } else {
                                    if (!rt[l])
                                        return a ? e : {};
                                    s = ce(e, l, x, t)
                                }
                            }
                            d || (d = new V);
                            var f = d.get(e);
                            if (f)
                                return f;
                            if (d.set(e, s),
                            !u)
                                var p = n ? ne(e) : Ie(e);
                            return i(p || e, function(o, i) {
                                p && (i = o,
                                o = e[i]),
                                T(s, i, x(o, t, n, r, i, e, d))
                            }),
                            s
                        }
                        function W(e) {
                            return ge(e) ? bt(e) : {}
                        }
                        function z(e, t, n) {
                            var r = t(e);
                            return zt(e) ? r : a(r, n(e))
                        }
                        function B(e, t) {
                            return Et.call(e, t) || "object" == typeof e && t in e && null === ie(e)
                        }
                        function L(e) {
                            return At(Object(e))
                        }
                        function q(e, t) {
                            if (t)
                                return e.slice();
                            var n = new e.constructor(e.length);
                            return e.copy(n),
                            n
                        }
                        function G(e) {
                            var t = new e.constructor(e.byteLength);
                            return new mt(t).set(new mt(e)),
                            t
                        }
                        function J(e, t) {
                            var n = t ? G(e.buffer) : e.buffer;
                            return new e.constructor(n,e.byteOffset,e.byteLength)
                        }
                        function Y(e, t, n) {
                            return d(t ? n(l(e), !0) : l(e), r, new e.constructor)
                        }
                        function H(e) {
                            var t = new e.constructor(e.source,et.exec(e));
                            return t.lastIndex = e.lastIndex,
                            t
                        }
                        function K(e, t, n) {
                            return d(t ? n(v(e), !0) : v(e), o, new e.constructor)
                        }
                        function X(e) {
                            return xt ? Object(xt.call(e)) : {}
                        }
                        function Z(e, t) {
                            var n = t ? G(e.buffer) : e.buffer;
                            return new e.constructor(n,e.byteOffset,e.length)
                        }
                        function Q(e, t) {
                            var n = -1
                              , r = e.length;
                            for (t || (t = Array(r)); ++n < r; )
                                t[n] = e[n];
                            return t
                        }
                        function ee(e, t, n, r) {
                            n || (n = {});
                            for (var o = -1, i = t.length; ++o < i; ) {
                                var a = t[o];
                                T(n, a, r ? r(n[a], e[a], a, n, e) : e[a])
                            }
                            return n
                        }
                        function te(e, t) {
                            return ee(e, ae(e), t)
                        }
                        function ne(e) {
                            return z(e, Ie, ae)
                        }
                        function re(e, t) {
                            var n = e.__data__;
                            return fe(t) ? n["string" == typeof t ? "string" : "hash"] : n.map
                        }
                        function oe(e, t) {
                            var n = e[t];
                            return ke(n) ? n : void 0
                        }
                        function ie(e) {
                            return It(Object(e))
                        }
                        function ae(e) {
                            return gt(Object(e))
                        }
                        function de(e) {
                            return Nt.call(e)
                        }
                        function se(e) {
                            var t = e.length
                              , n = e.constructor(t);
                            return t && "string" == typeof e[0] && Et.call(e, "index") && (n.index = e.index,
                            n.input = e.input),
                            n
                        }
                        function ue(e) {
                            return "function" != typeof e.constructor || pe(e) ? {} : W(ie(e))
                        }
                        function ce(e, t, n, r) {
                            var o = e.constructor;
                            switch (t) {
                            case ze:
                                return G(e);
                            case Ve:
                            case Oe:
                                return new o(+e);
                            case Be:
                                return J(e, r);
                            case Le:
                            case qe:
                            case Ge:
                            case Je:
                            case Ye:
                            case He:
                            case Ke:
                            case Xe:
                            case Ze:
                                return Z(e, r);
                            case Ce:
                                return Y(e, r, n);
                            case De:
                            case xe:
                                return new o(e);
                            case Re:
                                return H(e);
                            case Fe:
                                return K(e, r, n);
                            case We:
                                return X(e)
                            }
                        }
                        function le(e) {
                            var t = e ? e.length : void 0;
                            return me(t) && (zt(e) || ye(e) || Ne(e)) ? s(t, String) : null
                        }
                        function ve(e, t) {
                            return !!(t = null == t ? $e : t) && ("number" == typeof e || nt.test(e)) && e > -1 && e % 1 == 0 && e < t
                        }
                        function fe(e) {
                            var t = typeof e;
                            return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e
                        }
                        function pe(e) {
                            var t = e && e.constructor;
                            return e === ("function" == typeof t && t.prototype || pt)
                        }
                        function _e(e) {
                            if (null != e) {
                                try {
                                    return _t.call(e)
                                } catch (e) {}
                                try {
                                    return e + ""
                                } catch (e) {}
                            }
                            return ""
                        }
                        function Ee(e, t) {
                            return e === t || e !== e && t !== t
                        }
                        function Ne(e) {
                            return he(e) && Et.call(e, "callee") && (!kt.call(e, "callee") || Nt.call(e) == Ue)
                        }
                        function Pe(e) {
                            return null != e && me(Wt(e)) && !Me(e)
                        }
                        function he(e) {
                            return be(e) && Pe(e)
                        }
                        function Me(e) {
                            var t = ge(e) ? Nt.call(e) : "";
                            return t == we || t == je
                        }
                        function me(e) {
                            return "number" == typeof e && e > -1 && e % 1 == 0 && e <= $e
                        }
                        function ge(e) {
                            var t = typeof e;
                            return !!e && ("object" == t || "function" == t)
                        }
                        function be(e) {
                            return !!e && "object" == typeof e
                        }
                        function ke(e) {
                            return !!ge(e) && (Me(e) || c(e) ? Pt : tt).test(_e(e))
                        }
                        function ye(e) {
                            return "string" == typeof e || !zt(e) && be(e) && Nt.call(e) == xe
                        }
                        function Ie(e) {
                            var t = pe(e);
                            if (!t && !Pe(e))
                                return L(e);
                            var n = le(e)
                              , r = !!n
                              , o = n || []
                              , i = o.length;
                            for (var a in e)
                                !B(e, a) || r && ("length" == a || ve(a, i)) || t && "constructor" == a || o.push(a);
                            return o
                        }
                        var Ae = 200
                          , Se = "__lodash_hash_undefined__"
                          , $e = 9007199254740991
                          , Ue = "[object Arguments]"
                          , Ve = "[object Boolean]"
                          , Oe = "[object Date]"
                          , we = "[object Function]"
                          , je = "[object GeneratorFunction]"
                          , Ce = "[object Map]"
                          , De = "[object Number]"
                          , Te = "[object Object]"
                          , Re = "[object RegExp]"
                          , Fe = "[object Set]"
                          , xe = "[object String]"
                          , We = "[object Symbol]"
                          , ze = "[object ArrayBuffer]"
                          , Be = "[object DataView]"
                          , Le = "[object Float32Array]"
                          , qe = "[object Float64Array]"
                          , Ge = "[object Int8Array]"
                          , Je = "[object Int16Array]"
                          , Ye = "[object Int32Array]"
                          , He = "[object Uint8Array]"
                          , Ke = "[object Uint8ClampedArray]"
                          , Xe = "[object Uint16Array]"
                          , Ze = "[object Uint32Array]"
                          , Qe = /[\\^$.*+?()[\]{}|]/g
                          , et = /\w*$/
                          , tt = /^\[object .+?Constructor\]$/
                          , nt = /^(?:0|[1-9]\d*)$/
                          , rt = {};
                        rt[Ue] = rt["[object Array]"] = rt[ze] = rt[Be] = rt[Ve] = rt[Oe] = rt[Le] = rt[qe] = rt[Ge] = rt[Je] = rt[Ye] = rt[Ce] = rt[De] = rt[Te] = rt[Re] = rt[Fe] = rt[xe] = rt[We] = rt[He] = rt[Ke] = rt[Xe] = rt[Ze] = !0,
                        rt["[object Error]"] = rt[we] = rt["[object WeakMap]"] = !1;
                        var ot = {
                            function: !0,
                            object: !0
                        }
                          , it = ot[typeof t] && t && !t.nodeType ? t : void 0
                          , at = ot[typeof e] && e && !e.nodeType ? e : void 0
                          , dt = at && at.exports === it ? it : void 0
                          , st = u(it && at && "object" == typeof n && n)
                          , ut = u(ot[typeof self] && self)
                          , ct = u(ot[typeof window] && window)
                          , lt = u(ot[typeof this] && this)
                          , vt = st || ct !== (lt && lt.window) && ct || ut || lt || Function("return this")()
                          , ft = Array.prototype
                          , pt = Object.prototype
                          , _t = Function.prototype.toString
                          , Et = pt.hasOwnProperty
                          , Nt = pt.toString
                          , Pt = RegExp("^" + _t.call(Et).replace(Qe, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
                          , ht = dt ? vt.Buffer : void 0
                          , Mt = vt.Symbol
                          , mt = vt.Uint8Array
                          , gt = Object.getOwnPropertySymbols
                          , bt = Object.create
                          , kt = pt.propertyIsEnumerable
                          , yt = ft.splice
                          , It = Object.getPrototypeOf
                          , At = Object.keys
                          , St = oe(vt, "DataView")
                          , $t = oe(vt, "Map")
                          , Ut = oe(vt, "Promise")
                          , Vt = oe(vt, "Set")
                          , Ot = oe(vt, "WeakMap")
                          , wt = oe(Object, "create")
                          , jt = _e(St)
                          , Ct = _e($t)
                          , Dt = _e(Ut)
                          , Tt = _e(Vt)
                          , Rt = _e(Ot)
                          , Ft = Mt ? Mt.prototype : void 0
                          , xt = Ft ? Ft.valueOf : void 0;
                        f.prototype.clear = p,
                        f.prototype.delete = _,
                        f.prototype.get = E,
                        f.prototype.has = N,
                        f.prototype.set = P,
                        h.prototype.clear = M,
                        h.prototype.delete = m,
                        h.prototype.get = g,
                        h.prototype.has = b,
                        h.prototype.set = k,
                        y.prototype.clear = I,
                        y.prototype.delete = A,
                        y.prototype.get = S,
                        y.prototype.has = $,
                        y.prototype.set = U,
                        V.prototype.clear = O,
                        V.prototype.delete = w,
                        V.prototype.get = j,
                        V.prototype.has = C,
                        V.prototype.set = D;
                        var Wt = function(e) {
                            return function(e) {
                                return null == e ? void 0 : e.length
                            }
                        }();
                        gt || (ae = function() {
                            return []
                        }
                        ),
                        (St && de(new St(new ArrayBuffer(1))) != Be || $t && de(new $t) != Ce || Ut && "[object Promise]" != de(Ut.resolve()) || Vt && de(new Vt) != Fe || Ot && "[object WeakMap]" != de(new Ot)) && (de = function(e) {
                            var t = Nt.call(e)
                              , n = t == Te ? e.constructor : void 0
                              , r = n ? _e(n) : void 0;
                            if (r)
                                switch (r) {
                                case jt:
                                    return Be;
                                case Ct:
                                    return Ce;
                                case Dt:
                                    return "[object Promise]";
                                case Tt:
                                    return Fe;
                                case Rt:
                                    return "[object WeakMap]"
                                }
                            return t
                        }
                        );
                        var zt = Array.isArray
                          , Bt = ht ? function(e) {
                            return e instanceof ht
                        }
                        : function(e) {
                            return function() {
                                return !1
                            }
                        }();
                        e.exports = x
                    }
                    ).call(t, n(719)(e), n(4))
                },
                715: function(e, t, n) {
                    function r(e, t, n) {
                        var r = e[t];
                        M.call(e, t) && s(r, n) && (void 0 !== n || t in e) || (e[t] = n)
                    }
                    function o(e, t, n, o) {
                        n || (n = {});
                        for (var i = -1, a = t.length; ++i < a; ) {
                            var d = t[i];
                            r(n, d, o ? o(n[d], e[d], d, n, e) : e[d])
                        }
                        return n
                    }
                    function i(e, t) {
                        return !!(t = null == t ? _ : t) && ("number" == typeof e || P.test(e)) && e > -1 && e % 1 == 0 && e < t
                    }
                    function a(e, t, n) {
                        if (!v(n))
                            return !1;
                        var r = typeof t;
                        return !!("number" == r ? u(n) && i(t, n.length) : "string" == r && t in n) && s(n[t], e)
                    }
                    function d(e) {
                        var t = e && e.constructor;
                        return e === ("function" == typeof t && t.prototype || h)
                    }
                    function s(e, t) {
                        return e === t || e !== e && t !== t
                    }
                    function u(e) {
                        return null != e && l(k(e)) && !c(e)
                    }
                    function c(e) {
                        var t = v(e) ? m.call(e) : "";
                        return t == E || t == N
                    }
                    function l(e) {
                        return "number" == typeof e && e > -1 && e % 1 == 0 && e <= _
                    }
                    function v(e) {
                        var t = typeof e;
                        return !!e && ("object" == t || "function" == t)
                    }
                    var f = n(717)
                      , p = n(718)
                      , _ = 9007199254740991
                      , E = "[object Function]"
                      , N = "[object GeneratorFunction]"
                      , P = /^(?:0|[1-9]\d*)$/
                      , h = Object.prototype
                      , M = h.hasOwnProperty
                      , m = h.toString
                      , g = h.propertyIsEnumerable
                      , b = !g.call({
                        valueOf: 1
                    }, "valueOf")
                      , k = function(e) {
                        return function(e) {
                            return null == e ? void 0 : e.length
                        }
                    }()
                      , y = function(e) {
                        return p(function(t, n) {
                            var r = -1
                              , o = n.length
                              , i = o > 1 ? n[o - 1] : void 0
                              , d = o > 2 ? n[2] : void 0;
                            for (i = e.length > 3 && "function" == typeof i ? (o--,
                            i) : void 0,
                            d && a(n[0], n[1], d) && (i = o < 3 ? void 0 : i,
                            o = 1),
                            t = Object(t); ++r < o; ) {
                                var s = n[r];
                                s && e(t, s)
                            }
                            return t
                        })
                    }(function(e, t) {
                        if (b || d(t) || u(t))
                            return void o(t, f(t), e);
                        for (var n in t)
                            M.call(t, n) && r(e, n, t[n])
                    });
                    e.exports = y
                },
                716: function(e, t, n) {
                    function r(e) {
                        return o(e, !0, !0)
                    }
                    var o = n(714);
                    e.exports = r
                },
                717: function(e, t) {
                    function n(e, t) {
                        for (var n = -1, r = Array(e); ++n < e; )
                            r[n] = t(n);
                        return r
                    }
                    function r(e, t) {
                        var r = y(e) || d(e) ? n(e.length, String) : []
                          , o = r.length
                          , a = !!o;
                        for (var s in e)
                            !t && !m.call(e, s) || a && ("length" == s || i(s, o)) || r.push(s);
                        return r
                    }
                    function o(e) {
                        if (!a(e))
                            return k(e);
                        var t = [];
                        for (var n in Object(e))
                            m.call(e, n) && "constructor" != n && t.push(n);
                        return t
                    }
                    function i(e, t) {
                        return !!(t = null == t ? _ : t) && ("number" == typeof e || h.test(e)) && e > -1 && e % 1 == 0 && e < t
                    }
                    function a(e) {
                        var t = e && e.constructor;
                        return e === ("function" == typeof t && t.prototype || M)
                    }
                    function d(e) {
                        return u(e) && m.call(e, "callee") && (!b.call(e, "callee") || g.call(e) == E)
                    }
                    function s(e) {
                        return null != e && l(e.length) && !c(e)
                    }
                    function u(e) {
                        return f(e) && s(e)
                    }
                    function c(e) {
                        var t = v(e) ? g.call(e) : "";
                        return t == N || t == P
                    }
                    function l(e) {
                        return "number" == typeof e && e > -1 && e % 1 == 0 && e <= _
                    }
                    function v(e) {
                        var t = typeof e;
                        return !!e && ("object" == t || "function" == t)
                    }
                    function f(e) {
                        return !!e && "object" == typeof e
                    }
                    function p(e) {
                        return s(e) ? r(e) : o(e)
                    }
                    var _ = 9007199254740991
                      , E = "[object Arguments]"
                      , N = "[object Function]"
                      , P = "[object GeneratorFunction]"
                      , h = /^(?:0|[1-9]\d*)$/
                      , M = Object.prototype
                      , m = M.hasOwnProperty
                      , g = M.toString
                      , b = M.propertyIsEnumerable
                      , k = function(e, t) {
                        return function(n) {
                            return e(t(n))
                        }
                    }(Object.keys, Object)
                      , y = Array.isArray;
                    e.exports = p
                },
                718: function(e, t) {
                    function n(e, t, n) {
                        switch (n.length) {
                        case 0:
                            return e.call(t);
                        case 1:
                            return e.call(t, n[0]);
                        case 2:
                            return e.call(t, n[0], n[1]);
                        case 3:
                            return e.call(t, n[0], n[1], n[2])
                        }
                        return e.apply(t, n)
                    }
                    function r(e, t) {
                        return t = b(void 0 === t ? e.length - 1 : t, 0),
                        function() {
                            for (var r = arguments, o = -1, i = b(r.length - t, 0), a = Array(i); ++o < i; )
                                a[o] = r[t + o];
                            o = -1;
                            for (var d = Array(t + 1); ++o < t; )
                                d[o] = r[o];
                            return d[t] = a,
                            n(e, this, d)
                        }
                    }
                    function o(e, t) {
                        if ("function" != typeof e)
                            throw new TypeError(l);
                        return t = void 0 === t ? t : u(t),
                        r(e, t)
                    }
                    function i(e) {
                        var t = typeof e;
                        return !!e && ("object" == t || "function" == t)
                    }
                    function a(e) {
                        return !!e && "object" == typeof e
                    }
                    function d(e) {
                        return "symbol" == typeof e || a(e) && g.call(e) == _
                    }
                    function s(e) {
                        return e ? (e = c(e)) === v || e === -v ? (e < 0 ? -1 : 1) * f : e === e ? e : 0 : 0 === e ? e : 0
                    }
                    function u(e) {
                        var t = s(e)
                          , n = t % 1;
                        return t === t ? n ? t - n : t : 0
                    }
                    function c(e) {
                        if ("number" == typeof e)
                            return e;
                        if (d(e))
                            return p;
                        if (i(e)) {
                            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                            e = i(t) ? t + "" : t
                        }
                        if ("string" != typeof e)
                            return 0 === e ? e : +e;
                        e = e.replace(E, "");
                        var n = P.test(e);
                        return n || h.test(e) ? M(e.slice(2), n ? 2 : 8) : N.test(e) ? p : +e
                    }
                    var l = "Expected a function"
                      , v = 1 / 0
                      , f = 1.7976931348623157e308
                      , p = NaN
                      , _ = "[object Symbol]"
                      , E = /^\s+|\s+$/g
                      , N = /^[-+]0x[0-9a-f]+$/i
                      , P = /^0b[01]+$/i
                      , h = /^0o[0-7]+$/i
                      , M = parseInt
                      , m = Object.prototype
                      , g = m.toString
                      , b = Math.max;
                    e.exports = o
                },
                719: function(e, t) {
                    e.exports = function(e) {
                        return e.webpackPolyfill || (e.deprecate = function() {}
                        ,
                        e.paths = [],
                        e.children || (e.children = []),
                        Object.defineProperty(e, "loaded", {
                            enumerable: !0,
                            get: function() {
                                return e.l
                            }
                        }),
                        Object.defineProperty(e, "id", {
                            enumerable: !0,
                            get: function() {
                                return e.i
                            }
                        }),
                        e.webpackPolyfill = 1),
                        e
                    }
                },
                721: function(e, t, n) {
                    e.exports = n(199)
                }
            })
        })
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function(e, t) {
            return new Promise(function(n, r) {
                dd.dtBridge({
                    m: e,
                    args: t,
                    onSuccess: function(e) {
                        "function" == typeof t.onSuccess && t.onSuccess(e),
                        n(e)
                    },
                    onFail: function(e) {
                        "function" == typeof t.onFail && t.onFail(e),
                        r(e)
                    }
                })
            }
            )
        };
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.androidWeexBridge = t.iosWeexBridge = t.requireModule = void 0;
        t.requireModule = function(e) {
            return "undefined" != typeof __weex_require__ ? __weex_require__("@weex-module/" + e) : "undefined" != typeof weex ? weex.requireModule(e) : void 0
        }
        ,
        t.iosWeexBridge = function() {
            return Promise.resolve(function(e, n) {
                return new Promise(function(r, o) {
                    var i = t.requireModule("nuvajs-exec")
                      , a = e.split(".")
                      , d = a.pop()
                      , s = a.join(".");
                    i.exec({
                        plugin: s,
                        action: d,
                        args: n
                    }, function(e) {
                        e && "0" === e.errorCode ? ("function" == typeof n.onSuccess && n.onSuccess(e.result),
                        r(e.result)) : ("function" == typeof n.onFail && n.onFail(e.result),
                        o(e.result))
                    })
                }
                )
            })
        }
        ,
        t.androidWeexBridge = function() {
            return Promise.resolve(function(e, n) {
                return new Promise(function(r, o) {
                    var i = t.requireModule("nuvajs-exec")
                      , a = e.split(".")
                      , d = a.pop()
                      , s = a.join(".");
                    i.exec({
                        plugin: s,
                        action: d,
                        args: n
                    }, function(e) {
                        var t = {};
                        try {
                            if (e && e.__message__)
                                if ("object" == typeof e.__message__)
                                    t = e.__message__;
                                else
                                    try {
                                        t = JSON.parse(e.__message__)
                                    } catch (n) {
                                        "string" == typeof e.__message__ && (t = e.__message__)
                                    }
                        } catch (e) {}
                        e && 1 === parseInt(e.__status__ + "", 10) ? ("function" == typeof n.onSuccess && n.onSuccess(t),
                        r(t)) : ("function" == typeof n.onFail && n.onFail(t),
                        o(t))
                    })
                }
                )
            })
        }
    }
    , function(e, t, n) {
        "use strict";
        (function(e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.formatLog = t.diagnosticMessageMap = t.LogLevel = void 0;
            var n;
            (function(e) {
                e.INFO = "INFO",
                e.WARN = "WARN",
                e.ERROR = "ERROR"
            }
            )(n = t.LogLevel || (t.LogLevel = {}));
            var r = function(e, t, n, r) {
                return void 0 === r && (r = void 0),
                {
                    code: e,
                    category: t,
                    message: n,
                    solution: r
                }
            };
            t.diagnosticMessageMap = {
                config_debug_deprecated: r(1010, n.WARN, "This is a deprecated feature (dd.debug - debug:true), recommend use dd.devConfig"),
                dd_config_wrap_deprecated: r(1020, n.WARN, "You don 't use a dd.config, so you don't need to wrap dd.ready, recommend remove dd.ready"),
                not_support_event_on: r(1030, n.WARN, "\"event.on\" do not support the current platform ('{0}')"),
                not_support_event_off: r(1040, n.WARN, "\"event.off\" do not support the current platform ('{0}')"),
                repeat_config: r(1040, n.WARN, "dd.config has been executed, please don't repeat config"),
                JsBridge_init_fail: r(5010, n.ERROR, "JsBridge initialization fails, jsapi will not work"),
                auto_bridge_init_error: r(5020, n.ERROR, "auto bridgeInit error"),
                JsBridge_init_fail_dd_config: r(5010, n.ERROR, 'JsBridge initialization failed and "dd.config" failed to call'),
                not_support_env: r(4040, n.ERROR, "Do not support the current environment：'{0}'"),
                call_api_support_platform_error: r(4050, n.ERROR, "'{0}' do not support the current platform ('{1}')"),
                call_api_config_platform_error: r(4060, n.ERROR, "This API method is not configured for the platform ('{0}')"),
                call_api_on_before_error: r(4060, n.ERROR, "Call Hook:onBeforeInvokeAPI failed , reason: '{0}'"),
                call_api_on_after_error: r(4060, n.ERROR, "Call Hook:onAfterInvokeAPI failed , reason: '{0}'")
            },
            t.formatLog = function(t) {
                for (var n, r = [], o = 1; o < arguments.length; o++)
                    r[o - 1] = arguments[o];
                var i = "[dingtalk-JSAPI] " + t.category + " " + t.code + ": " + t.message.replace(/{(\d)}/g, function(e, t) {
                    return r[t] || e
                });
                return "object" == typeof e && "production" !== (null === (n = null === e || void 0 === e ? void 0 : e.env) || void 0 === n ? void 0 : n.NODE_ENV) && console.warn(i),
                i
            }
        }
        ).call(t, n(20))
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return "function" == typeof e
        }
        function o(e, t) {
            function n(e) {
                return parseInt(e, 10) || 0
            }
            for (var r = e.split(".").map(n), o = t.split(".").map(n), i = 0; i < r.length; i++) {
                if (void 0 === o[i])
                    return !1;
                if (r[i] < o[i])
                    return !1;
                if (r[i] > o[i])
                    return !0
            }
            return !0
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.LogLevel = t.APP_TYPE = t.ENV_ENUM_SUB = t.ENV_ENUM = t.ERROR_CODE = t.compareVersion = t.isFunction = void 0,
        t.isFunction = r,
        t.compareVersion = o;
        (function(e) {
            e.cancel = "-1",
            e.not_exist = "1",
            e.no_permission = "7"
        }
        )(t.ERROR_CODE || (t.ERROR_CODE = {}));
        (function(e) {
            e.pc = "pc",
            e.android = "android",
            e.ios = "ios",
            e.gdtPc = "gdtPc",
            e.gdtAndroid = "gdtAndroid",
            e.gdtIos = "gdtIos",
            e.gdtStandardAndroid = "gdtStandardAndroid",
            e.gdtStandardIos = "gdtStandardIos",
            e.notIndingtalk = "notIndingtalk",
            e.windows = "windows",
            e.mac = "mac"
        }
        )(t.ENV_ENUM || (t.ENV_ENUM = {}));
        (function(e) {
            e.mac = "mac",
            e.win = "win",
            e.noSub = "noSub"
        }
        )(t.ENV_ENUM_SUB || (t.ENV_ENUM_SUB = {}));
        (function(e) {
            e.WEB = "WEB",
            e.MINI_APP = "MINI_APP",
            e.WEEX = "WEEX",
            e.WEBVIEW_IN_MINIAPP = "WEBVIEW_IN_MINIAPP",
            e.WEEX_WIDGET = "WEEX_WIDGET"
        }
        )(t.APP_TYPE || (t.APP_TYPE = {}));
        (function(e) {
            e[e.INFO = 1] = "INFO",
            e[e.WARNING = 2] = "WARNING",
            e[e.ERROR = 3] = "ERROR"
        }
        )(t.LogLevel || (t.LogLevel = {}))
    }
    , function(e, t) {
        var n;
        n = function() {
            return this
        }();
        try {
            n = n || Function("return this")() || (0,
            eval)("this")
        } catch (e) {
            "object" == typeof window && (n = window)
        }
        e.exports = n
    }
    , function(e, t, n) {
        "use strict";
        var r = n(0)
          , o = n(248)
          , i = Object.assign({}, o, r.ddSdk.getExportSdk());
        e.exports = i
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.off = t.on = void 0;
        var r = ["resume", "pause", "online", "offline", "backbutton", "goBack", "pullToRefresh", "message", "recycle", "restore", "drawer", "tab", "navHelpIcon", "navRightButton", "navMenu", "navTitle", "appLinkResponse", "internalPageLinkResponse", "networkEvent", "hostTaskEvent", "deviceOrientationChanged", "autoCheckIn", "deviceFound", "hostCheckIn", "screenshot", "becomeActive", "keepAlive", "navTitleClick", "sharePage", "wxNotify", "editNoteCommand", "updateStyle", "qrscanCommonNotify", "__message__", "dtChannelEvent", "livePlayerEventPlay", "livePlayerEventPause", "livePlayerEventEnded", "livePlayerEventError", "navActions", "attendEvents"]
          , o = function() {
            return "undefined" == typeof WeakMap ? void 0 : new WeakMap
        }()
          , i = function(e, t) {
            if (o) {
                var n = o.get(t);
                return void 0 === n ? (n = function(e) {
                    var r = e.detail;
                    if (r.namespace && r.eventName) {
                        var o = r.namespace + "." + r.eventName;
                        n && -1 !== n.__eventTypeList__.indexOf(o) && t(r.data)
                    }
                }
                ,
                n.__eventTypeList__ = [e],
                o.set(t, n)) : -1 === n.__eventTypeList__.indexOf(e) && n.__eventTypeList__.push(e),
                n
            }
        }
          , a = function(e, t) {
            if (o) {
                var n = o.get(t);
                return n && -1 !== n.__eventTypeList__.indexOf(e) && n.__eventTypeList__.splice(n.__eventTypeList__.indexOf(e), 1),
                n && n.__eventTypeList__.length <= 1 ? n : void 0
            }
        };
        t.on = function(e, t) {
            if (-1 !== r.indexOf(e))
                document.addEventListener(e, t);
            else {
                var n = i(e, t);
                n ? document.addEventListener("dtBizBridgeEvent", n) : console.log("bind event : " + e + " need WeakMap support , current environment doesnot")
            }
        }
        ,
        t.off = function(e, t) {
            if (-1 !== r.indexOf(e))
                document.removeEventListener(e, t);
            else {
                var n = a(e, t);
                n && document.removeEventListener("dtBizBridgeEvent", n)
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function() {}
          , o = function(e, t) {
            return new Promise(function(n, o) {
                var i = t.onSuccess || r
                  , a = t.onFail || r;
                if (delete t.onSuccess,
                delete t.onFail,
                AlipayJSBridge) {
                    var d = e.split(".")
                      , s = d.pop() || ""
                      , u = d.join(".");
                    AlipayJSBridge.call.apply(null, ["webDdExec", {
                        serviceName: u,
                        actionName: s,
                        args: t
                    }, function(e) {
                        var t = {}
                          , r = e.content;
                        if (r)
                            try {
                                t = JSON.parse(r)
                            } catch (e) {
                                console.error("parse dt api result error", r, e)
                            }
                        e.success ? (i.apply(null, [t]),
                        n(t)) : (a.apply(null, [t]),
                        o(t))
                    }
                    ])
                } else {
                    var c = new Error("Fatal error, cannot find bridge ,current env is WebView in MiniApp");
                    a(c),
                    o(c)
                }
            }
            )
        };
        t.default = o
    }
    , function(e, t, n) {
        "use strict";
        var r = this;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.off = t.on = void 0;
        var o = n(8);
        t.on = function(e, t) {
            o.requireModule("globalEvent").addEventListener(e, function(e) {
                var n = {
                    preventDefault: function() {
                        throw new Error("does not support preventDefault")
                    },
                    detail: e
                };
                t.call(r, n)
            })
        }
        ,
        t.off = function(e, t) {
            o.requireModule("globalEvent").removeEventListener(e, t)
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.FRAMEWORK = t.PLATFORM = t.RUNTIME = void 0,
        t.RUNTIME = {
            WEB: "Web",
            WEEX: "Weex",
            UNKNOWN: "Unknown"
        },
        t.PLATFORM = {
            MAC: "Mac",
            WINDOWS: "Windows",
            IOS: "iOS",
            ANDROID: "Android",
            IPAD: "iPad",
            BROWSER: "Browser",
            UNKNOWN: "Unknown"
        },
        t.FRAMEWORK = {
            VUE: "Vue",
            RAX: "Rax",
            UNKNOWN: "Unknown"
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.platformConfig = void 0;
        var r = n(0)
          , o = n(4)
          , i = n(2)
          , a = n(7)
          , d = n(14)
          , s = n(244)
          , u = n(8)
          , c = n(13)
          , l = n(15);
        t.platformConfig = {
            platform: o.ENV_ENUM.android,
            bridgeInit: function() {
                var e = o.getENV();
                return e.appType === i.APP_TYPE.MINI_APP ? Promise.resolve(a.default) : e.appType === i.APP_TYPE.WEBVIEW_IN_MINIAPP ? Promise.resolve(d.default) : e.appType === i.APP_TYPE.WEEX ? u.androidWeexBridge() : s.h5AndroidbridgeInit().then(function() {
                    return s.default
                })
            },
            authMethod: "runtime.permission.requestJsApis",
            event: {
                on: function(e, t) {
                    var n = o.getENV();
                    switch (n.appType) {
                    case i.APP_TYPE.WEB:
                    case i.APP_TYPE.WEBVIEW_IN_MINIAPP:
                        c.on(e, t);
                        break;
                    case i.APP_TYPE.WEEX:
                        l.on(e, t);
                        break;
                    default:
                        throw new Error("Not support global event in the platfrom: " + n.appType)
                    }
                },
                off: function(e, t) {
                    var n = o.getENV();
                    switch (n.appType) {
                    case i.APP_TYPE.WEB:
                    case i.APP_TYPE.WEBVIEW_IN_MINIAPP:
                        c.off(e, t);
                        break;
                    case i.APP_TYPE.WEEX:
                        l.off(e, t);
                        break;
                    default:
                        throw new Error("Not support global event in the platfrom: " + n.appType)
                    }
                }
            }
        },
        r.ddSdk.setPlatform(t.platformConfig)
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.platformConfig = void 0;
        var r = n(0)
          , o = n(4)
          , i = n(2)
          , a = n(7)
          , d = n(14)
          , s = n(245)
          , u = n(8)
          , c = n(13)
          , l = n(15);
        t.platformConfig = {
            platform: o.ENV_ENUM.ios,
            bridgeInit: function() {
                var e = o.getENV();
                return e.appType === i.APP_TYPE.MINI_APP ? Promise.resolve(a.default) : e.appType === i.APP_TYPE.WEBVIEW_IN_MINIAPP ? Promise.resolve(d.default) : e.appType === i.APP_TYPE.WEEX ? u.iosWeexBridge() : s.h5IosBridgeInit().then(function() {
                    return s.default
                })
            },
            authMethod: "runtime.permission.requestJsApis",
            event: {
                on: function(e, t) {
                    var n = o.getENV();
                    switch (n.appType) {
                    case i.APP_TYPE.WEB:
                    case i.APP_TYPE.WEBVIEW_IN_MINIAPP:
                        c.on(e, t);
                        break;
                    case i.APP_TYPE.WEEX:
                        l.on(e, t);
                        break;
                    default:
                        throw new Error("Not support global event in the platfrom: " + n.appType)
                    }
                },
                off: function(e, t) {
                    var n = o.getENV();
                    switch (n.appType) {
                    case i.APP_TYPE.WEB:
                    case i.APP_TYPE.WEBVIEW_IN_MINIAPP:
                        c.off(e, t);
                        break;
                    case i.APP_TYPE.WEEX:
                        l.off(e, t);
                        break;
                    default:
                        throw new Error("Not support global event in the platfrom: " + n.appType)
                    }
                }
            }
        },
        r.ddSdk.setPlatform(t.platformConfig)
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.isMobile = void 0;
        var r = n(4)
          , o = r.getENV();
        t.isMobile = function() {
            return o.platform === r.ENV_ENUM.ios
        }() || function() {
            return o.platform === r.ENV_ENUM.android
        }()
    }
    , function(e, t) {
        function n() {
            throw new Error("setTimeout has not been defined")
        }
        function r() {
            throw new Error("clearTimeout has not been defined")
        }
        function o(e) {
            if (c === setTimeout)
                return setTimeout(e, 0);
            if ((c === n || !c) && setTimeout)
                return c = setTimeout,
                setTimeout(e, 0);
            try {
                return c(e, 0)
            } catch (t) {
                try {
                    return c.call(null, e, 0)
                } catch (t) {
                    return c.call(this, e, 0)
                }
            }
        }
        function i(e) {
            if (l === clearTimeout)
                return clearTimeout(e);
            if ((l === r || !l) && clearTimeout)
                return l = clearTimeout,
                clearTimeout(e);
            try {
                return l(e)
            } catch (t) {
                try {
                    return l.call(null, e)
                } catch (t) {
                    return l.call(this, e)
                }
            }
        }
        function a() {
            _ && f && (_ = !1,
            f.length ? p = f.concat(p) : E = -1,
            p.length && d())
        }
        function d() {
            if (!_) {
                var e = o(a);
                _ = !0;
                for (var t = p.length; t; ) {
                    for (f = p,
                    p = []; ++E < t; )
                        f && f[E].run();
                    E = -1,
                    t = p.length
                }
                f = null,
                _ = !1,
                i(e)
            }
        }
        function s(e, t) {
            this.fun = e,
            this.array = t
        }
        function u() {}
        var c, l, v = e.exports = {};
        (function() {
            try {
                c = "function" == typeof setTimeout ? setTimeout : n
            } catch (e) {
                c = n
            }
            try {
                l = "function" == typeof clearTimeout ? clearTimeout : r
            } catch (e) {
                l = r
            }
        }
        )();
        var f, p = [], _ = !1, E = -1;
        v.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++)
                    t[n - 1] = arguments[n];
            p.push(new s(e,t)),
            1 !== p.length || _ || o(d)
        }
        ,
        s.prototype.run = function() {
            this.fun.apply(null, this.array)
        }
        ,
        v.title = "browser",
        v.browser = !0,
        v.env = {},
        v.argv = [],
        v.version = "",
        v.versions = {},
        v.on = u,
        v.addListener = u,
        v.once = u,
        v.off = u,
        v.removeListener = u,
        v.removeAllListeners = u,
        v.emit = u,
        v.prependListener = u,
        v.prependOnceListener = u,
        v.listeners = function(e) {
            return []
        }
        ,
        v.binding = function(e) {
            throw new Error("process.binding is not supported")
        }
        ,
        v.cwd = function() {
            return "/"
        }
        ,
        v.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }
        ,
        v.umask = function() {
            return 0
        }
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.beaconPicker$ = void 0;
        var i = n(0)
          , a = "biz.ATMBle.beaconPicker";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.0.7"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.0.7"
        },
        o)),
        t.beaconPicker$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.detectFace$ = void 0;
        var i = n(0)
          , a = "biz.ATMBle.detectFace";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.18"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.18"
        },
        o)),
        t.detectFace$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.detectFaceFullScreen$ = void 0;
        var i = n(0)
          , a = "biz.ATMBle.detectFaceFullScreen";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.18"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.18"
        },
        o)),
        t.detectFaceFullScreen$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.exclusiveLiveCheck$ = void 0;
        var i = n(0)
          , a = "biz.ATMBle.exclusiveLiveCheck";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.5.40"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.5.40"
        },
        o)),
        t.exclusiveLiveCheck$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.faceManager$ = void 0;
        var i = n(0)
          , a = "biz.ATMBle.faceManager";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.0.7"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.0.7"
        },
        o)),
        t.faceManager$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.punchModePicker$ = void 0;
        var i = n(0)
          , a = "biz.ATMBle.punchModePicker";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.0.7"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.0.7"
        },
        o)),
        t.punchModePicker$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.bindAlipay$ = void 0;
        var i = n(0)
          , a = "biz.alipay.bindAlipay";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.3.15"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.3.15"
        },
        o)),
        t.bindAlipay$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.openAuth$ = void 0;
        var i = n(0)
          , a = "biz.alipay.openAuth";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.8"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.8"
        },
        o)),
        t.openAuth$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.pay$ = void 0;
        var i = n(0)
          , a = "biz.alipay.pay";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.8.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.8.0"
        },
        o)),
        t.pay$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.openAccountPwdLoginPage$ = void 0;
        var i = n(0)
          , a = "biz.auth.openAccountPwdLoginPage";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.3.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.3.0"
        },
        o)),
        t.openAccountPwdLoginPage$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.requestAuthInfo$ = void 0;
        var i = n(0)
          , a = "biz.auth.requestAuthInfo";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.19"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.19"
        },
        o)),
        t.requestAuthInfo$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.chooseDateTime$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.calendar.chooseDateTime";
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.5.0",
            paramsDeal: a.addDefaultCorpIdParamsDeal
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.5.0",
            paramsDeal: a.addDefaultCorpIdParamsDeal
        },
        o)),
        t.chooseDateTime$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.chooseHalfDay$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.calendar.chooseHalfDay";
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.5.0",
            paramsDeal: a.addDefaultCorpIdParamsDeal
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.5.0",
            paramsDeal: a.addDefaultCorpIdParamsDeal
        },
        o)),
        t.chooseHalfDay$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.chooseInterval$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.calendar.chooseInterval";
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.5.0",
            paramsDeal: a.addDefaultCorpIdParamsDeal
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.5.0",
            paramsDeal: a.addDefaultCorpIdParamsDeal
        },
        o)),
        t.chooseInterval$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.chooseOneDay$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.calendar.chooseOneDay";
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.5.0",
            paramsDeal: a.addDefaultCorpIdParamsDeal
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.5.0",
            paramsDeal: a.addDefaultCorpIdParamsDeal
        },
        o)),
        t.chooseOneDay$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.chooseConversationByCorpId$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.chat.chooseConversationByCorpId"
          , s = a.genDefaultParamsDealFn({
            max: 50
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.6.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.6.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.7.11",
            paramsDeal: s
        },
        o)),
        t.chooseConversationByCorpId$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.collectSticker$ = void 0;
        var i = n(0)
          , a = "biz.chat.collectSticker";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.6.25"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.6.25"
        },
        o)),
        t.collectSticker$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.createSceneGroup$ = void 0;
        var i = n(0)
          , a = "biz.chat.createSceneGroup";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.7.17"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.7.17"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.7.17"
        },
        o)),
        t.createSceneGroup$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getRealmCid$ = void 0;
        var i = n(0)
          , a = "biz.chat.getRealmCid";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.7.12"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.7.12"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.7.12"
        },
        o)),
        t.getRealmCid$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.locationChatMessage$ = void 0;
        var i = n(0)
          , a = "biz.chat.locationChatMessage";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.7.6"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.7.6"
        },
        o)),
        t.locationChatMessage$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.openSingleChat$ = void 0;
        var i = n(0)
          , a = "biz.chat.openSingleChat";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.4.10"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.4.10"
        },
        o)),
        t.openSingleChat$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.pickConversation$ = void 0;
        var i = n(0)
          , a = "biz.chat.pickConversation";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.2"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.2"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.7.9"
        },
        o)),
        t.pickConversation$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.sendEmotion$ = void 0;
        var i = n(0)
          , a = "biz.chat.sendEmotion";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.6.12"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.6.12"
        },
        o)),
        t.sendEmotion$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.toConversation$ = void 0;
        var i = n(0)
          , a = "biz.chat.toConversation";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.6.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.6.0"
        },
        o)),
        t.toConversation$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.toConversationByOpenConversationId$ = void 0;
        var i = n(0)
          , a = "biz.chat.toConversationByOpenConversationId";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.30"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.30"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "5.1.33"
        },
        o)),
        t.toConversationByOpenConversationId$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.setData$ = void 0;
        var i = n(0)
          , a = "biz.clipboardData.setData";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.7.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.7.0"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.6.1"
        },
        o)),
        t.setData$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.createCloudCall$ = void 0;
        var i = n(0)
          , a = "biz.conference.createCloudCall";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.0.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.0.0"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "6.0.9"
        },
        o)),
        t.createCloudCall$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getCloudCallInfo$ = void 0;
        var i = n(0)
          , a = "biz.conference.getCloudCallInfo";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.0.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.0.0"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "6.0.9"
        },
        o)),
        t.getCloudCallInfo$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getCloudCallList$ = void 0;
        var i = n(0)
          , a = "biz.conference.getCloudCallList";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.0.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.0.0"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "6.0.9"
        },
        o)),
        t.getCloudCallList$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.videoConfCall$ = void 0;
        var i = n(0)
          , a = "biz.conference.videoConfCall";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.0.8"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.0.8"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "5.1.28"
        },
        o)),
        t.videoConfCall$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.choose$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.contact.choose"
          , s = a.genDefaultParamsDealFn({
            multiple: !0,
            startWithDepartmentId: 0,
            users: []
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.5.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o)),
        t.choose$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.chooseMobileContacts$ = void 0;
        var i = n(0)
          , a = "biz.contact.chooseMobileContacts";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.1"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.1"
        },
        o)),
        t.chooseMobileContacts$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.complexPicker$ = void 0;
        var i = n(0)
          , a = "biz.contact.complexPicker";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.9.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.9.0"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.3.5"
        },
        o)),
        t.complexPicker$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.createGroup$ = void 0;
        var i = n(0)
          , a = "biz.contact.createGroup";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.6.1"
        },
        o)),
        t.createGroup$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.departmentsPicker$ = void 0;
        var i = n(0)
          , a = "biz.contact.departmentsPicker";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "4.2.5"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "3.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.0"
        },
        o)),
        t.departmentsPicker$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.externalComplexPicker$ = void 0;
        var i = n(0)
          , a = "biz.contact.externalComplexPicker";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "3.0.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "3.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.0"
        },
        o)),
        t.externalComplexPicker$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.externalEditForm$ = void 0;
        var i = n(0)
          , a = "biz.contact.externalEditForm";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.0"
        },
        o)),
        t.externalEditForm$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.rolesPicker$ = void 0;
        var i = n(0)
          , a = "biz.contact.rolesPicker";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.3.16"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.3.16"
        },
        o)),
        t.rolesPicker$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.setRule$ = void 0;
        var i = n(0)
          , a = "biz.contact.setRule";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.15"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.15"
        },
        o)),
        t.setRule$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.chooseSpaceDir$ = void 0;
        var i = n(0)
          , a = "biz.cspace.chooseSpaceDir";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.5.6"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.5.6"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "5.1.27"
        },
        o)),
        t.chooseSpaceDir$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.delete$ = void 0;
        var i = n(0)
          , a = "biz.cspace.delete";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.5.21"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.5.21"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.5.21"
        },
        o)),
        t.delete$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.preview$ = void 0;
        var i = n(0)
          , a = "biz.cspace.preview";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "3.0.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.7.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.7.0"
        },
        o)),
        t.preview$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.previewDentryImages$ = void 0;
        var i = n(0)
          , a = "biz.cspace.previewDentryImages";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.3.30"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.3.30"
        },
        o)),
        t.previewDentryImages$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.saveFile$ = void 0;
        var i = n(0)
          , a = "biz.cspace.saveFile";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.7.6"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.7.6"
        },
        o)),
        t.saveFile$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.choose$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.customContact.choose"
          , s = a.genDefaultParamsDealFn({
            isShowCompanyName: !1,
            max: 50
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "3.0.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.5.2",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.5.2",
            paramsDeal: s
        },
        o)),
        t.choose$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.multipleChoose$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.customContact.multipleChoose"
          , s = a.genDefaultParamsDealFn({
            isShowCompanyName: !1,
            max: 50
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "3.0.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o)),
        t.multipleChoose$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.create$ = void 0;
        var i = n(0)
          , a = "biz.ding.create";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.5.1",
            resultDeal: function(e) {
                return "" === e ? e = {
                    dingCreateResult: !1
                } : "object" == typeof e && (e.dingCreateResult = !!e.dingCreateResult),
                e
            }
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.5.1"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.5.9"
        },
        o)),
        t.create$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.post$ = void 0;
        var i = n(0)
          , a = "biz.ding.post";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "3.0.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.post$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.finishMiniCourseByRecordId$ = void 0;
        var i = n(0)
          , a = "biz.edu.finishMiniCourseByRecordId";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.0.15"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.0.15"
        },
        o)),
        t.finishMiniCourseByRecordId$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getMiniCourseDraftList$ = void 0;
        var i = n(0)
          , a = "biz.edu.getMiniCourseDraftList";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.0.15"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.0.15"
        },
        o)),
        t.getMiniCourseDraftList$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.joinClassroom$ = void 0;
        var i = n(0)
          , a = "biz.edu.joinClassroom";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.0.15"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.0.15"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "6.0.15"
        },
        o)),
        t.joinClassroom$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.makeMiniCourse$ = void 0;
        var i = n(0)
          , a = "biz.edu.makeMiniCourse";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.0.15"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.0.15"
        },
        o)),
        t.makeMiniCourse$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.newMsgNotificationStatus$ = void 0;
        var i = n(0)
          , a = "biz.edu.newMsgNotificationStatus";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.3.20"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.3.20"
        },
        o)),
        t.newMsgNotificationStatus$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.startAuth$ = void 0;
        var i = n(0)
          , a = "biz.edu.startAuth";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.3.20"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.3.20"
        },
        o)),
        t.startAuth$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.tokenFaceImg$ = void 0;
        var i = n(0)
          , a = "biz.edu.tokenFaceImg";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.3.20"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.3.20"
        },
        o)),
        t.tokenFaceImg$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.notifyWeex$ = void 0;
        var i = n(0)
          , a = "biz.event.notifyWeex";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.5.0"
        },
        o)),
        t.notifyWeex$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.fetchData$ = void 0;
        var i = n(0)
          , a = "biz.intent.fetchData";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.7.6"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.7.6"
        },
        o)),
        t.fetchData$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.bind$ = void 0;
        var i = n(0)
          , a = "biz.iot.bind";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.6.34"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.6.34"
        },
        o)),
        t.bind$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.bindMeetingRoom$ = void 0;
        var i = n(0)
          , a = "biz.iot.bindMeetingRoom";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.6.34"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.6.34"
        },
        o)),
        t.bindMeetingRoom$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getDeviceProperties$ = void 0;
        var i = n(0)
          , a = "biz.iot.getDeviceProperties";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.6.42"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.6.42"
        },
        o)),
        t.getDeviceProperties$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.invokeThingService$ = void 0;
        var i = n(0)
          , a = "biz.iot.invokeThingService";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.6.42"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.6.42"
        },
        o)),
        t.invokeThingService$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.queryMeetingRoomList$ = void 0;
        var i = n(0)
          , a = "biz.iot.queryMeetingRoomList";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.6.34"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.6.34"
        },
        o)),
        t.queryMeetingRoomList$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.setDeviceProperties$ = void 0;
        var i = n(0)
          , a = "biz.iot.setDeviceProperties";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.6.42"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.6.42"
        },
        o)),
        t.setDeviceProperties$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.unbind$ = void 0;
        var i = n(0)
          , a = "biz.iot.unbind";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.6.34"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.6.34"
        },
        o)),
        t.unbind$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.startClassRoom$ = void 0;
        var i = n(0)
          , a = "biz.live.startClassRoom";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "5.1.19"
        },
        o)),
        t.startClassRoom$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.startUnifiedLive$ = void 0;
        var i = n(0)
          , a = "biz.live.startUnifiedLive";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "5.1.18"
        },
        o)),
        t.startUnifiedLive$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.locate$ = void 0;
        var i = n(0)
          , a = "biz.map.locate";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.locate$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.search$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.map.search"
          , s = a.genDefaultParamsDealFn({
            scope: 500
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o)),
        t.search$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.view$ = void 0;
        var i = n(0)
          , a = "biz.map.view";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.8.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.8.0"
        },
        o)),
        t.view$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.compressVideo$ = void 0;
        var i = n(0)
          , a = "biz.media.compressVideo";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.6.37"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.6.37"
        },
        o)),
        t.compressVideo$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.openApp$ = void 0;
        var i = n(0)
          , a = "biz.microApp.openApp";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.5.6"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.5.6"
        },
        o)),
        t.openApp$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.close$ = void 0;
        var i = n(0)
          , a = "biz.navigation.close";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.3.5"
        },
        o)),
        t.close$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.goBack$ = void 0;
        var i = n(0)
          , a = "biz.navigation.goBack";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.6.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.6.0"
        },
        o)),
        t.goBack$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.hideBar$ = void 0;
        var i = n(0)
          , a = "biz.navigation.hideBar";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.5.6"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.5.6"
        },
        o)),
        t.hideBar$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.navigateBackPage$ = void 0;
        var i = n(0)
          , a = "biz.navigation.navigateBackPage";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.5.31"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.5.31"
        },
        o)),
        t.navigateBackPage$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.navigateToMiniProgram$ = void 0;
        var i = n(0)
          , a = "biz.navigation.navigateToMiniProgram";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.31"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.31"
        },
        o)),
        t.navigateToMiniProgram$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.navigateToPage$ = void 0;
        var i = n(0)
          , a = "biz.navigation.navigateToPage";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.5.31"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.5.31"
        },
        o)),
        t.navigateToPage$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.quit$ = void 0;
        var i = n(0)
          , a = "biz.navigation.quit";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.5.0"
        },
        o)),
        t.quit$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.replace$ = void 0;
        var i = n(0)
          , a = "biz.navigation.replace";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.4.6"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.4.6"
        },
        o)),
        t.replace$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.setIcon$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.navigation.setIcon"
          , s = a.genDefaultParamsDealFn({
            watch: !0,
            showIcon: !0,
            iconIndex: 1
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o)),
        t.setIcon$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.setLeft$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.navigation.setLeft"
          , s = a.genDefaultParamsDealFn({
            watch: !0,
            show: !0,
            control: !1,
            showIcon: !0,
            text: ""
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.5.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o)),
        t.setLeft$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.setMenu$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.navigation.setMenu";
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.6.0",
            paramsDeal: a.addWatchParamsDeal
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.6.0",
            paramsDeal: a.addWatchParamsDeal
        },
        o)),
        t.setMenu$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.setRight$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.navigation.setRight"
          , s = a.genDefaultParamsDealFn({
            watch: !0,
            show: !0,
            control: !1,
            showIcon: !0,
            text: ""
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o)),
        t.setRight$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.setTitle$ = void 0;
        var i = n(0)
          , a = "biz.navigation.setTitle";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.5.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.setTitle$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.componentPunchFromPartner$ = void 0;
        var i = n(0)
          , a = "biz.pbp.componentPunchFromPartner";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.10"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.10"
        },
        o)),
        t.componentPunchFromPartner$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.startMatchRuleFromPartner$ = void 0;
        var i = n(0)
          , a = "biz.pbp.startMatchRuleFromPartner";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.10"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.10"
        },
        o)),
        t.startMatchRuleFromPartner$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.stopMatchRuleFromPartner$ = void 0;
        var i = n(0)
          , a = "biz.pbp.stopMatchRuleFromPartner";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.10"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.10"
        },
        o)),
        t.stopMatchRuleFromPartner$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getRealtimeTracingStatus$ = void 0;
        var i = n(0)
          , a = "biz.realm.getRealtimeTracingStatus";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.android] = {
            vs: "6.0.13"
        },
        o)),
        t.getRealtimeTracingStatus$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getUserExclusiveInfo$ = void 0;
        var i = n(0)
          , a = "biz.realm.getUserExclusiveInfo";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.0.14"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.0.14"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "6.0.17"
        },
        o)),
        t.getUserExclusiveInfo$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.startRealtimeTracing$ = void 0;
        var i = n(0)
          , a = "biz.realm.startRealtimeTracing";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.android] = {
            vs: "6.0.13"
        },
        o)),
        t.startRealtimeTracing$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.stopRealtimeTracing$ = void 0;
        var i = n(0)
          , a = "biz.realm.stopRealtimeTracing";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.android] = {
            vs: "6.0.13"
        },
        o)),
        t.stopRealtimeTracing$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.subscribe$ = void 0;
        var i = n(0)
          , a = "biz.realm.subscribe";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.7.18"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.7.18"
        },
        o)),
        t.subscribe$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.unsubscribe$ = void 0;
        var i = n(0)
          , a = "biz.realm.unsubscribe";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.7.18"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.7.18"
        },
        o)),
        t.unsubscribe$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getInfo$ = void 0;
        var i = n(0)
          , a = "biz.resource.getInfo";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.5.10"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.5.10"
        },
        o)),
        t.getInfo$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.reportDebugMessage$ = void 0;
        var i = n(0)
          , a = "biz.resource.reportDebugMessage";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.5.20"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.5.20"
        },
        o)),
        t.reportDebugMessage$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.addShortCut$ = void 0;
        var i = n(0)
          , a = "biz.shortCut.addShortCut";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.android] = {
            vs: "4.7.32"
        },
        o)),
        t.addShortCut$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.closeUnpayOrder$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.store.closeUnpayOrder";
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.3.7",
            paramsDeal: a.genBizStoreParamsDealFn
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.3.7",
            paramsDeal: a.genBizStoreParamsDealFn
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.5.3",
            paramsDeal: a.genBizStoreParamsDealFn
        },
        o)),
        t.closeUnpayOrder$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.createOrder$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.store.createOrder";
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.3.7",
            paramsDeal: a.genBizStoreParamsDealFn
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.3.7",
            paramsDeal: a.genBizStoreParamsDealFn
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.5.3",
            paramsDeal: a.genBizStoreParamsDealFn
        },
        o)),
        t.createOrder$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getPayUrl$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.store.getPayUrl";
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.3.7",
            paramsDeal: a.genBizStoreParamsDealFn
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.3.7",
            paramsDeal: a.genBizStoreParamsDealFn
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.5.3",
            paramsDeal: a.genBizStoreParamsDealFn
        },
        o)),
        t.getPayUrl$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.inquiry$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.store.inquiry";
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.3.7",
            paramsDeal: a.genBizStoreParamsDealFn
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.3.7",
            paramsDeal: a.genBizStoreParamsDealFn
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.5.3",
            paramsDeal: a.genBizStoreParamsDealFn
        },
        o)),
        t.inquiry$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.isTab$ = void 0;
        var i = n(0)
          , a = "biz.tabwindow.isTab";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "6.5.10"
        },
        o)),
        t.isTab$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.call$ = void 0;
        var i = n(0)
          , a = "biz.telephone.call";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.call$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.checkBizCall$ = void 0;
        var i = n(0)
          , a = "biz.telephone.checkBizCall";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "4.0.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "3.5.6"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.5.6"
        },
        o)),
        t.checkBizCall$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.quickCallList$ = void 0;
        var i = n(0)
          , a = "biz.telephone.quickCallList";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "3.5.6"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "3.5.6"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.5.6"
        },
        o)),
        t.quickCallList$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.showCallMenu$ = void 0;
        var i = n(0)
          , a = "biz.telephone.showCallMenu";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.8.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.8.0"
        },
        o)),
        t.showCallMenu$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.checkPassword$ = void 0;
        var i = n(0)
          , a = "biz.user.checkPassword";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.5.8"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.5.8"
        },
        o)),
        t.checkPassword$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.get$ = void 0;
        var i = n(0)
          , a = "biz.user.get";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "3.0.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.get$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.callComponent$ = void 0;
        var i = n(0)
          , a = "biz.util.callComponent";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.3.35"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.3.35"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "6.3.35"
        },
        o)),
        t.callComponent$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.chooseImage$ = void 0;
        var i = n(0)
          , a = "biz.util.chooseImage";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.1"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.1"
        },
        o)),
        t.chooseImage$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.chosen$ = void 0;
        var i = n(0)
          , a = "biz.util.chosen";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.chosen$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.clearWebStoreCache$ = void 0;
        var i = n(0)
          , a = "biz.util.clearWebStoreCache";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "6.0.22"
        },
        o)),
        t.clearWebStoreCache$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.closePreviewImage$ = void 0;
        var i = n(0)
          , a = "biz.util.closePreviewImage";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.0.19"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.0.17"
        },
        o)),
        t.closePreviewImage$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.compressImage$ = void 0;
        var i = n(0)
          , a = "biz.util.compressImage";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.1"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.1"
        },
        o)),
        t.compressImage$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.datepicker$ = void 0;
        var i = n(0)
          , a = "biz.util.datepicker";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.datepicker$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.datetimepicker$ = void 0;
        var i = n(0)
          , a = "biz.util.datetimepicker";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.datetimepicker$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.decrypt$ = void 0;
        var i = n(0)
          , a = "biz.util.decrypt";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "3.0.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.9.1"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.9.1"
        },
        o)),
        t.decrypt$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.downloadFile$ = void 0;
        var i = n(0)
          , a = "biz.util.downloadFile";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.5.0"
        },
        o)),
        t.downloadFile$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.encrypt$ = void 0;
        var i = n(0)
          , a = "biz.util.encrypt";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "3.0.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.9.1"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.9.1"
        },
        o)),
        t.encrypt$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getPerfInfo$ = void 0;
        var i = n(0)
          , a = "biz.util.getPerfInfo";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.14"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.14"
        },
        o)),
        t.getPerfInfo$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.invokeWorkbench$ = void 0;
        var i = n(0)
          , a = "biz.util.invokeWorkbench";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "6.0.8"
        },
        o)),
        t.invokeWorkbench$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.isEnableGPUAcceleration$ = void 0;
        var i = n(0)
          , a = "biz.util.isEnableGPUAcceleration";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "6.0.22"
        },
        o)),
        t.isEnableGPUAcceleration$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.isLocalFileExist$ = void 0;
        var i = n(0)
          , a = "biz.util.isLocalFileExist";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.5.0"
        },
        o)),
        t.isLocalFileExist$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.multiSelect$ = void 0;
        var i = n(0)
          , a = "biz.util.multiSelect";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.0.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.0.0"
        },
        o)),
        t.multiSelect$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.open$ = void 0;
        var i = n(0)
          , a = "biz.util.open";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.7.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.open$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.openLink$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.util.openLink"
          , s = a.genDefaultParamsDealFn({
            credible: !0,
            showMenuBar: !0
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.7.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o)),
        t.openLink$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.openLocalFile$ = void 0;
        var i = n(0)
          , a = "biz.util.openLocalFile";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.5.0"
        },
        o)),
        t.openLocalFile$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.openModal$ = void 0;
        var i = n(0)
          , a = "biz.util.openModal";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.5.0"
        },
        o)),
        t.openModal$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.openSlidePanel$ = void 0;
        var i = n(0)
          , a = "biz.util.openSlidePanel";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.5.0"
        },
        o)),
        t.openSlidePanel$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.presentWindow$ = void 0;
        var i = n(0)
          , a = "biz.util.presentWindow";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.8.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.8.0"
        },
        o)),
        t.presentWindow$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.previewImage$ = void 0;
        var i = n(0)
          , a = "biz.util.previewImage";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.7.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.previewImage$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.previewVideo$ = void 0;
        var i = n(0)
          , a = "biz.util.previewVideo";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.3.7"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.3.7"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.6.33"
        },
        o)),
        t.previewVideo$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.saveImage$ = void 0;
        var i = n(0)
          , a = "biz.util.saveImage";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.1"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.1"
        },
        o)),
        t.saveImage$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.scan$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.util.scan"
          , s = a.genDefaultParamsDealFn({
            type: "qrCode"
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o)),
        t.scan$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.scanCard$ = void 0;
        var i = n(0)
          , a = "biz.util.scanCard";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.8.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.8.0"
        },
        o)),
        t.scanCard$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.setGPUAcceleration$ = void 0;
        var i = n(0)
          , a = "biz.util.setGPUAcceleration";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "6.0.22"
        },
        o)),
        t.setGPUAcceleration$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.setScreenBrightnessAndKeepOn$ = void 0;
        var i = n(0)
          , a = "biz.util.setScreenBrightnessAndKeepOn";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.6.37"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.3.3"
        },
        o)),
        t.setScreenBrightnessAndKeepOn$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.setScreenKeepOn$ = void 0;
        var i = n(0)
          , a = "biz.util.setScreenKeepOn";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.26"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.26"
        },
        o)),
        t.setScreenKeepOn$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.share$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.util.share"
          , s = a.genDefaultParamsDealFn({
            title: "",
            buttonName: "确定"
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.6.37",
            paramsDeal: s
        },
        o)),
        t.share$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.shareImage$ = void 0;
        var i = n(0)
          , a = "biz.util.shareImage";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.1"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.1"
        },
        o)),
        t.shareImage$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.startDocSign$ = void 0;
        var i = n(0)
          , a = "biz.util.startDocSign";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.android] = {
            vs: "4.6.33"
        },
        o)),
        t.startDocSign$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.systemShare$ = void 0;
        var i = n(0)
          , a = "biz.util.systemShare";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.5.11"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.5.11"
        },
        o)),
        t.systemShare$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.timepicker$ = void 0;
        var i = n(0)
          , a = "biz.util.timepicker";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.timepicker$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.uploadAttachment$ = void 0;
        var i = n(0)
          , a = "biz.util.uploadAttachment";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "3.0.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.7.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.7.0"
        },
        o)),
        t.uploadAttachment$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.uploadFile$ = void 0;
        var i = n(0)
          , a = "biz.util.uploadFile";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.5.28"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.5.27"
        },
        o)),
        t.uploadFile$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.uploadImage$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "biz.util.uploadImage"
          , s = a.genDefaultParamsDealFn({
            multiple: !1
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.5.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o)),
        t.uploadImage$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.uploadImageFromCamera$ = void 0;
        var i = n(0)
          , a = "biz.util.uploadImageFromCamera";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.uploadImageFromCamera$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.ut$ = void 0;
        var i = n(0)
          , a = "biz.util.ut"
          , d = function(e) {
            var t = Object.assign({}, e)
              , n = t.value
              , r = [];
            if (n && "object" == typeof n) {
                for (var o in n)
                    void 0 !== n[o] && r.push(o + "=" + n[o]);
                n = r.join(",")
            }
            return t.value = n || "",
            t
        };
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "3.5.0",
            paramsDeal: d
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: function(e) {
                var t = Object.assign({}, e)
                  , n = t.value;
                return n && "object" == typeof n && (n = JSON.stringify(n)),
                t.value = n,
                t
            }
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: d
        },
        o)),
        t.ut$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.openBindIDCard$ = void 0;
        var i = n(0)
          , a = "biz.verify.openBindIDCard";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.5.21"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.5.21"
        },
        o)),
        t.openBindIDCard$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.startAuth$ = void 0;
        var i = n(0)
          , a = "biz.verify.startAuth";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.5.21"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.5.21"
        },
        o)),
        t.startAuth$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getWatermarkInfo$ = void 0;
        var i = n(0)
          , a = "biz.watermarkCamera.getWatermarkInfo";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.5.25"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.5.25"
        },
        o)),
        t.getWatermarkInfo$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.setWatermarkInfo$ = void 0;
        var i = n(0)
          , a = "biz.watermarkCamera.setWatermarkInfo";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.5.25"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.5.25"
        },
        o)),
        t.setWatermarkInfo$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.requestAuthCode$ = void 0;
        var i = n(0)
          , a = "channel.permission.requestAuthCode";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.0.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.0.0"
        },
        o)),
        t.requestAuthCode$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.clearShake$ = void 0;
        var i = n(0)
          , a = "device.accelerometer.clearShake";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.clearShake$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.watchShake$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "device.accelerometer.watchShake";
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: function(e) {
                return a.forceChangeParamsDealFn({
                    sensitivity: 3.2
                })(a.addWatchParamsDeal(e))
            }
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: a.addWatchParamsDeal
        },
        o)),
        t.watchShake$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.download$ = void 0;
        var i = n(0)
          , a = "device.audio.download";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.8.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.8.0"
        },
        o)),
        t.download$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.onPlayEnd$ = void 0;
        var i = n(0)
          , a = "device.audio.onPlayEnd";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.8.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.8.0"
        },
        o)),
        t.onPlayEnd$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.onRecordEnd$ = void 0;
        var i = n(0)
          , a = "device.audio.onRecordEnd";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.8.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.8.0"
        },
        o)),
        t.onRecordEnd$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.pause$ = void 0;
        var i = n(0)
          , a = "device.audio.pause";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.8.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.8.0"
        },
        o)),
        t.pause$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.play$ = void 0;
        var i = n(0)
          , a = "device.audio.play";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.8.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.8.0"
        },
        o)),
        t.play$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.resume$ = void 0;
        var i = n(0)
          , a = "device.audio.resume";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.8.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.8.0"
        },
        o)),
        t.resume$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.startRecord$ = void 0;
        var i = n(0)
          , a = "device.audio.startRecord";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.8.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.8.0"
        },
        o)),
        t.startRecord$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.stop$ = void 0;
        var i = n(0)
          , a = "device.audio.stop";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.8.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.8.0"
        },
        o)),
        t.stop$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.stopRecord$ = void 0;
        var i = n(0)
          , a = "device.audio.stopRecord";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.8.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.8.0"
        },
        o)),
        t.stopRecord$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.translateVoice$ = void 0;
        var i = n(0)
          , a = "device.audio.translateVoice";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.8.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.8.0"
        },
        o)),
        t.translateVoice$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getInterface$ = void 0;
        var i = n(0)
          , a = "device.base.getInterface";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.getInterface$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getPhoneInfo$ = void 0;
        var i = n(0)
          , a = "device.base.getPhoneInfo";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.5.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.5.0"
        },
        o)),
        t.getPhoneInfo$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getScanWifiListAsync$ = void 0;
        var i = n(0)
          , a = "device.base.getScanWifiListAsync";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.6.41"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.3.0"
        },
        o)),
        t.getScanWifiListAsync$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getUUID$ = void 0;
        var i = n(0)
          , a = "device.base.getUUID";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.7.6"
        },
        o)),
        t.getUUID$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getWifiStatus$ = void 0;
        var i = n(0)
          , a = "device.base.getWifiStatus";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.11.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.11.0"
        },
        o)),
        t.getWifiStatus$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.openSystemSetting$ = void 0;
        var i = n(0)
          , a = "device.base.openSystemSetting";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.android] = {
            vs: "6.0.27"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "6.3.15"
        },
        o)),
        t.openSystemSetting$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getNetworkType$ = void 0;
        var i = n(0)
          , a = "device.connection.getNetworkType";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.getNetworkType$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.checkPermission$ = void 0;
        var i = n(0)
          , a = "device.geolocation.checkPermission";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.android] = {
            vs: "4.5.0"
        },
        o)),
        t.checkPermission$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.get$ = void 0;
        var i = n(0)
          , a = "device.geolocation.get";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.get$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.start$ = void 0;
        var i = n(0)
          , a = "device.geolocation.start";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.4.7"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.4.7"
        },
        o)),
        t.start$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.status$ = void 0;
        var i = n(0)
          , a = "device.geolocation.status";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.4.8"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.4.8"
        },
        o)),
        t.status$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.stop$ = void 0;
        var i = n(0)
          , a = "device.geolocation.stop";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "3.4.7"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.4.7"
        },
        o)),
        t.stop$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.checkInstalledApps$ = void 0;
        var i = n(0)
          , a = "device.launcher.checkInstalledApps";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.checkInstalledApps$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.launchApp$ = void 0;
        var i = n(0)
          , a = "device.launcher.launchApp";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.launchApp$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.nfcRead$ = void 0;
        var i = n(0)
          , a = "device.nfc.nfcRead";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.11.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.11.0"
        },
        o)),
        t.nfcRead$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.nfcStop$ = void 0;
        var i = n(0)
          , a = "device.nfc.nfcStop";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.3.9"
        },
        o[i.ENV_ENUM.android] = {
            vs: "4.3.9"
        },
        o)),
        t.nfcStop$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.nfcWrite$ = void 0;
        var i = n(0)
          , a = "device.nfc.nfcWrite";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.11.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.11.0"
        },
        o)),
        t.nfcWrite$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.actionSheet$ = void 0;
        var i = n(0)
          , a = "device.notification.actionSheet";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "3.0.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.actionSheet$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.alert$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "device.notification.alert"
          , s = a.genDefaultParamsDealFn({
            title: "",
            buttonName: "确定"
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.5.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o)),
        t.alert$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.confirm$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "device.notification.confirm"
          , s = a.genDefaultParamsDealFn({
            title: "",
            buttonLabels: ["确定", "取消"]
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.5.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o)),
        t.confirm$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.extendModal$ = void 0;
        var i = n(0)
          , a = "device.notification.extendModal";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.5.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.5.0"
        },
        o)),
        t.extendModal$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.hidePreloader$ = void 0;
        var i = n(0)
          , a = "device.notification.hidePreloader";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.hidePreloader$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.modal$ = void 0;
        var i = n(0)
          , a = "device.notification.modal";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "4.2.5"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.modal$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.prompt$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "device.notification.prompt"
          , s = a.genDefaultParamsDealFn({
            title: "",
            buttonLabels: ["确定", "取消"]
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.7.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o)),
        t.prompt$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.showPreloader$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "device.notification.showPreloader"
          , s = a.genDefaultParamsDealFn({
            text: "加载中...",
            showIcon: !0
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o)),
        t.showPreloader$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.toast$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "device.notification.toast"
          , s = a.genDefaultParamsDealFn({
            text: "toast",
            duration: 3,
            delay: 0
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "2.5.0",
            paramsDeal: function(e) {
                return e.icon && !e.type && ("success" === e.icon ? e.type = "success" : "error" === e.icon && (e.type = "error")),
                e
            }
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o)),
        t.toast$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.vibrate$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "device.notification.vibrate"
          , s = a.genDefaultParamsDealFn({
            duration: 300
        });
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: s
        },
        o)),
        t.vibrate$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.insetAdjust$ = void 0;
        var i = n(0)
          , a = "device.screen.insetAdjust";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "4.6.18"
        },
        o)),
        t.insetAdjust$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.resetView$ = void 0;
        var i = n(0)
          , a = "device.screen.resetView";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.android] = {
            vs: "4.0.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "4.0.0"
        },
        o)),
        t.resetView$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.rotateView$ = void 0;
        var i = n(0)
          , a = "device.screen.rotateView";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.android] = {
            vs: "4.0.0"
        },
        o[i.ENV_ENUM.ios] = {
            vs: "4.0.0"
        },
        o)),
        t.rotateView$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.keepAlive$ = void 0;
        var i = n(0)
          , a = "media.voiceRecorder.keepAlive";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.12"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.12"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "5.1.12"
        },
        o)),
        t.keepAlive$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.pause$ = void 0;
        var i = n(0)
          , a = "media.voiceRecorder.pause";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.12"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.12"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "5.1.12"
        },
        o)),
        t.pause$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.resume$ = void 0;
        var i = n(0)
          , a = "media.voiceRecorder.resume";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.12"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.12"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "5.1.12"
        },
        o)),
        t.resume$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.start$ = void 0;
        var i = n(0)
          , a = "media.voiceRecorder.start";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.12"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.12"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "5.1.12"
        },
        o)),
        t.start$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.stop$ = void 0;
        var i = n(0)
          , a = "media.voiceRecorder.stop";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "5.1.12"
        },
        o[i.ENV_ENUM.android] = {
            vs: "5.1.12"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "5.1.12"
        },
        o)),
        t.stop$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.loginGovNet$ = void 0;
        var i = n(0)
          , a = "net.bjGovApn.loginGovNet";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.android] = {
            vs: "4.5.16"
        },
        o)),
        t.loginGovNet$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.fetch$ = void 0;
        var i = n(0)
          , a = "runtime.message.fetch";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.6.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.6.0"
        },
        o)),
        t.fetch$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.post$ = void 0;
        var i = n(0)
          , a = "runtime.message.post";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.6.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.6.0"
        },
        o)),
        t.post$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getLoadTime$ = void 0;
        var i = n(0)
          , a = "runtime.monitor.getLoadTime";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.0.10"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.0.10"
        },
        o)),
        t.getLoadTime$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.requestAuthCode$ = void 0;
        var i = n(0)
          , a = "runtime.permission.requestAuthCode"
          , d = function(e) {
            return Object.assign(e, {
                url: location.href.split("#")[0]
            })
        };
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "3.0.0",
            paramsDeal: d
        },
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.requestAuthCode$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.requestOperateAuthCode$ = void 0;
        var i = n(0)
          , a = "runtime.permission.requestOperateAuthCode"
          , d = function(e) {
            return Object.assign(e, {
                url: location.href.split("#")[0]
            })
        };
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.pc] = {
            vs: "3.3.0",
            paramsDeal: d
        },
        o[i.ENV_ENUM.ios] = {
            vs: "3.3.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "3.3.0"
        },
        o)),
        t.requestOperateAuthCode$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.plain$ = void 0;
        var i = n(0)
          , a = "ui.input.plain";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.plain$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.addToFloat$ = void 0;
        var i = n(0)
          , a = "ui.multitask.addToFloat";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.5.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.5.0"
        },
        o)),
        t.addToFloat$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.removeFromFloat$ = void 0;
        var i = n(0)
          , a = "ui.multitask.removeFromFloat";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.5.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.5.0"
        },
        o)),
        t.removeFromFloat$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.close$ = void 0;
        var i = n(0)
          , a = "ui.nav.close";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.6.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.6.0"
        },
        o)),
        t.close$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getCurrentId$ = void 0;
        var i = n(0)
          , a = "ui.nav.getCurrentId";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.6.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.6.0"
        },
        o)),
        t.getCurrentId$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.go$ = void 0;
        var i = n(0)
          , a = "ui.nav.go";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.6.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.6.0"
        },
        o)),
        t.go$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.preload$ = void 0;
        var i = n(0)
          , a = "ui.nav.preload";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.6.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.6.0"
        },
        o)),
        t.preload$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.recycle$ = void 0;
        var i = n(0)
          , a = "ui.nav.recycle";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.6.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.6.0"
        },
        o)),
        t.recycle$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.setColors$ = void 0;
        var i = n(0)
          , a = "ui.progressBar.setColors";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.setColors$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.disable$ = void 0;
        var i = n(0)
          , a = "ui.pullToRefresh.disable";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.disable$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(d, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.enable$ = void 0;
        var i = n(0)
          , a = n(1)
          , d = "ui.pullToRefresh.enable";
        i.ddSdk.setAPI(d, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: a.addWatchParamsDeal
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0",
            paramsDeal: a.addWatchParamsDeal
        },
        o)),
        t.enable$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.stop$ = void 0;
        var i = n(0)
          , a = "ui.pullToRefresh.stop";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.stop$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.disable$ = void 0;
        var i = n(0)
          , a = "ui.webViewBounce.disable";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.disable$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.enable$ = void 0;
        var i = n(0)
          , a = "ui.webViewBounce.enable";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.4.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.4.0"
        },
        o)),
        t.enable$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getItem$ = void 0;
        var i = n(0)
          , a = "util.domainStorage.getItem";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.9.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.9.0"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.6.29"
        },
        o)),
        t.getItem$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.removeItem$ = void 0;
        var i = n(0)
          , a = "util.domainStorage.removeItem";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.9.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.9.0"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.6.29"
        },
        o)),
        t.removeItem$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.setItem$ = void 0;
        var i = n(0)
          , a = "util.domainStorage.setItem";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "2.9.0"
        },
        o[i.ENV_ENUM.android] = {
            vs: "2.9.0"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "4.6.9"
        },
        o)),
        t.setItem$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return i.ddSdk.invokeAPI(a, e)
        }
        var o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getData$ = void 0;
        var i = n(0)
          , a = "util.openTemporary.getData";
        i.ddSdk.setAPI(a, (o = {},
        o[i.ENV_ENUM.ios] = {
            vs: "6.3.20"
        },
        o[i.ENV_ENUM.android] = {
            vs: "6.3.20"
        },
        o[i.ENV_ENUM.pc] = {
            vs: "6.3.30"
        },
        o)),
        t.getData$ = r,
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.h5AndroidbridgeInit = void 0;
        var r;
        t.h5AndroidbridgeInit = function() {
            return r || (r = new Promise(function(e, t) {
                var n = function() {
                    try {
                        window.WebViewJavascriptBridgeAndroid = window.nuva && window.nuva.require(),
                        e({})
                    } catch (e) {
                        t(e)
                    }
                };
                window.nuva && (void 0 === window.nuva.isReady || window.nuva.isReady) ? n() : (document.addEventListener("runtimeready", function() {
                    n()
                }, !1),
                document.addEventListener("runtimefailed", function(e) {
                    var n = e && e.detail || {
                        errorCode: "2",
                        errorMessage: "unknown nuvajs bootstrap error"
                    };
                    t(n)
                }, !1))
            }
            )),
            r
        }
        ;
        var o = function(e, n) {
            return r || (r = t.h5AndroidbridgeInit()),
            r.then(function() {
                return new Promise(function(t, r) {
                    var o = e.split(".")
                      , i = o.pop() || ""
                      , a = o.join(".")
                      , d = function(e) {
                        "function" == typeof n.onSuccess && n.onSuccess(e),
                        t(e)
                    }
                      , s = function(e) {
                        "function" == typeof n.onFail && n.onFail(e),
                        r(e)
                    };
                    "function" == typeof window.WebViewJavascriptBridgeAndroid && window.WebViewJavascriptBridgeAndroid(d, s, a, i, n)
                }
                )
            })
        };
        t.default = o
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.h5IosBridgeInit = void 0;
        var r;
        t.h5IosBridgeInit = function() {
            return r || (r = new Promise(function(e, t) {
                if ("undefined" != typeof WebViewJavascriptBridge) {
                    try {
                        WebViewJavascriptBridge.init(function(e, t) {})
                    } catch (e) {
                        return t()
                    }
                    return e({})
                }
                document.addEventListener("WebViewJavascriptBridgeReady", function() {
                    if ("undefined" == typeof WebViewJavascriptBridge)
                        return t();
                    try {
                        WebViewJavascriptBridge.init(function(e, t) {})
                    } catch (e) {
                        return t()
                    }
                    return e({})
                }, !1)
            }
            )),
            r
        }
        ;
        var o = function(e, n) {
            return r || (r = t.h5IosBridgeInit()),
            r.then(function() {
                var t = Object.assign({}, n);
                return new Promise(function(n, r) {
                    if (!0 === t.watch) {
                        var o = t.onSuccess;
                        delete t.onSuccess,
                        "undefined" != typeof WebViewJavascriptBridge && WebViewJavascriptBridge.registerHandler(e, function(e, t) {
                            "function" == typeof o && o.call(null, e),
                            t && t({
                                errorCode: "0",
                                errorMessage: "success"
                            })
                        })
                    }
                    void 0 !== window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.callHandler(e, Object.assign({}, t), function(e) {
                        var o = e || {};
                        "0" === o.errorCode ? ("function" == typeof t.onSuccess && t.onSuccess.call(null, o.result),
                        n(o.result)) : ("-1" === o.errorCode && "function" == typeof t.onCancel ? t.onCancel.call(null, o, o.errorCode) : "function" == typeof t.onFail && t.onFail.call(null, o, o.errorCode),
                        r(o))
                    })
                }
                )
            })
        };
        t.default = o
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.h5PcBridgeInit = void 0,
        t.h5PcBridgeInit = function() {
            return Promise.resolve(n(6))
        }
        ;
        var r = function(e, t) {
            return new Promise(function(r, o) {
                return n(6).invokeAPI(e, t).result.then(function(e) {
                    return "function" == typeof t.onSuccess && t.onSuccess.call(null, e),
                    r(e)
                }, function(e) {
                    return "function" == typeof t.onFail && t.onFail.call(null, e),
                    o(e)
                })
            }
            )
        };
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.off = t.on = void 0,
        t.on = function(e, t) {
            n(6).addEventListener(e, t)
        }
        ,
        t.off = function(e, t) {
            n(6).removeEventListener(e, t)
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.version = t.language = t.compareVersion = t.other = t.pc = t.android = t.ios = void 0;
        var r = n(4)
          , o = r.getENV();
        t.ios = o.platform === r.ENV_ENUM.ios,
        t.android = o.platform === r.ENV_ENUM.android,
        t.pc = o.platform === r.ENV_ENUM.pc,
        t.other = o.platform === r.ENV_ENUM.notIndingtalk,
        t.compareVersion = function(e, t, n) {
            function r(e) {
                return parseInt(e, 10) || 0
            }
            if ("string" != typeof e || "string" != typeof t)
                return !1;
            for (var o, i, a = e.split("-")[0].split(".").map(r), d = t.split("-")[0].split(".").map(r); o === i && d.length > 0; )
                o = a.shift(),
                i = d.shift();
            return n ? (i || 0) >= (o || 0) : (i || 0) > (o || 0)
        }
        ,
        t.language = o.language,
        t.version = o.version
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t, n) {
            var r = "Web" === n.platform
              , i = "iOS" === n.platform
              , a = "android" === n.platform
              , d = a || i
              , s = function() {
                return r ? window.navigator.userAgent.toLowerCase() : ""
            }()
              , u = function() {
                var e = {};
                if (r) {
                    var t = window.name;
                    try {
                        var n = JSON.parse(t);
                        e.containerId = n.containerId,
                        e.version = n.hostVersion,
                        e.language = n.language || "*"
                    } catch (e) {}
                }
                return e
            }()
              , c = function() {
                return d ? "dingtalk" === n.appName || "com.alibaba.android.rimet" === n.appName : s.indexOf("dingtalk") > -1 || !!u.containerId
            }()
              , l = function() {
                if (r) {
                    if (u.version)
                        return u.version;
                    var e = s.match(/aliapp\(\w+\/([a-zA-Z0-9.-]+)\)/);
                    null === e && (e = s.match(/dingtalk\/([a-zA-Z0-9.-]+)/));
                    return e && e[1] || "Unknown"
                }
                return n.appVersion
            }()
              , v = !!u.containerId
              , f = /iphone|ipod|ios/.test(s)
              , p = /ipad/.test(s)
              , _ = s.indexOf("android") > -1
              , E = s.indexOf("mac") > -1 && v
              , N = s.indexOf("win") > -1 && v
              , P = !E && !N && v
              , h = v
              , M = "";
            return M = c ? f || i ? o.PLATFORM.IOS : _ || a ? o.PLATFORM.ANDROID : p ? o.PLATFORM.IPAD : E ? o.PLATFORM.MAC : N ? o.PLATFORM.WINDOWS : P ? o.PLATFORM.BROWSER : o.PLATFORM.UNKNOWN : o.PLATFORM.UNKNOWN,
            {
                isdingtalk: c,
                isWebiOS: f,
                isWebAndroid: _,
                isWeexiOS: i,
                isWeexAndroid: a,
                isdingtalkPCMac: E,
                isdingtalkPCWeb: P,
                isdingtalkPCWindows: N,
                isdingtalkPC: h,
                runtime: e,
                framework: t,
                platform: M,
                version: l,
                isWeex: d
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(16);
        t.default = r
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(251)
          , o = n(249)
          , i = n(16)
          , a = r.default().split(".")
          , d = a[0]
          , s = a[1]
          , u = function() {
            var e = {};
            switch (s) {
            case i.FRAMEWORK.VUE:
                var t = weex.config
                  , n = t.env;
                e.platform = n.platform,
                i.RUNTIME.WEEX === d && (e.appVersion = n.appVersion,
                e.appName = n.appName);
                break;
            case i.FRAMEWORK.RAX:
                i.RUNTIME.WEEX === d && (e.platform = navigator.platform,
                e.appName = navigator.appName,
                e.appVersion = navigator.appVersion);
                break;
            case i.FRAMEWORK.UNKNOWN:
                i.RUNTIME.WEB === d && (e.platform = i.RUNTIME.WEB),
                i.RUNTIME.UNKNOWN === d && (e.platform = i.RUNTIME.UNKNOWN)
            }
            return e
        }()
          , c = o.default(d, s, u);
        t.default = c
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
            for (var n = e.length, r = 0, o = !0; r < n; r++)
                try {
                    if (!(e[r]in t)) {
                        o = !1;
                        break
                    }
                } catch (e) {
                    o = !1;
                    break
                }
            return o
        }
        function o() {
            return i && a ? r(c, weex) ? "Web.Vue" : "Web.Unknown" : !i && a ? r(c, weex) ? "Weex.Vue" : "Weex.Unknown" : i && d && !a ? r(s, window) ? "Weex.Rax" : "Weex.Unknown" : i && r(u, window) ? "Web.Unknown" : "Unknown.Unknown"
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = "undefined" != typeof window
          , a = "undefined" != typeof weex
          , d = "undefined" != typeof callNative
          , s = ["__weex_config__", "__weex_options__", "__weex_require__"]
          , u = ["localStorage", "location", "navigator", "XMLHttpRequest"]
          , c = ["config", "requireModule", "document"];
        t.default = o
    }
    , function(e, t, n) {
        "function" != typeof Promise && n(274)
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        n(252),
        n(254),
        n(255)
    }
    , function(e, t) {
        "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
            value: function(e, t) {
                "use strict";
                if (null == e)
                    throw new TypeError("Cannot convert undefined or null to object");
                for (var n = Object(e), r = 1; r < arguments.length; r++) {
                    var o = arguments[r];
                    if (null != o)
                        for (var i in o)
                            Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i])
                }
                return n
            },
            writable: !0,
            configurable: !0
        })
    }
    , function(e, t) {
        Object.keys || (Object.keys = function(e) {
            if (e !== Object(e))
                throw new TypeError("Object.keys called on a non-object");
            var t, n = [];
            for (t in e)
                Object.prototype.hasOwnProperty.call(e, t) && n.push(t);
            return n
        }
        )
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return o(this, void 0, void 0, function() {
                var t, n, r, o;
                return i(this, function(i) {
                    return t = e.invokeName,
                    n = e.method,
                    r = e.callParams,
                    o = e.JSBridge,
                    o ? [2, o(t || n, r)] : [2, this.bridgeInitFn().then(function(e) {
                        return e(t || n, r)
                    })]
                })
            })
        }
        var o = this && this.__awaiter || function(e, t, n, r) {
            function o(e) {
                return e instanceof n ? e : new n(function(t) {
                    t(e)
                }
                )
            }
            return new (n || (n = Promise))(function(n, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function d(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    e.done ? n(e.value) : o(e.value).then(a, d)
                }
                s((r = r.apply(e, t || [])).next())
            }
            )
        }
          , i = this && this.__generator || function(e, t) {
            function n(e) {
                return function(t) {
                    return r([e, t])
                }
            }
            function r(n) {
                if (o)
                    throw new TypeError("Generator is already executing.");
                for (; s; )
                    try {
                        if (o = 1,
                        i && (a = 2 & n[0] ? i.return : n[0] ? i.throw || ((a = i.return) && a.call(i),
                        0) : i.next) && !(a = a.call(i, n[1])).done)
                            return a;
                        switch (i = 0,
                        a && (n = [2 & n[0], a.value]),
                        n[0]) {
                        case 0:
                        case 1:
                            a = n;
                            break;
                        case 4:
                            return s.label++,
                            {
                                value: n[1],
                                done: !1
                            };
                        case 5:
                            s.label++,
                            i = n[1],
                            n = [0];
                            continue;
                        case 7:
                            n = s.ops.pop(),
                            s.trys.pop();
                            continue;
                        default:
                            if (a = s.trys,
                            !(a = a.length > 0 && a[a.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === n[0] && (!a || n[1] > a[0] && n[1] < a[3])) {
                                s.label = n[1];
                                break
                            }
                            if (6 === n[0] && s.label < a[1]) {
                                s.label = a[1],
                                a = n;
                                break
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2],
                                s.ops.push(n);
                                break
                            }
                            a[2] && s.ops.pop(),
                            s.trys.pop();
                            continue
                        }
                        n = t.call(e, s)
                    } catch (e) {
                        n = [6, e],
                        i = 0
                    } finally {
                        o = a = 0
                    }
                if (5 & n[0])
                    throw n[1];
                return {
                    value: n[0] ? n[1] : void 0,
                    done: !0
                }
            }
            var o, i, a, d, s = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
                },
                trys: [],
                ops: []
            };
            return d = {
                next: n(0),
                throw: n(1),
                return: n(2)
            },
            "function" == typeof Symbol && (d[Symbol.iterator] = function() {
                return this
            }
            ),
            d
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.bridge = void 0,
        t.bridge = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
            return o(this, void 0, void 0, function() {
                var n, r, o, d, s, s;
                return i(this, function(i) {
                    return !1 === this.devConfig.isAuthApi && (e.isAuthApi = !1),
                    n = e.isAuthApi,
                    r = e.method,
                    o = this.invokeAPIConfigMapByMethod[r],
                    o || !n ? (d = void 0,
                    o && (d = o[this.env.platform]),
                    e.apiConfig = d,
                    d || !n ? [2, t()] : (s = a.formatLog(a.diagnosticMessageMap.call_api_support_platform_error, r, this.env.platform),
                    [2, Promise.reject({
                        errorCode: a.diagnosticMessageMap.call_api_support_platform_error.code,
                        errorMessage: s
                    })])) : (s = a.formatLog(a.diagnosticMessageMap.call_api_config_platform_error, this.env.platform),
                    [2, Promise.reject({
                        errorCode: a.diagnosticMessageMap.call_api_config_platform_error.code,
                        errorMessage: s
                    })])
                })
            })
        }
        var o = this && this.__awaiter || function(e, t, n, r) {
            function o(e) {
                return e instanceof n ? e : new n(function(t) {
                    t(e)
                }
                )
            }
            return new (n || (n = Promise))(function(n, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function d(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    e.done ? n(e.value) : o(e.value).then(a, d)
                }
                s((r = r.apply(e, t || [])).next())
            }
            )
        }
          , i = this && this.__generator || function(e, t) {
            function n(e) {
                return function(t) {
                    return r([e, t])
                }
            }
            function r(n) {
                if (o)
                    throw new TypeError("Generator is already executing.");
                for (; s; )
                    try {
                        if (o = 1,
                        i && (a = 2 & n[0] ? i.return : n[0] ? i.throw || ((a = i.return) && a.call(i),
                        0) : i.next) && !(a = a.call(i, n[1])).done)
                            return a;
                        switch (i = 0,
                        a && (n = [2 & n[0], a.value]),
                        n[0]) {
                        case 0:
                        case 1:
                            a = n;
                            break;
                        case 4:
                            return s.label++,
                            {
                                value: n[1],
                                done: !1
                            };
                        case 5:
                            s.label++,
                            i = n[1],
                            n = [0];
                            continue;
                        case 7:
                            n = s.ops.pop(),
                            s.trys.pop();
                            continue;
                        default:
                            if (a = s.trys,
                            !(a = a.length > 0 && a[a.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === n[0] && (!a || n[1] > a[0] && n[1] < a[3])) {
                                s.label = n[1];
                                break
                            }
                            if (6 === n[0] && s.label < a[1]) {
                                s.label = a[1],
                                a = n;
                                break
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2],
                                s.ops.push(n);
                                break
                            }
                            a[2] && s.ops.pop(),
                            s.trys.pop();
                            continue
                        }
                        n = t.call(e, s)
                    } catch (e) {
                        n = [6, e],
                        i = 0
                    } finally {
                        o = a = 0
                    }
                if (5 & n[0])
                    throw n[1];
                return {
                    value: n[0] ? n[1] : void 0,
                    done: !0
                }
            }
            var o, i, a, d, s = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
                },
                trys: [],
                ops: []
            };
            return d = {
                next: n(0),
                throw: n(1),
                return: n(2)
            },
            "function" == typeof Symbol && (d[Symbol.iterator] = function() {
                return this
            }
            ),
            d
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.checkConfig = void 0;
        var a = n(9);
        t.checkConfig = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
            return o(this, void 0, void 0, function() {
                var n, r, d, s, u, c, l, v, f = this;
                return i(this, function(p) {
                    switch (p.label) {
                    case 0:
                        return n = e.method,
                        r = e.params,
                        d = e.apiConfig,
                        s = this.devConfig.forceEnableDealApiFnMap && this.devConfig.forceEnableDealApiFnMap[n] && !0 === this.devConfig.forceEnableDealApiFnMap[n](r),
                        u = !s && (!0 === this.devConfig.isDisableDeal || this.devConfig.disbaleDealApiWhiteList && -1 !== this.devConfig.disbaleDealApiWhiteList.indexOf(n)),
                        c = {},
                        !u && d && d.paramsDeal && a.isFunction(d.paramsDeal) ? [4, d.paramsDeal(r)] : [3, 2];
                    case 1:
                        return c = p.sent(),
                        [3, 3];
                    case 2:
                        c = Object.assign({}, r),
                        p.label = 3;
                    case 3:
                        return l = function(e) {
                            return o(f, void 0, void 0, function() {
                                return i(this, function(t) {
                                    return !u && d && d.resultDeal && a.isFunction(d.resultDeal) ? [2, d.resultDeal(e)] : [2, e]
                                })
                            })
                        }
                        ,
                        a.isFunction(c.onSuccess) && (v = c.onSuccess,
                        c.onSuccess = function(e) {
                            return o(f, void 0, void 0, function() {
                                var t;
                                return i(this, function(n) {
                                    switch (n.label) {
                                    case 0:
                                        return t = v,
                                        [4, l(e)];
                                    case 1:
                                        return t.apply(void 0, [n.sent()]),
                                        [2]
                                    }
                                })
                            })
                        }
                        ),
                        Object.assign(e, {
                            callParams: c,
                            invokeName: null === d || void 0 === d ? void 0 : d.invokeName
                        }),
                        [2, t().then(l)]
                    }
                })
            })
        }
        var o = this && this.__awaiter || function(e, t, n, r) {
            function o(e) {
                return e instanceof n ? e : new n(function(t) {
                    t(e)
                }
                )
            }
            return new (n || (n = Promise))(function(n, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function d(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    e.done ? n(e.value) : o(e.value).then(a, d)
                }
                s((r = r.apply(e, t || [])).next())
            }
            )
        }
          , i = this && this.__generator || function(e, t) {
            function n(e) {
                return function(t) {
                    return r([e, t])
                }
            }
            function r(n) {
                if (o)
                    throw new TypeError("Generator is already executing.");
                for (; s; )
                    try {
                        if (o = 1,
                        i && (a = 2 & n[0] ? i.return : n[0] ? i.throw || ((a = i.return) && a.call(i),
                        0) : i.next) && !(a = a.call(i, n[1])).done)
                            return a;
                        switch (i = 0,
                        a && (n = [2 & n[0], a.value]),
                        n[0]) {
                        case 0:
                        case 1:
                            a = n;
                            break;
                        case 4:
                            return s.label++,
                            {
                                value: n[1],
                                done: !1
                            };
                        case 5:
                            s.label++,
                            i = n[1],
                            n = [0];
                            continue;
                        case 7:
                            n = s.ops.pop(),
                            s.trys.pop();
                            continue;
                        default:
                            if (a = s.trys,
                            !(a = a.length > 0 && a[a.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === n[0] && (!a || n[1] > a[0] && n[1] < a[3])) {
                                s.label = n[1];
                                break
                            }
                            if (6 === n[0] && s.label < a[1]) {
                                s.label = a[1],
                                a = n;
                                break
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2],
                                s.ops.push(n);
                                break
                            }
                            a[2] && s.ops.pop(),
                            s.trys.pop();
                            continue
                        }
                        n = t.call(e, s)
                    } catch (e) {
                        n = [6, e],
                        i = 0
                    } finally {
                        o = a = 0
                    }
                if (5 & n[0])
                    throw n[1];
                return {
                    value: n[0] ? n[1] : void 0,
                    done: !0
                }
            }
            var o, i, a, d, s = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
                },
                trys: [],
                ops: []
            };
            return d = {
                next: n(0),
                throw: n(1),
                return: n(2)
            },
            "function" == typeof Symbol && (d[Symbol.iterator] = function() {
                return this
            }
            ),
            d
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.dealParamsAndResult = void 0;
        var a = n(10);
        t.dealParamsAndResult = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
            return o(this, void 0, void 0, function() {
                var n, r, o, d, s, u, c, l, v;
                return i(this, function(i) {
                    switch (i.label) {
                    case 0:
                        if (n = e.method,
                        r = e.params,
                        o = +new Date,
                        d = o + "_" + Math.floor(1e3 * Math.random()),
                        this.devConfig.onBeforeInvokeAPI)
                            try {
                                this.devConfig.onBeforeInvokeAPI({
                                    invokeId: d,
                                    method: n,
                                    params: r,
                                    startTime: o
                                })
                            } catch (e) {
                                a.formatLog(a.diagnosticMessageMap.call_api_on_before_error, e.toString())
                            }
                        c = !0,
                        i.label = 1;
                    case 1:
                        return i.trys.push([1, 3, , 4]),
                        [4, t()];
                    case 2:
                        return s = i.sent(),
                        [3, 4];
                    case 3:
                        return l = i.sent(),
                        u = l,
                        c = !1,
                        [3, 4];
                    case 4:
                        if (v = c ? s : u,
                        this.devConfig.onAfterInvokeAPI)
                            try {
                                this.devConfig.onAfterInvokeAPI({
                                    invokeId: d,
                                    method: n,
                                    params: r,
                                    payload: v,
                                    startTime: o,
                                    duration: +new Date - o,
                                    isSuccess: c
                                })
                            } catch (e) {
                                a.formatLog(a.diagnosticMessageMap.call_api_on_after_error, e.toString())
                            }
                        return [2, c ? Promise.resolve(v) : Promise.reject(v)]
                    }
                })
            })
        }
        var o = this && this.__awaiter || function(e, t, n, r) {
            function o(e) {
                return e instanceof n ? e : new n(function(t) {
                    t(e)
                }
                )
            }
            return new (n || (n = Promise))(function(n, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function d(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    e.done ? n(e.value) : o(e.value).then(a, d)
                }
                s((r = r.apply(e, t || [])).next())
            }
            )
        }
          , i = this && this.__generator || function(e, t) {
            function n(e) {
                return function(t) {
                    return r([e, t])
                }
            }
            function r(n) {
                if (o)
                    throw new TypeError("Generator is already executing.");
                for (; s; )
                    try {
                        if (o = 1,
                        i && (a = 2 & n[0] ? i.return : n[0] ? i.throw || ((a = i.return) && a.call(i),
                        0) : i.next) && !(a = a.call(i, n[1])).done)
                            return a;
                        switch (i = 0,
                        a && (n = [2 & n[0], a.value]),
                        n[0]) {
                        case 0:
                        case 1:
                            a = n;
                            break;
                        case 4:
                            return s.label++,
                            {
                                value: n[1],
                                done: !1
                            };
                        case 5:
                            s.label++,
                            i = n[1],
                            n = [0];
                            continue;
                        case 7:
                            n = s.ops.pop(),
                            s.trys.pop();
                            continue;
                        default:
                            if (a = s.trys,
                            !(a = a.length > 0 && a[a.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === n[0] && (!a || n[1] > a[0] && n[1] < a[3])) {
                                s.label = n[1];
                                break
                            }
                            if (6 === n[0] && s.label < a[1]) {
                                s.label = a[1],
                                a = n;
                                break
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2],
                                s.ops.push(n);
                                break
                            }
                            a[2] && s.ops.pop(),
                            s.trys.pop();
                            continue
                        }
                        n = t.call(e, s)
                    } catch (e) {
                        n = [6, e],
                        i = 0
                    } finally {
                        o = a = 0
                    }
                if (5 & n[0])
                    throw n[1];
                return {
                    value: n[0] ? n[1] : void 0,
                    done: !0
                }
            }
            var o, i, a, d, s = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
                },
                trys: [],
                ops: []
            };
            return d = {
                next: n(0),
                throw: n(1),
                return: n(2)
            },
            "function" == typeof Symbol && (d[Symbol.iterator] = function() {
                return this
            }
            ),
            d
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.hookBeforeAndAfter = void 0;
        var a = n(9);
        t.hookBeforeAndAfter = r
    }
    , function(e, t, n) {
        "use strict";
        var r = this && this.__createBinding || (Object.create ? function(e, t, n, r) {
            void 0 === r && (r = n),
            Object.defineProperty(e, r, {
                enumerable: !0,
                get: function() {
                    return t[n]
                }
            })
        }
        : function(e, t, n, r) {
            void 0 === r && (r = n),
            e[r] = t[n]
        }
        )
          , o = this && this.__exportStar || function(e, t) {
            for (var n in e)
                "default" === n || t.hasOwnProperty(n) || r(t, e, n)
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.ApiHandler = void 0;
        var i = function() {
            function e() {
                var e = this;
                this.middlewares = [],
                this.use = function(t) {
                    e.middlewares.push(t)
                }
                ,
                this.start = function(t) {
                    var n = e.middlewares.slice().reverse()
                      , r = function(e) {
                        return e < n.length ? function() {
                            return n[e](t, r(e + 1))
                        }
                        : function() {}
                    };
                    return r(0)()
                }
            }
            return e
        }();
        t.ApiHandler = i,
        o(n(256), t),
        o(n(262), t),
        o(n(258), t),
        o(n(257), t),
        o(n(261), t),
        o(n(259), t),
        o(n(263), t)
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
            return o(this, void 0, void 0, function() {
                return i(this, function(n) {
                    return [2, this.bridgeInitFn().then(function(n) {
                        return e.JSBridge = n,
                        t()
                    })]
                })
            })
        }
        var o = this && this.__awaiter || function(e, t, n, r) {
            function o(e) {
                return e instanceof n ? e : new n(function(t) {
                    t(e)
                }
                )
            }
            return new (n || (n = Promise))(function(n, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function d(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    e.done ? n(e.value) : o(e.value).then(a, d)
                }
                s((r = r.apply(e, t || [])).next())
            }
            )
        }
          , i = this && this.__generator || function(e, t) {
            function n(e) {
                return function(t) {
                    return r([e, t])
                }
            }
            function r(n) {
                if (o)
                    throw new TypeError("Generator is already executing.");
                for (; s; )
                    try {
                        if (o = 1,
                        i && (a = 2 & n[0] ? i.return : n[0] ? i.throw || ((a = i.return) && a.call(i),
                        0) : i.next) && !(a = a.call(i, n[1])).done)
                            return a;
                        switch (i = 0,
                        a && (n = [2 & n[0], a.value]),
                        n[0]) {
                        case 0:
                        case 1:
                            a = n;
                            break;
                        case 4:
                            return s.label++,
                            {
                                value: n[1],
                                done: !1
                            };
                        case 5:
                            s.label++,
                            i = n[1],
                            n = [0];
                            continue;
                        case 7:
                            n = s.ops.pop(),
                            s.trys.pop();
                            continue;
                        default:
                            if (a = s.trys,
                            !(a = a.length > 0 && a[a.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === n[0] && (!a || n[1] > a[0] && n[1] < a[3])) {
                                s.label = n[1];
                                break
                            }
                            if (6 === n[0] && s.label < a[1]) {
                                s.label = a[1],
                                a = n;
                                break
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2],
                                s.ops.push(n);
                                break
                            }
                            a[2] && s.ops.pop(),
                            s.trys.pop();
                            continue
                        }
                        n = t.call(e, s)
                    } catch (e) {
                        n = [6, e],
                        i = 0
                    } finally {
                        o = a = 0
                    }
                if (5 & n[0])
                    throw n[1];
                return {
                    value: n[0] ? n[1] : void 0,
                    done: !0
                }
            }
            var o, i, a, d, s = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
                },
                trys: [],
                ops: []
            };
            return d = {
                next: n(0),
                throw: n(1),
                return: n(2)
            },
            "function" == typeof Symbol && (d[Symbol.iterator] = function() {
                return this
            }
            ),
            d
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.initBridge = void 0,
        t.initBridge = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
            return o(this, void 0, void 0, function() {
                var n, r, o, s, u, c, l, v, f, p, _;
                return i(this, function(i) {
                    switch (i.label) {
                    case 0:
                        return i.trys.push([0, 2, , 3]),
                        [4, t()];
                    case 1:
                        return [2, i.sent()];
                    case 2:
                        return n = i.sent(),
                        r = e.method,
                        o = e.isAuthApi,
                        s = e.apiConfig,
                        u = this.hadConfig && void 0 === this.isReady && -1 !== this.configJsApiList.indexOf(r),
                        c = "object" == typeof n && "string" == typeof n.errorCode && n.errorCode === d.ERROR_CODE.no_permission,
                        l = "object" == typeof n && "string" == typeof n.errorCode && n.errorCode === d.ERROR_CODE.cancel,
                        v = a.getTargetApiConfigVS(s, this.env),
                        f = v && this.env.version && d.compareVersion(this.env.version, v),
                        p = (this.env.platform === d.ENV_ENUM.ios || this.env.platform === d.ENV_ENUM.android) && u && c,
                        _ = this.env.platform === d.ENV_ENUM.pc && u && (f && !l && o || c),
                        p || _ ? [2, this.config$.then(function() {
                            return t()
                        })] : [2, Promise.reject(n)];
                    case 3:
                        return [2]
                    }
                })
            })
        }
        var o = this && this.__awaiter || function(e, t, n, r) {
            function o(e) {
                return e instanceof n ? e : new n(function(t) {
                    t(e)
                }
                )
            }
            return new (n || (n = Promise))(function(n, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function d(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    e.done ? n(e.value) : o(e.value).then(a, d)
                }
                s((r = r.apply(e, t || [])).next())
            }
            )
        }
          , i = this && this.__generator || function(e, t) {
            function n(e) {
                return function(t) {
                    return r([e, t])
                }
            }
            function r(n) {
                if (o)
                    throw new TypeError("Generator is already executing.");
                for (; s; )
                    try {
                        if (o = 1,
                        i && (a = 2 & n[0] ? i.return : n[0] ? i.throw || ((a = i.return) && a.call(i),
                        0) : i.next) && !(a = a.call(i, n[1])).done)
                            return a;
                        switch (i = 0,
                        a && (n = [2 & n[0], a.value]),
                        n[0]) {
                        case 0:
                        case 1:
                            a = n;
                            break;
                        case 4:
                            return s.label++,
                            {
                                value: n[1],
                                done: !1
                            };
                        case 5:
                            s.label++,
                            i = n[1],
                            n = [0];
                            continue;
                        case 7:
                            n = s.ops.pop(),
                            s.trys.pop();
                            continue;
                        default:
                            if (a = s.trys,
                            !(a = a.length > 0 && a[a.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === n[0] && (!a || n[1] > a[0] && n[1] < a[3])) {
                                s.label = n[1];
                                break
                            }
                            if (6 === n[0] && s.label < a[1]) {
                                s.label = a[1],
                                a = n;
                                break
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2],
                                s.ops.push(n);
                                break
                            }
                            a[2] && s.ops.pop(),
                            s.trys.pop();
                            continue
                        }
                        n = t.call(e, s)
                    } catch (e) {
                        n = [6, e],
                        i = 0
                    } finally {
                        o = a = 0
                    }
                if (5 & n[0])
                    throw n[1];
                return {
                    value: n[0] ? n[1] : void 0,
                    done: !0
                }
            }
            var o, i, a, d, s = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
                },
                trys: [],
                ops: []
            };
            return d = {
                next: n(0),
                throw: n(1),
                return: n(2)
            },
            "function" == typeof Symbol && (d[Symbol.iterator] = function() {
                return this
            }
            ),
            d
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.retry = void 0;
        var a = n(2)
          , d = n(10);
        t.retry = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
            return o(this, void 0, void 0, function() {
                var n, r, o, d, s, u, c, l, v;
                return i(this, function(i) {
                    switch (i.label) {
                    case 0:
                        n = e.method,
                        r = e.params,
                        s = !0,
                        i.label = 1;
                    case 1:
                        return i.trys.push([1, 3, , 4]),
                        [4, t()];
                    case 2:
                        return o = i.sent(),
                        [3, 4];
                    case 3:
                        return u = i.sent(),
                        d = u,
                        s = !1,
                        [3, 4];
                    case 4:
                        return c = s ? o : d,
                        l = s ? a.LogLevel.INFO : a.LogLevel.WARNING,
                        v = s ? "success" : "fail",
                        [2, s ? Promise.resolve(c) : Promise.reject(c)]
                    }
                })
            })
        }
        var o = this && this.__awaiter || function(e, t, n, r) {
            function o(e) {
                return e instanceof n ? e : new n(function(t) {
                    t(e)
                }
                )
            }
            return new (n || (n = Promise))(function(n, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function d(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    e.done ? n(e.value) : o(e.value).then(a, d)
                }
                s((r = r.apply(e, t || [])).next())
            }
            )
        }
          , i = this && this.__generator || function(e, t) {
            function n(e) {
                return function(t) {
                    return r([e, t])
                }
            }
            function r(n) {
                if (o)
                    throw new TypeError("Generator is already executing.");
                for (; s; )
                    try {
                        if (o = 1,
                        i && (a = 2 & n[0] ? i.return : n[0] ? i.throw || ((a = i.return) && a.call(i),
                        0) : i.next) && !(a = a.call(i, n[1])).done)
                            return a;
                        switch (i = 0,
                        a && (n = [2 & n[0], a.value]),
                        n[0]) {
                        case 0:
                        case 1:
                            a = n;
                            break;
                        case 4:
                            return s.label++,
                            {
                                value: n[1],
                                done: !1
                            };
                        case 5:
                            s.label++,
                            i = n[1],
                            n = [0];
                            continue;
                        case 7:
                            n = s.ops.pop(),
                            s.trys.pop();
                            continue;
                        default:
                            if (a = s.trys,
                            !(a = a.length > 0 && a[a.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === n[0] && (!a || n[1] > a[0] && n[1] < a[3])) {
                                s.label = n[1];
                                break
                            }
                            if (6 === n[0] && s.label < a[1]) {
                                s.label = a[1],
                                a = n;
                                break
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2],
                                s.ops.push(n);
                                break
                            }
                            a[2] && s.ops.pop(),
                            s.trys.pop();
                            continue
                        }
                        n = t.call(e, s)
                    } catch (e) {
                        n = [6, e],
                        i = 0
                    } finally {
                        o = a = 0
                    }
                if (5 & n[0])
                    throw n[1];
                return {
                    value: n[0] ? n[1] : void 0,
                    done: !0
                }
            }
            var o, i, a, d, s = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
                },
                trys: [],
                ops: []
            };
            return d = {
                next: n(0),
                throw: n(1),
                return: n(2)
            },
            "function" == typeof Symbol && (d[Symbol.iterator] = function() {
                return this
            }
            ),
            d
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.simpleLogger = void 0;
        var a = n(2);
        t.simpleLogger = r
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        n(265),
        n(17),
        n(18)
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(0)
          , o = n(4)
          , i = n(246)
          , a = n(7)
          , d = n(2)
          , s = n(247);
        r.ddSdk.setPlatform({
            platform: o.ENV_ENUM.pc,
            bridgeInit: function() {
                switch (o.getENV().appType) {
                case d.APP_TYPE.MINI_APP:
                    return Promise.resolve(a.default);
                default:
                    return i.h5PcBridgeInit().then(function() {
                        return i.default
                    })
                }
            },
            authMethod: "config",
            authParamsDeal: function(e) {
                var t = Object.assign({}, e);
                return t.url = window.location.href.split("#")[0],
                t
            },
            event: {
                on: function(e, t) {
                    if (o.getENV().appType === d.APP_TYPE.WEB)
                        return s.on(e, t)
                },
                off: function(e, t) {
                    if (o.getENV().appType === d.APP_TYPE.WEB)
                        return s.off(e, t)
                }
            }
        })
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            var t;
            return o._invoke("biz.util.callComponent", {
                componentType: "h5",
                params: {
                    url: "/im/cool-app-component.html?corpId=" + encodeURIComponent(null === (t = null === e || void 0 === e ? void 0 : e.context) || void 0 === t ? void 0 : t.corpId) + "#/add-members?params=" + encodeURIComponent(JSON.stringify(e)),
                    target: "float",
                    title: "提示",
                    wnId: "addMembers",
                    panelHeight: "percent83"
                }
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.addMembers = void 0,
        n(3);
        var o = n(5);
        t.addMembers = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            var t = Object.assign({}, e, {
                isBatchApi: !0
            });
            return o._invoke("biz.util.callComponent", {
                componentType: "h5",
                params: {
                    url: "/resource-picker/" + (i.isMobile ? "mob" : "index") + ".html?scene=addCoolAppToGroup&params=" + encodeURIComponent(JSON.stringify(t)),
                    target: i.isMobile ? "" : "float",
                    title: "选择会话添加应用",
                    wnId: "addCoolAppToGroup",
                    panelHeight: "percent90"
                }
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.batchInstallCoolApp = void 0,
        n(3);
        var o = n(5)
          , i = n(19);
        t.batchInstallCoolApp = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            var t;
            return o._invoke("biz.util.callComponent", {
                componentType: "h5",
                params: {
                    url: "/im/cool-app-component.html?corpId=" + encodeURIComponent(null === (t = null === e || void 0 === e ? void 0 : e.context) || void 0 === t ? void 0 : t.corpId) + "#/create-group?params=" + encodeURIComponent(JSON.stringify(e)),
                    target: "float",
                    title: "提示",
                    wnId: "createGroup",
                    panelHeight: "percent83"
                }
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.createGroup = void 0,
        n(3);
        var o = n(5);
        t.createGroup = r
    }
    , function(e, t, n) {
        "use strict";
        var r = this && this.__createBinding || (Object.create ? function(e, t, n, r) {
            void 0 === r && (r = n),
            Object.defineProperty(e, r, {
                enumerable: !0,
                get: function() {
                    return t[n]
                }
            })
        }
        : function(e, t, n, r) {
            void 0 === r && (r = n),
            e[r] = t[n]
        }
        )
          , o = this && this.__exportStar || function(e, t) {
            for (var n in e)
                "default" === n || t.hasOwnProperty(n) || r(t, e, n)
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        o(n(270), t),
        o(n(271), t),
        o(n(268), t),
        o(n(266), t),
        o(n(272), t),
        o(n(267), t)
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return o._invoke("biz.util.callComponent", {
                componentType: "h5",
                params: {
                    url: "/resource-picker/" + (i.isMobile ? "mob" : "index") + ".html?scene=addCoolAppToGroup&params=" + encodeURIComponent(JSON.stringify(e)),
                    target: i.isMobile ? "" : "float",
                    title: "选择群添加应用",
                    wnId: "addCoolAppToGroup",
                    panelHeight: "percent90"
                }
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.installCoolAppToGroup = void 0,
        n(3);
        var o = n(5)
          , i = n(19);
        t.installCoolAppToGroup = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            var t, n = JSON.stringify(e).length;
            return o._invoke("biz.util.callComponent", {
                componentType: "h5",
                params: {
                    url: "/im/cool-app-component.html?corpId=" + encodeURIComponent(null === (t = null === e || void 0 === e ? void 0 : e.context) || void 0 === t ? void 0 : t.corpId) + "#/send-message?params=" + encodeURIComponent(JSON.stringify({
                        body: e,
                        bodyLengthList: [n]
                    })),
                    target: "float",
                    title: "提示",
                    wnId: "sendMessageToGroup",
                    panelHeight: "percent83"
                }
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.sendMessageToGroup = void 0,
        n(3);
        var o = n(5);
        t.sendMessageToGroup = r
    }
    , function(e, t, n) {
        "use strict";
        function r(e) {
            var t, n = JSON.stringify(e).length;
            return o._invoke("biz.util.callComponent", {
                componentType: "h5",
                params: {
                    url: "/im/cool-app-component.html?corpId=" + encodeURIComponent(null === (t = null === e || void 0 === e ? void 0 : e.context) || void 0 === t ? void 0 : t.corpId) + "#/send-message-to-single-chat?params=" + encodeURIComponent(JSON.stringify({
                        body: e,
                        bodyLengthList: [n]
                    })),
                    target: "float",
                    title: "提示",
                    wnId: "sendMessageToSingleChat",
                    panelHeight: "percent83"
                }
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.sendMessageToSingleChat = void 0,
        n(3);
        var o = n(5);
        t.sendMessageToSingleChat = r
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.coolAppSdk = void 0;
        var r = n(269);
        t.coolAppSdk = r
    }
    , function(e, t, n) {
        (function(e, t) {
            (function(e, t) {
                t()
            }
            )(0, function() {
                "use strict";
                function n() {}
                function r(e, t) {
                    return function() {
                        e.apply(t, arguments)
                    }
                }
                function o(e) {
                    if (!(this instanceof o))
                        throw new TypeError("Promises must be constructed via new");
                    if ("function" != typeof e)
                        throw new TypeError("not a function");
                    this._state = 0,
                    this._handled = !1,
                    this._value = void 0,
                    this._deferreds = [],
                    c(e, this)
                }
                function i(e, t) {
                    for (; 3 === e._state; )
                        e = e._value;
                    if (0 === e._state)
                        return void e._deferreds.push(t);
                    e._handled = !0,
                    o._immediateFn(function() {
                        var n = 1 === e._state ? t.onFulfilled : t.onRejected;
                        if (null === n)
                            return void (1 === e._state ? a : d)(t.promise, e._value);
                        var r;
                        try {
                            r = n(e._value)
                        } catch (e) {
                            return void d(t.promise, e)
                        }
                        a(t.promise, r)
                    })
                }
                function a(e, t) {
                    try {
                        if (t === e)
                            throw new TypeError("A promise cannot be resolved with itself.");
                        if (t && ("object" == typeof t || "function" == typeof t)) {
                            var n = t.then;
                            if (t instanceof o)
                                return e._state = 3,
                                e._value = t,
                                void s(e);
                            if ("function" == typeof n)
                                return void c(r(n, t), e)
                        }
                        e._state = 1,
                        e._value = t,
                        s(e)
                    } catch (t) {
                        d(e, t)
                    }
                }
                function d(e, t) {
                    e._state = 2,
                    e._value = t,
                    s(e)
                }
                function s(e) {
                    2 === e._state && 0 === e._deferreds.length && o._immediateFn(function() {
                        e._handled || o._unhandledRejectionFn(e._value)
                    });
                    for (var t = 0, n = e._deferreds.length; t < n; t++)
                        i(e, e._deferreds[t]);
                    e._deferreds = null
                }
                function u(e, t, n) {
                    this.onFulfilled = "function" == typeof e ? e : null,
                    this.onRejected = "function" == typeof t ? t : null,
                    this.promise = n
                }
                function c(e, t) {
                    var n = !1;
                    try {
                        e(function(e) {
                            n || (n = !0,
                            a(t, e))
                        }, function(e) {
                            n || (n = !0,
                            d(t, e))
                        })
                    } catch (e) {
                        if (n)
                            return;
                        n = !0,
                        d(t, e)
                    }
                }
                var l = setTimeout;
                o.prototype.catch = function(e) {
                    return this.then(null, e)
                }
                ,
                o.prototype.then = function(e, t) {
                    var r = new this.constructor(n);
                    return i(this, new u(e,t,r)),
                    r
                }
                ,
                o.prototype.finally = function(e) {
                    var t = this.constructor;
                    return this.then(function(n) {
                        return t.resolve(e()).then(function() {
                            return n
                        })
                    }, function(n) {
                        return t.resolve(e()).then(function() {
                            return t.reject(n)
                        })
                    })
                }
                ,
                o.all = function(e) {
                    return new o(function(t, n) {
                        function r(e, a) {
                            try {
                                if (a && ("object" == typeof a || "function" == typeof a)) {
                                    var d = a.then;
                                    if ("function" == typeof d)
                                        return void d.call(a, function(t) {
                                            r(e, t)
                                        }, n)
                                }
                                o[e] = a,
                                0 == --i && t(o)
                            } catch (e) {
                                n(e)
                            }
                        }
                        if (!e || void 0 === e.length)
                            throw new TypeError("Promise.all accepts an array");
                        var o = Array.prototype.slice.call(e);
                        if (0 === o.length)
                            return t([]);
                        for (var i = o.length, a = 0; a < o.length; a++)
                            r(a, o[a])
                    }
                    )
                }
                ,
                o.resolve = function(e) {
                    return e && "object" == typeof e && e.constructor === o ? e : new o(function(t) {
                        t(e)
                    }
                    )
                }
                ,
                o.reject = function(e) {
                    return new o(function(t, n) {
                        n(e)
                    }
                    )
                }
                ,
                o.race = function(e) {
                    return new o(function(t, n) {
                        for (var r = 0, o = e.length; r < o; r++)
                            e[r].then(t, n)
                    }
                    )
                }
                ,
                o._immediateFn = "function" == typeof e && function(t) {
                    e(t)
                }
                || function(e) {
                    l(e, 0)
                }
                ,
                o._unhandledRejectionFn = function(e) {
                    "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
                }
                ;
                var v = function() {
                    if ("undefined" != typeof self)
                        return self;
                    if ("undefined" != typeof window)
                        return window;
                    if (void 0 !== t)
                        return t;
                    throw new Error("unable to locate global object")
                }();
                v.Promise || (v.Promise = o)
            })
        }
        ).call(t, n(276).setImmediate, n(11))
    }
    , function(e, t, n) {
        (function(e, t) {
            (function(e, n) {
                "use strict";
                function r(e) {
                    "function" != typeof e && (e = new Function("" + e));
                    for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++)
                        t[n] = arguments[n + 1];
                    var r = {
                        callback: e,
                        args: t
                    };
                    return u[s] = r,
                    d(s),
                    s++
                }
                function o(e) {
                    delete u[e]
                }
                function i(e) {
                    var t = e.callback
                      , r = e.args;
                    switch (r.length) {
                    case 0:
                        t();
                        break;
                    case 1:
                        t(r[0]);
                        break;
                    case 2:
                        t(r[0], r[1]);
                        break;
                    case 3:
                        t(r[0], r[1], r[2]);
                        break;
                    default:
                        t.apply(n, r)
                    }
                }
                function a(e) {
                    if (c)
                        setTimeout(a, 0, e);
                    else {
                        var t = u[e];
                        if (t) {
                            c = !0;
                            try {
                                i(t)
                            } finally {
                                o(e),
                                c = !1
                            }
                        }
                    }
                }
                if (!e.setImmediate) {
                    var d, s = 1, u = {}, c = !1, l = e.document, v = Object.getPrototypeOf && Object.getPrototypeOf(e);
                    v = v && v.setTimeout ? v : e,
                    "[object process]" === {}.toString.call(e.process) ? function() {
                        d = function(e) {
                            t.nextTick(function() {
                                a(e)
                            })
                        }
                    }() : !function() {
                        if (e.postMessage && !e.importScripts) {
                            var t = !0
                              , n = e.onmessage;
                            return e.onmessage = function() {
                                t = !1
                            }
                            ,
                            e.postMessage("", "*"),
                            e.onmessage = n,
                            t
                        }
                    }() ? e.MessageChannel ? function() {
                        var e = new MessageChannel;
                        e.port1.onmessage = function(e) {
                            a(e.data)
                        }
                        ,
                        d = function(t) {
                            e.port2.postMessage(t)
                        }
                    }() : l && "onreadystatechange"in l.createElement("script") ? function() {
                        var e = l.documentElement;
                        d = function(t) {
                            var n = l.createElement("script");
                            n.onreadystatechange = function() {
                                a(t),
                                n.onreadystatechange = null,
                                e.removeChild(n),
                                n = null
                            }
                            ,
                            e.appendChild(n)
                        }
                    }() : function() {
                        d = function(e) {
                            setTimeout(a, 0, e)
                        }
                    }() : function() {
                        var t = "setImmediate$" + Math.random() + "$"
                          , n = function(n) {
                            n.source === e && "string" == typeof n.data && 0 === n.data.indexOf(t) && a(+n.data.slice(t.length))
                        };
                        e.addEventListener ? e.addEventListener("message", n, !1) : e.attachEvent("onmessage", n),
                        d = function(n) {
                            e.postMessage(t + n, "*")
                        }
                    }(),
                    v.setImmediate = r,
                    v.clearImmediate = o
                }
            }
            )("undefined" == typeof self ? void 0 === e ? this : e : self)
        }
        ).call(t, n(11), n(20))
    }
    , function(e, t, n) {
        (function(e) {
            function r(e, t) {
                this._id = e,
                this._clearFn = t
            }
            var o = void 0 !== e && e || "undefined" != typeof self && self || window
              , i = Function.prototype.apply;
            t.setTimeout = function() {
                return new r(i.call(setTimeout, o, arguments),clearTimeout)
            }
            ,
            t.setInterval = function() {
                return new r(i.call(setInterval, o, arguments),clearInterval)
            }
            ,
            t.clearTimeout = t.clearInterval = function(e) {
                e && e.close()
            }
            ,
            r.prototype.unref = r.prototype.ref = function() {}
            ,
            r.prototype.close = function() {
                this._clearFn.call(o, this._id)
            }
            ,
            t.enroll = function(e, t) {
                clearTimeout(e._idleTimeoutId),
                e._idleTimeout = t
            }
            ,
            t.unenroll = function(e) {
                clearTimeout(e._idleTimeoutId),
                e._idleTimeout = -1
            }
            ,
            t._unrefActive = t.active = function(e) {
                clearTimeout(e._idleTimeoutId);
                var t = e._idleTimeout;
                t >= 0 && (e._idleTimeoutId = setTimeout(function() {
                    e._onTimeout && e._onTimeout()
                }, t))
            }
            ,
            n(275),
            t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e && e.setImmediate || this && this.setImmediate,
            t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e && e.clearImmediate || this && this.clearImmediate
        }
        ).call(t, n(11))
    }
    , , function(e, t, n) {
        "use strict";
        var r = n(3)
          , o = n(873)
          , i = n(273)
          , a = Object.assign(r, o.apiObj, {
            plugin: i
        });
        e.exports = a
    }
    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.apiObj = void 0;
        var r = n(21)
          , o = n(22)
          , i = n(23)
          , a = n(24)
          , d = n(25)
          , s = n(26)
          , u = n(27)
          , c = n(28)
          , l = n(29)
          , v = n(30)
          , f = n(31)
          , p = n(32)
          , _ = n(33)
          , E = n(34)
          , N = n(35)
          , P = n(36)
          , h = n(37)
          , M = n(38)
          , m = n(39)
          , g = n(40)
          , b = n(41)
          , k = n(42)
          , y = n(43)
          , I = n(44)
          , A = n(45)
          , S = n(46)
          , $ = n(47)
          , U = n(48)
          , V = n(49)
          , O = n(50)
          , w = n(51)
          , j = n(52)
          , C = n(53)
          , D = n(54)
          , T = n(55)
          , R = n(56)
          , F = n(57)
          , x = n(58)
          , W = n(59)
          , z = n(60)
          , B = n(61)
          , L = n(62)
          , q = n(63)
          , G = n(64)
          , J = n(65)
          , Y = n(66)
          , H = n(67)
          , K = n(68)
          , X = n(69)
          , Z = n(70)
          , Q = n(71)
          , ee = n(72)
          , te = n(73)
          , ne = n(74)
          , re = n(75)
          , oe = n(76)
          , ie = n(77)
          , ae = n(78)
          , de = n(79)
          , se = n(80)
          , ue = n(81)
          , ce = n(82)
          , le = n(83)
          , ve = n(84)
          , fe = n(85)
          , pe = n(86)
          , _e = n(87)
          , Ee = n(88)
          , Ne = n(89)
          , Pe = n(90)
          , he = n(91)
          , Me = n(92)
          , me = n(93)
          , ge = n(94)
          , be = n(95)
          , ke = n(96)
          , ye = n(97)
          , Ie = n(98)
          , Ae = n(99)
          , Se = n(100)
          , $e = n(101)
          , Ue = n(102)
          , Ve = n(103)
          , Oe = n(104)
          , we = n(105)
          , je = n(106)
          , Ce = n(107)
          , De = n(108)
          , Te = n(109)
          , Re = n(110)
          , Fe = n(111)
          , xe = n(112)
          , We = n(113)
          , ze = n(114)
          , Be = n(115)
          , Le = n(116)
          , qe = n(117)
          , Ge = n(118)
          , Je = n(119)
          , Ye = n(120)
          , He = n(121)
          , Ke = n(122)
          , Xe = n(123)
          , Ze = n(124)
          , Qe = n(125)
          , et = n(126)
          , tt = n(127)
          , nt = n(128)
          , rt = n(129)
          , ot = n(130)
          , it = n(131)
          , at = n(132)
          , dt = n(133)
          , st = n(134)
          , ut = n(135)
          , ct = n(136)
          , lt = n(137)
          , vt = n(138)
          , ft = n(139)
          , pt = n(140)
          , _t = n(141)
          , Et = n(142)
          , Nt = n(143)
          , Pt = n(144)
          , ht = n(145)
          , Mt = n(146)
          , mt = n(147)
          , gt = n(148)
          , bt = n(149)
          , kt = n(150)
          , yt = n(151)
          , It = n(152)
          , At = n(153)
          , St = n(154)
          , $t = n(155)
          , Ut = n(156)
          , Vt = n(157)
          , Ot = n(158)
          , wt = n(159)
          , jt = n(160)
          , Ct = n(161)
          , Dt = n(162)
          , Tt = n(163)
          , Rt = n(164)
          , Ft = n(165)
          , xt = n(166)
          , Wt = n(167)
          , zt = n(168)
          , Bt = n(169)
          , Lt = n(170)
          , qt = n(171)
          , Gt = n(172)
          , Jt = n(173)
          , Yt = n(174)
          , Ht = n(175)
          , Kt = n(176)
          , Xt = n(177)
          , Zt = n(178)
          , Qt = n(179)
          , en = n(180)
          , tn = n(181)
          , nn = n(182)
          , rn = n(183)
          , on = n(184)
          , an = n(185)
          , dn = n(186)
          , sn = n(187)
          , un = n(188)
          , cn = n(189)
          , ln = n(190)
          , vn = n(191)
          , fn = n(192)
          , pn = n(193)
          , _n = n(194)
          , En = n(195)
          , Nn = n(196)
          , Pn = n(197)
          , hn = n(198)
          , Mn = n(199)
          , mn = n(200)
          , gn = n(201)
          , bn = n(202)
          , kn = n(203)
          , yn = n(204)
          , In = n(205)
          , An = n(206)
          , Sn = n(207)
          , $n = n(208)
          , Un = n(209)
          , Vn = n(210)
          , On = n(211)
          , wn = n(212)
          , jn = n(213)
          , Cn = n(214)
          , Dn = n(215)
          , Tn = n(216)
          , Rn = n(217)
          , Fn = n(218)
          , xn = n(219)
          , Wn = n(220)
          , zn = n(221)
          , Bn = n(222)
          , Ln = n(223)
          , qn = n(224)
          , Gn = n(225)
          , Jn = n(226)
          , Yn = n(227)
          , Hn = n(228)
          , Kn = n(229)
          , Xn = n(230)
          , Zn = n(231)
          , Qn = n(232)
          , er = n(233)
          , tr = n(234)
          , nr = n(235)
          , rr = n(236)
          , or = n(237)
          , ir = n(238)
          , ar = n(239)
          , dr = n(240)
          , sr = n(241)
          , ur = n(242)
          , cr = n(243);
        t.apiObj = {
            biz: {
                ATMBle: {
                    beaconPicker: r.beaconPicker$,
                    detectFace: o.detectFace$,
                    detectFaceFullScreen: i.detectFaceFullScreen$,
                    exclusiveLiveCheck: a.exclusiveLiveCheck$,
                    faceManager: d.faceManager$,
                    punchModePicker: s.punchModePicker$
                },
                alipay: {
                    bindAlipay: u.bindAlipay$,
                    openAuth: c.openAuth$,
                    pay: l.pay$
                },
                auth: {
                    openAccountPwdLoginPage: v.openAccountPwdLoginPage$,
                    requestAuthInfo: f.requestAuthInfo$
                },
                calendar: {
                    chooseDateTime: p.chooseDateTime$,
                    chooseHalfDay: _.chooseHalfDay$,
                    chooseInterval: E.chooseInterval$,
                    chooseOneDay: N.chooseOneDay$
                },
                chat: {
                    chooseConversationByCorpId: P.chooseConversationByCorpId$,
                    collectSticker: h.collectSticker$,
                    createSceneGroup: M.createSceneGroup$,
                    getRealmCid: m.getRealmCid$,
                    locationChatMessage: g.locationChatMessage$,
                    openSingleChat: b.openSingleChat$,
                    pickConversation: k.pickConversation$,
                    sendEmotion: y.sendEmotion$,
                    toConversation: I.toConversation$,
                    toConversationByOpenConversationId: A.toConversationByOpenConversationId$
                },
                clipboardData: {
                    setData: S.setData$
                },
                conference: {
                    createCloudCall: $.createCloudCall$,
                    getCloudCallInfo: U.getCloudCallInfo$,
                    getCloudCallList: V.getCloudCallList$,
                    videoConfCall: O.videoConfCall$
                },
                contact: {
                    choose: w.choose$,
                    chooseMobileContacts: j.chooseMobileContacts$,
                    complexPicker: C.complexPicker$,
                    createGroup: D.createGroup$,
                    departmentsPicker: T.departmentsPicker$,
                    externalComplexPicker: R.externalComplexPicker$,
                    externalEditForm: F.externalEditForm$,
                    rolesPicker: x.rolesPicker$,
                    setRule: W.setRule$
                },
                cspace: {
                    chooseSpaceDir: z.chooseSpaceDir$,
                    delete: B.delete$,
                    preview: L.preview$,
                    previewDentryImages: q.previewDentryImages$,
                    saveFile: G.saveFile$
                },
                customContact: {
                    choose: J.choose$,
                    multipleChoose: Y.multipleChoose$
                },
                ding: {
                    create: H.create$,
                    post: K.post$
                },
                edu: {
                    finishMiniCourseByRecordId: X.finishMiniCourseByRecordId$,
                    getMiniCourseDraftList: Z.getMiniCourseDraftList$,
                    joinClassroom: Q.joinClassroom$,
                    makeMiniCourse: ee.makeMiniCourse$,
                    newMsgNotificationStatus: te.newMsgNotificationStatus$,
                    startAuth: ne.startAuth$,
                    tokenFaceImg: re.tokenFaceImg$
                },
                event: {
                    notifyWeex: oe.notifyWeex$
                },
                intent: {
                    fetchData: ie.fetchData$
                },
                iot: {
                    bind: ae.bind$,
                    bindMeetingRoom: de.bindMeetingRoom$,
                    getDeviceProperties: se.getDeviceProperties$,
                    invokeThingService: ue.invokeThingService$,
                    queryMeetingRoomList: ce.queryMeetingRoomList$,
                    setDeviceProperties: le.setDeviceProperties$,
                    unbind: ve.unbind$
                },
                live: {
                    startClassRoom: fe.startClassRoom$,
                    startUnifiedLive: pe.startUnifiedLive$
                },
                map: {
                    locate: _e.locate$,
                    search: Ee.search$,
                    view: Ne.view$
                },
                media: {
                    compressVideo: Pe.compressVideo$
                },
                microApp: {
                    openApp: he.openApp$
                },
                navigation: {
                    close: Me.close$,
                    goBack: me.goBack$,
                    hideBar: ge.hideBar$,
                    navigateBackPage: be.navigateBackPage$,
                    navigateToMiniProgram: ke.navigateToMiniProgram$,
                    navigateToPage: ye.navigateToPage$,
                    quit: Ie.quit$,
                    replace: Ae.replace$,
                    setIcon: Se.setIcon$,
                    setLeft: $e.setLeft$,
                    setMenu: Ue.setMenu$,
                    setRight: Ve.setRight$,
                    setTitle: Oe.setTitle$
                },
                pbp: {
                    componentPunchFromPartner: we.componentPunchFromPartner$,
                    startMatchRuleFromPartner: je.startMatchRuleFromPartner$,
                    stopMatchRuleFromPartner: Ce.stopMatchRuleFromPartner$
                },
                realm: {
                    getRealtimeTracingStatus: De.getRealtimeTracingStatus$,
                    getUserExclusiveInfo: Te.getUserExclusiveInfo$,
                    startRealtimeTracing: Re.startRealtimeTracing$,
                    stopRealtimeTracing: Fe.stopRealtimeTracing$,
                    subscribe: xe.subscribe$,
                    unsubscribe: We.unsubscribe$
                },
                resource: {
                    getInfo: ze.getInfo$,
                    reportDebugMessage: Be.reportDebugMessage$
                },
                shortCut: {
                    addShortCut: Le.addShortCut$
                },
                store: {
                    closeUnpayOrder: qe.closeUnpayOrder$,
                    createOrder: Ge.createOrder$,
                    getPayUrl: Je.getPayUrl$,
                    inquiry: Ye.inquiry$
                },
                tabwindow: {
                    isTab: He.isTab$
                },
                telephone: {
                    call: Ke.call$,
                    checkBizCall: Xe.checkBizCall$,
                    quickCallList: Ze.quickCallList$,
                    showCallMenu: Qe.showCallMenu$
                },
                user: {
                    checkPassword: et.checkPassword$,
                    get: tt.get$
                },
                util: {
                    callComponent: nt.callComponent$,
                    chooseImage: rt.chooseImage$,
                    chosen: ot.chosen$,
                    clearWebStoreCache: it.clearWebStoreCache$,
                    closePreviewImage: at.closePreviewImage$,
                    compressImage: dt.compressImage$,
                    datepicker: st.datepicker$,
                    datetimepicker: ut.datetimepicker$,
                    decrypt: ct.decrypt$,
                    downloadFile: lt.downloadFile$,
                    encrypt: vt.encrypt$,
                    getPerfInfo: ft.getPerfInfo$,
                    invokeWorkbench: pt.invokeWorkbench$,
                    isEnableGPUAcceleration: _t.isEnableGPUAcceleration$,
                    isLocalFileExist: Et.isLocalFileExist$,
                    multiSelect: Nt.multiSelect$,
                    open: Pt.open$,
                    openLink: ht.openLink$,
                    openLocalFile: Mt.openLocalFile$,
                    openModal: mt.openModal$,
                    openSlidePanel: gt.openSlidePanel$,
                    presentWindow: bt.presentWindow$,
                    previewImage: kt.previewImage$,
                    previewVideo: yt.previewVideo$,
                    saveImage: It.saveImage$,
                    scan: At.scan$,
                    scanCard: St.scanCard$,
                    setGPUAcceleration: $t.setGPUAcceleration$,
                    setScreenBrightnessAndKeepOn: Ut.setScreenBrightnessAndKeepOn$,
                    setScreenKeepOn: Vt.setScreenKeepOn$,
                    share: Ot.share$,
                    shareImage: wt.shareImage$,
                    startDocSign: jt.startDocSign$,
                    systemShare: Ct.systemShare$,
                    timepicker: Dt.timepicker$,
                    uploadAttachment: Tt.uploadAttachment$,
                    uploadFile: Rt.uploadFile$,
                    uploadImage: Ft.uploadImage$,
                    uploadImageFromCamera: xt.uploadImageFromCamera$,
                    ut: Wt.ut$
                },
                verify: {
                    openBindIDCard: zt.openBindIDCard$,
                    startAuth: Bt.startAuth$
                },
                watermarkCamera: {
                    getWatermarkInfo: Lt.getWatermarkInfo$,
                    setWatermarkInfo: qt.setWatermarkInfo$
                }
            },
            channel: {
                permission: {
                    requestAuthCode: Gt.requestAuthCode$
                }
            },
            device: {
                accelerometer: {
                    clearShake: Jt.clearShake$,
                    watchShake: Yt.watchShake$
                },
                audio: {
                    download: Ht.download$,
                    onPlayEnd: Kt.onPlayEnd$,
                    onRecordEnd: Xt.onRecordEnd$,
                    pause: Zt.pause$,
                    play: Qt.play$,
                    resume: en.resume$,
                    startRecord: tn.startRecord$,
                    stop: nn.stop$,
                    stopRecord: rn.stopRecord$,
                    translateVoice: on.translateVoice$
                },
                base: {
                    getInterface: an.getInterface$,
                    getPhoneInfo: dn.getPhoneInfo$,
                    getScanWifiListAsync: sn.getScanWifiListAsync$,
                    getUUID: un.getUUID$,
                    getWifiStatus: cn.getWifiStatus$,
                    openSystemSetting: ln.openSystemSetting$
                },
                connection: {
                    getNetworkType: vn.getNetworkType$
                },
                geolocation: {
                    checkPermission: fn.checkPermission$,
                    get: pn.get$,
                    start: _n.start$,
                    status: En.status$,
                    stop: Nn.stop$
                },
                launcher: {
                    checkInstalledApps: Pn.checkInstalledApps$,
                    launchApp: hn.launchApp$
                },
                nfc: {
                    nfcRead: Mn.nfcRead$,
                    nfcStop: mn.nfcStop$,
                    nfcWrite: gn.nfcWrite$
                },
                notification: {
                    actionSheet: bn.actionSheet$,
                    alert: kn.alert$,
                    confirm: yn.confirm$,
                    extendModal: In.extendModal$,
                    hidePreloader: An.hidePreloader$,
                    modal: Sn.modal$,
                    prompt: $n.prompt$,
                    showPreloader: Un.showPreloader$,
                    toast: Vn.toast$,
                    vibrate: On.vibrate$
                },
                screen: {
                    insetAdjust: wn.insetAdjust$,
                    resetView: jn.resetView$,
                    rotateView: Cn.rotateView$
                }
            },
            media: {
                voiceRecorder: {
                    keepAlive: Dn.keepAlive$,
                    pause: Tn.pause$,
                    resume: Rn.resume$,
                    start: Fn.start$,
                    stop: xn.stop$
                }
            },
            net: {
                bjGovApn: {
                    loginGovNet: Wn.loginGovNet$
                }
            },
            runtime: {
                message: {
                    fetch: zn.fetch$,
                    post: Bn.post$
                },
                monitor: {
                    getLoadTime: Ln.getLoadTime$
                },
                permission: {
                    requestAuthCode: qn.requestAuthCode$,
                    requestOperateAuthCode: Gn.requestOperateAuthCode$
                }
            },
            ui: {
                input: {
                    plain: Jn.plain$
                },
                multitask: {
                    addToFloat: Yn.addToFloat$,
                    removeFromFloat: Hn.removeFromFloat$
                },
                nav: {
                    close: Kn.close$,
                    getCurrentId: Xn.getCurrentId$,
                    go: Zn.go$,
                    preload: Qn.preload$,
                    recycle: er.recycle$
                },
                progressBar: {
                    setColors: tr.setColors$
                },
                pullToRefresh: {
                    disable: nr.disable$,
                    enable: rr.enable$,
                    stop: or.stop$
                },
                webViewBounce: {
                    disable: ir.disable$,
                    enable: ar.enable$
                }
            },
            util: {
                domainStorage: {
                    getItem: dr.getItem$,
                    removeItem: sr.removeItem$,
                    setItem: ur.setItem$
                },
                openTemporary: {
                    getData: cr.getData$
                }
            }
        }
    }
    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
        e.exports = n(278)
    }
    ])
});
