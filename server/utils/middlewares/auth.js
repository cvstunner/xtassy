import JWT   from 'jsonwebtoken';
import user from '../../models/user.js';

export const isAuthorized = async (req, res, next) => {
	try{
		const decoded = JWT.verify(
			req.headers.authorization,
			process.env.JWT_SECRET
			);

		req.user = decoded;
		next();
	} catch(error){
		console.log(error);
		res.status(401).send({
			success: false,
			message: 'Unauthorized User!',
			error
		});
	}
}

export const isAdmin = async (req, res, next) => {
	const privilege = req.params.p;
	if(privilege === '0'){
		isHighPrivileged(req, res, next);
	}
	else if(privilege === '1'){
		isMediumPrivileged(req, res, next);
	}
	else if(privilege === '2'){
		isLowPrivileged(req, res, next);
	}
}

export const isLowPrivileged = async (req, res, next) => {
	try{
		const getUser = await user.findById(req.user._id);	
		if(getUser.privilege === 0 || getUser.privilege === 1 || getUser.privilege === 2){
			next();
		}else{
			return res.status(401).send({
				success: false,
				message: 'Unauthorized Access!'
			});
		}
	} catch(error){
		return res.status(401).send({
			success: false,
			message: 'Error in Admin Middleware!',
			error
		});
	}
}

export const isMediumPrivileged = async (req, res, next) => {
	try{
		const getUser = await user.findById(req.user._id);	
		if(getUser.privilege === 0 || getUser.privilege === 1){
			next();
		}else{
			return res.status(401).send({
				success: false,
				message: 'Unauthorized Access!'
			});
		}
	} catch(error){
		return res.status(401).send({
			success: false,
			message: 'Error in Admin Privileged Middleware!',
			error
		});
	}
}

export const isHighPrivileged = async (req, res, next) => {
	try{
		const getUser = await user.findById(req.user._id);	
		if(getUser.privilege === 0){
			next();
		}else{
			return res.status(401).send({
				success: false,
				message: 'Unauthorized Access!'
			});
		}
	} catch(error){
		return res.status(401).send({
			success: false,
			message: 'Error in Admin Privileged Middleware!',
			error
		});
	}
}