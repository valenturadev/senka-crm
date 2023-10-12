import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function TumOgretmenler() {
  const [ogretmenler, setOgretmenler] = useState([]);
  const { geziId } = useParams();
  let localUser = localStorage.getItem('user');
  let myUser = JSON.parse(localUser);
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://dev.senkaturizm.com/api/customer-relations/gezi-takip/get-all-ogretmens/gezi-id=${geziId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${myUser?.access}`,
      },
    })
      .then((response) => {
        setOgretmenler(response.data.data);
      })
      .catch((error) => {
        console.error('API çağrısı sırasında hata oluştu:', error);
      });
  }, []);

  function handleOgretmenEkle() {
    console.log("Öğretmen ekleme butonuna tıklandı");
    navigate('/ogretmen-ekle/' + geziId);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Gezideki Tüm Öğretmenler</h1>
      <button
        onClick={handleOgretmenEkle}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4"
      >
        Geziye Öğretmen Ekle
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Adı</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Soyadı</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">E-posta</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Okul</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Kampüs</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Unvan</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Detaylar</th>
            </tr>
          </thead>
          <tbody>
            {ogretmenler.map((ogretmen) => (
              <tr key={ogretmen.id}>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{ogretmen.firstname}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{ogretmen.lastname}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{ogretmen.email}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{ogretmen.school}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{ogretmen.campus}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{ogretmen.title}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{ogretmen.phone}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                  <Link to={`/ogretmen-detay/${ogretmen.id}`} className="text-blue-500 hover:underline">
                    Detaylar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TumOgretmenler;