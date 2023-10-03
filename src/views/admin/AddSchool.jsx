import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AddSchool() {
    const [schools, setSchools] = useState([]);
    const [input, setInput] = useState({ name: '' });
    let localUser = localStorage.getItem("user");
    let myUser = JSON.parse(localUser);

    useEffect(() => {
        getSchools();
    }, []);

    const getSchools = () => {
        axios({
            method: 'GET',
            url: `https://senka.valentura.com/api/crm/get-schools`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            }
        })
            .then(response => {
                setSchools(response?.data?.data);
            })
            .catch(error => {
                console.error('API çağrısı başarısız:', error);
            });
    }

    const handleInputChange = (e) => {
        setInput({ name: e.target.value });
    };

    const addSchool = () => {
        axios({
            method: 'POST',
            url: 'https://senka.valentura.com/api/crm/add-school',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            },
            data: {
                "school_name": input.name
            }
        })
            .then(response => {
                getSchools();
                setInput({ name: '' });
            })
            .catch(error => {
                console.error('Okul eklenemedi:', error);
            });
    };

    const deleteSchool = (id) => {
        axios({
            method: 'GET',
            url: `https://senka.valentura.com/api/crm/delete-school/id=${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            }
        })
            .then(response => {
                getSchools();
            })
            .catch(error => {
                console.error('Okul silinemedi:', error);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-semibold mb-2">Okul Listesi</h1>
            <ul className="list-disc list-inside mb-4">
                {schools?.map(school => (
                    <li key={school.id} className="text-gray-800 flex ">
                        <Link to={`/kampus-ekle/${school.id}`} className="text-blue-500 underline">{school.name}</Link>
                        <button onClick={() => deleteSchool(school.id)} className="text-red-500 ml-2">Sil</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Okul Adı"
                value={input.name}
                onChange={handleInputChange}
                className="mb-2 mt-2 p-2 border rounded"
            />
            <button onClick={addSchool} className="bg-blue-500 text-white p-2 rounded">Okul Ekle</button>
        </div>
    );
};
