import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Bold } from 'lucide';

function StudentTable() {
  const [geziler, setGeziler] = useState([]);
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);

  useEffect(() => {
    axios({
        method: 'GET', 
        url: 'https://senka.valentura.com/api/customer-relations/gezi-takip/get-all-travels/status=all',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myUser?.access}`
          }
      })
        .then((response) => {
            
          setGeziler(response.data.data);
        })
        .catch((error) => {
          console.error('API çağrısı sırasında hata oluştu:', error);
        });
  }, []);


  return (
    <div>
      <h1>Gezi Tablosu</h1>
      <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Aktif
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Program Adı
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Okul
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Telefon
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              İsim
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Soyisim
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Gidiş Tarihi
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Dönüş Tarihi
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Gidilecek Şehir
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Dönülecek Şehir
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Oluşturulma Tarihi
            </th>
          </tr>
        </thead>
        <tbody>
          {geziler?.map((gezi) => (
            <tr key={gezi.id}>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                  <Link to={`/gezi-formu/${gezi.id}`} style={{ color: 'blue', fontWeight : Bold }}>
                    {gezi.id}
                  </Link>
                </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {gezi.is_active ? '✓' : '✗'}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {gezi.mutabakat.program_adi}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {gezi.mutabakat.okul}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {gezi.mutabakat.tel_no}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {gezi.mutabakat.email}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {gezi.mutabakat.isim}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {gezi.mutabakat.soyisim}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {gezi.mutabakat.gidis_tarihi}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {gezi.mutabakat.donus_tarihi}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {gezi.mutabakat.gidilecek_sehir}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {gezi.mutabakat.donulecek_sehir}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {gezi.mutabakat.created_at}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default StudentTable;