import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import classNames from "classnames";

function Mutabakatlar() {
  const [mutabakatlar, setMutabakatlar] = useState([]);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('waiting'); // Varsayılan olarak 'hepsi' seçili
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/finance/get-all-mutabakat-forms/status=${selectedStatus}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        setMutabakatlar(response.data.data);
        console.log(JSON.stringify(response.data.data))
      })
      .catch((error) => {
        setError(error);
      });
  }, [selectedStatus]);

  if (error) {
    return <div className="text-red-500">Hata oluştu: {error.message}</div>;
  }

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  function getButtonClasses(statusButton) {
    return classNames({
      'px-4 py-1 text-sm text-zinc-950 font-semibold rounded-md border border-gray-900 hover:text-white hover:bg-gray-600 hover:border-transparent outline-none ring-2 ring-gray-600 ring-offset-2': statusButton === selectedStatus,
      'px-4 py-1 text-sm text-zinc-950 font-semibold rounded-md border border-gray-900 hover:text-white hover:bg-gray-600 hover:border-transparent': statusButton !== selectedStatus
    });
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-medium leading-none mt-3">Mutabakatlar</h1>
      <div className="flex justify-between items-center px-4 py-3 text-left sm:px-6 ">
        <div className="flex items-center space-x-4">
          <button className={getButtonClasses("waiting")} onClick={() => handleStatusClick("waiting")}>Bekleyenler</button>
          <button className={getButtonClasses("approved")} onClick={() => handleStatusClick("approved")}>Onaylananlar</button>
          <button className={getButtonClasses("rejected")} onClick={() => handleStatusClick("rejected")}>Onaylanmayanlar</button>
          <button className={getButtonClasses("all")} onClick={() => handleStatusClick("all")}>Hepsi</button>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-900">
        <thead className="bg-gray-900">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Program Adı</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Gidilecek Şehir</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Dönülecek Şehir</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Kampus Adı</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Okul Adı</th>
          </tr>
        </thead>
        <tbody>
          {mutabakatlar.map((mutabakat) => (
            <tr key={mutabakat.id}>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                <Link to={`/mutabakat/${mutabakat.id}`} className="text-blue-500 hover:underline">
                  {mutabakat.id}
                </Link>
              </td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">{mutabakat.program_adi}</td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">{mutabakat.gidilecek_sehir}</td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">{mutabakat.donulecek_sehir}</td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">{mutabakat.kampus_adi}</td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">{mutabakat.okul}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Mutabakatlar;
