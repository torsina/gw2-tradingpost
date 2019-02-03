YUI.add("item-table-view", function(t) {
    "use strict";
    var e = t.namespace("ItemTable"),
        s = t.namespace("Util").optional,
        i = t.namespace("GW2.Components"),
        l = e.data,
        n = window.tp_strings,
        a = !1;
    e.view = function(t) {
        var o, c, r, d = window.state.section().name;
        return a ? -1 === ["browse", "sell", "transactions"].indexOf(d) ? {
            subtree: "retain"
        } : (o = window.state.section().results(), c = e.viewport(t, o), r = window.state.synced(), !o.length && r ? e.outer(t, {
            tag: "div",
            attrs: {
                className: "no-items",
                config: function(t) {
                    t.classList.contains("active") || setTimeout(function() {
                        t.classList.add("active")
                    }, 0)
                }
            },
            children: [n.items.noresults]
        }) : (t.prevViewport = c, e.outer(t, {
            tag: "div",
            attrs: {
                class: "items " + [s(c.y > 0, "scrolled"), s(c.begin > 0 && c.end === o.length, "bottom"), s(window.state.powerMode(), "power")].join(" "),
                config: function(e, s) {
                    !s && t.scroll.y > 0 && 0 === e.scrollTop && (e.scrollTop = t.scroll.y)
                },
                onscroll: s(o.length, t._onScroll.bind(t, o), null)
            },
            children: [{
                tag: "div",
                attrs: {
                    className: "wrapper",
                    style: {
                        height: s(t.scroll.max, t.scroll.max + "px", "auto")
                    }
                },
                children: [{
                    tag: "div",
                    attrs: {
                        className: "viewport",
                        style: {
                            "-webkit-transform": "translateY(" + c.y + "px)"
                        }
                    },
                    children: [o.slice(c.begin, c.end).map(function(n, a) {
                        return {
                            tag: "div",
                            attrs: {
                                class: "item-row hbox " + [s(a % 2, "odd"), s(window.state.powerMode() || "sell" === d, "shown")].join(" "),
                                key: n.clientId,
                                style: {
                                    transitionDelay: 15 * (a - 1) + "ms, 0, 0"
                                },
                                "data-quantity": n[l.quantities[d]],
                                onclick: i.OrderMithril.showDialog.bind(null, "sell" === d ? "sell" : "buy", n),
                                config: function(t) {
                                    t.classList.contains("shown") || setTimeout(function() {
                                        t.classList.add("shown")
                                    }, 0)
                                }
                            },
                            children: [l.columns[d].map(function(s) {
                                return {
                                    tag: "div",
                                    attrs: {
                                        class: "cell cell-" + (l.cells[s] || s)
                                    },
                                    children: [s in l.cells ? e.cells[l.cells[s]]({
                                        item: n,
                                        col: s,
                                        ctrl: t
                                    }) : n[s]]
                                }
                            })]
                        }
                    })]
                }]
            }]
        }))) : (a = !0, {
            tag: "div",
            attrs: {
                className: "items"
            },
            children: []
        })
    }
}, "@VERSION@", {
    requires: ["util-optional", "util-text-keys", "item-table-data", "item-table-cells", "item-table-viewport", "item-table-outer", "css-item-table", "css-spinner"]
});