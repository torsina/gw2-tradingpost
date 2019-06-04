YUI.add("native-call", function(a) {
    "use strict";
    var n = window.native,
        r = n.call;
    n.call = function() {
        return a.when(r.apply(n, a.Array(arguments)))
    }
}, "@VERSION@", {
    requires: ["promise"]
});