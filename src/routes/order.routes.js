import express from "express";
import {
  createOrder,
  getCustomerOrders,
  updateOrder,
  deleteOrder
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/:customerId", getCustomerOrders);
router.put("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder);

export default router;
