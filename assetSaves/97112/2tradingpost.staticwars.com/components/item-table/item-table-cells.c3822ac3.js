YUI.add("item-table-cells", function(t) {
    "use strict";
    var e = t.namespace("GW2.Util"),
        n = t.namespace("Elements"),
        i = window.native,
        c = window.tp_strings;

    function a() {
        m.redraw.strategy("none"), i.call("HideTextTooltip")
    }
    t.namespace("ItemTable").cells = {
        cancel: function(t) {
            if (t.item.cancelable) return {
                tag: "div",
                attrs: {
                    class: "actions " + (t.ctrl.cancelling === t.item.id ? "active" : "")
                },
                children: [{
                    tag: "button",
                    attrs: {
                        className: "btn cancel",
                        onclick: t.ctrl._onCancelClick.bind(t.ctrl, t.item.id)
                    },
                    children: [c.transactions.cancel]
                }, {
                    tag: "button",
                    attrs: {
                        className: "btn confirm",
                        onclick: t.ctrl._onConfirmClick.bind(t.ctrl, t.item)
                    },
                    children: [c.transactions.confirm]
                }]
            }
        },
        coins: function(t) {
            return n.coins(t.item[t.col], {
                hide: !0
            })
        },
        date: function(t) {
            return {
                tag: "span",
                attrs: {
                    onmouseover: function(t) {
                        m.redraw.strategy("none"), i.call("ShowTextTooltip", t.toLocaleString())
                    }.bind(null, t.item.date),
                    onmouseout: a
                },
                children: [e.relativeTime(t.item.date)]
            }
        },
        name: function(t) {
            return n.item({
                count: t.item.count || t.item.quantity || t.item.sell_count || 0,
                guid: t.item.data_id,
                locked: !t.item.whitelisted,
                name: t.item.name,
                rarity: t.item.rarity,
                tooltip: !0
            })
        },
        isbuy: function(t) {
            var e = t.item.section + (t.item.isBuy ? "-buy" : "-sell");
            return c.category.transaction[e]
        }
    }
}, "@VERSION@", {
    requires: ["util-relative-time", "element-coins", "element-item"]
});