import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function TumOgrencilerim() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Bearer tokeni al
    let localUser = localStorage.getItem("user");
    let myUser = JSON.parse(localUser);

    // Öğrenci verilerini çek
    axios({
      method: 'GET',
      url: 'https://senka.valentura.com/api/users/geziye-katilan-user',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        setStudents(response.data.data);
      })
      .catch((error) => {
        setError('API çağrısı sırasında hata oluştu');
        console.error('API çağrısı sırasında hata oluştu:', error);
      });
  }, []);

  function renderBoolean(value) {
    return value ? "✓" : "✗";
  }

  const handleIptalEtClick = (studentId) => {
    // Öğrenci ID'sini kullanarak yönlendirme yap
    navigate(`/ogrenci-iade/${studentId}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Tüm Öğrencilerim</h1>
      {error && <div className="text-red-500">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gezi Id
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gezi Adı
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Öğrenci Adı
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Öğrenci Soyadı
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Öğrenci TC
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Öğrenci Doğum Tarihi
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Öğrenci Cinsiyet
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Öğrenci Sınıf
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Okul
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kampus
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Veli Telefon
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kredi Kartı
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Banka Transferi
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nakit
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sözleşme durumu
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ödeme Tamamlandı
              </th>
              {/* Diğer sütunlar burada eklenir */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.gezi_id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.gezi_adi}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.ogrenci_adi}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.ogrenci_soyadi}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.ogrenci_tc}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.ogrenci_dogum_tarihi}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.ogrenci_cinsiyet_erkek == true ? "Erkek" : "Kız"}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.ogrenci_sinif}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.ogrenci_okul}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.ogrenci_kampus}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.ogrenci_phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.ogrenci_email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{renderBoolean(student.is_credit_card)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{renderBoolean(student.is_bank_transfer)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{renderBoolean(student.is_cash)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Link'i kullanarak öğrenci sayfasına yönlendir */}
                  <Link
                    to={`/sozlesme-onay/tel/${student.ogrenci_phone}/id/${student.id}`}
                    style={{ textDecoration: 'underline' }}
                  >
                    {renderBoolean(student.is_izin_formu)}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{renderBoolean(student.is_odeme_tamamlandi)}</td>
                {/* Diğer sütunlar burada eklenir */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* İptal et butonunu ekleyin ve tıklama işlevini tanımlayın */}
                  <button
                    onClick={() => handleIptalEtClick(student.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    İptal Et
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}