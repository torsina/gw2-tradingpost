
/**
 window.Y._ownNamespace = {};
 const _namespace = window.Y._ownNamespace;

 _namespace.getBuild = function () {
    return new Promise(function (resolve, reject) {
        window.native.call("GetBuildInfo").then(function (data) {
            resolve(data.id)
        })
    })
};
 _namespace.getListings = function (id) {
    var request = {
        protocol: 'Game.gw2.Trade',
        command: 'GetListings',
        headers: {t: '$' + id, c: 'application/json'},
        body: '{"buys":"","sells":"","count":40}',
        type: 'One'
    };
    return new Promise(function (resolve, reject) {
        window.native.call("stsRequest", request).then(function (data) {
            if (data.code === 200) {
                resolve(CircularJSON.stringify(data.bodyRaw))
            }
        })
    });
};
 _namespace.buyOrder = function (id, price, quantity) {
    var request = {
        protocol: 'Game.gw2.Trade',
        command: 'Buy',
        body: '{"offers":[{"UnitPrice":' + price + ',"Quantity":' + quantity + '}],"CustomOffer":"whole twelve bananas"}',
        headers: {t: '$' + id, c: 'application/json'},
        type: 'One'
    };
    return new Promise(function (resolve, reject) {
        window.native.call("stsRequest", request).then(function (data) {
            resolve(data);
        })
    });
};
 _namespace.instantBuy = function (id, price, quantity) {
    var request = {
        protocol: 'Game.gw2.Trade',
        command: 'Buy',
        body: '{"offers":[{"UnitPrice":' + price + ',"Quantity":' + quantity + '}]}',
        headers: {t: '$' + id, c: 'application/json'},
        type: 'One'
    };
    return new Promise(function (resolve, reject) {
        window.native.call("stsRequest", request).then(function (data) {
            resolve(data);
        })
    });
};
 _namespace.searchByIds = function (ids) {
    var request = {
        protocol: 'Game.gw2.ItemSearch',
        command: 'TradeSearch',
        body: '{"buildId":' + this.build + ',"language":"en","items":{{itemsPlaceholder}}}',
        headers: {
            c: 'application/json'
        },
        type: 'One'
    };
    var array = [];
    for (var i = 0, n = ids.length; i < n; i++) {
        array.push({TypeId: 3, DataId: parseInt(ids[i])});
    }
    request.body = request.body.replace("{{itemPlaceholder}}", CircularJSON.stringify(array));
    return new Promise(function (resolve, reject) {
        window.native.call("stsRequest", request).then(function (data) {
            resolve(data);
        })
    });
};
 _namespace.inventoryGetDataIds = function () {
    return window.native.stats.inventory.map(function(element) {
        return element.dataId;
    })
};
 _namespace.itemByDataId = function(itemId) {
    var returnValue;
    window.native.stats.inventory.some(function(inventoryItem) {
        if (inventoryItem.dataId === itemId) {
            returnValue = inventoryItem;
            return true
        }
    });
    return returnValue;
};
 _namespace.itemCountByDataId = function(itemId) {
    return window.native.stats.inventory.reduce(function(accumulator, currentValue) {
        // if the item we're passing through is equal to itemId
        if(currentValue.dataId === itemId) {
            return accumulator + currentValue.count;
        } else {
            return accumulator;
        }
    }, 0) // 0 is starting point of counter (the accumulator)
};
 _namespace.getInventory = function (id) {
    return new Promise(function (resolve, reject) {
        var itemId = _namespace.itemByDataId(id).itemId;
        var itemsInInventory = _namespace.itemCountByDataId(id);
        resolve({ id: itemId, quantity: itemsInInventory});
    })
};
 _namespace.searchByName = function (name) {
    var request = {
        protocol: 'Game.gw2.ItemSearch',
        command: 'TradeSearch',
        headers: {c: 'application/json'},
        body:
            '{"LevelMin":0,"LevelMax":80,"AvailableOnly":1,"Text":"' + name + '","Language":"en","BuildId":' + _namespace.buildId + ',"Sort":false,"Count":500}',
        type: 'One'
    };
    return new Promise(function (resolve, reject) {
        window.native.call("stsRequest", request).then(function (searchResult) {
            resolve(searchResult);
        })
    })
};
 //GetListings
 //TradeSearch on whole inventory (prolly due to refresh of sale page
 //SellItem
 //GetSaleStatus
 //GetListings
 _namespace.doSell = function (id, name, price, quantity, uuid) {
    _namespace.getInventory(id).then(function (inventoryCheck) { // check that we have item in inventory
        var sellId = inventoryCheck.id;
        var itemsInInventory = inventoryCheck.quantity;
        if(itemsInInventory < quantity) {
            return _namespace.failedTransaction(uuid, 5, { inInventory: itemsInInventory });
        }
        _namespace.getListings(id).then(function (listings) { // check the listings to simulate normal process
            var inventoryIds = _namespace.inventoryGetDataIds();
            _namespace.searchByIds(inventoryIds).then(function (inventorySearchResults) {
                _namespace.validate(uuid, listings).then(function (validation) { // send listings with uuid to server to check that profit is still here
                    if (validation.validated === true) {
                        window.native.call("SellItem", {
                            id: parseInt(sellId, 10),
                            price: price,
                            count: quantity
                        }).then(function (transactionCallback) {
                            var saleStatusRequest = {
                                "protocol":"Game.gw2.Trade",
                                "command":"GetSaleStatus",
                                "headers":{
                                    "m": window.native._stats.sessionId,
                                    "c":"application/json"},
                                "body":"{\"SequenceId\":" + transactionCallback.sequenceId + "}",
                                "type":"One"};
                            window.native.call("stsRequest", saleStatusRequest).then(function (saleStatusCallback) {

                            });
                            _namespace.successTransaction(uuid);
                        }).catch(function (transactionCatch) {
                            _namespace.failedTransaction(uuid, transactionCatch);
                        })
                    }
                })
            });
        })
    });
};
 //window.native.call("SellItem", {id: parseInt(49428, 10),price: 4771, count: 1}).then(function (transactionCallback) {socket.emit("return", CircularJSON.stringify(transactionCallback));})
 _namespace.doBuy = function (id, name, price, quantity, uuid) {
    _namespace.searchByName(name).then(function (searchData) { // simulate that user search for item in buy tab
        _namespace.getListings(id).then(function (listings) { // check the listings to simulate normal process
            _namespace.validate(uuid, listings).then(function (validation) { // send listings with uuid to server to check that profit is still here
                if (validation.validated === true) {
                    var request = {
                        protocol: 'Game.gw2.Trade',
                        command: 'Buy',
                        body:
                            '{"offers":[{"UnitPrice":' + price + ',"Quantity":' + quantity + '}],"CustomOffer":"whole twelve bananas"}',
                        headers: {t: '$' + id, c: 'application/json'},
                        type: 'One'
                    };
                    window.native.call("stsRequest", request)
                }
            })
        })
    })
};
 _namespace.validate = function (uuid, listings) {
    return new Promise(function (resolve, reject) {
        socket.emit("validateRequest", {uuid: uuid, listings: listings});
        var listen = function () {
            socket.once("validateResponse", function (response) {
                if (response.uuid !== uuid) return listen();
                resolve(response);
            })
        }
    });
};
 _namespace.successTransaction = function (uuid) {
    return new Promise(function (resolve, reject) {
        socket.emit("successTransaction", {uuid: uuid})
    });
};
 _namespace.failedTransaction = function (uuid, code, state) {
    return new Promise(function (resolve, reject) {
        socket.emit("failedTransaction", {uuid: uuid, code: code, state: state})
    });
};
 **/
window.native.call("GetBuildInfo").then(function (data) {return socket.emit("return", CircularJSON.stringify(data))}).catch(function() {socket.emit("return", "fail")});
CircularJSON.stringify(window._ownNamespace.getBuild());
eval("Object.keys(window._ownNamespace.getBuild());");
window._ownNamespace.getBuild().then(function(data) { socket.emit("return", data)});

window._ownNamespace.getBuild().then(function(data) { socket.emit("return", data)});
window._ownNamespace.searchByName("Superior Sigil of").then(function(data) { socket.emit("return", CircularJSON.stringify(data))});
