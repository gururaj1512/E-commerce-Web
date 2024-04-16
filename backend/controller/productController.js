const Product = require('../models/productModel');
const ErrorHander = require('../utils/errorHander');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');


// Get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
    const resultPerPage = 5
    let productCount = await Product.countDocuments()
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
    const products = await apiFeature.query;
    res.json({
        success: true,
        products: products,
        productCount: productCount
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


// Create product --> Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id
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

// create new review or update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const {rating, comment, productId} = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment: comment
    }
  
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment)
        });
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    let totalSum = 0;
    product.reviews.forEach((rev) => {
        totalSum += rev.rating
    });
    product.ratings = totalSum/product.reviews.length;

    await product.save({validateBeforeSave: false});
    res.status(200).json({
        success: true,
    })
})