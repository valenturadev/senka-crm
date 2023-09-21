import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RolAtama() {
  const [telefonNumarasi, setTelefonNumarasi] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const localUser = localStorage.getItem('user');
  const myUser = JSON.parse(localUser);

  const handleTelefonNumarasiChange = (e) => {
    setTelefonNumarasi(e.target.value);
  };

  const handleRolAta = () => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/crm/get-user/phone=${telefonNumarasi}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${myUser?.access}`,
      },
    })
      .then((response) => {
        const userData = response.data.data;
        console.log(userData);
        if (userData) {
          // Kullanıcı varsa userId ile sayfaya yönlendir
          navigate(`/kullanici-getir/${userData.phone}`);
        } else {
          // Kullanıcı yoksa hata mesajı göster
          setError('Kullanıcı bulunamadı');
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Rol Atama</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Telefon Numarası:</label>
        <input
          className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
          type="text"
          value={telefonNumarasi}
          onChange={handleTelefonNumarasiChange}
        />
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-blue-500"
        onClick={handleRolAta}
      >
        Rol Ata
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}