function generate_items(data, item_type, table_suffix, item_table, item_name_table, max_items) {
    var num_items = Math.floor(Math.random() * (max_items - 1 + 1)) + 1;
    var selected_items = [];
    for (var i = 0; i < num_items; i++) {
        var item_type = select_entry(item_table, data);
        var item_name_table = data[`${item_type.replace(' ', '_')}_${table_suffix}`] || [];
        if (!item_name_table.length) {
            throw new Error(`No ${table_suffix} table found for ${item_type}`);
        }
        var item_name = select_entry(item_name_table, data);
        if (!item_name) {
            console.log(`Debug: Selected ${table_suffix} type ${item_type}, Selected ${table_suffix} names: ${item_name_table}`);
            item_name = `Unknown ${table_suffix}`;
        }
        selected_items.push([item_type, item_name]);
    }
    return selected_items;
}

function load_data(file_path) {
    var data = {};
    var current_table = "";
    var fs = require('fs');
    var file = fs.readFileSync(file_path, 'utf-8');
    var lines = file.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if (line.startsWith(";")) {
            current_table = line.slice(1);
            data[current_table] = [];
        } else {
            if (line.includes(',')) {
                var [weight, entry] = line.split(',', 2);
                data[current_table].push([parseInt(weight), entry.trim()]);
            }
        }
    }
    return data;
}

function select_entry(table, data) {
    if (typeof table === 'string' && table.startsWith('[') && table.endsWith(']')) {
        var referenced_table = table.slice(1, -1);
        var referenced_table_entries = data[referenced_table] || [];
        return select_entry(referenced_table_entries, data);
    }
    var total_weight = table.reduce((acc, [weight, _]) => acc + weight, 0);
    var rand = Math.floor(Math.random() * (total_weight - 1 + 1)) + 1;
    for (var i = 0; i < table.length; i++) {
        var [weight, entry] = table[i];
        rand -= weight;
        if (rand <= 0) {
            return entry;
        }
    }
}

