YUI.add("util-items", function(t) {
    "use strict";
    var e = t.namespace("STS"),
        a = t.namespace("GW2.Util").keys,
        i = t.namespace("GW2.Util.items"),
        r = t.namespace("GW2.Account"),
        n = window.native;

    function s(t, e) {
        e in t && (t[e] = parseInt(t[e], 10))
    }
    i.load = function(t) {
        return Array.isArray(t) || (t = [t]), e.request({
            protocol: "Game.gw2.ItemSearch",
            command: "TradeSearch",
            body: {
                buildId: n.stats.buildId,
                language: n.stats.language,
                items: t.map(function(t) {
                    return "string" != typeof t && "number" != typeof t || (t = {
                        dataId: t
                    }), {
                        TypeId: t.typeId || t.type_id || 3,
                        DataId: t.dataId || t.data_id
                    }
                })
            }
        }).then(function(t) {
            return t.items = i.parse(t.items), t
        }, function(t) {
            e.netError(t)
        })
    }, i.parse = function(t) {
        return Array.isArray(t) || (t = [t]), t.map(function(t) {
            return s(t, "buy_count"), s(t, "buy_price"), s(t, "data_id"), s(t, "level"), s(t, "rarity"), s(t, "sell_count"), s(t, "sell_price"), s(t, "type_id"), s(t, "vendor"), t.whitelisted = !("whitelisted" in t) || (!!r.check("ignore-whitelist") || "1" === t.whitelisted), a.register(t.data_id, t.passwords), a.inject(t.data_id), t
        })
    }
}, "@VERSION@", {
    requires: ["sts-request", "util-text-keys", "account-status"]
});