export function validateCustomer(data) {
  if (!data) {
    return "Request body is missing";
  }

  const { full_name, email, phone } = data;

  if (!full_name || !email || !phone) {
    return "full_name, email and phone are required";
  }

  return null;
}
