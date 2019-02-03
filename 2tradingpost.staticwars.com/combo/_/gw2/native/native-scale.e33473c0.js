YUI.add("native-scale", function(e) {
    "use strict";
    var t = window.native,
        n = document.documentElement,
        i = e.namespace("GW2");
    i.setScale = function() {
        var e = Math.min(window.innerWidth / n.offsetWidth, window.innerHeight / n.offsetHeight);
        t.scale = e, n.style["-webkit-transform-origin"] = "top left", n.style["-webkit-transform"] = "scale(" + e + ")"
    }, window.addEventListener("resize", i.setScale, !1), i.setScale()
}, "@VERSION@", {
    condition: {
        test: function() {
            "use strict";
            return window.self === window.top
        }
    }
});