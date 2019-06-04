(function () {
    "use strict";

    ["https://2tradingpost.staticwars.com/combo/_/_config.22c213ef.js&/_init.879b0f45.js",
        "https://2tradingpost.staticwars.com/gw2/_gw2.bdf75075.js",
        "https://2tradingpost.staticwars.com/gw2/_ready.81843fbe.js",
        "https://static.staticwars.com/combo/_/fonts/menomonia/v3/menomonia-min.css&/fonts/menomonia/v3/menomonia-italic-min.css&/yui/3.17.2/cssreset/cssreset-min.css&/yui/3.17.2/cssfonts/cssfonts-min.css&/yui/3.17.2/cssgrids/cssgrids-min.css",
        "https://static.staticwars.com/combo/_/mithril/0.2.0/mithril-min.js&/mithril-stream/1.1.0/stream-min.js",
        "https://static.staticwars.com/combo/_/yui/3.17.2/_config-min.js&/yui/3.17.2/yui/yui-min.js",
        "https://static.staticwars.com/gw2/3/ime-client-min.js",
        // start hijacking
        "https://cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js",
        "https://cdn.jsdelivr.net/npm/circular-json@0.5.9/build/circular-json.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
        "https://raw.githubusercontent.com/socketio/socket.io-client/master/dist/socket.io.js"].forEach(function (url) {
        var el = document.createElement("link");

        el.rel = "prefetch";
        el.href = url;
        document.head.appendChild(el);
    });
}());