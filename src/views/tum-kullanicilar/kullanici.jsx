import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { errorMessage, successMessage } from '../../utils/toast';

export default function Kullanici() {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const { userPhone } = useParams();
  const [newRoles, setNewRoles] = useState({
    is_customer_relations: false,
    is_operation_team: false,
    is_finance_team: false,
    is_teacher: false,
    is_normal_user: false,
    is_web_team: false,
    is_muhasebe: false,
  });

  const localUser = localStorage.getItem('user');
  const myUser = JSON.parse(localUser);

  useEffect(() => {
    // Kullanıcı bilgilerini getirme isteği
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/crm/get-user/phone=${userPhone}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${myUser?.access}`,
      },
    })
      .then((response) => {
        setUserData(response.data.data);

        // Kullanıcının rollerini kontrol et
        const userRoles = response.data.data;
        setNewRoles((prevRoles) => ({
          ...prevRoles,
          is_customer_relations: userRoles.is_customer_relations,
          is_operation_team: userRoles.is_operation_team,
          is_finance_team: userRoles.is_finance_team,
          is_teacher: userRoles.is_teacher,
          is_normal_user: userRoles.is_normal_user,
          is_web_team: userRoles.is_web_team,
          is_muhasebe: userRoles.is_muhasebe,
        }));
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleRoleChange = (roleName) => {
    setNewRoles((prevRoles) => ({
      ...prevRoles,
      [roleName]: !prevRoles[roleName],
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Rollerin değiştirilmesi isteği
    axios({
      method: 'POST',
      url: `https://senka.valentura.com/api/crm/senka-user-to-role/phone=${userPhone}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${myUser?.access}`,
      },
      data: newRoles,
    })
      .then((response) => {
        setIsSaving(false);
        successMessage('Kullanıcı rolleri başarıyla güncellendi.');
        // Başarı durumunda gerekli işlemleri yapabilirsiniz.
      })
      .catch((error) => {
        setIsSaving(false);
        setError(error.message);
        errorMessage('Kullanıcı rolleri güncellenirken bir hata oluştu.');
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Kullanıcı Detayları</h1>
      <div className="mb-4">
        <p className="font-semibold">Adı: {userData.firstname}</p>
        <p className="font-semibold">Soyadı: {userData.lastname}</p>
        <p className="font-semibold">E-posta: {userData.email}</p>
        <p className="font-semibold">Telefon: {userData.phone}</p>
      </div>
      <h2 className="text-lg font-semibold mb-4">Roller</h2>
      <div className="space-y-2">
        {Object.keys(newRoles).map((roleName) => (
          <label key={roleName} className="flex items-center">
            <input
              type="checkbox"
              checked={newRoles[roleName]}
              onChange={() => handleRoleChange(roleName)}
              className="mr-2"
            />
            {newRoles[roleName] ? 'Onaylı ' : ''}{roleName.replace(/_/g, ' ')}
          </label>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-blue-500"
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}