class Item {
    constructor(name, amount = 1){
        this.name = name;
        this.amount = amount;
    }
}

Item.prototype.valueOf = function(){
    console.log(this.name)
    return this.name;
}

Item.prototype.toString = function(){
    return this.name;
}

class ItemList {
    constructor(){
        this.items = {};
    }
}

ItemList.prototype.addItem = function(item){
    if(this.items[item.name] == undefined){
        this.items[item.name] = item.amount;
    }
    else{
        this.items[item.name] += item.amount;
    }
}

ItemList.prototype.extend = function(otherList){
    for(const [key, value] of Object.entries(otherList.items)) {
        this.addItem(new Item(key, value));
    }
}

let lang = {
    "steel_casing": "Steel Casing",
    "steel": "Steel Ingot",
    "energized_osmium": "Energized Osmium",
    "machine_block": "Machine Block",
    "atomic_alloy": "Atomic Alloy",
    "stoneburnt": "Stoneburnt",
    "quartzburnt": "Quartzburnt",
    "machine_frame": "Machine Frame",
    "seared_brick": "Seared Brick",
    "stone": "Stone",
    "cobblestone": "Cobblestone",
    "sand": "Sand",
    "clay": "Clay",
    "gravel": "Gravel",
    "grout": "Grout",
    "quartz": "Nether Quartz",
    "coal": "Coal",
    "coal_block": "Coal Block",
    "red_coal": "Red Coal",
    "rf_powder": "RF Powder",
    "gp_powder": "GP Powder",
    "tin_gear": "Tin Gear",
    "tin": "Tin",
    "copper": "Copper",
    "nickel": "Nickel",
    "iron": "Iron",
    "copper_gear": "Copper Gear",
    "resonating_orb": "Resonating Orb",
    "simple_machine_chassis": "Simple Machine Chassis",
    "industrial_machine_chassis": "Industrial Machine Chassis",
    "red_alloy": "Red Alloy",
    "conductive_iron": "Conductive Iron",
    "pulsating_iron": "Pulsating Iron",
    "ender_pearl": "Ender Pearl",
    "soul_machine_chassis": "Soul Machine Chassis",
    "enhanced_machine_chassis": "Enhanced Machine Chassis",
    "energized_dark_ingot": "Energized Dark Ingot",
    "grains_of_infinity": "Grains of Infinity",
    "industrial_dye_blend": "Industrial Dye Blend",
    "dark_steel": "Dark Steel"
}

function getLang(id){
    return lang[id] || id;
}

let recipes = {
    "steel_casing": [
        new Item("steel", 8),
        new Item("energized_osmium")
    ],
    "machine_block": [
        new Item("steel_casing"),
        new Item("atomic_alloy", 2),
        new Item("stoneburnt", 6)
    ],
    "machine_frame": [
        new Item("machine_block"),
        new Item("rf_powder", 2),
        new Item("seared_brick", 4),
        new Item("tin_gear", 2)
    ],
    "simple_machine_chassis": [
        new Item("machine_frame"),
        new Item("energized_dark_ingot", 4),
        new Item("grains_of_infinity", 4)
    ],
    "industrial_machine_chassis": [
        new Item("simple_machine_chassis"),
        new Item("industrial_dye_blend", 4),
        new Item("dark_steel", 4)
    ]
}

function makeIngredient(itemName, itemCount){
    itemName = getLang(itemName)

    let holder = document.createElement("li");
    holder.className = "list-group-item d-flex justify-content-between lh-sm";

    let name = document.createElement("h6");
    name.className = "my-0 pe-5";
    name.innerHTML = "&nbsp;&nbsp;&nbsp;" + itemName;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    let count = document.createElement("span");
    count.className = "text-body-secondary";
    count.innerHTML = itemCount;

    holder.appendChild(checkbox);
    holder.appendChild(name);
    holder.appendChild(count);

    return holder;
}

function getIngredients(ingredient){
    if (recipes[ingredient.name] != undefined){
        let subIngredients = recipes[ingredient.name];
        let ingredients = new ItemList();

        for(let i = 0; i < subIngredients.length; i++){
            console.log(subIngredients[i].name)
            ingredients.extend(getIngredients(subIngredients[i]));
        }

        return ingredients;
    }

    else {
        let items = new ItemList;
        items.addItem(ingredient);
        
        return items;
    }
}

function main(){
    console.log("Loading javascript");

    let ingredientsList = document.getElementById("ingredients");

    let casingsType = "industrial_machine_chassis";
    
    let ingredientsForCasing = new ItemList();

    for(let i = 0; i < 15; i++){
        ingredientsForCasing.extend(getIngredients(new Item(casingsType)));
    }

    console.log(ingredientsForCasing)

    for (const [key, value] of Object.entries(ingredientsForCasing.items)){
        let newIngredient = makeIngredient(key, value);
        ingredientsList.appendChild(newIngredient);
    }


    console.log("Finished loading javascript");
}