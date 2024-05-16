import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function HotelManagement() {
    const [hotels, setHotels] = useState([]);
    const [input, setInput] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        country: '',
        is_active: false
    });
    const [isEdit, setIsEdit] = useState(false)
    let localUser = localStorage.getItem("user");
    let myUser = JSON.parse(localUser);
    const [hotelId, setHotelId] = useState(null)

    useEffect(() => {
        getHotels();
        if (hotelId != null) {
            getHotel(hotelId);
        }
    }, [hotelId]);

    const getHotels = () => {
        axios({
            method: 'GET',
            url: `https://senka.valentura.com/api/crm/get-hotels`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            }
        })
            .then(response => {
                setHotels(response?.data?.data);
            })
            .catch(error => {
                console.error('API çağrısı başarısız:', error);
            });
    }

    const getHotel = (hotelId) => {
        axios({
            method: 'GET',
            url: `https://senka.valentura.com/api/crm/get-hotel/id=${hotelId}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            }
        })
            .then(response => {
                setInput(response?.data?.data);
            })
            .catch(error => {
                console.error('Otel bilgileri getirilirken bir hata oluştu:', error);
            });
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInput(prevInput => ({
            ...prevInput,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const addHotel = () => {
        axios({
            method: 'POST',
            url: `https://senka.valentura.com/api/crm/add-hotel`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            },
            data: input
        })
            .then(response => {
                getHotels();
                setInput({
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    city: '',
                    country: '',
                    is_active: false
                });
            })
            .catch(error => {
                console.error('Otel eklenirken bir hata oluştu:', error);
            });
    };

    const editHotel = () => {
        axios({
            method: 'POST',
            url: `https://senka.valentura.com/api/crm/edit-hotel/id=${hotelId}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            },
            data: input
        })
            .then(response => {
                getHotels();
                setInput({
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    city: '',
                    country: '',
                    is_active: false
                });
                setIsEdit(false)
            })
            .catch(error => {
                console.error('Otel düzenlenirken bir hata oluştu:', error);
            });
    };

    const deleteHotel = () => {
        axios({
            method: 'GET',
            url: `https://senka.valentura.com/api/crm/delete-hotel/id=${hotelId}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            }
        })
            .then(response => {
                getHotels();
            })
            .catch(error => {
                console.error('Otel silinirken bir hata oluştu:', error);
            });
    };

    const handleEditClick = (hotelId) => {
        setIsEdit(true)
        setHotelId(hotelId)
        getHotel(hotelId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-semibold mb-4">Otel Listesi</h1>
            <ul className="mb-4 space-y-2">
                {hotels?.map(hotel => (
                    <li key={hotel.id} className="bg-white rounded p-4 flex items-center justify-between shadow-md">
                        <span className="text-gray-800">{hotel.name}</span>
                        <div>
                            <button onClick={() => handleEditClick(hotel.id)} className="text-blue-500 ml-2">Düzenle</button>
                            <button onClick={() => deleteHotel(hotel.id)} className="text-red-500 ml-2">Sil</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex flex-col space-y-2">
                <input
                    type="text"
                    name="name"
                    placeholder="Otel Adı"
                    value={input.name}
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
                <input
                    type="text"
                    name="address"
                    placeholder="Adres"
                    value={input.address}
                    onChange={handleInputChange}
                    className="p-2 border rounded focus:outline-none"
                />
                <input
                    type="text"
                    name="city"
                    placeholder="Şehir"
                    value={input.city}
                    onChange={handleInputChange}
                    className="p-2 border rounded focus:outline-none"
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Ülke"
                    value={input.country}
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
                <button onClick={isEdit ? editHotel : addHotel} className="bg-blue-500 text-white p-2 rounded">
                    {isEdit ? 'Oteli Düzenle' : 'Otel Ekle'}
                </button>
            </div>
        </div>
    );
}
