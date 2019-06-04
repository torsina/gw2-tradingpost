YUI.add("app-ntp", function(e) {
    "use strict";
    var t, o = e.namespace("GW2.Components"),
        a = e.namespace("GW2.Util").items,
        n = e.namespace("STS");
    t = {
        controller: function() {
            var e, t = m.route().replace(window.location.search, "");
            m.redraw.strategy("diff"), "/" === t && window.state.setSection("home"), 0 === t.indexOf("/browse") && (window.state.setSection("browse", m.route.param("category")), m.route.param("category") && window.state.setCategory(m.route.param("category"))), 0 === t.indexOf("/item/buy") && (window.state.setSection("home", !0), a.load({
                data_id: m.route.param("dataId")
            }).then(function(e) {
                window.state.refreshOnDialogClose(!0), o.OrderMithril.showDialog("buy", e.items[0])
            }, n.netError)), 0 === t.indexOf("/item/sell") && (window.state.setSection("sell", !0), window.native.stats.inventory.some(function(t) {
                if (t.itemId === parseInt(m.route.param("itemId"), 10)) return e = t.dataId, !0
            }), window.state.refreshOnDialogClose(!0), a.load(e).then(function(e) {
                o.OrderMithril.showDialog("sell", e.items[0])
            })), "/sell" === t && window.state.setSection("sell"), 0 === t.indexOf("/transactions") && (window.state.setSection("transactions", m.route.param("section")), m.route.param("section") && window.state.setCategory(m.route.param("section")))
        },
        view: function() {
            return {
                tag: "div",
                attrs: {
                    class: "hbox app-wrapper section-" + window.state.section().name
                },
                children: [m.component(o.OrderMithril), {
                    tag: "div",
                    attrs: {
                        className: "vbox nav"
                    },
                    children: [m.component(o.Balance), m.component(o.Filters), m.component(o.Categories), m.component(o.Delivery)]
                }, {
                    tag: "div",
                    attrs: {
                        className: "vbox spacer"
                    },
                    children: [m.component(o.Tabs), {
                        tag: "div",
                        attrs: {
                            className: "mid vbox spacer"
                        },
                        children: [m.component(o.Breadcrumbs), {
                            tag: "div",
                            attrs: {
                                className: "views vbox"
                            },
                            children: [m.component(o.ItemTable), m.component(o.Home)]
                        }]
                    }]
                }]
            }
        }
    }, m.route.mode = "pathname", m.route(document.querySelector(".app"), "/", {
        "/": t,
        "/browse": t,
        "/browse/:category": t,
        "/item/buy/:dataId": t,
        "/item/sell/:itemId": t,
        "/sell": t,
        "/transactions": t,
        "/transactions/:section": t
    })
}, "@VERSION@", {
    requires: ["app-state", "unauthorized", "gw2-enums", "sell", "browse", "transactions", "home", "view-order", "component-balance", "component-filters", "component-delivery-box", "component-tabs", "component-categories", "component-item-table", "component-breadcrumbs", "css-app", "css-grid", "button", "util-text-keys", "util-optional", "util-items"]
});