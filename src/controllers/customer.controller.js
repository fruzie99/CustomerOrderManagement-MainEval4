import supabase from "../config/supabase.js";
import { validateCustomer } from "../validations/customer.validation.js";

export async function createCustomer(req, res) {
  const error = validateCustomer(req.body);
  if (error) return res.status(400).json({ message: error });

  const { full_name, email, phone } = req.body;

  const { data: existing } = await supabase
    .from("customers")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const { data, error: insertError } = await supabase
    .from("customers")
    .insert([{ full_name, email, phone }])
    .select();

  if (insertError) {
    return res.status(500).json({ message: insertError.message });
  }

  res.status(201).json(data[0]);
}

export async function deleteCustomer(req, res) {
  const { id } = req.params;

  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json({ message: "Customer deleted successfully" });
}
