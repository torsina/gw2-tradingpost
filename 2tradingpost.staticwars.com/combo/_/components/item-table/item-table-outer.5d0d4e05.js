YUI.add("item-table-outer", function(t) {
    "use strict";
    var e = t.namespace("ItemTable"),
        a = t.namespace("Util").optional,
        s = e.data,
        i = window.tp_strings;
    e.outer = function(e, n) {
        var o, l = window.state.section().name,
            r = !window.state.synced();
        return {
            tag: "div",
            attrs: {
                className: "view item-table"
            },
            children: [{
                tag: "div",
                attrs: {
                    className: "spacer vbox cards"
                },
                children: [{
                    tag: "div",
                    attrs: {
                        class: "loader " + a(r, "loading")
                    },
                    children: [{
                        tag: "div",
                        attrs: {
                            className: "spinner"
                        },
                        children: []
                    }]
                }, {
                    tag: "div",
                    attrs: {
                        className: "item-list vbox"
                    },
                    children: [m(".item-header.hbox", s.headers[l].map(function(t, e) {
                        var n = window.state.section(),
                            o = "quantity" === e ? s.quantities[n.name] : e,
                            l = n.sortDesc() ? "desc" : "asc",
                            r = n.sortField();
                        return {
                            tag: "div",
                            attrs: {
                                class: "cell " + ["cell-" + (s.cells[e] || e), a(o === r, l)].join(" "),
                                onclick: m.withAttr("data-sort", window.state.sort),
                                "data-sort": o
                            },
                            children: [m("a", i.items.headings[e])]
                        }
                    }.bind(null, e))), n]
                }, m(".item-messages", "transactions" === l ? function(e) {
                    var s = window.state.section();
                    if (s.loadMore()) return {
                        tag: "div",
                        attrs: {
                            className: "message more",
                            config: function(t) {
                                t.classList.contains("active") || setTimeout(function() {
                                    t.classList.add("active")
                                }, 0)
                            }
                        },
                        children: [m(".more-total", a(window.state.canReset(), s.results().length, t.Lang.sub(i.items.total, {
                            amount: s.results().length,
                            total: s.totalResults()
                        }))), {
                            tag: "button",
                            attrs: {
                                className: "messageButton btn",
                                disabled: !window.state.synced(),
                                onclick: e._onMoreClick.bind(e)
                            },
                            children: [i.items.loadmore]
                        }]
                    }
                }(e) : "", "browse" === l ? (o = window.state.section(), {
                    tag: "div",
                    attrs: {
                        class: "message max " + a(500 === (o.results() && o.results().length) && !window.state.powerMode(), "active")
                    },
                    children: [i.items.maxresults]
                }) : "")]
            }]
        }
    }
}, "@VERSION@", {
    requires: ["util-optional", "item-table-data"]
});