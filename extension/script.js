const instacart_product_page_regex = /(http|https):\/\/www.instacart.com\/store\/[^\/]+\/products\/[^\/]+/;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.message === 'instacart_product_page') {
		setTimeout(run_instahealth, 2000);
	}
});

// store the products values with (K, V) pairs = (product name, [protein, cholesterol, calaries, total fat, sodium, total carbs])
var products = new Map();


if (instacart_product_page_regex.test(document.location.href)) {
	run_instahealth();
}

function run_instahealth() {
	console.log("Running Instahealth . . .")
	let food_data = scrapeProductData();
	console.log(food_data);

  // button
  var addToCart = document.getElementById("submit-button");
  console.log(addToCart);
  // quantity of items
  var numItems = document.getElementById("qty-label");
  console.log(numItems);

  addToCart.onclick = function(numItems) {
    food_data['nutrition']['calories'] = numItems * food_data['nutrition']['calories'];
    food_data['nutrition']['fat'] = numItems * food_data['nutrition']['fat'];
    food_data['nutrition']['cholesterol'] = numItems * food_data['nutrition']['cholesterol'];
    food_data['nutrition']['sodium'] = numItems * food_data['nutrition']['sodium'];
    food_data['nutrition']['protein'] = numItems * food_data['nutrition']['protein'];
    food_data['nutrition']['carbs'] = numItems * food_data['nutrition']['carbs'];
    products.set(food_data['name'], food_data['nutrition']);

    //loop through the hashmap and print to console

    for (var i = 0, keys = Object.keys(products), ii = keys.length; i < ii; i++) {
      console.log('key : ' + keys[i] + ' val : ' + products[keys[i]]);
    }

    // if (products.has(food_data['name'])) {
    //   let food_data_curr = products.get(food_data['name']);
    //   food_data_curr['nutrition']['calories'];
    // } else {
    //   products.set(food_data['name'], food_data['nutrition']);
    // }
  };


}

function scrapeProductData() {
  //            //*[@id="item_details"]/div[2]/div[2]/div[1]/h2/span
  let name = document.evaluate("//*[@id=\"item_details\"]/div[2]/div[2]/div[1]/h2/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
  let protein = document.evaluate("//*[@id=\"item_details\"]/div[5]/div[2]/div/ul[2]/li[6]/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
  protein = protein.slice(8, protein.length - 1);
  let cholesterol = document.evaluate("//*[@id=\"item_details\"]/div[5]/div[2]/div/ul[2]/li[3]/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
  cholesterol = cholesterol.slice(13, cholesterol.length - 2)
  let calories = document.evaluate("//*[@id=\"item_details\"]/div[5]/div[2]/div/ul[1]/li[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
  calories = calories.slice(10);
  let totalfat = document.evaluate("//*[@id=\"item_details\"]/div[5]/div[2]/div/ul[2]/li[2]/ul/li[1]/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
  totalfat = totalfat.slice(11, totalfat.length - 1);
  let sodium = document.evaluate("//*[@id=\"item_details\"]/div[5]/div[2]/div/ul[2]/li[4]/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
  sodium = sodium.slice(8, sodium.length - 2);
  let totalcarb = document.evaluate("//*[@id=\"item_details\"]/div[5]/div[2]/div/ul[2]/li[5]/ul/li[1]/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
  totalcarb = totalcarb.slice(19, totalcarb.length - 1);

  let food_data = {
    name: name,
    nutrition: {
      calories: calories,
      fat: totalfat,
      cholesterol: cholesterol,
      sodium: sodium,
      carbs: totalcarb,
      protein: protein,
    }
  }

  return food_data;
}

function scrapeProductDataOld() {
  let food_data = {
    name: null,
    nutrition: {
      calories: null,
      fat: null,
      cholesterol: null,
      sodium: null,
      carbs: null,
      protein: null,
    }
  }

	// Name
	food_data.name = $(".css-16ptqna")[0].innerText;

	// Calories
	food_data.nutrition.calories = parseInt($(".css-dpfmh3-NutritionalFacts")[0].children[1].innerText.split(" ").slice(-1)[0]);

	// Other Nutrition Data
	$(".css-dpfmh3-NutritionalFacts").find(".css-2y6cy8-Category").each((idx, obj) => {
		let nutritionText = obj.children[0].innerText;
		let label = nutritionText.substring(0, nutritionText.lastIndexOf(" "));
		let value = nutritionText.substring(nutritionText.lastIndexOf(" ") + 1);
		switch(label) {
		case "Total Fat":
			food_data.nutrition.fat = value;
			break;
		case "Cholesterol":
			food_data.nutrition.cholesterol = value;
			break;
		case "Sodium":
			food_data.nutrition.sodium = value;
			break;
		case "Total Carbohydrate":
			food_data.nutrition.carbs = value;
			break;
		case "Protein":
			food_data.nutrition.protein = value;
			break;
		}
	})

  return food_data;
}