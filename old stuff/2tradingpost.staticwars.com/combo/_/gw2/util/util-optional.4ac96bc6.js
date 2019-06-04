YUI.add("util-optional", function(t) {
    "use strict";
    t.namespace("Util").optional = function(t, n, i) {
        return t ? n : i || ""
    }
});