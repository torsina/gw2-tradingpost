YUI.add("sts-http", function(o) {
    "use strict";
    o.namespace("STS")._http = function(e, t) {
        return new o.Promise(function(t, s) {
            o.io("/stsRequest?" + e.protocol + "/" + e.command, {
                method: "POST",
                data: JSON.stringify(e),
                headers: {
                    "Content-Type": "application/json"
                },
                on: {
                    success: function(o, e) {
                        var n;
                        try {
                            n = JSON.parse(e.responseText)
                        } catch (o) {
                            s("Could not parse response body")
                        }
                        if (200 === e.status || 400 === e.status && !n.body.code) return t(n.body);
                        s(n)
                    },
                    failure: function(o, t) {
                        var n = {};
                        try {
                            n = JSON.parse(t.responseText)
                        } catch (o) {
                            console.log("Couldn't parse failure response body: " + e.protocol + "/" + e.command)
                        }
                        s(n.body)
                    }
                }
            })
        })
    }
}, "@VERSION@", {
    requires: ["io-base", "promise"]
});