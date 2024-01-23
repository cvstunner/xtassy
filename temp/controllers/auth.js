import users from './../models/users.js';
import { hashPassword } from './../utils/helpers/auth.js';

export const signin = async (req, res) => {
	try{
		const {name, email, password, phone, address} = req.body;
		const user = await users.findOne({email});
		if(user){
			return res.status(200).send({
				success: true,
				message: 'User Already Signed In!'
			});
		}

		const hashedPassword = await hashPassword(password);
		user = await new userModel({name, email, password: hashedPassword, phone, address}).save();
		res.status(201).send({
			success: true,
			message: 'User SignedIn Successfully!',
			user
		});
	} catch(error){
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'SignIn Error!',
			error
		});
	}
};