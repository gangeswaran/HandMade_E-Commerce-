const express = require('express');
const { 
  CreateProduct, 
  getProducts, 
  deleteProducts, 
  updateProduct, 
  getProductbyId, 
  getProductByArtID, 
  addToCart, 
  removeFromCart
} = require('../controllers/ProductController');

const router = express.Router();

// Define routes
router.post('/product', CreateProduct);
router.get('/productList', getProducts);
router.delete('/product/:id', deleteProducts);
router.put('/product/:id', updateProduct);
router.get('/product/:id', getProductbyId);
router.get('/productAdmin/:artisanId', getProductByArtID);
router.post('/addToCart', addToCart);
router.post('/remove', removeFromCart); // Changed from delete to post for simplicity


module.exports = router;
