import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function OgrenciListesi() {
  const [ogrenciler, setOgrenciler] = useState([]);
  const [error, setError] = useState(null);
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);
  const { formId } = useParams();

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/customer-relations/gezi-takip/get-all-students-by-gezi-id/id=${formId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        setOgrenciler(response.data.data.ogrenci_list);
      })
      .catch((error) => {
        console.error('API çağrısı sırasında hata oluştu:', error);
        setError('Veri çekilirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
      });
  }, [formId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!ogrenciler.length) {
    return <div>Veri yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gezideki Öğrenciler</h1>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Öğrenci Adı</th>
              <th className="px-4 py-2">Öğrenci Soyadı</th>
              <th className="px-4 py-2">Okul</th>
              <th className="px-4 py-2">Kampüs</th>
              <th className="px-4 py-2">Kredi Kartı</th>
              <th className="px-4 py-2">Banka Transferi</th>
              <th className="px-4 py-2">Nakit</th>
              <th className="px-4 py-2">İzin Formu</th>
              <th className="px-4 py-2">Ödeme Tamamlandı</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {ogrenciler.map((ogrenci) => (
              <tr key={ogrenci.id} className={ogrenci.is_odeme_tamamlandi ? 'bg-green-200' : 'bg-red-200'}>
                <td className="border px-4 py-2">{ogrenci.ogrenci_adi}</td>
                <td className="border px-4 py-2">{ogrenci.ogrenci_soyadi}</td>
                <td className="border px-4 py-2">{ogrenci.ogrenci_okul}</td>
                <td className="border px-4 py-2">{ogrenci.ogrenci_kampus}</td>
                <td className="border px-4 py-2">{ogrenci.is_credit_card ? 'Evet' : 'Hayır'}</td>
                <td className="border px-4 py-2">{ogrenci.is_bank_transfer ? 'Evet' : 'Hayır'}</td>
                <td className="border px-4 py-2">{ogrenci.is_cash ? 'Evet' : 'Hayır'}</td>
                <td className="border px-4 py-2">{ogrenci.is_izin_formu ? 'Evet' : 'Hayır'}</td>
                <td className="border px-4 py-2">{ogrenci.is_odeme_tamamlandi ? 'Evet' : 'Hayır'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OgrenciListesi;
