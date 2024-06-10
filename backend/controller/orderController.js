const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require('../utils/errorHander');
const catchAsyncError = require('../middleware/catchAsyncError');


// Create a order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body
    const order = await Order.create({
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        itemPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice,
        paidAt: Date.now(),
        user: req.user.id
    })

    res.status(201).json({
        success: true,
        order 
    })
})

// Get a single order info
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if (!order) {
        return next(new ErrorHander("Order not found with this id"), 404);
    }

    res.status(200).json({
        success: true,
        order,
    })  
})

// Get a specific logged in user's order info
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        orders,
    })  
})

// Get all order info --> Admin
exports.allOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice     
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    })  
})

// Update order status --> Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHander("Order not found with this id"), 404);
    }
    
    if (order.orderStatus == "Delivered") {
        return next(new ErrorHander("You have already delivered this product", 404))
    }
    if (req.body.status === 'Shipped') {
        order.orderItems.forEach(async order => {
            await updateStocK(order.product, order.quantity)
        })
    }

    order.orderStatus = req.body.status
    if (req.body.status == "Delivered") {
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave: false})
    res.status(200).json({
        success: true,
        order,
    })      
})

async function updateStocK(id, quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;
    await product.save({validateBeforeSave: false})
}

// Delete order --> Admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHander("You have already delivered this product", 404))
    }
    
    await order.deleteOne()
    res.status(200).json({
        success: true
    })  
})