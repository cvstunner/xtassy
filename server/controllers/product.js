import product from '../models/product.js';
import slugify from 'slugify';
import colors from 'colors';
import fs from 'fs';

export const createProduct = async (req, res) => {
  try {
    const { name, category, description, MRP, price, shipping } = req.fields;

    const sizes = JSON.parse(req.fields.sizes);
    const photos = req.files.photos;
    const photoIndices = JSON.parse(req.fields.photoIndices);

    console.log("photoIndices: ", photoIndices)

    switch (true) {
      case !name:
        return res.status(400).send({ message: 'Name is Required!' });
      case !category:
        return res.status(400).send({ message: 'Category is Required!' });
      case !description:
        return res.status(400).send({ message: 'Description is Required!' });
      case !sizes:
        return res.status(400).send({ message: 'Sizes is Required!' });
      case !MRP:
        return res.status(400).send({ message: 'MRP is Required!' });
      case !price:
        return res.status(400).send({ message: 'Price is Required!' });
      case !photos:
        return res.status(400).send({ message: 'Minimum 1 Photo is Required!' });
    }

    let mainPhoto = false;
    photoIndices.forEach(data => {
      if (data == 0)
        mainPhoto = true;
    });

    if (!mainPhoto) {
      console.log("photoIndicesError")
      return res.status(400).send({ message: 'Main Photo is Required!' });
    }

    const slug = slugify(name);
    const newProduct = new product({ name, slug, category, description, MRP, price, sizes, shipping });

    let photosBuff = {};
    if (photoIndices.length == 1) {
      photosBuff[0] = {
        data: fs.readFileSync(photos.path),
        contentType: photos.type
      }
    }
    else {
      photoIndices.forEach((data, index) => {
        photosBuff[data] = {
          data: fs.readFileSync(photos[index].path),
          contentType: photos.type
        }
      });
    }

    newProduct.photos = photosBuff;

    await newProduct.save();
    res.status(201).send({
      success: true,
      message: 'Product created Successfully!',
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Product!'
    })
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await product.find({}).select('-photo').populate('category').limit(12).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: 'Products Loaded Successfully!',
      count: products.length,
      products
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while getitng Products!',
      error
    })
  }
}

export const getSingleProduct = async (req, res) => {
  try {
    const singleProduct = await product.findOne({ slug: req.params.slug }).select("-photo").populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      singleProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getitng single Product!",
      error,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await product.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Product!",
      error,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, MRP, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: 'Name is Required!' });
      case !category:
        return res.status(500).send({ error: 'Category is Required!' });
      case !description:
        return res.status(500).send({ error: 'Description is Required!' });
      case !quantity:
        return res.status(500).send({ error: 'Quantity is Required!' });
      case !MRP:
        return res.status(500).send({ error: 'MRP is Required!' });
      case !price:
        return res.status(500).send({ error: 'Price is Required!' });
      case photo && photo.size > 1000000:
        return res.status(500).send({ error: 'Photo is Required and should be less then 1mb!' });
    }

    const products = await product.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfull!y",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Updating product!",
    });
  }
};

export const getProductPhoto = async (req, res) => {
  try {
    const products = await product.findById(req.params.pid).select("photo");
    if (products.photo.data) {
      res.set("Content-type", products.photo.contentType);
      return res.status(200).send(products.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};
