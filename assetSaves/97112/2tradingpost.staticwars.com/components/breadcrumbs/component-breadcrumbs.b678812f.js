YUI.add("component-breadcrumbs", function(e) {
    "use strict";
    var t = e.namespace("GW2.Components"),
        r = e.namespace("Util").optional,
        a = window.tp_strings,
        s = e.namespace("GW2.professionMappings.weapon");

    function i(e, t) {
        return 0 === e.indexOf("category") || e.indexOf("category") > t.indexOf("category") ? -1 : 1
    }
    t.Breadcrumbs = {
        controller: function() {
            var e = m.prop([]);
            return {
                lastFilters: e,
                breadcrumb: function(t, i) {
                    var n, l;
                    switch (t.subcategory && "profession" === i && "weapon" === t.category && (l = -1 === s[t.profession].indexOf(t.subcategory)), i) {
                        case "category":
                            n = /^bag\d+$/.test(t[i]) ? a.category.slot + " " + (parseInt(t.category.substring(3), 10) + 1) : a.category[t.category];
                            break;
                        case "subcategory":
                            n = a.filters[t.category][t.subcategory];
                            break;
                        case "available":
                            n = a.filters[i].label;
                            break;
                        case "level":
                            n = a.filters[i].label + " : " + t.levelMin + " - " + t.levelMax;
                            break;
                        case "profession":
                        case "discipline":
                        case "rarity":
                            n = a.filters[i][t[i]];
                            break;
                        default:
                            n = a.filters[i].label + " : " + t[i]
                    }
                    return {
                        tag: "div",
                        attrs: {
                            class: "filter " + r(!e()[i], "dirty") + " " + i + " " + r(l, "disabled"),
                            key: i,
                            onclick: function() {
                                window.state.removeFilter(i)
                            },
                            config: function(e) {
                                setTimeout(function() {
                                    e.classList.remove("dirty")
                                }, 0)
                            }
                        },
                        children: [n, {
                            tag: "span",
                            attrs: {
                                className: "killFilter"
                            },
                            children: [" x"]
                        }]
                    }
                }
            }
        },
        view: function(t) {
            var r, a, s, n;
            return "order" === window.state.section().name ? {
                subtree: "retain"
            } : (r = window.state.section().params(), a = {}, e.Object.each(r, function(e, t) {
                null === e || "object" != typeof e ? a[t] = r[t] : a[e.selected] = e.value
            }), n = Object.keys(a).filter(function(e) {
                return "levelMin" !== e && "levelMax" !== e && null !== a[e] && void 0 !== a[e]
            }), (a.levelMin > 0 || a.levelMax < 80) && n.push("level"), s = (n = n.sort(i)).slice(0), n = n.map(t.breadcrumb.bind(null, a)), t.lastFilters(s), {
                tag: "div",
                attrs: {
                    className: "breadcrumbs"
                },
                children: [m(".filter-tabs hbox", n), {
                    tag: "div",
                    attrs: {
                        className: "filterborder"
                    },
                    children: []
                }]
            })
        }
    }
}, "@VERSION@", {
    requires: ["css-breadcrumbs", "util-optional"]
});