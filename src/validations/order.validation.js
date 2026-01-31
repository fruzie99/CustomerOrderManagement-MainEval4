export function validateOrder(data) {
  const { product_name, quantity, price, customer_id } = data;

  if (!product_name || !quantity || !price || !customer_id) {
    return "product_name, quantity, price and customer_id are required";
  }

  if (quantity <= 0 || price <= 0) {
    return "quantity and price must be greater than 0";
  }

  return null;
}
