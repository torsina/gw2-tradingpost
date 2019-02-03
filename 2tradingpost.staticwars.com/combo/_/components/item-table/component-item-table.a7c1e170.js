YUI.add("component-item-table", function(e) {
    "use strict";
    var t = e.namespace("ItemTable");
    e.namespace("GW2.Components").ItemTable = {
        controller: t.Controller,
        view: t.view
    }
}, "@VERSION@", {
    requires: ["item-table-controller", "item-table-view"]
});