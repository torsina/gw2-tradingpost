YUI.add("item-table-data", function(e) {
    "use strict";
    var a = e.namespace("ItemTable"),
        n = {
            headers: {},
            columns: {
                sell: ["name", "level", "buy_price"],
                browse: ["name", "level", "sell_price"],
                transactions: ["name", "isBuy", "unit_price", "date", "cancelable"]
            },
            quantities: {
                sell: "count",
                browse: "sell_count",
                transactions: "quantity"
            },
            cells: {
                buy_price: "coins",
                cancelable: "cancel",
                date: "date",
                isBuy: "isbuy",
                name: "name",
                sell_price: "coins",
                unit_price: "coins"
            }
        };
    e.Object.each(n.columns, function(e, a) {
        n.headers[a] = e.slice(), n.headers[a].unshift("quantity")
    }), a.data = n
});