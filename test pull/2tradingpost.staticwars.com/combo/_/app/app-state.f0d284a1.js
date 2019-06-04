YUI.add("app-state", function(e) {
    var t = e.namespace("GW2"),
        o = e.namespace("GW2.Enums"),
        r = t.FilterCategories,
        s = t.armorstats.filter(function(e) {
            return -1 !== t.weaponstats.indexOf(e)
        });
    window.localStorage.power || (window.localStorage.power = "off"), window.state = e.merge(window.state, {
        section: m.prop(),
        setSection: function(t, o) {
            window.state.sections.transactions.offset(0), window.state.section(e.merge(window.state.sections[t], {
                name: t
            })), o || "order" === t || window.state.refresh({
                from: "section"
            })
        },
        _synced: m.prop(!1),
        synced: function(t) {
            return "boolean" == typeof t && (window.state._synced(t), t && e.fire("items:synced"), window.setTimeout(m.redraw, 0)), window.state._synced()
        },
        powerMode: function(e) {
            return "boolean" == typeof e && (window.localStorage.power = e ? "on" : "off"), "on" === window.localStorage.power
        },
        refresh: function(t) {
            var o = t && t.from,
                r = window.state.section();
            if ("home" === r.name && "section" !== o) return window.state.setSection("browse");
            "transactions" !== r.name || "filter" !== o ? (r.results([]), e.GW2[r.name].get()) : r.results(e.GW2.transactions.filter(r.unfiltered()))
        },
        canReset: function() {
            var e = window.state.section().params();
            return !(!e.category || "skins" === e.category || 0 === e.levelMin && 80 === e.levelMax) || (!(!e.profession || e.profession === o.reverse("Profession", window.native.stats.profession)) || ("browse" === window.state.section().name && !e.available || Object.keys(e).some(function(e) {
                return -1 === ["category", "subcategory", "available", "profession", "levelMin", "levelMax"].indexOf(e)
            })))
        },
        refreshOnDialogClose: m.prop(!1),
        sections: {
            order: {},
            home: {
                trades: m.prop(),
                viewed: m.prop()
            },
            browse: {
                params: m.prop({
                    category: null,
                    levelMin: 0,
                    levelMax: 80,
                    available: !0
                }),
                results: m.prop([]),
                sortField: m.prop(),
                sortDesc: m.prop(!1)
            },
            sell: {
                params: m.prop({
                    category: null,
                    levelMin: 0,
                    levelMax: 80
                }),
                results: m.prop([]),
                sortField: m.prop(),
                sortDesc: m.prop(!1)
            },
            transactions: function() {
                const e = m.stream([]),
                    o = e.map(function(e) {
                        return t.transactions ? t.transactions.filter(e) : []
                    });
                return {
                    params: m.prop({
                        category: "current",
                        levelMin: 0,
                        levelMax: 80
                    }),
                    results: o,
                    unfiltered: e,
                    sortField: m.prop("date"),
                    sortDesc: m.prop(!1),
                    loadMore: m.prop(!1),
                    totalResults: m.prop(0),
                    total: m.prop(200),
                    offset: m.prop(0)
                }
            }()
        },
        sort: function(e) {
            var t = window.state.section(),
                o = e === t.sortField();
            t.sortField(e), t.sortDesc(!!o && !t.sortDesc()), window.state.refresh({
                from: "filter"
            })
        },
        setCategory: function(t, n) {
            var a = window.state.section();
            if ("transactions" === a.name && a.offset(0), !n) return "sell" === a.name || "transactions" === a.name ? a.params(e.merge(a.params(), {
                category: t || null,
                subcategory: null
            })) : a.params(e.merge(function(t) {
                var n = window.state.section(),
                    a = n.params(),
                    i = e.merge(n.params()),
                    l = r[a.category || null],
                    c = r[t || null].slice(0),
                    w = "armor" === t || "weapon" === t;
                return c.push("levelMin", "levelMax"), -1 === c.indexOf("level") && (i.levelMin = 0, i.levelMax = 80), e.Object.each(i, function(e, t) {
                    (!w || -1 === t.indexOf("armorstats") && -1 === t.indexOf("weaponstats") || -1 === s.indexOf(e.selected)) && -1 === c.indexOf(t) && delete i[t]
                }), w && (i.profession = -1 !== l.indexOf("profession") ? a.profession : o.reverse("Profession", native.stats.profession)), i
            }(t), {
                category: t || null
            })), void window.state.refresh();
            a.params(e.merge(a.params(), {
                category: t || null,
                subcategory: n
            })), window.state.refresh()
        },
        setFilter: function(t, o, r) {
            var s = {},
                n = window.state.section();
            s[t] = r ? {
                selected: r,
                value: o
            } : o, n.params(e.merge(n.params(), s)), window.state.refresh({
                from: "filter"
            })
        },
        removeFilter: function(o) {
            var r = window.state.section(),
                s = r.params();
            "category" !== o && "subcategory" !== o ? (s[o] ? delete s[o] : "level" === o ? (s.levelMin = 0, s.levelMax = 80) : e.Object.each(t.FilterOptions, function(e, t) {
                -1 !== e.indexOf(o) && s[t] && s[t].selected === o && delete s[t]
            }), r.params(s), window.state.refresh({
                from: "filter"
            })) : window.state.setCategory("category" === o ? null : s.category, null)
        },
        resetFilters: function(e) {
            var t = {},
                s = window.state.section(),
                n = s.params();
            (n.category || null === n.category) && (t.category = n.category, "browse" !== s.name && "home" !== s.name || (t.available = !0)), n.subcategory && (t.subcategory = n.subcategory), -1 !== r["browse" === s.name || "home" === s.name ? n.category : s.name].indexOf("level") && (t.levelMin = 0, t.levelMax = 80), "armor" !== n.category && "weapon" !== n.category || (t.profession = o.reverse("Profession", window.native.stats.profession)), s.sortField("transactions" === s.name ? "date" : null), s.params(t), e.skipSearch || window.state.refresh({
                from: "filter"
            })
        }
    }), window.state.sections.home = e.merge(window.state.sections.home, window.state.sections.browse)
}, "@VERSION@", {
    requires: ["gw2-enums", "filter-types"]
});