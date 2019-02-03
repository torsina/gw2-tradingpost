! function() {
    "use strict";
    var t = {
        mouseover: function(t) {
            t.target.classList.remove("mouseout")
        },
        mousedown: function(t) {
            t.target.classList.remove("mouseup")
        },
        mouseout: function(t) {
            t.target.classList.remove("mouseup"), t.target.classList.add("mouseout")
        },
        mouseup: function(t) {
            t.target.classList.add("mouseup")
        }
    };
    Object.keys(t).forEach(function(e) {
        document.body.addEventListener(e, function(t, e) {
            (e.target.classList.contains("btn") || "BUTTON" === e.target.nodeType) && t(e)
        }.bind(null, t[e]))
    })
}();