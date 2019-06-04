YUI.add("account-status", function(t) {
    "use strict";
    var e = window.native,
        s = t.namespace("GW2"),
        i = GW2.config.features,
        r = Boolean(t.Object.getValue(e.stats.features, ["2", "current"])),
        a = Boolean(t.Object.getValue(e.stats.features, ["51", "current"])),
        n = ["full", "free", "trial", "restricted"];

    function u() {
        var t = this;
        if (this.status = !1, this.full = !1, this.free = !1, this.trial = !1, this.restricted = !1, this.publish("status", {
                fireOnce: !0
            }), !r) return t._setFlags(a ? "free" : "trial");
        e.import("gw2/player", function(e) {
            if (e.isEconomyRestricted) return t._setFlags("restricted");
            t._setFlags("full")
        })
    }
    u.prototype = {
        expansions: {
            hot: Boolean(t.Object.getValue(e.stats.features, ["45", "current"])),
            hotUltimate: Boolean(t.Object.getValue(e.stats.features, ["47", "current"]))
        },
        check: function(t) {
            return Boolean(i[t]) && (this.full || Boolean(i[t + "-" + this.status]))
        },
        tooltip: function(t, e) {
            var s = window.tp_strings.common.disabled;
            return e = e || !1, t in i && !i[t] ? s.feature : this.restricted ? s[this.status + (e.link ? "-link" : "")] : s[this.status]
        },
        _setFlags: function(t, e) {
            void 0 === e && (e = !0), n.forEach(function(s) {
                this[s] = s === t && e
            }.bind(this)), this.status = t, this.fire("status")
        }
    }, t.augment(u, t.EventTarget), s.Account = new u
}, "@VERSION@", {
    requires: ["event", "sts-request"]
});