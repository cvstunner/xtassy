import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
	sequence: {
		type: Number,
		required: true
	},
	photo: {
		data: Buffer,
		contentType: String
	}
});

export default mongoose.model('banner', bannerSchema);