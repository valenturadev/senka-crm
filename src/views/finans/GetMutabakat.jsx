import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function MutabakatDetay() {
  const [mutabakat, setMutabakat] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [error, setError] = useState(null);
  const { mutabakatId } = useParams();
  const localUser = localStorage.getItem("user");
  const myUser = JSON.parse(localUser);
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
  }, [mutabakatId, myUser?.access]);

  const formatKey = (key) => {
    return key.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  const formatValue = (key, value) => {
    if (key === 'is_approve') {
      if (value === true) {
        return 'Onaylandı';
      } else if (value === false) {
        return 'Onaylanmadı';
      } else if (value === null) {
        return 'Bilgi Yok';
      }
    }
    try {
      const parsedValue = JSON.parse(value);
      if (Array.isArray(parsedValue)) {
        return parsedValue.map((item, index) => (
          <div key={index} className="ml-4">
            {Object.entries(item).map(([k, v]) => (
              <div key={k}>
                {formatKey(k)}: {v}
              </div>
            ))}
          </div>
        ));
      }
      return JSON.stringify(parsedValue, null, 2);
    } catch (e) {
      return value;
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditedData(mutabakat);
  };

  const handleSave = () => {
    axios({
      method: 'POST',
      url: `https://senka.valentura.com/api/finance/edit-mutabakat-form/id=${mutabakatId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      },
      data: editedData
    })
      .then(() => {
        setMutabakat(editedData);
        setEditMode(false);
        console.log("Mutabakat güncellendi.");
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleChange = (key, value) => {
    try {
      setEditedData({
        ...editedData,
        [key]: JSON.parse(value),
      });
    } catch (e) {
      setEditedData({
        ...editedData,
        [key]: value,
      });
    }
  };

  const handleOnayla = () => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/finance/approve-mutabakat-form/id=${mutabakatId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then(() => {
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
      .then(() => {
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
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Mutabakat Detayları</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(mutabakat).map(([key, value]) => (
          <div key={key} className="border p-4 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-2">{key === 'is_approve' ? 'Onaylandı mı?' : formatKey(key)}</h2>
            {editMode ? (
              <textarea
                value={typeof editedData[key] === 'object' ? JSON.stringify(editedData[key], null, 2) : editedData[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full border p-2 rounded-lg"
                rows={4}
              />
            ) : (
              <pre>{formatValue(key, value)}</pre>
            )}
          </div>
        ))}
      </div>

      {!editMode ? (
        <div className="mt-4 flex space-x-4">
          <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Düzenle
          </button>
          {!isOnaylandi && (
            <>
              <button onClick={handleOnayla} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                Onayla
              </button>
              <button onClick={handleReddet} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                Reddet
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="mt-4 flex space-x-4">
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Kaydet
          </button>
          <button onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
            İptal
          </button>
        </div>
      )}
    </div>
  );
}

export default MutabakatDetay;
