YUI.add("sts-userinfo", function(e) {
    "use strict";
    var s = e.namespace("STS");
    s.getUserInfo = s.request({
        protocol: "Auth",
        command: "GetUserInfo"
    })
}, "@VERSION@", {
    requires: ["sts-request"]
});