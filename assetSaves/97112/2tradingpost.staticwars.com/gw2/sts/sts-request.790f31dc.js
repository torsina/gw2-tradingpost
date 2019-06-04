YUI.add("sts-request", function(e) {
    "use strict";
    var r = e.Lang.isNumber,
        o = e.namespace("STS"),
        t = window.native;
    o.request = function(e) {
        return e.headers || (e.headers = {}), e.type || (e.type = "One"), e.protocol = e.protocol.replace(".gw2.", "." + t.stats.gameCode + "."), o._request(e)
    }, o.netError = function(e) {
        e && r(e.code) && r(e.product) && r(e.module) && r(e.line) && t.call("ShowNetErrorBasic", e.code, e.product, e.module, e.line)
    }
}, "@VERSION@", {
    requires: ["promise"]
});