YUI.add("sts-request-jssrv", function(t) {
    "use strict";
    var e = t.namespace("STS"),
        s = window.native;
    e._request = function(t) {
        return t.headers.m = s.stats.sessionId, e._http(t)
    }
}, "@VERSION@", {
    requires: ["promise", "sts-http", "native-stats"],
    condition: {
        trigger: "sts-request",
        when: "after",
        test: function(t) {
            "use strict";
            return !window.native || window.native.stubbed || !GW2.config.features.cliGate
        }
    }
});