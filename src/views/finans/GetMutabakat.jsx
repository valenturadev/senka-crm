import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function MutabakatDetay() {
  const [mutabakat, setMutabakat] = useState({});
  const [error, setError] = useState(null);
  const { mutabakatId } = useParams();
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/finance/get-mutabakat-form/id=${mutabakatId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        setMutabakat(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [mutabakatId]);

  const handleOnayla = () => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/finance/approve-mutabakat-form/id=${mutabakatId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        // Onaylama başarılı olduğunda yapılacak işlemler
        console.log("Mutabakat onaylandı.");
        navigate('/mutabakat-listesi');
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleReddet = () => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/finance/reject-mutabakat-form/id=${mutabakatId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
        // Reddetme başarılı olduğunda yapılacak işlemler
        console.log("Mutabakat reddedildi.");
        navigate('/mutabakat-listesi');

      })
      .catch((error) => {
        setError(error);
      });
  };

  if (error) {
    return <div>Hata oluştu: {error.message}</div>;
  }

  return (
    <div>
      <h1>Mutabakat Detayları</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Özellik</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Değer</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(mutabakat).map(([key, value]) => (
            <tr key={key}>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{key}</td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4">
        <button onClick={handleOnayla} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-4">
          Onayla
        </button>
        <button onClick={handleReddet} className="bg-red-500 text-white px-4 py-2 rounded-lg">
          Reddet
        </button>
      </div>
    </div>
  );
}

export default MutabakatDetay;