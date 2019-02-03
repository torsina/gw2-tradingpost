! function(n, t) {
    "use strict";
    var a, i;

    function e() {
        if (a && i) {
            for (var e in n.lang !== a.language && (n.lang = a.language), t._stats = a, i) t._stats["id" === e ? "buildId" : e] = i[e];
            n.setAttribute("ready", ""), t.trigger("ready")
        }
    }
    window.top !== window && (t = window.native = window.top.native), t.call("GetStats").then(function(n) {
        a = n, e()
    }), t.call("GetBuildInfo").then(function(n) {
        i = n, e()
    }), t.on("stats", function(t) {
        t.language && n.lang !== t.language && window.native.call("ChangeTab", "TradingPost")
    })
}(document.documentElement, window.native);