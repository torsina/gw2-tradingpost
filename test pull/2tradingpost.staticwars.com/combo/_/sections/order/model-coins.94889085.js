YUI.add("model-coins", function(t) {
    "use strict";
    var e, n = t.namespace("GW2.Models");
    e = t.Base.create("coins", t.Model, [], {
        initializer: function() {
            this.on("amountChange", t.bind(this._onAmountChange, this)), this._eventHandles = [this.after({
                maxAmountChange: this._onMaxAmountChange
            })], this.publish("coins:amountTooHigh")
        },
        destructor: function() {
            new t.EventHandle(this._eventHandles).detach(), this._eventHandles = []
        },
        _onAmountChange: function(t) {
            var e = t.newVal;
            this.setAttrs({
                gold: this._gold(e),
                silver: this._silver(e),
                copper: this._copper(e)
            }, {
                silent: !0
            })
        },
        addGold: function(t) {
            this.set("amount", this.get("amount") + 100 * t * 100)
        },
        addSilver: function(t) {
            this.set("amount", this.get("amount") + 100 * t)
        },
        addCopper: function(t) {
            this.set("amount", this.get("amount") + t)
        },
        _gold: function(t) {
            return Math.floor(t / 1e4)
        },
        _silver: function(t) {
            return Math.floor(t % 1e4 / 100)
        },
        _copper: function(t) {
            return Math.floor(t % 100)
        },
        _onMaxAmountChange: function(t) {
            isFinite(t.newVal) && this.get("amount") > t.newVal && this.set("amount", t.newVal)
        },
        toString: function() {
            return "Coins{amount=" + this.get("amount") + ", gold=" + this.gold() + ", silver=" + this.silver() + ", copper=" + this.copper() + "}"
        }
    }, {
        ATTRS: {
            amountTooLow: {
                value: !1
            },
            amount: {
                value: 0,
                setter: function(t) {
                    var e = this.get("minAmount"),
                        n = this.get("maxAmount");
                    return (t = parseInt(t, 10) || 0) < 0 && (t = 0), isFinite(e) && t < e ? this.set("amountTooLow", !0) : this.set("amountTooLow", !1), isFinite(n) && t > n && (this.fire("amountTooHigh"), t = n), t
                }
            },
            minAmount: {
                value: void 0,
                setter: function(t) {
                    isFinite(t) && this.set("amount", t, {
                        silent: !0
                    })
                }
            },
            maxAmount: {
                value: void 0,
                setter: function(t) {
                    isFinite(t) && t < this.get("amount") && this.set("amount", t, {
                        silent: !0
                    })
                }
            },
            gold: {
                value: 0,
                getter: function() {
                    return this._gold(this.get("amount"))
                },
                setter: function(e, n, i) {
                    if (!i || !i.silent) {
                        var o = e - this.get("gold");
                        return this.addGold(o), t.Attribute.INVALID_VALUE
                    }
                }
            },
            silver: {
                value: 0,
                getter: function() {
                    return this._silver(this.get("amount"))
                },
                setter: function(e, n, i) {
                    if (!i || !i.silent) {
                        var o = e - this.get("silver");
                        return this.addSilver(o), t.Attribute.INVALID_VALUE
                    }
                }
            },
            copper: {
                value: 0,
                getter: function() {
                    return this._copper(this.get("amount"))
                },
                setter: function(e, n, i) {
                    if (!i || !i.silent) {
                        var o = e - this.get("copper");
                        return this.addCopper(o), t.Attribute.INVALID_VALUE
                    }
                }
            }
        }
    }), n.Coins = e
}, "@VERSION@", {
    requires: ["base-build", "model"]
});