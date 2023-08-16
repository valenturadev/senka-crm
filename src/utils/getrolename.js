export const getRoleName = (role) => {
  console.log("role: ", role)
  if (role === "is_web_controller_page") {
    return "Web Kontrolcüsü";
  } else if (role === "is_operations_team") {
    return "Operasyon";
  } else if (role === "is_customer_relations") {
    return "Müşteri İlişkileri";
  } else if (role === "is_finance") {
    return "Finans";
  } else if (role === "is_accounting") {
    return "Muhasebe";
  }
};
