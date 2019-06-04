YUI.add("extension-last-viewed", function(e) {
    "use strict";
    var t, a, i, n = e.namespace("GW2.Extensions"),
        r = e.namespace("GW2.Util").keys,
        s = window.native;
    try {
        t = JSON.parse(localStorage.lastViewed)
    } catch (e) {
        t = []
    }
    i = e.Promise(function(a) {
        if (!t.length) return a(t);
        t.forEach(function(e) {
            r.register(e.data_id, e.keys), r.inject(e.data_id)
        }), s.call("QueryItemInfo", {
            items: t.map(function(e) {
                return parseInt(e.data_id, 10)
            })
        }).then(function(i) {
            t = t.map(function(t) {
                return e.merge(t, i[t.data_id])
            }), a(t)
        })
    }), (a = function() {}).getRecent = function() {
        return i
    }, a.prototype = {
        initializer: function() {
            this._handle = this.after("itemChange", this._lastViewedAfterItemChange)
        },
        destructor: function() {
            this._handle.detach(), this._handle = null
        },
        _lastViewedAfterItemChange: function(a) {
            var i = a.newVal,
                n = i.data_id || i.dataId,
                s = e.merge(i, {
                    data_id: n,
                    keys: r.keys[n]
                }),
                d = -1;
            t.forEach(function(e, t) {
                d = e.data_id === n ? t : d
            }), -1 === d ? (t.push(s), t.length > 3 && t.shift()) : (t.splice(d, 1), t.push(s)), localStorage.lastViewed = JSON.stringify(t)
        }
    }, n.LastViewed = a
}, "@VERSION@", {
    requires: ["array-extras", "promise", "util-text-keys"]
});