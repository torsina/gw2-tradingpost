YUI.add("number-floater-plugin", function(t) {
    "use strict";
    var e, s = t.Lang;
    e = t.Base.create("number-floater-plugin", t.Plugin.Base, [], {
        initializer: function() {
            var n = this.getAttrs(),
                i = n.host;
            this._transitions = {
                start: {
                    opacity: 1,
                    duration: .1,
                    easing: n.easing,
                    on: {
                        start: function() {
                            this.replaceClass("hide", "transitioning")
                        }
                    }
                },
                up: {
                    opacity: 0,
                    duration: n.duration,
                    easing: n.easing,
                    "-webkit-transform": "translateY(" + n.end + ")",
                    on: {
                        end: function() {
                            this.removeClass("transitioning")
                        }
                    }
                }
            }, this._style = s.sub(e.TEMPLATES.style, n), this._node = t.Node.create(s.sub(e.TEMPLATES.floater, t.merge(n, {
                style: this._style
            }))), i.appendChild(this._node), i.setStyle("position", "relative")
        },
        destructor: function() {
            delete this._node, delete this._transitions
        },
        show: function(t, e, s) {
            var n, i, a = this._transitions,
                o = this._node,
                r = !0;
            n = parseInt(t, 10), isNaN(n) && (r = !1, n = t), i = s || r && n <= 0 ? "down" : "up", e && r && o.hasClass("transitioning") && (n += parseInt(o.getContent(), 10) || 0), o.setAttribute("style", this._style).replaceClass("(up|down)", i).setContent(r ? Math.abs(n) : n).transition(a.start, function() {
                o.transition(a.up)
            })
        }
    }, {
        NS: "floater",
        ATTRS: {
            start: {
                value: 0
            },
            end: {
                value: "-10px"
            },
            duration: {
                value: 2
            },
            easing: {
                value: "ease-out"
            }
        },
        TEMPLATES: {
            floater: "<span class='hide floater' style='{style}'></span>",
            style: "position: absolute; opacity : 0; -webkit-transform: translateY({start});"
        }
    }), t.namespace("GW2.Plugins").NumberFloaterPlugin = e
}, "@VERSION@", {
    requires: ["plugin", "base", "node", "transition"]
});