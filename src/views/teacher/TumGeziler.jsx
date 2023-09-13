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
    <div>
      <h1>Seyahat Programları</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Program Adı
              </th>
            </tr>
          </thead>
          <tbody>
            {travelData.map((travel) => (
              <tr key={travel.id}>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                  <Link to={`/tum-ogrenciler/${travel.id}`} style={{ color: 'blue', fontWeight : Bold }}>
                    {travel.id}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                  {travel.mutabakat.program_adi}
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
