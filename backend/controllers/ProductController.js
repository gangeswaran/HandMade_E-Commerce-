const Product = require('../model/products');
const jwt = require('jsonwebtoken');
const User = require('../model/users');
const Cart = require('../model/cart'); // Ensure you have the Cart model
require('dotenv').config();
const mongoose = require('mongoose');

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
    const products = await Product.find().populate('artisanId', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.', error: error.message });
  }
};

// Get product by ID
const getProductbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id).populate('artisanId', 'name');
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
  const artisanId = req.params.artisanId;
  try {
    const products = await Product.find({ artisanId });
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
  const { name, price, description, image } = req.body;
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



const addToCart = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;
    console.log(productId, userId, quantity);
    // 1️⃣ Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // 2️⃣ Check if the user already has a cart
    let cart = await Cart.findOne({ user: userId });
    
    if (cart) {
      // 3️⃣ Check if the product is already in the cart
      const productIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (productIndex > -1) {
        // 4️⃣ If the product exists, update its quantity and total price
        cart.items[productIndex].quantity += quantity;
        cart.items[productIndex].totalPrice = cart.items[productIndex].quantity * product.price;
      } else {
        // 5️⃣ If the product is not in the cart, add it
        cart.items.push({
          product: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: quantity,
          totalPrice: product.price * quantity,
        });
      }
    } else {
      // 6️⃣ If the user has no cart, create a new one
      cart = new Cart({
        user: userId,
        items: [
          {
            product: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: quantity,
            totalPrice: product.price * quantity,
          },
        ],
      });
    }

    // 7️⃣ Save the cart
    await cart.save();
    res.status(201).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};


// remove product from cart

const removeFromCart = async (req, res) => {
  const { productId, userId } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cart.items.splice(productIndex, 1);
    await cart.save();

    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};





module.exports = { 
  CreateProduct, 
  getProducts, 
  deleteProducts, 
  updateProduct, 
  getProductbyId, 
  getProductByArtID, 
// new function added here
  addToCart,  // new function added here
  removeFromCart,  // new function added here
};
