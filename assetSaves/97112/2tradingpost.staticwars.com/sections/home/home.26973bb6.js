YUI.add("home", function(t) {
    "use strict";
    var e = t.namespace("GW2.Extensions"),
        s = t.namespace("GW2.Components"),
        a = t.namespace("Elements"),
        n = t.namespace("GW2.Util"),
        i = t.namespace("STS"),
        o = t.namespace("Util").optional,
        r = window.tp_strings,
        c = !1,
        l = {
            section: "history",
            type: "buy",
            total: 3,
            offset: 0
        },
        d = {
            section: "history",
            type: "sell",
            total: 3,
            offset: 0
        };
    t.GW2.home = {
        get: function() {
            t.GW2.home.getViewed(), t.GW2.home.getTrades()
        },
        getViewed: function(s) {
            e.LastViewed.getRecent().then(function(e) {
                e.length ? n.items.load(e).then(function(s) {
                    var a = {};
                    s.items.forEach(function(t) {
                        a[t.data_id] = t
                    }), window.state.sections.home.viewed(e.map(function(e) {
                        var s = a[e.data_id];
                        return t.merge(e, s, {
                            type: "buy",
                            count: s.sell_count,
                            coins: s.sell_price
                        })
                    }).reverse()), m.redraw()
                }, i.netError) : s._viewed = []
            })
        },
        getTrades: function() {
            t.GW2.transactions.getTransactions([l, d]).then(function(t) {
                t = (t = t.sort(function(t, e) {
                    return Date.parse(e.purchased) - Date.parse(t.purchased)
                })).slice(0, 3).map(function(t) {
                    return t.type = t.isBuy ? "buy" : "sell", t.coins = t.unit_price, t.count = t.quantity, t
                }), window.state.sections.home.trades(t), m.redraw()
            }).catch(i.netError)
        }
    }, s.Home = {
        controller: function() {
            var e = {
                itemList: function(e, n) {
                    return e ? o(!e.length, {
                        tag: "div",
                        attrs: {
                            className: "noresults hbox"
                        },
                        children: [m("p", r.home.sections.recent[n].noresults)]
                    }, e.map(function(e, i) {
                        return {
                            tag: "div",
                            attrs: {
                                class: "hbox row " + e.type + " " + o(i % 2, "odd"),
                                onclick: function() {
                                    s.OrderMithril.showDialog("buy", e)
                                }
                            },
                            children: [a.item(t.merge(e, {
                                guid: e.dataId
                            })), o("trades" === n, m(".type", r.category.transaction["history-" + e.type]))]
                        }
                    })) : null
                }
            };
            return e
        },
        view: function(t) {
            return c ? "home" !== window.state.section().name ? {
                subtree: "retain"
            } : {
                tag: "div",
                attrs: {
                    className: "vbox home"
                },
                children: [{
                    tag: "div",
                    attrs: {
                        className: "contents vbox"
                    },
                    children: [{
                        tag: "div",
                        attrs: {
                            className: "navigation"
                        },
                        children: [{
                            tag: "div",
                            attrs: {
                                className: "greeting"
                            },
                            children: [m("h1.title", r.home.welcome.title), m("p", r.home.welcome.message)]
                        }, {
                            tag: "div",
                            attrs: {
                                className: "actions hbox"
                            },
                            children: [{
                                tag: "div",
                                attrs: {
                                    className: "action sell"
                                },
                                children: [{
                                    tag: "a",
                                    attrs: {
                                        href: "/sell",
                                        config: m.route
                                    },
                                    children: [{
                                        tag: "i",
                                        attrs: {
                                            className: "icon"
                                        },
                                        children: []
                                    }, m("button.btn", r.home.buttons.sell)]
                                }]
                            }, {
                                tag: "div",
                                attrs: {
                                    className: "action buyArmor"
                                },
                                children: [{
                                    tag: "a",
                                    attrs: {
                                        href: "/browse/armor",
                                        config: m.route
                                    },
                                    children: [{
                                        tag: "i",
                                        attrs: {
                                            className: "icon"
                                        },
                                        children: []
                                    }, m("button.btn", r.home.buttons.armor)]
                                }]
                            }, {
                                tag: "div",
                                attrs: {
                                    className: "action buyWeapons"
                                },
                                children: [{
                                    tag: "a",
                                    attrs: {
                                        href: "/browse/weapon",
                                        config: m.route
                                    },
                                    children: [{
                                        tag: "i",
                                        attrs: {
                                            className: "icon"
                                        },
                                        children: []
                                    }, m("button.btn", r.home.buttons.weapons)]
                                }]
                            }]
                        }]
                    }, {
                        tag: "div",
                        attrs: {
                            className: "recent hbox"
                        },
                        children: [{
                            tag: "section",
                            attrs: {
                                className: "views vbox"
                            },
                            children: [m("h3.title", r.home.sections.recent.views.heading), m(".rows.vbox", t.itemList(window.state.sections.home.viewed(), "views"))]
                        }, {
                            tag: "section",
                            attrs: {
                                className: "trades vbox"
                            },
                            children: [m("h3.title", r.home.sections.recent.trades.heading), m(".rows.vbox", t.itemList(window.state.sections.home.trades(), "trades"))]
                        }]
                    }]
                }]
            } : (c = !0, {
                tag: "div",
                attrs: {
                    className: "vbox home"
                },
                children: []
            })
        }
    }
}, "@VERSION@", {
    requires: ["util-items", "util-optional", "transactions", "element-item", "css-home"]
});