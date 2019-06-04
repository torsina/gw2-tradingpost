YUI.add("model-listings", function(t) {
    "use strict";
    var n = t.namespace("GW2.Models"),
        i = t.namespace("STS");
    n.Listings = t.Base.create("orderstate", t.Model, [], {
        sync: function(t, n, e) {
            return this.setAttrs(n), this.set("loading", !0), i.request({
                protocol: "Game.gw2.Trade",
                command: "GetListings",
                headers: {
                    t: "$" + this.get("dataId")
                },
                body: {
                    buys: "",
                    sells: "",
                    count: 40
                }
            }).then(function(n) {
                n.action = t, e(null, n)
            }, function(t) {
                1050 === t.code && this.setAttrs({
                    buys: [],
                    sells: []
                }), i.netError(t)
            })
        },
        parse: function(t) {
            return this.set("loading", !1), t.buys.map(this._normalizeListing), t.sells.map(this._normalizeListing), t
        },
        count: function(t) {
            return this.get(t).reduce(function(t, n) {
                return t + n.maxQuantity
            }, 0)
        },
        _resetListing: function(t) {
            return t.quantity = 0, t
        },
        _noCustoms: function(t) {
            return !t.isCustom
        },
        resetSelection: function() {
            var t = this.get("sells"),
                n = this.get("buys");
            this.setAttrs({
                sells: t ? t.map(this._resetListing).filter(this._noCustoms) : [],
                buys: n ? n.map(this._resetListing).filter(this._noCustoms) : []
            })
        },
        _normalizeListing: function(t) {
            return t.numListings = parseInt(t.listings, 10) || 0, t.maxQuantity = parseInt(t.quantity, 10) || 0, t.unitPrice = parseInt(t.unit_price, 10) || 1, delete t.listings, delete t.unit_price, t.quantity = 0, t.attn = "", t.isCustom = !1, t.isAffordable = !1, t
        },
        matchMake: function(t, n, i) {
            var e = this.get(t);
            e.some(function(t) {
                if (t.unitPrice === n) return t.quantity = i, !0
            }) || (e.push({
                isCustom: !0,
                quantity: i,
                unitPrice: n,
                numListings: 0,
                maxQuantity: 0
            }), e.sort(function(n, i) {
                return "sells" === t ? n.unitPrice - i.unitPrice : i.unitPrice - n.unitPrice
            }))
        },
        getListings: function() {
            return this.get("sells").concat(this.get("buys")).filter(function(t) {
                return t.quantity > 0
            })
        },
        getQuantity: function(t, n) {
            return this.get(t).filter(function(i) {
                return "sells" === t ? i.unitPrice < n : i.unitPrice > n
            }).reduce(function(t, n) {
                return t + n.maxQuantity
            }, 0)
        },
        hasQuantity: function(t) {
            return this.get(t).some(function(t) {
                return t.quantity > 0
            })
        }
    }, {
        ATTRS: {
            price: {
                getter: function() {
                    var t = this;
                    return ["buys", "sells"].reduce(function(n, i) {
                        return n + t.get(i).reduce(function(t, n) {
                            return t + n.quantity * n.unitPrice
                        }, 0)
                    }, 0)
                }
            },
            loading: {
                value: !0
            }
        }
    })
}, "@VERSION@", {
    requires: ["base-build", "model", "sts-request"]
});