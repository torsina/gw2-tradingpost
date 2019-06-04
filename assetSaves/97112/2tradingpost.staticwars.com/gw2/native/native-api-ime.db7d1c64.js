YUI.add("native-api-ime", function(e) {
    "use strict";
    if ("zh" === window.native.stats.language) {
        var t, n = window.native,
            i = e.namespace("GW2");
        t = Object.create({
            sendEnabled: function(e) {
                n.call("Ime" + (e.enabled ? "Enable" : "Disable"))
            },
            sendRect: function(e) {
                var t = n.scale || 1,
                    i = t * e.width,
                    a = t * e.height;
                n.call("ImeSetRectDim", {
                    left: e.left ? +e.left : 0,
                    top: e.top ? +e.top : 0,
                    width: i || 0,
                    height: a || 0
                })
            },
            sendSelection: function(e) {
                var t = "backward" === e.direction,
                    i = t ? e.end : e.start,
                    a = t ? e.start : e.end;
                n.call("ImeSetSelection", i, a)
            },
            sendText: function(e) {
                n.call("ImeSetText", e.text)
            },
            schema: {
                enabled: {
                    type: "bool",
                    value: !1
                },
                text: {
                    type: "string",
                    value: ""
                },
                start: {
                    type: "int",
                    value: 0
                },
                end: {
                    type: "int",
                    value: 0
                },
                direction: {
                    type: "string",
                    value: "forward"
                },
                width: {
                    type: "int",
                    value: 0
                },
                height: {
                    type: "int",
                    value: 0
                },
                top: {
                    type: "int",
                    value: 0
                },
                left: {
                    type: "int",
                    value: 0
                }
            },
            groups: {
                Enabled: ["enabled"],
                Text: ["text"],
                Selection: ["start", "end", "direction"],
                Rect: ["width", "height", "top", "left"]
            },
            group: function(n) {
                var i;
                return e.Object.each(t.groups, function(e, t) {
                    e.indexOf(n) >= 0 && (i = t)
                }), i
            },
            stage: function(e) {
                var n = Object.keys(t).every(function(e) {
                    return !1 === t[e]
                });
                t.groups[e].staged || (t.groups[e].staged = !0), n && setTimeout(t.commit, 0)
            },
            commit: function() {
                e.each(t.groups, function(e, n) {
                    if (e.staged) {
                        var i = t["send" + n],
                            a = {};
                        e.forEach(function(e) {
                            a[e] = t[e]
                        }), i(a), e.staged = !1
                    }
                })
            }
        }), e.Object.each(t.schema, function(e, n) {
            e.group = t.group(n), Object.defineProperty(t, n, {
                get: function() {
                    return e.value
                },
                set: function(n) {
                    return n = function(e, t) {
                        switch (t) {
                            case "int":
                                return parseInt(e, 10);
                            case "bool":
                                return !!e
                        }
                        return e instanceof Object && (e = JSON.stringify(e)), "" + e
                    }(n, e.type), e.value === n ? n : (t.stage(e.group), e.value = n)
                }
            })
        }), n.on("ImeTextStore", function(e) {
            window.postMessage(["ime:native", {
                direction: e.caret === e.selStart ? "backward" : "forward",
                text: e.text,
                start: e.selStart,
                end: e.selEnd
            }], "*")
        }), window.addEventListener("message", function(e) {
            if (e.source === window) {
                var t = e.data,
                    n = t && t.length && "ime:client" === t[0] && t[0] && t[1];
                i.Ime = n
            }
        }, !0), Object.defineProperty(i, "Ime", {
            get: function() {
                return t
            },
            set: function(n) {
                return n && e.mix(t, n, !0)
            }
        })
    }
}, "@VERSION@", {
    requires: ["native-stats"]
});