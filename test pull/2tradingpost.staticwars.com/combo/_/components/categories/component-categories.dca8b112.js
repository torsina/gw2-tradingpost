YUI.add("component-categories", function(t) {
    "use strict";
    var e = t.namespace("GW2.Components"),
        a = t.namespace("Util").optional,
        n = window.tp_strings,
        i = t.namespace("navigation"),
        s = t.namespace("Elements");
    e.Categories = {
        view: function() {
            var t, e, r, o, c = window.state.section();
            return "order" === c.name ? {
                subtree: "retain"
            } : (o = i[c.name] || i.browse, t = c.params(), e = "home" === c.name ? null : t.category, r = t.subcategory, {
                tag: "div",
                attrs: {
                    className: "navigation view-categories"
                },
                children: [m("ul.list", Object.keys(o).map(function(t, i) {
                    var c, l = o[t];
                    return l ? (c = Object.keys(l).filter(function(t) {
                        return "noSubCat" !== t
                    }), {
                        tag: "li",
                        attrs: {
                            class: "cat " + (a(e === t, "active ") + a(i % 2, "odd")),
                            onclick: function() {
                                window.state.setCategory(t === e ? null : t)
                            }
                        },
                        children: [{
                            tag: "a",
                            attrs: {
                                class: "target " + a(!l.dataId && c.length, "arrow")
                            },
                            children: [a(l.dataId, s.item({
                                guid: l.dataId,
                                name: l.name
                            }), l.name || n.category[t])]
                        }, a(!l.dataId && c.length, {
                            tag: "ul",
                            attrs: {
                                className: "sub",
                                style: {
                                    height: (e === t ? 33 * c.length : "0") + "px"
                                }
                            },
                            children: [c.map(function(i) {
                                return {
                                    tag: "div",
                                    attrs: {
                                        class: "cat " + a(r === i, "active"),
                                        onclick: function(t) {
                                            t.stopImmediatePropagation(), window.state.setCategory(e, i === r ? null : i)
                                        }
                                    },
                                    children: [m("a.target", n.filters[t] ? n.filters[t][i] : "")]
                                }
                            })]
                        })]
                    }) : null
                }))]
            })
        }
    }
}, "@VERSION@", {
    requires: ["css-categories", "navigation", "element-item", "util-optional", "node-event-simulate"]
});