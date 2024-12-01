const express = require('express');
const router = express.Router();

const {getAllProducts,createProduct,createProducts,updateProduct,deleteProduct,deleteProducts}
= require('../controllers/productsController');


router.route('/products').get(getAllProducts).post(createProducts).delete(deleteProducts);
router.route('/admin').post(createProduct);
router.route('/admin/:model').patch(updateProduct).delete(deleteProduct);

module.exports = router; 