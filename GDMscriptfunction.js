
	var jsonData


function Roll(numRolls, category, table){
	 // Now you can use the 'data' in your Roll function
let url = `https://astrangeaeon.github.io/GDMPlazaGenerator/${table}.json`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Log the 'data' variable to inspect its contents

		jsonData = data;
		   console.log('Fetched JSON data:', jsonData);
		   
		   //console.log("store category = "+jsonData.stores[0].Type);
		   
		   //Get total number of Store Types + select random store type
	var totalStoreTypes = Object.keys(jsonData[category]).length;
		   var d6=Math.floor(Math.random() * numRolls);
		   d6=d6+1;
		   //put here to remove when button pressed with innerhtml
		   // Get random info for each NumRolls
		   for (let i = 1; i <= d6; i++) {
 
			   var selectedStoreType = getRandomInt(totalStoreTypes);
			   // Check if the selectedStoreType index exists
    if (!jsonData[category][selectedStoreType]) {
      console.error(`Selected store type '${selectedStoreType}' not found in data.`);
      continue;  // Skip to the next iteration if the store type is not found
    }
	// Check if the 'storeNames' property exists in the selected store type
    if (!jsonData[category][selectedStoreType].names) {
      console.error(`'names' property not found in the selected store type.`);
      continue;  // Skip to the next iteration if 'names' is not found
    }
			   
			   //Get total number of Store Names + select random store name
			   var totalStoreNames = Object.keys(jsonData[category][selectedStoreType].names).length;
			   var selectedStoreName = getRandomInt(totalStoreNames);
			   
			   //Put the info in the console 
			//	console.log("StoreTypes: "+totalStoreTypes+" // StoreNames: "+totalStoreNames);
			console.log("Selected Store -- "+jsonData[category][selectedStoreType].Type+": "+jsonData[category][selectedStoreType].names[selectedStoreName].Name)
		   var str = ""+jsonData[category][selectedStoreType].Type+": "+jsonData[category][selectedStoreType].names[selectedStoreName].Name
		   		  // var str = document.createTextNode(jsonData[category][selectedStoreType].Type+": "+jsonData[category][selectedStoreType].names[selectedStoreName].Name+"<br />");
			var lineBreak = document.createElement("p");
			lineBreak.textContent=str;
               document.getElementById(category).appendChild(lineBreak);
		   }
		   //how do I make the "we3example2" variable so I can set it with each different button? if I switch it around
		   //it will change what gets generated based on the html, i.e., we3example is stores, we3example2 is plaze feature
		   //also, what gets returned is just one string, not the number of rolls parameter--use appendChild??
      //const numberOfRolls = 2;
      //const categoryOfRoll = "stores";
      //const rollResults = Roll(numberOfRolls, categoryOfRoll, data, "storeNames", "Name");
      // Print the results
    // rollResults.forEach(result => console.log(result));
    });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//Roll(2, "stores", "GDMStoreNames");

/*
 // Now you can use the 'data' in your Roll function
  fetch('https://astrangeaeon.github.io/GDMPlazaGenerator/GDMStoreNames.json')
    .then(response => response.json())
    .then(data => {
      // Log the 'data' variable to inspect its contents
      console.log('Fetched JSON data:', data);

      const numberOfRolls = 2;
      const categoryOfRoll = "stores";
      const jsonData = data;

      const rollResults = Roll(numberOfRolls, categoryOfRoll, data, "storeNames", "Name");

      // Print the results
      rollResults.forEach(result => console.log(result));
    });
*/

/*(() => {
  function Roll(numberOfRolls, categoryOfRoll, jsonData, subcategoryProperty, nameProperty) {
    const category = jsonData[categoryOfRoll];

    if (!category || !Array.isArray(category)) {
      console.error(`Category '${categoryOfRoll}' not found or not an array.`);
      return [];
    }

    const entries = [];

    // Iterate through each store type and collect store names
    category.forEach(storeType => {
      const storeNames = storeType[subcategoryProperty];

      if (storeNames && Array.isArray(storeNames)) {
        entries.push(storeNames);
      }
    });

    if (entries.length === 0) {
      console.error(`No entries found for subcategory '${subcategoryProperty}'.`);
      return [];
    }

    console.log(entries); // Log the entries array for debugging purposes

    // Perform rolls
    const results = [];
    for (let i = 0; i < numberOfRolls; i++) {
      const entry = getRandomEntry(entries.flat(), nameProperty);
	  const categoryName = category.Type; // Add this line to get the category name
  results.push(`${categoryName}: ${entry}`);
    }

    return results;
  }

  // Helper function to randomly select an entry based on probability weights
  function getRandomEntry(entries, property) {
    const totalProbability = entries.reduce((sum, entry) => sum + entry.Probability, 0);
    let randomValue = Math.random() * totalProbability;

    for (const entry of entries) {
      randomValue -= entry.Probability;
      if (randomValue <= 0) {
        return entry[property];
      }
    }
  }

  // Now you can use the 'data' in your Roll function
  fetch('https://astrangeaeon.github.io/GDMPlazaGenerator/GDMStoreNames.json')
    .then(response => response.json())
    .then(data => {
      // Log the 'data' variable to inspect its contents
      console.log('Fetched JSON data:', data);

      const numberOfRolls = 2;
      const categoryOfRoll = "stores";
      const jsonData = data;

      const rollResults = Roll(numberOfRolls, categoryOfRoll, data, "storeNames", "Name");

      // Print the results
      rollResults.forEach(result => console.log(result));
    });
})();

	*/