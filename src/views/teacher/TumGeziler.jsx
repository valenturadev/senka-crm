import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Bold } from 'lucide';

function TravelTable() {
  const [travelData, setTravelData] = useState([]);
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://senka.valentura.com/api/teacher/get-all-gezi',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        setTravelData(response.data.data);
      })
      .catch((error) => {
        console.error('API çağrısı sırasında hata oluştu:', error);
      });
  }, []);

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold mb-4">Seyahat Programları</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-900">
          <thead className="bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Program Adı
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Gidilecek Şehir
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Donulecek Şehir
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Okul Adı
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Kampüs Adı
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {travelData.map((travel) => (
              <tr key={travel.id}>
                <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  <Link to={`/tum-ogrenciler/${travel.id}`} className="text-blue-500 hover:underline">
                    {travel.id}
                  </Link>
                </td>
                <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  {travel.mutabakat.program_adi}
                </td>
                <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  {travel.mutabakat.gidilecek_sehir}
                </td>
                <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  {travel.mutabakat.donulecek_sehir}
                </td>
                <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  {travel.mutabakat.okul}
                </td>
                <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  {travel.mutabakat.kampus_adi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TravelTable;
