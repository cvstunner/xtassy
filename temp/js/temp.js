let catgs = {
  "Ladies": {
    "Winter Collection": ["Sweaters"]
  },
  "Mens": {
    "Winter Collection": ["Sweatshirts"]
  },
  "Kids": {

  },
  "Sassy": {

  }
}

// catgs["Mens"]["Winter Collection"].push("Trousers")
Object.assign(catgs, {
  "Kids": {
    "Kidos": []
  }
})

// console.log(Object.keys(catgs["Kids"]).some(key => key === "Kidos"))

console.log(catgs["Kids"]?.["Kidos"])
