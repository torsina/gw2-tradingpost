YUI.add("browse", function(e) {
    "use strict";
    var t, a, n = e.namespace("GW2"),
        r = e.namespace("GW2.Enums"),
        i = e.namespace("navigation").browse,
        o = e.namespace("STS"),
        s = e.namespace("GW2.Util").items,
        c = !1,
        u = window.state.sections.browse;

    function l() {
        var t = e.merge(function() {
            var e, t, a = u.params(),
                n = {};
            return a.category && (n.Categories = {}, e = i[a.category][a.subcategory || "noSubCat"], t = e.category || e, Object.keys(t).forEach(function(e) {
                n.Categories[r.Categories[e]] = t[e].map(function(t) {
                    return r.Subcategory[e + "-" + t]
                })
            }), e.category && Object.keys(e).forEach(function(t) {
                "category" !== t && (n[t] = e[t])
            })), n
        }(), function() {
            var e = u.params(),
                t = {};
            return ["armorstats1", "armorstats2", "armorstats3", "weaponstats1", "weaponstats2", "weaponstats3", "discipline", "bagsize"].forEach(function(a) {
                var r = "bagsize" !== a ? e[a] : {
                    selected: "bagsize",
                    value: e.bagsize
                };
                r && void 0 !== r.value && r.selected && (t.Attributes || (t.Attributes = {}), t.Attributes[n.FilterAttributes[r.selected]] = {
                    min: Math.max(r.value, "discipline" === a ? 0 : 1)
                })
            }), t
        }(), function() {
            var e = u.params(),
                t = {};
            return e.profession && ("armor" === e.category ? t.ArmorWeightClasses = [n.professionMappings.armor[e.profession], "None"] : "weapon" !== e.category || e.subcategory || (t.Categories = {
                18: n.professionMappings.weapon[e.profession].map(function(e) {
                    return r.Subcategory["weapon-" + e]
                })
            })), void 0 !== e.levelMin && (t.LevelMin = e.levelMin), void 0 !== e.levelMax && (t.LevelMax = e.levelMax), e.rarity && (t.Rarity = r.Rarity[e.rarity]), e.available && (t.AvailableOnly = 1), e.text && (t.Text = e.text), t
        }(), {
            Language: window.native.stats.language,
            BuildId: window.native.stats.buildId,
            Sort: u.sortField()
        });
        return u.sortDesc() && (t.Descending = u.sortDesc()), window.state.powerMode() || (t.Count = 500), t
    }

    function m() {
        var n;
        a = null, c = !0, window.state.synced(!1), o.request({
            protocol: "Game.gw2.ItemSearch",
            command: "TradeSearch",
            headers: {},
            body: l()
        }).then(function(r) {
            var i;
            if (c = !1, !a) return (i = (n = s.parse(r.items)).filter(function(e) {
                return !t[e.data_id]
            }).map(function(e) {
                return e.data_id
            })).length ? window.native.call("QueryItemInfo", {
                items: i
            }).then(function(a) {
                return e.Object.each(a, function(e) {
                    t[e.dataId] = e.name
                }), setTimeout(function() {
                    localStorage.itemNameCache = JSON.stringify(t)
                }, 10), t
            }, o.netError) : t
        }).then(function(e) {
            a || c || (u.results(n.map(function(t) {
                return t.name = e[t.data_id], t
            })), window.state.synced(!0))
        }, o.netError).catch(function() {
            c = !1, window.state.synced(!0)
        })
    }(t = localStorage.itemNameCache ? JSON.parse(localStorage.itemNameCache) : {})["@LANGUAGE@"] !== window.native.stats.language && (t = {
        "@LANGUAGE@": window.native.stats.language
    }, localStorage.itemNameCache = JSON.stringify(t)), e.namespace("GW2").browse = {
        get: function() {
            c || a ? (window.clearTimeout(a), a = window.setTimeout(m, 300)) : m()
        }
    }
}, "@VERSION@", {
    requires: ["app-state", "gw2-enums", "filter-types", "navigation", "util-items"]
});