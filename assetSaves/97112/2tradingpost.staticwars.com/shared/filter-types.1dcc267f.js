YUI.add("filter-types", function(a) {
    "use strict";
    var e = a.namespace("GW2");
    e.armorstats = ["power", "precision", "toughness", "vitality", "criticaldamage", "healing", "conditiondamage", "defense"], e.weaponstats = ["power", "precision", "toughness", "vitality", "criticaldamage", "healing", "conditiondamage", "attackpowermin", "attackpowermax"], e.FilterOptions = {
        weaponstats1: e.weaponstats,
        weaponstats2: e.weaponstats,
        weaponstats3: e.weaponstats,
        armorstats1: e.armorstats,
        armorstats2: e.armorstats,
        armorstats3: e.armorstats,
        discipline: ["huntsman", "cook", "enchanter", "jeweler", "leatherworker", "tailor", "weaponsmith", "armorsmith", "scribe"]
    }, e.professionMappings = {
        armor: {
            guardian: "Heavy",
            necro: "Light",
            engineer: "Medium",
            elemental: "Light",
            thief: "Medium",
            warrior: "Heavy",
            mesmer: "Light",
            ranger: "Medium",
            revenant: "Heavy"
        },
        weapon: {
            guardian: ["sword", "hammer", "greatsword", "staff", "mace", "scepter", "focus", "shield", "torch", "harpoon", "trident"],
            necro: ["staff", "scepter", "axe", "dagger", "focus", "warhorn", "harpoon", "trident"],
            engineer: ["rifle", "pistol", "shield", "speargun"],
            elemental: ["staff", "scepter", "dagger", "focus", "trident"],
            thief: ["sword", "bowshort", "dagger", "pistol", "harpoon", "speargun"],
            warrior: ["hammer", "greatsword", "bowlong", "rifle", "axe", "sword", "mace", "shield", "warhorn", "harpoon", "speargun"],
            mesmer: ["greatsword", "staff", "scepter", "sword", "focus", "pistol", "torch", "harpoon", "trident"],
            ranger: ["greatsword", "bowlong", "bowshort", "sword", "axe", "dagger", "torch", "warhorn", "harpoon", "speargun"],
            revenant: ["mace", "sword", "axe", "hammer", "staff", "harpoon"]
        }
    }, e.FilterAttributes = {
        armorsmith: "MinRatingArmorsmith",
        cook: "MinRatingCook",
        enchanter: "MinRatingEnchanter",
        huntsman: "MinRatingHuntsman",
        jeweler: "MinRatingJeweler",
        leatherworker: "MinRatingLeatherworker",
        tailor: "MinRatingTailor",
        weaponsmith: "MinRatingWeaponsmith",
        scribe: "MinRatingFabricator",
        power: "Power",
        precision: "Precision",
        toughness: "Toughness",
        vitality: "Vitality",
        criticaldamage: "CriticalDamage",
        healing: "Healing",
        conditiondamage: "ConditionDamage",
        agonyresistance: "AgonyResistance",
        bagsize: "BagSize",
        defense: "Defense",
        attackpowermin: "AttackPowerMin",
        attackpowermax: "AttackPowerMax"
    }, e.FilterCategories = {
        sell: ["text", "rarity", "level"],
        transactions: ["text", "rarity", "level"],
        null: ["text", "rarity", "level", "available"],
        armor: ["text", "armorstats1", "armorstats2", "armorstats3", "profession", "rarity", "level", "available"],
        bags: ["text", "bagsize", "rarity", "level", "available"],
        craftingmaterial: ["text", "discipline", "rarity", "level", "available"],
        other: ["text", "rarity", "level", "available"],
        skins: ["text", "rarity", "available"],
        upgradecomponent: ["text", "rarity", "level", "available"],
        weapon: ["text", "weaponstats1", "weaponstats2", "weaponstats3", "profession", "rarity", "level", "available"]
    }
}, "@VERSION@", {
    requires: ["gw2-enums"]
});