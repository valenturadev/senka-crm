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
      url: `https://dev.senkaturizm.com/api/finance/get-mutabakat-form/id=${mutabakatId}`,
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

  const formatKey = (key) => {
    // _ işaretlerini boşlukla değiştir
    return key.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  const formatValue = (key, value) => {
    if (key === 'is_approve') {
      if (value === true) {
        return 'Onaylandı';
      } else if (value === false) {
        return 'Onaylanmadı';
      } else {
        return 'Bilgi Yok';
      }
    }
    return value;
  };

  const handleOnayla = () => {
    axios({
      method: 'GET',
      url: `https://dev.senkaturizm.com/api/finance/approve-mutabakat-form/id=${mutabakatId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then((response) => {
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
      url: `https://dev.senkaturizm.com/api/finance/reject-mutabakat-form/id=${mutabakatId}`,
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

  const isOnaylandi = mutabakat.is_approve === true || mutabakat.is_approve === false;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Mutabakat Detayları</h1>
      <table className="min-w-full divide-y divide-gray-900">
        <thead className="bg-gray-900">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Özellik</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Değer</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(mutabakat).map(([key, value]) => (
            <tr key={key}>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {key === 'is_approve' ? 'Onaylandı mı?' : formatKey(key)}
              </td>
              <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {formatValue(key, value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!isOnaylandi && (
        <div className="mt-4">
          <button onClick={handleOnayla} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-4">
            Onayla
          </button>
          <button onClick={handleReddet} className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Reddet
          </button>
        </div>
      )}
    </div>
  );
}

export default MutabakatDetay;
