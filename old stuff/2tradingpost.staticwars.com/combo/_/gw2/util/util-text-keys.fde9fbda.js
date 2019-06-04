YUI.add("util-text-keys", function(t) {
    "use strict";
    var e, windowNative = window.native;
    (e = function() {
        this.injected = {}, this.keys = {}
    }).prototype = {
        register: function(t, e) {
            "string" == typeof t && (t = parseInt(t, 10)), !isNaN(t) && Array.isArray(e) && e.length && (this.keys[t] = e)
        },
        inject: function(t) {
            var e;
            "string" == typeof t && (t = parseInt(t, 10)), e = this.keys[t], isNaN(t) || t in this.injected || !Array.isArray(e) || !e.length || (e.forEach(function(t) {
                windowNative.call("SetTextEncryptionKey", parseInt(t.id, 10), t.password)
            }), this.injected[t] = 1)
        }
    }, t.namespace("GW2.Util").keys = new e
});