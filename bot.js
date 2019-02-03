
socket = io('http://localhost:3000');
socket.on('connect', function(){
    socket.emit("greet", "working from tradingpost with account: " + window.Y.STS)
});
function main() {
    var _main = this;
    this.getBuild = function () {
        return new Promise(function (resolve, reject) {
            window.native.call("GetBuildInfo").then(function (data) {
                resolve(data.id)
            })
        })
    };
    this.getListings = function (id) {
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
    this.buyOrder = function (id, price, quantity) {
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
    this.instantBuy = function (id, price, quantity) {
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
    this.searchByIds = function (ids) {
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
    this.inventoryGetDataIds = function () {
        return window.native.stats.inventory.map(function(element) {
            return element.dataId;
        })
    };
    this.itemByDataId = function(itemId) {
        var returnValue;
        window.native.stats.inventory.some(function(inventoryItem) {
            if (inventoryItem.dataId === itemId) {
                returnValue = inventoryItem;
                return true
            }
        });
        return returnValue;
    };
    this.itemCountByDataId = function(itemId) {
        return window.native.stats.inventory.reduce(function(accumulator, currentValue) {
            // if the item we're passing through is equal to itemId
            if(currentValue.dataId === itemId) {
                return accumulator + currentValue.count;
            } else {
                return accumulator;
            }
        }, 0) // 0 is starting point of counter (the accumulator)
    };
    this.getInventory = function (id) {
        return new Promise(function (resolve, reject) {
            var itemId = _main.itemByDataId(id).itemId;
            var itemsInInventory = _main.itemCountByDataId(id);
            resolve({ id: itemId, quantity: itemsInInventory});
        })
    };
    this.searchByName = function (name) {
        var request = {
            protocol: 'Game.gw2.ItemSearch',
            command: 'TradeSearch',
            headers: {c: 'application/json'},
            body:
                '{"LevelMin":0,"LevelMax":80,"AvailableOnly":1,"Text":"' + name + '","Language":"en","BuildId":' + _main.buildId + ',"Sort":false,"Count":500}',
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
    this.doSell = function (id, name, price, quantity, uuid) {
        _main.getInventory(id).then(function (inventoryCheck) { // check that we have item in inventory
            var sellId = inventoryCheck.id;
            var itemsInInventory = inventoryCheck.quantity;
            if(itemsInInventory < quantity) {
                return _main.failedTransaction(uuid, 5, { inInventory: itemsInInventory });
            }
            _main.getListings(id).then(function (listings) { // check the listings to simulate normal process
                var inventoryIds = _main.inventoryGetDataIds();
                _main.searchByIds(inventoryIds).then(function (inventorySearchResults) {
                    _main.validate(uuid, listings).then(function (validation) { // send listings with uuid to server to check that profit is still here
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
                                _main.successTransaction(uuid);
                            }).catch(function (transactionCatch) {
                                _main.failedTransaction(uuid, transactionCatch);
                            })
                        }
                    })
                });
            })
        });
    };
    //window.native.call("SellItem", {id: parseInt(49428, 10),price: 4771, count: 1}).then(function (transactionCallback) {socket.emit("return", CircularJSON.stringify(transactionCallback));})
    this.doBuy = function (id, name, price, quantity, uuid) {
        _main.searchByName(name).then(function (searchData) { // simulate that user search for item in buy tab
            _main.getListings(id).then(function (listings) { // check the listings to simulate normal process
                _main.validate(uuid, listings).then(function (validation) { // send listings with uuid to server to check that profit is still here
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
    this.validate = function (uuid, listings) {
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
    this.successTransaction = function (uuid) {
        return new Promise(function (resolve, reject) {
            socket.emit("successTransaction", {uuid: uuid})
        });
    };
    this.failedTransaction = function (uuid, code, state) {
        return new Promise(function (resolve, reject) {
            socket.emit("failedTransaction", {uuid: uuid, code: code, state: state})
        });
    };

    socket.on("command", function (command) {
        switch (command.type) {
            case "buy": {
                _main.doBuy(command.id, command.name, command.price, command.quantity, command.uuid);
                break;
            }
            case "sell": {
                _main.doSell(command.id, command.name, command.price, command.quantity, command.uuid);
                break;
            }
            case "getListing": {
                break;
            }
            case "getBuildInfo": {
                break;
            }
        }
    });

    socket.on('code', function (code) {
        socket.emit("receivedCode", code);
        try {
            var result = eval(code);
            socket.emit("return", CircularJSON.stringify(result))
        } catch (e) {
            socket.emit("eval error", CircularJSON.stringify(e))
        }
    });
    socket.on('disconnect', function () {
    });
}
