import category from '../models/category.js';
import user from '../models/user.js';
import slugify  from 'slugify';
import colors   from 'colors';

export const createCategory = async (req, res) => {
	try{
		const name = req.body.name;

		if(!name){
			console.log('Category name is Required!'.red);
			return res.status(201).send({
				success: false,
				message: 'Category name is Required!'
			});	
		}

		const isCatgExists = await category.findOne({name});
		if(isCatgExists){
			console.log('Category already Exists!'.red);
			return res.status(200).send({
				success: true,
				message: 'Category already Exists!'
			});	
		}

		const slug = slugify(name);
		const newCategory = await new category({name, slug}).save();
		res.status(200).send({
			success: true, 
			message: 'Category created Successfully!', 
			category: newCategory
		});
	}
	catch(error){
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in Category!'
		})
	}
}

export const getAllUsers = async (req, res) => {
	try{
		const users = await user.find({privilege: 3}, {name: 1, phone: 1, email: 1});
		res.status(200).send({
			success: true, 
			message: 'Users Loaded Successfully!', 
			users
		});
	}
	catch(error){
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in Users!'
		})
	}
}

export const getSingleCategory = async (req, res) => {
  try{
		const slug = req.params.slug;
    const singleCategory = await category.findOne({slug: slug});
    if(singleCategory){
	    return res.status(200).send({
	      success: true,
	      message: "Single Category Loaded Successfully!",
	      singleCategory,
	    });
  	}
  	return res.status(400).send({
	      success: false,
	      message: "No Category Available!"
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
	try{
		const name = req.body.name;
		const id = req.params.id;

		if(!name){
			console.log('Category name is Required!'.red);
			return res.status(401).send({
				success: false,
				message: 'Category name is Required!'
			});	
		}

		const slug = slugify(name);
		const newCategory = await category.findByIdAndUpdate(id, {name, slug}, {new: true});
		res.status(200).send({
			success: true, 
			message: 'Category updated Successfully!', 
			category: newCategory
		});
	}
	catch(error){
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in Category!'
		})
	}
}