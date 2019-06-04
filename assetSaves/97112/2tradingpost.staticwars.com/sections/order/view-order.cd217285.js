YUI.add("view-order", function(t) {
    "use strict";
    var e = t.namespace("GW2.Components"),
        s = t.namespace("GW2.Models"),
        a = t.namespace("Elements"),
        i = t.namespace("Util").optional,
        n = t.namespace("GW2.Util").restricted,
        r = window.tp_strings,
        c = m.redraw.bind(m, !1),
        o = {
            warning: "https://2tradingpost.staticwars.com/sections/order/images/smoke-yellow.8a3c3d86.svg",
            error: "https://2tradingpost.staticwars.com/sections/order/images/smoke-red.183d4d6.svg",
            success: "https://2tradingpost.staticwars.com/sections/order/images/smoke-green.cf711d1.svg"
        },
        l = ["https://2tradingpost.staticwars.com/sections/order/images/tall-bg-success.9d97ca9a.svg", "https://2tradingpost.staticwars.com/sections/order/images/tall-bg-warning.1ec4e000.svg", "https://2tradingpost.staticwars.com/sections/order/images/tall-bg-error.8cbbe788.svg"],
        d = "home",
        g = new s.OrderState,
        u = !1;

    function h() {
        t.fire("order:closed"), window.state.setSection(d, !window.state.refreshOnDialogClose()), window.state.refreshOnDialogClose(!1), m.redraw()
    }

    function p(e) {
        return t.Object.getValue(r, e.split("."))
    }
    e.OrderMithril = {
        showDialog: function(t, e) {
            window.native.call("HideTextTooltip"), window.native.call("HideItemTooltip"), d = window.state.section().name, window.state.setSection("order"), g.set("buyOrSell", t), g.fetchItem(e).then(c, h)
        },
        controller: function() {
            var e = this,
                s = {
                    gold: !1,
                    copper: !1,
                    silver: !1
                };
            g.on({
                listingsUpdated: c,
                close: h,
                restricted: n,
                uiLockedChange: c,
                messageChange: function(e) {
                    var s = e.newVal;
                    s && (s.msg || s.heading) && (s.text = p(s.msg) || s.msg, t.Lang.isObject(s.msgargs) && (s.text = t.Lang.sub(s.text, s.msgargs)), s.heading && (s.tall = !0, s.heading = p(s.heading) || s.heading), s.background = o[s.kind], s.active = s.death ? "" : "active", s.msg !== (e.prevVal && e.prevVal.msg) && setTimeout(m.redraw, 0))
                }
            }), m.redraw.strategy("diff"), this.reducer = function(t, e) {
                var s = t.split("."),
                    a = s.pop(),
                    i = s.reduce(function(t, e) {
                        return t ? t[e] : t
                    }, this);
                return void 0 !== e ? i.set(a, e) : i.get(a)
            }, this.blankInput = function(t, s) {
                var a;
                s.target.validity.valid ? (a = "" === s.target.value ? 0 : parseInt(s.target.value, 10), e.set(t, a)) : s.target.value = e.get(t)
            }, this.order = g, this.unitprice = g.maxUnitPrice, this.listings = g.listings, this.execute = function() {
                g.execute()
            }, this.item = function(t) {
                var e = this.order.get("item");
                return e ? e[t] : null
            }, this.get = function(t) {
                return this.reducer(t)
            }, this.set = function(t, e) {
                return this.reducer(t, e)
            }, this.mod = function(t, e) {
                this.set(t, this.get(t) + e)
            }, this.dismissMessage = function() {
                g.dismissMessage()
            }, this.viewUpDown = function(t) {
                return {
                    tag: "div",
                    attrs: {
                        className: "updown"
                    },
                    children: [{
                        tag: "button",
                        attrs: {
                            className: "up",
                            onclick: this.mod.bind(this, t, 1)
                        },
                        children: []
                    }, {
                        tag: "button",
                        attrs: {
                            className: "down",
                            onclick: this.mod.bind(this, t, -1)
                        },
                        children: []
                    }]
                }
            }, this.viewCurrency = function(t) {
                var a = t[0],
                    i = t[1],
                    n = "unitprice." + a;
                return (i = i || {}).type = "number", i.min = "-1", i.step = "1", i.value = 0 !== this.get(n) || s[a] ? this.get(n) : "0", i.oninput = function(t) {
                    t.target.validity.valid ? (s[a] = "" === t.target.value, e.set(n, t.target.value)) : t.target.value = e.get(n)
                }, i.onmousewheel = function(t) {
                    t.preventDefault(), e.mod(n, t.wheelDeltaY > 0 ? 1 : -1)
                }, [m("input." + a, i), this.viewUpDown(n), m("i.coin." + a)]
            }, this.viewGold = function() {
                return [
                    ["gold", {
                        tabindex: 2,
                        max: 1e4
                    }],
                    ["silver", {
                        tabindex: 3,
                        max: 100
                    }],
                    ["copper", {
                        tabindex: 4,
                        max: 100
                    }]
                ].map(this.viewCurrency.bind(this)).reduce(function(t, e) {
                    return t.concat(e)
                }, [m("label", i("buy" === this.get("order.buyOrSell"), r.buy.max, r.sell.min))])
            }, this.profit = function() {
                var e = this.get("order.profit");
                if ("sell" === this.get("order.buyOrSell")) return t.Lang.sub(r.sell.profit, {
                    gold: e.gold,
                    silver: e.silver,
                    copper: e.copper
                })
            }, this.tooltip = function(t, e) {
                return e && (t.attrs.onmouseover = function() {
                    native.call("ShowTextTooltip", e), m.redraw.strategy("none")
                }, t.attrs.onmouseout = function() {
                    native.call("HideTextTooltip"), m.redraw.strategy("none")
                }), t
            }, this.selectListing = function(t, e) {
                g.selectListing(t, e)
            }, this.viewMessages = function() {
                var t, e, s = this.get("order.message");
                return s && s.text ? s.tall ? (t = [], s.classes = s.classes || "none", "no-ok-button" !== s.classes && t.push({
                    tag: "button",
                    attrs: {
                        className: "btn dismiss",
                        onclick: this.dismissMessage
                    },
                    children: [r.transactions.okay]
                }), t.push({
                    tag: "button",
                    attrs: {
                        className: "btn closer",
                        onclick: h
                    },
                    children: [r.transactions.close]
                }), e = [{
                    tag: "div",
                    attrs: {
                        className: "message-text"
                    },
                    children: [m("h1", s.heading)]
                }, {
                    tag: "div",
                    attrs: {
                        class: "message-text " + s.kind
                    },
                    children: [m.trust(s.text)]
                }], s.background && e.push({
                    tag: "div",
                    attrs: {
                        class: "message-background-clip " + s.kind
                    },
                    children: [{
                        tag: "img",
                        attrs: {
                            className: "message-background",
                            src: s.background
                        },
                        children: []
                    }]
                }), {
                    tag: "div",
                    attrs: {
                        class: "message tall " + [s.kind, s.active, s.classes].join(" "),
                        key: s.text
                    },
                    children: [e.concat(t)]
                }) : this.get("order.uiLocked") ? {
                    tag: "div",
                    attrs: {
                        className: "message"
                    },
                    children: []
                } : (e = [{
                    tag: "span",
                    attrs: {
                        class: "message-text " + s.kind
                    },
                    children: [m("i.icon.icon-" + (s.kind || "warning")), m.trust(s.text)]
                }], s.background && e.push({
                    tag: "div",
                    attrs: {
                        class: "message-background-clip " + s.kind
                    },
                    children: [{
                        tag: "img",
                        attrs: {
                            className: "message-background",
                            src: s.background
                        },
                        children: []
                    }]
                }), {
                    tag: "div",
                    attrs: {
                        class: "message " + [s.active, s.kind].join(" "),
                        key: s.text
                    },
                    children: [e]
                }) : {
                    tag: "div",
                    attrs: {
                        className: "message"
                    },
                    children: []
                }
            }, this.prefetch = function() {
                return l.map(function(t) {
                    return {
                        tag: "link",
                        attrs: {
                            rel: "prefetch",
                            href: t
                        },
                        children: []
                    }
                })
            }, this.viewListings = function() {
                var s = this.get("order.buyOrSell");
                return [{
                        tag: "div",
                        attrs: {
                            className: "loading"
                        },
                        children: [{
                            tag: "div",
                            attrs: {
                                className: "spinner"
                            },
                            children: []
                        }]
                    },
                    ["buy", "sell"].map(function(t) {
                        var e = {
                            header: "transactions.listings." + t + ".heading",
                            number: "transactions.listings." + t + ".quantity",
                            listText: "transactions.listings." + t + ".field",
                            noneleftText: "transactions.listings." + t + ".noneleft",
                            selectedText: "transactions.listings." + s + ("buy" === t && s ? ".selected" : ".instant"),
                            cssClass: "buy" === t ? "bids" : "asks",
                            items: g.listings.get(t + "s") || [],
                            type: t
                        };
                        return s === t && (e.noneLeftText2 = "transactions.listings." + s + ".noneleft2"), e
                    }).map(function(n) {
                        return {
                            tag: "div",
                            attrs: {
                                class: "listing vbox " + [n.cssClass, s].join(" ")
                            },
                            children: [m("h2", p(n.header)), {
                                tag: "div",
                                attrs: {
                                    className: "hbox titles"
                                },
                                children: [m(".spacer", p(n.number)), m("div", r.transactions.headings.price)]
                            }, m(".items.spacer", n.items.map(function(c, o) {
                                return e.tooltip({
                                    tag: "div",
                                    attrs: {
                                        class: "hbox row " + i(o % 2, "odd"),
                                        key: c.unitPrice,
                                        "data-selected": c.quantity > 0 ? i(n.type === s, "warning") + i(c.quantity === c.maxQuantity, "all", "some") : "none",
                                        onclick: e.selectListing.bind(e, n.type, c)
                                    },
                                    children: [{
                                        tag: "div",
                                        attrs: {
                                            className: "check"
                                        },
                                        children: []
                                    }, {
                                        tag: "div",
                                        attrs: {
                                            className: "spacer"
                                        },
                                        children: [{
                                            tag: "span",
                                            attrs: {
                                                className: "when-selected"
                                            },
                                            children: [m.trust(t.Lang.sub(p(n.selectedText), {
                                                count: "<span class='quantity'>" + c.maxQuantity + "</span>",
                                                selected: "<span class='selected'>" + c.quantity + "</span>"
                                            }))]
                                        }, {
                                            tag: "span",
                                            attrs: {
                                                className: "when-not-selected"
                                            },
                                            children: [m.trust(t.Lang.sub(p(n.listText), {
                                                count: "<span class='quantity'>" + c.maxQuantity + "</span>"
                                            }))]
                                        }]
                                    }, a.coins(c.unitPrice, {
                                        hide: !0
                                    })]
                                }, r.transactions.tooltips["match" + n.type])
                            }))]
                        }
                    })
                ]
            }
        },
        view: function(e) {
            return u ? "order" !== window.state.section().name ? {
                subtree: "retain"
            } : {
                tag: "div",
                attrs: {
                    class: "order active",
                    onclick: function(t) {
                        t.target.classList.contains("prompt") && h()
                    }
                },
                children: [t.GW2.prompt([e.prefetch(), {
                    tag: "div",
                    attrs: {
                        className: "topButtons"
                    },
                    children: [{
                        tag: "button",
                        attrs: {
                            className: "closer btn",
                            onclick: h
                        },
                        children: []
                    }]
                }, i(e.get("order.itemLoaded"), m(".header", a.item({
                    guid: e.item("dataId")
                }), {
                    tag: "div",
                    attrs: {
                        className: "names"
                    },
                    children: [{
                        tag: "h1",
                        attrs: {
                            class: "rarity " + e.item("rarityAttr")
                        },
                        children: [e.item("name")]
                    }, m("h4", r.items.headings.vendor, a.coins(e.item("vendor"), {
                        id: "vendorPrice",
                        hide: !0
                    }))]
                }), {
                    tag: "div",
                    attrs: {
                        className: "header"
                    },
                    children: [{
                        tag: "div",
                        attrs: {
                            className: "spinner"
                        },
                        children: []
                    }]
                }), {
                    tag: "div",
                    attrs: {
                        className: "commerce"
                    },
                    children: [{
                        tag: "div",
                        attrs: {
                            className: "ordercontrols"
                        },
                        children: [{
                            tag: "div",
                            attrs: {
                                className: "fieldset"
                            },
                            children: [{
                                tag: "label",
                                attrs: {
                                    for: "quantity"
                                },
                                children: [r.transactions.quantity]
                            }, {
                                tag: "input",
                                attrs: {
                                    className: "quantity",
                                    type: "number",
                                    value: e.get("order.quantity"),
                                    tabindex: 1,
                                    min: 0,
                                    max: e.get("order.maxQuantity"),
                                    oninput: e.blankInput.bind(e, "order.quantity"),
                                    onmousewheel: function(t) {
                                        t.preventDefault(), e.set("order.quantity", e.get("order.quantity") + (t.wheelDeltaY > 0 ? 1 : -1))
                                    }
                                },
                                children: []
                            }, e.viewUpDown("order.quantity"), {
                                tag: "input",
                                attrs: {
                                    type: "range",
                                    min: 1,
                                    max: e.get("order.maxQuantity"),
                                    step: 1,
                                    value: e.get("order.quantity"),
                                    oninput: m.withAttr("value", (s = e.set.bind(e, "order.quantity"), function(t) {
                                        s(parseInt(t, 10))
                                    }))
                                },
                                children: []
                            }, i("sell" === e.get("order.buyOrSell"), {
                                tag: "span",
                                attrs: {
                                    className: "temp"
                                },
                                children: [m("span", e.get("order.quantity")), "/", m("span", e.get("order.maxAvailable"))]
                            })]
                        }, m(".fieldset", e.viewGold()), {
                            tag: "div",
                            attrs: {
                                className: "fieldset dark"
                            },
                            children: [{
                                tag: "label",
                                attrs: {
                                    for: "totalPrice",
                                    class: i(!e.get("order.canAfford"), "unaffordable")
                                },
                                children: [r.buy.total]
                            }, e.tooltip(a.coins(e.get("order.totalPrice"), {
                                id: "#totalPrice",
                                class: i("sell" === e.get("order.buyOrSell"), "sell-total")
                            }), e.profit()), i("buy" !== e.get("order.buyOrSell"), m(".fees", e.tooltip(m(".listing-fee", r.sell.fee.listing, a.coins(e.get("order.listingFee"), {
                                hide: !0
                            })), r.transactions.tooltips.listingfee), e.tooltip(m(".exchange-fee", r.sell.fee.exchange, a.coins(e.get("order.exchangeFee"), {
                                hide: !0
                            })), r.transactions.tooltips.exchangefee)))]
                        }, {
                            tag: "div",
                            attrs: {
                                className: "buttons"
                            },
                            children: [{
                                tag: "button",
                                attrs: {
                                    id: "executeButton",
                                    className: "btn",
                                    onclick: e.execute,
                                    disabled: !e.get("order.canExecute")
                                },
                                children: [r[e.get("order.buyOrSell")][e.get("order.instant") ? "instantly" : "order"]]
                            }, {
                                tag: "button",
                                attrs: {
                                    id: "cancelButton",
                                    className: "btn closer",
                                    onclick: h
                                },
                                children: [r.transactions.cancel]
                            }]
                        }]
                    }, m(".messages", e.viewMessages())]
                }, {
                    tag: "div",
                    attrs: {
                        class: "listings hbox " + i(!e.get("listings.loading"), "active")
                    },
                    children: [e.viewListings()]
                }], [e.get("order.buyOrSell"), i(e.get("order.uiLocked"), "locked")].join(" "))]
            } : (u = !0, {
                tag: "div",
                attrs: {
                    className: "order"
                },
                children: []
            });
            var s
        }
    }
}, "@VERSION@", {
    requires: ["base-build", "view", "node", "prompt", "sts-request", "util-coins", "util-optional", "util-restricted", "model-orderstate", "element-item", "element-coins", "css-order", "css-spinner"]
});