YUI.add("util-items", function(Y) {
    "use strict";
    var STS = Y.namespace("STS"),
        GW2UTIL_KEYS = Y.namespace("GW2.Util").keys,
        GW2UTIL_ITEMS = Y.namespace("GW2.Util.items"),
        GW2ACCOUNT = Y.namespace("GW2.Account"),
        windowNative = window.native;

    function s(t, e) {
        e in t && (t[e] = parseInt(t[e], 10))
    }
    GW2UTIL_ITEMS.load = function(t) {
        return Array.isArray(t) || (t = [t]), STS.request({
            protocol: "Game.gw2.ItemSearch",
            command: "TradeSearch",
            body: {
                buildId: windowNative.stats.buildId,
                language: windowNative.stats.language,
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
            return t.items = GW2UTIL_ITEMS.parse(t.items), t
        }, function(t) {
            STS.netError(t)
        })
    }, GW2UTIL_ITEMS.parse = function(t) {
        return Array.isArray(t) || (t = [t]), t.map(function(t) {
            return s(t, "buy_count"), s(t, "buy_price"), s(t, "data_id"), s(t, "level"), s(t, "rarity"), s(t, "sell_count"), s(t, "sell_price"), s(t, "type_id"), s(t, "vendor"), t.whitelisted = !("whitelisted" in t) || (!!GW2ACCOUNT.check("ignore-whitelist") || "1" === t.whitelisted), GW2UTIL_KEYS.register(t.data_id, t.passwords), GW2UTIL_KEYS.inject(t.data_id), t
        })
    }
}, "@VERSION@", {
    requires: ["sts-request", "util-text-keys", "account-status"]
});