import mongoose from 'mongoose';

const sizeSchema = new mongoose.Schema({
  S: { type: Number, required: true, default: 0 },
  M: { type: Number, required: true, default: 0 },
  L: { type: Number, required: true, default: 0 },
  XL: { type: Number, required: true, default: 0 }
});

const photosSchema = new mongoose.Schema({
  0: {
    data: Buffer, contentType: String
  },
  1: {
    data: Buffer, contentType: String
  },
  2: {
    data: Buffer, contentType: String
  },
  3: {
    data: Buffer, contentType: String
  },
  4: {
    data: Buffer, contentType: String
  },
});

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
  MRP: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  photos: {
    type: photosSchema,
    required: true
  },
  sizes: {
    type: sizeSchema,
    required: true
  },
  shipping: {
    type: Boolean
  }
}, {
  timestamps: true
});

export default mongoose.model('product', productSchema);
