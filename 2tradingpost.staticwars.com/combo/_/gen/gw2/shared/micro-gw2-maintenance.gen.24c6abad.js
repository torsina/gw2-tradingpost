YUI.add("micro-gw2-maintenance", function(e) {
    var n = e.namespace("Templates");
    e.namespace("Templates.Helpers");
    n["gw2-maintenance"] = (new e.Template).revive(function(e, n, a) {
        var t, m = '<div class="maintenance">\r\n    <h1 class="announcement">' + n((t = window.tp_strings.common.maintenance.header) || 0 === t ? t : "") + "</h1>\r\n</div>\r\n";
        return m
    })
}, "@VERSION@", {
    requires: ["template"]
});