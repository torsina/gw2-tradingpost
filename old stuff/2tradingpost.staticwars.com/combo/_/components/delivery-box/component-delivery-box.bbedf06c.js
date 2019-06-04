YUI.add("component-delivery-box", function(e) {
    "use strict";
    var t = e.namespace("GW2.Components"),
        a = e.namespace("Elements"),
        n = e.namespace("Util").optional,
        s = window.tp_strings.transactions.deliveries,
        i = window.native,
        r = e.namespace("GW2.Plugins").NumberFloaterPlugin,
        o = {
            start: "-15px",
            end: "-30px",
            duration: 2,
            easing: "ease-out"
        };
    t.Delivery = {
        controller: function() {
            var t = m.prop(!1),
                n = m.prop(!1),
                s = m.prop(!1),
                r = {
                    coins: m.prop(i.stats.pickupCoins || 0),
                    items: m.prop(i.stats.pickupItems || [])
                };
            return i.call("IsTradingPostActive").then(function(e) {
                n(e), e && t(!0), m.redraw()
            }), i.stats.on(["pickupCoinsChange", "pickupItemsChange"], function(t, n) {
                var s, i, r = n.stat.replace("pickup", "").toLowerCase(),
                    o = document.querySelector(".delivery");
                "items" === r ? (s = n.newVal.length - n.prevVal.length) && e.one(o.querySelector(".itemsFloater")).floater.show(Math.abs(s), null, s < 0) : "coins" === r && (s = n.newVal - n.prevVal) && (i = document.createElement("span"), m.render(i, a.coins(Math.abs(s), {
                    hide: !0
                })), e.one(o.querySelector(".coinsFloater")).floater.show(i, null, s < 0)), t[r](n.newVal), m.redraw()
            }.bind(null, r)), {
                expanded: t,
                active: n,
                pickup: r,
                disabledMsg: s,
                itemsHover: function(e) {
                    return m.redraw.strategy("none"), n() ? null : !e.forced && e.relatedTarget && (e.relatedTarget === e.currentTarget || e.currentTarget.compareDocumentPosition(e.relatedTarget) & Node.DOCUMENT_POSITION_CONTAINED_BY) ? null : (m.redraw.strategy("diff"), void s("mouseover" === e.type))
                }
            }
        },
        view: function(t) {
            var c = t.pickup.items(),
                l = t.pickup.coins();
            return {
                tag: "div",
                attrs: {
                    class: "delivery " + n(t.expanded(), "expanded") + " " + n(c.length || l, "hasPickup") + " " + n(t.active(), "active") + " " + n(0 === window.location.pathname.indexOf("/transactions"), "transactions")
                },
                children: [{
                    tag: "div",
                    attrs: {
                        className: "hbox hd",
                        onclick: function() {
                            t.expanded(!t.expanded())
                        }
                    },
                    children: [{
                        tag: "h1",
                        attrs: {
                            className: "title"
                        },
                        children: [{
                            tag: "span",
                            attrs: {
                                className: "alertIcon"
                            },
                            children: []
                        }, s.title]
                    }, {
                        tag: "div",
                        attrs: {
                            className: "expander"
                        },
                        children: []
                    }]
                }, {
                    tag: "div",
                    attrs: {
                        className: "notes"
                    },
                    children: [{
                        tag: "a",
                        attrs: {
                            href: "/transactions/history",
                            config: m.route
                        },
                        children: [s.items + " "]
                    }, {
                        tag: "span",
                        attrs: {
                            className: "itemsFloater",
                            config: function(t, a) {
                                a || e.one(t).plug(r, o)
                            }
                        },
                        children: []
                    }, m("span.itemsLength", t.pickup.items().length)]
                }, {
                    tag: "div",
                    attrs: {
                        className: "notes hbox"
                    },
                    children: [{
                        tag: "a",
                        attrs: {
                            href: "/transactions/history",
                            config: m.route
                        },
                        children: [s.funds]
                    }, {
                        tag: "span",
                        attrs: {
                            className: "coinsFloater",
                            config: function(t, a) {
                                a || e.one(t).plug(r, o)
                            }
                        },
                        children: []
                    }, a.coins(t.pickup.coins(), {
                        hide: !0
                    })]
                }, {
                    tag: "div",
                    attrs: {
                        className: "expandArea"
                    },
                    children: [{
                        tag: "div",
                        attrs: {
                            className: "items",
                            onmouseover: t.itemsHover,
                            onmouseout: t.itemsHover
                        },
                        children: [{
                            tag: "div",
                            attrs: {
                                class: "message vbox " + n(!t.active() && !t.disabledMsg(), "show") + " " + n(!c.length, "empty")
                            },
                            children: [{
                                tag: "p",
                                attrs: {},
                                children: [m.trust((c.length || l ? s.not.available : s.no.items).replace("{tradingIcon}", '<span class="icon"></span>'))]
                            }]
                        }, t.pickup.items().map(function(e) {
                            return a.item({
                                guid: e.itemId,
                                count: e.count
                            })
                        })]
                    }, {
                        tag: "div",
                        attrs: {
                            className: "controls"
                        },
                        children: [{
                            tag: "button",
                            attrs: {
                                className: "btn",
                                disabled: !t.active(),
                                onclick: function() {
                                    t.active() && i.call("PickupAllItems")
                                }
                            },
                            children: [s.button]
                        }]
                    }]
                }]
            }
        }
    }
}, "@VERSION@", {
    requires: ["css-delivery", "util-optional", "element-item", "element-coins", "number-floater-plugin"]
});