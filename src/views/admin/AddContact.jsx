import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GuideManagement() {
    const [guides, setGuides] = useState([]);
    const [input, setInput] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        is_active: false
    });
    const [isEdit, setIsEdit] = useState(false);
    let localUser = localStorage.getItem("user");
    let myUser = JSON.parse(localUser);
    const [guideId, setGuideId] = useState(null);

    useEffect(() => {
        getGuides();
        if (guideId != null) {
            getGuide(guideId);
        }
    }, [guideId]);

    const getGuides = () => {
        axios({
            method: 'GET',
            url: `https://senka.valentura.com/api/crm/get-rehbers`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            }
        })
            .then(response => {
                setGuides(response?.data?.data);
            })
            .catch(error => {
                console.error('API çağrısı başarısız:', error);
            });
    };

    const getGuide = (guideId) => {
        axios({
            method: 'GET',
            url: `https://senka.valentura.com/api/crm/get-rehber/id=${guideId}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            }
        })
            .then(response => {
                setInput(response?.data?.data);
            })
            .catch(error => {
                console.error('Rehber bilgileri getirilirken bir hata oluştu:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInput(prevInput => ({
            ...prevInput,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const addGuide = () => {
        axios({
            method: 'POST',
            url: `https://senka.valentura.com/api/crm/add-rehber`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            },
            data: input
        })
            .then(response => {
                getGuides();
                setInput({
                    name: '',
                    surname: '',
                    phone: '',
                    email: '',
                    is_active: false
                });
            })
            .catch(error => {
                console.error('Rehber eklenirken bir hata oluştu:', error);
            });
    };

    const editGuide = () => {
        axios({
            method: 'POST',
            url: `https://senka.valentura.com/api/crm/edit-rehber/id=${guideId}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            },
            data: input
        })
            .then(response => {
                getGuides();
                setInput({
                    name: '',
                    surname: '',
                    phone: '',
                    email: '',
                    is_active: false
                });
                setIsEdit(false);
            })
            .catch(error => {
                console.error('Rehber düzenlenirken bir hata oluştu:', error);
            });
    };

    const deleteGuide = () => {
        axios({
            method: 'GET',
            url: `https://senka.valentura.com/api/crm/delete-rehber/id=${guideId}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            }
        })
            .then(response => {
                getGuides();
            })
            .catch(error => {
                console.error('Rehber silinirken bir hata oluştu:', error);
            });
    };

    const handleEditClick = (guideId) => {
        setIsEdit(true);
        setGuideId(guideId);
        getGuide(guideId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-semibold mb-4">Rehber Listesi</h1>
            <ul className="mb-4 space-y-2">
                {guides?.map(guide => (
                    <li key={guide.id} className="bg-white rounded p-4 flex items-center justify-between shadow-md">
                        <span className="text-gray-800">{guide.name} {guide.surname}</span>
                        <div>
                            <button onClick={() => handleEditClick(guide.id)} className="text-blue-500 ml-2">Düzenle</button>
                            <button onClick={() => deleteGuide(guide.id)} className="text-red-500 ml-2">Sil</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex flex-col space-y-2">
                <input
                    type="text"
                    name="name"
                    placeholder="Ad"
                    value={input.name}
                    onChange={handleInputChange}
                    className="p-2 border rounded focus:outline-none"
                />
                <input
                    type="text"
                    name="surname"
                    placeholder="Soyad"
                    value={input.surname}
                    onChange={handleInputChange}
                    className="p-2 border rounded focus:outline-none"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Telefon Numarası"
                    value={input.phone}
                    onChange={handleInputChange}
                    className="p-2 border rounded focus:outline-none"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={input.email}
                    onChange={handleInputChange}
                    className="p-2 border rounded focus:outline-none"
                />
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="is_active"
                        checked={input.is_active}
                        onChange={handleInputChange}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-700">Aktif</span>
                </label>
                <button onClick={isEdit ? editGuide : addGuide} className="bg-blue-500 text-white p-2 rounded">
                    {isEdit ? 'Rehberi Düzenle' : 'Rehber Ekle'}
                </button>
            </div>
        </div>
    );
}
