const express = require('express');
const { CreateProduct, getProducts, deleteProducts, updateProduct, getProductbyId, getProductByArtID } = require('../controllers/ProductController');
const router = express.Router();

// Define routes
router.post('/product', CreateProduct);
router.get('/productList', getProducts);
router.delete('/product/:id', deleteProducts);
router.put('/product/:id', updateProduct);
router.get('/product/:id', getProductbyId);
router.get('/productAdmin/:artisanId', getProductByArtID);

module.exports = router;
