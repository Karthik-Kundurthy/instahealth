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

console.log("SCRIPT IS RUNNING");
var protein = document.evaluate("//*[@id=\"item_details\"]/div[5]/div[2]/div/ul[2]/li[6]/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
protein = protein.slice(8, protein.length - 1); // should extract number
console.log(protein);
var cholesterol = document.evaluate("//*[@id=\"item_details\"]/div[5]/div[2]/div/ul[2]/li[3]/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
cholesterol = cholesterol.slice(13, cholesterol.length - 2)
console.log(cholesterol);
var calories = document.evaluate("//*[@id=\"item_details\"]/div[5]/div[2]/div/ul[1]/li[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
calories = calories.slice(10);
console.log(calories);
var totalfat = document.evaluate("//*[@id=\"item_details\"]/div[5]/div[2]/div/ul[2]/li[2]/ul/li[1]/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
totalfat = totalfat.slice(11, totalfat.length - 1);
console.log(totalfat);
var sodium = document.evaluate("//*[@id=\"item_details\"]/div[5]/div[2]/div/ul[2]/li[4]/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
sodium = sodium.slice(8, sodium.length - 2);
console.log(sodium);
var totalcarb = document.evaluate("//*[@id=\"item_details\"]/div[5]/div[2]/div/ul[2]/li[5]/ul/li[1]/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
totalcarb = totalcarb.slice(19, totalcarb.length - 1);
console.log(totalcarb);

// Name
////food_data.name = $(".css-16ptqna")[0].innerText;

// Calories
////food_data.nutrition.calories = parseInt($(".css-dpfmh3-NutritionalFacts")[0].children[1].innerText.split(" ").slice(-1)[0]);

// Other Nutrition Data
// $(".css-dpfmh3-NutritionalFacts").find(".css-2y6cy8-Category").each((idx, obj) => {
//   let nutritionText = obj.children[0].innerText;
//   let label = nutritionText.substring(0, nutritionText.lastIndexOf(" "));
//   let value = nutritionText.substring(nutritionText.lastIndexOf(" ") + 1);
//   switch(label) {
//     case "Total Fat":
//       food_data.nutrition.fat = value;
//       break;
//     case "Cholesterol":
//       food_data.nutrition.cholesterol = value;
//       break;
//     case "Sodium":
//       food_data.nutrition.sodium = value;
//       break;
//     case "Total Carbohydrate":
//       food_data.nutrition.carbs = value;
//       break;
//     case "Protein":
//       food_data.nutrition.protein = value;
//       break;
//   }
// })

console.log("FOOD DATA");
// console.log(food_data);