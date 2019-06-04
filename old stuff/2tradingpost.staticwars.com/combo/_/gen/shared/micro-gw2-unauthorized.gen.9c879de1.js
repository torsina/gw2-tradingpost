YUI.add("micro-gw2-unauthorized", function(e) {
    var r = e.namespace("Templates");
    e.namespace("Templates.Helpers");
    r["gw2-unauthorized"] = (new e.Template).revive(function(e, r, a) {
        var n = '<div class="unauthorized notice">\r\n    \x3c!-- program:!live --\x3e\r\n    <h1>You must <a href="/login">login</a> to view this page</h1>\r\n    \x3c!-- /program:!live --\x3e\r\n\r\n    \x3c!-- program:live\r\n    <h1>ERROR: Invalid authorization</h1>\r\n    /program:live --\x3e\r\n</div>\r\n';
        return n
    })
}, "@VERSION@", {
    requires: ["template"]
});