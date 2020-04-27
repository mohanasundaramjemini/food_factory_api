const express = require("express");
const router = express.Router();
const Orders = require("../models/orders");
const Items = require("../models/items");

/**
 * Create new order
 */
router.post("/createOrder", async (req, res) => {
  const order = new Orders({
    userId: req.body.userId,
    deliveryAddress: req.body.deliveryAddress,
    vendorId: req.body.vendorId,
    items: req.body.items,
    totalAmount: req.body.totalAmount,
    orderStatus: req.body.orderStatus,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

/**
 * Get All Orders Placed
 */
router.get("/getAllOrders", async (req, res) => {
  try {
    console.log(req.session.userId);
    const orders = await Orders.find();
    res.json(orders);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

/**
 * Get all items based on vendor
 */
router.get("/getAllItems/:vendorId", async (req, res) => {
  try {
    Items.find({ vendor: req.params.vendorId }, function (err, data) {
      console.log(data);
      if (data) {
        res.status(201).json(data);
      }
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
