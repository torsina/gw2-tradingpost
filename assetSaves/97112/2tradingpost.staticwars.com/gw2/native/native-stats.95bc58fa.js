YUI.add("native-stats", function(t) {
    "use strict";
    var s, e = window.native,
        a = {
            bubbles: !1,
            preventable: !1
        };
    (s = function() {
        if (this._events = {
                change: this.publish("change", a),
                stats: this.publish("stats", {
                    bubbles: !1,
                    preventable: !1,
                    fireOnce: !0
                })
            }, e.on("stats", this._statsChanged.bind(this, !1)), e._stats) return this._statsChanged(!0, e._stats);
        e.call("GetStats").then(this._statsChanged.bind(this, !0))
    }).prototype = {
        change: function(t) {
            this._statsChanged(!1, t)
        },
        _statsChanged: function(t, s) {
            var e = this;
            Object.keys(s).forEach(function(t) {
                var n = s[t],
                    i = e[t];
                e[t] = n, e._events[t] || (e._events[t] = e.publish(t + "Change", a)), e.fire(t + "Change", {
                    stat: t,
                    prevVal: i,
                    newVal: n
                })
            }), this.fire(t ? "stats" : "change", s)
        }
    }, t.augment(s, t.EventTarget), e.stats = new s
}, "@VERSION@", {
    requires: ["event-custom-base"]
});