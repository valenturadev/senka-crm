import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Mutabakatlar() {
  const [mutabakatlar, setMutabakatlar] = useState([]);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('waiting'); // Varsayılan olarak 'hepsi' seçili
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/finance/get-all-mutabakat-forms/status=${selectedStatus}`, // Seçilen duruma göre API isteği yap
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        setMutabakatlar(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [selectedStatus]); // selectedStatus değiştiğinde useEffect'i tetikle

  if (error) {
    return <div className="text-red-500">Hata oluştu: {error.message}</div>;
  }

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mutabakatlar</h1>
      <div className="mb-4">
        {/* Durum butonları */}

        <button
          onClick={() => handleStatusClick('waiting')}
          className={`mr-2 ${selectedStatus === 'waiting' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} border border-blue-500 p-2 rounded-lg focus:outline-none`}
        >
          Bekleyenler
        </button>
        <button
          onClick={() => handleStatusClick('approved')}
          className={`mr-2 ${selectedStatus === 'approved' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} border border-blue-500 p-2 rounded-lg focus:outline-none`}
        >
          Kabul edilenler
        </button>
        <button
          onClick={() => handleStatusClick('rejected')}
          className={`mr-2 ${selectedStatus === 'rejected' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} border border-blue-500 p-2 rounded-lg focus:outline-none`}
        >
          Reddedilenler
        </button>
        <button
          onClick={() => handleStatusClick('all')}
          className={`mr-2 ${selectedStatus === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} border border-blue-500 p-2 rounded-lg focus:outline-none`}
        >
          Hepsi
        </button>

      </div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Program Adı</th>
          </tr>
        </thead>
        <tbody>
          {mutabakatlar.map((mutabakat) => (
            <tr key={mutabakat.id}>
              <td className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                <Link to={`/mutabakat/${mutabakat.id}`} className="text-blue-500 hover:underline">
                  {mutabakat.id}
                </Link>
              </td>
              <td className="px-6 py-3 text-left text-xs font-medium text-gray-500">{mutabakat.program_adi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Mutabakatlar;
