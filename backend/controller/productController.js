const Product = require('../models/productModel')
const ErrorHander = require('../utils/errorHander')
const catchAsyncError = require('../middleware/catchAsyncError');

// Create product --> Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product: product
    })
})

// Update product --> Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product: product
    })
})

// Delete product --> Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHander("Product not found", 404))
    }

    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
})

// Get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
    const products = await Product.find();
    res.json({
        success: true,
        products: products
    })
})


// Get single product
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHander("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        product: product
    })
})