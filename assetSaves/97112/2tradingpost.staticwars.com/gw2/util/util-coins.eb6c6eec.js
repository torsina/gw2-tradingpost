YUI.add("util-coins", function(e) {
    "use strict";
    var t;
    t = {
        toObject: function(e) {
            var t, o = typeof e;
            return "object" === o ? e : ("string" === o && (e = parseInt(e, 10)), isNaN(e) && (e = 0), t = Math.floor(e / 1e4), {
                total: e,
                copper: e % 100,
                silver: Math.floor(e % 1e4 / 100),
                gold: t,
                digits: ("" + t).length > 3 ? "4+" : ""
            })
        },
        toInteger: function(e) {
            return "number" === typeof e ? e : e.copper + 100 * e.silver + 1e4 * e.gold
        },
        toNodes: function(e, o) {
            var i, r;
            e && (i = t.toObject(o), r = !!(r = e.getData("hide-empty")).length, e.toggleClass("empty", !i.total), e.one(".gold").setHTML(i.gold).toggleClass("hide", r && i.total && !i.gold), e.one(".silver").setHTML(i.silver).toggleClass("hide", r && i.total && !i.gold && !i.silver), e.one(".copper").setHTML(i.copper).removeClass("hide"), e.setAttribute("data-coins", i.total), e.setAttribute("data-digits", i.digits))
        },
        toInputs: function(e, o) {
            var i;
            e && (i = t.toObject(o), e.one("[name='gold']").set("value", i.gold), e.one("[name='silver']").set("value", i.silver), e.one("[name='copper']").set("value", i.copper))
        },
        toHTML: function(o, i) {
            var r = t.toObject(o),
                s = !!i.hide,
                l = 0 === r.total,
                a = s && (l || 0 === r.gold) ? "hide" : "",
                d = s && (l || a && 0 === r.silver) ? "hide" : "",
                n = s && l ? "hide" : "",
                c = i.css || "";
            return r.total || (c += (c.length ? " " : "") + "empty"), e.Lang.sub("<div class='coins serif {css}' data-hide-empty='{hide}' data-coins='{total}' data-digits='{digits}'><div class='gold {hideGold}'>{gold}</div><div class='silver {hideSilver}'>{silver}</div><div class='copper {hideCopper}'>{copper}</div></div>", e.merge(r, {
                css: c,
                hide: s,
                hideGold: a,
                hideSilver: d,
                hideCopper: n
            }))
        },
        fromInputs: function(e) {
            var o, i = {
                copper: 0,
                silver: 0,
                gold: 0,
                total: 0,
                error: null
            };
            return e ? (o = {
                copper: Math.floor(+e.one("[name='copper']").get("value")),
                silver: Math.floor(+e.one("[name='silver']").get("value")),
                gold: Math.floor(+e.one("[name='gold']").get("value"))
            }, isNaN(o.copper) || isNaN(o.silver) || isNaN(o.gold) ? (o = i).error = "coins.parse" : o.total = t.toInteger(o), o) : (i.error = "coins.node", i)
        }
    }, e.namespace("GW2.Util").Coins = t
}, "@VERSION@", {
    requires: ["node-base"]
});