const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  
  artisanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artisan', required: true }, // Associate with artisan
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
