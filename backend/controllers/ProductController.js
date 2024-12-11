const Product = require('../model/products');

// Create a new product
const CreateProduct = async (req, res) => {
  try {
    const { name, description, price, image, artisanId } = req.body;
    const newProduct = new Product({ name, description, price, image, artisanId });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully!', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product', error });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('artisanId', 'name'); // Populate the artisanId with the artisan's name
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.', error: error.message });
  }
};

// Get product by ID
const getProductbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id).populate('artisanId', 'name'); // Populate the artisanId with the artisan's name
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.', error: error.message });
  }
};


// Get products by artisan ID
const getProductByArtID = async (req, res) => {
  const artisanId = req.params.artisanId; // Ensure artisanId is the correct name in the route
  try {
    const products = await Product.find({ artisanId }); // Fetch all products with artisanId
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.', error: error.message });
  }
};



// Delete a product by ID
const deleteProducts = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Product.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};



// Update a product by ID
const updateProduct = async (req, res) => {
  const { name, price, description,image } = req.body;
  const id = req.params.id;

  if (!name || !price || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', data: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

module.exports = { 
  CreateProduct, 
  getProducts, 
  deleteProducts, 
  updateProduct ,
  getProductbyId,
  getProductByArtID
};
