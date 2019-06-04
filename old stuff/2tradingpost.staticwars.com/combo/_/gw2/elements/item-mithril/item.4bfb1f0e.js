YUI.add("element-item", function(t) {
    "use strict";
    var e = t.namespace("Elements"),
        n = t.namespace("GW2.Enums"),
        i = t.namespace("GW2.Util").keys,
        a = t.namespace("Util").optional,
        o = window.native;
    e.item = function(t) {
        var r, c = parseInt(t.count, 10);
        return "tooltip" in t || (t.tooltip = !0), t.tooltip && (r = function(t, e) {
            if (m.redraw.strategy("none"), !e.relatedTarget || !(e.relatedTarget === e.currentTarget || e.currentTarget.compareDocumentPosition(e.relatedTarget) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
                if ("mouseover" !== e.type) return o.call("HideTextTooltip"), void o.call("HideItemTooltip");
                i.inject(t), o.call("ShowItemTooltip", parseInt(t, 10))
            }
        }.bind(null, t.guid)), c = c > 1 ? "" + c : "", {
            tag: "div",
            attrs: {
                className: "item",
                "data-guid": t.guid,
                "data-locked": a(t.locked, "true"),
                "data-count": c,
                onmouseover: r,
                onmouseout: r,
                oncontextmenu: function(e) {
                    i.inject(t.guid), e.clientX && e.clientY ? o.call("ShowItemContextMenu", parseInt(t.guid, 10), parseFloat(e.clientX), parseFloat(e.clientY)) : o.call("HideItemContextMenu")
                },
                onclick: function(e) {
                    m.redraw.strategy("none"), (e.shiftKey || e.ctrlKey) && (o.call(e.shiftKey ? "ChatItemInsert" : "ChatItemSend", parseInt(c || "1", 10), parseInt(t.guid || 0, 10)), e.preventDefault(), e.stopPropagation())
                }
            },
            children: [{
                tag: "div",
                attrs: {
                    className: "icon",
                    "data-count": a(c.length > 5, "99999+", c)
                },
                children: [{
                    tag: "img",
                    attrs: {
                        config: function(e) {
                            e.src !== "coui://item/" + t.guid && (e.src = "coui://item/" + t.guid)
                        }
                    },
                    children: []
                }]
            }, a(t.name || "number" == typeof t.coins, m(".details", a(t.name, {
                tag: "div",
                attrs: {
                    class: "name rarity " + n.reverse("Rarity", t.rarity)
                },
                children: [t.name]
            }), a("coins" in t, e.coins(t.coins))))]
        }
    }
}, "@VERSION@", {
    requires: ["gw2-enums", "util-optional", "util-text-keys", "css-item"]
});