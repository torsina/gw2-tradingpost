YUI.add("element-coins", function(e) {
    "use strict";
    var t = window.native,
        i = e.namespace("Util").optional,
        o = window.tp_strings.coins.tooltip;

    function n(e, i) {
        if (!i.relatedTarget || !(i.relatedTarget === i.currentTarget || i.currentTarget.compareDocumentPosition(i.relatedTarget) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
            if (e && "mouseover" === i.type) return t.call("ShowTextTooltip", e);
            t.call("HideTextTooltip"), t.call("HideItemTooltip")
        }
    }
    e.namespace("Elements").coins = function(a, l) {
        var s = l || {},
            r = parseInt(a, 10) || 0,
            c = Math.floor(r / 1e4),
            d = Math.floor(r % 1e4 / 100),
            u = r % 100,
            g = ("" + c).length,
            p = g > 3 ? c.toLocaleString(t.stats.language) : c,
            T = s.hide,
            h = s.class || s.className || "";
        return m(".coins", e.merge(s, {
            hide: null,
            "data-digits": i(g > 3, "4+", g),
            class: [h, i(s.align, "align"), i(!r, "empty")].join(" "),
            onmouseover: i(T && g > 3, n.bind(null, e.Lang.sub(o, {
                gold: p,
                silver: d,
                copper: u
            }))),
            onmouseout: i(T && g > 3, n.bind(null, null))
        }), {
            tag: "div",
            attrs: {
                class: "gold coin " + i(T && !c, "hide")
            },
            children: [p]
        }, {
            tag: "div",
            attrs: {
                class: "silver coin " + i(T && (!d && !c || g > 4), "hide")
            },
            children: [d]
        }, {
            tag: "div",
            attrs: {
                class: "copper coin " + i(T && g > 3, "hide")
            },
            children: [u]
        })
    }
}, "@VERSION@", {
    requires: ["util-optional", "css-coins"]
});