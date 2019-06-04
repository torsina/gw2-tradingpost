var tp_config = {
    groups: {
        'Public/app/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/app/',
            base: '/app/',
            modules: {
                'app-ntp': {
                    path: 'app-ntp.367b7fd4.js',
                    requires: ['app-state', 'unauthorized', 'gw2-enums', 'sell', 'browse', 'transactions', 'home', 'view-order', 'component-balance', 'component-filters', 'component-delivery-box', 'component-tabs', 'component-categories', 'component-item-table', 'component-breadcrumbs', 'css-app', 'css-grid', 'button', 'util-text-keys', 'util-optional', 'util-items']
                },
                'app-state': {
                    path: 'app-state.f0d284a1.js',
                    requires: ['gw2-enums', 'filter-types']
                }
            }
        },
        'Public/components/balance/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/components/balance/',
            base: '/components/balance/',
            modules: {
                'component-balance': {
                    path: 'component-balance.8d0d266d.js',
                    requires: ['css-balance', 'element-coins', 'number-floater-plugin']
                }
            }
        },
        'Public/components/breadcrumbs/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/components/breadcrumbs/',
            base: '/components/breadcrumbs/',
            modules: {
                'component-breadcrumbs': {
                    path: 'component-breadcrumbs.b678812f.js',
                    requires: ['css-breadcrumbs', 'util-optional']
                }
            }
        },
        'Public/components/categories/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/components/categories/',
            base: '/components/categories/',
            modules: {
                'component-categories': {
                    path: 'component-categories.dca8b112.js',
                    requires: ['css-categories', 'navigation', 'element-item', 'util-optional', 'node-event-simulate']
                }
            }
        },
        'Public/components/delivery-box/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/components/delivery-box/',
            base: '/components/delivery-box/',
            modules: {
                'component-delivery-box': {
                    path: 'component-delivery-box.bbedf06c.js',
                    requires: ['css-delivery', 'util-optional', 'element-item', 'element-coins', 'number-floater-plugin']
                }
            }
        },
        'Public/components/filters/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/components/filters/',
            base: '/components/filters/',
            modules: {
                'component-filters': {
                    path: 'component-filters.220c6104.js',
                    requires: ['event-outside', 'gw2-enums', 'filter-types', 'util-optional', 'css-filters']
                }
            }
        },
        'Public/components/item-table/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/components/item-table/',
            base: '/components/item-table/',
            modules: {
                'component-item-table': {
                    path: 'component-item-table.a7c1e170.js',
                    requires: ['item-table-controller', 'item-table-view']
                },
                'item-table-cells': {
                    path: 'item-table-cells.c3822ac3.js',
                    requires: ['util-relative-time', 'element-coins', 'element-item']
                },
                'item-table-controller': {
                    path: 'item-table-controller.7ef46132.js',
                    requires: ['sts-request']
                },
                'item-table-data': {
                    path: 'item-table-data.8b5e3d49.js'
                },
                'item-table-outer': {
                    path: 'item-table-outer.5d0d4e05.js',
                    requires: ['util-optional', 'item-table-data']
                },
                'item-table-view': {
                    path: 'item-table-view.e91158e2.js',
                    requires: ['util-optional', 'util-text-keys', 'item-table-data', 'item-table-cells', 'item-table-viewport', 'item-table-outer', 'css-item-table', 'css-spinner']
                },
                'item-table-viewport': {
                    path: 'item-table-viewport.45928610.js'
                },
                'util-relative-time': {
                    path: 'util-relative-time.29b38abd.js',
                    requires: ['base']
                }
            }
        },
        'Public/components/tabs/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/components/tabs/',
            base: '/components/tabs/',
            modules: {
                'component-tabs': {
                    path: 'component-tabs.4dcf0be.js',
                    requires: ['css-tabs']
                }
            }
        },
        'Public/gen/gw2/shared/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/gw2/shared/',
            base: '/gen/gw2/shared/',
            modules: {
                'micro-gw2-maintenance': {
                    path: 'micro-gw2-maintenance.gen.24c6abad.js',
                    requires: ['template']
                },
                'micro-gw2-unauthorized': {
                    path: 'micro-gw2-unauthorized.gen.9c879de1.js',
                    requires: ['template']
                },
                'css-gw2': {
                    path: 'gw2.eef29bce.css',
                    type: 'css'
                },
                'css-maintenance': {
                    path: 'maintenance.e0265fc.css',
                    type: 'css'
                },
                'css-popup': {
                    path: 'popup.7a38e3ce.css',
                    type: 'css'
                },
                'css-unauthorized': {
                    path: 'unauthorized.a4c12be1.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/shared/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/shared/',
            base: '/gen/shared/',
            modules: {
                'micro-gw2-maintenance': {
                    path: 'micro-gw2-maintenance.gen.24c6abad.js',
                    requires: ['template']
                },
                'micro-gw2-unauthorized': {
                    path: 'micro-gw2-unauthorized.gen.9c879de1.js',
                    requires: ['template']
                }
            }
        },
        'Public/gw2/elements/coins-mithril/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gw2/elements/coins-mithril/',
            base: '/gw2/elements/coins-mithril/',
            modules: {
                'element-coins': {
                    path: 'coins.664cd3db.js',
                    requires: ['util-optional', 'css-coins']
                }
            }
        },
        'Public/gw2/elements/item-mithril/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gw2/elements/item-mithril/',
            base: '/gw2/elements/item-mithril/',
            modules: {
                'element-item': {
                    path: 'item.4bfb1f0e.js',
                    requires: ['gw2-enums', 'util-optional', 'util-text-keys', 'css-item']
                }
            }
        },
        'Public/gw2/native/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gw2/native/',
            base: '/gw2/native/',
            modules: {
                'native-api-ime': {
                    path: 'native-api-ime.db7d1c64.js',
                    requires: ['native-stats']
                },
                'native-call': {
                    path: 'native-call.3ef1c77d.js',
                    requires: ['promise']
                },
                'native-scale': {
                    path: 'native-scale.e33473c0.js',
                    condition: {
                        test: function() {
                            'use strict';
                            return window.self === window.top
                        }
                    }
                },
                'native-stats': {
                    path: 'native-stats.95bc58fa.js',
                    requires: ['event-custom-base']
                }
            }
        },
        'Public/gw2/prompt/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gw2/prompt/',
            base: '/gw2/prompt/',
            modules: {
                prompt: {
                    path: 'prompt.66ec51f5.js',
                    requires: ['css-prompt']
                }
            }
        },
        'Public/gw2/shared/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gw2/shared/',
            base: '/gw2/shared/',
            modules: {
                'account-status': {
                    path: 'account-status.d8a01bcd.js',
                    requires: ['event', 'sts-request']
                },
                'gw2-enums': {
                    path: 'gw2-enums.ae4846b3.js'
                },
                'number-floater-plugin': {
                    path: 'number-floater-plugin.62edd1d6.js',
                    requires: ['plugin', 'base', 'node', 'transition']
                },
                'old-build': {
                    path: 'old-build.55f68cd.js',
                    requires: ['node', 'micro-gw2-maintenance', 'css-maintenance'],
                    condition: {
                        trigger: 'unauthorized',
                        when: 'before',
                        test: function(e) {
                            'use strict';
                            return GW2.config.options.buildId > 0
                        }
                    }
                },
                unauthorized: {
                    path: 'unauthorized.5487c790.js',
                    requires: ['sts-userinfo', 'sts-request', 'css-unauthorized', 'micro-gw2-unauthorized']
                }
            }
        },
        'Public/gw2/sts/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gw2/sts/',
            base: '/gw2/sts/',
            modules: {
                'sts-http': {
                    path: 'sts-http.2c0f056e.js',
                    requires: ['io-base', 'promise']
                },
                'sts-request-jssrv': {
                    path: 'sts-request-jssrv.e2ecad50.js',
                    requires: ['promise', 'sts-http', 'native-stats'],
                    condition: {
                        trigger: 'sts-request',
                        when: 'after',
                        test: function(e) {
                            'use strict';
                            return !window.native || window.native.stubbed || !GW2.config.features.cliGate
                        }
                    }
                },
                'sts-request-native': {
                    path: 'sts-request-native.b112dfce.js',
                    requires: ['promise'],
                    condition: {
                        trigger: 'sts-request',
                        when: 'after',
                        test: function(e) {
                            'use strict';
                            return window.native && !window.native.stubbed && GW2.config.features.cliGate
                        }
                    }
                },
                'sts-request': {
                    path: 'sts-request.790f31dc.js',
                    requires: ['promise']
                },
                'sts-userinfo': {
                    path: 'sts-userinfo.30634749.js',
                    requires: ['sts-request']
                }
            }
        },
        'Public/gw2/util/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gw2/util/',
            base: '/gw2/util/',
            modules: {
                'util-coins': {
                    path: 'util-coins.eb6c6eec.js',
                    requires: ['node-base']
                },
                'util-optional': {
                    path: 'util-optional.4ac96bc6.js'
                },
                'util-restricted': {
                    path: 'util-restricted.bbaa678d.js'
                },
                'util-text-keys': {
                    path: 'util-text-keys.fde9fbda.js'
                }
            }
        },
        'Public/sections/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/sections/',
            base: '/sections/',
            modules: {
                browse: {
                    path: 'browse.45bb6fb8.js',
                    requires: ['app-state', 'gw2-enums', 'filter-types', 'navigation', 'util-items']
                },
                sell: {
                    path: 'sell.ee4b7b75.js',
                    requires: ['sts-request', 'gw2-enums', 'util-items', 'navigation']
                },
                transactions: {
                    path: 'transactions.277e6bc1.js',
                    requires: ['app-state', 'navigation', 'sts-request', 'util-items']
                }
            }
        },
        'Public/sections/home/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/sections/home/',
            base: '/sections/home/',
            modules: {
                home: {
                    path: 'home.26973bb6.js',
                    requires: ['util-items', 'util-optional', 'transactions', 'element-item', 'css-home']
                }
            }
        },
        'Public/sections/order/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/sections/order/',
            base: '/sections/order/',
            modules: {
                'extension-last-viewed': {
                    path: 'extension-last-viewed.2c04e5de.js',
                    requires: ['array-extras', 'promise', 'util-text-keys']
                },
                'model-coins': {
                    path: 'model-coins.94889085.js',
                    requires: ['base-build', 'model']
                },
                'model-listings': {
                    path: 'model-listings.dd2fbc28.js',
                    requires: ['base-build', 'model', 'sts-request']
                },
                'model-orderstate': {
                    path: 'model-orderstate.69edf2b1.js',
                    requires: ['base-build', 'model', 'gw2-enums', 'sts-request', 'util-coins', 'element-coins', 'model-coins', 'model-listings', 'extension-last-viewed', 'util-items']
                },
                'view-order': {
                    path: 'view-order.cd217285.js',
                    requires: ['base-build', 'view', 'node', 'prompt', 'sts-request', 'util-coins', 'util-optional', 'util-restricted', 'model-orderstate', 'element-item', 'element-coins', 'css-order', 'css-spinner']
                }
            }
        },
        'Public/shared/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/shared/',
            base: '/shared/',
            modules: {
                'filter-types': {
                    path: 'filter-types.1dcc267f.js',
                    requires: ['gw2-enums']
                },
                navigation: {
                    path: 'navigation.14730b90.js'
                },
                'util-items': {
                    path: 'util-items.16bf3f1d.js',
                    requires: ['sts-request', 'util-text-keys', 'account-status']
                }
            }
        },
        'Public/gen/app/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/app/',
            base: '/gen/app/',
            modules: {
                'css-app': {
                    path: 'app.3fa2d30.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/components/balance/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/components/balance/',
            base: '/gen/components/balance/',
            modules: {
                'css-balance': {
                    path: 'balance.abc45a84.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/components/breadcrumbs/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/components/breadcrumbs/',
            base: '/gen/components/breadcrumbs/',
            modules: {
                'css-breadcrumbs': {
                    path: 'breadcrumbs.ad5a58de.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/components/categories/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/components/categories/',
            base: '/gen/components/categories/',
            modules: {
                'css-categories': {
                    path: 'categories.cb10d2c.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/components/delivery-box/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/components/delivery-box/',
            base: '/gen/components/delivery-box/',
            modules: {
                'css-delivery': {
                    path: 'delivery.f6db1130.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/components/filters/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/components/filters/',
            base: '/gen/components/filters/',
            modules: {
                'css-filters': {
                    path: 'filters.f1c64753.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/components/item-table/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/components/item-table/',
            base: '/gen/components/item-table/',
            modules: {
                'css-item-table': {
                    path: 'item-table.49161e66.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/components/tabs/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/components/tabs/',
            base: '/gen/components/tabs/',
            modules: {
                'css-tabs': {
                    path: 'tabs.f820b67d.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/gw2/button/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/gw2/button/',
            base: '/gen/gw2/button/',
            modules: {
                'css-button': {
                    path: 'button.fe591a11.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/gw2/elements/coins-mithril/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/gw2/elements/coins-mithril/',
            base: '/gen/gw2/elements/coins-mithril/',
            modules: {
                'css-coins': {
                    path: 'coins.5d5fe9e8.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/gw2/elements/gems-mithril/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/gw2/elements/gems-mithril/',
            base: '/gen/gw2/elements/gems-mithril/',
            modules: {
                'css-gems': {
                    path: 'gems.96260939.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/gw2/elements/item-mithril/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/gw2/elements/item-mithril/',
            base: '/gen/gw2/elements/item-mithril/',
            modules: {
                'css-item': {
                    path: 'item.dc697460.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/gw2/prompt/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/gw2/prompt/',
            base: '/gen/gw2/prompt/',
            modules: {
                'css-prompt': {
                    path: 'prompt.efaf52e8.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/gw2/scroller/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/gw2/scroller/',
            base: '/gen/gw2/scroller/',
            modules: {
                'css-scroller': {
                    path: 'scroller.52ae65fc.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/gw2/spinner/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/gw2/spinner/',
            base: '/gen/gw2/spinner/',
            modules: {
                'css-spinner': {
                    path: 'spinner.8eee23c5.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/sections/home/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/sections/home/',
            base: '/gen/sections/home/',
            modules: {
                'css-home': {
                    path: 'home.e444b443.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/sections/order/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/sections/order/',
            base: '/gen/sections/order/',
            modules: {
                'css-order': {
                    path: 'order.7fc4e6b4.css',
                    type: 'css'
                }
            }
        },
        'Public/gen/shared/less/': {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gen/shared/less/',
            base: '/gen/shared/less/',
            modules: {
                'css-grid': {
                    path: 'grid.a5c221b6.css',
                    type: 'css'
                }
            }
        },
        ejsBase: {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/services/combo/js/',
            base: '/services/combo/js/',
            modules: {
                'ejs-base': {
                    path: 'ejs-base.js',
                    requires: ['yui-base', 'escape']
                }
            }
        },
        'template://': {
            combine: !0,
            root: '',
            base: '/combo/_',
            patterns: {
                'template://': {
                    configFn: function(e) {
                        'use strict';
                        var t = e.name.replace(e.group, '/').replace('.ejs', '');
                        e.path = t + (tp_config.hash ? '/' + tp_config.hash : '') + '.ejs', e.requires = ['ejs-base']
                    }
                }
            }
        },
        'i18n://': {
            combine: !0,
            root: '',
            base: '/combo/_',
            patterns: {
                'i18n://': {
                    configFn: function(e) {
                        'use strict';
                        var t = tp_config.pageLang,
                            s = e.name.replace(e.group, '/');
                        t || (t = tp_config.pageLang = document.documentElement.lang), e.path = '/' + t + s + (tp_config.hash ? '/' + tp_config.hash : '') + '.i18n'
                    }
                }
            }
        },
        raw: {
            combine: !0,
            comboBase: 'https://2tradingpost.staticwars.com/combo/_',
            root: '/gw2/',
            base: '/gw2/',
            modules: {
                button: {
                    path: 'button/button.bc5b6f51.js',
                    requires: ['css-button']
                },
                throttle: {
                    path: 'scroller/throttle.b690bcbf.js'
                },
                scroller: {
                    path: 'scroller/scroller.961bc304.js',
                    requires: ['throttle', 'css-scroller']
                }
            }
        }
    }
};
GW2.configs.push(tp_config)
GW2.start("css-gw2", "app-ntp");