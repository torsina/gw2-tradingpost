YUI.add("transactions", function(t) {
    "use strict";
    var e, n = t.namespace("STS"),
        a = t.namespace("GW2.Util").items,
        i = window.tp_strings.category.transaction,
        r = window.state.sections.transactions,
        s = window.native;

    function o(t) {
        return n.request({
            protocol: "Game.gw2.Trade",
            command: "current" === t.section ? "GetMyListings" : "GetHistory",
            body: {
                isBuy: "buy" === t.type,
                count: 200,
                offset: r.offset() + 1
            }
        }).then(function(e) {
            return e.listings = e.listings.map(function(e) {
                return e.id = (e.type_id || 3) + "-" + e.data_id + "-" + e.listing_id, e.section = t.section, e.isBuy = "buy" === t.type, e.cancelable = "current" === e.section, e.unit_price = parseInt(e.unit_price, 10), e.quantity = parseInt(e.quantity, 10), e
            }), e
        })
    }

    function c(t, e) {
        var n = r.sortDesc(),
            a = r.sortField(),
            s = n ? e : t,
            o = n ? t : e;
        return "name" === a ? s.name.localeCompare(o.name) : "isBuy" === a ? i[s.section + (s.isBuy ? "-buy" : "-sell")].localeCompare(i[o.section + (o.isBuy ? "-buy" : "-sell")]) : "date" === a ? s.date.getTime() > o.date.getTime() ? -1 : 1 : "cancelable" === a ? s[a] ? -1 : 1 : s[a] < o[a] ? -1 : 1
    }

    function u(n) {
        return t.Promise.all(n.map(o)).then(function(t) {
            var e = window.state.section(),
                n = 0,
                a = 0,
                i = t.reduce(function(t, e) {
                    return a += parseInt(e.total_matches, 10), n = Math.max(n, parseInt(e.total_matches, 10)), t.concat(e.listings)
                }, []);
            return "transactions" === e.name && (e.totalResults(a), e.offset(e.offset() + 200), e.loadMore(e.offset() < n)), i
        }).then(function(n) {
            var i = t.Array.dedupe(n.map(function(t) {
                    return parseInt(t.data_id, 10)
                })),
                r = {};
            return i.length ? a.load(i).then(function(t) {
                if (!e) return t.items.forEach(function(t) {
                    r[t.data_id] = t
                }), s.call("QueryItemInfo", {
                    items: i
                })
            }).then(function(a) {
                if (!e) return n.map(function(e) {
                    return t.merge(e, a[e.data_id], r[e.data_id], {
                        date: new Date(Date.parse(e.purchased || e.created))
                    })
                })
            }) : n
        })
    }
    t.GW2.transactions = {
        filter: function(t) {
            var e = window.state.section().params();
            return t.filter(function(t) {
                return !("text" in e && -1 === t.name.toLowerCase().indexOf(e.text.toLowerCase()) || "levelMin" in e && (t.level < e.levelMin || t.level > e.levelMax) || e.rarity && e.rarity !== t.rarityWord.toLowerCase())
            }).sort(c)
        },
        getTransactions: u,
        get: function(t) {
            function a() {
                return u((i = r.params().category, s = r.params().subcategory, i || (a = ["current/buy", "current/sell", "history/buy", "history/sell"]), i && !s && (a = [i + "/buy", i + "/sell"]), i && s && (a = [i + "/" + s]), a.map(function(t) {
                    var e = t.split("/");
                    return {
                        section: e[0],
                        type: e[1]
                    }
                }))).then(function(n) {
                    e || (t && t.more && (n = r.unfiltered().concat(n)), r.unfiltered(n), window.state.synced(!0))
                }).catch(function(t) {
                    window.state.synced(!0), n.netError(t)
                });
                var a, i, s
            }
            if (t && t.more) return window.state.synced(!1), a();
            window.clearTimeout(e), e = setTimeout(function() {
                window.state.synced(!1), e = null, a()
            }, !e && window.state.synced() ? 0 : 300)
        }
    }
}, "@VERSION@", {
    requires: ["app-state", "navigation", "sts-request", "util-items"]
});