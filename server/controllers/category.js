import category from "../models/category.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    const { title, sub_title, name } = req.body;
    const catgs = ["Mens", "Ladies", "Kids", "Sassy"];
    switch (true) {
      case !name:
        console.log("Category name is Required!".red);
        return res.status(201).send({
          success: false,
          message: "Category name is Required!",
        });
      case !title:
        console.log("Category title is Required!".red);
        return res.status(201).send({
          success: false,
          message: "Category title is Required!",
        });
      case !sub_title:
        console.log("Category sub_title is Required!".red);
        return res.status(201).send({
          success: false,
          message: "Category sub title is Required!",
        });
      case !catgs.includes(name):
        console.log("Invalid category Name!".red);
        return res.status(201).send({
          success: false,
          message: "Invalid category Name!",
        });
    }

    // const isTitleExists = await category.findOne({$and:[{title}, {name}]});
    // if(isTitleExists){
    // 	console.log('TItle already Exists!'.red);
    // 	return res.status(201).send({
    // 		success: true,
    // 		message: 'Title already Exists!'
    // 	});
    // }

    const isSubTitleExists = await category.findOne({
      $and: [{ sub_title }, { name }, { title }],
    });
    if (isSubTitleExists) {
      console.log("Sub-tItle already Exists!".red);
      return res.status(201).send({
        success: true,
        message: "Sub-title already Exists!",
      });
    }

    const slug = slugify(name);
    const newCategory = await new category({ title, sub_title, name, slug })
      .save();
    res.status(200).send({
      success: true,
      message: "Category created Successfully!",
      category: newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category!",
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await category.find({});
    res.status(200).send({
      success: true,
      message: "Categories Loaded Successfully!",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category!",
    });
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const slug = req.params.slug;
    const singleCategory = await category.findOne({ slug: slug });
    if (singleCategory) {
      return res.status(200).send({
        success: true,
        message: "Single Category Loaded Successfully!",
        singleCategory,
      });
    }
    return res.status(400).send({
      success: false,
      message: "No Category Available!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { sub_title } = req.body;
    const id = req.params.id;
    console.log(id, " ", sub_title)

    switch (true) {
      case sub_title:
        console.log("Category sub_title is Required!".red);
        return res.status(201).send({
          success: false,
          message: "Category name is Required!",
        });
    }

    const newCategory = await category.findByIdAndUpdate(id, {
      sub_title,
    }, { new: true });
    res.status(200).send({
      success: true,
      message: "Category updated Successfully!",
      category: newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category!",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    await category.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category!",
    });
  }
};