function generate_plaza(data) {
    var corridors_table = data["Corridors"] || [];
    var sensory_detail_table = data["Sensory_Details"] || [];
    var selected_sensory_detail = select_entry(sensory_detail_table, data);
    sensory_detail_table = data["Sensory_Details"] || [];
    var selected_sensory_details = generate_items(data, "Sensory_Detail", "Detail_Names", sensory_detail_table, sensory_detail_table, 2);
    var stores_table = data["Store_Types"] || [];
    var selected_stores = generate_items(data, "Store", "Store_Names", stores_table, stores_table, 6);
    var trash_table = data["Trash_Can"] || [];
    var selected_trash = generate_items(data, "Trash_Category", "Trash_Find", trash_table, trash_table, 2);
    var features_table = data["Features"] || [];
    var selected_features = generate_items(data, "Feature_Category", "Feature_Details", features_table, features_table, 3);
    var other_table = data["Other"] || [];
    var selected_other = generate_items(data, "Other_Category", "Other_Details", other_table, other_table, 3);
    var oddobject_table = data["OddObject"] || [];
    var selected_object = generate_items(data, "Object_Category", "Object_Details", oddobject_table, oddobject_table, 6);
    var oddNPC_table = data["OddNPC"] || [];
    var selected_NPC = generate_items(data, "NPC_Category", "NPC_Details", oddNPC_table, oddNPC_table, 6);
    var corridorclue_table = data["CorridorClue"] || [];
    var selected_corridorclue = generate_items(data, "CorridorClue_Category", "CorridorClue_Details", corridorclue_table, corridorclue_table, 3);
    var crowd_table = data["Crowd"] || [];
    var selected_crowd = generate_items(data, "Crowd_Category", "Crowd_Details", crowd_table, crowd_table, 1);
    var condition_table = data["Condition"] || [];
    var selected_condition = generate_items(data, "Condition_Category", "Condition_Details", condition_table, condition_table, 1);
    var NPCAppearance_table = data["NPCAppearance"] || [];
    var selected_NPCAppearance = generate_items(data, "NPCAppearance_Category", "NPCAppearance_Details", NPCAppearance_table, NPCAppearance_table, 6);
    var NPCPrice_table = data["NPCPrice"] || [];
    var selected_NPCPrice = generate_items(data, "NPCPrice_Category", "NPCPrice_Details", NPCPrice_table, NPCPrice_table, 1);
    var NPCKnowledge_table = data["NPCKnowledge"] || [];
    var selected_NPCKnowledge = generate_items(data, "NPCKnowledge_Category", "NPCKnowledge_Details", NPCKnowledge_table, NPCKnowledge_table, 1);
    var BrokenStore_table = data["BrokenStore"] || [];
    var selected_BrokenStore = generate_items(data, "BrokenStore_Category", "BrokenStore_Details", BrokenStore_table, BrokenStore_table, 1);
    var num_corridors = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    var selected_corridors = [];
    for (var i = 0; i < num_corridors; i++) {
        selected_corridors.push(select_entry(corridors_table, data));
    }
    
    selected_sensory_detail = select_entry(sensory_detail_table, data);
    if (Math.floor(Math.random() * (100 - 1 + 1)) + 1 <= 25) {
        var second_sensory_detail = select_entry(sensory_detail_table, data);
        selected_sensory_detail += `, ${second_sensory_detail}`;
    }
    console.log("\nThe plaza has the following stores:");
    for (var i = 0; i < selected_stores.length; i++) {
        var [store_type, store_name] = selected_stores[i];
        console.log(`${store_type}: ${store_name}`);
    }
    console.log("\nOne or two of the stores may be out of business and are:");
    for (var i = 0; i < selected_BrokenStore.length; i++) {
        var [brokenstore_type, brokenstore_name] = selected_BrokenStore[i];
        console.log(`${brokenstore_type}: ${brokenstore_name}`);
    }
    console.log(`\nThe plaza has ${num_corridors} corridors:`);
    for (var i = 0; i < selected_corridors.length; i++) {
        var corridor = selected_corridors[i];
        console.log(`  ${corridor}`);
    }
    console.log("\nThe plaza's crowd level:");
    for (var i = 0; i < selected_crowd.length; i++) {
        var [crowd_type, crowd_name] = selected_crowd[i];
        console.log(`${crowd_name}`);
    }
    console.log("\nThe plaza's condition:");
    for (var i = 0; i < selected_condition.length; i++) {
        var [condition_type, condition_name] = selected_condition[i];
        console.log(`${condition_name}`);
    }
    console.log("\nSome of the corridors might stand out. Here is how:");
    for (var i = 0; i < selected_corridorclue.length; i++) {
        var [corridorclue_type, corridorclue_name] = selected_corridorclue[i];
        console.log(`${corridorclue_type}: ${corridorclue_name}`);
    }
    console.log("\nThe plaza has the following sensory details:");
    for (var i = 0; i < selected_sensory_details.length; i++) {
        var [detail_type, detail_name] = selected_sensory_details[i];
        console.log(`${detail_type}: ${detail_name}`);
    }
    console.log("\nThe plaza has at least one of the following features:");
    for (var i = 0; i < selected_features.length; i++) {
        var [feature_type, feature_name] = selected_features[i];
        console.log(`${feature_type}: ${feature_name}`);
    }
    console.log("\nThe plaza may have one of the following other things going on:");
    for (var i = 0; i < selected_other.length; i++) {
        var [other_type, other_name] = selected_other[i];
        console.log(`${other_type}: ${other_name}`);
    }
    console.log("\nIf there's a trash can, here is what is in it:");
    for (var i = 0; i < selected_trash.length; i++) {
        var [trash_category, trash_find] = selected_trash[i];
        console.log(`${trash_category}: ${trash_find}`);
    }
    console.log("\nIf you need a random odd object, pick one of these:");
    for (var i = 0; i < selected_object.length; i++) {
        var [object_category, object_find] = selected_object[i];
        console.log(`${object_category}: ${object_find}`);
    }
    console.log("\nIf you need a random odd NPC, pick one of these or consider making them a group:");
    for (var i = 0; i < selected_NPC.length; i++) {
        var [NPC_category, NPC_find] = selected_NPC[i];
        console.log(`${NPC_category}: ${NPC_find}`);
    }
    console.log("\nIf you need a few details to help describe an Odd NPC, use one of these:");
    for (var i = 0; i < selected_NPCAppearance.length; i++) {
        var [NPCAppearance_category, NPCAppearance_find] = selected_NPCAppearance[i];
        console.log(`${NPCAppearance_category}: ${NPCAppearance_find}`);
    }
    console.log("\nThere's a chance an NPC knows something useful about the Mall. If they do, they:");
    for (var i = 0; i < selected_NPCPrice.length; i++) {
        var [NPCPrice_category, NPCPrice_find] = selected_NPCPrice[i];
        console.log(`${NPCPrice_find}`);
    }
    console.log("\nTheir knowledge concerns:");
    for (var i = 0; i < selected_NPCKnowledge.length; i++) {
        var [NPCKnowledge_category, NPCKnowledge_find] = selected_NPCKnowledge[i];
        console.log(`${NPCKnowledge_category}: ${NPCKnowledge_find}`);
    }
}

var data_file_path = "https://astrangeaeon.github.io/GDMPlazaGenerator/python/GreenDawnMallPlazasample4.txt";
var fs = require('fs');
var plaza_data = load_data(data_file_path);
generate_plaza(plaza_data);


