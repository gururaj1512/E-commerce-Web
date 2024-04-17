const express = require('express')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { newOrder, getSingleOrder, myOrders, allOrders, updateOrder, deleteOrder } = require('../controller/orderController');

const router = express.Router();


router.route("/order/new").post(isAuthenticatedUser, newOrder)
router.route("/order/my").get(isAuthenticatedUser, myOrders)
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder)

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), allOrders)
router.route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)


module.exports = router