YUI.add("component-balance", function(e) {
    "use strict";
    var n = window.native,
        a = e.namespace("Elements"),
        t = window.tp_strings,
        c = e.namespace("GW2.Plugins").NumberFloaterPlugin,
        s = {
            start: "-15px",
            end: "-30px",
            duration: 2,
            easing: "ease-out"
        };
    e.namespace("GW2.Components").Balance = {
        controller: function() {
            n.stats.on("coinsChange", function(n) {
                var t, c = n.newVal - n.prevVal;
                c && (t = document.createElement("span"), m.render(t, a.coins(Math.abs(c), {
                    hide: !0
                })), e.one(document.querySelector(".balancebg .coins-floater")).floater.show(t, null, c < 0), m.redraw())
            })
        },
        view: function() {
            return {
                tag: "div",
                attrs: {
                    className: "balance"
                },
                children: [{
                    tag: "div",
                    attrs: {
                        className: "balancebg"
                    },
                    children: [{
                        tag: "span",
                        attrs: {
                            className: "coins-floater",
                            config: function(n, a) {
                                a || e.one(n).plug(c, s)
                            }
                        },
                        children: []
                    }, m("span.serif.balance-coins", a.coins(window.native.stats.coins || 0)), {
                        tag: "div",
                        attrs: {
                            className: "getmogold"
                        },
                        children: [{
                            tag: "a",
                            attrs: {
                                href: "getgold",
                                onclick: function() {
                                    n.call("ChangeTab", "Exchange")
                                }
                            },
                            children: [t.balance.moregold]
                        }]
                    }]
                }]
            }
        }
    }
}, "@VERSION@", {
    requires: ["css-balance", "element-coins", "number-floater-plugin"]
});