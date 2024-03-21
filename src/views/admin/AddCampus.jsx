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
        console.error('Kampüs eklenirken bir hata oluştu:', error);
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
        console.error('Kampüs silinirken bir hata oluştu:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-4">Kampüs Listesi</h1>
      <ul className="mb-4 space-y-2">
        {schools?.map(school => (
          <li key={school.id} className="bg-white rounded p-4 flex items-center justify-between shadow-md">
            <span className="text-gray-800">{school.name}</span>
            <button onClick={() => deleteCampus(school.id)} className="text-red-500 ml-2">Kampüsü Sil</button>
          </li>
        ))}
      </ul>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Yeni Kampüs Adı"
          value={input.name}
          onChange={handleInputChange}
          className="flex-grow p-2 border rounded focus:outline-none"
        />
        <button onClick={addCampus} className="bg-blue-500 text-white p-2 rounded">Kampüs Ekle</button>
      </div>
    </div>
  );
}
