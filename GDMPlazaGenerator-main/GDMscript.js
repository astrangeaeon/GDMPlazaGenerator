var jsonData

function fetchData(table) {
  let url = `https://astrangeaeon.github.io/GDMPlazaGenerator/${table}.json`;

  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error("Error fetching JSON:", error));
}

fetchData("GDMPlazaSensoryDetails")
  .then(data => {
	  // Handle the fetched JSON data here
	  jsonData = data;
		   console.log('Fetched JSON data:', jsonData);
    // Call the Roll function with the fetched data
    Roll(2, "sensory",jsonData);
  });

function Roll(numRolls, category, jsonData) {
  if (category !== undefined) {
    console.log(category);
  }

  if (!jsonData[category]) {
    console.error(`Category '${category}' not found in data.`);
    return;
  }

  // Get total number of Store Types
  var totalStoreTypes = Object.keys(jsonData[category]).length;

  // Get random info for each NumRolls
  for (let i = 1; i <= numRolls; i++) {
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

    var totalStoreNames = Object.keys(jsonData[category][selectedStoreType].names).length;

			   var selectedStoreName = getRandomInt(totalStoreNames);
			   
			   //Put the info in the console 
			//	console.log("StoreTypes: "+totalStoreTypes+" // StoreNames: "+totalStoreNames);
				console.log("Selected Store -- "+jsonData[category][selectedStoreType].Type+": "+jsonData[category][selectedStoreType].names[selectedStoreName].Name)
		   
		   }
		   
      //const numberOfRolls = 2;
      //const categoryOfRoll = "stores";
      //const rollResults = Roll(numberOfRolls, categoryOfRoll, data, "storeNames", "Name");
      // Print the results
    // rollResults.forEach(result => console.log(result));
    ;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
};
