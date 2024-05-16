import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AddSchool() {
    const [schools, setSchools] = useState([]);
    const [input, setInput] = useState({ name: '', phone_number: '', email: '' });
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
                console.error('Okullar getirilirken bir hata oluştu:', error);
            });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prevInput => ({ ...prevInput, [name]: value }));
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
                "school_name": input.name,
                "phone_number": input.phone_number,
                "email": input.email
            }
        })
            .then(response => {
                getSchools();
                setInput({ name: '', phone_number: '', email: '' });
            })
            .catch(error => {
                console.error('Okul eklenirken bir hata oluştu:', error);
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
                console.error('Okul silinirken bir hata oluştu:', error);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-semibold mb-4">Okul Listesi</h1>
            {schools.length === 0 ? (
                <p>Henüz okul eklenmemiş. İlk okulu eklemek için aşağıdaki formu kullanabilirsiniz.</p>
            ) : (
                <ul className="mb-4 space-y-2">
                    {schools?.map(school => (
                        <li key={school.id} className="flex items-center justify-between bg-white rounded p-4 shadow-md">
                            <div>
                                <Link to={`/kampus-ekle/${school.id}`} className="text-blue-500 underline">{school.name}</Link>
                                <p>{school.phone}</p>
                                <p>{school.email}</p>
                            </div>
                            <button onClick={() => deleteSchool(school.id)} className="text-red-500 ml-2">Okulu Sil</button>
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex space-x-2">
                <input
                    type="text"
                    name="name"
                    placeholder="Yeni Okul Adı"
                    value={input.name}
                    onChange={handleInputChange}
                    className="flex-grow p-2 border rounded focus:outline-none"
                />
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Telefon Numarası"
                    value={input.phone_number}
                    onChange={handleInputChange}
                    className="flex-grow p-2 border rounded focus:outline-none"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={input.email}
                    onChange={handleInputChange}
                    className="flex-grow p-2 border rounded focus:outline-none"
                />
                <button onClick={addSchool} className="bg-blue-500 text-white p-2 rounded">Okul Ekle</button>
            </div>
        </div>
    );
}
