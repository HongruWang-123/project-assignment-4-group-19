const express = require('express');
const router = express.Router();

const {getAllProducts,getProductById,createProduct,createProducts,updateProduct,deleteProduct,deleteProducts}
= require('../controllers/productsController');


router.route('/products').get(getAllProducts).post(createProducts).delete(deleteProducts);
router.route('/product').post(createProduct);
router.route('/products/:id').get(getProductById).patch(updateProduct).delete(deleteProduct);

module.exports = router;