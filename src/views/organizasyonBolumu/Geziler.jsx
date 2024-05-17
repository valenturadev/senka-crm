import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Geziler = () => {
  const [geziListesi, setGeziListesi] = useState([]);
  const [error, setError] = useState(null);
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/operation-team/gezi/get-all-gezi`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        if (response.data.error === false) {
          setGeziListesi(response.data.data);
        } else {
          console.error('API Error:', response.data.errorMsg);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return <div className="text-red-500">Hata oluştu: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-medium leading-none mt-3">Gezi Kartları</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {geziListesi.map((gezi) => (
          <Link to={`/gezi/${gezi.id}`} key={gezi.id} className="block border p-4 rounded-lg shadow-lg bg-white hover:bg-gray-100">
            <div>
              <h2 className="text-xl font-semibold mb-2">{gezi.mutabakat.program_adi}</h2>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Okul:</span> {gezi.mutabakat.okul}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Öğretmen:</span> {gezi.mutabakat.isim} {gezi.mutabakat.soyisim}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Ülke:</span> {gezi.mutabakat.ulke}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Şehir:</span> {gezi.mutabakat.sehir}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Gidiş Tarihi:</span> {new Date(gezi.mutabakat.gidis_tarihi).toLocaleDateString()}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Dönüş Tarihi:</span> {new Date(gezi.mutabakat.donus_tarihi).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Geziler;
