YUI.add("prompt", function(r) {
    "use strict";
    r.namespace("GW2").prompt = function(r, t) {
        return {
            tag: "div",
            attrs: {
                className: "prompt-overlay"
            },
            children: [{
                tag: "div",
                attrs: {
                    className: "prompt " + (t || "")
                },
                children: [m(".prompt-inner", r)]
            }]
        }
    }
}, "@VERSION@", {
    requires: ["css-prompt"]
});