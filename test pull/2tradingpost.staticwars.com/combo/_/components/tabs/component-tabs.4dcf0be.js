YUI.add("component-tabs", function(e) {
    "use strict";
    var a = window.tp_strings.tabs,
        n = [{
            name: "home",
            href: "/"
        }, {
            name: "browse",
            href: "/browse"
        }, {
            name: "sell",
            href: "/sell"
        }, {
            name: "transactions",
            href: "/transactions"
        }];
    e.namespace("GW2.Components").Tabs = {
        view: function() {
            return m(".tabs", n.map(function(e) {
                return {
                    tag: "a",
                    attrs: {
                        class: "tab " + e.name + " " + (e.disabled ? "disabled " : " "),
                        config: m.route,
                        href: e.href
                    },
                    children: [a[e.name]]
                }
            }))
        }
    }
}, "@VERSION@", {
    requires: ["css-tabs"]
});