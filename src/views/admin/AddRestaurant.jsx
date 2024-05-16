import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RestaurantManagement() {
    const [restaurants, setRestaurants] = useState([]);
    const [input, setInput] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        country: '',
        is_active: false
    });
    const [isEdit, setIsEdit] = useState(false);
    let localUser = localStorage.getItem("user");
    let myUser = JSON.parse(localUser);
    const [restaurantId, setRestaurantId] = useState(null);

    useEffect(() => {
        getRestaurants();
        if (restaurantId != null) {
            getRestaurant(restaurantId);
        }
    }, [restaurantId]);

    const getRestaurants = () => {
        axios({
            method: 'GET',
            url: `https://senka.valentura.com/api/crm/get-restorans`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            }
        })
            .then(response => {
                setRestaurants(response?.data?.data);
            })
            .catch(error => {
                console.error('API çağrısı başarısız:', error);
            });
    }

    const getRestaurant = (restaurantId) => {
        axios({
            method: 'GET',
            url: `https://senka.valentura.com/api/crm/get-restoran/id=${restaurantId}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            }
        })
            .then(response => {
                setInput(response?.data?.data);
            })
            .catch(error => {
                console.error('Restoran bilgileri getirilirken bir hata oluştu:', error);
            });
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInput(prevInput => ({
            ...prevInput,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const addRestaurant = () => {
        axios({
            method: 'POST',
            url: `https://senka.valentura.com/api/crm/add-restoran`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            },
            data: input
        })
            .then(response => {
                getRestaurants();
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
                console.error('Restoran eklenirken bir hata oluştu:', error);
            });
    };

    const editRestaurant = () => {
        axios({
            method: 'POST',
            url: `https://senka.valentura.com/api/crm/edit-restoran/id=${restaurantId}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            },
            data: input
        })
            .then(response => {
                getRestaurants();
                setInput({
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    city: '',
                    country: '',
                    is_active: false
                });
                setIsEdit(false);
            })
            .catch(error => {
                console.error('Restoran düzenlenirken bir hata oluştu:', error);
            });
    };

    const deleteRestaurant = (restaurantId) => {
        axios({
            method: 'GET',
            url: `https://senka.valentura.com/api/crm/delete-restoran/id=${restaurantId}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myUser?.access}`
            }
        })
            .then(response => {
                getRestaurants();
            })
            .catch(error => {
                console.error('Restoran silinirken bir hata oluştu:', error);
            });
    };

    const handleEditClick = (restaurantId) => {
        setIsEdit(true);
        setRestaurantId(restaurantId);
        getRestaurant(restaurantId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-semibold mb-4">Restoran Listesi</h1>
            <ul className="mb-4 space-y-2">
                {restaurants?.map(restaurant => (
                    <li key={restaurant.id} className="bg-white rounded p-4 flex items-center justify-between shadow-md">
                        <span className="text-gray-800">{restaurant.name}</span>
                        <div>
                            <button onClick={() => handleEditClick(restaurant.id)} className="text-blue-500 ml-2">Düzenle</button>
                            <button onClick={() => deleteRestaurant(restaurant.id)} className="text-red-500 ml-2">Sil</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex flex-col space-y-2">
                <input
                    type="text"
                    name="name"
                    placeholder="Restoran Adı"
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
                <button onClick={isEdit ? editRestaurant : addRestaurant} className="bg-blue-500 text-white p-2 rounded">
                    {isEdit ? 'Restoranı Düzenle' : 'Restoran Ekle'}
                </button>
            </div>
        </div>
    );
}
