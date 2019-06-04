YUI.add("sts-request-native", function(e) {
    "use strict";
    e.namespace("STS")._request = function(e) {
        return e.headers.c = "application/json", e.body = JSON.stringify(e.body || {}), window.native.call("StsRequest", e).then(function(e) {
            return e.bodyRaw ? JSON.parse(e.bodyRaw) : e
        })
    }
}, "@VERSION@", {
    requires: ["promise"],
    condition: {
        trigger: "sts-request",
        when: "after",
        test: function(e) {
            "use strict";
            return window.native && !window.native.stubbed && GW2.config.features.cliGate
        }
    }
});