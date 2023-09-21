export const getRoleName = (role) => {
  const roleMappings = {
    "is_customer_relations": "Müşteri İlişkileri",
    "is_operation_team": "Operasyon",
    "is_finance_team": "Finans",
    "is_teacher": "Öğretmen",
    "is_normal_user": "Kullanıcı",
    "is_web_team": "Web Kontrolcüsü",
    "is_muhasebe": "Muhasebe",
    "is_admin": "Admin"
  };

  return roleMappings[role] || role;
}