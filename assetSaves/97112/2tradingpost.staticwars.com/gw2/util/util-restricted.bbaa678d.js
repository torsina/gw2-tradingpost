YUI.add("util-restricted", function(t) {
    "use strict";
    var i = window.native;
    t.namespace("GW2.Util").restricted = function() {
        i.import("gw2/ui/dialog", function(t) {
            t.toggleNative("EconRestrict")
        })
    }
});