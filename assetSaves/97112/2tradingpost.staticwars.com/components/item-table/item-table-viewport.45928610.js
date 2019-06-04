YUI.add("item-table-viewport", function(e) {
    "use strict";
    e.namespace("ItemTable").viewport = function(e, t) {
        var a, i, n, m, r = e.scroll,
            o = r.y;
        return r.measured ? (m = window.state.powerMode() ? 30 : 10, a = Math.floor(r.y / r.item), i = Math.max(a - m, 0), n = Math.min(a + r.visible + m, t.length), o = Math.max(r.y - m * r.item, 0), o = Math.abs(o - r.y % r.item), {
            current: a,
            begin: i,
            end: n,
            y: o = Math.min(o, r.max - (n - i) * r.item)
        }) : (setTimeout(e._measure.bind(e), 0), {
            begin: 0,
            end: 1,
            y: r.y
        })
    }
});