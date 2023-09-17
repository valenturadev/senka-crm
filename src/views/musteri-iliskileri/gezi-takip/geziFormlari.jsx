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
    <div className="p-4">
      <h1 className="text-3xl font-medium leading-none mt-3">Gezi Tablosu</h1>
      <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-900">
        <thead className="bg-gray-900">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Aktif
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Program Adı
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Okul
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Telefon
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              İsim
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Soyisim
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Gidiş Tarihi
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Dönüş Tarihi
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Gidilecek Şehir
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Dönülecek Şehir
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Oluşturulma Tarihi
            </th>
          </tr>
        </thead>
        <tbody>
          {geziler?.map((gezi) => (
            <tr key={gezi.id}>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  <Link to={`/gezi-formu/${gezi.id}`} className="text-blue-500 hover:underline">
                    {gezi.id}
                  </Link>
                </td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {gezi.is_active ? '✓' : '✗'}
              </td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {gezi.mutabakat.program_adi}
              </td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {gezi.mutabakat.okul}
              </td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {gezi.mutabakat.tel_no}
              </td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {gezi.mutabakat.email}
              </td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {gezi.mutabakat.isim}
              </td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {gezi.mutabakat.soyisim}
              </td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {gezi.mutabakat.gidis_tarihi}
              </td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {gezi.mutabakat.donus_tarihi}
              </td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {gezi.mutabakat.gidilecek_sehir}
              </td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {gezi.mutabakat.donulecek_sehir}
              </td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
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