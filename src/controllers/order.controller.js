import supabase from "../config/supabase.js";
import { validateOrder } from "../validations/order.validation.js";

export async function createOrder(req, res) {
  const error = validateOrder(req.body);
  if (error) return res.status(400).json({ message: error });

  const { product_name, quantity, price, customer_id } = req.body;

  const { data: customer } = await supabase
    .from("customers")
    .select("id")
    .eq("id", customer_id)
    .single();

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  const { data, error: insertError } = await supabase
    .from("orders")
    .insert([{ product_name, quantity, price, customer_id }])
    .select();

  if (insertError) {
    return res.status(500).json({ message: insertError.message });
  }

  res.status(201).json(data[0]);
}

export async function getCustomerOrders(req, res) {
  const { customerId } = req.params;

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_id", customerId);

  if (error) {
    return res.status(404).json({ message: "Orders not found" });
  }

  res.json(data);
}

export async function updateOrder(req, res) {
  const { orderId } = req.params;
  const { quantity, price, order_status } = req.body;

  const { data, error } = await supabase
    .from("orders")
    .update({ quantity, price, order_status })
    .eq("id", orderId)
    .select();

  if (!data || data.length === 0) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data[0]);
}

export async function deleteOrder(req, res) {
  const { orderId } = req.params;

  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", orderId);

  if (error) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json({ message: "Order deleted successfully" });
}
