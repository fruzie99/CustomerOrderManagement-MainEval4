import express from "express";
import {
  createCustomer,
  deleteCustomer
} from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/", createCustomer);
router.delete("/:id", deleteCustomer);

export default router;
