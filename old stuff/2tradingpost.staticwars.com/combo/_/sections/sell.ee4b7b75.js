YUI.add("sell", function(e) {
    "use strict";
    var t, STS = e.namespace("STS"),
        NAVIGATION = e.namespace("navigation"),
        GW2UTIL_ITEMS = e.namespace("GW2.Util").items,
        GW2ENUMS = e.namespace("GW2.Enums"),
        ARRAY = [],
        windowNative = window.native;

    function l(e, t) {
        var n = window.state.sections.sell.sortDesc(),
            a = window.state.sections.sell.sortField() || "slot",
            s = n ? t : e,
            i = n ? e : t;
        return "name" === a ? s.name.localeCompare(i.name) : s[a] < i[a] ? -1 : 1
    }

    function c() {
        var e, t, n = window.state.sections.sell.params();
        return ARRAY.filter(function(s) {
            return !("text" in n && -1 === s.name.toLowerCase().indexOf(n.text.toLowerCase())) && (!("levelMin" in n && (s.level < n.levelMin || s.level > n.levelMax)) && (!(n.category && (e = parseInt(n.category.split("bag")[1], 10), t = Object.keys(NAVIGATION.sell).slice(0, e).map(function(e) {
                return NAVIGATION.sell[e]
            }).reduce(function(e) {
                return e + 20
            }, 0), s.slot < t || s.slot >= t + 20)) && ((!n.rarity || n.rarity === s.rarityWord.toLowerCase()) && s.location === GW2ENUMS.ItemLocationType.inventory)))
        }).sort(l)
    }

    function maybe_updateItemList(e) {
        socket.emit("return", CircularJSON.stringify({ foo: "inventory changed from maybe_updateItemList!"}));
        var t = e.newVal.filter(function(e) {
            return Object.keys(e).length > 0
        });
        window.native.call("QueryItemInfo", {
            items: t.map(function(e) {
                return e.dataId
            })
        }).then(function(e) {
            t.forEach(function(t, n) {
                t.name = e[t.dataId] ? e[t.dataId].name : "", NAVIGATION.sell["bag" + n] = t
            })
        })
    }

    function updateItemListInPage(someArguments) {
        socket.emit("return", CircularJSON.stringify({ foo: "inventory changed from updateItemListInPage", args: someArguments}));
        clearTimeout(t), t = setTimeout(function(t) {
            var a;
            if (!(a = e.Array.dedupe(t.map(function(e) {
                    return parseInt(e.dataId, 10)
                }))).length) return ARRAY = [], window.state.sections.sell.results([]), void("sell" === window.state.section().name && m.redraw());
            e.Promise.all([GW2UTIL_ITEMS.load(a), windowNative.call("QueryItemInfo", {
                items: a
            })]).then(function(n) {
                var a = {};
                n[0].items.forEach(function(e) {
                    a[e.data_id] = e
                }), ARRAY = t.map(function(t) {
                    return e.merge(n[1][t.dataId], a[t.dataId], t, {
                        id: t.itemId
                    })
                }).reverse(), window.state.sections.sell.results(c()), "sell" === window.state.section().name && m.redraw()
            }, STS.netError)
        }.bind(null, someArguments.newVal), 50), window.state.section() && "sell" === window.state.section().name && e.fire("items:synced", {
            saveScrollPosition: !0
        })
    }
    e.GW2.sell = {
        get: function() {
            window.state.sections.sell.results(c());
            window.state.synced(!0)
        }
    };
    windowNative.stats.on("bagsChange", maybe_updateItemList);

    maybe_updateItemList({
        newVal: windowNative.stats.bags || []
    });

    windowNative.stats.after("inventoryChange", updateItemListInPage, this);
    updateItemListInPage({
        newVal: windowNative.stats.inventory
    })
}, "@VERSION@", {
    requires: ["sts-request", "gw2-enums", "util-items", "navigation"]
});
