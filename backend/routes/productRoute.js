const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview } = require('../controller/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router()


router.route('/products').get(getAllProducts)

router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct)

router.route('/admin/products/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)

router.route('/products/:id').get(isAuthenticatedUser, getProductDetails)

router.route('/reviews').put(isAuthenticatedUser, createProductReview)

module.exports = router