import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function OgretmenDetay() {
  const { ogretmenId } = useParams();
  const [ogretmenBilgileri, setOgretmenBilgileri] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    school: '',
    campus: '',
    title: '',
  });
  const [isDuzenlemeModu, setIsDuzenlemeModu] = useState(false);
  let localUser = localStorage.getItem('user');
  let myUser = JSON.parse(localUser);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://senka.valentura.com/api/customer-relations/gezi-takip/get-ogretmen/id=${ogretmenId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${myUser?.access}`,
      },
    })
      .then((response) => {
        setOgretmenBilgileri(response.data.data);
      })
      .catch((error) => {
        console.error('API çağrısı sırasında hata oluştu:', error);
      });
  }, []);

  const handleDuzenleClick = () => {
    setIsDuzenlemeModu(true);
  };

  const handleKaydetClick = () => {
    // Düzenleme işlemi burada gerçekleştirilir ve API'ye gönderilir
    axios({
      method: 'PATCH',
      url: `https://senka.valentura.com/api/customer-relations/gezi-takip/update-ogretmen/id=${ogretmenId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${myUser?.access}`,
      },
      data: JSON.stringify(ogretmenBilgileri),
    })
      .then((response) => {
        console.log('Öğretmen bilgileri güncellendi:', response);
        setIsDuzenlemeModu(false);
      })
      .catch((error) => {
        console.error('API çağrısı sırasında hata oluştu:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOgretmenBilgileri({
      ...ogretmenBilgileri,
      [name]: value,
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Öğretmen Detayları</h1>
      {isDuzenlemeModu ? (
        <div>
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
              İsim
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              value={ogretmenBilgileri.firstname}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
              Soyisim
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              value={ogretmenBilgileri.lastname}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Telefon (90 Başta olacak şekilde)
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              value={ogretmenBilgileri.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              value={ogretmenBilgileri.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="school" className="block text-sm font-medium text-gray-700">
              Okul
            </label>
            <input
              type="text"
              id="school"
              name="school"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              value={ogretmenBilgileri.school}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="campus" className="block text-sm font-medium text-gray-700">
              Kampüs
            </label>
            <input
              type="text"
              id="campus"
              name="campus"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              value={ogretmenBilgileri.campus}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Unvan
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              value={ogretmenBilgileri.title}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleKaydetClick}
          >
            Kaydet
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <strong>İsim:</strong> {ogretmenBilgileri.firstname}
          </div>
          <div className="mb-4">
            <strong>Soyisim:</strong> {ogretmenBilgileri.lastname}
          </div>
          <div className="mb-4">
            <strong>Telefon:</strong> {ogretmenBilgileri.phone}
          </div>
          <div className="mb-4">
            <strong>E-posta:</strong> {ogretmenBilgileri.email}
          </div>
          <div className="mb-4">
            <strong>Okul:</strong> {ogretmenBilgileri.school}
          </div>
          <div className="mb-4">
            <strong>Kampüs:</strong> {ogretmenBilgileri.campus}
          </div>
          <div className="mb-4">
            <strong>Unvan:</strong> {ogretmenBilgileri.title}
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleDuzenleClick}
          >
            Düzenle
          </button>
        </div>
      )}
    </div>
  );
}

export default OgretmenDetay;