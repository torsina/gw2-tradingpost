YUI.add("sell", function(e) {
    "use strict";
    var t, n = e.namespace("STS"),
        a = e.namespace("navigation"),
        s = e.namespace("GW2.Util").items,
        i = e.namespace("GW2.Enums"),
        o = [],
        r = window.native;

    function l(e, t) {
        var n = window.state.sections.sell.sortDesc(),
            a = window.state.sections.sell.sortField() || "slot",
            s = n ? t : e,
            i = n ? e : t;
        return "name" === a ? s.name.localeCompare(i.name) : s[a] < i[a] ? -1 : 1
    }

    function c() {
        var e, t, n = window.state.sections.sell.params();
        return o.filter(function(s) {
            return !("text" in n && -1 === s.name.toLowerCase().indexOf(n.text.toLowerCase())) && (!("levelMin" in n && (s.level < n.levelMin || s.level > n.levelMax)) && (!(n.category && (e = parseInt(n.category.split("bag")[1], 10), t = Object.keys(a.sell).slice(0, e).map(function(e) {
                return a.sell[e]
            }).reduce(function(e) {
                return e + 20
            }, 0), s.slot < t || s.slot >= t + 20)) && ((!n.rarity || n.rarity === s.rarityWord.toLowerCase()) && s.location === i.ItemLocationType.inventory)))
        }).sort(l)
    }

    function d(e) {
        var t = e.newVal.filter(function(e) {
            return Object.keys(e).length > 0
        });
        window.native.call("QueryItemInfo", {
            items: t.map(function(e) {
                return e.dataId
            })
        }).then(function(e) {
            t.forEach(function(t, n) {
                t.name = e[t.dataId] ? e[t.dataId].name : "", a.sell["bag" + n] = t
            })
        })
    }

    function u(a) {
        clearTimeout(t), t = setTimeout(function(t) {
            var a;
            if (!(a = e.Array.dedupe(t.map(function(e) {
                    return parseInt(e.dataId, 10)
                }))).length) return o = [], window.state.sections.sell.results([]), void("sell" === window.state.section().name && m.redraw());
            e.Promise.all([s.load(a), r.call("QueryItemInfo", {
                items: a
            })]).then(function(n) {
                var a = {};
                n[0].items.forEach(function(e) {
                    a[e.data_id] = e
                }), o = t.map(function(t) {
                    return e.merge(n[1][t.dataId], a[t.dataId], t, {
                        id: t.itemId
                    })
                }).reverse(), window.state.sections.sell.results(c()), "sell" === window.state.section().name && m.redraw()
            }, n.netError)
        }.bind(null, a.newVal), 50), window.state.section() && "sell" === window.state.section().name && e.fire("items:synced", {
            saveScrollPosition: !0
        })
    }
    e.GW2.sell = {
        get: function() {
            window.state.sections.sell.results(c()), window.state.synced(!0)
        }
    }, r.stats.on("bagsChange", d), d({
        newVal: r.stats.bags || []
    }), r.stats.after("inventoryChange", u, this), u({
        newVal: r.stats.inventory
    })
}, "@VERSION@", {
    requires: ["sts-request", "gw2-enums", "util-items", "navigation"]
});