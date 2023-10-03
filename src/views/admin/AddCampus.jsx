import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function AddCampus() {
  const [schools, setSchools] = useState([]);
  const [input, setInput] = useState({ name: '' });
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);
  const { id } = useParams();

  useEffect(() => {
    getCampus();
  }, []);

  const getCampus = () => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/crm/get-school/id=${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then(response => {
        console.log(response.data.data)
        setSchools(response?.data?.data?.campuses);
      })
      .catch(error => {
        console.error('API çağrısı başarısız:', error);
      });
  }

  const handleInputChange = (e) => {
    setInput({ name: e.target.value });
  };

  const addCampus = () => {
    axios({
      method: 'POST',
      url: `https://senka.valentura.com/api/crm/add-campus/school-id=${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      },
      data: {
        "campus_name": input.name
      }
    })
      .then(response => {
        getCampus();
        setInput({ name: '' });
      })
      .catch(error => {
        console.error('Okul eklenemedi:', error);
      });
  };

  const deleteCampus = (id) => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/crm/delete-campus/id=${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then(response => {
        getCampus();
      })
      .catch(error => {
        console.error('Okul silinemedi:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-2">Kampüs Listesi</h1>
      <ul className="list-disc list-inside mb-4">
        {schools?.map(school => (
          <li key={school.id} className="text-gray-800 flex ">
            {school.name}
            <button onClick={() => deleteCampus(school.id)} className="text-red-500 ml-2">Sil</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Kampüs Adı"
        value={input.name}
        onChange={handleInputChange}
        className="mb-2 mt-2 p-2 border rounded"
      />
      <button onClick={addCampus} className="bg-blue-500 text-white p-2 rounded">Kampüs Ekle</button>
    </div>
  );
};
