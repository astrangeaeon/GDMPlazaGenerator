import random

def generate_items(data, item_type, table_suffix, item_table, item_name_table, max_items):
    num_items = random.randint(1, max_items)
    selected_items = []

    for _ in range(num_items):
        item_type = select_entry(item_table, data)
        item_name_table = data.get(f"{item_type.replace(' ', '_')}_{table_suffix}", [])

        if not item_name_table:
            raise ValueError(f"No {table_suffix} table found for {item_type}")

        item_name = select_entry(item_name_table, data)

        if not item_name:
            print(f"Debug: Selected {table_suffix} type {item_type}, Selected {table_suffix} names: {item_name_table}")
            item_name = f"Unknown {table_suffix}"

        selected_items.append((item_type, item_name))

    return selected_items

def load_data(file_path):
    data = {}
    current_table = ""
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            line = line.strip()
            if line.startswith(";"):
                current_table = line[1:]
                data[current_table] = []
            else:
                if ',' in line:
                    weight, entry = line.split(',', 1)
                    data[current_table].append((int(weight), entry.strip()))

    return data


def select_entry(table, data):
    if isinstance(table, str) and table.startswith('[') and table.endswith(']'):
        # If the entry is a reference to another table, recursively call select_entry
        referenced_table = table[1:-1]
        referenced_table_entries = data.get(referenced_table, [])
        return select_entry(referenced_table_entries, data)

    total_weight = sum(weight for weight, _ in table)
    rand = random.randint(1, total_weight)
    for weight, entry in table:
        rand -= weight
        if rand <= 0:
            return entry


