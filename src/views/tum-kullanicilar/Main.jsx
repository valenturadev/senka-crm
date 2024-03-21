import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TumKullanicilar() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtrelenmiş kullanıcılar
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Her sayfada gösterilecek kullanıcı sayısı
  const [searchTerm, setSearchTerm] = useState(''); // Arama terimi
  const navigate = useNavigate();

  useEffect(() => {
    // Kullanıcıları getirme isteği
    const localUser = localStorage.getItem('user');
    const myUser = JSON.parse(localUser);

    axios({
      method: 'GET',
      url: 'https://senka.valentura.com/api/crm/get-all-users',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${myUser?.access}`,
      },
    })
      .then((response) => {
        setUsers(response.data.data);
        setFilteredUsers(response.data.data); // Başlangıçta filtrelenmemiş tüm kullanıcıları göster
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleUserClick = (userPhone) => {
    navigate(`/kullanici-getir/${userPhone}`);
  };

  const handleSearch = () => {
    // Arama terimine göre kullanıcıları filtrele
    const filtered = users.filter((user) => {
      const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase()) || user.phone.includes(searchTerm);
    });
    setFilteredUsers(filtered);
    setCurrentPage(1); // Arama sonuçları sayfalandığında sayfa 1'e dön
  };

  // Sayfa değiştirme
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-4">Tüm Kullanıcılar</h1>
      {error && <div className="text-red-500">{error}</div>}
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Ad, Soyad veya Telefon Numarası Ara"
          className="border border-gray-300 px-3 py-2 rounded-l w-full focus:outline-none focus:ring focus:border-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Ara
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Ad</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Soyad</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">E-posta</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Admin</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Müşteri İlişkileri</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Operasyon</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Finans</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Öğretmen</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Normal Kullanıcı</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Web Takımı</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Muhasebe</th>
              {/* Diğer sütun başlıkları burada olmalı */}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.phone}
                onClick={() => handleUserClick(user.phone)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{user.firstname}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{user.lastname}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{user.phone}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{user.is_admin ? 'Evet' : 'Hayır'}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{user.is_customer_relations ? 'Evet' : 'Hayır'}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{user.is_operation_team ? 'Evet' : 'Hayır'}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{user.is_finance_team ? 'Evet' : 'Hayır'}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{user.is_teacher ? 'Evet' : 'Hayır'}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{user.is_normal_user ? 'Evet' : 'Hayır'}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{user.is_web_team ? 'Evet' : 'Hayır'}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{user.is_muhasebe ? 'Evet' : 'Hayır'}</td>
                {/* Diğer sütunlar burada olmalı */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <ul className="flex pl-0 list-none rounded my-2">
          <li
            onClick={() => paginate(1)}
            className={`relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 ml-0 rounded-l cursor-pointer hover:bg-blue-200 ${currentPage === 1 ? 'pointer-events-none' : ''
              }`}
          >
            İlk
          </li>
          {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map((_, index) => (
            <li
              key={index}
              onClick={() => paginate(index + 1)}
              className={`relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 ml-0 rounded-l cursor-pointer hover:bg-blue-200 ${currentPage === index + 1 ? 'bg-blue-200 pointer-events-none' : ''
                }`}
            >
              {index + 1}
            </li>
          ))}
          <li
            onClick={() => paginate(Math.ceil(filteredUsers.length / usersPerPage))}
            className={`relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 rounded-r cursor-pointer hover:bg-blue-200 ${currentPage === Math.ceil(filteredUsers.length / usersPerPage) ? 'pointer-events-none' : ''
              }`}
          >
            Son
          </li>
        </ul>
      </div>
    </div>
  );
}