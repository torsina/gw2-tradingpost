YUI.add("old-build", function(n) {
    "use strict";
    var i = window.native;
    i.stats.buildId < GW2.config.options.buildId && (n.one("body").addClass("old-build").setHTML(n.Templates["gw2-maintenance"]()), i.call("SetLoading", !1))
}, "@VERSION@", {
    requires: ["node", "micro-gw2-maintenance", "css-maintenance"],
    condition: {
        trigger: "unauthorized",
        when: "before",
        test: function(n) {
            "use strict";
            return GW2.config.options.buildId > 0
        }
    }
});