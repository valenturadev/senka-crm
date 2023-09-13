import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link,useNavigate, Navigate  } from 'react-router-dom';
import { Bold } from 'lucide';


function StudentTable() {
  const [students, setStudents] = useState([]);
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);
  const { geziId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios({
        method: 'GET', 
        url: 'https://senka.valentura.com/api/teacher/get-all-ogrenci/gezi-id='+geziId,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myUser?.access}`
          }
      })
        .then((response) => {
            
          setStudents(response.data.data.ogrenci_list);
        })
        .catch((error) => {
          console.error('API çağrısı sırasında hata oluştu:', error);
        });
  }, []);

  const handleCreateStudent = () => {
    navigate('/yeni-ogrenci/'+geziId);
  };

  return (
    <div>
      <h1>Öğrenci Tablosu</h1>
      <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Adı
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Soyadı
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Okul
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Kampus
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Telefon
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Kredi Kartı
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Banka Transferi
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Nakit
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              İzin Formu
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Ödeme Tamamlandı
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Oluşturulma Tarihi
            </th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student) => (
            <tr key={student.id}>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                  <Link to={`/ogrenci/${student.id}`} style={{ color: 'blue', fontWeight : Bold }}>
                    {student.id}
                  </Link>
                </td>

              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {student.ogrenci_adi}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {student.ogrenci_soyadi}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {student.ogrenci_okul}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {student.ogrenci_kampus}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {student.ogrenci_phone}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {student.ogrenci_email}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {student.is_credit_card ? '✓' : '✗'}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {student.is_bank_transfer ? '✓' : '✗'}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {student.is_cash ? '✓' : '✗'}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {student.is_izin_formu ? '✓' : '✗'}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {student.is_odeme_tamamlandi ? '✓' : '✗'}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {student.created_at}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <button
        onClick={handleCreateStudent}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Öğrenci Ekle
      </button>
    </div>
  );
}

export default StudentTable;
