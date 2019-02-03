! function(n) {
    "use strict";
    var e = document.documentElement;
    window.GW2 = {
        configs: [YUI_config],
        modules: ["native-call", "native-stats", "native-api-ime", "native-scale"],
        start: function() {
            var e = Array.prototype.slice.apply(arguments);
            if (!n || document.documentElement.hasAttribute("ready")) return GW2._ready(e);
            n.on("ready", GW2._ready.bind(GW2, e))
        },
        _ready: function(n) {
            YUI_config.lang = "zh" === e.lang ? "zh-Hans" : e.lang, window.Y = YUI.apply(null, GW2.configs), window.Y.use(GW2.modules.concat(n))
        }
    }
}(window.native);