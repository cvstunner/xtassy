let catgs = {
  "Ladies": {
    "Winter Collection": ["Sweaters"]
  },
  "Mens": {
    "Winter Collection": ["Sweatshirts", "Sweaters", "Krators"]
  },
  "Kids": {

  },
  "Sassy": {
    "chetan": ["live", "ghosty"]
  }
}

// catgs["Mens"]["Winter Collection"].push("Trousers")
Object.assign(catgs, {
  "Kids": {
    "Kidos": []
  }
})

// console.log(Object.keys(catgs["Kids"]).some(key => key === "Kidos"))

catgs["Mens"]?.["Winter Collection"].map((sub_title) => {
  console.log(sub_title)
})

catgs["Mens"]?.["Winter Collection"].map((sub_title) => {
  console.log(sub_title)
})
