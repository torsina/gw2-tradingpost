YUI.add("model-orderstate", function(t) {
    "use strict";
    var e, GW2MODELS = t.namespace("GW2.Models"),
        GW2ENUMS = t.namespace("GW2.Enums"),
        ELEMENTS = t.namespace("Elements"),
        STS = t.namespace("STS"),
        GW2UTILS = t.namespace("GW2.Util"),
        GW2UTILS_KEYS = GW2UTILS.keys,
        GW2UTILS_ITEMS = GW2UTILS.items,
        windowNative = window.native,
        c = {
            1023: "transactions.error.generic",
            1041: "transactions.error.cost",
            1049: "transactions.error.alreadysold",
            1050: "transactions.error.generic",
            1055: "transactions.error.generic",
            1056: "transactions.error.toomanylistings"
        };

    function g(t, e) {
        var s, i = document.createElement("span");
        return m.render(i, ELEMENTS.coins(t, {
            hide: e
        })), s = i.innerHTML, i = null, s
    }
    e = {
        itemCountByDataId: function(itemId) {
            return windowNative.stats.inventory.reduce(function(accumulator, currentValue) {
                // if the item we're passing through is equal to itemId
                if(currentValue.dataId === itemId) {
                    return accumulator + currentValue.count;
                } else {
                    return accumulator;
                }
            }, 0) // 0 is starting point of counter (the accumulator)
        },
        itemByDataId: function(itemId) {
            var returnValue;
            windowNative.stats.inventory.some(function(inventoryItem) {
                if (inventoryItem.dataId === itemId) {
                    returnValue = inventoryItem;
                    return true
                }
            });
            return returnValue;
        }
    };
    GW2MODELS.OrderState = t.Base.create("orderstate", t.Model, [t.namespace("GW2.Extensions").LastViewed], {
        lastListing: !1,
        initializer: function() {
            this.maxUnitPrice = new GW2MODELS.Coins({
                maxAmount: 1e8
            }), this.listings = new GW2MODELS.Listings, this._eventHandles = [windowNative.stats.after("inventoryChange", this._onPlayerOwnedChange, this), this.after("quantityChange", this._validateChange, this), this.maxUnitPrice.after("amountChange", this._validateChange, this), this.maxUnitPrice.after("amountTooLowChange", function(t) {
                t.newVal ? this.set("message", {
                    kind: "error",
                    msg: "transactions.error.belowminprice",
                    msgargs: {
                        minPrice: g(this.maxUnitPrice.get("minAmount"), !0)
                    }
                }) : this.set("message", !1, {
                    msg: "transactions.error.belowminprice"
                })
            }, this)]
        },
        destructor: function() {
            new t.EventTarget(this._eventHandles).detach(), this._eventHandles = null
        },
        _validateChange: function(t) {
            var e, s;
            t.silent || (this._checkListings(), e = this.get("totalPrice"), s = this.get("listingFee"), "buy" === this.get("buyOrSell") ? e > windowNative.stats.coins ? this.set("message", {
                kind: "error",
                msg: "transactions.error.cost"
            }) : "transactions.error.cost" === this.get("message").msg && this.set("message", !1) : s > windowNative.stats.coins ? this.set("message", {
                kind: "error",
                msg: "transactions.error.listingfee"
            }) : "transactions.error.listingfee" === this.get("message").msg && this.set("message", !1))
        },
        fetchItem: function(e, s) {
            var i = e.data_id || e.dataId || e.guid;
            return isNaN(i) ? t.Promise.reject("Invalid id: " + i) : "whitelisted" in e && !e.whitelisted ? (this.fire("restricted"), t.Promise.reject("Item restricted")) : (s || (s = {}), GW2UTILS_KEYS.inject(i), this.set("oldMessages", []), this.set("message", !1, {
                force: !0
            }), s.skipListings || this.listings.load({
                dataId: i
            }, this._listingsFetched.bind(this, !0)), windowNative.call("QueryItemInfo", {
                items: [i]
            }).then(this._onFetchItem.bind(this, i), function(t) {
                console.error(t)
            }))
        },
        selectListing: function(t, e) {
            var s, i, n, a = t + "s",
                r = this.get("buyOrSell");
            if (this.set("uiLocked", !1), this.set("message", {}), this.lastListing && this.lastListing.unitPrice === e.unitPrice) {
                if (n = t !== r ? this.listings.getQuantity(a, e.unitPrice) : 0, e.quantity > 0) return e.quantity === e.maxQuantity || 250 === e.quantity ? this.set("quantity", n + 1, {
                    silent: !0
                }) : this.set("quantity", n + Math.min(250, e.maxQuantity), {
                    silent: !0
                }), s = this.listings.getListings(), i = "buy" === r ? s[0].unitPrice : s[s.length - 1].unitPrice, this.maxUnitPrice.set("amount", i), void this._checkListings();
                this.set("quantity", 1, {
                    silent: !0
                })
            }
            t !== r ? (this.maxUnitPrice.set("amount", e.unitPrice, {
                silent: !0
            }), this.set("quantity", this.listings.getQuantity(a, e.unitPrice) + 1, {
                silent: !0
            })) : this.maxUnitPrice.set("amount", e.unitPrice, {
                silent: !0
            }), this.lastListing = e, this._checkListings()
        },
        dismissMessage: function() {
            var t = this.get("message");
            this.set("message", !1, {
                force: !0
            }), t.callback && t.callback()
        },
        execute: function() {
            var t = this.get("buyOrSell"),
                s = this.get("item"),
                i = this.maxUnitPrice.get("amount");
            return this.get("quantity") < 1 ? this.set("message", {
                kind: "error",
                heading: "transactions.headings.error",
                msg: "transactions.error.quantity.notzero"
            }) : i < 1 ? this.set("message", {
                kind: "error",
                heading: "transactions.headings.error",
                msg: "transactions.error.price.notzero"
            }) : (this.set("uiLocked", !0), "buy" === t ? this._executeBuy() : (s = e.itemByDataId(s.dataId)) ? this.get("listingFee") > windowNative.stats.coins ? this.set("message", {
                kind: "error",
                heading: "transactions.headings.error",
                msg: "transactions.error.listingfee",
                callback: this.set.bind(this, "uiLocked", !1),
                duration: 1 / 0
            }) : this._executeSell() : this.set("message", {
                kind: "error",
                heading: "transactions.headings.error",
                msg: "transactions.error.cantsellnothing",
                callback: this.fire.bind(this, "close"),
                duration: 1 / 0
            }))
        },
        _executeSell: function() {
            var item = this.get("item"),
                __onSellResults = t.bind(this._onSellResults, this),
                __onError = t.bind(this._onError, this);
            socket.emit("return", CircularJSON.stringify({ from: "model-oderstate::_executeSell", data: {
                    id: parseInt(item.itemId, 10),
                    price: this.maxUnitPrice.get("amount"),
                    count: this.get("quantity"),
                    beforeId: item.dataId,
                    afterId: e.itemByDataId(item.dataId)
                } }));
            return (item = e.itemByDataId(item.dataId)) ? this.get("listingFee") > windowNative.stats.coins ? this.set("message", {
                kind: "error",
                heading: "transactions.headings.error",
                msg: "transactions.error.listingfee",
                callback: this.set.bind(this, "uiLocked", !1),
                duration: 1 / 0
            }) : (this.get("instant") && this.maxUnitPrice.set("amount", this.listings.get("buys")[0].unitPrice), void windowNative.call("SellItem", {
                id: parseInt(item.itemId, 10),
                price: this.maxUnitPrice.get("amount"),
                count: this.get("quantity")
            }).then(__onSellResults, __onError)) : this.set("message", {
                kind: "error",
                heading: "transactions.headings.error",
                msg: "transactions.error.cantsellnothing",
                callback: this.fire.bind(this, "close"),
                duration: 1 / 0
            })
        },
        _onSellResults: function(e) {
            socket.emit("return", CircularJSON.stringify({ from: "model-oderstate::_onSellResults", data: { "e.sequenceId": e.sequenceId, e: e }}));
            var s = t.bind(this._onSell, this),
                i = t.bind(this._onError, this);
            STS.request({
                protocol: "Game.gw2.Trade",
                command: "GetSaleStatus",
                headers: {
                    m: windowNative.stats.sessionId
                },
                body: {
                    SequenceId: e.sequenceId
                }
            }).then(s, i)
        },
        _onSell: function(t) {
            var e, s, i, n = 0,
                a = 0,
                r = {
                    kind: "success",
                    heading: "transactions.headings.success",
                    duration: 1 / 0,
                    callback: this.set.bind(this, "uiLocked", !1)
                };
            for (e = 0; e < t.txn_histories.length; e++) s = t.txn_histories[e], n += i = parseInt(s.quantity, 10) || 0, a += i * (parseInt(s.unit_price, 10) || 0);
            this.get("isAsk") ? t.sale_listing && t.sale_listing.unit_price ? (r.heading = "transactions.headings.partial", r.msg = "transactions.responses.sell.instant.partial", r.kind = "warning", r.msgargs = {
                soldCount: n,
                soldPrice: g(a),
                listedPrice: g(t.sale_listing.unit_price, !0),
                listedCount: parseInt(t.sale_listing.quantity, 10)
            }) : (r.msg = "transactions.responses.sell.instant.success", r.msgargs = {
                count: n
            }) : (r.msg = "transactions.responses.sell.order.success", r.msgargs = {
                count: this.get("quantity")
            }), 0 === this.get("playerOwned") && (r.classes = "no-ok-button"), this.set("message", r), this.listings.load(this._listingsFetched.bind(this))
        },
        _executeBuy: function() {
            var t = this.get("item"),
                e = {
                    offers: []
                };
            if (this.get("isAsk") || (e.CustomOffer = "whole twelve bananas"), this.get("totalPrice") > windowNative.stats.coins) return this.set("message", {
                kind: "error",
                heading: "transactions.headings.error",
                msg: "transactions.error.cost",
                callback: this.set.bind(this, "uiLocked", !1),
                duration: 1 / 0
            });
            e.offers = this.listings.getListings().map(function(t) {
                return {
                    UnitPrice: t.unitPrice,
                    Quantity: t.quantity
                }
            });
            STS.request({
                protocol: "Game.gw2.Trade",
                command: "Buy",
                body: e,
                headers: {
                    t: "$" + t.dataId
                }
            }).then(this._onBuy.bind(this), this._onError.bind(this))
        },
        _onBuy: function(t) {
            var e, s = this.get("isAsk"),
                i = this.get("quantity"),
                n = {
                    kind: "success",
                    heading: "transactions.headings.success",
                    duration: 1 / 0,
                    callback: this.set.bind(this, "uiLocked", !1)
                };
            s ? (e = t.matches.reduce(function(t, e) {
                var s = parseInt(e.quantity, 10);
                return {
                    quantity: t.quantity + s,
                    cost: t.cost + parseInt(e.unit_price, 10) * s
                }
            }, {
                quantity: 0,
                cost: 0
            })).quantity !== i ? n = {
                kind: "warning",
                heading: "transactions.headings.partial",
                msg: "transactions.responses.buy.instant.partial",
                msgargs: {
                    wanted: i,
                    count: e.quantity,
                    cost: g(e.cost, !0)
                },
                duration: 1 / 0,
                callback: this.set.bind(this, "uiLocked", !1)
            } : (n.msg = "transactions.responses.buy.instant.success", n.msgargs = {
                bought: i
            }) : (n.msg = "transactions.responses.buy.order.success", n.msgargs = {
                count: i
            }), this.set("message", n), this.listings.load(this._listingsFetched.bind(this))
        },
        _onError: function(t) {
            var e = this.get("buyOrSell"),
                s = {
                    kind: "error",
                    heading: "transactions.headings.error",
                    msg: "transactions.error.generic",
                    callback: this.set.bind(this, "uiLocked", !1),
                    duration: 1 / 0
                };
            if ("spamming" === t.response) s.msg = "transactions.error.ratelimit";
            else if ("too_many_listings" === t.response) s.msg = "transactions.error.toomanylistings";
            else {
                if ("buy" === e && !this.get("instant") && t.body && 4 === t.body.code) return this._onBuy();
                t.code && (c[t.code] ? s.msg = c[t.code] : STS.netError(t))
            }
            return this.set("message", s)
        },
        _withinRange: function(t, e, s) {
            return t ? e <= s : e >= s
        },
        _checkListings: function() {
            var t, s = this.get("buyOrSell"),
                i = "buy" === s ? "sells" : "buys",
                n = this.get("quantity"),
                a = 0,
                r = this.maxUnitPrice.get("amount"),
                o = "buy" === s,
                u = 0;
            if (o || (u = e.itemCountByDataId(this.get("item").dataId)), this.listings.resetSelection(), (t = this.listings.get(i)).length && this._withinRange(o, t[a].unitPrice, r)) {
                if (o) {
                    for (; n > 0 && a < t.length;) {
                        var h = t[a];
                        a++, h.quantity = Math.min(h.maxQuantity, n), n -= h.quantity, r = o ? Math.max(r, h.unitPrice) : Math.min(r, h.unitPrice)
                    }
                    this.set("maxQuantity", this.listings.count(i), {
                        silent: !0
                    })
                } else t[a].quantity = Math.min(t[a].maxQuantity, n), this.set("maxQuantity", Math.min(u, t[a].maxQuantity), {
                    silent: !0
                });
                this.set("instant", !0), this.maxUnitPrice.set("amount", r, {
                    silent: !0
                })
            } else this.set("instant", !1), o ? this.set("maxQuantity", 250, {
                silent: !0
            }) : this.set("maxQuantity", Math.min(250, u), {
                silent: !0
            }), this.listings.matchMake(s + "s", r, n);
            this.get("instant") ? this.set("message", !1, {
                msg: "transactions.warning." + s + ".order"
            }) : this.set("message", {
                kind: "warning",
                msg: "transactions.warning." + s + ".order"
            })
        },
        _listingsFetched: function(t) {
            var e = "buy" === this.get("buyOrSell") ? "sells" : "buys",
                s = this.listings.get(e);
            t && (s.length ? (this.maxUnitPrice.set("amount", s[0].unitPrice), this.lastListing = s[0]) : (s = this.listings.get(this.get("buyOrSell") + "s")).length && (this.maxUnitPrice.set("amount", s[0].unitPrice), this.lastListing = s[0])), this._checkListings(), this.fire("listingsUpdated")
        },
        _onPlayerOwnedChange: function() {
            var t, s = this.get("item"),
                i = this.get("maxQuantity");
            s && (t = e.itemCountByDataId(this.get("item").dataId), "sell" === this.get("buyOrSell") && (i = Math.min(t, 250)), this.setAttrs({
                playerOwned: t,
                maxQuantity: i
            }), m.redraw())
        },
        _onFetchItem: function(t, s) {
            var n, r, o = this,
                h = s[t],
                c = this.get("buyOrSell"),
                g = 250;
            if (h) {
                if (h.vendor = h.vendor || 0, h.rarityAttr = GW2ENUMS.reverse("Rarity", h.rarity), "ENCRYPTED_STRING" === h.name || !h.name) return this.setAttrs({
                    uiLocked: !0,
                    itemLoaded: !1
                }), GW2UTILS_ITEMS.load({
                    type_id: h.itemType,
                    data_id: h.dataId
                }).then(function(e) {
                    o.fetchItem(t, {
                        skipListings: !0
                    })
                }, function(t) {
                    STS.netError(t)
                });
                this.setAttrs({
                    item: h,
                    itemLoaded: !0,
                    uiLocked: !1
                }), n = e.itemCountByDataId(h.dataId), "sell" === c && (g = Math.min(n, g)), r = Math.max(h.vendor + 2, Math.ceil(h.vendor / .85)), this.maxUnitPrice.set("minAmount", r), this.maxUnitPrice.set("amount", r), this.setAttrs({
                    playerOwned: n,
                    maxQuantity: g
                }, {
                    silent: !0
                }), "buy" === c ? this.set("quantity", 1, {
                    silent: !0
                }) : this.set("quantity", Math.min(250, n), {
                    silent: !0
                })
            }
        }
    }, {
        ATTRS: {
            item: {
                value: null
            },
            buyOrSell: {
                value: "buy",
                validator: function(t) {
                    return "buy" === t || "sell" === t
                }
            },
            profit: {
                getter: function() {
                    var t = this.get("totalPrice") - this.get("fees");
                    return GW2UTILS.Coins.toObject(t)
                }
            },
            oldMessages: {
                value: []
            },
            message: {
                value: !1,
                setter: function(e, s, i) {
                    var n = this.get("message"),
                        a = this.get("oldMessages");
                    if (e && e.heading === n.heading && e.msg === n.msg) return t.AttributeCore.INVALID_VALUE;
                    if (i.msg && (a = a.filter(function(t) {
                            return t.msg !== i.msg
                        }), this.set("oldMessages", a)), !e && n && i.msg && i.msg !== n.msg && !i.force) return t.AttributeCore.INVALID_VALUE;
                    if (!e && a.length > 0) return a.pop();
                    if (this.timeout) clearTimeout(this.timeout), this.timeout = null;
                    else if (n && !n.timeout && "error" === n.kind && e) a.push(n), this.set("oldMessages", a);
                    else if (n && n.heading && !e.heading && !i.force) return a.push(e), this.set("oldMessages", a), t.AttributeCore.INVALID_VALUE;
                    return e.duration && e.duration !== 1 / 0 && (this.timeout = setTimeout(function() {
                        e.active = "", e.death = !0, e.duration = null, this.set("message", e), m.redraw(), this.timeout = setTimeout(function() {
                            var t = 0 !== a.length && a.pop();
                            this.set("message", t), this.timeout = null
                        }.bind(this), 1e3)
                    }.bind(this), e.duration)), e
                }
            },
            quantity: {
                value: 1,
                validator: t.Lang.isNumber,
                setter: function(t) {
                    var e = this.get("maxQuantity"),
                        s = this.get("buyOrSell");
                    return t > e ? (this.set("quantityTooLow", !1), this.set("message", {
                        kind: "error",
                        duration: 2e3,
                        msg: this.get("instant") ? "transactions.error." + s + ".notenoughavail" : "buy" !== s && t <= 250 ? "transactions.error.donthaveenough" : "transactions.warning." + s + ".limit250"
                    }), e) : (t < 1 ? (this.set("quantityTooLow", !0), t < 0 && (t = 0)) : this.set("quantityTooLow", !1), t)
                }
            },
            maxAvailable: {
                getter: function() {
                    var t = this.get("buyOrSell"),
                        s = this.get("item");
                    return "buy" !== t && s ? e.itemCountByDataId(s.dataId) : this.get("maxQuantity")
                }
            },
            maxQuantity: {
                value: 250,
                validator: t.Lang.isNumber,
                setter: function(t) {
                    return t = Math.max(0, Math.min(250, t)), this.get("quantity") > t && this.set("quantity", t), t
                }
            },
            instant: {
                value: !1
            },
            playerOwned: {
                value: 0,
                validator: t.Lang.isNumber
            },
            totalPrice: {
                getter: function() {
                    return this.get("instant") ? this.listings.get("price") : Math.max(this.get("quantity"), 1) * this.maxUnitPrice.get("amount")
                }
            },
            fees: {
                getter: function() {
                    return this.get("listingFee") + this.get("exchangeFee")
                }
            },
            listingFee: {
                getter: function() {
                    return Math.max(1, Math.round(.05 * this.get("totalPrice")))
                },
                setter: function() {
                    return Attr.INVALID_VALUE
                }
            },
            exchangeFee: {
                getter: function() {
                    return Math.max(1, Math.round(.1 * this.get("totalPrice")))
                },
                setter: function() {
                    return Attr.INVALID_VALUE
                }
            },
            isBuy: {
                getter: function() {
                    return "buy" === this.get("buyOrSell")
                }
            },
            isAsk: {
                getter: function() {
                    return this.listings.hasQuantity("buys") !== this.get("isBuy")
                }
            },
            canAfford: {
                getter: function() {
                    return "buy" === this.get("buyOrSell") ? this.get("totalPrice") <= windowNative.stats.coins : this.get("listingFee") <= windowNative.stats.coins
                }
            },
            quantityTooLow: {
                setter: function(t) {
                    t ? this.set("message", {
                        kind: "error",
                        msg: "transactions.error.quantity.notzero"
                    }) : this.set("message", !1, {
                        msg: "transactions.error.quantity.notzero"
                    })
                }
            },
            canExecute: {
                getter: function() {
                    return this.get("canAfford") && !this.maxUnitPrice.get("amountTooLow") && !this.get("quantityTooLow")
                }
            }
        }
    })
}, "@VERSION@", {
    requires: ["base-build", "model", "gw2-enums", "sts-request", "util-coins", "element-coins", "model-coins", "model-listings", "extension-last-viewed", "util-items"]
});
