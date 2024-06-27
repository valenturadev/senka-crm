import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function AddCampus() {
  const [campuses, setCampuses] = useState([]);
  const [input, setInput] = useState({ name: '', campus_phone: '', campus_email: '', campus_address: '' });
  const [contactPersons, setContactPersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  let localUser = localStorage.getItem("user");
  let myUser = JSON.parse(localUser);
  const { id } = useParams();

  useEffect(() => {
    getCampus();
  }, []);

  const getCampus = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/crm/get-school/id=${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then(response => {
        console.log('Kampüsler:', response.data.data.campuses); // API'den gelen veriyi konsolda yazdırma
        setCampuses(response.data.data.campuses);
        setLoading(false);
      })
      .catch(error => {
        console.error('API çağrısı başarısız:', error);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput(prevInput => ({ ...prevInput, [name]: value }));
  };

  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    const newContactPersons = [...contactPersons];
    newContactPersons[index][name] = value;
    setContactPersons(newContactPersons);
  };

  const addContactPerson = () => {
    setContactPersons([...contactPersons, { name: '', surname: '', email: '', phone: '', title: '' }]);
  };

  const addCampus = () => {
    setLoading(true);
    const data = {
      "campus_name": input.name,
      "campus_phone": input.campus_phone,
      "campus_email": input.campus_email,
      "campus_address": input.campus_address,
      "contact_persons": contactPersons
    };

    axios({
      method: 'POST',
      url: `https://senka.valentura.com/api/crm/add-campus/school-id=${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      },
      data: data
    })
      .then(response => {
        getCampus();
        setInput({ name: '', campus_phone: '', campus_email: '', campus_address: '' });
        setContactPersons([]);
        setLoading(false);
        setNotification({ message: 'Kampüs başarıyla eklendi.', type: 'success' });
      })
      .catch(error => {
        console.error('Kampüs eklenirken bir hata oluştu:', error);
        setLoading(false);
        setNotification({ message: 'Kampüs eklenirken bir hata oluştu.', type: 'error' });
      });
  };

  const deleteCampus = (campusId) => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/crm/delete-campus/id=${campusId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myUser?.access}`
      }
    })
      .then(response => {
        getCampus();
        setLoading(false);
        setNotification({ message: 'Kampüs başarıyla silindi.', type: 'success' });
      })
      .catch(error => {
        console.error('Kampüs silinirken bir hata oluştu:', error);
        setLoading(false);
        setNotification({ message: 'Kampüs silinirken bir hata oluştu.', type: 'error' });
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Kampüs Yönetim Sistemi</h1>
        {loading && <div className="text-blue-500">İşlem yapılıyor...</div>}
        {notification.message && (
          <div className={`p-4 my-4 rounded text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {notification.message}
          </div>
        )}
        {campuses.length === 0 && !loading ? (
          <p className="text-center">Henüz kampüs eklenmemiş. İlk kampüsü eklemek için aşağıdaki formu kullanabilirsiniz.</p>
        ) : (
          <ul className="mb-6 space-y-4">
            {campuses?.map(campus => (
              <li key={campus.id} className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <Link to={`/kampus-ekle/${campus.id}`} className="text-xl font-semibold text-blue-500 hover:underline">{campus.name}</Link>
                    <p className="text-gray-700">Telefon: {campus.phone}</p>
                    <p className="text-gray-700">Email: {campus.email}</p>
                    <p className="text-gray-700">Adres: {campus.address}</p>
                  </div>
                  <button onClick={() => deleteCampus(campus.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Kampüsü Sil</button>
                </div>
                {campus.contact_persons && campus.contact_persons.length > 0 && (
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold">İletişim Kişileri</h2>
                    <ul className="space-y-2">
                      {campus.contact_persons.map((person, index) => (
                        <li key={index} className="text-sm text-gray-700 bg-gray-100 p-2 rounded">
                          <p><strong>Ad:</strong> {person.name} {person.surname}</p>
                          <p><strong>Email:</strong> {person.email}</p>
                          <p><strong>Telefon:</strong> {person.phone}</p>
                          <p><strong>Ünvan:</strong> {person.title}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Yeni Kampüs Ekle</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Yeni Kampüs Adı"
                value={input.name}
                onChange={handleInputChange}
                className="p-3 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="campus_phone"
                placeholder="Telefon Numarası"
                value={input.campus_phone}
                onChange={handleInputChange}
                className="p-3 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                name="campus_email"
                placeholder="Email"
                value={input.campus_email}
                onChange={handleInputChange}
                className="p-3 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="campus_address"
                placeholder="Adres"
                value={input.campus_address}
                onChange={handleInputChange}
                className="p-3 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">İletişim Kişisi Bilgileri</h2>
              {contactPersons.map((contact, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Ad"
                    value={contact.name}
                    onChange={(e) => handleContactChange(index, e)}
                    className="p-3 border rounded focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="surname"
                    placeholder="Soyad"
                    value={contact.surname}
                    onChange={(e) => handleContactChange(index, e)}
                    className="p-3 border rounded focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={contact.email}
                    onChange={(e) => handleContactChange(index, e)}
                    className="p-3 border rounded focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Telefon"
                    value={contact.phone}
                    onChange={(e) => handleContactChange(index, e)}
                    className="p-3 border rounded focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Ünvan"
                    value={contact.title}
                    onChange={(e) => handleContactChange(index, e)}
                    className="p-3 border rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
              <button onClick={addContactPerson} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">İletişim Kişisi Ekle</button>
            </div>
            <button onClick={addCampus} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Kampüs Ekle</button>
          </div>
        </div>
      </div>
    </div>
  );
}
