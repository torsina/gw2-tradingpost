YUI.add("item-table-controller", function(e) {
    "use strict";
    var t = e.namespace("ItemTable"),
        n = e.namespace("STS");
    t.Controller = function() {
        var r, i = window.state.section;
        return (r = {
            _reset: function() {
                r.scroll = {
                    y: 0,
                    visible: 0,
                    item: 0,
                    height: 0,
                    max: 0,
                    measured: !1
                }, r.transitioned = !1, r.cancelling = null
            },
            _wipe: function(e) {
                e && e.saveScrollPosition ? r.scroll.measured = !1 : r._reset()
            },
            _measure: function() {
                var t = e.one(".views"),
                    n = t && t.one(".items"),
                    o = t && t.one(".item-row"),
                    l = r.scroll;
                n && o && (l.item = o.get("region").height, l.height = n.get("region").height, l.visible = l.height / l.item, l.max = Math.max(l.item * i().results().length, l.height), l.measured = !0, m.redraw())
            },
            _onScroll: function(e, n) {
                var i, o = r.prevViewport.current,
                    l = r.scroll.visible;
                r.scroll.y = n.target.scrollTop, i = t.viewport(r, e).current, 0 !== r.scroll.y && i < o + l && i > o - l && m.redraw.strategy("none")
            },
            _onCancelClick: function(e, t) {
                t.stopPropagation(), r.cancelling = e
            },
            _onConfirmClick: function(t, o) {
                var l;
                o.stopPropagation(), l = {
                    orderId: parseInt(t.listing_id, 10)
                }, i().unfiltered(i().unfiltered().filter(function(e) {
                    return e.id !== t.id
                })), r.cancelling = null, t.isBuy && (l.isBuy = ""), n.request({
                    protocol: "Game.gw2.Trade",
                    command: "Cancel",
                    type: "None",
                    body: l,
                    headers: {
                        t: "$" + t.data_id
                    }
                }).catch(function(t) {
                    n.netError(t), e.GW2.transactions.get()
                })
            },
            _onMoreClick: function(t) {
                t.preventDefault(), m.startComputation(), e.GW2.transactions.get({
                    more: !0
                }).then(function() {
                    r.scroll.max = r.scroll.item * i().results().length, m.endComputation()
                })
            }
        })._reset(), e.on("items:synced", r._wipe), r
    }
}, "@VERSION@", {
    requires: ["sts-request"]
});