import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true
	},
	category: {
		type: mongoose.ObjectId,
		ref: 'category',
		required: true
	},
	description: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	MRP: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	photo: {
		data: Buffer,
		contentType: String
	},
	shipping: {
		type: Boolean
	}
}, {
	timestamps: true
}); 

export default mongoose.model('product', productSchema);