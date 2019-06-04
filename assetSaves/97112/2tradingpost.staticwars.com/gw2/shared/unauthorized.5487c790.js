YUI.add("unauthorized", function(e) {
    "use strict";
    e.namespace("STS").getUserInfo.then(function(e) {
        GW2.user = e
    }, function() {
        var u = e.one("body");
        u.addClass("unauthorized"), u.append(e.Templates["gw2-unauthorized"]())
    })
}, "@VERSION@", {
    requires: ["sts-userinfo", "sts-request", "css-unauthorized", "micro-gw2-unauthorized"]
});