def generate_plaza(data):
    corridors_table = data.get("Corridors", [])
    sensory_detail_table = data.get("Sensory_Details", [])
    selected_sensory_detail = select_entry(sensory_detail_table, data)


    sensory_detail_table = data.get("Sensory_Details", [])
    selected_sensory_details = generate_items(data, "Sensory_Detail", "Detail_Names", sensory_detail_table,
                                              sensory_detail_table, 2)

    stores_table = data.get("Store_Types", [])
    selected_stores = generate_items(data, "Store", "Store_Names", stores_table, stores_table, 6)

    trash_table = data.get("Trash_Can", [])
    selected_trash = generate_items(data, "Trash_Category", "Trash_Find", trash_table, trash_table, 2)

    features_table = data.get("Features", [])
    selected_features = generate_items(data, "Feature_Category", "Feature_Details", features_table, features_table, 3)

    other_table = data.get("Other", [])
    selected_other = generate_items(data, "Other_Category", "Other_Details", other_table, other_table, 3)

    oddobject_table = data.get("OddObject", [])
    selected_object = generate_items(data, "Object_Category", "Object_Details", oddobject_table, oddobject_table, 6)

    oddNPC_table = data.get("OddNPC", [])
    selected_NPC = generate_items(data, "NPC_Category", "NPC_Details", oddNPC_table, oddNPC_table, 6)

    corridorclue_table = data.get("CorridorClue", [])
    selected_corridorclue = generate_items(data, "CorridorClue_Category", "CorridorClue_Details", corridorclue_table, corridorclue_table, 3)

    crowd_table = data.get("Crowd", [])
    selected_crowd = generate_items(data, "Crowd_Category", "Crowd_Details", crowd_table, crowd_table, 1)

    condition_table = data.get("Condition", [])
    selected_condition = generate_items(data, "Condition_Category", "Condition_Details", condition_table, condition_table, 1)

    NPCAppearance_table = data.get("NPCAppearance", [])
    selected_NPCAppearance = generate_items(data, "NPCAppearance_Category", "NPCAppearance_Details", NPCAppearance_table, NPCAppearance_table, 6)

    NPCPrice_table = data.get("NPCPrice", [])
    selected_NPCPrice = generate_items(data, "NPCPrice_Category", "NPCPrice_Details", NPCPrice_table, NPCPrice_table, 1)

    NPCKnowledge_table = data.get("NPCKnowledge", [])
    selected_NPCKnowledge = generate_items(data, "NPCKnowledge_Category", "NPCKnowledge_Details", NPCKnowledge_table, NPCKnowledge_table, 1)

    BrokenStore_table = data.get("BrokenStore", [])
    selected_BrokenStore = generate_items(data, "BrokenStore_Category", "BrokenStore_Details", BrokenStore_table, BrokenStore_table, 1)


    num_corridors = random.randint(1, 6)
    selected_corridors = [select_entry(corridors_table, data) for _ in range(num_corridors)]
    # escalator_chance = 25
    # for i in range(num_corridors):
    # if random.randint(1, 100) <= escalator_chance:
    # selected_corridors[i] += " (Escalator)"
    # else:
    # selected_corridors[i] += " (Elevator)"

    selected_sensory_detail = select_entry(sensory_detail_table, data)
    if random.randint(1, 100) <= 25:
        second_sensory_detail = select_entry(sensory_detail_table, data)
        selected_sensory_detail += f", {second_sensory_detail}"




    print(f"\nThe plaza has the following stores:")
    for store_type, store_name in selected_stores:
        print(f"{store_type}: {store_name}")

    print(f"\nOne or two of the stores may be out of business and are:")
    for brokenstore_type, brokenstore_name in selected_BrokenStore:
        print(f"{brokenstore_type}: {brokenstore_name}")

    print(f"\nThe plaza has {num_corridors} corridors:")
    for corridor in selected_corridors:
        print(f"  {corridor}")

    print(f"\nThe plaza's crowd level:")
    for crowd_type, crowd_name in selected_crowd:
        print(f"{crowd_name}")

    print(f"\nThe plaza's condition:")
    for condition_type, condition_name in selected_condition:
        print(f"{condition_name}")

    print(f"\nSome of the corridors might stand out. Here is how:")
    for corridorclue_type, corridorclue_name in selected_corridorclue:
        print(f"{corridorclue_type}: {corridorclue_name}")

    print(f"\nThe plaza has the following sensory details:")
    for detail_type, detail_name in selected_sensory_details:
        print(f"{detail_type}: {detail_name}")

    print(f"\nThe plaza has at least one of the following features:")
    for feature_type, feature_name in selected_features:
        print(f"{feature_type}: {feature_name}")

    print(f"\nThe plaza may have one of the following other things going on:")
    for other_type, other_name in selected_other:
        print(f"{other_type}: {other_name}")

    print(f"\nIf there's a trash can, here is what is in it:")
    for trash_category, trash_find in selected_trash:
        print(f"{trash_category}: {trash_find}")

    print(f"\nIf you need a random odd object, pick one of these:")
    for object_category, object_find in selected_object:
        print(f"{object_category}: {object_find}")

    print(f"\nIf you need a random odd NPC, pick one of these or consider making them a group:")
    for NPC_category, NPC_find in selected_NPC:
        print(f"{NPC_category}: {NPC_find}")

    print(f"\nIf you need a few details to help describe an Odd NPC, use one of these:")
    for NPCAppearance_category, NPCAppearance_find in selected_NPCAppearance:
        print(f"{NPCAppearance_category}: {NPCAppearance_find}")

    print(f"\nThere's a chance an NPC knows something useful about the Mall. If they do, they:")
    for NPCPrice_category, NPCPrice_find in selected_NPCPrice:
        print(f"{NPCPrice_find}")

    print(f"\nTheir knowledge concerns:")
    for NPCKnowledge_category, NPCKnowledge_find in selected_NPCKnowledge:
        print(f"{NPCKnowledge_category}: {NPCKnowledge_find}")



if __name__ == "__main__":
    data_file_path = "C:\\Users\\Chris\\GreenDawnMallPlazasample4.txt"  # Replace with the actual path to your data file
    plaza_data = load_data(data_file_path)
    generate_plaza(plaza_data)


