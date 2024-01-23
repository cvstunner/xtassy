import category from '../models/category.js';
import user 		from '../models/user.js';
import banner 	from '../models/banner.js';
import slugify  from 'slugify';
import colors   from 'colors';
import fs 	    from 'fs';

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
    if(name !== 'game'){
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

export const addBanner = async (req, res) => {
	try{
		{/* const {sequence} = req.fields; */}
		const {photo} = req.files;

		switch(true){
			case !photo || (photo && photo.size > 1000000):
				return res.status(500).send({error: 'Photo is Required and should be less then 1mb!'});
		}

		let sequence = null;

		try{
			sequence = (await banner.findOne({}).sort({sequence : -1}).limit(1)).sequence;
		}
		catch(error){
			if(sequence === null){
				sequence = 0;
			}
			else{
				res.status(500).send({
					success: false,
					message: 'Error in Banner!'
				});
			}
		}
		console.log(sequence);

		if(sequence >= 5){ 
		 	return res.status(500).send({error: 'All Banners are Uploaded!'}); 
		} 
	  sequence++;  
	    
	  const newBanner = new banner({sequence}); 
	  if(photo){ 
	  	newBanner.photo.data = fs.readFileSync(photo.path); 
	  	newBanner.photo.contentType = photo.type; 
	  } 
		await newBanner.save(); 
		res.status(200).send({
			success: true, 
			message: 'Banner Added Successfully!'
		});
	}
	catch(error){
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in Banner!'
		})
	}
}

export const getBanners = async (req, res) => {
	try{
		const banners = await banner.find({});
		res.status(200).send({
			success: true, 
			message: 'Banner Loaded Successfully!', 
			banners
		});
	}
	catch(error){
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in Banner!'
		})
	}
}

export const getAllAdmins = async (req, res) => {
	try{
		const users = await user.find({$nor: [{privilege: 3}]}, {name: 1, phone: 1, email: 1, privilege: 1});
		res.status(200).send({
			success: true, 
			message: 'Admins Loaded Successfully!', 
			users
		});
	}
	catch(error){
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in Admin!'
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

export const updateAdmin = async (req, res) => {
  try {
  	console.log(req.body);
    const {name, email, phone, privilege} = req.body;
    console.log("privilege", privilege);
		switch(true){
			case !name:
				return res.status(500).send({error: 'Name is Required!'});
			case !email:
				return res.status(500).send({error: 'Email is Required!'});
			case !String(phone):
				return res.status(500).send({error: 'Phone is Required!'});
			case !String(privilege):
				return res.status(500).send({error: 'Privilege is Required!'});
		}

    const admin = await user.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    res.status(201).send({
      success: true,
      message: "Admin Updated Successfull!y",
      admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Updating admin!",
    });
  }
}

// export const addAdmin = async (req, res) => {
//   try {
//   	console.log(req.body);
//     const privilege = req.params.p;
// 
//     if(privilege !== '0'){
// 	    res.status(400).send({
// 	      success: false,
// 	      error,
// 	      message: "Error in Admin!",
// 	    });
//     }
// 
//     const admin = await user.findByIdAndUpdate(req.params.id, { privilege: 2 }, { new: true });
//     res.status(201).send({
//       success: true,
//       message: "Admin added Successfull!y!",
//       admin,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error while Updating admin!",
//     });
//   }
// }

export const setPrivilege = async (req, res) => {
  try {
    const {privilege} = req.body;
		if(!privilege){
				return res.status(500).send({error: 'Privilege is Required!'});
		}

    const admin = await user.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    res.status(201).send({
      success: true,
      message: "Admin Updated Successfull!y",
      admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Updating admin!",
    });
  }
}

export const deleteAdmin = async (req, res) => {
	try{
		const id = req.params.id;

		await user.findByIdAndDelete(id);
		res.status(200).send({
			success: true, 
			message: 'Admin deleted Successfully!'
		});
	}
	catch(error){
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in Admin!'
		})
	}
}

export const deleteUser = async (req, res) => {
	try{
		const id = req.params.id;

		await user.findByIdAndDelete(id);
		res.status(200).send({
			success: true, 
			message: 'User deleted Successfully!'
		});
	}
	catch(error){
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in User!'
		})
	}
}
