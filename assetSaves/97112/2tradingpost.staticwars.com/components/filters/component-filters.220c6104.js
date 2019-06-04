YUI.add("component-filters", function(e) {
    "use strict";
    var t, a = e.namespace("GW2.Components"),
        n = e.namespace("GW2").Enums,
        s = e.namespace("GW2.FilterCategories"),
        i = (e.namespace("GW2.Util"), window.tp_strings),
        l = e.namespace("Util").optional,
        r = {
            opened: m.prop(!1),
            openedSelect: m.prop(!1)
        },
        c = e.namespace("GW2");

    function o(e, t) {
        var a = parseInt(void 0 !== t ? t : e.value, 10),
            n = parseInt(e.getAttribute("min"), 10),
            s = parseInt(e.getAttribute("max"), 10);
        return isNaN(a) ? e.value = n || 0 : (e.value = Math.max(n, Math.min(s, a)), e.value)
    }

    function d(e, t) {
        var a = window.state.section().params(),
            n = t ? a[e].value : a[e];
        return {
            value: n || 0,
            onmousewheel: function(a) {
                var s = a.wheelDelta > 1 ? 1 : -1;
                a.preventDefault(), o(a.currentTarget, parseInt(n, 10) + s), window.state.setFilter(e, a.currentTarget.value, t)
            },
            oninput: function(a) {
                o(a.currentTarget), window.state.setFilter(e, a.currentTarget.value, t)
            }
        }
    }

    function u(e, t, a) {
        var n = window.state.section().params()[e];
        n === t || n && n.selected && n.selected === t.selected ? a.stopPropagation() : t.selected && -1 !== function() {
            var e = window.state.section().params();
            return ["armorstats1", "armorstats2", "armorstats3", "weaponstats1", "weaponstats2", "weaponstats3"].map(function(t) {
                return e[t] && e[t].selected
            })
        }().indexOf(t.selected) ? a.stopPropagation() : (r.openedSelect(!1), "" !== t ? window.state.setFilter(e, t) : window.state.removeFilter(e))
    }

    function p(e, a) {
        function n() {
            t && (clearInterval(t), t = null)
        }
        return {
            onmousedown: function(n) {
                var s = n.target.classList.contains("up") ? 1 : -1,
                    i = n.currentTarget.previousSibling;

                function l() {
                    var t = window.state.section().params();
                    o(i, parseInt(a ? t[e].value : t[e], 10) + s), window.state.setFilter(e, i.value, a)
                }
                l(), t = setInterval(l, 200)
            },
            onmouseup: n,
            onmouseout: n
        }
    }
    a.Filters = {
        controller: function() {
            return {
                powerMode: function(e) {
                    var t = e.newVal || e.target.value,
                        a = window.state.section();
                    if ("I am Evon Gnashblade" === t) return window.state.powerMode(!window.state.powerMode()), void window.state.removeFilter("text");
                    t ? ("transactions" !== a.name && (a.sortField(!1), a.sortDesc(!1)), window.state.setFilter("text", t)) : window.state.removeFilter("text")
                },
                matchMyLevel: function() {
                    window.state.setFilter("levelMin", Math.max(0, native.stats.earnedLevel - 5)), window.state.setFilter("levelMax", Math.min(80, native.stats.earnedLevel + 5))
                }
            }
        },
        view: function(t) {
            var a, o, v = window.state.section();
            return "order" === v.name ? {
                subtree: "retain"
            } : (a = v.params(), o = (o = s[v.name] || s[a.category || null]).filter(function(e) {
                return "text" !== e
            }), {
                tag: "div",
                attrs: {
                    className: "search-ui filters",
                    onclick: function(e) {
                        e.target.classList.contains("selectmenu") || e.target.classList.contains("selectbox") || r.openedSelect(!1)
                    },
                    config: function(t, a) {
                        a || e.one(t).on({
                            clickoutside: function() {
                                r.opened(!1), r.openedSelect(!1), m.redraw()
                            }
                        })
                    }
                },
                children: [{
                    tag: "div",
                    attrs: {
                        class: "filter-container " + l(r.opened(), "active")
                    },
                    children: [{
                        tag: "input",
                        attrs: {
                            type: "text",
                            maxlength: "30",
                            className: "search-text",
                            config: function(a, n) {
                                n || "zh" !== window.native.stats.language || e.Node(arguments[0]).on("valuechange", t.powerMode)
                            },
                            value: a.text || "",
                            oninput: t.powerMode,
                            placeholder: i.filters.text.label
                        },
                        children: []
                    }, {
                        tag: "button",
                        attrs: {
                            className: "advanced",
                            onclick: function() {
                                r.opened(!r.opened()), r.openedSelect(!1)
                            }
                        },
                        children: []
                    }, m(".filter-list.vbox", o.map(function(s) {
                        var o = a[s],
                            v = o ? o.selected || o : "all";
                        return {
                            tag: "div",
                            attrs: {
                                class: "search-filter hbox " + l(s.active, "active"),
                                id: "filter" + s
                            },
                            children: [l("level" === s, {
                                tag: "div",
                                attrs: {
                                    className: "inputs spacer"
                                },
                                children: [{
                                    tag: "div",
                                    attrs: {
                                        className: "hbox spacer"
                                    },
                                    children: [{
                                        tag: "div",
                                        attrs: {
                                            className: "vbox grow"
                                        },
                                        children: [{
                                            tag: "label",
                                            attrs: {
                                                for: "levelMin"
                                            },
                                            children: [i.filters.level.label + ":"]
                                        }, {
                                            tag: "div",
                                            attrs: {
                                                className: "hbox"
                                            },
                                            children: [m("input[type=number][max=80][min=0]", d("levelMin")), m(".updown", p("levelMin"), {
                                                tag: "button",
                                                attrs: {
                                                    className: "up"
                                                },
                                                children: []
                                            }, {
                                                tag: "button",
                                                attrs: {
                                                    className: "down"
                                                },
                                                children: []
                                            }), m.trust("-&nbsp;"), m("input[type=number][max=80][min=0]", d("levelMax")), m(".updown", p("levelMax"), {
                                                tag: "button",
                                                attrs: {
                                                    className: "up"
                                                },
                                                children: []
                                            }, {
                                                tag: "button",
                                                attrs: {
                                                    className: "down"
                                                },
                                                children: []
                                            }), {
                                                tag: "div",
                                                attrs: {
                                                    className: "spacer"
                                                },
                                                children: []
                                            }, {
                                                tag: "a",
                                                attrs: {
                                                    className: "matchMyLevel",
                                                    onclick: t.matchMyLevel
                                                },
                                                children: [i.filters.match.level]
                                            }]
                                        }]
                                    }]
                                }]
                            }), l("available" === s, [{
                                tag: "div",
                                attrs: {
                                    className: "inputs"
                                },
                                children: [{
                                    tag: "input",
                                    attrs: {
                                        type: "checkbox",
                                        id: "available",
                                        className: "checkbox available",
                                        checked: Boolean(o),
                                        onchange: function(e) {
                                            e.currentTarget.checked ? window.state.setFilter("available", !0) : window.state.removeFilter("available")
                                        }
                                    },
                                    children: []
                                }, m("label[for=available]", i.filters.available.label)]
                            }]), "profession" === s || "rarity" === s ? {
                                tag: "div",
                                attrs: {
                                    className: "inputs"
                                },
                                children: [{
                                    tag: "div",
                                    attrs: {
                                        class: "selectbox " + s + " " + v,
                                        disabled: !v,
                                        onclick: function() {
                                            r.openedSelect(!r.openedSelect() && s)
                                        }
                                    },
                                    children: [i.filters[s][v]]
                                }, {
                                    tag: "div",
                                    attrs: {
                                        class: "selectmenu " + l(s === r.openedSelect(), "active")
                                    },
                                    children: [{
                                        tag: "div",
                                        attrs: {
                                            onclick: u.bind(null, s, "")
                                        },
                                        children: [i.filters[s].all]
                                    }, Object.keys(n["rarity" === s ? "Rarity" : "Profession"]).map(function(e) {
                                        return {
                                            tag: "div",
                                            attrs: {
                                                class: s + " " + e,
                                                onclick: u.bind(null, s, e)
                                            },
                                            children: [i.filters[s][e]]
                                        }
                                    })]
                                }]
                            } : "", "discipline" === s || 0 === s.indexOf("weaponstats") || 0 === s.indexOf("armorstats") ? {
                                tag: "div",
                                attrs: {
                                    className: "inputs"
                                },
                                children: [{
                                    tag: "div",
                                    attrs: {
                                        className: "hbox"
                                    },
                                    children: [{
                                        tag: "div",
                                        attrs: {},
                                        children: [{
                                            tag: "div",
                                            attrs: {
                                                className: "selectbox attribute",
                                                onclick: function() {
                                                    r.openedSelect(!r.openedSelect() && s)
                                                }
                                            },
                                            children: [i.filters[o ? v : s].label]
                                        }, {
                                            tag: "div",
                                            attrs: {
                                                class: "selectmenu " + l(s === r.openedSelect(), "active")
                                            },
                                            children: [{
                                                tag: "div",
                                                attrs: {
                                                    className: "attribute",
                                                    onclick: u.bind(null, s, "")
                                                },
                                                children: [i.filters[s].label]
                                            }, c.FilterOptions[s].map(function(e) {
                                                return {
                                                    tag: "div",
                                                    attrs: {
                                                        className: "attribute",
                                                        onclick: u.bind(null, s, {
                                                            selected: e,
                                                            value: 0
                                                        })
                                                    },
                                                    children: [i.filters[e].label]
                                                }
                                            })]
                                        }]
                                    }, m("input.jointSelector[type=number][min=0]", e.merge(d(s, o && v), {
                                        disabled: Boolean(!o),
                                        class: s,
                                        max: "discipline" === s ? 500 : 9999
                                    })), m(".updown", p(s, v), {
                                        tag: "button",
                                        attrs: {
                                            className: "up"
                                        },
                                        children: []
                                    }, {
                                        tag: "button",
                                        attrs: {
                                            className: "down"
                                        },
                                        children: []
                                    })]
                                }]
                            } : null, l("bagsize" === s, {
                                tag: "div",
                                attrs: {
                                    className: "inputs spacer"
                                },
                                children: [{
                                    tag: "div",
                                    attrs: {
                                        className: "hbox"
                                    },
                                    children: [{
                                        tag: "label",
                                        attrs: {
                                            for: s
                                        },
                                        children: [i.filters[s].label]
                                    }, m("input[type=number][min=0][max=20]", e.merge(d(s), {
                                        id: s
                                    })), m(".updown", p(s), {
                                        tag: "button",
                                        attrs: {
                                            className: "up"
                                        },
                                        children: []
                                    }, {
                                        tag: "button",
                                        attrs: {
                                            className: "down"
                                        },
                                        children: []
                                    })]
                                }]
                            })]
                        }
                    }), {
                        tag: "button",
                        attrs: {
                            className: "btn resetFilters",
                            disabled: !window.state.canReset(),
                            onclick: window.state.resetFilters
                        },
                        children: [i.filters.reset]
                    })]
                }]
            })
        }
    }
}, "@VERSION@", {
    requires: ["event-outside", "gw2-enums", "filter-types", "util-optional", "css-filters"]
});