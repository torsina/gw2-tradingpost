YUI.add("navigation", function(o) {
    "use strict";
    var a = o.namespace("navigation");
    a.browse = {
        armor: {
            noSubCat: {
                armor: [],
                trinket: [],
                back: []
            },
            coat: {
                armor: ["coat"]
            },
            leggings: {
                armor: ["leggings"]
            },
            gloves: {
                armor: ["gloves"]
            },
            helm: {
                armor: ["helm"]
            },
            helmaquatic: {
                armor: ["helmaquatic"]
            },
            boots: {
                armor: ["boots"]
            },
            shoulders: {
                armor: ["shoulders"]
            },
            back: {
                back: []
            },
            accessory: {
                trinket: ["accessory"]
            },
            amulet: {
                trinket: ["amulet"]
            },
            ring: {
                trinket: ["ring"]
            }
        },
        weapon: {
            noSubCat: {
                weapon: []
            },
            axe: {
                weapon: ["axe"]
            },
            dagger: {
                weapon: ["dagger"]
            },
            focus: {
                weapon: ["focus"]
            },
            greatsword: {
                weapon: ["greatsword"]
            },
            hammer: {
                weapon: ["hammer"]
            },
            bowlong: {
                weapon: ["bowlong"]
            },
            sword: {
                weapon: ["sword"]
            },
            bowshort: {
                weapon: ["bowshort"]
            },
            mace: {
                weapon: ["mace"]
            },
            pistol: {
                weapon: ["pistol"]
            },
            rifle: {
                weapon: ["rifle"]
            },
            scepter: {
                weapon: ["scepter"]
            },
            staff: {
                weapon: ["staff"]
            },
            torch: {
                weapon: ["torch"]
            },
            warhorn: {
                weapon: ["warhorn"]
            },
            shield: {
                weapon: ["shield"]
            },
            harpoon: {
                weapon: ["harpoon"]
            },
            speargun: {
                weapon: ["speargun"]
            },
            trident: {
                weapon: ["trident"]
            }
        },
        upgradecomponent: {
            noSubCat: {
                upgradecomponent: []
            },
            upgradeweapon: {
                upgradecomponent: ["weapon"]
            },
            upgradearmor: {
                upgradecomponent: ["armor"]
            },
            infusion: {
                category: {
                    upgradecomponent: ["infusion"]
                },
                InfusionFlags: ["Infusion"]
            },
            trinket: {
                category: {
                    upgradecomponent: ["infusion", "trinket"]
                },
                InfusionFlags: []
            }
        },
        skins: {
            noSubCat: {
                consumable: ["transmutation"]
            },
            armorskins: {
                category: {
                    consumable: ["transmutation"]
                },
                ConsumableTransmutations: ["Armor", "Back"]
            },
            weaponskins: {
                category: {
                    consumable: ["transmutation"]
                },
                ConsumableTransmutations: ["Weapon"]
            }
        },
        craftingmaterial: {
            noSubCat: {
                craftingmaterial: [],
                trophy: []
            },
            materials: {
                craftingmaterial: []
            },
            salvage: {
                category: {
                    trophy: []
                },
                Attributes: {
                    salvageable: {
                        exact: 1
                    }
                }
            },
            recipes: {
                category: {
                    consumable: ["unlock"]
                },
                ConsumableUnlocks: ["CraftingRecipe"]
            }
        },
        other: {
            noSubCat: {
                container: [],
                minipet: [],
                gizmo: ["default"],
                consumable: ["booze", "food", "generic", "unlock", "utility"]
            },
            food: {
                consumable: ["booze", "food"]
            },
            utility: {
                consumable: ["utility"]
            },
            container: {
                container: []
            },
            minis: {
                minipet: []
            },
            dyes: {
                category: {
                    consumable: ["unlock"]
                },
                ConsumableUnlocks: ["Dye"]
            },
            misc: {
                consumable: ["generic"],
                gizmo: ["default"]
            }
        },
        bags: {
            noSubCat: {
                bag: []
            }
        }
    }, a.transactions = {
        current: {
            noSubCat: {
                category: {
                    current: []
                }
            },
            buy: {
                category: {
                    current: ["buy"]
                }
            },
            sell: {
                category: {
                    current: ["sell"]
                }
            }
        },
        history: {
            noSubCat: {
                category: {
                    history: []
                }
            },
            buy: {
                category: {
                    history: ["buy"]
                }
            },
            sell: {
                category: {
                    history: ["sell"]
                }
            }
        }
    }, a.sell = {}
}, "@VERSION@");