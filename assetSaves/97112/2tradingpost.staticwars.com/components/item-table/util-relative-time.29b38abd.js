YUI.add("util-relative-time", function(e) {
    "use strict";
    var t = e.namespace("GW2.Util"),
        a = window.tp_strings.time.fuzzy,
        n = 6e4,
        i = 60 * n,
        u = 24 * i,
        r = 30 * u,
        m = 365 * u;
    t.relativeTime = function(t, s) {
        var o;
        return s = s || new Date, (o = Math.max(0, s.getTime() - t.getTime())) < n ? e.Lang.sub(a.second, {
            time: Math.round(o / 1e3)
        }) : o < i ? e.Lang.sub(a.minute, {
            time: Math.round(o / n)
        }) : o < u ? e.Lang.sub(a.hour, {
            time: Math.round(o / i)
        }) : o < r ? e.Lang.sub(a.day, {
            time: Math.round(o / u)
        }) : o < m ? e.Lang.sub(a.month, {
            time: Math.round(o / r)
        }) : e.Lang.sub(a.year, {
            time: Math.round(o / m)
        })
    }
}, "@VERSION@", {
    requires: ["base"]
});